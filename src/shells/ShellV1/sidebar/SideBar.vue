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
          <svg
            class="agency-logo"
            v-else-if="company"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            style="max-width: 80%; height: 40px"
          >
            <image
              width="40"
              height="40"
              :alt="$t('common.agency_logo')"
              xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAADeCAMAAAAjD+0vAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACKFBMVEUAAAD/vAD/vAD/vAA3yjc3yjc3yjf/vAD/vAA3yjc3yjf/vAD/vAD/vAA3yjc3yjf/vAD/vAD+uwH5twT/vAD/vAA3yjc3yjc3yjc2yDY1xjU3yjf/vADjqAs3yjc0uDQYi/YYi/b6uAI2xjb/vAA3yjcYi/YYi/YYi/YYi/bUsy0xvlrzug0Yi/YXgOgWddo1x0EYi/YWddkXd9z/vAA3yjfzrg/xrBEquycpuiX8uQPupxbqoxszxTIktB8isRz9ugLvqRQ0xzMltSH+uwHwqxI1yDUmtiL/vAHyrRA2yTUouCT0sA02yjYpuib2sgvqpBorvCj4tAnrpBouvyv5tgfrpRkvwS0jsh77twXsphgxwzAjsx7tpxczxTHvqRU0xjMltCDwqhM1yDT/uwDxrRE2yDUouCP0rw42yTYpuSX2sQz3tAotvir5tQcvwC0jsh3spRkxwy8yxDEjtB/uqBU0xjIltSD+ugI1xzQmtiEntyMouSX1sQz3swotvin5tQjrpBkuwCz6tgYwwi/7uAXtphcyxDD9uQPuqBYYi/YzxjLxrBImtyIVc9wVctsXg+4Xhe8VdN0Xh/EVdd4XiPMVduAXifQVeOEYivUWeuMYivYWfOUWfugXgOsXguwXhO8YhvEYiPIYifMWeOEVeeMWe+UWfecWf+oXhO4VdNwXhvAYh/IVdd8Wd+EYifQWeOIWeuQYi/UWf+kXgewXhfAVdN7///8CcMFSAAAANHRSTlMAHM03N80c3PHx3C/rLS3rfKC/zYsGBougy8B8UH5wWTfxclJwUDXrLe+JiXYQ5+124Ozq9vT/awAAAAFiS0dEt90AO2cAAAAHdElNRQfiAhgXEywya6S9AAAFmUlEQVR42u3a53cWRRTAYVDsil1RURMbsQvOAKJikAh2URQBY6FqrNjBrmAbNSJENMaOimKvf58vSQhv2d1p9969w9zf971znrN75twPO2lSQJMPODDkMaymHHQw1VGTD1GHMrJPOUwfTmRvyBUje0Ouieyjcj72UTmNfVzOxT4up7BPyHnYJ+T49iY5B3uTHNveIq/f3iLHtbfJ67a3yTHtHfJ67R1yPHuBvE57gRzLXiivz14ox7GXyOuyl8gx7KXyeuylcnh7hbwOe4Uc2l4pp7dXymHtFnnDfgQjOaTdKlfqyKMYyeHsDnJK+1S7HMruJKezTz3aQQ5jd5RT2R3lEHZnOY3dWR5v95BT2D3ksXYvOb7dSx5n95Rj2z3lMXZvOa7dWx5uD5Bj2gPkofYgOZ49SB5mD5Rj2QPlIfZgOY49WO5vj5Bj2CPkvvYoObw9Su5nj5RD2yPlPvZoOaw9Wu5uB5BD2gHkrnYQOZwdRO5mB5JD2YHkLnYwOYwdTG63A8oh7IBymx1UHm8HlVfbgeWxdmB5lR1cHmcHl5fbEeQxdgR5mR1FHm5HkRfbkeShdiR5kR1NHmZHk3faEeUhdkR5ux1V7m9HlbfakeW+dmR5sx1d7mdHl++zE8h97ATyvXYSubudRD5mJ5K72onko/ZjjrV23Ow51o63jznhRLv8pJOnWTtl7hXWTrWPOc3lTUyfd+VVtk53v8ZiO+Pq+dfYOhPorOmqdwEnur52IR1d9V3Hia4XLaajq+tv4ETXN95ER1fqZk50fcuthHR12xJGdK1vJ6SrO5Zyous7CenqrmWc6Pru5XR0tWIlJ7q+p5+Orubdy4mu75tPR1e993Oi6wdW0dFV32pOdL1mMR1drV3Hia7XP0hHV+ohTnQ98DAhXT3CiV643KDR1aNLOdH1Y4R09fgyTnT9xAY6ulrxJCe6fqqfjt6+3NRM108/Q0dXvc9youvnnqejq42rOdH1phfo6GrtHE50vf5FOrpSsznR9cBLhHT1Mie61nMJ6eqVJZzo+lVCunrtdU50/cYGOrravDKY3tUFTtdbltPR1ZtvBdK7urtD7NV0/XY/HV29824QvavbmBC7ha7fW0VHVxsXBND3yIPsNrpetJCOrvre96aPyUPsVrpe9AEdXamzAuUBdjtdD5xNSD8nVO5vd6Drc9nSm+Xe9qTprXJfe8r0drmnPWF6p9zPni69SO5lT5ZeLPexp0ovk3vYE6WXy93tadKr5M72JOnV8ob9vP2VbpMbM6Nn/6Tb5W729Ogclid7cnQ3uYs9Nbqr3MGeGL3nfFe53Z4WvWeGu9xqT4ruJ7fZU6L7yi32hOj+8mp7OvQQeaU9GXqYvMqeCj1UXmFPhB4uL7enQY+Rl9qToMfJy+wp0GPlJfYE6PHyYjt/OoS80M6eDiMvsnOnQ8kL7MzpcPJOO286pLzDzpoOK2+3c6ZDy9vsjOnw8lY7XzqGvMXOlo4jb7ZzpWPJm+xM6XjyfXaedEz5hJ0lHVe+186Rji0ftzOk48vH7PzoFPJROzs6jXyPnRv9AiJ5w34hM/pFF9u7ZPBDW5c6jLmMGd3lD6qZW632WQ5juH3wTnTz0bZs6Wb7ULZ08/GObOnmk0+zpZvhz7Klm5HPs6WbkS+ypRvzZb5089VgtnTz9bZs6eaboWzp5tsd2dLNzu+ypZvh77Olm5EfsqWbkV3Z0o35MV9623KTFd38tDtbuvl5KFu6+eXXbOlm52/Z0s3vf2RLN8N/Zks3f+3Klm7M3/nSzT+D2dLN1t3Z0s2//2VLN9svz5ZuZgpd6EIXutCFLnShC13oQhe60IUudKELXehCF7rQhS50oQtd6EIXutCFLnShC13oQhe60IUudKELXehCF7rQhS50oQtd6EIXutDzov8PkVLtBMKmRJ4AAAAASUVORK5CYII="
            ></image>
          </svg>
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
    };
  },
});
</script>

<style lang="scss"></style>
