import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

/*
 * Each preview is a single route. Pattern:
 *   - kebab-case path
 *   - lazy-loaded component (keeps initial bundle small as previews grow)
 *   - meta.title used by the index page listing
 *
 * To add a new preview: drop a file in src/pages/, add an entry below,
 * and update src/pages/IndexPage.vue's listing.
 */
export const previewRoutes: RouteRecordRaw[] = [
  {
    path: '/add-ons',
    name: 'add-ons',
    component: () => import('@/pages/AddOnsPage.vue'),
    meta: {
      title: 'Add-Ons',
      summary: 'Agency-side add-ons marketplace. Source-of-truth: spm-ts.',
      shell: 'V1',
    },
  },
  {
    path: '/page-tabs',
    name: 'page-tabs',
    component: () => import('@/pages/PageTabs.vue'),
    meta: {
      title: 'Page Tabs',
      summary: 'Phase 2 mockup migrated from SAAS/page-tabs.html. (Placeholder.)',
      shell: 'V2',
    },
  },
  {
    path: '/shells/v1',
    name: 'shell-v1',
    component: () => import('@/pages/ShellV1Preview.vue'),
    meta: {
      title: 'Shell V1 (standalone)',
      summary: 'ShellV1 with empty content — for reviewing the shell on its own.',
      shell: 'V1',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/IndexPage.vue'),
      meta: { title: 'Previews' },
    },
    ...previewRoutes,
  ],
});
