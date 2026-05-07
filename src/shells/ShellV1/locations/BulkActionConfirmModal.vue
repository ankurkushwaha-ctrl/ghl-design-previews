<!--
  BulkActionConfirmModal.vue
  ────────────────────────────────────────────────────────────────────────────
  Generic "are you sure?" modal used by:
    - Bulk Actions row → after picking an action from the dropdown
    - Card 3-dot menu → after picking Suspend / Resume / Delete / etc.

  We reuse one modal so visual polish stays consistent across both surfaces.
  Caller controls visibility via v-model:show, and reads the result via
  the `@confirm` event (we don't fire `@confirm` for cancel).

  UX-audit fix (2026-05-07):
   - [N5] Error prevention — the destructive variant now uses a stronger
     title, names what's being lost ("contacts, conversations, reporting
     data"), explicitly says it cannot be undone, and the positive button
     re-states the destructive action ("Yes, delete N sub-accounts") so a
     mis-click can't fly past muscle memory. Pattern reference: GitHub
     "Delete repository" confirm + Linear destructive modals.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UIModal,
  UIModalContent,
  UIModalFooter,
  UIModalHeader,
} from '@gohighlevel/ghl-ui'

const props = defineProps<{
  show: boolean
  action: string
  /** Either a single sub-account name or a count for bulk operations. */
  targetName?: string
  count?: number
  /** When true, the positive button uses the 'error' (red) treatment. */
  destructive?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'confirm'): void
}>()

const { t } = useI18n()

const title = computed(() => {
  if (props.destructive && props.targetName) {
    return t('confirmDestructiveCardTitle', { name: props.targetName })
  }
  if (props.destructive) {
    return t('confirmDestructiveBulkTitle', { count: props.count ?? 0 })
  }
  if (props.targetName) {
    return t('confirmCardTitle', { action: props.action, name: props.targetName })
  }
  return t('confirmBulkTitle', {
    action: props.action,
    count: props.count ?? 0,
  })
})

const body = computed(() => {
  if (props.destructive && props.targetName) {
    return t('confirmDestructiveCardBody', { name: props.targetName })
  }
  if (props.destructive) {
    return t('confirmDestructiveBulkBody', { count: props.count ?? 0 })
  }
  return props.targetName ? t('confirmCardBody') : t('confirmBulkBody')
})

const positiveText = computed(() => {
  if (props.destructive && props.targetName) {
    return t('confirmDestructiveCardPositive', { name: props.targetName })
  }
  if (props.destructive) {
    return t('confirmDestructiveBulkPositive', { count: props.count ?? 0 })
  }
  return t('confirm')
})

function close() {
  emit('update:show', false)
}

function onConfirm() {
  emit('confirm')
  close()
}
</script>

<template>
  <UIModal
    :show="show"
    :width="480"
    :mask-closable="true"
    @update:show="(v) => emit('update:show', v)"
  >
    <template #header>
      <UIModalHeader
        id="bulk-action-confirm-header"
        :title="title"
        @close="close"
      />
    </template>
    <UIModalContent>
      <div
        class="confirm-body text-sm"
        :class="destructive ? 'text-gray-700' : 'text-gray-600'"
      >
        {{ body }}
      </div>
    </UIModalContent>
    <template #footer>
      <UIModalFooter
        id="bulk-action-confirm-footer"
        :positive-text="positiveText"
        :negative-text="t('cancel')"
        :type="destructive ? 'error' : 'primary'"
        @negative-click="close"
        @positive-click="onConfirm"
      />
    </template>
  </UIModal>
</template>

<style scoped>
.confirm-body {
  padding: 4px 0 8px;
  line-height: 1.5;
}
</style>
