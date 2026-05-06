<template>
  <div>
    <header
      ref="hlHeader"
      class="hl_header"
      :class="{
        '--agency': user && isUserTypeAgency && !currentLocationId,
        ' nav-shrink': collapseSideBar === true && currentLocationId && user && getVersion != 'v2',
        'hl_header--collapse': collapseSideBar,
        'cal-advance-view': false,
      }"
    >
      <NotificationBanner v-if="!isNonActiveLocation" />
      <div class="container-fluid !justify-end" :class="{ 'hl_disable--action': disableAction }">
        <div v-if="isUserSwitched" class="flex justify-center items-center m-0 w-full text-xs">
          <div class="px-4 py-1 font-medium bg-blue-100 rounded-lg">
            {{ $t('common.topBar.loggedInAs') }}
            <span>
              <span class="text-gray-900">{{ user ? user.name : '' }}</span>
              &nbsp;(
              <span class="w-16 font-small">{{ user ? user.email : '' }}</span>
              )
            </span>
            &nbsp;
            <span class="font-extrabold text-blue-600 cursor-pointer" @click.stop="switchIntoMyAccount()">
              {{ $t('common.topBar.switchToMyAccount') }}
            </span>
          </div>
        </div>

        <div class="dropdown bootstrap-select hl_header--picker fit-width show"></div>
        <div class="hl_header--controls">
          <!-- Preview: hide empty shell attachment points so controls pack like prod chrome. -->
          <div v-if="false" id="CalendarsFeatureDiscovery" />
          <div v-if="false" id="ContactsFeatureDiscovery" />
          <div v-if="false" id="PaymentsFeatureDiscovery" />
          <div v-if="false" id="whatsAppHeaderSlotShared" />
          <div
            v-if="false"
            id="i18n-feedback"
            :aria-label="$t('common.topBar.reportTranslationIssue')"
            v-tooltip.hover.bottom
            :title="$t('common.topBar.reportTranslationIssue')"
          >
            <I18nFeedback :locationId="currentLocationId" />
          </div>
          <TopBarWalletPill :balance="walletBalance" :visible="isWalletPillVisible" @click="handleWalletPillClick" />
          <div id="CalendarOnboardingChat" />

          <DialerModalV2 v-if="currentLocationId && !isNonActiveLocation" />
          <ScreenRecorder v-if="canUseScreenRecorder" />

          <a
            id="hl_header--copilot-icon"
            class="btn btn-circle btn-primary hl_header--copy-link !w-auto preview-ask-ai-trigger"
            href="javascript:void(0);"
            @click="trackCopilotIconClick"
            :aria-label="$t('common.topBar.askAIAssistant')"
            role="button"
            v-if="isCopilotEnabled && !isNonActiveLocation && !showNextLeadButton && !isOnAskAiRoute"
            v-tooltip.hover.bottom
            :title="$t('common.topBar.askAI')"
          >
            <CopilotPrimaryIcon width="83" height="32" />
            <span class="sr-only">{{ $t('common.topBar.askAI') }}</span>
          </a>

          <template v-if="!showNextLeadButton">
            <div
              v-if="company && isCompanyCustomerTypeAgency && user && isUserTypeAgency && !isNonActiveLocation"
              class="hl_header--controls"
            >
              <a
                href="javascript:void(0);"
                class="btn btn-circle btn-changelog preview-topbar-changelog"
                id="canny_logs-toggle"
                role="button"
                :aria-label="$t('common.topBar.viewChangelog')"
                data-canny-changelog
                v-tooltip.hover.bottom
                :title="$t('common.topBar.viewChangelog')"
              >
                <i class="fas fa-bullhorn"></i>
                <span class="sr-only">{{ $t('common.topBar.viewChangelog') }}</span>
              </a>
            </div>

            <a
              href="javascript:void(0);"
              class="flex justify-center items-center btn btn-circle hl_header--recent-activities preview-topbar-bell"
              :class="{
                '-notification': hasUnreadNotifications,
              }"
              id="recent_activities-toggle"
              v-if="!isNonActiveLocation"
              @click="toggleNotification"
              v-tooltip.hover.bottom
              :title="$t('common.topBar.notifications')"
              role="button"
              :aria-label="$t('common.topBar.viewNotifications')"
            >
              <i class="text-white fa fa-bell fa-lg"></i>
              <span class="sr-only">{{ $t('common.topBar.notifications') }}</span>
            </a>

            <a
              id="hl_header--help-icon"
              class="btn btn-circle btn-primary hl_header--copy-link"
              href="javascript:void(0);"
              style="background: #188bf6 !important"
              @click="trackHelpIconClick"
              v-if="!isNonActiveLocation && company && isCompanyCustomerTypeAgency && user && isUserTypeAgency"
              v-tooltip.hover.bottom
              :aria-label="$t('common.topBar.accessHelpSupport')"
              :title="$t('common.topBar.needHelp')"
              role="button"
            >
              <i class="fa fa-question" style="color: #ffffff" />
              <span class="sr-only">{{ $t('common.topBar.support') }}</span>
            </a>

            <div class="hl_header--dropdown dropdown --no-caret">
              <a
                href="javascript:void(0);"
                class="hl_header--avatar dropdown-toggle"
                role="button"
                :aria-label="$t('common.topBar.openProfileMenu')"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-tooltip.hover.bottom
              >
                <div class="avatar">
                  <div v-if="user && user.profilePhoto" class="avatar_img">
                    <img :src="user.profilePhoto" alt="" />
                  </div>
                  <div v-else-if="user && user.initials" class="avatar_img" v-bind:style="{ backgroundColor: user.profileColor }">
                    {{ user.initials }}
                  </div>
                  <div v-else class="avatar_img --gray">?</div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="mx-4 my-1 user-info-card">
                  <small v-if="isUserSwitched">{{ $t('common.topBar.loggedInAs') }}</small>
                  <div class="flex justify-center items-center space-x-2">
                    <div class="avatar">
                      <div v-if="user && user.profilePhoto" class="avatar_img">
                        <img :src="user.profilePhoto" alt="" />
                      </div>
                      <div v-else-if="user && user.initials" class="avatar_img" v-bind:style="{ backgroundColor: user.profileColor }">
                        {{ user.initials }}
                      </div>
                      <div v-else class="avatar_img --gray">?</div>
                    </div>
                    <div class="inline-block px-2 py-1 w-56 text-sm break-all dark:text-white">
                      <div class="text-gray-900">
                        {{ user ? user.name : '' }}
                      </div>
                      <div class="text-xs text-gray-900 truncate">
                        {{ user && user.email ? user.email : '' }}
                      </div>
                      <span v-if="isUserSwitched" @click.stop="switchIntoMyAccount()" class="mt-4">
                        <small class="font-extrabold text-blue-600 cursor-pointer">{{ $t('common.topBar.switchToMyAccount') }}</small>
                      </span>
                    </div>
                  </div>
                </div>
                <hr class="dropdown-divider" />
                <hr v-if="isLoginAsEnabled" class="dropdown-divider" />
                <div
                  v-if="isLoginAsEnabled"
                  class="py-2 cursor-pointer dropdown-item"
                  style="position: relative"
                  @click.stop="toggleUserSwitcher()"
                  @keydown.enter.stop="toggleUserSwitcher()"
                  @keydown.escape.stop="closeUserSwitcher()"
                  :aria-expanded="isShowUserSwitcher"
                  aria-haspopup="true"
                  :aria-label="$t('common.topBar.loginAsAnotherUser')"
                  role="button"
                  tabindex="0"
                >
                  {{ $t('common.topBar.loginAs') }}
                  <span class="float-right"><i class="fas fa-chevron-right"></i></span>
                  <UserSwitcher v-if="isShowUserSwitcher" :showSwitcher="isShowUserSwitcher" @toggleSwicher="toggleUserSwitcher()" />
                </div>
                <hr class="dropdown-divider" />
                <a class="py-2 dropdown-item" href="javascript:void(0);" @click.stop="signout">{{ $t('common.topBar.signout') }}</a>
              </div>
            </div>
          </template>
        </div>
      </div>

      <UITopMenuItemsPreview
        v-if="previewTopMenuNav.name"
        :navigation="previewTopMenuNav"
        :location-id="currentLocationId"
      />
    </header>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '../_stubs/store';
