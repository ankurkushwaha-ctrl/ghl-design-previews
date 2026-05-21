<!--
  FeaturePicker.vue
  ────────────────────────────────────────────────────────────────────────────
  Always-visible inline panel with search + grouped feature list.

  Each feature row has a checkbox on the right:
    ✓ checked  = feature is in the recipe
    ☐ unchecked = feature is not in the recipe

  Clicking a row toggles the feature in/out of the recipe. No "Done"
  button, no open/close state — the picker is always present in the
  modal body, with the recipe list below it.

  Layout (top to bottom):
    1. Search row:      [🔍 Search features…]     [+ Add N matching]
    2. Grouped list:    GROUP NAME (uppercase secondary)  [+ Add group]
                          Sub-group label (indented secondary)
                            ☐/✓  Leaf name          [X of Y on]
                          ...
-->
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { CurrentStateBySubAccount, FeatureGroup, Recipe } from './types'

const props = defineProps<{
  catalog: FeatureGroup[]
  recipe: Recipe
  totalFeatureCount: number
  currentState: CurrentStateBySubAccount
  selectedCount: number
}>()

const emit = defineEmits<{
  (e: 'toggle', featureId: string): void
  (e: 'add-matching', featureIds: string[]): void
  (e: 'add-group', featureIds: string[]): void
  (e: 'remove-group', featureIds: string[]): void
  (e: 'select-all'): void
  (e: 'remove-all'): void
}>()

const { t } = useI18n()

const query = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

watch(
  () => searchInputRef.value,
  async (el) => {
    if (!el) return
    await nextTick()
    el.focus()
  },
  { immediate: true },
)

const addedIds = computed(() => new Set(props.recipe.map((e) => e.featureId)))

function currentOnCount(featureId: string): number {
  return props.currentState.get(featureId) ?? 0
}

/* ── Search + filtered groups ─────────────────────────────────────────── */
const normalizedQuery = computed(() => query.value.trim().toLowerCase())

function leafMatches(featureName: string, groupName: string, subGroup: string | undefined): boolean {
  const q = normalizedQuery.value
  if (!q) return true
  return (
    featureName.toLowerCase().includes(q) ||
    groupName.toLowerCase().includes(q) ||
    (subGroup ? subGroup.toLowerCase().includes(q) : false)
  )
}

const filteredGroups = computed(() => {
  return props.catalog
    .map((group) => {
      const features = group.features.filter((f) =>
        leafMatches(f.name, group.name, f.subGroup),
      )
      return { ...group, features }
    })
    .filter((g) => g.features.length > 0)
})

function bySubGroup(group: { features: typeof props.catalog[number]['features'] }) {
  const map = new Map<string | null, typeof group.features>()
  for (const f of group.features) {
    const key = f.subGroup ?? null
    const list = map.get(key) ?? []
    list.push(f)
    map.set(key, list)
  }
  return Array.from(map.entries()).map(([subGroup, features]) => ({
    subGroup,
    features,
  }))
}

/* ── "+ Add N matching" button ────────────────────────────────────────── */
const matchingUnaddedIds = computed(() => {
  if (!normalizedQuery.value) return []
  return filteredGroups.value
    .flatMap((g) => g.features)
    .filter((f) => !addedIds.value.has(f.id))
    .map((f) => f.id)
})

const showAddMatching = computed(() => matchingUnaddedIds.value.length >= 2)

const noResults = computed(
  () => normalizedQuery.value !== '' && filteredGroups.value.length === 0,
)

function onRowClick(featureId: string) {
  emit('toggle', featureId)
}

function addedCountInGroup(group: { features: typeof props.catalog[number]['features'] }): number {
  return group.features.filter((f) => addedIds.value.has(f.id)).length
}

function groupCheckState(group: { features: typeof props.catalog[number]['features'] }): 'all' | 'some' | 'none' {
  const added = addedCountInGroup(group)
  if (added === 0) return 'none'
  if (added === group.features.length) return 'all'
  return 'some'
}

function onToggleGroup(group: { features: typeof props.catalog[number]['features'] }) {
  const state = groupCheckState(group)
  const allIds = group.features.map((f) => f.id)
  if (state === 'all') {
    emit('remove-group', allIds)
  } else {
    const unadded = group.features.filter((f) => !addedIds.value.has(f.id)).map((f) => f.id)
    if (unadded.length > 0) emit('add-group', unadded)
  }
}
</script>

