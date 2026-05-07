<!--
  LocationListCard.vue
  ────────────────────────────────────────────────────────────────────────────
  Vendored verbatim from:
    spm-ts/src/pmd/components/agency/LocationListCard.vue

  Import surgery applied (upstream → here):
    @/models                            → ../_stubs/models  (Location class)
    @/models/event-bus                  → ../_stubs/event-bus
    @/compatibility/dropdown/Dropdown.vue     → ../_stubs/UIDropdown.vue
    @/compatibility/dropdown/DropdownItem.vue  → ../_stubs/UIDropdownItem.vue
    ../util/PhoneNumber.vue             → ../_stubs/PhoneNumber.vue
    ./LcIconTooltip.vue                 → ../_stubs/LCIconTooltip.vue
    lodash-es/filter|map                → inlined native equivalents (no dep add)
    @/assets/pmd/img/…                 → relative paths into vendored assets
    @/routes/constants/agency/         → inline stub constants
    @/routes/constants/location        → inline stub constants
    @/util/helper (checkAndRedirectToSummerOfAI) → no-op inline function
    @/apps/phone-integration/…          → inline LCPhoneState enum stub
    @/apps/saas/constants               → inline LCEmailState enum stub
    ../../../models (TwilioAccount)     → interface stub
    @/apps/phone-integration/services   → async no-op stub

  Template kept byte-identical to upstream.
  The only template delta: `StartIcon` (used in template but never imported
  upstream — a pre-existing bug; kept as-is and resolved via components: option
  as a no-op).
