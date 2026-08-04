# All Fire Services Brand and Design System

## Brand idea

All Fire Services should feel experienced, dependable, practical, and human.

The design must communicate fire safety without becoming loud, aggressive, or visually chaotic.

## Colour palette

### Core brand colours

- Orange: `#fb5614`
- Red: `#fc0403`
- Yellow: `#feaf04`

### Supporting colours

Create named design tokens rather than scattering raw hex values.

Recommended supporting palette:

- Ink: `#151515`
- Soft black: `#222222`
- Body text: `#424242`
- Muted text: `#6B6B6B`
- Border: `#E7E4DF`
- Warm surface: `#F7F5F1`
- White: `#FFFFFF`

Check existing brand assets before finalising supporting neutrals.

## Colour usage rules

- Use black or soft black for most headings and body text.
- Use white or warm off-white for most page backgrounds.
- Use orange as the main brand accent, not as a full-page background.
- Use red for small high-attention details, safety emphasis, or thin graphic accents.
- Use yellow sparingly for highlights, small labels, or decorative lines.
- Never use all three brand colours at equal intensity in one section.
- Avoid heavy gradients. A subtle orange-to-red line or brand ribbon may be used only as a restrained accent.
- Use black text on orange and yellow surfaces for reliable readability.
- Do not rely on colour alone to communicate state.

## Typography

Preferred pairing when compatible with the current stack:

- Display and headings: `Barlow Condensed`, 600–700 weight
- Body, navigation, and UI: `Inter`, 400–700 weight

Use `next/font` when this is a Next.js app. Load only the weights used. If the project already has a strong, readable brand font, keep it rather than adding an unnecessary dependency.

### Type scale

Use fluid sizing with `clamp()` or equivalent tokens.

- Hero heading: approximately 48–76px desktop, 38–48px tablet, 34–42px mobile
- Section heading: approximately 36–52px desktop, 30–40px tablet, 28–34px mobile
- Card heading: 22–28px
- Body: 18–20px desktop, 16–18px mobile
- Small labels: 13–15px, never tiny or low contrast

Keep line lengths readable. Body copy should generally stay between 55 and 72 characters per line.

## Layout

- Max content width: about 1200–1280px
- Text measure: about 680–760px
- Desktop section padding: 88–128px
- Tablet section padding: 72–96px
- Mobile section padding: 56–72px
- Page gutter: 20px mobile, 32px tablet, 40–56px desktop
- Use consistent vertical rhythm across the entire site

## Corners and borders

- Large media radius: 24–32px
- Cards: 16–24px
- Buttons: 999px pill or 12–16px, choose one approach and use it consistently
- Borders: subtle and thin
- Avoid placing every item inside a card

## Buttons

### Primary

- Dark ink background
- White text
- Clear hover and focus state using orange accents
- Minimum height: 48px desktop and mobile

### Secondary

- White or transparent background
- Dark border and text
- Orange hover accent

### Optional branded accent button

- Orange background with black text
- Use only when it remains visually balanced

Button labels should describe the action clearly. Avoid generic “Learn More” when a specific label is possible.

## Iconography

- Use one icon family only, such as Lucide, if icons are needed.
- Prefer simple outline icons.
- Use supplied branded service icons when they are consistent and high quality.
- Do not use decorative icons in every heading.

## Imagery

- Authentic team, family, equipment, client, and building photos only
- Use one strong image rather than multiple small competing images
- Preserve natural colour and avoid dramatic filters
- A subtle neutral overlay is acceptable when needed for text contrast
- Historic family images may use monochrome treatment, but do not over-process them

## Motion

- Default: no entrance animation
- Allow only subtle hover, focus, accordion, and menu transitions
- Typical duration: 150–250ms
- No scroll-jacking, large parallax, zooming backgrounds, or repeated reveal effects
- Respect `prefers-reduced-motion`
