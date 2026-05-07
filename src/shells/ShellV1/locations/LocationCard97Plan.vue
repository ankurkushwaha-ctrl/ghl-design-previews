<!--
  LocationCard97Plan.vue
  ────────────────────────────────────────────────────────────────────────────
  Vendored from:
    ghl-revex-frontend/apps/locations/src/components/locations/overview/LocationCard97Plan.vue

  This file diverges from upstream because the preview is interactive: each
  card now wires its checkbox, name click, Reports popover, Switch button,
  and 3-dot menu through to the parent Locations.vue. Upstream's behavior
  was a hard-coded `dropdownOpts = [{ label: 'Manage Client' }]`; the brief
  asks for a 6-item menu (Edit/Settings/Suspend/Resume/Transfer/Delete) so
  we replace the options array. The TEMPLATE structure stays close to
  upstream so dev can lift it back into spm-ts.

  Selection highlight (`location-card--selected` class) is preview-only:
  upstream cards don't have a hover/selected border. We add it here so the
  bulk-actions selection state reads visually.
-->
<script setup lang="ts">
import {
  DotsVerticalIcon,
  LineChartUp03Icon,
  MarkerPin02Icon,
  PhoneIcon,
  SwitchHorizontal01Icon,
} from '@gohighlevel/ghl-icons/24/outline'
import {
  UIAvatar,
  UICard,
  UICheckbox,
  UIDropdown,
  UITag,
  UITextLgMedium,
  UITextMdMedium,
  UITextSmNormal,
} from '@gohighlevel/ghl-ui'
import { computed, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Metrics from './Metrics.vue'
import ReportsPopover from './ReportsPopover.vue'
import type { ColumnKey, VisibleColumns } from './types'

const { t } = useI18n()

const props = defineProps({
  location: { type: Object, required: true },
  columns: { type: Array as PropType<Array<any>>, required: true },
  company: { type: Object, required: true },
  extras: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  visibleColumns: {
    type: Object as PropType<VisibleColumns | null>,
    default: null,
  },
})

const emit = defineEmits([
  'route',
  'details',
  'switch-to-location',
  'select',
  'card-action',
])

/*
 * Dropdown menu for the 3-dot button in the card footer.
 * Upstream renders a single "Manage Client" item; the brief asks for the
 * full 6-item action menu so we expand it here.
 */
const dropdownOpts = computed(() => [
  { label: t('menuEdit'), key: 'edit' },
  { label: t('menuSettings'), key: 'settings' },
  { label: t('menuSuspend'), key: 'suspend' },
  { label: t('menuResume'), key: 'resume' },
  { label: t('menuTransfer'), key: 'transfer' },
  { label: t('menuDelete'), key: 'delete' },
])

function onDropdownSelect(key: string) {
  emit('card-action', { action: key, location: props.location })
}

function onClickDetails() {
  emit('details', { id: props.location.id })
}

function onSwitch() {
  emit('switch-to-location', { id: props.location.id })
}

function onSelect(checked: boolean) {
  emit('select', { id: props.location.id, checked })
}

/*
 * Filter `extras.filters.fields` by the visibleColumns map. If the columns
 * picker hasn't toggled anything off, we fall back to upstream's default
 * (every metric kind in extras.filters.fields).
 */
const effectiveFields = computed<string[]>(() => {
  const upstreamFields = (props.extras?.filters?.fields ?? []) as string[]
  if (!props.visibleColumns) return upstreamFields
  return upstreamFields.filter(
    (field) => props.visibleColumns![field as ColumnKey] !== false
  )
})
</script>

<template>
  <div
    :id="'loc-' + location.id"
    class="location-card"
    :class="{ 'location-card--selected': selected }"
    role="listitem"
  >
    <UICard>
      <div
        class="card-body flex !p-0"
        @click.self="onClickDetails"
      >
        <div class="flex-1" @click.self="onClickDetails">
          <!-- 97 Plan Badge -->
          <div class="mb-2 flex items-center justify-start px-4 pt-4">
            <UITag type="warning" size="small" round>
              {{ t('locations.plan97Location') }}
            </UITag>
          </div>

          <div class="mb-5 flex items-center">
            <div class="mr-4">
              <UICheckbox
                :id="'loc-' + location.id + '-checkbox'"
                :checked="selected"
                @update:checked="onSelect"
              />
            </div>
            <div class="h-10 w-10 cursor-pointer" @click="onClickDetails">
              <img
                v-if="location.logo"
                class="h-10 w-10 rounded-full border border-rose-500 object-cover"
                :alt="location.name"
                :src="location.logo"
              />
              <UIAvatar
                v-else
                :id="'loc-' + location.id + '__avatar'"
                :size="'large'"
              >{{ location.name ? location.name[0] : '' }}
              </UIAvatar>
            </div>
            <div class="location-title">
              <UITextLgMedium
                :id="'pg-agency-locations__lbl-' + location.id + '-name'"
                class="pointer pg-agency-locations__lbl--location-name text-lg text-gray-900"
                @click.prevent="onClickDetails"
              >
                {{ location.name }}
              </UITextLgMedium>
            </div>
            <div class="ml-2 flex items-center">
              <UITag
                v-if="location.status === 'prospect'"
                :id="'loc-' + location.id + '__prospect'"
                :type="'default'"
                :round="true"
                :size="'small'"
              >
                {{ $t('readyToSell') }}
              </UITag>
              <UITag
                v-else-if="location.status === 'account'"
                :id="'loc-' + location.id + '__account'"
                :type="'info'"
                :round="true"
                :size="'small'"
              >
                {{ $t('closedWon') }}
              </UITag>
            </div>
          </div>
          <div @click="onClickDetails">
            <div v-if="location.address" class="mt-2">
              <UITextSmNormal
                :id="'loc-' + location.id + '__address1'"
                class="flex items-center text-gray-500"
              >
                <MarkerPin02Icon
                  :id="'loc-' + location.id + '__address_marker'"
                  class="mr-2 h-4 w-4"
                />
                {{ location.address }}, {{ location.city }},
                {{ location.state }}
                {{ location.postalCode }}
              </UITextSmNormal>
            </div>

            <div v-if="location.phone" class="mt-2">
              <UITextSmNormal
                :id="'loc-' + location.id + '__phone'"
                class="flex items-center text-gray-500"
              >
                <PhoneIcon
                  :id="'loc-' + location.id + '__phone_icon'"
                  class="mr-2 h-4 w-4"
                />
                {{ location.phone }}
              </UITextSmNormal>
            </div>
          </div>
        </div>
        <Metrics
          :location-id="props.location.id"
          :metrics="location.report || {}"
          :previous-metrics="{}"
          :fields="effectiveFields"
        />
      </div>
      <template #footer>
        <div class="footer flex">
          <div class="footer-left flex">
            <!-- 97 Plan specific features displayed here -->
            <div class="plan-features text-sm text-gray-600 px-4">
              {{ t('locations.plan97FeaturesActive') }}
            </div>
          </div>
          <div class="footer-right flex">
            <!-- Reports → opens 5-link popover -->
            <ReportsPopover :location-name="location.name">
              <div
                class="footer-reports pg-agency-locations__btn--location-reports flex items-center no-underline"
              >
                <LineChartUp03Icon
                  :id="'loc-' + location.id + '__reports_icon'"
                  class="pointer h-4 w-4 text-gray-500"
                />
                <UITextMdMedium
                  :id="'loc-' + location.id + '__reports'"
                  class="pointer pg-agency-locations__btn--reports ml-1 text-sm text-gray-500"
                  >{{ $t('reports') }}</UITextMdMedium
                >
              </div>
            </ReportsPopover>

            <div
              class="footer-switch pg-agency-locations__link--switch-to-subaccount flex cursor-pointer items-center"
              @click.prevent="onSwitch"
            >
              <SwitchHorizontal01Icon
                :id="'loc-' + location.id + '__switch_icon'"
                class="pointer h-4 w-4 text-blue-700"
              />
              <UITextMdMedium
                :id="'loc-' + location.id + '__switch'"
                class="pointer ml-1 text-sm text-blue-700"
                >{{ $t('switchToSubAccount') }}</UITextMdMedium
              >
            </div>

            <div class="footer-dots flex items-center">
              <UIDropdown
                :id="'loc-opts-' + props.location.id"
                :options="dropdownOpts"
                placement="bottom-end"
                @select="onDropdownSelect"
              >
                <DotsVerticalIcon
                  :id="'loc-opts-' + props.location.id + '__dots'"
                  class="pointer h-4 w-4 text-gray-400"
                />
              </UIDropdown>
            </div>
          </div>
        </div>
      </template>
    </UICard>
  </div>
</template>

<style scoped>
.location-card {
  position: relative;
  transition: box-shadow 0.15s ease;
}
/*
 * Selection treatment: lift the card with a primary-tinted border + shadow,
 * AND a 4px solid primary-500 left edge accent. The left accent is the
 * [N1 audit fix] — the existing border + halo alone read as "subtle hover"
 * on a busy page, while the left bar reads as "marked" at a glance.
 * Pattern reference: GitHub PR file-list selected state.
 *
 * Targets :deep(.hl-card) since UICard renders its own .hl-card root.
 */
.location-card--selected :deep(.hl-card) {
  border-color: var(--primary-500, #9e77ed);
  box-shadow: 0 0 0 4px var(--primary-50, #f9f5ff);
  position: relative;
}

.location-card--selected :deep(.hl-card)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--primary-500, #9e77ed);
  border-radius: 8px 0 0 8px;
}
.card-body > div:first-child {
  flex-basis: 30%;
  cursor: pointer;
}

.card-body > div:last-child {
  flex-basis: 70%;
}

.location-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
}

.footer {
  height: 56px;
  padding-left: 14px;
}
.footer-left {
  flex-basis: 60%;
  align-items: center;
}
.footer-reports {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 4px;
  width: max-content;
  padding: 20px;
  cursor: pointer;
}

.footer-switch {
  gap: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0px 1px 0px 1px;
  border-style: solid;
  border-color: #eaecf0;
  width: max-content;
  padding: 20px;
}

.footer-dots {
  padding: 20px;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}
</style>
