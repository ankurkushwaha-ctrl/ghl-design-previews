/*
 * i18n stub — replaces `spm-ts/src/localization/index.ts` for vendored shell
 * components.
 *
 * Why a stub: upstream's localization module pulls in axios retry config,
 * locale lazy-loading, a Vuex coupling, and a Sentry-aware error path. None
 * of that is needed for an English-only design preview. We keep the EXPORT
 * SHAPE byte-identical to upstream so vendored components do `i18n.global.t(...)`
 * exactly as they do in spm-ts, only the import path changes:
 *
 *     // upstream (spm-ts):
 *     import { i18n } from '../../../localization'
 *     // here:
 *     import { i18n } from '../_stubs/i18n'
 *
 * This file also defines the same vue-i18n instance that's installed as a
 * Vue plugin in src/main.ts, so `$t('key')` in <template> resolves to the
 * same dictionary as `i18n.global.t('key')` in <script>.
 *
 * Adding a new translation key:
 *   1. Append it to `messages.en_US` below.
 *   2. Reference it in your component as `$t('namespace.key')` or
 *      `i18n.global.t('namespace.key')`.
 *   3. Missing keys render the key string itself (see `missing` handler) —
 *      that makes gaps visible instead of silent.
 */
import { createI18n } from 'vue-i18n';

/*
 * String provenance:
 *
 *   [verified] — copied verbatim from `spm-ts/src/locales/en.json`. Cite the
 *                line number so re-checking is mechanical when upstream
 *                edits the file.
 *
 *   [inferred] — production source is the remote localization API
 *                (`${localizationApiURL}/en_US/?module=common`), which the
 *                preview repo doesn't fetch from. The string here is a
 *                plausible English default chosen to match the visible UI
 *                role. Surface to the designer if any string looks wrong;
 *                they can paste the canonical string from a live prod
 *                screenshot.
 */
