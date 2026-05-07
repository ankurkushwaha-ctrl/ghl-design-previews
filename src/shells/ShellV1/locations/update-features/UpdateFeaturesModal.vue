<!--
  UpdateFeaturesModal.vue
  ────────────────────────────────────────────────────────────────────────────
  Top-level orchestrator for the "Update Features" bulk-action modal.

  2-step wizard: select → configure → applying → applied → (close)

  Step 1 (select):    Pick which features to touch (full-height picker).
  Step 2 (configure): Set each selected feature to enable/disable, then apply.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { HLModal, HLButton, HLTag } from '@/components/highrise'

import FeaturePicker from './FeaturePicker.vue'
import RecipeList from './RecipeList.vue'
import UntouchedCallout from './UntouchedCallout.vue'
import ApplyingStep from './ApplyingStep.vue'
import AppliedStep from './AppliedStep.vue'

import {
  addEntry,
  bulkAdd,
  flipEntry,
  isAllNoOp,
  isFullCoverage as checkFullCoverage,
  recipeToPayload,
  removeEntry,
  setAllAction,
  totalChangesFor,
} from './recipe'
import {
  ALL_FEATURES,
  buildMockCurrentState,
  buildMockDetailedState,
  FEATURE_CATALOG,
  TOTAL_FEATURE_COUNT,
} from './feature-catalog'

import type {
  CurrentStateBySubAccount,
  DetailedFeatureState,
  Feature,
  FeatureAction,
  Recipe,
  ViewState,
} from './types'

/* ──────────────────────────────────────────────────────────────────────
 * Props & emits
 * ────────────────────────────────────────────────────────────────────── */
const props = defineProps<{
  show: boolean
  /** IDs of currently selected sub-accounts on the list page. */
  selectedSubAccountIds: string[]
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'applied'): void
}>()

const { t } = useI18n()

/* ──────────────────────────────────────────────────────────────────────
 * State
 * ────────────────────────────────────────────────────────────────────── */
const viewState = ref<ViewState>('select')
const recipe = ref<Recipe>([])

const appliedSnapshot = ref({
  totalChanges: 0,
  untouched: 0,
  fullCoverage: false,
})

/** Reset everything when the modal opens. */
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      viewState.value = 'select'
      recipe.value = []
    }
  },
)

/* ──────────────────────────────────────────────────────────────────────
 * Derived data
 * ────────────────────────────────────────────────────────────────────── */
const selectedCount = computed(() => props.selectedSubAccountIds.length)

/** Deterministic mock per-sub-account current state. */
const currentState = computed<CurrentStateBySubAccount>(() =>
  buildMockCurrentState(selectedCount.value),
)

/** Detailed per-feature account names for the expandable detail in RecipeRow. */
const detailedState = computed<DetailedFeatureState>(() =>
  buildMockDetailedState(selectedCount.value),
)

/** Flat feature id → Feature map for child components. */
const featureMap = computed(() => {
  const m = new Map<string, Feature>()
  for (const f of ALL_FEATURES) {
    m.set(f.id, f)
  }
  return m
})

/** Feature id → group name lookup for recipe group headers. */
const groupForFeature = computed(() => {
  const m = new Map<string, string>()
  for (const g of FEATURE_CATALOG) {
    for (const f of g.features) {
      m.set(f.id, g.name)
    }
  }
  return m
})

const totalChanges = computed(() =>
  totalChangesFor(recipe.value, selectedCount.value, currentState.value),
)

const fullCoverage = computed(() =>
  checkFullCoverage(recipe.value, TOTAL_FEATURE_COUNT),
)

const untouchedCount = computed(() =>
  TOTAL_FEATURE_COUNT - recipe.value.length,
)

const allNoOp = computed(() =>
  isAllNoOp(recipe.value, selectedCount.value, currentState.value),
)

/* ──────────────────────────────────────────────────────────────────────
 * Footer summary copy
 * ────────────────────────────────────────────────────────────────────── */
const footerSummary = computed(() => {
  if (recipe.value.length === 0) {
    return t('agency.bulkActions.updateFeatures.footerNoChanges')
  }
  if (allNoOp.value) {
    return t('agency.bulkActions.updateFeatures.footerNoOp')
  }
  return t('agency.bulkActions.updateFeatures.footerReady', {
    count: totalChanges.value,
  })
})

const applyDisabled = computed(() =>
  recipe.value.length === 0 || allNoOp.value,
)

/* ──────────────────────────────────────────────────────────────────────
 * Recipe mutations
 * ────────────────────────────────────────────────────────────────────── */
