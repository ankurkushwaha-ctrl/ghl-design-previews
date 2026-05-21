<!--
  BulkActionHistoryPage.vue
  ────────────────────────────────────────────────────────────────────────────
  Inner content for the Bulk Action History page. Upstream source:
  ghl-revex-frontend/apps/locations/src/components/bulk-actions/BulkActionHistory.vue

  Uses mock data instead of SaasService API calls.
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { HLButton, HLTag } from '@/components/highrise'
import BulkActionDetailsModal from './BulkActionDetailsModal.vue'
import { MOCK_HISTORY } from './mock-data'
import type { BulkActionRecord } from './mock-data'

const router = useRouter()
const { t } = useI18n()

const PAGE_SIZE = 5

const dateFrom = ref('2026-04-08')
const dateTo = ref('2026-05-08')
const currentPage = ref(1)
const showDetailModal = ref(false)
const selectedAction = ref<BulkActionRecord | null>(null)

const showFilterPopover = ref(false)
const filterAction = ref('All')
const filterStatus = ref('All')
const filterUser = ref('All')

const actionOptions = ['All', 'Enable SaaS', 'Pause Sub-Account', 'Enable Rebilling', 'Calendar Modules']
const statusOptions = ['All', 'Completed', 'Started', 'Failed']
const userOptions = ['All', 'Ankur Kushwaha', 'Aryan Sharma', 'Priya Patel']

const hasActiveFilters = computed(() =>
  filterAction.value !== 'All' || filterStatus.value !== 'All' || filterUser.value !== 'All',
)

const activeFilterCount = computed(() => {
  let count = 0
  if (filterAction.value !== 'All') count++
  if (filterStatus.value !== 'All') count++
  if (filterUser.value !== 'All') count++
  return count
})

const filteredHistory = computed(() => {
  return MOCK_HISTORY.filter((r) => {
    if (filterAction.value !== 'All' && r.actionLabel !== filterAction.value) return false
    if (filterStatus.value !== 'All' && r.statusLabel !== filterStatus.value) return false
    if (filterUser.value !== 'All' && r.user.name !== filterUser.value) return false

    const created = new Date(r.createdAt)
    const from = new Date(dateFrom.value)
    const to = new Date(dateTo.value)
    to.setHours(23, 59, 59, 999)
    if (created < from || created > to) return false

    return true
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredHistory.value.length / PAGE_SIZE)))

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredHistory.value.slice(start, start + PAGE_SIZE)
})

const showingFrom = computed(() => (currentPage.value - 1) * PAGE_SIZE + 1)
const showingTo = computed(() => Math.min(currentPage.value * PAGE_SIZE, filteredHistory.value.length))

function handleShowDetails(row: BulkActionRecord) {
  selectedAction.value = row
  showDetailModal.value = true
}

