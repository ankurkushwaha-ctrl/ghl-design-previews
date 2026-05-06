# ghl-design-previews

Interactive design previews for GoHighLevel — visually-faithful shells
plus page mockups stakeholders can review on a Vercel URL, and devs can
read as a reference when implementing in `spm-ts`.

This repo replaces the previous static-HTML preview workflow
(`ghl-addons-preview`). Pages here are real Vue components that share
a `<ShellV1>` instead of hand-syncing chrome across HTML files.

## Routes

| Path           | Page                | Source-of-truth                                              |
| -------------- | ------------------- | ------------------------------------------------------------ |
| `/`            | Preview index       | this repo                                                    |
| `/add-ons`     | Agency Add-Ons page | **`spm-ts`** — `src/pmd/pages/agency/AddOnsPage.vue`         |
| `/shells/v1`   | ShellV1 (chrome)    | this repo (visual port of `spm-ts` SideBar + TopBar)         |
| `/page-tabs`   | Page Tabs (Phase 2) | this repo (migrated from `~/Desktop/Projects/SAAS/page-tabs.html`) |

## Develop

```bash
npm install
npm run dev    # http://localhost:5173
```

## Deploy

Linked to Vercel; first deploy via:

```bash
vercel deploy --prod --yes
```

Subsequent deploys: every push to `main` redeploys automatically once
the GitHub repo is connected in the Vercel dashboard.

## Add a new preview

1. Create the file in `src/pages/` using PascalCase, e.g.
   `src/pages/MyNewPreview.vue`.
2. Wrap content in `<ShellV1>` (or `<ShellV2>` if explicitly
   instructed).
3. Add a route to `src/routes.ts`:

   ```ts
   {
     path: '/my-new-preview',
     name: 'my-new-preview',
     component: () => import('@/pages/MyNewPreview.vue'),
     meta: {
       title: 'My new preview',
       summary: 'One-line description. Source-of-truth: this repo / spm-ts.',
       shell: 'V1',
     },
   }
   ```

4. The index page picks it up automatically — no edits needed there.
5. Use HR tokens from `src/tokens.css`. Never hardcode hex values
   (literals: `#ffffff` and `rgba(...)` shadow tints only).
6. Use HR stubs from `src/components/highrise/` — don't pull in new
   component libraries.

See `.cursor/rules/page-defaults.mdc` for the full conventions list.

## Repo layout

```
src/
├── shells/
│   ├── ShellV1/        ← visual port of spm-ts SideBar + TopBar
│   └── ShellV2/        ← Phase 2 placeholder
├── components/
│   └── highrise/       ← stubs of @platform-ui/highrise primitives
├── pages/              ← one .vue per preview
├── tokens.css          ← HR tokens, extracted from spm-ts node_modules
├── routes.ts
└── App.vue
```

## Migrating a page from spm-ts

1. `cp` the source `.vue` file into `src/pages/`.
2. Replace shell imports (`SideBarV2`, `TopBar`, `KickoffWidget`) with
   `import ShellV1 from '@/shells/ShellV1/index.vue'`.
3. Replace `import { ... } from '@platform-ui/highrise'` with
   `import { ... } from '@/components/highrise'`.
4. Wrap the page body in `<ShellV1 active="<nav-key>">…</ShellV1>`.
5. If the file uses `lang="scss"`, switch to plain `<style scoped>` —
   we don't run a SCSS preprocessor here.
6. Strip Vuex / Pinia store references (`$store.state…`); replace with
   sensible static defaults so the page renders without state.
7. **Do not edit copy or styles** — those stay byte-identical to the
   `spm-ts` source so devs can copy this back as the canonical
   implementation reference.

## Why this repo exists

Static HTML previews were great for quick mocks but couldn't share
chrome — every change to the sidebar meant editing N HTML files. They
also didn't double as a developer reference: porting them to Vue at
the end of the design cycle was a translation step that lost detail.

A Vue 3 + Vite repo on Vercel:

- **Stakeholders** click one URL and see the design in context.
- **Devs** read the source as the canonical Vue implementation —
  same component structure, same token usage, same icon set as
  production.
- **Designers** add a new page in 5 minutes by copy-pasting a route
  and a component.

Visual fidelity to production is the bar. Behavioral parity is not —
shells stub interactions (location switcher, search, profile menu) so
we don't drag in Vuex, Pendo, or platform packages.