<template>
  <div class="picker">
    <!-- Header strip (mirrors RecipeList header pattern) -->
    <div class="picker__header">
      <span class="picker__header-count">
        {{ addedIds.size === 0
          ? 'Select features to update'
          : `${addedIds.size} ${addedIds.size === 1 ? 'feature' : 'features'} selected`
        }}
      </span>
      <div class="picker__header-actions">
        <button
          type="button"
          class="picker__header-btn"
          :disabled="addedIds.size === totalFeatureCount"
          @click="emit('select-all')"
        >
          Select all
        </button>
        <button
          type="button"
          class="picker__header-btn"
          :disabled="addedIds.size === 0"
          @click="emit('remove-all')"
        >
          Remove all
        </button>
      </div>
    </div>

    <!-- Search row -->
    <div class="picker__search-row">
      <div class="picker__search-input">
        <div class="picker__input-wrap">
          <i class="fas fa-search picker__input-icon" aria-hidden="true" />
          <input
            id="update-features-picker-search"
            ref="searchInputRef"
            v-model="query"
            type="text"
            class="picker__input"
            :placeholder="t('agency.bulkActions.updateFeatures.searchPlaceholder')"
          />
          <button
            v-if="query"
            type="button"
            class="picker__input-clear"
            aria-label="Clear search"
            @click="query = ''"
          >
            <i class="fas fa-times" aria-hidden="true" />
          </button>
        </div>
      </div>
      <button
        v-if="showAddMatching"
        type="button"
        class="picker__add-matching"
        @click="emit('add-matching', matchingUnaddedIds)"
      >
        {{
          t('agency.bulkActions.updateFeatures.addMatching', {
            count: matchingUnaddedIds.length,
          })
        }}
      </button>
    </div>

    <!-- Feature list -->
    <div class="picker__list" role="listbox" aria-label="Available features">
      <div
        v-if="noResults"
        class="picker__no-results"
      >
        {{
          t('agency.bulkActions.updateFeatures.pickerNoResults', {
            query,
          })
        }}
      </div>

      <div
        v-for="group in filteredGroups"
        v-else
        :key="group.id"
        class="picker__group"
      >
        <div class="picker__group-header" @click="onToggleGroup(group)">
          <span class="picker__group-name">{{ group.name }}</span>
          <span
            class="picker__group-check"
            :class="{
              'picker__group-check--on': groupCheckState(group) === 'all',
              'picker__group-check--partial': groupCheckState(group) === 'some',
            }"
          >
            <i v-if="groupCheckState(group) === 'all'" class="fas fa-check" aria-hidden="true" />
            <i v-else-if="groupCheckState(group) === 'some'" class="fas fa-minus" aria-hidden="true" />
          </span>
        </div>
        <div
          v-for="bucket in bySubGroup(group)"
          :key="bucket.subGroup ?? '__none__'"
          class="picker__bucket"
        >
          <div
            v-if="bucket.subGroup"
            class="picker__sub-group"
          >
            {{ bucket.subGroup }}
          </div>
          <div class="picker__leaves">
            <button
              v-for="f in bucket.features"
              :key="f.id"
              type="button"
              class="picker__leaf"
              :class="{
                'picker__leaf--indented': !!bucket.subGroup,
                'picker__leaf--checked': addedIds.has(f.id),
              }"
              role="option"
              :aria-selected="addedIds.has(f.id)"
              @click="onRowClick(f.id)"
            >
              <span class="picker__leaf-name">{{ f.name }}</span>
              <span
                class="picker__leaf-dot"
                :class="{
                  'picker__leaf-dot--hidden': addedIds.has(f.id),
                  'picker__leaf-dot--on': !addedIds.has(f.id) && currentOnCount(f.id) === selectedCount,
                  'picker__leaf-dot--mixed': !addedIds.has(f.id) && currentOnCount(f.id) > 0 && currentOnCount(f.id) < selectedCount,
                  'picker__leaf-dot--off': !addedIds.has(f.id) && currentOnCount(f.id) === 0,
                }"
                :data-tip="addedIds.has(f.id) ? '' : (currentOnCount(f.id) === selectedCount
                  ? 'Enabled on all'
                  : currentOnCount(f.id) === 0
                    ? 'Disabled on all'
                    : `${currentOnCount(f.id)}/${selectedCount} enabled`)"
              />
              <!-- Checkbox indicator -->
              <span class="picker__check" :class="{ 'picker__check--on': addedIds.has(f.id) }">
                <i v-if="addedIds.has(f.id)" class="fas fa-check" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker {
  display: flex;
  flex-direction: column;
  background: var(--base-white, #ffffff);
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
  max-height: 280px;
  flex: 0 1 280px;
}

/* ─── Header strip (matches RecipeList__header) ─────────────────────── */
.picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--gray-50, #f9fafb);
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}

.picker__header-count {
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700, #344054);
}

