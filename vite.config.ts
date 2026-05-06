import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import tailwindcss from 'tailwindcss';

// `URL.pathname` gives us the absolute path to /src for alias resolution
// without needing @types/node as a devDependency.
const srcPath = new URL('./src', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    vue(),
    // Mirrors spm-ts/vite.config.ts: turns `import Icon from 'foo.svg'` into
    // a Vue component instead of a URL string. The svgo overrides below
    // are byte-identical to spm-ts so SVGs preserve viewBox + element ids
    // when used as inline components.
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
              },
            },
          },
        ],
      },
    }),
  ],
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
