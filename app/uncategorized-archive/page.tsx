import Image from "next/image";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";

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
                        Fire Safety Insights
                      </div>
                      <h1 className="heading-style-h1">Articles</h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        Fire Safety Insights
                      </div>
                      <p className="body-text">
                        Plain-language updates on NSW fire safety, annual fire
                        safety statements and practical protection for strata,
                        commercial and residential properties across Greater
                        Sydney.
                      </p>
                    </div>
                  </div>
                  <div className="about-hero_image-wrapper">
                    <div className="about-hero_image-video">
                      <Image
                        src="/logo.png"
                        loading="lazy"
                        alt="All Fire Services Australia"
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
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
                <section className="process_component">
                  <div className="process_content">
                    <div className="header-wrapper">
                      <div className="header-text-wrap">
                        <div className="header-top">
                          <h2 className="heading-style-h2">Article List</h2>
                        </div>
                        <p className="body-text">
                          Practical fire safety guidance, regulatory updates and
                          compliance resources from the All Fire Services team
                          across Greater Sydney.
                        </p>
                      </div>
                      <div className="button-group">
                        <Link href="/contact" className="button-wrap">
                          <div className="button-content w-variant-a1ef9764-3803-38f9-aea9-55b770b8a820">
                            <div className="button-layout">
                              <div className="button-text">Get in touch</div>
                              <div className="button-icon">
                                <div className="icon-slot">
                                  <div className="icon-slot">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="100%"
                                      viewBox="0 0 16 17"
                                      fill="none"
                                      aria-hidden="true"
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
                    </div>
                  </div>
                  <div className="process_list">
                    <article className="process_item">
                      <div className="process_image-wrap">
                        <Image
                          src="/13-feb-2026-nsw-fire-safety-regulations/strata-alert-webp.webp"
                          width={800}
                          height={450}
                          loading="lazy"
                          alt="NSW fire safety regulation alert graphic"
                          className="process_image"
                        />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">01</div>
                        <div className="process_text-wrap">
                          <h3 className="heading-style-h6">
                            NSW Fire Safety Regulations Update — 13 February 2026
                          </h3>
                          <p className="body-text">
                            What the latest regulatory changes mean for NSW
                            building owners, strata managers and the AFSS
                            process.
                          </p>
                          <p>
                            <Link href="/13-feb-2026-nsw-fire-safety-regulations">
                              Read the full article
                            </Link>
                          </p>
                        </div>
                      </div>
                    </article>

                    <article className="process_item">
                      <div className="process_image-wrap">
                        <Image
                          src="/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp"
                          width={800}
                          height={450}
                          loading="lazy"
                          alt="All Fire Services hydrant flow test in progress"
                          className="process_image"
                        />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">02</div>
                        <div className="process_text-wrap">
                          <h3 className="heading-style-h6">
                            Understanding Annual Fire Safety Statements in NSW
                          </h3>
                          <p className="body-text">
                            A practical guide to what an AFSS covers, who
                            needs one and how All Fire Services can manage the
                            full annual cycle.
                          </p>
                          <p>
                            <Link href="/annual-fire-safety-statement">
                              Read the full article
                            </Link>
                          </p>
                        </div>
                      </div>
                    </article>

                    <article className="process_item">
                      <div className="process_image-wrap">
                        <Image
                          src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp"
                          width={800}
                          height={450}
                          loading="lazy"
                          alt="All Fire Services team of firefighter technicians"
                          className="process_image"
                        />
                      </div>
                      <div className="process_content-right">
                        <div className="heading-style-h4">03</div>
                        <div className="process_text-wrap">
                          <h3 className="heading-style-h6">
                            Working with the All Fire Services Team
                          </h3>
                          <p className="body-text">
                            Meet the firefighter-technicians behind every
                            All Fire Services inspection, test and AFSS
                            submission across Greater Sydney.
                          </p>
                          <p>
                            <Link href="/about">Read the full article</Link>
                          </p>
                        </div>
                      </div>
                    </article>
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
