# Responsiveness, Accessibility, and Performance

## Responsive behaviour

Every page, section, image, card, logo, button, form field, map, video, timeline, and navigation element must work across mobile, tablet, laptop, and large desktop sizes.

Do not only shrink the desktop layout. Recompose it intentionally.

### Mobile

- Single-column content by default
- CTAs may stack at narrow widths
- Buttons should be easy to tap
- Timeline becomes vertical
- Client logo grid becomes two columns when needed
- No horizontal scrolling
- Avoid full-viewport sections that trap content

### Tablet

- Preserve generous spacing
- Use two columns only when content remains readable
- Prevent awkward orphaned cards
- Keep navigation usable at 768–1024px

### Desktop

- Use controlled max widths
- Do not stretch paragraphs across the screen
- Keep images crisp and properly sized
- Maintain visual balance on 1440px and 1920px displays

## Accessibility

- Meet WCAG 2.2 AA where practical
- Visible keyboard focus
- Logical heading order
- Proper landmark elements
- Accessible menu and accordion patterns
- Form labels and descriptive errors
- `aria-current` for active navigation
- Meaningful alt text
- Adequate colour contrast
- Minimum 44px interactive targets
- Reduced motion support

## Performance

Target a fast first impression on mobile connections.

- Remove unused animation libraries when no longer needed
- Use optimised image components
- Use AVIF or WebP when supported
- Set image width, height, and sizes
- Prioritise only the true above-the-fold image
- Lazy-load below-fold images, maps, and videos
- Use a facade for YouTube
- Avoid large client logo payloads
- Use local SVGs for simple marks
- Minimise third-party scripts
- Avoid layout shifts
- Keep fonts to two families and limited weights

## Suggested quality targets

Treat these as goals, not reasons to fake results:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- LCP below 2.5s on a reasonable mobile test
- CLS below 0.1
- INP below 200ms when measurable

Record actual results and any limitations.
