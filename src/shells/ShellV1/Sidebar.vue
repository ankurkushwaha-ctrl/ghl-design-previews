<script lang="ts" setup>
  /*
   * ShellV1 Sidebar — visual port of spm-ts/src/pmd/components/sidebar/SideBar.vue
   * (and its supporting LocationSwitcher/QuickActions/UIMenuItems components).
   *
   * Goal: match the production sidebar visually so screenshots are
   * indistinguishable. Behaviour is intentionally stubbed:
   *   - location switcher renders the pill but does NOT open a dropdown
   *   - quick-action / search pill renders but is a no-op
   *   - nav items are flat anchors with no routing or active-state logic
   *     (active item is hard-coded to whatever `activeKey` prop says)
   *   - collapse FAB toggles a local boolean — no Vuex, no event bus
   *
   * The dynamic recursion of UIMenuItems is replaced with a flat list
   * of realistic agency nav entries. That's enough for stakeholders to
   * see the chrome correctly; it's NOT a faithful re-implementation of
   * the prod information architecture.
   *
   * If a preview needs different nav items / agency name / active item,
   * pass them as props rather than editing this file.
   */
  import { ref, computed } from 'vue';

  interface NavItem {
    key: string;
    icon: string; // Font Awesome 5 class fragment, e.g. 'tachometer-alt'
    label: string;
  }

  interface Props {
    /** Hard-coded active nav key. e.g. 'addons' for the Add-Ons preview. */
    activeKey?: string;
    /** Override the default agency-side nav set. */
    headerNav?: NavItem[];
    /** Override the footer nav (Settings et al). */
    footerNav?: NavItem[];
    /** Override the agency name shown in the location switcher pill. */
    agencyName?: string;
    /** Override the location/city sub-line. */
    agencyCity?: string;
    /** Initial collapsed state. */
    collapsed?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    activeKey: '',
    collapsed: false,
    agencyName: 'Acme Marketing Agency',
    agencyCity: 'San Diego, CA',
    // Default agency-side IA — based on the real spm-ts sidebar's most
    // common items so the chrome reads as "the GHL sidebar" without
    // committing to one tenant's exact nav.
    headerNav: () => [
      { key: 'launchpad',     icon: 'rocket',          label: 'Launchpad'    },
      { key: 'dashboard',     icon: 'tachometer-alt',  label: 'Dashboard'    },
      { key: 'sub-accounts',  icon: 'users',           label: 'Sub-Accounts' },
      { key: 'team',          icon: 'user-friends',    label: 'Team'         },
      { key: 'reselling',     icon: 'tag',             label: 'Reselling'    },
      { key: 'snapshots',     icon: 'camera-retro',    label: 'Snapshots'    },
      { key: 'reputation',    icon: 'star',            label: 'Reputation'   },
      { key: 'marketplace',   icon: 'store',           label: 'Marketplace'  },
      { key: 'addons',        icon: 'cubes',           label: 'Add-Ons'      },
      { key: 'billing',       icon: 'credit-card',     label: 'Billing'      },
      { key: 'university',    icon: 'graduation-cap',  label: 'University'   },
    ],
    footerNav: () => [
      { key: 'settings',  icon: 'cog',           label: 'Settings'   },
      { key: 'help',      icon: 'question-circle', label: 'Help'      },
    ],
  });

  const collapsed = ref(props.collapsed);
  const toggle = () => { collapsed.value = !collapsed.value; };

  const widthClass = computed(() => collapsed.value ? 'shell-sidebar--collapsed' : 'shell-sidebar--expanded');
</script>

