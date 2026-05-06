<template>
  <aside
    id="sidebar-v2"
    class="relative default-bg-color transition-width transition-slowest ease"
    :class="[collapseSideBar ? 'w-14' : 'w-56', menuTitle ? 'hl_fixed-width' : '', increaseZIndex ? 'z-50' : '']"
  >
    <div id="BookAppointment" class="absolute"></div>

    <div v-if="!menuTitle" class="absolute z-50 sm:hidden lg:block xl:block -right-2 bottom-5">
      <button
        type="button"
        class="flex items-center justify-center ml-1 text-xl rounded-full"
        @click="collapse"
        :aria-label="collapseSideBar ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <i v-if="!collapseSideBar" class="rounded-full hl_collapse-button fas fa-chevron-circle-left"></i>
        <i v-if="collapseSideBar" class="rounded-full hl_collapse-button fas fa-chevron-circle-right"></i>
      </button>
    </div>

    <div class="relative flex flex-col h-screen" :class="[collapseSideBar ? 'w-14' : 'w-56']">
      <div class="flex flex-col flex-grow h-screen pt-3 pb-2 overflow-hidden lead-connector">
        <div class="flex items-center justify-center flex-shrink-0 mb-3 md:px-1 agency-logo-container" :class="{ 'px-3': !collapseSideBar }">
          <img
            v-if="company && company.logo_url"
            :src="company.logo_url"
            class="object-contain agency-logo"
            style="max-width: 80%; height: 40px"
            :alt="$t('common.agency_logo')"
          />
          <img
            v-else-if="company"
            :src="hlLogo"
            class="object-contain agency-logo"
            style="max-width: 80%; height: 40px"
            :alt="$t('common.agency_logo')"
          />
        </div>

        <LocationSwitcherContainer :locationId="locationId" />
        <QuickActions v-if="isQuickActionEnable && !isSuspendedLocation && !isRestrictedLocation" :currentLocationId="locationId" />

        <UIMenuItems
          v-if="headerMenuItems.length && !isSuspendedLocation && !isRestrictedLocation"
          :navigation="headerMenuItems"
          :collapseSideBar="collapseSideBar"
          :locationId="locationId"
          :isMainMenu="!menuTitle"
          :customMenus="[]"
          :customPages="[]"
          :active="active"
          navRole="header"
          class="flex flex-col w-full overflow-x-hidden overflow-y-auto"
          :class="{ 'hl_nav-header': !menuTitle, 'hl_nav-header-without-footer': menuTitle }"
        />

        <UIMenuItems
          v-if="footerMenuItems.length && !isSuspendedLocation && !isRestrictedLocation"
          :navigation="footerMenuItems"
          :collapseSideBar="collapseSideBar"
          :locationId="locationId"
          :isMainMenu="!menuTitle"
          :active="active"
          class="flex flex-col absolute bottom-3.5 w-full hl_nav-settings"
          navRole="footer"
        />
      </div>
    </div>

    <SendReviewRequestModal :isModalOpen="showSendReviewModal" :handleModalClose="() => (showSendReviewModal = false)" />

    <EditAppointmentModal @hidden="doneEditing" :values="modalData" :isFromAppointmentsPage="true" />

    <AddRecordForm objectKey="contact" v-if="showContactDialog" :show="showContactDialog" :closeCallBack="(created: unknown) => hideEditWindow(created)" />

    <OpportunitiesModal :show="showOpportunitiesModal" :contactId="contactId" :close="onOpportunityModalClose" :opportunityId="opportunityId" />

    <GlobalSearch
      v-if="locationId"
      :locationId="locationId"
      v-model:modalShow="globalSearchShow"
      :filter="'contact'"
      @close="globalSearchShow = false"
    />
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { agencyNavigation } from '../_stubs/navigation';
import type { V2RouteConfig } from '../_stubs/types';
import { useStore } from '../_stubs/store';
import { SendReviewRequestModal, EditAppointmentModal, AddRecordForm, OpportunitiesModal, GlobalSearch } from '../_stubs/modals';
import LocationSwitcherContainer from './LocationSwitcherContainer.vue';
import QuickActions from './QuickActions.vue';
import UIMenuItems from './UIMenuItems.vue';
import hlLogo from '@/assets/pmd/img/hl-logo.svg?url';

