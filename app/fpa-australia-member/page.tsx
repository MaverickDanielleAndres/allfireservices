import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";

const fpaSections = [
  {
    title: "The National Peak Body for Fire Protection",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-flow-test-1.webp",
    alt: "All Fire Services fire protection equipment inspection",
    content: (
      <>
        <p className="body-text">
          All Fire Services is proud to be a Member of FPA Australia.
        </p>
        <p className="body-text">
          Fire Protection Association Australia (FPA Australia) is the National
          peak body for Fire Safety that provides information, services and
          education to the Fire Protection Industry and community.
        </p>
      </>
    ),
  },
  {
    title: "Industry Reach",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-system-2.webp",
    alt: "Fire protection hydrant system",
    content: (
      <p className="body-text">
        FPA Australia is supported by leading companies &amp; organizations and
        reaches up to 30,000 individuals operating across every aspect of the
        Fire Protection Industry.
      </p>
    ),
  },
  {
    title: "A Diverse Fire Protection Community",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
    alt: "All Fire Services fire protection testing",
    content: (
      <p className="body-text">
        Association members include manufacturers and suppliers of Fire
        Protection Products and Services, Fire Fighters, Building Owners,
        Insurers, Designers and Building Surveyors, Government and Legislators,
        Educators, Bushfire Consultants and anyone else working as part of the
        Fire Protection Community to provide a safer environment for all
        Australians.
      </p>
    ),
  },
  {
    title: "A National Not-for-Profit Organisation",
    image:
      "/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
    alt: "Professional All Fire Services technicians",
    content: (
      <p className="body-text">
        FPA Australia is a not-for-profit organization employing more than 35
        people at its national head office in Melbourne, with other resources
        positioned in other states.
      </p>
    ),
  },
  {
    title: "Developing the Fire Protection Industry",
    image: "/annual-fire-safety-statement/fire-truck-all-fire-services.webp",
    alt: "Fire and rescue vehicle",
    content: (
      <p className="body-text">
        The Association&apos;s sole focus is to continually develop the
        industry across all aspects of Fire Protection and re-invest into the
        sector to achieve improved safety outcomes.
      </p>
    ),
  },
  {
    title: "Advocacy for Safer Communities",
    image:
      "/annual-fire-safety-statement/NEW-COFFE-LOGO-WITH-PETE-scaled.webp",
    alt: "All Fire Services team",
    content: (
      <p className="body-text">
        Central to FPA Australia&apos;s vision is a focus on advocacy in order
        to influence change and deliver improved Fire Safety outcomes for the
        Community.
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

export default function FpaAustraliaMember() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header 
          className="section_about-hero is-dark" 
          style={{ 
            backgroundImage: 'url("/annual-fire-safety-statement/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp")',
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
              <div className="padding-section-large" style={{ paddingTop: '13rem', paddingBottom: '4rem' }}>
                <h1 
                  className="heading-style-h1"
                  style={{ 
                    color: '#ffffff', 
                    fontWeight: 900, 
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                    margin: 0
                  }}
                >
                  FPA AUSTRALIA MEMBER
                </h1>
              </div>
            </div>
          </div>
        </header>

        <section className="section_fpa-intro">
          <div className="padding-global">
            <div className="container-large">
              <div
                className="padding-section-large is-about"
                style={{ paddingBottom: "10rem" }}
              >
                <div
                  className="about-hero_component services-hero_component"
                  style={{ height: "auto" }}
                >
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop">
                        FPA Australia Member
                      </div>
                      <h1 className="heading-style-h1">FPA</h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        FPA Australia Member
                      </div>
                      <p className="body-text">
                        All Fire Services is proud to be a member of
                        Australia&apos;s national peak body for fire protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                <section id="fpa-membership" className="process_component">
                  <div className="process_content">
                    <div className="header-wrapper">
                      <div className="header-text-wrap">
                        <div className="header-top">
                          <h2 className="heading-style-h1">
                            FPA Australia Member
                          </h2>
                        </div>
                        <p className="body-text">
                          Supporting a stronger fire protection industry and
                          safer outcomes for communities across Australia.
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
                    {fpaSections.map((section, index) => (
                      <article className="process_item" key={section.title}>
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
          aria-labelledby="fpa-request-title"
        >
          <div className="padding-global">
            <div className="container-large">
              <div
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
                    FPA Australia Member
                  </div>
                  <h2
                    id="fpa-request-title"
                    className="heading-style-h3 afss-request-title"
                    style={{ color: "#ffffff" }}
                  >
                    Work with an FPA Australia Member
                  </h2>
                  <p
                    className="body-text afss-request-copy"
                    style={{ color: "rgba(255, 255, 255, 0.82)" }}
                  >
                    Partner with a professional fire safety team committed to
                    stronger industry standards and safer Australian
                    communities.
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
                      <span>Discuss Your Requirements</span>
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
