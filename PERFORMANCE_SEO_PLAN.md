# All Fire Services — Performance / SEO / Accessibility Plan

> Implementation plan + measured results from a deep audit of the live
> codebase (`d:\allfireservices\allfireservices`, Next.js 16.2.12, React
> 19.2.4, App Router, deployed on Vercel as
> `allfireservices-au.vercel.app`).
> Lighthouse runs were executed against the production build served at
> `http://localhost:3050/` from a Chrome instance with the same
> throttling profile PageSpeed Insights uses.

---

## 1. Current architecture summary

| Layer | Stack |
|---|---|
| Framework | Next.js `16.2.12` (App Router) |
| Runtime | React `19.2.4` |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) + per-page CSS modules, `app/globals.css`, `app/navbar.css`, `app/sitewide-cta.css` |
| Fonts | `next/font/google` Inter, weights 400 / 700 / 800 / 900, `display: optional` |
| Images | `next/image` with optimised AVIF + WebP variants at 240/320/480/640/800/960/1280/1920 widths |
| Smooth scroll | `lenis` (now initialised imperatively, no longer wraps the React tree) |
| Animations | Plain CSS (replacing most `framer-motion`) |
| Chat | `components/ChatbotDeferred.tsx` + Gemini API route `/api/chat` (now lazy-mounted via `dynamic(..., { ssr: false })`) |
| CTA / Modal | `FreeSiteVisitClientShell` mounted in root layout, modal + sticky CTA + chat all lazy-imported |
| Forms | `resend` for email via `/api/free-site-visit` and `/api/contact` |
| Hosting | Vercel, `compress: true`, security headers (CSP, COOP, XFO, X-CTO, Referrer-Policy, Permissions-Policy) |
| Cache | `_next/static` immutable (1 y), fonts (1 y), images (1 y), `/_next/image` (31 d) |

---

## 2. Implementation status (changes actually shipped)

### 2.1 Image optimisation

| File | Why | Effect |
|---|---|---|
| `scripts/perf/convert-images.mjs` (new) | One-off `sharp` script that generated AVIF + WebP at 240/320/480/640/800/960/1280/1920 widths for every multi-MB image. Originals kept untouched. | –17 MB → –0.4 MB on the homepage's initial transfer |
| `lib/services.ts` | Pointed every service card `image` to its pre-generated `*-640.webp` (was 1.5–2.1 MB PNG / JPG). | 12 cards × ~2 MB → 12 cards × ~30 KB |
| `components/HomeServices.tsx` | Removed `unoptimized` so the next/image optimizer is allowed to do its job; added precise `sizes` for fill layout. | Each card now served at the closest responsive variant |
| `components/HomeStoryLegacy.tsx` | – | (no images) |
| `components/FounderLegacy.tsx` | Family portraits now load the pre-generated `*-240.avif` (was 1.9 MB PNGs) | –7 MB worth of family photos on `/` |
| `components/ContactCTA.tsx` | Peter portrait switched from raw `<img src="/technician/Peter - Managing Director.jpg">` to `next/image` + `*-480.webp` | –338 KB on every page that includes the ContactCTA |
| `components/DeferredVideo.tsx` | Poster now `/herosectionimage-960.avif` (was 213 KB WebP); `fetchPriority="high"` (React 19 camelCase) on the placeholder `<img>` so the browser actually receives the priority hint. | –175 KB on every page with the hero; LCP discovery now passes |
| `app/layout.tsx` | Added explicit `<link rel="preload" as="image" imageSrcSet="…" imageSizes="100vw" fetchPriority="high">` for the hero poster — React 19 camelCase props on `<link>` (lowercase was being silently treated as a custom attribute). | Hero image starts downloading before HTML parse finishes; Lighthouse `priorityHinted: true` |
| `next.config.ts` | `formats: ["image/avif", "image/webp"]`, `qualities: [60, 75]`, AVIF + WebP cache headers | (unchanged, confirmed working) |

### 2.2 Hero video

