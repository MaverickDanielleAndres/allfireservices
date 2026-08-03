"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SitewideCTA() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <section className="pre-faq-cta" aria-labelledby="sitewide-cta-title">
      <style>{`
        .pre-faq-cta {
          background: transparent;
          padding: 5rem 1.25rem 5rem;
        }

        .pre-faq-cta-card {
          align-items: center;
          background:
            radial-gradient(circle at 48% 10%, rgba(254, 175, 4, 0.38), transparent 28%),
            radial-gradient(circle at 12% 18%, rgba(252, 4, 3, 0.28), transparent 32%),
            linear-gradient(135deg, #fc0403 0%, #fb5614 43%, #feaf04 100%);
          border-radius: 1.5rem;
          box-shadow: 0 2rem 4.5rem rgba(17, 17, 17, 0.16);
          color: #ffffff;
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
            linear-gradient(180deg, rgba(17, 17, 17, 0.02), rgba(17, 17, 17, 0.72)),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 96px);
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
          filter: brightness(0) invert(1) drop-shadow(0 0.75rem 1.2rem rgba(17, 17, 17, 0.18));
          height: clamp(2.8rem, 5vw, 4.5rem);
          object-fit: contain;
          width: auto;
        }

        .pre-faq-cta-logo.is-primary {
          height: clamp(3.4rem, 6vw, 5.4rem);
        }

        .pre-faq-cta-title {
          color: #ffffff;
          font-size: clamp(2.2rem, 5.4vw, 4.25rem);
          font-weight: 500;
          letter-spacing: 0;
          line-height: 0.98;
          margin: 0;
          max-width: 15ch;
          text-wrap: balance;
        }

        .pre-faq-cta-copy {
          color: rgba(255, 255, 255, 0.9);
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
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 0.55rem;
          color: #ffffff;
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
          background: #feaf04;
          border-color: #feaf04;
          color: #111111;
        }

        .pre-faq-cta-button:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 4px;
        }

        @media (hover: hover) and (pointer: fine) {
          .pre-faq-cta-button:hover {
            transform: translateY(-2px);
          }

          .pre-faq-cta-button.is-primary:hover {
            background: #fc0403;
            border-color: #fc0403;
          }

          .pre-faq-cta-button.is-secondary:hover {
            background: #ffffff;
            border-color: #ffffff;
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
          Ready to raise your fire safety standard?
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
