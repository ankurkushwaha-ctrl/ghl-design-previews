<!--
  ConfirmStep.vue
  ────────────────────────────────────────────────────────────────────────────
  Replaces the modal body with a centered review summary card before the
  user commits. Per brief:

    Apply these changes?

    [X] changes across [Y] sub-accounts. [Z] other features will not
    be touched.

    [Enable]  Email Marketing             5 of 12
    [Enable]  Trigger Links               10 of 12
    ... only entries where willChange > 0 ...

                          [Back]  [Confirm and apply]

  No-op rows are deliberately omitted from the per-feature summary —
  showing them would suggest the user is doing something they're not.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { HLButton } from '@/components/highrise'
import ActionChip from './ActionChip.vue'
import { entriesWithChange } from './recipe'
import type {
  CurrentStateBySubAccount,
  Feature,
  Recipe,
} from './types'

const props = defineProps<{
  recipe: Recipe
  features: Map<string, Feature>
  selectedCount: number
  currentState: CurrentStateBySubAccount
  totalChanges: number
  untouchedCount: number
  totalFeatureCount: number
  isFullCoverage: boolean
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'apply'): void
}>()

const { t } = useI18n()

const subtitle = computed(() => {
  if (props.isFullCoverage) {
    return t('agency.bulkActions.updateFeatures.confirmSubtitleFull', {
      total: props.totalFeatureCount,
      x: props.totalChanges,
      y: props.selectedCount,
    })
  }
  return t('agency.bulkActions.updateFeatures.confirmSubtitlePartial', {
    x: props.totalChanges,
    y: props.selectedCount,
    z: props.untouchedCount,
  })
})

const summaryRows = computed(() =>
  entriesWithChange(props.recipe, props.selectedCount, props.currentState),
)
</script>

<template>
  <div class="confirm-step">
    <h2 class="confirm-step__title">
      {{ t('agency.bulkActions.updateFeatures.confirmTitle') }}
    </h2>

    <p class="confirm-step__subtitle">{{ subtitle }}</p>

    <div class="confirm-step__rows" role="list">
      <div
        v-for="row in summaryRows"
        :key="row.entry.featureId"
        class="confirm-step__row"
        role="listitem"
      >
        <ActionChip :action="row.entry.action" @flip="undefined" />
        <span class="confirm-step__row-name">
          {{ features.get(row.entry.featureId)?.name ?? row.entry.featureId }}
        </span>
        <span class="confirm-step__row-count">
          <span class="confirm-step__row-before">{{ row.impact.alreadyOn }}</span>
          <span class="confirm-step__row-arrow" aria-hidden="true"> → </span>
          <span class="confirm-step__row-after">{{
            row.entry.action === 'enable'
              ? row.impact.alreadyOn + row.impact.willChange
              : row.impact.alreadyOn - row.impact.willChange
          }}</span>
          <span class="confirm-step__row-total"> of {{ row.impact.total }}</span>
        </span>
      </div>
    </div>

    <div class="confirm-step__actions">
      <HLButton variant="secondary" @click="emit('back')">
        {{ t('agency.bulkActions.updateFeatures.confirmBack') }}
      </HLButton>
      <HLButton @click="emit('apply')">
        {{ t('agency.bulkActions.updateFeatures.confirmApply') }}
      </HLButton>
    </div>
  </div>
</template>

<style scoped>
.confirm-step {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px 4px 4px;
}

.confirm-step__title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.confirm-step__subtitle {
  margin: 8px 0 16px;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-600, #475467);
  line-height: 18px;
}

.confirm-step__rows {
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
}

.confirm-step__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
}

.confirm-step__row + .confirm-step__row {
  border-top: 0.5px solid var(--gray-200, #eaecf0);
}

.confirm-step__row-name {
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-900, #101828);
}

.confirm-step__row-count {
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.confirm-step__row-before {
  color: var(--gray-400, #98a2b3);
}

.confirm-step__row-arrow {
  color: var(--gray-400, #98a2b3);
}

.confirm-step__row-after {
  color: var(--gray-900, #101828);
}

.confirm-step__row-total {
  color: var(--gray-500, #667085);
}

.confirm-step__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

</style>
