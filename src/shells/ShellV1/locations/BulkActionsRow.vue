<!--
  BulkActionsRow.vue
  ────────────────────────────────────────────────────────────────────────────
  Owns the row directly above the cards:
    - Select all checkbox (toggles selection across the visible list)
    - "N selected" status + Clear button (visible only when something is selected)
    - Show agency sub-accounts toggle (filters cards by isAgencySubAccount)
    - Bulk Actions dropdown (enabled only when at least one row is selected)

  Counts and selection state are passed in from Locations.vue. The page
  decides what "all visible" means (after search + filter), so we just
  emit the toggle and let Locations apply the right semantic.

  Bulk-action menu (2026-05-07):
   The 5 options + their `key` values mirror the production Sub-Accounts
   page (https://permissions.version.gohighlevel.site/sub-accounts) and
   the upstream `BulkActionType` enum in
   ghl-revex-frontend/apps/locations/src/constants/index.ts. When this is
   ported upstream, drop the local i18n stub and import the enum directly
   — no rewrite needed.

  UX-audit fixes (2026-05-07):
   - [N1] Visibility — added "N selected" pill so selection count is
     readable at a glance, not buried in the Bulk Actions button label.
   - [N3] Control — added "Clear" link so the user has an obvious exit
     path from a selection.
   - [G2 / N4] Consistency — removed the duplicate history button that
     also lives in the FilterStrip (one entry point per global utility).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  ChevronDownIcon,
  ClockRewindIcon,
} from '@gohighlevel/ghl-icons/24/outline'
import {
  UIButton,
  UICheckbox,
  UIDropdown,
  UISwitch,
  UITooltip,
} from '@gohighlevel/ghl-ui'

const props = defineProps<{
  selectedCount: number
  visibleCount: number
  showAgencySubAccounts: boolean
}>()

const emit = defineEmits<{
  (e: 'update:showAgencySubAccounts', value: boolean): void
  (e: 'toggle-select-all'): void
  (e: 'clear-selection'): void
  (e: 'pick-bulk-action', key: string): void
}>()

const router = useRouter()
const { t } = useI18n()

function onBulkActionHistory() {
  router.push('/bulk-action-history')
}

const allSelected = computed(
  () => props.visibleCount > 0 && props.selectedCount === props.visibleCount
)

const hasSelection = computed(() => props.selectedCount > 0)

const bulkLabel = computed(() => {
  if (props.selectedCount === 0) return t('bulkActions')
  return t('bulkActionsCount', { count: props.selectedCount })
})

/*
 * Order, labels, and keys match production
 * (https://permissions.version.gohighlevel.site/sub-accounts).
 *
 * Keys are kept identical to upstream `BulkActionType` enum values so
 * dispatch wiring is portable as-is. `update-features` is the new option
 * added under the feature-permissions work; it follows the same kebab-case
 * pattern and will land in the upstream enum once that work merges.
 */
const bulkOptions = computed(() => [
  { label: t('enableRebilling'), key: 'enable-rebilling' },
  { label: t('enableSaas'), key: 'enable-saas' },
  { label: t('pauseSubaccount'), key: 'pause-subaccount' },
  { label: t('setupCalendars'), key: 'calendar-settings' },
  { label: t('updateFeatures'), key: 'update-features' },
])

function onBulkSelect(key: string) {
  emit('pick-bulk-action', key)
}
</script>

<template>
  <div class="bulk-actions-row flex items-center justify-between mb-4 px-1">
    <div class="flex items-center gap-3">
      <UICheckbox
        id="select-all"
        :checked="allSelected"
        :indeterminate="selectedCount > 0 && !allSelected"
        @update:checked="emit('toggle-select-all')"
      >
        {{ t('selectAll') }}
      </UICheckbox>

      <!--
        Selection-status pill — only renders when at least one card is
        selected, so the row stays uncluttered in the empty state.
      -->
      <transition name="bulk-actions-row__fade">
        <div v-if="hasSelection" class="bulk-actions-row__selection">
          <span class="bulk-actions-row__count">
            {{ t('nSelected', { count: selectedCount }) }}
          </span>
          <button
            id="clear-selection"
            type="button"
            class="bulk-actions-row__clear"
            @click="emit('clear-selection')"
          >
            {{ t('clearSelection') }}
          </button>
        </div>
      </transition>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2">
        <UISwitch
          id="show-agency-sub-accounts"
          :value="showAgencySubAccounts"
          size="small"
          @update:value="(v: boolean) => emit('update:showAgencySubAccounts', v)"
        />
        <label
          for="show-agency-sub-accounts"
          class="text-sm text-gray-700"
        >
          {{ t('locations.showAgencySubAccountsOnly') }}
        </label>
      </div>

      <!-- Bulk Action History — direct nav (matches upstream LocationList.vue) -->
      <UITooltip placement="top">
        <template #trigger>
          <button
            class="bulk-actions-row__history-btn"
            @click="onBulkActionHistory"
          >
            <ClockRewindIcon class="h-5 w-5" />
          </button>
        </template>
        {{ t('bulkActionHistory') }}
      </UITooltip>

      <UIDropdown
        id="bulk-actions-dropdown"
        :options="bulkOptions"
        placement="bottom-end"
        @select="onBulkSelect"
      >
        <UIButton
          id="bulk-actions"
          :disabled="selectedCount === 0"
        >
          {{ bulkLabel }}
          <ChevronDownIcon class="ml-2 h-4 w-4" />
        </UIButton>
      </UIDropdown>
    </div>
  </div>
</template>

<style scoped>
.bulk-actions-row__selection {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background: var(--primary-50, #f9f5ff);
  border: 1px solid var(--primary-200, #e9d7fe);
  border-radius: 16px;
}

.bulk-actions-row__count {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--primary-700, #6941c6);
  white-space: nowrap;
}

.bulk-actions-row__clear {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--primary-700, #6941c6);
  text-decoration: underline;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.bulk-actions-row__clear:hover {
  color: var(--primary-800, #53389e);
}

.bulk-actions-row__history-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--primary-600, #155eef);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}

.bulk-actions-row__history-btn:hover {
  background: var(--primary-50, #eff4ff);
  color: var(--primary-700, #004eeb);
}

/* Fade-in keeps the row from shifting controls when the selection pill
   appears/disappears — opacity-only, no width/height transition. */
.bulk-actions-row__fade-enter-active,
.bulk-actions-row__fade-leave-active {
  transition: opacity 0.15s ease;
}

.bulk-actions-row__fade-enter-from,
.bulk-actions-row__fade-leave-to {
  opacity: 0;
}
</style>
