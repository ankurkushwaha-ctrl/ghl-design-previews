<!--
  AppliedStep.vue
  ────────────────────────────────────────────────────────────────────────────
  Async-aware confirmation: the backend processes changes asynchronously,
  so instead of "Changes applied" we show "Changes submitted" with an ETA.
  Two CTAs: back to sub-accounts list, or go to bulk action history.
-->
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { HLButton } from '@/components/highrise'
import { ClockRewindIcon } from '@gohighlevel/ghl-icons/24/outline'

defineProps<{
  totalChanges: number
  selectedCount: number
  untouchedCount: number
  totalFeatureCount: number
  isFullCoverage: boolean
}>()

const emit = defineEmits<{
  (e: 'done'): void
  (e: 'go-to-history'): void
}>()

const { t } = useI18n()

const primaryRef = ref<InstanceType<typeof HLButton> | null>(null)

const showContent = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() => {
    showContent.value = true
  })
  const el = primaryRef.value?.$el as HTMLElement | undefined
  el?.focus()
})
</script>

<template>
  <div class="applied-step" :class="{ 'applied-step--visible': showContent }">
    <!-- Animated success mark with ripple -->
    <div class="applied-step__mark-wrap">
      <div class="applied-step__ripple" aria-hidden="true" />
      <div class="applied-step__mark" aria-hidden="true">
        <svg class="applied-step__check-svg" viewBox="0 0 24 24" fill="none">
          <path
            class="applied-step__check-path"
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
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

    <div class="applied-step__eta-badge">
      <i class="fas fa-clock" />
      {{ t('agency.bulkActions.updateFeatures.appliedEta') }}
    </div>

    <div class="applied-step__actions">
      <HLButton ref="primaryRef" @click="emit('done')">
        Go to sub-accounts
      </HLButton>
      <HLButton variant="secondary" @click="emit('go-to-history')">
        <ClockRewindIcon class="h-4 w-4" />
        View bulk action history
      </HLButton>
    </div>
  </div>
</template>

<style scoped>
.applied-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 24px 24px;
  gap: 16px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.applied-step--visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Ripple + mark container ── */
.applied-step__mark-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.applied-step__ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--success-100, #d1fadf);
  animation: ripple-pulse 1.8s ease-out forwards;
}

@keyframes ripple-pulse {
  0% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.applied-step__mark {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--success-100, #d1fadf);
  color: var(--success-700, #027a48);
  animation: mark-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}

@keyframes mark-pop {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.applied-step__check-svg {
  width: 28px;
  height: 28px;
}

.applied-step__check-path {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: check-draw 0.4s ease 0.4s forwards;
}

@keyframes check-draw {
  to {
    stroke-dashoffset: 0;
  }
}

/* ── Text ── */
.applied-step__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-900, #101828);
}

.applied-step__body {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-600, #475467);
  line-height: 20px;
  max-width: 380px;
}

/* ── ETA badge ── */
.applied-step__eta-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 16px;
  background: var(--primary-50, #eff4ff);
  color: var(--primary-700, #004eeb);
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
}

.applied-step__eta-badge i {
  font-size: 12px;
}

/* ── CTAs ── */
.applied-step__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  width: 100%;
  max-width: 280px;
}

.applied-step__actions :deep(.hl-btn) {
  width: 100%;
  justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
  .applied-step {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .applied-step__ripple {
    animation: none;
    display: none;
  }
  .applied-step__mark {
    animation: none;
  }
  .applied-step__check-path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
