# Moving Clients Logo Section Plan

1. [x] Inspect the homepage services section and current styling patterns.
2. [x] Search official/public sources for real client logos and save usable logo assets locally.
3. [x] Add a Handshake-style `Our Clients` marquee section directly below `OUR SERVICES / FIRE PROTECTION SERVICES`.
4. [x] Configure two infinite logo rows: top moving left, bottom moving right, with larger readable logos.
5. [x] Validate TypeScript/lint/build and review the changed scope.
6. [ ] Move the marquee above the `OUR SERVICES / Premium Fire Services` section.
7. [ ] Remove visible logo containers and tune logo sizing/visibility.

## Moving Clients Logo Section Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`
  - `public/client-logos/*`

- Database tables:
  - None.

---

# Hero Scroll Video Integration Plan

1. [x] Inspect the Profire Australia hero behavior and current All Fire Services hero structure.
2. [x] Replace only the homepage hero background treatment with the provided MP4 video.
3. [x] Add a scoped scroll-linked pinned hero animation while preserving all hero content text and links.
4. [x] Keep the navigation untouched and limit responsive changes to the hero section.
5. [x] Validate TypeScript/lint and render the homepage locally.
6. [x] Extend the hero scroll range so the raw video is visible alone before the hero content appears.
7. [x] Remove all dark video background overlays while keeping the existing hero content unchanged.
8. [x] Update the header initial logo to white over the video and restore the colored logo after scroll.
9. [x] Simplify the header scroll animation so nav placement stays stable while logo and CTA spacing compress.

## Hero Scroll Video Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`
  - `app/globals.css`
  - `app/responsive.css`
  - `components/HeroScrollVideo.tsx`
  - `components/HeroScrollContent.tsx`
  - `components/Navbar.tsx`

- Database tables:
  - None.

---

# Premium Services Video Selector Plan

1. [x] Inspect the current homepage services section and video gallery component.
2. [x] Refactor the `Premium Fire Services` section to use an interactive video selector pattern while preserving video media.
3. [x] Keep performance guarded by limiting expensive player work, using lazy iframes, CSS transitions, and responsive sizing.
4. [x] Validate with lint/build or a focused TypeScript check.
5. [x] Review the final changed scope.
6. [x] Simplify the selector by removing extra controls and hiding YouTube player chrome.

## Premium Services Video Selector Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`
  - `components/PortraitVideoGallery.tsx`

- Database tables:
  - None.

---

# Why Allfire Intro Outside Panel Plan

1. [x] Inspect the current sticky section structure and scoped styles.
2. [x] Move the `Why All Fire Services Sydney` intro block outside the sticky animated panel.
3. [x] Keep the intro copy exactly unchanged.
4. [x] Adjust section spacing so the sticky panel still enters and scales correctly.
5. [x] Validate lint/build.

## Why Allfire Intro Outside Panel Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/WhyAllfireSticky.tsx`
  - `app/globals.css`

- Database tables:
  - None.

---

# Why Allfire Size And Alignment Plan

1. [x] Inspect current intro and sticky panel sizing.
2. [x] Align the outside intro block to the same left edge and width as the sticky panel.
3. [x] Reduce excess vertical space inside the sticky panel.
4. [x] Tune desktop/mobile text and card sizes so content fits the container.
5. [x] Validate lint/build.

## Why Allfire Size And Alignment Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/globals.css`

- Database tables:
  - None.

---

# Why Allfire Header Scale And Gap Plan

1. [x] Inspect the sticky wrapper spacing and current intro typography.
2. [x] Remove the viewport-centered gap between the intro and sticky panel.
3. [x] Set the intro typography to a bold section-header scale while keeping the same content.
4. [x] Re-check responsive spacing.
5. [x] Validate lint/build.

## Why Allfire Header Scale And Gap Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/globals.css`

- Database tables:
  - None.

---

# Why Allfire Big Header And Center Sticky Plan

1. [x] Inspect the current header scale and sticky positioning.
2. [x] Increase the outside intro headline size while keeping the exact content.
3. [x] Center the sticky animated container in the viewport while avoiding navbar overlap.
4. [x] Validate lint/build.

## Why Allfire Big Header And Center Sticky Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/globals.css`

- Database tables:
  - None.

---

# Why Allfire Handshake Section Refactor Plan

