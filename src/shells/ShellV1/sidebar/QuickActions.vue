<!--
  Vendored from spm-ts/src/pmd/components/sidebar/QuickActions.vue.

  TEMPLATE: byte-identical to upstream. Do not edit class names, attribute
  order, whitespace, or the inline search-icon SVG path data — the SCSS
  rules in styles.sidebar.scss target these exact selectors.

  SCRIPT: only import paths swapped (each annotated below) and two type-only
  casts on `e.target` (vue-tsc rejects what upstream lets slide because they
  don't run vue-tsc). Setup body is otherwise byte-identical.

  Differences from upstream, all driven by "we don't have that module here":
    1. `@/models` → `../_stubs/models`
    2. `@/models/event-bus` → `../_stubs/event-bus`
    3. `'../../../localization'` → `../_stubs/i18n`
    4. `@/store` → `../_stubs/store`

  Behavioural caveats:
    - `v-tooltip` is unregistered (same as 2.1); the keyboard-shortcut pill
      still renders, only its hover tooltip is silent.
    - `QuickActionsList.vue` (the dropdown opened by the lightning-bolt
      button) is a placeholder — see that file's comment block for why
      and how to graduate it.
    - `hasSearchPermission` returns `true` for the agency-admin scope
      because `location.value` is `undefined` (no current location), so
      the permission-guarded inner block is skipped — same outcome as
      a fully permissioned agency-admin user.
-->
<template>
    <div
        class="flex mb-4 h-7"
        :class="{
            'flex-col items-center justify-center': collapseSideBar,
            'flex-row md:flex-col lg:flex-row xl:flex-row items-start justify-between px-2': !collapseSideBar,
        }"
    >
        <div
            id="globalSearchOpener"
            :class="{
                'flex': hasSearchPermission,
                'hidden': !hasSearchPermission,
                'sm:w-full md:w-full': !collapseSideBar,
                'px-2 mb-2': collapseSideBar
            }"
            :style="searchStyle"
            class="h-full py-0.5 flex-col justify-center items-start text-sm cursor-pointer relative"
            @click.prevent="showGlobalSearch()"
        >
            <div class="flex flex-row items-start justify-between w-full">
                <div class="flex flex-row items-center justify-start">
                    <svg role="img" :aria-label="$t('common.search_icon')" class="w-4 h-4 mx-1 search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                    <span class="search-placeholder" :class="{'hidden': collapseSideBar}">{{ $t('common.globalSearch.sidebarPlaceholder') }}</span>
                </div>
                <div
                    class="justify-start items-center py-0.5"
                    :class="{'hidden': collapseSideBar, 'flex flex-row': !collapseSideBar}"
                    v-tooltip.hover
                    :title="getTooltipTitle"
                >
                    <span class="px-1 mx-1 text-xs rounded-sm search-shortcut">{{ getShortcutSymbol }}{{ $t('pmd.k') }}</span>
                </div>
            </div>
        </div>
        <div
            id="quickActions"
            class="flex flex-row items-center justify-center h-full text-sm cursor-pointer"
            @click.prevent="showQuickActionSwitcher()"
            :class="{
                'md:mx-1 lg:mx-3 xl:mx-3 w-full': !collapseSideBar && !hasSearchPermission,
                'w-7 sm:w-10 md:w-10 lg:w-7 xl:w-7': !collapseSideBar && hasSearchPermission,
                'w-9': collapseSideBar,
            }"
        >
            <img
                class="w-3 h-3"
                src="@/assets/pmd/img/sidebar/icon-lightning-bolt.png"
                :alt="$t('common.quick_actions_icon')"
                :class="{
                    'opacity-100': collapseSideBar || hasSearchPermission,
                    'md:opacity-100 lg:opacity-70 xl:opacity-70 mr-1 md:mr-0 lg:mr-1 xl:mr-1': !collapseSideBar && !hasSearchPermission
                }"
            />
            <span
                class="text-xs font-medium tracking-wide text-white"
                :class="{'hidden': collapseSideBar || hasSearchPermission, 'md:hidden lg:block xl:block opacity-70': !collapseSideBar &&  !hasSearchPermission}"
            > {{ $t('common.quickActions.title') }} </span>
            <QuickActionsList
                class="cursor-default"
                :class="{'collapse-with-search': collapseSideBar && hasSearchPermission}"
                :showQuickActionsList="quickActionsList"
                :currentLocationId="currentLocationId"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'

// upstream: import { Location, User } from '@/models'
import { Location, User } from '../_stubs/models';
// upstream: import { EventBus } from '@/models/event-bus'
import { EventBus } from '../_stubs/event-bus';

