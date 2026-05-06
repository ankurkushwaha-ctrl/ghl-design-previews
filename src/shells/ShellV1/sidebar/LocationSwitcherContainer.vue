<!--
  Vendored from spm-ts/src/pmd/components/sidebar/LocationSwitcherContainer.vue.

  TEMPLATE: byte-identical to upstream. Do not modify class names, attribute
  order, or whitespace — the SCSS rules in styles.sidebar.scss target these
  exact selectors. Re-vendor the whole template if upstream's file diverges.

  SCRIPT: only the import paths are changed. Each modified line is annotated
  with the upstream import it replaces. Setup body is byte-identical.

  Differences from upstream, all driven by "we don't have that module here":
    1. `@/models/event-bus` → `../_stubs/event-bus`     (no-op handlers)
    2. `'../../../localization'` → `../_stubs/i18n`     (English-only dict)
    3. `@/store` → `../_stubs/store`                    (hardcoded shape)
    4. `@/models` → `../_stubs/models`                  (Location class shim)

  Behavioural caveats:
    - `v-tooltip` directive is not registered in this preview repo. Vue will
      log a warning and skip the directive at runtime; the visible pill is
      unaffected. Adding bootstrap-vue's tooltip is out of scope for this
      slice — flag if you need it.
    - `LocationSwitcher.vue` (the dropdown that opens on click) is rendered
      as a deliberate placeholder right now (see that file). The pill itself
      is the visible chrome stakeholders see; the dropdown is a follow-up.
-->
<template>
    <div
        id="location-switcher-sidbar-v2"
        class="flex flex-row items-center px-1 py-1 mb-3 text-sm text-white cursor-pointer"
        :class="{'md:justify-center lg:justify-between xl:justify-between md:mx-1 lg:mx-3 xl:mx-3': !collapseSideBar, 'mx-1 justify-center': collapseSideBar}"
        @click.prevent="showLocationSwitcher()"
    >
        <div
            class="flex flex-row items-center"
            :class="{'w-8': collapseSideBar, 'w-36': !collapseSideBar}"
            v-tooltip="{
            title: fullLocationName,
            placement: 'top',
            trigger: 'hover',
            boundary: 'viewport',
            variant: 'dark',
            disabled: locationId == undefined && !collapseSideBar,
            delay: {
                show: 300,
                hide: 100,
            },
            }"
        >
            <div class="flex items-center w-full text-xs leading-4">
                    <div v-if="locationCityState!=''">
                        <LocationMarkerIcon class="hl_location_icon scale-2"/>
                    </div>
                    <div v-else>
                        <AgencyMarkerIcon class="hl_location_icon scale-1"/>
                    </div>
                <div v-if="!collapseSideBar" class="hl_location-text">
                    <span v-if="locationName !== ''" class="justify-center font-medium hl_text-overflow hl_switcher-loc-name">{{ locationName }}</span>
                    <span v-else class="justify-center font-medium hl_text-overflow hl_switcher-loc-name">{{ $t('common.locationSwitcher.clickToSwitch') }}</span>
                    <span v-if="locationCityState!=''" class="justify-center hl_text-overflow hl_switcher-loc-city font-small">{{ locationCityState }}</span>
                </div>
            </div>
        </div>
        <div
            v-if="!collapseSideBar"
            class="flex flex-col items-center justify-center w-5 h-5 rounded-full switcher-caret-holder"
        >
            <i
            class="fas fa-angle-up"
            :class="{'opacity-100': collapseSideBar, 'opacity-70 md:opacity-100 lg:opacity-70 xl:opacity-70': !collapseSideBar}"
            ></i>
            <i class="fas fa-angle-down"
            :class="{'opacity-100': collapseSideBar, 'opacity-70 md:opacity-100 lg:opacity-70 xl:opacity-70': !collapseSideBar}"
            ></i>
        </div>
        <LocationSwitcher :showSwitcher="locationSwitcher" :currentLocationId="locationId"/>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, onMounted, onUnmounted } from 'vue'


