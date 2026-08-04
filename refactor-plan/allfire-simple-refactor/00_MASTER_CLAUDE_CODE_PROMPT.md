# All Fire Services Website Simplification and Refactor

You are Claude Code working inside the existing All Fire Services website repository.

Your job is to refactor the current website into a cleaner, faster, more focused experience that feels professional, trustworthy, and distinctly aligned with the All Fire Services brand.

Do not create a new unrelated design. Improve the existing codebase and preserve working integrations, forms, SEO data, contact details, and authentic assets wherever they remain useful.

## Main business goal

Create a polished demo that gives an immediate sense of trust and professionalism to Generation X and Baby Boomer business owners, strata managers, building owners, and facilities decision-makers.

The site must communicate its value within seconds:

- Firefighter-founded expertise
- Practical, approachable service
- Real family history in the fire industry
- Reliable fire safety and compliance support
- Australian owned and operated
- Clear paths to request a quote or explore services

The result should feel simple, confident, calm, and impactful. It must not feel like a template, an AI-generated concept, or an over-designed agency portfolio.

## Read these files first

Read and follow every Markdown file in this folder before changing code:

1. `01_LIVE_SITE_AUDIT.md`
2. `02_BRAND_DESIGN_SYSTEM.md`
3. `03_GLOBAL_REFACTOR_RULES.md`
4. `04_HEADER_SECTION.md`
5. `05_HERO_SECTION.md`
6. `06_OUR_STORY_SECTION.md`
7. `07_GENERATIONS_SECTION.md`
8. `08_WHY_ALL_FIRE_SECTION.md`
9. `09_OUR_CLIENTS_SECTION.md`
10. `10_OUR_SERVICES_SECTION.md`
11. `11_VIDEOS_SECTION.md`
12. `12_CTA_SECTION.md`
13. `13_FAQ_SECTION.md`
14. `14_LOCATION_SECTION.md`
15. `15_CONTACT_SECTION.md`
16. `16_FOOTER_SECTION.md`
17. `17_CORE_PAGES_AND_ROUTES.md`
18. `18_RESPONSIVENESS_ACCESSIBILITY_PERFORMANCE.md`
19. `19_COPY_LIBRARY.md`
20. `20_ACCEPTANCE_CHECKLIST.md`

## Required homepage order

The homepage must use this order:

1. Header
2. Hero
3. Our Story
4. The Generations Behind All Fire Services
5. Why All Fire
6. Our Clients
7. Our Services
8. Videos
9. CTA
10. FAQs
11. Our Location
12. Contact
13. Footer

Do not add extra homepage sections without a clear business reason.

## Core pages for the demo

Focus on these user-facing routes:

- `/` — Home
- `/about` — nav label: Our Story
- `/our-clients` — nav label: Our Clients

Contact can remain a homepage section and may also keep the existing `/contact` route when already functional.

Hide non-core pages from the primary navigation and demo flow. Do not permanently delete useful source files. Preserve them in the repository unless they are confirmed dead code. Remove them from the sitemap or mark them `noindex` only when appropriate for the temporary demo state.

## Client-requested removals

Remove or replace all of the following:

- AI-generated or fake industrial images
- The “Welcome” strapline
- Complex zoom, slide-up, parallax, reveal, or scroll-jacking effects
- Interfaces that require several clicks before users reach important information
- Incorrect claims such as “17 years of experience since 2009”
- Cramped card grids and excessive boxed layouts
- Duplicate sections or repeated marketing messages
- Repeated client logo marquees that create visual noise
- Placeholder testimonials, fake people, or invented client quotes
- Generic copy that sounds like a template or unrelated industry site
- Text such as “Engineered for durability and designed for comfort” when it does not match fire safety services

## Content that must remain

Preserve these sections and their purpose:

- The Generations Behind All Fire Services
- CTA
- FAQs
- Our Location
- Contact

For those sections, preserve verified content and working functionality. You may simplify spacing, typography, backgrounds, and visual treatment so they match the new system. Do not rewrite verified factual details without a source of truth.

## Hero copy

Use this exact content as the main hero foundation:

**Eyebrow**
Reliable fire safety starts here

**Headline**
Fire safety is not a box to tick, it's a responsibility

**Supporting copy**
High-level professional fire safety services, delivered by people who are approachable, practical and reasonable. Australian owned and operated since 2009.

**Primary CTA**
Get a Quote

**Secondary CTA**
Explore Our Services