export default defineComponent({
  components: {
    UIMenuItems,
    LocationSwitcherContainer,
    QuickActions,
    SendReviewRequestModal,
    EditAppointmentModal,
    AddRecordForm,
    OpportunitiesModal,
    GlobalSearch,
  },
  props: {
    locationId: { type: String },
    active: { type: String, default: '' },
  },
  setup() {
    const store = useStore();
    const menuTitle = ref('');
    const increaseZIndex = ref(false);
    const showSendReviewModal = ref(false);
    const showContactDialog = ref(false);
    const showOpportunitiesModal = ref(false);
    const globalSearchShow = ref(false);
    const modalData = ref({});
    const contactId = ref('');
    const opportunityId = ref('');

    const company = computed<any>(() => store.getters['company/get']);
    const collapseSideBar = computed(() => store.getters.getManualCollapseSidebar);

    const headerMenuItems = computed(() => agencyNavigation.filter(nav => nav.type === 'header' || nav.type === 'divider') as V2RouteConfig[]);
    const footerMenuItems = computed(() => agencyNavigation.filter(nav => nav.type === 'footer') as V2RouteConfig[]);

    // Upstream enables quick actions only at location level.
    const isQuickActionEnable = computed(() => Boolean(false));
    const isSuspendedLocation = computed(() => false);
    const isRestrictedLocation = computed(() => false);

    const collapse = () => {
      store.commit('setManualCollapseSidebar', !collapseSideBar.value);
    };

    const doneEditing = () => {
      modalData.value = {};
    };
    const hideEditWindow = (_created?: unknown) => {
      showContactDialog.value = false;
    };
    const onOpportunityModalClose = () => {
      showOpportunitiesModal.value = false;
      opportunityId.value = '';
    };

    return {
      company,
      collapse,
      collapseSideBar,
      menuTitle,
      increaseZIndex,
      headerMenuItems,
      footerMenuItems,
      isQuickActionEnable,
      isSuspendedLocation,
      isRestrictedLocation,
      showSendReviewModal,
      doneEditing,
      modalData,
      showContactDialog,
      hideEditWindow,
      showOpportunitiesModal,
      onOpportunityModalClose,
      contactId,
      opportunityId,
      globalSearchShow,
      hlLogo,
    };
  },
});
</script>

<style scoped lang="scss">
/* Prevent default GHL logo SVG from clipping against overflow:hidden ancestors */
.agency-logo-container {
  overflow: visible;
  min-height: 44px;
}

/* Screenshot parity: dark-nav tone layer for preview shell.
   We intentionally scope to sidebar only to avoid touching page content colors. */
/* HighRise Figma tokens — Primary Navigation Toolbar (node 28471:118378).
 * gray-900 = sidebar surface, gray-700 = location pill, gray-800 = active row,
 * gray-300 = idle nav text/icon, white = active nav text. */
#sidebar-v2.default-bg-color {
  background: #101828 !important;
}

:deep(#location-switcher-sidbar-v2) {
  background: #344054 !important;
  border-radius: 8px;
  box-shadow: none;
}

:deep(.hl_switcher-loc-name),
:deep(.hl_switcher-loc-city),
:deep(.switcher-caret-holder i) {
  color: #ffffff;
}

:deep(.hl_nav-header nav a),
:deep(.hl_nav-settings nav a) {
  color: #d0d5dd;
  opacity: 1;
  border-radius: 8px;
}

:deep(.hl_nav-header nav a .nav-title),
:deep(.hl_nav-settings nav a .nav-title),
:deep(.hl_nav-header nav a .nav-fa-icon),
:deep(.hl_nav-settings nav a .nav-fa-icon) {
  color: #d0d5dd;
}

:deep(.hl_nav-header nav a.active),
:deep(.hl_nav-settings nav a.active) {
  background: #1d2939;
  color: #ffffff;
}

:deep(.hl_nav-header nav a.active .nav-title),
:deep(.hl_nav-settings nav a.active .nav-title),
:deep(.hl_nav-header nav a.active .nav-fa-icon),
:deep(.hl_nav-settings nav a.active .nav-fa-icon) {
  color: #ffffff;
}

/* Footer row sits on the same gray-900 surface. */
:deep(.hl_nav-settings) {
  background: transparent !important;
}
</style>