1. [x] Inspect the current homepage `why-allfire` section and the Handshake "Why Sidekick" reference.
2. [x] Confirm the local skill/doc guidance available for frontend and Next.js work.
3. [x] Replace the old split image/text section with a Handshake-style rounded panel and scroll-revealed slides.
4. [x] Rewrite the content around All Fire Services compliance, testing, maintenance, and local support.
5. [x] Add scoped responsive CSS that preserves All Fire Services red, orange, yellow, black, and white branding.
6. [x] Validate TypeScript/lint/build and inspect the rendered homepage.

## Why Allfire Handshake Section Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`
  - `app/globals.css`

- Database tables:
  - None.

---

# Why Allfire Sticky Scroll Correction Plan

1. [x] Re-check the Handshake reference behavior and identify the mismatch in the current implementation.
2. [x] Replace the repeated visible slide cards with one sticky viewport section whose content changes on scroll.
3. [x] Add the enter-viewport scale-up animation to the main container.
4. [x] Update the section header to the requested Sydney compliance copy.
5. [x] Keep the All Fire Services brand palette and responsive behavior.
6. [x] Validate lint/build and render checks.

## Why Allfire Sticky Scroll Correction Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`
  - `app/globals.css`
  - `components/WhyAllfireSticky.tsx`

- Database tables:
  - None.

---

# Header Bold Typography Plan

1. [x] Inspect the requested headings and the Testimonials reference weight.
2. [x] Apply the Testimonials-style bold weight to `Premium Fire Services`, `Visit All Fire Services`, and `Get in touch`.
3. [x] Run a focused validation check.
4. [x] Review the final changed scope.

## Header Bold Typography Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`
  - `components/ContactCTA.tsx`

- Database tables:
  - None.

---

# FAQ Redesign Plan

1. [x] Inspect the existing FAQ implementation and app styling.
2. [x] Use Playwright to inspect `https://joinhandshake.com/` and capture the FAQ reference styling.
3. [x] Update only the FAQ component/styles to follow the reference layout while preserving All Fire Services content.
4. [x] Validate the change with a focused local build/lint check and browser screenshot.
5. [x] Review the final changed scope.
6. [x] Replace the dark footer background with a light All Fire Services-friendly treatment.
6. [x] Replace the black FAQ background with a light All Fire Services-friendly treatment.

## Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/FAQ.module.css`

- Database tables:
  - None.

---

# Footer Redesign Plan

1. [x] Inspect the existing footer implementation and app styling.
2. [x] Use Playwright to inspect `https://joinhandshake.com/` and capture the footer reference styling.
3. [x] Update only the footer component to follow the reference layout while preserving All Fire Services content.
4. [x] Validate the change with TypeScript and desktop/mobile Playwright screenshots.
5. [x] Review the final changed scope.
6. [x] Fix footer overlap risks, button layout, and place social links beside contact.
7. [x] Animate the footer `ALLFIRESERVICES` wordmark as two halves meeting in the middle.

## Footer Scope

- Files touched:
  - `implementation_plan.md`
  - `components/Footer.tsx`

- Database tables:
  - None.

---

# Testimonial Reference Refactor Plan

1. [x] Inspect the live Handshake testimonial reference with Playwright and record layout, animation, spacing, and interaction details.
2. [x] Inspect the existing All Fire Services testimonial component and style scope.
3. [x] Refactor only the testimonial component/styles to match the reference motion and layout while using All Fire Services content.
4. [x] Add exactly 6 testimonial comments.
5. [x] Validate with lint/build and Playwright screenshots across desktop/mobile.
6. [x] Review the final changed scope.

## Testimonial Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/testimonial.tsx`
  - `components/testimonial.module.css`

- Database tables:
  - None.

---

# Contact Location Section Plan

1. [x] Inspect the contact page/component and existing image assets.
2. [x] Remove the headquarters, contact details, and office hours block from the contact form section.
3. [x] Add a separate `Our Location` section above the `Get in touch` contact section using image-based location cards.
4. [x] Add Framer Motion scroll reveal animations scoped to the contact page component.
5. [x] Validate the change with TypeScript, contact page HTTP check, and attempted lint/build.
6. [x] Review the final changed scope.

## Contact Location Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/ContactCTA.tsx`
  - `public/contact-location-map.svg`

- Database tables:
  - None.

---

# Contact Real Map Update Plan

1. [x] Replace the illustrated map card with a real Google Maps embed pinned to `330 Wattle St, Ultimo NSW 2007`.
2. [x] Simplify the location section to focus on the map only.
3. [x] Remove the unused generated map asset.
4. [x] Validate with TypeScript and a contact route check.

