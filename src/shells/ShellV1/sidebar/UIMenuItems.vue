<!--
  UIMenuItems.vue — vendored from spm-ts/src/pmd/components/sidebar/UIMenuItems.vue

  Template:  byte-identical to upstream.
  Script:    trimmed for the preview. Upstream's setup() is ~1500 lines of
             permission checking, conditional route construction, custom
             menu link handling, and feature-flag toggles. None of that
             produces visible chrome differences for an agency-admin user
             on a static page — so the preview script exposes only the
             bindings the template reads, with sensible defaults that
             unconditionally render every nav item.

             When dev lifts back, replace setup() with the upstream version
             (or just import this template into the upstream component).
-->
<template>
  <div>
    <nav class="flex-1 w-full" :aria-label="navRole">
      <template v-for="(nav, index) in navigation" :key="nav.name + index">
        <router-link
          :key="index"
          :to="getRoute(nav)"
          :id="getUniqueId(nav.meta, 'sb', index)"
          :meta="nav.meta"
          v-tooltip="{
            // eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys
            title: $t(getTootTipText(nav)),
            placement: 'right',
            trigger: 'hover',
            boundary: 'viewport',
            disabled: disableTootltip,
            delay: {
              show: 300,
              hide: 100,
            },
          }"
          v-if="nav.type !== 'divider' && hasPermission(nav.permissions, nav, nav.userScopes)"
          custom
          v-slot="{ isActive, isExactActive, href }"
        >
          <a
            @click="changeRoute($event, nav)"
            @mouseover="handleMouseOver(nav)"
            @focusin="handleMouseOver(nav)"
            :href="href"
            :class="[
              'w-full group px-3 flex items-center justify-start lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer',
              {
                'font-medium opacity-70 hover:opacity-100 py-2 md:py-2': nav.type != 'divider',
                'text-gray-300 font-normal cursor-text divider': nav.type == 'divider',
                'custom-link': nav.linkId,
                'justify-center md:justify-center lg:justify-center xl:justify-center': collapseSideBar,
                [setActiveClass(nav.meta)]: true,
                active: isActive && !!nav.localRoute,
                'exact-active': isExactActive,
              },
            ]"
          >
            <span v-if="nav.icon && nav.icon.value" class="h-5 w-5" :class="{ 'mr-2': !collapseSideBar }">
              <i
                class="sm-button nav-fa-icon"
                :style="`--fa:'\\${nav.icon.value.unicode}';--ff:'${nav.icon.value.fontFamily}';font-size: 1rem;`"
              />
            </span>
            <span
              v-else-if="nav.icon && nav.icon.svg"
              class="h-5 w-5 text-gray-300 custom-svg"
              :class="{ 'mr-2': !collapseSideBar }"
              v-html="nav.icon.svg"
            ></span>
            <img
              v-else-if="defaultTheme == 'default' && nav.meta == 'launchpad'"
              src="@/assets/pmd/img/sidebar/icon-launchpad.png"
              class="md:mr-0 h-5 w-5 launchpad"
              :class="{
                'mr-0 md:mr-0 lg:mr-0 xl:mr-0': collapseSideBar,
                'mr-2 lg:mr-2 xl:mr-2': !collapseSideBar,
              }"
              :alt="$t('common.launchpad_icon')"
            />
            <!-- eslint-disable @intlify/vue-i18n/no-dynamic-keys -->
            <img
              v-else-if="nav.icon"
              :src="nav.icon"
              class="md:mr-0 h-5 w-5"
              :class="{
                'mr-0 md:mr-0 lg:mr-0 xl:mr-0': collapseSideBar,
                'mr-2 lg:mr-2 xl:mr-2': !collapseSideBar,
              }"
              :alt="$t(nav.name) + ' icon'"
            />
            <span
              v-if="nav.name && nav.type != 'divider'"
              class="hl_text-overflow sm:hidden md:hidden nav-title"
              :class="{ 'lg:block xl:block': !collapseSideBar, 'hl_force-block': !isMainMenu }"
            >
              {{ $t(nav.name) }}
            </span>
            <span
              v-if="isBadgeVisible(nav)"
              :class="{ 'lg:block xl:block': !collapseSideBar, 'hl_force-block': !isMainMenu }"
              class="hl_new_badge sm:hidden md:hidden"
            >
              {{ $t(nav.badge.title) }}
            </span>
            <!-- eslint-enable @intlify/vue-i18n/no-dynamic-keys -->
          </a>
        </router-link>
        <div
          :key="index"
          v-if="nav.type == 'divider'"
          class="w-full group px-3 flex items-center justify-start lg:justify-start xl:justify-start text-sm font-medium rounded-md"
          :class="{
            'text-gray-300 font-normal cursor-text divider': nav.type == 'divider',
            'custom-link': nav.linkId,
            'justify-center md:justify-center lg:justify-center xl:justify-center': collapseSideBar,
          }"
        >
          <p class="w-full text-left border-b border-solid my-3" style="line-height: 0.1em; font-size: 10px">
            <span v-if="nav.name" class="uppercase pr-3 default-bg-color">
              <!-- eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys -->
              {{ $t(nav.name) }}
            </span>
          </p>
        </div>
      </template>
      <template v-for="nav in customMenus" :key="nav.id">
        <a
          :key="nav.id"
          href="javascript:void(0)"
          :id="nav.id"
          :meta="nav.id"
          class="w-full group px-3 flex items-center justify-start md:justify-center lg:justify-start xl:justify-start text-sm rounded-md cursor-pointer custom-link font-medium opacity-70 hover:opacity-100 py-2 md:py-2"
          :class="{
            'justify-center md:justify-center lg:justify-center xl:justify-center': collapseSideBar,
            active: $route.params.id == nav.id,
          }"
          v-tooltip="{
            title: nav.meta && nav.tooltip && nav.meta.includes('.custom_objects') ? nav.tooltip : nav.title,
            placement: 'right',
            trigger: 'hover',
            boundary: 'viewport',
            disabled: disableTootltip,
            delay: {
              show: 300,
              hide: 100,
            },
          }"
          v-if="isMainMenu && hasCustomMenuPermission(nav)"
          @click="customMenuLinkClicked($event, nav)"
        >
          <!-- Heroicon name: outline/home -->
          <span class="h-5 w-5" :class="{ 'mr-2': !collapseSideBar }">
            <i :class="[getFontFamilyClass(nav.icon.fontFamily), `fa-${nav.icon.name}`]" :aria-label="nav.title + ' icon'"></i>
          </span>
          <span
            class="nav-title hl_text-overflow sm:hidden md:hidden"
            :class="{ 'lg:block xl:block': !collapseSideBar, 'hl_force-block': !isMainMenu }"
          >
            {{ nav.title }}
          </span>
        </a>
      </template>
      <template v-for="nav in customPages" :key="nav._id">
        <a
          :key="nav._id"
          href="javascript:void(0)"
          :id="nav._id"
          :meta="nav._id"
          class="w-full group px-3 flex items-center justify-start md:justify-center lg:justify-start xl:justify-start text-sm rounded-md cursor-pointer custom-link font-medium opacity-70 hover:opacity-100 py-2 md:py-2"
          :class="{
            'justify-center md:justify-center lg:justify-center xl:justify-center': collapseSideBar,
            active: $route.params.id === nav.customPages[0]._id,
          }"
          v-if="isMainMenu"
          @click="customPagesClicked($event, nav)"
        >
          <!-- Heroicon name: outline/home -->
          <span class="h-5 w-5" :class="{ 'mr-2': !collapseSideBar }">
            <i
              class="sm-button nav-fa-icon"
              :aria-label="nav.customPages[0].title + ' icon'"
              :style="`--fa:'\\${nav.customPages[0].icon.value.unicode}';--ff:'${nav.customPages[0].icon.value.fontFamily}';font-size: 1rem;`"
            />
          </span>
          <span
            class="nav-title hl_text-overflow sm:hidden md:hidden"
            :class="{ 'lg:block xl:block': !collapseSideBar, 'hl_force-block': !isMainMenu }"
          >
            {{ nav.customPages[0].title }}
          </span>
        </a>
      </template>
    </nav>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import type { V2RouteConfig } from '../_stubs/types';

  export default defineComponent({
    props: {
      locationId: { type: String },
      navigation: { type: Array as PropType<V2RouteConfig[]>, required: true },
      collapseSideBar: { type: Boolean, required: true },
      isMainMenu: { type: Boolean, required: true },
      // `any[]` matches upstream's loose typing — these arrays carry
      // custom-menu and custom-page records whose shapes aren't worth
      // enumerating for a static preview.
      customMenus: { type: Array as PropType<any[]>, default: () => [] },
      customPages: { type: Array as PropType<any[]>, default: () => [] },
      navRole: { type: String, default: '' },
      active: { type: String, default: '' },
    },
    setup(props) {
      const router = useRouter();
      const route = useRoute();

      const defaultTheme = (typeof document !== 'undefined' && document.body.dataset.theme) || 'default-dark-v1';
      const disableTootltip = false;

      // For the preview every nav item renders unconditionally — upstream's
      // gating layers (location permissions + user scopes + feature flags +
      // SaaS plan checks) all resolve to "allow" for an agency-admin and
      // produce the same visible chrome.
      const hasPermission = (
        _perms: V2RouteConfig['permissions'],
        _nav: V2RouteConfig,
        _scopes: V2RouteConfig['userScopes']
      ): boolean => true;

      const hasCustomMenuPermission = (_nav: unknown): boolean => true;

      // Upstream resolves the nav item's upstream route name to a full route
      // object. For the preview we use nav.localRoute (a field we added to
      // navigation.ts stubs) when it exists, and fall back to /coming-soon
      // for items that don't yet have a preview page.
      const getRoute = (nav: V2RouteConfig) =>
        nav.localRoute ? { path: nav.localRoute } : { path: '/coming-soon' };

      const getUniqueId = (meta: string, prefix: string, index?: number): string =>
        typeof index === 'number' ? `${prefix}-${meta}-${index}` : `${prefix}-${meta}`;

      // Upstream looks up nav.tooltip with fallback chain to nav.name. Same
      // here, minus the i18n-key normalization upstream does.
      const getTootTipText = (nav: V2RouteConfig): string => nav.tooltip || nav.name || '';

      // Active state mirrors upstream: primary source is the current router
      // path matched against nav.localRoute; the `active` prop acts as a
      // legacy fallback so pages that still pass `active="…"` keep working.
      const setActiveClass = (meta: string): string => {
        // Find the nav item's local path by scanning the navigation array
        // passed as a prop — avoids importing the stub array here.
        const navItem = props.navigation.find(n => n.meta === meta);
        if (navItem?.localRoute && route.path === navItem.localRoute) return 'active';
        if (props.active && props.active === meta) return 'active';
        return '';
      };

      // Upstream calls router.push() inside changeRoute (mirroring what
      // router-link would do). We do the same; prevent the browser's default
      // anchor navigation first (the href is from router-link's resolved
      // href, but we want the SPA push, not a full reload).
      const changeRoute = (e: MouseEvent, nav: V2RouteConfig) => {
        e.preventDefault();
        router.push(getRoute(nav));
      };

      const handleMouseOver = (_nav: V2RouteConfig) => {
        // Upstream prefetches submenu data.
      };

      const isBadgeVisible = (nav: V2RouteConfig): boolean => Boolean(nav.badge?.enable);

      const customMenuLinkClicked = (e: MouseEvent, _nav: unknown) => {
        e.preventDefault();
      };

      const customPagesClicked = (e: MouseEvent, _nav: unknown) => {
        e.preventDefault();
      };

      const getFontFamilyClass = (family?: string): string => family || 'fas';

      return {
        defaultTheme,
        disableTootltip,
        hasPermission,
        hasCustomMenuPermission,
        getRoute,
        getUniqueId,
        getTootTipText,
        setActiveClass,
        changeRoute,
        handleMouseOver,
        isBadgeVisible,
        customMenuLinkClicked,
        customPagesClicked,
        getFontFamilyClass,
      };
    },
  });
</script>
