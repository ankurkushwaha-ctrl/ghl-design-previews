<script lang="ts" setup>
  /*
   * ShellV1 Sidebar — visual port of:
   *   spm-ts/src/pmd/components/sidebar/SideBar.vue
   *   spm-ts/src/pmd/components/sidebar/LocationSwitcherContainer.vue
   *   spm-ts/src/pmd/components/sidebar/QuickActions.vue
   *
   * Visual fidelity to a SaaS-configurator agency sidebar (matches the
   * reference screenshot stakeholders are comparing against). Behavior
   * is intentionally stubbed — no dropdowns, no routing.
   *
   * Diffs from prod that are intentional:
   *   - Logo is a flat agency monogram tile, not the company.logo_url
   *     image / base64 SVG fallback prod loads from Vuex.
   *   - Location switcher renders the "no location selected" state
   *     ("Click here to switch") so previews don't depend on a real
   *     locationId. Click does nothing.
   *   - QuickActions search bar is hidden (prod hides it too when the
   *     signed-in user has no `hasSearchPermission`, which is the most
   *     common state for the agency-side pages we preview).
   *   - Nav items are a flat hard-coded list approximating what prod
   *     renders for a SaaS-Configurator-enabled agency. Override via
   *     headerNav / footerNav props if a preview needs a different IA.
   */
  import { ref, computed } from 'vue';

  interface NavItem {
    key: string;
    /** Font Awesome 5 class fragment, e.g. 'tachometer-alt'. */
    icon: string;
    label: string;
    /** Optional small "New" pill rendered to the right of the label. */
    badge?: 'new';
  }

  interface Props {
    /** Hard-coded active nav key, e.g. 'addons'. */
    activeKey?: string;
    /** Override the default agency-side nav set. */
    headerNav?: NavItem[];
    /** Override the footer nav (Settings et al). */
    footerNav?: NavItem[];
    /** Initial collapsed state. */
    collapsed?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    activeKey: '',
    collapsed: false,
    // Order matches the reference screenshot of a Test Agency on
    // localhost:8080/marketplace. Don't change ordering casually —
    // stakeholders compare side-by-side with prod.
    headerNav: () => [
      { key: 'ask-ai',          icon: 'magic',                 label: 'Ask AI'            },
      { key: 'dashboard',       icon: 'tachometer-alt',        label: 'Agency Dashboard'  },
      { key: 'saas-configurator', icon: 'sliders-h',           label: 'SaaS Configurator' },
      { key: 'ai-usage',        icon: 'chart-pie',             label: 'AI Usage'          },
      { key: 'prospecting',     icon: 'bullseye',              label: 'Prospecting'       },
      { key: 'sub-accounts',    icon: 'users',                 label: 'Sub-Accounts'      },
      { key: 'snapshots',       icon: 'camera-retro',          label: 'Account Snapshots' },
      { key: 'reselling',       icon: 'tag',                   label: 'Reselling'         },
      { key: 'addons',          icon: 'cubes',                 label: 'Add-Ons'           },
      { key: 'affiliate',       icon: 'handshake',             label: 'Affiliate Portal'  },
      { key: 'templates',       icon: 'folder-open',           label: 'Template Library' },
      { key: 'partners',        icon: 'user-friends',          label: 'Partners'          },
      { key: 'university',      icon: 'graduation-cap',        label: 'University'        },
      { key: 'saas-education',  icon: 'chalkboard-teacher',    label: 'SaaS Education'    },
      { key: 'swag',            icon: 'gift',                  label: 'GHL Swag'          },
      { key: 'ideas',           icon: 'lightbulb',             label: 'Ideas'             },
      { key: 'mobile-app',      icon: 'mobile-alt',            label: 'Mobile App',  badge: 'new' },
      { key: 'desktop-app',     icon: 'desktop',               label: 'Desktop App', badge: 'new' },
      { key: 'app-marketplace', icon: 'th',                    label: 'App Marketplace'   },
    ],
    footerNav: () => [
      { key: 'settings', icon: 'cog', label: 'Settings' },
    ],
  });

  const collapsed = ref(props.collapsed);
  const toggle = () => {
    collapsed.value = !collapsed.value;
  };

  const widthClass = computed(() =>
    collapsed.value ? 'shell-sidebar--collapsed' : 'shell-sidebar--expanded',
  );
