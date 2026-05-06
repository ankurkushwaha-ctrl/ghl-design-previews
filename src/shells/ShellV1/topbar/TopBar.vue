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
          <div v-if="!isNonActiveLocation && !showNextLeadButton" id="CalendarsFeatureDiscovery" />
          <div v-if="!isNonActiveLocation && !showNextLeadButton" id="ContactsFeatureDiscovery" />
          <div v-if="!isNonActiveLocation && !showNextLeadButton" id="PaymentsFeatureDiscovery" />
          <div v-if="!isNonActiveLocation" id="whatsAppHeaderSlotShared" />
          <div
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
            class="btn btn-circle btn-primary hl_header--copy-link !w-auto"
            href="javascript:void(0);"
            style="background: #ffffff !important"
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
                class="btn btn-circle btn-changelog"
                id="canny_logs-toggle"
                role="button"
                :aria-label="$t('common.topBar.viewChangelog')"
                data-canny-changelog
                v-tooltip.hover.bottom
                :title="$t('common.topBar.viewChangelog')"
              >
                <i class="fa fa-bullhorn"></i>
                <span class="sr-only">{{ $t('common.topBar.viewChangelog') }}</span>
              </a>
            </div>

            <a
              href="javascript:void(0);"
              class="flex justify-center items-center btn btn-circle btn-yellow hl_header--recent-activities"
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
      <UITopMenuItems v-if="v2SideBarNavigation.name" :locationId="currentLocationId" :user="user || undefined" :navigation="v2SideBarNavigation" />
    </header>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '../_stubs/store';
import {
  NotificationBanner,
  I18nFeedback,
  DialerModalV2,
  ScreenRecorder,
  UserSwitcher,
  CopilotPrimaryIcon,
  TopBarWalletPill,
  UITopMenuItems,
} from '../_stubs/topbar';

type PreviewUser = {
  name: string;
  email: string;
  type?: string;
  profilePhoto?: string;
  profileColor?: string;
  initials?: string;
};

export default defineComponent({
  components: {
    NotificationBanner,
    I18nFeedback,
    DialerModalV2,
    ScreenRecorder,
    UserSwitcher,
    CopilotPrimaryIcon,
    TopBarWalletPill,
    UITopMenuItems,
  },
  props: {
    locationId: { type: String, default: '' },
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
        profileColor: '#0c2d3f',
      };
    });

    const company = computed<any>(() => (store.getters as any)['company/get'] || {});
    const collapseSideBar = computed<boolean>(() => Boolean((store.getters as any).getManualCollapseSidebar));
    const currentLocationId = computed<string>(() => props.locationId || '');

    const isUserTypeAgency = computed<boolean>(() => (user.value?.type || 'agency') === 'agency');
    const isCompanyCustomerTypeAgency = computed<boolean>(() => true);

    return {
      user,
      company,
      collapseSideBar,
      currentLocationId,
      isUserTypeAgency,
      isCompanyCustomerTypeAgency,
      v2SideBarNavigation: { name: 'preview-top-menu' },
      getVersion: 'v1',
      isNonActiveLocation: false,
      disableAction: false,
      isUserSwitched: false,
      showNextLeadButton: false,
      hasUnreadNotifications: false,
      isDev: false,
      canUseScreenRecorder: false,
      isCopilotEnabled: false,
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
.preview-top-menu-stub {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 8px 10px;
}

.preview-top-menu-stub__btn {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 0;
  line-height: 1;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.preview-top-menu-stub__btn--yellow {
  background: #f5a524;
}

.preview-top-menu-stub__btn--green {
  background: #22c55e;
}
</style>
