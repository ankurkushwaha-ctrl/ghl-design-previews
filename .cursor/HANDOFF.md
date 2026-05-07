# Handoff prompts — for starting a new Cursor chat in this repo

Copy one of these templates into a fresh chat when starting work
with a new agent. The conventions are auto-loaded from
`.cursor/rules/page-defaults.mdc`; these templates only fill in the
feature-specific bits.

---

## 1. Generic template (any new feature)

```
Working in `~/Desktop/Projects/ghl-design-previews/`.

Feature: <feature name>
Source of truth (production URL): <prod URL>
Source of truth (upstream Vue source): `~/Desktop/Projects/upstream/<repo>/src/...`
Goal: <one-sentence goal>

Pre-flight (please run first, in this order):
  1. `git status` — confirm clean working tree
  2. `git fetch && git pull` — current main
  3. `git checkout -b feat/<feature-slug>` — feature branch
  4. `cd ~/Desktop/Projects/upstream/<repo> && git pull` — fresh upstream
  5. Read `.cursor/rules/page-defaults.mdc` end-to-end before any edit

Done means:
  - Files created/modified listed back to me
  - Preview deploy URL (NOT prod) shared back
  - Any decisions or upstream gaps surfaced
  - Branch ready for me to review and merge — do NOT merge to main
    or deploy to prod without my explicit go-ahead
```

---

## 2. Update Features (specific — for the agent the user mentioned)

```
Working in `~/Desktop/Projects/ghl-design-previews/`.

Feature: Update Features bulk action for Sub-Accounts.
Source of truth (production URL): https://permissions.version.gohighlevel.site/sub-accounts
Source of truth (upstream Vue source): `~/Desktop/Projects/upstream/ghl-revex-frontend/apps/locations/`
Goal: Build the Update Features flow that opens when the
"Update Features" item is picked from the bulk-actions dropdown on
the Sub-Accounts page.

Context already in place:
  - The Sub-Accounts page lives at `/sub-accounts`. Files:
    `src/pages/SubAccountsPage.vue` (wrapper) +
    `src/shells/ShellV1/locations/Locations.vue` (inner content).
  - The bulk-actions dropdown already exposes
    `key: 'update-features'` (in
    `src/shells/ShellV1/locations/BulkActionsRow.vue`).
  - When that key is picked, `Locations.vue` currently routes through
    a generic confirm modal. Your job is to swap that to the real
    Update Features flow (modal or drawer, per upstream).

Pre-flight (please run first, in this order):
  1. `git status`
  2. `git fetch && git pull`
  3. `git checkout -b feat/update-features`
  4. `cd ~/Desktop/Projects/upstream/ghl-revex-frontend && git pull`
  5. Read `.cursor/rules/page-defaults.mdc` end-to-end

Build the new page/flow under
`src/shells/ShellV1/update-features/`. Add a route at
`/sub-accounts/update-features` if upstream has a dedicated page;
otherwise wire it as a modal/drawer triggered from the existing
Sub-Accounts page.

Done means:
  - Files listed back
  - Preview URL (NOT prod) shared back
  - Branch ready for review — do NOT merge to main or deploy to
    prod without my go-ahead
```

---

## 3. Bug-fix or small change (no feature branch needed)

```
Working in `~/Desktop/Projects/ghl-design-previews/`.

Goal: <one-sentence fix>
Affected file(s): <paths>

Pre-flight:
  1. `git status` — confirm clean working tree
  2. Read `.cursor/rules/page-defaults.mdc` if you haven't this session

Apply the smallest possible diff. Run `npm run build` to verify.
If the fix touches a co-owned file (see "Multi-agent safety" in the
rules), leave a one-line comment near the change.
```

---

## How to add a new template

When a new recurring feature pattern emerges (e.g. another sibling
flow off Sub-Accounts, or a new top-level page), add it here. Keep
each template self-contained so the new chat doesn't need any prior
context beyond what's in the rules file.
