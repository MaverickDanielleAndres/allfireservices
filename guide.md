# ALL FIRE SERVICES FULL CONTENT AND IMAGE MIGRATION INTO THE EXISTING WEBSITE TEMPLATE

This is a complex, full-site content and asset migration task.

The current website already has an approved:

* Component system
* Page structure
* Section composition
* Layout
* Typography
* Spacing
* Responsive behavior
* Animation system
* Scroll effects
* Transitions
* Hover interactions
* Image treatments
* Navigation behavior

## Do not redesign the website.

The current website is the approved visual template.

Your job is to preserve its existing design and behavior while completely replacing its original content, branding, images, page information, and metadata with the supplied All Fire Services content and assets.

The completed website must look and behave like the current template, but every visible piece of content must belong to All Fire Services.

---

# 1. Primary Source of Truth

Use this document as the authoritative source for all website content:

```text
C:\Users\Nexvision\Downloads\allfireservicesuk\allfireservices\ALL_FIRE_SERVICES_PAGE_CONTENT_AND_IMAGE_PLACEHOLDERS.md
```

File reference:

[ALL_FIRE_SERVICES_PAGE_CONTENT_AND_IMAGE_PLACEHOLDERS.md](file;file:///c%3A/Users/Nexvision/Downloads/allfireservicesuk/allfireservices/ALL_FIRE_SERVICES_PAGE_CONTENT_AND_IMAGE_PLACEHOLDERS.md)

This document controls:

* Required pages
* Route names
* Navigation labels
* Page section order
* Headings
* Paragraphs
* Service names
* Lists
* Calls to action
* Contact information
* Business hours
* Forms
* Form labels
* Form placeholders
* Image positions
* Image descriptions
* Video positions
* Map positions
* Iframe positions
* Testimonials
* Campaign content
* Confirmation content
* Legacy pages
* Utility pages
* Footer content

Do not replace this content with generic marketing text.

Do not shorten it.

Do not summarize it.

Do not omit content because a paragraph is long.

Do not select only the content that fits easily into the template.

Every supplied content item must be represented.

---

# 2. Strict Template Preservation Rule

Do not change the current:

* Components
* Component hierarchy
* Component API unless technically necessary
* Section designs
* Section compositions
* Section order within the approved template
* Layout system
* Grid structure
* Container widths
* Content alignment
* Spacing scale
* Typography system
* Font families
* Font sizes
* Font weights
* Line heights
* Border radii
* Shadows
* Image containers
* Image aspect ratios
* Image clipping
* Card styles
* Button styles
* Form styles
* Header design
* Footer design
* Navigation structure
* Navigation animation
* Mobile navigation behavior
* Responsive layout logic
* Breakpoints
* Animation library
* Animation timing
* Animation easing
* Scroll effects
* Scroll-trigger positions
* Parallax behavior
* Sticky behavior
* Reveal effects
* Hover effects
* Page transitions
* Section transitions
* Modal behavior
* Video behavior
* Accordion behavior
* Tab behavior
* Slider behavior
* Carousel behavior
* Existing interaction patterns
* Existing visual rhythm

Do not redesign, simplify, rebuild, modernize, or reinterpret the approved template.

Do not replace working components with newly designed components.

Do not restart the project from scratch.

Do not change the framework.

Do not install a different UI system.

Do not use the required skills as permission to redesign the template.

Only make the minimum technical adjustments needed to:

* Replace content
* Replace assets
* Add missing All Fire Services pages
* Fit longer text
* Fix responsive overflow
* Connect correct routes
* Apply the All Fire Services branding colors
* Maintain accessibility
* Maintain performance

---

# 3. Full Original-Content Removal

Remove all visible content belonging to the original template, including:

* Original company name
* Original logo
* Original brand references
* Original page titles
* Original navigation labels
* Original headings
* Original paragraphs
* Original descriptions
* Original products
* Original product names
* Original services
* Original team members
* Original testimonials
* Original contact details
* Original addresses
* Original email addresses
* Original telephone numbers
* Original calls to action
* Original footer text
* Original copyright
* Original form labels
* Original input placeholders
* Original metadata
* Original Open Graph content
* Original images
* Original videos
* Original alt text
* Original captions
* Original map locations
* Original schema data

Search the entire repository for the old company name, product names, contact details, image names, and content fragments.

No original template content should remain visible after the migration.

The template’s design remains. Its original content does not.

---

# 4. Complete All Fire Services Content Requirement

Every page, section, heading, paragraph, list, CTA, form field, image position, video position, map position, and embed position from:

```text
ALL_FIRE_SERVICES_PAGE_CONTENT_AND_IMAGE_PLACEHOLDERS.md
```

must be included.

Do not:

* Delete content to make sections shorter
* Merge unrelated sections
* Hide text behind truncation
* Use ellipses for required text
* Remove paragraphs on mobile
* Replace detailed copy with a summary
* Convert full content into a few cards
* Omit legacy or campaign routes
* Skip pages not visible in the primary navigation
* Leave temporary template text
* Use lorem ipsum
* Use generic AI-generated filler

Perform a literal page-by-page and section-by-section comparison before declaring completion.

---

# 5. Critical Local Image Requirement

The project already contains All Fire Services images inside `public/`.

These files are not optional placeholders.

Use the corresponding local image on the correct page and in the correct section.

## Critical rules

1. Use every suitable supplied All Fire Services image in its corresponding page or section.
2. Do not leave the original template’s campervan, outdoor, travel, product, factory, fitter, or unrelated imagery.
3. Do not use random external stock images when a matching local image already exists.
4. Do not use one image repeatedly across unrelated sections simply to fill space.
5. Do not place images from one page’s folder onto an unrelated page.
6. Do not leave a placeholder when a matching local asset is already available.
7. Preserve the current template’s image container, reveal, crop, hover, parallax, and responsive behavior.
8. Only replace the source, alt text, caption, and content association.
9. Use `next/image` or the project’s existing optimized image component.
10. Supply correct `sizes`, intrinsic dimensions, and priority behavior.
11. Do not lazy-load the main homepage hero if it damages LCP.
12. Lazy-load below-the-fold gallery and service images.
13. Maintain the image focal point across desktop and mobile.
14. Do not stretch or distort images.
15. Do not change the approved image animation.

---

# 6. Public Asset Path Rules

Because these files are inside `public/`, reference them from the root.

Correct:

```tsx
<Image src="/herosectionimage.webp" alt="..." />
```

Incorrect:

```tsx
<Image src="/public/herosectionimage.webp" alt="..." />
```

For folders containing spaces or special characters, use properly encoded root-relative URLs or define the path in one centralized asset map.

Do not scatter long image paths throughout several components.

Create one typed asset registry, for example:

```ts
export const allFireAssets = {
  logo: "/logo.png",
  secondaryLogo: "/secondlogo.png",
  homepageHero: "/herosectionimage.webp",
} as const;
```

For the folder containing spaces and `&`, use a safe centralized value such as:

```ts
const teamFolder =
  "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT";
```

Do not rename supplied files unless absolutely necessary.

If renaming is required for technical reasons:

* Update every reference
* Keep a clear migration map
* Do not create duplicate unused assets
* Report every renamed file

---

# 7. Required Global Asset Mapping

## Header Logo

Inspect the two logo files and use the correct one based on contrast and visual purpose:

```text
/logo.png
/secondlogo.png
```

Expected mapping:

* Use the main full-colour logo in the standard or light header.
* Use the alternate or inverse logo in dark, transparent, sticky, mobile, or footer states where appropriate.
* Preserve the existing logo container dimensions and header animation.
* Do not replace the logo area with plain text if a usable logo file exists.

## Footer Logo

Use the logo variant that remains legible against the current footer background:

```text
/logo.png
/secondlogo.png
```

Do not redesign the footer to accommodate the logo.

Use the correct logo for the existing footer treatment.

## Homepage Hero

Use:

```text
/herosectionimage.webp
```

for the homepage’s primary hero image or hero background.

Preserve the template’s current:

* Hero structure
* Hero height
* Content positioning
* Overlay
* Crop
* Parallax
* Initial reveal
* Scroll behavior
* Responsive focal point
* Transition timing

Do not use this image as a small card image.

It belongs to the main homepage hero.

## Default Framework SVG Files

The following appear to be default or utility assets:

```text
/file.svg
/globe.svg
/next.svg
/vercel.svg
/window.svg
```

Do not use them as All Fire Services content images.

Remove them from visible template content if they are remnants of the original starter project.

They may remain in `public/` if harmless, but they must not appear on the production website unless an approved existing utility component genuinely requires one.

---

# 8. Homepage Team Section Asset Mapping

The following folder belongs specifically to the homepage section:

```text
public/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/
```

Use these images only for the homepage’s:

```text
WE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT
```

section, team gallery, team carousel, image sequence, or related team content.

## Required files

```text
/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp

/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-peter-1536x2048.webp

/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp

/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp

/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp

/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-with-guildo-scaled-e1759978124384-2048x1536.webp

/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp
```

## Required usage

### Section Banner or Main Team Image

Use:

```text
allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp
```

as the primary wide team or technician image for the section.

### Peter Portrait

Use:

```text
allfire-peter-1536x2048.webp
```

for a portrait-oriented Peter image, team-lead card, founder or spokesperson position, or an existing portrait slot within the template.

Do not crop it into an unusably wide banner if the template already supports a portrait treatment.

### Team Gallery or Carousel

Use all of the following:

```text
allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp

allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp

allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp

allfire-with-guildo-scaled-e1759978124384-2048x1536.webp
```

Place them in the existing template’s:

* Gallery
* Carousel
* Stacked image section
* Team cards
* Horizontal image track
* Editorial image grid

Use the closest existing component.

Do not invent a new gallery design.

### Coffee and Peter Branding Image

Use:

```text
NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp
```

as the section’s supporting brand graphic, coffee image, Pete feature image, or section-ending visual.

## Homepage Team Alt Text

Use meaningful alt text based on the filename and visible people, for example:

* `All Fire Services technicians`
* `Peter from All Fire Services`
* `Peter and Paul from All Fire Services`
* `Sam and Kyriakos from All Fire Services`
* `Sam and Orlando from All Fire Services`
* `All Fire Services team with Guildo`
* `Peter and the All Fire Services coffee team`

Do not use filenames as alt text.

---

# 9. Homepage Fire Protection Services Asset Mapping

The following folder belongs specifically to the homepage:

```text
public/Fireprotectionservicesimage/
```

Use each image with its matching service.

## Exact mapping

### Annual Fire Safety Statement

```text
/Fireprotectionservicesimage/annualfiresafety.webp
```

Use for:

```text
Annual Fire Safety Statement
```

### Emergency Lighting 90-Minute Test

```text
/Fireprotectionservicesimage/emergencylighting90.webp
```

Use for:

```text
EMERGENCY LIGHTING 90-MINUTE TEST
```

### Fire Extinguisher Tagging

```text
/Fireprotectionservicesimage/fireestinguishertagging.webp
```

Use for:

```text
FIRE EXTINGUISHER TAGGING
```

Do not correct or rename the physical filename unless necessary. The displayed text should use the correct spelling.

### Monthly Diesel Pump Inspection

```text
/Fireprotectionservicesimage/monthlydieselpumpprotection.webp
```

Use for:

```text
MONTHLY DIESEL PUMP INSPECTION
```

### Monthly Fire Inspection

```text
/Fireprotectionservicesimage/monthlyfireprotection.webp
```

Use for:

```text
MONTHLY FIRE INSPECTION
```

### Monthly Sprinkler System Inspection

```text
/Fireprotectionservicesimage/monthlysprinkler.webp
```

Use for:

```text
MONTHLY SPRINKLER SYSTEM INSPECTION
```

### Smoke Alarm Test

```text
/Fireprotectionservicesimage/smokealarmtest.webp
```

Use for:

```text
SMOKE ALARM TEST
```

### Yearly Hydrant Flow Test

```text
/Fireprotectionservicesimage/yearlyhydrantflowstate.webp
```

Use for:

```text
YEARLY HYDRANT FLOW TEST
```

## Service-card preservation

Use the existing template’s current card, product tile, service tile, slider item, or image panel.

Preserve:

* Current card dimensions
* Image crop
* Image reveal
* Hover animation
* Link transition
* Text placement
* Card radius
* Card spacing
* Grid behavior
* Mobile behavior

Only replace the original card’s:

* Image
* Heading
* Description
* Link
* Alt text
* Metadata

Every image in this folder must be used once in its corresponding service item unless the current design intentionally duplicates a featured card.

---

# 10. Annual Fire Safety Statement Page Asset Mapping

The following folder belongs specifically to:

```text
/annual-fire-safety-statement/
```

Use these images on the Annual Fire Safety Statement page and its related sections.

## Required files

```text
/annual-fire-safety-statement/all-fire-services-hydrant-flow-test-1.webp

/annual-fire-safety-statement/all-fire-services-hydrant-system-2.webp

/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp

/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp

/annual-fire-safety-statement/fire-truck-all-fire-services.webp

/annual-fire-safety-statement/NEW-COFFE-LOGO-WITH-PETE-scaled.webp
```

## Required usage

### AFSS Hero or Main Introductory Visual

Use:

```text
/annual-fire-safety-statement/fire-truck-all-fire-services.webp
```

as the primary hero or major opening image when its composition fits the existing hero component.

If the existing template’s hero requires a wider banner and another AFSS image is visually more suitable, use the most appropriate AFSS image for the hero, but keep all images within this page.

Do not use the homepage hero image as the AFSS hero when dedicated AFSS assets exist.

### Technician Experience Section

Use:

```text
/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp
```

for:

* Professional firefighter experience
* Technician expertise
* Why choose All Fire Services
* Inspection team content

### Hydrant Flow Test Content

Use:

```text
/annual-fire-safety-statement/all-fire-services-hydrant-flow-test-1.webp
```

for a section discussing:

* Hydrant flow testing
* Essential fire-safety measures
* Inspection
* Testing
* Compliance

### Hydrant System Content

Use:

```text
/annual-fire-safety-statement/all-fire-services-hydrant-system-2.webp
```

for:

* Hydrant systems
* Building fire-safety measures
* Property compliance
* Equipment inspection

### Wide Hydrant Banner

Use:

```text
/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp
```

for a wide image slot, section divider, feature banner, or related content section.

Preserve the current template’s full-width or cinematic image behavior.

### Call Peter or Final CTA

Use:

```text
/annual-fire-safety-statement/NEW-COFFE-LOGO-WITH-PETE-scaled.webp
```

for:

* Call Peter
* Contact All Fire Services
* Final CTA
* Peter feature
* Supporting campaign graphic

Do not leave any AFSS local image unused without a documented reason.

---

# 11. NSW Regulations Page Asset Mapping

The following image belongs specifically to:

```text
13 February 2026 NSW Fire Safety Regulations
```

Use:

```text
/13-feb-2026-nsw-fire-safety-regulations/strata-alert-webp.webp
```

for the page’s:

* Article hero
* Main regulatory alert image
* Featured article image
* Open Graph image
* Social sharing image

Preserve the current article hero layout and image treatment.

Do not use it on unrelated service pages.

Use appropriate alt text such as:

```text
NSW fire safety regulations alert for strata and building owners
```

---

# 12. Strata Page Asset Mapping

The following folder belongs specifically to the Strata page:

```text
public/stratapage/
```

All suitable images in this folder must be used on the Strata page.

Do not move them to unrelated pages.

## Strata community images

```text
/stratapage/1-all-fire-services-welcome-randwick.webp

/stratapage/2-all-fire-services-welcome-enmore.webp

/stratapage/3-all-fire-services-welcome-greenacre.webp

/stratapage/4-all-fire-services-welcome-haberfield.webp

/stratapage/5-all-fire-services-welcome-chippendale.webp

/stratapage/6-all-fire-services-welcome-rockdale.webp

/stratapage/7-all-fire-services-welcome-waterloo.webp

/stratapage/8-all-fire-services-welcome-marrickville.webp

/stratapage/9-all-fire-services-welcome-marrickville.webp

/stratapage/10-all-fire-services-welcome-stanmore.webp

/stratapage/11-all-fire-services-welcome-bondi.webp

/stratapage/12-all-fire-services-welcome-alexandria.webp

/stratapage/30-all-fire-services-welcome-north-sydney.png
```

Use these in the existing template’s:

* Project gallery
* Community carousel
* Property grid
* Location cards
* Service-area gallery
* Horizontal image track
* Stacked scroll gallery
* Case-study card grid

Use the closest matching existing template component.

Keep the order logical and preferably aligned with the filename numbering.

Display suburb labels based on the filenames:

* Randwick
* Enmore
* Greenacre
* Haberfield
* Chippendale
* Rockdale
* Waterloo
* Marrickville
* Stanmore
* Bondi
* Alexandria
* North Sydney

Do not display technical filenames to users.

## Welcome to the Fireman Family images

```text
/stratapage/1welcome-to-fireman-family.png

/stratapage/2welcome-to-fireman-family.png

/stratapage/3welcome-to-fireman-family.png
```

Use these in the Strata page’s:

* Introductory welcome section
* Community proof section
* Trust section
* Supporting gallery
* Stacked cards
* Slider sequence

Do not use them as tiny icons.

They are content images and should receive meaningful visual space.

## Strata hero selection

Inspect the aspect ratios and visual composition.

Use the most suitable Strata image for the existing hero slot.

Preferred approach:

* Use one strong Strata image as the hero or featured image.
* Use all remaining suburb images in the existing gallery, carousel, or project-grid component.
* Use the three `welcome-to-fireman-family` images in the section discussing client relationships, new buildings, or the All Fire Services community.

Do not create a new gallery design.

Reuse the existing template’s current image presentation and animation.

---

# 13. Pages Without Dedicated Local Image Folders

Some required pages may not yet have a dedicated image folder.

For those pages:

1. Check whether an appropriate local image exists elsewhere and is clearly relevant.
2. Do not use an unrelated image merely to avoid a placeholder.
3. Preserve the image placeholder from `ALL_FIRE_SERVICES_PAGE_CONTENT_AND_IMAGE_PLACEHOLDERS.md`.
4. Use the existing template’s real image component and dimensions.
5. Display a polished development placeholder only when the final real asset is unavailable.
6. Preserve the placeholder asset ID.
7. Include the intended image description.
8. Report it as awaiting a real image.

Pages that may still require placeholders include:

* About Us
* Contact Us
* Services
* Fire Safety Compliance
* Fire Consultancy Services
* Fire Safety Training
* FPA Australia Member
* Fire Protection Services Sydney
* Talk to Peter
* Confirmation
* QR Database
* Legal or privacy pages

Do not borrow Strata or AFSS images for these pages unless the image is genuinely relevant and the usage is documented.

---

# 14. No Supplied Image May Be Silently Ignored

Before finishing, create an internal image-usage manifest containing:

* Exact file path
* Page used
* Section used
* Component used
* Alt text
* Whether it is above or below the fold
* Whether it is priority-loaded
* Whether it is reused
* Reason for any unused file

Every supplied All Fire Services content image must have one of these final statuses:

```text
USED
INTENTIONAL DUPLICATE
UNSUITABLE OR CORRUPT
AWAITING CLIENT CONFIRMATION
```

Do not leave an image unused without mentioning it in the final report.

---

# 15. Existing Component Reuse

The current template may not have exactly the same number of pages or sections required by All Fire Services.

When more content is required:

1. Reuse an existing component.
2. Reuse an existing section pattern.
3. Reuse an existing grid.
4. Reuse an existing image treatment.
5. Reuse an existing animation.
6. Reuse an existing transition.
7. Reuse the closest visual pattern from the current template.
8. Preserve the design language.

Examples:

* Existing product cards become fire-service cards.
* Existing product grids become service grids.
* Existing featured-product sections become featured fire-protection services.
* Existing process sections become inspection and compliance processes.
* Existing fitter or location sections become service-area or Strata location galleries.
* Existing configurator sections become quote or enquiry flows.
* Existing team sections become All Fire Services team sections.
* Existing gallery sections become Strata or service galleries.
* Existing testimonial components remain testimonial components.
* Existing video modals display All Fire Services videos.
* Existing article templates display NSW regulation content.
* Existing CTA sections display “Call Peter Today.”
* Existing forms receive All Fire Services fields.

Do not create visually unrelated replacements.

---

# 16. Branding Color Replacement

Remove all visible blue styling.

Replace blue theme tokens with the approved All Fire Services palette.

## Primary Orange

```css
#FB5614
```

## Primary Red

```css
#FC0403
```

## Accent Yellow

```css
#FEAF04
```

## Dark Charcoal

```css
#1A1A1A
```

## Near Black

```css
#0B0B0B
```

## Primary Text

```css
#2B2B2B
```

## Secondary Text

```css
#666666
```

## Light Gray

```css
#F3F3F3
```

## Border Gray

```css
#D9D9D9
```

## White

```css
#FFFFFF
```

## Approved Gradient

```css
linear-gradient(
  135deg,
  #FC0403 0%,
  #FB5614 55%,
  #FEAF04 100%
)
```

Use this only where the current template already uses an equivalent gradient treatment.

Do not add gradients to new areas unnecessarily.

## Dark Overlay

```css
rgba(0, 0, 0, 0.55)
```

Use only where the current template already uses an overlay or where text contrast requires it.

## Semantic replacement

Replace blue in:

* CSS variables
* Tailwind tokens
* Global styles
* Buttons
* Links
* SVG fills
* SVG strokes
* Focus rings
* Hover states
* Active states
* Selected states
* Form controls
* Badges
* Icons
* Decorative lines
* Gradients
* Borders
* Charts
* Progress indicators

Do not randomly turn every blue value orange.

Use:

* Orange for primary actions
* Red for emergency and urgent actions
* Yellow for controlled supporting accents
* Charcoal and near-black for structure
* White and light gray for surfaces

---

# 17. Header Content

Preserve the existing header:

* Layout
* Height
* Sticky behavior
* Scroll transition
* Desktop navigation
* Dropdown behavior
* Mobile menu
* Animation
* Logo treatment
* CTA placement

Replace its content with:

* Skip to content
* [admin@allfireservices.com.au](mailto:admin@allfireservices.com.au)
* 1300 765 594
* All Fire Services Australia
* STRATA
* ABOUT US
* SERVICES
* CONTACT

Services submenu:

* ANNUAL FIRE SAFETY STATEMENT
* FPA AUSTRALIA MEMBER
* 13 FEB 2026 NSW FIRE SAFETY REGULATIONS
* FIRE SAFETY TRAINING
* FIRE CONSULTANCY SERVICES
* FIRE SAFETY COMPLIANCE

Use the supplied `logo.png` and `secondlogo.png` variants.

Do not redesign the header.

---

# 18. Footer Content

Preserve the existing footer:

* Layout
* Columns
* Spacing
* Animation
* Responsive behavior
* Logo placement
* Navigation treatment
* Background
* Typography

Replace its content with:

* ALL FIRE Services Official Logo
* 330 Wattle Street Ultimo NSW 2007
* [admin@allfireservices.com.au](mailto:admin@allfireservices.com.au)
* 1300 765 594
* FPA Australia Bronze Member
* Monday – Friday: 7:00am to 6:30pm
* Saturday: 7:00am to 12:30pm
* 24/7 After Hours, Phone 0484 648 400
* Required navigation links
* Required service links
* © Copyright 2026 | All Fire Services Sydney. Built by SOA

Use the correct supplied logo variant.

Do not simplify the footer.

---

# 19. Required Pages

Implement every page defined in:

```text
ALL_FIRE_SERVICES_PAGE_CONTENT_AND_IMAGE_PLACEHOLDERS.md
```

This includes:

* Home
* Strata
* About Us
* Contact Us
* Services
* Fire Safety Compliance
* Annual Fire Safety Statement
* Fire Consultancy Services
* Fire Safety Training
* FPA Australia Member
* 13 February 2026 NSW Fire Safety Regulations
* Fire Protection Services Sydney
* All Fire Services campaign page
* Talk to Peter
* Confirmation
* QR Database 2
* Homepage 2025
* Legacy Home
* Uncategorized Archive
* Legal or privacy page when defined

Do not stop after updating the homepage.

Do not create secondary pages with a different visual design.

Every page must use the existing template’s components and design system.

---

# 20. Text Fitting

The All Fire Services content may be longer than the original template content.

Do not:

* Reduce the font to an unreadable size
* Hide paragraphs
* Truncate content
* Use ellipses
* Clip content
* Remove text
* Hide required content on mobile
* Force fixed heights that cut off text

Allow sections to grow naturally.

Preserve:

* Existing content width
* Existing spacing scale
* Existing typography
* Existing responsive stacking
* Existing visual hierarchy

Only adjust:

* Minimum height
* Natural content flow
* Grid row sizing
* Text wrapping
* Responsive stacking

when technically necessary.

If one section cannot contain the required content, reuse another existing section pattern from the template rather than inventing a new visual system.

---

# 21. Forms

Preserve the current form components and styling.

Replace only:

* Labels
* Field names
* Placeholder text
* Select options
* Validation copy
* Button text
* Submission destination
* Success content
* Failure content

Required forms include:

* Contact form
* Training enquiry
* Talk to Peter
* Quote form
* Booking or inspection form

Preserve:

* Input layout
* Focus animation
* Validation treatment
* Loading state
* Submit transition
* Success state
* Failure state
* Responsive behavior

Do not create fake successful submission behavior.

---

# 22. Videos and Embeds

Preserve the current video:

* Component
* Poster design
* Modal
* Loading behavior
* Playback behavior
* Animation
* Close interaction

Required video titles include:

* ALL FIRE Services - Diesel Pump Inspection
* ALL FIRE Services - Hydrant Test
* ALL FIRE Services - Fire Extinguisher Test
* ALL FIRE Services - Hydrant Test Check
* ALL FIRE Services - Fire Extinguisher Test

Do not invent YouTube URLs.

If an exact URL is unavailable, keep the structured placeholder.

Preserve:

* Map placeholder
* QR database iframe placeholder
* Video placeholder
* Loading state
* Error state

---

# 23. Animation and Transition Preservation

Do not change the original:

* Animation library
* Scroll animation
* Easing
* Duration
* Stagger
* Trigger position
* Direction
* Transform values
* Parallax speed
* Sticky timing
* Hover transition
* Page transition
* Menu transition
* Image reveal
* Accordion animation
* Modal animation
* Carousel timing
* Slider behavior

Only update selectors or data associations when the content or image changes.

Do not add extra animations.

Do not remove working animations.

Preserve reduced-motion behavior.

---

# 24. Required Skills

Read and apply:

```text
overnight-task-runner.md

scroll-experience/SKILL.md

premium-web-design/SKILL.md

frontend-design/SKILL.md

ui-ux-pro-max/SKILL.md

ui-design-system/SKILL.md

ux-researcher-designer/SKILL.md

web-design-guidelines/SKILL.md

shadcn/SKILL.md

web-performance-optimization/SKILL.md
```

Use these for:

* Code quality
* Accessibility
* Performance
* Responsive correctness
* Content integrity
* Component reuse
* Testing

Do not use them to redesign the approved template.

---

# 25. Implementation Workflow

Before editing:

1. Inspect the complete repository.
2. Identify every route.
3. Identify every existing section.
4. Identify every reusable component.
5. Identify current content sources.
6. Identify all original template images.
7. Identify current animation logic.
8. Identify responsive behavior.
9. Identify theme tokens.
10. Inventory every file inside `public/`.
11. Build an asset-to-page mapping.
12. Build a content-to-component mapping.

Then implement the full migration.

Do not stop after providing a plan.

---

# 26. Required Verification

Before finishing, verify all of the following.

## Content

* Every required page exists.
* Every required section exists.
* Every heading is included.
* Every paragraph is included.
* Every list is included.
* Every CTA is included.
* Every form field is included.
* Every contact detail is correct.
* Every footer item is included.
* Every navigation item is included.
* No original template text remains.
* No original company information remains.

## Images

* `/herosectionimage.webp` is used in the homepage hero.
* `logo.png` and `secondlogo.png` are used in the appropriate global brand positions.
* Every `Fireprotectionservicesimage` file is used with its matching service.
* Every homepage team image is used in the team section.
* Every Annual Fire Safety Statement image is used on the AFSS page.
* `strata-alert-webp.webp` is used on the NSW regulations page.
* Every Strata image is used on the Strata page.
* No campervan or unrelated template image remains.
* No supplied image is silently ignored.
* Every image has meaningful alt text.
* Every image preserves the existing template animation.
* No image is distorted.
* No below-the-fold image is unnecessarily priority-loaded.

## Design preservation

* No component was redesigned.
* No section was redesigned.
* No layout was redesigned.
* No animation was changed.
* No transition was changed.
* No responsive breakpoint was changed.
* No unnecessary component was replaced.
* No new visual style was introduced.

## Branding

* No visible blue remains.
* Approved brand colors are applied semantically.
* Header logo is correct.
* Footer logo is correct.
* Focus states remain accessible.

## Technical

* No broken routes
* No broken image paths
* No missing imports
* No TypeScript errors
* No build errors
* No runtime errors
* No console-breaking errors
* No horizontal overflow
* No clipped content
* No hydration errors
* No invalid nested interactive elements

---

# 27. Completion Criteria

The task is complete only when:

1. The approved template design is preserved.
2. Existing components are preserved.
3. Existing layouts are preserved.
4. Existing section designs are preserved.
5. Existing animations are preserved.
6. Existing transitions are preserved.
7. Existing responsive behavior is preserved.
8. All original template content is removed.
9. All required All Fire Services content is included.
10. Every supplied local image is correctly mapped.
11. All required image placeholders are represented.
12. All required video placeholders are represented.
13. All forms are represented.
14. All blue branding is removed.
15. All required pages are implemented.
16. The project builds successfully.
17. There are no blocking errors.

Do not finish after changing only:

* Homepage content
* Colors
* Logos
* Hero image
* Service cards

This is a complete website migration.

Do not respond with only a plan.

Inspect, implement, test, fix, and provide the completed implementation report.

---

# 28. Final Report Requirements

When finished, provide:

1. Every page updated
2. Every section updated per page
3. Original template content removed
4. All Fire Services content added
5. Complete image usage manifest
6. Local image path used for each page and section
7. Any unused image and the exact reason
8. Any placeholder still awaiting a real asset
9. Video placeholders awaiting URLs
10. Forms updated
11. Blue tokens removed
12. All Fire Services brand tokens added
13. Components reused
14. Minimal technical adjustments made
15. Content conflicts requiring confirmation
16. Files changed
17. Build result
18. Type-check result
19. Runtime or console issues
20. Remaining non-blocking warnings
21. Written confirmation that the existing design, layout, components, sections, animations, transitions, and responsive behavior were preserved




# Mandatory Full-Site Responsiveness

Responsiveness is a critical requirement of this migration.

Read and strictly follow:

```text
C:\Users\S-300V5A\Downloads\allfireservicesuk\allfireservices\skills\responsiveness.md
```

File reference:

[responsiveness.md](file;file:///c%3A/Users/S-300V5A/Downloads/allfireservicesuk/allfireservices/skills/responsiveness.md)

Do not treat responsiveness as a final polish step.

Apply the rules from `responsiveness.md` throughout the implementation of every page, section, component, image, form, animation, navigation element, and interactive state.

The website must work correctly on:

* Small mobile phones
* Standard mobile phones
* Large mobile phones
* Small tablets
* Standard tablets
* Landscape tablets
* Laptops
* Desktop monitors
* Large desktop monitors

The existing template’s design, components, layouts, animations, transitions, and visual identity must remain preserved, but they must adapt correctly across all supported screen sizes.

---

## Responsive Scope

Every element must be responsive, including:

* Utility bar
* Header
* Logo
* Desktop navigation
* Mobile navigation
* Services dropdown
* Mobile submenu
* Hero sections
* Hero headings
* Hero paragraphs
* Hero buttons
* Hero images
* Decorative image layers
* Service cards
* Product-style cards
* Team galleries
* Image grids
* Image carousels
* Horizontal scrolling sections
* Sticky sections
* Scroll-driven sections
* Content columns
* Statistics
* Trust badges
* Logo groups
* Testimonials
* Video players
* Video modals
* Forms
* Input fields
* Select fields
* Textareas
* Checkboxes
* Maps
* Iframes
* Tables
* Accordions
* Tabs
* Article layouts
* Breadcrumbs
* CTA sections
* Footer columns
* Footer navigation
* Floating call buttons
* Loading states
* Empty states
* Error states
* Confirmation states

Do not verify responsiveness only on the homepage.

Every route must be tested independently.

---

## Required Viewport Testing

Test every page at these widths:

```text
320px
360px
375px
390px
414px
430px
600px
768px
820px
1024px
1280px
1366px
1440px
1536px
1920px
```

Also test representative viewport heights, including shorter mobile and laptop screens.

Do not assume that working at one mobile width means the entire mobile range is correct.

Test both:

* Portrait orientation
* Landscape orientation

At minimum, verify landscape behavior for mobile and tablet navigation, forms, galleries, sticky sections, and modals.

---

## Mobile Requirements

At mobile screen sizes:

* Use a clear single-column flow unless an existing component is intentionally designed for two compact columns.
* Preserve at least safe horizontal page padding.
* Do not allow text to touch the viewport edges.
* Keep body text readable without zooming.
* Keep heading sizes proportionate to the available width.
* Allow long headings to wrap naturally.
* Prevent headings from overflowing or being cut off.
* Stack buttons when they cannot fit comfortably in one row.
* Make important CTA buttons full-width where appropriate.
* Keep phone and emergency actions easy to reach.
* Ensure interactive targets are at least `44px × 44px`, preferably `48px × 48px`.
* Keep adequate space between adjacent buttons and links.
* Ensure dropdowns and menus fit within the viewport.
* Prevent the mobile menu from extending beyond the visible screen.
* Allow the mobile menu to scroll when its content is taller than the viewport.
* Lock background scrolling while the mobile menu or modal is open.
* Keep form fields full-width.
* Do not place multiple long form fields side by side.
* Ensure validation messages do not break the layout.
* Keep images properly cropped around their important subject.
* Use mobile-specific object positions where needed.
* Prevent image distortion.
* Prevent cards from becoming too narrow.
* Prevent fixed-height containers from clipping longer content.
* Stack footer columns clearly.
* Keep the after-hours phone number readable and clickable.
* Ensure sticky elements do not cover content or form controls.
* Ensure fixed call buttons do not overlap navigation, cookie controls, or submission buttons.

Do not hide required content on mobile.

Do not shorten or remove paragraphs only to make the mobile page smaller.

---

## Tablet Requirements

At tablet screen sizes:

* Do not simply stretch the mobile layout.
* Do not force the desktop layout into an insufficient width.
* Use one, two, or occasionally three columns based on available space and content length.
* Keep cards visually balanced when the final row has fewer items.
* Ensure navigation changes at an appropriate width.
* Prevent desktop navigation labels from colliding with the logo or CTA.
* Ensure landscape tablet navigation remains usable.
* Keep section headings and paragraphs within readable widths.
* Preserve meaningful image sizes.
* Avoid extremely tall narrow cards.
* Ensure forms use balanced field grouping.
* Keep embedded maps and videos usable without overflow.
* Verify that carousels show an intentional number of cards.
* Ensure sticky and pinned sections behave correctly with touch scrolling.
* Avoid scroll interactions that require mouse hover.
* Make all essential actions available through touch.

Tablet layouts must be intentionally designed and tested, not treated as an accidental state between desktop and mobile.

---

## Desktop and Large-Screen Requirements

At desktop and large screen sizes:

* Keep content inside the approved maximum-width container.
* Do not allow paragraphs to become excessively wide.
* Do not stretch cards or images beyond their intended proportions.
* Keep section content visually centered and balanced.
* Preserve the approved whitespace and layout rhythm.
* Avoid large empty areas caused by fixed widths.
* Keep the header aligned at all supported desktop widths.
* Ensure full navigation remains readable and evenly spaced.
* Prevent hero content from becoming disconnected from its image.
* Maintain intentional maximum widths for headings and body text.
* Ensure background images scale without exposing empty edges.
* Keep full-width sections visually controlled on 1920px displays.
* Verify that grids do not produce awkward oversized cards.
* Preserve image quality on high-density and large displays.

---

## Fluid Typography

Use the existing typography system, but make it responsive through the existing project conventions.

Use fluid values such as `clamp()` where appropriate without changing the approved typography hierarchy.

Example:

```css
font-size: clamp(2.25rem, 5vw, 5rem);
```

Apply fluid typography carefully to:

* Hero headings
* Internal-page headings
* Section headings
* Large statistics
* CTA headings

Body text must remain readable and should generally not fall below `16px`.

Do not solve layout problems by shrinking text excessively.

---

## Responsive Spacing

Preserve the template’s spacing system, but adapt it proportionally.

Use controlled responsive spacing for:

* Page gutters
* Section padding
* Card padding
* Grid gaps
* Heading margins
* CTA spacing
* Form spacing
* Footer spacing

Do not use one desktop spacing value at every breakpoint.

Do not remove too much spacing on mobile.

The mobile website must remain breathable, readable, and easy to scan.

---

## Responsive Images

Use the corresponding local image assigned to each page and section.

For every image:

* Use the current optimized image component.
* Provide correct intrinsic width and height.
* Provide an accurate `sizes` attribute.
* Use `object-fit: cover` only when cropping is intentional.
* Use `object-fit: contain` for logos and assets that must remain fully visible.
* Set responsive `object-position` values when the subject moves out of frame.
* Preserve important people, equipment, text, and logos in every crop.
* Do not stretch images.
* Do not distort aspect ratios.
* Do not allow images to create horizontal overflow.
* Reserve image space to prevent layout shift.
* Use priority loading only for the primary above-the-fold image.
* Lazy-load below-the-fold images.
* Keep gallery images consistent within their component.
* Use mobile crops or alternative positioning when required.
* Test portrait images inside landscape containers.
* Test wide images inside stacked mobile sections.

The homepage hero must use:

```text
/herosectionimage.webp
```

and remain visually correct on mobile, tablet, desktop, and large desktop screens.

All team, Strata, Annual Fire Safety Statement, regulation, and service images must remain correctly framed at every breakpoint.

---

## Responsive Grid Rules

All grids must adapt based on both available width and content size.

Typical behavior:

```text
Large desktop: 3–4 columns where appropriate
Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column
```

This is guidance, not permission to override the current template blindly.

Preserve the existing grid design while ensuring:

* No cards become too narrow.
* No text is clipped.
* No card content overflows.
* No final row looks broken.
* Cards with longer content expand naturally.
* Buttons remain aligned when practical.
* Card images retain consistent proportions.
* Grid gaps remain intentional.
* Grids do not create horizontal scrolling.

Use `minmax()` and responsive grid logic where appropriate.

Example:

```css
grid-template-columns: repeat(
  auto-fit,
  minmax(min(100%, 280px), 1fr)
);
```

---

## Responsive Navigation

Preserve the current header design and transitions.

Verify:

* Desktop navigation fits without overlap.
* The logo does not collide with navigation.
* The CTA does not push links outside the viewport.
* Services dropdown remains inside the screen.
* Dropdown content is keyboard accessible.
* The mobile menu opens and closes correctly.
* The mobile menu fits short screens.
* Mobile submenu content can expand without clipping.
* Menu items have suitable touch targets.
* Phone and email links remain clickable.
* The menu closes after navigation.
* Escape closes the menu where supported.
* Focus is contained within the open menu.
* Focus returns to the menu button after closing.
* Sticky header states work at all breakpoints.
* Header transitions do not cause layout shift.

Do not keep desktop navigation visible at widths where it no longer fits comfortably.

---

## Responsive Forms

Every form must work correctly on mobile, tablet, and desktop.

Verify:

* Labels remain visible.
* Placeholders are readable.
* Inputs fit within the viewport.
* Input text does not zoom unexpectedly on mobile.
* Fields have appropriate input modes.
* Telephone fields use `type="tel"`.
* Email fields use `type="email"`.
* Textareas expand without breaking the layout.
* Select menus remain usable.
* Error messages wrap naturally.
* Success messages fit the container.
* Buttons remain reachable.
* Checkbox labels wrap correctly.
* Two-column field rows stack on smaller screens.
* Mobile keyboards do not hide critical controls where preventable.
* Sticky submit actions do not cover content.
* Form sections do not use fixed heights.
* CAPTCHA or spam controls do not overflow.

Do not create a desktop-only form experience.

---

## Responsive Tables and Long Content

For regulatory pages, service lists, forms, or any table-like content:

* Avoid tables when a semantic list or cards work better within the existing design.
* When a real table is required, make it horizontally scrollable inside its own container.
* Do not allow the entire page to scroll horizontally.
* Keep headers visible where practical.
* Stack label-value pairs on mobile when appropriate.
* Ensure long URLs and email addresses wrap safely.
* Use `overflow-wrap: anywhere` only where needed.
* Prevent long legal or technical terms from breaking the viewport.

Long paragraphs must remain readable.

Use controlled content widths and clear paragraph spacing.

---

## Responsive Videos, Maps, and Iframes

All media embeds must remain inside their containers.

Use responsive aspect ratios for videos:

```css
aspect-ratio: 16 / 9;
width: 100%;
```

Verify:

* Video posters scale correctly.
* Video controls remain usable.
* Modals fit smaller screens.
* Modal close buttons remain visible.
* Videos do not extend below short screens without scroll support.
* Maps use an appropriate mobile height.
* Iframes do not cause page-level horizontal overflow.
* QR database content supports internal scrolling if required.
* Loading and error states remain responsive.
* Cookie-blocked embed states fit mobile screens.

Do not use fixed pixel widths for embeds.

---

## Responsive Animation Rules

Preserve the existing animations and transitions, but ensure they remain safe and usable at every breakpoint.

Verify:

* Elements do not begin outside the mobile viewport in a way that creates horizontal overflow.
* Large desktop transform distances are reduced where needed for mobile safety.
* Scroll-trigger calculations refresh after responsive layout changes.
* Sticky sections do not trap mobile users.
* Parallax is reduced or disabled where it harms mobile performance or readability.
* Horizontal carousels remain touch-scrollable.
* Hover-only information is also available through tap, focus, or visible content.
* Animated text remains readable.
* Long paragraphs are not delayed by staggered character animations.
* Modal and menu transitions work on short screens.
* Orientation changes do not leave animations in broken states.
* Reduced-motion preferences are respected.

Use:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Do not remove the existing motion system. Adapt only what is necessary to keep it functional and safe across smaller screens.

---

## Overflow Prevention

There must be no unintended horizontal scrolling on any page.

Inspect common causes:

* Fixed pixel widths
* Large translated elements
* Absolute-positioned decorations
* Long unbroken text
* Wide images
* Carousels
* Tables
* Iframes
* Dropdown menus
* Form controls
* Negative margins
* `100vw` inside padded containers
* Large shadows
* Off-screen animation states
* Unwrapped button groups

Do not hide layout problems globally using:

```css
overflow-x: hidden;
```

Fix the actual component causing the overflow.

A controlled overflow container may be used for intentional carousels, code blocks, or tables.

---

## Touch and Interaction Requirements

On touch devices:

* Do not rely on hover.
* Keep essential labels visible.
* Make controls easy to tap.
* Provide adequate spacing between interactive elements.
* Disable accidental text selection on drag-based controls where appropriate.
* Ensure carousels support touch gestures.
* Ensure buttons do not activate while users are scrolling.
* Keep modals dismissible.
* Make telephone numbers click-to-call.
* Make email addresses clickable.
* Ensure accordions have large clickable headers.
* Ensure dropdowns support tap.
* Avoid interactions requiring precise pointer placement.

---

## Responsive Performance

Follow:

```text
responsiveness.md
web-performance-optimization/SKILL.md
```

Mobile performance is a priority.

Requirements:

* Do not load desktop-only decorative assets on mobile when avoidable.
* Use correctly sized image variants.
* Avoid oversized source images for small cards.
* Avoid loading all video players immediately.
* Defer below-the-fold media.
* Keep JavaScript bundles controlled.
* Avoid running expensive scroll calculations unnecessarily.
* Use passive scroll listeners where appropriate.
* Avoid excessive blur and backdrop-filter effects on mobile.
* Avoid heavy fixed backgrounds on low-powered devices.
* Prevent layout shifts caused by late-loading fonts and images.
* Ensure animations remain smooth without blocking scrolling.

---

## Required Page-by-Page Responsive Audit

Audit every route independently:

* Home
* Strata
* About Us
* Contact Us
* Services
* Fire Safety Compliance
* Annual Fire Safety Statement
* Fire Consultancy Services
* Fire Safety Training
* FPA Australia Member
* 13 February 2026 NSW Fire Safety Regulations
* Fire Protection Services Sydney
* All Fire Services campaign page
* Talk to Peter
* Confirmation
* QR Database 2
* Homepage 2025
* Legacy Home
* Uncategorized Archive
* Legal or privacy page when defined

For each route, verify:

1. Header
2. Hero
3. Every section
4. Every heading
5. Every paragraph
6. Every image
7. Every card
8. Every grid
9. Every CTA
10. Every form
11. Every video
12. Every map or iframe
13. Every animation
14. Every interactive state
15. Footer

Do not mark the site responsive based only on shared components.

---

## Required Automated and Manual Checks

Use the project’s available browser testing tools, Playwright, or equivalent where possible.

At minimum:

* Open every route at each critical breakpoint.
* Check for horizontal overflow.
* Check console errors.
* Check missing images.
* Check clipped text.
* Check overlapping content.
* Check inaccessible controls.
* Check navigation behavior.
* Check modal behavior.
* Check form behavior.
* Check image focal points.
* Check orientation changes.
* Check reduced-motion mode.

Where possible, add a reusable viewport test that checks:

```ts
document.documentElement.scrollWidth <= window.innerWidth
```

Do not rely only on automated tests.

Manually inspect every major page at mobile, tablet, and desktop sizes.

---

## Responsive Completion Checklist

The task is not complete until all of the following are true:

* [ ] Every page is responsive.
* [ ] Every section is responsive.
* [ ] Every component is responsive.
* [ ] Every image is responsive.
* [ ] Every form is responsive.
* [ ] Every video is responsive.
* [ ] Every map is responsive.
* [ ] Every iframe is responsive.
* [ ] Every modal is responsive.
* [ ] Every menu is responsive.
* [ ] Every dropdown is responsive.
* [ ] Every card grid is responsive.
* [ ] Every gallery is responsive.
* [ ] Every carousel supports touch.
* [ ] Every heading wraps correctly.
* [ ] Every paragraph remains readable.
* [ ] Every CTA remains visible and usable.
* [ ] Every touch target is large enough.
* [ ] No required content is hidden on mobile.
* [ ] No content is clipped.
* [ ] No element overlaps another.
* [ ] No page has unintended horizontal scrolling.
* [ ] No image is distorted.
* [ ] No important image subject is cropped out.
* [ ] No fixed or sticky element covers content.
* [ ] No desktop-only interaction blocks mobile use.
* [ ] No animation causes mobile overflow.
* [ ] Tablet layouts are intentionally designed.
* [ ] Landscape tablet layouts work.
* [ ] Reduced-motion mode works.
* [ ] The existing design remains preserved.
* [ ] The existing animations and transitions remain preserved.
* [ ] The project builds without blocking errors.

---

# Updated Completion Criteria

The full migration is complete only when:

1. The approved template design is preserved.
2. Existing components are preserved.
3. Existing layouts are preserved.
4. Existing section designs are preserved.
5. Existing animations are preserved.
6. Existing transitions are preserved.
7. All original template content is removed.
8. All All Fire Services content is included.
9. Every supplied local image is used in its corresponding section.
10. All required pages are implemented.
11. Every page is fully responsive.
12. Every section is fully responsive.
13. Every component is fully responsive.
14. Every image is fully responsive.
15. Every form and interactive element is fully responsive.
16. Mobile portrait and landscape layouts work.
17. Tablet portrait and landscape layouts work.
18. Desktop and large-screen layouts work.
19. No horizontal overflow remains.
20. No content is clipped, hidden, or removed to solve layout problems.
21. No image is distorted or incorrectly cropped.
22. No responsive breakpoint introduces a broken layout.
23. The requirements in `responsiveness.md` have been followed.
24. The project builds successfully.
25. No blocking runtime, TypeScript, import, or route errors remain.

Do not declare completion after checking only the homepage or one screen size.

Do not respond with only a plan.

Implement the migration, test every route across mobile, tablet, desktop, and large desktop sizes, fix every responsive issue, and provide the final implementation report.

---

# Updated Final Report Requirements

The final report must include:

1. Every page updated
2. Every section updated per page
3. Every local image and its exact page and section usage
4. Every unused image and the exact reason
5. Every responsive breakpoint tested
6. Mobile issues found and fixed
7. Tablet issues found and fixed
8. Desktop issues found and fixed
9. Landscape orientation issues found and fixed
10. Horizontal overflow issues found and fixed
11. Image cropping issues found and fixed
12. Form responsiveness issues found and fixed
13. Navigation responsiveness issues found and fixed
14. Animation responsiveness issues found and fixed
15. Any remaining asset placeholders
16. Any missing video, map, or iframe URL
17. Files changed
18. Build result
19. Type-check result
20. Runtime and console result
21. Confirmation that `responsiveness.md` was followed
22. Confirmation that every page, section, element, and interactive component is responsive
23. Confirmation that the existing design, components, layouts, animations, transitions, and responsive visual identity were preserved
