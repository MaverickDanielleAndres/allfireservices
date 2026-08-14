"use client";

/**
 * SitewideCTA — "Book the Boss" offer card.
 * ─────────────────────────────────────────────────────────────────────────
 * The persistent, sitewide CTA hero card. Simplified for Phase 1 of the
 * latest client changes — the homepage global CTA now reads:
 *
 *   FREE SITE VISIT   ← eyebrow / supporting context
 *   BOOK THE BOSS     ← primary action
 *   Peter will personally come to your property.
 *   [ Book the Boss → ]   ← primary button
 *
 * Composition (top → bottom):
 *   • All Fire Services + FPA Australia Bronze Member wordmarks, with a
 *     hairline divider between them, anchored top-left.
 *   • "Free Site Visit" eyebrow in brand orange.
 *   • Two-line heading — "Peter will personally" then the payoff
 *     "come to your property." wrapped in the signature gradient.
 *   • Orange primary CTA "Book the Boss →" (with header-style breathing
 *     pulse) + black "Call 1300 765 594".
 *
 * Right-hand region is the Peter portrait, blended into the card surface
 * via a CSS mask-image gradient so there is no visible seam — no gradient
 * line to read, no overlay colour to match, just one continuous warm
 * surface with Peter in it.
 *
 * Design tokens come from `BRANDING_AND_LAYOUT_PRINCIPLES.md` §3, §4,
 * §7 and §8. The rectangular CTA shape and the half-card cover image
 * are intentional local exceptions — they are not promoted into any
 * global rule and remain scoped to this CTA card.
 */

import Image from "next/image";
import FreeSiteVisitButton from "@/components/free-site-visit/FreeSiteVisitButton";