import { agencyNavigation } from '../_stubs/navigation';
import type { V2RouteConfig } from '../_stubs/types';
import UITopMenuItemsPreview from './UITopMenuItemsPreview.vue';
import {
  NotificationBanner,
  I18nFeedback,
  DialerModalV2,
  ScreenRecorder,
  UserSwitcher,
  CopilotPrimaryIcon,
  TopBarWalletPill,
} from '../_stubs/topbar';

type PreviewUser = {
  name: string;
  email: string;
  type?: string;
  profilePhoto?: string;
  /** Initials circle wash — stubbed from store user.user.profileColor */
  profileColor?: string;
  initials?: string;
};

export default defineComponent({
  components: {
    UITopMenuItemsPreview,
    NotificationBanner,
    I18nFeedback,
    DialerModalV2,
    ScreenRecorder,
    UserSwitcher,
    CopilotPrimaryIcon,
    TopBarWalletPill,
  },
  props: {
    locationId: { type: String, default: '' },
    /** Sidebar meta for the current preview page — drives the top menu title row (spm-ts: menuTabs / active section). */
    active: { type: String, default: '' },
  },
  setup(props) {
    const store = useStore();
    const isShowUserSwitcher = ref(false);
    const user = computed<PreviewUser | null>(() => {
      const u = (store.state as any)?.user?.user;
      if (!u) return null;
      const initials =
        u.name
          ?.split(' ')
          .map((p: string) => p[0])
          .join('')
          .slice(0, 2)
          .toUpperCase() || 'U';
      return {
        ...u,
        initials,
        profileColor: (u.profileColor as string | undefined) ?? '#c4b5fd',
      };
    });

    const company = computed<any>(() => (store.getters as any)['company/get'] || {});
    const collapseSideBar = computed<boolean>(() => Boolean((store.getters as any).getManualCollapseSidebar));
    const currentLocationId = computed<string>(() => props.locationId || 'preview-location');

    const previewTopMenuNav = computed((): Partial<V2RouteConfig> => {
      if (!props.active) {
        return {};
      }
      const match = agencyNavigation.find(n => n.meta === props.active);
      return match ?? {};
    });

    const isUserTypeAgency = computed<boolean>(() => (user.value?.type || 'agency') === 'agency');
    const isCompanyCustomerTypeAgency = computed<boolean>(() => true);

    return {
      user,
      company,
      previewTopMenuNav,
      collapseSideBar,
      currentLocationId,
      isUserTypeAgency,
      isCompanyCustomerTypeAgency,
      getVersion: 'v1',
      isNonActiveLocation: false,
      disableAction: false,
      isUserSwitched: false,
      showNextLeadButton: false,
      hasUnreadNotifications: true,
      isDev: false,
      canUseScreenRecorder: false,
      isCopilotEnabled: true,
      isOnAskAiRoute: false,
      walletBalance: 0,
      isWalletPillVisible: false,
      isLoginAsEnabled: false,
      isShowUserSwitcher,
      switchIntoMyAccount: () => undefined,
      toggleNotification: () => undefined,
      toggleUserSwitcher: () => {
        isShowUserSwitcher.value = !isShowUserSwitcher.value;
      },
      closeUserSwitcher: () => {
        isShowUserSwitcher.value = false;
      },
      signout: () => undefined,
      trackHelpIconClick: () => undefined,
      trackCopilotIconClick: () => undefined,
      handleWalletPillClick: () => undefined,
    };
  },
});
</script>