.picker__header-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.picker__header-btn {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--gray-700, #344054);
  background: var(--base-white, #ffffff);
  border: 1px solid var(--gray-300, #d0d5dd);
  border-radius: 6px;
  padding: 2px 8px;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}

.picker__header-btn:hover {
  background: var(--gray-50, #f9fafb);
  border-color: var(--gray-400, #98a2b3);
}

.picker__header-btn:disabled {
  opacity: 0.4;
  cursor: default;
  background: var(--base-white, #ffffff);
  border-color: var(--gray-200, #eaecf0);
}

.picker__header-btn:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

/* ─── Search row ─────────────────────────────────────────────────────── */
.picker__search-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}

.picker__search-input {
  flex: 1 1 auto;
  min-width: 0;
}

.picker__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.picker__input-icon {
  position: absolute;
  left: 10px;
  font-size: 13px;
  color: var(--gray-400, #98a2b3);
  pointer-events: none;
}

.picker__input {
  width: 100%;
  height: 32px;
  padding: 0 28px 0 30px;
  border: 1px solid var(--gray-300, #d0d5dd);
  border-radius: 6px;
  background: var(--base-white, #ffffff);
  font-family: inherit;
  font-size: var(--hr-font-size-md, 13px);
  color: var(--gray-900, #101828);
  outline: none;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}

.picker__input::placeholder {
  color: var(--gray-400, #98a2b3);
}

.picker__input:focus {
  border-color: var(--primary-300, #84adff);
  box-shadow: 0 0 0 3px rgba(21, 94, 239, 0.12);
}

.picker__input-clear {
  position: absolute;
  right: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--gray-400, #98a2b3);
  font-size: 12px;
  cursor: pointer;
}

.picker__input-clear:hover {
  color: var(--gray-600, #475467);
  background: var(--gray-100, #f2f4f7);
}

.picker__add-matching {
  flex: 0 0 auto;
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--primary-700, #004eeb);
  background: transparent;
  border: 1px solid var(--primary-200, #b2ccff);
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.picker__add-matching:hover {
  background: var(--primary-25, #f5f8ff);
}

.picker__add-matching:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

/* ─── Feature list ───────────────────────────────────────────────────── */
.picker__list {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 0;
}

.picker__no-results {
  padding: 24px 4px;
  text-align: center;
  font-size: 13px;
  color: var(--gray-500, #667085);
}

.picker__group {
  overflow: hidden;
}

.picker__group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  background: var(--gray-100, #f2f4f7);
  border-top: 1px solid var(--gray-200, #eaecf0);
  border-bottom: 1px solid var(--gray-200, #eaecf0);
  cursor: pointer;
  transition: background 0.12s ease;
}

.picker__group:first-child .picker__group-header {
  border-top: none;
}

.picker__group-header:hover {
  background: var(--gray-200, #eaecf0);
}

.picker__group-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-600, #475467);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.picker__group-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  border-radius: 4px;
  border: 1.5px solid var(--gray-300, #d0d5dd);
  background: var(--base-white, #ffffff);
  font-size: 11px;
  color: transparent;
  cursor: pointer;
  transition: all 0.12s ease;
}

.picker__group-check--on {
  border-color: var(--primary-600, #155eef);
  background: var(--primary-600, #155eef);
  color: #ffffff;
}

.picker__group-check--partial {
  border-color: var(--primary-600, #155eef);
  background: var(--primary-600, #155eef);
  color: #ffffff;
}

.picker__bucket + .picker__bucket {
  margin-top: 4px;
}

.picker__sub-group {
  padding: 4px 4px 2px 12px;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-500, #667085);
}

.picker__leaves {
  display: flex;
  flex-direction: column;
}

.picker__leaf {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-bottom: 0.5px solid var(--gray-200, #eaecf0);
  border-radius: 0;
  text-align: left;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-900, #101828);
  cursor: pointer;
  transition: background 0.12s ease;
}

.picker__leaf:last-child {
  border-bottom: none;
}

.picker__leaf--indented {
  padding-left: 24px;
}

.picker__leaf:hover {
  background: var(--gray-50, #f9fafb);
}

.picker__leaf--checked {
  background: var(--primary-25, #f5f8ff);
}

.picker__leaf--checked:hover {
  background: var(--primary-50, #eff4ff);
}

.picker__leaf:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: -2px;
}

.picker__leaf-name {
  flex: 1 1 auto;
}

.picker__leaf-dot {
  position: relative;
  flex: 0 0 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gray-300, #d0d5dd);
}

.picker__leaf-dot::after {
  content: attr(data-tip);
  position: absolute;
  right: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%);
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--gray-900, #101828);
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease;
}

.picker__leaf-dot:hover::after {
  opacity: 1;
}
.picker__leaf-dot--hidden {
  visibility: hidden;
}
.picker__leaf-dot--on {
  background: var(--success-500, #12b76a);
}
.picker__leaf-dot--mixed {
  background: var(--warning-400, #fdb022);
}
.picker__leaf-dot--off {
  background: var(--gray-300, #d0d5dd);
}

/* ─── Checkbox indicator ─────────────────────────────────────────────── */
.picker__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  border-radius: 4px;
  border: 1.5px solid var(--gray-300, #d0d5dd);
  background: var(--base-white, #ffffff);
  font-size: 11px;
  color: transparent;
  transition: all 0.12s ease;
}

.picker__check--on {
  border-color: var(--primary-600, #155eef);
  background: var(--primary-600, #155eef);
  color: #ffffff;
}
</style>
