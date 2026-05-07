<!--
  ListAccounts.vue
  ────────────────────────────────────────────────────────────────────────────
  Vendored verbatim from:
    spm-ts/src/pmd/pages/agency/ListAccounts.vue

  Template changes vs upstream:
    1. <SideBarV2 /> and <TopBar /> removed — the page is wrapped by ShellV1
       in SubAccountsPage.vue, which already renders these.
    2. <VirtualList> replaced with a simple v-for loop — vue3-virtual-scroll-list
       is not a dep in the preview repo and cannot be added per repo rules.
       The rendering outcome is visually identical; virtual scrolling is only
       a performance concern with large lists that we do not have here.
    3. <moon-loader> replaced with a minimal no-op — the `vue-spinner` package
       is absent. The loader only shows when loadMoreLoading is true, which
       never triggers in the preview (we have no real pagination).
    4. The hl_v2-height class is preserved on the list wrapper so any CSS that
       sizes the list area still applies.

  Script changes vs upstream:
    SideBarV2 / TopBar / KickoffWidget    → no-op stubs (not rendered)
    useStore from '@/store'               → ../_stubs/store
    Location / Company / User from @/models → ../_stubs/models
    mapState from vuex                    → manual computed (no vuex in preview)
    LocationsService.search()             → hardcoded MOCK_LOCATIONS array
    Company.getById()                     → _stubs/models stub (returns hardcoded)
    InternalToolsService                  → no-op (fetchLocationTransfers returns 0)
    LoadSnapshotTemplateModal             → no-op modal stub
    EditTeamMemberModal                   → no-op modal stub
    RequestCardModal                      → no-op modal stub
    RequestCardSuccessModal               → no-op modal stub
    ManageLocationSubscription            → no-op modal stub
    DeleteLocationAbortModal              → no-op modal stub
    trackGaEvent                          → no-op
    useEmitter / AgencyBillingEvents      → no-op (emitter is a no-op object)
    subAccountRoutes                      → inline stub constants
    UIButton                              → ../_stubs/UIButton.vue
    UITextInputGroup                      → ../_stubs/UITextInputGroup.vue
    SVG icons (@/assets/pmd/img/…)        → vendored into src/assets/pmd/img/…
