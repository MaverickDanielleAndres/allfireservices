# All Fire Services — Complete Branding, Design & Layout Source of Truth

> **Version:** 2.0  
> **Last full codebase review:** 8 August 2026  
> **Applies to:** every public, internal, dynamic, placeholder, campaign, archive, and future page in this repository

This document is the **single source of truth** for the visual design, page structure, typography, colors, gradients, buttons, forms, spacing, imagery, motion, accessibility, content style, and responsive behavior of the All Fire Services website.

## How to use this document

When asked to **“apply `BRANDING_AND_LAYOUT_PRINCIPLES.md`”** to a page:

1. Start with the **canonical global rules** in Sections 2–14.
2. Select the closest **page blueprint** from Section 15.
3. Use the **shared component blueprints** in Section 16.
4. Apply the responsive matrix and QA checklist in Sections 17 and 21.
5. Copy content, images, and page-specific details only after the layout system is correct.
6. Do **not** copy anything marked **AS BUILT**, **EXCEPTION**, or **DO NOT COPY** unless the request explicitly requires that exact legacy behavior.

### Status labels used throughout

| Label | Meaning |
|---|---|
| **CANONICAL** | The approved design rule. New work MUST follow it. |
| **AS BUILT** | What currently exists in the codebase. It may not be the preferred rule. |
| **EXCEPTION** | An intentional page-specific variation. Do not spread it to unrelated pages. |
| **DO NOT COPY** | A known inconsistency, placeholder, accessibility issue, or technical debt. |

### Rule precedence

If rules conflict, use this order:

1. A direct instruction from the user for the current task.
2. **CANONICAL** rules in this document.
3. The closest approved page blueprint in Section 15.
4. Existing code only when it is not marked **AS BUILT**, **EXCEPTION**, or **DO NOT COPY**.

---

# Table of Contents

