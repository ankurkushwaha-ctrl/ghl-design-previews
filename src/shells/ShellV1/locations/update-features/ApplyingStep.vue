<!--
  ApplyingStep.vue
  ────────────────────────────────────────────────────────────────────────────
  Brief "Submitting…" state shown while the API request fires. Displays a
  spinner — no fake progress bar, since the real backend processes changes
  asynchronously.
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
</style>