-->
<template>
  <div>
    <!-- SideBarV2 and TopBar removed: ShellV1 wrapper handles the shell -->

    <section
      class="hl_wrapper"
      :class="{
        'notification-banner-wrapper': $store.state.notification.showNotification
      }"
    >
      <section
        class="hl_wrapper--inner hl_agency hl_agency-location"
        id="agency_location"
      >
        <div class="container-fluid">
          <!-- New UI Banner -->
          <div 
            class="my-4" 
            v-if="!agencyInSaasPlan && !$store.getters['featureFlags/getForCompany']('enable-97-297-ui-revamp')"
          >
            <div class="w-full rounded-lg bg-white shadow-sm">
              <div class="flex items-center justify-between p-3">
                <div class="flex items-center gap-3">
                  <SparklesIcon class="h-6 w-6 text-gray-600" />
                  <span class="text-base font-medium text-gray-900">
                    {{ $t('agency.listAccounts.newInterfaceAvailable') }}
                  </span>
                </div>
                <UIButton 
                  class="bg-primary hover:bg-primary-600 text-white"
                  @click="$router.push({ name: 'agency-labs' })"
                >
                  <div class="flex items-center gap-2">
                    <BeakerIcon class="h-5 w-5" />
                    <span>{{ $t('agency.listAccounts.enableInLabs') }}</span>
                  </div>
                </UIButton>
              </div>
            </div>
          </div>

          <div
            id="sub-account-transfer-notification"
            class="!p-2"
            v-if="pendingLocationTransferRequests > 0"
          >
            <div class="pb-8">
              <div class="w-full rounded-lg border border-solid border-primary-300 bg-primary-25">
                <div class="flex gap-4 !p-3">
                  <div class="flex flex-1 gap-2">
                    <PinCircleIcon />
                    <div class="!my-auto">
                      <div class="hl-text-md font-semibold text-primary-700">
                        {{ $t('agency.listAccounts.pendingTransferRequests') }}
                      </div>
                      <div class="font-regular text-primary-600">
                        {{ $t('agency.listAccounts.otherAgenciesRequested') }}
                      </div>
                    </div>
                  </div>
                  <div class="!my-auto !ml-auto">
                    <UIButton id="'review-transfer-request'" @click="handleSubAccountTransfer">
                      <div class="pr-2">{{ $t('agency.listAccounts.reviewRequests') }}</div>
                      <div class="!my-auto">
                        <ArrowRightIcon />
                      </div>
                    </UIButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hl_controls">
            <div class="hl_controls--left">
              <h1>{{ $t('agency.listAccounts.clientList') }}</h1>
            </div>
            <div class="hl_controls--right">
              <div class="search-form">
                <UITextInputGroup
                  type="text"
                  icon="icon-loupe"
                  :placeholder="$t('agency.locationApiKeys.searchLocation')"
                  v-model="searchText"
                  @keyup="updateSearchText"
                />
              </div>
              <UIButton
                use="primary"
                v-on:click="loadSnapshotTemplate"
                v-if="user && user.role == 'admin'"
                :loading="loadingLocationsCount"
              >
                <i class="icon icon-plus mr-2" v-if="!loadingLocationsCount" />
                {{ $t('agency.advancedSettings.addAccount.title') }}
              </UIButton>
              <div class="dropdown pl-3" v-if="canAccessLocationTransfer">
                <div data-toggle="dropdown">
                  <DotsVerticalIcon />
                </div>
                <div class="dropdown-menu dropdown-menu-right">
                  <a
                    class="dropdown-item flex gap-2"
                    href="javascript:void(0);"
                    @click.prevent="handleSubAccountTransfer"
                  >
                    <div class="!my-auto">
                      <RepeatIcon />
                    </div>
                    <div>{{ $t('agency.listAccounts.subAccountTransfers') }}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!--
            upstream: <VirtualList> with vue3-virtual-scroll-list.
            Replaced with a simple v-for — same visual result, no dep needed.
            The hl_v2-height class is preserved so any CSS sizing still applies.
          -->
          <div
            class="hl_v2-height"
            style="overflow-y: auto"
          >
            <LocationListCard
              v-for="loc in (locations as MockLocation[])"
              :key="(loc as MockLocation).id"
              :source="loc"
              :showSaasMode="agencyInSaasPlan || agencyIn297Plan"
              :walletBalance="walletBalance"
            />
          </div>

          <div class="text-center" v-if="locations && locations.length && !searchText">
            <!-- upstream: <moon-loader> (vue-spinner) — no-op in preview -->
            <div v-if="loadMoreLoading" style="display:inline-block;width:24px;height:24px;border:3px solid #188bf633;border-top-color:#188bf6;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
          </div>
        </div>
      </section>
    </section>

    <delete-location-abort-modal
      :values="deleteLocationAbortModalValues"
      @close="deleteLocationAbortModalValues.show = false"
      @abortDeletion="stopDeletion"
      v-if="deleteLocationAbortModalValues.show"
    />
    <LoadSnapshotTemplateModal
      :values="loadSnapshotTemplateModal"
      @hidden="loadSnapshotTemplateModal = { visible: false }"
      @select="handleSelectTemplate"
    />
    <request-card-modal
      v-if="(agencyInSaasPlan || agencyIn297Plan) && showRequestCardModal"
      :show="showRequestCardModal"
      @close="showRequestCardModal = false"
      :location-id="requestCardLocationId"
      @success="e => handleRequestCardSuccess(e)"
      @createUser="showCreateUserModal"
    />
    <request-card-success-modal
      v-if="(agencyInSaasPlan || agencyIn297Plan) && showRequestCardSuccessModal"
      :show="showRequestCardSuccessModal"
      :message="requestCardSuccessMessage"
      @close="showRequestCardSuccessModal = false"
    />
    <EditTeamMemberModal
      :values="teamMemberModalValues"
      :defaults="{
        role: 'admin',
        type: 'account',
        locationId: requestCardLocationId,
      }"
      @hidden="teamMemberModalValues = { visible: false }"
      @created="newUserCreated"
    />
    <ManageLocationSubscription
      :locationId="requestCardLocationId"
      v-if="showManageLocationSubscriptionModal"
      :show="showManageLocationSubscriptionModal"
      @close="handleSuccessAttachPlan"
      @success="handleSuccessAttachPlan"
      @skip="handleSuccessAttachPlan"
      :skippable="true"
    />
    <!-- KickoffWidget removed: depends on Vuex onboarding state absent in preview -->
  </div>
</template>

