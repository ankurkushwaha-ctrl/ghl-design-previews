<!--
  AdvancedFiltersDrawer.vue
  ────────────────────────────────────────────────────────────────────────────
  Right-side drawer with stub filter rows. Visual reference (heavily
  simplified):
  apps/locations/src/components/smart-lists/components/AdvancedFilterDrawer.vue
  upstream is 600+ lines with smart-list models; here we render a
  static-ish set of rows that change only `localFilters` on submit.

  Apply / Clear emit upward. The toast is owned by Locations.vue so the page
  has a single notification choke point.
-->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UIButton,
  UIDrawer,
  UIDrawerContent,
  UIDatepicker,
  UISelect,
} from '@gohighlevel/ghl-ui'
import {
  type AdvancedFilters,
  DEFAULT_ADVANCED_FILTERS,
} from './types'

const props = defineProps<{
  show: boolean
  filters: AdvancedFilters
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'apply', value: AdvancedFilters): void
  (e: 'clear'): void
}>()

const { t } = useI18n()

// Local copy so the user can tweak then cancel without affecting the page.
const local = ref<AdvancedFilters>({ ...props.filters })

watch(
  () => props.show,
  (isShown) => {
    if (isShown) {
      local.value = { ...props.filters }
    }
  }
)

function statusOptions() {
  return [
    { label: t('statusAll'), value: 'all' },
    { label: t('statusActive'), value: 'active' },
    { label: t('statusSuspended'), value: 'suspended' },
    { label: t('statusDeleted'), value: 'deleted' },
  ]
}

function planOptions() {
  return [
    { label: t('planAll'), value: 'all' },
    { label: t('planStarter'), value: 'starter' },
    { label: t('planPro'), value: 'pro' },
    { label: t('planSaas'), value: 'saas' },
  ]
}

function activityOptions() {
  return [
    { label: t('activityAll'), value: 'all' },
    { label: t('activityActive'), value: 'active' },
    { label: t('activityIdle'), value: 'idle' },
  ]
}

function onApply() {
  emit('apply', { ...local.value })
}

function onClear() {
  local.value = { ...DEFAULT_ADVANCED_FILTERS }
  emit('clear')
}

function close() {
  emit('update:show', false)
}
</script>

<template>
  <UIDrawer
    id="advanced-filters-drawer"
    :show="show"
    :width="420"
    placement="right"
    @update:show="(v) => emit('update:show', v)"
  >
    <UIDrawerContent
      id="advanced-filters-drawer-content"
      :title="t('advancedFilters')"
      :closable="true"
      @close="close"
    >
      <div class="advanced-filters">
        <p class="text-sm text-gray-500 mb-4">
          {{ t('advancedFiltersDesc') }}
        </p>

        <div class="filter-row">
          <label class="filter-row__label">{{ t('filterStatus') }}</label>
          <UISelect
            id="filter-status"
            :value="local.status"
            :options="statusOptions()"
            @update:value="(v: AdvancedFilters['status']) => (local.status = v)"
          />
        </div>

        <div class="filter-row">
          <label class="filter-row__label">{{ t('filterPlan') }}</label>
          <UISelect
            id="filter-plan"
            :value="local.plan"
            :options="planOptions()"
            @update:value="(v: AdvancedFilters['plan']) => (local.plan = v)"
          />
        </div>

        <div class="filter-row">
          <label class="filter-row__label">{{ t('filterCreated') }}</label>
          <UIDatepicker
            id="filter-created"
            :value="local.createdRange ?? undefined"
            type="daterange"
            clearable
            @update:value="(v: [number, number] | null) => (local.createdRange = v)"
          />
        </div>

        <div class="filter-row">
          <label class="filter-row__label">{{ t('filterActivity') }}</label>
          <UISelect
            id="filter-activity"
            :value="local.activity"
            :options="activityOptions()"
            @update:value="(v: AdvancedFilters['activity']) => (local.activity = v)"
          />
        </div>
      </div>

      <template #footer>
        <div class="drawer-footer">
          <UIButton id="filter-clear" type="default" @click="onClear">
            {{ t('clear') }}
          </UIButton>
          <UIButton id="filter-apply" type="primary" @click="onApply">
            {{ t('apply') }}
          </UIButton>
        </div>
      </template>
    </UIDrawerContent>
  </UIDrawer>
</template>

<style scoped>
.advanced-filters {
  padding: 8px 0;
}
.filter-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.filter-row__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-700, #344054);
}
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}
</style>
