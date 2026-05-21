/*
 * feature-catalog.ts — mock feature taxonomy + per-sub-account current state.
 *
 * Provenance:
 *   - Group names and counts mirror the production "Update Features" modal
 *     screenshot (https://permissions.version.gohighlevel.site/sub-accounts).
 *     11 groups visible in screenshot; 3 additional groups below the scroll
 *     fold (Conversations, Ads & Tracking, Other) inferred to hit the
 *     ~74-leaf production total the brief mentions.
 *   - Leaf feature names where they overlap come from upstream
 *     ghl-revex-frontend/apps/locations/src/helpers/features.ts
 *     (SAAS_PRODUCTS_DETAILS).
 *   - CRM is split into 3 sub-groups (CRM core / Phone System /
 *     Lead Channel Integrations) per the brief's taxonomy section.
 *
 * In production the catalog comes from the backend. The picker should
 * render whatever shape the API returns — this file is mock-only and
 * exists to make the preview behave realistically across ~74 leaves.
 *
 * Replacing this file with a real API call later is mechanical: keep
 * the FEATURE_CATALOG / TOTAL_FEATURE_COUNT exports byte-identical in
 * shape and the rest of the modal stays unchanged.
 */
import type { Feature, FeatureGroup, CurrentStateBySubAccount, DetailedFeatureState } from './types';

