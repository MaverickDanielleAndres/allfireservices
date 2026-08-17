import styles from "./HomeStoryLegacy.module.css";

type HomeStoryLegacyProps = {
  aboutPage?: boolean;
};

// Server component. When called from the homepage (aboutPage=false) the
// inner header is never rendered — we still emit the section wrapper for
// layout continuity with the rest of the page, but the section carries no
// client-side framer-motion cost. About-page consumers wrap the header in
// a <RevealOnView> at the call site if they want the slide-up animation.
export default function HomeStoryLegacy({ aboutPage = false }: HomeStoryLegacyProps) {
  if (!aboutPage) {
    return (
      <section
        id="family-history"
        aria-label="Family firefighting legacy"
        data-theme="light"
        className="padding-section-large home-story-legacy-root"
        style={{ paddingTop: '0.5rem', paddingBottom: '4rem' }}
      >
        <div>
          <div className="padding-global">
            <div className="container-large" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="family-history"
      aria-label="Family firefighting legacy"
      data-theme="light"
      className="padding-section-large home-story-legacy-root"
      style={{ paddingTop: '0.5rem', paddingBottom: '4rem' }}
    >
      <div>
        <div className="padding-global">
          <div className="container-large">
            <header
              className={`${styles.legacyHeader} ${styles.legacyHeaderAbout} home-story-legacy-header flex flex-col lg:grid text-center lg:text-left items-center lg:items-end`}
            >
              <p className={`${styles.kicker} text-center lg:text-left w-full`}>The family behind All Fire Services</p>
              <h2 id="legacy-title" className="text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)] text-center lg:text-left" style={{ color: '#111111', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                A Family Firefighting<br />
                <span style={{
                  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Legacy Since 1911
                </span>
              </h2>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0" style={{
                maxWidth: '34rem',
                color: '#4a4a46',
                fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
                lineHeight: 1.55
              }}>
                <p style={{ margin: 0, paddingBottom: '0.5rem' }}>
                  The Tricklebank family&apos;s connection to fire protection spans more than 115 years. Across generations, that experience has shaped a strong understanding of responsibility, service, and the importance of protecting people and property.
                </p>
              </div>
            </header>
          </div>
        </div>
      </div>
    </section>
  );
}
