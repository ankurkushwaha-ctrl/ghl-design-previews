# HighRise 1.1 — Design System Specification

> Source: [https://www.figma.com/design/emjjdhZIMlqbszmzP9PdS6/HighRise-1.1](https://www.figma.com/design/emjjdhZIMlqbszmzP9PdS6/HighRise-1.1)  
> Extracted via Figma MCP. Vanilla HTML/CSS spec. BEM-ish naming.  
> Token naming preserved as-is from the Figma file.

---

# PASS 1 — FOUNDATIONS

## 1.1 Color Tokens

### Base Colors


| Token Name      | CSS Variable                 | Hex       |
| --------------- | ---------------------------- | --------- |
| White / base    | `--color/neutral/white/base` | `#FFFFFF` |
| Black / base    | `--color/neutral/black/base` | `#000000` |
| Page Background | `--color/neutral/page-bg`    | `#ECEEF2` |


### Gray (Neutral)


| Step | CSS Variable               | Hex       |
| ---- | -------------------------- | --------- |
| 25   | `--color/neutral/gray/25`  | `#FCFCFD` |
| 50   | `--color/neutral/gray/50`  | `#F9FAFB` |
| 100  | `--color/neutral/gray/100` | `#F2F4F7` |
| 200  | `--color/neutral/gray/200` | `#EAECF0` |
| 300  | `--color/neutral/gray/300` | `#D0D5DD` |
| 400  | `--color/neutral/gray/400` | `#98A2B3` |
| 500  | `--color/neutral/gray/500` | `#667085` |
| 600  | `--color/neutral/gray/600` | `#475467` |
| 700  | `--color/neutral/gray/700` | `#344054` |
| 800  | `--color/neutral/gray/800` | `#1D2939` |
| 900  | `--color/neutral/gray/900` | `#101828` |
| 950  | `--color/neutral/gray/950` | `#0A0D12` |
| 975  | `--color/neutral/gray/975` | `#040508` |


### Primary / Blue

> Note: CSS variable names use `/primary/blue/` but the actual hex values are blue (confirmed via Figma styles). Swatch text labels in the Figma file show outdated purple values — the CSS variable fallback values are authoritative.


| Step  | CSS Variable               | Hex       |
| ----- | -------------------------- | --------- |
| 25    | `--color/primary/blue/25`  | `#F5F8FF` |
| 50    | `--color/primary/blue/50`  | `#EFF4FF` |
| 100   | `--color/primary/blue/100` | `#D1E0FF` |
| 200   | `--color/primary/blue/200` | `#B2CCFF` |
| 300   | `--color/primary/blue/300` | `#84ADFF` |
| 400   | `--color/primary/blue/400` | `#528BFF` |
| 500   | `--color/primary/blue/500` | `#2970FF` |
| 600 ★ | `--color/primary/blue/600` | `#155EEF` |
| 700   | `--color/primary/blue/700` | `#004EEB` |
| 800   | `--color/primary/blue/800` | `#0040C1` |
| 900   | `--color/primary/blue/900` | `#00359E` |
| 950   | `--color/primary/blue/950` | `#002B82` |
| 975   | `--color/primary/blue/975` | `#002570` |


★ = Default / primary action color

### Error (Secondary)


| Step  | CSS Variable                  | Hex       |
| ----- | ----------------------------- | --------- |
| 25    | `--color/secondary/error/25`  | `#FFFBFA` |
| 50    | `--color/secondary/error/50`  | `#FEF3F2` |
| 100   | `--color/secondary/error/100` | `#FEE4E2` |
| 200   | `--color/secondary/error/200` | `#FECDCA` |
| 300   | `--color/secondary/error/300` | `#FDA29B` |
| 400   | `--color/secondary/error/400` | `#F97066` |
| 500 ★ | `--color/secondary/error/500` | `#F04438` |
| 600   | `--color/secondary/error/600` | `#D92D20` |
| 700   | `--color/secondary/error/700` | `#B42318` |
| 800   | `--color/secondary/error/800` | `#912018` |
| 900   | `--color/secondary/error/900` | `#7A271A` |
| 950   | `--color/secondary/error/950` | `#55160C` |
| 975   | `--color/secondary/error/975` | `#471109` |


★ = Default destructive/error action color

### Warning (Secondary)


| Step  | CSS Variable                    | Hex       |
| ----- | ------------------------------- | --------- |
| 25    | `--color/secondary/warning/25`  | `#FFFCF5` |
| 50    | `--color/secondary/warning/50`  | `#FFFAEB` |
| 100   | `--color/secondary/warning/100` | `#FEF0C7` |
| 200   | `--color/secondary/warning/200` | `#FEDF89` |
| 300   | `--color/secondary/warning/300` | `#FEC84B` |
| 400   | `--color/secondary/warning/400` | `#FDB022` |
| 500 ★ | `--color/secondary/warning/500` | `#F79009` |
| 600   | `--color/secondary/warning/600` | `#DC6803` |
| 700   | `--color/secondary/warning/700` | `#B54708` |
| 800   | `--color/secondary/warning/800` | `#93370D` |
| 900   | `--color/secondary/warning/900` | `#7A2E0E` |
| 950   | `--color/secondary/warning/950` | `#4E1D09` |
| 975   | `--color/secondary/warning/975` | `#421807` |


★ = Default warning color

### Success (Secondary)


| Step  | CSS Variable                    | Hex       |
| ----- | ------------------------------- | --------- |
| 25    | `--color/secondary/success/25`  | `#F6FEF9` |
| 50    | `--color/secondary/success/50`  | `#ECFDF3` |
| 100   | `--color/secondary/success/100` | `#D1FADF` |
| 200   | `--color/secondary/success/200` | `#A6F4C5` |
| 300   | `--color/secondary/success/300` | `#6CE9A6` |
| 400   | `--color/secondary/success/400` | `#32D583` |
| 500 ★ | `--color/secondary/success/500` | `#12B76A` |
| 600   | `--color/secondary/success/600` | `#039855` |
| 700   | `--color/secondary/success/700` | `#027A48` |
| 800   | `--color/secondary/success/800` | `#05603A` |
| 900   | `--color/secondary/success/900` | `#054F31` |
| 950   | `--color/secondary/success/950` | `#044028` |
| 975   | `--color/secondary/success/975` | `#02331F` |


★ = Default success color

---

## 1.2 Typography

**Typeface:** Inter (Google Fonts)  
**Weights used:** Regular (400), Medium (500), Semibold (600), Bold (700)  
**Letter spacing:** Negative tracking on display sizes (−2%), normal (0) on text sizes

### Display Scale

All display styles use `letter-spacing: -0.02em` (−2%) except Display sm and Display xs which use `letter-spacing: 0`.


| Style       | Size            | Line Height     | Letter Spacing | Weights Available               |
| ----------- | --------------- | --------------- | -------------- | ------------------------------- |
| Display 2xl | 72px / 4.5rem   | 90px / 5.625rem | −2%            | Regular, Medium, Semibold, Bold |
| Display xl  | 60px / 3.75rem  | 72px / 4.5rem   | −2%            | Regular, Medium, Semibold, Bold |
| Display lg  | 48px / 3rem     | 60px / 3.75rem  | −2%            | Regular, Medium, Semibold, Bold |
| Display md  | 36px / 2.25rem  | 44px / 2.75rem  | −2%            | Regular, Medium, Semibold, Bold |
| Display sm  | 30px / 1.875rem | 38px / 2.375rem | 0              | Regular, Medium, Semibold, Bold |
| Display xs  | 24px / 1.5rem   | 32px / 2rem     | 0              | Regular, Medium, Semibold, Bold |


### Text Scale

All text styles use `letter-spacing: 0` (var `--font/letter-spacing/normal`).


| Style    | Token             | Size            | Line Height     | Weights Available               |
| -------- | ----------------- | --------------- | --------------- | ------------------------------- |
| Text 4xl | `--font/size/4xl` | 20px / 1.25rem  | 30px / 1.875rem | Regular, Medium, Semibold, Bold |
| Text 3xl | `--font/size/3xl` | 18px / 1.125rem | 28px / 1.75rem  | Regular, Medium, Semibold, Bold |
| Text 2xl | `--font/size/2xl` | 16px / 1rem     | 24px / 1.5rem   | Regular, Medium, Semibold, Bold |
| Text xl  | `--font/size/xl`  | 15px / 0.938rem | 20px / 1.25rem  | Regular, Medium, Semibold, Bold |
| Text lg  | `--font/size/lg`  | 14px / 0.875rem | 20px / 1.25rem  | Regular, Medium, Semibold, Bold |
| Text md  | `--font/size/md`  | 13px / 0.813rem | 18px / 1.125rem | Regular, Medium, Semibold, Bold |
| Text sm  | `--font/size/sm`  | 12px / 0.75rem  | 17px / 1.063rem | Regular, Medium, Semibold, Bold |
| Text xs  | `--font/size/xs`  | 11px / 0.688rem | 16px / 1rem     | Regular, Medium, Semibold, Bold |
| Text 2xs | `--font/size/2xs` | 10px / 0.625rem | 15px / 0.938rem | Regular, Medium, Semibold, Bold |
| Text 3xs | `--font/size/3xs` | 9px / 0.563rem  | 14px / 0.875rem | Regular, Medium, Semibold, Bold |
| Text 4xs | `--font/size/4xs` | 8px / 0.5rem    | 12px / 0.75rem  | Regular, Medium, Semibold, Bold |


### Typography CSS Variables

```css
:root {
  /* Font family */
  --font-family-base: 'Inter', sans-serif;

  /* Font weights */
  --font/weight/regular: 400;
  --font/weight/medium: 500;
  --font/weight/semibold: 600;
  --font/weight/bold: 700;

  /* Font sizes — Text scale */
  --font/size/4xl: 20px;
  --font/size/3xl: 18px;
  --font/size/2xl: 16px;
  --font/size/xl: 15px;
  --font/size/lg: 14px;
  --font/size/md: 13px;
  --font/size/sm: 12px;
  --font/size/xs: 11px;
  --font/size/2xs: 10px;
  --font/size/3xs: 9px;
  --font/size/4xs: 8px;

  /* Line heights — Text scale */
  --font/line-height/4xl: 30px;
  --font/line-height/3xl: 28px;
  --font/line-height/2xl: 24px;
  --font/line-height/xl: 20px;
  --font/line-height/lg: 20px;
  --font/line-height/md: 18px;
  --font/line-height/sm: 17px;
  --font/line-height/xs: 16px;
  --font/line-height/2xs: 15px;
  --font/line-height/3xs: 14px;
  --font/line-height/4xs: 12px;

  /* Letter spacing */
  --font/letter-spacing/normal: 0px;
}
```

---

## 1.3 Spacing Scale

Base unit: 4px (0.25rem). Scale uses multipliers of 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64.


| Step | rem     | px    |
| ---- | ------- | ----- |
| 1    | 0.25rem | 4px   |
| 2    | 0.5rem  | 8px   |
| 3    | 0.75rem | 12px  |
| 4    | 1rem    | 16px  |
| 5    | 1.25rem | 20px  |
| 6    | 1.5rem  | 24px  |
| 8    | 2rem    | 32px  |
| 10   | 2.5rem  | 40px  |
| 12   | 3rem    | 48px  |
| 16   | 4rem    | 64px  |
| 20   | 5rem    | 80px  |
| 24   | 6rem    | 96px  |
| 32   | 8rem    | 128px |
| 40   | 10rem   | 160px |
| 48   | 12rem   | 192px |
| 56   | 14rem   | 224px |
| 64   | 16rem   | 256px |


### Container / Breakpoint Widths


| Breakpoint | Width  |
| ---------- | ------ |
| sm         | 640px  |
| md         | 768px  |
| lg         | 1024px |
| xl         | 1280px |


### Grid System


| Viewport         | Columns   | Gutter | Margin |
| ---------------- | --------- | ------ | ------ |
| Desktop (1440px) | 12 (auto) | 32px   | 80px   |
| Tablet (768px)   | 6 (auto)  | —      | —      |
| Mobile (375px)   | 4 (auto)  | —      | 16px   |


### Mismatches

The following spacing values are NOT on the standard 8px grid:

- `3` (12px) — off-grid ⚠️
- `5` (20px) — off-grid ⚠️
- `10` (40px) — off-grid ⚠️

---

## 1.4 Border Radius

> No explicit border radius CSS variable tokens were found in the 1. Tokens section. Border radius is applied as raw values throughout the system. The values below are observed from component usage.


| Usage                                  | Value           |
| -------------------------------------- | --------------- |
| Cards, panels, containers, blur panels | `8px`           |
| Pills / full-round badges              | `9999px` (full) |


> ⚠️ Border radius tokens (e.g. `--radius/sm`, `--radius/md`) are not documented in the Tokens pages. Actual component-level radius values will be documented per component in Passes 2–5.

---

## 1.5 Shadow / Elevation Tokens

All shadows use `rgba(16, 24, 40, α)` (Gray/900 at various opacities).


| Token      | CSS Variable | box-shadow value                                                                     |
| ---------- | ------------ | ------------------------------------------------------------------------------------ |
| Shadow/xs  | `Shadow/xs`  | `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`                                             |
| Shadow/sm  | `Shadow/sm`  | `0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)`     |
| Shadow/md  | `Shadow/md`  | `0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)`   |
| Shadow/lg  | `Shadow/lg`  | `0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)` |
| Shadow/xl  | `Shadow/xl`  | `0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)` |
| Shadow/2xl | `Shadow/2xl` | `0px 24px 48px -12px rgba(16, 24, 40, 0.18)`                                         |
| Shadow/3xl | `Shadow/3xl` | `0px 32px 64px -12px rgba(16, 24, 40, 0.14)`                                         |


### CSS

```css
:root {
  --shadow-xs:  0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  --shadow-sm:  0px 1px 3px 0px rgba(16, 24, 40, 0.10),
                0px 1px 2px 0px rgba(16, 24, 40, 0.06);
  --shadow-md:  0px 4px 8px -2px rgba(16, 24, 40, 0.10),
                0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  --shadow-lg:  0px 12px 16px -4px rgba(16, 24, 40, 0.08),
                0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  --shadow-xl:  0px 20px 24px -4px rgba(16, 24, 40, 0.08),
                0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  --shadow-2xl: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
  --shadow-3xl: 0px 32px 64px -12px rgba(16, 24, 40, 0.14);
}
```

---

## 1.6 Blur / Background Blur Tokens

Backdrop blur effects. Each size has a light (white 60% bg) and dark (gray 60% bg) variant.


| Token              | CSS Variable | Backdrop Blur | Light BG                | Dark BG              |
| ------------------ | ------------ | ------------- | ----------------------- | -------------------- |
| Background blur/sm | `--blur/2`   | `4px`         | `rgba(255,255,255,0.6)` | `rgba(52,64,84,0.6)` |
| Background blur/md | `--blur/4`   | `8px`         | `rgba(255,255,255,0.6)` | `rgba(52,64,84,0.6)` |
| Background blur/lg | `--blur/6`   | `12px`        | `rgba(255,255,255,0.6)` | `rgba(52,64,84,0.6)` |
| Background blur/xl | `--blur/10`  | `20px`        | `rgba(255,255,255,0.6)` | `rgba(52,64,84,0.6)` |


### CSS

```css
:root {
  --blur/2:  4px;
  --blur/4:  8px;
  --blur/6:  12px;
  --blur/10: 20px;
}

.blur-panel--sm-light {
  backdrop-filter: blur(var(--blur/2, 4px));
  background-color: rgba(255, 255, 255, 0.6);
}
.blur-panel--sm-dark {
  backdrop-filter: blur(var(--blur/2, 4px));
  background-color: rgba(52, 64, 84, 0.6);
}
.blur-panel--md-light {
  backdrop-filter: blur(var(--blur/4, 8px));
  background-color: rgba(255, 255, 255, 0.6);
}
.blur-panel--md-dark {
  backdrop-filter: blur(var(--blur/4, 8px));
  background-color: rgba(52, 64, 84, 0.6);
}
.blur-panel--lg-light {
  backdrop-filter: blur(var(--blur/6, 12px));
  background-color: rgba(255, 255, 255, 0.6);
}
.blur-panel--lg-dark {
  backdrop-filter: blur(var(--blur/6, 12px));
  background-color: rgba(52, 64, 84, 0.6);
}
.blur-panel--xl-light {
  backdrop-filter: blur(var(--blur/10, 20px));
  background-color: rgba(255, 255, 255, 0.6);
}
.blur-panel--xl-dark {
  backdrop-filter: blur(var(--blur/10, 20px));
  background-color: rgba(52, 64, 84, 0.6);
}
```

---

## 1.7 Z-index Scale

> No explicit z-index tokens were found in the 1. Tokens section. Z-index values will be documented per component as observed in Passes 2–5.

---

## 1.8 Complete CSS Custom Properties (Foundations)

```css
:root {
  /* ── Colors: Base ─────────────────────────────── */
  --color/neutral/white/base: #ffffff;
  --color/neutral/black/base: #000000;
  --color/neutral/page-bg:    #eceef2;

  /* ── Colors: Gray ─────────────────────────────── */
  --color/neutral/gray/25:  #fcfcfd;
  --color/neutral/gray/50:  #f9fafb;
  --color/neutral/gray/100: #f2f4f7;
  --color/neutral/gray/200: #eaecf0;
  --color/neutral/gray/300: #d0d5dd;
  --color/neutral/gray/400: #98a2b3;
  --color/neutral/gray/500: #667085;
  --color/neutral/gray/600: #475467;
  --color/neutral/gray/700: #344054;
  --color/neutral/gray/800: #1d2939;
  --color/neutral/gray/900: #101828;
  --color/neutral/gray/950: #0a0d12;
  --color/neutral/gray/975: #040508;

  /* ── Colors: Primary / Blue ───────────────────── */
  --color/primary/blue/25:  #f5f8ff;
  --color/primary/blue/50:  #eff4ff;
  --color/primary/blue/100: #d1e0ff;
  --color/primary/blue/200: #b2ccff;
  --color/primary/blue/300: #84adff;
  --color/primary/blue/400: #528bff;
  --color/primary/blue/500: #2970ff;
  --color/primary/blue/600: #155eef;
  --color/primary/blue/700: #004eeb;
  --color/primary/blue/800: #0040c1;
  --color/primary/blue/900: #00359e;
  --color/primary/blue/950: #002b82;
  --color/primary/blue/975: #002570;

  /* ── Colors: Error ────────────────────────────── */
  --color/secondary/error/25:  #fffbfa;
  --color/secondary/error/50:  #fef3f2;
  --color/secondary/error/100: #fee4e2;
  --color/secondary/error/200: #fecdca;
  --color/secondary/error/300: #fda29b;
  --color/secondary/error/400: #f97066;
  --color/secondary/error/500: #f04438;
  --color/secondary/error/600: #d92d20;
  --color/secondary/error/700: #b42318;
  --color/secondary/error/800: #912018;
  --color/secondary/error/900: #7a271a;
  --color/secondary/error/950: #55160c;
  --color/secondary/error/975: #471109;

  /* ── Colors: Warning ──────────────────────────── */
  --color/secondary/warning/25:  #fffcf5;
  --color/secondary/warning/50:  #fffaeb;
  --color/secondary/warning/100: #fef0c7;
  --color/secondary/warning/200: #fedf89;
  --color/secondary/warning/300: #fec84b;
  --color/secondary/warning/400: #fdb022;
  --color/secondary/warning/500: #f79009;
  --color/secondary/warning/600: #dc6803;
  --color/secondary/warning/700: #b54708;
  --color/secondary/warning/800: #93370d;
  --color/secondary/warning/900: #7a2e0e;
  --color/secondary/warning/950: #4e1d09;
  --color/secondary/warning/975: #421807;

  /* ── Colors: Success ──────────────────────────── */
  --color/secondary/success/25:  #f6fef9;
  --color/secondary/success/50:  #ecfdf3;
  --color/secondary/success/100: #d1fadf;
  --color/secondary/success/200: #a6f4c5;
  --color/secondary/success/300: #6ce9a6;
  --color/secondary/success/400: #32d583;
  --color/secondary/success/500: #12b76a;
  --color/secondary/success/600: #039855;
  --color/secondary/success/700: #027a48;
  --color/secondary/success/800: #05603a;
  --color/secondary/success/900: #054f31;
  --color/secondary/success/950: #044028;
  --color/secondary/success/975: #02331f;

  /* ── Typography ───────────────────────────────── */
  --font/weight/regular:   400;
  --font/weight/medium:    500;
  --font/weight/semibold:  600;
  --font/weight/bold:      700;

  --font/size/4xl:  20px;
  --font/size/3xl:  18px;
  --font/size/2xl:  16px;
  --font/size/xl:   15px;
  --font/size/lg:   14px;
  --font/size/md:   13px;
  --font/size/sm:   12px;
  --font/size/xs:   11px;
  --font/size/2xs:  10px;
  --font/size/3xs:   9px;
  --font/size/4xs:   8px;

  --font/line-height/4xl:  30px;
  --font/line-height/3xl:  28px;
  --font/line-height/2xl:  24px;
  --font/line-height/xl:   20px;
  --font/line-height/lg:   20px;
  --font/line-height/md:   18px;
  --font/line-height/sm:   17px;
  --font/line-height/xs:   16px;
  --font/line-height/2xs:  15px;
  --font/line-height/3xs:  14px;
  --font/line-height/4xs:  12px;

  --font/letter-spacing/normal: 0px;

  /* ── Shadows ──────────────────────────────────── */
  --shadow-xs:  0px 1px 2px 0px rgba(16,24,40,0.05);
  --shadow-sm:  0px 1px 3px 0px rgba(16,24,40,0.10),
                0px 1px 2px 0px rgba(16,24,40,0.06);
  --shadow-md:  0px 4px 8px -2px rgba(16,24,40,0.10),
                0px 2px 4px -2px rgba(16,24,40,0.06);
  --shadow-lg:  0px 12px 16px -4px rgba(16,24,40,0.08),
                0px 4px 6px -2px rgba(16,24,40,0.03);
  --shadow-xl:  0px 20px 24px -4px rgba(16,24,40,0.08),
                0px 8px 8px -4px rgba(16,24,40,0.03);
  --shadow-2xl: 0px 24px 48px -12px rgba(16,24,40,0.18);
  --shadow-3xl: 0px 32px 64px -12px rgba(16,24,40,0.14);

  /* ── Blurs ────────────────────────────────────── */
  --blur/2:  4px;
  --blur/4:  8px;
  --blur/6:  12px;
  --blur/10: 20px;
}
```

---

## Mismatches — Pass 1

The following spacing values fall off the 8px grid (4, 8, 16, 24, 32, 48, 64):


| Value           | Off-grid?            | Note                              |
| --------------- | -------------------- | --------------------------------- |
| 4px (step 1)    | ✅ On-grid (4px base) | —                                 |
| 8px (step 2)    | ✅ On-grid            | —                                 |
| 12px (step 3)   | ⚠️ OFF-GRID          | Not a multiple of 8; is 1.5× base |
| 16px (step 4)   | ✅ On-grid            | —                                 |
| 20px (step 5)   | ⚠️ OFF-GRID          | Not a multiple of 8; is 2.5× base |
| 24px (step 6)   | ✅ On-grid            | —                                 |
| 32px (step 8)   | ✅ On-grid            | —                                 |
| 40px (step 10)  | ⚠️ OFF-GRID          | Not a multiple of 8; is 5× base   |
| 48px (step 12)  | ✅ On-grid            | —                                 |
| 64px (step 16)  | ✅ On-grid            | —                                 |
| 80px (step 20)  | ✅ On-grid            | —                                 |
| 96px (step 24)  | ✅ On-grid            | —                                 |
| 128px (step 32) | ✅ On-grid            | —                                 |
| 160px (step 40) | ✅ On-grid            | —                                 |
| 192px (step 48) | ✅ On-grid            | —                                 |
| 224px (step 56) | ✅ On-grid            | —                                 |
| 256px (step 64) | ✅ On-grid            | —                                 |


> Steps 3 (12px), 5 (20px), and 10 (40px) are off an 8px grid. They are on a 4px grid. This is intentional — the system uses a 4px base.

---

---

# PASS 2 — INPUTS

> All measurements confirmed from Figma MCP design-context calls unless noted.  
> Token slash notation (`--color/primary/blue/600`) is the canonical HighRise name.  
> CSS uses the same slash names as custom properties (valid CSS).

---

## Button

**Purpose:** Triggers an action or event. Six visual hierarchy levels from filled Primary (highest) to text-only Link (lowest).

**Variants:** `primary`, `secondary`, `tertiary`, `ghost`, `link`, `destructive`

**States:** `default`, `hover`, `active`, `focus`, `disabled`, `loading`

**Sizes:**

| Size | Height | H-Padding | V-Padding | Font Size Token | Weight |
|------|--------|-----------|-----------|-----------------|--------|
| xs   | 32px   | 12px      | 6px       | `--font/size/sm` (12px) | 600 |
| sm   | 36px   | 14px      | 8px       | `--font/size/lg` (14px) | 600 |
| **md** ★ | **40px** | **16px** | **10px** | `--font/size/xl` (15px) | **600** |
| lg   | 44px   | 18px      | 12px      | `--font/size/2xl` (16px) | 600 |

★ = md values confirmed from Figma nodes; xs/sm/lg heights extrapolated from the shared 6-size system.

**Anatomy:**
- `__icon-left` (optional): 20×20px SVG icon before label
- `__label`: text node, Inter Semibold
- `__icon-right` (optional): 20×20px SVG icon after label
- `__spinner` (loading state): animated spinner replaces/appends to label

**Specs (md · Primary · Default — node `26682:46010`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #155EEF | `--color/primary/blue/600` |
| Border | 1px solid #155EEF | `--color/primary/blue/600` |
| Border radius | 8px | — |
| Box shadow | 0px 1px 2px 0px rgba(16,24,40,0.05) | `--shadow-xs` |
| Padding | 10px 16px | — |
| Gap (icon → label) | 8px | — |
| Color | #FFFFFF | `--color/neutral/white/base` |
| Font family | Inter | — |
| Font size | 15px | `--font/size/xl` |
| Font weight | 600 | `--font/weight/semibold` |
| Line height | 20px | `--font/line-height/xl` |
| Letter spacing | 0px | `--font/letter-spacing/normal` |

**State deltas (Primary md):**

| State | Background | Border | Box Shadow |
|-------|-----------|--------|------------|
| Default | #155EEF (`blue/600`) | `blue/600` | `--shadow-xs` |
| Hover | #0040C1 (`blue/800`) | `blue/700` (#004EEB) | `--shadow-xs` |
| Active | #00359E (`blue/900`) | `blue/600` | `--shadow-xs` |
| Focus | #0040C1 (`blue/800`) | `blue/600` | `--shadow-xs`, `0 0 0 4px #D1E0FF` (blue/100) |
| Disabled | #B2CCFF (`blue/200`) | `blue/200` | none |
| Loading | Same as Default | — | — |

**Variant defaults (md · Default state):**

| Variant | Background | Border | Text Color |
|---------|-----------|--------|------------|
| Primary | `blue/600` #155EEF | `blue/600` | white |
| Secondary | white | `blue/300` #84ADFF | `blue/700` #004EEB |
| Tertiary | `blue/50` #EFF4FF | `blue/50` (invisible) | `blue/700` #004EEB |
| Ghost | transparent | none | `blue/700` #004EEB |
| Link | transparent | none | `blue/700` #004EEB |
| Destructive (primary) | `error/600` #D92D20 | `error/600` | white |

**CSS (paste-ready):**

```css
/* ── Button base ──────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: var(--font/weight/semibold, 600);
  line-height: var(--font/line-height/xl, 20px);
  letter-spacing: var(--font/letter-spacing/normal, 0px);
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
  border: 1px solid transparent;
  text-decoration: none;
}

/* ── Sizes ─────────────────────────────────────────── */
.btn--xs  { padding: 6px 12px;  font-size: var(--font/size/sm, 12px); }
.btn--sm  { padding: 8px 14px;  font-size: var(--font/size/lg, 14px); }
.btn--md  { padding: 10px 16px; font-size: var(--font/size/xl, 15px); }
.btn--lg  { padding: 12px 18px; font-size: var(--font/size/2xl, 16px); }

/* ── Primary ──────────────────────────────────────── */
.btn--primary {
  background: var(--color/primary/blue/600, #155EEF);
  border-color: var(--color/primary/blue/600, #155EEF);
  color: var(--color/neutral/white/base, #FFFFFF);
  box-shadow: var(--shadow-xs, 0px 1px 2px 0px rgba(16,24,40,0.05));
}
.btn--primary:hover {
  background: var(--color/primary/blue/800, #0040C1);
  border-color: var(--color/primary/blue/700, #004EEB);
}
.btn--primary:active {
  background: var(--color/primary/blue/900, #00359E);
  border-color: var(--color/primary/blue/600, #155EEF);
}
.btn--primary:focus-visible {
  background: var(--color/primary/blue/800, #0040C1);
  border-color: var(--color/primary/blue/600, #155EEF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
  outline: none;
}
.btn--primary:disabled,
.btn--primary[aria-disabled="true"] {
  background: var(--color/primary/blue/200, #B2CCFF);
  border-color: var(--color/primary/blue/200, #B2CCFF);
  cursor: not-allowed;
  box-shadow: none;
}

/* ── Secondary ────────────────────────────────────── */
.btn--secondary {
  background: var(--color/neutral/white/base, #FFFFFF);
  border-color: var(--color/primary/blue/300, #84ADFF);
  color: var(--color/primary/blue/700, #004EEB);
  box-shadow: var(--shadow-xs);
}
.btn--secondary:hover {
  background: var(--color/primary/blue/50, #EFF4FF);
  border-color: var(--color/primary/blue/600, #155EEF);
}
.btn--secondary:active {
  background: var(--color/primary/blue/50, #EFF4FF);
  border-color: var(--color/primary/blue/700, #004EEB);
}
.btn--secondary:focus-visible {
  border-color: var(--color/primary/blue/300, #84ADFF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
  outline: none;
}
.btn--secondary:disabled,
.btn--secondary[aria-disabled="true"] {
  border-color: var(--color/primary/blue/200, #B2CCFF);
  color: var(--color/primary/blue/300, #84ADFF);
  cursor: not-allowed;
  box-shadow: none;
}

/* ── Tertiary ─────────────────────────────────────── */
.btn--tertiary {
  background: var(--color/primary/blue/50, #EFF4FF);
  border-color: var(--color/primary/blue/50, #EFF4FF);
  color: var(--color/primary/blue/700, #004EEB);
  box-shadow: var(--shadow-xs);
}
.btn--tertiary:hover {
  background: var(--color/primary/blue/100, #D1E0FF);
  border-color: var(--color/primary/blue/100, #D1E0FF);
}
.btn--tertiary:active {
  background: var(--color/primary/blue/200, #B2CCFF);
  border-color: var(--color/primary/blue/200, #B2CCFF);
}
.btn--tertiary:focus-visible {
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
  outline: none;
}
.btn--tertiary:disabled,
.btn--tertiary[aria-disabled="true"] {
  background: var(--color/primary/blue/25, #F5F8FF);
  border-color: var(--color/primary/blue/25, #F5F8FF);
  color: var(--color/primary/blue/300, #84ADFF);
  cursor: not-allowed;
  box-shadow: none;
}

/* ── Ghost ────────────────────────────────────────── */
.btn--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--color/primary/blue/700, #004EEB);
}
.btn--ghost:hover {
  background: var(--color/primary/blue/50, #EFF4FF);
}
.btn--ghost:active {
  background: var(--color/primary/blue/100, #D1E0FF);
}
.btn--ghost:focus-visible {
  box-shadow: 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
  outline: none;
}
.btn--ghost:disabled,
.btn--ghost[aria-disabled="true"] {
  color: var(--color/primary/blue/300, #84ADFF);
  cursor: not-allowed;
}

/* ── Link ─────────────────────────────────────────── */
.btn--link {
  background: transparent;
  border-color: transparent;
  color: var(--color/primary/blue/700, #004EEB);
  text-decoration: underline;
  text-underline-offset: 2px;
  padding-left: 0;
  padding-right: 0;
}
.btn--link:hover {
  color: var(--color/primary/blue/800, #0040C1);
}
.btn--link:disabled,
.btn--link[aria-disabled="true"] {
  color: var(--color/primary/blue/300, #84ADFF);
  cursor: not-allowed;
}

/* ── Destructive overrides ────────────────────────── */
.btn--destructive.btn--primary {
  background: var(--color/secondary/error/600, #D92D20);
  border-color: var(--color/secondary/error/600, #D92D20);
  color: var(--color/neutral/white/base, #FFFFFF);
}
.btn--destructive.btn--primary:hover {
  background: var(--color/secondary/error/700, #B42318);
  border-color: var(--color/secondary/error/700, #B42318);
}
.btn--destructive.btn--primary:active {
  background: var(--color/secondary/error/800, #912018);
  border-color: var(--color/secondary/error/800, #912018);
}
.btn--destructive.btn--primary:focus-visible {
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/secondary/error/100, #FEE4E2);
  outline: none;
}
.btn--destructive.btn--primary:disabled,
.btn--destructive.btn--primary[aria-disabled="true"] {
  background: var(--color/secondary/error/200, #FECDCA);
  border-color: var(--color/secondary/error/200, #FECDCA);
  cursor: not-allowed;
}
.btn--destructive.btn--secondary {
  background: var(--color/neutral/white/base, #FFFFFF);
  border-color: var(--color/secondary/error/300, #FDA29B);
  color: var(--color/secondary/error/700, #B42318);
}
.btn--destructive.btn--secondary:hover {
  background: var(--color/secondary/error/50, #FEF3F2);
  border-color: var(--color/secondary/error/600, #D92D20);
}
```

**Usage rules:**
- Never use `disabled` attribute on buttons that just need visual suppression — use `aria-disabled="true"` and prevent click via JS when the action is contextually unavailable but the button should remain keyboard-focusable.
- Icon-only buttons must have an `aria-label`.
- Loading state: add `aria-busy="true"` and replace label text with a spinner.

---

## Text Input (Input Field)

**Purpose:** Single-line text entry. Used for names, emails, passwords, search queries, and other short-form data.

**Variants (Type):** `icon-leading` (default shown), `text-only`, `payment`, `date-picker`, `time-picker`

**States:** `default`, `focused`, `filled`, `disabled`, `destructive` (error)

**Sizes:**

| Size | Height | H-Padding | V-Padding |
|------|--------|-----------|-----------|
| 3xs  | 24px   | 10px      | 2px       |
| 2xs  | 28px   | 10px      | 4px       |
| xs   | 32px   | 12px      | 6px       |
| sm   | 36px   | 12px      | 8px       |
| **md** ★ | **40px** | **12px** | **10px** |
| lg   | 44px   | 14px      | 12px      |

★ = md confirmed from node `26683:37588`.

**Anatomy:**
- `__icon-left` (optional): 20×20px leading icon
- `__input`: native `<input>` element, flex-grow
- `__help-icon` (optional): 16×16px help-circle icon at trailing end
- `__clear-btn` (optional): 16×16px ×-icon shown when filled

**Specs (md · Default · node `26683:37588`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #FFFFFF | `--color/neutral/white/base` |
| Border | 1px solid #D0D5DD | `--color/neutral/gray/300` |
| Border radius | 8px | — |
| Box shadow | 0px 1px 2px 0px rgba(16,24,40,0.05) | `--shadow-xs` |
| Padding (H) | 12px | — |
| Padding (V) | 10px | — |
| Height | 40px | — |
| Gap (icon → text) | 8px | — |
| Text color | #101828 | `--color/neutral/gray/900` |
| Placeholder color | #667085 | `--color/neutral/gray/500` |
| Font family | Inter | — |
| Font size | 16px | `--font/size/2xl` |
| Font weight | 400 | `--font/weight/regular` |
| Line height | 24px | `--font/line-height/2xl` |

**State deltas (md):**

| State | Background | Border | Box Shadow | Text Color |
|-------|-----------|--------|------------|------------|
| Default | white | `gray/300` #D0D5DD | `--shadow-xs` | `gray/900` |
| Focused | white | `blue/300` #84ADFF | `--shadow-xs` + `0 0 0 4px #D1E0FF` | `gray/900` |
| Filled | white | `gray/300` #D0D5DD | `--shadow-xs` | `gray/900` |
| Disabled | `gray/50` #F9FAFB | `gray/300` #D0D5DD | none | `gray/400` #98A2B3 |
| Destructive | white | `error/300` #FDA29B | `--shadow-xs` | `gray/900` |
| Destructive+Focused | white | `error/300` #FDA29B | `--shadow-xs` + `0 0 0 4px #FEE4E2` (error/100) | `gray/900` |

**CSS (paste-ready):**

```css
/* ── Input Field base ─────────────────────────────── */
.input {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: var(--color/neutral/white/base, #FFFFFF);
  border: 1px solid var(--color/neutral/gray/300, #D0D5DD);
  border-radius: 8px;
  box-shadow: var(--shadow-xs, 0px 1px 2px 0px rgba(16,24,40,0.05));
  overflow: hidden;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

/* ── Sizes ─────────────────────────────────────────── */
.input--3xs { height: 24px; padding: 2px 10px;  }
.input--2xs { height: 28px; padding: 4px 10px;  }
.input--xs  { height: 32px; padding: 6px 12px;  }
.input--sm  { height: 36px; padding: 8px 12px;  }
.input--md  { height: 40px; padding: 10px 12px; }
.input--lg  { height: 44px; padding: 12px 14px; }

.input__field {
  flex: 1 0 0;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/2xl, 16px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/2xl, 24px);
  letter-spacing: var(--font/letter-spacing/normal, 0px);
  color: var(--color/neutral/gray/900, #101828);
}
.input__field::placeholder {
  color: var(--color/neutral/gray/500, #667085);
}
.input__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color/neutral/gray/500, #667085);
}
.input__help-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color/neutral/gray/400, #98A2B3);
}

/* ── States ────────────────────────────────────────── */
.input:focus-within,
.input--focused {
  border-color: var(--color/primary/blue/300, #84ADFF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}
.input--disabled,
.input:has(.input__field:disabled) {
  background: var(--color/neutral/gray/50, #F9FAFB);
  cursor: not-allowed;
  box-shadow: none;
}
.input--disabled .input__field,
.input__field:disabled {
  color: var(--color/neutral/gray/400, #98A2B3);
  cursor: not-allowed;
}
.input--error {
  border-color: var(--color/secondary/error/300, #FDA29B);
}
.input--error:focus-within,
.input--error.input--focused {
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/secondary/error/100, #FEE4E2);
}
```

**Usage rules:**
- Always pair with a `<label>` element (use `for`/`id` binding or `aria-label` for icon-only inputs).
- Destructive state triggers on blur if validation fails; not during typing.
- The help-circle icon opens a tooltip with field guidance.

---

## Textarea

**Purpose:** Multi-line text entry for longer form content (notes, descriptions, messages).

**Variants:** `default` (resizable), `fixed-height`

**States:** `default`, `focused`, `filled`, `disabled`, `destructive`

**Sizes:**

| Size | Min-Height | H-Padding | V-Padding |
|------|-----------|-----------|-----------|
| sm   | 80px  | 12px | 10px |
| **md** ★ | **98px** | **12px** | **10px** |
| lg   | 128px | 14px | 12px |

★ = Shares base tokens with Input Field (node `26683:37588`). Figma component key: `d6eab3b1d682e03905d8ffe2a0569e338669251b`.

**Anatomy:**
- `__textarea`: native `<textarea>`, flex-grow, user-resizable (vertical)
- `__resize-handle`: browser-native resize grip at bottom-right
- `__char-count` (optional): trailing character count label

**Specs (md · Default):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #FFFFFF | `--color/neutral/white/base` |
| Border | 1px solid #D0D5DD | `--color/neutral/gray/300` |
| Border radius | 8px | — |
| Box shadow | 0px 1px 2px 0px rgba(16,24,40,0.05) | `--shadow-xs` |
| Padding | 10px 12px | — |
| Min-height | 98px | — |
| Text color | #101828 | `--color/neutral/gray/900` |
| Placeholder color | #667085 | `--color/neutral/gray/500` |
| Font size | 16px | `--font/size/2xl` |
| Font weight | 400 | `--font/weight/regular` |
| Line height | 24px | `--font/line-height/2xl` |

**State deltas:** identical to Text Input (same tokens applied to the textarea wrapper).

**CSS (paste-ready):**

```css
/* ── Textarea ──────────────────────────────────────── */
.textarea {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--color/neutral/white/base, #FFFFFF);
  border: 1px solid var(--color/neutral/gray/300, #D0D5DD);
  border-radius: 8px;
  box-shadow: var(--shadow-xs, 0px 1px 2px 0px rgba(16,24,40,0.05));
  overflow: hidden;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.textarea__field {
  flex: 1 0 0;
  padding: 10px 12px;
  min-height: 98px;
  border: none;
  outline: none;
  background: transparent;
  resize: vertical;
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/2xl, 16px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/2xl, 24px);
  color: var(--color/neutral/gray/900, #101828);
}
.textarea__field::placeholder {
  color: var(--color/neutral/gray/500, #667085);
}
.textarea:focus-within {
  border-color: var(--color/primary/blue/300, #84ADFF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}
.textarea--disabled,
.textarea:has(.textarea__field:disabled) {
  background: var(--color/neutral/gray/50, #F9FAFB);
  box-shadow: none;
}
.textarea--disabled .textarea__field,
.textarea__field:disabled {
  color: var(--color/neutral/gray/400, #98A2B3);
  cursor: not-allowed;
  resize: none;
}
.textarea--error {
  border-color: var(--color/secondary/error/300, #FDA29B);
}
.textarea--error:focus-within {
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/secondary/error/100, #FEE4E2);
}
```

---

## Search Input

**Purpose:** Inline search with magnifying-glass leading icon; often triggers real-time results.

**Note:** In HighRise 1.1 the Search Input is a variant of the **Select** component (`Type=Search`). It shares the same tokens and sizing system. A standalone search-specific input field can also be built from the **Input Field** with a search icon.

**Variants (from Select · Type=Search):**
- State=Default, State=Placeholder, State=Open (results open), State=Disabled
- Sizes: 3xs → lg (24px → 44px)

**Specs (md · Default · node `26683:58189`):**
Same as Select Default below, with:
- Leading 20×20px search icon (color `gray/400` #98A2B3)
- Placeholder text color `gray/500` #667085
- Open state: border `blue/300`, shadow `--shadow-xs + 0 0 0 4px #D1E0FF`

**CSS:** See `.select--search` variant in the Select section below.

---

## Select / Dropdown

**Purpose:** Presents a list of mutually exclusive options in a collapsed trigger; expands to a dropdown menu.

**Variants (Type):** `default`, `icon-leading`, `search`, `tags` (multi-select), `avatar-leading`

**States:** `default` (value selected), `placeholder` (no value), `open` (dropdown visible), `disabled`

**Sizes:**

| Size | Height |
|------|--------|
| 3xs  | 24px   |
| 2xs  | 28px   |
| xs   | 32px   |
| sm   | 36px   |
| **md** ★ | **40px** |
| lg   | 44px   |

★ = md confirmed from nodes `26683:57788` (Default), `27343:31373` (Disabled), `26683:57890` (Open).

**Anatomy:**
- `__trigger`: the clickable button element
- `__icon-left` (optional): 20×20px leading icon or avatar
- `__value`: selected option text (gray/900) or placeholder text (gray/500)
- `__supporting-text` (optional): secondary description alongside value
- `__chevron`: 20×20px chevron-down icon; rotates 180° in Open state
- `__dropdown`: the floating list panel (positioned below trigger)

**Specs (md · Default · node `26683:57788`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #FFFFFF | `--color/neutral/white/base` |
| Border | 1px solid #D0D5DD | `--color/neutral/gray/300` |
| Border radius | 8px | — |
| Box shadow | 0px 1px 2px 0px rgba(16,24,40,0.05) | `--shadow-xs` |
| Padding | 8px 14px | — |
| Height | 40px | — |
| Gap (icon → value) | 8px | — |
| Value color | #101828 | `--color/neutral/gray/900` |
| Placeholder color | #667085 | `--color/neutral/gray/500` |
| Supporting text color | #475467 | `--color/neutral/gray/600` |
| Chevron size | 20×20px | — |
| Font size | 16px | `--font/size/2xl` |
| Font weight | 400 | `--font/weight/regular` |
| Line height | 24px | `--font/line-height/2xl` |

**State deltas (md · Default type):**

| State | Background | Border | Box Shadow | Text Color |
|-------|-----------|--------|------------|------------|
| Default | white | `gray/300` | `--shadow-xs` | `gray/900` |
| Placeholder | white | `gray/300` | `--shadow-xs` | `gray/500` |
| Open | white | `blue/300` #84ADFF | `--shadow-xs` + `0 0 0 4px #D1E0FF` | `gray/900` |
| Disabled | `gray/50` #F9FAFB | `gray/300` | none | `gray/400` #98A2B3 |

**CSS (paste-ready):**

```css
/* ── Select / Dropdown ─────────────────────────────── */
.select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 320px; /* typical constraint; override as needed */
}
.select__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 14px;
  height: 40px;
  background: var(--color/neutral/white/base, #FFFFFF);
  border: 1px solid var(--color/neutral/gray/300, #D0D5DD);
  border-radius: 8px;
  box-shadow: var(--shadow-xs, 0px 1px 2px 0px rgba(16,24,40,0.05));
  cursor: pointer;
  overflow: hidden;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

/* ── Sizes ─────────────────────────────────────────── */
.select--3xs .select__trigger { height: 24px; padding: 0 10px;  font-size: var(--font/size/sm, 12px);  }
.select--2xs .select__trigger { height: 28px; padding: 2px 10px; font-size: var(--font/size/lg, 14px); }
.select--xs  .select__trigger { height: 32px; padding: 4px 12px; font-size: var(--font/size/lg, 14px); }
.select--sm  .select__trigger { height: 36px; padding: 6px 12px; font-size: var(--font/size/xl, 15px); }
.select--md  .select__trigger { height: 40px; padding: 8px 14px; font-size: var(--font/size/2xl, 16px); }
.select--lg  .select__trigger { height: 44px; padding: 10px 14px; font-size: var(--font/size/2xl, 16px); }

.select__content {
  flex: 1 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
}
.select__value {
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/2xl, 16px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/2xl, 24px);
  color: var(--color/neutral/gray/900, #101828);
  white-space: nowrap;
}
.select--placeholder .select__value {
  color: var(--color/neutral/gray/500, #667085);
}
.select__chevron {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color/neutral/gray/500, #667085);
  transition: transform 150ms ease;
}

/* ── States ────────────────────────────────────────── */
.select--open .select__trigger,
.select__trigger[aria-expanded="true"] {
  border-color: var(--color/primary/blue/300, #84ADFF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}
.select--open .select__chevron,
.select__trigger[aria-expanded="true"] .select__chevron {
  transform: rotate(180deg);
}
.select--disabled .select__trigger,
.select__trigger:disabled {
  background: var(--color/neutral/gray/50, #F9FAFB);
  cursor: not-allowed;
  box-shadow: none;
}
.select--disabled .select__value {
  color: var(--color/neutral/gray/400, #98A2B3);
}

/* ── Search variant ────────────────────────────────── */
.select--search .select__trigger {
  /* search icon replaces chevron on left */
}

/* ── Tags (multi-select) variant ───────────────────── */
.select--tags .select__trigger {
  height: auto;
  min-height: 40px;
  flex-wrap: wrap;
  gap: 4px;
}
```

---

## Checkbox

**Purpose:** Binary on/off selection; can be used individually or in groups. Supports indeterminate state.

**Variants:** `default` (square), `indeterminate` (dash)

**States:** `unchecked`, `checked`, `indeterminate`, `disabled-unchecked`, `disabled-checked`, `error`

**Sizes:**

| Size | Box Size | Border Radius |
|------|----------|---------------|
| sm ★ | 16×16px  | 4px |
| md   | 20×20px  | 4px |
| lg   | 24×24px  | 6px |

★ = sm confirmed from nodes `26949:6777` (unchecked) and `26949:6801` (checked).

**Anatomy:**
- `__box`: the visual indicator square with border/fill
- `__check` (checked): SVG checkmark inside `__box`
- `__dash` (indeterminate): horizontal dash inside `__box`
- `__label` (optional): adjacent text label

**Specs (sm · Unchecked · Default · node `26949:6777`):**

| Property | Value | Token |
|----------|-------|-------|
| Width × Height | 16×16px | — |
| Border | 1px solid #98A2B3 | `--color/neutral/gray/400` |
| Border radius | 4px | — |
| Background | #FFFFFF | `--color/neutral/white/base` |

**Specs (sm · Checked · Default · node `26949:6801`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #155EEF | `--color/primary/blue/600` |
| Border | 1px solid #155EEF | `--color/primary/blue/600` |
| Checkmark color | #FFFFFF | `--color/neutral/white/base` |

**CSS (paste-ready):**

```css
/* ── Checkbox ──────────────────────────────────────── */
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border: 1px solid var(--color/neutral/gray/400, #98A2B3);
  border-radius: 4px;
  background: var(--color/neutral/white/base, #FFFFFF);
  transition: background 150ms ease, border-color 150ms ease;
}
.checkbox__check,
.checkbox__dash {
  display: none;
  width: 10px;
  height: 10px;
  color: var(--color/neutral/white/base, #FFFFFF);
}

/* ── Sizes ─────────────────────────────────────────── */
.checkbox--md .checkbox__box { width: 20px; height: 20px; }
.checkbox--lg .checkbox__box { width: 24px; height: 24px; border-radius: 6px; }

/* ── Checked ───────────────────────────────────────── */
.checkbox--checked .checkbox__box,
input[type="checkbox"]:checked + .checkbox__box {
  background: var(--color/primary/blue/600, #155EEF);
  border-color: var(--color/primary/blue/600, #155EEF);
}
.checkbox--checked .checkbox__check,
input[type="checkbox"]:checked + .checkbox__box .checkbox__check {
  display: block;
}

/* ── Indeterminate ─────────────────────────────────── */
.checkbox--indeterminate .checkbox__box {
  background: var(--color/primary/blue/600, #155EEF);
  border-color: var(--color/primary/blue/600, #155EEF);
}
.checkbox--indeterminate .checkbox__dash {
  display: block;
}

/* ── Hover ─────────────────────────────────────────── */
.checkbox:hover .checkbox__box {
  border-color: var(--color/primary/blue/600, #155EEF);
}
.checkbox--checked:hover .checkbox__box {
  background: var(--color/primary/blue/800, #0040C1);
  border-color: var(--color/primary/blue/800, #0040C1);
}

/* ── Focus ─────────────────────────────────────────── */
.checkbox:focus-within .checkbox__box {
  box-shadow: 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}

/* ── Error ─────────────────────────────────────────── */
.checkbox--error .checkbox__box {
  border-color: var(--color/secondary/error/500, #F04438);
}

/* ── Disabled ──────────────────────────────────────── */
.checkbox--disabled {
  cursor: not-allowed;
}
.checkbox--disabled .checkbox__box {
  background: var(--color/neutral/gray/100, #F2F4F7);
  border-color: var(--color/neutral/gray/300, #D0D5DD);
}
.checkbox--disabled .checkbox__check,
.checkbox--disabled .checkbox__dash {
  color: var(--color/neutral/gray/400, #98A2B3);
}
```

---

## Radio

**Purpose:** Single-select from a mutually exclusive set of options. Always used in a group.

**Variants:** `default`

**States:** `unchecked`, `checked`, `disabled-unchecked`, `disabled-checked`, `error`

**Sizes:**

| Size | Box Size | Border Radius |
|------|----------|---------------|
| sm ★ | 16×16px  | 50% (circle) |
| md   | 20×20px  | 50% |
| lg   | 24×24px  | 50% |

★ = sm confirmed from nodes `26949:6779` (unchecked) and `26949:6809` (checked).

**Anatomy:**
- `__dot`: circular outer ring
- `__inner-dot` (checked): filled inner circle
- `__label` (optional): adjacent text

**Specs (sm · Unchecked · Default · node `26949:6779`):**

| Property | Value | Token |
|----------|-------|-------|
| Width × Height | 16×16px | — |
| Border | 1px solid #98A2B3 | `--color/neutral/gray/400` |
| Border radius | 50% | — |
| Background | #FFFFFF | `--color/neutral/white/base` |

**Specs (sm · Checked · Default · node `26949:6809`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #155EEF | `--color/primary/blue/600` |
| Border | 1px solid #155EEF | `--color/primary/blue/600` |
| Inner dot | 6×6px white circle | — |

**CSS (paste-ready):**

```css
/* ── Radio ─────────────────────────────────────────── */
.radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.radio__dot {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border: 1px solid var(--color/neutral/gray/400, #98A2B3);
  border-radius: 50%;
  background: var(--color/neutral/white/base, #FFFFFF);
  transition: background 150ms ease, border-color 150ms ease;
}
.radio__inner-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color/neutral/white/base, #FFFFFF);
  opacity: 0;
  transition: opacity 150ms ease;
}

/* ── Sizes ─────────────────────────────────────────── */
.radio--md .radio__dot { width: 20px; height: 20px; }
.radio--md .radio__inner-dot { width: 8px; height: 8px; }
.radio--lg .radio__dot { width: 24px; height: 24px; }
.radio--lg .radio__inner-dot { width: 10px; height: 10px; }

/* ── Checked ───────────────────────────────────────── */
.radio--checked .radio__dot,
input[type="radio"]:checked + .radio__dot {
  background: var(--color/primary/blue/600, #155EEF);
  border-color: var(--color/primary/blue/600, #155EEF);
}
.radio--checked .radio__inner-dot,
input[type="radio"]:checked + .radio__dot .radio__inner-dot {
  opacity: 1;
}

/* ── Hover ─────────────────────────────────────────── */
.radio:hover .radio__dot {
  border-color: var(--color/primary/blue/600, #155EEF);
}
.radio--checked:hover .radio__dot {
  background: var(--color/primary/blue/800, #0040C1);
  border-color: var(--color/primary/blue/800, #0040C1);
}

/* ── Focus ─────────────────────────────────────────── */
.radio:focus-within .radio__dot {
  box-shadow: 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}

/* ── Error ─────────────────────────────────────────── */
.radio--error .radio__dot {
  border-color: var(--color/secondary/error/500, #F04438);
}

/* ── Disabled ──────────────────────────────────────── */
.radio--disabled {
  cursor: not-allowed;
}
.radio--disabled .radio__dot {
  background: var(--color/neutral/gray/100, #F2F4F7);
  border-color: var(--color/neutral/gray/300, #D0D5DD);
}
.radio--disabled .radio__inner-dot {
  background: var(--color/neutral/gray/400, #98A2B3);
}
```

---

## Toggle Switch

**Purpose:** Binary on/off control; like a hardware switch. Provides immediate effect without needing form submission.

**Variants:** `default`

**States:** `off` (pressed=false), `on` (pressed=true), `disabled-off`, `disabled-on`, `error`

**Sizes:**

| Size | Track W × H | Track Radius | Thumb Size | Thumb Offset |
|------|------------|--------------|------------|--------------|
| sm   | 28×16px | 10px | 12px | 2px |
| **md** ★ | **36×20px** | **12px** | **16px** | **2px** |
| lg   | 44×24px | 14px | 20px | 2px |

★ = md confirmed from nodes `26953:6032` (off) and `26953:5984` (on).

**Anatomy:**
- `__track`: pill-shaped background container
- `__thumb`: white circle that slides left (off) → right (on)

**Specs (md · Off · node `26953:6032`):**

| Property | Value | Token |
|----------|-------|-------|
| Track width | 36px | — |
| Track height | 20px | — |
| Track border-radius | 12px | — |
| Track background | #F2F4F7 | `--color/neutral/gray/100` |
| Track padding | 2px | — |
| Thumb size | 16×16px | — |
| Thumb background | #FFFFFF | `--color/neutral/white/base` |
| Thumb border-radius | 50% | — |
| Thumb box shadow | 0px 1px 2px 0px rgba(16,24,40,0.06), 0px 1px 3px 0px rgba(16,24,40,0.10) | `--shadow-sm` |

**Specs (md · On · node `26953:5984`):**

| Property | Value | Token |
|----------|-------|-------|
| Track background | #155EEF | `--color/primary/blue/600` |
| Thumb position | right (justify-content: flex-end) | — |

**CSS (paste-ready):**

```css
/* ── Toggle Switch ─────────────────────────────────── */
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.toggle__track {
  position: relative;
  display: flex;
  align-items: center;
  width: 36px;
  height: 20px;
  padding: 2px;
  border-radius: 12px;
  background: var(--color/neutral/gray/100, #F2F4F7);
  transition: background 150ms ease;
}
.toggle__thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color/neutral/white/base, #FFFFFF);
  box-shadow: var(--shadow-sm, 0px 1px 3px 0px rgba(16,24,40,0.10), 0px 1px 2px 0px rgba(16,24,40,0.06));
  transition: transform 150ms ease;
  flex-shrink: 0;
}

/* ── Sizes ─────────────────────────────────────────── */
.toggle--sm .toggle__track  { width: 28px; height: 16px; border-radius: 10px; }
.toggle--sm .toggle__thumb  { width: 12px; height: 12px; }
.toggle--lg .toggle__track  { width: 44px; height: 24px; border-radius: 14px; }
.toggle--lg .toggle__thumb  { width: 20px; height: 20px; }

/* ── On state ──────────────────────────────────────── */
.toggle--on .toggle__track,
input[type="checkbox"]:checked + .toggle__track {
  background: var(--color/primary/blue/600, #155EEF);
}
.toggle--on .toggle__thumb,
input[type="checkbox"]:checked + .toggle__track .toggle__thumb {
  transform: translateX(16px); /* 36 - 2*2 - 16 = 16px */
}
.toggle--sm.toggle--on .toggle__thumb  { transform: translateX(12px); }
.toggle--lg.toggle--on .toggle__thumb  { transform: translateX(20px); }

/* ── Hover ─────────────────────────────────────────── */
.toggle:hover .toggle__track {
  background: var(--color/neutral/gray/200, #EAECF0);
}
.toggle--on:hover .toggle__track {
  background: var(--color/primary/blue/700, #004EEB);
}

/* ── Focus ─────────────────────────────────────────── */
.toggle:focus-within .toggle__track {
  box-shadow: 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}

/* ── Disabled ──────────────────────────────────────── */
.toggle--disabled {
  cursor: not-allowed;
}
.toggle--disabled .toggle__track {
  background: var(--color/neutral/gray/100, #F2F4F7);
  opacity: 0.5;
}
.toggle--disabled.toggle--on .toggle__track {
  background: var(--color/primary/blue/200, #B2CCFF);
}
```

---

## Date Picker

**Purpose:** Single-line input for entering or selecting a date (DD/MM/YYYY). Triggers an Inline Date Picker calendar on open.

**Variants:** `date-picker` type on the Input Field component

**States:** `default`, `focused`, `filled`, `disabled`, `destructive`

**Sizes:** Same as Input Field (3xs → lg; see height table above).

**Anatomy:**
- `__calendar-icon`: 20×20px calendar icon at leading position (color `gray/500`)
- `__day`: "DD" text segment
- `__sep`: "/" separator
- `__month`: "MM" text segment
- `__year`: "YYYY" text segment
- All segments share `gray/500` placeholder color until filled

**Specs (md · Default · node `28447:19999`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #FFFFFF | `--color/neutral/white/base` |
| Border | 1px solid #D0D5DD | `--color/neutral/gray/300` |
| Border radius | 8px | — |
| Box shadow | `--shadow-xs` | — |
| Height | 40px | — |
| Padding H | 12px | — |
| Leading icon | calendar, 20×20px | — |
| Segment gap | 4px | — |
| Segment text color | #667085 | `--color/neutral/gray/500` |
| Font size | 16px | `--font/size/2xl` |
| Format | DD / MM / YYYY | — |

**CSS (paste-ready):**

```css
/* ── Date Picker Input ─────────────────────────────── */
.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  background: var(--color/neutral/white/base, #FFFFFF);
  border: 1px solid var(--color/neutral/gray/300, #D0D5DD);
  border-radius: 8px;
  box-shadow: var(--shadow-xs);
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.date-picker__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color/neutral/gray/500, #667085);
}
.date-picker__segments {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
}
.date-picker__segment,
.date-picker__sep {
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/2xl, 16px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/2xl, 24px);
  color: var(--color/neutral/gray/500, #667085);
  white-space: nowrap;
}
.date-picker__segment--filled {
  color: var(--color/neutral/gray/900, #101828);
}
.date-picker:focus-within {
  border-color: var(--color/primary/blue/300, #84ADFF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}
.date-picker--error {
  border-color: var(--color/secondary/error/300, #FDA29B);
}
.date-picker--disabled {
  background: var(--color/neutral/gray/50, #F9FAFB);
  cursor: not-allowed;
  box-shadow: none;
}
.date-picker--disabled .date-picker__segment,
.date-picker--disabled .date-picker__sep {
  color: var(--color/neutral/gray/400, #98A2B3);
}
```

---

## Time Picker

**Purpose:** Single-line input for entering or selecting a time (HH:MM:SS). Triggers a time selection dropdown on open.

**Variants:** `time-picker` type on the Input Field component

**States:** same as Date Picker

**Sizes:** same sizing system as Input Field.

**Anatomy:**
- `__clock-icon`: 20×20px clock icon at leading position (color `gray/500`)
- `__hour` / `__sep` / `__minute` / `__sep` / `__second`: masked segments

**Specs (md · Default · node `28447:21829`):**

| Property | Value | Token |
|----------|-------|-------|
| Background | #FFFFFF | `--color/neutral/white/base` |
| Border | 1px solid #D0D5DD | `--color/neutral/gray/300` |
| Border radius | 8px | — |
| Box shadow | `--shadow-xs` | — |
| Height | 40px | — |
| Padding H | 12px | — |
| Leading icon | clock, 20×20px | — |
| Segment gap | 4px | — |
| Segment text color | #667085 | `--color/neutral/gray/500` |
| Font size | 16px | `--font/size/2xl` |
| Format | HH : MM : SS | — |

**CSS (paste-ready):**

```css
/* ── Time Picker Input ─────────────────────────────── */
.time-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  background: var(--color/neutral/white/base, #FFFFFF);
  border: 1px solid var(--color/neutral/gray/300, #D0D5DD);
  border-radius: 8px;
  box-shadow: var(--shadow-xs);
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.time-picker__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--color/neutral/gray/500, #667085);
}
.time-picker__segments {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
}
.time-picker__segment,
.time-picker__sep {
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/2xl, 16px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/2xl, 24px);
  color: var(--color/neutral/gray/500, #667085);
  white-space: nowrap;
}
.time-picker:focus-within {
  border-color: var(--color/primary/blue/300, #84ADFF);
  box-shadow: var(--shadow-xs), 0 0 0 4px var(--color/primary/blue/100, #D1E0FF);
}
.time-picker--error {
  border-color: var(--color/secondary/error/300, #FDA29B);
}
.time-picker--disabled {
  background: var(--color/neutral/gray/50, #F9FAFB);
  cursor: not-allowed;
  box-shadow: none;
}
```

---

## File Upload

**Purpose:** Drag-and-drop upload zone with file browser fallback; shows uploaded file list below.

**Variants:** `default` (single-file), `multi-file`

**States:** `idle`, `drag-over`, `uploading`, `success`, `error`

> Figma component: "File Uploader" · key `00509180d356e46755a1eec3b7b1c123a5498099` in HighRise 1.1.  
> Node ID not directly extracted; specs below follow HighRise token conventions observed across the file.

**Anatomy:**
- `__zone`: dashed-border drop area with icon, title, and body text
- `__icon`: 40×40px file-upload icon in a bordered rounded container
- `__title`: primary CTA text (e.g. "Click to upload or drag and drop")
- `__hint`: secondary helper text (e.g. "SVG, PNG, JPG or GIF (max. 800×400px)")
- `__file-list`: list of attached File rows below the zone
- `__file`: individual file row — icon, name, size, progress, remove button

**Specs (idle state):**

| Property | Value | Token |
|----------|-------|-------|
| Zone background | #FFFFFF | `--color/neutral/white/base` |
| Zone border | 1px dashed #D0D5DD | `--color/neutral/gray/300` |
| Zone border-radius | 8px | — |
| Zone padding | 16px 24px | — |
| Icon container size | 40×40px | — |
| Icon container border | 1px solid #EAECF0 | `--color/neutral/gray/200` |
| Icon container border-radius | 8px | — |
| Title color | #101828 | `--color/neutral/gray/900` |
| Title font size | 14px | `--font/size/lg` |
| Hint color | #667085 | `--color/neutral/gray/500` |
| Hint font size | 12px | `--font/size/sm` |

**CSS (paste-ready):**

```css
/* ── File Upload Zone ──────────────────────────────── */
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  background: var(--color/neutral/white/base, #FFFFFF);
  border: 1px dashed var(--color/neutral/gray/300, #D0D5DD);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;
}
.file-upload:hover,
.file-upload--drag-over {
  background: var(--color/primary/blue/25, #F5F8FF);
  border-color: var(--color/primary/blue/300, #84ADFF);
}
.file-upload__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color/neutral/gray/200, #EAECF0);
  border-radius: 8px;
  box-shadow: var(--shadow-xs);
  background: var(--color/neutral/white/base, #FFFFFF);
}
.file-upload__icon {
  width: 20px;
  height: 20px;
  color: var(--color/neutral/gray/600, #475467);
}
.file-upload__title {
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/lg, 14px);
  font-weight: var(--font/weight/semibold, 600);
  color: var(--color/neutral/gray/900, #101828);
}
.file-upload__title span {
  color: var(--color/primary/blue/700, #004EEB);
}
.file-upload__hint {
  font-size: var(--font/size/sm, 12px);
  color: var(--color/neutral/gray/500, #667085);
  margin-top: -8px;
}

/* ── File row ──────────────────────────────────────── */
.file-upload__file {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color/neutral/gray/200, #EAECF0);
  border-radius: 8px;
  margin-top: 8px;
  background: var(--color/neutral/white/base, #FFFFFF);
}
.file-upload__file-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}
.file-upload__file-name {
  flex: 1 0 0;
  font-size: var(--font/size/lg, 14px);
  font-weight: var(--font/weight/medium, 500);
  color: var(--color/neutral/gray/700, #344054);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-upload__file-size {
  font-size: var(--font/size/sm, 12px);
  color: var(--color/neutral/gray/500, #667085);
}
.file-upload__file-remove {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color/neutral/gray/400, #98A2B3);
  cursor: pointer;
}
.file-upload__file-remove:hover {
  color: var(--color/secondary/error/500, #F04438);
}
```

---

## Form Field Row

**Purpose:** Composite wrapper that pairs a label, a control (any input), a helper text, and an error message into a consistent vertical layout.

**Not a standalone Figma component** — it is a layout pattern applied consistently across all input types.

**Anatomy:**
- `__label`: `<label>` element; weight 500, color `gray/700`
- `__sublabel` (optional): secondary label or badge
- `__control`: the input control (`.input`, `.select`, `.textarea`, etc.)
- `__helper`: helper/hint text below control; color `gray/500`
- `__error`: error message below control; color `error/500`; shown instead of `__helper` when invalid

**Specs:**

| Element | Font Size | Weight | Color | Token |
|---------|-----------|--------|-------|-------|
| Label | 14px | 500 | #344054 | `--color/neutral/gray/700`, `--font/size/lg` |
| Required asterisk | 14px | 500 | #D92D20 | `--color/secondary/error/600` |
| Helper text | 14px | 400 | #667085 | `--color/neutral/gray/500` |
| Error text | 14px | 400 | #F04438 | `--color/secondary/error/500` |
| Gap: label → control | 6px | — | — | — |
| Gap: control → helper | 6px | — | — | — |

**CSS (paste-ready):**

```css
/* ── Form Field Row ────────────────────────────────── */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.form-field__label {
  font-family: 'Inter', sans-serif;
  font-size: var(--font/size/lg, 14px);
  font-weight: var(--font/weight/medium, 500);
  line-height: var(--font/line-height/xl, 20px);
  color: var(--color/neutral/gray/700, #344054);
}
.form-field__label--required::after {
  content: ' *';
  color: var(--color/secondary/error/600, #D92D20);
}
.form-field__helper {
  font-size: var(--font/size/lg, 14px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/xl, 20px);
  color: var(--color/neutral/gray/500, #667085);
}
.form-field__error {
  font-size: var(--font/size/lg, 14px);
  font-weight: var(--font/weight/regular, 400);
  line-height: var(--font/line-height/xl, 20px);
  color: var(--color/secondary/error/500, #F04438);
}
.form-field--error .form-field__helper {
  display: none;
}
.form-field--error .form-field__error {
  display: block;
}

/* ── Example HTML structure ────────────────────────── */
/*
<div class="form-field form-field--error">
  <label class="form-field__label form-field__label--required" for="email">Email</label>
  <div class="input input--md input--error">
    <input class="input__field" id="email" type="email" />
  </div>
  <p class="form-field__helper">We'll only use your work email.</p>
  <p class="form-field__error" role="alert">Please enter a valid email address.</p>
</div>
*/
```

---

## Mismatches — Pass 2

| Component | Property | Value | Issue |
|-----------|----------|-------|-------|
| Button | Gap (icon→label) | 8px | On 8px grid ✅ |
| Button | V-Padding (md) | 10px | Off 8px grid ⚠️ (4px base) |
| Input Field | Gap (icon→text) | 8px | On 8px grid ✅ |
| Input Field | V-Padding (md) | 10px | Off 8px grid ⚠️ (4px base) |
| Select | V-Padding (md) | 8px | On 8px grid ✅ |
| Form Field Row | Label→control gap | 6px | Off 8px grid ⚠️ (4px base) |
| Checkbox | Box size | 16px | On 4px grid ✅ |
| Toggle | Track height | 20px | Off 8px grid ⚠️ (4px base) |

All flagged values (10px, 6px, 20px) are multiples of the 4px base grid used throughout HighRise 1.1, consistent with the pattern noted in Pass 1.

---

# PASS 3 — DISPLAY

---

## Badge / Tag / Chip

**Purpose:** Compact labels that categorize, identify state, or annotate content inline.

**Variants:**
- Theme=Medium (solid fill), Theme=Outline (border only, transparent bg)
- Rounded=True (pill), Rounded=False (4px radius rectangle)
- Badge=Leading (Tag pill + trailing text label with optional arrow icon)
- Badge=Trailing (text label + trailing Tag pill)
- Colors (13): Gray, Primary, Error, Warning, Success, Blue Gray, Blue Light, Blue, Indigo, Purple, Pink, Rosé, Orange Dark
- Outline=True / Outline=False (controls border rendering)

**States:** Default, Hover, Active, Disabled

**Sizes:**
| Name | Height | Padding H | Font size | Token |
|------|--------|-----------|-----------|-------|
| xs   | 18px   | 6px       | 11px      | --font/size/xs |
| sm   | 22px   | 6px       | 12px      | --font/size/sm |
| md   | 24px   | 8px       | 13px      | --font/size/md |
| lg   | 28px   | 10px      | 13px      | --font/size/md |

**Anatomy:**
- Optional: Checkbox (10px box)
- Optional: Icon (12–16px depending on size)
- Optional: Avatar group (stacked 3xs avatars)
- Required: Label text
- Optional: Count badge (2xs text in rounded-[2px] chip)
- Optional: Dropdown chevron
- Optional: Close ×  (12–20px depending on size, opacity-50 default)

**Specs:**
| Property | Value | Token |
|---|---|---|
| Border-radius (rounded=False) | 4px | — |
| Border-radius (rounded=True) | 9999px | — |
| Height xs | 18px | — |
| Height sm | 22px | — |
| Height md | 24px | — |
| Height lg | 28px | — |
| Font weight | 500 | --font/weight/medium |
| Font size xs | 11px | --font/size/xs |
| Font size sm–md | 12–13px | --font/size/sm / --font/size/md |
| Gap between elements | 2px | — |
| Gray bg (Medium) | #f2f4f7 | --tag/gray/background/default |
| Gray text | #475467 | --tag/gray/label-color/default |
| Primary bg (Medium) | #eff4ff | --tag/primary/background/default |
| Primary text | #004eeb | --tag/primary/label-color/default |
| Success border (Outline) | #039855 | --tag/success/border/default |
| Success text (Outline) | #027a48 | --tag/success/label-color/default |

**CSS (paste-ready):**
```css
/* ── Tag base ── */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-family: Inter, sans-serif;
  font-weight: var(--font-weight-medium, 500);
  letter-spacing: var(--font-letter-spacing-normal, 0px);
  white-space: nowrap;
  border-radius: 4px; /* Rounded=False */
}
.tag--rounded { border-radius: 9999px; }

/* sizes */
.tag--xs  { height: 18px; min-height: 18px; max-height: 18px; padding: 0 6px; font-size: var(--font-size-xs, 11px); line-height: var(--font-line-height-xs, 16px); }
.tag--sm  { height: 22px; min-height: 22px; max-height: 22px; padding: 0 6px; font-size: var(--font-size-sm, 12px); line-height: var(--font-line-height-sm, 17px); }
.tag--md  { height: 24px; min-height: 24px; max-height: 24px; padding: 0 8px; font-size: var(--font-size-md, 13px); line-height: var(--font-line-height-md, 18px); }
.tag--lg  { height: 28px; min-height: 28px; max-height: 28px; padding: 0 10px; font-size: var(--font-size-md, 13px); line-height: var(--font-line-height-md, 18px); }

/* ── Color themes: Medium (solid fill) ── */
.tag--gray-medium    { background: var(--tag-gray-background-default, #f2f4f7); color: var(--tag-gray-label-color-default, #475467); }
.tag--primary-medium { background: var(--tag-primary-background-default, #eff4ff); color: var(--tag-primary-label-color-default, #004eeb); }
.tag--error-medium   { background: #fef3f2; color: #b42318; }
.tag--warning-medium { background: #fffaeb; color: #b54708; }
.tag--success-medium { background: #ecfdf3; color: #027a48; }
.tag--blue-gray-medium  { background: #f8f9fc; color: #363f72; }
.tag--blue-light-medium { background: #f0f9ff; color: #026aa2; }
.tag--blue-medium    { background: #eff8ff; color: #175cd3; }
.tag--indigo-medium  { background: #eef4ff; color: #3538cd; }
.tag--purple-medium  { background: #f4f3ff; color: #5925dc; }
.tag--pink-medium    { background: #fdf2fa; color: #c11574; }
.tag--rose-medium    { background: #fff1f3; color: #c01048; }
.tag--orange-dark-medium { background: #fef6ee; color: #b93815; }

/* ── Color themes: Outline ── */
.tag--gray-outline    { background: transparent; border: 1px solid #d0d5dd; color: #475467; }
.tag--primary-outline { background: transparent; border: 1px solid var(--tag-primary-label-color-default, #004eeb); color: #004eeb; }
.tag--error-outline   { background: transparent; border: 1px solid #fda29b; color: #b42318; }
.tag--warning-outline { background: transparent; border: 1px solid #fec84b; color: #b54708; }
.tag--success-outline { background: transparent; border: 1px solid var(--tag-success-border-default, #039855); color: var(--tag-success-label-color-default, #027a48); }

/* ── Close button ── */
.tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  opacity: 0.5;
  flex-shrink: 0;
  cursor: pointer;
}
.tag--xs .tag__close { width: 12px; height: 12px; padding: 2px; }
.tag--sm .tag__close { width: 14px; height: 14px; padding: 2px; }
.tag--md .tag__close { width: 16px; height: 16px; padding: 2px; }
.tag--lg .tag__close { width: 20px; height: 20px; padding: 2px; }
.tag__close:hover { opacity: 1; }

/* ── States ── */
.tag:hover  { filter: brightness(0.96); }
.tag:active { filter: brightness(0.92); }
.tag--disabled { opacity: 0.4; pointer-events: none; }
```

**Usage rules:**
- Never mix more than 2 Tag colors in a single row of related items.
- Closable × Disabled is not a valid combination — disable the close button separately.
- Badge=Leading is for marketing-style announcements (e.g. "New feature →"), not inline data tags. Use plain Tag for data.
- Max label length: 16 characters before truncation. Apply `text-overflow: ellipsis` via the host element, not inside the Tag.

---

## Avatar

**Purpose:** Circular (or square) image representation of a user, company, or placeholder initials.

**Variants:**
- Placeholder: True (silhouette icon) / False (photo or initials)
- Rounded: True (circle) / False (rounded-[8px] square for xl+)
- Text: True (shows initials "OR") / False
- Status icon: False / Online indicator / Company / Closable

**States:** Default (focus ring on keyboard)

**Sizes:**
| Name | Diameter | Border-radius (circle) |
|------|----------|------------------------|
| 3xs  | 10px     | 83.333px               |
| 2xs  | 16px     | ~133px                 |
| xs   | 24px     | 200px                  |
| sm   | 32px     | 200px                  |
| md   | 40px     | 200px                  |
| lg   | 48px     | 200px                  |
| xl   | 56px     | 200px (round) / 8px (sq) |
| 2xl  | 64px     | 200px (round) / 8px (sq) |

**Anatomy:**
- Image layer (object-cover, fills container)
- Optional: Initials text (center, gray/600)
- Status icon overlay (bottom-right corner):
  - Online indicator: green rounded square, border=white 1.5px
  - Company icon: company logo, overflow-clip, border=white 1.5px
  - Closable: gray/500 rounded square with × icon
- Focus ring: 4px spread, primary-100 (#d1e0ff)

**Specs:**
| Property | Value | Token |
|---|---|---|
| Online indicator color | #039855 | --color/secondary/success/600 |
| Online indicator border | white, 1.5px | --color/neutral/white/base |
| Online indicator size (xs) | 6px | — |
| Online indicator size (sm) | 8px | — |
| Online indicator size (md) | 10px | — |
| Online indicator size (lg) | 12px | — |
| Online indicator size (xl) | 14px | — |
| Online indicator size (2xl) | 16px | — |
| Closable indicator bg | #667085 | --color/neutral/gray/500 |
| Placeholder bg | #f2f4f7 | --color/neutral/gray/100 |
| Initials color | #475467 | --color/neutral/gray/600 |
| Initials size (xl) | 20px | --font/size/4xl |
| Stack overlap (3xs) | -4px margin-right | — |
| Stack border | white, 1px | --color/neutral/white/base |
| Focus ring | 0 0 0 4px #d1e0ff | --focus-ring/4px-primary-100 |

**CSS (paste-ready):**
```css
/* ── Avatar base ── */
.avatar {
  position: relative;
  flex-shrink: 0;
  border-radius: 200px;
  overflow: hidden;
}
.avatar img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  pointer-events: none;
}

/* sizes */
.avatar--3xs { width: 10px;  height: 10px; }
.avatar--2xs { width: 16px;  height: 16px; }
.avatar--xs  { width: 24px;  height: 24px; }
.avatar--sm  { width: 32px;  height: 32px; }
.avatar--md  { width: 40px;  height: 40px; }
.avatar--lg  { width: 48px;  height: 48px; }
.avatar--xl  { width: 56px;  height: 56px; }
.avatar--2xl { width: 64px;  height: 64px; }

/* Square variant (Rounded=False) */
.avatar--square.avatar--xl  { border-radius: 8px; }
.avatar--square.avatar--2xl { border-radius: 8px; }

/* Placeholder initials */
.avatar--placeholder {
  background: var(--color-neutral-gray-100, #f2f4f7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar--placeholder .avatar__initials {
  color: var(--color-neutral-gray-600, #475467);
  font-family: Inter, sans-serif;
  font-weight: var(--font-weight-regular, 400);
  font-size: var(--font-size-4xl, 20px);
  line-height: var(--font-line-height-4xl, 30px);
  text-align: center;
}

/* Status icons (positioned absolute, bottom-right) */
.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1.5px solid var(--color-neutral-white-base, white);
  border-radius: 9999px;
  overflow: hidden;
}
.avatar--xs  .avatar__status { width: 6px;  height: 6px; }
.avatar--sm  .avatar__status { width: 8px;  height: 8px; }
.avatar--md  .avatar__status { width: 10px; height: 10px; }
.avatar--lg  .avatar__status { width: 12px; height: 12px; }
.avatar--xl  .avatar__status { width: 14px; height: 14px; }
.avatar--2xl .avatar__status { width: 16px; height: 16px; }

.avatar__status--online   { background: var(--color-secondary-success-600, #039855); }
.avatar__status--closable { background: var(--color-neutral-gray-500, #667085); }

/* Focus ring */
.avatar:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--color-primary-blue-100, #d1e0ff);
}
```

**Usage rules:**
- Always pair with alt text or aria-label for screen readers.
- Stacked groups use `margin-right: -4px` per avatar (size 3xs); scale the overlap proportionally for larger sizes.
- Show max 5–7 avatars before a "+N more" overflow indicator in groups.
- Never show "Closable" status on a disabled avatar.

---

## Avatar Group

**Purpose:** Display multiple avatars stacked or spaced to represent a team or set of contributors.

**Variants:**
- Stacked=True (negative margin overlap), Stacked=False (positive gap)
- Group (1–10+ avatars), with optional "+N" overflow count chip

**States:** N/A (hover on individual avatars)

**Sizes:** Inherits all Avatar sizes (3xs–2xl)

**Anatomy:**
- Container `div` with `isolate` stacking context
- Rows of Avatar components
- Optional overflow chip ("+N" count)

**Specs:**
| Property | Value | Token |
|---|---|---|
| Stack overlap (3xs) | margin-right: -4px | — |
| Stack overlap (md) | margin-right: -8px | — |
| Stack overlap (lg) | margin-right: -12px | — |
| Avatar border (stacked) | 1px solid white | --color/neutral/white/base |
| Gap (non-stacked, sm) | 2px | — |
| Gap (non-stacked, md) | 4px | — |
| Gap (non-stacked, lg) | 8px | — |
| Overflow chip font | 10–13px, medium | --font/size/2xs to --font/size/md |

**CSS (paste-ready):**
```css
/* ── Avatar group ── */
.avatar-group {
  display: flex;
  align-items: flex-start;
  position: relative;
}

/* Stacked */
.avatar-group--stacked {
  isolation: isolate;
}
.avatar-group--stacked .avatar {
  border: 1px solid var(--color-neutral-white-base, white);
  margin-right: -4px; /* 3xs; scale up for larger sizes */
}
/* 3xs: -4px | xs: -6px | sm: -8px | md: -10px | lg: -12px */
.avatar-group--stacked.avatar-group--xs  .avatar { margin-right: -6px; }
.avatar-group--stacked.avatar-group--sm  .avatar { margin-right: -8px; }
.avatar-group--stacked.avatar-group--md  .avatar { margin-right: -10px; }
.avatar-group--stacked.avatar-group--lg  .avatar { margin-right: -12px; }

/* Non-stacked */
.avatar-group--spaced .avatar { margin-right: 2px; }
.avatar-group--spaced.avatar-group--md .avatar { margin-right: 4px; }
.avatar-group--spaced.avatar-group--lg .avatar { margin-right: 8px; }

/* Overflow "+N" chip */
.avatar-group__overflow {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 200px;
  background: var(--color-neutral-gray-100, #f2f4f7);
  color: var(--color-neutral-gray-600, #475467);
  font-family: Inter, sans-serif;
  font-weight: var(--font-weight-medium, 500);
  font-size: var(--font-size-xs, 11px);
  border: 1px solid var(--color-neutral-white-base, white);
}
```

**Usage rules:**
- Default stacking order: first avatar on top (z-index decrements).
- Show the "+N" chip when the group exceeds the display limit (typically 5–7).
- Non-stacked variant is preferred for interactive avatar lists (where each is clickable).

---

## Statistic / KPI Card

**Purpose:** Surface a single key metric with label, trend indicator, and optional mini sparkline chart.

**Variants:**
- State: Default, Hover, Active
- Graph: True (shows mini trend line chart) / False
- Icon: True (44px icon badge) / False
- Footer: True (divider + CTA "View Report") / False
- Info icon: optional tooltip trigger next to title

**States:** Default, Hover (menu dots appear), Active (selected/pressed)

**Sizes:** Fixed width 431px (can override); also a compact sm variant at ~283px

**Anatomy:**
- Container card (border, shadow, padding 16px, radius 12px)
- Header row: [Icon badge] + [Title + info-icon] + [Trend tag]
- KPI number (Display md / Semibold 36px)
- Trend row: Tag pill (▲/▼ %) + secondary label text
- Mini chart (128×64px, right-aligned)
- Optional footer: divider + "View Report" link
- Menu dots button (hidden by default, revealed on hover)

**Specs:**
| Property | Value | Token |
|---|---|---|
| Container width | 431px | — |
| Container padding | 16px | — |
| Container border-radius | 12px | — |
| Border | 1px, gray/200 | --color/neutral/gray/200 |
| Shadow | 0 1px 1.5px rgba(16,24,40,0.10) + 0 1px 1px rgba(16,24,40,0.06) | --shadow/sm |
| Background | white | --color/neutral/white/base |
| Icon badge size | 44×44px | — |
| Icon badge bg (success) | #d1fadf | --color/secondary/success/100 |
| Icon badge border-radius | 22px | — |
| Icon size in badge | 28px | — |
| KPI font size | 36px | — |
| KPI font weight | 600 | semibold |
| KPI line-height | 44px | — |
| KPI letter-spacing | -0.72px | — |
| KPI color | #101828 | --color/neutral/gray/900 |
| Title font size | 14px | --font/size/lg |
| Title font weight | 500 | --font/weight/medium |
| Title color | #475467 | --color/neutral/gray/600 |
| Trend label color | #344054 | --color/neutral/gray/700 |
| Footer CTA color | #004eeb | --color/primary/blue/700 |
| Footer CTA weight | 600 | --font/weight/semibold |
| Gap inside container | 16px | — |
| Mini chart size | 128×64px | — |

**CSS (paste-ready):**
```css
/* ── Statistic card ── */
.stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 431px;
  background: var(--color-neutral-white-base, white);
  border: 1px solid var(--color-neutral-gray-200, #eaecf0);
  border-radius: 12px;
  box-shadow: 0px 1px 1.5px rgba(16, 24, 40, 0.1), 0px 1px 1px rgba(16, 24, 40, 0.06);
}

/* header row */
.stat-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* icon badge */
.stat-card__icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: var(--color-secondary-success-100, #d1fadf);
  flex-shrink: 0;
}

/* title area */
.stat-card__title {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Inter, sans-serif;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-600, #475467);
  line-height: var(--font-line-height-lg, 20px);
  white-space: nowrap;
}

/* KPI number */
.stat-card__value {
  font-family: Inter, sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  letter-spacing: -0.72px;
  color: var(--color-neutral-gray-900, #101828);
  width: 100%;
}

/* trend row */
.stat-card__trend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.stat-card__trend-label {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-700, #344054);
  flex: 1;
}

/* mini chart */
.stat-card__chart {
  width: 128px;
  height: 64px;
  flex-shrink: 0;
}

/* footer */
.stat-card__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.stat-card__footer-cta {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-md, 13px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-primary-blue-700, #004eeb);
  background: none;
  border: none;
  cursor: pointer;
  line-height: var(--font-line-height-md, 18px);
  white-space: nowrap;
}

/* menu dots (hover-revealed) */
.stat-card__menu {
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.stat-card:hover .stat-card__menu { opacity: 1; }

/* State: Hover */
.stat-card:hover {
  border-color: var(--color-neutral-gray-300, #d0d5dd);
  box-shadow: 0px 4px 8px rgba(16, 24, 40, 0.08), 0px 1px 1px rgba(16, 24, 40, 0.04);
}

/* State: Active */
.stat-card--active,
.stat-card:active {
  border-color: var(--color-primary-blue-600, #155eef);
}
```

**Usage rules:**
- Note: "Card" (generic) in 2. Elements is currently WIP/placeholder in the design file. Statistic is the only production-ready card component.
- Do not hardcode 431px in responsive layouts — allow width to be overridden by the grid column.
- Use the graph=False variant in narrow or dense dashboard grids (saves ~128px width visually).
- Trend tag (▲/▼) must use the Tag component in success/error color, not custom styles.

---

## Table / Data Grid

**Purpose:** Display structured, relational data with sortable columns, row states, and optional controls.

**Variants:**
- Full Table: with toolbar (search + filter), breadcrumb pagination (Top or Bottom), Empty state, Error state
- Building blocks: individual Cell, Row, Header, columns

**States (Cell):**
- Default, Hover, Hover Clickable (row is clickable link), Selected, Highlighted

**Sizes:** Fixed row height: `--size/9` = 36px

**Anatomy:**
- Table container
- Toolbar row: Tag filters + search + action buttons
- Header row: Header cells (gray/50 bg, border-b + border-r)
- Body rows: Body cells (no bg, optional striped alternate)
- Cell content: leading data-type icon + text + sort icons (header) or plain text (body)
- Switch only column: 32px wide checkbox
- Drag handle: 32px handle column
- Expandable row: expand/collapse toggle
- Footer: pagination component
- Empty state / Error state overlay

**Specs:**
| Property | Value | Token |
|---|---|---|
| Row height | 36px | --size/9 |
| Cell padding H | 12px | — |
| Header bg | #f9fafb | --color/neutral/gray/50 |
| Header border-bottom | 1px, gray/300 | --color/neutral/gray/300 |
| Header border-right | 1px, gray/300 | — |
| Header font size | 14px | --font/size/lg |
| Header font weight | 600 | --font/weight/semibold |
| Header text color | #101828 | --color/neutral/gray/900 |
| Body font size | 14px | --font/size/lg |
| Body font weight | 500 | --font/weight/medium |
| Body text color | #475467 | --color/neutral/gray/600 |
| Body text opacity | 0.8 | — |
| Sort icon size | 14px | — |
| Data type icon size | 20px | — |
| Min column width (switch) | 32px | — |
| Striped even row bg | #f9fafb | --color/neutral/gray/50 |
| Selected row bg | #eff4ff | --color/primary/blue/50 |
| Hover row bg | #f9fafb | --color/neutral/gray/50 |

**CSS (paste-ready):**
```css
/* ── Table container ── */
.data-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--color-neutral-gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
}

/* ── Cell base ── */
.table-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: var(--size-9, 36px);
  padding: 0 12px;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
}

/* ── Header cell ── */
.table-cell--header {
  background: var(--color-neutral-gray-50, #f9fafb);
  border-bottom: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  border-right: 1px solid var(--color-neutral-gray-300, #d0d5dd);
}
.table-cell--header .cell-content {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Inter, sans-serif;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-neutral-gray-900, #101828);
  line-height: var(--font-line-height-lg, 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cell-sort-icons {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
}
.cell-sort-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 2px;
}

/* ── Body cell ── */
.table-cell--body .cell-content {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.8;
  font-family: Inter, sans-serif;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-600, #475467);
  line-height: var(--font-line-height-lg, 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

/* ── Row states ── */
.table-row--hover       { background: var(--color-neutral-gray-50, #f9fafb); }
.table-row--clickable   { cursor: pointer; }
.table-row--clickable:hover { background: var(--color-neutral-gray-50, #f9fafb); }
.table-row--selected    { background: var(--color-primary-blue-50, #eff4ff); }
.table-row--highlighted { background: #f0f9ff; } /* blue-light-50 */
.table-row--striped:nth-child(even) { background: var(--color-neutral-gray-50, #f9fafb); }

/* ── Switch-only / checkbox column ── */
.table-cell--switch { width: 32px; min-width: 32px; max-width: 32px; padding: 0 8px; }

/* ── Drag handle column ── */
.table-cell--drag { width: 32px; min-width: 32px; max-width: 32px; cursor: grab; }

/* ── Data type icon ── */
.cell-data-type {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
```

**Usage rules:**
- Always use `--size-9` (36px) for row height — do not override with arbitrary values.
- Sort icons visible on hover of header only; active sort shows single directional arrow.
- "Hover Clickable" state is for rows where the entire row is a navigation target. Use "Hover" state for rows with inline actions only.
- Striped rows alternate using even-child, starting from the second body row.
- Empty state and Error state use the `Empty State` component inserted as a full-width table body replacement.

---

## Progress Indicator

**Purpose:** Communicate completion status of a task or process. Includes linear bar, circular ring, and stepper variants.

**Variants:**
- Progress Bar: determinate (0–100%), indeterminate
- Inline progress value: True (% shown inline at end) / False
- Stepper: True (shows step tick at fill edge) / False
- Progress Circle: Donut, Pie Chart
- Shapes (circle): Circle, Half circle, Quarter circle
- Circle themes: Primary, Neutral, Error, Success, Warning
- Label (circle): True (% + category label in center) / False
- Progress Steps (stepper wizard): Default type, Pill type
- Step states: Completed, Current, Next, Error, Warning, Loading
- Direction: Horizontal, Vertical
- Timeline variant (extended Progress Steps)

**States (bar):** Default, Success (bar fills green), Error (bar fills red), Indeterminate (animated)
**States (step):** Completed, Current, Next, Error, Warning, Loading

**Sizes:**
| Bar size | Track height | Width |
|----------|--------------|-------|
| Fixed    | 8px          | 320px (can stretch) |

| Circle name | Diameter |
|-------------|----------|
| xxxxs       | 16px     |
| xxs         | 64px     |
| xs          | 160px    |
| sm          | 200px    |
| md          | 240px    |
| lg          | 280px    |

| Step element | Size |
|--------------|------|
| Step icon    | 28px circle |
| Line indicator | 2px height |
| Step content font | 15px / Semibold |
| Hint text font | 12px / Medium |

**Anatomy (bar):**
- Label (optional) + info icon
- Track (gray/200, 8px tall, full-width, rounded-[64px])
- Fill bar (blue/600, same height, left-aligned, rounded-[64px])
- Progress % text (optional, 12px, right of track)
- Helper text (optional, below track)

**Anatomy (circle donut):**
- SVG ring (12px padding, arc represents progress %)
- Center label (category text, 14px/medium, gray/600)
- Center value (% number, 36px/medium, gray/900, tracking=-0.72px)

**Anatomy (step):**
- Step icon (28px circle) + Line indicator (2px)
- Step title (15px semibold, gray/900)
- Hint text (12px medium, gray/500)
- Pill variant replaces step icon with 8px pill shape

**Specs (bar):**
| Property | Value | Token |
|---|---|---|
| Track height | 8px | — |
| Track bg | #eaecf0 | --color/neutral/gray/200 |
| Fill color (default) | #155eef | --color/primary/blue/600 |
| Fill color (success) | #039855 | --color/secondary/success/600 |
| Fill color (error) | #d92d20 | --color/secondary/error/600 |
| Border-radius (track) | 64px | — |
| Progress % font | 12px, medium | --font/size/sm, --font/weight/medium |
| Progress % color | #344054 | --color/neutral/gray/700 |
| Label font | 13px, medium | --font/size/md |
| Label color | #344054 | --color/neutral/gray/700 |
| Helper text font | 12px, regular | --font/size/sm |
| Helper text color | #475467 | --color/neutral/gray/600 |
| Step icon size | 28px | — |
| Step icon border | 1px, blue/600 | --color/primary/blue/600 |
| Step icon bg (current) | blue/50 | --color/primary/blue/50 |
| Line indicator width | 2px | — |
| Line indicator color | blue/600 | --color/primary/blue/600 |
| Step title font | 15px semibold | --font/size/xl |
| Step hint font | 12px medium | --font/size/sm |

**CSS (paste-ready):**
```css
/* ── Progress Bar ── */
.progress-bar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 320px;
}
.progress-bar__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Inter, sans-serif;
  font-size: var(--font-size-md, 13px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-700, #344054);
  line-height: var(--font-line-height-md, 18px);
  white-space: nowrap;
}
.progress-bar__track-row {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 16px;
}
.progress-bar__track {
  flex: 1;
  height: 8px;
  background: var(--color-neutral-gray-200, #eaecf0);
  border-radius: 64px;
  position: relative;
  overflow: hidden;
}
.progress-bar__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  background: var(--color-primary-blue-600, #155eef);
  border-radius: 64px;
  transition: width 0.3s ease;
}
/* State: Success */
.progress-bar__fill--success { background: var(--color-secondary-success-600, #039855); }
/* State: Error */
.progress-bar__fill--error   { background: #d92d20; }
/* State: Indeterminate */
.progress-bar__fill--indeterminate {
  width: 40% !important;
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}
@keyframes progress-indeterminate {
  0%   { left: -40%; }
  100% { left: 100%; }
}

.progress-bar__value {
  flex-shrink: 0;
  width: 32px;
  font-family: Inter, sans-serif;
  font-size: var(--font-size-sm, 12px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-700, #344054);
  line-height: var(--font-line-height-sm, 17px);
  text-align: right;
}
.progress-bar__helper {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-sm, 12px);
  font-weight: var(--font-weight-regular, 400);
  color: var(--color-neutral-gray-600, #475467);
  line-height: var(--font-line-height-sm, 17px);
  width: 100%;
}

/* ── Progress Circle (Donut) ── */
.progress-circle {
  position: relative;
  border-radius: 50%;
  flex-shrink: 0;
}
.progress-circle--xxxxs { width: 16px;  height: 16px; }
.progress-circle--xxs   { width: 64px;  height: 64px; }
.progress-circle--xs    { width: 160px; height: 160px; }
.progress-circle--sm    { width: 200px; height: 200px; }
.progress-circle--md    { width: 240px; height: 240px; }
.progress-circle--lg    { width: 280px; height: 280px; }

.progress-circle__ring { position: absolute; inset: 12px; }
.progress-circle__label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
}
.progress-circle__category {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-600, #475467);
  line-height: var(--font-line-height-lg, 20px);
  white-space: nowrap;
}
.progress-circle__value {
  font-family: Inter, sans-serif;
  font-size: 36px;
  font-weight: 500;
  line-height: 44px;
  letter-spacing: -0.72px;
  color: var(--color-neutral-gray-900, #101828);
  white-space: nowrap;
}

/* ── Progress Step ── */
.progress-step {
  display: flex;
  align-items: flex-start;
  position: relative;
}

/* horizontal */
.progress-step--horizontal {
  flex-direction: row;
  width: 274px;
  height: 105px;
}
.progress-step--horizontal .progress-step__rail {
  display: flex;
  align-items: center;
  width: 100%;
}
.progress-step--horizontal .progress-step__line {
  flex: 1;
  height: 2px;
  background: var(--color-neutral-gray-200, #eaecf0);
}
.progress-step--horizontal .progress-step__line--done {
  background: var(--color-primary-blue-600, #155eef);
}

/* vertical */
.progress-step--vertical .progress-step__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progress-step--vertical .progress-step__line {
  width: 2px;
  flex: 1;
  background: var(--color-neutral-gray-200, #eaecf0);
  min-height: 20px;
}

/* step icon */
.progress-step__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  background: white;
  flex-shrink: 0;
}
.progress-step__icon--completed {
  border-color: var(--color-primary-blue-600, #155eef);
  background: var(--color-primary-blue-50, #eff4ff);
}
.progress-step__icon--current {
  border-color: var(--color-primary-blue-600, #155eef);
  background: var(--color-primary-blue-50, #eff4ff);
}
.progress-step__icon--error   { border-color: #d92d20; background: #fef3f2; }
.progress-step__icon--warning { border-color: #f79009; background: #fffaeb; }

/* step content */
.progress-step__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.progress-step__title {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-xl, 15px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-neutral-gray-900, #101828);
  line-height: var(--font-line-height-xl, 20px);
}
.progress-step__hint {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-sm, 12px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-500, #667085);
  line-height: var(--font-line-height-sm, 17px);
  overflow: hidden;
  text-overflow: ellipsis;
}

/* pill variant */
.progress-pill {
  height: 8px;
  width: 24.8px;
  border-radius: 4px;
  background: var(--color-neutral-gray-200, #eaecf0);
}
.progress-pill--completed { background: var(--color-primary-blue-600, #155eef); }
.progress-pill--current   { background: var(--color-primary-blue-400, #528bff); }
.progress-pill--error     { background: #d92d20; }
.progress-pill--warning   { background: #f79009; }
.progress-pill--loading   { animation: progress-indeterminate 1.2s ease infinite; }
```

**Usage rules:**
- Progress bars and circles are for determinate values only — use the indeterminate variant for unknown duration.
- Stepper (Progress Steps) is for multi-step forms and flows, not single metrics.
- Pill Progress Steps are for compact/horizontal flows with 3–7 steps.
- Timeline variant is reserved for event log / audit trail views — it is not a step wizard.
- Always include the step-count or % value when using determinate progress — never show an empty bar.

---

## Empty State

**Purpose:** Placeholder shown when a data view has no results, is a new entity, or an error occurs.

**Variants:**
- Graphic: True (illustration) / False (icon only or text only)
- Illustration styles: Cloud, Credit card, Documents, Box
- Illustration colors: Primary (blue tones), Gray (neutral tones)
- Featured icon types: Info, Default, Warning, Success, Error
- Action button combos: None, Single (primary), Dual (secondary + primary)

**States:** Static (no hover/active)

**Sizes:**
| Name | Illustration height | Container min-height |
|------|---------------------|----------------------|
| 2xs  | 62px                | 82px                 |
| xs   | 78px                | 93px                 |
| sm   | 96px                | 104px                |
| md   | 112px               | 112px                |
| lg   | 128px               | 128px                |

**Anatomy:**
- Optional: Illustration or Featured icon (centered top)
- Title text (center-aligned, semibold)
- Description text (center-aligned, regular)
- Optional: Action buttons row (centered)

**Specs:**
| Property | Value | Token |
|---|---|---|
| Container width | 352px (default) | — |
| Container layout | flex-col, center, gap=16px | — |
| Title font | 13px semibold | --font/size/md, --font/weight/semibold |
| Title color | #101828 | --color/neutral/gray/900 |
| Description font | 12px regular | --font/size/sm, --font/weight/regular |
| Description color | #475467 | --color/neutral/gray/600 |
| Action row gap | 8px | — |
| Secondary button height | 32px | — |
| Secondary button px | 10px | — |
| Secondary button py | 6px | — |
| Secondary button border-radius | 4px | — |
| Secondary button border | 1px, gray/300 | --color/neutral/gray/300 |
| Secondary button bg | white | --color/neutral/white/base |
| Secondary button shadow | 0 1px 2px rgba(16,24,40,0.05) | --shadow/xs |
| Primary button bg | blue/600 | --color/primary/blue/600 |
| Primary button text | white | --color/neutral/white/base |

**CSS (paste-ready):**
```css
/* ── Empty State ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 352px;
  text-align: center;
}

/* illustration / icon */
.empty-state__graphic {
  flex-shrink: 0;
}
.empty-state__graphic--sm  { height: 96px; }
.empty-state__graphic--md  { height: 112px; }
.empty-state__graphic--lg  { height: 128px; }
.empty-state__graphic--xs  { height: 78px; }
.empty-state__graphic--2xs { height: 62px; }

/* text block */
.empty-state__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  letter-spacing: var(--font-letter-spacing-normal, 0px);
}
.empty-state__title {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-md, 13px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-neutral-gray-900, #101828);
  line-height: var(--font-line-height-md, 18px);
  width: 100%;
}
.empty-state__description {
  font-family: Inter, sans-serif;
  font-size: var(--font-size-sm, 12px);
  font-weight: var(--font-weight-regular, 400);
  color: var(--color-neutral-gray-600, #475467);
  line-height: var(--font-line-height-sm, 17px);
  width: 100%;
}

/* action buttons */
.empty-state__actions {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
}
.empty-state__btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 6px 10px;
  background: var(--color-neutral-white-base, white);
  border: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  font-family: Inter, sans-serif;
  font-size: var(--font-size-md, 13px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-neutral-gray-600, #475467);
  cursor: pointer;
  white-space: nowrap;
}
.empty-state__btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 6px 10px;
  background: var(--color-primary-blue-600, #155eef);
  border: 1px solid var(--color-primary-blue-600, #155eef);
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  font-family: Inter, sans-serif;
  font-size: var(--font-size-md, 13px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-neutral-white-base, white);
  cursor: pointer;
  white-space: nowrap;
}
.empty-state__btn-secondary:hover { background: var(--color-neutral-gray-50, #f9fafb); }
.empty-state__btn-primary:hover   { background: var(--color-primary-blue-700, #004eeb); border-color: var(--color-primary-blue-700, #004eeb); }
```

**Usage rules:**
- Always provide at least one action button unless the state is a system error the user cannot resolve.
- Use "Primary" illustration color when HighRise branding needs reinforcement; use "Gray" for neutral/informational contexts.
- Size the Empty State to match the container it lives in — `sm` for card-sized panels, `lg` for full-page views.
- Title must be a complete sentence, describing what is absent. Description explains why or what to do.

---

## Skeleton / Loading State

**Purpose:** Placeholder shimmer animations that occupy content space while data is loading, reducing perceived load time.

**Variants:**
- Type=Doughnut (ring / circular skeleton)
- Type=Circle (solid circle skeleton)
- Type=Block (rectangular card-like block)
- Type=Bar (thin horizontal bar)
- Animation Stage=1 (still / initial), Animation Stage=2 (shimmer wave active)

**States:** Loading (animated shimmer sweep)

**Sizes:**
| Type     | Width   | Height  |
|----------|---------|---------|
| Doughnut | 175px   | 175px   |
| Circle   | 175px   | 175px   |
| Block    | 331px   | 202px   |
| Bar      | 331px   | 34px    |

**Anatomy:**
- Base shape (rounded appropriately for type)
- Shimmer overlay: `mix-blend-color-burn`, `opacity: 0.4`, linear gradient at -74.36° sweeping from transparent → gray/500 → gray/500 → transparent
- Animation: shimmer sweeps left-to-right continuously

**Specs:**
| Property | Value | Token |
|---|---|---|
| Doughnut size | 175×175px | — |
| Circle size | 175×175px | — |
| Block size | 331×202px | — |
| Bar size | 331×34px | — |
| Shimmer blend | mix-blend-color-burn | — |
| Shimmer opacity | 0.4 | — |
| Shimmer color | #667085 | --color/neutral/gray/500 |
| Shimmer transparent | rgba(255,255,255,0) | --color/neutral/white/opacity-0 |
| Shimmer angle | -74.36° | — |

**CSS (paste-ready):**
```css
/* ── Skeleton Loader ── */
.skeleton {
  position: relative;
  overflow: hidden;
  background: var(--color-neutral-gray-100, #f2f4f7);
  flex-shrink: 0;
}

/* shapes */
.skeleton--doughnut,
.skeleton--circle {
  width: 175px;
  height: 175px;
  border-radius: 50%;
}
.skeleton--doughnut {
  /* ring effect: transparent center */
  background: transparent;
  border: 28px solid var(--color-neutral-gray-100, #f2f4f7);
  box-shadow: inset 0 0 0 20px var(--color-neutral-gray-100, #f2f4f7);
}
.skeleton--block {
  width: 331px;
  height: 202px;
  border-radius: 8px;
}
.skeleton--bar {
  width: 331px;
  height: 34px;
  border-radius: 4px;
}

/* shimmer animation */
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    -74.36deg,
    rgba(255, 255, 255, 0) 22%,
    var(--color-neutral-gray-500, #667085) 42%,
    var(--color-neutral-gray-500, #667085) 58%,
    rgba(255, 255, 255, 0) 79%
  );
  mix-blend-mode: color-burn;
  opacity: 0.4;
  transform: translateX(-175px);
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}
@keyframes skeleton-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* reduce motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton::after { animation: none; opacity: 0.15; }
}
```

**Usage rules:**
- Match skeleton shape precisely to the real content it replaces: use Bar for text rows, Block for cards, Doughnut for ring charts, Circle for avatar/chart thumbnails.
- Never show skeleton for more than 10 seconds — replace with an Error or Empty state.
- Do not nest interactive elements inside a skeleton container.
- Always include `prefers-reduced-motion` handling to stop the animation.

---

## Mismatches — Pass 3

| Component | Property | Value | Issue |
|-----------|----------|-------|-------|
| Tag | Height xs | 18px | Off 8px grid ⚠️ (but consistent with sm=22, md=24 scale) |
| Tag | Height sm | 22px | Off 8px grid ⚠️ |
| Progress Bar | Track height | 8px | On 8px grid ✅ |
| Progress Bar | Label↔track gap | 4px | On 4px base grid ✅ |
| Empty State | Button padding-y | 6px | Off 8px grid ⚠️ (4px base) |
| Empty State | Container gap | 16px | On 8px grid ✅ |
| Table | Row height | 36px | On 4px base grid ✅ |
| Statistic Card | Icon badge size | 44×44px | Off 8px grid ⚠️ (4px base) |
| Statistic Card | Border-radius | 12px | On 4px base grid ✅ |
| Avatar | Size 3xs | 10px | Off 8px grid ⚠️ (follows its own sub-scale) |
| Avatar | Size 2xs | 16px | On 4px base grid ✅ |
| Progress Circle | Center text tracking | -0.72px | Display-scale tracking — consistent with DS pattern |
| Skeleton | Doughnut/Circle size | 175px | Off 8px grid ⚠️ (likely auto-sized from content placeholder) |

All off-grid values continue the 4px base grid pattern or are display-scale exceptions documented in Pass 1.

---

✓ Pass 3 complete

---

# PASS 4 — NAVIGATION

---

## Sidebar / Primary Navigation Toolbar

**Purpose:** Full-height vertical navigation bar; the main wayfinding surface for the application. Uses a dark navy theme that contrasts with the light content area.

**Variants:**
- `Type=Subaccount` — shows a subaccount picker below the logo
- `Type=Default` — no subaccount picker (logo only)
- `Collapsed=True` — icon-only rail (collapsed state)
- `Collapsed=False` — full icon + label layout (default)

**States:**
- Default (inactive nav item)
- Active (current page)
- Hover (same visual as active, triggered on pointer-over)

**Sizes:** Fixed width — 280px expanded / ~56px collapsed (icon rail)

**Anatomy:**
- **Logo area** — application logo / wordmark at top
- **Subaccount selector** — dark pill button with label + chevron (Type=Subaccount only)
- **Search bar** — inline search with ⌘K shortcut badge
- **Quick action button** — icon button (lightning bolt) for fast actions
- **Nav item list** — scrollable list of icon + label rows
  - Icon — 24×24px
  - Label — 16px medium, gray-300 inactive / white active
  - Active indicator — dark card background (`gray-800`) behind the row
- **Section divider** — 1px horizontal rule between nav groups
- **Collapse toggle** — green circle button positioned at the right edge, bottom of sidebar

**Specs:**

| Property | Value | Token |
|---|---|---|
| Width (expanded) | 280px | — |
| Background | #101828 | --color/neutral/gray/900 |
| Padding | 16px top/bottom, 8px left/right | — |
| Inner gap (sections) | 20px | — |
| Nav item padding | 8px all sides | — |
| Nav item border-radius | 8px | — |
| Nav item gap (icon→label) | 8px | — |
| Nav item height | 40px (8+24+8) | — |
| Icon size | 24×24px | — |
| Label font-size | 16px | --font/size/2xl |
| Label line-height | 24px | --font/line-height/2xl |
| Label weight (inactive) | 500 | --font/weight/medium |
| Label color (inactive) | — | --color/neutral/gray/300 |
| Label color (active) | #ffffff | --color/neutral/white/base |
| Active item background | #1d2939 | --color/neutral/gray/800 |
| Subaccount btn background | #344054 | --color/neutral/gray/700 |
| Subaccount btn padding | 8px | — |
| Subaccount btn border-radius | 8px | — |
| Search border | 1px solid | --color/neutral/gray/700 |
| Search border-radius | 8px | — |
| Search padding | 4px 4px 4px 8px | — |
| Search placeholder color | — | --color/neutral/gray/400 |
| ⌘K badge background | #344054 | --color/neutral/gray/700 |
| ⌘K badge padding | 2px 4px | — |
| ⌘K badge border-radius | 4px | — |
| Section divider | 1px | --color/neutral/gray/200 (#eaecf0) |
| Collapse button background | #73e2a3 | --color/accent/green/300 |
| Collapse button size | 24×24px | — |
| Collapse button border-radius | 12px | — |
| Collapse button position | absolute, bottom: 24px, right: −12px | — |

**CSS (paste-ready, dashes not slashes):**

```css
/* ── Sidebar shell ── */
.primary-nav {
  background-color: var(--color-neutral-gray-900, #101828);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 280px;
  height: 100vh;
  padding: 16px 8px;
  position: relative;
  overflow-y: auto;
}

/* ── Subaccount selector button ── */
.primary-nav__subaccount {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-neutral-gray-700, #344054);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}

/* ── Search bar ── */
.primary-nav__search {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-neutral-gray-700, #344054);
  border-radius: 8px;
  padding: 4px 4px 4px 8px;
}
.primary-nav__search-placeholder {
  color: var(--color-neutral-gray-400);
  font-size: var(--font-size-2xl); /* 16px */
  line-height: var(--font-line-height-2xl); /* 24px */
  font-weight: var(--font-weight-regular);
  flex: 1;
}
.primary-nav__search-badge {
  background-color: var(--color-neutral-gray-700, #344054);
  color: var(--color-neutral-gray-400);
  font-size: var(--font-size-xs); /* 10px */
  font-weight: var(--font-weight-medium);
  padding: 2px 4px;
  border-radius: 4px;
  white-space: nowrap;
}

/* ── Section divider ── */
.primary-nav__divider {
  background-color: var(--color-neutral-gray-200, #eaecf0);
  height: 1px;
  width: 100%;
  flex-shrink: 0;
}

/* ── Nav item list ── */
.primary-nav__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* ── Nav item — inactive (default) ── */
.primary-nav__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  color: var(--color-neutral-gray-300);
  font-size: var(--font-size-2xl); /* 16px */
  line-height: var(--font-line-height-2xl); /* 24px */
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.primary-nav__item .nav-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* ── Nav item — active state ── */
.primary-nav__item--active,
.primary-nav__item:hover {
  background-color: var(--color-neutral-gray-800, #1d2939);
  color: var(--color-neutral-white-base, #ffffff);
}

/* ── Collapse toggle button ── */
.primary-nav__collapse-btn {
  position: absolute;
  bottom: 24px;
  right: -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: var(--color-accent-green-300, #73e2a3);
  border-radius: 12px;
  box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1),
              0px 1px 2px 0px rgba(16, 24, 40, 0.06);
  cursor: pointer;
}

/* ── Collapsed (icon-rail) state ── */
.primary-nav--collapsed {
  width: 56px;
  padding: 16px 8px;
}
.primary-nav--collapsed .primary-nav__item {
  justify-content: center;
}
.primary-nav--collapsed .primary-nav__item span,
.primary-nav--collapsed .primary-nav__subaccount span,
.primary-nav--collapsed .primary-nav__search-placeholder,
.primary-nav--collapsed .primary-nav__search-badge {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .primary-nav__item { transition: none; }
}
```

**Usage rules:**
- Always use the dark navy shell (`--color-neutral-gray-900` / #101828). Never place this sidebar on a light background.
- Active and hover states share the same visual treatment (`gray-800` card + white text).
- The collapse toggle is positioned outside the sidebar boundary (right: −12px) — ensure its parent has `overflow: visible`.
- Nav icons must be 24×24px and use `--color-neutral-gray-300` (inactive) or `#ffffff` (active) fill color to match the label.
- The section divider uses `gray-200` (#eaecf0) — this is intentionally lighter than the background to serve as a subtle separator on the dark surface.
- In collapsed mode, hide all text labels; show icon only, centered.

---

## Tabs

**Purpose:** Horizontal navigation strip that switches between views within the same context. Three visual types: `Line` (underline indicator), `Segment` (pill/segmented control), and `Borderless` (no underline or container).

**Variants:**
- `Type=Line` — underline indicator under the active tab; bottom border on the container
- `Type=Segment` — active tab has a white card with shadow; container has gray-50 background
- `Type=Borderless` — no container border; minimal style
- `Placement=Default` — horizontal strip at top of content
- `Placement=Bottom` — strip at bottom
- `Placement=Left` — vertical strip on left edge
- `Placement=Right` — vertical strip on right edge
- `Theme=Primary` — blue active color
- `Theme=Neutral` — gray active color
- `Icon Only=True/False` — tabs with icon only (no label text)

**States:**
- Default (inactive)
- Active (selected)
- Hover (same appearance as active background, no indicator)
- Disabled

**Sizes:**

| Size | Tab item height | Segment container height | Font size token |
|---|---|---|---|
| sm | 24px | 32px | --font/size/md (13px) |
| md | 32px | 40px | --font/size/lg (14px) |
| lg | 40px | 48px | --font/size/xl (15px) |
| xl | 40px | 48px | --font/size/2xl (16px) |
| 2xl | 40px | 48px | --font/size/3xl (18px) |

**Anatomy:**
- **Tab container** — wrapping flex row; holds all tab items
- **Tab item** — single clickable unit: optional icon + label text
  - Icon — 16px (md) / 14px (sm) / 18px (lg)
  - Label — text, size varies by size prop
  - Active indicator — 2px bottom border (Line) or white card bg (Segment)
- **More tabs overflow indicator** — "..." or chevron when tabs overflow container width
- **Add tab button** — optional "+" button at end of strip
- **Divider** — `gray-200` horizontal rule separating tab strip from content (Line type)

**Specs:**

| Property | Value | Token |
|---|---|---|
| Tab strip gap (between items) | 6px | — |
| Tab item inner gap (icon→label) | 4px | — |
| Tab item padding (md) | 4px 8px | — |
| Tab item border-radius (top corners) | 4px | — |
| Inactive label color | — | --color/neutral/gray/600 |
| Inactive label weight | 500 | --font/weight/medium |
| Active label color (Line) | — | --color/primary/blue/700 |
| Active label weight | 600 | --font/weight/semibold |
| Active indicator thickness (Line) | 2px | — |
| Active indicator color (Line) | — | --color/primary/blue/700 |
| Container border-bottom (Line) | 1px solid | --color/neutral/gray/300 |
| Segment container bg | — | --color/neutral/gray/50 |
| Segment container padding | 4px | — |
| Segment container border-radius | 4px | — |
| Segment active item bg | #ffffff | --color/neutral/white/base |
| Segment active item shadow | 0 1px 3px rgba(16,24,40,.10), 0 1px 2px rgba(16,24,40,.06) | Shadow/sm |
| Segment active item border-radius | 4px | — |
| Segment active label color | — | --color/primary/blue/700 |

**CSS (paste-ready, dashes not slashes):**

```css
/* ════════════════════════════════
   LINE TABS
   ════════════════════════════════ */

/* ── Container ── */
.tabs-line {
  display: flex;
  gap: 6px;
  align-items: center;
  border-bottom: 1px solid var(--color-neutral-gray-300);
  overflow: clip;
  position: relative;
}

/* ── Tab item — inactive ── */
.tabs-line__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: var(--color-neutral-gray-600);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);       /* md: 14px */
  line-height: var(--font-line-height-lg); /* 20px */
  cursor: pointer;
  border-bottom: 2px solid transparent; /* reserves space, avoids layout shift */
  transition: color 0.15s ease, border-color 0.15s ease;
}

/* size variants */
.tabs-line__item--sm {
  height: 24px;
  font-size: var(--font-size-md);       /* 13px */
  line-height: var(--font-line-height-md); /* 18px */
}
.tabs-line__item--md  { height: 32px; }
.tabs-line__item--lg  { height: 40px; font-size: var(--font-size-xl); }
.tabs-line__item--xl  { height: 40px; font-size: var(--font-size-2xl); }
.tabs-line__item--2xl { height: 40px; font-size: var(--font-size-3xl); }

/* ── Tab item — active ── */
.tabs-line__item--active {
  border-bottom: 2px solid var(--color-primary-blue-700);
  color: var(--color-primary-blue-700);
  font-weight: var(--font-weight-semibold);
}

/* ── Tab item — hover ── */
.tabs-line__item:hover:not(.tabs-line__item--active):not(.tabs-line__item--disabled) {
  color: var(--color-neutral-gray-800);
  background-color: var(--color-neutral-gray-50);
}

/* ── Tab item — disabled ── */
.tabs-line__item--disabled {
  color: var(--color-neutral-gray-300);
  cursor: not-allowed;
  pointer-events: none;
}


/* ════════════════════════════════
   SEGMENT TABS (pill / segmented control)
   ════════════════════════════════ */

/* ── Container ── */
.tabs-segment {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  background-color: var(--color-neutral-gray-50);
  padding: 4px;
  border-radius: 4px;
  overflow: clip;
}

/* ── Tab item — inactive ── */
.tabs-segment__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--color-neutral-gray-600);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);
  line-height: var(--font-line-height-lg);
  cursor: pointer;
  transition: background-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
}

/* size variants (height of the entire segment container) */
.tabs-segment--sm  { /* container 32px */ }
.tabs-segment--sm  .tabs-segment__item { height: 24px; font-size: var(--font-size-md); }
.tabs-segment--md  { /* container 40px */ }
.tabs-segment--md  .tabs-segment__item { height: 32px; }
.tabs-segment--lg  { /* container 48px */ }
.tabs-segment--lg  .tabs-segment__item { height: 40px; font-size: var(--font-size-xl); }

/* ── Tab item — active ── */
.tabs-segment__item--active {
  background-color: var(--color-neutral-white-base, #ffffff);
  box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1),
              0px 1px 2px 0px rgba(16, 24, 40, 0.06);
  color: var(--color-primary-blue-700);
  font-weight: var(--font-weight-semibold);
}

/* ── Tab item — hover ── */
.tabs-segment__item:hover:not(.tabs-segment__item--active):not(.tabs-segment__item--disabled) {
  background-color: var(--color-neutral-gray-100);
}

/* ── Tab item — disabled ── */
.tabs-segment__item--disabled {
  color: var(--color-neutral-gray-300);
  cursor: not-allowed;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .tabs-line__item,
  .tabs-segment__item { transition: none; }
}
```

**Usage rules:**
- Use `Line` for primary page-level navigation (e.g., switching between Dashboard views).
- Use `Segment` for in-page view toggles (e.g., List / Board / Calendar) — equivalent to a mode switcher/segmented control.
- Do not mix `Line` and `Segment` types within the same view.
- The `Segment` container width should hug its content (`inline-flex`), not stretch full-width.
- Always reserve space for the 2px bottom border on `Line` tab items (even inactive) to prevent vertical layout shift on activation.
- `Placement=Left/Right` use the same token values; rotate the active indicator to a left/right border instead of bottom.

---

## Breadcrumbs

**Purpose:** Secondary navigation trail showing the user's location in the app hierarchy. Supports three sizes, an optional home icon, and chevron separators.

**Variants:**
- `Home=True` — first crumb is a home icon only
- `Home=False` — first crumb is a text label
- Truncated — middle crumbs collapsed to "…" when path is long

**States:**
- Inactive (ancestor crumbs) — gray, medium weight, clickable
- Current (last crumb) — blue, semibold, not a link
- Hover (inactive crumbs) — underline

**Sizes:** sm, md, lg

**Anatomy:**
- **Crumb item** — text or icon; links except for the current page
- **Separator** — chevron-right icon between crumbs
- **Home icon** — optional house icon replacing first text crumb
- **Overflow indicator** — "…" button when path exceeds max display length

**Specs:**

| Property | sm | md | lg | Token (lg) |
|---|---|---|---|---|
| Container gap | 4px | 6px | 8px | — |
| Label font-size | 12px | 13px | 14px | --font/size/lg |
| Label line-height | 17px | 18px | 20px | --font/line-height/lg |
| Inactive label weight | 500 | 500 | 500 | --font/weight/medium |
| Inactive label color | — | — | — | --color/neutral/gray/600 |
| Current label weight | 600 | 600 | 600 | --font/weight/semibold |
| Current label color | — | — | — | --color/primary/blue/700 |
| Separator icon size | 12×12px | 14×14px | 16×16px | — |
| Home icon size | 14×14px | 16×16px | 20×20px | — |

**CSS (paste-ready, dashes not slashes):**

```css
/* ── Breadcrumb container ── */
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* Size variants — gap */
.breadcrumb--sm { gap: 4px; }
.breadcrumb--md { gap: 6px; }
.breadcrumb--lg { gap: 8px; }

/* ── Crumb item — inactive (ancestor) ── */
.breadcrumb__item {
  display: flex;
  align-items: center;
  color: var(--color-neutral-gray-600);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease, text-decoration 0.15s ease;
}
.breadcrumb__item:hover { text-decoration: underline; }

/* Size-specific font */
.breadcrumb--sm .breadcrumb__item {
  font-size: var(--font-size-sm);       /* 12px */
  line-height: var(--font-line-height-sm); /* 17px */
}
.breadcrumb--md .breadcrumb__item {
  font-size: var(--font-size-md);       /* 13px */
  line-height: var(--font-line-height-md); /* 18px */
}
.breadcrumb--lg .breadcrumb__item {
  font-size: var(--font-size-lg);       /* 14px */
  line-height: var(--font-line-height-lg); /* 20px */
}

/* ── Crumb item — current page (last crumb) ── */
.breadcrumb__item--current {
  color: var(--color-primary-blue-700);
  font-weight: var(--font-weight-semibold);
  cursor: default;
  pointer-events: none;
  text-decoration: none;
}

/* ── Separator (chevron-right icon) ── */
.breadcrumb__separator {
  display: flex;
  align-items: center;
  color: var(--color-neutral-gray-400);
  flex-shrink: 0;
}
.breadcrumb--sm .breadcrumb__separator { width: 12px; height: 12px; }
.breadcrumb--md .breadcrumb__separator { width: 14px; height: 14px; }
.breadcrumb--lg .breadcrumb__separator { width: 16px; height: 16px; }

/* ── Home icon (first crumb, Home=True) ── */
.breadcrumb__home-icon {
  display: flex;
  align-items: center;
  color: var(--color-neutral-gray-600);
}
.breadcrumb--sm .breadcrumb__home-icon { width: 14px; height: 14px; }
.breadcrumb--md .breadcrumb__home-icon { width: 16px; height: 16px; }
.breadcrumb--lg .breadcrumb__home-icon { width: 20px; height: 20px; }

@media (prefers-reduced-motion: reduce) {
  .breadcrumb__item { transition: none; }
}
```

**Usage rules:**
- The current page crumb must never be a link — use `pointer-events: none` and a `<span>` rather than `<a>`.
- Separator is decorative — use `aria-hidden="true"` on the chevron icon.
- The full breadcrumb list requires `aria-label="Breadcrumb"` on a `<nav>` wrapper.
- Match breadcrumb size to the surrounding content density: `sm` in dense tables, `md` in standard headers, `lg` in page titles.
- When Home=True, the home icon replaces the first text label entirely — do not show both.

---

## Pagination

**Purpose:** Allows users to navigate through multi-page content. Two visual styles: **Counter** (compact "X of Y" with prev/next) and **Full** (numbered page buttons with prev/next).

**Variants:**
- `Counter` — compact inline counter ("1 of 356 < >") for tables and lists
- `Full / md` — full numbered pagination strip, 32px tall
- `Full / sm` — full numbered pagination strip, 24px tall

**States:**
- Default (page button)
- Active / Current page (filled, highlighted)
- Hover
- Disabled (prev at page 1, next at last page)

**Sizes:**

| Variant | Height | Font token |
|---|---|---|
| Counter | 20px buttons | --font/size/md (13px) |
| Full / sm | 24px | --font/size/md (13px) |
| Full / md | 32px | --font/size/lg (14px) |

**Anatomy:**
- **Counter text** — "X of Y" label
- **Button group** — flex row containing prev and next buttons (Counter) or page number buttons (Full)
- **Prev button** — chevron-left icon
- **Next button** — chevron-right icon (has drop shadow)
- **Page number button** — numeric label, active state highlighted
- **Ellipsis** — "…" when page range is truncated

**Specs:**

| Property | Value | Token |
|---|---|---|
| Container gap | 16px (counter) | — |
| Button group gap | 4px | — |
| Button size (counter) | 20×20px | — |
| Button border-radius | 4px | — |
| Counter text color | — | --color/neutral/gray/600 |
| Counter text weight | 400 | --font/weight/regular |
| Counter text size | 13px | --font/size/md |
| Counter text line-height | 18px | --font/line-height/md |
| Next button shadow | 0 1px 1px rgba(16,24,40,.05) | Shadow/xs |

**CSS (paste-ready, dashes not slashes):**

```css
/* ════════════════════════════════
   COUNTER PAGINATION (compact)
   ════════════════════════════════ */

.pagination-counter {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.pagination-counter__text {
  color: var(--color-neutral-gray-600);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-md);           /* 13px */
  line-height: var(--font-line-height-md);  /* 18px */
  white-space: nowrap;
}

.pagination-counter__btn-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination-counter__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  color: var(--color-neutral-gray-600);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.pagination-counter__btn:hover {
  background-color: var(--color-neutral-gray-100);
}
.pagination-counter__btn--next {
  box-shadow: 0px 1px 1px 0px rgba(16, 24, 40, 0.05);
}
.pagination-counter__btn--disabled {
  color: var(--color-neutral-gray-300);
  cursor: not-allowed;
  pointer-events: none;
}


/* ════════════════════════════════
   FULL PAGINATION (numbered)
   ════════════════════════════════ */

.pagination-full {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── Page button ── */
.pagination-full__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: var(--color-neutral-gray-600);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

/* sizes */
.pagination-full--sm .pagination-full__btn {
  height: 24px;
  min-width: 24px;
  padding: 0 4px;
  font-size: var(--font-size-md);
  line-height: var(--font-line-height-md);
}
.pagination-full--md .pagination-full__btn {
  height: 32px;
  min-width: 32px;
  padding: 0 8px;
  font-size: var(--font-size-lg);
  line-height: var(--font-line-height-lg);
}

/* ── Active page ── */
.pagination-full__btn--active {
  background-color: var(--color-primary-blue-700);
  color: var(--color-neutral-white-base, #ffffff);
  font-weight: var(--font-weight-semibold);
}

/* ── Hover (non-active) ── */
.pagination-full__btn:hover:not(.pagination-full__btn--active):not(.pagination-full__btn--disabled) {
  background-color: var(--color-neutral-gray-100);
}

/* ── Disabled ── */
.pagination-full__btn--disabled {
  color: var(--color-neutral-gray-300);
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Ellipsis ── */
.pagination-full__ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-neutral-gray-400);
  padding: 0 4px;
}

@media (prefers-reduced-motion: reduce) {
  .pagination-counter__btn,
  .pagination-full__btn { transition: none; }
}
```

**Usage rules:**
- Use `Counter` pagination for inline table rows and list views where page numbers would be too wide.
- Use `Full` pagination on dedicated search results pages or any view where jumping to a specific page is common.
- Always disable (not hide) the previous button on page 1 and the next button on the last page.
- The `Full / md` size (32px) matches the standard button row height — align it to the right of a toolbar.
- The next button in the Counter variant has a `Shadow/xs` drop shadow — this is intentional per the design spec.

---

## Header (Page Header / App Bar)

**Purpose:** Top-of-page organism that houses page title, breadcrumb trail, contextual actions, filters, and optional tab navigation. Highly composable — all sub-zones are Boolean props.

**Variants (Size prop):**
- `sm` — compact rows (title row ~32px)
- `md` — comfortable rows (title row ~36px)

**Alignment prop:** `default` (left-aligned title), `center`

**Boolean slots (all optional, combinable):**

| Slot / Prop | What it shows |
|---|---|
| Breadcrumbs | Breadcrumb trail above the title row |
| Back | Back arrow button left of title |
| Back Label | Text label next to back arrow |
| Icon | 24×24px icon left of title text |
| Title | Page title text |
| Title Sub Text | Secondary/subtitle text beside the title |
| Description | Body text below the title |
| Badges | Tag badges next to the title |
| Pagination | Prev/next chevron arrows for paging the title entity |
| Title Action | Action button(s) inside the title row |
| Actions | Button group on the right side of the header |
| Action Dropdown | Select dropdown(s) on the right side |
| Content Switcher | Grid/List/etc icon toggle on the right |
| Tabs | Tab strip embedded at the bottom of the header |
| Tabs End Action | Additional action button at the end of the tab strip |
| Right Text | Small informational text on the right (e.g., business hours) |
| Closable | × close button on the right |
| Bottom Border | 1px divider at the bottom of the header |
| CRUD | Third row: filter chips + search + primary action buttons + layout switcher |

**Sizes:**

| Zone | sm height | md height |
|---|---|---|
| Breadcrumb row | 20px | 24px |
| Title row (no extra rows) | ~32px | ~36px |
| CRUD / filter row | ~44px (py-8px) | ~44px |

**Anatomy:**
- **Breadcrumb row** — optional; uses `Breadcrumb` component (see above)
- **Title row** — two flex zones: `Title Content` (flex 1) + `Actions` (shrink-0)
  - Title Content: Back → Icon → Title text → Sub text → Badges → Pagination arrows → Title action buttons
  - Actions: Right text → Select dropdowns → Share button → Content switcher → Close
- **Tab sub-row** — embedded at the bottom-right of the title row; uses `Line` Tabs variant
- **CRUD row** — full-width row with `py-8px`: filter tags + search input left, action buttons + layout switcher right

**Specs:**

| Property | Value | Token |
|---|---|---|
| Header background | #ffffff | --color/neutral/white/base |
| Outer container gap | 4px | — |
| Title row gap | 48px between left/right zones | — |
| Left zone title font-size | 16px | --font/size/2xl |
| Left zone title weight | 600 | --font/weight/semibold |
| Left zone title color | #101828 | --color/neutral/gray/900 |
| Sub text / location text | 13px | --font/size/md |
| Sub text color | — | --color/neutral/gray/500 |
| Header icon size | 24×24px | — |
| Back button size | 32×32px | — |
| Back button padding | 8px | — |
| Back button border-radius | 4px | — |
| Right side dropdown height (sm) | 28px | — |
| Right side dropdown height (md) | 32px | — |
| Right side dropdown width | 184px (per dropdown) | — |
| Right side dropdown border | 1px solid | --color/neutral/gray/300 |
| Right side dropdown border-radius | 4px | — |
| Right side dropdown shadow | 0 1px 2px rgba(16,24,40,.05) | Shadow/xs |
| Right side time text | 12px | --font/size/sm |
| Right side time text color | — | --color/neutral/gray/500 |
| Share button height (md) | 32px | — |
| Share button font | semibold, 14px | --font/weight/semibold, --font/size/md |
| Share button color | — | --color/neutral/gray/600 |
| Tab strip embedded in header | border-b 1px | --color/neutral/gray/300 |
| Tab item height (xl size) | 40px | — |
| CRUD row padding | 8px top/bottom | — |
| CRUD row gap | 16px | — |
| CRUD primary button height | 28px (sm) | — |
| CRUD primary button bg | — | --color/primary/blue/600 |
| Bottom border | 1px solid | --color/neutral/gray/200 |

**CSS (paste-ready, dashes not slashes):**

```css
/* ════════════════════════════════
   HEADER ORGANISM
   ════════════════════════════════ */

/* ── Outer shell ── */
.page-header {
  background-color: var(--color-neutral-white-base, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

/* ── Optional bottom border ── */
.page-header--bordered {
  border-bottom: 1px solid var(--color-neutral-gray-200, #eaecf0);
}

/* ── Row 1: Breadcrumb (optional) ── */
.page-header__breadcrumb-row {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
}

/* ── Row 2: Main title row ── */
.page-header__title-row {
  display: flex;
  gap: 48px;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
}

/* Left zone — title content */
.page-header__title-content {
  display: flex;
  flex: 1 0 0;
  align-items: center;
  min-width: 0;
  gap: 16px;
}

/* Back button */
.page-header__back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 4px;
  color: var(--color-neutral-gray-600);
  cursor: pointer;
  flex-shrink: 0;
}
.page-header__back-btn:hover {
  background-color: var(--color-neutral-gray-100);
}

/* Title text area */
.page-header__title-area {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}
.page-header__title-main {
  display: flex;
  align-items: center;
  gap: 8px;
}
.page-header__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
.page-header__title-text {
  color: var(--color-neutral-gray-900);
  font-size: var(--font-size-2xl);        /* 16px */
  line-height: var(--font-line-height-2xl); /* 24px */
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
}
.page-header__title-sub {
  color: var(--color-neutral-gray-900);
  font-size: var(--font-size-2xl);
  line-height: var(--font-line-height-2xl);
  font-weight: var(--font-weight-regular);
  white-space: nowrap;
}
.page-header__subtitle {
  color: var(--color-neutral-gray-500);
  font-size: var(--font-size-md);         /* 13px */
  line-height: var(--font-line-height-md); /* 18px */
  font-weight: var(--font-weight-regular);
  white-space: nowrap;
  padding-left: 32px; /* aligns under title when back button is present */
}

/* Right zone — actions */
.page-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.page-header__right-text {
  color: var(--color-neutral-gray-500);
  font-size: var(--font-size-sm);         /* 12px */
  line-height: var(--font-line-height-sm); /* 17px */
  font-weight: var(--font-weight-regular);
  white-space: nowrap;
}
.page-header__dropdown {
  height: 32px;          /* md size */
  width: 184px;
  border: 1px solid var(--color-neutral-gray-300);
  border-radius: 4px;
  background-color: var(--color-neutral-white-base, #ffffff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  flex-shrink: 0;
}
.page-header__dropdown--sm { height: 28px; }

/* ── Row 3: CRUD / filter toolbar (optional) ── */
.page-header__crud-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  width: 100%;
  flex-shrink: 0;
}
.page-header__crud-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  min-width: 0;
}
.page-header__crud-right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
/* CRUD primary action button */
.page-header__crud-btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 28px;
  padding: 0 8px;
  border-radius: 4px;
  background-color: var(--color-primary-blue-600);
  color: var(--color-neutral-white-base, #ffffff);
  font-size: var(--font-size-md);        /* 13px */
  font-weight: var(--font-weight-semibold);
  border: 1px solid var(--color-primary-blue-600);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  white-space: nowrap;
}
/* CRUD secondary action button */
.page-header__crud-btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 28px;
  padding: 0 8px;
  border-radius: 4px;
  background-color: var(--color-neutral-white-base, #ffffff);
  color: var(--color-neutral-gray-600);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  border: 1px solid var(--color-neutral-gray-300);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  white-space: nowrap;
}

/* ── Tab strip embedded in header (uses Line Tab styles) ── */
.page-header__tabs {
  border-bottom: 1px solid var(--color-neutral-gray-300);
  display: flex;
  gap: 8px;
  align-items: flex-start;
  overflow: clip;
  align-self: flex-end; /* pins to the bottom of the title row */
}
```

**Usage rules:**
- This is a **page-level organism**, not an atom. Compose it from the Boolean slots above; never flatten everything into one monolithic div.
- Always use a white background — the Header sits above the content area, not inside the dark sidebar.
- When `Tabs=True`, the tabs embed inside the header at its bottom edge, not as a separate row below it. The bottom border of the header serves as the tab strip's underline.
- The CRUD row is only visible when `CRUD=True`. It never appears alone without the title row above it.
- `sm` vs `md` size affects button height (28px vs 32px) and font size in the CRUD row. Use `sm` for dense admin views; `md` for primary feature pages.
- Right-side dropdowns (Action Dropdown slots) default to 184px wide. Adjust width to content if needed, but keep 32px height at md.
- The `Bottom Border` prop adds a subtle `gray-200` divider between the header and the content area — use it when the header background matches the page background and visual separation is needed.

---

## Notes on remaining Pass 4 components

**Stepper / Wizard Navigation:** No dedicated Stepper component separate from Pass 3's Progress Steps was found in the HighRise 1.1 file. Use `Progress Steps` (documented in Pass 3) for all wizard/multi-step flows.

**Mode Switcher / Segmented Control:** Covered by `Tabs — Segment variant` above. The Segment tab type is the HighRise pattern for segmented controls (List / Board / Grid, etc.). There is no separate "Mode Switcher" component.

---

✓ Pass 4 complete

---

# PASS 5 — OVERLAYS & FEEDBACK

---

## Tooltip

**Purpose:** Informational floating overlay that reveals contextual help, labels, or status on hover. Supports 7 semantic color themes and full arrow-placement control.

**Variants:**
- Themes: Light, Dark, Gray, Info, Success, Warning, Error
- Arrow positions: None (no arrow), Bottom-Start / Bottom-Center / Bottom-End, Top-Start / Top-Center / Top-End, Left-Start / Left-Center / Left-End, Right-Start / Right-Center / Right-End
- Custom content toggle: True / False

**States:** Display-only; no interactive states on the tooltip shell itself.

**Sizes:**
- Width: 320px (no arrow); 320–328px (with arrow — arrow adds to one side)
- Height: content-driven

**Anatomy:**
- Shell: outer wrapper — sets background, border, shadow, radius
- Header row: optional icon (20×20px) + title text (12px semibold)
- Body text: supporting description (12px medium)
- Arrow: 16×6px triangle pointing toward the trigger element; positioned at Start / Center / End along the chosen edge

**Specs:**

| Property | Value | Token |
|---|---|---|
| Border-radius | 4px | — |
| Padding | 8px | — |
| Row gap (title → body) | 2px | — |
| Header gap (icon → title) | 4px | — |
| Shadow | 0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03) | Shadow/lg |
| Width | 320px (no arrow) | — |
| Title font size | 12px | font/size/xs |
| Title font weight | 600 (semibold) | font/weight/semibold |
| Title line height | 16px | font/line-height/xs |
| Body font size | 12px | font/size/xs |
| Body font weight | 500 (medium) | font/weight/medium |
| Body line height | 16px | font/line-height/xs |
| Icon size | 20×20px | — |
| Arrow height | 6px | — |
| Arrow width | 16px | — |
| **Light — BG** | #ffffff | color/neutral/white/base |
| **Light — Border** | none | — |
| **Light — Title color** | #344054 | color/neutral/gray/700 |
| **Light — Body color** | #667085 | color/neutral/gray/500 |
| **Dark — BG** | #101828 | color/neutral/gray/900 |
| **Dark — Border** | none | — |
| **Dark — Title color** | #ffffff | color/neutral/white/base |
| **Dark — Body color** | #ffffff | color/neutral/white/base |
| **Gray — BG** | #fcfcfd | color/neutral/gray/25 |
| **Gray — Border** | 1px solid #d0d5dd | color/neutral/gray/300 |
| **Gray — Title color** | #344054 | color/neutral/gray/700 |
| **Gray — Body color** | #475467 | color/neutral/gray/600 |
| **Info — BG** | #f5f8ff | color/primary/blue/25 |
| **Info — Border** | 1px solid #84adff | color/primary/blue/300 |
| **Info — Title color** | #004eeb | color/primary/blue/700 |
| **Info — Body color** | #155eef | color/primary/blue/600 |
| **Success — BG** | #f6fef9 | color/secondary/success/25 |
| **Success — Border** | 1px solid #6ce9a6 | color/secondary/success/300 |
| **Success — Title color** | #027a48 | color/secondary/success/700 |
| **Success — Body color** | #039855 | color/secondary/success/600 |
| **Warning — BG** | #fffcf5 | color/secondary/warning/25 |
| **Warning — Border** | 1px solid #fec84b | color/secondary/warning/300 |
| **Warning — Title color** | #b54708 | color/secondary/warning/700 |
| **Warning — Body color** | #dc6803 | color/secondary/warning/600 |
| **Error — BG** | #fffbfa | color/secondary/error/25 |
| **Error — Border** | 1px solid #fda29b | color/secondary/error/300 |
| **Error — Title color** | #b42318 | color/secondary/error/700 |
| **Error — Body color** | #d92d20 | color/secondary/error/600 |

**CSS (paste-ready):**
```css
/* Shell */
.tooltip {
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
              0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  z-index: 1070;
}

/* Header */
.tooltip__header {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tooltip__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.tooltip__title {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

/* Body */
.tooltip__body {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

/* Arrow */
.tooltip__arrow {
  width: 16px;
  height: 6px;
  flex-shrink: 0;
}

/* — Light — */
.tooltip--light {
  background-color: #ffffff;
}
.tooltip--light .tooltip__title { color: var(--color-neutral-gray-700); }
.tooltip--light .tooltip__body  { color: var(--color-neutral-gray-500); }

/* — Dark — */
.tooltip--dark {
  background-color: var(--color-neutral-gray-900);
}
.tooltip--dark .tooltip__title { color: var(--color-neutral-white-base); }
.tooltip--dark .tooltip__body  { color: var(--color-neutral-white-base); }

/* — Gray — */
.tooltip--gray {
  background-color: var(--color-neutral-gray-25);
  border: 1px solid var(--color-neutral-gray-300);
}
.tooltip--gray .tooltip__title { color: var(--color-neutral-gray-700); }
.tooltip--gray .tooltip__body  { color: var(--color-neutral-gray-600); }

/* — Info — */
.tooltip--info {
  background-color: var(--color-primary-blue-25);
  border: 1px solid var(--color-primary-blue-300);
}
.tooltip--info .tooltip__title { color: var(--color-primary-blue-700); }
.tooltip--info .tooltip__body  { color: var(--color-primary-blue-600); }

/* — Success — */
.tooltip--success {
  background-color: var(--color-secondary-success-25);
  border: 1px solid var(--color-secondary-success-300);
}
.tooltip--success .tooltip__title { color: var(--color-secondary-success-700); }
.tooltip--success .tooltip__body  { color: var(--color-secondary-success-600); }

/* — Warning — */
.tooltip--warning {
  background-color: var(--color-secondary-warning-25);
  border: 1px solid var(--color-secondary-warning-300);
}
.tooltip--warning .tooltip__title { color: var(--color-secondary-warning-700); }
.tooltip--warning .tooltip__body  { color: var(--color-secondary-warning-600); }

/* — Error — */
.tooltip--error {
  background-color: var(--color-secondary-error-25);
  border: 1px solid var(--color-secondary-error-300);
}
.tooltip--error .tooltip__title { color: var(--color-secondary-error-700); }
.tooltip--error .tooltip__body  { color: var(--color-secondary-error-600); }
```

**Usage rules:**
- Use Light for neutral contextual hints on white/light surfaces. Use Dark for maximum contrast on light backgrounds.
- Use semantic themes (Info / Success / Warning / Error) only when the tooltip content describes a status.
- Arrow position (Start / Center / End) shifts the arrow along the tooltip edge — choose alignment that points clearly toward the trigger.
- Z-index: `1070` — tooltip sits above all other overlay layers.
- Tooltip is display-only; no keyboard-active, focus, or pressed states are defined in Figma.

---

## Modal / Dialog

**Purpose:** Focused overlay that interrupts the main content to capture user attention for critical actions, confirmations, or structured input.

**Variants:**
- Type: Default, Success, Info, Warning, Destructive, Custom
- Device: Web, Mobile
- Header icon: present / absent
- Subtitle: present / absent
- Back button: present / absent
- Footer: present / absent
- Dismiss button: present / absent

**States:** Open / Closed (class-toggled; Figma shows the open state)

**Sizes:**
- Web: 483px wide, height content-driven
- Mobile: 375px wide, height content-driven
- Note: HighRise 1.1 does not define xs / sm / md / lg / xl size variants — one fixed width per device breakpoint.

**Anatomy:**
- Backdrop: full-screen overlay layer behind the modal
- Shell: white card with border, radius, and shadow
- Header (optional): back icon + semantic icon + title + close button
- Body: primary content area with descriptive text
- Footer (optional): action buttons separated from body by a 1px divider

**Specs:**

| Property | Value | Token |
|---|---|---|
| Shell bg | #ffffff | color/neutral/white/base |
| Shell border | 1px solid #f2f4f7 | color/neutral/gray/100 |
| Shell border-radius | 8px | — |
| Shadow | 0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03) | Shadow/xl |
| Width — Web | 483px | — |
| Width — Mobile | 375px | — |
| Header padding-top | 12px | — |
| Header padding-horizontal | 16px | — |
| Header gap | 8px | — |
| Header title font size | 15px | — |
| Header title font weight | 600 (semibold) | font/weight/semibold |
| Header title line height | 20px | font/line-height/lg |
| Header title color | #101828 | color/neutral/gray/900 |
| Header back icon size | 16×16px | — |
| Header semantic icon size | 20×20px | — |
| Header close button size | 20×20px | — |
| Body padding | 16px | — |
| Body font size | 13px | font/size/md |
| Body font weight | 400 (regular) | font/weight/regular |
| Body line height | 18px | font/line-height/md |
| Body text color | #667085 | color/neutral/gray/500 |
| Footer padding-bottom | 12px | — |
| Footer padding-horizontal | 16px | — |
| Footer padding-top | 12px | — |
| Footer divider | 1px solid #f2f4f7 | color/neutral/gray/100 |
| Footer button height | 32px | — |
| **Default — primary btn bg** | #155eef | color/primary/blue/600 |
| **Default — primary btn text** | #ffffff | color/neutral/white/base |
| **Destructive — primary btn bg** | #d92d20 | color/secondary/error/600 |
| **Destructive — primary btn text** | #ffffff | color/neutral/white/base |
| Backdrop bg | rgba(0, 0, 0, 0.50) | — |
| Backdrop blur | none | — |
| Z-index (backdrop) | 999 (convention) | — |
| Z-index (modal shell) | 1000 (convention) | — |
| Click backdrop to dismiss | Yes — Figma `dismiss` toggle is present | — |

**CSS (paste-ready):**
```css
/* Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.50);
  z-index: 999;
}

/* Shell */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 1px solid var(--color-neutral-gray-100);
  border-radius: 8px;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08),
              0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  width: 483px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.modal--mobile {
  width: 375px;
}

/* Header */
.modal__header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px 0 16px;
}

.modal__back-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.modal__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.modal__title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-neutral-gray-900);
}

.modal__close {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}

/* Body */
.modal__body {
  padding: 16px;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: var(--color-neutral-gray-500);
}

/* Footer */
.modal__footer {
  border-top: 1px solid var(--color-neutral-gray-100);
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
}

.modal__footer .btn--primary {
  height: 32px;
  background-color: var(--color-primary-blue-600);
  color: #ffffff;
}

/* Destructive variant — primary button only */
.modal--destructive .modal__footer .btn--primary {
  background-color: var(--color-secondary-error-600);
}
```

**Usage rules:**
- Use Modal for actions requiring undivided attention: destructive confirmations, structured form input, detail views.
- Always implement backdrop-click-to-dismiss — the Figma `dismiss` toggle confirms this is expected behavior.
- Destructive modals must use the red primary button and unambiguous action copy ("Delete permanently", not "Confirm").
- Never stack modals — if a sub-action is needed while a modal is open, use a Drawer instead.
- No blur on the backdrop — HighRise uses a flat `rgba(0,0,0,0.50)` overlay.
- One fixed width per device breakpoint; no size-scale variants exist in the DS.

---

## Toast / Notification

**Purpose:** Temporary feedback overlay anchored to the viewport edge that confirms actions or reports status without blocking interaction.

**Variants:**
- Icon type: Primary, Gray, Success, Error, Warning, No icon, Avatar, Image, Progress indicator
- Device: Desktop, Mobile
- With / without dismiss ("X") button
- With / without action links

**States:** Display-only — no interactive states on the shell itself.

**Sizes:**
- Desktop: 504px wide
- Mobile: 375px wide
- Height: content-driven

**Anatomy:**
- Shell: white card with border, 12px radius, 16px padding, Shadow/lg
- Featured icon: 40×40px outer ring (28px border-radius, 6px solid colored border) containing a 20×20px inner icon
- Content: title (14px semibold) + body text (14px regular), stacked vertically
- Actions row (optional): dismiss text button + action link

**Specs:**

| Property | Value | Token |
|---|---|---|
| Shell bg | #ffffff | color/neutral/white/base |
| Shell border | 1px solid #f2f4f7 | color/neutral/gray/100 |
| Shell border-radius | 12px | — |
| Shell padding | 16px | — |
| Shell gap (icon ↔ content) | 16px | — |
| Shadow | 0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03) | Shadow/lg |
| Width — Desktop | 504px | — |
| Width — Mobile | 375px | — |
| Featured icon outer ring size | 40×40px | — |
| Featured icon outer ring border-radius | 28px | — |
| Featured icon outer ring border width | 6px solid | — |
| Featured icon inner icon size | 20×20px | — |
| Title font size | 14px | font/size/lg |
| Title font weight | 600 (semibold) | font/weight/semibold |
| Title line height | 20px | font/line-height/lg |
| Title color | #101828 | color/neutral/gray/900 |
| Body font size | 14px | font/size/lg |
| Body font weight | 400 (regular) | font/weight/regular |
| Body line height | 20px | font/line-height/lg |
| Body color | #475467 | color/neutral/gray/600 |
| Dismiss action text color | #344054 | color/neutral/gray/700 |
| Dismiss action font weight | 600 | font/weight/semibold |
| Action link text color | #155eef | color/primary/blue/600 |
| Action link font weight | 600 | font/weight/semibold |
| **Primary icon — outer ring bg** | #d1e0ff | color/primary/blue/100 |
| **Primary icon — outer ring border** | #eff4ff | color/primary/blue/50 |
| **Error icon — outer ring bg** | #fee4e2 | color/secondary/error/100 |
| **Error icon — outer ring border** | #fef3f2 | color/secondary/error/50 |
| **Success icon — outer ring bg** | #d1fadf | color/secondary/success/100 |
| **Success icon — outer ring border** | #ecfdf3 | color/secondary/success/50 |
| **Warning icon — outer ring bg** | #fef0c7 | color/secondary/warning/100 |
| **Warning icon — outer ring border** | #fffaeb | color/secondary/warning/50 |
| **Gray icon — outer ring bg** | #f2f4f7 | color/neutral/gray/100 |
| **Gray icon — outer ring border** | #f9fafb | color/neutral/gray/50 |
| Screen position | Top-right or Bottom-right (convention — not defined in Figma) | — |
| Z-index | 1050 (convention — above modal) | — |

**CSS (paste-ready):**
```css
/* Notification stack container */
.notification-stack {
  position: fixed;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification-stack--top-right {
  top: 24px;
  right: 24px;
}

.notification-stack--bottom-right {
  bottom: 24px;
  right: 24px;
  flex-direction: column-reverse;
}

/* Shell */
.notification {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid var(--color-neutral-gray-100);
  border-radius: 12px;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
              0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  width: 504px;
}

/* Featured icon ring */
.notification__featured-icon {
  width: 40px;
  height: 40px;
  border-radius: 28px;
  border: 6px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification__featured-icon .icon {
  width: 20px;
  height: 20px;
}

/* Semantic colors */
.notification--primary .notification__featured-icon {
  background-color: var(--color-primary-blue-100);
  border-color: var(--color-primary-blue-50);
}

.notification--error .notification__featured-icon {
  background-color: var(--color-secondary-error-100);
  border-color: var(--color-secondary-error-50);
}

.notification--success .notification__featured-icon {
  background-color: var(--color-secondary-success-100);
  border-color: var(--color-secondary-success-50);
}

.notification--warning .notification__featured-icon {
  background-color: var(--color-secondary-warning-100);
  border-color: var(--color-secondary-warning-50);
}

.notification--gray .notification__featured-icon {
  background-color: var(--color-neutral-gray-100);
  border-color: var(--color-neutral-gray-50);
}

/* Content */
.notification__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.notification__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-neutral-gray-900);
}

.notification__body {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-neutral-gray-600);
}

/* Actions */
.notification__actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.notification__dismiss {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-neutral-gray-700);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.notification__action-link {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-primary-blue-600);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
```

**Usage rules:**
- Notifications auto-dismiss after 4–6 seconds unless they contain a required user action.
- Always include a dismiss ("X") button for accessibility — never lock the user inside a notification.
- Stack notifications vertically (newest on top for top-right, newest on bottom for bottom-right) with 8px gap.
- Use semantic icon types only when the notification relates to a real system status change. Use "No icon" for neutral informational messages.
- Width is fixed at 504px on desktop — do not stretch to fill the viewport.

---

## Drawer / Side Panel

**Purpose:** Slide-in panel anchored to the right (or left) edge of the viewport for contextual editing, detail views, or multi-step workflows without leaving the page.

**Variants:**
- Overlay=True: panel sits above content with a backdrop (428×960px)
- Overlay=False: panel is inline / embedded alongside content (412×960px)
- Tab Position=Left / Right: position of the vertical tab strip
- Type=Maximized: panel fully expanded
- Type=Minimized: panel collapsed to tab strip only (52×960px)

**States:**
- Maximized / Minimized
- Overlay / Inline

**Sizes:**

| Variant | Width | Height |
|---|---|---|
| Overlay=True, Maximized | 428px | 960px |
| Overlay=False, Maximized | 412px | 960px |
| Overlay=False, Minimized | 52px | 960px |

Note: HighRise does not define sm / md / lg / full size variants — one fixed width with a Minimized collapse.

**Anatomy:**
- Backdrop: visible only in Overlay=True mode (same convention as Modal)
- Panel container: white card with 12px radius, 16px padding, Shadow/md
- Header (optional): title row
- Body: fills remaining height, gray-100 background, 4px radius, 8px vertical padding
- Footer (optional): 1px divider + CTA button
- Tab strip (optional): 52px-wide vertical strip of 32×32px icon tabs; active tab has white bg + primary border

**Specs:**

| Property | Value | Token |
|---|---|---|
| Panel bg | #ffffff | color/neutral/white/base |
| Panel border-radius | 12px | — |
| Panel padding | 16px | — |
| Panel gap | 8px | — |
| Shadow | 0px 4px 8px -2px rgba(16,24,40,0.10), 0px 2px 4px -2px rgba(16,24,40,0.06) | Shadow/md |
| Width — Overlay=True | 428px | — |
| Width — Overlay=False | 412px | — |
| Width — Minimized | 52px | — |
| Height | 960px | — |
| Header title font size | 14px | font/size/lg |
| Header title font weight | 600 (semibold) | font/weight/semibold |
| Header title line height | 20px | font/line-height/lg |
| Header title color | #101828 | color/neutral/gray/900 |
| Body bg | #f2f4f7 | color/neutral/gray/100 |
| Body border-radius | 4px | — |
| Body padding-vertical | 8px | — |
| Footer padding-bottom | 12px | — |
| Footer padding-horizontal | 16px | — |
| Footer padding-top | 12px | — |
| Footer divider | 1px solid | color/neutral/gray/200 (inferred) |
| Footer CTA bg | #155eef | color/primary/blue/600 |
| Footer CTA text color | #ffffff | color/neutral/white/base |
| Footer CTA font size | 14px | font/size/lg |
| Footer CTA font weight | 600 | font/weight/semibold |
| Tab strip width | 52px | — |
| Tab strip padding-horizontal | 4px | — |
| Tab strip padding-vertical | 22px | — |
| Tab strip border-radius | 4px | — |
| Tab item size | 32×32px | — |
| Tab — active bg | #ffffff | color/neutral/white/base |
| Tab — active border | 1px solid #155eef | color/primary/blue/600 |
| Backdrop bg | rgba(0, 0, 0, 0.50) | — |
| Backdrop blur | none | — |
| Z-index (backdrop) | 898 (convention) | — |
| Z-index (panel) | 900 (convention — below modal at 1000) | — |
| Click backdrop to dismiss | Yes (Overlay=True mode) | — |

**CSS (paste-ready):**
```css
/* Backdrop (Overlay=True only) */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.50);
  z-index: 898;
}

/* Outer wrapper */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 960px;
  width: 428px;
  z-index: 900;
  display: flex;
  overflow: hidden;
}

.drawer--tab-left {
  flex-direction: row-reverse;
}

.drawer--inline {
  position: relative;
  width: 412px;
}

.drawer--minimized {
  width: 52px;
}

/* Panel container */
.drawer__panel {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

/* Header */
.drawer__header {
  display: flex;
  align-items: center;
}

.drawer__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-neutral-gray-900);
}

/* Body */
.drawer__body {
  flex: 1;
  background-color: var(--color-neutral-gray-100);
  border-radius: 4px;
  padding: 8px 0;
  overflow-y: auto;
}

/* Footer */
.drawer__footer {
  border-top: 1px solid var(--color-neutral-gray-200);
  padding: 12px 16px;
}

.drawer__footer .btn--primary {
  background-color: var(--color-primary-blue-600);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

/* Tab strip */
.drawer__tabs {
  width: 52px;
  padding: 22px 4px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.drawer__tab {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.drawer__tab--active {
  background-color: #ffffff;
  border: 1px solid var(--color-primary-blue-600);
}
```

**Usage rules:**
- Use Drawer for contextual work that shouldn't abandon the current page (e.g. editing a record's details).
- Use Overlay=True when the panel temporarily blocks the main content flow; use Overlay=False when the panel coexists alongside content.
- Tab strip items use icons only — always add a Tooltip on hover to describe each tab.
- Minimized state (52px) shows only the tab strip — use it to allow persistent panel access without blocking content.
- Z-index: `900` — sits below modals (`1000`) so a Modal can open over an open Drawer.

---

## Banner / Alert (inline)

**Purpose:** Persistent inline feedback message rendered within the page content flow to communicate status, information, or required action without interrupting the user.

**Variants:**
- Color: Default, Primary, Gray, Error, Warning, Success (6 variants)
- Inline=True: compact, no supporting text row
- Inline=False: full card with supporting text
- With / without icon (20×20px)
- With / without actions
- Dismissible (xCloseButton toggle)

**States:** Display-only in Figma — no hover or focus states defined on the shell.

**Sizes:**
- Standard (Inline=False): 478px wide, ~98px tall (with actions row)
- Compact (Inline=True): 478px wide, ~89px tall (no supporting text)

**Anatomy:**
- Shell: card with border, 12px radius, 8px padding, 8px gap
- Icon (optional): 20×20px semantic icon, left-aligned
- Content: heading + optional supporting text + optional actions row
- Actions: two text buttons — secondary action ("Learn more") + primary action ("View changes" + arrow icon)
- Close X (optional): 20×20px dismiss button, right-aligned

**Specs:**

| Property | Value | Token |
|---|---|---|
| Shell border-radius | 12px | — |
| Shell padding | 8px | — |
| Shell gap | 8px | — |
| Width | 478px | — |
| Icon size | 20×20px | — |
| Heading font size | 14px | font/size/lg |
| Heading font weight | 600 (semibold) | font/weight/semibold |
| Heading line height | 20px | font/line-height/lg |
| Body font size | 13px | font/size/md |
| Body font weight | 400 (regular) | font/weight/regular |
| Body line height | 18px | font/line-height/md |
| Actions gap | 12px | — |
| Action font size | 14px | font/size/lg |
| Action font weight | 600 (semibold) | font/weight/semibold |
| Action line height | 20px | font/line-height/lg |
| Close X size | 20×20px | — |
| **Default — bg** | #ffffff | color/neutral/white/base |
| **Default — border** | 1px solid #d0d5dd | color/neutral/gray/300 |
| **Default — heading color** | #344054 | color/neutral/gray/700 |
| **Default — body color** | #475467 | color/neutral/gray/600 |
| **Default — secondary action color** | #344054 | color/neutral/gray/700 |
| **Default — primary action color** | #004eeb | color/primary/blue/700 |
| **Error — bg** | #fffbfa | color/secondary/error/25 |
| **Error — border** | 1px solid #fda29b | color/secondary/error/300 |
| **Error — all text color** | #b42318 | color/secondary/error/700 |
| **Success — bg** | #f6fef9 | color/secondary/success/25 |
| **Success — border** | 1px solid #6ce9a6 | color/secondary/success/300 |
| **Success — all text color** | #027a48 | color/secondary/success/700 |
| **Warning — bg** | #fffcf5 | color/secondary/warning/25 |
| **Warning — border** | 1px solid #fec84b | color/secondary/warning/300 |
| **Warning — all text color** | #b54708 | color/secondary/warning/700 |
| **Primary — bg** | #f5f8ff | color/primary/blue/25 |
| **Primary — border** | 1px solid #84adff | color/primary/blue/300 |
| **Primary — all text color** | #004eeb | color/primary/blue/700 |
| **Gray — bg** | #fcfcfd | color/neutral/gray/25 |
| **Gray — border** | 1px solid #d0d5dd | color/neutral/gray/300 |
| **Gray — all text color** | #344054 | color/neutral/gray/700 |

**CSS (paste-ready):**
```css
/* Shell */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 12px;
  border: 1px solid;
  width: 478px;
}

.alert__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.alert__heading {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  width: 100%;
}

.alert__body {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.alert__actions {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.alert__action-secondary,
.alert__action-primary {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.alert__close {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}

/* — Default variant — */
.alert--default {
  background-color: #ffffff;
  border-color: var(--color-neutral-gray-300);
}
.alert--default .alert__heading          { color: var(--color-neutral-gray-700); }
.alert--default .alert__body             { color: var(--color-neutral-gray-600); }
.alert--default .alert__action-secondary { color: var(--color-neutral-gray-700); }
.alert--default .alert__action-primary   { color: var(--color-primary-blue-700); }

/* — Error variant — */
.alert--error {
  background-color: var(--color-secondary-error-25);
  border-color: var(--color-secondary-error-300);
}
.alert--error .alert__heading,
.alert--error .alert__body,
.alert--error .alert__action-secondary,
.alert--error .alert__action-primary { color: var(--color-secondary-error-700); }

/* — Success variant — */
.alert--success {
  background-color: var(--color-secondary-success-25);
  border-color: var(--color-secondary-success-300);
}
.alert--success .alert__heading,
.alert--success .alert__body,
.alert--success .alert__action-secondary,
.alert--success .alert__action-primary { color: var(--color-secondary-success-700); }

/* — Warning variant — */
.alert--warning {
  background-color: var(--color-secondary-warning-25);
  border-color: var(--color-secondary-warning-300);
}
.alert--warning .alert__heading,
.alert--warning .alert__body,
.alert--warning .alert__action-secondary,
.alert--warning .alert__action-primary { color: var(--color-secondary-warning-700); }

/* — Primary variant — */
.alert--primary {
  background-color: var(--color-primary-blue-25);
  border-color: var(--color-primary-blue-300);
}
.alert--primary .alert__heading,
.alert--primary .alert__body,
.alert--primary .alert__action-secondary,
.alert--primary .alert__action-primary { color: var(--color-primary-blue-700); }

/* — Gray variant — */
.alert--gray {
  background-color: var(--color-neutral-gray-25);
  border-color: var(--color-neutral-gray-300);
}
.alert--gray .alert__heading,
.alert--gray .alert__body,
.alert--gray .alert__action-secondary,
.alert--gray .alert__action-primary { color: var(--color-neutral-gray-700); }
```

**Usage rules:**
- Use inline Alert within a form, page section, or context — not as a replacement for Toast/Notification.
- Default and Gray variants are for informational messages. Use semantic variants (Error/Warning/Success/Primary) for status feedback.
- **Critical color rule:** In all semantic variants (Error, Success, Warning, Primary), heading, body, and both action buttons all share the same `700`-level token. The Default variant is the exception — body uses gray-600 and the primary action uses primary-blue-700.
- The compact `Inline=True` version removes the supporting text row — use it when vertical space is limited.
- Always pair a semantic icon with a matching semantic color for maximum comprehension.

---

## Dropdown Menu / Context Menu

**Purpose:** Floating list of actions or options anchored to a trigger element, used for action menus, navigation, and select-style pickers.

**Variants:**
- Item types: Menu Item, Group Title, Search, Divider, Custom, Other Input
- Multi Select: True (checkbox mode) / False (single-select)
- Lite: True (no bg on selection) / False (has blue-50 bg on selection)
- Nested (sub-menu): True / False (shows chevron-right trailing icon)
- Leading icon: present / absent (14×14px)
- Trailing check icon: present / absent (16×16px)
- Description row: present / absent (11px secondary label below main label)
- Expandable: True / False (.Expand Collapse Item arrow at row start)

**States:**
- Default
- Hover
- Selected (Active)
- Disabled

**Sizes:**

| Property | Value |
|---|---|
| Container width — Dropdown component | 182px |
| Container width — Custom menu frames | 199–240px (content-driven) |
| Item height — label only | 26px (4px top + 16px content + 4px bottom) |
| Item height — with description | 44px |
| Group title height | 28px |
| Search item height | 40px |
| Divider height | 1px |
| Container padding-vertical | 4px |
| Item gap | 2px |

**Anatomy:**
- Container: white card, border, 4px radius, Shadow/md, 4px vertical padding
- Group Title row: section label (uppercase, muted color)
- Search row: icon + text input (for filter-style menus)
- Divider: 1px horizontal separator between groups
- Menu item row: expand-arrow? + leading-icon? + [label + description?] + trailing-icon? + check? + nested-arrow?
- Custom slot: placeholder area for bespoke content (e.g. date picker, color picker)

**Specs:**

| Property | Value | Token |
|---|---|---|
| Container bg | #ffffff | color/neutral/white/base |
| Container border | 1px solid #d0d5dd | color/neutral/gray/300 |
| Container border-radius | 4px | — |
| Container shadow | 0px 4px 8px -2px rgba(16,24,40,0.10), 0px 2px 4px -2px rgba(16,24,40,0.06) | Shadow/md |
| Container padding-vertical | 4px | — |
| Container item gap | 2px | — |
| **Default — bg** | transparent | — |
| **Default — label color** | #344054 | color/neutral/gray/700 |
| **Hover — bg** | #f2f4f7 | color/neutral/gray/100 |
| **Hover — label color** | #344054 | color/neutral/gray/700 |
| **Selected — bg** | #eff4ff | color/primary/blue/50 |
| **Selected — label color** | #344054 | color/neutral/gray/700 |
| **Disabled — bg** | #f9fafb | color/neutral/gray/50 |
| **Disabled — label color** | #98a2b3 | color/neutral/gray/400 |
| Item padding | 4px 8px | — |
| Item label font size | 13px | font/size/md |
| Item label font weight | 400 (regular) | font/weight/regular |
| Item label line height | 18px | font/line-height/md |
| Description font size | 11px | — |
| Description font weight | 400 (regular) | font/weight/regular |
| Description line height | 16px | font/line-height/xs |
| Description color (default/hover/selected) | #475467 | color/neutral/gray/600 |
| Description color (disabled) | #98a2b3 | color/neutral/gray/400 |
| Leading icon size | 14×14px | — |
| Check icon size | 16×16px | — |
| Nested arrow icon size | 14×14px | — |
| Expand/collapse arrow size | 18×18px | — |
| Divider color | #d0d5dd | color/neutral/gray/300 |
| Z-index | 800 (convention — below Drawer at 900, below Modal at 1000) | — |

**CSS (paste-ready):**
```css
/* Container */
.dropdown-menu {
  background-color: #ffffff;
  border: 1px solid var(--color-neutral-gray-300);
  border-radius: 4px;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 182px;
  position: absolute;
  z-index: 800;
}

/* Group title */
.dropdown-menu__group-title {
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  color: var(--color-neutral-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Divider */
.dropdown-menu__divider {
  height: 1px;
  background-color: var(--color-neutral-gray-300);
  margin: 2px 0;
}

/* Menu item */
.dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  cursor: pointer;
  min-height: 26px;
}

/* Inner content layout */
.dropdown-menu__item-content {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.dropdown-menu__item-leading-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.dropdown-menu__item-text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.dropdown-menu__item-label {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: var(--color-neutral-gray-700);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-menu__item-description {
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-neutral-gray-600);
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-menu__item-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.dropdown-menu__item-nested-arrow {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* — States — */
.dropdown-menu__item:hover,
.dropdown-menu__item--hover {
  background-color: var(--color-neutral-gray-100);
}

.dropdown-menu__item--selected,
.dropdown-menu__item[aria-selected="true"] {
  background-color: var(--color-primary-blue-50);
}

.dropdown-menu__item--disabled,
.dropdown-menu__item[aria-disabled="true"] {
  background-color: var(--color-neutral-gray-50);
  cursor: not-allowed;
  pointer-events: none;
}

.dropdown-menu__item--disabled .dropdown-menu__item-label,
.dropdown-menu__item[aria-disabled="true"] .dropdown-menu__item-label {
  color: var(--color-neutral-gray-400);
}

.dropdown-menu__item--disabled .dropdown-menu__item-description,
.dropdown-menu__item[aria-disabled="true"] .dropdown-menu__item-description {
  color: var(--color-neutral-gray-400);
}
```

**Usage rules:**
- Dropdown menus open on click (never on hover).
- Use Group Title rows (uppercase muted labels) to organize semantically distinct groups of actions.
- Use Dividers between sections when group titles are not sufficient (e.g. before a destructive action at the bottom).
- Sub-menus (nested items) show a chevron-right icon — open the sub-menu on hover of the parent item with a small delay.
- The Selected (blue-50) state is used for single-select pickers. For multi-select, use the checkbox item variant.
- Disabled items remain visible in the list to communicate the option exists but is currently unavailable.
- Z-index: `800` — sits below Drawer (`900`) and Modal (`1000`). If a dropdown opens inside a Drawer, it must clip or scroll within the Drawer bounds.

---

## Popover

**Note:** HighRise 1.1 does not include a dedicated Popover component. No Popover symbol or standalone page was found in the Figma file.

**If a popover-style overlay is needed:**
- For small rich-content popovers: use `Tooltip` with `Custom=True` (freeform body slot).
- For larger anchor-attached content panels: use a `Dropdown Menu` container shell (white bg, border, shadow) without the item list.
- Custom popover convention based on adjacent DS values:

```css
.popover {
  background-color: #ffffff;
  border: 1px solid var(--color-neutral-gray-300);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  position: absolute;
  z-index: 850;
}
```

---

## Z-Index Stack Summary (Pass 5)

| Layer | Z-index | Sits above |
|---|---|---|
| Dropdown Menu | 800 | page content |
| Drawer / Side Panel | 900 | page content, dropdowns |
| Modal backdrop | 999 | drawer |
| Modal shell | 1000 | modal backdrop |
| Toast / Notification | 1050 | modal |
| Tooltip | 1070 | everything |

---

✓ Pass 5 complete

---

# PASS 6 — INVENTORY & REMAINING

---

## PART A — Inventory Scan

Every component found in HighRise 1.1 **not** already documented in Passes 1–5.

| # | Component Name (Figma layer) | Purpose | Figma Node ID | Complexity |
|---|---|---|---|---|
| 1 | Accordion | Expandable/collapsible panel sections | 28470:49798 | Complex |
| 2 | Sub-account Menu | Agency/subaccount scope-switcher dropdown | 27339:289771 | Complex |
| 3 | ↳ Command menu | Full-screen ⌘K search/command palette overlay | 3307:403757 | Complex |
| 4 | Quick Action Menu | Contextual icon strip + action dropdown | 27339:247227 | Medium |
| 5 | Tile | Square navigation tile with icon and label | 30512:10238 | Simple |
| 6 | Sort and Filter | Combined sort + filter panel dropdown | 30456:7425 | Medium |
| 7 | Color Picker | Color swatch and picker for visual customization | 28470:24565 | Complex |
| 8 | Rich Text Editor | Reference screenshots only — no component symbols | 28034:43074 | N/A |
| 9 | ↳ Notifications | In-app notification card / activity feed item | 176:4256 | Medium |
| 10 | Divider | Horizontal or vertical visual separator | 26683:85319 | Simple |
| 11 | Content Switcher | Toggle between two content view modes | (not extracted) | Simple |
| 12 | Checkbox Card Group | Card-style grouped checkbox inputs | (not extracted) | Medium |
| 13 | Inline Editor | In-context editable text field | (not extracted) | Simple |
| 14 | Input OTP | One-time password digit input row | (not extracted) | Simple |
| 15 | Input Slider | Range value slider | (not extracted) | Simple |
| 16 | Progress Steps | Linear multi-step progress indicator | (not extracted) | Medium |
| 17 | Radio Card Group | Card-style grouped radio inputs | (not extracted) | Medium |
| 18 | Toggle Switch Group | Horizontally grouped toggle switches | (not extracted) | Simple |
| 19 | Toggle Card Group | Card-style toggle inputs | (not extracted) | Medium |
| 20 | Date & Time Range Picker | Combined date + time range selector | (not extracted) | Complex |
| 21 | Bottom Navigation Bar | Mobile bottom tab navigation | (not extracted) | Simple |
| 22 | Mobile Navigation Bar | Mobile top header/nav bar | (not extracted) | Simple |
| 23 | Carousel | Horizontally sliding content carousel | (not extracted) | Medium |
| 24 | Code Editor | Syntax-highlighted code block display area | (not extracted) | Complex |
| 25 | CRUD | Full create/read/update/delete layout template | (not extracted) | Complex |
| 26 | Input Form | Standard form container/layout pattern | (not extracted) | Medium |
| 27 | Header Lite | Simplified page header without secondary actions | (not extracted) | Simple |
| 28 | Footer | Page footer with links and branding | (not extracted) | Simple |
| 29 | Drag | Draggable handle for sortable lists | (not extracted) | Simple |
| 30 | Builder Space | Canvas/workspace container area | (not extracted) | Complex |
| 31 | Icon / Emoji / Media Picker | Overlay for icon, emoji, and media selection | (not extracted) | Complex |
| 32 | Device Mockups | Device frame wrappers for content preview | (not extracted) | Simple |
| 33 | Input Stepper | Numeric increment/decrement input | (not extracted) | Simple |
| 34 | Summary Grid | Data summary display grid layout | (not extracted) | Medium |
| 35 | Key Value Pair | Label + value display pattern | (not extracted) | Simple |
| 36 | Charts / Metrics | Data visualization components | (not extracted) | Complex |
| 37 | WYSIWYG | Rich text editor UI (full interface) | (not extracted) | Complex |

---

## PART B — Deep Extract

---

## Accordion

**Purpose:** Vertically stacked collapsible panels. Each panel has a header (trigger) and a body (content). Used in sidebars for nested navigation, settings pages, and FAQ-style lists.

**Variants:**
- `Type`: Light / Dark
- `Border`: True / False
- `Border Position`: Item (border wraps each item individually) / Container (border wraps the whole group)
- `Padding`: True / False

**Sizes:** sm (default), md, lg

**States (per AccordionItem):** Default (collapsed), Open/Expanded, Hover, Disabled

**Anatomy:**
```
┌─ Accordion ──────────────────────────────┐
│ ┌─ AccordionItem ──────────────────────┐ │
│ │ ┌─ AccordionHeader ────────────────┐ │ │
│ │ │  [Icon?]  Label text   [Chevron] │ │ │
│ │ └──────────────────────────────────┘ │ │
│ │ ┌─ AccordionBody (open only) ──────┐ │ │
│ │ │  Content slot                    │ │ │
│ │ └──────────────────────────────────┘ │ │
│ └──────────────────────────────────────┘ │
│   8px gap between items                  │
└──────────────────────────────────────────┘
```

**Specs (Size: sm, Type: Light, Border: True, BorderPosition: Item):**

| Property | Value |
|---|---|
| Item background | `#ffffff` |
| Item border | `1px solid var(--color-neutral-gray-200)` |
| Item border-radius | `8px` |
| Gap between items | `8px` |
| Header padding | `12px 16px` |
| Header label size | `var(--font-size-lg)` / `14px` |
| Header label weight | `var(--font-weight-medium)` / `500` |
| Header label color | `var(--color-neutral-gray-900)` / `#101828` |
| Chevron icon size | `20px` |
| Chevron color | `var(--color-neutral-gray-500)` |
| Body padding | `0 16px 12px` |
| Container width | fills parent |

**CSS:**
```css
.accordion {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.accordion__item {
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-200, #eaecf0);
  border-radius: 8px;
  overflow: hidden;
}

.accordion__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-900, #101828);
  user-select: none;
}

.accordion__header:hover {
  background-color: var(--color-neutral-gray-50, #f9fafb);
}

.accordion__chevron {
  width: 20px;
  height: 20px;
  margin-left: auto;
  color: var(--color-neutral-gray-500, #667085);
  transition: transform 0.15s ease;
}

.accordion__item--open .accordion__chevron {
  transform: rotate(180deg);
}

.accordion__body {
  padding: 0 16px 12px;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-regular, 400);
  color: var(--color-neutral-gray-700, #344054);
}
```

**Usage rules:**
- Default to `Type=Light`. Dark variant is for use on dark-background panels only.
- `Border Position=Item` is the standard. Use `Container` only when multiple items must read as a single visual unit (e.g., accordion embedded inside a card).
- In sidebar navigation, allow only one panel open at a time. FAQ lists may allow multiple open panels.
- Chevron must rotate 180° on open — `transition: transform 0.15s ease`.
- Do not nest accordions more than one level deep.
- Respect `prefers-reduced-motion`: remove transition when motion preference is reduced.

**Figma node:** `28470:49798` — extracted from symbol `28471:9318`

---

## Scope Picker / Sub-account Menu

**Purpose:** Agency-level account switcher. Lets an agency user search for and switch to a sub-account (client account), or return to the agency view. Triggered from the sidebar account name area.

**Variants:**
- `currentAccount`: true — highlights the active sub-account with a "Current" badge and shows "Switch to Agency View" footer button / false — shows without current-account context

**States:** Default (list visible), Search-filtered (user typing), Empty (no results)

**Anatomy:**
```
┌─ Sub-account Menu (374px) ──────────────────────────────┐
│ ┌─ Header ──────────────────────────────────────────┐   │
│ │  "Switch Account"               [52 sub-accounts] │   │
│ └────────────────────────────────────────────────────┘   │
│ ┌─ Search field (28px) ──────────────────────────────┐   │
│ │  [🔍] Search for a sub-account                     │   │
│ └────────────────────────────────────────────────────┘   │
│ ┌─ Current account (if currentAccount=true) ─────────┐   │
│ │  [EU] Eugene, OR          [Current tag]            │   │
│ │       #34, Newyork City                            │   │
│ └────────────────────────────────────────────────────┘   │
│ ┌─ "Recent" group header ─────────────────────────────┐  │
│ │  [MS] Mark Shoes         102 Bonapetit Ave  [pin]  │  │
│ │  [QA] QA                 EAST 1004, Palo Alto [pin]│  │
│ └─────────────────────────────────────────────────────┘  │
│ ┌─ "All" group header ────────────────────────────────┐  │
│ │  [PB] Phoenix Baker      EAST 1004 [pin]            │  │
│ │  [OR] Olivia Rhye        Baker Street [pin]         │  │
│ │  ... (scrollable, 324px height)                    │  │
│ └─────────────────────────────────────────────────────┘  │
│ ─── divider ─────────────────────────────────────────    │
│ ┌─ Footer (if currentAccount=true) ───────────────────┐  │
│ │  [↩] Switch to Agency View  (full-width btn)        │  │
│ └─────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

**Specs:**

| Property | Value |
|---|---|
| Container width | `374px` |
| Container background | `var(--color-neutral-white-base)` / `#ffffff` |
| Container border | `1px solid var(--color-neutral-gray-300)` / `#d0d5dd` |
| Container border-radius | `4px` |
| Container shadow | `0px 4px 8px -2px rgba(16,24,40,0.10), 0px 2px 4px -2px rgba(16,24,40,0.06)` |
| Header padding | `8px` |
| Header border-bottom | `1px solid var(--color-neutral-gray-200)` |
| Header label size | `var(--font-size-xs)` / `11px`, weight 400 |
| Header label color | `var(--color-neutral-gray-700)` / `#344054` |
| Sub-account count tag | `var(--tag-primary-background-default)` bg + `var(--tag-primary-label-color-default)` text |
| Search field height | `28px` |
| Search field border | `1px solid var(--color-neutral-gray-300)` |
| Search field border-radius | `4px` |
| Search field shadow | `0px 1px 2px 0px rgba(16,24,40,0.05)` |
| Current account bg | `var(--color-primary-blue-100)` / `#d1e0ff` |
| Account avatar | `24px` circle, colored accent background + initials |
| Account name size | `13px` weight 400 |
| Address text size | `var(--font-size-xs)` / `11px` |
| Group header bg | `var(--color-neutral-gray-50)` / `#f9fafb` |
| Group header text | `11px` medium, `var(--color-neutral-gray-500)` |
| Scrollable list height | `324px` |
| Footer button | Primary solid, `var(--color-primary-blue-600)`, full-width, `24px` height, `4px` radius |

**CSS:**
```css
.scope-picker {
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  border-radius: 4px;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  width: 374px;
  overflow: hidden;
}

.scope-picker__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid var(--color-neutral-gray-200, #eaecf0);
}

.scope-picker__search {
  padding: 8px;
}

.scope-picker__search-input {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 6px;
  border: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background-color: var(--color-neutral-white-base, #ffffff);
  width: 100%;
  font-size: var(--font-size-lg, 14px);
  color: var(--color-neutral-gray-500, #667085);
}

.scope-picker__list {
  height: 324px;
  overflow-y: auto;
}

.scope-picker__group-header {
  padding: 8px 8px 4px;
  background-color: var(--color-neutral-gray-50, #f9fafb);
  font-size: var(--font-size-xs, 11px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-500, #667085);
}

.scope-picker__item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 24px 4px 8px;
}

.scope-picker__item--current {
  background-color: var(--color-primary-blue-100, #d1e0ff);
  border-radius: 4px;
}

.scope-picker__avatar {
  width: 24px;
  height: 24px;
  border-radius: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm, 12px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-600, #475467);
  flex-shrink: 0;
}

.scope-picker__footer {
  padding: 8px;
}

.scope-picker__switch-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 24px;
  background-color: var(--color-primary-blue-600, #155eef);
  border: 1px solid var(--color-primary-blue-600, #155eef);
  border-radius: 4px;
  color: var(--color-neutral-white-base, #ffffff);
  font-size: var(--font-size-xs, 11px);
  font-weight: var(--font-weight-semibold, 600);
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
```

**Usage rules:**
- Trigger opens from the sidebar account name element — clicking the account name area opens this panel.
- Always show the sub-account count tag in the header.
- The "Current" tag highlights the active account in the list.
- Show "Switch to Agency View" button only when the user is inside a sub-account context.
- The search field filters the list in real time — no submit required.
- Color-code account initials avatars using the accent palette (orange-dark, indigo, pink, cyan, teal, purple) — never primary blue.
- Z-index: `850` — above the sidebar (`700`) but below modals.

**Figma node:** `27339:289771` — extracted from symbol `27339:271834`

---

## Command Bar / Search Overlay

**Purpose:** Full-screen command palette triggered by ⌘K (or `Ctrl+K`). Allows global search across users, commands, pages, and recent items. Rendered as a centered card over a blurred, darkened page backdrop.

**Variants:**
- `Type`: Users (people search results) / Pages / Commands
- `Text`: Default (empty/placeholder) / with query entered

**States:** Default (recent results), Searching (filtered results), Empty (no matches)

**Anatomy:**
```
┌─ Full-screen overlay (1440 × 960, backdrop blur) ─────────────┐
│                                                                │
│          ┌─ Command bar (640px) ────────────────────────┐     │
│          │ ┌─ Input row ──────────────────────────────┐ │     │
│          │ │  [🔍]  Search                   [⌘/]     │ │     │
│          │ └──────────────────────────────────────────┘ │     │
│          │ ┌─ Section: "Recent" ──────────────────────┐ │     │
│          │ │  [Avatar] Name  @handle                  │ │     │
│          │ │  [Avatar] Name  @handle                  │ │     │
│          │ └──────────────────────────────────────────┘ │     │
│          │ ┌─ Section: "All users" (scrollable 240px) ─┐│     │
│          │ │  [Avatar] Name  @handle  (hovered)        ││     │
│          │ │  [Avatar] Name  @handle                   ││     │
│          │ └───────────────────────────────────────────┘│     │
│          └─────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

**Specs:**

| Property | Value |
|---|---|
| Overlay background | `rgba(52, 64, 84, 0.7)` |
| Overlay backdrop-filter | `blur(var(--blur-4, 8px))` |
| Card background | `var(--color-neutral-white-base)` |
| Card width | `640px` |
| Card border-radius | `12px` |
| Card shadow | `0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)` |
| Card sections gap | `16px` |
| Input area padding | `16px` |
| Input area border-bottom | `1px solid var(--color-neutral-gray-200)` |
| Search icon size | `20px` |
| Placeholder text | `var(--font-size-2xl)` / `16px`, weight 400, color gray-500 |
| Shortcut key bg | `var(--color-neutral-gray-50)` |
| Shortcut key border | `1px solid var(--color-neutral-gray-100)` |
| Shortcut key border-radius | `4px` |
| Section header padding | `0 18px` |
| Section header font | `14px` medium, color gray-600 |
| Result item outer padding | `2px 8px` |
| Result item inner padding | `8px 8px 8px 10px` |
| Result item border-radius | `8px` |
| Item avatar size | `24px` rounded-full |
| Item name | `14px` medium, gray-900 |
| Item handle | `14px` regular, gray-600 |
| Item hover background | `var(--color-neutral-gray-50)` |
| Scrollable section height | `240px` |

**CSS:**
```css
.command-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(52, 64, 84, 0.7);
  backdrop-filter: blur(var(--blur-4, 8px));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 200px;
  z-index: 1100;
}

.command-bar {
  background-color: var(--color-neutral-white-base, #ffffff);
  border-radius: 12px;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08),
              0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  width: 640px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.command-bar__input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid var(--color-neutral-gray-200, #eaecf0);
  background-color: var(--color-neutral-white-base, #ffffff);
}

.command-bar__search-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-neutral-gray-500, #667085);
}

.command-bar__placeholder {
  flex: 1;
  font-size: var(--font-size-2xl, 16px);
  font-weight: var(--font-weight-regular, 400);
  color: var(--color-neutral-gray-500, #667085);
}

.command-bar__shortcut {
  background-color: var(--color-neutral-gray-50, #f9fafb);
  border: 1px solid var(--color-neutral-gray-100, #f2f4f7);
  border-radius: 4px;
  padding: 2px 4px;
  font-size: var(--font-size-lg, 14px);
  color: var(--color-neutral-gray-600, #475467);
  mix-blend-mode: multiply;
}

.command-bar__section {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-neutral-gray-200, #eaecf0);
  overflow: hidden;
}

.command-bar__section--scrollable {
  height: 240px;
  overflow-y: auto;
  border-bottom: none;
}

.command-bar__section-header {
  padding: 0 18px;
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-600, #475467);
}

.command-bar__item {
  padding: 2px 8px;
}

.command-bar__item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 10px;
  border-radius: 8px;
}

.command-bar__item-content:hover,
.command-bar__item-content--active {
  background-color: var(--color-neutral-gray-50, #f9fafb);
}

.command-bar__item-name {
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-900, #101828);
}

.command-bar__item-handle {
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-regular, 400);
  color: var(--color-neutral-gray-600, #475467);
}
```

**Usage rules:**
- Trigger: `⌘K` (Mac) / `Ctrl+K` (Windows). Also accessible via a global search icon.
- Z-index: `1100` — above all other layers including modals and toasts.
- Backdrop click and `Esc` close the panel.
- Arrow keys navigate results; `Enter` selects.
- Results are grouped by section (e.g., "Recent", "All users"). Headers use muted label text (gray-600, medium).
- The blurred backdrop uses `backdrop-filter: blur(8px)` — ensure page content is visible beneath.
- Width is fixed at `640px`. Center horizontally; `200px` from top.
- Show "Recent" section first when no query is entered.

**Figma node:** `3307:403757` — extracted from symbol `3307:407511`

---

## Data Card / Content Card

**Note:** No standalone Data Card or Content Card component exists in HighRise 1.1. The "Card" page in the Elements section (`28016:19287`) contains only a placeholder rectangle (`Rectangle 1`) — not an extractable component.

**Recommended approach:** Build from HighRise tokens:
```css
.data-card {
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-200, #eaecf0);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.10),
              0px 1px 2px rgba(16, 24, 40, 0.06);
}
```
Use the `Statistic / KPI Card` (Pass 3) as a reference for data-heavy cards.

---

## Filter Bar / Sort & Filter

**Purpose:** A compact dropdown panel combining sort and filter options. Anchored to a "Sort & Filter" trigger button. Used in list/table views to let users narrow and order results.

**Variants:**
- `sort`: bool — shows/hides the sort section
- `filter`: bool — shows/hides the filter section
- `divider`: bool — shows/hides the separator between sort and filter sections
- `footer`: bool — shows/hides the apply/reset footer

**States:** Default, Active filter (selection checked), Disabled item

**Anatomy:**
```
┌─ Sort & Filter (300px) ────────────────────────┐
│ ┌─ Sort section ──────────────────────────┐    │
│ │  Sort by:                               │    │
│ │  [• Latest]   [  Oldest]               │    │
│ └─────────────────────────────────────────┘    │
│  ─── divider ────────────────────────────      │
│ ┌─ Filter section ────────────────────────┐    │
│ │  Filter by:                             │    │
│ │  [Dropdown List Item ▼]                 │    │
│ │  [Dropdown List Item ▼]                 │    │
│ └─────────────────────────────────────────┘    │
│ ┌─ Footer ────────────────────────────────┐    │
│ │  [Reset text btn]    [Apply btn]        │    │
│ └─────────────────────────────────────────┘    │
└────────────────────────────────────────────────┘
```

**Specs:**

| Property | Value |
|---|---|
| Container width | `300px` |
| Container background | `var(--color-neutral-white-base)` |
| Container border | `1px solid var(--color-neutral-gray-300)` |
| Container border-radius | `4px` |
| Container shadow | `0px 4px 8px -2px rgba(16,24,40,0.10), 0px 2px 4px -2px rgba(16,24,40,0.06)` |
| Container Y padding | `4px` |
| Section gap | `4px` |
| Section label size | `13px` weight 400, color gray-700 |
| Divider | `1px solid var(--color-neutral-gray-100)` |
| Footer padding | `4px 8px 8px` |

**CSS:**
```css
.sort-filter {
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  border-radius: 4px;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  width: 300px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sort-filter__section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sort-filter__divider {
  height: 1px;
  background-color: var(--color-neutral-gray-100, #f2f4f7);
  margin: 4px 0;
}

.sort-filter__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 4px 8px 8px;
}
```

**Usage rules:**
- Anchor to the bottom-left of the sort/filter trigger button.
- Show `divider=true` when both sort and filter sections are both visible simultaneously.
- Filter chips (shown on the page after applying) are separate — use `Tag` with `closable=true`.
- "Apply" button: Primary sm. "Reset": text-only / ghost.
- Z-index: `800`.

**Figma node:** `30456:7425` — extracted from symbol `32159:205435`

---

## Stat Tile

**Purpose:** A compact fixed-size square tile for navigation shortcuts or feature access. Distinct from the Statistic Card (Pass 3) — Tile is for navigation grids and quick-action areas, not data display.

**Variants:**
- `custom`: False (standard icon + label) / True (custom content slot)
- `iconOnly`: False (shows label below icon) / True (icon only, no label)

**States:** Default, Hover, Active, Disabled

**Sizes:** One fixed size — `72 × 72px`

**Anatomy:**
```
┌─ Tile (72×72) ─────────┐
│  [Icon 24px]            │
│  [Label text]           │
└─────────────────────────┘
  padding: 12px all sides
  gap: 8px (icon → label)
```

**Specs:**

| Property | Value |
|---|---|
| Width / Height | `72px × 72px` |
| Background | `#ffffff` |
| Border | `1px solid var(--color-neutral-gray-300)` / `#d0d5dd` |
| Border-radius | `8px` |
| Padding | `12px` |
| Gap (icon → label) | `8px` |
| Icon size | `24px` |
| Label font size | `var(--font-size-xs)` / `11px` |
| Label font weight | `var(--font-weight-medium)` / `500` |
| Label color | `var(--color-neutral-gray-700)` / `#344054` |
| Hover border | `var(--color-primary-blue-300)` |
| Hover background | `var(--color-primary-blue-50)` |
| Active background | `var(--color-primary-blue-100)` |

**CSS:**
```css
.tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  width: 72px;
  height: 72px;
  background-color: #ffffff;
  border: 1px solid var(--color-neutral-gray-300, #d0d5dd);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.tile:hover {
  background-color: var(--color-primary-blue-50, #eff4ff);
  border-color: var(--color-primary-blue-300, #84adff);
}

.tile--active {
  background-color: var(--color-primary-blue-100, #d1e0ff);
  border-color: var(--color-primary-blue-400, #528bff);
}

.tile--icon-only {
  gap: 0;
}

.tile__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.tile__label {
  font-size: var(--font-size-xs, 11px);
  font-weight: var(--font-weight-medium, 500);
  color: var(--color-neutral-gray-700, #344054);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
```

**Usage rules:**
- Use in 3-, 4-, or 5-column grids for navigation shortcuts (e.g., GHL "Quick Actions" panels).
- Labels must be very short — max 2 words. Use `iconOnly=true` if the label doesn't fit.
- Do not use Tile for KPI/stat display — use `Statistic Card` (Pass 3) for data.
- Fixed size: do not resize. If a larger tile is needed, build a custom variant.

**Figma node:** `30512:10238` — extracted from symbol `31641:27644`

---

## User Menu / Quick Action Menu

**Purpose:** A combined component: a horizontal strip of contextual icon actions (shown on row hover) plus a full dropdown menu with action list. Used in table rows, list items, and card hover states. In GHL context, this also maps to the user/profile menu pattern.

**Variants:**
- `customiseCta`: bool — toggles a "Customize" CTA at the bottom of the dropdown

**Anatomy:**
```
┌─ Quick Action Menu ─────────────────────────────────────┐
│ ┌─ Icon strip (visible on hover) ───────────────────┐   │
│ │  [icon]  [icon]  [icon]  [▼ more]                 │   │
│ └────────────────────────────────────────────────────┘   │
│   ↓ Dropdown opens below on ▼ click                      │
│ ┌─ Dropdown ─────────────────────────────────────────┐   │
│ │  [icon] Action 1                                   │   │
│ │  [icon] Action 2                                   │   │
│ │  ─── divider ───                                   │   │
│ │  [icon] Destructive action                         │   │
│ │  [CTA] Customize  (if customiseCta=true)           │   │
│ └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

**Specs:**

| Property | Value |
|---|---|
| Icon strip gap | `4px` |
| Icon size | `14px` each |
| Icon button size | `24px × 24px` |
| Icon button border-radius | `4px` |
| Icon hover background | `var(--color-neutral-gray-100)` |
| Dropdown width | inherits Dropdown Menu shell — typically `180–220px` |
| Dropdown item height (sm) | `32px` |
| Dropdown shadow | `0px 4px 8px -2px rgba(16,24,40,0.10), 0px 2px 4px -2px rgba(16,24,40,0.06)` |

**CSS:**
```css
.quick-action-menu {
  display: flex;
  align-items: center;
  position: relative;
}

.quick-action-menu__icon-strip {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

tr:hover .quick-action-menu__icon-strip,
.list-item:hover .quick-action-menu__icon-strip {
  opacity: 1;
}

.quick-action-menu__icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-neutral-gray-600, #475467);
  transition: background-color 0.15s ease;
}

.quick-action-menu__icon-btn:hover {
  background-color: var(--color-neutral-gray-100, #f2f4f7);
}

.quick-action-menu__dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  z-index: 800;
}
```

**Usage rules:**
- Show the icon strip only on row/card hover (opacity transition from 0 → 1).
- The ▼ chevron at the end of the strip opens the full dropdown menu.
- Use `customiseCta=true` in admin or power-user views where the user can personalize quick actions.
- For the User/Profile menu: replace the icon strip with a user avatar as the trigger. The dropdown structure (actions + divider + destructive) is identical.
- Always add `Tooltip` (Pass 5) to each icon button in the strip — show on icon hover.
- Z-index: `800`.

**Figma node:** `27339:247227` — extracted from symbol `27339:271775`

---

## Notification / Activity Feed Item

**Purpose:** In-app notification card for a notification center or inline feed. Communicates system events, feature updates, or required actions. Distinct from Toast (Pass 5) — this is a richer, longer-lived card, not auto-dismissing.

**Variants:**
- `type`: Primary icon / Error / Warning / Success
- `actions`: bool — action link buttons below description
- `supportingText`: bool — secondary description below title
- `xCloseButton`: bool — dismiss button top-right
- `breakpoint`: Desktop / Mobile

**States:** Unread (default), Read (reduced weight), Dismissed (hidden)

**Anatomy:**
```
┌─ Notification card ──────────────────────────────────────┐
│  ┌─ Featured icon ─┐  Title (semibold)            [✕]   │
│  │   [Icon 20px]   │  Supporting text (regular)          │
│  └─────────────────┘                                      │
│                       [Dismiss btn]  [Primary action btn] │
└──────────────────────────────────────────────────────────┘
```

**Specs:**

| Property | Value |
|---|---|
| Card background | `var(--color-neutral-white-base)` / `#ffffff` |
| Card border | `1px solid var(--color-neutral-gray-100)` / `#f2f4f7` |
| Card border-radius | `12px` |
| Card padding | `16px` |
| Card shadow | `0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)` |
| Content gap (icon ↔ text) | `20px` |
| Featured icon container | `32px × 32px` |
| Featured icon ring | `40px circle`, bg `var(--color-primary-blue-100)`, ring `6px solid var(--color-primary-blue-50)` |
| Featured icon size | `20px` |
| Title font | `14px` semibold `600`, color gray-900 |
| Supporting text font | `14px` regular `400`, color gray-600 |
| Text stack gap | `4px` (title ↔ supporting) |
| Text-to-actions gap | `16px` |
| Actions gap | `12px` |
| Dismiss button | Text-only, `14px` semibold, color gray-600 |
| Primary action button | Text-only, `14px` semibold, color `var(--color-primary-blue-700)` / `#004eeb` |
| Close button | `20px × 20px` icon, positioned top-right of content |

**CSS:**
```css
.notification {
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-100, #f2f4f7);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
              0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  display: flex;
  align-items: flex-start;
  max-width: 456px;
  width: 100%;
}

.notification__content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}

.notification__icon-wrap {
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.notification__icon-bg {
  position: absolute;
  top: -4px;
  left: -5px;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary-blue-100, #d1e0ff);
  border: 6px solid var(--color-primary-blue-50, #eff4ff);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification__icon {
  width: 20px;
  height: 20px;
}

.notification__text {
  flex: 1;
  padding-top: 2px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification__text-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notification__title {
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-neutral-gray-900, #101828);
}

.notification__supporting {
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-regular, 400);
  color: var(--color-neutral-gray-600, #475467);
}

.notification__actions {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.notification__action-btn {
  font-size: var(--font-size-lg, 14px);
  font-weight: var(--font-weight-semibold, 600);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.notification__action-btn--dismiss {
  color: var(--color-neutral-gray-600, #475467);
}

.notification__action-btn--primary {
  color: var(--color-primary-blue-700, #004eeb);
}

.notification__close {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--color-neutral-gray-400, #98a2b3);
}
```

**Usage rules:**
- Use `Notification` for persistent, rich in-app cards. Use `Toast` (Pass 5) for short, auto-dismissing feedback.
- Icon type communicates intent: star = feature update, check = success, alert-triangle = warning, x-circle = error.
- Always provide at least one action button when the notification requires a user response.
- `xCloseButton=true` is default — always allow manual dismissal.
- In a notification panel/feed, stack cards with `8px` gap between them.
- Z-index: `1050`.

**Figma node:** `176:4256` — extracted from symbol `1135:591`

---

## Plan Card / Pricing Card

**Note:** No Plan Card or Pricing Card component exists in HighRise 1.1. No dedicated symbol or page was found.

**Recommended construction:** Build from HighRise tokens using the following pattern:
```css
.plan-card {
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-200, #eaecf0);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.10),
              0px 1px 2px rgba(16, 24, 40, 0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.plan-card--featured {
  border-color: var(--color-primary-blue-600, #155eef);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
}
```
Use `Badge` (Pass 3) for plan tier labels (e.g., "Most popular"), `Button` (Pass 2) for CTA, and `Statistic` tokens for price display.

---

## Color Picker

**Purpose:** Allows users to select, sample, and input colors. Used in builder, editor, and brand settings contexts.

**Sub-components:**

| Sub-component | Purpose | Figma Node |
|---|---|---|
| Color Swatch | Individual clickable color tile | `28470:33389` |
| Color Picker Menu | Dropdown: Swatches or Gradient Picker | `28470:33633` |
| Color Selector | Full 2D gradient or color-wheel canvas | `28470:33665` / `28470:33667` |
| Color Code | Read-only color format display (HEX, RGB, HSL, HSB, CSS) | `28470:33691`+ |
| Color Format | Editable color format input row | `28470:33710`+ |
| Color Input | Single-line hex + picker trigger | `28470:33677` |
| Color Picker Slider | Hue + opacity sliders | `28470:33673` |
| All Colors panel | Default + Brand + Custom palette sections | `28719:65984` |
| Swatch Tile | Large labeled swatch with action icons | `28470:33551` |
| Color Swatch with Label | Named palette group display | `28470:33651` |

**Color Swatch Variants:**
- `Shape`: square / rectangle (`2×` width) / circle
- `Size`: lg `44px`, md `40px`, sm `36px`, xs `32px`, 2xs `28px`, 3xs `24px`
- `State`: Default, Hover, Active, Disabled

**Color Picker Menu Types:**
- `Swatches` — grid of pre-defined colors (`390px` wide)
- `Picker` — gradient picker canvas (`276px` wide)

**Color Selector Types:**
- `Color Gradient` — 2D plane (saturation × brightness), `300 × 300px`
- `Color Wheel` — HSB wheel, `300 × 300px`

**Color Code / Format:** HEX · RGB · HSL · HSB · CSS

**Specs:**

| Property | Value |
|---|---|
| Swatch size lg | `44 × 44px` |
| Swatch size md | `40 × 40px` |
| Swatch size sm | `36 × 36px` |
| Swatch size xs | `32 × 32px` |
| Swatch size 2xs | `28 × 28px` |
| Swatch size 3xs | `24 × 24px` |
| Rectangle width | `2× height` (lg rectangle = `88 × 44px`) |
| Swatch hover ring | `2px offset outline`, `var(--color-primary-blue-600)` |
| Swatch active ring | `2px inset box-shadow`, `var(--color-primary-blue-600)` |
| Swatch disabled opacity | `0.4` |
| Picker Menu bg | `var(--color-neutral-white-base)` |
| Picker Menu border | `1px solid var(--color-neutral-gray-200)` |
| Picker Menu radius | `8px` |
| Picker Menu shadow | `shadow-md` |
| Selector canvas | `300 × 300px` |

**CSS:**
```css
.color-swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  transition: box-shadow 0.15s ease;
}

.color-swatch--circle { border-radius: 50%; }

.color-swatch--lg  { width: 44px;  height: 44px; }
.color-swatch--md  { width: 40px;  height: 40px; }
.color-swatch--sm  { width: 36px;  height: 36px; }
.color-swatch--xs  { width: 32px;  height: 32px; }
.color-swatch--2xs { width: 28px;  height: 28px; }
.color-swatch--3xs { width: 24px;  height: 24px; }

.color-swatch--rectangle.color-swatch--lg  { width: 88px; }
.color-swatch--rectangle.color-swatch--md  { width: 80px; }
.color-swatch--rectangle.color-swatch--sm  { width: 72px; }
.color-swatch--rectangle.color-swatch--xs  { width: 64px; }
.color-swatch--rectangle.color-swatch--2xs { width: 56px; }
.color-swatch--rectangle.color-swatch--3xs { width: 48px; }

.color-swatch:hover {
  box-shadow: 0 0 0 2px var(--color-primary-blue-600, #155eef);
}

.color-swatch--active {
  box-shadow: inset 0 0 0 2px var(--color-primary-blue-600, #155eef);
}

.color-swatch--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.color-picker-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: var(--color-neutral-white-base, #ffffff);
  border: 1px solid var(--color-neutral-gray-200, #eaecf0);
  border-radius: 8px;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10),
              0px 2px 4px -2px rgba(16, 24, 40, 0.06);
}
```

**Usage rules:**
- Use the `Swatches` type for brand/theme color selection — shows Default, Brand, and Custom palette sections.
- Use the `Picker` type when the user needs to choose an arbitrary color (full creative control).
- Always pair the picker with a `Color Input` (HEX/RGB text field) so values can be typed directly.
- The transparency checkerboard behind a swatch indicates a transparent/no-fill selection.
- Custom swatches can be added/edited via the "Edit" button visible on `Swatch Tile` hover.
- Do not use the full Picker in contexts where only brand-palette selection is appropriate — use `Swatches` only.

**Figma node:** `28470:24565` — Swatch: `28470:33388`, Picker Menu: `28470:33633`

---

## Rich Text Editor

**Note:** The "Rich Text Editor" page (`28034:43074`) contains only reference screenshots and image assets. No extractable Figma component symbols exist on this page.

**What is present on the page:**
- Screenshots of existing product editor toolbar UIs (reference material)
- Reference images for icon sets and formatting options
- A `.Icon Tooltips` frame showing `Tooltip` instances positioned over toolbar icons

**What is NOT present:**
- A toolbar component symbol
- A content-editable area component
- Any extractable anatomy, variants, or specs

**Recommendation for implementation:**
Build the toolbar using HighRise primitives:
- `Button` — icon-only, sm, Ghost variant — for each toolbar action
- `Dropdown Menu` (Pass 5) — for format pickers (heading level, text style, etc.)
- `Divider` — vertical — between toolbar groups
- `Tooltip` (Pass 5) — on every icon button

Typical toolbar grouping:
```
[B] [I] [U] [S]  |  [H1 ▼]  |  [• list] [1. list]  |  [🔗] [img] [code]  |  [undo] [redo]
```

---

## PART C — Final Mismatches & Gaps

### Components needed for GHL Revamp — not in HighRise 1.1

| Component | Status | Recommended workaround |
|---|---|---|
| Plan Card / Pricing Card | Not in HighRise 1.1 | Build from card shell + `Badge` + `Button` + price typography tokens |
| Data Card / Content Card | Not in HighRise 1.1 | Build from white container + DS shadow/border tokens |
| Rich Text Editor Toolbar | No component symbols (screenshots only) | Compose from `Button` (icon-only) + `Dropdown Menu` + `Divider` |
| Notification Bell trigger | Not in HighRise 1.1 | Use `Badge` overlaid on icon `Button` (Ghost variant) |
| Activity Feed list item | Not in HighRise 1.1 | Build from `Avatar` + typography tokens + `Tag` |
| User Profile Dropdown (avatar trigger) | No explicit component | Use `Quick Action Menu` dropdown shell with Avatar as trigger |
| Empty state for Command Bar | Not present | Use `Empty State` (Pass 3) with muted body text |

### Tokens referenced in Pass 6 CSS blocks — not defined in Pass 1

All tokens used in Part B CSS are covered by Passes 1–3. **No orphaned tokens found.** Notes on specific references:

| Token | Used in | Status |
|---|---|---|
| `--tag-primary-background-default` | Scope Picker header tag | Defined in Pass 3 (Badge/Tag) |
| `--tag-primary-label-color-default` | Scope Picker header tag | Defined in Pass 3 |
| `--blur-4` | Command Bar overlay | Defined in Pass 1 — `blur/4 = 8px` |
| `--font-size-2xl` | Command Bar placeholder | Defined in Pass 1 — `16px` |

### Spacing values outside the 4px grid

| Component | Value | Action |
|---|---|---|
| Scope Picker avatar initials padding | `3px` vertical | Accept — intentional vertical centering trick for text in a circle |
| Command Bar section header padding | `18px` inline | Normalize to `16px` or `20px` in implementation |
| Notification outer layout padding | `80px` | Ignore — this is a Figma presentation frame wrapper, not component padding |
| Notification icon ring border | `6px` | Accept — intentional visual ring effect, as designed |

---

✓ Pass 6 complete — HIGHRISE_DS.md extraction finished