export const FEATURE_CATALOG: FeatureGroup[] = [
  {
    id: 'landing',
    name: 'Landing',
    features: [
      { id: 'landing-pages', name: 'Landing Pages' },
      { id: 'custom-domains', name: 'Custom Domains' },
    ],
  },
  {
    id: 'calendar',
    name: 'Calendar',
    features: [{ id: 'calendars', name: 'Calendars' }],
  },
  {
    id: 'crm',
    name: 'CRM',
    features: [
      // CRM core (4)
      { id: 'contacts', name: 'Contacts', subGroup: 'CRM core' },
      { id: 'smart-lists', name: 'Smart Lists', subGroup: 'CRM core' },
      { id: 'tags', name: 'Tags', subGroup: 'CRM core' },
      { id: 'custom-fields', name: 'Custom Fields', subGroup: 'CRM core' },
      // Phone System (4)
      { id: 'voicemails', name: 'Voicemails', subGroup: 'Phone System' },
      { id: 'call-forwarding', name: 'Call Forwarding', subGroup: 'Phone System' },
      { id: 'call-recording', name: 'Call Recording', subGroup: 'Phone System' },
      { id: 'ivr', name: 'IVR', subGroup: 'Phone System' },
      // Lead Channel Integrations (5)
      { id: 'facebook-messenger', name: 'Facebook Messenger', subGroup: 'Lead Channel Integrations' },
      { id: 'instagram-dm', name: 'Instagram DM', subGroup: 'Lead Channel Integrations' },
      { id: 'gmb-messaging', name: 'GMB Messaging', subGroup: 'Lead Channel Integrations' },
      { id: 'gmb-call-tracking', name: 'GMB Call Tracking', subGroup: 'Lead Channel Integrations' },
      { id: 'web-chat', name: 'Web Chat', subGroup: 'Lead Channel Integrations' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    features: [
      { id: 'email-marketing', name: 'Email Marketing' },
      { id: 'social-planner', name: 'Social Planner' },
      { id: 'sms-marketing', name: 'SMS Marketing' },
      { id: 'trigger-links', name: 'Trigger Links' },
      { id: 'surveys', name: 'Surveys' },
      { id: 'forms', name: 'Forms' },
      { id: 'quizzes', name: 'Quizzes' },
      { id: 'sms-email-templates', name: 'SMS & Email Templates' },
    ],
  },
  {
    id: 'memberships',
    name: 'Memberships',
    features: [
      { id: 'courses', name: 'Courses' },
      { id: 'communities', name: 'Communities' },
      { id: 'certificates', name: 'Certificates' },
      { id: 'affiliate-manager', name: 'Affiliate Manager' },
      { id: 'gokollab', name: 'GoKollab' },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    features: [
      { id: 'invoices', name: 'Invoices' },
      { id: 'subscriptions', name: 'Subscriptions' },
      { id: 'tax-profiles', name: 'Tax Profiles' },
      { id: 'coupons', name: 'Coupons' },
      { id: 'text-to-pay', name: 'Text-to-Pay' },
      { id: 'proposals-estimates', name: 'Documents & Contracts' },
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    features: [
      { id: 'workflows', name: 'Workflows' },
      { id: 'triggers', name: 'Triggers' },
      { id: 'campaigns', name: 'Campaigns' },
    ],
  },
  {
    id: 'reputation',
    name: 'Reputation Management',
    features: [
      { id: 'reviews', name: 'Reviews' },
      { id: 'online-listings', name: 'Online Listings' },
      { id: 'reputation-widgets', name: 'Reputation Widgets' },
      { id: 'review-requests', name: 'Review Requests' },
    ],
  },
  {
    id: 'sites',
    name: 'Sites',
    features: [
      { id: 'funnels', name: 'Funnels' },
      { id: 'websites', name: 'Websites' },
      { id: 'blogs', name: 'Blogs' },
      { id: 'wordpress', name: 'WordPress' },
      { id: 'media-storage', name: 'Media Storage' },
      { id: 'site-templates', name: 'Site Templates' },
      { id: 'forms-builder', name: 'Forms Builder' },
      { id: 'surveys-builder', name: 'Surveys Builder' },
      { id: 'chat-widget', name: 'Chat Widget' },
      { id: 'qr-codes', name: 'QR Codes' },
      { id: 'url-redirects', name: 'URL Redirects' },
      { id: 'site-analytics', name: 'Site Analytics' },
      { id: 'css-injection', name: 'CSS Injection' },
    ],
  },
  {
    id: 'reporting',
    name: 'Reporting',
    features: [
      { id: 'dashboard-stats', name: 'Dashboard Stats' },
      { id: 'agent-reporting', name: 'Agent Reporting' },
      { id: 'attribution-reporting', name: 'Attribution Reporting' },
      { id: 'google-ads-reporting', name: 'Google Ads Reporting' },
      { id: 'facebook-ads-reporting', name: 'Facebook Ads Reporting' },
      { id: 'call-reporting', name: 'Call Reporting' },
      { id: 'appointment-reporting', name: 'Appointment Reporting' },
      { id: 'custom-reports', name: 'Custom Reports' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    features: [{ id: 'mobile-app-access', name: 'Mobile App Access' }],
  },
  {
    id: 'conversations',
    name: 'Conversations',
    features: [
      { id: 'unified-inbox', name: 'Unified Inbox' },
      { id: 'sms-conversations', name: 'SMS Conversations' },
      { id: 'email-conversations', name: 'Email Conversations' },
      { id: 'live-chat', name: 'Live Chat' },
    ],
  },
  {
    id: 'ads-tracking',
    name: 'Ads & Tracking',
    features: [
      { id: 'ad-launcher', name: 'Ad Launcher' },
      { id: 'pixel-management', name: 'Pixel Management' },
      { id: 'utm-tracking', name: 'UTM Tracking' },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    features: [
      { id: 'launchpad', name: 'Launchpad' },
      { id: 'ai-employee', name: 'AI Employee' },
      { id: 'app-marketplace', name: 'App Marketplace' },
    ],
  },
];

/** Cached flat list — handy for the picker and impact calcs. */
export const ALL_FEATURES: Feature[] = FEATURE_CATALOG.flatMap((g) => g.features);

/** Total leaf count — the modal's "Total" copy slot. */
export const TOTAL_FEATURE_COUNT = ALL_FEATURES.length;

/** Look up a feature by id. Returns undefined if id is unknown. */
export function getFeatureById(id: string): Feature | undefined {
  return ALL_FEATURES.find((f) => f.id === id);
}

/* ──────────────────────────────────────────────────────────────────────
 * Mock per-sub-account current state.
 *
 * In production this comes from the backend (the same endpoint the
 * existing per-sub-account Features.vue consumes). For the preview we
 * synthesize a deterministic count: each featureId hashes to a stable
 * "popularity" 0..100, and alreadyOn = round(selectedCount * pop/100).
 *
 * Determinism matters: the user toggles chips, removes rows, scrolls
 * — the impact numbers must stay constant across re-renders. Otherwise
 * the modal feels broken even before they hit Apply.
 *
 * The hash is intentionally simple — this is preview-only mock data,
 * not security-sensitive.
 * ────────────────────────────────────────────────────────────────────── */
function hashStringToInt(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Popularity (% of selected sub-accounts where this feature is currently on). */
function popularityFor(featureId: string): number {
  // Most features sit between 35% and 95% — this is roughly what GHL's
  // catalog looks like in prod (most accounts have most features on by
  // default; a handful are opt-in or in beta and sit lower).
  const h = hashStringToInt(featureId);
  return 35 + (h % 61); // 35..95 inclusive
}

/**
 * Build the alreadyOn map for a given selected sub-account count.
 *
 * Returned map: featureId → number of sub-accounts where the feature
 * is currently enabled. Sub-accounts where it's off = selectedCount - alreadyOn.
 *
 * NOTE: this map is read-only inside the modal. recipe.ts::recipeToPayload
 * has no access to it — that's how the patch contract is enforced by
 * construction.
 */
export function buildMockCurrentState(
  selectedCount: number,
): CurrentStateBySubAccount {
  const map: CurrentStateBySubAccount = new Map();
  for (const f of ALL_FEATURES) {
    const alreadyOn = Math.round((selectedCount * popularityFor(f.id)) / 100);
    map.set(f.id, alreadyOn);
  }
  return map;
}

const MOCK_ACCOUNT_NAMES = [
  'Acme Corp', 'Bright Dental', 'CityFit Gym', 'DreamScape Realty',
  'Elite Auto', 'FreshBite Cafe', 'GreenLeaf Spa', 'Horizon HVAC',
  'InstaClean Co', 'JetSet Travel', 'KeyStone Law', 'LuxNails Studio',
  'MapleCrest Homes', 'NextGen Solar', 'Oakwood Plumbing', 'PrimeCut Barber',
  'QuickFix IT', 'RiverRun Fitness', 'SilverLine Insurance', 'TopNotch Roofing',
];

function mockAccountNamesForCount(count: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(MOCK_ACCOUNT_NAMES[i % MOCK_ACCOUNT_NAMES.length]);
  }
  return names;
}

export function buildMockDetailedState(
  selectedCount: number,
): DetailedFeatureState {
  const allNames = mockAccountNamesForCount(selectedCount);
  const map: DetailedFeatureState = new Map();
  for (const f of ALL_FEATURES) {
    const alreadyOn = Math.round((selectedCount * popularityFor(f.id)) / 100);
    map.set(f.id, {
      enabled: allNames.slice(0, alreadyOn),
      disabled: allNames.slice(alreadyOn),
    });
  }
  return map;
}