import LocationSwitcher from './LocationSwitcher.vue';
// upstream: import { Location } from "@/models"
import { Location } from "../_stubs/models";
// upstream: import { EventBus } from '@/models/event-bus'
import { EventBus } from '../_stubs/event-bus';
import AgencyMarkerIcon from '@/assets/pmd/img/agency-marker.svg'
import LocationMarkerIcon from '@/assets/pmd/img/location-marker.svg'
// upstream: import { i18n } from '../../../localization'
import { i18n } from '../_stubs/i18n';
// upstream: import { useStore } from '@/store'
import { useStore } from '../_stubs/store';
export default defineComponent({
    components: {
        LocationSwitcher,
        AgencyMarkerIcon,
        LocationMarkerIcon
    },
    props: {
        locationId: {
            type: String,
        }
    },
    // Typed explicitly because we run `vue-tsc` (spm-ts doesn't, so their
    // implicit-any `setup(_)` slips through). Shape matches the `props`
    // block above 1:1; no behavioural change.
    setup(_: Readonly<{ locationId?: string }>) {
        const store = useStore()
        const locationSwitcher = ref(false)
        const company = computed(() => store.getters['company/get'])
        const location = computed((): Location | undefined => {
            const loc = store.state.locations.currentLocation
            return loc ? new Location(loc) : undefined
        })

        const fullLocationName = computed(() => {
            // `i18n.global.t()` is typed as `string | undefined` in newer
            // vue-i18n. Upstream gets away with assigning to a string-typed
            // local because they don't run vue-tsc. Cast keeps the runtime
            // identical.
            let name = i18n.global.t('common.locationSwitcher.clickToSwitch') as string;
            if (location.value && _.locationId) {
                const loc = location.value;
                name = loc.name as string;
                if (location.value.city || location.value.state) name += ' -- '
                if (location.value.city) name += location.value.city
                if (location.value.city && location.value.state) name += ', '
                if (location.value.state) name += location.value.state
            }
            return name;
        });

        const getLocationCityState = computed(() => {
            // Dead code in upstream (returned from setup but never read in
            // the template). Kept byte-verbatim except for the `!` non-null
            // assertions, since vue-tsc rightly flags `loc.city` when
            // `loc: Location | undefined`. Upstream has the same nullable
            // type but no type-check step to catch it.
            const loc = location.value;
            let cityState = '';
            cityState += loc!.city ? `${loc!.city}, ` : '';
            cityState += loc!.state ? loc!.state : '';
            return cityState;
        });


        const locationName = computed(() => {
            if(!_.locationId) return ''
            return location.value ? location.value.name : ''
        })

        const locationCityState = computed(() => {
            if(!_.locationId) return ''
            let cityState = '';

            if (location.value?.city || location.value?.state){
                    cityState += location.value.city ? `${location.value.city}` : '';
                    cityState += location.value.state ? `, ${location.value.state}` : '';
            }
            return cityState;
        })

        const showLocationSwitcher = () => {
            locationSwitcher.value = !locationSwitcher.value
            if (locationSwitcher.value) EventBus.$emit('openOverlay')
            if (!locationSwitcher.value) EventBus.$emit('closeOverlay')
        }

        const blurHandler = () => {
            if (document.activeElement instanceof HTMLIFrameElement) {
                locationSwitcher.value = false
                EventBus.$emit('closeOverlay')
            }
        }

        const clickHandler = (e: Event) => {
            const locationSwitcherElement = document.getElementById('location-switcher-sidbar-v2')
            const target = e.target as Node
            if (locationSwitcherElement && target && !locationSwitcherElement.contains(target) && locationSwitcher.value) {
                locationSwitcher.value = false
                const quickAction = document.getElementById('quickActions')
                if ((quickAction && target && !quickAction.contains(target)) || !quickAction) {
                    EventBus.$emit('closeOverlay')
                }
            }
        }

        onMounted(() => {
            EventBus.$on('closeLocationsDropdown', () => {
                locationSwitcher.value = false
                EventBus.$emit('closeOverlay')
            })
            window.addEventListener('click', clickHandler)
            window.addEventListener('blur', blurHandler)
        })

        onUnmounted(() => {
            EventBus.$off('closeLocationsDropdown')
            window.removeEventListener('click', clickHandler)
            window.removeEventListener('blur', blurHandler)
        })

        const collapseSideBar = computed(() => {
            return store.getters.getManualCollapseSidebar
        })

        return {
            company,
            locationSwitcher,
            showLocationSwitcher,
            collapseSideBar,
            location,
            locationName,
            locationCityState,
            fullLocationName,
            getLocationCityState,
            AgencyMarkerIcon,
            LocationMarkerIcon
        }
    },
})
</script>
