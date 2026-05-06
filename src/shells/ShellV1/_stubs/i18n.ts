/*
 * i18n stub — replaces `spm-ts/src/localization/index.ts` for vendored shell
 * components.
 *
 * Why a stub: upstream's localization module pulls in axios retry config,
 * locale lazy-loading, a Vuex coupling, and a Sentry-aware error path. None
 * of that is needed for an English-only design preview. We keep the EXPORT
 * SHAPE byte-identical to upstream so vendored components do `i18n.global.t(...)`
 * exactly as they do in spm-ts, only the import path changes:
 *
 *     // upstream (spm-ts):
 *     import { i18n } from '../../../localization'
 *     // here:
 *     import { i18n } from '../_stubs/i18n'
 *
 * This file also defines the same vue-i18n instance that's installed as a
 * Vue plugin in src/main.ts, so `$t('key')` in <template> resolves to the
 * same dictionary as `i18n.global.t('key')` in <script>.
 *
 * Adding a new translation key:
 *   1. Append it to `messages.en_US` below.
 *   2. Reference it in your component as `$t('namespace.key')` or
 *      `i18n.global.t('namespace.key')`.
 *   3. Missing keys render the key string itself (see `missing` handler) —
 *      that makes gaps visible instead of silent.
 */
import { createI18n } from 'vue-i18n';

/*
 * String provenance:
 *
 *   [verified] — copied verbatim from `spm-ts/src/locales/en.json`. Cite the
 *                line number so re-checking is mechanical when upstream
 *                edits the file.
 *
 *   [inferred] — production source is the remote localization API
 *                (`${localizationApiURL}/en_US/?module=common`), which the
 *                preview repo doesn't fetch from. The string here is a
 *                plausible English default chosen to match the visible UI
 *                role. Surface to the designer if any string looks wrong;
 *                they can paste the canonical string from a live prod
 *                screenshot.
 */
const messages = {
  en_US: {
    common: {
      // [verified] spm-ts/src/locales/en.json:1569
      search_icon: 'search icon',
      // [verified] spm-ts/src/locales/en.json:1532
      quick_actions_icon: 'Quick actions icon',

      locationSwitcher: {
        // [inferred] used as the agency-mode placeholder text.
        clickToSwitch: 'Click to switch',
        // [inferred] used as the dropdown's search input placeholder.
        searchPlaceholder: 'Search Locations',
        // [inferred] CTA above the location list when a location is active.
        switchToAgency: 'Switch to Agency view',
        // [inferred] section heading in the dropdown.
        recent: 'RECENT',
        // [inferred] section heading in the dropdown.
        allAccounts: 'ALL ACCOUNTS',
      },

      globalSearch: {
        // [inferred] placeholder text in the sidebar's search opener.
        sidebarPlaceholder: 'Search...',
        // [inferred] tooltip text on Mac. Currently unused (v-tooltip not
        // registered in this preview).
        macOpenShortcut: 'Search (⌘K)',
        // [inferred] tooltip text on Windows.
        windowOpenShortcut: 'Search (Ctrl+K)',
      },

      quickActions: {
        // [inferred] visible label next to the lightning-bolt icon, and
        // also the heading inside the dropdown.
        title: 'Quick actions',
      },
    },
    pmd: {
      // [verified] spm-ts/src/locales/en.json:4009
      k: 'K',
    },
  },
};

export const i18n = createI18n({
  // Mirrors spm-ts createI18n options. `legacy: false` is what enables the
  // composition-API style; `globalInjection: true` is what makes `$t()`
  // resolve in templates without per-component setup.
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',
  silentFallbackWarn: true,
  globalInjection: true,
  messages,
  missing: (_, key) => key,
});