</script>

<template>
  <aside
    id="sidebar-v2"
    class="shell-sidebar"
    :class="widthClass"
    :data-collapsed="collapsed"
  >
    <!-- Collapse FAB — half-on, half-off the right edge. Dark green
         pill matches prod (#065f46 + #34d399 chevron). -->
    <button
      type="button"
      class="shell-sidebar__collapse"
      :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="toggle"
    >
      <i
        class="fas"
        :class="collapsed ? 'fa-chevron-circle-right' : 'fa-chevron-circle-left'"
        aria-hidden="true"
      />
    </button>

    <div class="shell-sidebar__inner">
      <!-- Agency logo — monogram tile stub. Prod loads
           company.logo_url or a base64 PNG fallback from Vuex. -->
      <div class="shell-sidebar__logo">
        <div
          class="shell-sidebar__logo-mark"
          :class="{ 'shell-sidebar__logo-mark--small': collapsed }"
        >
          A
        </div>
      </div>

      <!-- Location switcher pill — single line. Stubbed to the
           "no location selected" state so previews don't depend on
           Vuex location data. Caret is the prod up+down pair, not a
           single chevron. Click is a no-op. -->
      <div
        id="location-switcher-sidbar-v2"
        class="shell-sidebar__loc-switcher"
        role="button"
        tabindex="0"
        aria-label="Switch location"
      >
        <div class="shell-sidebar__loc-icon" aria-hidden="true">
          <i class="fas fa-store-alt" />
        </div>
        <div v-if="!collapsed" class="shell-sidebar__loc-text">
          Click here to switch
        </div>
        <div
          v-if="!collapsed"
          class="shell-sidebar__loc-caret"
          aria-hidden="true"
        >
          <i class="fas fa-angle-up" />
          <i class="fas fa-angle-down" />
        </div>
      </div>

      <!-- Header nav. Flat list, no recursion (prod uses recursive
           UIMenuItems for sub-menus). Each item is an <a> with
           javascript:void(0); so hover/focus styles still render. -->
      <nav class="shell-sidebar__nav hl_nav-header" aria-label="Primary">
        <a
          v-for="item in headerNav"
          :key="item.key"
          href="javascript:void(0);"
          class="shell-sidebar__nav-item"
          :class="{ 'shell-sidebar__nav-item--active': item.key === activeKey }"
          :title="collapsed ? item.label : undefined"
        >
          <i
            :class="`fas fa-${item.icon} shell-sidebar__nav-icon nav-fa-icon`"
            aria-hidden="true"
          />
          <span
            v-if="!collapsed"
            class="shell-sidebar__nav-label nav-title"
          >
            {{ item.label }}
          </span>
          <span
            v-if="!collapsed && item.badge === 'new'"
            class="shell-sidebar__nav-badge"
          >
            New
          </span>
        </a>
      </nav>

      <!-- Footer nav. Settings only by default — Help is now in the
           topbar in prod. Green pulse dot signals an unread notification
           or a "new in Settings" affordance (visual only here). -->
      <nav
        class="shell-sidebar__nav shell-sidebar__nav--footer hl_nav-settings"
        aria-label="Secondary"
      >
        <a
          v-for="item in footerNav"
          :key="item.key"
          href="javascript:void(0);"
          class="shell-sidebar__nav-item"
          :class="{ 'shell-sidebar__nav-item--active': item.key === activeKey }"
          :title="collapsed ? item.label : undefined"
        >
          <i
            :class="`fas fa-${item.icon} shell-sidebar__nav-icon nav-fa-icon`"
            aria-hidden="true"
          />
          <span
            v-if="!collapsed"
            class="shell-sidebar__nav-label nav-title"
          >
            {{ item.label }}
          </span>
          <span
            v-if="!collapsed && item.key === 'settings'"
            class="shell-sidebar__nav-pulse"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
  /* ── Aside container ─────────────────────────────────────────────── */
  .shell-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    background: var(--shell-sidebar-bg);
    color: #ffffff;
    transition: width 0.25s ease;
    font-family: var(--hr-font-family-base);
  }
  .shell-sidebar--expanded { width: 14rem; }
  .shell-sidebar--collapsed { width: 3.5rem; }

  .shell-sidebar__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 12px 0 8px;
    overflow: hidden;
  }

  /* ── Collapse FAB ─────────────────────────────────────────────────── */
  .shell-sidebar__collapse {
    appearance: none;
    border: 0;
    cursor: pointer;
    position: absolute;
    right: -8px;
    bottom: 20px;
    z-index: 50;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: var(--shell-collapse-btn-bg);
    color: var(--shell-collapse-btn-fg);
    font-size: 18px;
    line-height: 1;
    padding: 0;
  }
  .shell-sidebar__collapse:focus-visible {
    outline: 2px solid var(--primary-300);
    outline-offset: 2px;
  }

  /* ── Logo block ───────────────────────────────────────────────────── */
  .shell-sidebar__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-bottom: 12px;
    padding: 0 12px;
    height: 40px;
  }
  .shell-sidebar__logo-mark {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.02em;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
  .shell-sidebar__logo-mark--small {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  /* ── Location switcher pill ──────────────────────────────────────── */
  .shell-sidebar__loc-switcher {
    margin: 0 12px 12px;
    height: 28px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.15s ease;
  }
  .shell-sidebar__loc-switcher:hover {
    background: rgba(255, 255, 255, 0.04);
  }
  .shell-sidebar__loc-switcher:focus-visible {
    outline: 2px solid var(--primary-300);
    outline-offset: 1px;
  }
  .shell-sidebar--collapsed .shell-sidebar__loc-switcher {
    margin: 0 6px 12px;
    padding: 0;
    justify-content: center;
  }
  .shell-sidebar__loc-icon {
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.85);
    font-size: 13px;
    flex-shrink: 0;
  }
  .shell-sidebar__loc-text {
    flex: 1;
    min-width: 0;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .shell-sidebar__loc-caret {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .shell-sidebar__loc-caret i {
    font-size: 9px;
    line-height: 1;
  }
  .shell-sidebar__loc-caret i + i { margin-top: -1px; }

  /* ── Nav lists ────────────────────────────────────────────────────── */
  .shell-sidebar__nav {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 0 8px;
    overflow-y: auto;
    /* Hide native scrollbar — prod's sidebar scrolls quietly. */
    scrollbar-width: none;
  }
  .shell-sidebar__nav::-webkit-scrollbar { display: none; }
  .shell-sidebar--collapsed .shell-sidebar__nav { padding: 0 6px; }

  .shell-sidebar__nav--footer {
    margin-top: auto;
    padding-top: 8px;
    flex-shrink: 0;
    overflow: visible;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .shell-sidebar__nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 32px;
    padding: 0 8px;
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .shell-sidebar--collapsed .shell-sidebar__nav-item {
    justify-content: center;
    padding: 0;
  }
  .shell-sidebar__nav-item:hover,
  .shell-sidebar__nav-item--active {
    color: #ffffff;
    background: var(--shell-sidebar-active);
  }
  .shell-sidebar__nav-item:focus-visible {
    outline: 2px solid var(--primary-300);
    outline-offset: -2px;
  }
  .shell-sidebar__nav-icon {
    font-size: 14px;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }
  .shell-sidebar__nav-label {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* "New" badge — small orange pill matching prod's nav-badge style. */
  .shell-sidebar__nav-badge {
    flex-shrink: 0;
    padding: 1px 6px;
    border-radius: 4px;
    background: var(--orange-500);
    color: #ffffff;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1.4;
  }

  /* Green pulse dot near Settings — visual only. Prod uses this to
     surface an unread notification / "new feature in settings" cue. */
  .shell-sidebar__nav-pulse {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--success-400);
    box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.2);
  }
</style>
