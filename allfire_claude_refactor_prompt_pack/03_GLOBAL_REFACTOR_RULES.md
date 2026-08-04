# Global Refactor Rules

## Simplicity rule

Every section must have:

- One main message
- One supporting idea
- No more than two direct actions
- One dominant visual treatment

When two sections say the same thing, combine them or remove the weaker one.

## Content rule

- Keep verified client content intact.
- Rewrite generic or clearly incorrect placeholder copy.
- Do not invent certifications, years, team roles, client relationships, awards, response times, statistics, addresses, or testimonials.
- Mark uncertain facts in the implementation notes and use existing approved copy until confirmed.
- Use Australian English spelling and punctuation.

## Section composition

Prefer these layouts:

- Editorial split: copy on one side, one real image on the other
- Full-width media with a compact text overlay
- Simple two-column information layout
- Open logo grid
- Minimal service list or card row

Avoid:

- Dense dashboards
- Stacked carousels
- Nested cards
- Heavy glassmorphism
- Multiple background patterns in one viewport
- Decorative labels that do not add meaning
- Tiny text over images

## Navigation

Primary desktop navigation should contain only:

- Home
- Our Story
- Our Clients
- Services, as a homepage anchor or simple dropdown only when necessary
- Contact

Place `Get a Quote` as the clear primary action.

Do not show the current large mega-menu in the demo unless there is a strong requirement. A simple, accessible menu is preferred.

## Reuse and architecture

- Reuse one shared header and footer across core routes.
- Reuse section heading patterns without making every section identical.
- Use data arrays for repeated services, clients, family timeline entries, FAQs, and contact details.
- Keep page sections in separate components.
- Remove unused imports and dependencies after refactoring.
- Preserve form handlers, analytics, and SEO unless they are broken or clearly obsolete.

## SEO

- Keep one H1 per page.
- Use descriptive page titles and metadata.
- Keep headings in a logical order.
- Add descriptive alt text to meaningful images.
- Decorative graphics should use empty alt text or proper presentation semantics.
- Update the sitemap and navigation to reflect the core demo pages.
- Do not remove existing structured data without checking what it does.
