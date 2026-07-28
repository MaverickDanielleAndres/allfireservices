type ServiceUpdatePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ServiceUpdatePlaceholder({
  eyebrow,
  title,
  description,
}: ServiceUpdatePlaceholderProps) {
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
                        {eyebrow}
                      </div>
                      <h1 className="heading-style-h1">{title}</h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        {eyebrow}
                      </div>
                      <p className="body-text">{description}</p>
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
          className="section_process services-process-section"
          style={{ color: "#111111", backgroundColor: "#ffffff" }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div
                className="padding-section-large"
                style={{ paddingTop: "1rem" }}
              >
                <div className="service-update-placeholder">
                  <div className="header-eyebrow-text">{eyebrow}</div>
                  <h2 className="heading-style-h1">To be updated UI</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
