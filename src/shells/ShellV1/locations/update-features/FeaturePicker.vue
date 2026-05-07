<!--
  FeaturePicker.vue
  ────────────────────────────────────────────────────────────────────────────
  Popover-style panel that opens in place of the "+ Add a feature" button.

  Layout (top to bottom):
    1. Bulk-add row:    [+ Enable all/remaining N]  [+ Disable all/remaining N]
                        (hidden when every feature is already in the recipe)
    2. Divider:         ── or pick individually ──
    3. Search row:      [Search features…]              [+ Add N matching]
                        ("+ Add N matching" only when query is present AND ≥2 matches)
    4. Grouped list:    GROUP NAME (uppercase secondary)
                          Sub-group label (indented secondary)
                            Leaf · already added (disabled when already in recipe)
                          ...
    5. Done button:     bottom-right

  Click a leaf → emit 'add' with featureId, picker closes (parent decides).

  No nested modal — this is a panel inside the modal body. Picker scrolls
  internally; the body region scrolls separately.
-->
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { HLButton } from '@/components/highrise'

import type { CurrentStateBySubAccount, FeatureGroup, Recipe } from './types'

const props = defineProps<{
  catalog: FeatureGroup[]
  recipe: Recipe
  totalFeatureCount: number
  currentState: CurrentStateBySubAccount
  selectedCount: number
}>()

const emit = defineEmits<{
  (e: 'add', featureId: string): void
  (e: 'add-matching', featureIds: string[]): void
  (e: 'add-group', featureIds: string[]): void
  (e: 'done'): void
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

/** How many of the selected sub-accounts currently have a given feature ON. */
function currentOnCount(featureId: string): number {
  return props.currentState.get(featureId) ?? 0
}

/* ──────────────────────────────────────────────────────────────────────
 * Search + filtered groups
 * Filter matches across leaf name, group name, and sub-group name.
 * Empty groups are dropped from render so the user doesn't see ghost
 * headers when their query narrows the catalog.
 * ────────────────────────────────────────────────────────────────────── */
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

/**
 * For sub-grouped groups (CRM): regroup the leaves by subGroup so the
 * picker can render an indented sub-heading per group. Returns
 * { subGroup: string | null, features: Feature[] }[].
 */
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

/* ──────────────────────────────────────────────────────────────────────
 * "+ Add N matching" button — only when query is present AND ≥2 matches
 * AND those matches include at least one un-added feature.
 *
 * Why ≥2: a single-match query is faster to add by clicking the leaf
 * directly. The bulk-narrow affordance only earns its weight when the
 * user has multiple matches.
 * ────────────────────────────────────────────────────────────────────── */
const matchingUnaddedIds = computed(() => {
  if (!normalizedQuery.value) return []
  return filteredGroups.value
    .flatMap((g) => g.features)
    .filter((f) => !addedIds.value.has(f.id))
    .map((f) => f.id)
})

const showAddMatching = computed(() => matchingUnaddedIds.value.length >= 2)

/* ──────────────────────────────────────────────────────────────────────
 * Empty results
 * ────────────────────────────────────────────────────────────────────── */
const noResults = computed(
  () => normalizedQuery.value !== '' && filteredGroups.value.length === 0,
)

function onLeafClick(featureId: string) {
  if (addedIds.value.has(featureId)) return
  emit('add', featureId)
}

function unaddedInGroup(group: { features: typeof props.catalog[number]['features'] }): string[] {
  return group.features.filter((f) => !addedIds.value.has(f.id)).map((f) => f.id)
}

function onAddGroup(group: { features: typeof props.catalog[number]['features'] }) {
  const ids = unaddedInGroup(group)
  if (ids.length > 0) emit('add-group', ids)
}
</script>

<template>
  <div class="picker">
    <!-- Search + add-matching row -->
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

    <!-- 4. Feature list -->
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
        <div class="picker__group-header">
          <span class="picker__group-name">{{ group.name }}</span>
          <button
            v-if="unaddedInGroup(group).length > 0"
            type="button"
            class="picker__add-group"
            @click="onAddGroup(group)"
          >
            {{ t('agency.bulkActions.updateFeatures.pickerAddGroup') }}
          </button>
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
                'picker__leaf--disabled': addedIds.has(f.id),
              }"
              :disabled="addedIds.has(f.id)"
              @click="onLeafClick(f.id)"
            >
              <span class="picker__leaf-name">{{ f.name }}</span>
              <span
                v-if="addedIds.has(f.id)"
                class="picker__leaf-tag"
              >
                · {{ t('agency.bulkActions.updateFeatures.alreadyAdded') }}
              </span>
              <span
                v-else
                class="picker__leaf-badge"
              >
                {{
                  t('agency.bulkActions.updateFeatures.pickerCurrentState', {
                    count: currentOnCount(f.id),
                    total: selectedCount,
                  })
                }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Done -->
    <div class="picker__footer">
      <HLButton variant="secondary" size="sm" @click="emit('done')">
        {{ t('agency.bulkActions.updateFeatures.pickerDone') }}
      </HLButton>
    </div>
  </div>
</template>

<style scoped>
.picker {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
  /* Bound the picker so its internal list scrolls instead of stretching
     the modal. The list itself has overflow-y inside this bound. */
  max-height: 420px;
}

/* ─── Search + add-matching ──────────────────────────────────────────── */
.picker__search-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px 8px;
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
  font-size: 11px;
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
  font-size: 12px;
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
  padding: 0 12px 8px;
}

.picker__no-results {
  padding: 24px 4px;
  text-align: center;
  font-size: 13px;
  color: var(--gray-500, #667085);
}

.picker__group + .picker__group {
  margin-top: 12px;
}

.picker__group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px 4px;
}

.picker__group-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--gray-500, #667085);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.picker__add-group {
  font-size: 12px;
  font-weight: 500;
  color: var(--primary-700, #004eeb);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.picker__add-group:hover {
  color: var(--primary-800, #0040c1);
  text-decoration: underline;
}

.picker__add-group:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
  border-radius: 2px;
}

.picker__bucket + .picker__bucket {
  margin-top: 4px;
}

.picker__sub-group {
  padding: 4px 4px 2px 12px;
  font-size: 12px;
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
  padding: 6px 8px;
  background: transparent;
  border: none;
  border-radius: 4px;
  text-align: left;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-900, #101828);
  cursor: pointer;
  transition: background 0.12s ease;
}

.picker__leaf--indented {
  padding-left: 24px;
}

.picker__leaf:hover:not(.picker__leaf--disabled) {
  background: var(--gray-50, #f9fafb);
}

.picker__leaf:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: -2px;
}

.picker__leaf--disabled {
  color: var(--gray-400, #98a2b3);
  cursor: not-allowed;
}

.picker__leaf-name {
  flex: 1 1 auto;
}

.picker__leaf-tag {
  flex: 0 0 auto;
  font-size: 11px;
  color: var(--gray-400, #98a2b3);
}

.picker__leaf-badge {
  flex: 0 0 auto;
  font-size: 11px;
  font-weight: 500;
  color: var(--gray-400, #98a2b3);
  background: var(--gray-100, #f2f4f7);
  padding: 1px 6px;
  border-radius: 4px;
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
.picker__footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  border-top: 0.5px solid var(--gray-200, #eaecf0);
  background: #ffffff;
}

</style>
