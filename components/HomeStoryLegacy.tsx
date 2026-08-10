"use client";

import { motion, type Variants } from "framer-motion";
import styles from "./HomeStoryLegacy.module.css";

const reveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type HomeStoryLegacyProps = {
  aboutPage?: boolean;
};

export default function HomeStoryLegacy({ aboutPage = false }: HomeStoryLegacyProps) {
  return (
    <section
      id="family-history"
      aria-labelledby="legacy-title"
      data-theme="light"
      className="padding-section-large home-story-legacy-root"
      style={{ paddingTop: '0.5rem', paddingBottom: '4rem' }}
    >
      <div>
        <div className="padding-global">
          <div className="container-large">
            {aboutPage && (
              <motion.header
                className={`${styles.legacyHeader} ${styles.legacyHeaderAbout} home-story-legacy-header`}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className={styles.kicker}>The family behind All Fire Services</p>
                <h2 id="legacy-title" style={{ color: '#111111' }}>
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
                <div className="flex flex-col items-start" style={{
                  maxWidth: '34rem',
                  color: '#4a4a46',
                  fontSize: 'clamp(1rem, 1.45vw, 1.18rem)',
                  lineHeight: 1.55
                }}>
                  <p style={{ margin: 0, paddingBottom: '0.5rem' }}>
                    The Tricklebank family&apos;s connection to firefighting began more than a century ago. Across generations, that experience has shaped a strong understanding of responsibility, service, and the importance of protecting people and property.
                  </p>
                </div>
              </motion.header>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