## Contact Real Map Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/ContactCTA.tsx`
  - `public/contact-location-map.svg`

- Database tables:
  - None.

---

# Contact Map Visibility Fix Plan

1. [x] Inspect the current Google Maps iframe implementation.
2. [x] Replace the blank-prone map embed URL with a Google Maps place embed URL.
3. [x] Add a simple visible fallback treatment behind the iframe so the map area is never blank.
4. [x] Validate with TypeScript and contact route check.

## Contact Map Visibility Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/ContactCTA.tsx`

- Database tables:
  - None.

---

# Contact Two Column Location Plan

1. [x] Keep the left location container as a real Google Maps embed.
2. [x] Add a right image container matching the reference style.
3. [x] Keep scoped scroll/hover animations on both containers.
4. [x] Validate with TypeScript and contact route check.

## Contact Two Column Location Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/ContactCTA.tsx`

- Database tables:
  - None.

---

# Contact Location Visibility Fix Plan

1. [x] Remove hidden initial animation state from the location card containers.
2. [x] Keep the real Google Maps left card and image right card visible by default.
3. [x] Validate with TypeScript and contact route check.

## Contact Location Visibility Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/ContactCTA.tsx`

- Database tables:
  - None.

---

# Why Allfire Handshake-Style Refactor Plan

1. [x] Inspect the existing homepage section and identify the exact markup to replace.
2. [x] Inspect the Handshake employers reference section and map its structure to All Fire Services content.
3. [x] Replace only the `WHY ALLFIRE SERVICES` homepage section with the new reference-style section.
4. [x] Validate with lint/build or a focused TypeScript check.
5. [x] Review final changed scope.

## Why Allfire Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`

- Database tables:
  - None.

---

# Pre-FAQ Brand CTA Plan

1. [x] Inspect the homepage FAQ placement and existing brand gradient usage.
2. [x] Add a CTA section immediately before the homepage FAQ.
3. [x] Style the CTA with the existing All Fire Services brand gradient and responsive spacing.
4. [x] Validate with a focused TypeScript/build check.
5. [x] Review final changed scope.
6. [x] Replace the text-only CTA badge with the actual site logo asset.
7. [x] Remove the CTA logo container and show both logo assets larger.
8. [x] Reduce CTA logo sizing and render both logos in white.

## Pre-FAQ Brand CTA Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`

- Database tables:
  - None.

---

# Chatbot Simple UI Refresh Plan

1. [x] Inspect the existing chatbot UI, deferred launcher, and relevant frontend guidance.
2. [x] Update the open chatbot window to a simpler white interface inspired by the supplied corner-ribbon reference while preserving messaging, reset, close, quick questions, contact, and input behavior.
3. [x] Update the deferred and closed launcher to match the simplified chatbot styling.
4. [x] Validate with lint or a focused TypeScript/build check.
5. [x] Review the final changed scope.

## Chatbot Simple UI Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Chatbot.tsx`
  - `components/ChatbotDeferred.tsx`

- Database tables:
  - None.

---

# Why Allfire Brand Fix Plan

1. [x] Inspect the current Handshake-style section implementation.
2. [x] Replace non-brand beige/green styling with All Fire Services white, red, yellow, and black branding.
3. [x] Replace hiring-style content with fire safety and compliance workflow content.
4. [x] Make the workflow tabs functional without widening the scope of the page.
5. [x] Validate TypeScript, homepage render, and section content.

## Why Allfire Brand Fix Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`

- Database tables:
  - None.

---

# Chatbot Gradient Emphasis Plan

1. [x] Increase the top corner gradient/ribbon treatment on the open chatbot window to better match the supplied reference.
2. [x] Increase the same corner accent on the closed chat bubble without covering the label.
3. [x] Validate the focused chatbot UI change.

## Chatbot Gradient Emphasis Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Chatbot.tsx`
  - `components/ChatbotDeferred.tsx`

- Database tables:
  - None.

---

# Chatbot Stronger Ribbon Match Plan

1. [x] Enlarge the open chatbot top-right ribbon so it has a deeper orange sweep like the reference image.
2. [x] Strengthen the closed chat bubble corner ribbon while preserving text readability.
3. [x] Run focused validation.

## Chatbot Stronger Ribbon Match Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Chatbot.tsx`
  - `components/ChatbotDeferred.tsx`

- Database tables:
  - None.

