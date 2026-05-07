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
      summary: 'Add-Ons (Agency Marketplace)',
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
    path: '/sub-accounts',
    name: 'sub-accounts',
    component: () => import('@/pages/SubAccountsPage.vue'),
    meta: {
      title: 'Sub-Accounts',
      summary: 'Agency sub-accounts list. Source-of-truth: spm-ts ListAccounts.vue.',
      shell: 'V1',
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
    {
      path: '/coming-soon',
      name: 'coming-soon',
      component: () => import('@/pages/ComingSoonPage.vue'),
      meta: { title: 'Coming Soon' },
    },
    // Stub named routes referenced by vendored components (router-link :to="{ name: ... }").
    // Vue Router 4 throws when router-link can't resolve a name — those throws were
    // breaking the LocationListCard <h3><router-link>{{ name }}</router-link></h3> render.
    // Each route maps to ComingSoonPage so previews stay inert without surfacing 404s.
    { path: '/sub-account/:account_id', name: 'sub-account-detail', component: () => import('@/pages/ComingSoonPage.vue') },
    { path: '/sub-account-search', name: 'sub-account-search', component: () => import('@/pages/ComingSoonPage.vue') },
    { path: '/agency-labs', name: 'agency-labs', component: () => import('@/pages/ComingSoonPage.vue') },
    { path: '/location-transfer', name: 'location-transfer-page', component: () => import('@/pages/ComingSoonPage.vue') },
    { path: '/old-launchpad/:location_id', name: 'old-launchpad', component: () => import('@/pages/ComingSoonPage.vue') },
    { path: '/old-dashboard/:location_id', name: 'old-dashboard', component: () => import('@/pages/ComingSoonPage.vue') },
    { path: '/dashboard/:location_id', name: 'dashboard', component: () => import('@/pages/ComingSoonPage.vue') },
    // Catch-all: any path without a matching route lands on coming-soon.
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/ComingSoonPage.vue'),
    },
  ],
});
