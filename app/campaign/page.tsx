import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header data-theme="light" className="section_about-hero is-light">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large is-about">
                <div className="about-hero_component">
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop">
                        Strata Fire Safety
                      </div>
                      <h1 className="heading-style-h1">
                        Fire Safety Inspection Services
                      </h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        Strata Fire Safety
                      </div>
                      <p className="body-text">
                        Our process, refined in our dedicated UK factory,
                        ensures each system is built to exacting standards. From
                        initial design to final quality checks, we control every
                        step.
                      </p>
                    </div>
                  </div>
                  <div className="about-hero_image-wrapper">
                    <div className="about-hero_image-video">
                      {/* Was a third-party video that no longer loads — show the
                          logo as a poster so the slot isn't empty. */}
                      <Image
                        src="/logo.png"
                        alt="All Fire Services Australia"
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div
                      data-theme="dark"
                      className="process-hero_video-cta-wrap"
                    >
                      <a
                        href="#"
                        className="video-cta_lightbox w-inline-block w-lightbox"
                      >
                        <div className="w-layout-grid video-cta_content">
                          <div className="video-cta_text-wrap">
                            <div className="text-size-regular">
                              Strata compliance support
                            </div>
                            <div className="text-size-small opacity-70">
                              Watch Video
                            </div>
                          </div>
                          <div className="video-cta_icon-wrap">
                            <div className="video-cta_icon-bg">
                              <div className="video-cta_icon w-embed">
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 9 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.1577 7.15773L0.0409546 13.4849V0.830566L8.1577 7.15773Z"
                                    fill="currentcolor"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="video-cta_image-wrap">
                          <Image
                            src="/logo.png"
                            width={160}
                            height={80}
                            alt="All Fire Services Australia"
                            className="video-cta_image"
                          />
                          <div className="video-cta_image-overlay"></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          data-animate-to="dark"
          data-theme="dark"
          className="section_process"
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <section id="1" className="process_component">
                  <div className="process_content">
                    <div className="header-wrapper">
                      <div className="header-text-wrap">
                        <div className="header-top">
                          <h2 className="heading-style-h1">Inspection Services</h2>
                        </div>
                        <p className="body-text">We also provide building defect report to identify which fire safety equipment that needs to be fixed, and also provide the best solution to get your building to the standard compliance.</p>
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
                              <div className="button-text">BOOK TO BOSS</div>
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

                    <div className="process_item">
                      <div className="process_image-wrap">
                        <Image src="/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp" width={800} height={600} sizes="(max-width: 767px) 100vw, 40vw" alt="Fire hydrant inspection and testing" className="process_image" />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">01</div>
                        <div className="process_text-wrap">
                          <h2 className="heading-style-h6">Inspections</h2>
                          <p className="body-text">Monthly, 6-monthly, and yearly inspections by NSW firemen.</p>
                        </div>
                      </div>
                    </div>
    
                    <div className="process_item">
                      <div className="process_image-wrap">
                        <Image src="/13-feb-2026-nsw-fire-safety-regulations/strata-alert-webp.webp" width={800} height={600} sizes="(max-width: 767px) 100vw, 40vw" alt="NSW fire safety compliance information" className="process_image" />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">02</div>
                        <div className="process_text-wrap">
                          <h2 className="heading-style-h6">Defect Reports</h2>
                          <p className="body-text">Building defect reports and fire-safety equipment checks.</p>
                        </div>
                      </div>
                    </div>
    
                    <div className="process_item">
                      <div className="process_image-wrap">
                        <Image src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp" width={800} height={600} sizes="(max-width: 767px) 100vw, 40vw" alt="All Fire Services technicians" className="process_image" />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">03</div>
                        <div className="process_text-wrap">
                          <h2 className="heading-style-h6">Testimonial</h2>
                          <p className="body-text">&ldquo;The service I received from All Fire Services was amazing.&rdquo; - Happy Client</p>
                        </div>
                      </div>
                    </div>
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
