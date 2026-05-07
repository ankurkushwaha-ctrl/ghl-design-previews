<!--
  RecipeRow.vue
  ────────────────────────────────────────────────────────────────────────────
  One row inside the recipe list:
    [action chip]   feature name        [×]
                    impact line (12px secondary)

  Impact wording follows the brief:
    - Has change   → "Affects X of Total sub-accounts (Y already on/off)"
                     (omit parenthetical when Y is 0)
    - No-op        → "Already on/off across all Total sub-accounts — no change"
                     (whole row dims to ~55% opacity)

  No breadcrumbs on the row — group context lives in the picker only,
  per brief.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionChip from './ActionChip.vue'
import type { Feature, Impact, RecipeEntry } from './types'

const props = defineProps<{
  entry: RecipeEntry
  feature: Feature
  impact: Impact
}>()

const emit = defineEmits<{
  (e: 'flip'): void
  (e: 'remove'): void
}>()

const { t } = useI18n()

const isNoOp = computed(() => props.impact.willChange === 0)

/** State word in the impact line, in the orientation the user picked. */
const stateWord = computed(() =>
  props.entry.action === 'enable'
    ? t('agency.bulkActions.updateFeatures.stateOn')
    : t('agency.bulkActions.updateFeatures.stateOff'),
)

/**
 * For change rows: how many sub-accounts are ALREADY in the chosen state
 * (these don't need a toggle — they're the "Y already on/off" parenthetical).
 *   - action=enable  → alreadyAtTarget = alreadyOn
 *   - action=disable → alreadyAtTarget = alreadyOff
 */
const alreadyAtTarget = computed(() =>
  props.entry.action === 'enable' ? props.impact.alreadyOn : props.impact.alreadyOff,
)

const impactLine = computed(() => {
  if (isNoOp.value) {
    return t('agency.bulkActions.updateFeatures.rowImpactNoOp', {
      state: stateWord.value,
      total: props.impact.total,
    })
  }
  if (alreadyAtTarget.value === 0) {
    return t('agency.bulkActions.updateFeatures.rowImpactChangeNoParen', {
      x: props.impact.willChange,
      total: props.impact.total,
    })
  }
  return t('agency.bulkActions.updateFeatures.rowImpactChange', {
    x: props.impact.willChange,
    total: props.impact.total,
    y: alreadyAtTarget.value,
    state: stateWord.value,
  })
})

const removeAria = computed(() =>
  t('agency.bulkActions.updateFeatures.removeRowAria', { name: props.feature.name }),
)
</script>

<template>
  <div
    class="recipe-row"
    :class="{ 'recipe-row--noop': isNoOp }"
  >
    <div class="recipe-row__info">
      <div class="recipe-row__name">{{ feature.name }}</div>
      <div class="recipe-row__impact">{{ impactLine }}</div>
    </div>

    <div class="recipe-row__actions">
      <ActionChip :action="entry.action" @flip="emit('flip')" />
      <button
        type="button"
        class="recipe-row__remove"
        :aria-label="removeAria"
        @click="emit('remove')"
      >
        <i class="fas fa-times" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.recipe-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  transition: opacity 0.15s ease;
}

.recipe-row + .recipe-row {
  border-top: 0.5px solid var(--gray-200, #eaecf0);
}

.recipe-row--noop {
  opacity: 0.55;
}

.recipe-row__info {
  min-width: 0;
  flex: 1 1 auto;
}

.recipe-row__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.recipe-row__name {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--gray-900, #101828);
}

.recipe-row__impact {
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  color: var(--gray-500, #667085);
}

.recipe-row__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: var(--gray-500, #667085);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}

.recipe-row__remove:hover {
  background: var(--gray-100, #f2f4f7);
  color: var(--gray-700, #344054);
}

.recipe-row__remove:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}
</style>
