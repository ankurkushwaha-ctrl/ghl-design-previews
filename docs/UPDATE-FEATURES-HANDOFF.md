# Update Features — Dev Handoff

> **Live preview:** https://ghl-design-previews.vercel.app/sub-accounts
> Select 1+ sub-accounts → Bulk Actions → Update Features

---

## What this is

A production-ready **Update Features** bulk-action modal for the Sub-Accounts page. It lets agency admins select features from the catalog, set each to enable or disable, see per-sub-account impact, and submit the batch — all governed by a patch contract that ensures unlisted features are never touched.

The component package (12 files, ~2,900 lines) is designed for a clean lift into `ghl-revex-frontend`. Most files copy verbatim; two need import swaps; one (mock data) is discarded entirely.

---

## Architecture

```
UpdateFeaturesModal.vue          ← orchestrator (state machine, footer)
├── FeaturePicker.vue            ← Step 1: search + grouped feature selection
├── RecipeList.vue               ← Step 2: configure selected features
│   └── RecipeRow.vue            ← single feature row (toggle + impact)
│       └── ActionChip.vue       ← enable/disable toggle chip
├── UntouchedCallout.vue         ← summary banner ("X changes, Y unchanged")
├── ConfirmStep.vue              ← confirmation view (currently bypassed)
├── ApplyingStep.vue             ← spinner state
└── AppliedStep.vue              ← async confirmation ("changes take effect in 2–5 min")

recipe.ts                        ← pure business logic (add/remove/flip/impact)
types.ts                         ← TypeScript interfaces + patch contract types
feature-catalog.ts               ← MOCK DATA — discard, replace with API
```

### State machine

```
select → configure → applying → applied → (modal closes)
         ↕ (Back)
```

---

## File inventory

### Copy verbatim (zero dev effort)

These files have no external dependencies beyond Vue 3 and vue-i18n. Copy them into the upstream component directory as-is.

| File | Lines | Purpose |
|---|---|---|
| `types.ts` | 93 | All TypeScript interfaces (`Recipe`, `RecipeEntry`, `FeatureAction`, `Impact`, `MutationPayload`, `ViewState`) |
| `recipe.ts` | 186 | Pure business logic — `addEntry`, `removeEntry`, `flipEntry`, `setAllAction`, `bulkAdd`, `computeImpact`, `totalChangesFor`, `isFullCoverage`, `isAllNoOp`, `entriesWithChange`, `recipeToPayload` |
| `RecipeList.vue` | 310 | Step 2 recipe list with grouped rows and batch actions |
| `RecipeRow.vue` | 319 | Single feature row — toggle, impact line, expandable detail |
| `ActionChip.vue` | 128 | Enable/disable toggle chip |
| `UntouchedCallout.vue` | 73 | "X changes across Y sub-accounts. Z features unchanged." |
| `ApplyingStep.vue` | 78 | Spinner + "Submitting changes" |
| `AppliedStep.vue` | 108 | Async confirmation + ETA |
| `ConfirmStep.vue` | 194 | Confirmation view |

### Low-effort port (swap imports)

These files import from `_stubs/` — replace those imports with real store/i18n/service modules.

| File | Lines | What to swap |
|---|---|---|
| `UpdateFeaturesModal.vue` | 489 | `_stubs/store` → real Vuex/Pinia store for selected sub-account IDs; `_stubs/i18n` → real vue-i18n; mock catalog import → real API call |
| `FeaturePicker.vue` | 656 | No stub imports, but receives `features` as prop — ensure the parent passes the real catalog from API |

### Discard (mock only)

| File | Lines | Why |
|---|---|---|
| `feature-catalog.ts` | 279 | Contains `FEATURE_CATALOG`, `MOCK_ACCOUNT_NAMES`, and `buildMockDetailedState()`. Replace with real API endpoint that returns the feature catalog and per-sub-account feature state. |

---

## i18n keys

All keys live under `agency.bulkActions.updateFeatures.*` — designed to paste directly into upstream locale files with no renaming.

