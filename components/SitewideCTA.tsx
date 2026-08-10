"use client";

import Image from "next/image";
import Link from "next/link";

export default function SitewideCTA() {
  return (
    <section
      className="pre-faq-cta"
      aria-labelledby="sitewide-cta-title"
      style={{
        marginBottom: "0",
        marginTop: "0",
      }}
    >
      <style>{`
        .pre-faq-cta {
          background: transparent;
          padding: 2rem 1.25rem 2rem;
        }

        .pre-faq-cta-card {
          align-items: center;
          background:
            radial-gradient(circle at 12% 18%, rgba(180, 20, 20, 0.18), transparent 45%),
            radial-gradient(circle at 88% 82%, rgba(255, 87, 34, 0.16), transparent 45%),
            linear-gradient(135deg, #fff5f0 0%, #fffaf6 45%, #fff0ea 100%);
          border: 1px solid rgba(226, 35, 26, 0.18);
          border-radius: 1.5rem;
          box-shadow: 0 2rem 4.5rem rgba(17, 17, 17, 0.12);
          color: #111111;
          display: flex;
          flex-direction: column;
          isolation: isolate;
          margin-inline: auto;
          max-width: 71rem;
          min-height: 24rem;
          overflow: hidden;
          padding: clamp(2rem, 5vw, 4.5rem);
          position: relative;
          text-align: center;
        }

        .pre-faq-cta-card::before {
          background:
            linear-gradient(135deg, rgba(180, 20, 20, 0.06) 0%, rgba(255, 87, 34, 0.04) 50%, rgba(120, 10, 10, 0.08) 100%);
          content: "";
          inset: 0;
          position: absolute;
          z-index: -1;
        }

        .pre-faq-cta-logos {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: clamp(0.8rem, 2vw, 1.4rem);
          justify-content: center;
          margin-bottom: clamp(1.4rem, 3vw, 2.2rem);
          width: 100%;
        }

        .pre-faq-cta-logo {
          display: block;
          filter: drop-shadow(0 0.75rem 1.2rem rgba(17, 17, 17, 0.18));
          height: clamp(2.8rem, 5vw, 4.5rem);
          object-fit: contain;
          width: auto;
        }

        .pre-faq-cta-logo.is-primary {
          height: clamp(3.4rem, 6vw, 5.4rem);
        }

        .pre-faq-cta-title {
          color: #111111;
          font-size: clamp(2rem, 4.2vw, 4rem);
          font-weight: 780;
          letter-spacing: -0.06em;
          line-height: 0.92;
          margin: 0;
          max-width: 15ch;
          text-wrap: balance;
        }

        .pre-faq-cta-copy {
          color: #4a4a46;
          font-size: clamp(1rem, 1.7vw, 1.18rem);
          font-weight: 700;
          line-height: 1.45;
          margin: 1.75rem 0 0;
          max-width: 52rem;
          text-wrap: balance;
        }

        .pre-faq-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          justify-content: center;
          margin-top: 2.4rem;
        }

        .pre-faq-cta-button {
          align-items: center;
          border: 1px solid #111111;
          border-radius: 0.55rem;
          color: #111111;
          display: inline-flex;
          font-size: 0.95rem;
          font-weight: 850;
          justify-content: center;
          line-height: 1;
          min-height: 2.75rem;
          padding: 0 1.2rem;
          text-decoration: none;
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            transform 180ms ease;
        }

        .pre-faq-cta-button.is-primary {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
        }

        .pre-faq-cta-button.is-secondary {
          background: linear-gradient(135deg, #b41414 0%, #ff5722 50%, #ff8a4c 100%);
          border-color: #ff5722;
          color: #ffffff;
        }

        .pre-faq-cta-button:focus-visible {
          outline: 2px solid #ff5722;
          outline-offset: 4px;
        }

        @media (hover: hover) and (pointer: fine) {
          .pre-faq-cta-button:hover {
            transform: translateY(-2px);
          }

          .pre-faq-cta-button.is-primary:hover {
            background: #ff5722;
            border-color: #ff5722;
            color: #ffffff;
          }

          .pre-faq-cta-button.is-secondary:hover {
            background: linear-gradient(135deg, #8a0e0e 0%, #e64a19 50%, #ff5722 100%);
            border-color: #e64a19;
          }
        }

        @media (max-width: 640px) {
          .pre-faq-cta {
            padding-inline: 1rem;
          }

          .pre-faq-cta-card {
            border-radius: 1rem;
            min-height: 26rem;
          }

          .pre-faq-cta-logos {
            gap: 0.85rem;
          }

          .pre-faq-cta-logo,
          .pre-faq-cta-logo.is-primary {
            max-width: min(100%, 14rem);
          }

          .pre-faq-cta-actions,
          .pre-faq-cta-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pre-faq-cta-button {
            transition: none;
          }
        }
      `}</style>
      <div className="pre-faq-cta-card">
        <div className="pre-faq-cta-logos" aria-label="All Fire Services memberships">
          <Image
            className="pre-faq-cta-logo is-primary"
            src="/logo.png"
            alt="All Fire Services"
            width={527}
            height={257}
          />
          <Image
            className="pre-faq-cta-logo"
            src="/secondlogo.png"
            alt="FPA Australia Bronze Member"
            width={302}
            height={144}
          />
        </div>
        <h2 className="pre-faq-cta-title" id="sitewide-cta-title">
          Ready to raise <span style={{ color: '#ff2a00' }}>your</span><br />
          <span style={{
            background: 'linear-gradient(to right, #ff2a00, #ffb700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>fire safety standard?</span>
        </h2>
        <p className="pre-faq-cta-copy">
          Speak with All Fire Services about compliance testing, annual fire
          safety statements, and practical protection for your Sydney property.
        </p>
        <div className="pre-faq-cta-actions">
          <a className="pre-faq-cta-button is-primary" href="tel:1300765594">
            Call 1300 765 594
          </a>
          <Link className="pre-faq-cta-button is-secondary" href="/contact">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
