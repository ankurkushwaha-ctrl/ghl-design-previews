<!--
  Locations.vue
  ────────────────────────────────────────────────────────────────────────────
  Top-level orchestrator for the interactive Sub-Accounts preview.

  Holds ALL shared state (search, filters, columns, sort, selection, view
  mode, modal-show flags) and passes it down to focused components:
    - FilterStrip            — date/search/columns/sort/dir/funnel/history/view
    - BulkActionsRow         — select-all, agency toggle, bulk dropdown
    - LocationCard97Plan     — per-card checkbox + footer interactions
    - LocationsTable         — table view alternative
    - AdvancedFiltersDrawer  — funnel target
    - BulkActionConfirmModal — generic "Apply X to N?" modal
    - SwitchAccountModal     — fake "Switching to..." spinner
    - CreateSubAccountModal  — 3-step wizard
    - ScheduledReportsModal  — header View Scheduled Reports button

  Notifications (toasts) are dispatched via useNotification(). UIContentWrap
  in the template provides the NotificationProvider context underneath.

  Source-of-truth note: this file diverges from upstream `LocationList.vue`
  (6800+ lines, smart-list backed). The brief explicitly asks for a
  visually-realistic but mock-only experience for stakeholder review.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  UserPlus01Icon,
} from '@gohighlevel/ghl-icons/24/outline'
import {
  UIAlert,
  UIButton,
  UIEmpty,
  UIHeader,
  useNotification,
} from '@gohighlevel/ghl-ui'

import LocationCard97Plan from './LocationCard97Plan.vue'
import LocationsTable from './LocationsTable.vue'
import FilterStrip from './FilterStrip.vue'
import BulkActionsRow from './BulkActionsRow.vue'
import AdvancedFiltersDrawer from './AdvancedFiltersDrawer.vue'
import BulkActionConfirmModal from './BulkActionConfirmModal.vue'
import UpdateFeaturesModal from './update-features/UpdateFeaturesModal.vue'
import SwitchAccountModal from './SwitchAccountModal.vue'
import CreateSubAccountModal from './CreateSubAccountModal.vue'
import ScheduledReportsModal from './ScheduledReportsModal.vue'
import { useAdaptiveHeader } from '../use-adaptive-header'

import { MOCK_LOCATIONS, MOCK_COMPANY, MOCK_EXTRAS } from './mock-locations'
import type { MockLocation } from './mock-locations'
import {
  type AdvancedFilters,
  type SortDirection,
  type SortKey,
  type ViewMode,
  type VisibleColumns,
  DEFAULT_ADVANCED_FILTERS,
  DEFAULT_VISIBLE_COLUMNS,
} from './types'

const { t } = useI18n()
const router = useRouter()
const notification = useNotification()

// ─── Filter strip state ────────────────────────────────────────────────────
const dateRange = ref<[number, number]>([
  Date.now() - 30 * 24 * 60 * 60 * 1000,
  Date.now(),
])
const searchText = ref('')
const visibleColumns = ref<VisibleColumns>({ ...DEFAULT_VISIBLE_COLUMNS })
const sortBy = ref<SortKey>('name')
const sortDirection = ref<SortDirection>('asc')
const viewMode = ref<ViewMode>('card')

// ─── Bulk actions row state ───────────────────────────────────────────────
const showAgencySubAccounts = ref(true)
const selectedIds = ref<Set<string>>(new Set())

// ─── Advanced filters state ───────────────────────────────────────────────
const advancedFilters = ref<AdvancedFilters>({ ...DEFAULT_ADVANCED_FILTERS })
const showAdvancedFilters = ref(false)

// ─── Modal show flags ─────────────────────────────────────────────────────
const showCreateModal = ref(false)
const showScheduledReportsModal = ref(false)
const showSwitchModal = ref(false)
const switchingName = ref('')

// Confirm modal works for both bulk and single-card actions. We park the
// pending action + targets here so the same modal renders in both flows.
interface PendingAction {
  action: string
  /** Single-card target. Null for bulk. */
  location: MockLocation | null
  /** Number of sub-accounts affected. Used for bulk. */
  count: number
  destructive: boolean
}
const showConfirmModal = ref(false)
const pendingAction = ref<PendingAction | null>(null)

// Update Features modal — opened by the 'update-features' bulk action key.
// Separated from the generic confirm modal because this one has its own
// multi-step flow (recipe → confirm → applying → applied). (2026-05-07)
const showUpdateFeaturesModal = ref(false)

