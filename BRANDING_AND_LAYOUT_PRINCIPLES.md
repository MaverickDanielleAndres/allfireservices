# All Fire Services — Comprehensive Branding, Design & Layout Source of Truth

This document is the **single source of truth** for styling, branding, typography, spacing, colors, layout, content writing, and responsive behavior across the entire All Fire Services website.

**How to use this document:**
- You can explicitly reference it by saying: *"Apply the BRANDING_AND_LAYOUT_PRINCIPLES.md to this page"*.
- Any new page, section, component, or refactor MUST follow these rules.
- The mobile/tablet responsive rules in Section 9 are MANDATORY on every section you edit or create.

**Reference pages:**
- `/app/page.tsx` (Home)
- `/app/about/page.tsx` (About)
- `/app/our-clients/page.tsx` (Our Clients)

These three pages define the visual language for the entire site.

---

# Table of Contents

1. [Brand Philosophy & Design Rules](#1-brand-philosophy--design-rules)
2. [Color Palette](#2-color-palette)
3. [Typography System](#3-typography-system)
4. [The 2-Line Heading System (MANDATORY)](#4-the-2-line-heading-system-mandatory)
5. [Spacing & Layout System](#5-spacing--layout-system)
6. [Component Blueprints — Home Page](#6-component-blueprints--home-page)
7. [Component Blueprints — About Page](#7-component-blueprints--about-page)
8. [Component Blueprints — Our Clients Page](#8-component-blueprints--our-clients-page)
9. [Mobile, Tablet & Responsive Rules (MANDATORY)](#9-mobile-tablet--responsive-rules-mandatory)
10. [Website Content, Wording & Page Principles](#10-website-content-wording--page-principles)
11. [Conclusion](#11-conclusion)

---

# 1. Brand Philosophy & Design Rules

- **Premium & Professional:** High-end aesthetic with dynamic contrasts and polished transitions.
- **Authoritative & Experienced:** Conveying "generations of real-world firefighting experience."
- **Modern & Dynamic:** Subtle scroll reveals, glassmorphism, overlapping gradients, smooth hover micro-animations.
- **Consistent:** Every page must feel like it belongs to the same business.
- **Australian & Practical:** Voice and design should feel local, grounded, and trustworthy — not generic or AI-flavored.

### Design Directives

1. **Sell first. Explain second.** Visitors should understand the page in seconds.
2. **One clear job per page.** Don't try to explain the whole company on every page.
3. **Use the 2-line heading system** (see Section 4) on every section heading.
4. **Every section must be mobile-first.** Verify on 320px, 375px, 768px, 1024px.
5. **Don't repeat the same message.** If it's been said, move on.
6. **1911 = family legacy. 2009 = All Fire Services. Never confuse them.**

---

# 2. Color Palette

Use these exact tokens. Do NOT introduce new colors without explicit approval.

### Core Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--bg-dark` | `#111111` | Primary dark text, button backgrounds, dark sections |
| `--bg-light` | `#ffffff` | Primary light background (all content sections) |
| `--bg-light-alt` | `#F9FAFB` | FAQ background, secondary light surfaces |
| `--text-primary` | `#111111` | Body text on light backgrounds |
| `--text-on-dark` | `#ffffff` / `rgba(255,255,255,0.9)` | Body text on dark backgrounds |

### Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `--brand-orange` | `#fb5614` | Primary orange accent, gradient start, buttons, hover states |
| `--brand-red` | `#fc0403` / `#ff2a00` | Gradient start, urgent states, red highlight words |
| `--brand-red-pure` | `#ff0000` | "Red highlight" word inside headings (e.g. "Owned", "in", "All Fire") |
| `--brand-yellow` | `#FEAF04` | Eyebrow / kicker text color, secondary gradient end |
| `--brand-yellow-end` | `#ffb700` | Gradient end color |

### The Signature Gradient (MANDATORY)

```css
background: linear-gradient(to right, #ff2a00, #ffb700);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

This is the gradient used across the site for second-line headings, hero titles, and key emphasis. **Always** apply this gradient when an element calls for the "gradient text" treatment.

---

# 3. Typography System

### Font Family

The site uses **Inter** (variable) as the primary sans-serif. No custom display font is required — hierarchy is achieved through weight, size, and color treatment.

### Heading Scale

#### Hero H1 (Page Title)
```tsx
fontSize: 'clamp(2rem, 5vw, 5.5rem)'
color: '#ffffff' (on dark) or '#111111' (on light)
fontWeight: 900
textTransform: 'uppercase'
lineHeight: 1.1
```
- Used in: Home hero, About hero, Our Clients hero.
- Pattern: First line white (`#ffffff`), second line uses the **signature gradient**.

#### Section H2 (Standard Section Headings)
```tsx
fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)'   // About page main blocks
// OR
fontSize: 'clamp(2.5rem, 4.2vw, 4rem)'     // About "Century of Service" rows
// OR
fontSize: 'clamp(2.8rem, 5.8vw, 4.5rem)'   // ClientGrid main heading
fontWeight: 800
color: '#111111'
letterSpacing: '-0.06em'
lineHeight: 0.94
textWrap: 'balance'  // optional but recommended
```
- Used in: Section titles across About, Clients, and reusable sections.
- Pattern: **Always** use the 2-line heading system (Section 4).

#### Kicker / Eyebrow Text
```tsx
// Form A: inline styled
<div style={{ color: '#FEAF04', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
  YOUR KICKER HERE
</div>

// Form B: HomeStoryLegacy.module.css .kickerLeft class
className={styles.kickerLeft}
// CSS: color: #e94716, font-size: 0.78rem, font-weight: 800, letter-spacing: 0.12em
```
- Color: `#FEAF04` or `#e94716` (the orange/yellow token).
- Always uppercase, 1–4 words.
- Margin-bottom: `1rem` from heading.

#### Body Text (Standard)
```tsx
fontSize: 'clamp(1rem, 1.3vw, 1.15rem)'      // About page OUR STORY paragraphs
// OR
fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)'    // Most section paragraphs
color: '#111111'
lineHeight: 1.55 or 1.6
```
- For dark backgrounds use: `color: 'rgba(255,255,255,0.9)'`

#### Bold Emphasis in Body Text
- Use `<strong>` sparingly.
- Only bold the message that matters.
- Common bold pattern: `**standards of service, responsibility, and care**`

---

# 4. The 2-Line Heading System (MANDATORY)

**This is the canonical heading pattern for the site. Every section heading on the About, Our Clients, and any future pages MUST follow this pattern.**

### The Pattern

A heading is split into TWO lines using an explicit `<br />`:

- **Line 1:** Plain text (white on dark hero, `#111111` on light).
- **Line 2:** The entire line is wrapped in a `<span>` with the **signature gradient**.

```tsx
<h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
  <span style={{
    background: 'linear-gradient(to right, #ff2a00, #ffb700)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}>
    "Fire Protection<br />Runs in Our Blood"
  </span>
</h2>
```

### Variations

#### Variation A — Whole Heading Is Gradient
The entire heading (both lines) is gradient:
```tsx
<h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)' }}>
  <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    "Built on<br />Real Experience"
  </span>
</h2>
```
Used for: EXPERIENCE, STANDARDS, OUR STORY, ABOUT.

#### Variation B — Last Word on Line 1 Is Red, Line 2 Is Gradient
```tsx
<h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
  "Australian <span style={{ color: '#ff0000' }}>Owned</span><br />
  <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    Since 2009
  </span>
"
</h2>
```
Used for: MEET PETER TRICKLEBANK, OUR MISSION (where the preposition like "in" is red).

#### Variation C — First Line Dark + One Word on Line 1 Is Red, Line 2 Is Gradient
```tsx
<h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', color: '#111111', maxWidth: '15ch' }}>
  Meet the <span style={{ color: '#ff0000' }}>All Fire</span><br />
  <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    Services Team
  </span>
</h2>
```
Used for: TEAM, ClientGrid main heading (Property Managers line 2 gradient), AboutClients main heading.

### Why `<br />` Instead of CSS Wrapping

- **Guaranteed layout:** CSS word-wrap varies with viewport, font-size, and language. `<br />` is deterministic.
- **Gradient line always on line 2:** No risk of the gradient being split awkwardly across lines.
- **Responsive safe:** Even at 320px the heading still reads cleanly.

### Headings MUST Be Exactly 2 Lines (MANDATORY)

**No section heading is allowed to wrap to 3 or more lines.** This is a hard rule. A heading that wraps to 3 lines breaks the visual rhythm of the page and is rejected on sight.

When the **line 1 (top, plain text)** contains too many words or characters and would wrap to a second visual line, you MUST:

1. **Reduce the `fontSize` of line 1 only** — never touch the size of line 2 (gradient line).
2. Wrap line 1 in its own `<span>` with a smaller `fontSize`, and let line 2 inherit / keep the larger `fontSize` from the parent `<h2>`.
3. Use `clamp()` for both lines so the scaling stays fluid on all viewports.

### Standard Font-Size Split (When Line 1 Is Too Long)

| Line | Role | `fontSize` | `fontWeight` | `lineHeight` |
|---|---|---|---|---|
| Line 1 (top, plain text) | Subject / setup | `clamp(1.8rem, 3.4vw, 3.4rem)` | 800 | 1.05 |
| Line 2 (gradient or red+gradient) | Key term / payoff | `clamp(2.5rem, 4.8vw, 5.2rem)` (alternating grid) **or** `clamp(2.8rem, 5.8vw, 6rem)` (`legacyHeader`) | 800 / 780 | 0.94 / 0.92 |
| Red highlight word (Variation B/C) | Inline accent | inherits line 2 size | inherits | inherits |

### Template: 2-Line Heading With Smaller Line 1 (Alternating Grid Variant)

Use this whenever the line 1 text is more than 2 short words or has more than ~16 characters:

```tsx
<h2 className="mx-auto md:mx-0 text-center md:text-left" style={{ maxWidth: '24ch', color: '#111111' }}>
  <span style={{ fontSize: 'clamp(1.8rem, 3.4vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1.05 }}>
    Line One Top Words
  </span><br />
  <span style={{ ...gradientStyle, fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94 }}>
    Line Two Gradient
  </span>
</h2>
```

### Template: 2-Line Heading With Smaller Line 1 (`legacyHeader` / Home Page Format)

Use this for the `legacyHeader` style header (PROPERTIES WE SERVICE, OUR WORK):

```tsx
<header className={styles.legacyHeader}>
  <p className={styles.kicker}>SECTION KICKER</p>
  <h2 style={{ color: '#111111' }}>
    <span style={{ fontSize: 'clamp(2rem, 3.4vw, 3.4rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 1.05 }}>
      Line One Top Words
    </span><br />
    <span style={{ color: '#ff2a00', fontSize: 'clamp(2.8rem, 5.8vw, 6rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>
      Red
    </span>{' '}
    <span style={{ ...gradientStyle, fontSize: 'clamp(2.8rem, 5.8vw, 6rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>
      Gradient
    </span>
  </h2>
  <p>Description paragraph...</p>
</header>
```

### Reusable Heading Constants

Define once at the top of the file:

```tsx
const gradientStyle = {
  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

// Line 1 (top, plain) — used when line 1 would otherwise wrap
const lineOneStyle = {
  fontSize: 'clamp(1.8rem, 3.4vw, 3.4rem)',
  fontWeight: 800,
  letterSpacing: '-0.06em',
  lineHeight: 1.05,
} as const;

// Line 2 (gradient or red+gradient) — keep the original section H2 size
const lineTwoStyle = {
  ...gradientStyle,
  fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)',  // alternating grid
  // OR fontSize: 'clamp(2.8rem, 5.8vw, 6rem)', // legacyHeader
  fontWeight: 800,
  letterSpacing: '-0.06em',
  lineHeight: 0.94,
} as const;
```

### Verification Before Approving a Heading

- [ ] The heading renders on **exactly 2 visual lines** at 320px, 375px, 768px, 1024px, and 1440px.
- [ ] The gradient line is always line 2 — never line 1 or split across lines.
- [ ] Line 1 fontSize is `clamp(1.8rem, 3.4vw, 3.4rem)` (alternating grid) or `clamp(2rem, 3.4vw, 3.4rem)` (`legacyHeader`).
- [ ] Line 2 fontSize is **unchanged** from the original section H2 size (`clamp(2.5rem, 4.8vw, 5.2rem)` for alternating grid or `clamp(2.8rem, 5.8vw, 6rem)` for `legacyHeader`).
- [ ] No character / word on line 1 wraps to a third line at any viewport.

### Reusable Style Constant

When a component has multiple headings using the same gradient, define it once:

```tsx
const gradientStyle = {
  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;
```

---

# 5. Spacing & Layout System

### Container Width

- Use the `.container-large` class for all content wrappers.
- Maximum width: ~`1200px` to `1400px` depending on section.

### Section Padding

```tsx
className="padding-section-large"   // clamp(2rem, 5vw, 6rem) vertical
// or explicit
paddingTop: 'clamp(2.5rem, 5vw, 6rem)'
paddingBottom: 'clamp(2.5rem, 5vw, 6rem)'
```

### Inner Block Spacing

Between major blocks within a section:
```tsx
marginBottom: '14rem'      // Big breathing room between blocks (about page main rows)
// OR
marginBottom: '10rem'      // Slightly tighter
// OR
marginBottom: '6rem'       // Between sub-sections
// OR
marginBottom: '4rem'       // Between tightly related sub-sections
```

Use `clamp()` for fluid responsive spacing:
```tsx
marginBottom: 'clamp(3rem, 5vw, 6rem)'
paddingBottom: 'clamp(4rem, 8vw, 8rem)'
```

### Border Radius

- **Images in standard alternating grid:** `1.5rem` (24px)
- **Cards (mission box, CTA cards):** `24px` (1.5rem)
- **Buttons:** `0.55rem` or `999px` for pill-shaped

### Box Shadows

- **Standard image:** none (use image's own styling)
- **Floating box / mission box:** `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.03)`
- **Hover lift:** `transform: translateY(-2px)` + shadow change

---

# 6. Component Blueprints — Home Page

### 6.0. Brand Buttons (Primary CTA Pattern) — MANDATORY for ALL CTAs

All call-to-action buttons site-wide **MUST** use this exact structure and styling. The "View all services", "Talk to Us", "Get a quote", "Load more buildings", etc. buttons all use this same component.

**Class stack:** `button-group` (wrapper) → `button-wrap` (anchor/button) → `button-content` (styleable inner) → `button-layout` (flex layout) → `button-text` (label) + `button-icon` (arrow icon container).

```tsx
<div className="button-group">
  <button type="button" className="button-wrap">
    <div className="button-content">
      <div className="button-layout">
        <div className="button-text">Button Label</div>
        <div className="button-icon">
          <div className="icon-slot">
            <div className="icon-slot">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 17" fill="none" aria-hidden="true">
                <g clipPath="url(#clip0_button)">
                  <path d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z" fill="currentColor" />
                </g>
                <defs>
                  <clipPath id="clip0_button">
                    <rect width="16" height="16" fill="currentColor" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </button>
</div>
```

**Color & state spec (from `allfireservices.css` / `responsive.css`):**

| State | Background | Border | Text color |
|---|---|---|---|
| Default | `#FB5614` (brand orange) | `1px solid #FB5614` | `#ffffff` |
| Hover | `#FC0403` (brand red-dark) | `1px solid #FC0403` | `#ffffff` |
| Active | `#666` (neutral) | `1px solid #666` | `#ffffff` |
| Focus ring | `box-shadow: 0 0 0 2px #fff, 0 0 0 4px #FB5614` | — | — |

**Dimensions & layout:**
- `border-radius: 0.5rem` (8px)
- `padding: 1em 1.25em`
- `min-height: 44px` (touch target)
- Layout: `display: inline-flex; justify-content: space-between; align-items: center; gap: 1.5em`
- Icon: `aspect-ratio: 1; width: 1rem; padding: 0`
- Transitions: `transition: all .3s`

**Size variants:**
- `data-wf--button--size="large"` — default
- `data-wf--button--size="small"` — `font-size: .8rem` (used on the "View all services" button)

**Center the button** with `className="button-group"` and `style={{ width: '100%', justifyContent: 'center' }}`.

### 6.1. Home Hero Video Section
**Description:** Massive visual hero with autoplaying background video, dark gradient overlays, and dynamic gradient text.
```tsx
<div className="hero-and-cards-wrapper" style={{ position: 'relative', width: '100%', zIndex: 10 }}>
  <video className="shared-bg-image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} autoPlay loop muted playsInline poster="/fallback.jpg">
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>

  <div className="dark-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }} />

  <div className="fade-overlay" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, transparent, #ffffff)', zIndex: 2 }} />

  <div className="hero-container" style={{ position: 'relative', zIndex: 3 }}>
    <div className="padding-global">
      <div className="container-large">
        <div className="padding-section-large text-center">
          <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            Welcome to All Fire Services
          </div>

          <h1 style={{ fontSize: 'clamp(4.25rem, 9vw, 8.5rem)', color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>FIRE PROTECTION</span>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SYDNEY
            </span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 6.2. Pre-FAQ Gradient CTA (`PreFaqCTA`)
```tsx
<section className="pre-faq-cta" style={{ background: '#ffffff', padding: 'clamp(3rem, 7vw, 6rem) 1.25rem 2rem' }}>
  <div className="pre-faq-cta-card" style={{
    background: 'radial-gradient(circle at 48% 10%, rgba(254, 175, 4, 0.38), transparent 28%), radial-gradient(circle at 12% 18%, rgba(252, 4, 3, 0.28), transparent 32%), linear-gradient(135deg, #fc0403 0%, #fb5614 43%, #feaf04 100%)',
    borderRadius: '1.5rem',
    boxShadow: '0 2rem 4.5rem rgba(17, 17, 17, 0.16)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '71rem',
    padding: 'clamp(2rem, 5vw, 4.5rem)',
    textAlign: 'center'
  }}>
    <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 4rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>
      Ready to raise your fire safety standard?
    </h2>
  </div>
</section>
```

### 6.3. FAQ Accordion (`FAQ.tsx`)
- Uses `#F9FAFB` background.
- Rounded `2rem` border, plus/minus icons, framer-motion height animation.

---

# 7. Component Blueprints — About Page

### 7.1. About Page Hero Section
```tsx
<header style={{ position: 'relative', marginTop: '-12rem', paddingTop: '12rem', marginBottom: '-2px' }}>
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Image src="/your-image.jpg" alt="Hero Background" fill style={{ objectFit: 'cover' }} priority fetchPriority="high" quality={60} sizes="100vw" />
  </div>
  {/* Overlays */}
  <div className="about-dark-overlay"></div>
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(30,5,5,0.35) 40%, rgba(70,10,10,0.15) 70%, transparent 100%)', mixBlendMode: 'multiply' }}></div>
  <div className="about-fade-overlay"></div>

  <div className="padding-global" style={{ position: 'relative', zIndex: 3 }}>
    <div className="container-large">
      <div className="padding-section-large is-about about-hero-inner">
        <div className="hero_content-wrapper flex flex-col md:flex-row text-center md:text-left">
          <div className="hero_content-left flex flex-col items-center md:items-start w-full md:w-auto">
            <div className="header-eyebrow-text hide-desktop mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>About All Fire Services</div>
            <h1 className="mx-auto md:mx-0 text-center md:text-left w-full" style={{ fontSize: 'clamp(2rem, 5vw, 5.5rem)', color: '#ffffff', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>ABOUT ALLFIRE</span>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                SERVICES SYDNEY
              </span>
            </h1>
          </div>
          <div className="hero_content-right flex flex-col items-center md:items-start pb-[8rem] md:pb-0">
            <div className="header-eyebrow-text hide-tablet mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>About All Fire Services</div>
            <p className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Subtitle copy...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
```

#### About Hero Overlays (must include in any page with this pattern)
```css
.about-dark-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to bottom,
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55%;
  background: linear-gradient(to bottom,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.01) 8%,
    rgba(255,255,255,0.03) 16%,
    rgba(255,255,255,0.07) 24%,
    rgba(255,255,255,0.13) 32%,
    rgba(255,255,255,0.22) 40%,
    rgba(255,255,255,0.34) 49%,
    rgba(255,255,255,0.49) 57%,
    rgba(255,255,255,0.64) 65%,
    rgba(255,255,255,0.78) 73%,
    rgba(255,255,255,0.89) 81%,
    rgba(255,255,255,0.96) 89%,
    #ffffff 95%,
    #ffffff 100%
  );
  z-index: 2;
}

@media (max-width: 767px) {
  .about-hero-inner { padding-top: 6rem !important; padding-bottom: 32rem !important; }
  .about-dark-overlay {
    background: linear-gradient(to bottom,
      rgba(10,10,10,0.88) 0%,
      rgba(20,5,5,0.82) 50%,
      rgba(30,5,5,0.72) 75%,
      rgba(40,8,8,0.55) 90%,
      rgba(50,8,8,0.25) 96%,
      rgba(255,255,255,0) 100%
    ) !important;
  }
  .about-fade-overlay { height: 220px !important; }
}
```

### 7.2. Standard Alternating Grid (Image + Text)
The most-used section pattern across About and Our Clients.

```tsx
import styles from "@/components/HomeStoryLegacy.module.css";

<div className={`${styles.newStoryGrid} ${isImageFirst ? styles.newStoryGridImageFirst : ''}`} style={{ marginBottom: '14rem', alignItems: 'stretch' }}>

  {/* Image */}
  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
    <Image src="/image.jpg" alt="Description" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
  </div>

  {/* Text */}
  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <header className={styles.storyHeaderLeft} style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}>
      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>KICKER</p>
      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
        {/* 2-line heading pattern here */}
      </h2>
    </header>
    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ marginBottom: '1.5rem' }}>
      Paragraph text...
    </p>
  </div>
</div>
```

### 7.3. Floating Mission Box
```tsx
<div style={{
  marginTop: '10rem',
  backgroundColor: '#ffffff',
  padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(1.25rem, 3vw, 2.5rem)',
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.03)',
  border: '1px solid rgba(0, 0, 0, 0.05)'
}}>
  <div className={styles.newStoryGrid} style={{ margin: 0, maxWidth: 'none', alignItems: 'stretch' }}>
    {/* same alternating grid as 7.2 */}
  </div>
</div>
```

### 7.4. Inner Padding / Margins Standard for Alternating Grid (MANDATORY)
```tsx
// Outer grid (matches OUR STORY margins)
gridTemplateColumns: '1fr 0.62fr'
gap: 'clamp(6rem, 10vw, 10rem)'
alignItems: 'center'  // desktop only
padding: '0 clamp(2rem, 5vw, 6rem)'   // critical for visual symmetry

// Mobile fallback (≤991px): stack, gap 4rem, centered
gridTemplateColumns: '1fr'
gap: '4rem'
```

---

# 8. Component Blueprints — Our Clients Page

### 8.1. Client Logo Grid (`ClientGrid.tsx`)
```tsx
import styles from "@/components/HomeStoryLegacy.module.css";

<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
  {/* Left Column: Text */}
  <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left">
    <p style={{ color: '#fb5614', fontWeight: 600 }}>TRUSTED BY</p>
    <h2 style={{ fontSize: 'clamp(2.8rem, 5.8vw, 4.5rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92, textWrap: 'balance' }}>
      Greater Sydney's<br />
      <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Property Managers
      </span>
    </h2>
  </div>

  {/* Right Column: Logos */}
  <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 items-center justify-items-center">
    {clients.map((client, index) => {
      let filterClass = "filter brightness-0 opacity-90";
      let blendMode = {};
      if (client.className === "has-bg") {
        filterClass = "filter grayscale contrast-125 opacity-90";
        blendMode = { mixBlendMode: 'multiply' };
      }
      return (
        <div key={index} className="flex items-center justify-center w-full h-16 md:h-20 px-4">
          <Image src={client.src} alt={client.name} width={client.width} height={client.height} className={`w-auto h-full max-w-full object-contain ${filterClass}`} style={blendMode} />
        </div>
      );
    })}
  </div>
</div>
```

### 8.2. Handshake Testimonials Header (legacyHeader style)
```tsx
import styles from "@/components/HomeStoryLegacy.module.css";

<header className={styles.legacyHeader} style={{ marginTop: 0, marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
  <p className={styles.kicker}>TESTIMONIALS</p>
  <h2 id="legacy-title" style={{ maxWidth: '14ch' }}>Hear from<br />
    <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      our clients
    </span>
  </h2>
  <p>Subtitle copy</p>
</header>
```

### 8.3. AboutClients Feature Grid (uses newStoryGrid)
```tsx
<div className={`${styles.newStoryGrid} ${isImageFirst ? styles.newStoryGridImageFirst : ''}`} style={{ marginBottom: idx === sections.length - 1 ? '4rem' : '10rem', alignItems: 'stretch' }}>

  <div className={`relative w-full h-full min-h-[300px] max-h-[440px] rounded-[1.5rem] overflow-hidden m-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] ${!isImageFirst ? 'lg:order-2 order-1' : 'order-1'}`}>
    <Image src={section.image} alt={section.altTitle} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
  </div>

  <div className={`${styles.newStoryContent} ${!isImageFirst ? 'lg:order-1 order-2' : 'order-2'}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <header className={styles.storyHeaderLeft} style={{ marginTop: 0, marginBottom: '1.5rem', maxWidth: 'none', width: '100%' }}>
      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase', color: '#feaf04', fontWeight: 800 }}>{section.kicker}</p>
      <h2 style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, color: '#111111', lineHeight: 0.94, letterSpacing: '-0.04em' }}>
        {/* 2-line heading with explicit <br /> */}
        Line One<br />
        <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Line Two (gradient)
        </span>
      </h2>
    </header>
    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ marginBottom: '1.5rem' }}>
      {section.description}
    </p>
  </div>
</div>
```

---

# 9. Mobile, Tablet & Responsive Rules (MANDATORY)

**Every section you create or edit MUST be verified on these breakpoints:**

| Breakpoint | Range | Strategy |
|---|---|---|
| `xs` | 0–479px | Stack everything. Center text. Reduce padding. |
| `sm` | 480–767px | Stack. Center. Slight breathing room. |
| `md` (tablet) | 768–991px | May show 2-column grids if explicitly designed. Most text still centered. |
| `lg` (small desktop) | 992–1199px | 2-column grids active. Text left-aligned. |
| `xl` (desktop) | 1200–1439px | Full design. |
| `2xl` (wide) | 1440px+ | Same as xl, more whitespace. |

### Minimum Supported Width
**320px.** Always verify layouts work at 320px (iPhone SE, small Android). Text must not overflow. Buttons must be tappable.

### Standard Breakpoint Media Queries (Tailwind aligned)

```css
/* Mobile-first base styles apply to all viewports */

/* Tablet up: 768px */
@media (min-width: 768px) { /* ... */ }

/* Desktop: 992px */
@media (min-width: 992px) { /* ... */ }

/* Wide: 1200px */
@media (min-width: 1200px) { /* ... */ }

/* Mobile-specific overrides: 767px and below */
@media (max-width: 767px) { /* ... */ }
```

### Rules That MUST Be Applied on Every Section

1. **Stack on mobile.** Any `flex-row` / `grid-cols-2` becomes `flex-col` / single column on mobile.

   ```tsx
   <div className="flex flex-col md:flex-row ...">
   <div className="grid grid-cols-1 md:grid-cols-2 ...">
   ```

2. **Center text on mobile.** Use `text-center md:text-left` or `items-center md:items-start` patterns.

   ```tsx
   <h2 className="mx-auto md:mx-0 text-center md:text-left">
   <p className="text-center md:text-left">
   <div className="flex flex-col items-center md:items-start">
   ```

3. **Headings scale with `clamp()`.** Never use a fixed `fontSize`. Use `clamp(min, vw, max)` so headings resize smoothly.

   ```tsx
   fontSize: 'clamp(2rem, 4.8vw, 5.2rem)'
   ```

4. **Image min-heights must collapse on mobile.** `min-height: 300px` is fine on desktop but should drop on mobile.

   ```tsx
   <div className="min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
   ```

5. **Touch targets ≥ 44×44px.** All buttons, links, and clickable cards must meet this minimum on touch viewports. Use `min-h-[2.75rem]` or similar.

6. **Horizontal scroll must be impossible.** Test at 320px. Use `overflow-x: hidden` on section roots if needed. Avoid fixed widths.

7. **Margin/padding should be fluid.**

   ```tsx
   paddingTop: 'clamp(2.5rem, 5vw, 6rem)'
   marginBottom: 'clamp(3rem, 5vw, 6rem)'
   ```

8. **The `.newStoryGrid` class must be paired with these styles.** Without them, the layout breaks at mobile breakpoints:

   ```css
   @media (max-width: 991px) {
     .newStoryGrid {
       grid-template-columns: 1fr !important;
       gap: 4rem !important;
       padding: 0 1.5rem !important;
     }
     .newStoryGridImageFirst {
       grid-template-columns: 1fr !important;
       padding: 0 1.5rem !important;
     }
   }
   ```

9. **Hide desktop-only elements on mobile, and vice versa.** Use:
   - `hide-desktop` / `hide-tablet` (defined in CSS for hero eyebrow text)
   - Or Tailwind: `hidden md:block`, `md:hidden`

10. **Don't use `whitespace-nowrap` on long text on mobile.** It will overflow. Either hide on small screens or allow wrapping.

11. **The 2-line heading must not break across more than 2 lines on mobile.** If the line 1 text is too long, use `text-wrap: balance` or shorter copy.

### Mobile Verification Checklist (Run Before Approving Any Section)

- [ ] At 320px: nothing overflows the viewport horizontally.
- [ ] At 375px (iPhone): layout is centered, text is readable, buttons are tappable.
- [ ] At 768px (tablet portrait): section adapts cleanly. Headings still readable.
- [ ] At 1024px (tablet landscape): 2-column grids activate if applicable.
- [ ] At 1440px (desktop): full design renders correctly.
- [ ] The gradient line is always on line 2 — never split awkwardly.
- [ ] All images have `object-fit: cover` and reasonable `sizes` attribute.
- [ ] All interactive elements meet 44×44px touch target.

### Common Pitfalls to Avoid

- **Forgetting `mx-auto md:mx-0`** on a heading → heading stays left-aligned on mobile and looks broken.
- **Using `text-left` everywhere** → text hugs the left edge of small screens, looks ugly.
- **Setting `min-height` on image containers** → image is forced taller than its content on mobile.
- **Hardcoding font sizes** like `fontSize: '4rem'` → doesn't scale between 320px and 1440px.
- **Forgetting the gradient fallback color** → if WebKit clip-text fails (e.g., in older browsers), the text becomes invisible. Always pair `WebkitTextFillColor: transparent` with a fallback `color: '#111111'` on the parent.
- **Not using `<br />` in 2-line headings** → gradient line might wrap unpredictably across narrow viewports.

---

# 10. Website Content, Wording & Page Principles

This section defines how content should be written, structured, simplified, and presented across the entire All Fire Services website.

Use these principles for:

- Home
- About / Our Story
- Services
- Individual service pages
- Who We Serve
- Strata
- Commercial
- Property Management
- Fire Safety Statement pages
- Contact
- Clients
- Industry pages
- Future pages added to the website

The goal is for every page to feel like it belongs to the same business.

---

## 10.1. The Most Important Rule

Every page must have **one clear job**.

Do not try to explain the entire company on every page.

Ask: *What does someone need to understand on this page?* Then give them exactly that.

Do not overload the page with information that belongs somewhere else.

---

## 10.2. Sell First. Explain Second.

The website should communicate value quickly.

Visitors should be able to understand the page within a few seconds.

Start with:
- What the page is about
- Who it is for
- What All Fire Services can do
- Why the visitor should trust the company

Then provide supporting information.

Do not begin pages with long company history or generic marketing language.

---

## 10.3. Keep Wording Short and Practical

Prefer:

> Fire protection for strata and residential buildings across Greater Sydney.

Over:

> We are passionately committed to providing unparalleled, comprehensive and industry-leading fire protection solutions to a wide variety of residential property environments.

Use:
- Short paragraphs
- Strong headings
- Direct sentences
- Specific language
- Natural Australian business English

Avoid:
- Long corporate paragraphs
- Excessive adjectives
- Generic AI wording
- Repeating the same benefit several times
- Trying to make every sentence sound dramatic

---

## 10.4. Sound Experienced, Not Overhyped

All Fire Services should sound:
- Professional
- Experienced
- Practical
- Reliable
- Direct
- Approachable
- Responsible
- Knowledgeable

It should NOT sound:
- Overly luxurious
- Overly salesy
- Corporate for the sake of sounding corporate
- AI-generated
- Dramatic without evidence

Avoid phrases such as:

> Unparalleled excellence

> Revolutionary solutions

> World-class innovation

> Industry-leading excellence

> Unmatched expertise

unless the company can genuinely prove the claim.

Use practical confidence instead. Example:

> Practical fire protection backed by experienced professionals.

---

## 10.5. Each Page Should Answer Three Questions

Every important page should quickly answer:

1. **What is this?**
2. **Why does it matter?**
3. **What does All Fire Services do about it?**

---

## 10.6. Use Simple Page Headings

Page titles should immediately tell visitors where they are.

Good:
- Annual Fire Safety Statements
- Fire Alarm & Detection Systems
- Fire Doors
- Fire Extinguishers
- Who We Serve
- Our Story
- Fire Protection for Strata

Avoid vague titles like:
- Protecting Tomorrow
- Your Safety Journey
- Building Confidence
- Beyond Compliance

(These can occasionally work as supporting headlines, but not as the main page identification.)

---

## 10.7. Use Eyebrows to Provide Context

The small eyebrow text above a heading should help identify the section.

Examples:
- `OUR SERVICES` → `Complete Fire Protection`
- `WHO WE SERVE` → `Strata & Residential Buildings`
- `OUR STORY` → `Fire Protection Runs in Our Blood`
- `COMPLIANCE` → `Annual Fire Safety Statements`
- `EXPERIENCE` → `Built on Real Experience`

Keep eyebrows short — usually 1–4 words.

---

## 10.8. Headlines Should Say Something

Avoid headings that simply repeat the page name.

Use:
- `FIRE EXTINGUISHERS` → `Ready When They Are Needed`
- `FIRE EXTINGUISHERS` → `Inspection, Testing & Maintenance`

The headline should add meaning.

---

## 10.9. Do Not Repeat the Same Message

If a message has already been established, do not keep explaining it.

If the page already says:

> Fire Protection Runs in Our Blood

you do not need another section immediately afterward saying "A Family Legacy of Fire Protection" / "Generations of Fire Protection" / "More Than a Century of Firefighting History".

Choose the strongest version and move on.

---

## 10.10. Information Belongs on the Right Page

### HOME
Sell the company. Main value proposition, trust indicators, short legacy teaser, main services, who the company serves, clients, testimonials, CTA. Do NOT tell the complete company story.

### OUR STORY
Tell the company and family story. Family firefighting legacy, 1911 history, original family photographs, All Fire Services established in 2009, Peter as current owner, team philosophy, mission, experience, standards.

### SERVICES
Explain what All Fire Services does. The 12 core services, short descriptions, links to individual service pages.

### INDIVIDUAL SERVICE PAGE
Explain one service properly. What it is, what All Fire Services provides, why it matters, relevant standards, process, who needs it, CTA.

### WHO WE SERVE
Strata & Residential, Commercial, Offices, Retail, Industrial, Property Management, Facilities Management, Education, Healthcare, Hospitality.

---

## 10.11. Services vs Who We Serve

- **SERVICES = WHAT WE DO** (AFSS, Fire Panels, Smoke Detection, Fire Doors, etc.)
- **WHO WE SERVE = WHERE / WHO WE DO IT FOR** (Strata, Commercial, Property managers, etc.)

Do not mix the two.

---

## 10.12. Start with the Customer's Problem

On service and industry pages, don't immediately talk about All Fire Services. Start with what matters to the visitor.

Example:

> Managing fire safety across common property involves ongoing inspections, testing, maintenance and compliance responsibilities.

Then introduce the company:

> All Fire Services works with strata managers, owners corporations and building managers across Greater Sydney to keep essential fire safety systems maintained and compliant.

---

## 10.13. Avoid "We Provide Comprehensive Solutions"

This wording is generic. Say what the business actually does:

> We inspect, test, maintain and certify essential fire safety systems across Greater Sydney.

Specific beats generic.

---

## 10.14. Use "Practical" Often, But Not Everywhere

Good phrases:
- Practical fire protection
- Practical advice
- Practical support
- Practical fire safety services
- Practical knowledge

Rotate with: Reliable, Professional, Responsive, Experienced, Straightforward, Dependable.

---

## 10.15. Compliance Should Not Be the Only Message

Connect compliance with the real reason it exists.

Use:

> Protect people, property and operations while meeting your fire safety responsibilities.

or

> Keep essential systems maintained, compliant and ready when they are needed.

The site should communicate **Compliance + Protection**, not compliance alone.

---

## 10.16. Core Wording Themes

These should appear naturally throughout the website:
- Protecting People
- Protecting Property
- Practical Fire Protection
- Professional Service
- Reliable Support
- Real-World Experience
- Compliance
- Responsibility
- Fire Safety
- Australian Standards
- Greater Sydney
- Serving & Retired Professional Firefighters
- Family Firefighting Legacy

Do not force all of them onto every page.

---

## 10.17. Be Careful with Firefighter Claims — CRITICAL

Peter Tricklebank is NOT a firefighter.
Peter is NOT the founder.

Never imply otherwise. Do not write:
- Former firefighter Peter Tricklebank
- Firefighter and owner Peter Tricklebank
- Founder Peter Tricklebank
- Peter founded All Fire Services
- Peter spent decades fighting fires

Instead:

> Peter Tricklebank is the current owner of All Fire Services.

When discussing firefighter experience, attribute it to family members or team members.

---

## 10.18. Keep 1911 and 2009 Separate

- **1911** = Tricklebank family firefighting legacy
- **2009** = All Fire Services established

Never say:

> All Fire Services has been operating since 1911.

> Over 100 years of All Fire Services experience.

Correct wording:

> A family firefighting legacy dating back to 1911 and an Australian-owned fire protection business established in 2009.

---

## 10.19. Use the Family Story as Proof, Not the Whole Sales Pitch

On pages outside Our Story, references should usually be short.

Example:

> Backed by a family firefighting legacy dating to 1911.

That's enough. You don't need the entire timeline on a Fire Doors page.

---

## 10.20. Do Not Call Everything "A Legacy"

Use "legacy" strategically.

Good:

> A Family Firefighting Legacy Since 1911

Not:
- A Legacy of Fire Doors
- A Legacy of Compliance
- A Legacy of Inspections

Overusing the word weakens it.

---

## 10.21. Write for Property Managers and Building Decision-Makers

Common audiences:
- Property managers
- Strata managers
- Owners corporations
- Building managers
- Facilities managers
- Business owners
- Commercial property owners
- Building operators

They usually want to know:
- What needs to be done?
- Can you handle it?
- Are you reliable?
- Do you understand compliance?
- Can you help keep my building safe?
- How quickly can I contact you?

---

## 10.22. Do Not Over-Explain Technical Information

Explain enough for the visitor to understand the service. Then provide technical detail where useful.

Bad:
> In accordance with various applicable legislative frameworks...

Better:
> We inspect and maintain fire safety systems in line with relevant Australian Standards and building requirements.

---

## 10.23. Do Not Invent Australian Standards

If a service references an Australian Standard: **VERIFY IT.** Do not guess.

---

## 10.24. Use "Greater Sydney" Consistently

Preferred: **Greater Sydney**

Use NSW only when the context genuinely covers NSW more broadly.

---

## 10.25. Call To Action Wording

Good: `Get a Quote`, `Contact Our Team`, `Talk to Our Team`, `Get Started`, `Request a Fire Safety Assessment`, `Learn More`, `View Service`

Avoid: `Begin Your Safety Journey`, `Discover Excellence`, `Experience the Difference`, `Unlock Your Fire Protection Potential`

Keep it practical.

---

## 10.26. Service Page Writing Formula

1. **EYEBROW** — Service category.
2. **H1** — Exact service.
3. **INTRO** — 2–3 sentences: what it is, why it matters, what All Fire Services provides.
4. **WHY IT MATTERS** — Explain the risk/responsibility.
5. **WHAT WE DO** — List actual service activities.
6. **COMPLIANCE / STANDARDS** — Relevant verified requirements.
7. **WHO NEEDS IT** — Building/property types.
8. **WHY ALL FIRE SERVICES** — Short proof.
9. **CTA** — Clear next action.

Do not automatically create ten sections if the service is simple.

---

## 10.27. Who-We-Serve Page Formula

1. **EYEBROW** — `WHO WE SERVE`
2. **H1** — Property type.
3. **INTRO** — Fire-safety responsibilities for that property type.
4. **HOW WE HELP** — How All Fire Services supports them.
5. **RELEVANT SERVICES** — Most useful services for that property.
6. **WHY ALL FIRE SERVICES** — Brief proof.
7. **CTA** — Talk to the team / request a quote.

---

## 10.28. Keep Paragraphs Short

Aim for 2–4 sentences per paragraph. Especially on mobile.

---

## 10.29. Use Bold Sparingly

Bold only the message that matters. Don't bold every third word.

---

## 10.30. Don't Use Quotation Marks Around Every Heading

Quotes can work for a meaningful brand statement ("Fire Protection Runs in Our Blood") but don't write every heading as a quote. Avoid "Always Learning" / "Excellence in Fire Protection" / "Built on Experience" / "Your Safety Matters" as quoted headings.

Use normal headings for most sections.

---

## 10.31. Don't Use Too Many Slogans

Each page does not need five slogans. Choose one main message:
- About → *Fire Protection Runs in Our Blood*
- Services → *Complete Fire Protection*
- Who We Serve → *Protecting Buildings Across Greater Sydney*

Then support those messages with useful information.

---

## 10.32. Remove Content When It Isn't Helping

Ask: *Does this help the visitor understand, trust, or act?* If no — REMOVE IT.

---

## 10.33. Layout May Change To Support Better Content

Content comes first. If removing unnecessary wording creates empty space, adjust the layout. Do not redesign for no reason. But don't keep a bad layout simply because it already exists.

---

## 10.34. Use Images That Actually Match The Business

Images should be:
- Australian where location matters
- Relevant to fire protection
- Realistic and professional
- Consistent with All Fire Services

Avoid American firefighters, US-style fire engines, overseas uniforms, generic AI firefighters, unrelated stock images.

For family history, use original family images.

---

## 10.35. Consistent Brand Voice

> We understand fire protection. We take the responsibility seriously. We explain things clearly. We do the work properly.

---

## 10.36. Core Brand Message

> All Fire Services provides practical, reliable fire protection across Greater Sydney, backed by professional technical knowledge, experienced people and a family firefighting legacy dating back to 1911.

Do NOT paste this exact sentence everywhere. Use it as the underlying idea.

---

## 10.37. Page-By-Page Content Test

Before approving any new page, ask:

- Does the first screen clearly identify the page?
- Can someone understand what All Fire Services offers within seconds?
- Is any information being repeated?
- Does anything belong on another page?
- Is the wording practical rather than overly promotional?
- Are all factual claims accurate?
- Are 1911 and 2009 used correctly?
- Is Peter described accurately?
- Are firefighter claims attributed to actual firefighters?
- Are standards verified?
- Does the page lead naturally toward an action?
- Does it feel visually and verbally like All Fire Services?

If yes — the page is ready.

---

## 10.38. Final Writing Principle

When deciding between **more wording** and **clearer wording** → choose clearer wording.
When deciding between **more sections** and **a simpler page** → choose the simpler page.
When deciding between **an impressive-sounding claim** and **an accurate claim** → choose the accurate claim.
When deciding between **explaining everything** and **giving the visitor what they need on that page** → give them what they need.

The overall website should feel:
- **Simple enough to understand quickly.**
- **Detailed enough to build trust.**
- **Professional enough to represent a serious fire-safety company.**
- **Consistent enough that every page clearly belongs to All Fire Services.**

---

# 11. Conclusion

Whenever a new page, section, or component is being created:

1. **Lift the component structure** directly from the matching blueprint in Sections 6, 7, or 8.
2. **Apply the 2-line heading system** from Section 4 to every section heading.
3. **Verify mobile/tablet responsiveness** against the rules in Section 9.
4. **Follow the content principles** in Section 10.
5. Replace the content, images, and text — but **leave the classNames, `style={{}}` inline attributes, typography scales, and structures untouched** to ensure perfect visual consistency across the platform.

If any of the above rules conflict with the existing code, **the rules in this document take precedence** unless explicitly overridden by the user.