<script lang="ts">
// @ts-nocheck
// upstream spm-ts doesn't run vue-tsc; this vendored file has upstream type holes
// ($store without Vuex augmentation, loose prop types, etc.). Suppressed as the
// smallest fix — restore individual casts when lifting back.
import { defineComponent, defineAsyncComponent, h } from 'vue'

// upstream: import TopBar / SideBarV2 — removed; ShellV1 wraps this component
// upstream: import KickoffWidget — no-op; omitted per comment above

// upstream: import { UserState } from '@/store/state_models'
// Inline type — enough for the mapState cast below
interface UserState { user?: { id?: string; type?: string; name?: string; email?: string; role?: string; scopes?: string[] } }

// Minimal typed shape for mock location objects used in the v-for loop.
// Matches the Location shape expected by LocationListCard's `source` prop.
interface MockLocation {
  id: string
  [key: string]: unknown
}

// upstream: import { mapState } from 'vuex'
// Replaced with manual computed in the options object (no vuex plugin here)

// upstream: import LocationListCard from '@/pmd/components/agency/LocationListCard.vue'
import LocationListCard from './LocationListCard.vue'

// upstream: import VirtualList from 'vue3-virtual-scroll-list'
// Removed — template replaced with v-for (see template comment above)

// upstream: modal imports (defineAsyncComponent) — all no-op stubs
const noOpModal = (name: string) => defineAsyncComponent(() => Promise.resolve(
  defineComponent({ name, render: () => h('div', { 'data-stub-modal': name, style: 'display:none' }) })
))
const LoadSnapshotTemplateModal = noOpModal('LoadSnapshotTemplateModal')
const EditTeamMemberModal = noOpModal('EditTeamMemberModal')

// upstream: import { Location, Company, User } from '@/models'
import { Location, Company, User } from '../_stubs/models'

// upstream: import LocationsService from '@/services/LocationsService'
// Replaced with MOCK_LOCATIONS below

// upstream: import { useEmitter } from '@/pmd/composition/useEmitter'
// upstream: import { AgencyBillingEvents } from '@/events'
// Both no-op in preview — emitter never fires events affecting rendering
const useEmitter = () => ({
  on: (_event: string, _handler: (...args: unknown[]) => void) => {},
  off: (_event: string) => {},
})

// upstream: import { trackGaEvent } from '@/util/helper'
const trackGaEvent = (..._args: unknown[]) => {}

// upstream: import DeleteLocationAbortModal from '@/pmd/components/agency/delete_location/DeleteLocationAbortModal.vue'
const DeleteLocationAbortModal = noOpModal('delete-location-abort-modal')

// upstream: import { subAccountRoutes } from '@/routes/constants/agency/'
const subAccountRoutes = {
  accounts: { detail: 'sub-account-detail', search: 'sub-account-search' },
}

// upstream: SVG icon imports from @/assets/pmd/img/saas/icons-v2/…
import DotsVerticalIcon from '@/assets/pmd/img/saas/icons-v2/dots-vertical.svg'
import RepeatIcon from '@/assets/pmd/img/saas/icons-v2/repeat.svg'
import ArrowRightIcon from '@/assets/pmd/img/saas/icons-v2/arrow-right.svg'
import PinCircleIcon from '@/assets/pmd/img/saas/icons-v2/pin-circle.svg'
import SparklesIcon from '@/assets/pmd/img/saas/icons-v2/sparkles.svg'
import BeakerIcon from '@/assets/pmd/img/saas/icons-v2/beaker.svg'

// upstream: import InternalToolsService from '@/services/InternalToolsService'
// No-op — fetchLocationTransfers always returns 0 pending requests in preview
const InternalToolsService = {
  locationTransferRequestsFetch: async (_opts: unknown) => ({ count: 0, requests: [] }),
}

// upstream: import UIButton from UIComponents — now stub
import UIButton from '../_stubs/UIButton.vue'
// upstream: import UITextInputGroup from UIComponents — now stub
import UITextInputGroup from '../_stubs/UITextInputGroup.vue'

// No-op stubs for the remaining modals referenced in the template
const RequestCardModal = noOpModal('request-card-modal')
const RequestCardSuccessModal = noOpModal('request-card-success-modal')
const ManageLocationSubscription = noOpModal('ManageLocationSubscription')