function handleBack() {
  router.push('/sub-accounts')
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  const hours = d.getHours()
  const mins = String(d.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h12 = hours % 12 || 12
  return `${month}/${day}/${year}, ${h12}:${mins} ${ampm}`
}

function statusTagType(status: string): 'success' | 'warning' | 'error' {
  if (status === 'completed') return 'success'
  if (status === 'failed') return 'error'
  return 'warning'
}

function userInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function applyFilters() {
  currentPage.value = 1
  showFilterPopover.value = false
}

function clearFilters() {
  filterAction.value = 'All'
  filterStatus.value = 'All'
  filterUser.value = 'All'
  currentPage.value = 1
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="bah">
    <!-- Header -->
    <div class="bah__header-area">
      <button class="bah__back" @click="handleBack">
        <i class="fas fa-arrow-left" />
        <span>{{ t('backToSubAccounts') }}</span>
      </button>

      <div class="bah__header-row">
        <div class="bah__header-text">
          <h1 class="bah__title">{{ t('bulkActionHistory') }}</h1>
          <p class="bah__subtitle">Audit trail of bulk operations across your sub-accounts</p>
        </div>
      </div>

      <div class="bah__toolbar">
        <div class="bah__dates">
          <div class="bah__date-group">
            <i class="fas fa-calendar-alt bah__date-icon" />
            <input
              v-model="dateFrom"
              type="date"
              class="bah__date-input"
            />
          </div>
          <span class="bah__date-arrow">to</span>
          <div class="bah__date-group">
            <i class="fas fa-calendar-alt bah__date-icon" />
            <input
              v-model="dateTo"
              type="date"
              class="bah__date-input"
            />
          </div>
        </div>

        <div class="bah__filter-wrap">
          <button
            class="bah__filter-trigger"
            :class="{ 'bah__filter-trigger--active': hasActiveFilters }"
            @click="showFilterPopover = !showFilterPopover"
          >
            <i class="fas fa-sliders-h" />
            Filters
            <span v-if="activeFilterCount > 0" class="bah__filter-badge">
              {{ activeFilterCount }}
            </span>
          </button>

          <!-- Filter popover -->
          <div v-if="showFilterPopover" class="bah__filter-popover">
            <div class="bah__filter-head">
              <span class="bah__filter-title">Filters</span>
              <button class="bah__filter-clear" @click="clearFilters">Clear all</button>
            </div>

            <label class="bah__filter-label">Action</label>
            <select v-model="filterAction" class="bah__filter-select">
              <option v-for="opt in actionOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>

            <label class="bah__filter-label">Status</label>
            <select v-model="filterStatus" class="bah__filter-select">
              <option v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>

            <label class="bah__filter-label">User</label>
            <select v-model="filterUser" class="bah__filter-select">
              <option v-for="opt in userOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>

            <div class="bah__filter-actions">
              <HLButton variant="secondary" size="sm" @click="showFilterPopover = false">
                Cancel
              </HLButton>
              <HLButton size="sm" @click="applyFilters">
                Apply
              </HLButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table card (Gestalt: Closure) -->
    <div class="bah__card">
      <!-- Active filter chips -->
      <div v-if="hasActiveFilters" class="bah__active-filters">
        <span class="bah__active-label">Active filters:</span>
        <span v-if="filterAction !== 'All'" class="bah__chip">
          {{ filterAction }}
          <button class="bah__chip-x" @click="filterAction = 'All'"><i class="fas fa-times" /></button>
        </span>
        <span v-if="filterStatus !== 'All'" class="bah__chip">
          {{ filterStatus }}
          <button class="bah__chip-x" @click="filterStatus = 'All'"><i class="fas fa-times" /></button>
        </span>
        <span v-if="filterUser !== 'All'" class="bah__chip">
          {{ filterUser }}
          <button class="bah__chip-x" @click="filterUser = 'All'"><i class="fas fa-times" /></button>
        </span>
      </div>

      <table v-if="paginatedHistory.length > 0" class="bah__table">
        <thead>
          <tr>
            <th>{{ t('jobId') }}</th>
            <th>{{ t('operation') }}</th>
            <th>{{ t('status') }}</th>
            <th>{{ t('user') }}</th>
            <th>Created (CST)</th>
            <th>Completed (CST)</th>
            <th>{{ t('details') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedHistory" :key="row._id">
            <td>
              <span class="bah__cell-id">{{ row._id }}</span>
            </td>
            <td>
              <div class="bah__operation-cell">
                <span class="bah__operation-label">{{ row.actionLabel }}</span>
                <span class="bah__operation-count">{{ row.totalCount }} sub-accounts</span>
              </div>
            </td>
            <td>
              <HLTag :type="statusTagType(row.status)">
                {{ row.statusLabel }}
              </HLTag>
            </td>
            <td>
              <div class="bah__user-cell">
                <span class="bah__user-avatar">{{ userInitials(row.user.name) }}</span>
                <span class="bah__user-name">{{ row.user.name }}</span>
              </div>
            </td>
            <td>
              <div class="bah__cell-date">
                <span class="bah__date-primary">{{ formatDate(row.createdAt).split(',')[0] }}</span>
                <span class="bah__date-secondary">{{ formatDate(row.createdAt).split(',')[1] }}</span>
              </div>
            </td>
            <td>
              <div class="bah__cell-date">
                <template v-if="row.completedAt">
                  <span class="bah__date-primary">{{ formatDate(row.completedAt).split(',')[0] }}</span>
                  <span class="bah__date-secondary">{{ formatDate(row.completedAt).split(',')[1] }}</span>
                </template>
                <span v-else class="bah__date-secondary">—</span>
              </div>
            </td>
            <td>
              <button class="bah__details-link" @click="handleShowDetails(row)">
                <i class="fas fa-external-link-alt" />
                {{ t('showFullDetails') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div v-else class="bah__empty">
        <div class="bah__empty-circle">
          <i class="fas fa-inbox" />
        </div>
        <p class="bah__empty-title">No matching records</p>
        <p class="bah__empty-body">Try adjusting your date range or clearing filters.</p>
      </div>

      <!-- Footer: result count + pagination (Gestalt: Proximity — grouped in one bar) -->
      <div v-if="filteredHistory.length > 0" class="bah__table-footer">
        <span class="bah__result-count">
          Showing {{ showingFrom }}–{{ showingTo }} of {{ filteredHistory.length }} results
        </span>
        <div v-if="totalPages > 1" class="bah__pagination">
          <button
            class="bah__page-btn"
            :disabled="currentPage <= 1"
            @click="goToPage(currentPage - 1)"
          >
            <i class="fas fa-chevron-left" />
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            class="bah__page-btn"
            :class="{ 'bah__page-btn--active': p === currentPage }"
            @click="goToPage(p)"
          >
            {{ p }}
          </button>
          <button
            class="bah__page-btn"
            :disabled="currentPage >= totalPages"
            @click="goToPage(currentPage + 1)"
          >
            <i class="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>

    <!-- Detail modal -->
    <BulkActionDetailsModal
      :show="showDetailModal"
      :action="selectedAction"
      @close="showDetailModal = false"
    />
  </div>
</template>

<style scoped>
.bah {
  min-height: calc(100vh - 64px);
  background: var(--gray-25, #fcfcfd);
}

/* ── Header area ── */
.bah__header-area {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--base-white, #fff);
  padding: 20px 32px 16px;
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}

.bah__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-500, #667085);
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  margin-bottom: 12px;
  transition: color 0.12s ease;
}

.bah__back:hover {
  color: var(--primary-600, #155eef);
}

.bah__back i {
  font-size: 12px;
}

.bah__header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.bah__header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bah__title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-900, #101828);
  line-height: 1.4;
}

.bah__subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--gray-500, #667085);
  line-height: 1.4;
}

.bah__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

/* ── Date picker group ── */
.bah__dates {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bah__date-group {
  position: relative;
  display: flex;
  align-items: center;
}

.bah__date-icon {
  position: absolute;
  left: 10px;
  font-size: 13px;
  color: var(--gray-400, #98a2b3);
  pointer-events: none;
}

.bah__date-input {
  height: 36px;
  padding: 0 12px 0 32px;
  border: 1px solid var(--gray-300, #d0d5dd);
  border-radius: 8px;
  font-size: 13px;
  color: var(--gray-700, #344054);
  background: var(--base-white, #fff);
  font-family: inherit;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}

.bah__date-input:focus {
  outline: none;
  border-color: var(--primary-500, #2970ff);
  box-shadow: 0 0 0 3px rgba(41, 112, 255, 0.12);
}

.bah__date-arrow {
  color: var(--gray-400, #98a2b3);
  font-size: 13px;
  font-weight: 500;
}

/* ── Filter trigger ── */
.bah__filter-wrap {
  position: relative;
}

.bah__filter-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--gray-300, #d0d5dd);
  border-radius: 8px;
  background: var(--base-white, #fff);
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700, #344054);
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}

.bah__filter-trigger:hover {
  border-color: var(--gray-400, #98a2b3);
}

.bah__filter-trigger--active {
  border-color: var(--primary-300, #84adff);
  background: var(--primary-25, #f5f8ff);
  color: var(--primary-700, #004eeb);
}

.bah__filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--primary-600, #155eef);
  color: var(--base-white, #fff);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

/* ── Filter popover ── */
.bah__filter-popover {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 20;
  width: 280px;
  background: var(--base-white, #fff);
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(16, 24, 40, 0.12);
  padding: 16px;
}

.bah__filter-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.bah__filter-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900, #101828);
}

.bah__filter-clear {
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--primary-600, #155eef);
  cursor: pointer;
  padding: 0;
}

.bah__filter-clear:hover {
  color: var(--primary-700, #004eeb);
}

.bah__filter-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-600, #475467);
  margin-bottom: 4px;
  margin-top: 10px;
}

.bah__filter-label:first-of-type {
  margin-top: 0;
}

.bah__filter-select {
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 1px solid var(--gray-300, #d0d5dd);
  border-radius: 8px;
  font-size: 13px;
  color: var(--gray-700, #344054);
  background: var(--base-white, #fff);
  font-family: inherit;
  cursor: pointer;
}

.bah__filter-select:focus {
  outline: none;
  border-color: var(--primary-500, #2970ff);
}

.bah__filter-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.bah__filter-actions :deep(.hl-btn) {
  flex: 1;
}

/* ── Table card (Gestalt: Closure) ── */
.bah__card {
  margin: 20px 32px 32px;
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 12px;
  background: var(--base-white, #fff);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

/* ── Active filter chips ── */
.bah__active-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--primary-25, #f5f8ff);
  border-bottom: 1px solid var(--primary-100, #d1e0ff);
}

.bah__active-label {
  font-size: 13px;
  color: var(--gray-500, #667085);
  white-space: nowrap;
}

.bah__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 8px;
  border-radius: 6px;
  background: var(--primary-100, #d1e0ff);
  color: var(--primary-700, #004eeb);
  font-size: 12px;
  font-weight: 500;
}

.bah__chip-x {
  background: none;
  border: none;
  color: var(--primary-500, #2970ff);
  cursor: pointer;
  padding: 0;
  margin-left: 2px;
  font-size: 10px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}

.bah__chip-x:hover {
  color: var(--primary-800, #00359e);
}

/* ── Table ── */
.bah__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.bah__table thead {
  background: var(--gray-50, #f9fafb);
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}

.bah__table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-500, #667085);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.bah__table td {
  padding: 12px 16px;
  color: var(--gray-700, #344054);
  border-bottom: 1px solid var(--gray-100, #f2f4f7);
  vertical-align: middle;
}

.bah__table tbody tr {
  transition: background 0.1s ease;
}

.bah__table tbody tr:last-child td {
  border-bottom: none;
}

.bah__table tbody tr:hover {
  background: var(--gray-50, #f9fafb);
}

/* ── Job ID ── */
.bah__cell-id {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--gray-100, #f2f4f7);
  font-family: monospace;
  font-size: 13px;
  color: var(--gray-600, #475467);
}

/* ── Operation cell ── */
.bah__operation-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bah__operation-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.bah__operation-count {
  font-size: 13px;
  color: var(--gray-500, #667085);
}

/* ── Date cells ── */
.bah__cell-date {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bah__date-primary {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.bah__date-secondary {
  font-size: 13px;
  color: var(--gray-500, #667085);
}

/* ── User cell (Heuristic: Recognition > Recall) ── */
.bah__user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bah__user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-50, #eff4ff);
  color: var(--primary-700, #004eeb);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bah__user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-700, #344054);
  white-space: nowrap;
}

/* ── Details link ── */
.bah__details-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: var(--primary-600, #155eef);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.12s ease;
}

.bah__details-link i {
  font-size: 11px;
}

.bah__details-link:hover {
  color: var(--primary-700, #004eeb);
}

/* ── Empty state ── */
.bah__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
}

.bah__empty-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gray-100, #f2f4f7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--gray-400, #98a2b3);
  font-size: 20px;
}

.bah__empty-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-900, #101828);
}

.bah__empty-body {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--gray-500, #667085);
}

/* ── Table footer (Gestalt: Proximity — count + pagination as one unit) ── */
.bah__table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid var(--gray-200, #eaecf0);
  background: var(--gray-50, #f9fafb);
}

.bah__result-count {
  font-size: 13px;
  color: var(--gray-500, #667085);
}

/* ── Pagination ── */
.bah__pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}

.bah__page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--gray-300, #d0d5dd);
  border-radius: 6px;
  background: var(--base-white, #fff);
  color: var(--gray-700, #344054);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s ease, border-color 0.12s ease;
}

.bah__page-btn:hover:not(:disabled) {
  background: var(--gray-50, #f9fafb);
  border-color: var(--gray-400, #98a2b3);
}

.bah__page-btn--active {
  background: var(--primary-600, #155eef);
  border-color: var(--primary-600, #155eef);
  color: var(--base-white, #fff);
}

.bah__page-btn--active:hover:not(:disabled) {
  background: var(--primary-700, #004eeb);
}

.bah__page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
