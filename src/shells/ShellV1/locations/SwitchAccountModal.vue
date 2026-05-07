<!--
  SwitchAccountModal.vue
  ────────────────────────────────────────────────────────────────────────────
  Tiny modal that fakes the "switching to sub-account" loading dance:
    - Shows the sub-account name + a centered spinner
    - Auto-closes after ~1.5s and emits @switched
  We watch `show` so opening the modal restarts the timer cleanly each time.
-->
<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { UIModal, UIModalContent, UISpin } from '@gohighlevel/ghl-ui'

const props = defineProps<{
  show: boolean
  name: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'switched', name: string): void
}>()

const { t } = useI18n()

let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.show,
  (isShown) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (isShown) {
      timer = setTimeout(() => {
        emit('switched', props.name)
        emit('update:show', false)
        timer = null
      }, 1500)
    }
  }
)

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <UIModal
    :show="show"
    :width="380"
    :mask-closable="false"
    :close-on-esc="false"
    @update:show="(v) => emit('update:show', v)"
  >
    <UIModalContent>
      <div class="switch-modal">
        <UISpin :show="true" size="medium" />
        <div class="switch-modal__title">
          {{ t('switchingTo', { name }) }}
        </div>
        <div class="switch-modal__desc">
          {{ t('switchingDesc') }}
        </div>
      </div>
    </UIModalContent>
  </UIModal>
</template>

<style scoped>
.switch-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 8px 12px;
  gap: 12px;
}
.switch-modal__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900, #101828);
}
.switch-modal__desc {
  font-size: 14px;
  color: var(--gray-500, #667085);
  line-height: 1.5;
}
</style>
