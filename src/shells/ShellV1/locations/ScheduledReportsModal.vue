<!--
  ScheduledReportsModal.vue
  ────────────────────────────────────────────────────────────────────────────
  Lists 3 fake scheduled reports. Edit / Delete / + New Report buttons are
  intentionally inert (the brief calls them out as no-ops) — we render them
  so the page surface mirrors the real product, but clicking them just
  closes the modal silently.
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {
  UIButton,
  UIModal,
  UIModalContent,
  UIModalHeader,
  UIModalFooter,
} from '@gohighlevel/ghl-ui'
import {
  CalendarIcon,
  Edit05Icon,
  Trash01Icon,
} from '@gohighlevel/ghl-icons/24/outline'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const { t } = useI18n()

interface ScheduledReport {
  id: string
  titleKey: string
  whenKey: string
  recipients: number
}

const reports: ScheduledReport[] = [
  { id: 'r1', titleKey: 'weeklyPerformance', whenKey: 'weeklyPerformanceWhen', recipients: 12 },
  { id: 'r2', titleKey: 'monthlyClient', whenKey: 'monthlyClientWhen', recipients: 8 },
  { id: 'r3', titleKey: 'quarterlyExec', whenKey: 'quarterlyExecWhen', recipients: 4 },
]

function close() {
  emit('update:show', false)
}
</script>

<template>
  <UIModal
    :show="show"
    :width="600"
    :mask-closable="true"
    @update:show="(v) => emit('update:show', v)"
  >
    <template #header>
      <UIModalHeader
        id="scheduled-reports-header"
        :title="t('scheduledReportsTitle')"
        :description="t('scheduledReportsDesc')"
        @close="close"
      />
    </template>
    <UIModalContent>
      <div class="scheduled-reports-list">
        <div
          v-for="report in reports"
          :key="report.id"
          class="scheduled-report-row"
        >
          <div class="scheduled-report-row__icon">
            <CalendarIcon class="h-5 w-5 text-primary-600" />
          </div>
          <div class="scheduled-report-row__body">
            <div class="text-sm font-medium text-gray-900">
              {{ t(report.titleKey) }}
            </div>
            <div class="text-xs text-gray-500 mt-1">
              {{ t(report.whenKey) }} ·
              {{ t('recipientsCount', { count: report.recipients }) }}
            </div>
          </div>
          <div class="scheduled-report-row__actions">
            <UIButton
              :id="'sched-edit-' + report.id"
              type="default"
              size="small"
              @click="close"
            >
              <Edit05Icon class="mr-1 h-4 w-4" />
              {{ t('edit') }}
            </UIButton>
            <UIButton
              :id="'sched-delete-' + report.id"
              type="default"
              size="small"
              @click="close"
            >
              <Trash01Icon class="mr-1 h-4 w-4" />
              {{ t('delete') }}
            </UIButton>
          </div>
        </div>
      </div>
    </UIModalContent>
    <template #footer>
      <UIModalFooter
        id="scheduled-reports-footer"
        :positive-text="t('newReport')"
        :negative-text="t('cancel')"
        type="primary"
        @negative-click="close"
        @positive-click="close"
      />
    </template>
  </UIModal>
</template>

<style scoped>
.scheduled-reports-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.scheduled-report-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 4px;
  border-bottom: 1px solid var(--gray-100, #f2f4f7);
}
.scheduled-report-row:last-child {
  border-bottom: none;
}
.scheduled-report-row__icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--primary-50, #f9f5ff);
  display: flex;
  align-items: center;
  justify-content: center;
}
.scheduled-report-row__body {
  flex: 1;
  min-width: 0;
}
.scheduled-report-row__actions {
  display: flex;
  gap: 6px;
}
</style>