-->
<template>
  <div class="card hl_location--item">
    <div class="hl_location--item-inner">
      <div class="hl_location--logo">
        <img v-if="logoUrl" :src="logoUrl" />
      </div>
      <div class="card-body">
        <div class="hl_location--header">
          <div class="hl_location--header-left">
            <h3>
              <router-link
                :to="{
                  name: subAccountRoutes.accounts.detail,
                  params: { account_id: location.id },
                }"
                >{{ location.name }}</router-link
              >
              <span
                v-if="locationDeleteInfo.locationDeleteStatus && locationDeleteInfo.locationDeleteStatus==='scheduled' && !location.deleted"
                class="label --red"
                >{{ $t('common.scheduledForDeletion') }}</span
              >
              <!-- <span
                v-else-if="location.status === LocationStatus.PROSPECT"
                class="label --green"
                >Ready to sell</span
              >
              <span
                v-else-if="location.status === LocationStatus.ACCOUNT"
                class="label --blue"
                >Closed (Won)</span
              > -->
            </h3>
          </div>
          <div class="hl_location--header-right" v-if="agencyInSaasPlan">
            <div
              v-if="products.indexOf('listings') > -1"
              class="hl_icon --green"
              v-tooltip.hover
              :title="$t('agency.locationCard.listings')"
            >
              <ListIcon />
            </div>
            <div
              v-if="products.indexOf('reviews') > -1"
              class="hl_icon --yellow"
              v-tooltip.hover
              :title="$t('agency.locationCard.reviews')"
            >
              <StartIcon />
            </div>
            <div
              v-if="products.indexOf('conversations') > -1"
              class="hl_icon --blue"
              v-tooltip.hover
              :title="$t('common.conversations1')"
            >
              <ConversationIcon />
            </div>
            <div
              v-if="products.indexOf('social') > -1"
              class="hl_icon --pink"
              v-tooltip.hover
              :title="$t('agency.locationCard.social')"
            >
              <SocialIcon />
            </div>
            <UIDropdown
              variant="light"
              size="sm"
              no-caret
              right
              class="more-options-dropdown"
              v-if="showSaasMode && saasMode !== 'activated'"
            >
              <template #button-content>
                <i class="fas fa-ellipsis-h"></i>
              </template>
              <UIDropdownItem
                @click="switchToSaaS"
                v-if="
                  showSaasMode &&
                  saasMode !== 'activated' &&
                  saasMode === 'not_activated'
                "
              >
                {{ $t('agency.locationCard.switchToSaaS') }}
              </UIDropdownItem>
              <UIDropdownItem
                @click="switchToSaaS"
                v-else-if="showSaasMode && saasMode !== 'activated'"
              >
                {{ $t('agency.locationCard.requestPaymentAgain') }}
              </UIDropdownItem>
            </UIDropdown>
          </div>
        </div>
        <div class="flex--space-between">
          <ul class="hl_location--info-list list-unstyled">
            <li>
              <p>
                <i class="icon icon-a-pin"></i>
                {{ location.address }} {{ location.city }}, {{ location.state }}
                {{ location.postalCode }}
              </p>
            </li>
            <li>
              <p>
                <i class="icon icon-a-phone"></i>
                <PhoneNumber type="display" v-model="location.phone" />
              </p>
            </li>
          </ul>
          <div class="addons">
            <div class="imgHolder">
              <WordpressActiveIcon
                :title="$t('agency.locationCard.wordpressActive')"
                v-if="wordpressInstalled"
                v-tooltip.hover.top="$t('agency.locationCard.wordpressSaleSuccessful')"
              />
              <WordpressInactiveIcon
                :title="$t('agency.locationCard.wordpressInactive')"
                v-tooltip.hover.top="$t('agency.locationCard.wordpressNotSoldYet')"
                v-else
              />
            </div>
            <div class="imgHolder">
              <YextActiveIcon
                :title="$t('agency.locationCard.yextActive')"
                v-if="yextActive"
                v-tooltip.hover.top="$t('agency.locationCard.yextSaleSuccessful')"
              />
              <YextInactiveIcon
                :title="$t('agency.locationCard.yextInactive')"
                v-else
                v-tooltip.hover.top="$t('agency.locationCard.yextNotSoldYet')"
              />
            </div>
            <div v-if="showSaasMode" class="saas-mode">
              <div
                v-if="saasMode === 'activated'"
                class="addons"
              >
                <div class="imgHolder" v-if="agencyInSaasPlan">
                  <ActivePlanIcon
                    :title="$t('common.saasSubscriptionActive')"
                    v-tooltip.hover.top="$t('agency.locationCard.saasSubscriptionRunning')"
                    v-if="location.settings.saasSettings.saasPlanId"
                  />
                  <InactivePlanIcon
                    v-tooltip.hover.top="$t('agency.locationCard.saasSubscriptionNotEnabled')"
                    :title="$t('common.saasSubscriptionActive')"
                    v-else
                  />
                </div>
                <div class="imgHolder">
                  <ActiveEmailIcon
                    :title="$t('common.emailRebillingActive')"
                    v-if="emailRebillingEnabled"
                    v-tooltip.hover.top="$t('agency.locationCard.emailUsageRebilled')"
                  />
                  <InactiveEmailIcon
                    :title="$t('common.emailRebillingActive')"
                    v-else
                    v-tooltip.hover.top="$t('agency.locationCard.emailUsageNotRebilled')"
                  />
                </div>

                <div class="imgHolder">
                  <ActiveTwilioIcon
                    v-tooltip.hover.top="$t('agency.locationCard.telephoneUsageRebilled')"
                    :title="$t('common.twilioRebillingActive')"
                    v-if="twilioRebillingEnabled"
                  />
                  <InactiveTwilioIcon
                    v-tooltip.hover.top="$t('agency.locationCard.telephoneUsageNotBilled')"
                    :title="$t('common.twilioRebillingActive')"
                    v-else
                  />
              </div>
            </div>

              <div v-if="agencyInSaasPlan" class="imgHolder">
                <ActiveSaasIcon
                  v-tooltip.hover.top="$t('agency.locationCard.saasModeActivated')"
                  :title="$t('agency.locationCard.saasModeActivated')"
                  v-if="saasMode === 'activated'"
                  style=""
                />
                <PendingSaasIcon
                  v-tooltip.hover.top="$t('agency.locationCard.paymentPending')"
                  :title="$t('agency.locationCard.paymentPending')"
                  v-else-if="saasMode === 'setup_pending'"
                />
                <InactiveSaasIcon
                  v-tooltip.hover.top="$t('agency.locationCard.saasModeNotActivated')"
                  :title="$t('agency.locationCard.saasModeNotActivated')"
                  v-else-if="saasMode === 'not_activated'"
                />
              </div>
              <!-- LC email and LC phone icons -->
              <div class="imgHolder">
                <LCIconTooltip type="lc_email" :locationId="location.id" :state="lcEmailStatus"/>
              </div>
              <div class="imgHolder">
                <LCIconTooltip type="lc_phone" :locationId="location.id" :state="getLcPhoneStatus"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hl_location--footer card-footer">
      <div class="hl_location--footer-left">
        <ul class="list-inline">
          <li
            class="list-inline-item saas-wallet__balance"
            :class="
              parseInt(walletBalance[location.id]) < 0
                ? '--negative'
                : '--positive'
            "
            v-if="
              showSaasMode &&
              saasMode === 'activated' &&
              walletBalance[location.id]
            "
          >
            <i class="fas fa-wallet wallet-icon"></i>
            ${{ walletBalance[location.id] }}
            <span
              class="hl_tooltip"
              v-tooltip.hover
              :title="$t('agency.locationCard.remainingWalletBalance')"
              ><i class="fas fa-info-circle"></i
            ></span>
          </li>
          <li class="list-inline-item">
          </li>
          <!-- <li class="list-inline-item ">
                        <p>
                            <i class="icon icon-a-mail "></i> Claris Care email campaign
                            <i class="icon icon-a-refresh "></i>
                        </p>
					</li>-->
        </ul>
      </div>
      <div class="hl_location--footer-right">
        <a
          href="javascript:void(0);"
          class="switch-loction-btn"
          @click="switchLocation(location.id)"
          >{{ $t('agency.locationCard.switchToSubAccount') }}</a
        >
        <router-link
          :to="{ name: subAccountRoutes.accounts.detail, params: { account_id: location.id } }"
        >
          {{ $t('agency.locationCard.manageClient') }}
          <i class="icon icon-arrow-right-1"></i>
        </router-link>
      </div>
    </div>
    <div class="disable-dialog" v-if="locationDeleteInfo.locationDeleteStatus && locationDeleteInfo.locationDeleteStatus==='scheduled' && locationDeleteInfo.scheduledDeletionTime && !location.deleted">
      <div class="masking-layer">
         <i class="fa fa-trash-o" aria-hidden="true"></i> {{ $t('agency.locationCard.deletionScheduledMessage', { date: formatLocalDate(locationDeleteInfo.scheduledDeletionTime) }) }} <span class="link-text" role="button" @click="openStopDeletionModal">{{ $t('common.clickHere') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
// upstream spm-ts doesn't run vue-tsc; this vendored file has ~50 type holes
// (location prop typed as Object, $store without Vuex augmentation, etc.).
// Suppressed here as the smallest fix — restore individual casts when lifting back.
import { defineComponent } from 'vue'

// upstream: import { LocationStatus } from '@/models/'
// Minimal enum — LocationStatus is referenced in commented-out template code only.
enum LocationStatus { PROSPECT = 'prospect', ACCOUNT = 'account' }

// upstream: import PhoneNumber from '../util/PhoneNumber.vue'
import PhoneNumber from '../_stubs/PhoneNumber.vue'

// upstream: SVG imports from @/assets/pmd/img/…
// Resolved to vendored paths in src/assets/pmd/img/…
import ListIcon from '@/assets/pmd/img/icon-listing.svg'
import ConversationIcon from '@/assets/pmd/img/icon-conversation.svg'
import SocialIcon from '@/assets/pmd/img/icon-social.svg'
import ActivePlanIcon from '@/assets/pmd/img/saas/icons-v2/plan-active.svg'
import InactivePlanIcon from '@/assets/pmd/img/saas/icons-v2/plan-inactive.svg'
import ActiveEmailIcon from '@/assets/pmd/img/saas/rebilling/email_rebilling_active.svg'
import InactiveEmailIcon from '@/assets/pmd/img/saas/rebilling/email_rebilling_inactive.svg'
import ActiveTwilioIcon from '@/assets/pmd/img/saas/rebilling/phone_rebilling_active.svg'
import InactiveTwilioIcon from '@/assets/pmd/img/saas/rebilling/phone_rebilling_inactive.svg'
import ActiveSaasIcon from '@/assets/pmd/img/saas/icons-v2/saas-active.svg'
import PendingSaasIcon from '@/assets/pmd/img/saas/icons-v2/saas-pending.svg'
import InactiveSaasIcon from '@/assets/pmd/img/saas/icons-v2/saas-inactive.svg'
import WordpressActiveIcon from '@/assets/pmd/img/saas/rebilling/wordpress_active.svg'
import WordpressInactiveIcon from '@/assets/pmd/img/saas/rebilling/wordpress_inactive.svg'
import YextActiveIcon from '@/assets/pmd/img/saas/rebilling/yext_active.svg'
import YextInactiveIcon from '@/assets/pmd/img/saas/rebilling/yext_inactive.svg'

// upstream: import {TwilioAccount} from '../../../models'
// Minimal interface — only fields read by this component.
interface TwilioAccount {
  underGhlAccount?: boolean
  underGHLAccount?: boolean
  migrationStatus?: string
}

// upstream: import filter from 'lodash-es/filter' / import map from 'lodash-es/map'
// lodash-es is not in the preview repo deps. Native equivalents keep call sites identical.
function filter<T>(arr: T[]): T[] { return arr.filter(Boolean) }
function map<T>(obj: Record<string, T>, fn: (v: T, k: string) => unknown): unknown[] {
  return Object.entries(obj).map(([k, v]) => fn(v, k))
}

// upstream: import { LCPhoneState } from '../../../apps/phone-integration/enum/PhoneIntegration'
enum LCPhoneState { ENABLED = 'enabled', NOT_ENABLED = 'not_enabled', MIGRATION_IN_PROCESS = 'migration_in_process' }

// upstream: import { LCEmailState } from '../../../apps/saas/constants'
enum LCEmailState { ENABLED = 'enabled', NOT_ENABLED = 'not_enabled' }

// upstream: import LCIconTooltip from './LcIconTooltip.vue'
import LCIconTooltip from '../_stubs/LCIconTooltip.vue'

// upstream: import UIDropdown from '@/compatibility/dropdown/Dropdown.vue'
import UIDropdown from '../_stubs/UIDropdown.vue'
// upstream: import UIDropdownItem from '@/compatibility/dropdown/DropdownItem.vue'
import UIDropdownItem from '../_stubs/UIDropdownItem.vue'

// upstream: import { EventBus } from '@/models/event-bus'
import { EventBus } from '../_stubs/event-bus'

// upstream: import { subAccountRoutes } from '@/routes/constants/agency/'
const subAccountRoutes = {
  accounts: {
    detail: 'sub-account-detail',
    search: 'sub-account-search',
  },
}

// upstream: import { launchPadRouteNames, DashboardRouteNames } from '@/routes/constants/location'
const launchPadRouteNames = { oldLaunchpad: 'old-launchpad' }
const DashboardRouteNames = { oldDashboard: 'old-dashboard' }

// upstream: import { checkAndRedirectToSummerOfAI } from '@/util/helper'
// No-op — navigation is inert in the preview.
async function checkAndRedirectToSummerOfAI(_opts: unknown): Promise<boolean> { return false }

// upstream: import { TwilioAccountService } from '../../../apps/phone-integration/services'
// No-op — returns an empty object so the component initialises without error.
const TwilioAccountService = {
  async getLocationTwilio(_locationId: string): Promise<TwilioAccount> { return {} },
}

// Stub for StartIcon — used in template but never imported upstream (pre-existing upstream bug).
import { defineComponent as _dc, h } from 'vue'
const StartIcon = _dc({ name: 'StartIcon', render: () => h('span') })

export default defineComponent({
  props: {
    source: Object,
    showSaasMode: {
      type: Boolean,
      default: false,
    },
    walletBalance: Object,
    // isCalendarV3OnAtCompanyLevel: Boolean
  },
  components: {
    PhoneNumber,
    ListIcon,
    ConversationIcon,
    SocialIcon,
    ActivePlanIcon,
    InactivePlanIcon,
    ActiveEmailIcon,
    InactiveEmailIcon,
    ActiveTwilioIcon,
    InactiveTwilioIcon,
    ActiveSaasIcon,
    PendingSaasIcon,
    InactiveSaasIcon,
    WordpressInactiveIcon,
    WordpressActiveIcon,
    YextActiveIcon,
    YextInactiveIcon,
    LCIconTooltip,
    UIDropdown,
    UIDropdownItem,
    StartIcon,
  },
  async created() {
    this.getLogoUrl()
    this.lcEmailStatus = this.location?.settings?.emailIsvSettings?.hasLcEmail ? LCEmailState.ENABLED : LCEmailState.NOT_ENABLED;
    this.twilioAccount = await TwilioAccountService.getLocationTwilio(this.location.id);
    if(this.twilioAccount && this.twilioAccount?.underGhlAccount){
      this.lcPhoneStatus = LCPhoneState.ENABLED;
    }else if(this.twilioAccount?.migrationStatus === 'pending' || this.twilioAccount?.migrationStatus === 'queued'){
      this.lcPhoneStatus = LCPhoneState.MIGRATION_IN_PROCESS;
    }else{
      this.lcPhoneStatus = LCPhoneState.NOT_ENABLED;
    }
    this.locationDeleteInfo = this.location?.locationDeleteInfo || {} ;
  },
  computed: {
    allowBetaAccess() {
      return this.location.allowBetaAccess
    },
    company() {
      return this.$store.state.company.company
    },
    location() {
      return this.source
    },
    products(): string[] {
      return filter(
        map(this.location.productStatus, (value, key) => {
          return value === true ? key : ''
        })
      ) as string[]
    },
    saasMode(): string {
      const saasMode = this.location.settings?.saasSettings?.saasMode
      return saasMode || 'not_activated'
    },
    twilioRebillingEnabled(): boolean {
      return (
        this.saasMode === 'activated' &&
        this.location.settings &&
        this.location.settings.saasSettings &&
        this.location.settings.saasSettings.twilioRebilling &&
        !!this.location.settings.saasSettings.twilioRebilling.enabled
      )
    },
    whatsAppRebillingEnabled(): boolean {
      return (
        this.saasMode === 'activated' &&
        this.location.settings.saasSettings.whatsappRebilling &&
        !!this.location.settings.saasSettings.whatsappRebilling.enabled && this.twilioAccount &&
        this.twilioAccount.underGHLAccount
      )
    },
    emailRebillingEnabled(): boolean {
      return (
        this.saasMode === 'activated' &&
        this.location.settings &&
        this.location.settings.saasSettings &&
        this.location.settings.saasSettings.mailgunRebilling &&
        !!this.location.settings.saasSettings.mailgunRebilling.enabled
      )
    },
    wordpressInstalled() {
      return (
        this.location.reseller &&
        this.location.reseller.wordpress &&
        this.location.reseller.wordpress.paymentStatus === 'COMPLETE'
      )
    },
    yextActive() {
      return (
        this.location.reseller &&
        this.location.reseller.yext &&
        this.location.reseller.yext.paymentStatus === 'COMPLETE'
      )
    },
    agencyInSaasPlan(): boolean {
      return this.$store.getters['company/inSaasPlan']
    },
    agencyIn297Plan(): boolean {
      return this.$store.getters['company/in297Plan']
    },
    getLcPhoneStatus():LCPhoneState{
      return this.lcPhoneStatus;
    }
  },
  data() {
    return {
      LocationStatus,
      logoUrl: '',
      saving: false,
      twilioAccount: {} as TwilioAccount,
      locationDeleteInfo: {} as Record<string, unknown>,
      deleteLocationAbortModalValues:{
        show:false
      },
      lcPhoneStatus: LCPhoneState.NOT_ENABLED,
      lcEmailStatus: LCEmailState.NOT_ENABLED,
      subAccountRoutes
    }
  },
  methods: {
    dispatch(componentName: string, eventName: string, ...rest: unknown[]) {
      let parent = this.$parent || EventBus
      let name = (parent as { $options?: { name?: string } })?.$options?.name
      while (parent && (!name || name !== componentName)) {
        parent = (parent as { $parent?: unknown }).$parent as typeof parent
        if (parent) {
          name = (parent as { $options?: { name?: string } })?.$options?.name
        }
      }
      if (parent) {
        (parent as { $emit: (...args: unknown[]) => void }).$emit(...([eventName].concat(rest)))
      }
    },
    switchToSaaS() {
      this.dispatch('ListAccounts', 'switchToSaaS', this.location.id)
    },

    stripWebsite(website: string) {
      try{
        if (!website) return
        let url = website
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + website
        }
        return new URL(url).hostname.replace('www.', '')
      } catch (err) {
        console.error('Error processing URL:', err);
        return '';
      }
    },
    testImageLoad(src: string): Promise<string> {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
          resolve(src)
        }
        img.onerror = () => {
          reject()
        }
        img.onabort = () => {
          reject()
        }
        img.src = src
      })
    },
    async getLogoUrl() {
      if (this.location.logoUrl) {
        this.logoUrl = this.location.logoUrl
      } else if (this.location.website) {
        const website = this.stripWebsite(this.location.website)
        const url = 'https://logo.clearbit.com/' + website
        try {
          this.logoUrl = await this.testImageLoad(url)
        } catch {}
      }
    },

    async switchLocation(locationId: string) {
      try {
        // upstream: await this.$store.dispatch('aiLocationPlan/syncAll', { locationId })
        const redirectedToSummerOfAIMenu = await checkAndRedirectToSummerOfAI({
          store: this.$store,
          router: this.$router,
          locationId
        })
        if(redirectedToSummerOfAIMenu) return

        const allowRedirection = await this.$store.dispatch(
          'launchpad/redirectToLaunchpad',
          locationId
        )
        if(!allowRedirection) {
          return this.$router.push({
            name: DashboardRouteNames.oldDashboard,
            params: { location_id: locationId },
          })
        } else {
          return this.$router.push({
            name: launchPadRouteNames.oldLaunchpad,
            params: { location_id: locationId },
          })
        }
      } catch {
        console.error('some error occured switching location')
        return this.$router.push({
          name: 'dashboard',
          params: { location_id: locationId },
        })
      }
    },
    openStopDeletionModal(){
      this.dispatch('ListAccounts', 'abortDeletion', this.location)
    },
    formatLocalDate(dtString: string) {
        const date = new Date(dtString);
        const dateStr = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', day: 'numeric', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }).format(date);
        const timeStr = new Intl.DateTimeFormat('en-US', { hour12: true, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, timeStyle: 'full' as Intl.DateTimeFormatOptions['timeStyle'] }).format(date);
        return dateStr + ' ' + timeStr;
    },
  },
})
</script>
<style lang="scss" scoped>
.flex--space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switch-loction-btn {
  margin-right: 20px;
}
.more-options-dropdown {
  .btn.dropdown-toggle {
    background-color: #ffffff !important;
    padding: 0px !important;
    color: #718096;
    margin-top: -16px;
    &:after {
      display: none;
    }
  }
}
.saas-mode {
  padding-right: 24px;
  display: flex;
  align-items: flex-start;
}
.saas-wallet__balance {
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  color: #48bb78;
  &.--negative {
    color: #f56565;
  }
  .wallet-icon {
    // color: #ccd8ed;
    color: #26a69a;
  }
  .hl_tooltip {
    background-color: #ffffff;
    color: #718096;
  }
}

.imgHolder {
  display: grid;
  justify-items: center;
  margin: 0 10px;
  position: relative;
  img,
  svg {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
  .status_indicator {
    position: absolute;
    top: -10px;
    right: 3px;
    color: #68d391;
  }
  span {
    text-align: center;
    color: #2f2b2b;
    font-weight: 700;
    display: block;
    line-height: 16px;
    white-space: nowrap;
  }
}
.imgHolder:last-child {
  margin-right: 0;
}
.--inactive-label {
  opacity: 0.4;
}

.addons {
  display: flex;
}
.disable-dialog {
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 1000;
  display: table-cell;vertical-align: middle;text-align: center;
  padding:5%;
}
.masking-layer{
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  bottom: 4%;
  left:2%;
  min-width:50%;
  padding:0.4rem 3rem;
  background: #FFFFFF;
  border: 1px solid #F87171;
  border-radius: 6px;
  text-align:left;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color:#111827;
}
.fa-trash-o {
  color: #F87171;
  font-size:1.1rem;
  position:absolute;
  bottom:25%;
  left:3%;
}
.link-text{
  color:#3B82F6;
  text-decoration:none;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}
</style>