// ─── Derived list ─────────────────────────────────────────────────────────
function matchSearch(loc: MockLocation, q: string) {
  const needle = q.toLowerCase().trim()
  if (!needle) return true
  return (
    loc.name.toLowerCase().includes(needle) ||
    loc.city.toLowerCase().includes(needle) ||
    loc.state.toLowerCase().includes(needle)
  )
}

const filteredLocations = computed<MockLocation[]>(() => {
  let list = [...MOCK_LOCATIONS]

  if (!showAgencySubAccounts.value) {
    list = list.filter((l) => !l.isAgencySubAccount)
  }
  if (searchText.value) {
    list = list.filter((l) => matchSearch(l, searchText.value))
  }

  list.sort((a, b) => {
    let cmp = 0
    switch (sortBy.value) {
      case 'name':
        cmp = a.name.localeCompare(b.name)
        break
      case 'createdAt':
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      case 'users':
        cmp = (a.report.users ?? 0) - (b.report.users ?? 0)
        break
      case 'calls':
        cmp =
          (a.report.callsIn ?? 0) +
          (a.report.callsOut ?? 0) -
          ((b.report.callsIn ?? 0) + (b.report.callsOut ?? 0))
        break
      case 'emails':
        cmp =
          (a.report.emailsIn ?? 0) +
          (a.report.emailsOut ?? 0) -
          ((b.report.emailsIn ?? 0) + (b.report.emailsOut ?? 0))
        break
      case 'contacts':
        cmp = (a.report.contacts ?? 0) - (b.report.contacts ?? 0)
        break
    }
    return sortDirection.value === 'asc' ? cmp : -cmp
  })

  return list
})

// Effective `extras` — strips fields the columns picker has hidden so
// Metrics.vue's buildReport runs against fewer kinds. This keeps the
// preview behavior closer to how the real LocationList drives its
// ReportingTableHeader columns prop.
const filteredExtras = computed(() => {
  const allFields = (MOCK_EXTRAS.filters?.fields ?? []) as string[]
  return {
    filters: {
      fields: allFields.filter(
        (f) => visibleColumns.value[f as keyof VisibleColumns] !== false
      ),
    },
  }
})

