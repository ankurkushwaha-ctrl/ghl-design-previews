---
name: feature
description: Start work on a new feature in ghl-design-previews with the right pre-flight, branching, and conventions
argument-hint: "<feature name and one-line description>"
---

You are starting fresh work on a new feature in
`~/Desktop/Projects/ghl-design-previews/`. Follow the steps below
in order. Don't skip the pre-flight — it's how multi-agent safety
works in this repo.

## Step 1 — Pre-flight (run these first, in order)

1. `git status` — confirm clean working tree. If dirty, surface
   the diff and stop until I clarify what to do.
2. `git fetch && git pull` — current main.
3. `git log -5 --oneline` — see what other agents have shipped recently.
4. `git checkout -b feat/<slug>` — feature branch. Derive `<slug>`
   as kebab-case from my description below; if ambiguous, ask me.
5. If you'll vendor from upstream, also run:
   `cd ~/Desktop/Projects/upstream/<repo> && git pull` (substitute
   the relevant repo, e.g. `ghl-revex-frontend` or `spm-ts`).
6. Read `.cursor/rules/page-defaults.mdc` end-to-end before any edit.

## Step 2 — Conventions to honour (full set in page-defaults.mdc)

- **Two-file page pattern**: `src/pages/<X>Page.vue` (thin shell
  wrapper) + `src/shells/ShellV1/<feature>/<X>Page.vue` (inner
  vendored content). Reference: `SubAccountsPage.vue` + `Locations.vue`.
- **`active="<nav-meta-key>"`** must match the spm-ts nav meta
  (find it in `~/Desktop/Projects/upstream/spm-ts/src/util/navigation.ts`).
- **HighRise primitives** come from `src/components/highrise/`
  stubs — NOT from `@gohighlevel/ghl-ui` (Sub-Accounts is a
  documented exception, don't copy that pattern).
- **Hardcoded English copy** stays hardcoded if upstream is
  hardcoded. Don't invent i18n keys upstream doesn't have.
- **Action keys** mirror upstream enum values verbatim
  (kebab-case, see `BulkActionType` reference in the rule file).
- **No new top-level folders** — everything in this repo. New
  feature = new route + new subfolder under `src/shells/ShellV1/`.
- **No new npm deps** without asking me.
- **Preview deploys only** for WIP. Production deploys (`--prod`)
  require my explicit go-ahead — a green build is not consent.

## Step 3 — What I want

$ARGUMENTS

## Step 4 — Done means

- Files created/modified listed back to me with paths.
- Preview deploy URL (NOT production) shared back.
- Any decisions you made (especially stubbing choices, mapping
  upstream → local) surfaced explicitly.
- Any upstream gaps or compromises noted so I can follow up.
- Branch is ready for me to review and merge — do NOT merge to
  main, do NOT push to origin, do NOT deploy to prod without my
  explicit go-ahead.
