<!--
  AddOnsPage.vue — inner page (no shell chrome)
  ─────────────────────────────────────────────────────────────────────────
  Source-of-truth: spm-ts/src/pmd/pages/agency/AddOnsPage.vue
  (an unmerged spm-ts PR — see archive/spm-ts-add-ons-pr/).

  Differences from upstream are deliberate and minimal:
    1. The shell chrome (<SideBarV2>, <TopBar>, <KickoffWidget>) is
       stripped — the parent <ShellV1> wraps this page externally,
       same pattern as src/pages/SubAccountsPage.vue → Locations.vue.
    2. Tabs removed per PM feedback (May 25): all four categories
       now render inline as stacked sections on a single scrollable
       page so Premium support and HIPAA are visible without a click.
       When porting upstream, drop HLTabs/HLTabPane and render one
       <section> per category with its title + blurb visible.
       Section titles + blurbs mirror the live GHL marketing preview
       (Q3wpuESAo2QTQthwBZlZ) — keep them in sync with PMM.
    3. The outer `<section class="hl_wrapper">`'s `:class` binding
       on `$store.state.notification.showNotification` is dropped
       because no Vuex store exists in the preview repo. That binding
       only adds a CSS class for an unused notification banner — no
       visual change for the preview.

  Content data, copy, and per-card markup are still byte-identical to
  upstream — only the outer category wrapper changed. Diff against the
  spm-ts file to produce a clean upstream PR.
-->