// ─── Selection helpers ────────────────────────────────────────────────────
function toggleSelect(id: string) {
  const next = new Set(selectedIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  selectedIds.value = next
}

function onCardSelect(payload: { id: string }) {
  toggleSelect(payload.id)
}

function toggleSelectAll() {
  const visible = filteredLocations.value
  const allSelected =
    visible.length > 0 &&
    visible.every((l) => selectedIds.value.has(l.id))
  selectedIds.value = allSelected
    ? new Set()
    : new Set(visible.map((l) => l.id))
}

function clearSelection() {
  selectedIds.value = new Set()
}

// ─── Toast helpers ────────────────────────────────────────────────────────
function toastSuccess(content: string) {
  notification.success({ content, duration: 2500 })
}

function toastInfo(content: string) {
  notification.info({ content, duration: 2500 })
}

// ─── Filter funnel handlers ───────────────────────────────────────────────
function applyAdvancedFilters(next: AdvancedFilters) {
  advancedFilters.value = next
  showAdvancedFilters.value = false
  toastSuccess(t('filtersApplied'))
}

function clearAdvancedFilters() {
  advancedFilters.value = { ...DEFAULT_ADVANCED_FILTERS }
  toastInfo(t('filtersCleared'))
}

/*
 * [N9 audit fix] Recovery from empty-state. Clears the three things that
 * can suppress every card: searchText, advancedFilters, and the
 * showAgencySubAccounts toggle. We deliberately leave dateRange alone — a
 * default "last 30 days" range is part of the page's normal posture, not a
 * filter the user typed in.
 */
function clearAllFilters() {
  searchText.value = ''
  advancedFilters.value = { ...DEFAULT_ADVANCED_FILTERS }
  showAgencySubAccounts.value = true
  toastInfo(t('filtersCleared'))
}

// ─── Bulk actions ─────────────────────────────────────────────────────────
// Keys mirror upstream `BulkActionType` enum values
// (ghl-revex-frontend/apps/locations/src/constants/index.ts) so dispatch
// wiring is portable as-is. `update-features` is the new option added under
// the feature-permissions work and follows the same kebab-case pattern.
const BULK_ACTION_LABELS: Record<string, string> = {
  'enable-rebilling': t('enableRebilling'),
  'enable-saas': t('enableSaas'),
  'pause-subaccount': t('pauseSubaccount'),
  'calendar-settings': t('setupCalendars'),
  'update-features': t('updateFeatures'),
}

function onBulkActionPick(key: string) {
  if (selectedIds.value.size === 0) return

  // 'update-features' gets its own multi-step modal; the remaining 4
  // keys keep the generic confirm-modal flow. (2026-05-07, update-features)
  if (key === 'update-features') {
    showUpdateFeaturesModal.value = true
    return
  }

  pendingAction.value = {
    action: BULK_ACTION_LABELS[key] ?? key,
    location: null,
    count: selectedIds.value.size,
    destructive: false,
  }
  showConfirmModal.value = true
}

function onUpdateFeaturesApplied() {
  toastSuccess(
    t('bulkSuccess', { action: t('updateFeatures'), count: selectedIds.value.size }),
  )
  clearSelection()
}

// ─── Card-level actions ───────────────────────────────────────────────────
const CARD_ACTION_LABELS: Record<string, string> = {
  edit: t('menuEdit'),
  settings: t('menuSettings'),
  suspend: t('menuSuspend'),
  resume: t('menuResume'),
  transfer: t('menuTransfer'),
  delete: t('menuDelete'),
}

function onCardAction({
  action,
  location,
}: {
  action: string
  location: MockLocation
}) {
  pendingAction.value = {
    action: CARD_ACTION_LABELS[action] ?? action,
    location,
    count: 1,
    destructive: action === 'delete',
  }
  showConfirmModal.value = true
}

function onConfirmAction() {
  if (!pendingAction.value) return
  const a = pendingAction.value
  if (a.location) {
    toastSuccess(
      t('cardActionSuccess', { action: a.action, name: a.location.name })
    )
  } else {
    toastSuccess(t('bulkSuccess', { action: a.action, count: a.count }))
    clearSelection()
  }
  pendingAction.value = null
}

// ─── Card click → detail page (out of scope) ──────────────────────────────
function navigateToDetail() {
  router.push('/coming-soon')
}

// ─── Switch sub-account modal ─────────────────────────────────────────────
function onSwitchToLocation({ id }: { id: string }) {
  const loc = MOCK_LOCATIONS.find((l) => l.id === id)
  switchingName.value = loc?.name ?? ''
  showSwitchModal.value = true
}

function onSwitched(name: string) {
  toastSuccess(t('switchedTo', { name }))
}

// ─── Header buttons ───────────────────────────────────────────────────────
function onCreated(form: { name: string }) {
  toastSuccess(t('createdSuccess', { name: form.name || 'Sub-Account' }))
}

// ─── Adaptive header (TopBar mirrors title + CTA when page header scrolls out)
// Pattern note: GitHub repo header / Linear issue header. The page owns the
// IntersectionObserver target (headerEl) and the action handler; the TopBar
// just renders. See ../use-adaptive-header.ts for the channel design.
const adaptive = useAdaptiveHeader()
const headerEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!adaptive) return
  adaptive.setConfig({
    title: t('locations.subAccountsHeader'),
    cta: {
      label: t('createSubAccount'),
      icon: UserPlus01Icon,
      type: 'primary',
      onClick: () => {
        showCreateModal.value = true
      },
    },
  })
  adaptive.observe(headerEl.value)
})

onBeforeUnmount(() => {
  adaptive?.reset()
})
</script>