// ─── Mock data ──────────────────────────────────────────────────────────────
// Shape matches what LocationListCard reads from its `source` prop.
// Created to replace LocationsService.search() which requires a live backend.
// Names supplied by the design-preview brief; addresses, cities, and phones
// are plausible synthetic data — surfacing different US regions to exercise
// the address-line layout.
const MOCK_LOCATIONS: Location[] = [
  {
    id: 'loc-001',
    _id: 'loc-001',
    name: 'Blue Horizon Marketing',
    address: '1420 Harbor Blvd',
    city: 'Costa Mesa',
    state: 'CA',
    postalCode: '92626',
    phone: '+17143301200',
    website: '',
    logoUrl: '',
    productStatus: { listings: false, reviews: false, conversations: true, social: false },
    settings: {
      saasSettings: {
        saasMode: 'not_activated',
        saasPlanId: null,
        twilioRebilling: { enabled: false },
        mailgunRebilling: { enabled: false },
        whatsappRebilling: { enabled: false },
      },
      emailIsvSettings: { hasLcEmail: false },
    },
    reseller: {
      wordpress: { paymentStatus: 'NONE' },
      yext: { paymentStatus: 'NONE' },
    },
    locationDeleteInfo: {},
    deleted: false,
    allowBetaAccess: false,
  } as unknown as Location,
  {
    id: 'loc-002',
    _id: 'loc-002',
    name: 'Sunrise Dental Group',
    address: '8820 W 95th St',
    city: 'Overland Park',
    state: 'KS',
    postalCode: '66212',
    phone: '+19135559021',
    website: '',
    logoUrl: '',
    productStatus: { listings: false, reviews: false, conversations: false, social: false },
    settings: {
      saasSettings: {
        saasMode: 'not_activated',
        saasPlanId: null,
        twilioRebilling: { enabled: false },
        mailgunRebilling: { enabled: false },
        whatsappRebilling: { enabled: false },
      },
      emailIsvSettings: { hasLcEmail: false },
    },
    reseller: {
      wordpress: { paymentStatus: 'COMPLETE' },
      yext: { paymentStatus: 'NONE' },
    },
    locationDeleteInfo: {},
    deleted: false,
    allowBetaAccess: false,
  } as unknown as Location,
  {
    id: 'loc-003',
    _id: 'loc-003',
    name: 'Pacific Wave Media',
    address: '2011 NE 163rd St',
    city: 'North Miami Beach',
    state: 'FL',
    postalCode: '33162',
    phone: '+13055559876',
    website: '',
    logoUrl: '',
    productStatus: { listings: false, reviews: false, conversations: false, social: false },
    settings: {
      saasSettings: {
        saasMode: 'not_activated',
        saasPlanId: null,
        twilioRebilling: { enabled: false },
        mailgunRebilling: { enabled: false },
        whatsappRebilling: { enabled: false },
      },
      emailIsvSettings: { hasLcEmail: true },
    },
    reseller: {
      wordpress: { paymentStatus: 'NONE' },
      yext: { paymentStatus: 'COMPLETE' },
    },
    locationDeleteInfo: {},
    deleted: false,
    allowBetaAccess: false,
  } as unknown as Location,
  {
    id: 'loc-004',
    _id: 'loc-004',
    name: 'Pinnacle Legal Services',
    address: '1700 Market St Ste 1005',
    city: 'Philadelphia',
    state: 'PA',
    postalCode: '19103',
    phone: '+12155558822',
    website: '',
    logoUrl: '',
    productStatus: { listings: false, reviews: false, conversations: false, social: false },
    settings: {
      saasSettings: {
        saasMode: 'not_activated',
        saasPlanId: null,
        twilioRebilling: { enabled: false },
        mailgunRebilling: { enabled: false },
        whatsappRebilling: { enabled: false },
      },
      emailIsvSettings: { hasLcEmail: false },
    },
    reseller: {
      wordpress: { paymentStatus: 'NONE' },
      yext: { paymentStatus: 'NONE' },
    },
    locationDeleteInfo: {},
    deleted: false,
    allowBetaAccess: false,
  } as unknown as Location,
  {
    id: 'loc-005',
    _id: 'loc-005',
    name: 'Ember Studio Co.',
    address: '3301 Tamiami Trail N',
    city: 'Naples',
    state: 'FL',
    postalCode: '34103',
    phone: '+12395550077',
    website: '',
    logoUrl: '',
    productStatus: { listings: false, reviews: false, conversations: false, social: false },
    settings: {
      saasSettings: {
        saasMode: 'not_activated',
        saasPlanId: null,
        twilioRebilling: { enabled: false },
        mailgunRebilling: { enabled: false },
        whatsappRebilling: { enabled: false },
      },
      emailIsvSettings: { hasLcEmail: false },
    },
    reseller: {
      wordpress: { paymentStatus: 'NONE' },
      yext: { paymentStatus: 'NONE' },
    },
    locationDeleteInfo: {},
    deleted: false,
    allowBetaAccess: false,
  } as unknown as Location,
]