function onToggle(featureId: string) {
  const existing = recipe.value.find((e) => e.featureId === featureId)
  if (existing) {
    recipe.value = removeEntry(recipe.value, featureId)
  } else {
    recipe.value = addEntry(recipe.value, featureId)
  }
}

function onRemove(featureId: string) {
  recipe.value = removeEntry(recipe.value, featureId)
}

function onFlip(featureId: string) {
  recipe.value = flipEntry(recipe.value, featureId)
}

function onSetAll(action: FeatureAction) {
  recipe.value = setAllAction(recipe.value, action)
}

function onSelectAll() {
  const allIds = ALL_FEATURES.map((f) => f.id)
  recipe.value = bulkAdd(recipe.value, allIds, 'enable')
}

function onRemoveAll() {
  recipe.value = []
}

function onAddMatching(featureIds: string[]) {
  let r = recipe.value
  for (const id of featureIds) {
    r = addEntry(r, id)
  }
  recipe.value = r
}

function onRemoveGroup(featureIds: string[]) {
  let r = recipe.value
  for (const id of featureIds) {
    r = removeEntry(r, id)
  }
  recipe.value = r
}

/* ──────────────────────────────────────────────────────────────────────
 * View-state transitions
 * ────────────────────────────────────────────────────────────────────── */
function goToConfigure() {
  if (recipe.value.length === 0) return
  viewState.value = 'configure'
}

function goBackToSelect() {
  viewState.value = 'select'
}

function startApplying() {
  appliedSnapshot.value = {
    totalChanges: totalChanges.value,
    untouched: untouchedCount.value,
    fullCoverage: fullCoverage.value,
  }

  viewState.value = 'applying'

  const payload = recipeToPayload(recipe.value, props.selectedSubAccountIds)
  // eslint-disable-next-line no-console
  console.log('[UpdateFeatures] mutation payload:', payload)

  /*
   * TODO (v1 failure-path): if the real API surfaces partial failures
   * (some sub-accounts succeeded, others didn't), at minimum log the
   * structured result and prompt the user to retry. For now we simulate
   * success after the progress bar animation completes (~1.4s).
   */
  setTimeout(() => {
    viewState.value = 'applied'
  }, 1500)
}

function onDone() {
  close()
  emit('applied')
}

function close() {
  emit('update:show', false)
}
</script>

