# Add-Ons — Dev Handoff

> **Live preview:** https://ghl-design-previews.vercel.app/add-ons
> **Figma:** https://www.figma.com/design/LGXAERHnZGj65vx4urTTF5/Add-Ons

---

## What this is

A production-ready agency **Add-Ons** page that replaces the legacy
`MarketplaceFrame.vue` iframe with a native Vue surface. Three category
sections — Custom Branding, Setup & Support, Medical Compliance —
render inline on one scrollable page (seven cards total). Cards
already in the agency's plan render in an "active" state with a
green stripe and **Manage** CTA.

> **Copy source-of-truth (May 25, per Marketing):** card titles,
> taglines, benefits, CTAs, prices, and section titles/blurbs come
> from the **"Marketplace In-App Redesign"** Figma file. The grid
> screen (`216:1218`) was used for the first pass; per-product
> taglines and benefit lists were then re-sourced from the
> "Marketplace Landing - working" page (`93:907`, `96:246`) and the
> "Marketplace subpages" page (`27:1491` certification, `14:153`
> mobile, etc.) where canonical product-specific copy lives.
> Earlier prototype strings were invented and have been replaced.
> Flag any future copy edits against that Figma file, not this
> Vue component.

### Cards still on placeholder copy — Marketing to resolve

The Figma file does not contain a unique product-specific string
for the following card fields. The current text is placeholder
copy that bleeds across multiple cards in Figma itself, and per
the "Figma copy only" rule we left it in place rather than
inventing or paraphrasing. Marketing needs to write canonical
copy for these:

| Card | Field | Current (placeholder bleed) | Why unresolved |
| ---- | ----- | --------------------------- | -------------- |
| `wl-portal` | `tagline` | "Customize the LeadConnector Zapier app with your brand." | Zapier copy duplicated on the Client Portal card in every Figma frame; no Client-Portal-specific tagline exists anywhere in the file |
| `wl-portal` | `benefits` | 5 generic consulting bullets ("5 one-hour consulting sessions…" etc.) | No per-product benefit list exists for Client Portal in any Figma frame or subpage |
| `wl-zapier` | `benefits` | 5 generic consulting bullets | The Zapier subpage (`25:728`) exists but its benefit list is bled from the mobile-app subpage; no Zapier-specific list in Figma |
| `hipaa` | `benefits` | 5 generic consulting bullets | No HIPAA-specific benefit list exists anywhere in the file |
| `advanced-setup` | `tagline` | "Get started with our affordable Starter plan, perfect for small businesses." | Off-topic but matches grid Figma; the dedicated subpage (`27:1873`) has a longer Advanced-Setup-specific paragraph, but it opens with a typo ("f you're ready") and is too long for a card. Left grid copy in place. |

> **Changed May 25 per PM feedback:** the original design used a tabbed
> layout. Tabs were removed because hiding Premium support (Expert
> services) and HIPAA (Compliance) behind a click reduced their
> visibility. All sections now render on one scroll.

The page lives as a single self-contained Vue file (~1,260 lines incl.
content data + scoped CSS) — designed for a clean lift into
`spm-ts/src/pmd/pages/agency/AddOnsPage.vue`. One file copies almost
verbatim; the only changes on the way upstream are restoring the
shell chrome wrapper and moving copy into i18n keys.

---

## Architecture

```
src/pages/AddOnsPage.vue                       ← thin route wrapper (22 lines, ShellV1 + inner page)
src/shells/ShellV1/add-ons/
  AddOnsPage.vue                               ← real page (template + script + scoped styles)
```

No state machine. No reactive state at all — the page is fully static.
Card content is a static `Section[]` array at the top of
`<script setup>` — easy to swap for an API response when product is
ready. Each `Section` renders as a `<section id="{slug}">` so the
upstream "Compare add-ons" deep-link can scroll to a category anchor.

---

## File inventory

### Copy verbatim, wrap with the upstream chrome

This is the entire page — single file lift.

| File                                    | Lines | Purpose                                                            |
| --------------------------------------- | ----- | ------------------------------------------------------------------ |
| `src/shells/ShellV1/add-ons/AddOnsPage.vue` | 1,258 | Full page — `Section[]` content data + template + scoped styles    |

**What changes on the way upstream:**

