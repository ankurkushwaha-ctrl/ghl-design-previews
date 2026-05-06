import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';

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

createApp(App).use(router).mount('#app');
