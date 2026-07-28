import ContactCTA from "@/components/ContactCTA";

const regulationStages = [
  {
    number: "01",
    status: "Already in effect",
    title: "Minor Fire Safety Schedule Alterations",
    description:
      "Update to the handling of minor alterations to Fire Safety Schedules.",
  },
  {
    number: "02",
    status: "Effective from 1 August 2023",
    title: "FRNSW Performance Solution Referrals",
    description:
      "Mandatory referral of all Performance Solutions for Class 2-9 buildings to FRNSW during the brief, CC and OC stages, together with the use of a new Fire Safety Schedule Template.",
  },
  {
    number: "03",
    status: "Effective from 13 February 2026",
    title: "Accreditation and AS 1851:2012",
    description:
      "Introduction of a new accreditation scheme for the certification of fire safety measures and the requirement for all fire safety measures to comply with AS 1851:2012 during routine maintenance.",
    current: true,
  },
];

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header data-theme="light" className="section_about-hero is-light">
          <div className="padding-global">
            <div className="container-large">
              <div
                className="padding-section-large is-about"
                style={{ paddingBottom: "1rem" }}
              >
                <div
                  className="about-hero_component services-hero_component"
                  style={{ height: "auto" }}
                >
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop">
                        13 February 2026
                      </div>
                      <h1 className="heading-style-h1">REGULATION UPDATE</h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        13 February 2026
                      </div>
                      <p className="body-text">
                        Important NSW fire safety certification and maintenance
                        requirements for building owners, certifiers and fire
                        protection professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          data-animate-to="light"
          data-theme="light"
          className="regulation-update-section"
        >
          <div className="padding-global">
            <div className="container-large">
              <div
                className="padding-section-large"
                style={{ paddingTop: "1rem" }}
              >
                <article className="regulation-article">
                  <figure className="regulation-alert-figure">
                    <img
                      src="/13-feb-2026-nsw-fire-safety-regulations/strata-alert-webp.webp"
                      alt="Strata Alert"
                      className="regulation-alert-image"
                    />
                  </figure>

                  <div className="regulation-article-block is-introduction">
                    <div className="regulation-section-label">
                      Effective as early as 13 February 2026
                    </div>
                    <h2 className="heading-style-h3">
                      Certification of Installed Fire Safety Measures
                    </h2>
                    <p>
                      The final change, effective as early as{" "}
                      <strong>13 February 2026</strong>, pertains to the
                      certification of installed fire safety measures within a
                      building. A new accreditation scheme, distinct from the
                      current FPAA scheme for certifying installed fire safety
                      measures, is under development.
                    </p>
                    <p>
                      Under this new scheme,{" "}
                      <strong>
                        an accredited person must provide sign-off for all
                        installed fire safety measures
                      </strong>{" "}
                      before a Fire Safety Schedule is issued for the building.
                      From 2026 onwards, the Accredited Person who certifies the
                      fire safety measures must be listed on the certificate of
                      installation.
                    </p>
                    <div className="regulation-key-note">
                      <strong>Key independence requirement:</strong> The person
                      certifying the fire safety measures cannot be the
                      individual who installed them, although they can be from
                      the same company.
                    </div>
                  </div>

                  <div className="regulation-article-block">
                    <div className="regulation-section-label">
                      Routine maintenance
                    </div>
                    <h2 className="heading-style-h3">
                      AS 1851:2012 Becomes Mandatory
                    </h2>
                    <p>
                      Starting from <strong>13 February 2026</strong>, routine
                      maintenance on fire safety measures must be conducted in
                      accordance with <strong>AS 1851:2012</strong>. This
                      requirement applies to all{" "}
                      <strong>Class 1b-9 buildings</strong>, both new and
                      existing, where an Annual Fire Safety Statement is
                      required.
                    </p>
                    <p>
                      This requirement does not encompass fire safety measures
                      not covered by AS 1851:2012 or those subject to a
                      different maintenance process specified in the Fire
                      Safety Schedule. Consequently, owners are expected to{" "}
                      <strong>
                        maintain records of all maintenance work performed
                      </strong>{" "}
                      on fire safety measures. These records may be inspected by
                      local councils or FRNSW at any time.
                    </p>
                  </div>

                  <div className="regulation-stages-section">
                    <div className="regulation-section-label">
                      Implementation pathway
                    </div>
                    <h2 className="heading-style-h3">
                      Three Stages of Regulatory Change
                    </h2>
                    <p className="regulation-stages-intro">
                      The changes introduced by the Fire Safety Regulation 2022
                      are being implemented in three clearly defined stages.
                    </p>

                    <div className="regulation-stage-grid">
                      {regulationStages.map((stage) => (
                        <section
                          className={`regulation-stage-card${
                            stage.current ? " is-current" : ""
                          }`}
                          key={stage.number}
                          aria-labelledby={`regulation-stage-${stage.number}`}
                        >
                          <div className="regulation-stage-top">
                            <div className="regulation-stage-number">
                              {stage.number}
                            </div>
                            <div className="regulation-stage-status">
                              {stage.status}
                            </div>
                          </div>
                          <h3
                            id={`regulation-stage-${stage.number}`}
                            className="regulation-stage-title"
                          >
                            {stage.title}
                          </h3>
                          <p>{stage.description}</p>
                        </section>
                      ))}
                    </div>
                  </div>

                  <div className="regulation-article-block is-closing">
                    <div className="regulation-section-label">Closing notes</div>
                    <h2 className="heading-style-h3">
                      Preparing for the Updated Requirements
                    </h2>
                    <p>
                      The Fire Safety Regulation 2022 brings about crucial
                      changes to fire safety protocols in Class 1b-9 buildings,
                      with a phased implementation plan spanning from 2023 to
                      2025. These changes encompass updating Fire Safety
                      Schedules, mandatory templates, consultation requirements
                      with Fire &amp; Rescue NSW (FRNSW), and the certification
                      and maintenance of fire safety measures.
                    </p>
                    <p>
                      The amended regulations aim to enhance fire safety
                      standards and streamline the processes involved in
                      ensuring compliance.{" "}
                      <strong>
                        Building owners, certifiers and FRNSW will need to
                        familiarise themselves with these changes
                      </strong>{" "}
                      and adapt their practices accordingly to ensure the
                      safety and well-being of occupants in these buildings. By
                      implementing these measures, the regulatory authorities
                      seek to create a safer built environment and reduce
                      potential risks associated with fire incidents.
                    </p>
                  </div>

                  <aside className="regulation-reference">
                    <div className="regulation-section-label">Reference</div>
                    <p>
                      Environmental Planning and Assessment (Development
                      Certification and Fire Safety) Regulation 2021
                    </p>
                  </aside>
                </article>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </div>
    </main>
  );
}
