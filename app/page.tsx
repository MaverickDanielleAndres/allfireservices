import RevealOnView from "@/components/RevealOnView";
import Image from "next/image";
import dynamic from "next/dynamic";
import DeferredVideo from "@/components/DeferredVideo";
import Link from "next/link";
import FreeSiteVisitButton from "@/components/free-site-visit/FreeSiteVisitButton";
import heroStyles from "./HomeHero.module.css";

const ContactCTA = dynamic(() => import("@/components/ContactCTA"));
const StrataSection = dynamic(() => import("@/components/StrataSection"));
const FireSafetyShorts = dynamic(() => import("@/components/FireSafetyShorts"));
const ClientFeedback = dynamic(() => import("@/components/testimonial"));
const GoogleReviews = dynamic(() => import("@/components/GoogleReviews"));
const HomeStoryLegacy = dynamic(() => import("@/components/HomeStoryLegacy"));
const FounderLegacy = dynamic(() => import("@/components/FounderLegacy"));
const HomeServices = dynamic(() => import("@/components/HomeServices"));

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
          padding: clamp(0.5rem, 1vw, 0.75rem) 0 clamp(1.5rem, 3vw, 2.5rem);
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

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <div className={heroStyles.wrapper}>
          <div className="bg-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {/* Hero background video — autoplays muted / looped / inline as
                soon as the wrapper enters the viewport (DeferredVideo defers
                the <video> mount until then, so mobile data isn't burned).
                The poster image is shown first as a seamless placeholder. */}
            <DeferredVideo
              src="/hero-video.mp4?v=2"
              poster="/herosectionimage.webp"
              autoPlayOnView
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Dark tint overlay – sits ABOVE the video so the headline copy
                stays legible even when a bright frame rolls past. */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(20,5,5,0.82) 30%, rgba(30,5,5,0.72) 50%, rgba(40,8,8,0.45) 68%, rgba(50,8,8,0.18) 80%, rgba(255,255,255,0) 92%)' }}></div>
            {/* Right-side colour tint (horizontal) – kept separate so it doesn't interfere with vertical fade */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(30,5,5,0.35) 40%, rgba(70,10,10,0.15) 70%, transparent 100%)', mixBlendMode: 'multiply' }}></div>

            {/* Seamless fade to white – short band so the next section sits
                close to the hero without a tall blank gap. */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '32%', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 12%, rgba(255,255,255,0.12) 24%, rgba(255,255,255,0.22) 36%, rgba(255,255,255,0.36) 48%, rgba(255,255,255,0.54) 60%, rgba(255,255,255,0.72) 72%, rgba(255,255,255,0.86) 84%, rgba(255,255,255,0.96) 94%, #ffffff 100%)', zIndex: 2 }}></div>
          </div>
          <section className={heroStyles.heroSection}>
          <div className={heroStyles.heroContainer} style={{ minHeight: 'min(50vh, 540px)', paddingBottom: '5rem' }}>
            <div className={heroStyles.heroContent}>
              <div className={heroStyles.heroKicker}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#fb5614', marginRight: '10px', verticalAlign: 'middle', marginBottom: '2px' }}></span>
                Reliable fire safety starts here
              </div>
              <h1
                style={{
                  fontSize: 'clamp(1rem, 5vw, 5.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  margin: '0 0 1.5rem',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                <div className={heroStyles.heroTitleDesktop}>
                  <div style={{ whiteSpace: 'nowrap' }}>FIRE SAFETY IS NOT A</div>
                  <div style={{ whiteSpace: 'nowrap' }}>
                    BOX TO TICK. <span style={{ color: '#ff0000' }}>IT&apos;S A</span>
                  </div>
                  <div style={{ whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        paddingRight: '0.05em',
                      }}
                    >
                      RESPONSIBILITY.
                    </span>
                  </div>
                </div>
                <div className={heroStyles.heroTitleMobile}>
                  <div className={heroStyles.line1}>FIRE SAFETY IS</div>
                  <div className={heroStyles.line2}>NOT A BOX TO</div>
                  <div className={heroStyles.line3}>
                    TICK. <span style={{ color: '#ff0000' }}>IT&apos;S A</span>
                  </div>
                  <div className={heroStyles.line4}>
                    <span
                      style={{
                        background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        paddingRight: '0.05em',
                      }}
                    >
                      RESPONSIBILITY.
                    </span>
                  </div>
                </div>
              </h1>
              <p className={heroStyles.heroBody}>
                <strong style={{ color: "#ffffff", fontWeight: 800 }}>Fire protection is more than a service, it&apos;s in our blood.</strong> Backed by generations of firefighting experience, we deliver practical and reliable fire safety solutions.
              </p>
              <div className={heroStyles.heroActions}>
                <FreeSiteVisitButton
                  source="hero"
                  pulse
                  className={heroStyles.btnPrimary}
                  style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
                />
                <Link href="/services" className={heroStyles.btnSecondary}>Explore Our Services</Link>
              </div>
            </div>
            
              <RevealOnView
                className={heroStyles.heroAnalytics}
                threshold={0.05}
              >
                <div className={heroStyles.analyticsItem}>
                  <div className={`${heroStyles.analyticsNumber} ${heroStyles.analyticsNumberRange}`}>1911&ndash;2026</div>
                  <div className={heroStyles.analyticsLabel}>Family firefighting legacy</div>
                </div>
                <div className={heroStyles.analyticsItem}>
                  <div className={heroStyles.analyticsNumber}>Trusted</div>
                  <div className={heroStyles.analyticsLabel}>Across Greater Sydney</div>
                </div>
                <div className={heroStyles.analyticsItem}>
                  <div className={heroStyles.analyticsNumber}>24/7</div>
                  <div className={heroStyles.analyticsLabel}>Emergency response</div>
                </div>
              </RevealOnView>
            </div>
          </section>
        </div>
        <div style={{ position: "relative", zIndex: 10, backgroundColor: "#ffffff", marginTop: "-2px" }}>

        <FounderLegacy />
        <HomeStoryLegacy />

        <HomeServices />

        <StrataSection />

        <RevealOnView>
          <GoogleReviews />
        </RevealOnView>

        <RevealOnView>
          <ClientsMarquee />
        </RevealOnView>

        {/* Full-width Autoplaying Hero Video — only mounts once the user scrolls here */}
        <RevealOnView style={{ width: '100%' }}>
          <DeferredVideo
            src="/hero-video.mp4?v=2"
            poster="/herosectionimage.webp"
            className={heroStyles.mobileVideoTall}
            style={{ width: '100%', aspectRatio: '16/9', maxHeight: '800px', display: 'block', objectFit: 'cover', backgroundColor: '#111' }}
          />
        </RevealOnView>

        {/* ── Fire Safety Shorts ── */}
        <RevealOnView>
          <FireSafetyShorts />
        </RevealOnView>

        <RevealOnView>
          <ContactCTA />
        </RevealOnView>
        </div>
        </div>
      </main>
  );
}
