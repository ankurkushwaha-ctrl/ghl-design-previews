<script lang="ts" setup>
  /*
   * Preview directory. Pulls every entry from previewRoutes so adding
   * a route in src/routes.ts automatically lights it up here — no two
   * places to update.
   */
  import { previewRoutes } from '@/routes';

  const items = previewRoutes.map((r) => ({
    path: typeof r.path === 'string' ? r.path : '',
    title: (r.meta?.title as string) ?? (r.name as string) ?? '',
    summary: (r.meta?.summary as string) ?? '',
    shell: (r.meta?.shell as string) ?? '',
  }));
</script>

<template>
  <main class="index">
    <header class="index__header">
      <p class="index__eyebrow">GoHighLevel · Design previews</p>
      <h1 class="index__title">Design previews</h1>
      <p class="index__subtitle">
        Interactive mockups for stakeholder review. Each preview is a
        standalone Vue route. Source-of-truth for production code lives
        in <code>spm-ts</code>.
      </p>
    </header>

    <section class="index__list">
      <router-link
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="index__item"
      >
        <div class="index__item-top">
          <span class="index__item-title">{{ item.title }}</span>
          <span v-if="item.shell" class="index__item-shell">Shell {{ item.shell }}</span>
        </div>
        <p v-if="item.summary" class="index__item-summary">{{ item.summary }}</p>
        <span class="index__item-path">{{ item.path }}</span>
      </router-link>
    </section>

    <footer class="index__footer">
      Vue 3 + Vite + vue-router. HighRise tokens via
      <code>src/tokens.css</code>. See <code>README.md</code> for adding
      a new preview.
    </footer>
  </main>
</template>

<style scoped>
  .index {
    min-height: 100vh;
    background: var(--gray-50);
    padding: 64px 24px 48px;
    font-family: var(--hr-font-family-base);
    color: var(--gray-900);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .index__header {
    width: 100%;
    max-width: 720px;
    margin-bottom: 40px;
  }
  .index__eyebrow {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--gray-500);
  }
  .index__title {
    margin: 0 0 8px;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }
  .index__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--gray-600);
    line-height: 1.55;
    max-width: 600px;
  }
  .index__subtitle code,
  .index__footer code {
    background: var(--gray-100);
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
  }

  .index__list {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .index__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px 20px;
    background: #ffffff;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s ease, transform 0.15s ease,
      box-shadow 0.15s ease;
  }
  .index__item:hover {
    border-color: var(--primary-300);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.06);
  }
  .index__item:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }
  .index__item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .index__item-title {
    font-size: 15px;
    font-weight: 600;
  }
  .index__item-shell {
    font-size: 11px;
    font-weight: 600;
    color: var(--primary-700);
    background: var(--primary-50);
    padding: 2px 8px;
    border-radius: 999px;
    letter-spacing: 0.02em;
  }
  .index__item-summary {
    margin: 0;
    font-size: 13px;
    color: var(--gray-600);
    line-height: 1.5;
  }
  .index__item-path {
    font-size: 12px;
    color: var(--gray-500);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  .index__footer {
    margin-top: 48px;
    max-width: 720px;
    width: 100%;
    font-size: 12px;
    color: var(--gray-500);
    line-height: 1.5;
  }
</style>