```json
{
  "agency": {
    "bulkActions": {
      "updateFeatures": {
        "title": "Update feature access",
        "subtitleLead": "Updating {count} sub-accounts. ",
        "subtitleBoldClause": "Only the features you select will change.",
        "subtitleTrail": "",

        "emptyState": "No changes yet. Add a feature to get started.",
        "emptyStateHint": "Unselected features keep their current settings.",

        "searchPlaceholder": "Search features…",
        "pickerNoResults": "No features match \"{query}\".",
        "pickerCurrentState": "{count}/{total} on",

        "rowImpactChange": "{x} of {total} affected ({y} already {state})",
        "rowImpactNoOp": "Already {state} on all {total} — no change",
        "stateOn": "enabled",
        "stateOff": "disabled",

        "listHeaderCount": "{count} features in this list",
        "flipAllEnable": "Enable all",
        "flipAllDisable": "Disable all",

        "untouchedPartial": "{x} changes across {y} sub-accounts. {z} features unchanged.",
        "untouchedFull": "All {total} features included — {x} changes across {y} sub-accounts.",

        "footerNoChanges": "Select features to get started",
        "footerNoOp": "All features already match — nothing to change",
        "footerReady": "Ready to apply {count} changes",

        "confirmTitle": "Apply changes?",
        "confirmSubtitlePartial": "{x} changes across {y} sub-accounts. {z} features unchanged.",
        "confirmSubtitleFull": "All {total} features across {y} sub-accounts. {x} toggles will change.",

        "applyingTitle": "Submitting changes",
        "applyingBody": "{x} updates across {y} sub-accounts.",

        "appliedTitle": "Changes submitted",
        "appliedAsyncBody": "{x} updates queued across {y} sub-accounts.",
        "appliedEta": "Changes take effect in 2–5 minutes.",
        "appliedDone": "Done",

        "cancel": "Cancel",
        "apply": "Apply"
      }
    }
  }
}
```

---

## API contract

### Mutation payload shape

The modal produces this payload via `recipeToPayload()` in `recipe.ts`:

```typescript
interface MutationPayload {
  selectedSubAccountIds: string[];
  featureChanges: Array<{
    featureId: string;
    action: 'enable' | 'disable';
  }>;
}
```

**Patch contract:** Only features explicitly listed in `featureChanges` are modified. Everything else on each sub-account stays exactly as-is. This is enforced architecturally — `recipeToPayload()` has no access to per-sub-account current state and therefore cannot leak unlisted features by construction.

### Expected API inputs (dev needs to provide)

1. **Feature catalog endpoint** — returns `FeatureGroup[]` (groups with nested features)
2. **Current state endpoint** — given a list of sub-account IDs, returns per-feature enabled/disabled state across those sub-accounts (used for impact calculation)
3. **Mutation endpoint** — accepts `MutationPayload`, processes async, returns immediately

---

## Integration checklist

Dev needs to complete these 6 tasks:

- [ ] **Add `update-features` to the bulk-actions enum** in `ghl-revex-frontend/apps/locations/src/constants/index.ts` — follows the existing kebab-case pattern (`enable-rebilling`, `pause-subaccount`, etc.)
- [ ] **Wire the dropdown item** in the bulk-actions dropdown to open `UpdateFeaturesModal`
- [ ] **Replace mock catalog** — fetch real feature groups from API, pass as `featureGroups` prop to `FeaturePicker`
- [ ] **Replace mock current state** — fetch per-sub-account feature state from API, pass as `currentState` and `detailedState` props
- [ ] **Wire mutation** — on `applied` state, call the real mutation endpoint with `recipeToPayload()` output
- [ ] **Replace HighRise stubs** — swap `@/components/highrise` imports (`HLModal`, `HLButton`, `HLTag`) with `@platform-ui/highrise`

---

## Design decisions (for dev context)

| Decision | Rationale |
|---|---|
| Two-step wizard (select → configure) | Reduces cognitive load — pick features first, then set actions |
| Group-level "Enable all / Disable all" only for 4+ feature groups | Avoids redundant CTAs when individual toggles suffice (Nielsen H8) |
| Async confirmation ("2–5 minutes") instead of progress bar | API calls will be async at scale; honest ETA > fake progress |
| Patch contract enforced by function signature | `recipeToPayload()` literally cannot access current state — no accidental inclusion of unlisted features |
| All copy in i18n keys | Production-ready for localization from day one |
| CSS uses HighRise tokens only | No hardcoded colors — works with any theme |

---

## Open questions for dev

1. **Blind mode:** For large sub-account selections (100+), fetching per-sub-account feature state may be expensive (1 API call per sub-account). Do we need a "blind mode" that skips the current-state fetch and shows no impact lines? The modal architecture supports this — `currentState` is a prop, not required for the patch contract.

2. **Feature catalog source:** Is there an existing endpoint that returns the grouped feature catalog, or does one need to be built?

3. **Mutation endpoint:** Should this be a single batch endpoint, or fan out to per-sub-account calls on the backend?

---

## Quick start for dev

```bash
# Clone and run the preview locally
git clone https://github.com/ankurkushwaha-ctrl/ghl-design-previews.git
cd ghl-design-previews
git checkout feat/update-features
npm install
npm run dev
# Open http://localhost:5174/sub-accounts
```

All Update Features code lives in:
```
src/shells/ShellV1/locations/update-features/
```