// upstream: import { i18n } from '../../../localization'
import { i18n } from '../_stubs/i18n';
import QuickActionsList from './QuickActionsList.vue'
// upstream: import { useStore } from '@/store'
import { useStore } from '../_stubs/store';

export default defineComponent({
    components: {
        'QuickActionsList': QuickActionsList
    },
    props: {
        currentLocationId: {
            type: String,
        },
    },
    setup() {
        const store = useStore()
        const quickActionsList = ref(false)
        const user = computed((): User | undefined => {
            const user = store.state.user.user
            return user ? new User(user) : undefined
        })
        const location = computed((): Location | undefined => {
            const loc = store.state.locations.currentLocation
            return loc ? new Location(loc) : undefined
        })

        const showQuickActionSwitcher = () => {
            quickActionsList.value = !quickActionsList.value
            if (quickActionsList.value) EventBus.$emit('openOverlay')
            if (!quickActionsList.value) EventBus.$emit('closeOverlay')
        }

        const showGlobalSearch = () => {
            EventBus.$emit('openGlobalSearch')
        }

        const collapseSideBar = computed(() => {
            return store.getters.getManualCollapseSidebar
        })

        const getShortcutSymbol = computed (() => (window.navigator.platform.indexOf('Mac') !== -1) ? '⌘' : 'ctrl')

        const hasSearchPermission = computed(() => {
            let isAllow = true
            const requiredPermissions = ['contacts_enabled', 'opportunities_enabled', 'settings_enabled']
            if (location.value) {
                const locationPermission = location.value.permissions as any
                const locPermissions = requiredPermissions.filter((per: string) => locationPermission[per] !== false)
                if (!locPermissions.length) isAllow = false

                if (isAllow && user.value) {
                    const userPermission = user.value.permissions as any
                    const usPermission = requiredPermissions.filter((per: string) => userPermission[per] !== false )
                    if (!usPermission.length) isAllow = false
                }
            }
            return isAllow
        })

        const searchStyle = computed(() => (!collapseSideBar.value) ? 'width:10.9rem;': '')

        // `as string` keeps vue-tsc happy on i18n.global.t() return type;
        // upstream gets away with it because they don't run vue-tsc.
        const getTooltipTitle = computed(() => (window.navigator.platform.indexOf('Mac') !== -1) ? i18n.global.t("common.globalSearch.macOpenShortcut") as string : i18n.global.t("common.globalSearch.windowOpenShortcut") as string )

        const overlayHandlerOnClick = (e: Event) => {
            const quickActions = document.getElementById('quickActions')
            // `e.target as Node | null` — vue-tsc rejects passing
            // `EventTarget | null` to Element.contains(). LocationSwitcherContainer
            // upstream uses the same cast; QuickActions upstream omits it,
            // which compiles for them but not under our type-check.
            if (quickActions && !quickActions.contains(e.target as Node | null) && quickActionsList.value) {
                quickActionsList.value = false
                const locationSwitcher = document.getElementById('location-switcher-sidbar-v2')
                if (locationSwitcher && !locationSwitcher.contains(e.target as Node | null)) {
                    EventBus.$emit('closeOverlay')
                }
            }
        }
        const overlayHandlerOnBlur = () => {
            if (document.activeElement instanceof HTMLIFrameElement) {
                quickActionsList.value = false
                EventBus.$emit('closeOverlay')
            }
        }

        const handleClickOutside = (e: Event) => {
            const quickActions = document.getElementById('quickActions')
            // Same vue-tsc cast as overlayHandlerOnClick above.
            if (quickActions && !quickActions.contains(e.target as Node | null) && quickActionsList.value) {
                quickActionsList.value = false
                EventBus.$emit('closeOverlay')
            }
            if (quickActionsList.value) EventBus.$emit('openOverlay')
        }
        
        onMounted(() => {
            EventBus.$on('closeQuickActionsList', () => {
                quickActionsList.value = false
                EventBus.$emit('closeOverlay')
            })

            window.addEventListener('click', handleClickOutside)
            window.addEventListener('blur', overlayHandlerOnBlur)
        })

        onUnmounted(() => {
            EventBus.$off('closeQuickActionsList')
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('blur', overlayHandlerOnBlur)
        })

        return {
            quickActionsList,
            showQuickActionSwitcher,
            collapseSideBar,
            showGlobalSearch,
            getShortcutSymbol,
            user,
            hasSearchPermission,
            getTooltipTitle,
            searchStyle,
            overlayHandlerOnBlur,
            overlayHandlerOnClick
        }
    },
})
</script>