```diff
<!-- Restore the upstream chrome that this preview repo strips -->
- <section class="hl_wrapper">
+ <div :class="{ 'show-notification': $store.state.notification.showNotification }">
+   <SideBarV2 />
+   <TopBar />
+   <section class="hl_wrapper">
     … existing page body …
+   </section>
+   <KickoffWidget />
+ </div>
```

No HighRise imports to wire — the page no longer uses `HLTabs/HLTabPane`
or any other HighRise component. Plain semantic `<section>` elements
with scoped styles drive the layout.

The top-of-file comment in `src/shells/ShellV1/add-ons/AddOnsPage.vue`
lists every preview-only deviation — that comment is your full porting
log.

### Discard

| File                              | Lines | Why                                                                              |
| --------------------------------- | ----- | -------------------------------------------------------------------------------- |
| `src/pages/AddOnsPage.vue` (this repo's wrapper) | 22    | Preview-only — its job is to mount the inner page inside `<ShellV1>` for Vercel. |

In `spm-ts`, the inner page IS the route file. There is no second wrapper.

---

## i18n keys

All visible copy lives in the page right now. Move it under
`agency.addOns.*` in the upstream locale file before merge —
Option B (scoped ESLint disable) is acceptable for a fast first
PR, but file a follow-up ticket.

```json
{
  "agency": {
    "addOns": {
      "header": {
        "title": "Add-ons",
        "subtitle": "Upgrades that scale your brand, your team, and the markets you can sell into."
      },

      "sections": {
        "branding": {
          "title": "White-label apps",
          "blurb": "Put your brand on every client touchpoint — apps, automations, and portals."
        },
        "experts": {
          "title": "Expert services",
          "blurb": "Bring HighLevel experts in to set you up, support your day-to-day, or train your team."
        },
        "compliance": {
          "title": "Compliance",
          "blurb": "Open up regulated markets — close healthcare deals you'd lose today over compliance."
        }
      },

      "card": {
        "learnMore": "Learn more",
        "statusPill": "In your plan",
        "cadenceOneTime": "One-time",
        "finepointDefault": "Cancel anytime · No setup fees",
        "ariaRecommended": "Recommended: {title}"
      },

      "cards": {
        "wlMobile": {
          "tag": "Most popular",
          "title": "White-label mobile app",
          "tagline": "Ship your own iOS and Android app — your brand on every screen, every notification, every login.",
          "benefits": [
            "Publish under your name on App Store and Play",
            "Your icon, splash, and brand colors every time",
            "Push notifications from your domain — clients trust the source"
          ],
          "cta": "Add to plan"
        },
        "wlZapier": {
          "title": "White-label Zapier",
          "tagline": "Give clients 6,000+ integrations — embedded under your brand, inside the platform they already use.",
          "benefits": [
            "Embed the Zap builder inside sub-accounts under your brand",
            "Connect any tool clients ask for — no engineering needed",
            "Roll-up analytics show which integrations clients use most"
          ],
          "cta": "Add to plan"
        },
        "wlPortal": {
          "title": "Client portal",
          "tagline": "One branded login for invoices, support, and learning — fully themed to your agency.",
          "benefits": [
            "Single sign-on from your sub-account — no second password",
            "Bring courses, communities, and conversations into one place",
            "Theme everything to your brand without writing CSS"
          ],
          "cta": "Add to plan"
        },
        "advancedSetup": {
          "tag": "Hands-on",
          "title": "Advanced setup",
          "tagline": "A specialist configures your platform end-to-end. Start selling next week — not next quarter.",
          "benefits": [
            "Discovery call that maps your business, clients, and offers",
            "Specialist sets up pipelines, automations, and snapshots end-to-end",
            "Two weeks of follow-up so first-week issues don't derail you"
          ],
          "cta": "Talk to a specialist"
        },
        "premiumSupport": {
          "title": "Premium support",
          "tagline": "When something breaks at 11pm, get a human in minutes — not a ticket tomorrow.",
          "benefits": [
            "24/7 priority queue across email, chat, and phone",
            "A named engineer who knows your account on escalations",
            "Quarterly health review to catch problems before clients do"
          ],
          "cta": "Add to plan",
          "ctaManage": "Manage"
        },
        "certification": {
          "tag": "Starts March 15",
          "title": "HighLevel certification",
          "tagline": "Train your team to run HighLevel themselves — focus on growing the agency, not configuring it.",
          "benefits": [
            "Six weeks of live sessions with HighLevel architects, kicking off March 15",
            "Hands-on labs that mirror real client setups",
            "A verified credential each admin can list on LinkedIn"
          ],
          "cta": "Enroll your team"
        },
        "hipaa": {
          "tag": "BAA included",
          "tagHint": "A Business Associate Agreement is required for HIPAA-covered entities. We sign it for all sub-accounts on this plan.",
          "title": "HIPAA compliance",
          "tagline": "Pitch clinics, dentists, and therapists with confidence — close healthcare deals you'd lose today over the BAA question.",
          "benefitBaa": "Signed BAA covering every sub-account on this plan",
          "benefitPhi": "Automatic Protected Health Information (<abbr title=\"Protected Health Information\">PHI</abbr>) tagging and complete audit trails",
          "benefitStorage": "Region-locked storage and dedicated processing for sensitive data",
          "benefitReports": "Quarterly compliance reports your clients hand to their auditors",
          "cta": "Activate HIPAA compliance",
          "finepoint": "BAA included · Permanent once activated"
        }
      },

      "footerBand": {
        "title": "Don't see what you need?",
        "copy": "Tell us what your agency is trying to do — we'll point you to the right add-on or build a custom plan.",
        "cta": "Talk to our team"
      }
    }
  }
}
```

---

## API contract

### Card status — what the agency owns

The `status: 'available' | 'active'` field on each card is currently
a static literal in the `sections` array. In production it should
come from the agency's billing record:

```ts
GET /agency/{agencyId}/addons
→ Array<{ id: string; status: 'available' | 'active' }>
```

Map the response onto the local `Section[]` array on page mount.
Cards with `status: 'active'` render the green accent + "In your plan"
pill + "Manage" CTA automatically — no other code changes needed.

### CTA wiring (currently TODO)

Two click handlers in `<script setup>` log to console today:

```ts
// AddOnsPage.vue, ~line 300
const handleCta = (card: Card) => {
  // TODO(devs): wire to checkout / contact-sales modals.
  // For paid recurring add-ons → open IframeFunnelPaymentModal.
  // For high-touch / contact-sales → open a contact-sales modal.
}

const handleHelp = () => {
  // TODO(devs): open the contact-sales modal used elsewhere in spm-ts,
  // or route to a /support form. Wired to the footer band CTA.
}
```

**Routing rules for `handleCta`:**

| Card                      | Behavior                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| `wl-mobile`, `wl-zapier`, `wl-portal`, `premium-support`, `certified-admin` | Open `IframeFunnelPaymentModal` — recurring subscription add-ons         |
| `advanced-setup`          | Open contact-sales modal — high-touch, one-time service                   |
| `hipaa`                   | Open the **HIPAA self-serve flow** — Settings → Compliance → Buy → Sign BAA → activates agency-wide. Per the existing help article, this CTA is verb-led and should NOT route to sales. |
| Any card with `status === 'active'` (CTA reads "Manage") | Route to the agency's billing/subscriptions page filtered to that add-on |

---

## Integration checklist

Dev needs to complete these 5 tasks:

- [ ] **Copy** `src/shells/ShellV1/add-ons/AddOnsPage.vue` from this repo into `spm-ts/src/pmd/pages/agency/AddOnsPage.vue`
- [ ] **Restore upstream chrome** — wrap the page body in the `<SideBarV2>/<TopBar>/<section>/<KickoffWidget>` structure copied from `MarketplaceFrame.vue` (see top-of-file comment in the source for the exact diff)
- [ ] **Move strings to i18n** under `agency.addOns.*` (or apply the scoped ESLint disable as a temporary measure, with a follow-up ticket)
- [ ] **Wire `handleCta`** per the routing table above (5 modals possible; most cards open `IframeFunnelPaymentModal`)
- [ ] **Wire card status from API** — replace the static `status` literal with data from `GET /agency/{id}/addons`

---

## Design decisions (for dev context)

| Decision                                           | Rationale                                                                                                                                                   |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Featured cards use amber stripe + warm tint        | Visual reinforcement of the "Most popular" / "Hands-on" tags — eye lands on recommended cards naturally without 7 identical loud CTAs                      |
| Active cards use green stripe + "In your plan" pill | Answers the buyer's first question — *do I already have this?* — before they read the card                                                                  |
| Manage CTA reuses the secondary outlined treatment | The active state is already communicated by surface + pill + stripe; coloring the CTA green too was redundant and broke button-color consistency           |
| Compliance uses spotlight layout (max 720px)       | Single-card category — full-width grid would have one card stretching 1136px and looking lonely. 720px feels intentional.                                  |
| HIPAA finepoint overrides "Cancel anytime"         | HIPAA is permanent once activated per the help article — generic finepoint would be a trust-breaker if a real buyer caught it                              |
| Tag colors NOT category-aligned                    | Icon owns the category color; tag is meta-signal (popularity / freshness / trust). Separate palette stops them fighting for the eye (Gestalt figure-ground) |
| BAA tag is a focusable button with tooltip         | A11y — keyboard users see the BAA hint on focus, not just hover. Uses `role="tooltip"` + `aria-describedby`.                                                |
| `prefers-reduced-motion` disables card-lift + arrow-slide | Standard a11y motion guard                                                                                                                          |
| Footer band stacks below 640px                     | CTA was getting squeezed off on narrow viewports                                                                                                            |
| Stacked sections instead of tabs (May 25)          | PM feedback — hiding Premium support / HIPAA behind a tab click reduced visibility. Visible H2 + blurb per section keeps the three-category structure on one scrollable page. |
| Each `<section>` carries an `id="{slug}"`          | Lets the upstream "Compare add-ons" top-right link deep-link to a category (`/agency/add-ons#compliance`) when that link is wired                          |
| Section titles kept as prototype originals         | Card-level copy comes from the Figma "Marketplace In-App Redesign" file (May 25 marketing direction), but section titles use the original prototype labels (White-label apps / Expert services / Compliance) instead of Figma's Custom Branding / Setup & Support / Medical Compliance. The originals organize the page better at-a-glance. |
| "Learn more" link removed from cards               | Competed with the primary CTA for attention. `learnMoreUrl` is still on the data model so docs can be linked from a tooltip / modal / future Compare surface without a data migration. |
| Annual-plan savings pill on `premium-support` + `certified-admin` | Figma (`216:1218` group 2130/2131 + the "🟢Marketplace Landing" canonical version) renders a fully-rounded green pill below the price on cards that offer an annual discount. New optional `annualPlan?: string` on the `Card` type, verbatim Figma strings ("Annual Plan: $5000 (Save 16%)" and "Annual Plan: $970 (Save 16%)"). Background uses `--success-500` (#12b76a) — closest token in the existing palette to Figma's #37D334. Text is white per the latest Figma comp (older "working" page version had black text — the current 🟢 version uses white for AA contrast against the saturated green). No other cards in the file carry this pill. |

---

## Open questions for dev

1. **Active-state source.** Confirm the right endpoint shape for "what add-ons does this agency own?" — assumed `GET /agency/{id}/addons` above, but the actual SaaS billing record may live elsewhere.

2. **HIPAA CTA flow.** The page uses a verb-led "Activate HIPAA compliance" CTA per the existing help article (Settings → Compliance → Buy → Sign BAA → auto-activates agency-wide). Confirm that flow is still the intended UX; if it's now a sales handoff, copy + behavior need to change.

3. **Pricing source.** Prices are static literals (`$297`, `$50`, `$1,000`, etc.). Should they come from the same endpoint as status, or from a separate catalog? Static is fine for v1 if pricing rarely changes.

4. **"Compare add-ons" link.** Top-right of the page in the upstream design doesn't render in this preview — it's part of the topbar treatment. Decide where in the actual `spm-ts` topbar that link belongs (or skip for v1).

---

## Quick start for dev

```bash
# Clone and run the preview locally
git clone https://github.com/ankurkushwaha-ctrl/ghl-design-previews.git
cd ghl-design-previews
git checkout feat/add-ons
npm install
npm run dev
# Open http://localhost:5173/add-ons
```

All Add-Ons code lives in:

```
src/shells/ShellV1/add-ons/AddOnsPage.vue
```

That's the file to copy upstream.