<template>
  <aside
    id="sidebar-v2"
    class="shell-sidebar"
    :class="widthClass"
    :data-collapsed="collapsed"
  >
    <!-- Collapse FAB — sits half-on, half-off the right edge.
         Dark green pill matches prod (#065f46 / #34d399). -->
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
      <!-- Agency logo block. Prod renders an <img> when company.logo_url
           is set or a base64-encoded fallback PNG. Here we use a simple
           monogram tile so previews don't depend on an asset. -->
      <div class="shell-sidebar__logo">
        <div v-if="!collapsed" class="shell-sidebar__logo-mark">A</div>
        <div v-else class="shell-sidebar__logo-mark shell-sidebar__logo-mark--small">A</div>
      </div>

      <!-- Location switcher pill. Visual only — clicking does nothing. -->
      <div
        id="location-switcher-sidbar-v2"
        class="shell-sidebar__loc-switcher"
        role="button"
        tabindex="0"
        :aria-label="`Location: ${agencyName}`"
      >
        <div class="shell-sidebar__loc-icon" aria-hidden="true">
          <i class="fas fa-store" />
        </div>
        <div v-if="!collapsed" class="shell-sidebar__loc-text">
          <span class="shell-sidebar__loc-name">{{ agencyName }}</span>
          <span class="shell-sidebar__loc-city">{{ agencyCity }}</span>
        </div>
        <i
          v-if="!collapsed"
          class="fas fa-chevron-down shell-sidebar__loc-caret"
          aria-hidden="true"
        />
      </div>

      <!-- Quick-actions search pill. Visual only. The "+" pseudo-button on
           the left is a separate prod element ("+ icon" for quick-add);
           the rest is the global search input. -->
      <div class="shell-sidebar__quick-actions" role="button" tabindex="0" aria-label="Quick actions">
        <button type="button" class="shell-sidebar__quick-add" aria-label="Quick add" tabindex="-1">
          <i class="fas fa-plus" aria-hidden="true" />
        </button>
        <span v-if="!collapsed" class="shell-sidebar__quick-search">
          <i class="fas fa-search shell-sidebar__quick-search-icon" aria-hidden="true" />
          <span class="shell-sidebar__quick-search-text">Search</span>
          <span class="shell-sidebar__quick-search-shortcut">⌘K</span>
        </span>
      </div>

      <!-- Header nav — flat list, no recursion. Each item is an <a> with
           a faux href so hover/focus styles render in static screenshots. -->
      <nav class="shell-sidebar__nav hl_nav-header" aria-label="Primary">
        <a
          v-for="item in headerNav"
          :key="item.key"
          href="javascript:void(0);"
          class="shell-sidebar__nav-item"
          :class="{ 'shell-sidebar__nav-item--active': item.key === activeKey }"
          :title="collapsed ? item.label : undefined"
        >
          <i :class="`fas fa-${item.icon} shell-sidebar__nav-icon nav-fa-icon`" aria-hidden="true" />
          <span v-if="!collapsed" class="shell-sidebar__nav-label nav-title">{{ item.label }}</span>
        </a>
      </nav>

      <!-- Footer nav — anchored to the bottom in the original. Uses the
           same chrome as the header but with a thin top divider. -->
      <nav class="shell-sidebar__nav shell-sidebar__nav--footer hl_nav-settings" aria-label="Secondary">
        <a
          v-for="item in footerNav"
          :key="item.key"
          href="javascript:void(0);"
          class="shell-sidebar__nav-item"
          :class="{ 'shell-sidebar__nav-item--active': item.key === activeKey }"
          :title="collapsed ? item.label : undefined"
        >
          <i :class="`fas fa-${item.icon} shell-sidebar__nav-icon nav-fa-icon`" aria-hidden="true" />
          <span v-if="!collapsed" class="shell-sidebar__nav-label nav-title">{{ item.label }}</span>
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
    margin: 0 8px 12px;
    height: 2.6rem;
    padding: 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--shell-sidebar-pill-bg);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .shell-sidebar__loc-switcher:hover {
    background: #5a677d;
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
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.85);
    display: grid;
    place-items: center;
    font-size: 13px;
    flex-shrink: 0;
  }
  .shell-sidebar__loc-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  .shell-sidebar__loc-name {
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 7.5rem;
    margin-top: 0.2rem;
  }
  .shell-sidebar__loc-city {
    color: #ffffff;
    opacity: 0.55;
    font-size: 11px;
    margin-top: -0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 7.5rem;
  }
  .shell-sidebar__loc-caret {
    color: rgba(255, 255, 255, 0.6);
    font-size: 10px;
    flex-shrink: 0;
  }

  /* ── Quick-actions / search pill ─────────────────────────────────── */
  .shell-sidebar__quick-actions {
    margin: 0 8px 16px;
    height: 36px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--gray-600);
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 6px;
    overflow: hidden;
  }
  .shell-sidebar--collapsed .shell-sidebar__quick-actions {
    margin: 0 6px 16px;
    padding: 0;
    justify-content: center;
  }
  .shell-sidebar__quick-add {
    appearance: none;
    border: 0;
    cursor: pointer;
    width: 28px;
    height: 28px;
    margin-left: 4px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    font-size: 11px;
  }
  .shell-sidebar__quick-add:hover { background: rgba(255, 255, 255, 0.16); }
  .shell-sidebar--collapsed .shell-sidebar__quick-add { margin-left: 0; }
  .shell-sidebar__quick-search {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--gray-400);
    font-size: 12px;
    padding-right: 8px;
  }
  .shell-sidebar__quick-search-icon { font-size: 11px; }
  .shell-sidebar__quick-search-text { flex: 1; }
  .shell-sidebar__quick-search-shortcut {
    background: var(--gray-400);
    color: var(--gray-900);
    font-size: 10px;
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 3px;
  }

  /* ── Nav lists ────────────────────────────────────────────────────── */
  .shell-sidebar__nav {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 0 8px;
    overflow-y: auto;
  }
  .shell-sidebar--collapsed .shell-sidebar__nav { padding: 0 6px; }

  .shell-sidebar__nav--footer {
    margin-top: auto;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .shell-sidebar__nav-item {
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
