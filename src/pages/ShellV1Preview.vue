<script lang="ts" setup>
  /*
   * ShellV1 with no page content — for stakeholders who want to review
   * just the chrome (sidebar + topbar) without a particular page on top.
   * Renders a quiet "your page here" placeholder in the content area.
   */
  import ShellV1 from '@/shells/ShellV1/index.vue';
</script>

<template>
  <ShellV1>
    <div class="shellv1-preview">
      <div class="shellv1-preview__placeholder">
        <i class="fas fa-square shellv1-preview__icon" aria-hidden="true" />
        <h1 class="shellv1-preview__title">ShellV1 — chrome only</h1>
        <p class="shellv1-preview__copy">
          This route renders <code>&lt;ShellV1&gt;</code> with no page
          content. Use it to review the sidebar and topbar in isolation,
          or to screenshot the chrome alongside production for a fidelity
          check.
        </p>
        <p class="shellv1-preview__copy">
          Try collapsing the sidebar via the green pill on the right edge.
          Hover the nav items. The location pill, search pill, and topbar
          buttons are visual-only — clicking does nothing.
        </p>
      </div>
    </div>
  </ShellV1>
</template>

<style scoped>
  .shellv1-preview {
    min-height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
  }
  .shellv1-preview__placeholder {
    max-width: 480px;
    text-align: center;
    background: #ffffff;
    border: 1px dashed var(--gray-300);
    border-radius: 12px;
    padding: 32px 24px;
  }
  .shellv1-preview__icon {
    color: var(--gray-300);
    font-size: 24px;
    margin-bottom: 16px;
  }
  .shellv1-preview__title {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-900);
    letter-spacing: -0.01em;
  }
  .shellv1-preview__copy {
    margin: 0 0 12px;
    font-size: 13px;
    line-height: 1.5;
    color: var(--gray-600);
  }
  .shellv1-preview__copy:last-child { margin-bottom: 0; }
  .shellv1-preview__copy code {
    background: var(--gray-100);
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
  }
</style>
