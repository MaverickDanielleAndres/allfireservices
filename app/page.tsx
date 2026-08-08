import {
  MotionConfig,
  MotionDiv,
  MotionSection,
} from "@/components/MotionPrimitives";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Counter from "@/components/Counter";
import Link from "next/link";

const ContactCTA = dynamic(() => import("@/components/ContactCTA"));
const StrataSection = dynamic(() => import("@/components/StrataSection"));
const FireSafetyShorts = dynamic(() => import("@/components/FireSafetyShorts"));
const ClientFeedback = dynamic(() => import("@/components/testimonial"));
const GoogleReviews = dynamic(() => import("@/components/GoogleReviews"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const HomeStoryLegacy = dynamic(() => import("@/components/HomeStoryLegacy"));
const FounderLegacy = dynamic(() => import("@/components/FounderLegacy"));
const HomeServices = dynamic(() => import("@/components/HomeServices"));

const sectionReveal = {
  initial: { opacity: 1, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

const clientLogoRows = [
  [
    {
      name: "Household Properties",
      src: "/client-logos/household-properties.png",
      width: 250,
      height: 88,
    },
    {
      name: "Civium",
      src: "/client-logos/civium.svg",
      width: 158,
      height: 29,
    },
    {
      name: "LUNA Management",
      src: "/client-logos/luna.png",
      width: 130,
      height: 48,
    },
    {
      name: "Vital Strata Management",
      src: "/client-logos/vital-strata.png",
      width: 400,
      height: 400,
      className: "is-square",
    },
    {
      name: "Netstrata",
      src: "/client-logos/netstrata.svg",
      width: 240,
      height: 68,
    },
  ],
  [
    {
      name: "Get Strata",
      src: "/client-logos/get-strata.png",
      width: 135,
      height: 72,
      className: "is-inverted",
    },
    {
      name: "Cambridge Lodge",
      src: "/client-logos/cambridge-lodge.jpg",
      width: 296,
      height: 90,
    },
    {
      name: "Strathfield Partners",
      src: "/client-logos/strathfield-partners.png",
      width: 500,
      height: 221,
    },
    {
      name: "Arriva",
      src: "/client-logos/arriva.svg",
      width: 131,
      height: 39,
    },
  ],
];

function ClientsMarquee() {
  return (
    <section className="clients-marquee" aria-labelledby="clients-marquee-title">
      <style>{`
        .clients-marquee {
          background: #ffffff;
          overflow: hidden;
          padding: clamp(0.75rem, 1.5vw, 1.25rem) 0 clamp(1.5rem, 3vw, 2.5rem);
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

        .clients-marquee-header {
          margin: 0 auto clamp(1.8rem, 4vw, 2.8rem);
          max-width: 46rem;
          padding: 0 1.25rem;
          text-align: center;
        }

        .clients-marquee-kicker {
          color: #ff5722;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 0.7rem;
          text-transform: uppercase;
        }

        .clients-marquee-title {
          color: #111111;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: normal;
          letter-spacing: 0;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
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

function PreFaqCTA() {
  return (
    <section className="pre-faq-cta" aria-labelledby="pre-faq-cta-title">
      <style>{`
        .pre-faq-cta {
          background: #ffffff;
          padding: clamp(3rem, 7vw, 6rem) 1.25rem 2rem;
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
        <h2 className="pre-faq-cta-title" id="pre-faq-cta-title">
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

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="main-wrapper">
        <div className="scroll-wrapper">
        <div className="hero-and-cards-wrapper">
          <style>{`
            .hero-and-cards-wrapper {
              position: relative;
              width: 100%;
              z-index: 10;
            }
            .shared-bg-image {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              z-index: 0;
            }
            .home-hero-section {
              position: relative;
              z-index: 1;
              width: 100%;
            }
            .hero-container {
              position: relative;
              overflow: hidden;
              min-height: 65vh;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              padding: 2rem 4rem 14rem 4rem;
              max-width: 1440px;
              margin: 0 auto;
              background-color: transparent;
              gap: 4rem;
            }

            .hero-content {
              position: relative;
              z-index: 2;
              flex: 1;
              max-width: 1000px;
              color: #ffffff;
              animation: fade-in 300ms ease-in-out;
            }
            .hero-analytics {
              position: relative;
              z-index: 2;
              width: auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-end;
              gap: 1.25rem;
              text-align: right;
              margin-bottom: 2rem;
            }
            .analytics-item {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            .analytics-number {
              font-size: 2.25rem;
              font-weight: 800;
              color: #ffffff;
              line-height: 1;
              margin-bottom: 0.25rem;
            }
            .analytics-number.is-range {
              white-space: nowrap;
            }
            .analytics-label {
              font-size: 0.9rem;
              font-weight: 600;
              color: #ffffff;
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .hero-kicker {
              font-size: 0.8rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 1rem;
              color: #ffffff;
            }
            .hero-title {
              font-size: clamp(1rem, 5vw, 5.5rem);
              font-weight: 900;
              line-height: 1.1;
              margin-bottom: 1.5rem;
              text-transform: uppercase;
              color: #ffffff;
            }
            .hero-title-desktop {
              display: block;
            }
            .hero-title-mobile {
              display: none;
            }
            .hero-title-line {
              display: block;
              white-space: nowrap;
            }
            .hero-subtitle {
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 1rem;
              color: #f7f7f5;
            }
            .hero-body {
              font-size: 1.35rem;
              line-height: 1.5;
              margin-bottom: 2.5rem;
              color: rgba(255, 255, 255, 0.9);
              max-width: 600px;
            }
            .hero-actions {
              display: flex;
              gap: 1rem;
            }
            .btn-primary {
              background: #fb5614;
              color: #ffffff;
              padding: 1rem 2rem;
              border-radius: 99px;
              font-weight: 700;
              text-decoration: none;
              transition: background-color 200ms ease;
            }
            .btn-primary:hover {
              background: #fc0403;
            }
            .btn-secondary {
              background: #ffffff;
              color: #111111;
              padding: 1rem 2rem;
              border-radius: 99px;
              font-weight: 700;
              text-decoration: none;
              transition: background-color 200ms ease;
            }
            .btn-secondary:hover {
              background: #f7f7f5;
            }
            
            .info-cards-wrapper {
              position: relative;
              padding: 5rem 0 6rem 0;
              background-color: transparent;
              z-index: 2;
            }
            .info-cards-section {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1.5rem;
              max-width: 1440px;
              margin: 0 auto;
              padding: 0 2rem;
              position: relative;
              z-index: 1;
            }
            .info-card {
              background: #ffffff;
              border-radius: 1.5rem;
              padding: 2.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              position: relative;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08); /* Increased shadow to pop on light bg */
            }
            .info-card.dark {
              background: #111111;
              color: #ffffff;
            }
            .info-card.card-1 {
              background: linear-gradient(135deg, #d81b1b, #a31010);
            }
            .info-card.card-2 {
              background: linear-gradient(135deg, #660c0c, #3d0505);
            }
            .info-card.card-3 {
              background: #111111;
            }
            .card-title {
              font-size: 1.5rem;
              font-weight: 800;
              margin-bottom: 0.5rem;
              color: #111111;
              z-index: 2;
              position: relative;
            }
            .info-card.dark .card-title {
              color: #ffffff;
            }
            .card-text {
              font-size: 1rem;
              color: #666666;
              font-weight: 500;
              z-index: 2;
              position: relative;
            }
            .info-card.dark .card-text {
              color: rgba(255, 255, 255, 0.7);
            }
            .card-watermark {
              position: absolute;
              right: 1.5rem;
              bottom: 0.5rem;
              font-size: 4.5rem;
              line-height: 1;
              font-weight: 900;
              color: rgba(0, 0, 0, 0.03); /* Changed to black for white bg */
              z-index: 1;
              pointer-events: none;
              white-space: nowrap;
            }
            .info-card.dark .card-watermark {
              color: rgba(255, 255, 255, 0.03);
            }

            @media (max-width: 1024px) {
              .hero-container {
                padding: 4rem 2rem 12rem 2rem;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
              }
              .hero-content {
                max-width: 100%;
              }
              .hero-title-line {
                white-space: normal;
              }
              .hero-analytics {
                width: 100%;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                text-align: left;
                align-items: flex-start;
                gap: 2rem;
              }
              .analytics-item {
                flex: 1 1 calc(33.333% - 1rem);
                min-width: 150px;
                align-items: flex-start;
              }
              .info-cards-section {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            @media (max-width: 768px) {
              .home-hero-section {
                padding: 0;
              }
              .hero-container {
                padding: 2rem 1.5rem 12rem 1.5rem;
                gap: 2.5rem;
              }
              .hero-kicker {
                font-size: 0.8rem;
                white-space: nowrap;
              }
              .hero-title {
                line-height: 1.15;
                word-break: normal;
                overflow-wrap: break-word;
              }
              .hero-title-desktop {
                display: none;
              }
              .hero-title-mobile {
                display: block;
              }
              .hero-title-line {
                display: block;
                white-space: nowrap;
              }
              .hero-title-mobile .line-1 {
                font-size: clamp(1.2rem, 9vw, 2.75rem);
              }
              .hero-title-mobile .line-2,
              .hero-title-mobile .line-3,
              .hero-title-mobile .line-4 {
                font-size: clamp(1.6rem, 11vw, 2.75rem);
              }
              .hero-subtitle {
                font-size: 1.05rem;
                margin-bottom: 0.75rem;
              }
              .hero-body {
                font-size: 1.15rem;
                margin-bottom: 1.5rem;
              }
              .hero-actions {
                flex-direction: column;
                align-items: stretch;
                gap: 0.75rem;
              }
              .hero-actions .btn-primary, .hero-actions .btn-secondary {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 100%;
                min-height: 3rem;
                padding: 0.8rem 1rem;
                font-size: 0.95rem;
                box-sizing: border-box;
              }
              .hero-analytics {
                flex-direction: row;
                justify-content: space-between;
                gap: 0.5rem;
                margin-bottom: 2rem;
                align-items: stretch;
                text-align: center;
                width: 100%;
              }
              .analytics-item {
                flex: 1 1 0;
                min-width: 0;
                width: auto;
                align-items: center;
                justify-content: center;
              }
              .analytics-number {
                font-size: clamp(1.2rem, 5vw, 1.5rem);
                margin-bottom: 0.2rem;
                line-height: 1.1;
              }
              .analytics-number.is-range {
                font-size: clamp(1.2rem, 5vw, 1.5rem);
              }
              .analytics-label {
                font-size: 0.7rem;
                line-height: 1.2;
              }
              .mobile-video-tall {
                aspect-ratio: 4/3 !important;
              }
              .info-cards-section {
                grid-template-columns: 1fr;
                padding: 0 1rem;
              }
            }
          `}</style>
          
          <div className="bg-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image 
              src="/annual-fire-safety-statement/all-fire-services-hydrant-flow-test-1.webp" 
              alt="All Fire Services Hydrant Test" 
              fill 
              style={{ objectFit: 'cover' }}
              priority
              fetchPriority="high"
              quality={60}
              sizes="100vw"
            />
            {/* Dark tint overlay – fades away toward bottom so white fade is unobstructed */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(20,5,5,0.82) 30%, rgba(30,5,5,0.72) 50%, rgba(40,8,8,0.45) 68%, rgba(50,8,8,0.18) 80%, rgba(255,255,255,0) 92%)' }}></div>
            {/* Right-side colour tint (horizontal) – kept separate so it doesn't interfere with vertical fade */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(30,5,5,0.35) 40%, rgba(70,10,10,0.15) 70%, transparent 100%)', mixBlendMode: 'multiply' }}></div>

            {/* Seamless fade to white – tall & cubic-eased to prevent any visible line */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.01) 8%, rgba(255,255,255,0.03) 16%, rgba(255,255,255,0.07) 24%, rgba(255,255,255,0.13) 32%, rgba(255,255,255,0.22) 40%, rgba(255,255,255,0.34) 49%, rgba(255,255,255,0.49) 57%, rgba(255,255,255,0.64) 65%, rgba(255,255,255,0.78) 73%, rgba(255,255,255,0.89) 81%, rgba(255,255,255,0.96) 89%, #ffffff 95%, #ffffff 100%)', zIndex: 2 }}></div>
          </div>
          <section className="home-hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-kicker">
                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#fb5614', marginRight: '10px', verticalAlign: 'middle', marginBottom: '2px' }}></span>
                Reliable fire safety starts here
              </div>
              <h1 className="hero-title">
                <div className="hero-title-desktop">
                  <span className="hero-title-line">FIRE SAFETY IS NOT A</span>
                  <span className="hero-title-line">BOX TO TICK. <span style={{ color: "#ff0000" }}>IT&apos;S A</span></span>
                  <span className="hero-title-line"><span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '0.05em' }}>RESPONSIBILITY.</span></span>
                </div>
                <div className="hero-title-mobile">
                  <span className="hero-title-line line-1">FIRE SAFETY IS</span>
                  <span className="hero-title-line line-2">NOT A BOX TO</span>
                  <span className="hero-title-line line-3">TICK. <span style={{ color: "#ff0000" }}>IT&apos;S A</span></span>
                  <span className="hero-title-line line-4"><span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '0.05em' }}>RESPONSIBILITY.</span></span>
                </div>
              </h1>
              <p className="hero-body">
                <strong style={{ color: "#ffffff", fontWeight: 800 }}>Fire protection is more than a service, it&apos;s in our blood.</strong> Backed by generations of firefighting experience, we deliver practical and reliable fire safety solutions.
              </p>
              <div className="hero-actions">
                <Link href="/contact" className="btn-primary">Get a Quote</Link>
                <Link href="/services" className="btn-secondary">Explore Our Services</Link>
              </div>
            </div>
            
              <MotionDiv 
                className="hero-analytics"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="analytics-item">
                  <div className="analytics-number is-range">1911&ndash;2026</div>
                  <div className="analytics-label">Family firefighting legacy</div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-number"><Counter from={2026} to={2009} duration={0.4} /></div>
                  <div className="analytics-label">Australian owned since</div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-number"><Counter from={10} to={24} suffix="/7" duration={0.4} /></div>
                  <div className="analytics-label">Emergency response</div>
                </div>
              </MotionDiv>
            </div>
          </section>
        </div>
        <div style={{ position: "relative", zIndex: 10, backgroundColor: "#ffffff", marginTop: "-2px" }}>

        <FounderLegacy />
        <HomeStoryLegacy />

        <HomeServices />

        <MotionDiv {...sectionReveal}>
          <GoogleReviews />
        </MotionDiv>
        <MotionDiv {...sectionReveal}>
          <ClientsMarquee />
        </MotionDiv>

        {/* Full-width Autoplaying Hero Video */}
        <MotionDiv {...sectionReveal} style={{ width: '100%' }}>
          <video 
            src="/hero-video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="none"
            className="mobile-video-tall"
            style={{ width: '100%', aspectRatio: '16/9', maxHeight: '800px', display: 'block', objectFit: 'cover' }}
          />
        </MotionDiv>

        <StrataSection />
        {/* ── Fire Safety Shorts ── */}
        <MotionDiv {...sectionReveal}>
          <FireSafetyShorts />
        </MotionDiv>

        <MotionDiv {...sectionReveal}>
          <FAQ />
        </MotionDiv>
        <MotionDiv {...sectionReveal}>
          <PreFaqCTA />
        </MotionDiv>

        <MotionDiv {...sectionReveal}>
          <ContactCTA />
        </MotionDiv>
        </div>
        </div>
      </main>
    </MotionConfig>
  );
}
