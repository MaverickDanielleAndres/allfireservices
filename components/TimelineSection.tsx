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
  { year: "1911", relation: "Great Granddad", name: "William Tricklebank", image: "/family/greatgrandad.jpg" },
  { year: "1911–1931", relation: "Grandfather", name: "Trevor Tricklebank", image: "/family/grandfathertrevor.jpg" },
  { year: "1957", relation: "Father", name: "Stanley Tricklebank", image: "/family/Myfather.png" },
  { year: "1955", relation: "Uncle", name: "Ian Tricklebank", image: "/family/Uncle.png" },
  { year: "2009", relation: "NSW Fire Brigades\nSenior Officer", name: "Grant Fuller", image: "/family/grantfuller.png" },
  { year: "2014", relation: "NSW Fire Brigade", name: "Paul Wilson", image: "/family/paul.jpg" },
  { year: "2020", relation: "Managing Director", name: "Peter Tricklebank", image: "/family/pete.png" }
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
        className={styles.portrait}
        style={{
          ...(generation.image ? {
            backgroundImage: "none",
            position: "relative",
            overflow: "hidden"
          } : {})
        } as CSSProperties}
        role="img"
        aria-label={`Portrait of ${generation.name}`}
      >
        {generation.image && (
          <Image
            src={generation.image}
            alt={`Portrait of ${generation.name}`}
            fill
            unoptimized={true}
            sizes="160px"
            style={{
              objectFit: "cover",
              objectPosition: "center"
            }}
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
      <p className={`${styles.relation} ${generation.year === "2009" ? styles.smallRelationOnDesktop : ""}`}>
        {generation.relation}
      </p>
      <p className={styles.name}>{generation.name.replace(' ', '\n')}</p>
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
      className="padding-section-large"
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
              <p className={styles.kicker}>THE GENERATIONS BEHIND ALL FIRE SERVICES</p>
              <h2 id="legacy-title">A Family History of Service</h2>
              <p>
                From 1911 to today, our family has carried forward a commitment to <strong>protecting lives, property, and communities.</strong>
                <br /><br />
                Across four generations, frontline knowledge has been passed down and transformed into the <strong>practical fire protection expertise</strong> behind All Fire Services.
              </p>
            </motion.header>

            <div className={styles.timelineViewport}>
              <motion.div
                className={styles.timelineTrack}
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