<script lang="ts" setup>
  // No reactive state — page is fully static. Categories render as
  // stacked sections (no tab selection model). See top-of-file note #2.

  // ─── Content model ───────────────────────────────────────────────────
  // Static for v1. Move to API (e.g. /agency/addons) when product is ready.
  //
  // status drives card chrome:
  //   available → default purchase CTA
  //   active    → already in plan; CTA becomes "Manage", surface gets
  //               a subtle green check + pill
  // TODO(devs): replace static value with response from
  //             GET /agency/{id}/addons → { id, status }[]
  type Status = 'available' | 'active'

  type Card = {
    id: string
    icon: string
    iconKind: 'branding' | 'experts' | 'compliance' | 'certification'
    title: string
    tagline: string
    priceAmount: string
    pricePeriod: string
    cadence: 'Subscription' | 'One-time'
    benefits: (string | { html: string })[]
    cta: string
    status: Status
    learnMoreUrl: string
    // Verbatim Figma pill string for cards that offer an annual-plan
    // discount. e.g. "Annual Plan: $970 (Save 16%)". Renders as a
    // small green pill below the price. Omit when Figma has no pill.
    annualPlan?: string
    // Per-card fine print under the CTA. Defaults to "Cancel anytime
    // · No setup fees" when omitted. Override on cards where that
    // claim isn't true (e.g. HIPAA is permanent — see card data).
    finepoint?: string
  }

  type Section = {
    // Stable slug — also used as the section's DOM id so the
    // footer "Compare add-ons" deep link can scroll to it.
    id: 'branding' | 'experts' | 'compliance' | 'certification'
    title: string
    blurb: string
    layout: 'three' | 'two' | 'spotlight'
    cards: Card[]
  }

  /*
   * Copy framework — every card answers three questions:
   *   tagline  → WHY  (the outcome the buyer feels in their gut)
   *   title    → WHAT (the concrete thing they're buying)
   *   benefits → HOW  (each bullet tied to an outcome, not a feature)
   *
   * Rule of thumb: if a benefit reads like a spec sheet, rewrite it.
   * Buyer mindset is "what does this do for my agency?", not
   * "what's in the box?"
   */
  const sections: Section[] = [
    {
      id: 'branding',
      title: 'Custom Branding',
      // WHY for the whole category — one-liner, fits 800px at 14px.
      // Section title + blurb pulled from the live GHL marketing
      // preview (Q3wpuESAo2QTQthwBZlZ), May 25.
      blurb:
        'Customize more than just the main app with your branding.',
      layout: 'three',
      cards: [
        {
          id: 'wl-mobile',
          icon: 'mobile-alt',
          iconKind: 'branding',
          title: 'Whitelabel Mobile App',
          tagline:
            'Customize the HighLevel mobile app with your brand for the Apple & Android app stores!',
          priceAmount: '$497',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'Customize your login screen and app layout',
            'Choose your color palette',
            'Rearrange or hide native modules',
            'Create custom modules from your URLs',
            'Create a mobile experience unique to your brand',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/white-label-mobile',
        },
        {
          id: 'wl-zapier',
          icon: 'bolt',
          iconKind: 'branding',
          title: 'White-Label Zapier App',
          tagline:
            'Customize the LeadConnector Zapier app with your brand.',
          priceAmount: '$50',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'Go beyond "grey label"',
            'Tell your clients to find your brand in Zapier',
            'Build brand authority with your own branded Zaps',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/white-label-zapier',
        },
        {
          id: 'wl-portal',
          icon: 'th-large',
          iconKind: 'branding',
          title: 'White-Label Client Portal App',
          tagline:
            'Customize the Client Portal App with your branding.',
          priceAmount: '$50',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'White-label the portal with your brand, logo & domain',
            'Centralize reporting in one clean, client-facing hub',
            'Justify premium pricing with a polished experience',
            'Reduce support requests via self-service access',
            'Build trust & retention via real-time transparency',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/client-portal',
        },
      ],
    },
    {
      id: 'experts',
      title: 'Setup & Support',
      // Section title + blurb pulled from the live GHL marketing
      // preview (Q3wpuESAo2QTQthwBZlZ), May 25.
      blurb:
        'Streamline your setup and skip the line when support is needed.',
      // 'two' renders 1-col mobile → 2-col md+ — Advanced Setup and
      // Premium Support now sit on their own row together; Certified
      // Admin moved to its own section below (per live preview).
      layout: 'two',
      cards: [
        {
          id: 'advanced-setup',
          icon: 'tools',
          iconKind: 'experts',
          title: 'Advanced Account Setup',
          tagline:
            'Get started with our affordable Starter plan, perfect for small businesses.',
          priceAmount: '$1,000',
          pricePeriod: '',
          cadence: 'One-time',
          benefits: [
            '5 one-hour consulting sessions with HighLevel experts',
            'Dedicated HighLevel Agency Growth Advisor',
            'Done-with-you CRM and dashboard setup',
            'Live team teaching and software orientation',
            'Personalized business process implementation',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/advanced-setup',
        },
        {
          id: 'premium-support',
          icon: 'headset',
          iconKind: 'experts',
          title: 'Premium Support',
          tagline:
            'Scale your support with a dedicated rep, faster response times, and more peace of mind.',
          priceAmount: '$500',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'Dedicated Technical Account Manager',
            'Dedicated Private Slack Channel',
            'End-to-end issue resolution',
            'Expert guidance on platform best practices',
            'Quarterly Business Reviews',
          ],
          cta: 'Buy Now',
          // Demo: this card is already in the agency's plan to show the
          // 'active' state. Remove this and set status: 'available' to
          // see the default purchase chrome.
          status: 'active',
          learnMoreUrl: '/docs/add-ons/premium-support',
          annualPlan: 'Annual Plan: $5000 (Save 16%)',
        },
      ],
    },
    {
      id: 'compliance',
      title: 'Medical Compliance',
      // Section title + blurb pulled from the live GHL marketing
      // preview (Q3wpuESAo2QTQthwBZlZ), May 25. The blurb reads
      // generic on purpose — that's the upstream copy. Owner: PMM.
      blurb:
        'Take your HighLevel skills to the next level.',
      layout: 'spotlight',
      cards: [
        {
          id: 'hipaa',
          icon: 'shield-alt',
          iconKind: 'compliance',
          title: 'HIPAA Compliance',
          tagline:
            'Protect sensitive client health data with enterprise-grade security.',
          priceAmount: '$497',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'Stay compliant with HIPAA regulations',
            'Build patient trust with a fully compliant platform',
            'Serve healthcare clients confidently without risk',
            'Charge more for premium compliance',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/hipaa',
          // Override the default fine print to match the live marketing
          // page (preview URL Q3wpuESAo2QTQthwBZlZ). The pricing model
          // bundles all sub-accounts on the agency plan, so this
          // finepoint clarifies what the $497/mo actually covers.
          finepoint: 'Price covers all sub-accounts',
        },
      ],
    },
    {
      // Promoted to its own section May 25 to match the live GHL
      // marketing preview (Q3wpuESAo2QTQthwBZlZ), which surfaces
      // Certified Admin as a peer category, not an Expert Service.
      id: 'certification',
      title: 'Certified Admin',
      blurb:
        'Become certified and get hired to support other HighLevelers!',
      layout: 'spotlight',
      cards: [
        {
          id: 'certified-admin',
          icon: 'award',
          // 'certification' icon kind = violet gradient. Cert Admin
          // moved to its own peer section May 25, so the orange
          // 'experts' tile no longer made sense — it tied the card
          // visually back to Setup & Support. Violet reads as
          // "credential / prestige" without colliding with primary
          // blue (branding), orange (experts), or success green
          // (compliance). See iconKind CSS below.
          iconKind: 'certification',
          title: 'Certified Admin Program',
          // Grammar fix May 25: was "with flexible monthly." —
          // truncated sentence (no noun after "monthly"). Added
          // "billing" so the clause completes. Flag to PMM: the
          // canonical Figma + live preview also carries the truncated
          // version.
          tagline:
            'Get certified at your own pace with flexible monthly billing. Perfect for learning core HighLevel skills.',
          priceAmount: '$97',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'Get paid to support other HighLevelers',
            'Validate your expertise with an official certification',
            'Stand out as a trusted, certified professional',
            'Earn additional skills badges to stand out',
            // Grammar fix May 25: was "through with GHL credentials"
            // (stacked prepositions). Dropped "through". Flag to PMM.
            'Unlock career growth with GHL credentials',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/certification',
          annualPlan: 'Annual Plan: $970 (Save 16%)',
        },
      ],
    },
  ]

  const gridClassesFor = (layout: Section['layout']) => {
    if (layout === 'spotlight') return 'add-ons-grid add-ons-grid--spotlight'
    if (layout === 'two') return 'add-ons-grid add-ons-grid--two'
    return 'add-ons-grid add-ons-grid--three'
  }

  /*
   * Benefit text is mostly plain strings, but some need inline markup
   * (e.g. <abbr> for first-mention acronyms). Helpers below keep the
   * template readable. Markup is author-controlled (not user input)
   * so v-html is safe here — see WCAG / OWASP XSS guidance.
   */
  const isHtmlBenefit = (b: Card['benefits'][number]): b is { html: string } =>
    typeof b === 'object' && 'html' in b
  const benefitText = (b: Card['benefits'][number]) =>
    typeof b === 'string' ? b : ''

  const handleCta = (card: Card) => {
    // TODO(devs): wire to checkout / contact-sales modals.
    // For paid recurring add-ons → open IframeFunnelPaymentModal.
    // For high-touch / contact-sales → open a contact-sales modal.
    // eslint-disable-next-line no-console
    console.log('[AddOnsPage] CTA clicked:', card.id)
  }

  const handleHelp = () => {
    // TODO(devs): open the contact-sales modal used elsewhere in spm-ts,
    // or route to a /support form. Wired to the footer band CTA.
    // eslint-disable-next-line no-console
    console.log('[AddOnsPage] Talk to team clicked')
  }
