import Link from "next/link";
import Image from "next/image";

import RevealOnView from "@/components/RevealOnView";
import styles from "@/components/HomeStoryLegacy.module.css";
import cardStyles from "./SiteSection.module.css";

const gradientStyle = {
  background: "linear-gradient(to right, #ff2a00, #ffb700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

// Mobile centering for section headers
const mobileHeaderCenterStyle = `
@media (max-width: 767px) {
  .why-allfire-header {
    text-align: center;
    justify-items: center;
    gap: 0.75rem;
  }
  .why-allfire-header > p:last-child {
    margin-left: auto;
    margin-right: auto;
  }
  .why-allfire-header h2 {
    margin-left: auto;
    margin-right: auto;
  }
}
`;

// ── Six reasons as image+text alternating sections (on top) ──────────────────
const reasonSections = [
  {
    number: "01",
    kicker: "STANDARDS",
    title: (
      <>
        Compliance
        <br />
        <span style={gradientStyle}>Assured</span>
      </>
    ),
    altTitle: "Compliance Assured",
    description: (
      <>
        We help ensure your building meets all required fire safety standards.
        From detailed property inspections to the timely submission of your{" "}
        <strong>Annual Fire Safety Statements</strong>, we keep everything
        properly documented and fully compliant with local council regulations.
      </>
    ),
    image: "/services/AFSS.png",
  },
  {
    number: "02",
    kicker: "OUR TEAM",
    title: (
      <>
        Experienced &amp;
        <br />
        <span style={gradientStyle}>Qualified Team</span>
      </>
    ),
    altTitle: "Experienced & Qualified Team",
    description: (
      <>
        Our team is highly trained, licensed, and dedicated to safety. Led by{" "}
        <strong>current and former firefighting professionals</strong>, our
        technicians bring real-world emergency experience directly to your
        property, ensuring practical and reliable fire protection.
      </>
    ),
    image: "/technician/group.jpg",
  },
  {
    number: "03",
    kicker: "PUNCTUALITY",
    title: (
      <>
        Reliable &amp;
        <br />
        <span style={gradientStyle}>On Time</span>
      </>
    ),
    altTitle: "Reliable & On Time",
    description: (
      <>
        We deliver our services on time, every time. We understand that{" "}
        <strong>compliance deadlines and tenant schedules can't wait</strong>,
        so we prioritise rapid response times, clear communication, and
        punctual maintenance visits.
      </>
    ),
    image: "/annual-fire-safety-statement/fire-truck-all-fire-services.webp",
  },
  {
    number: "04",
    kicker: "FULL COVERAGE",
    title: (
      <>
        Comprehensive
        <br />
        <span style={gradientStyle}>Services</span>
      </>
    ),
    altTitle: "Comprehensive Services",
    description: (
      <>
        We cover all your fire safety needs. Whether you need{" "}
        <strong>
          emergency lighting checks, fire extinguisher testing, or complex
          sprinkler maintenance
        </strong>
        , we offer a complete suite of solutions under one roof.
      </>
    ),
    image: "/services/servicescompilationcutted.jpg",
  },
  {
    number: "05",
    kicker: "LOCALLY OWNED",
    title: (
      <>
        Local Sydney
        <br />
        <span style={gradientStyle}>Experts</span>
      </>
    ),
    altTitle: "Local Sydney Experts",
    description: (
      <>
        Proudly serving businesses and communities across Greater Sydney. As a{" "}
        <strong>locally owned and operated business</strong>, we understand the
        specific compliance challenges faced by strata managers and building
        owners across the metropolitan area.
      </>
    ),
    image: "/stratapage-cropped/9-all-fire-services-welcome-marrickville.webp",
  },
  {
    number: "06",
    kicker: "OUR PROMISE",
    title: (
      <>
        Quality You
        <br />
        <span style={gradientStyle}>Can Trust</span>
      </>
    ),
    altTitle: "Quality You Can Trust",
    description: (
      <>
        We use best practices and quality systems you can rely on. Our{" "}
        <strong>rigorous internal auditing and commitment to
        industry-leading standards</strong>{" "}
        mean that every inspection, repair, and certification is performed with
        the highest level of accuracy and care.
      </>
    ),
    image: "/services/diesel hydrant.jpg",
  },
];

// ── Five image+text story sections (moved from AboutClients / our-clients) ────
const storySections = [
  {
    number: "07",
    kicker: "EXPERTISE",
    title: (
      <>
        Every Building.
        <br />
        <span style={gradientStyle}>Every Industry.</span>
      </>
    ),
    altTitle: "Every Building. Every Industry.",
    description: (
      <>
        From strata communities to large industrial facilities, every property
        has different fire-safety requirements. We develop{" "}
        <strong>tailored protection and maintenance strategies</strong> that meet
        the specific compliance needs of each building.
      </>
    ),
    image: "/buildingcompilation.jpg",
    objectFit: "contain",
  },
  {
    number: "08",
    kicker: "SAFETY FIRST",
    title: (
      <>
        More Than
        <br />
        <span style={gradientStyle}>Compliance</span>
      </>
    ),
    altTitle: "More Than Compliance",
    description: (
      <>
        Tick-box compliance isn't enough. Fire safety is about{" "}
        <strong>protecting lives, property, and business continuity</strong>. We
        make sure your systems are properly maintained, tested, and ready when
        they're needed most.
      </>
    ),
    image: "/services/Fire Panel &Detection (AS 1670.1).jpg",
  },
  {
    number: "09",
    kicker: "RELATIONSHIPS",
    title: (
      <>
        Partners, Not Just
        <br />
        <span style={gradientStyle}>Providers</span>
      </>
    ),
    altTitle: "Partners, Not Just Providers",
    description: (
      <>
        Strong results come from trust, clear communication, and dependable
        service. Our clients rely on our{" "}
        <strong>firefighter-led expertise and practical advice</strong> to keep
        their properties safe without unnecessary disruption.
      </>
    ),
    image: "/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
  },
  {
    number: "10",
    kicker: "RELIABILITY",
    title: (
      <>
        Here When You
        <br />
        <span style={gradientStyle}>Need Us</span>
      </>
    ),
    altTitle: "Here When You Need Us",
    description: (
      <>
        From complex Annual Fire Safety Statements to urgent after-hours support,
        our team responds quickly and works efficiently to keep your{" "}
        <strong>fire protection systems compliant and operational</strong>.
      </>
    ),
    image: "/technician/technician.jpg",
  },
  {
    number: "11",
    kicker: "OUR PROMISE",
    title: (
      <>
        Confidence Comes
        <br />
        <span style={gradientStyle}>Standard</span>
      </>
    ),
    altTitle: "Confidence Comes Standard",
    description: (
      <>
        Built on generations of frontline firefighting experience, we bring{" "}
        <strong>
          professional workmanship, honest advice, and uncompromising care
        </strong>{" "}
        to every job. That's why property teams across Greater Sydney continue to
        trust All Fire Services.
      </>
    ),
    image: "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
  },
];

function StoryGrid({
  sections,
  headingId,
  kickerText,
  titleNode,
  introText,
  headerClassName,
}: {
  sections: typeof reasonSections;
  headingId?: string;
  kickerText?: string;
  titleNode?: React.ReactNode;
  introText?: string;
  headerClassName?: string;
}) {
  return (
    <section className="bg-white">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large pb-4">
            <style dangerouslySetInnerHTML={{ __html: mobileHeaderCenterStyle }} />

            {kickerText && (
            <header
              className={`${styles.legacyHeader} ${headerClassName ?? ""}`}
              style={{ marginTop: 0, marginBottom: "clamp(5rem, 8vw, 8rem)" }}
            >
              <p className={styles.kicker}>{kickerText}</p>
              <h2 id={headingId} style={{ maxWidth: "14ch" }}>
                {titleNode}
              </h2>
              <p>{introText}</p>
            </header>
            )}

            {sections.map((section, idx) => {
              const isImageFirst = idx % 2 !== 0;
              return (
                <div
                  key={idx}
                  className={`${styles.newStoryGrid} ${isImageFirst ? styles.newStoryGridImageFirst : ""}`}
                  style={{
                    marginBottom:
                      idx === sections.length - 1 ? "4rem" : "10rem",
                    alignItems: "stretch",
                  }}
                >
                  <div
                    className={`relative w-full h-full min-h-[300px] max-h-[440px] rounded-[1.5rem] overflow-hidden m-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] order-2 ${isImageFirst ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <Image
                      src={section.image}
                      alt={section.altTitle}
                      fill
                      style={{ objectFit: (section as any).objectFit || "cover" }}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div
                    className={`${styles.newStoryContent} order-1 ${isImageFirst ? "lg:order-2" : "lg:order-1"}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <header
                      className={styles.storyHeaderLeft}
                      style={{
                        marginTop: 0,
                        marginBottom: "1.5rem",
                        maxWidth: "none",
                        width: "100%",
                      }}
                    >
                      {"number" in section && (
                        <p
                          style={{
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            fontWeight: 900,
                            lineHeight: 1,
                            color: "rgba(0,0,0,0.06)",
                            marginBottom: "0.25rem",
                            fontVariantNumeric: "tabular-nums",
                            letterSpacing: "-0.02em",
                          }}
                          aria-hidden="true"
                        >
                          {(section as { number: string }).number}
                        </p>
                      )}
                      <p
                        className={styles.kickerLeft}
                        style={{ textTransform: "uppercase" }}
                      >
                        {section.kicker}
                      </p>
                      <h2 className="section-heading">{section.title}</h2>
                    </header>
                    <p
                      className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      {section.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WhyAllFire() {
  return (
    <>
      {/* ── 01–06: Why clients choose us (image+text, no header) ── */}
      <StoryGrid sections={reasonSections} />

      {/* ── 07–11: Story sections (no header, numbered) ── */}
      <StoryGrid sections={storySections} />

      {/* ── CTA footer ── */}
      <RevealOnView threshold={0.08} className={cardStyles.section}>
        <section id="why-all-fire" aria-labelledby="why-all-fire-cta">
          <div className={cardStyles.container}>
            <div className={cardStyles.footer}>
              <Link href="/contact" className={cardStyles.action}>
                Get a Quote
              </Link>
            </div>
          </div>
        </section>
      </RevealOnView>
    </>
  );
}
