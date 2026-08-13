"use client";

import Image from "next/image";
import styles from "@/components/HomeStoryLegacy.module.css";

const clients = [
  { name: "Household Properties", src: "/client-logos/household-properties.png", width: 250, height: 88 },
  { name: "Civium", src: "/client-logos/civium.svg", width: 158, height: 29 },
  { name: "LUNA Management", src: "/client-logos/luna.png", width: 130, height: 48 },
  { name: "Vital Strata Management", src: "/client-logos/vital-strata.png", width: 400, height: 400, className: "is-square" },
  { name: "Netstrata", src: "/client-logos/netstrata.svg", width: 240, height: 68 },
  { name: "Get Strata", src: "/client-logos/get-strata.png", width: 135, height: 72, className: "is-inverted" },
  { name: "Cambridge Lodge", src: "/client-logos/cambridge-lodge.jpg", width: 296, height: 90 },
  { name: "Strathfield Partners", src: "/client-logos/strathfield-partners.png", width: 500, height: 221 },
  { name: "Arriva", src: "/client-logos/arriva.svg", width: 131, height: 39 },
];

// Two marquee rows — alternating slide direction gives the same parallax feel
// as the home page's ClientsMarquee. Each row is duplicated 4× so the wrap is
// seamless and the animation can translate by -50% without exposing a gap.
const clientLogoRows = [
  clients.slice(0, 5),
  clients.slice(5),
];

export default function ClientGrid() {
  return (
    <section className="bg-white clients-marquee" data-theme="light" aria-labelledby="clients-marquee-title">
      <style>{`
        .clients-marquee {
          background: #ffffff;
          overflow: hidden;
          padding: clamp(1.5rem, 3vw, 2.5rem) 0;
          position: relative;
        }

        .clients-marquee::before,
        .clients-marquee::after {
          content: "";
          inset-block: 0;
          pointer-events: none;
          position: absolute;
          width: min(13vw, 9rem);
          z-index: 2;
        }

        .clients-marquee::before {
          background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
          left: 0;
        }

        .clients-marquee::after {
          background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
          right: 0;
        }

        .clients-marquee-track-wrap {
          display: grid;
          gap: clamp(1.6rem, 3.2vw, 2.7rem);
        }

        .clients-marquee-track {
          display: flex;
          gap: clamp(2.4rem, 5.2vw, 4.5rem);
          width: max-content;
          will-change: transform;
        }

        .clients-marquee-track.is-left {
          animation: clients-slide-left 38s linear infinite;
        }

        .clients-marquee-track.is-right {
          animation: clients-slide-right 34s linear infinite;
        }

        .clients-marquee-item {
          align-items: center;
          display: flex;
          flex: 0 0 clamp(9rem, 12vw, 13rem);
          height: clamp(4rem, 5.5vw, 5.5rem);
          justify-content: center;
        }

        .clients-marquee-logo {
          display: block;
          height: auto;
          max-height: clamp(2.4rem, 3.8vw, 3.8rem);
          max-width: min(100%, 12rem);
          object-fit: contain;
          width: auto;
        }

        .clients-marquee-logo.is-square {
          max-height: clamp(4rem, 5.2vw, 5.2rem);
        }

        .clients-marquee-logo.is-inverted {
          background-color: #1a1a1a;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
        }

        @keyframes clients-slide-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes clients-slide-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-track.is-left,
          .clients-marquee-track.is-right {
            animation-duration: 90s;
          }
        }

        @media (max-width: 767px) {
          .clients-marquee {
            padding-block: 2.75rem;
          }

          .clients-marquee-track {
            gap: 2rem;
          }

          .clients-marquee-item {
            flex-basis: 11rem;
            height: 5.5rem;
          }
        }
      `}</style>

      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
            <header
              className={styles.legacyHeader}
              style={{ marginTop: 0, marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
            >
              <p className={styles.kicker}>Trusted by</p>
              <h2 id="clients-marquee-title" style={{ color: '#111111', maxWidth: 'none' }}>
                Greater Sydney&rsquo;s <span style={{ color: '#ff2a00', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Property</span><br />
                <span style={{
                  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 780,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.92,
                }}>Managers</span>
              </h2>
              <p>
                The property managers, strata teams and building owners across Greater Sydney who trust All Fire Services with their compliance, inspections and ongoing fire-safety support.
              </p>
            </header>
          </div>
        </div>
      </div>

      <div className="clients-marquee-track-wrap" aria-label="Client logos">
        {clientLogoRows.map((row, rowIndex) => {
          const repeatedLogos = [...row, ...row, ...row, ...row];
          return (
            <div
              key={rowIndex}
              className={`clients-marquee-track ${rowIndex === 0 ? "is-right" : "is-left"}`}
            >
              {repeatedLogos.map((logo, logoIndex) => (
                <div
                  className="clients-marquee-item"
                  key={`${logo.name}-${logoIndex}`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className={`clients-marquee-logo ${logo.className ?? ""}`}
                    sizes="(max-width: 767px) 12rem, 18rem"
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
