<!--
  DEFERRED-BY-DESIGN PLACEHOLDER for the quick-actions dropdown.

  Upstream source: spm-ts/src/pmd/components/sidebar/QuickActionsList.vue
  (408 lines).

  Why it's a placeholder:
    - The visible chrome stakeholders see is the SEARCH BAR + LIGHTNING-BOLT
      BUTTON (rendered by QuickActions.vue), not the dropdown.
    - The dropdown pulls in 6 external SVG quick-action icons, the
      `quick_actions` config from `@/util/quick_actions`, the `Company`
      and `OAuth2` models, a `getLocation` utility, location-route
      constants, the AppointmentType enum, and `DEFAULT_PERMISSIONS` —
      all of which need either vendoring or stubbing.

  How to graduate it:
    - Vendor QuickActionsList.vue from upstream verbatim.
    - Vendor the 6 quick-action SVG icons from
      `spm-ts/src/assets/pmd/img/quick-actions/`.
    - Stub `quickActionsList` config from `@/util/quick_actions` with the
      hardcoded set of agency-admin actions visible in prod.
    - Stub the permission gate (`hasPermission`) to always allow.
    - The parent's `<QuickActionsList :showQuickActionsList .../>` call
      stays unchanged once this file is replaced.

  Props match upstream so the parent's binding stays byte-identical.
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
      v-if="showQuickActionsList"
      @click.stop=""
      class="hl_v2-quick-actions-list hl_v2-quick-actions-list--placeholder"
    >
      <div class="hl_v2_tip-arrow"></div>
      <div class="hl_v2-quick-actions-list__notice">
        <p class="hl_v2-quick-actions-list__title">Quick actions dropdown — placeholder</p>
        <p class="hl_v2-quick-actions-list__body">
          The full list (Add contact, Add opportunity, Send review, etc.)
          is deferred. See this file's comment block for how to graduate
          it to a real vendor.
        </p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuickActionsList',
  props: {
    // Same shape as upstream so the parent's prop binding is byte-identical.
    showQuickActionsList: {
      type: Boolean,
      required: true,
    },
    // NOTE: upstream declares this `required: true`, but the parent
    // (QuickActions.vue) types it as `string | undefined`. Upstream
    // gets away with the contract violation because they don't run
    // vue-tsc. We relax it to optional here — when this placeholder is
    // graduated to a full vendor, restore `required: true` to match
    // upstream and either fix the parent (probably the right answer)
    // or add an annotated cast at the binding site.
    currentLocationId: {
      type: String,
      required: false,
    },
  },
});
</script>

<style scoped>
.hl_v2-quick-actions-list--placeholder {
  /* Same loud orange-on-navy treatment as LocationSwitcher placeholder so
     it's obvious at a glance that this is a deferred surface. */
  border: 2px dashed #ff6600;
  background: #0c2d3f;
  color: #ffffff;
  border-radius: 6px;
  padding: 12px 14px;
  margin: 8px;
  max-width: 280px;
  font-family: var(--hr-font-family-base, system-ui, sans-serif);
  position: absolute;
  z-index: 100;
}

.hl_v2-quick-actions-list__title {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 600;
  color: #ff9900;
}

.hl_v2-quick-actions-list__body {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: #c8d3da;
}
</style>
