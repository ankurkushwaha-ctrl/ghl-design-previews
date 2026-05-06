<!--
  Preview-only top menu row — mirrors spm-ts UITopMenuItems.vue template shell
  (classes: topmenu-nav, topmenu-navtitle, topmenu-navitem) so the vendored
  .sidebar-v2-agency .hl_header SCSS applies.

  Upstream hides the entire row when there are zero visible children.
  For design previews we always show the section title when `navigation.name`
  is set so agency routes with empty `children` (e.g. Add-Ons) still match prod’s
  contextual header strip. Router-links are replaced with inert <a href="#">.
-->
<template>
  <div v-if="showRow" class="flex flex-row justify-start items-center topmenu-nav">
    <div class="topmenu-navtitle" role="heading" aria-level="1">
      {{ title }}
    </div>
    <template v-for="(nav, idx) in visibleChildren" :key="`${nav.meta}-${idx}`">
      <a
        v-if="nav.type !== 'divider'"
        :id="`tb_${nav.meta}_${idx}`"
        href="#"
        class="group text-left mx-1 pb-2 md:pb-3 text-sm font-medium topmenu-navitem cursor-pointer relative px-2"
        style="line-height: 1.6rem"
        @click.prevent
      >
        <span class="flex items-center">
          <img v-if="pickIconSrc(nav)" :src="pickIconSrc(nav)!" class="md:mr-2 h-5 w-5" alt="" />
          {{ childTitle(nav) }}
        </span>
      </a>
      <span v-else class="divider topmenu-navitem mx-1 pb-2 md:pb-3" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import type { V2RouteConfig } from '../_stubs/types';

export default defineComponent({
  name: 'UITopMenuItemsPreview',
  props: {
    navigation: {
      type: Object as PropType<Partial<V2RouteConfig>>,
      required: true,
    },
    locationId: { type: String, required: false, default: '' },
  },
  setup(props) {
    const { t } = useI18n();

    const title = computed(() => {
      const raw = props.navigation?.name;
      if (!raw) return '';
      return raw.includes('.') ? (t(raw) as string) : raw;
    });

    const visibleChildren = computed(() => (props.navigation?.children ?? []).filter(c => !c.hide));

    /* spm-ts only renders the topmenu-nav strip when there are sub-tabs;
     * for routes with just a title (Add-Ons) the page body's own h1 owns the
     * label, so we collapse the row to keep the header zone compact. */
    const showRow = computed(() => visibleChildren.value.length > 0);

    const childTitle = (nav: V2RouteConfig) => {
      if (!nav.name) return '';
      return nav.name.includes('.') ? (t(nav.name) as string) : nav.name;
    };

    const pickIconSrc = (nav: V2RouteConfig): string | undefined => {
      if (typeof nav.icon === 'string') return nav.icon;
      return undefined;
    };

    return {
      title,
      visibleChildren,
      showRow,
      childTitle,
      pickIconSrc,
    };
  },
});
</script>
