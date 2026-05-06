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

const messages = {
  en_US: {
    common: {
      locationSwitcher: {
        clickToSwitch: 'Click to switch',
        searchPlaceholder: 'Search Locations',
        switchToAgency: 'Switch to Agency view',
        recent: 'RECENT',
        allAccounts: 'ALL ACCOUNTS',
      },
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
