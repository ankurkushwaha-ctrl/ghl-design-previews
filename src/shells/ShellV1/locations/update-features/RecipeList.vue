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
  Feature,
  FeatureAction,
  Recipe,
} from './types'

const props = defineProps<{
  recipe: Recipe
  features: Map<string, Feature>
  selectedCount: number
  currentState: CurrentStateBySubAccount
  groupForFeature: Map<string, string>
}>()

const emit = defineEmits<{
  (e: 'flip', featureId: string): void
  (e: 'remove', featureId: string): void
  (e: 'remove-group', featureIds: string[]): void
  (e: 'set-all', action: FeatureAction): void
}>()

const { t } = useI18n()

const showFlipAll = computed(() => props.recipe.length >= 3)

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
 * Show group headers when recipe has 5+ items spanning 2+ groups.
 * Below that threshold, grouping adds noise per NNg progressive disclosure.
 */
const showGroupHeaders = computed(() => {
  if (props.recipe.length < 5) return false
  const groups = new Set(rowsWithImpact.value.map((r) => r.group))
  return groups.size >= 2
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
          <button
            type="button"
            class="recipe-list__remove-group"
            @click="emit('remove-group', featureIdsInGroup(item.group))"
          >
            Remove group
          </button>
        </div>
        <RecipeRow
          v-else
          :entry="item.entry"
          :feature="item.feature ?? { id: item.entry.featureId, name: item.entry.featureId }"
          :impact="item.impact"
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
        @flip="emit('flip', row.entry.featureId)"
        @remove="emit('remove', row.entry.featureId)"
      />
    </div>
  </div>
</template>

<style scoped>
.recipe-list {
  background: #ffffff;
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
}

.recipe-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--gray-50, #f9fafb);
  border-bottom: 0.5px solid var(--gray-200, #eaecf0);
}

.recipe-list__count {
  font-size: 12px;
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
  color: var(--primary-700, #004eeb);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.recipe-list__flip-link:hover {
  color: var(--primary-800, #0040c1);
  text-decoration: underline;
}

.recipe-list__flip-link:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
  border-radius: 2px;
}

.recipe-list__flip-divider {
  color: var(--gray-300, #d0d5dd);
}

.recipe-list__rows {
  display: flex;
  flex-direction: column;
}

.recipe-list__group-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px 2px;
  font-size: 11px;
  font-weight: 500;
  color: var(--gray-500, #667085);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-top: 0.5px solid var(--gray-200, #eaecf0);
}

.recipe-list__group-label--first {
  border-top: none;
}

.recipe-list__remove-group {
  font-size: 11px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: normal;
  color: var(--gray-400, #98a2b3);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.recipe-list__remove-group:hover {
  color: var(--error-600, #d92d20);
  text-decoration: underline;
}

.recipe-list__remove-group:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
