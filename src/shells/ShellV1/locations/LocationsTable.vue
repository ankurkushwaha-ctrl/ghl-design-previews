<!--
  LocationsTable.vue
  ────────────────────────────────────────────────────────────────────────────
  Compact table view of the same MOCK_LOCATIONS data the cards render.
  Used when `viewMode === 'table'` in Locations.vue.

  Columns: Name, Status, Active Users, Calls, Contacts, Actions.
  - Name + Status are first; the rest are metric snapshots.
  - "Actions" cell hosts a 3-dot dropdown that mirrors the card-level menu.
  - Each row's checkbox shares state with the card view via `selectedIds`.

  We use h() render functions (the naive-ui pattern UITable expects) instead
  of a v-for/template — UITable's `columns` prop wants `{title, key, render?}`
  objects, not slot composition.
-->
<script setup lang="ts">
import { computed, h } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UITable,
  UICheckbox,
  UITag,
  UIDropdown,
} from '@gohighlevel/ghl-ui'
import { DotsVerticalIcon } from '@gohighlevel/ghl-icons/24/outline'
import type { MockLocation } from './mock-locations'

// Mirrors `reportNumbers` in report_helper.ts (US locale, no decimals).
// Reproduced locally because report_helper.ts doesn't export it.
function reportNumbers(value?: number) {
  return Number(value ?? 0).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}

interface Props {
  locations: MockLocation[]
  selectedIds: Set<string>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-select', id: string): void
  (e: 'card-action', payload: { action: string; location: MockLocation }): void
}>()

const { t } = useI18n()

const rowMenuOptions = computed(() => [
  { label: t('menuEdit'), key: 'edit' },
  { label: t('menuSettings'), key: 'settings' },
  { label: t('menuSuspend'), key: 'suspend' },
  { label: t('menuResume'), key: 'resume' },
  { label: t('menuTransfer'), key: 'transfer' },
  { label: t('menuDelete'), key: 'delete' },
])

/*
 * Naive-UI columns are h()-render based. This is annoying compared to slots
 * but it's how UITable expects per-cell custom rendering.
 */
const columns = computed(() => [
  {
    title: '',
    key: 'select',
    width: 48,
    render(row: MockLocation) {
      return h(UICheckbox, {
        id: `tbl-select-${row.id}`,
        checked: props.selectedIds.has(row.id),
        'onUpdate:checked': () => emit('toggle-select', row.id),
      })
    },
  },
  {
    title: t('colName'),
    key: 'name',
    render(row: MockLocation) {
      return h(
        'div',
        { class: 'flex flex-col' },
        [
          h('div', { class: 'text-sm font-medium text-gray-900' }, row.name),
          h(
            'div',
            { class: 'text-xs text-gray-500' },
            `${row.city}, ${row.state}`
          ),
        ]
      )
    },
  },
  {
    title: t('colStatus'),
    key: 'status',
    render(row: MockLocation) {
      return h(
        UITag,
        {
          type: row.status === 'account' ? 'info' : 'default',
          size: 'small',
          round: true,
        },
        () => (row.status === 'account' ? t('closedWon') : t('readyToSell'))
      )
    },
  },
  {
    title: t('columnActiveUsers'),
    key: 'users',
    render(row: MockLocation) {
      return reportNumbers(row.report.users)
    },
  },
  {
    title: t('columnCalls'),
    key: 'calls',
    render(row: MockLocation) {
      const total = (row.report.callsIn ?? 0) + (row.report.callsOut ?? 0)
      return reportNumbers(total)
    },
  },
  {
    title: t('columnContacts'),
    key: 'contacts',
    render(row: MockLocation) {
      return reportNumbers(row.report.contacts)
    },
  },
  {
    title: t('actionsLabel'),
    key: 'actions',
    width: 80,
    render(row: MockLocation) {
      return h(
        UIDropdown,
        {
          id: `tbl-row-menu-${row.id}`,
          options: rowMenuOptions.value,
          placement: 'bottom-end',
          onSelect: (action: string) => emit('card-action', { action, location: row }),
        },
        {
          default: () =>
            h(DotsVerticalIcon, {
              class: 'h-4 w-4 text-gray-500 cursor-pointer',
            }),
        }
      )
    },
  },
])
</script>

<template>
  <div class="locations-table">
    <UITable
      id="locations-table"
      :columns="columns"
      :data="locations"
      :hide-footer="true"
      striped
    />
  </div>
</template>

<style scoped>
.locations-table {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--gray-200, #eaecf0);
}
</style>
