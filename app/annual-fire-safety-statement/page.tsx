import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";

const afssSections = [
  {
    title: "Unlock Peace of Mind with Our Annual Fire Safety Statement",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-flow-test-1.webp",
    alt: "All Fire Services technician carrying out a hydrant flow test",
    content: (
      <p className="body-text">
        The annual fire safety statement is fundamental for property owners in
        Sydney and across Australia. In today&apos;s landscape, ensuring the
        safety of buildings and their inhabitants from fire hazards is
        critical. The annual fire safety statement concerns compliance, safety,
        prevention of loss, and saving lives. All Fire Services Sydney is a
        leading fire safety company at the forefront of providing comprehensive
        fire protection services. We offer high-level professional fire safety
        services while being approachable, practical, and reasonable.
      </p>
    ),
  },
  {
    title: "Professional Firefighter Technicians",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-system-2.webp",
    alt: "Annual fire safety statement property inspection",
    content: (
      <p className="body-text">
        All Fire Services Sydney was founded with the unique concept of
        providing professional firefighters as our customer service technicians
        to ensure clients receive extensive, real-life knowledge. Our
        technicians are skilled, experienced, and highly motivated to deliver
        quality services and unmatched safety to the community. We offer
        ongoing training for development purposes and ensure our service
        delivery reflects the current fire safety regulation requirements.
      </p>
    ),
  },
  {
    title: "What Is an Annual Fire Safety Statement?",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
    alt: "Fire safety system inspection and compliance testing",
    content: (
      <p className="body-text">
        An annual fire safety statement is a mandatory document that property
        owners must submit to their local council each year. This statement
        verifies that all fire safety measures on the property comply with
        relevant Australian Standards and are in proper working order. The
        statement encompasses various safety measures, including fire
        extinguishers, smoke alarms, and fire exits, ensuring the property is
        adequately equipped to protect its occupants in the event of a fire.
      </p>
    ),
  },
  {
    title: "Annual Statement Compliance",
    image:
      "/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
    alt: "Professional All Fire Services firefighter technicians",
    content: (
      <p className="body-text">
        Property owners must send copies of the statement to the Fire
        Commissioner, Fire and Rescue NSW, and display it within the building.
        All Fire Services Sydney can conduct a comprehensive inspection of your
        property&apos;s fire safety measures and provide you with an annual fire
        safety statement once compliance is confirmed. We help ensure your
        building meets the requirements of the Building Code of Australia,
        Environmental Planning and Assessment Regulation, and all pertinent
        Australian Standards.
      </p>
    ),
  },
  {
    title: "Reasons to Choose Us for Annual Fire Safety Statement",
    image: "/annual-fire-safety-statement/fire-truck-all-fire-services.webp",
    alt: "All Fire Services fire truck",
    content: (
      <p className="body-text">
        Our team is dedicated to excellence and comprehensive fire safety
        services. As a member of Fire Protection Association Australia, you can
        trust that we are fully insured and comply with all Workplace Health and
        Safety requirements. Who knows better than a firemen, we bring 19 years
        of experience with the NSW Fire Brigades, having responded to fire
        emergencies and ensured properties meet the Building Code of Australia
        and Australian Standards. Our extensive expertise is crucial in all
        aspects of fire safety.
      </p>
    ),
  },
  {
    title: "Comprehensive Fire Safety Services",
    image:
      "/annual-fire-safety-statement/NEW-COFFE-LOGO-WITH-PETE-scaled.webp",
    alt: "All Fire Services meet the team",
    content: (
      <p className="body-text">
        We provide a range of fire services, including installing and
        maintaining fire safety equipment, conducting detailed fire safety
        inspections and audits, and issuing annual fire safety statements. Our
        tailored approach ensures each property receives optimal protection
        based on its unique requirements. We simplify the complexities of fire
        safety regulations by offering timely services and educational
        resources, making us your go-to team for fire consultancy and advice.
      </p>
    ),
  },
];

