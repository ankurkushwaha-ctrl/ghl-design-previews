<!--
  ActionChip.vue
  ────────────────────────────────────────────────────────────────────────────
  Enable / Disable toggle using the HighRise Toggle Switch (sm size).

  Click flips the action. The toggle track visually distinguishes state:
    - Enable  → blue track (on), thumb right
    - Disable → gray track (off), thumb left

  Text label always accompanies the toggle so color is never the only signal.

  Follows HIGHRISE_DS.md Toggle Switch spec exactly:
    - sm track: 28×16px, border-radius 10px
    - sm thumb: 12×12px, 2px padding
    - on track: --color/primary/blue/600 (#155EEF)
    - off track: --color/neutral/gray/100 (#F2F4F7)
    - hover, focus, and transition per spec
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { FeatureAction } from './types'

defineProps<{
  action: FeatureAction
}>()

const emit = defineEmits<{
  (e: 'flip'): void
}>()

const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="action-chip"
    :class="{ 'action-chip--on': action === 'enable' }"
    :aria-label="t('agency.bulkActions.updateFeatures.chipAria')"
    @click="emit('flip')"
  >
    <span class="action-chip__track">
      <span class="action-chip__thumb" />
    </span>
    <span class="action-chip__label">
      {{ action === 'enable' ? 'Enable' : 'Disable' }}
    </span>
  </button>
</template>

<style scoped>
.action-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 4px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background 0.12s ease;
  user-select: none;
}

.action-chip:hover {
  background: var(--gray-50, #f9fafb);
}

.action-chip:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

/* ── Toggle track (sm: 28×16px per HighRise spec) ─────────── */
.action-chip__track {
  position: relative;
  display: flex;
  align-items: center;
  width: 28px;
  height: 16px;
  padding: 2px;
  border-radius: 10px;
  background: var(--gray-100, #f2f4f7);
  transition: background 150ms ease;
  flex-shrink: 0;
}

.action-chip--on .action-chip__track {
  background: var(--primary-600, #155eef);
}

.action-chip:hover .action-chip__track {
  background: var(--gray-200, #eaecf0);
}

.action-chip--on:hover .action-chip__track {
  background: var(--primary-700, #004eeb);
}

/* ── Thumb (sm: 12×12px per HighRise spec) ────────────────── */
.action-chip__thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--base-white, #ffffff);
  box-shadow:
    0px 1px 3px 0px rgba(16, 24, 40, 0.1),
    0px 1px 2px 0px rgba(16, 24, 40, 0.06);
  transition: transform 150ms ease;
  flex-shrink: 0;
}

.action-chip--on .action-chip__thumb {
  transform: translateX(12px);
}

/* ── Label ────────────────────────────────────────────────── */
.action-chip__label {
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: var(--gray-700, #344054);
}

.action-chip--on .action-chip__label {
  color: var(--primary-700, #004eeb);
}
</style>
