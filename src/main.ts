import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
import { i18n } from './shells/ShellV1/_stubs/i18n';
import store from './shells/ShellV1/_stubs/store';

// Mirrors spm-ts/src/bootstrap.ts: Tailwind directives are mounted globally
// from the entry. The file itself is vendored verbatim (under the same
// assets/pmd/css path spm-ts uses) so any `@tailwind` directive changes
// upstream merge cleanly here.
import './assets/pmd/css/tailwind.css';

// HighRise design tokens (extracted from @platform-ui/highrise/dist/style.css).
// Loaded after Tailwind so HR's CSS variables sit on top of Tailwind's base
// reset — neither file selector-conflicts with the other, but order is
// kept explicit for predictability.
import './tokens.css';

// @gohighlevel/ghl-ui's compiled stylesheet — required for UIHeader, UIAlert,
// UIDatepicker, UIDropdown, UICard, etc. to render correctly. Loaded after
// HR tokens so the ghl-ui rules win where the two overlap.
import '@gohighlevel/ghl-ui/dist/style.css';

// vue-i18n is registered as a plugin so vendored shell templates can use
// `$t('key')` exactly the way they do in spm-ts. Same instance is exported
// from the stub for `i18n.global.t(key)` calls inside <script>.
createApp(App).use(router).use(i18n).use(store).mount('#app');
