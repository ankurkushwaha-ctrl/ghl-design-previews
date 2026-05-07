/*
 * types.ts — shared types for the Update Features bulk-action modal.
 *
 * The patch contract (brief, internalized): "Anything the user explicitly
 * lists in the changes will be modified. Anything not listed stays exactly
 * as it currently is on each sub-account."
 *
 * This is enforced architecturally — see recipe.ts::recipeToPayload, which
 * has no access to per-sub-account current state and therefore cannot leak
 * unlisted features into the payload by construction.
 */

/** Action chosen for a feature inside the recipe. */
export type FeatureAction = 'enable' | 'disable';

/**
 * One row in the recipe. Order is meaningful (first added → top of list).
 * Adding a feature appends. Removing strips by featureId. Flipping the
 * action mutates the entry in place.
 */
export interface RecipeEntry {
  featureId: string;
  action: FeatureAction;
}

/** Ordered list of recipe entries. The recipe IS the modal's source of truth. */
export type Recipe = RecipeEntry[];

/** A leaf feature in the catalog. */
export interface Feature {
  id: string;
  name: string;
  /** Optional sub-group label (e.g. "CRM core" inside "CRM"). */
  subGroup?: string;
}

/** A top-level feature group rendered in the picker. */
export interface FeatureGroup {
  id: string;
  name: string;
  features: Feature[];
}

/**
 * Impact of one recipe entry against the selected sub-accounts.
 *
 *   total      — number of selected sub-accounts (constant per modal session)
 *   alreadyOn  — count whose current state for this feature is `on`
 *   alreadyOff — count whose current state for this feature is `off`
 *   willChange — count whose current state DIFFERS from the chosen action
 *                (i.e. this row will produce a real toggle)
 */
export interface Impact {
  total: number;
  alreadyOn: number;
  alreadyOff: number;
  willChange: number;
}

/** Modal view-state machine. `idle` is the closed state owned by the parent. */
export type ViewState = 'edit' | 'confirm' | 'applying' | 'applied';

/**
 * Per-feature current state across all selected sub-accounts.
 *
 * Map from featureId → number of sub-accounts where it is currently
 * enabled. Sub-accounts where it's not enabled = total - alreadyOn.
 *
 * This map is read-only inside the modal and IS NOT part of the
 * mutation payload — see recipe.ts.
 */
export type CurrentStateBySubAccount = Map<string, number>;

/**
 * Mutation payload sent to the backend. Contains ONLY the recipe entries
 * — anything not in the recipe is genuinely not in the request, per
 * the patch contract.
 */
export interface MutationPayload {
  selectedSubAccountIds: string[];
  featureChanges: Array<{ featureId: string; action: FeatureAction }>;
}
