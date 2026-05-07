<!--
  AppliedStep.vue
  ────────────────────────────────────────────────────────────────────────────
  Center-stage success mark (~44px circle, success-tinted background).
  Reinforces the patch contract in the summary copy:

    Partial: "[X] feature changes across [Y] sub-accounts. The other [Z]
              features kept their existing settings on each sub-account."
    Full:    "All [Total] features were configured uniformly across [Y]
              sub-accounts. [X] feature toggles changed."

  A primary "Done" button returns to idle (modal dismissed).
  Focus moves to the Done button on mount per brief's focus management
  section.
-->
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { HLButton } from '@/components/highrise'

const props = defineProps<{
  totalChanges: number
  selectedCount: number
  untouchedCount: number
  totalFeatureCount: number
  isFullCoverage: boolean
}>()

const emit = defineEmits<{
  (e: 'done'): void
}>()

const { t } = useI18n()

const doneRef = ref<InstanceType<typeof HLButton> | null>(null)

onMounted(async () => {
  await nextTick()
  const el = doneRef.value?.$el as HTMLElement | undefined
  el?.focus()
})

const bodyText = (() => {
  if (props.isFullCoverage) {
    return t('agency.bulkActions.updateFeatures.appliedBodyFull', {
      total: props.totalFeatureCount,
      x: props.totalChanges,
      y: props.selectedCount,
    })
  }
  return t('agency.bulkActions.updateFeatures.appliedBodyPartial', {
    x: props.totalChanges,
    y: props.selectedCount,
    z: props.untouchedCount,
  })
})()
</script>

<template>
  <div class="applied-step">
    <!-- Success mark -->
    <div class="applied-step__mark" aria-hidden="true">
      <i class="fas fa-check" />
    </div>

    <h2 class="applied-step__title">
      {{ t('agency.bulkActions.updateFeatures.appliedTitle') }}
    </h2>

    <p class="applied-step__body">{{ bodyText }}</p>

    <HLButton ref="doneRef" @click="emit('done')">
      {{ t('agency.bulkActions.updateFeatures.appliedDone') }}
    </HLButton>
  </div>
</template>

<style scoped>
.applied-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  gap: 12px;
}

.applied-step__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--success-100, #d1fadf);
  color: var(--success-700, #027a48);
}

.applied-step__title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.applied-step__body {
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-600, #475467);
  line-height: 18px;
  max-width: 380px;
}

</style>
