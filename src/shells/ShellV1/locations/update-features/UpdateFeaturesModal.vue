<!--
  UpdateFeaturesModal.vue
  ────────────────────────────────────────────────────────────────────────────
  Top-level orchestrator for the "Update Features" bulk-action modal
  (Option A — recipe-style patch).

  State machine: edit → confirm → applying → applied → (close)

  The modal is a fixed-height overlay (~640px max, ~460px min) with three
  regions in a column flex layout:
    - Header (pinned)   — title, close ×, subtitle
    - Body  (scrollable) — recipe list / picker / step views
    - Footer (pinned)   — pending-changes summary, Cancel / Apply

  Patch contract enforcement lives in recipe.ts::recipeToPayload — this
  file calls it at the transition to `applying` and the payload shape
  guarantees only recipe entries are sent.

  Esc key: closes from any state (HLModal handles Esc internally).

  Focus: HLModal auto-focuses the dialog on open. After Apply success,
  AppliedStep auto-focuses its Done button.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { HLModal, HLButton, HLTag } from '@/components/highrise'

import FeaturePicker from './FeaturePicker.vue'
import RecipeList from './RecipeList.vue'
import UntouchedCallout from './UntouchedCallout.vue'
import ConfirmStep from './ConfirmStep.vue'
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
  FEATURE_CATALOG,
  TOTAL_FEATURE_COUNT,
} from './feature-catalog'

