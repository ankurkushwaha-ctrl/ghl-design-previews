/*
 * Ambient type shims for non-TS imports.
 *
 * Why this file diverges from spm-ts/src/shims-vue.d.ts:
 *
 *   spm-ts declares `'*.svg'` as `string`, even though it uses
 *   vite-svg-loader (which makes SVG imports resolve to Vue components at
 *   runtime). They get away with the wrong typing because their build
 *   pipeline is `vite build` only — they don't run `vue-tsc`. So a
 *   `<AgencyMarkerIcon class="..." />` in a template silently works at
 *   runtime even though TS thinks the import is a string.
 *
 *   Our build runs `vue-tsc --noEmit && vite build`, so the wrong typing
 *   surfaces as a real error. We declare `'*.svg'` as `DefineComponent`,
 *   which matches actual runtime behavior under vite-svg-loader. If a
 *   future preview ever wants the URL-string form, it can use
 *   `'*.svg?url'` (Vite's built-in URL-suffix convention) which we shim
 *   below.
 */
declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module '*.svg?url' {
  const url: string;
  export default url;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}
