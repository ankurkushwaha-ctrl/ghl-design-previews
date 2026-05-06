import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';

// `URL.pathname` gives us the absolute path to /src for alias resolution
// without needing @types/node as a devDependency.
const srcPath = new URL('./src', import.meta.url).pathname;

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  // Mirrors spm-ts/vite.config.ts: an inline PostCSS config that runs only
  // Tailwind. spm-ts also ships a postcss.config.js (with tailwindcss/nesting
  // and autoprefixer), but the inline `css.postcss.plugins` here shadows
  // the file in Vite. Keeping that exact pattern so our pipeline matches
  // prod's actual effective behavior — even though the postcss.config.js
  // file ends up unused at build time.
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
