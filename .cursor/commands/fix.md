---
name: fix
description: Apply a small, low-risk fix without a feature branch
argument-hint: "<one-sentence description of the fix and the file(s) involved>"
---

You are applying a small, low-risk fix in
`~/Desktop/Projects/ghl-design-previews/`. This is the right
command for typos, single-token swaps, copy adjustments, or
single-file bug fixes — not feature work.

## Pre-flight

1. `git status` — confirm clean working tree. If dirty, surface
   the diff and stop until I clarify.
2. Read `.cursor/rules/page-defaults.mdc` if you haven't loaded
   it this session.

## Constraints

- Apply the **smallest possible diff**. No refactors, no
  rewrites, no "while I'm here" cleanups.
- If the fix touches a co-owned file (see "Multi-agent safety"
  in the rule file — `routes.ts`, `_stubs/i18n.ts`, `App.vue`,
  `package.json`, etc.), leave a one-line comment near the
  change with date + reason so ownership is traceable.
- Run `npm run build` (`vue-tsc --noEmit && vite build`) before
  declaring done.
- Land the fix directly on `main` after the build passes — no
  feature branch needed for this scope.

## What needs fixing

$ARGUMENTS

## Done means

- The exact file(s) and lines changed reported back.
- Build status confirmed.
- One-sentence summary of the change for me to commit.
- Do NOT push to origin and do NOT deploy without my go-ahead.