import type {
  CurrentStateBySubAccount,
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
const viewState = ref<ViewState>('edit')
const recipe = ref<Recipe>([])
const pickerOpen = ref(false)

/**
 * Snapshot of summary numbers taken at the moment the user clicks Apply.
 * Used by ApplyingStep and AppliedStep so the numbers don't re-derive
 * after the recipe is cleared.
 */
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
      viewState.value = 'edit'
      recipe.value = []
      pickerOpen.value = false
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
function onAdd(featureId: string) {
  recipe.value = addEntry(recipe.value, featureId)
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

function onBulkAdd(action: FeatureAction) {
  const allIds = ALL_FEATURES.map((f) => f.id)
  recipe.value = bulkAdd(recipe.value, allIds, action)
  pickerOpen.value = false
}

function onAddMatching(featureIds: string[]) {
  let r = recipe.value
  for (const id of featureIds) {
    r = addEntry(r, id)
  }
  recipe.value = r
  pickerOpen.value = false
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
function goToConfirm() {
  if (applyDisabled.value) return
  viewState.value = 'confirm'
}

function goBackToEdit() {
  viewState.value = 'edit'
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
    :mask-closable="viewState === 'edit' || viewState === 'applied'"
    :title="t('agency.bulkActions.updateFeatures.title')"
    @update:show="(v: boolean) => emit('update:show', v)"
  >
    <div class="uf-modal">
      <!-- ─── Subtitle (always visible in edit / confirm header area) ──── -->
      <div v-if="viewState === 'edit'" class="uf-modal__subtitle">
        {{ t('agency.bulkActions.updateFeatures.subtitleLead', { count: selectedCount }) }}
        <strong>{{ t('agency.bulkActions.updateFeatures.subtitleBoldClause') }}</strong>
        {{ t('agency.bulkActions.updateFeatures.subtitleTrail') }}
      </div>

      <!-- ───────────── EDIT VIEW ───────────────────────────────────── -->
      <div v-if="viewState === 'edit'" class="uf-modal__body">
        <!-- Add button -->
        <div v-if="!pickerOpen" class="uf-modal__add-row">
          <button
            type="button"
            class="uf-modal__add-btn"
            @click="pickerOpen = true"
          >
            {{ t('agency.bulkActions.updateFeatures.addFeature') }}
          </button>
        </div>

        <FeaturePicker
          v-if="pickerOpen"
          :catalog="FEATURE_CATALOG"
          :recipe="recipe"
          :total-feature-count="TOTAL_FEATURE_COUNT"
          :current-state="currentState"
          :selected-count="selectedCount"
          @add="onAdd"
          @add-matching="onAddMatching"
          @add-group="onAddMatching"
          @done="pickerOpen = false"
        />

        <!-- Empty state -->
        <div
          v-if="recipe.length === 0 && !pickerOpen"
          class="uf-modal__empty"
        >
          <i class="fas fa-layer-group uf-modal__empty-icon" aria-hidden="true" />
          <p class="uf-modal__empty-title">
            {{ t('agency.bulkActions.updateFeatures.emptyState') }}
          </p>
          <p class="uf-modal__empty-hint">
            {{ t('agency.bulkActions.updateFeatures.emptyStateHint') }}
          </p>
          <div class="uf-modal__empty-actions">
            <button
              type="button"
              class="uf-modal__empty-action uf-modal__empty-action--enable"
              @click="onBulkAdd('enable')"
            >
              <i class="fas fa-toggle-on" aria-hidden="true" />
              Enable all features
            </button>
            <button
              type="button"
              class="uf-modal__empty-action uf-modal__empty-action--disable"
              @click="onBulkAdd('disable')"
            >
              <i class="fas fa-toggle-off" aria-hidden="true" />
              Disable all features
            </button>
          </div>
        </div>

        <!-- Recipe list -->
        <RecipeList
          v-if="recipe.length > 0"
          :recipe="recipe"
          :features="featureMap"
          :selected-count="selectedCount"
          :current-state="currentState"
          :group-for-feature="groupForFeature"
          @flip="onFlip"
          @remove="onRemove"
          @remove-group="onRemoveGroup"
          @set-all="onSetAll"
        />

        <!-- Untouched callout -->
        <UntouchedCallout
          v-if="recipe.length > 0"
          :total-changes="totalChanges"
          :selected-count="selectedCount"
          :untouched-count="untouchedCount"
          :total-feature-count="TOTAL_FEATURE_COUNT"
          :is-full-coverage="fullCoverage"
        />
      </div>

      <!-- ───────────── CONFIRM VIEW ────────────────────────────────── -->
      <ConfirmStep
        v-if="viewState === 'confirm'"
        :recipe="recipe"
        :features="featureMap"
        :selected-count="selectedCount"
        :current-state="currentState"
        :total-changes="totalChanges"
        :untouched-count="untouchedCount"
        :total-feature-count="TOTAL_FEATURE_COUNT"
        :is-full-coverage="fullCoverage"
        @back="goBackToEdit"
        @apply="startApplying"
      />

      <!-- ───────────── APPLYING VIEW ───────────────────────────────── -->
      <ApplyingStep
        v-if="viewState === 'applying'"
        :total-changes="appliedSnapshot.totalChanges"
        :selected-count="selectedCount"
      />

      <!-- ───────────── APPLIED VIEW ────────────────────────────────── -->
      <AppliedStep
        v-if="viewState === 'applied'"
        :total-changes="appliedSnapshot.totalChanges"
        :selected-count="selectedCount"
        :untouched-count="appliedSnapshot.untouched"
        :total-feature-count="TOTAL_FEATURE_COUNT"
        :is-full-coverage="appliedSnapshot.fullCoverage"
        @done="onDone"
      />
    </div>

    <!-- ─── Footer (edit view only) ──────────────────────────────────── -->
    <template v-if="viewState === 'edit'" #footer>
      <div class="uf-footer">
        <div class="uf-footer__left">
          <HLTag v-if="recipe.length > 0" size="sm">
            {{ t('agency.bulkActions.updateFeatures.footerFeatureCount', { count: recipe.length }) }}
          </HLTag>
          <span class="uf-footer__summary">{{ footerSummary }}</span>
        </div>
        <div class="uf-footer__actions">
          <HLButton variant="secondary" size="sm" @click="close">
            {{ t('agency.bulkActions.updateFeatures.cancel') }}
          </HLButton>
          <HLButton
            size="sm"
            :disabled="applyDisabled"
            @click="goToConfirm"
          >
            {{ t('agency.bulkActions.updateFeatures.apply') }}
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
  min-height: 420px;
  max-height: calc(100vh - 200px);
}

.uf-modal__subtitle {
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: var(--gray-600, #475467);
}

.uf-modal__subtitle strong {
  font-weight: 500;
  color: var(--gray-900, #101828);
}

.uf-modal__body {
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* Prevent scroll-top jumps across re-renders */
  scroll-behavior: smooth;
}

/* ─── Add-a-feature button (dashed outline per brief) ────────────────── */
.uf-modal__add-row {
  flex: 0 0 auto;
}

.uf-modal__add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  border: 1.5px dashed var(--gray-300, #d0d5dd);
  border-radius: 8px;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-700, #004eeb);
  cursor: pointer;
  transition: border-color 0.12s ease, background 0.12s ease;
}

.uf-modal__add-btn:hover {
  border-color: var(--primary-300, #84adff);
  background: var(--primary-25, #f5f8ff);
}

.uf-modal__add-btn:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

/* ─── Empty state ────────────────────────────────────────────────────── */
.uf-modal__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
  text-align: center;
  gap: 4px;
}

.uf-modal__empty-icon {
  font-size: 28px;
  color: var(--gray-300, #d0d5dd);
  margin-bottom: 8px;
}

.uf-modal__empty-title {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700, #344054);
}

.uf-modal__empty-hint {
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: var(--gray-500, #667085);
  max-width: 320px;
  line-height: 17px;
}

.uf-modal__empty-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.uf-modal__empty-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}

.uf-modal__empty-action:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

.uf-modal__empty-action--enable {
  background: var(--success-50, #ecfdf3);
  color: var(--success-700, #027a48);
  border: 1px solid var(--success-200, #a6f4c5);
}

.uf-modal__empty-action--enable:hover {
  background: var(--success-100, #d1fadf);
}

.uf-modal__empty-action--disable {
  background: var(--warning-50, #fffaeb);
  color: var(--warning-700, #b54708);
  border: 1px solid var(--warning-200, #fedf89);
}

.uf-modal__empty-action--disable:hover {
  background: var(--warning-100, #fef0c7);
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
