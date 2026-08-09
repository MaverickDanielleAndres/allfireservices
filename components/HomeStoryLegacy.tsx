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
  { year: "1911", relation: "Uncle", name: "William Tricklebank", image: "/family/greatgrandad.jpg" },
  { year: "1931", relation: "Granddad", name: "Trevor Tricklebank", image: "/family/grandfathertrevor.jpg" },
  { year: "1955", relation: "Uncle", name: "Trevor Tricklebank Jr", image: "/family/uncletrevortricklebandjr.jpg" },
  { year: "1957", relation: "My Father", name: "Stanley Tricklebank", image: "/family/Myfather.png" },
  { year: "1959", relation: "Uncle", name: "Ian Tricklebank", image: "/family/uncleian.png" },
  { year: "Current", relation: "Current", name: "Peter Tricklebank", image: "/family/pete.png" },
  { year: "Next", relation: "Onto the\nNext\nGeneration", name: "", image: "", isNextGeneration: true }
];

type Generation = (typeof generations)[number] & { isNextGeneration?: boolean };

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
  const stemProgress = useTransform(progress, [markerStart, markerEnd], [0, 1]);
  const dotScale = useTransform(progress, [markerStart, markerEnd], [0.72, 1]);
  const dotOpacity = useTransform(progress, [markerStart, markerEnd], [0.28, 1]);
  const dotColor = useTransform(progress, [markerStart, markerEnd], ["#ffffff", "#e2231a"]);

  return (
    <motion.article
      className={`${styles.generation} ${generation.isNextGeneration ? styles.nextGeneration : ""}`}
      variants={generationReveal}
    >
      <div
        className={`${styles.portrait} ${generation.image ? "" : styles.portraitEmpty}`}
        style={{
          visibility: generation.isNextGeneration ? 'hidden' : 'visible',
          ...(generation.image ? {
            backgroundImage: "none",
            position: "relative",
            overflow: "hidden"
          } : {})
        } as CSSProperties}
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
        style={{ scaleY: reduceMotion ? 1 : stemProgress, visibility: generation.isNextGeneration ? 'hidden' : 'visible' }}
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
      {generation.isNextGeneration ? (
        <p className={`${styles.relation} ${styles.smallRelationOnDesktop}`} style={{ fontSize: '1.25rem', lineHeight: '1.2', marginTop: '1rem', whiteSpace: 'pre-line' }}>
          {generation.relation}
        </p>
      ) : (
        <p className={`${styles.relation} ${generation.relation.length > 16 ? styles.smallRelationOnDesktop : ""}`}>
          {generation.relation}
        </p>
      )}
      <p className={`${styles.name} ${generation.name.length > 20 ? styles.smallNameOnDesktop : ""}`}>
        {generation.name.replace(' ', '\n')}
      </p>
    </motion.article>
  );
}

type HomeStoryLegacyProps = {
  aboutPage?: boolean;
};

export default function HomeStoryLegacy({ aboutPage = false }: HomeStoryLegacyProps) {
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
      className="padding-section-large home-story-legacy-root"
      style={{ paddingTop: '0.5rem', paddingBottom: '4rem' }}
      ref={sectionRef}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
