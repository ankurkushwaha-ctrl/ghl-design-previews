<!--
  RecipeList.vue
  ────────────────────────────────────────────────────────────────────────────
  Bordered card with a tinted header strip + the recipe rows underneath.

  Header strip shows the count and, when there are 3+ rows, "Set all to
  enable" / "Set all to disable" affordances on the right (per brief).

  Rows are rendered via RecipeRow. The list never owns the recipe — it
  takes it as a prop and emits flip/remove/setAll events to the parent.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import RecipeRow from './RecipeRow.vue'
import { computeImpact } from './recipe'
import type {
  CurrentStateBySubAccount,
  DetailedFeatureState,
  Feature,
  FeatureAction,
  Recipe,
} from './types'

const props = defineProps<{
  recipe: Recipe
  features: Map<string, Feature>
  selectedCount: number
  currentState: CurrentStateBySubAccount
  detailedState: DetailedFeatureState
  groupForFeature: Map<string, string>
}>()

const emit = defineEmits<{
  (e: 'flip', featureId: string): void
  (e: 'remove', featureId: string): void
  (e: 'set-group', featureIds: string[], action: FeatureAction): void
  (e: 'set-all', action: FeatureAction): void
}>()

const { t } = useI18n()

const showFlipAll = computed(() => props.recipe.length >= 1)

/**
 * Pre-compute impact for every row so the row component doesn't have
 * to know about the current-state map shape — keeps display data
 * downstream of the pure helpers in recipe.ts.
 */
const rowsWithImpact = computed(() =>
  props.recipe.map((entry) => ({
    entry,
    feature: props.features.get(entry.featureId),
    impact: computeImpact(entry, props.selectedCount, props.currentState),
    group: props.groupForFeature.get(entry.featureId) ?? '',
  })),
)

/**
 * Always show group headers for consistency with Step 1's category
 * hierarchy — users expect the same visual structure across both steps.
 */
const showGroupHeaders = computed(() => {
  const groups = new Set(rowsWithImpact.value.map((r) => r.group))
  return groups.size >= 1
})

/**
 * Grouped rows: preserves recipe order but inserts group labels.
 * Returns an array of { type: 'header', group } | { type: 'row', ...row }.
 */
const groupedRows = computed(() => {
  if (!showGroupHeaders.value) return null
  const result: Array<
    | { type: 'header'; group: string }
    | { type: 'row'; entry: typeof rowsWithImpact.value[0]['entry']; feature: typeof rowsWithImpact.value[0]['feature']; impact: typeof rowsWithImpact.value[0]['impact'] }
  > = []
  let lastGroup = ''
  for (const row of rowsWithImpact.value) {
    if (row.group !== lastGroup) {
      result.push({ type: 'header', group: row.group })
      lastGroup = row.group
    }
    result.push({ type: 'row', entry: row.entry, feature: row.feature, impact: row.impact })
  }
  return result
})

/** Feature IDs that belong to a given group name within the current recipe. */
function featureIdsInGroup(groupName: string): string[] {
  return props.recipe
    .filter((e) => props.groupForFeature.get(e.featureId) === groupName)
    .map((e) => e.featureId)
}

/** Pre-compute group sizes so the template can hide batch actions for small groups. */
const groupSizes = computed(() => {
  const sizes = new Map<string, number>()
  for (const row of rowsWithImpact.value) {
    sizes.set(row.group, (sizes.get(row.group) ?? 0) + 1)
  }
  return sizes
})
</script>

<template>
  <div class="recipe-list">
    <!-- Tinted header strip -->
    <div class="recipe-list__header">
      <span class="recipe-list__count">
        {{
          t('agency.bulkActions.updateFeatures.listHeaderCount', {
            count: recipe.length,
          })
        }}
      </span>

      <div v-if="showFlipAll" class="recipe-list__flip-all">
        <button
          type="button"
          class="recipe-list__flip-link"
          @click="emit('set-all', 'enable')"
        >
          {{ t('agency.bulkActions.updateFeatures.flipAllEnable') }}
        </button>
        <span class="recipe-list__flip-divider" aria-hidden="true">·</span>
        <button
          type="button"
          class="recipe-list__flip-link"
          @click="emit('set-all', 'disable')"
        >
          {{ t('agency.bulkActions.updateFeatures.flipAllDisable') }}
        </button>
      </div>
    </div>

    <!-- Rows (grouped when 5+ items across 2+ groups) -->
    <div v-if="groupedRows" class="recipe-list__rows">
      <template
        v-for="(item, idx) in groupedRows"
        :key="item.type === 'header' ? `hdr-${item.group}` : item.entry.featureId"
      >
        <div
          v-if="item.type === 'header'"
          class="recipe-list__group-label"
          :class="{ 'recipe-list__group-label--first': idx === 0 }"
        >
          <span>{{ item.group }}</span>
          <div v-if="(groupSizes.get(item.group) ?? 0) >= 3" class="recipe-list__group-actions">
            <button
              type="button"
              class="recipe-list__group-link"
              @click="emit('set-group', featureIdsInGroup(item.group), 'enable')"
            >
              Enable all
            </button>
            <span class="recipe-list__group-divider" aria-hidden="true">·</span>
            <button
              type="button"
              class="recipe-list__group-link"
              @click="emit('set-group', featureIdsInGroup(item.group), 'disable')"
            >
              Disable all
            </button>
          </div>
        </div>
        <RecipeRow
          v-else
          :entry="item.entry"
          :feature="item.feature ?? { id: item.entry.featureId, name: item.entry.featureId }"
          :impact="item.impact"
          :account-detail="detailedState.get(item.entry.featureId)"
          @flip="emit('flip', item.entry.featureId)"
          @remove="emit('remove', item.entry.featureId)"
        />
      </template>
    </div>

    <!-- Flat rows (below threshold) -->
    <div v-else class="recipe-list__rows">
      <RecipeRow
        v-for="row in rowsWithImpact"
        :key="row.entry.featureId"
        :entry="row.entry"
        :feature="row.feature ?? { id: row.entry.featureId, name: row.entry.featureId }"
        :impact="row.impact"
        :account-detail="detailedState.get(row.entry.featureId)"
        @flip="emit('flip', row.entry.featureId)"
        @remove="emit('remove', row.entry.featureId)"
      />
    </div>
  </div>
</template>

<style scoped>
.recipe-list {
  background: var(--base-white, #ffffff);
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 0;
}

.recipe-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--gray-50, #f9fafb);
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}

.recipe-list__count {
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700, #344054);
}

.recipe-list__flip-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.recipe-list__flip-link {
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

.recipe-list__flip-link:hover {
  background: var(--gray-50, #f9fafb);
  border-color: var(--gray-400, #98a2b3);
}

.recipe-list__flip-link:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

.recipe-list__flip-divider {
  display: none;
}

.recipe-list__rows {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 0;
  flex: 1 1 0;
}

.recipe-list__group-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-600, #475467);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: var(--gray-100, #f2f4f7);
  border-top: 1px solid var(--gray-200, #eaecf0);
  border-bottom: 1px solid var(--gray-200, #eaecf0);
}

.recipe-list__group-label--first {
  border-top: none;
}

.recipe-list__group-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-transform: none;
  letter-spacing: normal;
}

.recipe-list__group-link {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--primary-600, #155eef);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.12s ease;
}

.recipe-list__group-link:hover {
  color: var(--primary-700, #004eeb);
  text-decoration: underline;
}

.recipe-list__group-link:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
  border-radius: 2px;
}

.recipe-list__group-divider {
  color: var(--gray-400, #98a2b3);
  font-size: 12px;
  user-select: none;
}
</style>
