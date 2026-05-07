<!--
  FilterStrip.vue
  ────────────────────────────────────────────────────────────────────────────
  Owns the controls in the row directly under the SaaS-mode banner:
    - Date-range picker (with 6 preset shortcuts)
    - Search input (filters cards live as the user types)
    - Columns dropdown (toggle which metric columns render on each card)
    - Sort By dropdown
    - Sort direction (Asc/Desc) toggle
    - Filter funnel button (opens the Advanced Filters drawer)
    - History button (opens Bulk Action History popover)
    - View toggle (cards ↔ table)

  All state is owned by Locations.vue and passed in via v-model bindings or
  :prop + @update events. Keeping this component dumb-ish makes the page-
  level state shape obvious in one place.

  UX-audit fixes (2026-05-07):
   - [G1] Proximity — the eight controls are now grouped into four
     visual clusters (Scope: date+search · Display: columns+sort+direction ·
     Filter: funnel · Utilities: history+view-toggle) with subtle vertical
     dividers, so the eye reads four units instead of one undifferentiated
     row.
   - [N6] Recognition — sort-by button now reads "Sort: Name" instead of
     the bare value "Name", so a user scanning the strip can tell the
     button's role without clicking.
   - [N4] Consistency — sort-direction button now uses "A → Z" / "Z → A"
     to match the option-picker labels and avoid the "I picked one form,
     got back another" mismatch.
   - [N10] Help — every icon-only button now has a UITooltip wrapper so
     the affordance is discoverable without a click.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ChevronDownIcon,
  ClockRewindIcon,
  Columns03Icon,
  FilterLinesIcon,
  LayoutAlt03Icon,
  SearchMdIcon,
} from '@gohighlevel/ghl-icons/24/outline'
import {
  UIButton,
  UICheckbox,
  UIDatepicker,
  UIDropdown,
  UIInput,
  UIPopover,
  UITooltip,
} from '@gohighlevel/ghl-ui'
import type {
  ColumnKey,
  SortDirection,
  SortKey,
  ViewMode,
  VisibleColumns,
} from './types'
import { buildDateShortcuts } from './date-shortcuts'
import BulkActionHistoryPopover from './BulkActionHistoryPopover.vue'

const props = defineProps<{
  dateRange: [number, number]
  searchText: string
  visibleColumns: VisibleColumns
  sortBy: SortKey
  sortDirection: SortDirection
  viewMode: ViewMode
}>()

const emit = defineEmits<{
  (e: 'update:dateRange', value: [number, number]): void
  (e: 'update:searchText', value: string): void
  (e: 'update:visibleColumns', value: VisibleColumns): void
  (e: 'update:sortBy', value: SortKey): void
  (e: 'update:sortDirection', value: SortDirection): void
  (e: 'update:viewMode', value: ViewMode): void
  (e: 'open-advanced-filters'): void
}>()

const { t } = useI18n()

const dateShortcuts = computed(() => buildDateShortcuts(t))

/*
 * Two-way bindings via emit. We deliberately don't mutate props directly so
 * Locations.vue stays the single source of truth for shareable state.
 */
function onDateRangeChange(value: [number, number]) {
  emit('update:dateRange', value)
}
function onSearchChange(value: string) {
  emit('update:searchText', value)
}

const sortOptions = computed(() => [
  { label: t('sortByName'), key: 'name' as SortKey },
  { label: t('sortByCreated'), key: 'createdAt' as SortKey },
  { label: t('sortByActiveUsers'), key: 'users' as SortKey },
  { label: t('sortByCalls'), key: 'calls' as SortKey },
  { label: t('sortByEmails'), key: 'emails' as SortKey },
  { label: t('sortByContacts'), key: 'contacts' as SortKey },
])

function onSortSelect(key: SortKey) {
  emit('update:sortBy', key)
}

const sortDirOptions = computed(() => [
  { label: t('ascending'), key: 'asc' as SortDirection },
  { label: t('descending'), key: 'desc' as SortDirection },
])

function onSortDirSelect(key: SortDirection) {
  emit('update:sortDirection', key)
}

// [N6 audit fix] Role-prefixed label so the button identifies itself.
const sortByLabel = computed(() => {
  const opt = sortOptions.value.find(o => o.key === props.sortBy)
  return t('sortPrefix', { label: opt?.label ?? t('sortBy') })
})

// [N4 audit fix] Match button label format to the option-picker format.
const sortDirLabel = computed(() =>
  props.sortDirection === 'asc' ? t('aToZ') : t('zToA')
)

/*
 * The columns popover writes immutably back to Locations.vue — clone, mutate
 * the clone, emit. This keeps Vue's reactivity tracking clean and avoids
 * surprising parent state mutations.
 */