<template>
  <HLModal
    :show="show"
    :width="720"
    :mask-closable="viewState === 'select' || viewState === 'applied'"
    :title="t('agency.bulkActions.updateFeatures.title')"
    @update:show="(v: boolean) => emit('update:show', v)"
  >
    <div class="uf-modal">
      <!-- ───── STEP 1: SELECT FEATURES ────────────────────────────── -->
      <div v-if="viewState === 'select'" class="uf-modal__body">
        <div class="uf-modal__subtitle">
          {{ t('agency.bulkActions.updateFeatures.subtitleLead', { count: selectedCount }) }}
          <strong>{{ t('agency.bulkActions.updateFeatures.subtitleBoldClause') }}</strong>
          {{ t('agency.bulkActions.updateFeatures.subtitleTrail') }}
          {{ t('agency.bulkActions.updateFeatures.subtitleNextStep') }}
        </div>

        <div class="uf-modal__select-actions">
          <button
            type="button"
            class="uf-modal__select-btn"
            :disabled="recipe.length === TOTAL_FEATURE_COUNT"
            @click="onSelectAll"
          >
            Select all
          </button>
          <button
            type="button"
            class="uf-modal__select-btn uf-modal__select-btn--remove"
            :disabled="recipe.length === 0"
            @click="onRemoveAll"
          >
            Remove all
          </button>
        </div>

        <FeaturePicker
          class="uf-modal__picker-full"
          :catalog="FEATURE_CATALOG"
          :recipe="recipe"
          :total-feature-count="TOTAL_FEATURE_COUNT"
          :current-state="currentState"
          :selected-count="selectedCount"
          @toggle="onToggle"
          @add-matching="onAddMatching"
          @add-group="onAddMatching"
          @remove-group="onRemoveGroup"
        />
      </div>

      <!-- ───── STEP 2: CONFIGURE ACTIONS ──────────────────────────── -->
      <div v-if="viewState === 'configure'" class="uf-modal__body">
        <div class="uf-modal__recipe-full">
          <RecipeList
            :recipe="recipe"
            :features="featureMap"
            :selected-count="selectedCount"
            :current-state="currentState"
            :detailed-state="detailedState"
            :group-for-feature="groupForFeature"
            @flip="onFlip"
            @remove="onRemove"
            @remove-group="onRemoveGroup"
            @set-all="onSetAll"
          />

          <UntouchedCallout
            :total-changes="totalChanges"
            :selected-count="selectedCount"
            :untouched-count="untouchedCount"
            :total-feature-count="TOTAL_FEATURE_COUNT"
            :is-full-coverage="fullCoverage"
          />
        </div>
      </div>

      <!-- ───── APPLYING ───────────────────────────────────────────── -->
      <div v-if="viewState === 'applying'" class="uf-modal__centered">
        <ApplyingStep
          :total-changes="appliedSnapshot.totalChanges"
          :selected-count="selectedCount"
        />
      </div>

      <!-- ───── APPLIED ────────────────────────────────────────────── -->
      <div v-if="viewState === 'applied'" class="uf-modal__centered">
        <AppliedStep
          :total-changes="appliedSnapshot.totalChanges"
          :selected-count="selectedCount"
          :untouched-count="appliedSnapshot.untouched"
          :total-feature-count="TOTAL_FEATURE_COUNT"
          :is-full-coverage="appliedSnapshot.fullCoverage"
          @done="onDone"
        />
      </div>
    </div>

    <!-- Footer only for select / configure — omitted entirely for
         applying / applied so HLModal's $slots.footer is falsy and no
         empty footer div (with border-top) steals vertical space. -->
    <template v-if="viewState === 'select' || viewState === 'configure'" #footer>
      <!-- Step 1 footer -->
      <div v-if="viewState === 'select'" class="uf-footer">
        <div class="uf-footer__left">
          <span class="uf-footer__summary">
            {{ recipe.length === 0
              ? t('agency.bulkActions.updateFeatures.footerNoChanges')
              : `${recipe.length} ${recipe.length === 1 ? 'feature' : 'features'} selected`
            }}
          </span>
        </div>
        <div class="uf-footer__actions">
          <HLButton variant="secondary" size="sm" @click="close">
            {{ t('agency.bulkActions.updateFeatures.cancel') }}
          </HLButton>
          <HLButton
            size="sm"
            :disabled="recipe.length === 0"
            @click="goToConfigure"
          >
            Next
          </HLButton>
        </div>
      </div>
      <!-- Step 2 footer -->
      <div v-else class="uf-footer">
        <div class="uf-footer__left">
          <span class="uf-footer__summary">{{ footerSummary }}</span>
        </div>
        <div class="uf-footer__actions">
          <HLButton variant="secondary" size="sm" @click="goBackToSelect">
            Back
          </HLButton>
          <HLButton
            size="sm"
            :disabled="applyDisabled"
            @click="startApplying"
          >
            Apply changes
          </HLButton>
        </div>
      </div>
    </template>
  </HLModal>
</template>

<style scoped>
/* ─── Modal body container ───────────────────────────────────────────── */
.uf-modal {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 240px);
  min-height: 400px;
  max-height: 600px;
}

.uf-modal__subtitle {
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: var(--gray-600, #475467);
  flex: 0 0 auto;
}

.uf-modal__subtitle strong {
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.uf-modal__body {
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.uf-modal__centered {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

/* Step 1: picker fills the remaining space — overrides FeaturePicker's
   scoped max-height: 280px and flex: 0 1 280px */
.uf-modal__picker-full {
  flex: 1 1 auto !important;
  max-height: none !important;
}

/* Step 1: select all / remove all bar */
.uf-modal__select-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  flex: 0 0 auto;
  margin-bottom: 8px;
}

.uf-modal__select-btn {
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
.uf-modal__select-btn:hover {
  background: var(--gray-50, #f9fafb);
  border-color: var(--gray-400, #98a2b3);
}
.uf-modal__select-btn--remove {
  color: var(--gray-700, #344054);
}
.uf-modal__select-btn--remove:hover {
  background: var(--gray-50, #f9fafb);
  border-color: var(--gray-400, #98a2b3);
}
.uf-modal__select-btn:disabled {
  opacity: 0.4;
  cursor: default;
  background: var(--base-white, #ffffff);
  border-color: var(--gray-200, #eaecf0);
}
.uf-modal__select-btn:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

/* Step 2: recipe fills the remaining space */
.uf-modal__recipe-full {
  flex: 1 1 0;
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* ─── Shared separator dot ────────────────────────────────────────────── */
.uf-modal__bulk-sep {
  color: var(--gray-300, #d0d5dd);
  font-size: 13px;
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
.uf-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
}

.uf-footer__left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.uf-footer__summary {
  font-size: var(--hr-font-size-md, 13px);
  font-weight: 400;
  color: var(--gray-600, #475467);
}

.uf-footer__actions {
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
}
</style>
