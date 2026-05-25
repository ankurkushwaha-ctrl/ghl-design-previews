<!--
  AddOnsPage.vue — inner page (no shell chrome)
  ─────────────────────────────────────────────────────────────────────────
  Source-of-truth: spm-ts/src/pmd/pages/agency/AddOnsPage.vue
  (an unmerged spm-ts PR — see archive/spm-ts-add-ons-pr/).

  Differences from upstream are deliberate and minimal:
    1. The shell chrome (<SideBarV2>, <TopBar>, <KickoffWidget>) is
       stripped — the parent <ShellV1> wraps this page externally,
       same pattern as src/pages/SubAccountsPage.vue → Locations.vue.
    2. Tabs removed per PM feedback (May 25): all three categories
       now render inline as stacked sections on a single scrollable
       page so Premium support and HIPAA are visible without a click.
       When porting upstream, drop HLTabs/HLTabPane and render one
       <section> per category with its title + blurb visible.
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
  // Tag types are intentionally ABOUT the tag's role, not the category:
  //   highlight  → "Most popular" / "Hands-on"        — neutral/warm so it
  //                doesn't fight the category icon color
  //   fresh      → "New cohort"                       — green accent
  //   success    → "BAA included"                     — green checkmark vibe
  type TagType = 'highlight' | 'fresh' | 'success'

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
    iconKind: 'branding' | 'experts' | 'compliance'
    tag?: { label: string; type: TagType; hint?: string }
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
    id: 'branding' | 'experts' | 'compliance'
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
      title: 'White-label apps',
      // WHY for the whole category — one-liner, fits 800px at 14px.
      // Section titles kept as the prototype originals (not Figma's
      // "Custom Branding") because the user-facing category labels
      // organize the page better at-a-glance.
      blurb:
        'Put your brand on every client touchpoint — apps, automations, and portals.',
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
            'Monthly platform updates and improvements',
            'Custom branded mobile app experience',
            'Android app deployment',
            'iOS app deployment',
            'Ongoing maintenance and support',
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
            '5 one-hour consulting sessions with HighLevel experts',
            'Dedicated HighLevel Agency Growth Advisor',
            'Done-with-you CRM and dashboard setup',
            'Live team teaching and software orientation',
            'Personalized business process implementation',
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
            'Customize the LeadConnector Zapier app with your brand.',
          priceAmount: '$50',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            '5 one-hour consulting sessions with HighLevel experts',
            'Dedicated HighLevel Agency Growth Advisor',
            'Done-with-you CRM and dashboard setup',
            'Live team teaching and software orientation',
            'Personalized business process implementation',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/client-portal',
        },
      ],
    },
    {
      id: 'experts',
      title: 'Expert services',
      blurb:
        'Bring HighLevel experts in to set you up, support your day-to-day, or train your team.',
      layout: 'three',
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
            'Priority 24/7 support access',
            'Dedicated account manager',
            'Faster response times (under 1 hour)',
            'Monthly strategy calls',
            'Custom training sessions',
          ],
          cta: 'Buy Now',
          // Demo: this card is already in the agency's plan to show the
          // 'active' state. Remove this and set status: 'available' to
          // see the default purchase chrome.
          status: 'active',
          learnMoreUrl: '/docs/add-ons/premium-support',
          annualPlan: 'Annual Plan: $5000 (Save 16%)',
        },
        {
          id: 'certified-admin',
          icon: 'award',
          iconKind: 'experts',
          title: 'Certified Admin Program',
          tagline:
            'Get certified at your own pace with flexible monthly. Perfect for learning core HighLevel skills.',
          priceAmount: '$97',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            'Digital Badge(s) of Excellence',
            'Access to Private Communities',
            'HighLevel Certified Directory Inclusion',
            'Exclusive Invites',
            'And so much more!',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/certification',
          annualPlan: 'Annual Plan: $970 (Save 16%)',
        },
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance',
      blurb:
        'Open up regulated markets — close healthcare deals you\'d lose today over compliance.',
      layout: 'spotlight',
      cards: [
        {
          id: 'hipaa',
          icon: 'shield-alt',
          iconKind: 'compliance',
          title: 'HIPAA Compliance',
          tagline:
            'Stay compliant with industry medical regulations and standards.',
          priceAmount: '$97',
          pricePeriod: '/mo',
          cadence: 'Subscription',
          benefits: [
            '5 one-hour consulting sessions with HighLevel experts',
            'Dedicated HighLevel Agency Growth Advisor',
            'Done-with-you CRM and dashboard setup',
            'Live team teaching and software orientation',
            'Personalized business process implementation',
          ],
          cta: 'Buy Now',
          status: 'available',
          learnMoreUrl: '/docs/add-ons/hipaa',
          // Override the default fine print: HIPAA "cannot be cancelled,
          // refunded, removed, or downgraded once enabled" per the help
          // article. Figma is silent on this finepoint; the override is
          // kept because the default "Cancel anytime" line would be a
          // factual error, not invented marketing copy.
          finepoint: 'BAA included · Permanent once activated',
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
          reads as three deliberate groupings, not one flat list.
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
                :class="{
                  'add-on-card--featured':
                    card.tag?.type === 'highlight' &&
                    card.status !== 'active',
                  'add-on-card--active': card.status === 'active',
                }"
                :aria-label="
                  card.tag?.type === 'highlight'
                    ? `Recommended: ${card.title}`
                    : undefined
                "
              >
                <div class="add-on-card__top">
                  <div
                    class="add-on-card__icon"
                    :class="`add-on-card__icon--${card.iconKind}`"
                  >
                    <i :class="`fas fa-${card.icon}`" aria-hidden="true" />
                  </div>

                  <!--
                    "Active" status takes precedence over marketing tags
                    because it answers the buyer's first question:
                    "do I already have this?"
                  -->
                  <span
                    v-if="card.status === 'active'"
                    class="add-on-card__status-pill"
                  >
                    <i class="fas fa-check" aria-hidden="true" />
                    In your plan
                  </span>

                  <!--
                    Tags with hints render as focusable buttons with a
                    proper tooltip (role="tooltip" + aria-describedby).
                    Mouse hover and keyboard focus both reveal the hint.
                  -->
                  <button
                    v-else-if="card.tag && card.tag.hint"
                    type="button"
                    class="add-on-card__tag add-on-card__tag--button"
                    :class="`add-on-card__tag--${card.tag.type}`"
                    :aria-describedby="`tag-hint-${card.id}`"
                  >
                    {{ card.tag.label }}
                    <i
                      class="fas fa-info-circle add-on-card__tag-hint"
                      aria-hidden="true"
                    />
                    <span
                      :id="`tag-hint-${card.id}`"
                      role="tooltip"
                      class="add-on-card__tag-tooltip"
                    >
                      {{ card.tag.hint }}
                    </span>
                  </button>

                  <span
                    v-else-if="card.tag"
                    class="add-on-card__tag"
                    :class="`add-on-card__tag--${card.tag.type}`"
                  >
                    {{ card.tag.label }}
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
                    - active   = disabled "In plan" surface (manage)
                    - primary  = filled dark, only on featured cards
                    - default  = secondary (outlined). Most cards.
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
                  :class="{
                    'add-on-card__cta--primary':
                      card.tag?.type === 'highlight',
                  }"
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
   *   primary-600   → primary CTAs, "Learn more" links
   *   blue-800      → primary CTA hover (HR convention: dark hover)
   *   success-50…700 → "In your plan" state, BAA tag, check marks
   *   warning-50…800 → featured card stripe + tint, popularity tags
   *   orange-50…700  → expert services icon tile gradient
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
   * Net: ~57px top, ~31px sides. Top is intentionally heavier than
   * sides because the topbar above visually competes for that space —
   * the page header needs to breathe past it.
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
    padding: 32px 16px 48px;
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
  .add-ons-grid--spotlight { grid-template-columns: 1fr; max-width: 720px; }

  @media (min-width: 768px) {
    .add-ons-grid--two   { grid-template-columns: repeat(2, 1fr); }
    .add-ons-grid--three { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1100px) {
    .add-ons-grid--three { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── Card ─────────────────────────────────────────────────────────── */
  /*
   * overflow: hidden clips the featured-card accent stripe to the
   * border-radius cleanly. box-shadow + translateY for hover are
   * unaffected (shadows render outside the box and ignore overflow).
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
    transition: box-shadow 0.2s ease, transform 0.2s ease,
      border-color 0.2s ease;
  }
  .add-on-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -8px rgba(16, 24, 40, 0.1),
      0 4px 8px -4px rgba(16, 24, 40, 0.04);
    border-color: var(--gray-300);
  }

  /*
   * Featured cards (Most popular / Hands-on) get a barely-there warm
   * tint so the eye lands on them naturally — visual reinforcement of
   * the textual "highlight" tag, not a replacement for it. Subtle
   * accent line at the top edge adds a polished detail without
   * shouting. (Linear / Notion feature-card pattern.)
   */
  .add-on-card--featured {
    background:
      linear-gradient(180deg, var(--warning-50) 0%, #ffffff 120px),
      #ffffff;
    border-color: var(--warning-200);
  }
  /*
   * Accent stripe sits flush at the top of the card. The card's
   * overflow: hidden + border-radius clips it cleanly to the rounded
   * corners — no manual border-radius needed on the stripe itself.
   */
  .add-on-card--featured::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--warning-500) 0%, var(--warning-400) 100%);
  }
  .add-on-card--featured:hover {
    border-color: var(--warning-400);
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
   * Tag colors are intentionally NOT category-aligned. The icon owns
   * the category color; the tag is a meta-signal (popularity, freshness,
   * trust). Using a separate palette stops the tag and icon from
   * fighting for the same eye (Gestalt — figure/ground).
   */
  .add-on-card__tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  /* Neutral warm — popularity/recommended, doesn't fight category color */
  .add-on-card__tag--highlight {
    background: var(--warning-100);
    color: var(--warning-800);
  }
  /* Green — newness/recency */
  .add-on-card__tag--fresh {
    background: var(--success-50);
    color: var(--success-700);
  }
  /* Green w/ outline — trust/inclusion ("BAA included") */
  .add-on-card__tag--success {
    background: var(--success-50);
    color: var(--success-700);
    border: 1px solid var(--success-200);
  }
  .add-on-card__tag-hint { font-size: 10px; opacity: 0.7; }

  /*
   * Tags with hints render as <button> for keyboard focusability.
   * Reset the default button chrome so it looks identical to a span tag.
   */
  .add-on-card__tag--button {
    appearance: none;
    cursor: help;
    position: relative;
    font-family: inherit;
  }
  .add-on-card__tag--button:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /*
   * Accessible tooltip — hidden by default, shown on hover or
   * keyboard focus. role="tooltip" + aria-describedby on the
   * trigger button means screen readers announce it on focus.
   * Mouse + keyboard users both reach it.
   */
  .add-on-card__tag-tooltip {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 10;
    width: 240px;
    padding: 10px 12px;
    background: var(--gray-900);
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0;
    text-transform: none;
    border-radius: 8px;
    box-shadow: 0 8px 16px -4px rgba(16, 24, 40, 0.16);
    white-space: normal;
    opacity: 0;
    transform: translateY(-4px);
    pointer-events: none;
    transition: opacity 0.15s ease, transform 0.15s ease;
  }
  .add-on-card__tag-tooltip::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 12px;
    width: 10px;
    height: 10px;
    background: var(--gray-900);
    transform: rotate(45deg);
    border-radius: 2px;
  }
  .add-on-card__tag--button:hover .add-on-card__tag-tooltip,
  .add-on-card__tag--button:focus-visible .add-on-card__tag-tooltip {
    opacity: 1;
    transform: translateY(0);
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
   * black text on a fully rounded pill. Closest semantic token in this
   * file is --success-500 (#12b76a): same family the green stripe and
   * benefit checks already use. White text per the latest Figma comp
   * for AA contrast on the saturated green.
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
    background: var(--success-500);
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
  .add-on-card__check {
    color: var(--success-500);
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
    transition: background 0.2s ease, border-color 0.2s ease,
      transform 0.05s ease;
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
   * Primary CTA uses HighRise's --primary-600 — the brand blue.
   * Black/navy isn't a brand color in spm-ts; the production
   * .btn-primary class uses HighLevel blue too. This also matches
   * the "Learn more" link color, so primary action + navigation
   * share one brand voice.
   */
  .add-on-card__cta--primary {
    background: var(--primary-600);
    border-color: var(--primary-600);
    color: #ffffff;
  }
  .add-on-card__cta--primary:hover {
    background: var(--blue-800);
    border-color: var(--blue-800);
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
    transition: opacity 0.2s ease, transform 0.2s ease;
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
   * Quiet, outlined CTA — matches the secondary card CTA pattern.
   * The band is a tertiary affordance, so its action should be the
   * least loud thing on the page, not the loudest. Hierarchy is:
   *   primary filled  → featured card CTAs
   *   secondary outlined → default card CTAs + this band CTA
   *   tertiary text  → "Compare add-ons" header link
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
  .add-ons-footer-band__cta i {
    font-size: 11px;
    transition: transform 0.15s ease;
  }
  .add-ons-footer-band__cta:hover i {
    transform: translateX(2px);
  }
</style>