function ArrowIcon() {
  return (
    <div className="button-icon">
      <div className="icon-slot">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 16 17"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header 
          className="section_about-hero is-dark" 
          style={{ 
            backgroundImage: 'url("/annual-fire-safety-statement/all-fire-services-hydrant-flow-test-1.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            marginBottom: '4rem',
            marginTop: '-12rem',
            paddingTop: '12rem',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          <div className="padding-global" style={{ position: 'relative', zIndex: 1 }}>
            <div className="container-large">
              <div
                className="padding-section-large is-about"
                style={{ paddingTop: '13rem', paddingBottom: '4rem' }}
              >
                <div
                  className="about-hero_component services-hero_component"
                  style={{ height: "auto" }}
                >
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop" style={{ color: '#feaf04' }}>
                        Annual Fire Safety Statement
                      </div>
                      <h1 className="heading-style-h1" style={{ color: '#ffffff', fontWeight: 900, lineHeight: 1.1 }}>AFSS</h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet" style={{ color: '#feaf04' }}>
                        Annual Fire Safety Statement
                      </div>
                      <p className="body-text" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Compliance, safety, prevention of loss, and saving lives
                        through comprehensive annual fire safety inspections,
                        certification, and submission support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          data-animate-to="light"
          data-theme="light"
          className="section_process services-process-section"
          style={{ color: "#111111", backgroundColor: "#ffffff" }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div
                className="padding-section-large"
                style={{ paddingTop: "1rem" }}
              >
                <section id="afss-services" className="process_component">
                  <div className="process_content">
                    <div className="header-wrapper">
                      <div className="header-text-wrap">
                        <div className="header-top">
                          <h2 className="heading-style-h1">
                            Annual Fire Safety Statement
                          </h2>
                        </div>
                        <p className="body-text">
                          From inspection and certification to council
                          submission support, we help keep your building
                          compliant and its occupants protected.
                        </p>
                      </div>
                      <div className="button-group">
                        <a
                          data-wf--button--size="large"
                          href="/contact"
                          className="button-wrap w-inline-block"
                        >
                          <div className="button-content w-variant-a1ef9764-3803-38f9-aea9-55b770b8a820">
                            <div
                              data-wf--button-layout--layout="normal"
                              className="button-layout"
                            >
                              <div className="button-text">Get in touch</div>
                              <ArrowIcon />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="process_list">
                    {afssSections.map((section, index) => (
                      <article
                        className="process_item"
                        key={section.title}
                      >
                        <div className="process_image-wrap">
                          <Image
                            src={section.image}
                            width={800}
                            height={600}
                            sizes="(max-width: 767px) 100vw, 40vw"
                            alt={section.alt}
                            className="process_image"
                          />
                        </div>
                        <div className="process_content-right">
                          <div className="heading-style-h4">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="process_text-wrap">
                            <h2 className="heading-style-h6">
                              {section.title}
                            </h2>
                            {section.content}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <section
          data-animate-to="dark"
          data-theme="dark"
          className="afss-request-section"
          aria-labelledby="afss-request-title"
        >
          <div className="padding-global">
            <div className="container-large">
              <div
                id="request-an-afss-inspection"
                className="afss-request-cta"
                style={{
                  backgroundImage:
                    "url('/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp')",
                }}
              >
                <div className="afss-request-overlay" aria-hidden="true" />
                <div className="afss-request-content">
                  <div
                    className="header-eyebrow-text"
                    style={{ color: "#ffffff" }}
                  >
                    Annual Fire Safety Statement
                  </div>
                  <h2
                    id="afss-request-title"
                    className="heading-style-h3 afss-request-title"
                    style={{ color: "#ffffff" }}
                  >
                    Request an AFSS Inspection
                  </h2>
                  <p
                    className="body-text afss-request-copy"
                    style={{ color: "rgba(255, 255, 255, 0.82)" }}
                  >
                    Partnering with us offers a seamless path to achieving an
                    up-to-date annual fire safety statement. Call us today.
                  </p>
                  <a
                    href="tel:1300765594"
                    className="afss-request-phone"
                    aria-label="Call All Fire Services on 1300 765 594"
                  >
                    1300 765 594
                  </a>
                  <div className="afss-request-actions">
                    <a
                      href="tel:1300765594"
                      className="afss-request-action is-outline"
                    >
                      <span>Call Now</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href="/contact"
                      className="afss-request-action is-outline"
                    >
                      <span>Contact Us</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href="/contact"
                      className="afss-request-action is-primary"
                    >
                      <span>Request an Inspection</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </div>
    </main>
  );
}
