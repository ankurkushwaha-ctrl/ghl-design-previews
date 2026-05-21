<!--
  BulkActionDetailsModal.vue
  ────────────────────────────────────────────────────────────────────────────
  Detail modal for a single bulk action record. Upstream source:
  ghl-revex-frontend/apps/locations/src/components/bulk-actions/BulkActionStatsModal.vue

  Shows per-sub-account table (ID, Name, Status, Error) plus 3 summary tiles.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { HLModal, HLTag } from '@/components/highrise'
import { getMockDetails } from './mock-data'
import type { BulkActionRecord, BulkActionDetail } from './mock-data'

const props = defineProps<{
  show: boolean
  action: BulkActionRecord | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()

const details = computed<BulkActionDetail[]>(() => {
  if (!props.action) return []
  return getMockDetails(props.action)
})
</script>

<template>
  <HLModal
    :show="show"
    :title="t('bulkActionDetails')"
    :width="840"
    @close="emit('close')"
  >
    <div v-if="action" class="bad">
      <!-- Per-sub-account table -->
      <div class="bad__table-section">
        <table class="bad__table">
          <thead>
            <tr>
              <th>{{ t('locationId') }}</th>
              <th>{{ t('locationName') }}</th>
              <th>{{ t('status') }}</th>
              <th>{{ t('errorDetails') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in details" :key="idx">
              <td class="bad__cell-id">{{ row.locationId }}</td>
              <td>{{ row.locationName }}</td>
              <td>
                <HLTag :type="row.error ? 'error' : 'success'">
                  {{ row.error ? t('failed') : t('success') }}
                </HLTag>
              </td>
              <td class="bad__cell-error">{{ row.error || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary tiles -->
      <div class="bad__tiles">
        <div class="bad__tile">
          <span class="bad__tile-label">{{ t('totalSubAccounts') }}</span>
          <span class="bad__tile-value">{{ action.totalCount }}</span>
        </div>
        <div class="bad__tile">
          <span class="bad__tile-label">{{ t('success') }}</span>
          <span class="bad__tile-value bad__tile-value--success">{{ action.completedCount }}</span>
        </div>
        <div class="bad__tile">
          <span class="bad__tile-label">{{ t('failed') }}</span>
          <span class="bad__tile-value bad__tile-value--error">{{ action.failedCount }}</span>
        </div>
      </div>
    </div>
  </HLModal>
</template>

<style scoped>
.bad {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Table ── */
.bad__table-section {
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
}

.bad__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.bad__table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--gray-500, #667085);
  background: var(--gray-50, #f9fafb);
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}

.bad__table td {
  padding: 10px 16px;
  color: var(--gray-700, #344054);
  border-bottom: 1px solid var(--gray-100, #f2f4f7);
  vertical-align: middle;
}

.bad__table tbody tr:last-child td {
  border-bottom: none;
}

.bad__cell-id {
  font-family: monospace;
  font-size: 13px;
  color: var(--gray-600, #475467);
}

.bad__cell-error {
  font-size: 13px;
  color: var(--gray-500, #667085);
}

/* ── Summary tiles ── */
.bad__tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.bad__tile {
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: var(--base-white, #fff);
}

.bad__tile-label {
  display: block;
  font-size: 13px;
  color: var(--gray-500, #667085);
  margin-bottom: 4px;
}

.bad__tile-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-900, #101828);
}

.bad__tile-value--success {
  color: var(--success-600, #039855);
}

.bad__tile-value--error {
  color: var(--error-600, #d92d20);
}
</style>
