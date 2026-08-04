# Core Pages and Route Strategy

## Primary demo routes

### `/`

Homepage with the required section order.

### `/about`

Display label: `Our Story`

Recommended page structure:

1. Simple page hero
2. Founded by a firefighter
3. Fire protection runs in our blood
4. Family history and timeline
5. Authentic team or family gallery
6. Business values in one concise row
7. CTA
8. Location or contact shortcut
9. Footer

Avoid repeating the complete homepage.

### `/our-clients`

Recommended page structure:

1. Simple page hero
2. Verified client logo grid
3. Industries or property types served
4. Verified case studies or testimonials only
5. Why clients work with All Fire
6. CTA
7. Footer

### `/contact`

Keep when already functional. It may reuse the location and contact components from the homepage.

## Non-core routes

The current repository may contain numerous service and informational pages.

For the demo:

- Remove them from the primary header
- Remove them from prominent homepage CTAs unless required
- Do not delete useful page source permanently
- Keep direct URLs working when practical
- If the client specifically wants only three visible pages, add a reversible route allowlist or redirect strategy
- Update sitemap and robots behaviour carefully
- Document every hidden or redirected route

## Anchors

Suggested homepage anchors:

- `#story`
- `#generations`
- `#why-all-fire`
- `#clients`
- `#services`
- `#videos`
- `#faqs`
- `#location`
- `#contact`

Ensure sticky-header offset is handled with `scroll-margin-top`.