---

# Chatbot Visible Corner Ribbon Plan

1. [x] Replace the barely visible rotated ribbon bars with a clipped top-right orange corner block.
2. [x] Add visible red and yellow diagonal bands inside the corner for both open and closed chatbot states.
3. [x] Validate TypeScript and lint.

## Chatbot Visible Corner Ribbon Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Chatbot.tsx`
  - `components/ChatbotDeferred.tsx`

- Database tables:
  - None.

---

# Why Allfire Background Image Plan

1. [x] Inspect the current workflow section styles.
2. [x] Replace the plain dark workflow/tab background with an existing All Fire Services image.
3. [x] Add a dark overlay so tab text remains readable.
4. [x] Validate TypeScript and rendered homepage content.

## Why Allfire Background Image Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`

- Database tables:
  - None.

---

# Why Allfire Image Visibility Plan

1. [x] Inspect current workflow image overlay values.
2. [x] Reduce overlay darkness so the background image is more visible.
3. [x] Keep enough contrast behind the workflow tabs.
4. [x] Validate TypeScript and homepage render.

## Why Allfire Image Visibility Scope

- Files to touch:
  - `implementation_plan.md`
  - `app/page.tsx`

- Database tables:
  - None.

---

# Chatbot Wavy Ribbon Match Plan

1. [x] Replace the hard triangular chatbot ribbon with a curved SVG corner motif.
2. [x] Apply the same wavy red/yellow/orange motif to the closed chat bubble and deferred launcher.
3. [x] Validate TypeScript and lint.

## Chatbot Wavy Ribbon Match Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Chatbot.tsx`
  - `components/ChatbotDeferred.tsx`

- Database tables:
  - None.

---

# Chatbot Mobile Bottom Position Plan

1. [x] Update chatbot responsive positioning so mobile and tablet screens do not center the bubble.
2. [x] Keep the chatbot anchored to the lower bottom-right with a small viewport-safe offset.
3. [x] Validate TypeScript and lint.

## Chatbot Mobile Bottom Position Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Chatbot.tsx`
  - `components/ChatbotDeferred.tsx`

- Database tables:
  - None.

---

# Handshake-Style Header Refactor Plan

1. [x] Inspect the current header implementation and the live Handshake reference.
2. [x] Replace the existing utility/social/contact header with a clean Handshake-style primary nav.
3. [x] Implement desktop hover dropdown behavior, compact CTA buttons, sticky/transparent-to-solid scroll behavior, and mobile full-screen menu.
4. [x] Remove social links and header email/phone utility content from the header surface.
5. [x] Validate with TypeScript/lint/build and browser checks where available.
6. [x] Review the final changed scope.

## Handshake-Style Header Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Navbar.tsx`

- Database tables:
  - None.

---

# Handshake Identical Compression Header Plan

1. [x] Rework the current header from a generic sticky header into the Handshake two-state header.
2. [x] Make the top state full-width, transparent, white nav text, large full logo, and compact outlined/green CTAs.
3. [x] Make the scrolled state compress into a centered floating white pill with square icon logo, black nav text, and compact CTAs.
4. [x] Match the transition timing, rounded pill shape, spacing, and mobile menu behavior as closely as possible.
5. [x] Validate TypeScript/lint where possible.

## Handshake Compression Header Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Navbar.tsx`

- Database tables:
  - None.

---

# Header Brand Palette Button Update Plan

1. [x] Replace the temporary Handshake-style wordmark/mark with the real `public/logo.png` logo.
2. [x] Increase header nav and button text sizing.
3. [x] Replace Handshake lime/black auth colors with All Fire Services red, orange, yellow, black, and white branding.
4. [x] Replace `Log in` and `Sign up` with `Call 1300 765 594` and `Get a Quote`.
5. [x] Validate TypeScript/lint where possible.

## Header Brand Palette Button Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Navbar.tsx`

- Database tables:
  - None.

---

# Header Smooth Compression Transition Plan

1. [ ] Remove jumpy non-animating layout changes from the header compressed state.
2. [ ] Keep the header grid stable while animating width, max-width, margin, padding, radius, shadow, and logo size.
3. [ ] Tune transition duration/easing to better match the Handshake center-compression motion.
4. [ ] Validate TypeScript/lint where possible.

## Header Smooth Compression Scope

- Files to touch:
  - `implementation_plan.md`
  - `components/Navbar.tsx`

- Database tables:
  - None.