export default function SitewideCTA() {
  return (
    <section
      className="pre-faq-cta"
      aria-labelledby="sitewide-cta-title"
      style={{
        marginBottom: 0,
        marginTop: 0,
      }}
    >
      <style>{`
        .pre-faq-cta {
          background: transparent;
          padding: clamp(1.5rem, 3vw, 2.25rem) clamp(1rem, 2vw, 1.5rem);
        }

        /* ── Card surface ─────────────────────────────────────────────
           Soft peach gradient with a thin orange hairline border. */
        .pre-faq-cta-card {
          align-items: stretch;
          background:
            radial-gradient(circle at 92% 0%, rgba(255, 153, 51, 0.20), transparent 38%),
            radial-gradient(circle at 0% 100%, rgba(255, 87, 34, 0.10), transparent 50%),
            linear-gradient(135deg, #fdecdf 0%, #fde4cd 50%, #ffd9ba 100%);
          border: 1px solid #ff8a4c;
          border-radius: 1.5rem;
          box-shadow: 0 1.25rem 3rem rgba(180, 60, 20, 0.12);
          color: #111111;
          display: flex;
          isolation: isolate;
          margin-inline: auto;
          max-width: 76rem;
          min-height: 22rem;
          overflow: hidden;
          padding: clamp(1.75rem, 3.5vw, 2.75rem) clamp(1.75rem, 3.5vw, 3rem);
          position: relative;
        }

        /* Left text column owns ~60% on desktop; portrait owns the rest. */
        .pre-faq-cta-content {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          min-width: 0;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 900px) {
          .pre-faq-cta-content {
            max-width: 60%;
            padding-right: clamp(1rem, 1vw, 2rem);
          }
        }

        /* ── Wordmarks row ─────────────────────────────────────────── */
        .pre-faq-cta-logos {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: clamp(0.9rem, 2vw, 1.4rem);
          margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
          width: 100%;
        }

        .pre-faq-cta-logo-block {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: clamp(0.9rem, 2vw, 1.4rem);
        }

        .pre-faq-cta-logo-divider {
          background: linear-gradient(
            to bottom,
            rgba(17, 17, 17, 0) 0%,
            rgba(17, 17, 17, 0.28) 30%,
            rgba(17, 17, 17, 0.28) 70%,
            rgba(17, 17, 17, 0) 100%
          );
          display: block;
          height: clamp(3rem, 5.5vw, 4.5rem);
          width: 1px;
        }

        .pre-faq-cta-logo {
          display: block;
          height: clamp(2.8rem, 5vw, 4.2rem);
          object-fit: contain;
          width: auto;
        }

        /* ── Eyebrow ────────────────────────────────────────────────── */
        .pre-faq-cta-eyebrow {
          color: #ff2a00;
          font-size: clamp(0.78rem, 1vw, 0.9rem);
          font-weight: 800;
          letter-spacing: 0.22em;
          line-height: 1.2;
          margin: 0 0 clamp(0.85rem, 1.8vw, 1.15rem);
          text-transform: uppercase;
        }

        /* ── Headline (two lines, gradient payoff) ─────────────────── */
        .pre-faq-cta-title {
          color: #111111;
          font-size: clamp(2.05rem, 3.7vw, 3.15rem);
          font-weight: 850;
          letter-spacing: -0.04em;
          line-height: 0.98;
          margin: 0;
          text-wrap: balance;
        }

        .pre-faq-cta-title-line-2 {
          background: linear-gradient(to right, #ff2a00 0%, #ffb700 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          font-weight: 850;
        }

        /* ── Body ───────────────────────────────────────────────────── */
        .pre-faq-cta-copy {
          color: #2c2c2a;
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          font-weight: 500;
          line-height: 1.55;
          margin: clamp(1rem, 1.8vw, 1.25rem) 0 0;
          max-width: 34rem;
          text-wrap: balance;
        }

        /* ── Buttons ────────────────────────────────────────────────── */
        .pre-faq-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-top: clamp(1.4rem, 2.4vw, 1.8rem);
        }

        .pre-faq-cta-button {
          align-items: center;
          border: 1px solid transparent;
          border-radius: 0.55rem;
          cursor: pointer;
          display: inline-flex;
          font-size: 0.95rem;
          font-weight: 700;
          gap: 0.55rem;
          justify-content: center;
          line-height: 1;
          min-height: 2.85rem;
          padding: 0 1.4rem;
          text-decoration: none;
          transition:
            background-color 200ms ease,
            border-color 200ms ease,
            color 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .pre-faq-cta-button:focus-visible {
          outline: 2px solid #ff5722;
          outline-offset: 3px;
        }

        /* Orange primary — gradient fill, white text, soft glow.
           Combined with the pulse prop on FreeSiteVisitButton, the
           button breathes exactly the same way the persistent header
           CTA does (4.8s cycle, 1.025 scale, expanding shadow ring). */
        .pre-faq-cta-button.is-primary {
          background: linear-gradient(135deg, #ff2a00 0%, #ff5722 55%, #ff8a3c 100%);
          border-color: #ff5722;
          box-shadow: 0 10px 26px rgba(255, 87, 34, 0.32);
          color: #ffffff;
        }

        .pre-faq-cta-button.is-primary .fsv-btn__arrow {
          transition: transform 200ms ease;
        }

        /* Black secondary — solid dark, white text. */
        .pre-faq-cta-button.is-secondary {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
        }

        /* ── Right region — half-card cover with left-only mask fade ───
           A single left-to-right linear-gradient mask turns the
           photograph's left edge into actual alpha transparency so
           the card's peach surface shows through naturally — no
           overlay edge, no overlay tint, no second mask layer
           dimming the photo's centre. The image is fully opaque from
           ~55% of its width onward, so Peter is shown at full
           colour/contrast where the eye actually looks. The bottom
           of the image is cropped via object-position so the
           grass/shadow in the original photo never reaches the
           card surface at all. */
        .pre-faq-cta-art {
          bottom: 0;
          display: none;
          margin: 0;
          pointer-events: none;
          position: absolute;
          right: 0;
          top: 0;
          width: 47%;
          z-index: 1;
        }

        .pre-faq-cta-portrait {
          display: block;
          height: 100%;
          object-fit: cover;
          /* Lift the crop so the visible area is Peter's hair → upper
             torso. The grass/dark ground never enters the card. */
          object-position: 50% 22%;
          width: 100%;
          /* Single horizontal mask, alpha mode. Seven short stops
             make the fade perceptually continuous — no single jump
             is large enough for the eye to catch as a "line". */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.18) 8%,
            rgba(0, 0, 0, 0.38) 16%,
            rgba(0, 0, 0, 0.62) 26%,
            rgba(0, 0, 0, 0.85) 38%,
            #000 52%,
            #000 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.18) 8%,
            rgba(0, 0, 0, 0.38) 16%,
            rgba(0, 0, 0, 0.62) 26%,
            rgba(0, 0, 0, 0.85) 38%,
            #000 52%,
            #000 100%
          );
          /* Force alpha interpretation so the rgba() ladder reads as
             alpha intensity on every engine (Safari/older Chromium
             would otherwise fall back to luminance and treat the
             fades as fully transparent). */
          -webkit-mask-mode: alpha;
          mask-mode: alpha;
        }

        /* ── Hover states ───────────────────────────────────────────── */
        @media (hover: hover) and (pointer: fine) {
          .pre-faq-cta-button:hover {
            transform: translateY(-2px);
          }

          .pre-faq-cta-button.is-primary:hover {
            background: linear-gradient(135deg, #e02400 0%, #e64a19 55%, #ff5722 100%);
            box-shadow: 0 14px 30px rgba(255, 87, 34, 0.36);
          }

          .pre-faq-cta-button.is-primary:hover .fsv-btn__arrow {
            transform: translateX(3px);
          }

          .pre-faq-cta-button.is-secondary:hover {
            background: #ff5722;
            border-color: #ff5722;
          }
        }

        @media (min-width: 900px) {
          .pre-faq-cta-art {
            display: block;
          }
        }

        @media (max-width: 899px) {
          .pre-faq-cta-card {
            min-height: 0;
          }
        }

        @media (max-width: 640px) {
          .pre-faq-cta {
            padding-inline: 0.75rem;
          }

          .pre-faq-cta-card {
            border-radius: 1.1rem;
            padding: 1.5rem 1.25rem;
          }

          .pre-faq-cta-content {
            align-items: center;
            text-align: center;
          }

          .pre-faq-cta-title {
            font-size: clamp(1.75rem, 7.4vw, 2.25rem);
            text-wrap: wrap;
          }

          .pre-faq-cta-logo-divider {
            display: none;
          }

          .pre-faq-cta-logos {
            justify-content: center;
          }

          .pre-faq-cta-logo-block {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          .pre-faq-cta-actions,
          .pre-faq-cta-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pre-faq-cta-button,
          .pre-faq-cta-button .fsv-btn__arrow {
            transition: none;
          }

          .pre-faq-cta-button:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="pre-faq-cta-card">
        <div className="pre-faq-cta-content">
          <div className="pre-faq-cta-logos" aria-label="All Fire Services credentials">
            <div className="pre-faq-cta-logo-block">
              <Image
                className="pre-faq-cta-logo"
                src="/logo.png"
                alt="All Fire Services Sydney — Protecting People, Protecting Property"
                width={527}
                height={257}
                sizes="(max-width: 640px) 11rem, 15rem"
              />
              <span className="pre-faq-cta-logo-divider" aria-hidden="true" />
              <Image
                className="pre-faq-cta-logo"
                src="/secondlogo.png"
                alt="FPA Australia Bronze Member — Fire Protection Association Australia"
                width={302}
                height={144}
                sizes="(max-width: 640px) 9rem, 12rem"
              />
            </div>
          </div>

          <p className="pre-faq-cta-eyebrow">Free Site Visit</p>

          <h2 className="pre-faq-cta-title" id="sitewide-cta-title">
            Peter will personally<br />
            <span className="pre-faq-cta-title-line-2">come to your property.</span>
          </h2>

          <div className="pre-faq-cta-actions">
            <FreeSiteVisitButton
              source="sitewide"
              pulse
              className="pre-faq-cta-button is-primary"
              label="Book the Boss"
              trailingIcon={
                <svg
                  className="fsv-btn__arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
              }
              style={{
                borderRadius: "0.55rem",
                padding: "0.85rem 1.5rem",
                minHeight: "2.95rem",
                fontSize: "0.95rem",
                letterSpacing: "0.06em",
                fontWeight: 800,
              }}
            />
            <a className="pre-faq-cta-button is-secondary" href="tel:1300765594">
              Call 1300 765 594
            </a>
          </div>
        </div>

        {/* Right region — half-card cover image of Peter (Managing
            Director). Decorative; the heading names Peter for screen
            readers. */}
        <div className="pre-faq-cta-art" aria-hidden="true">
          <Image
            className="pre-faq-cta-portrait"
            src="/petercropped.jpg"
            alt=""
            width={2048}
            height={1536}
            sizes="(min-width: 900px) 35vw, 0px"
          />
        </div>
      </div>
    </section>
  );
}
