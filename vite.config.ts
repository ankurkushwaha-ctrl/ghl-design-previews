import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Avoid `node:url` so we don't need @types/node as a devDependency.
// `URL` is a web-standard global (Node 18+ and any modern runtime),
// and `.pathname` gives us the absolute path to /src for alias resolution.
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
});
