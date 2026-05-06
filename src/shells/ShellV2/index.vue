<script lang="ts" setup>
  /*
   * ShellV2 — placeholder for the next-generation shell exploration.
   *
   * Phase 2 (per project plan) will explore tab-based / page-spanning
   * navigation patterns inside this shell. Until then, pages that
   * import ShellV2 will render this stub so the import works and so
   * stakeholders see a clear "not built yet" state instead of a broken
   * route.
   */
</script>

<template>
  <div class="shell-v2">
    <div class="shell-v2__placeholder">
      <i class="fas fa-tools shell-v2__icon" aria-hidden="true" />
      <h1 class="shell-v2__title">Shell V2 — coming in Phase 2</h1>
      <p class="shell-v2__copy">
        This is the placeholder for the next-gen shell. Phase 1 ships
        the Add-Ons preview wrapped in the legacy <code>ShellV1</code>
        chrome. Phase 2 will swap in tab-based navigation and the
        Page Tabs preview will live here.
      </p>
    </div>
    <slot />
  </div>
</template>

<style scoped>
  .shell-v2 {
    min-height: 100vh;
    background: var(--gray-50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
  }
  .shell-v2__placeholder {
    max-width: 480px;
    text-align: center;
    background: #ffffff;
    border: 1px dashed var(--gray-300);
    border-radius: 12px;
    padding: 32px 24px;
  }
  .shell-v2__icon {
    color: var(--gray-400);
    font-size: 28px;
    margin-bottom: 16px;
  }
  .shell-v2__title {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-900);
    letter-spacing: -0.01em;
  }
  .shell-v2__copy {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--gray-600);
  }
  .shell-v2__copy code {
    background: var(--gray-100);
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
</style>