1. [Brand Philosophy](#1-brand-philosophy)
2. [Global Application Shell](#2-global-application-shell)
3. [Color System](#3-color-system)
4. [Typography System](#4-typography-system)
5. [Two-Line Heading System](#5-two-line-heading-system)
6. [Containers, Spacing & Page Rhythm](#6-containers-spacing--page-rhythm)
7. [Corners, Borders & Shadows](#7-corners-borders--shadows)
8. [Button System](#8-button-system)
9. [Form System](#9-form-system)
10. [Header & Navigation](#10-header--navigation)
11. [Footer System](#11-footer-system)
12. [Hero Systems](#12-hero-systems)
13. [Imagery, Video & Iconography](#13-imagery-video--iconography)
14. [Motion & Interaction](#14-motion--interaction)
15. [Page-by-Page Blueprints](#15-page-by-page-blueprints)
16. [Shared Section & Component Blueprints](#16-shared-section--component-blueprints)
17. [Responsive System](#17-responsive-system)
18. [Accessibility Requirements](#18-accessibility-requirements)
19. [Content, Wording & Factual Rules](#19-content-wording--factual-rules)
20. [Deviations & Do-Not-Copy Register](#20-deviations--do-not-copy-register)
21. [Copy-and-Apply Templates & QA](#21-copy-and-apply-templates--qa)
22. [Conclusion](#22-conclusion)

---

# 1. Brand Philosophy

All Fire Services should feel:

- **Professional:** a serious fire-protection company, not a lifestyle brand.
- **Experienced:** grounded in technical knowledge and real work.
- **Practical:** direct information, clear actions, no unnecessary complexity.
- **Reliable:** ordered layouts, consistent spacing, readable content, obvious CTAs.
- **Modern:** restrained gradients, clean cards, fluid type, subtle motion.
- **Australian:** Greater Sydney context, local imagery, Australian business English.
- **Human:** real people, real buildings, real history, and natural wording.

## 1.1 Core design directives

1. **Sell first. Explain second.** The first screen must identify the page and its value.
2. **One clear job per page.** Do not explain the entire business on every route.
3. **Use one visual system.** Inter, the approved palette, the signature gradient, and the approved spacing scale are mandatory.
4. **Use the two-line section-heading system.** Every major H2 needs a setup line and a payoff line.
5. **Make the mobile design intentional.** Mobile is not a compressed desktop page.
6. **Keep sections distinct.** Alternate composition, imagery, or surface treatment rather than repeating identical blocks.
7. **Use motion to support hierarchy.** Never animate simply because animation is available.
8. **Keep facts accurate.** 1911 and 2009 must never be conflated.

## 1.2 Brand message

> All Fire Services provides practical, reliable fire protection across Greater Sydney, backed by professional technical knowledge, experienced people, and a family firefighting legacy dating to 1911.

Use this as the underlying idea, not as boilerplate to paste on every page.

---

# 2. Global Application Shell

## 2.1 Root composition — CANONICAL

Every normal route is rendered through `app/layout.tsx` in this order:

```text
<html lang="en-AU" class="Inter antialiased">
└── <body class="min-h-screen flex flex-col bg-white">
    ├── LocalBusiness + WebSite JSON-LD
    ├── SmoothScrolling
    │   └── FooterReveal
    │       ├── Navbar
    │       ├── Route content
    │       └── Footer supplied as reveal content
    ├── ChatbotDeferred
    └── SpeedInsights
```

### Global implementation references

- `app/layout.tsx` — metadata, Inter, structured data, global shell.
- `components/SmoothScrolling.tsx` — Lenis smooth scrolling and route reset.
- `components/FooterReveal.tsx` — fixed desktop footer reveal and static mobile fallback.
- `components/Navbar.tsx` — fixed header and mobile navigation.
- `components/Footer.tsx` — global footer.
- `components/ChatbotDeferred.tsx` — deferred floating chatbot.

## 2.2 Font loading

- Primary font: **Inter** from `next/font/google`.
- Variable: `--font-sans`.
- Fallbacks: `system-ui`, `Helvetica`, `Arial`, `sans-serif`.
- `display: swap` and font preload remain enabled.
- The body and all components MUST inherit Inter unless an explicit brand exception is approved.

> **DO NOT COPY:** the legacy `body { font-family: Arial }` declaration in `app/allfireservices.css`. Inter is canonical.

## 2.3 Page root rules

Every page root MUST:

- use a white default surface unless the blueprint specifies a dark section;
- prevent accidental horizontal page scrolling;
- preserve the global Navbar and Footer;
- use one H1 only;
- place the page’s principal content inside `<main>` where practical;
- leave enough top clearance for the fixed Navbar;
- end with a clear next action before the Footer.

## 2.4 Metadata and structural conventions

- Language: `en-AU`.
- Default locality wording: **Greater Sydney**.
- Page titles use the root `%s | All Fire Services Australia` template.
- Normal pages use `createPageMetadata` from `lib/seo.ts` where available.
- Internal, duplicate, confirmation, archive, or utility pages may be `noIndex`.
- Structured data remains centralized in `app/layout.tsx`.

---

# 3. Color System

## 3.1 Canonical brand palette

Do not introduce new permanent brand colors without explicit approval.

| Token | Value | Canonical use |
|---|---:|---|
| `--bg-dark` | `#111111` | Dark sections, dark buttons, primary text |
| `--bg-light` | `#ffffff` | Main page and content surfaces |
| `--bg-light-alt` | `#F9FAFB` | FAQ, quiet alternating surfaces |
| `--text-primary` | `#111111` | Text on light backgrounds |
| `--text-secondary` | `#444444` | Supporting body text and metadata |
| `--text-on-dark` | `#ffffff` | Headings and controls on dark backgrounds |
| `--text-on-dark-soft` | `rgba(255,255,255,0.9)` | Body text on dark backgrounds |
| `--brand-orange` | `#fb5614` | Primary CTA, links, active navigation |
| `--brand-red` | `#fc0403` | CTA hover, urgent emphasis |
| `--brand-red-pure` | `#ff0000` | Single red highlight word in headings |
| `--brand-gradient-start` | `#ff2a00` | Signature gradient start |
| `--brand-yellow` | `#FEAF04` | Eyebrows on dark surfaces, warm accent |
| `--brand-gradient-end` | `#ffb700` | Signature gradient end |
| `--border-light` | `rgba(0,0,0,0.08)` | Quiet light-surface borders |
| `--border-dark` | `rgba(255,255,255,0.18)` | Dark-surface borders |

## 3.2 Signature gradient — MANDATORY

```css
background: linear-gradient(to right, #ff2a00, #ffb700);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

Use this exact gradient for:

- the second line of page-hero titles when the hero blueprint calls for it;
- the second line of major section headings;
- selected key terms in large headings;
- decorative emphasis where the text remains readable without color.

Do not use the gradient for:

- ordinary paragraphs;
- small form labels;
- every card title;
- large background fills unless using the approved CTA-card formula.

### Required fallback

The parent heading must have a visible text color such as `#111111` or `#ffffff`. This prevents invisible text if background clipping fails.

## 3.3 Red highlight word

Use `#ff0000` for **one short word or phrase**, normally on line one of a two-line heading.

Good:

```tsx
Australian <span style={{ color: "#ff0000" }}>Owned</span><br />
```

Do not color multiple unrelated words red in the same heading.

## 3.4 Background usage

- Default content sections: `#ffffff`.
- Secondary quiet sections: `#F9FAFB`.
- Dark CTA/hero sections: `#111111` or image + dark overlay.
- Brand gradient cards: approved radial + linear formula only.
- Do not alternate white and grey mechanically; use grey only when it improves section separation.

## 3.5 Tailwind/OKLCH implementation layer — AS BUILT

`app/globals.css` contains shadcn/Tailwind OKLCH tokens for `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, borders, charts, and sidebar colors.

These are infrastructure tokens, not a replacement for the brand palette above. When creating branded public-facing sections, use the canonical brand colors. If a future refactor migrates the brand palette into Tailwind tokens, preserve the visual values in Section 3.1.

## 3.6 Disallowed accidental palette drift

Do not treat isolated legacy values such as `#ff5722`, `#e2231a`, `#d92820`, `#c00`, `#f3f5f7`, `#fffdf9`, `#eaded6`, or `#ff4d16` as new global tokens. They are existing implementation details and must be normalized to the canonical palette when a component is redesigned.

---

# 4. Typography System

## 4.1 Font family

```css
font-family: var(--font-sans), Inter, system-ui, Helvetica, Arial, sans-serif;
```

No separate display font is required. Hierarchy comes from size, weight, line height, letter spacing, case, and color.

## 4.2 Canonical type scale

| Role | Fluid size | Weight | Line height | Tracking | Case |
|---|---|---:|---:|---:|---|
| Page hero H1 | `clamp(2rem, 5vw, 5.5rem)` | 900 | 1.05–1.1 | `-0.04em` to `-0.06em` | Uppercase on image heroes |
| Oversized Home H1 | blueprint-specific | 850–900 | 0.94–1.02 | `-0.05em` | Uppercase |
| Major section H2 | `clamp(2.5rem, 4.8vw, 5.2rem)` | 800 | 0.94 | `-0.06em` | Sentence/title case |
| Compact section H2 | `clamp(2.5rem, 4.2vw, 4rem)` | 800 | 0.94 | `-0.04em` | Sentence/title case |
| Legacy header H2 | `clamp(2.8rem, 5.8vw, 6rem)` | 780–800 | 0.92 | `-0.06em` | Sentence/title case |
| Card H3 | `clamp(1.25rem, 2vw, 1.75rem)` | 700–800 | 1.1–1.2 | `-0.02em` | Sentence/title case |
| Intro/body large | `clamp(1.05rem, 1.6vw, 1.3rem)` | 400–500 | 1.55 | normal | Sentence case |
| Body standard | `clamp(1rem, 1.3vw, 1.15rem)` | 400–500 | 1.55–1.65 | normal | Sentence case |
| Eyebrow/kicker | `0.78rem`–`0.875rem` | 700–800 | 1.2 | `0.1em`–`0.12em` | Uppercase |
| UI/button text | `0.875rem`–`1rem` | 600–700 | 1 | normal | Natural title case |
| Metadata | `0.75rem`–`0.875rem` | 500–700 | 1.35 | optional `0.04em` | Natural/uppercase |

## 4.3 Hero H1

```tsx
const heroH1Style = {
  fontSize: "clamp(2rem, 5vw, 5.5rem)",
  color: "#ffffff",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "-0.05em",
  lineHeight: 1.05,
  margin: 0,
} as const;
```

- The H1 must identify the page immediately.
- On approved image heroes, line one is white and line two uses the signature gradient.
- Hero H1 text may use a blueprint-specific line count only where Section 12 or 15 explicitly permits it.

## 4.4 Eyebrow / kicker

```tsx
const eyebrowStyle = {
  color: "#FEAF04",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontSize: "0.8rem",
  lineHeight: 1.2,
  marginBottom: "0.9rem",
} as const;
```

Rules:

- 1–4 words where possible.
- Adds context; it must not merely repeat the heading.
- Yellow is preferred on dark imagery.
- On white, use `#fb5614` when `#FEAF04` does not meet contrast.

## 4.5 Body text

- Keep paragraphs to 2–4 sentences.
- Standard maximum line length: `60ch`–`68ch`.
- Use `#111111` or `#444444` on white.
- Use `rgba(255,255,255,0.9)` on dark surfaces.
- Do not center long body copy on desktop.
- Centering is allowed on mobile intros and compact CTA copy.

## 4.6 Bold and emphasis

- Use `<strong>` sparingly.
- Bold the key responsibility, result, or assurance—not every service term.
- Never use all-caps for paragraphs.

---

# 5. Two-Line Heading System

## 5.1 Scope

The exactly-two-line rule is **MANDATORY for major section H2 headings**. Page H1s follow their hero blueprint and may be an explicit exception.

A canonical section heading contains:

- **Line 1:** setup or subject, dark on light / white on dark.
- **Line 2:** payoff or key term, signature gradient.
- An explicit `<br />` between lines.

```tsx
<h2 style={{ ...sectionH2Style, maxWidth: "24ch" }}>
  Practical fire protection<br />
  <span style={gradientStyle}>Across Greater Sydney</span>
</h2>
```

## 5.2 Variants

### Variant A — plain first line + gradient second line

Use for most headings.

```tsx
Trusted across<br />
<span style={gradientStyle}>Greater Sydney</span>
```

### Variant B — red word on line one + gradient line two

Use when one word deserves specific emphasis.

```tsx
Australian <span style={{ color: "#ff0000" }}>Owned</span><br />
<span style={gradientStyle}>Since 2009</span>
```

### Variant C — entire heading gradient

Use sparingly for story/legacy statements where the whole phrase is the visual emphasis.

```tsx
<span style={gradientStyle}>
  Built on<br />
  Real Experience
</span>
```

## 5.3 Long first-line treatment

If line one would wrap, make line one smaller. Do not allow the heading to become three visual lines.

```tsx
const lineOneStyle = {
  fontSize: "clamp(1.8rem, 3.4vw, 3.4rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 1.05,
} as const;

const lineTwoStyle = {
  ...gradientStyle,
  fontSize: "clamp(2.5rem, 4.8vw, 5.2rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 0.94,
} as const;
```

```tsx
<h2 className="mx-auto text-center md:mx-0 md:text-left" style={{ maxWidth: "24ch" }}>
  <span style={lineOneStyle}>Fire Protection for Every</span><br />
  <span style={lineTwoStyle}>Property Type</span>
</h2>
```

## 5.4 Heading safety rules

- Do not rely on incidental CSS wrapping to create the second line.
- Do not use `overflow-wrap:anywhere` on gradient heading spans.
- Do not use `white-space: nowrap` unless the phrase fits at 320px.
- If it does not fit, shorten the copy or reduce line-one size.
- Use `text-wrap: balance` only as support—not as a substitute for `<br />`.
- Validate at 320, 375, 768, 1024, and 1440px.

## 5.5 Heading checklist

- [ ] One H1 per page.
- [ ] Major section H2 has exactly two visual lines.
- [ ] Explicit `<br />` controls the break.
- [ ] Gradient line is never split.
- [ ] First line does not create a third line.
- [ ] Heading remains readable without the gradient effect.

---

# 6. Containers, Spacing & Page Rhythm

## 6.1 Canonical containers

| Container | Maximum width | Use |
|---|---:|---|
| Standard content | `1200px`–`1280px` | Most text/image sections |
| Large content | `1400px`–`1440px` | Navbar, footer, galleries, wide grids |
| Reading column | `68ch`–`76ch` | Articles and long copy |
| CTA card | `71rem` | Sitewide/pre-FAQ CTA |

Preferred wrapper:

```tsx
<div className="padding-global">
  <div className="container-large">...</div>
</div>
```

Canonical side padding:

```css
padding-inline: clamp(1rem, 4vw, 4rem);
```

At 320–479px, the normal safe side padding is `1rem`–`1.25rem`.

## 6.2 Section padding

```css
padding-block: clamp(3.5rem, 7vw, 7rem);
```

Use:

- `clamp(2.5rem, 5vw, 5rem)` for compact/related sections;
- `clamp(3.5rem, 7vw, 7rem)` for standard major sections;
- `clamp(4rem, 8vw, 8rem)` for premium story/legacy sections.

## 6.3 Vertical rhythm

| Relationship | Gap |
|---|---:|
| Eyebrow to heading | `0.75rem`–`1rem` |
| Heading to intro/body | `1.25rem`–`2rem` |
| Paragraph to CTA | `1.5rem`–`2rem` |
| Card-grid rows | `1rem`–`2rem` |
| Closely related subsections | `clamp(3rem, 5vw, 6rem)` |
| Alternating story rows | `clamp(5rem, 10vw, 10rem)` |
| Major editorial blocks | up to `clamp(6rem, 12vw, 14rem)` |

Avoid fixed `10rem` or `14rem` margins on mobile. Always use a fluid value or breakpoint override.

## 6.4 Standard two-column grid

```css
display: grid;
grid-template-columns: minmax(0, 1fr) minmax(0, 0.72fr);
gap: clamp(3rem, 8vw, 8rem);
align-items: center;
```

For the narrower About alternating pattern, a `1fr / 0.62fr` ratio is permitted. The exact ratio must remain consistent within one page.

At `max-width: 991px`:

```css
grid-template-columns: 1fr;
gap: clamp(2.5rem, 7vw, 4rem);
```

## 6.5 Section sequencing

A normal public page should read:

```text
Navbar
→ Hero
→ Intro / problem
→ Primary service or proof section
→ Supporting sections / process / properties / examples
→ Trust / clients / testimonials where relevant
→ Sitewide CTA or ContactCTA
→ Footer
```

Do not insert testimonials, history, or generic CTAs before the page explains its main job.

---

# 7. Corners, Borders & Shadows

## 7.1 Canonical radii

| Element | Radius |
|---|---:|
| Standard image | `1.5rem` |
| Standard card | `1rem`–`1.5rem` |
| Premium/floating card | `1.5rem` |
| Form field | `0.5rem` |
| Rectangular button | `0.5rem`–`0.55rem` |
| Pill button/chip | `999px` |
| Circular icon control | `50%` |

Use one radius family inside a component. Do not mix sharp corners, `8px`, `16px`, and `24px` without a clear hierarchy.

## 7.2 Borders

- Light surface: `1px solid rgba(0,0,0,0.08)`.
- Dark surface: `1px solid rgba(255,255,255,0.18)`.
- Form input: `1px solid #d1d5db`; focus changes to brand orange or dark text color.
- Avoid heavy borders and shadows on the same element.

## 7.3 Shadows

### Floating card

```css
box-shadow:
  0 25px 50px -12px rgba(0, 0, 0, 0.15),
  0 0 20px rgba(0, 0, 0, 0.03);
```

### Quiet card

```css
box-shadow: 0 12px 32px rgba(17, 17, 17, 0.08);
```

### CTA card

```css
box-shadow: 0 2rem 4.5rem rgba(17, 17, 17, 0.16);
```

### Hover lift

```css
transform: translateY(-2px);
```

Use a 200–300ms transition and a subtle shadow change. Do not make content jump more than 4px.

---

# 8. Button System

## 8.1 Canonical primary button

Primary CTAs use:

- background `#FB5614`;
- hover background `#FC0403`;
- active background `#666666`;
- white text;
- `0.5rem` radius;
- `min-height: 44px`;
- `padding: 1em 1.25em`;
- label + up-right arrow;
- 300ms transition.

### Canonical structure

```tsx
<div className="button-group">
  <Link href="/contact" className="button-wrap">
    <div className="button-content">
      <div className="button-layout">
        <span className="button-text">Get a Quote</span>
        <span className="button-icon" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </div>
  </Link>
</div>
```

Use semantic `<Link>`, `<a>`, or `<button>` according to the action. Do not use clickable `<div>` elements.

## 8.2 Button variants

| Variant | Background | Border | Text | Use |
|---|---|---|---|---|
| Primary brand | `#FB5614` | matching orange | white | Main conversion action |
| Primary hover | `#FC0403` | matching red | white | Hover/focus-visible support |
| Dark | `#111111` | `#111111` | white | Light CTA cards |
| Light outline | transparent/white | `rgba(17,17,17,.2)` | `#111111` | Secondary action on light |
| Dark outline | transparent | `rgba(255,255,255,.35)` | white | Secondary action on dark/image |
| Pill primary | `#FB5614` | orange | white | Home hero or compact action group only |
| Phone pill | white/transparent | context border | context text | Call action paired with primary CTA |
| Icon-only | context surface | context border | context text | Carousel/lightbox controls |

## 8.3 Button placement

- One primary action per button group.
- Secondary action follows the primary.
- On desktop, CTAs may sit in one row.
- On mobile, stack full-width when two labels cannot fit comfortably.
- Center button groups only in centered sections.
- Left-align buttons with left-aligned desktop copy.

## 8.4 Focus state

Preferred brand focus ring:

```css
box-shadow: 0 0 0 2px #fff, 0 0 0 4px #FB5614;
outline: none;
```

On non-white backgrounds, use an equivalent high-contrast ring.

## 8.5 Button text

Preferred:

- Get a Quote
- Contact Our Team
- Talk to Our Team
- Call 1300 765 594
- View All Services
- Request an Inspection
- Learn More
- View Service
- Send Enquiry

Avoid vague labels such as “Discover Excellence” or “Begin Your Journey”.

## 8.6 Do not copy

- Controls smaller than 44×44px.
- `href="#"` for a production action.
- Sharp-corner footer CTA styling as a new standard.
- Unapproved red/orange gradients on ordinary buttons.
- `white-space: nowrap` when the label can overflow at 320px.

---

# 9. Form System

## 9.1 Canonical form composition

```text
Form heading / context
→ Optional supporting copy
→ Field rows
→ Required/optional explanation
→ Consent or terms where required
→ Submit button
→ Success message or error message
```

## 9.2 Form layout

```tsx
<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
  <Field name="name" />
  <Field name="phone" />
</div>
```

- Mobile: one column.
- Tablet/desktop: two columns for short related fields.
- Email, address, message, and long selectors may span both columns.
- Do not force narrow textareas into half-width columns.

## 9.3 Labels and inputs

| Property | Canonical value |
|---|---|
| Label size | `0.875rem`–`1rem` |
| Label weight | 600 |
| Label color | `#111111` |
| Label gap | `0.5rem` |
| Input minimum height | `44px`, preferably `3rem`–`3.75rem` |
| Input padding | `0.75rem 0.875rem` |
| Input border | `1px solid #d1d5db` |
| Input radius | `0.5rem` |
| Input background | `#ffffff` |
| Text color | `#111111` |
| Placeholder | subdued grey with sufficient contrast |
| Textarea minimum height | `8rem` |

## 9.4 Focus, validation, and messages

- Use a visible orange or dark focus border plus focus ring.
- Do not communicate error state with color alone.
- Put an error message next to or below the affected field.
- Success and error summary blocks must be programmatically announced where possible.
- Preserve the user’s entered values after a recoverable error.
- Submit controls must use the button system in Section 8.

## 9.5 ContactCTA pattern

`components/ContactCTA.tsx` is the primary current form reference:

- left column: eyebrow, two-line heading, support copy/social links;
- right column: Name, Phone, Email, Suburb, Message, submit;
- optional `hideSitewideCTA` prevents the nested sitewide CTA;
- mobile: columns stack and text centers where appropriate;
- submit label: **Send enquiry**.

> **AS BUILT:** the current form retains Webflow class names and a simple submit input. New work should preserve its visual layout but use semantic validation and the canonical button/focus treatment.

## 9.6 Talk-to-Peter form

The `/talk-to-peter` page includes Name, Property Address, Email, Phone, Property Type, Existing AFSS Due Date, Message, and Turnstile-related attributes. When redesigning it, use the same field and spacing system as ContactCTA rather than maintaining a separate visual form language.

---

# 10. Header & Navigation

## 10.1 Global structure

The live Navbar contains:

1. dark utility top bar;
2. phone/email on the left;
3. social links on the right;
4. white main navigation row;
5. logo;
6. top-level navigation;
7. services dropdown;
8. Get a Quote CTA;
9. mobile menu toggle and mobile panel.

## 10.2 Navigation source of truth

Use `lib/navigation.ts`:

### Top-level order

1. Home
2. Our Story
3. Our Clients
4. Services
5. Strata
6. Contact

### Services dropdown

Use the exported `serviceLinks` list. Do not create another hardcoded list in a component.

## 10.3 Desktop dimensions

| Element | Canonical behavior |
|---|---|
| Shell | fixed, full-width, `z-index: 1001` |
| Top bar | dark `#191919`, compact height, white/soft-white text |
| Main row | white, subtle bottom border |
| Inner max width | `1440px` |
| Main row height | approximately `5.5rem` |
| Desktop side padding | `clamp(1.5rem, 4vw, 4rem)` |
| Logo height | approximately `2.75rem` |
| Nav gap | fluid, up to `2.5rem` |
| Link weight | 600 |
| Active/hover color | `#fb5614` |

## 10.4 Scrolled state

At approximately 10px of vertical scroll:

- collapse and fade the utility top bar;
- keep the main navigation fixed;
- preserve the white background and border;
- avoid layout jump in page content.

## 10.5 Services dropdown

- White surface, `0.5rem` radius, subtle shadow and border.
- Maximum width approximately `34rem`.
- Three-column item grid on desktop.
- An invisible hover bridge may connect the trigger to the dropdown.
- “All Services” is visually separated at the top.
- Active service reflects the current path/query category.
- Do not let the dropdown escape the viewport.

## 10.6 Mobile navigation

At `max-width: 1023px`:

- desktop nav is replaced by the mobile panel;
- menu toggle is at least 44×44px;
- body scrolling is locked while the panel is open;
- the chatbot is hidden while `.mobile-menu-open` is present;
- service links remain readable and tappable;
- top bar may remain on tablet but is hidden by the small-mobile breakpoint;
- closing a link closes the panel;
- Escape-key close is recommended.

At `max-width: 767px`:

- hide the top utility bar;
- reduce main-row height and side padding;
- keep logo and toggle aligned without clipping.

## 10.7 Header accessibility

- Navbar uses a navigation landmark.
- Menu button has an accessible label and state (`aria-expanded`).
- Dropdown trigger must work by keyboard, not hover alone.
- Active page uses `aria-current="page"` where appropriate.
- Social icon links require meaningful labels and real URLs.

---

# 11. Footer System

## 11.1 Desktop footer reveal

`FooterReveal` creates a reveal effect on desktop:

- Footer is fixed at the bottom.
- Main content receives bottom spacing equal to the footer height.
- Scrolling reveals the footer rather than placing it immediately after content.

At mobile widths, the footer becomes static in document flow. This is mandatory for predictable reading and keyboard order.

## 11.2 Footer anatomy

```text
Footer top border
→ Brand promise + CTA pair
→ Email, address, hours, after-hours number
→ Social icons
→ Services navigation
→ Company navigation
→ Optional oversized ALLFIRE SERVICES wordmark
→ Copyright + legal links
```

## 11.3 Canonical layout

- White background.
- Text `#111111` / `#121212`.
- Maximum width `1440px`.
- Desktop grid: wide brand/contact column + navigation column.
- Navigation column: Services area + Company area.
- Mobile: single/compact two-column structure without horizontal overflow.
- Use canonical orange `#fb5614` rather than introducing a footer-only permanent orange.

## 11.4 Footer heading

Current brand promise:

```text
Protecting people,
protecting property.
```

Style:

- `clamp(1.75rem, 4.4vw, 2.85rem)`;
- weight approximately 780;
- line height `0.95`;
- tracking `-0.06em`.

## 11.5 Footer CTAs

Canonical footer actions:

1. **Get in touch** — primary orange.
2. **Call 1300 765 594** — outline secondary.

Use the same button radius and touch-target rules as Section 8. Sharp corners in the current footer are **AS BUILT**, not the new standard.

## 11.6 Footer links

- Services links MUST come from `lib/navigation.ts`.
- Company links use `navLinks`.
- Privacy policy and Terms and conditions must be real links when routes exist.
- Social icons must use real URLs or be omitted.
- Email remains `mailto:admin@allfireservices.com.au`.
- Phone numbers use `tel:` links.

## 11.7 Optional wordmark

The oversized `ALLFIRE SERVICES` wordmark and left/right entrance animation are currently hidden.

- Treat it as optional decoration.
- Do not enable it without checking footer height, mobile overflow, and reduced-motion behavior.
- If enabled, keep it decorative for screen readers and disable animation under `prefers-reduced-motion`.

---

# 12. Hero Systems

## 12.1 Shared hero requirements

Every public hero must contain:

1. page context/eyebrow;
2. one H1;
3. concise supporting copy where needed;
4. one primary action and optional secondary action;
5. enough overlay contrast for text;
6. a clean transition into the next white/light section.

Images/videos fill the hero with `object-fit: cover`. Decorative overlays sit above the media and below content.

## 12.2 Hero A — Home image/analytics hero

**Used by:** `/` only.

### Composition

- full-width background image;
- dark base overlay;
- red/dark directional tint;
- white bottom fade into the page;
- left: kicker, oversized statement, body, two CTAs;
- right: three analytics/proof items;
- mobile: proof items move below or into a compact grid.

### Current content order

```text
Kicker
→ Large responsibility statement
→ Supporting paragraph
→ Get a Quote + Explore Our Services
→ Legacy / established / emergency-response proof
```

### Canonical behavior

- Maintain high contrast.
- Keep the H1 controlled at every width; no word may clip.
- Allow a page-specific multi-line H1 because this is an explicit Home exception.
- Do not use `white-space: nowrap` for long mobile lines.
- Analytics numbers must describe facts clearly; do not animate a year backwards.
- CTAs stack at small widths.

## 12.3 Hero B — About-style cinematic image hero

**Used by:** `/about`, `/contact`, `/strata`, `/our-clients`; suitable for future primary marketing pages.

### Layer order

```text
Background Next/Image
→ vertical dark overlay
→ directional red/dark tint (multiply)
→ white fade overlay at bottom
→ hero content
```

### Canonical overlays

```css
.about-dark-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(10,10,10,0.88) 0%,
    rgba(20,5,5,0.82) 30%,
    rgba(30,5,5,0.72) 50%,
    rgba(40,8,8,0.45) 68%,
    rgba(50,8,8,0.18) 80%,
    rgba(255,255,255,0) 92%
  );
}

.about-fade-overlay {
  position: absolute;
  inset: auto 0 0;
  height: 55%;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.13) 32%,
    rgba(255,255,255,0.49) 57%,
    rgba(255,255,255,0.78) 73%,
    rgba(255,255,255,0.96) 89%,
    #ffffff 100%
  );
}
```

### Desktop content

- Eyebrow above title or supporting column.
- H1 uses two explicit lines.
- Line one white; line two gradient.
- Supporting copy may occupy a second desktop column.
- Text aligns left on desktop, centered on mobile.

### Mobile content

- Do not preserve huge fixed `padding-bottom: 32rem` blindly.
- Use a fluid hero minimum height based on the image composition.
- Fade height approximately `180px`–`240px`.
- Reposition background media to keep the subject visible.
- Keep both title lines inside the viewport.

## 12.4 Hero C — Simple dark image hero

**Used by:** `/services`, `/services/[slug]`, `/annual-fire-safety-statement`, `/fpa-australia-member`, `/13-feb-2026-nsw-fire-safety-regulations`.

### Composition

- image fills the header;
- dark overlay approximately `rgba(0,0,0,0.72)`–`rgba(0,0,0,0.82)`;
- eyebrow/breadcrumb;
- white H1;
- optional short body copy;
- no complex white fade required unless transitioning over an image edge.

### Canonical new-page treatment

Use a two-line H1 when natural:

```text
SERVICE NAME
Gradient qualifier or location
```

A short one-line acronym such as **AFSS** may remain one line if the full service name is visible immediately below. This is an explicit semantic exception, not permission for vague one-line heroes.

## 12.5 Hero D — Light campaign/video hero

**Used by:** `/campaign`, `/uncategorized-archive`, legacy `/home`, `/homepage-2025` patterns.

- Light or mixed surface.
- Large statement and body copy.
- Parallax or autoplay media card.
- A clear Watch Video or contact action.
- Treat as campaign/editorial; do not copy to ordinary service pages.
- Respect reduced motion and do not autoplay audio.

## 12.6 Hero E — Contact/utility header

**Used by:** `/talk-to-peter`, `/confirmation`, `/qr-database-2`, `/find-a-fitter`.

- Compact, task-oriented.
- H1 states the user’s task.
- Intro explains the next action.
- Form/search/status content follows immediately.
- Avoid oversized visual padding that delays the task.

## 12.7 Hero media rules

- Use `next/image` for static media.
- Use `fill` with an explicitly positioned container.
- Hero `sizes="100vw"`.
- Mark the true LCP hero image `priority` and `fetchPriority="high"`.
- Use quality around 60–75 unless image detail requires more.
- Avoid embedded asset filenames with spaces or punctuation in future assets.

---

# 13. Imagery, Video & Iconography

## 13.1 Image subject rules

Use:

- real All Fire Services technicians and team members;
- real Greater Sydney buildings and properties;
- relevant fire panels, hydrants, extinguishers, doors, pumps, detection systems;
- original family-history photographs on the Our Story page;
- professional Australian fire-protection settings.

Avoid:

- US fire engines, uniforms, hydrants, or signage;
- unrelated stock offices or anonymous corporate handshakes;
- generic AI firefighters;
- imagery that suggests Peter Tricklebank is a firefighter;
- random portraits presented as real customers.

## 13.2 Standard image treatment

```tsx
<div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] md:min-h-[320px]">
  <Image
    src="/image.webp"
    alt="Clear description"
    fill
    sizes="(max-width: 991px) 100vw, 50vw"
    style={{ objectFit: "cover" }}
  />
</div>
```

- Use meaningful alt text for informative images.
- Use empty alt text for purely decorative images.
- Do not repeat the adjacent heading verbatim as alt text.
- Gallery/lightbox images should maintain a predictable aspect ratio.

## 13.3 Logo treatment

- Preserve aspect ratio with `object-fit: contain`.
- Use consistent visual height rather than identical raw width.
- Monochrome client-logo grids may use grayscale/brightness filters.
- Logos with built-in backgrounds may use grayscale + `mix-blend-mode: multiply` only after contrast testing.
- External logos must be stable, permitted, and configured for image loading.

## 13.4 Video

### Autoplay background/ambient video

Must include:

```tsx
<video autoPlay loop muted playsInline preload="none" poster="/fallback.webp">
```

- Never autoplay sound.
- Provide a useful poster.
- Keep text outside or safely overlaid with contrast.
- Do not load many videos simultaneously.

### YouTube/video gallery

- Load only the active/visible iframe when possible.
- Provide a descriptive title.
- Pause inactive videos.
- Respect keyboard controls.
- Do not use video as the sole source of important information.

## 13.5 Icons

Preferred icon sources:

- `lucide-react` for interface icons;
- the approved up-right arrow SVG for brand buttons;
- existing brand/social SVGs where licensed and accurate.

Rules:

- Decorative icons: `aria-hidden="true"`.
- Icon-only controls: accessible label.
- Normal UI icon size: 16–24px.
- Icon controls remain at least 44×44px.
- Keep stroke weight consistent within one component.

---

# 14. Motion & Interaction

## 14.1 Motion principles

- Motion communicates entrance, state change, direction, or relationship.
- It must never delay access to content.
- Use subtle opacity and 16–32px translation for section reveals.
- Hover motion should remain under 4px.
- Do not combine multiple heavy effects on the same element.

## 14.2 Standard reveal

```tsx
const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.45, ease: "easeOut" },
};
```

Use `MotionConfig reducedMotion="user"` or `useReducedMotion` for animated sections.

## 14.3 Smooth scrolling

- Lenis is the global scroll system.
- Route changes reset to the top.
- Do not add a second smooth-scroll engine.
- Sticky/fixed sections must be tested with Lenis active.
- Anchor links need suitable scroll margin below the fixed Navbar.

## 14.4 Carousels and marquees

- Dragging must not block normal page scrolling.
- Provide arrow controls where users need precise navigation.
- Pause autoplay on hover/focus/drag.
- Never make autoplay the only way to discover content.
- Under `prefers-reduced-motion`, stop or substantially slow continuous marquee motion.
- Avoid infinite motion near forms or important reading content.

## 14.5 Accordions

- Trigger is a `<button>`.
- Use `aria-expanded` and a programmatic relationship to the panel.
- Animate height/opacity only.
- Plus/chevron icon rotates or changes consistently.
- Keyboard activation uses Enter/Space automatically through button semantics.

## 14.6 Lightboxes and modals

- Use `role="dialog"` and `aria-modal="true"`.
- Escape closes.
- Close control is always visible and at least 44×44px.
- Previous/next controls are labelled.
- Focus should move into the dialog and return to the trigger.
- Body scroll is locked while open.

---

# 15. Page-by-Page Blueprints

The global Navbar and Footer wrap every route unless explicitly noted. Section orders below run from the hero/header to the final page CTA.

## 15.1 Full route matrix

| Route | Classification | Hero | Exact page section order |
|---|---|---|---|
| `/` | Primary public home | Home image/analytics | Hero → FounderLegacy → HomeStoryLegacy → HomeServices → GoogleReviews → ClientsMarquee → wide hero video → StrataSection → FireSafetyShorts → FAQ → PreFaqCTA → ContactCTA |
| `/about` | Primary public story | About-style cinematic | Hero → Our Story grid → HomeStoryLegacy → legacy/company + sticky video → four legacy rows → bento gallery → Meet Peter → Experience → Standards → Mission card → Team grid → ContactCTA |
| `/our-clients` | Primary public trust | About-style cinematic | Hero → ClientGrid → HandshakeTestimonials → AboutClients alternating rows → ContactCTA |
| `/services` | Primary public hub | Simple dark image | Hero → category sidebar + service/product card grid → ContactCTA |
| `/services/[slug]` | Dynamic detail | Simple dark image + breadcrumb | Hero/breadcrumb → sticky product image + details → features/meta/options/price/actions/trust → related-products grid |
| `/strata` | Primary who-we-serve | About/Strata cinematic | Hero → Our Work heading → initial gallery → load-more gallery → Coverage row → How We Help row → Properties grid → Why All Fire Services row → lightbox layer → ContactCTA |
| `/contact` | Primary contact | About-style cinematic | Hero → ContactCTA without nested SitewideCTA → SitewideCTA |
| `/annual-fire-safety-statement` | Specialist public | Simple dark image | Hero → intro/process header + CTA → six numbered content rows → AFSS request dark CTA → ContactCTA |
| `/fpa-australia-member` | Specialist public | Simple dark image | Hero → FPA intro → process header + CTA → six numbered membership rows → FPA member dark CTA → ContactCTA |
| `/13-feb-2026-nsw-fire-safety-regulations` | Editorial/regulation | Simple dark image | Hero → article hero image → introduction → AS 1851 block → three regulation stages → closing notes → reference aside → ContactCTA |
| `/campaign` | Campaign | Light/video campaign | Campaign hero/video → Inspection Services header → three process items → ContactCTA |
| `/uncategorized-archive` | Noindex archive | Light/video campaign | Archive hero/video → Article List → three archive entries → pagination → ContactCTA |
| `/talk-to-peter` | Contact utility | Compact contact header | Intro header → detailed contact form → success/error areas → contact information |
| `/find-a-fitter` | Noindex utility | Compact utility | Task hero → postcode/city search panel → result/map placeholder |
| `/confirmation` | Noindex status | Compact contact/status | Confirmation heading → status message → contact information |
| `/qr-database-2` | Noindex utility | Compact contact header | Intro → embedded QR database placeholder → contact information |
| `/fire-consultancy-services` | Placeholder public | ServiceUpdatePlaceholder | Placeholder hero/content supplied by shared component |
| `/fire-protection-services-sydney` | Placeholder public | ServiceUpdatePlaceholder | Placeholder hero/content supplied by shared component |
| `/fire-safety-compliance` | Placeholder public | ServiceUpdatePlaceholder | Placeholder hero/content supplied by shared component |
| `/fire-safety-training` | Placeholder public | ServiceUpdatePlaceholder | Placeholder hero/content supplied by shared component |
| `/home` | Noindex legacy alternate | Legacy parallax/video | Legacy parallax hero → product-type cards → Why Allfire CTA → featured service slider → supporting imported sections |
| `/homepage-2025` | Noindex duplicate legacy | Legacy parallax/video | Near-duplicate of `/home`; not a reference for new work |

## 15.2 Home `/`

### Purpose

Sell All Fire Services quickly: responsibility, capability, trust, services, audiences, proof, and contact.

### Layout rules

- Hero is the visual peak of the site.
- Proof analytics sit beside—not above—the value proposition on desktop.
- Story sections follow the hero but must not repeat the same legacy message.
- HomeServices provides the main capability overview.
- GoogleReviews and ClientsMarquee provide separate forms of proof.
- The standalone video separates proof from the Strata/Who-We-Serve content.
- FAQ appears near the end, immediately before the sitewide CTA sequence.

### Responsive

- Hero columns stack.
- CTAs become full-width when needed.
- Analytics become a compact grid or vertical list.
- Service cards reduce 4 → 3 → 2 → 1/2 based on card minimum width.
- Logo marquee never creates page overflow.
- Video remains responsive with a stable aspect ratio.

### Do not copy

- Do not duplicate FounderLegacy and HomeStoryLegacy content on another page.
- Do not copy the Home multi-line H1 to section headings.
- Do not recreate inline PreFaqCTA when `SitewideCTA` can be reused.

## 15.3 Our Story `/about`

### Purpose

Explain the Tricklebank family firefighting legacy, the company established in 2009, Peter as current owner, team culture, experience, and standards.

### Layout

- Cinematic image hero.
- Long page uses alternating imagery and text to maintain pace.
- Historical sections may use larger gaps than commercial/service pages.
- Sticky video sits beside the legacy/company explanation on desktop and becomes a normal block on mobile.
- Gallery uses real family/company images.
- Mission content may use a raised white card with shadow.
- Team grid uses consistent portrait ratios and lightbox behavior.

### Content safeguards

- 1911 = family legacy.
- 2009 = All Fire Services established.
- Peter = current owner, not founder, not firefighter.
- Attribute firefighting experience to the correct family/team members.

## 15.4 Our Clients `/our-clients`

### Purpose

Build trust through client logos, testimonials, and examples of working relationships/building types.

### Layout

1. Cinematic hero.
2. ClientGrid: left heading / right logo grid on desktop.
3. HandshakeTestimonials: centered legacyHeader + marquee cards.
4. AboutClients: alternating image/text rows.
5. ContactCTA.

### Responsive

- ClientGrid becomes one column with centered intro.
- Logo grid uses two columns on small mobile, three from tablet when space allows.
- Testimonial cards remain readable and draggable.
- AboutClients rows stack image then text unless narrative order requires otherwise.

## 15.5 Services Hub `/services`

### Purpose

Separate **what the business does** into clear categories and service/product cards.

### Desktop layout

```text
Hero
→ Hub container
   ├── Sticky category sidebar
   ├── Divider/gap
   └── Category header + three-column card grid
→ ContactCTA
```

### Card anatomy

- image;
- Service/Product badge;
- title;
- subtitle;
- short description;
- price only when appropriate;
- circular arrow/action.

### Responsive

- Sidebar becomes a full-width category control above content below approximately 820–991px.
- Card grid reduces 3 → 2 → 1.
- Avoid a horizontally scrolling category list unless it is fully keyboard accessible and visibly scrollable.

## 15.6 Service/Product Detail `/services/[slug]`

### Purpose

Explain one product or service and convert the visitor to a quote or phone call.

### Desktop layout

- Breadcrumb in hero.
- Two-column detail region.
- Left image panel may be sticky.
- Right column contains category, title, subtitle, description, features, metadata, options, pricing, CTAs, trust badges.
- Related products appear after the primary detail.

### Responsive

- Image and details stack.
- Sticky positioning is removed.
- CTAs stack full-width.
- Option chips wrap.
- Related grid reduces to two and then one column when content requires it.

### Canonical improvements

- Use `next/image`, not raw `<img>`.
- Use product/category-specific hero media.
- Preserve semantic button/link behavior for selectors and actions.
- Do not display irrelevant price/options metadata for service-only entries.

## 15.7 Strata `/strata`

### Purpose

Explain fire-protection support for strata and residential buildings, show real properties, and convert property decision-makers.

### Layout

- Cinematic hero.
- LegacyHeader introduction to property gallery.
- Initial 16-image gallery; optional additional batch.
- Coverage and How We Help alternating rows.
- Property-type cards.
- Why All Fire Services proof row.
- ContactCTA.

### Gallery

- 4 columns on wide desktop, 3 on smaller desktop/tablet, 2 on mobile.
- Cards are buttons when they open a lightbox.
- Load More / Show Less button uses a documented pill variant.
- Lightbox supports close, previous, next, Escape, and visible item count.

## 15.8 Contact `/contact`

### Purpose

Make contacting the company immediate and clear.

### Layout

- Cinematic hero with short supporting copy.
- ContactCTA renders the primary form and hides its normally nested SitewideCTA.
- SitewideCTA follows once, avoiding duplicate CTA cards.
- Contact methods must be clickable.
- Avoid unrelated story/service sections.

## 15.9 Annual Fire Safety Statement `/annual-fire-safety-statement`

### Purpose

Explain AFSS responsibilities, process, and the next inspection action.

### Layout

- Simple dark image hero with AFSS identification.
- Intro/process heading, explanation, and Get in touch CTA.
- Six numbered image/content process rows.
- Dark request-inspection CTA with phone/contact/request actions.
- ContactCTA.

### Rules

- Keep compliance and real protection connected.
- Verify every standard and regulatory claim.
- Do not make company-wide firefighter-experience claims without accurate attribution.

## 15.10 FPA Australia Member `/fpa-australia-member`

### Purpose

Explain membership significance and practical customer value.

### Layout

- Simple dark hero.
- Intro section.
- Six numbered information rows.
- Dark membership CTA.
- ContactCTA.

Do not overstate accreditation or imply membership guarantees compliance by itself.

## 15.11 Regulation Update `/13-feb-2026-nsw-fire-safety-regulations`

### Purpose

Publish a clear dated regulatory update for building decision-makers.

### Layout

- Dated dark hero.
- Reading-width article.
- Feature image.
- Introduction and key independence note.
- Standards/regulation explanation.
- Three-stage card sequence with current-stage treatment.
- Closing notes and reference aside.
- ContactCTA.

### Editorial rules

- Show publication/update date.
- Cite the regulation/standard accurately.
- Separate fact, interpretation, and All Fire Services advice.
- Keep article paragraphs readable and avoid marketing interruptions.

## 15.12 Campaign and archive pages

### `/campaign`

- Conversion-focused light/video hero.
- Inspection Services process content.
- Three core process items.
- ContactCTA.

### `/uncategorized-archive`

- Noindex archive layout.
- The article list and pagination are functional/content-oriented.
- Placeholder archive entries are **DO NOT COPY**.

## 15.13 Utility pages

### `/talk-to-peter`

Use the canonical form system and factual Peter wording. The page should feel like a direct contact route, not a separate sub-brand.

### `/confirmation`

Keep the status clear, concise, and reassuring. Show the next contact option. Do not place a second form on this page.

### `/qr-database-2`

Treat embedded content as a tool. Use a descriptive iframe title, real URL, responsive height, and fallback contact option.

### `/find-a-fitter`

Task heading → search control → results/map. Do not duplicate Navbar/Footer inside the page when the root layout already supplies them.

## 15.14 Placeholder service routes

`ServiceUpdatePlaceholder` routes are temporary. They may use the global shell and a concise service-specific hero/description, but they are not reference layouts for finished service pages.

## 15.15 Legacy duplicate routes

`/home` and `/homepage-2025` are noindex legacy alternatives. They contain valuable individual patterns but must not be treated as canonical entire-page references. Prefer `/` for Home design decisions.

---

# 16. Shared Section & Component Blueprints

## 16.1 Standard alternating image/text row

**Used by:** About, Strata, AboutClients, story/service sections.

```tsx
<section className="padding-global padding-section-large">
  <div className="container-large">
    <div className={`${styles.newStoryGrid} ${imageFirst ? styles.newStoryGridImageFirst : ""}`}>
      <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] md:min-h-[320px]">
        <Image src="/image.webp" alt="Description" fill sizes="(max-width: 991px) 100vw, 50vw" style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.newStoryContent}>
        <p className={styles.kickerLeft}>SECTION CONTEXT</p>
        <h2>{/* canonical two-line heading */}</h2>
        <p>{/* concise body */}</p>
        {/* optional button group */}
      </div>
    </div>
  </div>
</section>
```

Rules:

- Alternate image side on desktop only.
- On mobile, use a deliberate image-first or text-first order.
- Text vertically centers on desktop.
- Use one image treatment across the sequence.

## 16.2 Floating mission/premium card

- White surface.
- `1.5rem` radius.
- Premium floating shadow.
- Fluid padding: `clamp(2rem, 5vw, 3.5rem)`.
- Contains one alternating row or centered CTA composition.
- Do not place a floating white card on a white section without shadow/border distinction.

## 16.3 HomeServices

- Capability/credential strip above or near the service grid.
- Major two-line heading.
- 12 service cards.
- Desktop: four columns when cards remain wide enough.
- Tablet: three/two columns.
- Mobile: two or one based on actual minimum card width.
- Each card is one link with image, overlay, title, short context, and arrow.
- “View all services” is the section CTA.

## 16.4 StrataSection expanding cards

- Section heading and practical intro first.
- Expanding cards show Greater Sydney locations/building imagery.
- Desktop interaction may expand horizontally.
- Mobile interaction expands vertically or becomes a conventional card list.
- Every card must have a real destination or act only as a non-link visual card; never use `href="#"`.

## 16.5 ClientGrid

```text
Desktop: 5-column text area + 7-column logo area
Mobile/tablet: centered intro above logo grid
```

- Logos: two columns mobile, three tablet/desktop within the logo region.
- Consistent visual height.
- Use monochrome treatment consistently.
- Do not use unrelated external/unstable logos.

## 16.6 Testimonials and reviews

### HandshakeTestimonials

- Centered legacyHeader.
- Horizontal marquee of testimonial cards.
- Cards use `1.5rem` radius and quiet shadow.
- Pause/slow motion for reduced-motion users.

### GoogleReviews

- Heading + review summary.
- Draggable cards and visible previous/next controls.
- Star rating, reviewer name, source/date where available.
- Do not use random stock portraits as if they are verified clients.

## 16.7 ClientsMarquee

- Two rows may move in opposite directions.
- Logos remain readable, consistent, and non-interactive unless they have real destinations.
- Marquee viewport clips its own overflow; the page never scrolls horizontally.
- Under reduced motion, stop or substantially slow the movement.

## 16.8 FAQ

- Surface: canonical `#F9FAFB` or white card on `#F9FAFB`.
- Maximum content width approximately `76rem`.
- Heading follows two-line system.
- Question button spans full width.
- Answer is concise and useful.
- Plus/chevron has a consistent state change.
- Visible focus ring.
- Do not hide substantive service information only inside accordions.

## 16.9 Sitewide CTA / Pre-FAQ CTA

The canonical implementation is one shared CTA component, not two slightly different copies.

### Card

```css
background:
  radial-gradient(circle at 48% 10%, rgba(254,175,4,.38), transparent 28%),
  radial-gradient(circle at 12% 18%, rgba(252,4,3,.28), transparent 32%),
  linear-gradient(135deg, #fc0403 0%, #fb5614 43%, #feaf04 100%);
border-radius: 1.5rem;
box-shadow: 0 2rem 4.5rem rgba(17,17,17,.16);
padding: clamp(2rem, 5vw, 4.5rem);
```

### Content

- Centered two-line heading.
- Short support copy where needed.
- Call and Get a Quote actions.
- Buttons must contrast with the gradient card.
- Use once near the bottom of a page.

## 16.10 ContactCTA

- Usually the final major section before Footer.
- Desktop: persuasive contact content left, form right.
- Mobile: stack and simplify.
- May include SitewideCTA by default.
- On `/contact`, use `hideSitewideCTA` and render SitewideCTA once separately.

## 16.11 Team and gallery cards

- Consistent portrait/image ratio.
- Name/title visible without opening lightbox.
- Card itself is not a link unless it has a destination.
- Lightbox trigger has descriptive accessible text.
- Do not crop faces at common breakpoints.

## 16.12 FireSafetyShorts / portrait video galleries

- Mobile-first horizontal scroll or carousel.
- Load only active/nearby iframes.
- Preserve 9:16 portrait ratio.
- Provide title and channel/context.
- Controls are accessible and at least 44×44px.

## 16.13 ServiceUpdatePlaceholder

- Clear eyebrow/service name.
- Honest “being updated” explanation if required.
- Link to contact or services hub.
- Use the global shell.
- Never invent finished-service content to fill space.

## 16.14 Unused/orphaned components

`StaggeredMenu`, `HeroScrollVideo`, `HeroParallaxBackground`, `HeroScrollContent`, `TimelineSection`, `WhyAllfireSticky`, `PortraitVideoGallery`, `HomepageStats`, `SplitText`, and some `ui/` components currently have limited or no route usage.

They are not automatically canonical because they exist. Before reusing one:

1. confirm it is still needed;
2. compare it to this document;
3. verify touch targets, reduced motion, colors, and breakpoints;
4. remove or refactor duplicate behavior rather than creating a second system.

---

# 17. Responsive System

## 17.1 Canonical mobile-first breakpoints

| Name | Width | Strategy |
|---|---:|---|
| XS | 0–479px | One column; centered short copy; smallest safe padding |
| SM | 480–767px | One column; slightly larger spacing |
| MD | 768–991px | Tablet; one or selected two-column layouts |
| LG | 992–1199px | Main desktop grids begin |
| XL | 1200–1439px | Full desktop composition |
| 2XL | 1440px+ | Same structure with more breathing room |

Canonical queries:

```css
/* mobile-first base */
@media (min-width: 480px) { }
@media (min-width: 768px) { }
@media (min-width: 992px) { }
@media (min-width: 1200px) { }
@media (min-width: 1440px) { }
```

Legacy code also uses 767/768, 991/992, and 1023/1024 boundaries. When editing a legacy component, avoid overlapping contradictory ranges and migrate toward the canonical table.

## 17.2 Mandatory test widths

Every edited page/section must be checked at:

- 320px;
- 375px;
- 768px;
- 1024px;
- 1440px.

Also test at intermediate widths when a heading or grid is close to wrapping.

## 17.3 Global responsive rules

1. No horizontal page scrolling.
2. Use fluid font sizes and spacing.
3. Stack two-column sections by 991px unless deliberately tablet-designed.
4. Center short section intros on mobile; left-align long reading content.
5. Minimum interactive target is 44×44px.
6. Do not keep fixed desktop image heights on mobile.
7. Do not use long `white-space: nowrap` text.
8. Use `min-width: 0` on grid/flex children.
9. Images and videos use `max-width: 100%`.
10. Tables/code/diagrams scroll inside their own container, not the body.

## 17.4 Component response matrix

| Component | XS/SM | MD | LG+ |
|---|---|---|---|
| Navbar | compact row, no topbar, mobile panel | mobile/tablet panel | full nav + dropdown |
| Footer | static, stacked | static/compact grid | fixed reveal, two-region grid |
| Hero B | centered content, fluid height | centered or transitional | two-column/left-aligned cinematic layout |
| Alternating row | one column | usually one column | two columns, alternating image side |
| HomeServices | 1–2 columns | 2–3 columns | 4 columns |
| Logo grid | 2 columns | 3 columns | 3 columns in right region |
| Services hub | category control above | category control above/side if safe | sticky sidebar + 3-column cards |
| Product detail | image then details | image then details | sticky image + details columns |
| Form short fields | one column | two columns where safe | two columns |
| CTA buttons | stacked/full-width when needed | inline if labels fit | inline |
| Strata gallery | 2 columns | 3 columns | 4 columns |
| Testimonials | one card focus | 1–2 visible | multiple visible |
| Lightbox | edge-safe controls | centered media | centered media + side controls |

## 17.5 Mobile heading rules

- Preserve exactly two H2 lines.
- If line one is long, reduce its size—not the gradient payoff line.
- `max-width` should be measured in characters (`ch`) where useful.
- Avoid punctuation-heavy titles that leave one word stranded.
- Test with browser font scaling where practical.

## 17.6 Mobile image rules

- Standard image minimum height: `200px`–`240px`.
- Portrait/team cards may use `aspect-ratio` instead of min-height.
- Do not force every image to `300px` or `400px` on 320px screens.
- Keep the important subject within the mobile crop using breakpoint-specific `object-position`.

---

# 18. Accessibility Requirements

## 18.1 Required baseline

- Semantic landmarks: header/nav/main/section/footer where appropriate.
- One H1 per page.
- Heading levels do not skip without reason.
- Keyboard access for every interaction.
- Visible focus for every interactive element.
- 44×44px minimum targets.
- Sufficient color contrast.
- Reduced-motion support.
- Descriptive labels for icon-only controls.
- Meaningful image alt text.
- No essential information communicated only by color or motion.

## 18.2 Focus styles

Canonical brand focus:

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #FB5614;
}
```

For controls where box-shadow is unsuitable, use a visible 2–3px orange outline with at least 2px offset.

## 18.3 Color contrast

- `#111111` on white is preferred for body text.
- White on dark overlays must remain readable over every crop.
- `#FEAF04` should normally be used on dark backgrounds.
- On white, use `#fb5614` or a darker warm tone for small eyebrow text.
- Gradient display text must have a visible fallback.

## 18.4 Navigation and forms

- Mobile menu trigger announces open/closed state.
- Dropdowns work by keyboard and touch.
- Required fields are identified in labels, not placeholders only.
- Errors are linked to fields.
- Phone/email links describe their action.
- Do not remove browser autofill or autocomplete without reason.

## 18.5 Motion

Under `prefers-reduced-motion: reduce`:

- stop decorative looping animation;
- remove parallax transforms;
- remove large entrance movement;
- preserve content visibility;
- allow instant accordion/modal state changes.

## 18.6 External embeds

- Iframes require descriptive titles.
- Provide fallback text/action.
- Avoid focus traps inside decorative embeds.
- Cookie/privacy implications must be considered for third-party media.

---

# 19. Content, Wording & Factual Rules

## 19.1 One clear page job

Every page must answer quickly:

1. What is this?
2. Why does it matter?
3. What does All Fire Services do about it?
4. What should the visitor do next?

## 19.2 Sell first, explain second

Begin with the visitor’s need, responsibility, or outcome. Then explain the service and company proof.

Good:

> Fire protection for strata and residential buildings across Greater Sydney.

Avoid:

> We are passionately committed to providing unparalleled, comprehensive and industry-leading solutions.

## 19.3 Voice

Sound:

- professional;
- experienced;
- practical;
- reliable;
- direct;
- approachable;
- responsible;
- knowledgeable.

Do not sound:

- overhyped;
- vague;
- artificially luxurious;
- generic or AI-generated;
- dramatic without evidence.

Avoid unsupported phrases such as “unparalleled excellence”, “revolutionary solutions”, “world-class innovation”, and “unmatched expertise”.

## 19.4 Page ownership of information

### Home

Value proposition, trust, services, audiences, short legacy proof, clients/reviews, FAQ, CTA. Do not tell the complete family history.

### Our Story

Family firefighting legacy, 1911 context, company established in 2009, Peter as current owner, team, mission, experience, standards.

### Services

What All Fire Services does: categories, services, products, and links to details.

### Service detail

One service/product: what it is, why it matters, what is provided, standards, process, audiences, proof, action.

### Who We Serve / Strata

Where and for whom services are delivered: responsibilities, property needs, relevant services, proof, action.

### Contact

How to contact the team and what information to provide.

## 19.5 Services vs audiences

- **Services = what we do.**
- **Who We Serve = who/where we do it for.**

Do not mix a property type into the services taxonomy or present a service as an audience.

## 19.6 Eyebrows and headings

Eyebrows provide context; headings add meaning.

Examples:

- `OUR SERVICES` → `Complete Fire Protection`
- `WHO WE SERVE` → `Strata & Residential Buildings`
- `OUR STORY` → `Fire Protection Runs in Our Blood`
- `COMPLIANCE` → `Annual Fire Safety Statements`
- `EXPERIENCE` → `Built on Real Experience`

Avoid vague page H1s such as “Building Confidence” when the page is specifically about Fire Doors.

## 19.7 Service-page formula

1. Eyebrow/category.
2. Exact H1.
3. 2–3 sentence intro.
4. Why it matters.
5. What we do.
6. Verified compliance/standards.
7. Who needs it.
8. Why All Fire Services.
9. Clear CTA.

Do not create unnecessary sections merely to fill a template.

## 19.8 Who-we-serve formula

1. `WHO WE SERVE` eyebrow.
2. Property/audience H1.
3. Their fire-safety responsibilities.
4. How All Fire Services helps.
5. Relevant services.
6. Short proof.
7. CTA.

## 19.9 Peter Tricklebank — CRITICAL

Peter Tricklebank:

- is the **current owner** of All Fire Services;
- is **not** to be described as the founder unless verified and explicitly approved;
- is **not** a firefighter;
- must not be described as having fought fires or served in a brigade.

Firefighter experience must be attributed to the correct family or team members.

## 19.10 1911 and 2009 — CRITICAL

- **1911** = Tricklebank family firefighting legacy.
- **2009** = All Fire Services established.

Never write:

- “All Fire Services has operated since 1911.”
- “More than 100 years of All Fire Services experience.”

Approved model:

> A family firefighting legacy dating to 1911 and an Australian-owned fire-protection business established in 2009.

## 19.11 Standards and regulations

- Never invent an Australian Standard.
- Verify the number, title, edition/year, and relevance.
- Distinguish legal requirement, Australian Standard guidance, and company recommendation.
- If uncertain, write a factual placeholder and flag it for verification rather than guessing.

## 19.12 Compliance + protection

Do not reduce fire safety to paperwork.

Preferred:

> Keep essential systems maintained, compliant, and ready when needed.

> Protect people, property, and operations while meeting fire-safety responsibilities.

## 19.13 Practical CTA wording

Use practical actions: Get a Quote, Contact Our Team, Talk to Our Team, Request an Inspection, Learn More, View Service.

## 19.14 Final content test

- Is the page identifiable in seconds?
- Is information repeated?
- Does content belong on this page?
- Are claims accurate?
- Are 1911 and 2009 correct?
- Is Peter described correctly?
- Are standards verified?
- Is the next action obvious?
- Does wording sound natural in Australian English?

---

# 20. Deviations & Do-Not-Copy Register

This section records current implementation differences. It is not permission to repeat them.

| ID | Area | Status | Current issue | Canonical direction |
|---|---|---|---|---|
| D-01 | `app/allfireservices.css` | DO NOT COPY | Legacy body font/size rules can conflict with Inter. | Inter from root layout is authoritative. |
| D-02 | `app/globals.css` | AS BUILT | Generic OKLCH/shadcn tokens do not express the active brand palette. | Preserve brand hex values or migrate them deliberately into semantic tokens. |
| D-03 | Global CSS | AS BUILT | Legacy fixed heading sizes and weights conflict with fluid canonical scale. | Use Section 4 clamps and weights. |
| D-04 | `responsive.css` | AS BUILT | Breakpoints mix 767/768, 991/992, 1023/1024. | Use the canonical mobile-first matrix. |
| D-05 | `responsive.css` | DO NOT COPY | Global `overflow-wrap:anywhere` can break controlled gradient headings. | Restore normal wrapping on heading/gradient spans. |
| D-06 | Home hero | EXCEPTION | Desktop/mobile H1 uses more than two lines. | Allowed only for the Home H1; H2 rule remains exactly two lines. |
| D-07 | Simple specialist heroes | EXCEPTION | Some H1s are one line without gradient. | Keep only when the service/acronym is unmistakable; future marketing heroes should use two lines. |
| D-08 | SitewideCTA vs PreFaqCTA | DO NOT COPY | Two near-duplicate CTA implementations use different palettes/padding. | Use one shared canonical CTA component. |
| D-09 | ContactCTA | AS BUILT | Legacy Webflow form classes and simple submit input. | Keep layout, move toward semantic validation and canonical button. |
| D-10 | Footer services | DO NOT COPY | Hardcoded service list differs from `lib/navigation.ts`, including labels/hrefs. | Import the shared `serviceLinks`. |
| D-11 | Footer standard label | DO NOT COPY | “Smoke detects AS 3876” is inconsistent with the navigation’s AS 3786 label. | Verify and use the correct standard; do not copy the typo. |
| D-12 | Footer legal items | DO NOT COPY | Privacy and terms are plain spans. | Use real links when routes exist. |
| D-13 | Footer social icons | DO NOT COPY | Several links use `href="#"`. | Add real URLs or omit them. |
| D-14 | Footer controls | AS BUILT | Sharp corners and some 36px social targets. | Use canonical radius and at least 44×44px. |
| D-15 | Footer wordmark | AS BUILT | Animated wordmark exists but is hidden. | Optional; enable only after layout/accessibility verification. |
| D-16 | Services detail | AS BUILT | Raw `<img>` and shared generic hero imagery. | Use `next/image` and category/product-appropriate media. |
| D-17 | Strata card links | DO NOT COPY | Some expanding cards use `href="#"`. | Supply a real destination or remove link semantics. |
| D-18 | Review avatars | DO NOT COPY | Random stock portraits can imply real reviewers. | Use verified imagery, initials, or no avatar. |
| D-19 | Hero overlay CSS | AS BUILT | Similar overlay CSS is duplicated in route files and global CSS. | Reuse one canonical hero overlay implementation. |
| D-20 | Home analytics | DO NOT COPY | A year counter can animate backwards from 2026 to 2009. | Show “Established 2009” statically or use a meaningful increasing metric. |
| D-21 | Heading implementations | AS BUILT | Some CSS-balanced headings lack explicit `<br />`. | Use explicit two-line TSX structure. |
| D-22 | HomeServices/cards | AS BUILT | Several cards use inconsistent radii/colors/shadows. | Normalize to Sections 3 and 7 when touched. |
| D-23 | FAQ | AS BUILT | Surface and fixed padding differ from canonical FAQ pattern. | Use `#F9FAFB` and fluid spacing. |
| D-24 | Legacy timeline/grid | AS BUILT | Some tablet layouts retain two columns and noncanonical colors. | Stack by 991px unless deliberately redesigned. |
| D-25 | `/find-a-fitter` | DO NOT COPY | Page may duplicate Navbar/Footer already supplied globally. | Root layout owns global shell. |
| D-26 | `/home`, `/homepage-2025` | DO NOT COPY | Duplicate noindex Home variants remain served. | Prefer `/`; redirect/remove only in a separate approved task. |
| D-27 | Placeholder routes | DO NOT COPY | Temporary page structure is incomplete. | Use service-page formula for finished pages. |
| D-28 | Unused components | AS BUILT | Multiple alternative menus/heroes/timelines exist without live use. | Audit before reuse; do not create parallel systems. |
| D-29 | Yellow on white | ACCESSIBILITY | `#FEAF04` may not meet normal-text contrast on white. | Use brand orange/darker warm text on light surfaces. |
| D-30 | Inline styles | AS BUILT | Large route-level `<style>` blocks make patterns drift. | Reuse shared components/modules/tokens in future refactors. |

## 20.1 Factual claims requiring confirmation before reuse

Do not automatically repeat these without current business verification:

- 24/7 emergency-response availability;
- exact years of brigade/firefighter experience;
- founder identity;
- team member service histories;
- membership level/status and expiry;
- every Australian Standard number/edition;
- regulatory commencement dates;
- warranty, pricing, and model metadata in product cards;
- named client relationships and testimonials.

---

# 21. Copy-and-Apply Templates & QA

## 21.1 Canonical shared style constants

```tsx
const gradientStyle = {
  background: "linear-gradient(to right, #ff2a00, #ffb700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const heroH1Style = {
  color: "#ffffff",
  fontSize: "clamp(2rem, 5vw, 5.5rem)",
  fontWeight: 900,
  letterSpacing: "-0.05em",
  lineHeight: 1.05,
  margin: 0,
  textTransform: "uppercase",
} as const;

const sectionH2Style = {
  color: "#111111",
  fontSize: "clamp(2.5rem, 4.8vw, 5.2rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 0.94,
} as const;

const lineOneStyle = {
  fontSize: "clamp(1.8rem, 3.4vw, 3.4rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 1.05,
} as const;

const lineTwoStyle = {
  ...gradientStyle,
  fontSize: "clamp(2.5rem, 4.8vw, 5.2rem)",
  fontWeight: 800,
  letterSpacing: "-0.06em",
  lineHeight: 0.94,
} as const;

const bodyStyle = {
  color: "#111111",
  fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
  lineHeight: 1.55,
} as const;

const eyebrowStyle = {
  color: "#FEAF04",
  fontSize: "0.8rem",
  fontWeight: 800,
  letterSpacing: "0.1em",
  lineHeight: 1.2,
  marginBottom: "0.9rem",
  textTransform: "uppercase",
} as const;
```

## 21.2 Canonical section header

```tsx
<header className="mx-auto max-w-4xl text-center md:mx-0 md:text-left">
  <p style={eyebrowStyle}>SECTION CONTEXT</p>
  <h2 style={sectionH2Style}>
    Clear first-line subject<br />
    <span style={gradientStyle}>Strong second-line payoff</span>
  </h2>
  <p className="mt-6 max-w-[62ch]" style={bodyStyle}>
    One concise paragraph that explains why this section matters.
  </p>
</header>
```

## 21.3 Canonical About-style hero skeleton

```tsx
<header className="relative overflow-hidden bg-[#111111]">
  <Image src="/hero.webp" alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
  <div className="about-dark-overlay" />
  <div className="about-directional-overlay" />
  <div className="about-fade-overlay" />

  <div className="padding-global relative z-[3]">
    <div className="container-large">
      <div className="flex min-h-[42rem] items-center py-[clamp(7rem,12vw,12rem)]">
        <div className="max-w-5xl text-center md:text-left">
          <p style={eyebrowStyle}>PAGE CONTEXT</p>
          <h1 style={heroH1Style}>
            <span className="block">PAGE TITLE</span>
            <span className="inline-block" style={gradientStyle}>QUALIFIER</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-white/90">Concise supporting copy.</p>
        </div>
      </div>
    </div>
  </div>
</header>
```

## 21.4 Canonical responsive grid CSS

```css
.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2.5rem, 7vw, 4rem);
  min-width: 0;
}

@media (min-width: 992px) {
  .story-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.72fr);
    gap: clamp(4rem, 8vw, 8rem);
    align-items: center;
  }
}
```

## 21.5 Section QA checklist

### Layout

- [ ] Uses the correct container width.
- [ ] Uses fluid side/vertical padding.
- [ ] Grid stacks at the intended breakpoint.
- [ ] Image/text order is intentional on mobile.
- [ ] No fixed width causes overflow.

### Typography

- [ ] Inter is inherited.
- [ ] H2 is exactly two visual lines.
- [ ] Gradient uses exact canonical values.
- [ ] Body copy remains within a readable line length.
- [ ] Eyebrow contrast is sufficient for its background.

### Components

- [ ] Primary CTA uses orange → red state treatment.
- [ ] Buttons/controls are at least 44×44px.
- [ ] Cards use approved radius/shadow.
- [ ] Images use appropriate `sizes` and alt text.
- [ ] Motion has a reduced-motion fallback.

### Responsive

- [ ] 320px: no clipping or horizontal page scroll.
- [ ] 375px: centered/stacked mobile composition reads well.
- [ ] 768px: tablet spacing and grid transition are clean.
- [ ] 1024px: desktop navigation/grid state is correct.
- [ ] 1440px: content does not spread excessively.

## 21.6 Full-page QA checklist

### Header to footer

- [ ] Navbar is present once.
- [ ] Hero clears fixed navigation.
- [ ] One H1 identifies the page.
- [ ] Section order supports the page’s single job.
- [ ] Message is not repeated across adjacent sections.
- [ ] Final CTA appears before Footer.
- [ ] Footer is present once and reveals/static-flows correctly.
- [ ] Chatbot does not obstruct navigation, forms, or mobile controls.

### Accessibility

- [ ] Keyboard can operate nav, dropdowns, forms, accordions, carousels, and lightboxes.
- [ ] Focus is always visible.
- [ ] No normal text fails contrast.
- [ ] Modal focus and Escape behavior work.
- [ ] Reduced-motion mode remains fully usable.
- [ ] Heading levels and landmarks are semantic.

### Content/facts

- [ ] 1911 describes family legacy only.
- [ ] 2009 describes company establishment.
- [ ] Peter is described only as current owner unless separately verified.
- [ ] Firefighter experience is correctly attributed.
- [ ] Standards/regulations are verified.
- [ ] Phone, email, social, legal, and CTA links are real.
- [ ] No placeholder copy, price, image, or href remains on a finished public page.

## 21.7 Route coverage verification

When updating this document after future development:

1. List every `app/**/page.tsx` route.
2. Add new public routes to Section 15.
3. Add new shared components to Section 16.
4. Record intentional exceptions.
5. Add known deviations rather than quietly changing the canonical design.
6. Re-run the full-page QA checklist on the nearest reference page.

---

# 22. Conclusion

When building or restyling any All Fire Services page:

1. Use the global shell in Section 2.
2. Apply the color, type, spacing, radius, and button systems in Sections 3–9.
3. Use the global Navbar and Footer rules in Sections 10–11.
4. Select the correct hero from Section 12.
5. Follow the nearest route structure in Section 15.
6. Reuse the shared patterns in Section 16 rather than creating duplicates.
7. Verify responsiveness and accessibility with Sections 17–18.
8. Apply the factual/content safeguards in Section 19.
9. Never copy a deviation from Section 20 as a new standard.
10. Complete every item in Section 21 before approval.

The finished page should feel unmistakably like All Fire Services from the first header pixel to the final footer link: practical, professional, responsive, readable, brand-consistent, and grounded in accurate real-world fire-protection experience.
