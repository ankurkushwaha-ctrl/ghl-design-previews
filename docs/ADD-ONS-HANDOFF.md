# Add-Ons — Dev Handoff

> **Live preview:** https://ghl-design-previews.vercel.app/add-ons
> **Figma:** https://www.figma.com/design/LGXAERHnZGj65vx4urTTF5/Add-Ons

---

## What this is

A production-ready agency **Add-Ons** page that replaces the legacy
`MarketplaceFrame.vue` iframe with a native Vue surface. Four category
sections — Custom Branding, Setup & Support, Medical Compliance,
Certified Admin — render inline on one scrollable page (seven cards
total). Section titles + blurbs mirror the live GHL marketing preview
(`Q3wpuESAo2QTQthwBZlZ`). Cards already in the agency's plan render
in an "active" state with a green stripe and **Manage** CTA.

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

### Grammar fixes applied locally — flag to PMM

A May 25 grammar pass on the live marketing preview surfaced
four small bugs that exist in the canonical copy too. They've
been corrected in this Vue page so the preview reads cleanly,
but Marketing should mirror these fixes upstream in Figma + the
live preview so we stay in sync.

| Card | Field | Was (broken) | Now (corrected) |
| ---- | ----- | ------------ | --------------- |
| `wl-mobile` | benefit #2 | "Choose your color **pallet**" | "Choose your color **palette**" |
| `wl-portal` | `tagline` | "Customize the Client Portal App with your branding" *(no terminal period)* | "…with your branding**.**" |
| `certified-admin` | `tagline` | "Get certified at your own pace **with flexible monthly**. Perfect for…" *(truncated sentence — no noun after "monthly")* | "…with **flexible monthly billing**. Perfect for…" |
| `certified-admin` | benefit #5 | "Unlock career growth **through with** GHL credentials" *(stacked prepositions)* | "Unlock career growth **with** GHL credentials" |

### Style note — not changed (verbatim from live preview)

