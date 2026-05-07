<!--
  CreateSubAccountModal.vue
  ────────────────────────────────────────────────────────────────────────────
  3-step modal: Business Info → Plan Selection → Review.

  - Step state lives locally (`currentStep`).
  - Form state also lives locally so closing the modal clears it.
  - "Create" emits @created with the form payload — Locations.vue toasts.

  This is intentionally lightweight: the production "Create Sub-Account"
  flow is a full snapshot wizard with 10+ steps. The brief calls for a
  realistic but simplified sketch, so we keep just enough fields to make
  the flow feel real.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UIButton,
  UIInput,
  UIInputPhone,
  UIModal,
  UIModalContent,
  UIModalFooter,
  UIModalHeader,
  UISteps,
  UIStep,
  UITag,
} from '@gohighlevel/ghl-ui'
import { CheckCircleIcon } from '@gohighlevel/ghl-icons/24/outline'

interface CreateForm {
  name: string
  email: string
  phone: string
  address: string
  plan: 'starter' | 'pro' | 'saas'
}

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'created', form: CreateForm): void
}>()

const { t } = useI18n()

const defaultForm: CreateForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  plan: 'pro',
}

const currentStep = ref(1)
const form = ref<CreateForm>({ ...defaultForm })

watch(
  () => props.show,
  (isShown) => {
    if (isShown) {
      currentStep.value = 1
      form.value = { ...defaultForm }
    }
  }
)

const plans = [
  { key: 'starter', label: 'Starter', price: 97, descKey: 'planStarterDesc' },
  { key: 'pro', label: 'Pro', price: 297, descKey: 'planProDesc' },
  { key: 'saas', label: 'SaaS', price: 497, descKey: 'planSaasDesc' },
] as const

const selectedPlan = computed(() =>
  plans.find((p) => p.key === form.value.plan)
)

const positiveLabel = computed(() => {
  if (currentStep.value === 1 || currentStep.value === 2) return t('next')
  return t('create')
})

const negativeLabel = computed(() => {
  if (currentStep.value === 1) return t('cancel')
  return t('back')
})

function close() {
  emit('update:show', false)
}

function onPositive() {
  if (currentStep.value < 3) {
    currentStep.value += 1
    return
  }
  emit('created', { ...form.value })
  close()
}

function onNegative() {
  if (currentStep.value === 1) {
    close()
    return
  }
  currentStep.value -= 1
}
</script>

<template>
  <UIModal
    :show="show"
    :width="640"
    :mask-closable="false"
    @update:show="(v) => emit('update:show', v)"
  >
    <template #header>
      <UIModalHeader
        id="create-subaccount-header"
        :title="t('createSubAccountTitle')"
        @close="close"
      />
    </template>
    <UIModalContent>
      <div class="create-modal">
        <UISteps :current="currentStep">
          <UIStep :title="t('stepBusinessInfo')" />
          <UIStep :title="t('stepPlanSelection')" />
          <UIStep :title="t('stepReview')" />
        </UISteps>

        <!-- Step 1: Business info -->
        <div v-if="currentStep === 1" class="step-body">
          <div class="form-row">
            <label class="form-row__label">{{ t('fieldBusinessName') }}</label>
            <UIInput
              id="form-name"
              :value="form.name"
              placeholder="e.g. Acme Marketing"
              @update:value="(v: string) => (form.name = v)"
            />
          </div>
          <div class="form-row">
            <label class="form-row__label">{{ t('fieldEmail') }}</label>
            <UIInput
              id="form-email"
              :value="form.email"
              placeholder="hello@acmemarketing.com"
              @update:value="(v: string) => (form.email = v)"
            />
          </div>
          <div class="form-row">
            <label class="form-row__label">{{ t('fieldPhone') }}</label>
            <UIInputPhone
              id="form-phone"
              :value="form.phone"
              @update:value="(v: string) => (form.phone = v)"
            />
          </div>
          <div class="form-row">
            <label class="form-row__label">{{ t('fieldAddress') }}</label>
            <UIInput
              id="form-address"
              :value="form.address"
              placeholder="123 Main St, City, State"
              @update:value="(v: string) => (form.address = v)"
            />
          </div>
        </div>

        <!-- Step 2: Plan selection -->
        <div v-if="currentStep === 2" class="step-body">
          <div class="plan-grid">
            <div
              v-for="plan in plans"
              :key="plan.key"
              class="plan-card"
              :class="{ 'plan-card--selected': form.plan === plan.key }"
              role="button"
              tabindex="0"
              @click="form.plan = plan.key"
              @keydown.enter="form.plan = plan.key"
            >
              <div class="plan-card__title">
                {{ plan.label }}
                <UITag
                  v-if="form.plan === plan.key"
                  type="info"
                  size="small"
                  round
                >
                  {{ t('selected') }}
                </UITag>
              </div>
              <div class="plan-card__price">
                ${{ plan.price }}<span>{{ t('perMonth') }}</span>
              </div>
              <div class="plan-card__desc">
                {{ t(plan.descKey) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Review -->
        <div v-if="currentStep === 3" class="step-body">
          <div class="review-title">{{ t('reviewSummary') }}</div>
          <dl class="review-list">
            <div class="review-row">
              <dt>{{ t('fieldBusinessName') }}</dt>
              <dd>{{ form.name || '—' }}</dd>
            </div>
            <div class="review-row">
              <dt>{{ t('fieldEmail') }}</dt>
              <dd>{{ form.email || '—' }}</dd>
            </div>
            <div class="review-row">
              <dt>{{ t('fieldPhone') }}</dt>
              <dd>{{ form.phone || '—' }}</dd>
            </div>
            <div class="review-row">
              <dt>{{ t('fieldAddress') }}</dt>
              <dd>{{ form.address || '—' }}</dd>
            </div>
            <div class="review-row">
              <dt>{{ t('stepPlanSelection') }}</dt>
              <dd>
                <CheckCircleIcon class="inline-block h-4 w-4 text-success-500 mr-1" />
                {{ selectedPlan?.label }} (${{ selectedPlan?.price }}{{ t('perMonth') }})
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </UIModalContent>
    <template #footer>
      <UIModalFooter
        id="create-subaccount-footer"
        :positive-text="positiveLabel"
        :negative-text="negativeLabel"
        type="primary"
        @negative-click="onNegative"
        @positive-click="onPositive"
      />
    </template>
  </UIModal>
</template>

<style scoped>
.create-modal {
  padding: 4px 0 0;
}
.step-body {
  margin-top: 24px;
  min-height: 240px;
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.form-row__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-700, #344054);
}
.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.plan-card {
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  background: #ffffff;
}
.plan-card:hover {
  border-color: var(--primary-400, #b692f6);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
}
.plan-card--selected {
  border-color: var(--primary-600, #7f56d9);
  box-shadow: 0 0 0 4px var(--primary-50, #f9f5ff);
}
.plan-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900, #101828);
}
.plan-card__price {
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-900, #101828);
  margin: 8px 0;
}
.plan-card__price span {
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-500, #667085);
}
.plan-card__desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--gray-500, #667085);
}
.review-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-700, #344054);
  margin-bottom: 12px;
}
.review-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
}
.review-row {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-100, #f2f4f7);
  font-size: 14px;
}
.review-row:last-child {
  border-bottom: none;
}
.review-row dt {
  width: 160px;
  flex-shrink: 0;
  color: var(--gray-500, #667085);
}
.review-row dd {
  flex: 1;
  color: var(--gray-900, #101828);
  font-weight: 500;
  margin: 0;
}
</style>
