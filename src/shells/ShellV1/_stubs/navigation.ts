/*
 * agencyNavigation — vendored from spm-ts/src/util/navigation.ts:10764-12511
 *
 * What's preserved (verbatim):
 *   - Every top-level header item that renders for an agency-admin user
 *   - Every field on those items (name, icon, meta, tooltip, badge, etc.)
 *   - The Settings footer item
 *
 * What's adapted for preview:
 *   - Route name constants (agencyDashboardRoutes.default, etc.) are
 *     resolved to plain string placeholders. router-link in our preview
 *     doesn't navigate to live pages anyway. Dev lifting back should
 *     restore the original constant references.
 *   - Children arrays on top-level items (which contain `hide: true`
 *     sub-routes used only for routing metadata, never rendered) are
 *     dropped. They add ~600 lines of routing config with zero visible
 *     impact.
 *   - The Settings footer's `items` array (~880 lines of sub-items shown
 *     only after the user clicks Settings) is dropped. Submenu rendering
 *     is part of a deferred slice.
 *   - i18n.global.t(...) calls are replaced with their literal i18n keys
 *     (vue-i18n resolves them via the same key path).
 *   - getPromoDisplayName() resolves to "Summer of AI" (the upstream
 *     fallback string).
 *   - checkUIMenu('holiday-promos') resolves to "Holiday Promos" (the
 *     upstream display name).
 *   - The duplicate `subAccounts` entry at upstream line 11049 is kept
 *     to match upstream output — upstream has it twice for routing reasons.
 *
 * If you need any deferred sub-item visible, lift the missing slice from
 * spm-ts/src/util/navigation.ts and replace this file's contents.
 */

import type { V2RouteConfig } from './types';

