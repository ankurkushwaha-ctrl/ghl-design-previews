<!--
  BulkActionHistoryPopover.vue
  ────────────────────────────────────────────────────────────────────────────
  Click-trigger popover with three fake history rows. Visual reference:
  apps/locations/src/pages/BulkActionHistoryPage.vue (the full page) — kept
  intentionally minimal here since this is a quick at-a-glance peek for
  stakeholders, not a real audit log.

  The trigger element is whatever is passed in via the default slot, so this
  component works for both the filter-strip history button and the bulk-
  actions-row history button (item #11 in the design brief).
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { UIPopover, UIButton, UITag } from '@gohighlevel/ghl-ui'
import { CheckCircleIcon } from '@gohighlevel/ghl-icons/24/outline'

const { t } = useI18n()

interface HistoryEntry {
  id: string
  action: string
  count: number
  whenKey: 'timeAgoHours' | 'timeAgoDays'
  whenN: number
  successRate: number
}

// Sample history mirrors the 5 production bulk actions so the popover
// reads as a believable audit log for those exact operations.
const fakeHistory: HistoryEntry[] = [
  {
    id: 'h1',
    action: t('pauseSubaccount'),
    count: 2,
    whenKey: 'timeAgoDays',
    whenN: 2,
    successRate: 100,
  },
  {
    id: 'h2',
    action: t('enableRebilling'),
    count: 5,
    whenKey: 'timeAgoDays',
    whenN: 5,
    successRate: 100,
  },
  {
    id: 'h3',
    action: t('enableSaas'),
    count: 12,
    whenKey: 'timeAgoHours',
    whenN: 8,
    successRate: 92,
  },
]
</script>

<template>
  <UIPopover trigger="click" placement="bottom-end" :width="360">
    <template #trigger>
      <slot />
    </template>
    <div class="history-popover">
      <div class="history-popover__header">
        <div class="text-sm font-semibold text-gray-900">
          {{ t('bulkActionHistory') }}
        </div>
        <div class="text-xs text-gray-500">
          {{ t('bulkActionHistorySubtitle') }}
        </div>
      </div>
      <div class="history-popover__list">
        <div
          v-for="entry in fakeHistory"
          :key="entry.id"
          class="history-row"
        >
          <div class="history-row__icon">
            <CheckCircleIcon class="h-4 w-4 text-success-500" />
          </div>
          <div class="history-row__body">
            <div class="text-sm font-medium text-gray-900">
              {{ entry.action }} × {{ entry.count }} sub-accounts
            </div>
            <div class="text-xs text-gray-500">
              {{ t(entry.whenKey, { n: entry.whenN }) }}
            </div>
          </div>
          <UITag size="small" type="success" round>
            {{ t('successRate', { rate: entry.successRate }) }}
          </UITag>
        </div>
      </div>
      <div class="history-popover__footer">
        <UIButton id="view-all-history" type="default" size="small">
          {{ t('viewAllHistory') }}
        </UIButton>
      </div>
    </div>
  </UIPopover>
</template>

<style scoped>
.history-popover {
  min-width: 320px;
  padding: 4px 0;
}
.history-popover__header {
  padding: 8px 12px 12px;
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}
.history-popover__list {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
}
.history-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
}
.history-row:hover {
  background: var(--gray-50, #f9fafb);
}
.history-row__icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--success-50, #ecfdf3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.history-row__body {
  flex: 1;
  min-width: 0;
}
.history-popover__footer {
  border-top: 1px solid var(--gray-200, #eaecf0);
  padding: 8px 12px;
  display: flex;
  justify-content: flex-end;
}
</style>
