import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";

const services = [
  {
    title: "Annual Fire Safety Statement",
    image: "/Fireprotectionservicesimage/annualfiresafety.webp",
    description:
      "Annual Fire Safety Statement inspections, documentation, compliance support, and submission guidance.",
  },
  {
    title: "Monthly Fire Inspection",
    image: "/Fireprotectionservicesimage/monthlyfireprotection.webp",
    description:
      "Monthly testing and inspection of fire safety equipment to help keep your building compliant and protected.",
  },
  {
    title: "Yearly Hydrant Flow Test",
    image: "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
    description:
      "Yearly fire hydrant flow testing and inspection as part of your building’s ongoing fire safety compliance.",
  },
  {
    title: "Monthly Diesel Pump Inspection",
    image: "/Fireprotectionservicesimage/monthlydieselpumpprotection.webp",
    description:
      "Monthly inspection and testing of diesel fire pump systems to support reliable operation and compliance.",
  },
  {
    title: "Monthly Sprinkler System Inspection",
    image: "/Fireprotectionservicesimage/monthlysprinkler.webp",
    description:
      "Monthly sprinkler system inspections and testing to help maintain dependable fire protection throughout your property.",
  },
  {
    title: "Fire Extinguisher Tagging",
    image: "/Fireprotectionservicesimage/fireestinguishertagging.webp",
    description:
      "Inspection, servicing, and tagging of portable fire extinguishers to support building safety and compliance.",
  },
  {
    title: "Emergency Lighting 90-Minute Test",
    image: "/Fireprotectionservicesimage/emergencylighting90.webp",
    description:
      "A 90-minute emergency lighting test to check that exit and emergency lights operate when they are needed.",
  },
  {
    title: "Smoke Alarm Test",
    image: "/Fireprotectionservicesimage/smokealarmtest.webp",
    description:
      "Testing and inspection of smoke alarms to confirm correct operation and support a safer building.",
  },
];

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header data-theme="light" className="section_about-hero is-light">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large is-about">
                <div
                  className="about-hero_component services-hero_component"
                  style={{ height: "auto" }}
                >
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop">
                        Fire Protection Services
                      </div>
                      <h1 className="heading-style-h1">
                        SERVICES
                      </h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        Fire Protection Services
                      </div>
                      <p className="body-text">
                        From routine inspections and compliance reporting to
                        training and consultancy, our experienced team keeps
                        Greater Sydney properties protected and up to standard.
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
              <div className="padding-section-large">
                <section id="1" className="process_component">
                  <div className="process_content">
                    <div className="header-wrapper">
                      <div className="header-text-wrap">
                        <div className="header-top">
                          <h2 className="heading-style-h1">Our Services</h2>
                        </div>
                        <p className="body-text">We offer a wide range of fire safety services to keep your building compliant and safe.</p>
                      </div>
                      <div className="button-group">
                        <a
                          data-wf--button--size="large"
                          href="/contact"
                          className="button-wrap w-inline-block"
                        >
                          <div
                            data-wf--button-style--
                            className="button-content w-variant-a1ef9764-3803-38f9-aea9-55b770b8a820"
                          >
                            <div
                              data-wf--button-layout--layout="normal"
                              className="button-layout"
                            >
                              <div className="button-text">Get in touch</div>
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
                      </div>
                    </div>
                  </div>
                  <div className="process_list">
                    {services.map((service, index) => (
                      <article className="process_item" key={service.title}>
                        <div className="process_image-wrap">
                          <Image
                            src={service.image}
                            width={520}
                            height={680}
                            sizes="(max-width: 767px) 100vw, 40vw"
                            alt={service.title}
                            className="process_image"
                          />
                        </div>
                        <div className="process_content-right">
                          <div className="heading-style-h4">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="process_text-wrap">
                            <h2 className="heading-style-h6">
                              {service.title}
                            </h2>
                            <p className="body-text">
                              {service.description}
                            </p>
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
        <ContactCTA />
      </div>
    </main>
  );
}