<style scoped>
.hl_header {
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.04);
  position: relative;
  z-index: 10;
}

.hl_header .container-fluid {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  padding: 4px 16px;
}

/* Compact the topmenu-nav row beneath the controls strip — upstream uses
 * `pb-2 md:pb-3` + line-height: 1.6rem which together push the header
 * region to ~90px. Bumped specificity with `.hl_header` ancestor to win
 * against `.sidebar-v2-agency .hl_header .topmenu-nav ...`. */
:deep(.hl_header .topmenu-nav) {
  padding: 0 16px !important;
  align-items: center !important;
  min-height: 28px;
}

:deep(.hl_header .topmenu-nav .topmenu-navtitle) {
  padding: 4px 8px !important;
  margin: 0 !important;
  font-size: 0.9rem !important;
  line-height: 1.25rem !important;
}

:deep(.hl_header .topmenu-nav .topmenu-navitem) {
  padding: 4px 8px !important;
  line-height: 1.25rem !important;
}

.hl_header--picker {
  visibility: hidden;
  width: 0;
  margin: 0;
  padding: 0;
}

.hl_header--controls {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.hl_header--controls > * + * {
  margin-left: 8px;
}

.btn-circle {
  width: 30px;
  height: 30px;
  line-height: 30px;
  padding: 0;
  text-align: center;
  border-radius: 50px;
  min-width: auto;
  font-size: 0.85rem;
}

.btn.btn-primary {
  background-color: rgba(24, 139, 246, 0.1);
  border-color: rgba(24, 139, 246, 0.1);
  color: #188bf6;
}

.btn.btn-yellow {
  background-color: rgba(255, 188, 0, 0.1);
  border-color: rgba(255, 188, 0, 0.1);
  color: #ffbc00;
}

.preview-ask-ai-trigger {
  background: transparent !important;
  border: none;
  width: auto;
  min-width: auto;
  height: 28px;
  line-height: 28px;
  padding: 0;
}

/* Teal megaphone + red badge (design-preview parity). */
.preview-topbar-changelog {
  position: relative;
  background-color: #2dd4bf !important;
  border-color: #2dd4bf !important;
  color: #ffffff !important;
}

.preview-topbar-changelog::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 0 2px #ffffff;
}

/* Orange bell */
.preview-topbar-bell {
  background-color: #f97316 !important;
  border-color: #f97316 !important;
}

.preview-topbar-bell i {
  color: #ffffff !important;
}

.hl_header--recent-activities {
  position: relative;
}

.hl_header--recent-activities.-notification:before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  position: absolute;
  top: 2px;
  right: 2px;
  box-shadow: 0 0 0 2px #ffffff;
}

.hl_header--avatar {
  display: block;
  max-width: 30px;
  height: 30px;
}

.hl_header--dropdown .dropdown-menu {
  display: none;
}

.avatar {
  display: inline-flex;
  align-items: center;
  height: 30px;
  border-radius: 50%;
}

.avatar_img {
  min-width: 30px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.avatar_img > img {
  max-width: 30px;
  max-height: 30px;
  border-radius: 50%;
}

.avatar_img.--gray {
  background-color: #afb8bc;
}
</style>
