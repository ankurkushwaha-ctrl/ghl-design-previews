<!--
  UntouchedCallout.vue
  ────────────────────────────────────────────────────────────────────────────
  Soft-secondary panel below the recipe list.

  Reinforces the patch contract in plain language. Two wordings:
    - Partial coverage: "[X] changes pending across [Y] sub-accounts. [Z]
                         other features will not be touched — each sub-account
                         keeps whatever it currently has."
    - Full coverage:    "All [Total] features are configured below — every
                         sub-account will be brought to this exact configuration.
                         [X] changes will be applied across [Y] sub-accounts."

  Numbers render emphasized (gray-900, weight 500) against the otherwise
  secondary-text body so the eye lands on the magnitudes first.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  totalChanges: number
  selectedCount: number
  untouchedCount: number
  totalFeatureCount: number
  isFullCoverage: boolean
}>()

const { t } = useI18n()

/**
 * The untouched-note copy intentionally weaves the numbers into a
 * sentence. Splitting it into multiple keys + manual joining loses the
 * sentence rhythm and is harder to translate. We use vue-i18n's
 * interpolation, then in the template we'd ideally bold the numbers —
 * but a single-string approach keeps i18n clean. As a compromise we
 * style the whole sentence in secondary text and let the numbers stand
 * out via their context (they're the only digits in view).
 */
const text = computed(() => {
  if (props.isFullCoverage) {
    return t('agency.bulkActions.updateFeatures.untouchedFull', {
      total: props.totalFeatureCount,
      x: props.totalChanges,
      y: props.selectedCount,
    })
  }
  return t('agency.bulkActions.updateFeatures.untouchedPartial', {
    x: props.totalChanges,
    y: props.selectedCount,
    z: props.untouchedCount,
  })
})
</script>

<template>
  <div class="untouched-callout">
    {{ text }}
  </div>
</template>

<style scoped>
.untouched-callout {
  margin-top: 12px;
  padding: 12px 14px;
  background: var(--primary-25, #f5f8ff);
  border: 1px solid var(--primary-100, #d1e0ff);
  border-radius: 8px;
  font-size: 13px;
  line-height: 18px;
  color: var(--gray-600, #475467);
}
</style>
