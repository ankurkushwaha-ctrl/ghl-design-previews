---
name: update-features
description: Build the Update Features bulk-action flow for the Sub-Accounts page
argument-hint: "<optional extra context — leave blank for the standard scope>"
---

You are building the Update Features flow that opens when the
"Update Features" item is picked from the bulk-actions dropdown
on the Sub-Accounts page in `~/Desktop/Projects/ghl-design-previews/`.

## Sources of truth

- **Production reference**: https://permissions.version.gohighlevel.site/sub-accounts
- **Upstream Vue source**: `~/Desktop/Projects/upstream/ghl-revex-frontend/apps/locations/`
  (this is where the Update Features components live in upstream)

## Context already in place

- The Sub-Accounts page lives at `/sub-accounts`. Files:
  `src/pages/SubAccountsPage.vue` (wrapper) +
  `src/shells/ShellV1/locations/Locations.vue` (inner content).
- The bulk-actions dropdown already exposes `key: 'update-features'`
  in `src/shells/ShellV1/locations/BulkActionsRow.vue`.
- When that key is currently picked, `Locations.vue` routes
  through a generic confirm modal. Your job is to swap that
  branch to the real Update Features flow (modal, drawer, or
  dedicated page — match upstream).

## Pre-flight (run these first, in order)

1. `git status` — confirm clean working tree.
2. `git fetch && git pull` — current main.
3. `git log -5 --oneline` — see what other agents have shipped.
4. `git checkout -b feat/update-features`.
5. `cd ~/Desktop/Projects/upstream/ghl-revex-frontend && git pull`.
6. Read `.cursor/rules/page-defaults.mdc` end-to-end.

## Conventions (full set in page-defaults.mdc)

- **If upstream has a dedicated page**: build it under
  `src/shells/ShellV1/update-features/` using the two-file pattern
  (`src/pages/UpdateFeaturesPage.vue` wrapper +
  `src/shells/ShellV1/update-features/UpdateFeaturesPage.vue` inner).
  Add a route at `/sub-accounts/update-features` in `src/routes.ts`.
- **If upstream uses a modal/drawer**: vendor that component into
  `src/shells/ShellV1/update-features/` and wire it to open from
  `Locations.vue`'s bulk-action handler. No new route needed.
- **HighRise primitives** come from `src/components/highrise/`
  stubs — not `@gohighlevel/ghl-ui`. Add new stubs when needed.
- **Hardcoded English copy** stays hardcoded if upstream is.
- **No new npm deps** without asking.

## Extra context for this run

$ARGUMENTS

## Done means

- Files created/modified listed back with paths.
- Preview deploy URL (NOT production) shared back.
- Decisions (especially: did upstream use a page or a modal?
  which HighRise primitives needed stubbing?) surfaced explicitly.
- Branch `feat/update-features` ready for review — do NOT merge
  to main, do NOT push to origin, do NOT deploy to prod without
  my explicit go-ahead.