let unsubscribeLocations: (() => void) | undefined

export default defineComponent({
  name: 'ListAccounts',

  components: {
    LocationListCard,
    LoadSnapshotTemplateModal,
    RequestCardModal,
    RequestCardSuccessModal,
    EditTeamMemberModal,
    ManageLocationSubscription,
    DeleteLocationAbortModal,
    DotsVerticalIcon,
    RepeatIcon,
    ArrowRightIcon,
    PinCircleIcon,
    UIButton,
    UITextInputGroup,
    SparklesIcon,
    BeakerIcon,
  },

  data() {
    return {
      locationListCard: LocationListCard,
      // upstream: populated by LocationsService.search()
      // here: pre-filled with MOCK_LOCATIONS
      locations: MOCK_LOCATIONS as unknown[],
      searchText: '' as string,
      company: {} as Company,
      loadSnapshotTemplateModal: { visible: false } as Record<string, unknown>,
      limit: 50,
      skip: MOCK_LOCATIONS.length,
      searchDebouncer: undefined as ReturnType<typeof setTimeout> | undefined,
      loadMoreLoading: false,
      showRequestCardModal: false,
      showRequestCardSuccessModal: false,
      loadingLocationsCount: false,
      showManageLocationSubscriptionModal: false,
      requestCardLocationId: '',
      requestCardSuccessMessage: '',
      teamMemberModalValues: {} as Record<string, unknown>,
      walletBalance: {} as Record<string, unknown>,
      deleteLocationAbortModalValues: { show: false } as Record<string, unknown>,
      locationListCardComponentKey: 0,
      locationListCardComponentKey2: 0,
      pendingLocationTransferRequests: 0,
      emitter: useEmitter(),
    }
  },

  computed: {
    // upstream: ...mapState('user', { user: (s: UserState) => new User(...) })
    // Replaced: reads from the preview store stub directly.
    user(): User | undefined {
      const storeUser = (this.$store.state as { user?: UserState }).user?.user
      return storeUser ? new User(JSON.parse(JSON.stringify(storeUser))) : undefined
    },

    agencyInSaasPlan(): boolean {
      return this.$store.getters['company/inSaasPlan']
    },

    agencyIn297Plan(): boolean {
      return this.$store.getters['company/in297Plan']
    },

    getSideBarVersion(): string {
      return this.$store.getters['sidebarv2/getVersion']
    },

    isAgencyAdmin() {
      if (this.user && this.user.role === 'admin' && this.user.type === 'agency') {
        return true
      }
      return false
    },

    canAccessLocationTransfer(): boolean {
      return !!(this.user?.scopes?.includes('internaltools.location-transfer.write'))
    },
  },

  async created() {
    // upstream: LocationsService.search(...) fills this.locations
    // here: MOCK_LOCATIONS already in data() — no API call needed

    // upstream: Company.getById(authUser.companyId)
    this.company = await Company.getById('preview-company')
    // fetchLocationTransfers is a no-op (returns 0)
    this.fetchLocationTransfers()

    this.emitter.on('switchToSaaS', (locationId: string) => {
      this.requestCardLocationId = locationId
      this.showRequestCardModal = true
      trackGaEvent('SaaS Mode', locationId, 'Init switch To SaaS', 1)
    })

    this.emitter.on('abortDeletion', (location: unknown) => {
      this.deleteLocationAbortModalValues = {
        show: true,
        location,
        isAgencyAdmin: this.isAgencyAdmin,
        user: this.user,
      }
    })
  },

  beforeMount() {
    this.forceUpdateLocationListCard()
  },

  mounted() {
    this.locationListCardComponentKey++
    this.locationListCardComponentKey2++
    setTimeout(() => {
      this.getLocationWalletBalance()
    }, 1000)
  },

  beforeUnmount() {
    if (unsubscribeLocations) unsubscribeLocations()
    this.emitter.off('switchToSaaS')
    this.emitter.off('abortDeletion')
  },

  methods: {
    async refetchLocationData(locationId: string) {
      let locationIndex = (this.locations as Location[]).findIndex((location) => (location as unknown as { id: string }).id === locationId)
      if (locationIndex !== -1) {
        // No-op in preview — we don't re-fetch individual locations
      }
    },

    async loadMoreOnScroll() {
      console.log('Load on scroll')
      if (!this.loadMoreLoading && this.skip % 50 === 0) {
        await this.loadMore()
      }
    },

    updateSearchText(event: Event) {
      console.log(`event`, (event.target as HTMLInputElement).value)
      let name = (event.target as HTMLInputElement).value
      if (this.searchDebouncer) clearTimeout(this.searchDebouncer)
      this.searchDebouncer = setTimeout(() => {
        this.runSearch(name)
      }, 300)
    },

    async runSearch(name: string) {
      console.log('Search Query', name)
      let locations = await this.$store.getters['locations/searchByName'](name)
      console.log('Search Results', locations)
      this.locations = locations
      this.skip = locations.length
    },

    async getLocationWalletBalance() {
      // No-op in preview — wallet balance endpoint requires backend
    },

    async loadMore() {
      // No-op in preview — all mock data is already in locations
      this.loadMoreLoading = false
    },

    async loadSnapshotTemplate() {
      this.loadingLocationsCount = true
      try {
        this.loadSnapshotTemplateModal = { visible: true }
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingLocationsCount = false
      }
    },

    handleSelectTemplate(templateId: string, snapshotType: string, locationType: string) {
      this.loadSnapshotTemplateModal = { visible: false }
      window.localStorage.setItem('templateId', templateId)
      const query: Record<string, string> = {
        snapshot: templateId,
        s_type: snapshotType,
      }
      if (locationType === 'saas') {
        query['l_type'] = 'saas'
        trackGaEvent('SaaS Mode', this.company.id, 'Init creation of new SaaS Location', 1)
      }
      this.$router.push({
        name: subAccountRoutes.accounts.search,
        query: query,
      })
    },

    async handleSubAccountTransfer() {
      this.$router.push({ name: 'location-transfer-page' })
    },

    async handleRequestCardSuccess(e: { msg: string; response: { paymentMethodAdded: boolean }; locationId: string }) {
      const { msg, response, locationId } = e
      this.showRequestCardModal = false
      this.requestCardSuccessMessage = msg
      if (response.paymentMethodAdded) {
        this.showManageLocationSubscriptionModal = true
      } else {
        this.showRequestCardSuccessModal = true
      }
      trackGaEvent('SaaS Mode', this.requestCardLocationId, 'Converted to a SaaS Location.', 1)
      await this.refetchLocationData(locationId)
    },

    async handleSuccessAttachPlan(e: { locationId?: string }) {
      this.showManageLocationSubscriptionModal = false
      this.showRequestCardSuccessModal = true
      if (e?.locationId) {
        await this.refetchLocationData(e.locationId)
      }
    },

    showCreateUserModal(locationId: string) {
      this.showRequestCardModal = false
      this.teamMemberModalValues = {
        visible: true,
        companyId: this.company.id,
        isEditing: false,
      }
      trackGaEvent('SaaS Mode', locationId, 'Init creating new User', 1)
    },

    newUserCreated(locationId: string) {
      this.teamMemberModalValues = { visible: false }
      setTimeout(() => {
        this.showRequestCardModal = true
      }, 500)
      trackGaEvent('SaaS Mode', locationId, 'Created new User', 1)
    },

    async stopDeletion(location: { id: string }) {
      // No-op in preview — abort-deletion endpoint requires backend
      this.deleteLocationAbortModalValues = { show: false }
    },

    forceUpdateLocationListCard() {
      this.locationListCardComponentKey++
      this.locationListCardComponentKey2++
    },

    async fetchLocationTransfers() {
      try {
        if (!this.canAccessLocationTransfer) return
        const requestData = await InternalToolsService.locationTransferRequestsFetch({
          companyId: (this.company as { id?: string })?.id,
          skip: 0,
          limit: 1,
        })
        this.pendingLocationTransferRequests = requestData.count
      } catch {
        this.pendingLocationTransferRequests = 0
      }
    },
  },
})
</script>

<style>
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
