<script lang="ts" setup>
  /*
   * Stub of @platform-ui/highrise's HLButton.
   * Currently unused by any migrated page, but listed in the rules so
   * pages have something to import. Add variants/sizes as needs come up.
   */
  interface Props {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
  });
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="hl-btn"
    :class="[`hl-btn--${variant}`, `hl-btn--${size}`]"
  >
    <slot />
  </button>
</template>

<style scoped>
  .hl-btn {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    font-family: inherit;
    font-weight: var(--hr-font-weight-semibold);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .hl-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .hl-btn:focus-visible { outline: 2px solid var(--primary-600); outline-offset: 2px; }

  .hl-btn--sm { height: 32px; padding: 0 12px; font-size: var(--hr-font-size-md); }
  .hl-btn--md { height: 40px; padding: 0 16px; font-size: var(--hr-font-size-lg); }
  .hl-btn--lg { height: 48px; padding: 0 20px; font-size: var(--hr-font-size-2xl); }

  .hl-btn--primary {
    background: var(--primary-600);
    border: 1px solid var(--primary-600);
    color: var(--base-white);
  }
  .hl-btn--primary:hover:not(:disabled) {
    background: var(--blue-800);
    border-color: var(--blue-800);
  }

  .hl-btn--secondary {
    background: var(--base-white);
    border: 1px solid var(--gray-300);
    color: var(--gray-900);
  }
  .hl-btn--secondary:hover:not(:disabled) {
    background: var(--gray-50);
    border-color: var(--gray-400);
  }

  .hl-btn--tertiary {
    background: transparent;
    border: 1px solid transparent;
    color: var(--primary-600);
  }
  .hl-btn--tertiary:hover:not(:disabled) {
    color: var(--blue-800);
  }
</style>
