<!--
  DEFERRED-BY-DESIGN PLACEHOLDER for the location dropdown.

  Upstream source: spm-ts/src/pmd/components/sidebar/LocationSwitcher.vue
  (471 lines, plus SwitcherItem.vue which is 285 lines).

  Why it's a placeholder, not a full vendor:
    - The visible chrome stakeholders see is the LOCATION PILL (rendered by
      LocationSwitcherContainer.vue), not the dropdown the pill opens.
    - The dropdown pulls in `UISearchInput`, `vue3-virtual-scroll-list`,
      `LocationsService`, `UsersService`, `lodash-es/cloneDeep`,
      `moon-loader`, recently-viewed localStorage state, and 5+ store
      dispatches — none of which exist in this preview repo.
    - Vendoring it fully would be ~3-4 hours of surgical stubbing for a
      surface that only renders after a click. Scoped out of slice 2.1 the
      same way the V1 legacy stylesheets were scoped out of phase 1b.

  When to graduate this placeholder to a full vendor:
    - A stakeholder review specifically requires showing what locations
      look like in the dropdown (e.g. testing a multi-location switcher
      flow), or
    - A page being previewed expects the dropdown to be open by default.

  How to graduate it:
    - Vendor LocationSwitcher.vue + SwitcherItem.vue from upstream verbatim.
    - Stub `UISearchInput` as a thin <input>, `VirtualList` as a v-for, and
      `LocationsService.search` to return ~5 hardcoded locations.
    - The container's `<LocationSwitcher>` mount point already passes
      `showSwitcher` and `currentLocationId` props (matching upstream), so
      no rewiring is needed once this file is replaced.

  Props match upstream so the parent's <LocationSwitcher :showSwitcher .../>
  invocation works without changes.
-->
<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <div
      v-if="showSwitcher"
      @click.stop=""
      class="hl_v2-location_switcher hl_v2-location_switcher--placeholder"
    >
      <div class="hl_v2_tip-arrow"></div>
      <div class="hl_v2-location_switcher__notice">
        <p class="hl_v2-location_switcher__title">Location dropdown — placeholder</p>
        <p class="hl_v2-location_switcher__body">
          The full dropdown (search, recents, virtual list, pinning) is
          deferred. See this file's comment block for how to graduate it
          to a real vendor.
        </p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LocationSwitcher',
  props: {
    // Same as upstream — required so the parent's prop binding stays
    // byte-identical.
    showSwitcher: {
      type: Boolean,
      required: true,
    },
    currentLocationId: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped>
.hl_v2-location_switcher--placeholder {
  /* Loud-on-purpose so it's obvious this isn't the real dropdown. */
  border: 2px dashed #ff6600;
  background: #0c2d3f;
  color: #ffffff;
  border-radius: 6px;
  padding: 12px 14px;
  margin: 8px;
  max-width: 280px;
  font-family: var(--hr-font-family-base, system-ui, sans-serif);
}

.hl_v2-location_switcher__title {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 600;
  color: #ff9900;
}

.hl_v2-location_switcher__body {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: #c8d3da;
}
</style>
