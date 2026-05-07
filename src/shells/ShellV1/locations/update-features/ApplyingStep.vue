<!--
  ApplyingStep.vue
  ────────────────────────────────────────────────────────────────────────────
  Center-stage spinner + progress bar shown while the mutation is in flight.

  The mutation is fired by the parent at the transition INTO this state.
  This component is purely visual — it receives the numbers for copy and
  displays a CSS-animated progress bar (5% → 100% over ~1.4s).

  Error UI is NOT in scope for v1. The parent catches errors and should
  display them here; a clear TODO comment marks the failure-path so it's
  discoverable (per brief: "don't fake a success").
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  totalChanges: number
  selectedCount: number
}>()

const { t } = useI18n()
</script>

<template>
  <div class="applying-step">
    <!-- Spinner — 32px, info color -->
    <div class="applying-step__spinner" aria-hidden="true" />

    <h2 class="applying-step__title">
      {{ t('agency.bulkActions.updateFeatures.applyingTitle') }}
    </h2>

    <p class="applying-step__body">
      {{
        t('agency.bulkActions.updateFeatures.applyingBody', {
          x: totalChanges,
          y: selectedCount,
        })
      }}
    </p>

    <!-- Progress bar: 5% → 100% CSS animation over 1.4s -->
    <div class="applying-step__track">
      <div class="applying-step__bar" />
    </div>
  </div>
</template>

<style scoped>
.applying-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  gap: 12px;
}

/* ─── Spinner ────────────────────────────────────────────────────────── */
.applying-step__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--primary-100, #d1e0ff);
  border-top-color: var(--primary-600, #155eef);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Copy ───────────────────────────────────────────────────────────── */
.applying-step__title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.applying-step__body {
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-600, #475467);
  line-height: 18px;
}

/* ─── Progress bar ───────────────────────────────────────────────────── */
.applying-step__track {
  width: 220px;
  height: 6px;
  background: var(--gray-100, #f2f4f7);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 4px;
}

.applying-step__bar {
  height: 100%;
  background: var(--primary-500, #2970ff);
  border-radius: 999px;
  animation: progress-fill 1.4s ease-out forwards;
}

@keyframes progress-fill {
  from { width: 5%; }
  to   { width: 100%; }
}
</style>
