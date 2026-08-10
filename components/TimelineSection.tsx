"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import styles from "./HomeStoryLegacy.module.css";

const reveal: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

const timelineSequence: Variants = {
  hidden: {},
  show: {},
};

const generationReveal: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
};

const generations = [
  { year: "1911", relation: "Uncle", name: "William Tricklebank", image: "/family/greatgrandad.webp" },
  { year: "1931", relation: "Granddad", name: "Trevor Tricklebank", image: "/family/grandfathertrevor.webp" },
  { year: "1955", relation: "Uncle", name: "Trevor Tricklebank Jr", image: "/family/uncletrevortricklebandjr.webp" },
  { year: "1957", relation: "My Father", name: "Stanley Tricklebank", image: "/family/myfather.jpg" },
  { year: "1959", relation: "Uncle", name: "Ian Tricklebank", image: "/family/uncleian.webp" },
  { year: "Current", relation: "Current", name: "Peter Tricklebank", image: "/family/pete.webp" }
];

type Generation = (typeof generations)[number];

function TimelineGeneration({
  generation,
  index,
  progress,
  reduceMotion,
}: {
  generation: Generation;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const markerPosition = index / (generations.length - 1);
  const markerStart = Math.max(0, markerPosition - 0.055);
  const markerEnd = Math.min(1, markerPosition + 0.012);
  const stemProgress = useTransform(
    progress,
    [markerStart, markerEnd],
    [0, 1],
  );
  const dotScale = useTransform(
    progress,
    [markerStart, markerEnd],
    [0.72, 1],
  );
  const dotOpacity = useTransform(
    progress,
    [markerStart, markerEnd],
    [0.28, 1],
  );
  const dotColor = useTransform(
    progress,
    [markerStart, markerEnd],
    ["#ffffff", "#e2231a"],
  );

  return (
    <motion.article
      className={styles.generation}
      variants={generationReveal}
    >
      <div
        className={`${styles.portrait} ${generation.image ? "" : styles.portraitEmpty}`}
        style={generation.image ? {
          backgroundImage: "none",
          position: "relative",
          overflow: "hidden"
        } : {} as CSSProperties}
        role={generation.image ? "img" : "presentation"}
        aria-label={generation.image ? `Portrait of ${generation.name}` : undefined}
      >
        {generation.image && (
          <Image
            src={generation.image}
            alt={`Portrait of ${generation.name}`}
            fill
            unoptimized={true}
            sizes="160px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        )}
      </div>
      <motion.span
        className={styles.dropLine}
        style={{ scaleY: reduceMotion ? 1 : stemProgress }}
        aria-hidden="true"
      />
      <motion.span
        className={styles.timelineDot}
        style={{
          scale: reduceMotion ? 1 : dotScale,
          opacity: reduceMotion ? 1 : dotOpacity,
          backgroundColor: reduceMotion ? "#e2231a" : dotColor,
        }}
        aria-hidden="true"
      />
      <p className={styles.year}>{generation.year}</p>
      <p className={`${styles.relation} ${generation.relation.length > 16 ? styles.smallRelationOnDesktop : ""}`}>
        {generation.relation}
      </p>
      {/* Let CSS wrap the name on whitespace instead of forcing a `\n` break
          at the first space — gives every column a clean, even rhythm. */}
      <p className={`${styles.name} ${generation.name.length > 20 ? styles.smallNameOnDesktop : ""}`}>{generation.name}</p>
    </motion.article>
  );
}

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
  const timelineProgress = useSpring(timelineScrollProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.24,
    restDelta: 0.001,
  });

  return (
    <section
      id="family-history"
      aria-labelledby="legacy-title"
      data-theme="light"
      className="padding-section-large timeline-section-root"
      style={{ paddingBottom: '4rem' }}
      ref={sectionRef}
    >
      <div>
        <div className="padding-global">
          <div className="container-large">
            <motion.header
              className={styles.legacyHeader}
              style={{ marginBottom: '6rem' }}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className={styles.kicker}>The family behind All Fire Services</p>
              <h2 id="legacy-title">
                Fire protection<br />
                runs <span style={{ color: '#ff2a00' }}>in</span> <span style={{
                  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  our blood
                </span>
              </h2>
              <div className="flex flex-col items-start" style={{
                maxWidth: '34rem',
                color: '#4a4a46',
                fontSize: 'clamp(1rem, 1.45vw, 1.18rem)',
                lineHeight: 1.55
              }}>
                <p style={{ margin: 0, paddingBottom: '0.5rem' }}>
                  Frontline firefighting knowledge has been passed down through generations. We bring over a century of inherited understanding to the way we protect properties today.
                </p>
                <div style={{ marginTop: '0' }}>
                  <Link href="/about" className={styles.newStoryLink}>
                    READ OUR FULL STORY <span className={styles.newStoryLinkArrow}>&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.header>

            <div className={styles.timelineViewport}>
              <motion.div
                className={styles.timelineTrack}
                style={{ "--timeline-count": generations.length } as CSSProperties}
                variants={timelineSequence}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
              >
                <motion.div
                  className={styles.timelineLine}
                  style={{ scaleX: reduceMotion ? 1 : timelineProgress }}
                />
                {generations.map((generation, index) => (
                  <TimelineGeneration
                    key={`${generation.year}-${generation.name}`}
                    generation={generation}
                    index={index}
                    progress={timelineProgress}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
              
              {/* Centered Next Generation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={styles.nextGenerationCue}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '4rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <p className={styles.year} style={{ marginTop: 0, color: '#d92820', fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)', fontWeight: 700, textTransform: 'uppercase' }}>NEXT</p>
                  <p className={styles.relation} style={{ fontSize: 'clamp(1.5rem, 2vw, 1.8rem)', marginTop: '0.85rem', lineHeight: 1.35, whiteSpace: 'pre-line' }}>
                    Onto the{'\n'}Next{'\n'}Generation
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