export const agencyNavigation: V2RouteConfig[] = [
  {
    name: 'common.sidebar.askAI',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'ask-ai',
    tooltip: 'common.sidebar.askAI',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/aiIcon.svg',
    children: [],
    route: { name: 'agencyAskAiRoutes.default', params: [] },
  },
  {
    name: 'Agency Dashboard',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-dashboard',
    tooltip: 'common.sidebar.agencyDashboard',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-dashboard.svg',
    children: [],
    route: { name: 'agencyDashboardRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.saaSConfigurator',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-saas-configurator',
    tooltip: 'common.sidebar.saaSConfigurator',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: {
      value: { color: 'var(--black)', fontFamily: 'Font Awesome 5 Free', name: 'chart-bar', unicode: 'f080' },
    },
    children: [],
    route: { name: 'saasRoutes.default', params: [] },
  },
  {
    name: 'AI Usage',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-ai-usage',
    tooltip: null,
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/aiIcon.svg',
    children: [],
    route: { name: 'agencyAiGrowthRoutes.aiUsage', params: [] },
  },
  {
    name: 'common.sidebar.prospecting',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'location-prospect',
    tooltip: 'common.sidebar.prospecting',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://assets.cdn.filesafe.space/knES3eSWYIsc5YSZ3YLl/media/63d902791be71b1427bfce58.svg+xml',
    children: [],
    route: { name: 'prospectingRoutes.default', params: [] },
    badge: { enable: false, title: 'common.sidebar.new' },
  },
  {
    name: 'common.sidebar.subAccounts',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-accounts',
    tooltip: 'common.sidebar.subAccounts',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-user.svg',
    children: [],
    route: { name: 'subAccountRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.accountSnapshots',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-account-snapshots',
    tooltip: 'common.sidebar.accountSnapshots',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-account-snapshot.svg',
    children: [],
    route: { name: 'snapshotsRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.reselling',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-account-reselling',
    tooltip: 'common.sidebar.reselling',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/icon-reselling.svg',
    children: [],
    route: { name: 'resellingRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.addOns',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-marketplace',
    tooltip: 'common.sidebar.addOns',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-marketplace.svg',
    children: [],
    route: { name: 'marketplaceRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.affiliatePortal',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-affiliate-portal',
    tooltip: 'common.sidebar.affiliatePortal',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: {
      value: { color: 'var(--black)', fontFamily: 'Font Awesome 5 Free', name: 'fas fa-users', unicode: 'f0c0' },
    },
    children: [],
    route: { name: 'affiliatePortalRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.templateLibrary',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-template-library',
    tooltip: 'common.sidebar.templateLibrary',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: {
      value: { color: 'var(--black)', fontFamily: 'Font Awesome 5 Free', name: 'shapes', unicode: 'f61f' },
    },
    children: [],
    route: { name: 'templateLibraryAdminRoutes.default', params: [] },
    badge: { enable: false, title: 'common.sidebar.new' },
  },
  {
    name: 'common.sidebar.partners',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-partners',
    tooltip: 'common.sidebar.partners',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-partners.svg',
    children: [],
    route: { name: 'partners', params: [] },
  },
  {
    name: 'common.sidebar.university',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-university',
    tooltip: 'common.sidebar.university',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: {
      value: { color: 'var(--black)', fontFamily: 'Font Awesome 5 Free', name: 'graduation-cap', unicode: 'f19d' },
    },
    children: [],
    route: { name: 'universityRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.saaSEducation',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'saas-education',
    tooltip: 'common.sidebar.saaSEducation',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-saas-edu.svg',
    children: [],
    route: { name: 'saasRoutes.education', params: [] },
  },
  {
    name: 'common.sidebar.ghlSwag',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'ghl-swag',
    tooltip: 'ghl-swag',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/store.svg',
    children: [],
    route: { name: 'ghlSwagRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.ideas',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-ideas',
    tooltip: 'common.sidebar.ideas',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/agency-ideas.svg',
    children: [],
    route: { name: 'ideasRoutes.default', params: [] },
  },
  {
    name: 'common.sidebar.mobileApp',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'mobile-app-customiser',
    tooltip: 'common.sidebar.mobileApp',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/phone.svg',
    children: [],
    route: { name: 'mobileAppCustomiserRoutes.default', params: [] },
    badge: { enable: true, title: 'common.sidebar.new' },
  },
  {
    name: 'common.sidebar.desktopApp',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'desktop-whitelabel-app',
    tooltip: 'common.sidebar.desktopApp',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: {
      value: { color: 'var(--black)', fontFamily: 'Font Awesome 5 Free', name: 'desktop', unicode: 'f108' },
    },
    children: [],
    route: { name: 'desktopWhitelabelAppRoutes.default', params: [] },
    badge: { enable: true, title: 'common.sidebar.new' },
  },
  {
    name: 'common.sidebar.appMarketplace',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-accounts',
    tooltip: 'common.sidebar.appMarketplace',
    permissions: { all: ['integrations'], any: [] },
    userScopes: { all: ['native-integrations.readonly', 'native-integrations.write'], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/grid-01.svg',
    children: [],
    route: { name: 'integrationRoutes.default', params: [] },
  },
  {
    name: 'Success Stats',
    enabled: true,
    items: [],
    type: 'header',
    meta: 'agency-success-stats',
    tooltip: 'Success Stats',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: {
      value: { color: 'var(--black)', fontFamily: 'Font Awesome 5 Free', name: 'chart-line', unicode: 'f201' },
    },
    children: [],
    route: { name: 'agencySuccessStatsRoutes.default', params: [] },
  },
  // Settings — footer item.
  // Upstream `items` array (~880 lines of sub-routes) dropped — visible only
  // after the user clicks Settings, which is a deferred slice.
  {
    name: 'common.sidebar.settings',
    enabled: true,
    items: [],
    type: 'footer',
    meta: 'agency-settings',
    tooltip: 'common.sidebar.settings',
    permissions: { all: [], any: [] },
    userScopes: { all: [], any: [] },
    icon: 'https://cdn.msgsndr.com/sidebar-v2/icon_settings.svg',
    children: [],
    route: { name: 'settingsRoutes.default', params: [] },
  },
];