<template>
  <!-- NOTE: deliberately NOT using `hl_wrapper--inner`. Upstream PMD SCSS
       forces that class to `h-screen overflow-auto` so the inner div becomes
       the scroller — which kills `position: sticky` on the topbar/sidebar
       (the document body has nothing to scroll). We use a plain class so
       PMD's selectors don't match. -->
  <div class="locations-preview">
      <!-- ref="headerEl" is the IntersectionObserver target — when this row
           leaves the viewport, the TopBar fades in its adaptive twin. -->
      <div ref="headerEl">
        <UIHeader
          id="pg-agency-locations"
          :title="t('locations.subAccountsHeader')"
        >
          <template #extra>
            <div class="flex gap-2">
              <UIButton
                id="pg-agency-locations__btn--header-list"
                size="medium"
                @click="showScheduledReportsModal = true"
              >
                {{ t('viewScheduleReports') }}
              </UIButton>
              <UIButton
                id="header-list-btn"
                size="medium"
                type="primary"
                @click="showCreateModal = true"
              >
                <UserPlus01Icon class="mr-2 h-5 w-5" />
                {{ t('createSubAccount') }}
              </UIButton>
            </div>
          </template>
        </UIHeader>
      </div>

      <!-- Yellow SaaS-mode banner -->
      <div class="mb-4 mt-2">
        <UIAlert
          id="enable-saas-prompt-alert"
          type="warning"
          :closable="true"
        >
          <template #title>
            {{ t('enableSaaSForAllClients') }}
            <a id="enable-saas-prompt-alert-link" href="#" @click.prevent>
              <span class="text-warning-600 underline">{{
                t('clickHereToEnableSaaS')
              }}</span>
            </a>
          </template>
        </UIAlert>
      </div>

      <FilterStrip
        v-model:date-range="dateRange"
        v-model:search-text="searchText"
        v-model:visible-columns="visibleColumns"
        v-model:sort-by="sortBy"
        v-model:sort-direction="sortDirection"
        v-model:view-mode="viewMode"
        @open-advanced-filters="showAdvancedFilters = true"
      />

      <BulkActionsRow
        :selected-count="selectedIds.size"
        :visible-count="filteredLocations.length"
        v-model:show-agency-sub-accounts="showAgencySubAccounts"
        @toggle-select-all="toggleSelectAll"
        @clear-selection="clearSelection"
        @pick-bulk-action="onBulkActionPick"
      />

      <!-- Empty state when filters/search produce no matches.
           [N9 audit fix] Adds a primary "Clear filters" CTA so the user has
           an obvious recovery path instead of having to hunt the search box. -->
      <!-- Empty state.
           UIEmpty's slots are `media` (icon override) and `actions` (button row).
           There is no `extra` slot — earlier audit attempt used #extra and the
           recovery CTA silently dropped. We now use `title` + `description` for
           text and the `actions` slot for the Clear filters button. -->
      <div
        v-if="filteredLocations.length === 0"
        class="empty-state"
      >
        <UIEmpty
          id="locations-empty"
          :title="t('emptyTitle')"
          :description="t('emptyBody')"
        >
          <template #actions>
            <UIButton
              id="locations-empty__btn--clear"
              type="primary"
              size="medium"
              @click="clearAllFilters"
            >
              {{ t('emptyClearFilters') }}
            </UIButton>
          </template>
        </UIEmpty>
      </div>

      <!-- Card view (default) -->
      <div
        v-else-if="viewMode === 'card'"
        class="locations-list flex flex-col gap-3"
      >
        <LocationCard97Plan
          v-for="loc in filteredLocations"
          :key="loc.id"
          :location="loc"
          :columns="[]"
          :company="MOCK_COMPANY"
          :extras="filteredExtras"
          :visible-columns="visibleColumns"
          :selected="selectedIds.has(loc.id)"
          @select="onCardSelect"
          @details="navigateToDetail"
          @switch-to-location="onSwitchToLocation"
          @card-action="onCardAction"
        />
      </div>

      <!-- Table view -->
      <LocationsTable
        v-else
        :locations="filteredLocations"
        :selected-ids="selectedIds"
        @toggle-select="toggleSelect"
        @card-action="onCardAction"
      />

      <!-- ─── Off-screen mounted modals/drawers ─────────────────────────── -->
      <AdvancedFiltersDrawer
        v-model:show="showAdvancedFilters"
        :filters="advancedFilters"
        @apply="applyAdvancedFilters"
        @clear="clearAdvancedFilters"
      />

      <BulkActionConfirmModal
        v-if="pendingAction"
        v-model:show="showConfirmModal"
        :action="pendingAction.action"
        :target-name="pendingAction.location?.name"
        :count="pendingAction.count"
        :destructive="pendingAction.destructive"
        @confirm="onConfirmAction"
      />

      <UpdateFeaturesModal
        v-model:show="showUpdateFeaturesModal"
        :selected-sub-account-ids="[...selectedIds]"
        @applied="onUpdateFeaturesApplied"
      />

      <SwitchAccountModal
        v-model:show="showSwitchModal"
        :name="switchingName"
        @switched="onSwitched"
      />

      <CreateSubAccountModal
        v-model:show="showCreateModal"
        @created="onCreated"
      />

      <ScheduledReportsModal v-model:show="showScheduledReportsModal" />
  </div>
</template>

<style scoped>
.locations-preview {
  padding: 16px 24px;
  background: var(--gray-50, #f9fafb);
  min-height: 100%;
}
.empty-state {
  background: #ffffff;
  border-radius: 12px;
  padding: 64px 24px;
  border: 1px solid var(--gray-200, #eaecf0);
  text-align: center;
}
</style>