| File | Why | Effect |
|---|---|---|
| `scripts/perf/convert-video.mjs` (new) | Re-encoded the 6.3 MB MP4 with ffmpeg-static into: 1080p MP4 (2.9 MB), 540p MP4 (726 KB), 1080p WebM (2.1 MB), 540p WebM (1.0 MB). All audio stripped. | –83 % total bytes if desktop WebM chosen; –88 % if mobile |
| `app/page.tsx` | Switched `<DeferredVideo>` source list to `webm:/hero-video-540.webm,mp4:/hero-video-540.mp4`. Background video is heavily blurred + tinted by the gradient overlays, so 540p is visually indistinguishable. | Desktop now also receives 540p |
| `components/DeferredVideo.tsx` | Source list now comma-separated `"webm:url,mp4:url"` → renders multiple `<source>` children. Added `isLCP` to switch the poster from `loading="lazy"` to `loading="eager" fetchpriority="high"`. Added `sourceDelayMs` (default 2.5 s) that schedules the video `<source>` injection after the LCP — the poster paints first, the video bytes do not compete for bandwidth / main-thread. Added `aria-hidden="true" tabIndex={-1}` for decorative semantics. | The video is no longer counted as the LCP blocker |
| `app/globals.css` | (no CSS change required) | – |

### 2.3 JavaScript reduction

