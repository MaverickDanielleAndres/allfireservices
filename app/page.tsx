import ContactCTA from "@/components/ContactCTA";
import {
  MotionConfig,
  MotionDiv,
  MotionHeader,
  MotionSection,
} from "@/components/MotionPrimitives";
import PortraitVideoGallery from "@/components/PortraitVideoGallery";
import ClientFeedback from "@/components/testimonial";
import WhyAllfireSticky from "@/components/WhyAllfireSticky";
import FAQ from "@/components/FAQ";
import HeroScrollContent from "@/components/HeroScrollContent";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import HomeStoryLegacy from "@/components/HomeStoryLegacy";
import HomepageStats from "@/components/HomepageStats";
import HomeServices from "@/components/HomeServices";
import Image from "next/image";
import Link from "next/link";

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
          margin: 0;
          overflow: hidden;
          padding: clamp(3.25rem, 7vw, 5.75rem) 0 clamp(2.5rem, 5vw, 4.75rem);
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
          font-size: clamp(1.65rem, 3.6vw, 2.7rem);
          font-weight: 900;
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
      <div className="clients-marquee-header">
        <div className="clients-marquee-kicker">Our clients</div>
        <h3 className="clients-marquee-title" id="clients-marquee-title">
          Trusted by property teams across Sydney
        </h3>
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

