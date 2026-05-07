<!--
  AppliedStep.vue
  ────────────────────────────────────────────────────────────────────────────
  Async-aware confirmation: the backend processes changes asynchronously,
  so instead of "Changes applied" we show "Changes submitted" with an ETA.
  Links to bulk action history for tracking.
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

    <p class="applied-step__body">
      {{ t('agency.bulkActions.updateFeatures.appliedAsyncBody', {
        x: totalChanges,
        y: selectedCount,
      }) }}
    </p>

    <p class="applied-step__eta">
      {{ t('agency.bulkActions.updateFeatures.appliedEta') }}
    </p>

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
  text-align: center;
  padding: 24px;
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

.applied-step__eta {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-500, #667085);
  line-height: 18px;
}
</style>
