<script lang="ts" setup>
  /*
   * Stub of @platform-ui/highrise's HLTag. Unused by current pages but
   * listed in the rules. Tone-neutral default, semantic variants for
   * success / warning / error / info.
   */
  interface Props {
    type?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
  }

  withDefaults(defineProps<Props>(), {
    type: 'default',
    size: 'md',
  });
</script>

<template>
  <span class="hl-tag" :class="[`hl-tag--${type}`, `hl-tag--${size}`]">
    <slot />
  </span>
</template>

<style scoped>
  .hl-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 999px;
    font-weight: var(--hr-font-weight-semibold);
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .hl-tag--sm { height: 20px; padding: 0 8px; font-size: var(--hr-font-size-2xs); }
  .hl-tag--md { height: 22px; padding: 0 10px; font-size: var(--hr-font-size-xs); }

  .hl-tag--default { background: var(--gray-100); color: var(--gray-700); }
  .hl-tag--success { background: var(--success-50); color: var(--success-700); border: 1px solid var(--success-200); }
  .hl-tag--warning { background: var(--warning-100); color: var(--warning-800); }
  .hl-tag--error   { background: var(--error-50); color: var(--error-700); border: 1px solid var(--error-200); }
  .hl-tag--info    { background: var(--primary-50); color: var(--primary-700); border: 1px solid var(--primary-200); }
</style>