const columnList: { key: ColumnKey; label: string }[] = [
  { key: 'users', label: t('columnActiveUsers') },
  { key: 'calls', label: t('columnCalls') },
  { key: 'emails', label: t('columnEmails') },
  { key: 'sms', label: t('columnSms') },
  { key: 'contacts', label: t('columnContacts') },
  { key: 'appointments', label: t('columnAppointments') },
  { key: 'reviews', label: t('columnReviews') },
]

function toggleColumn(key: ColumnKey) {
  const next = { ...props.visibleColumns, [key]: !props.visibleColumns[key] }
  emit('update:visibleColumns', next)
}

function toggleViewMode() {
  emit('update:viewMode', props.viewMode === 'card' ? 'table' : 'card')
}

const viewToggleTooltip = computed(() =>
  props.viewMode === 'card' ? t('tooltipViewTable') : t('tooltipViewCard')
)
</script>

<template>
  <!--
    Production layout: date range pinned LEFT, all other controls flow RIGHT.
    `justify-content: space-between` pushes the two end-groups apart; on
    narrow widths the right group wraps below the date pill (gap on the
    parent absorbs the line break gracefully).
  -->
  <div class="filter-strip">
    <!-- LEFT — date range only -->
    <div class="filter-strip__left">
      <div class="w-72">
        <UIDatepicker
          id="filters-date-picker"
          :value="dateRange"
          type="daterange"
          :shortcuts="dateShortcuts"
          @update:value="onDateRangeChange"
        />
      </div>
    </div>

    <!-- RIGHT — search + display + filter + utilities (single visual cluster
         to match prod, where the whole right side reads as one grouped row) -->
    <div class="filter-strip__right">
      <div class="w-64">
        <UIInput
          id="filters-search"
          :value="searchText"
          :placeholder="t('searchSubAccount')"
          clearable
          @update:value="onSearchChange"
        >
          <template #prefix>
            <SearchMdIcon class="h-4 w-4" />
          </template>
        </UIInput>
      </div>

      <UIPopover trigger="click" placement="bottom-start">
        <template #trigger>
          <UIButton id="filters-columns">
            {{ t('columns') }}
            <Columns03Icon class="ml-2 h-4 w-4" />
          </UIButton>
        </template>
        <div class="columns-popover">
          <div class="text-sm font-medium text-gray-700 mb-2">
            {{ t('showColumns') }}
          </div>
          <div class="flex flex-col gap-2">
            <UICheckbox
              v-for="col in columnList"
              :id="'col-toggle-' + col.key"
              :key="col.key"
              :checked="visibleColumns[col.key]"
              @update:checked="toggleColumn(col.key)"
            >
              {{ col.label }}
            </UICheckbox>
          </div>
        </div>
      </UIPopover>

      <UIDropdown
        id="filters-sort-by-dropdown"
        :options="sortOptions"
        placement="bottom-start"
        @select="onSortSelect"
      >
        <UIButton id="filters-sort-by">
          {{ sortByLabel }}
          <ChevronDownIcon class="ml-2 h-4 w-4" />
        </UIButton>
      </UIDropdown>

      <UIDropdown
        id="filters-sort-order-dropdown"
        :options="sortDirOptions"
        placement="bottom-start"
        @select="onSortDirSelect"
      >
        <UIButton id="filters-sort-order">
          {{ sortDirLabel }}
          <ChevronDownIcon class="ml-2 h-4 w-4" />
        </UIButton>
      </UIDropdown>

      <UITooltip placement="bottom">
        <template #trigger>
          <UIButton
            id="filters-funnel"
            :aria-label="t('tooltipFunnel')"
            @click="emit('open-advanced-filters')"
          >
            <FilterLinesIcon class="h-4 w-4" />
          </UIButton>
        </template>
        {{ t('tooltipFunnel') }}
      </UITooltip>

      <BulkActionHistoryPopover>
        <UITooltip placement="bottom">
          <template #trigger>
            <UIButton
              id="filters-history"
              :aria-label="t('tooltipHistory')"
            >
              <ClockRewindIcon class="h-4 w-4" />
            </UIButton>
          </template>
          {{ t('tooltipHistory') }}
        </UITooltip>
      </BulkActionHistoryPopover>

      <UITooltip placement="bottom">
        <template #trigger>
          <UIButton
            id="filters-view-toggle"
            :aria-label="viewToggleTooltip"
            @click="toggleViewMode"
          >
            <LayoutAlt03Icon class="h-4 w-4" />
          </UIButton>
        </template>
        {{ viewToggleTooltip }}
      </UITooltip>
    </div>
  </div>
</template>

<style scoped>
/*
 * Production layout (matches app.gohighlevel.com/sub-accounts):
 *   - Date range floats LEFT
 *   - Search + Columns + Sort + A-Z + funnel + history + view-toggle align RIGHT
 *   - 8px gap between right-side controls so they read as one cluster
 *   - 16px row gap when wrapping at narrow viewports
 */
.filter-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.filter-strip__left,
.filter-strip__right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.columns-popover {
  min-width: 200px;
  padding: 4px;
}
</style>