const messages = {
  en_US: {
    common: {
      // [verified] spm-ts/src/locales/en.json:1569
      search_icon: 'search icon',
      // [verified] spm-ts/src/locales/en.json:1532
      quick_actions_icon: 'Quick actions icon',
      // [inferred] alt text on the agency logo image.
      agency_logo: 'Agency logo',
      // [inferred] alt text on the Launchpad nav icon.
      launchpad_icon: 'Launchpad icon',

      // [inferred] visible labels on every sidebar nav item. Sourced from
      // the i18n keys upstream uses in spm-ts/src/util/navigation.ts; the
      // dictionary lives in the runtime localization API which we don't
      // hit here. If any label looks wrong, paste the canonical string
      // from a live prod screenshot.
      sidebar: {
        aiEmployeePromo: 'Summer of AI',
        askAI: 'Ask AI',
        agencyLaunchpad: 'Launchpad',
        agencyDashboard: 'Dashboard',
        saaSConfigurator: 'SaaS Configurator',
        prospecting: 'Prospecting',
        subAccounts: 'Sub-Accounts',
        accountSnapshots: 'Account Snapshots',
        reselling: 'Reselling',
        addOns: 'Add-Ons',
        affiliatePortal: 'Affiliate Portal',
        templateLibrary: 'Template Library',
        partners: 'Partners',
        university: 'University',
        saaSEducation: 'SaaS Education',
        ghlSwag: 'GHL Swag',
        ideas: 'Ideas',
        mobileApp: 'Mobile App',
        desktopApp: 'Desktop App',
        appMarketplace: 'App Marketplace',
        settings: 'Settings',
        new: 'NEW',
        goBack: 'Go back',
      },

      locationSwitcher: {
        // [inferred] used as the agency-mode placeholder text.
        clickToSwitch: 'Click to switch',
        // [inferred] used as the dropdown's search input placeholder.
        searchPlaceholder: 'Search Locations',
        // [inferred] CTA above the location list when a location is active.
        switchToAgency: 'Switch to Agency view',
        // [inferred] section heading in the dropdown.
        recent: 'RECENT',
        // [inferred] section heading in the dropdown.
        allAccounts: 'ALL ACCOUNTS',
      },

      globalSearch: {
        // [inferred] placeholder text in the sidebar's search opener.
        sidebarPlaceholder: 'Search...',
        // [inferred] tooltip text on Mac. Currently unused (v-tooltip not
        // registered in this preview).
        macOpenShortcut: 'Search (⌘K)',
        // [inferred] tooltip text on Windows.
        windowOpenShortcut: 'Search (Ctrl+K)',
      },

      quickActions: {
        // [inferred] visible label next to the lightning-bolt icon, and
        // also the heading inside the dropdown.
        title: 'Quick actions',
      },

      // [verified] spm-ts/src/locales/en.json:1815–1819,2678 — read by LocationListCard tooltips.
      clickHere: 'Click here',
      conversations1: 'Conversations',
      emailRebillingActive: 'Email rebilling active',
      saasSubscriptionActive: 'SaaS subscription active',
      scheduledForDeletion: 'Scheduled for deletion',
      twilioRebillingActive: 'Twilio rebilling active',

      topBar: {
        // [inferred] runtime source in prod is localization API.
        loggedInAs: 'Logged in as',
        switchToMyAccount: 'Switch to my account',
        reportTranslationIssue: 'Report translation issue',
        askAIAssistant: 'Ask AI Assistant',
        askAI: 'Ask AI',
        viewChangelog: 'View changelog',
        notifications: 'Notifications',
        viewNotifications: 'View notifications',
        accessHelpSupport: 'Access help & support',
        needHelp: 'Need help?',
        support: 'Support',
        openProfileMenu: 'Open profile menu',
        loginAsAnotherUser: 'Login as another user',
        loginAs: 'Login as',
        signout: 'Sign out',
      },
    },
    pmd: {
      // [verified] spm-ts/src/locales/en.json:4009
      k: 'K',
    },
    // [verified] spm-ts/src/locales/en.json:53 — agency namespace.
    // Only the keys read by ListAccounts.vue / LocationListCard.vue are populated.
    agency: {
      // [verified] spm-ts/src/locales/en.json:101–110 — addAccount.title only.
      advancedSettings: {
        addAccount: {
          title: 'Add Sub-Account',
        },
      },
      // [verified] spm-ts/src/locales/en.json:467–522 — searchLocation only.
      locationApiKeys: {
        searchLocation: 'Search location',
      },
      // [verified] spm-ts/src/locales/en.json:524–551
      locationCard: {
        deletionScheduledMessage: "This sub-account will be deleted on {date}, if you've changed your mind -",
        emailUsageNotRebilled: 'Email usage is not being rebilled',
        emailUsageRebilled: 'Email usage is being rebilled to your client',
        listings: 'Listings',
        manageClient: 'Manage Client',
        paymentPending: 'Payment is Pending',
        remainingWalletBalance: 'Remaining wallet balance of this SaaS Location',
        requestPaymentAgain: 'Request Payment Again',
        saasModeActivated: 'SaaS mode is activated',
        saasModeNotActivated: 'SaaS mode is not activated',
        saasSubscriptionNotEnabled: 'SaaS subscription plan is not enabled',
        saasSubscriptionRunning: 'SaaS subscription plan is running',
        social: 'Social',
        switchToSaaS: 'Switch to SaaS',
        switchToSubAccount: 'Switch to Sub-Account',
        telephoneUsageNotBilled: 'Telephone usage is not being billed',
        telephoneUsageRebilled: 'Telephone usage is being rebilled to your client',
        wordpressActive: 'Wordpress active',
        wordpressInactive: 'Wordpress inactive',
        wordpressNotSoldYet: 'WordPress not sold yet',
        wordpressSaleSuccessful: 'WordPress sale successful',
        yextActive: 'Yext active',
        yextInactive: 'Yext inactive',
        yextNotSoldYet: 'Yext not sold yet',
        yextSaleSuccessful: 'Yext sale successful',
        reviews: 'Reviews',
      },
      // [verified] spm-ts/src/locales/en.json:672–680
      listAccounts: {
        newInterfaceAvailable: 'A cleaner, faster interface is now available for this page. Give it a try!',
        enableInLabs: 'Enable in Labs',
        pendingTransferRequests: "You've got pending sub-account transfer requests.",
        otherAgenciesRequested: 'Other agencies have requested to transfer sub-accounts to you.',
        reviewRequests: 'Review Requests',
        clientList: 'Client List (Sub-Accounts)',
        subAccountTransfers: 'Sub-Account transfers',
      },
    },
    /*
     * Flat root-level keys consumed by ghl-revex-frontend's
     * LocationCard97Plan.vue / Metrics.vue / report_helper.ts.
     * Source: ghl-revex-frontend/apps/locations/src/locales/en/*.json
     * (we don't fetch the real locale file, so these are best-guess matches
     * to the visible labels in the production reference screenshot).
     */
    locations: {
      subAccountsHeader: 'Sub-accounts',
      plan97Location: 'Agency sub-account',
      plan97FeaturesActive: '',
      showAgencySubAccountsOnly: 'Show agency sub-accounts',
    },
    // Card pills + footer
    readyToSell: 'Ready to sell',
    closedWon: 'Closed (Won)',
    manageClient: 'Manage Client',
    switchToSubAccount: 'Switch to Sub-Account',
    reports: 'Reports',
    // Header buttons
    viewScheduleReports: 'View Scheduled Reports',
    createSubAccount: 'Create Sub-Account',
    // SaaS banner
    enableSaaSForAllClients:
      'Enable SaaS mode for all your clients to automate billing and account management.',
    clickHereToEnableSaaS: 'Click here to enable SaaS',
    // Filter strip
    searchSubAccount: 'Search by Sub-Account',
    columns: 'Columns',
    sortBy: 'Sort By',
    // Bulk actions
    selectAll: 'Select all',
    bulkActions: 'Bulk Actions',
    bulkActionsCount: 'Bulk Actions ({count})',
    // [N1 audit fix] selection-status indicator + clear control
    nSelected: '{count} selected',
    clearSelection: 'Clear',
    // [N9 audit fix] empty-state recovery CTA
    emptyClearFilters: 'Clear filters',
    // Sort options — [N6 audit fix] role-prefixed sort label
    sortByName: 'Name',
    sortByCreated: 'Created Date',
    sortByActiveUsers: 'Active Users',
    sortByCalls: 'Calls',
    sortByEmails: 'Emails',
    sortByContacts: 'Contacts',
    sortPrefix: 'Sort: {label}',
    ascending: 'Ascending (A → Z)',
    descending: 'Descending (Z → A)',
    // [N4 audit fix] sort-direction button label, matches option labels
    aToZ: 'A → Z',
    zToA: 'Z → A',
    // [N10 audit fix] tooltips on icon-only buttons
    tooltipFunnel: 'Advanced filters',
    tooltipHistory: 'Bulk action history',
    tooltipViewCard: 'Switch to card view',
    tooltipViewTable: 'Switch to table view',
    // Filter funnel drawer
    advancedFilters: 'Advanced Filters',
    advancedFiltersDesc:
      'Narrow the list to exactly the sub-accounts you want to act on.',
    filterStatus: 'Status',
    filterPlan: 'Plan',
    filterCreated: 'Created Date',
    filterActivity: 'Activity',
    statusActive: 'Active',
    statusSuspended: 'Suspended',
    statusDeleted: 'Deleted',
    statusAll: 'All statuses',
    planStarter: 'Starter',
    planPro: 'Pro',
    planSaas: 'SaaS',
    planAll: 'All plans',
    activityActive: 'Active in last 30 days',
    activityIdle: 'Idle 30+ days',
    activityAll: 'Any activity',
    apply: 'Apply',
    clear: 'Clear',
    filtersApplied: 'Filters applied',
    filtersCleared: 'Filters cleared',
    // Bulk action history popover
    bulkActionHistory: 'Bulk Action History',
    bulkActionHistorySubtitle: 'Your most recent bulk actions',
    viewAllHistory: 'View all history',
    successRate: '{rate}% success',
    timeAgoDays: '{n} days ago',
    timeAgoHours: '{n} hours ago',
    // Columns dropdown
    showColumns: 'Show / hide columns',
    columnActiveUsers: 'Active Users',
    columnCalls: 'Calls',
    columnEmails: 'Emails',
    columnSms: 'Text Messages',
    columnContacts: 'Contacts',
    columnAppointments: 'Appointments',
    columnReviews: 'Reviews',
    // Empty state
    emptyTitle: 'No sub-accounts match your filters',
    emptyBody:
      'Try adjusting your search, clearing filters, or toggling the agency sub-accounts switch.',
    // View toggle
    viewCard: 'Card view',
    viewTable: 'Table view',
    /*
     * Bulk-action menu — keys mirror upstream
     * `ghl-revex-frontend/apps/locations/src/locales/en.json` so a future
     * port to upstream is byte-identical for these strings. The dropdown
     * order itself is set in BulkActionsRow.vue's `bulkOptions` and matches
     * the production screenshot.
     *
     * Maps to upstream `BulkActionType` enum keys:
     *   enableRebilling   → BulkActionType.ENABLE_REBILLING ('enable-rebilling')
     *   enableSaas        → BulkActionType.ENABLE_SAAS      ('enable-saas')
     *   pauseSubaccount   → BulkActionType.PAUSE_SUBACCOUNT ('pause-subaccount')
     *   setupCalendars    → BulkActionType.CALENDAR_SETTINGS ('calendar-settings')
     *   updateFeatures    → new (under feature-permissions work) ('update-features')
     */
    enableRebilling: 'Enable Rebilling',
    enableSaas: 'Enable SaaS Mode',
    pauseSubaccount: 'Pause Subaccount',
    setupCalendars: 'Setup Calendars',
    updateFeatures: 'Update Features',
    confirmBulkTitle: 'Apply {action} to {count} sub-accounts?',
    confirmBulkBody:
      'This will affect every selected sub-account. Continue with this action?',
    // [N5 audit fix] destructive-action variants name what's lost + use stronger language
    confirmDestructiveBulkTitle: 'Delete {count} sub-accounts?',
    confirmDestructiveBulkBody:
      '{count} sub-accounts will be permanently deleted, including their contacts, conversations, and reporting data. This cannot be undone.',
    confirmDestructiveBulkPositive: 'Yes, delete {count} sub-accounts',
    confirm: 'Confirm',
    cancel: 'Cancel',
    bulkSuccess: '{action} applied to {count} sub-accounts',
    // Card menu
    menuEdit: 'Edit',
    menuSettings: 'Settings',
    menuSuspend: 'Suspend',
    menuResume: 'Resume',
    menuTransfer: 'Transfer',
    menuDelete: 'Delete',
    confirmCardTitle: '{action} "{name}"?',
    confirmCardBody:
      'This affects only this sub-account. Are you sure you want to continue?',
    // [N5 audit fix] destructive single-card variant
    confirmDestructiveCardTitle: 'Delete "{name}"?',
    confirmDestructiveCardBody:
      '"{name}" and all of its contacts, conversations, and reporting data will be permanently deleted. This cannot be undone.',
    confirmDestructiveCardPositive: 'Yes, delete "{name}"',
    cardActionSuccess: '{action} applied to {name}',
    // Switch-to-sub-account modal
    switchingTo: 'Switching to {name}…',
    switchingDesc:
      'We are loading their workspace. You will land on the same page once the switch completes.',
    switchedTo: 'Switched to {name}',
    // Reports popover
    reportsPopoverTitle: 'Reports for {name}',
    reportSales: 'Sales Performance',
    reportCalls: 'Calls Report',
    reportEmail: 'Email Report',
    reportConversation: 'Conversation Stats',
    reportCustom: 'Custom Report',
    // Scheduled reports modal
    scheduledReportsTitle: 'Scheduled Reports',
    scheduledReportsDesc:
      'Reports your team gets in their inbox on a recurring schedule.',
    weeklyPerformance: 'Weekly Performance',
    weeklyPerformanceWhen: 'Every Monday at 9:00 AM',
    monthlyClient: 'Monthly Client Summary',
    monthlyClientWhen: 'First of the month at 8:00 AM',
    quarterlyExec: 'Quarterly Executive Brief',
    quarterlyExecWhen: 'First Tuesday of each quarter',
    recipientsCount: '{count} recipients',
    edit: 'Edit',
    delete: 'Delete',
    newReport: '+ New Report',
    // Create sub-account modal
    createSubAccountTitle: 'Create New Sub-Account',
    stepBusinessInfo: 'Business Info',
    stepPlanSelection: 'Plan Selection',
    stepReview: 'Review',
    fieldBusinessName: 'Business Name',
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldAddress: 'Address',
    planStarterDesc:
      'For solo operators getting their first client online. Includes contacts, pipelines, and a website builder.',
    planProDesc:
      'For agencies serving multiple clients. Adds calendars, automation, reputation, and unlimited users.',
    planSaasDesc:
      'White-label SaaS billing for resellers. Adds rebilling, plan tiers, and SaaS configurator.',
    perMonth: '/mo',
    selectPlan: 'Select',
    selected: 'Selected',
    reviewSummary: 'Review what you are about to create',
    next: 'Next',
    back: 'Back',
    create: 'Create',
    creating: 'Creating sub-account…',
    createdSuccess: 'Sub-account "{name}" created',
    // Date-range shortcuts
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    // Table view headers
    colName: 'Name',
    colStatus: 'Status',
    colActions: 'Actions',
    actionsLabel: 'Actions',
    // Metric column headers (consumed by buildReport via t())
    activeUsers: 'Active Users',
    calls: 'Calls',
    emails: 'Emails',
    textMessages: 'Text Messages',
    numberOfContacts: 'Number of Contacts',
    numberOfAppointments: 'Number of Appointments',
    reviews: 'Reviews',
    // Metric tooltip strings (consumed by buildReport via t())
    incomingCalls: 'Incoming Calls',
    outgoingCalls: 'Outgoing Calls',
    totalTalktime: 'Total Talktime',
    incomingEmails: 'Incoming Emails',
    outgoingEmails: 'Outgoing Emails',
    incomingSms: 'Incoming SMS',
    outgoingSms: 'Outgoing SMS',
    contactsCreated: 'Contacts Created',
    appointmentsBooked: 'Appointments Booked',
    totalReviews: 'Total Reviews',
    positiveReviews: 'Positive Reviews',
    negativeReviews: 'Negative Reviews',
  },
};

export const i18n = createI18n({
  // Mirrors spm-ts createI18n options. `legacy: false` is what enables the
  // composition-API style; `globalInjection: true` is what makes `$t()`
  // resolve in templates without per-component setup.
  legacy: false,
  locale: 'en_US',
  fallbackLocale: 'en_US',
  silentFallbackWarn: true,
  globalInjection: true,
  messages,
  missing: (_, key) => key,
});
