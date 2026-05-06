/*
 * Vuex store stub — replaces `spm-ts/src/store/index.ts` for vendored shell
 * components.
 *
 * Upstream's store has hundreds of modules, dispatched actions, and
 * permission getters. We don't need any of that to render a static design
 * preview — we just need `useStore()` to return an object with the small
 * subset of `state.*` paths and `getters.*` keys that the vendored
 * components actually read in their templates.
 *
 * Scope of this preview:
 *   - User context: agency-admin (no specific location selected)
 *   - Sidebar: expanded (not collapsed)
 *   - Add-Ons page: the active route
 *
 * Everything below is hardcoded to that scope. As more components are
 * ported in subsequent slices, append new keys to `state` / `getters` —
 * always with a comment pointing at the upstream file/line that originally
 * produced the value, so the divergence stays auditable.
 *
 *     // upstream (spm-ts):
 *     import { useStore } from '@/store'
 *     // here:
 *     import { useStore } from '../_stubs/store'
 */
import { reactive, readonly } from 'vue';

interface PreviewStoreState {
  manualCollapseSidebar: boolean;
  // From spm-ts/src/store/location.ts: the currently-active sub-account.
  // For an agency-level view this is undefined.
  locations: {
    currentLocation: undefined;
  };
  // From spm-ts/src/store/user.ts: the logged-in user.
  // Hardcoded to an agency-admin so QuickActions/TopBar render the right
  // controls when those slices land.
  user: {
    user: {
      id: 'preview-user',
      type: 'agency';
      name: 'Preview User';
      email: 'preview@example.com';
      pinnedLocations: [];
    };
  };
}

const state: PreviewStoreState = reactive({
  manualCollapseSidebar: false,
  locations: {
    currentLocation: undefined,
  },
  user: {
    user: {
      id: 'preview-user',
      type: 'agency',
      name: 'Preview User',
      email: 'preview@example.com',
      pinnedLocations: [],
    },
  },
});

// Vuex `getters` are accessed as `store.getters.foo` or `store.getters['ns/foo']`.
// We expose them as a plain object — the same access pattern works.
const getters = {
  // Sidebar: true when the user has manually collapsed it.
  // upstream: spm-ts/src/store/index.ts → getManualCollapseSidebar
  get getManualCollapseSidebar() {
    return state.manualCollapseSidebar;
  },

  // Recent locations from localStorage. Empty in this preview.
  // upstream: spm-ts/src/store/location.ts → getRecentVisitedLocations
  getRecentVisitedLocations: [] as unknown[],

  // Namespaced company info. The shell only references this in setup() returns
  // it doesn't read in templates, so an empty object suffices.
  // upstream: spm-ts/src/store/company.ts → company/get
  'company/get': {},

  // Permission gates default to true so any feature-flagged nav row renders.
  // upstream: spm-ts/src/store/permissions/* → hasPermission, hasFeature, etc.
  // Add specific keys here as they're discovered in vendored components.
};

const store = {
  state: readonly(state) as unknown as PreviewStoreState,
  getters,
  // Action/mutation dispatch is a no-op resolved-promise — vendored
  // components await these in onMounted hooks but don't read the result
  // in any code path that affects rendering for our scope.
  dispatch: async (_action: string, _payload?: unknown) => undefined,
  commit: (mutation: string, payload?: unknown) => {
    if (mutation === 'setManualCollapseSidebar' && typeof payload === 'boolean') {
      state.manualCollapseSidebar = payload;
    }
  },
};

export function useStore() {
  return store;
}

// Some upstream files do `import store from '@/store'` (default) instead of
// `import { useStore } from '@/store'` — we re-export the same instance as
// default to keep both forms working.
export default store;