The three Custom Branding card titles use three different
spellings of the same compound: **Whitelabel** Mobile App,
**White-Label** Zapier App, **White-Label** Client Portal App.
This is inconsistent on GHL's marketing surface itself, so per
the "live preview is canonical" rule we left it. PMM call to
unify.

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
          "title": "Custom Branding",
          "blurb": "Customize more than just the main app with your branding."
        },
        "experts": {
          "title": "Setup & Support",
          "blurb": "Streamline your setup and skip the line when support is needed."
        },
        "compliance": {
          "title": "Medical Compliance",
          "blurb": "Take your HighLevel skills to the next level."
        },
        "certification": {
          "title": "Certified Admin",
          "blurb": "Become certified and get hired to support other HighLevelers!"
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
| Active cards use green stripe + "In your plan" pill | Answers the buyer's first question — *do I already have this?* — before they read the card                                                                  |
| Manage CTA reuses the secondary outlined treatment | The active state is already communicated by surface + pill + stripe; coloring the CTA green too was redundant and broke button-color consistency           |
| Compliance uses spotlight layout (centered at grid-card width) | Single-card category. The card is now rendered at the SAME width as one card from a multi-card row above and centered in the row — at 3-col viewports it lines up with the middle column. Previous 720px (≈ 2× a normal card) broke the scan rhythm. |
| HIPAA finepoint overrides "Cancel anytime"         | HIPAA is permanent once activated per the help article — generic finepoint would be a trust-breaker if a real buyer caught it                              |
| Marketing tags + featured-card variant removed     | PM direction (May 25): no card carries a "Most popular" / "Hands-on" / "BAA included" tag. The featured filled-primary CTA variant and the warm amber stripe were tied to tags, so all of that template + CSS was dead and has been removed. CTAs are now uniformly secondary outlined. |
| `prefers-reduced-motion` disables card-lift + arrow-slide | Standard a11y motion guard                                                                                                                          |
| Footer band stacks below 640px                     | CTA was getting squeezed off on narrow viewports                                                                                                            |
| Stacked sections instead of tabs (May 25)          | PM feedback — hiding Premium support / HIPAA behind a tab click reduced visibility. Visible H2 + blurb per section keeps the four-category structure on one scrollable page. |
| Each `<section>` carries an `id="{slug}"`          | Lets the upstream "Compare add-ons" top-right link deep-link to a category (`/agency/add-ons#compliance`) when that link is wired                          |
| Section titles + blurbs match the live marketing preview | Final May 25 sync: section titles (Custom Branding / Setup & Support / Medical Compliance / Certified Admin) and one-line blurbs pulled verbatim from the live GHL preview at `https://app.gohighlevel.com/v2/preview/Q3wpuESAo2QTQthwBZlZ?notrack=true`. Treat that URL as the canonical source if PMM revises copy. |
| Certified Admin promoted to its own section        | Was nested under Expert Services (now Setup & Support) in earlier passes. Live marketing preview surfaces it as a peer category alongside Compliance, so it now renders as its own 4th section using the same single-card `spotlight` layout as Medical Compliance. |
| Certified Admin icon promoted to its own color kind | Was reusing the orange `experts` tile, which visually tied it back to Setup & Support after the section split — a gestalt similarity collision. Added a new `iconKind: 'certification'` mapped to a violet ramp (`--violet-50 → --violet-200` background, `--violet-700` icon). Reads as "credential / prestige" without colliding with branding (primary blue), setup & support (orange), or medical compliance (success green). |
| `--two` grid reuses the `--three` track at lg+      | At ≥1100px, Setup & Support cards were stretching to ~50% width (~510px) while the 3-up Custom Branding cards above sat at ~33% (~350px). Fixed by making `--two` render as `repeat(3, 1fr)` at lg+; two cards naturally occupy columns 1+2 with column 3 empty, matching the spotlight layout's "card from the same family" treatment. All four sections now share one card width across the page. |
| "Learn more" link removed from cards               | Competed with the CTA for attention. `learnMoreUrl` is still on the data model so docs can be linked from a tooltip / modal / future Compare surface without a data migration. |
| Annual-plan savings pill on `premium-support` + `certified-admin` | Figma (`216:1218` group 2130/2131 + the "🟢Marketplace Landing" canonical version) renders a fully-rounded green pill on cards that offer an annual discount. New optional `annualPlan?: string` on the `Card` type, verbatim Figma strings ("Annual Plan: $5000 (Save 16%)" and "Annual Plan: $970 (Save 16%)"). Background uses `--success-700` (#027a48) so 11px/600 white text passes WCAG 2.1 AA (≈ 5.5:1). The earlier `--success-500` background only hit ~2.5:1 and failed AA — corrected in the May 25 polish pass. No other cards in the file carry this pill. |
| Topbar chip cluster (Ask AI, bell, help, avatar) visually overlapped page H1 when scrolled | `.add-ons-content` padding-top bumped 32px → 64px; `.hl_header` got a 1px gray-200 bottom border + stronger shadow | Restores confident vertical separation at scroll 0; makes scroll-under transition read as "content covered" instead of "content clipped" even on retina displays |
| H1 visually clipped mid-letter when scrolled past ~50px (topbar opaque-covered the title's top half during transition) | `.add-ons-header` is now `position: sticky; top: 52px;` with a subtle bottom border + shadow | Pattern matches Stripe/Linear/GitHub pricing; eliminates the ugly transition state and gives constant page wayfinding as users scroll long catalogs |

---

## Polish / delight pass (May 25)

Heuristic audit + targeted fixes. Code only; no copy or content changes.

- **HIPAA card width** — was 720px (~2× a normal card), now matches one grid-card width and centers in the row at every breakpoint (≥1100px aligns with the middle column of a 3-up grid). Pure CSS change; no data-model impact.
- **WCAG fix: annual-plan pill** — bg `--success-500` → `--success-700`. White text now passes AA (≈ 5.5:1) instead of failing at ~2.5:1.
- **Focus ring on footer-band CTA** — added `:focus-visible` rule matching the card CTA pattern. The `<a>` previously relied on the default UA outline, which was barely visible against the dashed border.
- **Benefit checkmark pop** — color stepped from `--success-500` → `--success-600`. Slightly denser against pure white at 11px without changing the semantic.
- **Transition timings standardized to 0.15s ease** — card hover, CTA background/border, and CTA-arrow now use the same 0.15s curve (was 0.2s). CTA press transform tightened to 0.1s.
- **Dead code removed** — marketing tags were retired by PM, but the template still carried three dead `v-if` branches (`card.tag*`), an `aria-label` that never fired, the `add-on-card--featured` class binding + warm-amber stripe CSS, the `add-on-card__tag*` + tooltip CSS, the `add-on-card__cta--primary` filled-blue variant, and the `TagType` type + `tag?` field on `Card`. All gone — file is ~150 lines shorter and the runtime behavior is unchanged.
- **Stale comments touched up** — token-map comment now reflects what each ramp actually drives; the "CTA hierarchy" comment describes the current flat hierarchy.

### Flagged but NOT changed (designer call)

- **Page-load entrance animation** — Stripe-style 30ms-stagger fade-in is a common pricing-page convention. Left out for now because the page is in front of stakeholders and any entrance motion is felt; happy to add behind `prefers-reduced-motion` if you want it.
- **Annual-plan pill on `premium-support` while card is `active`** — the pill currently renders on a card the agency already owns. Reads slightly off (Manage CTA + savings pill). Options: hide annual pill when `status === 'active'`, or route it to a "switch to annual" upgrade flow. Out of scope for this pass.
- **Type-scale jump H1 28px → H2 18px** — fine on the spec, but 18px H2s next to a 28px H1 feel quiet. Bumping H2 to 20px would be defensible; left as-is because the comment says it's deliberately matching HighRise convention.

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