You may add one short supporting trust line, but it must not compete with the headline.

## Our Story copy

Use this content:

**Eyebrow**
Our story

**Heading**
Founded by a firefighter

**Body paragraph 1**
All Fire Services is an Australian owned and operated business, created by a former NSW Fire Brigades Senior Officer in December 2009.

**Body paragraph 2**
The company was founded on a simple idea: that our customer service technicians should be professional firefighters, both serving and retired. It means every client gets extensive, real-life knowledge of the fire safety industry rather than a checklist.

**CTA**
Read our full story

## Strong brand messages

Use these strategically, not all at once:

- Fire protection runs in our blood.
- Founded by firefighters.
- Real experience. Practical protection.
- Protecting people. Protecting property.
- More than compliance. Confidence when it matters.
- Firefighter-founded. Sydney-focused.
- Clear advice. Reliable service. Safer buildings.

Avoid stacking multiple slogans in one viewport.

## Asset rules

Before coding:

1. Audit `/public`, image imports, Canva exports, logos, staff photos, family photos, team photos, client logos, badges, and service icons.
2. Create an asset inventory with filename, dimensions, format, likely use, and whether it appears authentic.
3. Use only authentic staff, family, property, equipment, and client assets already supplied by the business.
4. Do not generate or download new AI imagery.
5. Do not use random external stock photos.
6. If no suitable hero photograph exists, build a strong typographic hero with subtle brand graphics and reserve an obvious slot for the upcoming real image.
7. Use the latest All Fire Services logo supplied in the codebase or Canva exports. Remove old logo variants from rendered pages.

## Design direction

Translate the supplied references into these principles:

- Spacious white and warm off-white backgrounds
- Strong black typography
- One dominant message per section
- Large real imagery with generous rounded corners
- Minimal, purposeful cards
- Simple client logo grid with plenty of breathing room
- Strong dark footer with restrained oversized branding
- Small, intentional use of orange, red, and yellow
- Clean horizontal rhythm and consistent page width
- No direct copying of another website’s content, exact layout, or branding

## Work process

### Phase 1: Audit

- Inspect the framework, routing, component structure, styling method, fonts, animations, dependencies, forms, analytics, SEO, and image handling.
- Identify duplicated sections and components.
- Identify every route currently linked in navigation, footer, sitemap, and internal CTAs.
- Identify all inaccurate or placeholder content.
- Record findings in `refactor-plans/ALL_FIRE_SIMPLIFICATION_AUDIT.md`.

### Phase 2: Plan

Create `refactor-plans/ALL_FIRE_SIMPLIFICATION_IMPLEMENTATION_PLAN.md` with:

- Files to change
- Components to retain
- Components to replace
- Components to remove from rendering
- Asset mapping
- Route strategy
- Performance risks
- Accessibility risks
- Ordered implementation tasks

Do not stop after writing the plan. Continue with implementation.

### Phase 3: Build the design system

- Add reusable tokens for colour, spacing, typography, radius, container widths, and focus states.
- Build or refactor shared primitives such as `Container`, `SectionHeader`, `Button`, `LogoGrid`, and media wrappers.
- Keep components focused and maintainable.
- Avoid a single giant homepage component.

### Phase 4: Refactor section by section

Follow the section files in this folder. Complete the homepage in the required order, then update `/about`, `/our-clients`, and `/contact` to use the same system.

### Phase 5: Validate

Run the repository’s actual commands for:

- Install or dependency verification
- Type checking
- Linting
- Unit or integration tests when present
- Production build

Then test:

- Mobile: 360px, 390px, 430px
- Tablet: 768px, 834px, 1024px
- Desktop: 1280px, 1440px, 1920px
- Keyboard navigation
- Form labels and errors
- Reduced motion
- Image loading
- No horizontal overflow
- All links and CTA destinations

## Completion requirements

Do not call the work complete until:

- The homepage contains only the requested sections
- The core routes are visually consistent
- Authentic media replaces fake imagery
- Navigation is simplified
- Important content is visible without unnecessary clicks
- Animations are restrained
- The site builds successfully
- The mobile and tablet layouts are fully usable
- The final implementation passes `20_ACCEPTANCE_CHECKLIST.md`

At the end, provide:

1. Summary of what changed
2. Files created, changed, or removed from rendering
3. Routes hidden or redirected
4. Tests and build commands run
5. Any missing authentic assets or facts that still need client confirmation