function PreFaqCTA() {
  return (
    <section className="pre-faq-cta" aria-labelledby="pre-faq-cta-title">
      <style>{`
        .pre-faq-cta {
          background: #f8f7f3;
          padding: clamp(3rem, 7vw, 6rem) 1.25rem 2rem;
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
        <h2 className="pre-faq-cta-title" id="pre-faq-cta-title">
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

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="main-wrapper">
        <div className="scroll-wrapper">
        <MotionHeader
          data-theme="dark"
          className="section_hero-home hero-scroll-section"
          style={{ position: "relative", zIndex: 0 }}
          initial={{ opacity: 1, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="code-embed-css w-embed"></div>
          <div className="code-embed-js w-embed w-script"></div>
          <div className="parallax hero-scroll-parallax">
            <section className="parallax__header hero-scroll-pin" style={{ height: "100vh" }}>
              <div className="parallax__visuals hero-scroll-visuals" style={{ isolation: "isolate" }}>
                <HeroScrollVideo />
              </div>
            </section>
            <HeroScrollContent>
              <MotionDiv
                className="hero-scroll-intro"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <div className="hero-scroll-intro-inner">
                  <p className="hero-scroll-intro-title">
                    <span>Let&apos;s protect</span>
                    <span>your property</span>
                  </p>
                  <p className="hero-scroll-intro-copy">
                    Fire safety, testing and compliance services <span>across Greater Sydney.</span>
                  </p>
                </div>
              </MotionDiv>
              <div className="padding-global hero-scroll-details">
                <div className="container-large">
                  <div className="hero-home_content">
                    <div className="padding-section-large is-hero-home" style={{ paddingTop: "2.5rem", paddingBottom: "2rem", width: "100%", minHeight: "auto", height: "auto" }}>
                      <div className="hero-home_component" style={{ width: "100%", minHeight: "auto", height: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", gap: "clamp(1.5rem, 4vw, 3.25rem)", alignItems: "flex-start" }}>
                        <div className="max-width-hero" style={{ flex: "0 1 44rem", minWidth: 0, zIndex: 10, margin: 0, padding: 0 }}>
                          <div className="header-wrapper" style={{ maxWidth: "800px", margin: "0 auto", padding: 0, display: "flex", flexDirection: "column" }}>
                            <div className="header-text-wrap" style={{
                                background: "rgba(0, 0, 0, 0.6)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                                padding: "2rem",
                                borderRadius: "16px",
                                color: "#ffffff",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                              <div className="header-top">
                                <div className="header-eyebrow-text" style={{ color: "#FEAF04", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                                  All Fire Services - Raising the standard
                                </div>
                                <h1 className="heading-style hero-details-title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.15", marginBottom: "1rem", color: "#ffffff" }}>
                                  Fire Safety &amp; Compliance Solutions
                                </h1>
                              </div>
                              <div className="hero_text-wrap">
                                <p className="body-text" style={{ fontSize: "1rem", lineHeight: "1.5", color: "rgba(255,255,255,0.9)", maxWidth: "600px" }}>
                                  We provide comprehensive fire safety and compliance solutions across the Greater Sydney Area. From annual fire safety statements to routine testing, we ensure your property is protected.
                                </p>
                              </div>
                            </div>
                            <div className="button-group" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                                    <a
                                      data-wf--button--size="large"
                                      href="tel:1300765594"
                                      className="button-wrap w-inline-block"
                                    >
                                      <div
                                        data-wf--button-style--
                                        className="button-content"
                                      >
                                        <div
                                          data-wf--button-layout--layout="normal"
                                          className="button-layout"
                                        >
                                          <div className="button-text">
                                            Call 1300 765 594
                                          </div>
                                          <div className="button-icon">
                                            <div className="icon-slot">
                                              <div className="icon-slot">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="100%"
                                                  viewBox="0 0 16 17"
                                                  fill="none"
                                                >
                                                  <g clipPath="url(#clip0_6401_1558)">
                                                    <path
                                                      d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
                                                      fill="currentColor"
                                                    ></path>
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_6401_1558">
                                                      <rect
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        transform="translate(0 0.5)"
                                                      ></rect>
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <Link
                                      data-wf--button--size="large"
                                      href="/contact"
                                      className="button-wrap w-inline-block"
                                    >
                                      <div
                                        data-wf--button-style--
                                        className="button-content w-variant-2322bba7-d743-d5ae-17b2-3a616235fc2a"
                                      >
                                        <div
                                          data-wf--button-layout--layout="normal"
                                          className="button-layout"
                                        >
                                          <div className="button-text">
                                            Get a Quote
                                          </div>
                                          <div className="button-icon">
                                            <div className="icon-slot">
                                              <div className="icon-slot">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="100%"
                                                  viewBox="0 0 16 17"
                                                  fill="none"
                                                >
                                                  <g clipPath="url(#clip0_6401_1558)">
                                                    <path
                                                      d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
                                                      fill="currentColor"
                                                    ></path>
                                                  </g>
                                                  <defs>
                                                    <clipPath id="clip0_6401_1558">
                                                      <rect
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        transform="translate(0 0.5)"
                                                      ></rect>
                                                    </clipPath>
                                                  </defs>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                            </div>
                            <HomepageStats />
                          </div>
                        </div>
                        <div className="hero-portrait-stack">
                          <div className="hero-expertise-card">
                            <div className="hero-expertise-kicker">
                              <span aria-hidden="true"></span>
                              Firefighter-led
                            </div>
                            <h2>Real-world fire safety expertise</h2>
                            <p>
                              Practical protection delivered by experienced
                              serving and retired firefighters.
                            </p>
                            <div className="hero-expertise-tags" aria-label="Service strengths">
                              <span>Greater Sydney</span>
                              <span>Rapid response</span>
                            </div>
                          </div>
                          <div className="hero-portrait-wrapper" style={{ flex: "1 1 auto", width: "100%", maxWidth: "100%", minWidth: 0, marginLeft: 0, position: "relative", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <Image
                              fill
                              src="/herosectionimage.webp"
                              alt="All Fire Services Technicians"
                              sizes="300px"
                              loading="eager"
                              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
                            />
                            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)", zIndex: 1 }}></div>
                            <div style={{ position: "relative", zIndex: 2, padding: "1.5rem", color: "#ffffff" }}>
                              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Expert Technicians</h3>
                              <p style={{ fontSize: "0.875rem", opacity: "0.9" }}>Ready to secure your property today.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </HeroScrollContent>

          </div>
        </MotionHeader>
        <div style={{ position: "relative", zIndex: 10, backgroundColor: "#ffffff" }}>
        <WhyAllfireSticky />
        <HomeStoryLegacy />
        <HomeServices />
        {/* â”€â”€ Premium Fire Services â”€â”€ */}        <MotionSection
          {...sectionReveal}
          aria-labelledby="premium-fire-services-title"
          data-theme="light"
          style={{ background: "#fff", padding: "clamp(72px, 9vw, 116px) 0" }}
        >
          <style>{`
          .prc-wrap { max-width:1200px; margin:0 auto; padding:0 clamp(1rem, 4vw, 2rem); }
          .prc-header { text-align:center; margin:0 auto clamp(2.25rem, 5vw, 3.75rem); max-width:46rem; }
          .prc-eyebrow { color:#FEAF04; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; font-size:0.78rem; margin-bottom:0.85rem; }
          .prc-header h2 { color:#111; margin:0 0 1.2rem; font-weight:800; letter-spacing:0; }
          .prc-header p { color:#444; max-width:38rem; margin:0 auto; line-height:1.6; }
        `}</style>
          <div className="prc-wrap">
            <div className="prc-header">
              <div className="header-eyebrow-text prc-eyebrow">
                OUR SERVICES
              </div>
              <h2 className="heading-style-h3" id="premium-fire-services-title">Premium Fire Services</h2>
              <p className="body-text">
                Engineered for durability and designed for comfort. Explore our
                range of essential fire safety measures.
              </p>
            </div>
            <PortraitVideoGallery />
          </div>
        </MotionSection>

        {/* ── WHY ALLFIRE SERVICES ── */}
        <MotionSection
          {...sectionReveal}
          id="why-allfire-services"
          className="why-allfire-handshake"
        >
          <style>{`
            .why-allfire-handshake {
              background: #ffffff;
              color: #111111;
              overflow: hidden;
              padding: clamp(72px, 9vw, 128px) 24px;
            }

            .why-afs-inner {
              max-width: 1180px;
              margin: 0 auto;
            }

            .why-afs-kicker {
              color: #ff5722;
              font-size: 0.78rem;
              font-weight: 800;
              letter-spacing: 0.08em;
              margin-bottom: 18px;
              text-transform: uppercase;
            }

            .why-afs-heading {
              color: #111111;
              font-size: clamp(2.45rem, 6.4vw, 5.8rem);
              font-weight: 900;
              line-height: 0.96;
              letter-spacing: 0;
              margin: 0;
              max-width: 980px;
              text-transform: uppercase;
            }

            .why-afs-intro {
              color: #3f3f3f;
              font-size: clamp(1.08rem, 1.9vw, 1.45rem);
              line-height: 1.35;
              margin: 24px 0 56px;
              max-width: 650px;
            }

            .why-afs-tabs-shell > input {
              height: 1px;
              opacity: 0;
              pointer-events: none;
              position: absolute;
              width: 1px;
            }

            .why-afs-workflow {
              align-items: stretch;
              background:
                linear-gradient(90deg, rgba(17, 17, 17, 0.72) 0%, rgba(17, 17, 17, 0.46) 42%, rgba(17, 17, 17, 0.06) 100%),
                linear-gradient(180deg, rgba(254, 175, 4, 0.14), rgba(255, 87, 34, 0.08)),
                url("/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp") center / cover no-repeat;
              border: 1px solid rgba(0, 0, 0, 0.08);
              border-radius: 26px;
              box-shadow: 0 24px 70px rgba(17, 17, 17, 0.14);
              display: grid;
              grid-template-columns: minmax(240px, 0.9fr) minmax(0, 1.4fr);
              min-height: 520px;
              overflow: hidden;
            }

            .why-afs-tabs {
              background:
                linear-gradient(180deg, rgba(254, 175, 4, 0.1), transparent 38%),
                linear-gradient(90deg, rgba(17, 17, 17, 0.76), rgba(17, 17, 17, 0.54));
              backdrop-filter: blur(0.5px);
              display: flex;
              flex-direction: column;
              gap: 12px;
              justify-content: center;
              padding: clamp(24px, 4vw, 48px);
            }

            .why-afs-tab {
              align-items: center;
              border: 1px solid rgba(255, 255, 255, 0.18);
              border-radius: 999px;
              color: #ffffff;
              cursor: pointer;
              display: flex;
              font-size: clamp(1.2rem, 2.1vw, 2rem);
              font-weight: 850;
              justify-content: space-between;
              line-height: 1;
              padding: 18px 22px;
              transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
            }

            .why-afs-tab:hover {
              border-color: rgba(254, 175, 4, 0.75);
              transform: translateX(3px);
            }

            #why-afs-inspect:checked ~ .why-afs-workflow .why-afs-tab-inspect,
            #why-afs-maintain:checked ~ .why-afs-workflow .why-afs-tab-maintain,
            #why-afs-certify:checked ~ .why-afs-workflow .why-afs-tab-certify,
            #why-afs-support:checked ~ .why-afs-workflow .why-afs-tab-support {
              background: #feaf04;
              border-color: #feaf04;
              color: #111111;
            }

            .why-afs-tab span:last-child {
              font-size: 0.82rem;
              font-weight: 800;
            }

            .why-afs-panel {
              background:
                radial-gradient(circle at 82% 18%, rgba(254, 175, 4, 0.32), transparent 28%),
                linear-gradient(135deg, #ffffff 0%, #fff7e5 54%, #ffe1d7 100%);
              display: grid;
              grid-template-rows: 1fr auto;
              padding: clamp(24px, 4.4vw, 56px);
              position: relative;
            }

            .why-afs-visual {
              align-self: center;
              background: #ffffff;
              border: 1px solid rgba(255, 87, 34, 0.16);
              border-radius: 18px;
              box-shadow: 0 22px 60px rgba(17, 17, 17, 0.1);
              color: #111111;
              display: none;
              max-width: 580px;
              padding: clamp(22px, 3vw, 36px);
              position: relative;
              z-index: 1;
            }

            #why-afs-inspect:checked ~ .why-afs-workflow .why-afs-panel-inspect,
            #why-afs-maintain:checked ~ .why-afs-workflow .why-afs-panel-maintain,
            #why-afs-certify:checked ~ .why-afs-workflow .why-afs-panel-certify,
            #why-afs-support:checked ~ .why-afs-workflow .why-afs-panel-support {
              display: block;
            }

            .why-afs-visual h3 {
              color: #111111;
              font-size: clamp(2rem, 4vw, 3.75rem);
              font-weight: 900;
              letter-spacing: 0;
              line-height: 0.95;
              margin: 0 0 20px;
              text-transform: uppercase;
            }

            .why-afs-visual p {
              color: #333333;
              font-size: 1rem;
              line-height: 1.55;
              margin: 0;
            }

            .why-afs-pill-row {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin-top: 26px;
            }

            .why-afs-pill {
              background: #111111;
              border-radius: 999px;
              color: #ffffff;
              font-size: 0.78rem;
              font-weight: 800;
              padding: 10px 13px;
            }

            .why-afs-pill.is-brand {
              background: #ff5722;
            }

            .why-afs-proof {
              align-items: center;
              color: #111111;
              display: flex;
              flex-wrap: wrap;
              gap: 14px;
              justify-content: space-between;
              margin-top: 34px;
              position: relative;
              z-index: 1;
            }

            .why-afs-proof strong {
              font-size: clamp(1rem, 1.7vw, 1.25rem);
              line-height: 1.2;
              max-width: 390px;
            }

            .why-afs-actions {
              display: flex;
              flex-wrap: wrap;
              gap: 12px;
            }

            .why-afs-cta {
              align-items: center;
              background: #ff5722;
              border-radius: 999px;
              color: #ffffff;
              display: inline-flex;
              font-size: 0.9rem;
              font-weight: 850;
              gap: 10px;
              min-height: 44px;
              padding: 0 18px;
              text-decoration: none;
            }

            .why-afs-cta.secondary {
              background: #feaf04;
              color: #111111;
            }

            @media (max-width: 860px) {
              .why-afs-workflow {
                border-radius: 22px;
                grid-template-columns: 1fr;
              }

              .why-afs-tabs {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                padding: 20px;
              }

              .why-afs-tab {
                font-size: 1.1rem;
                padding: 15px 16px;
              }
            }

            @media (max-width: 540px) {
              .why-allfire-handshake {
                padding-left: 16px;
                padding-right: 16px;
              }

              .why-afs-tabs {
                grid-template-columns: 1fr;
              }

              .why-afs-proof,
              .why-afs-actions,
              .why-afs-cta {
                width: 100%;
              }

              .why-afs-cta {
                justify-content: center;
              }
            }
          `}</style>
          <div className="why-afs-inner">
            <div className="why-afs-kicker">Why All Fire Services Sydney</div>
            <h2 className="why-afs-heading">
              Keep your building safe, compliant, and ready.
            </h2>
            <p className="why-afs-intro">
              All Fire Services helps strata managers, building owners, and
              businesses stay on top of fire safety obligations with practical
              inspections, testing, certification, and clear next steps.
            </p>

            <div className="why-afs-tabs-shell">
              <input type="radio" id="why-afs-inspect" name="why-afs-workflow" defaultChecked />
              <input type="radio" id="why-afs-maintain" name="why-afs-workflow" />
              <input type="radio" id="why-afs-certify" name="why-afs-workflow" />
              <input type="radio" id="why-afs-support" name="why-afs-workflow" />

              <div className="why-afs-workflow">
              <div className="why-afs-tabs" aria-label="All Fire Services workflow">
                <label className="why-afs-tab why-afs-tab-inspect" htmlFor="why-afs-inspect">
                  <span>Inspect</span>
                  <span>01</span>
                </label>
                <label className="why-afs-tab why-afs-tab-maintain" htmlFor="why-afs-maintain">
                  <span>Maintain</span>
                  <span>02</span>
                </label>
                <label className="why-afs-tab why-afs-tab-certify" htmlFor="why-afs-certify">
                  <span>Certify</span>
                  <span>03</span>
                </label>
                <label className="why-afs-tab why-afs-tab-support" htmlFor="why-afs-support">
                  <span>Support</span>
                  <span>04</span>
                </label>
              </div>

              <div className="why-afs-panel">
                <div className="why-afs-visual why-afs-panel-inspect">
                  <h3>Inspect</h3>
                  <p>
                    Find the fire safety gaps before they become building,
                    insurance, or council problems. Our technicians assess your
                    essential fire safety measures against the requirements that
                    apply to your site.
                  </p>
                  <div className="why-afs-pill-row" aria-label="Service strengths">
                    <span className="why-afs-pill is-brand">Site inspections</span>
                    <span className="why-afs-pill">Australian Standards</span>
                    <span className="why-afs-pill">Compliance gaps</span>
                  </div>
                </div>

                <div className="why-afs-visual why-afs-panel-maintain">
                  <h3>Maintain</h3>
                  <p>
                    Keep systems ready with scheduled testing and maintenance
                    across alarms, extinguishers, hydrants, pumps, sprinklers,
                    hose reels, doors, and emergency lighting.
                  </p>
                  <div className="why-afs-pill-row" aria-label="Maintenance services">
                    <span className="why-afs-pill is-brand">Routine testing</span>
                    <span className="why-afs-pill">Defect tracking</span>
                    <span className="why-afs-pill">Service records</span>
                  </div>
                </div>

                <div className="why-afs-visual why-afs-panel-certify">
                  <h3>Certify</h3>
                  <p>
                    Prepare your Annual Fire Safety Statement with clear evidence,
                    practical rectification advice, and licensed fire protection
                    support for the measures on your building schedule.
                  </p>
                  <div className="why-afs-pill-row" aria-label="Certification support">
                    <span className="why-afs-pill is-brand">AFSS support</span>
                    <span className="why-afs-pill">Council letters</span>
                    <span className="why-afs-pill">Licensed categories</span>
                  </div>
                </div>

                <div className="why-afs-visual why-afs-panel-support">
                  <h3>Support</h3>
                  <p>
                    Talk to a team that understands real fireground risk as well
                    as paperwork. We explain what needs attention, what can wait,
                    and how to get your building back to standard.
                  </p>
                  <div className="why-afs-pill-row" aria-label="Support strengths">
                    <span className="why-afs-pill is-brand">Firefighter-led team</span>
                    <span className="why-afs-pill">Plain advice</span>
                    <span className="why-afs-pill">Greater Sydney</span>
                  </div>
                </div>

                <div className="why-afs-proof">
                  <strong>
                    Not sure if your building is safe or compliant? Send us your
                    AFSS, defect notice, or council letter.
                  </strong>
                  <div className="why-afs-actions">
                    <a className="why-afs-cta" href="tel:1300765594">
                      Call 1300 765 594
                    </a>
                    <Link className="why-afs-cta secondary" href="/contact">
                      Get a quote
                    </Link>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionDiv {...sectionReveal}>
          <ClientsMarquee />
        </MotionDiv>
        <MotionDiv {...sectionReveal}>
          <PreFaqCTA />
        </MotionDiv>
        <MotionDiv {...sectionReveal}>
          <FAQ />
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
