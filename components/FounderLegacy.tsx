"use client";

import styles from "./HomeStoryLegacy.module.css";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import YouTubeLite from "@/components/YouTubeLite";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FounderLegacy() {
  return (
    <section data-theme="light" style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}>
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large" style={{ paddingTop: '5rem', paddingBottom: '1rem' }}>

            <div className={styles.newStoryGrid} style={{ marginTop: '0', marginBottom: '0', alignItems: 'center' }}>
              <motion.div
                className={styles.newStoryContent}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <header
                  className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                  style={{ marginTop: 0, marginBottom: '1.5rem', maxWidth: 'none', width: '100%' }}
                >
                  <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>Our Family Legacy</p>
                  <h2 className="mx-0 text-left" style={{
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: '-0.04em',
                    maxWidth: '100%',
                  }}>
                    <span style={{ fontSize: 'clamp(3rem, 5.5vw, 6.5rem)' }}>Fire protection<br /></span>
                    <span style={{ fontSize: 'clamp(4rem, 7.5vw, 9rem)', lineHeight: 0.9 }}>
                      runs <span style={{ color: '#ff2a00' }}>in</span><br />
                      <span style={{
                        background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        our blood
                      </span>
                    </span>
                  </h2>
                </header>
                <p className="text-[#111111] text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.55] text-left" style={{ marginBottom: '1rem' }}>
                  The Tricklebank family has served on the front line of firefighting since <strong>1911</strong>. <strong>All Fire Services</strong> is a separate story — an Australian owned business established in <strong>2009</strong>, today owned by <strong>Peter Tricklebank</strong>.
                </p>
                <div className="flex justify-start">
                  <Link href="/about" className={styles.newStoryLink}>
                    READ OUR FULL STORY <span className={styles.newStoryLinkArrow}>&rarr;</span>
                  </Link>
                </div>
              </motion.div>

              {/* YouTube Video replacing photo — lite facade so the 1.8 MB
                  player script only loads when the user actually scrolls here. */}
              <motion.div
                style={{ width: '100%', maxWidth: '340px', margin: '0 auto', borderRadius: '1.5rem', overflow: 'hidden' }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div style={{ position: 'relative', paddingTop: '177.77%' }}>
                  <YouTubeLite
                    videoId="PY3FuIT0XQ4"
                    title="All Fire Services family legacy"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
