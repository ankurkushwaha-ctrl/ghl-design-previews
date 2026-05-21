/*
 * recipe.ts — pure logic for the Update Features modal.
 *
 * THE PATCH CONTRACT — this file is where it lives.
 *
 *   recipeToPayload(recipe, selectedSubAccountIds) → MutationPayload
 *
 * Note what this function does NOT take: the per-sub-account current
 * state map. There is no codepath in this module that can read from
 * that map and inject "no change" entries for unlisted features. The
 * mutation payload contains only what is in the recipe — anything not
 * in the recipe is genuinely not in the request.
 *
 * The brief calls this out explicitly: "The mutation payload sent to
 * the backend must contain only the features in the recipe; everything
 * else must not be in the request at all." Enforced here by signature.
 *
 * Everything else in this file is read-only impact / summary calculation
 * for the UI. Those helpers DO take the current-state map (they need it
 * to render impact lines), but they only compute display values — they
 * never feed back into the payload.
 */
import type {
  CurrentStateBySubAccount,
  Impact,
  MutationPayload,
  Recipe,
  RecipeEntry,
} from './types';

/* ──────────────────────────────────────────────────────────────────────
 * Patch-contract enforcement
 * ────────────────────────────────────────────────────────────────────── */

/**
 * Build the mutation payload from a recipe.
 *
 * By signature: this function CANNOT inject features that aren't in
 * the recipe. There's nowhere for them to come from.
 */
export function recipeToPayload(
  recipe: Recipe,
  selectedSubAccountIds: string[],
): MutationPayload {
  return {
    selectedSubAccountIds: [...selectedSubAccountIds],
    featureChanges: recipe.map((entry) => ({
      featureId: entry.featureId,
      action: entry.action,
    })),
  };
}

/* ──────────────────────────────────────────────────────────────────────
 * Recipe mutations — append / remove / flip
 * Pure: every mutation returns a NEW recipe; the caller swaps the ref.
 * ────────────────────────────────────────────────────────────────────── */

export function addEntry(
  recipe: Recipe,
  featureId: string,
  action: RecipeEntry['action'] = 'enable',
): Recipe {
  if (recipe.some((e) => e.featureId === featureId)) {
    return recipe;
  }
  return [...recipe, { featureId, action }];
}

export function removeEntry(recipe: Recipe, featureId: string): Recipe {
  return recipe.filter((e) => e.featureId !== featureId);
}

export function flipEntry(recipe: Recipe, featureId: string): Recipe {
  return recipe.map((e) =>
    e.featureId === featureId
      ? { ...e, action: e.action === 'enable' ? 'disable' : 'enable' }
      : e,
  );
}

export function setAllAction(
  recipe: Recipe,
  action: RecipeEntry['action'],
): Recipe {
  return recipe.map((e) => ({ ...e, action }));
}

/**
 * Bulk-add helper used by the picker's "+ Enable all N" / "+ Disable all N"
 * buttons. Adds every featureId in the catalog that isn't already in the
 * recipe; existing entries keep their current action (per brief: bulk-add
 * never overwrites a row that's already there).
 */
export function bulkAdd(
  recipe: Recipe,
  allFeatureIds: string[],
  action: RecipeEntry['action'],
): Recipe {
  const existing = new Set(recipe.map((e) => e.featureId));
  const additions = allFeatureIds
    .filter((id) => !existing.has(id))
    .map<RecipeEntry>((id) => ({ featureId: id, action }));
  return [...recipe, ...additions];
}

/* ──────────────────────────────────────────────────────────────────────
 * Display-only impact calculations
 * ────────────────────────────────────────────────────────────────────── */

/**
 * Compute the impact of one recipe entry against the selected sub-accounts.
 *
 *   selectedCount        — total selected sub-accounts
 *   currentlyOnForFeature — count where this feature is currently enabled
 *
 *   willChange  — sub-accounts whose current state DIFFERS from the
 *                 chosen action. These are the ones this row will toggle.
 *                 - action=enable  → willChange = total - alreadyOn
 *                 - action=disable → willChange = alreadyOn
 */
export function computeImpact(
  entry: RecipeEntry,
  selectedCount: number,
  currentState: CurrentStateBySubAccount,
): Impact {
  const alreadyOn = currentState.get(entry.featureId) ?? 0;
  const alreadyOff = Math.max(0, selectedCount - alreadyOn);
  const willChange = entry.action === 'enable' ? alreadyOff : alreadyOn;
  return {
    total: selectedCount,
    alreadyOn,
    alreadyOff,
    willChange,
  };
}

/** Sum of `willChange` across every recipe entry — the headline number. */
export function totalChangesFor(
  recipe: Recipe,
  selectedCount: number,
  currentState: CurrentStateBySubAccount,
): number {
  return recipe.reduce(
    (acc, e) => acc + computeImpact(e, selectedCount, currentState).willChange,
    0,
  );
}

/** True when the recipe touches every feature in the catalog. */
export function isFullCoverage(
  recipe: Recipe,
  totalFeatureCount: number,
): boolean {
  return recipe.length === totalFeatureCount;
}

/** True when the recipe is non-empty but every entry has willChange = 0. */
export function isAllNoOp(
  recipe: Recipe,
  selectedCount: number,
  currentState: CurrentStateBySubAccount,
): boolean {
  if (recipe.length === 0) return false;
  return recipe.every(
    (e) => computeImpact(e, selectedCount, currentState).willChange === 0,
  );
}

/**
 * For the confirm step: only entries that actually do work. Used to
 * trim the per-feature summary card so it doesn't show no-op rows
 * (per brief: "Confirm step omits no-op rows entirely").
 */
export function entriesWithChange(
  recipe: Recipe,
  selectedCount: number,
  currentState: CurrentStateBySubAccount,
): Array<{ entry: RecipeEntry; impact: Impact }> {
  return recipe
    .map((entry) => ({
      entry,
      impact: computeImpact(entry, selectedCount, currentState),
    }))
    .filter((x) => x.impact.willChange > 0);
}
