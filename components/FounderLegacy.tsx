"use client";

import Image from "next/image";
import styles from "./HomeStoryLegacy.module.css";
import { motion, type Variants } from "framer-motion";

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
          <div className="padding-section-large" style={{ paddingTop: '5rem', paddingBottom: 'clamp(5rem, 8vw, 10rem)' }}>

            <div className={styles.newStoryGrid} style={{ marginTop: '0', marginBottom: '0', alignItems: 'stretch' }}>
              <motion.div
                className={styles.newStoryContent}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <header
                  className={`${styles.storyHeaderLeft} flex flex-col items-center md:items-start text-center md:text-left`}
                  style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                >
                  <p className={`${styles.kickerLeft} mx-auto md:mx-0 justify-center md:justify-start`} style={{ textTransform: 'uppercase' }}>MEET OUR FOUNDER</p>
                  <h2 className="mx-auto md:mx-0" style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch', lineHeight: 0.94 }}>
                    &ldquo;Fire Protection<br />Runs in <span className={styles.orangeText}>Our Blood</span>&rdquo;
                  </h2>
                </header>
                <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-center md:text-left" style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
                  Most fire safety companies learn from manuals.<br />We learned on the front line.
                </p>
                <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-center md:text-left" style={{ marginBottom: '1.5rem' }}>
                  All Fire Services was founded by Peter Tricklebank, former NSW Fire Brigades Senior Officer, after decades of protecting lives in real emergencies. Backed by a family history of firefighters dating back to 1911, every inspection, certification, and recommendation is shaped by experience earned where it matters most.
                </p>
                <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-center md:text-left" style={{ fontWeight: 'bold' }}>
                  When your building&apos;s safety is on the line, trust the people who have spent generations protecting lives and property.
                </p>
              </motion.div>

              <motion.div
                style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px', maxHeight: '550px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Image
                  src="/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-peter-1536x2048.webp"
                  alt="Peter Wood, Managing Director"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
