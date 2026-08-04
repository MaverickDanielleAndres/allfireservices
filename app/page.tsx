import "./home.css";
import ContactCTA from "@/components/ContactCTA";
import {
  MotionConfig,
  MotionDiv,
  MotionHeader,
  MotionSection,
} from "@/components/MotionPrimitives";
import HeroScrollContent from "@/components/HeroScrollContent";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

// ─── Dynamic imports with loading placeholders to prevent CLS ────────────────
// Loading skeletons reserve the correct height so content doesn't jump in

const PortraitVideoGallery = dynamic(
  () => import("@/components/PortraitVideoGallery"),
  { loading: () => <div style={{ minHeight: 480 }} aria-hidden="true" /> }
);
const ClientFeedback = dynamic(
  () => import("@/components/testimonial"),
  { loading: () => <div style={{ minHeight: 400 }} aria-hidden="true" /> }
);
const WhyAllfireSticky = dynamic(
  () => import("@/components/WhyAllfireSticky"),
  { loading: () => <div style={{ minHeight: 600 }} aria-hidden="true" /> }
);
const FAQ = dynamic(
  () => import("@/components/FAQ"),
  { loading: () => <div style={{ minHeight: 360 }} aria-hidden="true" /> }
);
const HomeStoryLegacy = dynamic(
  () => import("@/components/HomeStoryLegacy"),
  { loading: () => <div style={{ minHeight: 600 }} aria-hidden="true" /> }
);
const HomepageStats = dynamic(
  () => import("@/components/HomepageStats"),
  { loading: () => <div style={{ minHeight: 80 }} aria-hidden="true" /> }
);
const HomeServices = dynamic(
  () => import("@/components/HomeServices"),
  { loading: () => <div style={{ minHeight: 400 }} aria-hidden="true" /> }
);

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
                    sizes="(max-width: 767px) 11rem, 13rem"
                    loading="lazy"
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
      <div className="pre-faq-cta-card">
        <div className="pre-faq-cta-logos" aria-label="All Fire Services memberships">
          <Image
            className="pre-faq-cta-logo is-primary"
            src="/logo.png"
            alt="All Fire Services"
            width={527}
            height={257}
            loading="lazy"
          />
          <Image
            className="pre-faq-cta-logo"
            src="/secondlogo.png"
            alt="FPA Australia Bronze Member"
            width={302}
            height={144}
            loading="lazy"
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
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 320px"
                              priority
                              fetchPriority="high"
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
        {/* ── Premium Fire Services ── */}
        <MotionSection
          {...sectionReveal}
          aria-labelledby="premium-fire-services-title"
          data-theme="light"
          style={{ background: "#fff", padding: "clamp(72px, 9vw, 116px) 0" }}
        >
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