</script>

<template>
  <!--
    Upstream wraps this in `<div>` containing <SideBarV2/>, <TopBar/>,
    this <section>, and <KickoffWidget/>. The chrome is now provided
    by <ShellV1> in the parent (src/pages/AddOnsPage.vue), so we emit
    only the page body. Class binding on $store.state.notification.show
    Notification is dropped — no Vuex in the preview repo.
  -->
  <section class="hl_wrapper">
    <!--
      Page convention copied from AccountSalesResources.vue and other
      spm-ts agency pages:
        hl_wrapper--inner       → 25px top/bottom padding (global)
        hl_agency-{slug}        → page-specific hook for overrides
        .container-fluid        → Bootstrap fluid, max-width unset
                                  via styles.patch.css → real full-width
                                  with the standard 15px gutter
    -->
    <!--
      Page background: a very gentle vertical gradient. Reads as flat
      gray on a quick scan but adds atmospheric depth on a pause.
      Borrowed from Linear / Stripe pricing surfaces.
    -->
    <section
      class="hl_wrapper--inner hl_agency hl_agency-add-ons"
      style="background: linear-gradient(180deg, var(--gray-50) 0%, var(--gray-50) 240px, var(--gray-50) 100%);"
    >
      <div class="container-fluid">
        <!--
          Inner padding wrapper. Bootstrap's .container-fluid has a 15px
          gutter which is too tight at modern viewport widths and
          crowds the right-aligned help link. .add-ons-content adds
          consistent breathing on top of the spm-ts page convention
          without breaking out of it.
        -->
        <div class="add-ons-content">
        <header class="add-ons-header">
          <h1 class="add-ons-header__title">Add-ons</h1>
          <p class="add-ons-header__subtitle">
            Upgrades that scale your brand, your team, and the
            markets you can sell into.
          </p>
        </header>

        <!--
          Tabs were removed (May 25, PM feedback): hiding Premium
          support and HIPAA behind a click reduced their visibility.
          Categories now render as stacked sections on one scroll —
          each with a visible H2 title + blurb so the page still
          reads as four deliberate groupings, not one flat list.
        -->
        <div class="add-ons-sections">
          <section
            v-for="cat in sections"
            :key="cat.id"
            :id="cat.id"
            class="add-ons-section"
          >
            <header class="add-ons-section__header">
              <h2 class="add-ons-section__title">{{ cat.title }}</h2>
              <p class="add-ons-section__blurb">{{ cat.blurb }}</p>
            </header>

            <div :class="gridClassesFor(cat.layout)">
              <article
                v-for="card in cat.cards"
                :key="card.id"
                class="add-on-card"
                :class="{ 'add-on-card--active': card.status === 'active' }"
              >
                <div class="add-on-card__top">
                  <div
                    class="add-on-card__icon"
                    :class="`add-on-card__icon--${card.iconKind}`"
                  >
                    <i :class="`fas fa-${card.icon}`" aria-hidden="true" />
                  </div>

                  <!--
                    "In your plan" pill — only chrome that sits in the
                    top-right slot now that marketing tags were retired.
                  -->
                  <span
                    v-if="card.status === 'active'"
                    class="add-on-card__status-pill"
                  >
                    <i class="fas fa-check" aria-hidden="true" />
                    In your plan
                  </span>
                </div>

                <h3 class="add-on-card__title">{{ card.title }}</h3>
                <p class="add-on-card__tagline">{{ card.tagline }}</p>

                <div class="add-on-card__price">
                  <span class="add-on-card__price-amount">
                    {{ card.priceAmount }}
                  </span>
                  <span
                    v-if="card.pricePeriod"
                    class="add-on-card__price-period"
                  >
                    {{ card.pricePeriod }}
                  </span>
                  <!--
                    Only surface cadence when it carries information.
                    "/mo" already signals subscription; showing
                    "Subscription" on every card was visual noise.
                  -->
                  <span
                    v-if="card.cadence === 'One-time'"
                    class="add-on-card__price-cadence"
                  >
                    One-time
                  </span>
                  <!--
                    Annual-plan savings pill, verbatim from Figma (Group
                    2131 on node 216:1218 and equivalents). Sits inline
                    on the right of the price row — same convention as
                    the One-time cadence pill so the card price line
                    reads consistently across all cards.
                  -->
                  <span
                    v-if="card.annualPlan"
                    class="add-on-card__annual-pill"
                  >
                    {{ card.annualPlan }}
                  </span>
                </div>

                <ul class="add-on-card__benefits">
                  <li
                    v-for="(benefit, i) in card.benefits"
                    :key="i"
                    class="add-on-card__benefit"
                  >
                    <i
                      class="fas fa-check add-on-card__check"
                      aria-hidden="true"
                    />
                    <!--
                      Authored markup — safe for v-html. Used only when
                      a benefit needs inline semantic markup like <abbr>.
                    -->
                    <span
                      v-if="isHtmlBenefit(benefit)"
                      v-html="benefit.html"
                    />
                    <span v-else>{{ benefitText(benefit) }}</span>
                  </li>
                </ul>

                <!--
                  "Learn more" link intentionally not rendered.
                  Per design review (May 25): the CTA already invites
                  the buyer to take the next step; an inline tertiary
                  link competed with the primary CTA for attention and
                  diluted the click target. `learnMoreUrl` is still on
                  the data model so docs can be linked from a tooltip,
                  modal, or future "Compare add-ons" surface without a
                  data migration.
                -->

                <!--
                  CTA hierarchy:
                    - active   = "Manage" — secondary outlined; active
                                 chrome is already carried by the card
                                 surface (green stripe + tint + pill)
                    - default  = secondary (outlined). Every other card.
                  All CTAs share one visual treatment now that marketing
                  tags (and therefore the "featured/primary" CTA variant)
                  have been retired.
                -->
                <button
                  v-if="card.status === 'active'"
                  type="button"
                  class="add-on-card__cta add-on-card__cta--manage"
                  @click="handleCta(card)"
                >
                  <span class="add-on-card__cta-label">Manage</span>
                  <i
                    class="fas fa-arrow-right add-on-card__cta-arrow"
                    aria-hidden="true"
                  />
                </button>
                <button
                  v-else
                  type="button"
                  class="add-on-card__cta"
                  @click="handleCta(card)"
                >
                  <span class="add-on-card__cta-label">{{ card.cta }}</span>
                  <i
                    class="fas fa-arrow-right add-on-card__cta-arrow"
                    aria-hidden="true"
                  />
                </button>

                <!--
                  Always rendered (no v-if) so the CTA bottom edge
                  aligns across all cards in a row, regardless of
                  status. Copy applies to both available and active
                  subscriptions: "Cancel anytime" is true after
                  purchase too.
                -->
                <p class="add-on-card__finepoint">
                  {{ card.finepoint || 'Cancel anytime · No setup fees' }}
                </p>
              </article>
            </div>
          </section>
        </div>

        <!--
          Flex spacer: pushes the closing band to the bottom of the
          page when content is short, but maintains a 56px floor so
          it never sits flush against the cards.
        -->
        <div class="add-ons-footer-spacer" aria-hidden="true" />

        <!--
          Closing affordance: gives buyers who didn't see what they
          need an exit ramp instead of bouncing. Solves the empty-
          space-below-cards problem honestly (not by stretching
          cards). Borrowed from Stripe pricing's "Need something
          custom?" footer band.
        -->
        <aside class="add-ons-footer-band">
          <div class="add-ons-footer-band__text">
            <h3 class="add-ons-footer-band__title">
              Don’t see what you need?
            </h3>
            <p class="add-ons-footer-band__copy">
              Tell us what your agency is trying to do — we’ll
              point you to the right add-on or build a custom plan.
            </p>
          </div>
          <a
            href="#"
            class="add-ons-footer-band__cta"
            @click.prevent="handleHelp"
          >
            Talk to our team
            <i class="fas fa-arrow-right" aria-hidden="true" />
          </a>
        </aside>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
  /*
   * All colors route through HighRise CSS custom properties — these
   * are defined in @platform-ui/highrise/dist/style.css and live on
   * the document root once HR is mounted. This means future HR
   * design refreshes (gray ramp shifts, primary color updates, etc.)
   * propagate to this page automatically.
   *
   * Token map (for human readers):
   *   gray-50…900   → page surface, borders, body text, headings
   *   primary-50…600 → branding icon tile + focus rings
   *   blue-800      → primary CTA hover (HR convention: dark hover)
   *   success-50…700 → "In your plan" state, benefit check marks,
   *                     active-card stripe + tint, annual-plan pill bg
   *   warning-200…700 → "One-time" cadence pill
   *   orange-50…700   → setup & support icon tile gradient
   *   violet-50…700   → certified admin icon tile gradient
   *
   * Box-shadow rgba() values stay literal — HR doesn't expose RGB
   * channels for shadow tinting; this is the standard pattern.
   */

  /*
   * Padding stack:
   *   .hl_wrapper--inner  → 25px top/bottom (global spm-ts convention)
   *   .container-fluid    → 15px left/right gutter (Bootstrap)
   *   .add-ons-content    → adds top + sides + bottom (fills the tight
   *                         Bootstrap gutter on modern viewports)
   * Net: ~89px top, ~31px sides. Top is intentionally heavier than
   * sides because the topbar above visually competes for that space —
   * the page header needs to breathe past it.
   *
   * Topbar (fixed, 52px) leaves zero gap once content scrolls — we add
   * 64px instead of 32px so the page H1 always has a confident visual
   * separation from the chip cluster, and the scroll-under transition
   * reads as "content disappearing behind topbar" rather than
   * "content clipped at boundary".
   *
   * The page is a flex column with min-height pinned to the viewport
   * so the footer band can push to the bottom (margin-top: auto)
   * instead of sitting awkwardly right under short content. 84px
   * accounts for the topbar height in spm-ts.
   */
  .add-ons-content {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 84px);
    padding: 64px 16px 48px;
  }

  /* ── Header ───────────────────────────────────────────────────────── */
  /*
   * Header → Tabs group separator (Shopify Polaris ~32px,
   * Atlassian ~24-32px). Wider gaps make tabs feel orphaned.
   */
  .add-ons-header {
    margin-bottom: 32px;
  }

  .add-ons-header__title {
    margin: 0 0 6px;
    font-size: 28px;
    font-weight: 700;
    color: var(--gray-900);
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .add-ons-header__subtitle {
    margin: 0;
    max-width: 640px;
    font-size: 14px;
    color: var(--gray-600);
    line-height: 1.5;
  }

  /* ── Sections (stacked, no tabs) ──────────────────────────────────── */
  /*
   * Gap between category sections. ~40px is the Stripe / Linear
   * pricing convention for "distinct group, same page" — large
   * enough to read as a section break, small enough not to feel
   * like a new page. Header → blurb → cards inside one section
   * stay tight (8 / 16px) so the section reads as a unit.
   */
  .add-ons-sections {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 8px;
  }

  .add-ons-section__header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    max-width: 800px;
  }

  /*
   * Section title — slightly smaller and lighter than the H1 so
   * the page header still anchors. 18px / 600 is the HighRise
   * "section heading" size; matches Account → Sales Resources
   * and Settings → Integrations.
   */
  .add-ons-section__title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-900);
    line-height: 1.4;
    letter-spacing: -0.005em;
  }

  .add-ons-section__blurb {
    margin: 0;
    font-size: 14px;
    color: var(--gray-600);
    line-height: 1.5;
  }

  /* ── Grid ─────────────────────────────────────────────────────────── */
  .add-ons-grid {
    display: grid;
    gap: 16px;
  }
  .add-ons-grid--three     { grid-template-columns: repeat(1, 1fr); }
  .add-ons-grid--two       { grid-template-columns: repeat(1, 1fr); }
  /*
   * Spotlight = single-card category (Medical Compliance and
   * Certified Admin both use this layout). Previously stretched to
   * 720px which was ~2× a normal card and broke the scan rhythm of
   * the grids above. Now the card renders at the SAME width as one
   * card from the multi-card row above, left-anchored. Width-by-
   * breakpoint matches the math of the three-grid (50% at md, ~33%
   * at lg) so the spotlight card reads as "one card from the same
   * family", not "the lonely big card".
   */
  .add-ons-grid--spotlight { grid-template-columns: 1fr; }
  .add-ons-grid--spotlight > .add-on-card { justify-self: start; width: 100%; }

  @media (min-width: 768px) {
    .add-ons-grid--two   { grid-template-columns: repeat(2, 1fr); }
    .add-ons-grid--three { grid-template-columns: repeat(2, 1fr); }
    .add-ons-grid--spotlight > .add-on-card { width: calc(50% - 8px); }
  }
  @media (min-width: 1100px) {
    .add-ons-grid--three { grid-template-columns: repeat(3, 1fr); }
    /*
     * --two at lg+ reuses the SAME 3-column track as --three so its
     * cards render at one grid-card width (~33% of the row, not 50%).
     * Two cards naturally occupy columns 1+2 with column 3 left empty,
     * matching the same "card from the same family" treatment as the
     * spotlight layout below. Without this, Setup & Support cards
     * visually swelled compared to the 3-up rows above and broke
     * the page's scan rhythm.
     */
    .add-ons-grid--two       { grid-template-columns: repeat(3, 1fr); }
    .add-ons-grid--spotlight > .add-on-card { width: calc((100% - 32px) / 3); }
  }

  /* ── Card ─────────────────────────────────────────────────────────── */
  /*
   * overflow: hidden clips the active-card accent stripe (top edge,
   * 3px gradient on --add-on-card--active) to the rounded corners
   * cleanly. box-shadow + translateY for hover are unaffected —
   * shadows render outside the box and ignore overflow.
   */
  .add-on-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    overflow: hidden;
    padding: 24px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
    transition: box-shadow 0.15s ease, transform 0.15s ease,
      border-color 0.15s ease;
  }
  .add-on-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -8px rgba(16, 24, 40, 0.1),
      0 4px 8px -4px rgba(16, 24, 40, 0.04);
    border-color: var(--gray-300);
  }

  /*
   * Active state — agency already owns this add-on. Subtle green tint
   * + green border tells the eye instantly "this is yours" without a
   * hard "owned" badge that would visually equal the marketing tags.
   * Hover lift is dampened (it's not a target).
   */
  .add-on-card--active {
    background:
      linear-gradient(180deg, var(--success-50) 0%, #ffffff 120px),
      #ffffff;
    border-color: var(--success-200);
  }
  .add-on-card--active:hover {
    transform: translateY(-1px);
    border-color: var(--success-300);
    box-shadow: 0 6px 12px -4px rgba(16, 24, 40, 0.06);
  }
  .add-on-card--active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--success-500) 0%, var(--success-400) 100%);
  }

  .add-on-card__status-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--success-50);
    color: var(--success-700);
    border: 1px solid var(--success-200);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .add-on-card__status-pill i { font-size: 9px; }

  .add-on-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
    gap: 12px;
  }

  /*
   * Icon tiles: soft gradients instead of flat fills. Reads as a
   * brand-aware tile, not a coloured square. Subtle inner highlight
   * gives the surface a touch of dimension. (Shopify Polaris pattern.)
   */
  .add-on-card__icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    font-size: 18px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
  .add-on-card__icon--branding {
    background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
    color: var(--primary-600);
  }
  .add-on-card__icon--experts {
    background: linear-gradient(135deg, var(--orange-50) 0%, var(--orange-200) 100%);
    color: var(--orange-700);
  }
  .add-on-card__icon--compliance {
    background: linear-gradient(135deg, var(--success-50) 0%, var(--success-200) 100%);
    color: var(--success-700);
  }
  /*
   * Certified Admin tile — violet ramp. Distinct from the other three
   * iconKinds (primary blue / orange / success green) and reads as
   * "credential / prestige" rather than "training" (which orange would
   * have implied). Added May 25 when Cert Admin was promoted to its
   * own section.
   */
  .add-on-card__icon--certification {
    background: linear-gradient(135deg, var(--violet-50) 0%, var(--violet-200) 100%);
    color: var(--violet-700);
  }

  .add-on-card__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-900);
    letter-spacing: -0.005em;
  }

  .add-on-card__tagline {
    margin: 4px 0 16px;
    font-size: 13px;
    color: var(--gray-600);
    line-height: 1.45;
  }

  .add-on-card__price {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin: 0 0 16px;
  }
  .add-on-card__price-amount {
    font-size: 28px;
    font-weight: 700;
    color: var(--gray-900);
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .add-on-card__price-period {
    font-size: 13px;
    color: var(--gray-600);
  }
  /*
   * Only renders when cadence === "One-time" — the meaningful case.
   * Subscription is implied by the "/mo" period; a redundant pill on
   * every card was visual debt (Nielsen #8 — minimalist design).
   */
  .add-on-card__price-cadence {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    background: var(--orange-50);
    color: var(--warning-700);
    border: 1px solid var(--warning-200);
    letter-spacing: 0.01em;
  }

  /*
   * Annual-plan pill — Figma uses a bright pure green (#37D334) with
   * black text. We map to a token-driven darker green (--success-700)
   * so 11px/600 WHITE text passes WCAG 2.1 AA contrast (≈ 5.5:1).
   * White on the lighter --success-500 (#12b76a) only hit ~2.5:1 and
   * would have failed AA — corrected May 25.
   *
   * Positioning: lives inside .add-on-card__price (flex row) and
   * uses margin-left: auto to push to the far right — same trick
   * the One-time cadence pill uses. Cards never carry both pills
   * (One-time products don't have annual plans), so they don't
   * fight for the right slot.
   */
  .add-on-card__annual-pill {
    margin-left: auto;
    padding: 3px 12px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.4;
    color: #ffffff;
    background: var(--success-700);
    border-radius: 999px;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .add-on-card__benefits {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1; /* push CTA to the bottom */
  }
  .add-on-card__benefit abbr {
    text-decoration: underline dotted;
    cursor: help;
    text-underline-offset: 2px;
  }

  .add-on-card__benefit {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: var(--gray-700);
    line-height: 1.4;
  }
  /*
   * Checkmark color: --success-600 (#039855) instead of --success-500
   * (#12b76a). The 600 step pops slightly more against pure white at
   * 11px without changing the semantic — still green, still part of
   * the success ramp. Small letterform / icon at this size benefits
   * from the extra density.
   */
  .add-on-card__check {
    color: var(--success-600);
    font-size: 11px;
    margin-top: 4px;
    flex-shrink: 0;
  }

  /* ── CTA ──────────────────────────────────────────────────────────── */
  /*
   * Default CTA = secondary (outlined). Quiet by default so the title,
   * price, and benefits get the first read. The primary (filled) variant
   * is reserved for cards product is recommending — buyers' eyes land
   * on those cards naturally instead of fighting through 7 identical
   * loud buttons. (Visual hierarchy through restraint.)
   *
   * The arrow icon slides in on hover — small tactile microinteraction
   * borrowed from Stripe / Linear. Signals "this leads somewhere"
   * without being announced when the user hasn't expressed intent.
   */
  .add-on-card__cta {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border: 1px solid var(--gray-300);
    border-radius: 8px;
    background: #ffffff;
    color: var(--gray-900);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease,
      transform 0.1s ease;
  }
  .add-on-card__cta:hover {
    background: var(--gray-50);
    border-color: var(--gray-400);
  }
  .add-on-card__cta:active { transform: translateY(1px); }
  .add-on-card__cta:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /*
   * "Manage" CTA on active cards uses the SAME secondary outlined
   * treatment as default purchase CTAs. The active state is already
   * communicated by the card surface (green tint + top stripe + "In
   * your plan" pill) — coloring the CTA green too was redundant
   * signaling and broke button-color consistency across the page.
   * Class kept so devs can swap behaviour later if needed.
   */
  .add-on-card__cta--manage { /* inherits .add-on-card__cta defaults */ }

  .add-on-card__cta-arrow {
    font-size: 11px;
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .add-on-card__cta:hover .add-on-card__cta-arrow,
  .add-on-card__cta:focus-visible .add-on-card__cta-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /*
   * Pricing transparency — quietly answers "what am I committing to?"
   * before the buyer has to dig into terms. Text-only, light gray.
   * Standard reassurance pattern (HubSpot, Linear, Atlassian).
   */
  .add-on-card__finepoint {
    margin: 8px 0 0;
    font-size: 11px;
    color: var(--gray-500);
    text-align: center;
    letter-spacing: 0.01em;
  }
  /* Reduce-motion users still see the arrow appear, just no slide */
  @media (prefers-reduced-motion: reduce) {
    .add-on-card__cta-arrow,
    .add-on-card,
    .add-on-card__cta {
      transition: none !important;
    }
  }

  /* ── Footer band ──────────────────────────────────────────────────── */
  /*
   * Closing affordance after the cards. Two jobs:
   *   1. Solve the "empty space below cards on tall viewports" problem
   *      honestly (don't stretch cards, don't fake content).
   *   2. Catch buyers who scrolled and didn't see their need — give
   *      them an exit ramp instead of a bounce.
   * Quiet visual treatment so it doesn't compete with the cards.
   */
  /*
   * Spacer eats remaining vertical space in the flex column so the
   * band gets pushed to the bottom. min-height ensures a comfortable
   * floor (56px) when content already fills the viewport — the band
   * never sits flush against the cards above.
   */
  .add-ons-footer-spacer {
    flex: 1;
    min-height: 56px;
  }

  .add-ons-footer-band {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 20px 24px;
    background: #ffffff;
    border: 1px dashed var(--gray-300);
    border-radius: 12px;
  }
  /* Stack on narrow viewports so the CTA doesn't get squeezed off */
  @media (max-width: 640px) {
    .add-ons-footer-band {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .add-ons-footer-band__cta {
      width: 100%;
      justify-content: center;
    }
  }
  .add-ons-footer-band__text { flex: 1; min-width: 0; }
  .add-ons-footer-band__title {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-900);
    letter-spacing: -0.005em;
  }
  .add-ons-footer-band__copy {
    margin: 0;
    font-size: 13px;
    color: var(--gray-600);
    line-height: 1.5;
  }
  /*
   * Quiet, outlined CTA — matches the card CTA pattern. The band is
   * a tertiary affordance, so its action should be quiet, not loud.
   * Hierarchy on the page is intentionally flat now that marketing
   * tags were retired: every CTA shares one outlined treatment so no
   * card visually outranks another. Active cards swap "Buy now" for
   * "Manage" but keep the same chrome.
   */
  .add-ons-footer-band__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 16px;
    border: 1px solid var(--gray-300);
    border-radius: 8px;
    background: #ffffff;
    color: var(--gray-700);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    flex-shrink: 0;
    transition: background 0.15s ease, border-color 0.15s ease,
      color 0.15s ease;
  }
  .add-ons-footer-band__cta:hover {
    background: var(--gray-50);
    border-color: var(--gray-400);
    color: var(--gray-900);
  }
  /*
   * Keyboard focus ring — matches the card CTA pattern so the page
   * has one consistent focus treatment across all interactive
   * elements. Without this, the `<a>` only got the browser default
   * outline which was barely visible against the dashed border.
   */
  .add-ons-footer-band__cta:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }
  .add-ons-footer-band__cta i {
    font-size: 11px;
    transition: transform 0.15s ease;
  }
  .add-ons-footer-band__cta:hover i {
    transform: translateX(2px);
  }
</style>