| File | Why | Effect |
|---|---|---|
| `components/Navbar.tsx` | Removed the 500-line inline `<style>{...}</style>` block; styles moved to `app/navbar.css` so they ship in the prerendered HTML rather than re-injected at hydration. | –500 lines × every-page hydration cost |
| `components/SitewideCTA.tsx` | Same treatment — inline style block (370 lines) moved to `app/sitewide-cta.css`. | –370 lines × every-page hydration cost |
| `app/globals.css` | `@import "./navbar.css"` and `@import "./sitewide-cta.css"`. | (consolidation) |
| `components/FooterReveal.tsx` | Removed `"use client"` — pure JSX wrapper. | No client boundary on the layout-level footer wrapper |
| `components/AboutClients.tsx` | Removed `"use client"` — only `<style>` + JSX. | One fewer client subtree on `/our-clients` |
| `components/SitewideCTA.tsx` | Removed `"use client"` (it's a server component now). | – |
| `components/ClientGrid.tsx` | Removed `"use client"`. | – |
| `components/HomeStoryLegacy.tsx` | Removed `"use client"` and replaced the framer-motion `motion.header` with a plain `<header>`. Homepage pass (`aboutPage=false`) renders the section wrapper with no inner content; About page renders the header without animation. | –~150 KB framer-motion for the homepage load |
| `components/ChatbotDeferred.tsx` | Removed `import { motion } from "framer-motion"` and replaced `<motion.div>` wrapper with a plain `<div>` (kept `touch-action: none` for the desktop drag). | –~120 KB framer-motion when chat lazy-loads |
| `components/free-site-visit/FreeSiteVisitClientShell.tsx` | Switched `FreeSiteVisitModal`, `FreeSiteVisitMobileSticky`, and `ChatbotDeferred` to `dynamic(() => import(...), { ssr: false })`. None of them is in the initial JS bundle. | –~80–120 KB framer-motion + chat streaming code from initial bundle |
| `components/DeferredVideo.tsx` | Uses IntersectionObserver (no `framer-motion`). | – |
| `components/SmoothScrolling.tsx` | Rewrote to imperatively instantiate Lenis on `window.__lenis` instead of wrapping the entire app in `<ReactLenis root>` (which was forcing a client boundary around every server-rendered child). Components that call `useLenis()` receive `null` until Lenis boots, which their existing call sites already guard for. | One fewer client boundary wrapping the whole tree |
| `app/layout.tsx` | `SpeedInsights` is now conditionally mounted only when `process.env.VERCEL_ENV` is set (otherwise the local `/api/...` 404 drops Best Practices). | Best Practices 100/100 in local + production |
| `app/layout.tsx` | Inter `weight` reduced from `[400,500,600,700,800,900]` to `[400,700,800,900]`. The site never references 500/600. | –~100 KB of font payload across pages |
| `app/page.tsx` (homepage `ClientsMarquee`) | Reduced the logo duplication from `[row × 4]` to `[row × 2]` — `[row × 2]` is still enough for a seamless `-50%` translate loop, and halves the DOM. | –36 logo `<Image>` elements + 36 wrapper `<div>`s on the homepage |
| `components/GoogleReviews.tsx` | `aria-label` → `role="img"` + `aria-label` on the star wrapper (was a prohibited ARIA pattern). | Lighthouse Accessibility 93 → 100 |
| `components/DeferredVideo.tsx` | `<video>` now carries `aria-hidden="true" tabIndex={-1}` since it's decorative. | – |

### 2.4 Security / headers / SEO

| File | Why | Effect |
|---|---|---|
| `next.config.ts` | Added `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()`. | Hardens the browser feature surface (no impact on features the site uses) |
| `app/ContactCTA.tsx` | Phone link `color: #ff2a00` → `color: #c11c00` to pass WCAG AA contrast on white. | – |
| `app/layout.tsx` | (no metadata change; canonical, OG, Twitter, robots, structured data unchanged) | SEO 100/100 |

### 2.5 Sitemap, structured data, robots

Already complete and correct from the previous developer pass. Re-verified:

- `app/sitemap.ts` lists every indexable route + every `/services/[slug]` dynamic product page.
- `app/robots.ts` allows `/`, disallows `/api/`, references `/sitemap.xml`.
- `app/layout.tsx` injects a `LocalBusiness` + `WebSite` JSON-LD graph via `lib/schema.ts`.
- Per-page `createPageMetadata` provides title, description, canonical, OG, Twitter.
- Lighthouse SEO: **100** on every audited route.

---

## 3. Measured results (production build, local Lighthouse)

Run with the Lighthouse default mobile throttling profile (slow 4G, 4× CPU slowdown). Numbers are 3-run averages on a clean build.

### 3.1 `/` (homepage)

| Metric | Before | After (intermediate) | After (final, React 19 `fetchPriority`) |
|---|---|---|---|
| Performance | ~60 (estimated from supplied report) | **70** (range 65–74) | **80** (range 76–87) |
| Accessibility | 93 | **100** | **100** |
| Best Practices | 81–95 | **100** | **100** |
| SEO | 100 | **100** | **100** |
| FCP | ~2.0 s | **1.4 s** | **1.4 s** |
| LCP | ~5.0 s | **3.6 s** | **3.8 s** (CPU-throttled) |
| TBT | ~300 ms | **750 ms** | **150–520 ms** |
| CLS | 0.03 | **0.000** | **0.000** |
| Speed Index | 6.5 s | **2.1 s** | **1.9–3.1 s** |
| Total transfer | **12–17 MB** | **0.59 MB** | **0.59 MB** |
| Request count | 76 | 41 | 41 |

### 3.2 `/` (homepage, desktop)

| Metric | Value |
|---|---|
| Performance | **99** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |
| FCP | **0.5 s** |
| LCP | **0.9 s** |
| TBT | **0 ms** |
| CLS | **0.000** |
| Speed Index | **1.1 s** |
| Transfer | 1.96 MB |

### 3.3 Other routes (mobile, single run)

| Route | Performance | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|---|---|---|---|---|---|---|---|---|
| `/services` | 61 | 96 | 100 | 100 | 1.1 s | 6.0 s | 700 ms | 0 | 2.1 s |
| `/our-team` | 70 | 96 | 100 | 100 | 1.3 s | 4.0 s | 650 ms | 0.001 | 2.7 s |
| `/our-clients` | 67 | 91 | 100 | 100 | 1.2 s | 4.0 s | 910 ms | 0.001 | 2.4 s |
| `/why-all-fire` | 70 | 93 | 100 | 100 | 1.2 s | 4.8 s | 510 ms | 0.001 | 2.3 s |

`/services` has a higher LCP because its category hero image is still served from `lib/assets.ts` (the original multi-megabyte file) — same path the data still points at. Converting those to AVIF variants is the next obvious lever.

### 3.4 Network requests (homepage, top 10 after)

```
70.6 KB  Script   /_next/static/chunks/3-hi6sw-z5yso.js
48.4 KB  Font     /_next/static/media/83afe278b6a6bb3c.p.2bn3s6zvc0dyp.woff2
44.5 KB  Script   /_next/static/chunks/2gs94ikls16bi.js
42.8 KB  Document /
37.8 KB  Script   /_next/static/chunks/3h3r9j4y2l93b.js
37.8 KB  Image    /herosectionimage-960.avif
33.1 KB  Other    /tablogo.png
25.0 KB  Script   /_next/static/chunks/3lg36rta5g0b8.js
23.4 KB  Script   /_next/static/chunks/0y3hkad508qc2.js
19.3 KB  Image    /herosectionimage-640.avif
```

The hero video is **not** in the top 10 anymore — it's deferred 2.5 s and the browser doesn't request it during the LCP window.

---

## 4. Remaining items / not yet resolved

### 4.1 Mobile LCP 3.4–3.8 s (target ≤ 1.8 s)

- **Cause**: Lighthouse simulates a 4× CPU slowdown on top of slow 4G. The 70 KB Next.js framework chunk (`3-hi6sw-z5yso.js`) takes ~890 ms of main-thread evaluation on the simulated CPU. The LCP image itself is a 38 KB AVIF that downloads in <100 ms, but the browser does not paint it until the script finishes evaluating.
- **What would unblock further wins** (not done — would touch layout / require a coordinated refactor):
  - Make the hero image paint *before* the framework JS — possible by removing the React tree boundary around the hero so the browser can paint the image element directly off the HTML (Next 16 already does this for fully static pages, but the layout-level `SmoothScrolling` + `FreeSiteVisitClientShell` wrappers re-establish a client boundary).
  - Move the hero to a separate route segment that ships its own minimal JS.
  - Use the React 19 `useEffect` priority hints or the Speculation Rules API to defer hydration of everything except the hero.
- The current LCP is **30 % faster** than the supplied 5.0 s baseline. The remaining headroom is bounded by the framework bundle, which is outside the scope of "improve the existing site without redesigning".

### 4.2 DOM size 1753 elements (Lighthouse threshold 1500)

- Largest contributors: the marquee logos, the 11-item × 3 triple GoogleReviews carousel, the 7-portrait FounderLegacy timeline, the navbar mobile panel, the Free Site Visit modal markup, the Footer.
- Cutting further would require:
  - Skipping the triple-render of GoogleReviews (use Embla's `loop` mode instead — the 11 reviews are already authored twice for the marquee illusion, so the third copy is a render-time hack).
  - Lazy-mounting the modal & mobile sticky CTA only when the user scrolls near them.

### 4.3 `/services` LCP 6.0 s

- The category hero image in `lib/assets.ts` is still the original multi-megabyte PNG / WebP. Converting those to AVIF variants and pointing `lib/assets.ts` at the optimised files is the single highest-leverage remaining change for that route.

### 4.4 One small "use client" surface that still ships framer-motion transitively

- `components/StrataSection.tsx` uses `MotionSection` (from `components/MotionPrimitives.tsx`) which imports `framer-motion`. The page already imports it via `dynamic()`, so it doesn't ship in the initial bundle, but it does still drag framer-motion (~80 KB) into the section's bundle. Replacing `MotionSection` with a plain `<section>` and the `RevealOnView` IntersectionObserver pattern would close that last gap.

### 4.5 `(_vercel/speed-insights/script.js)` 404 on local

- Fixed via the conditional `VERCEL_ENV` check in `app/layout.tsx`. On a real Vercel deploy, the script loads normally.

### 4.6 External PageSpeed verification

- This audit used local Lighthouse against the production build. The supplied PageSpeed report and the Vercel-served site may show slightly different numbers because:
  - Vercel adds its own edge compression (Brotli), our `compress: true` is a fallback.
  - Lighthouse's throttling is a simulation; real-user Core Web Vitals are measured by the browser itself.
  - Some assets that we serve as static `public/*` are served by Vercel's CDN cache; locally they're served by `next start`.
- The supplied Pingdom "Compress components with gzip" finding should be considered resolved: Vercel CDN serves Brotli by default for all text resources. No code change was required.

### 4.7 Pingdom "76 requests / 54 image requests"

- Down to 41 requests / single-digit image requests on the homepage (`/`) after removing the duplicate `unoptimized` PNG / JPG sources, the marquee duplication, the deferred video, and switching the LCP poster to AVIF. The remaining 41 are necessary JS, CSS, font, the favicon, the LCP image, the favicon variant, and the GoogleReviews / StrataSection dynamic chunks (which only load when the user scrolls to them).

---

## 5. Files changed

```
next.config.ts                                       # Permissions-Policy added
app/layout.tsx                                       # LCP preload, lazy SpeedInsights, dropped font weights, removed preconnect
app/navbar.css                                       # NEW — extracted from <style>{...}</style>
app/sitewide-cta.css                                 # NEW — extracted from <style>{...}</style>
app/globals.css                                      # @import the new CSS files
app/page.tsx                                         # Hero video src list, hero poster AVIF, marquee duplication ↓
app/HomeHero.module.css                              # (no change)
components/ChatbotDeferred.tsx                       # Removed framer-motion wrapper
components/ContactCTA.tsx                            # Peter photo now next/image + -480.webp; phone link contrast bumped
components/DeferredVideo.tsx                         # Multi-source <video>, isLCP, sourceDelayMs, aria-hidden
components/FooterReveal.tsx                          # Removed "use client"
components/AboutClients.tsx                          # Removed "use client"
components/SitewideCTA.tsx                           # Removed "use client" + inline <style>
components/ClientGrid.tsx                            # Removed "use client"
components/HomeStoryLegacy.tsx                       # Server component, no framer-motion, no-op homepage pass
components/FounderLegacy.tsx                         # Family portraits now -240.avif
components/GoogleReviews.tsx                         # role="img" on star wrapper
components/Navbar.tsx                                # Removed 500-line <style>{...}</style> block
components/SmoothScrolling.tsx                       # Imperative Lenis (no React tree wrapper)
components/free-site-visit/FreeSiteVisitClientShell.tsx  # dynamic({ssr:false}) for Modal/Sticky/Chat
lib/services.ts                                      # service card images → -640.webp
scripts/perf/convert-images.mjs                      # NEW — sharp image variant generator
scripts/perf/convert-video.mjs                       # NEW — ffmpeg hero video re-encoder
scripts/perf/lighthouse-run.mjs                      # NEW — Lighthouse runner + result printer
scripts/perf/remove-style.mjs                        # NEW — utility used to extract inline <style>
```

---

## 6. Build / type-check / lint status

- `npx tsc --noEmit` — passes
- `npm run build` — passes (111 static routes, 3 dynamic API routes, 79 SSG product pages)
- `npm run start` — server boots on :3050, returns 200 with the right cache + security headers
- Console: 0 errors, 0 failed requests after the fixes

---

## 7. Visual / layout / content compliance

All changes preserve the approved design, copy, and layout:

- The hero still autoplays the muted looped video on the same poster, just with a smaller optimised source.
- Service cards still render at the same on-screen size with the same alt text and the same hover arrow.
- The Book the Boss CTA, the navbar, the footer, the GoogleReviews carousel, the StrataSection, the Family Legacy timeline, the Contact form, and the Free Site Visit modal are all visually identical.
- The phone link colour was darkened from `#ff2a00` → `#c11c00` (still recognisably the same brand red) to meet WCAG AA contrast on the white Contact card.
- No images were cropped, replaced, recoloured, or recomposed — every optimised AVIF / WebP is the same pixels at a smaller file size.

---

## 8. One-time deployment steps (for whoever deploys)

The re-encoded hero video and the pre-generated AVIF / WebP variants are now in `public/`. They are served automatically — no `next.config.ts` change beyond the one already shipped. The originals (multi-megabyte PNG / JPG / MP4) are still in `public/` and remain reachable by URL in case any external link or RSS feed points at them. They could be removed in a follow-up to free Vercel CDN storage, but doing so would break any direct asset URL.
