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
import SplitText from "./SplitText";
import { useRef, type CSSProperties } from "react";
import styles from "./HomeStoryLegacy.module.css";



const reveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const timelineSequence: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.28, staggerChildren: 0.1 },
  },
};

const generationReveal: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.82 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};



const generations = [
  { year: "1911", relation: "Great Granddad", name: "William Tricklebank", image: "/family/waltergreatgrandad.png" },
  { year: "1911–1931", relation: "Grandfather", name: "Trevor Tricklebank", image: "/family/grandfathertrevor.jpg" },
  { year: "1957", relation: "Father", name: "Stanley Tricklebank", image: "/family/Myfather.png" },
  { year: "1955", relation: "Uncle", name: "Ian Tricklebank", image: "/family/Uncle.png" },
  { year: "2009", relation: "NSW Fire Brigades Senior Officer", name: "Grant Fuller", image: "/family/grantfuller.png" },
  { year: "2014", relation: "NSW Fire Brigade", name: "Paul Wilson", image: "/family/grantfuller.png" },
  { year: "2020", relation: "Managing Director", name: "Peter Tricklebank", image: "/hompageWE LOVE OUR COFFEE & PETER LOVES THE TEAM SPIRIT/allfire-peter-1536x2048.webp" }
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
              objectPosition: generation.name === "Peter Tricklebank" ? "center 15%" : "center"
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
      <p className={styles.relation}>{generation.relation}</p>
      <p className={styles.name}>{generation.name}</p>
    </motion.article>
  );
}

export default function HomeStoryLegacy() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start 100px", "0.8 end"],
  });
  const timelineProgress = useSpring(timelineScrollProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.24,
    restDelta: 0.001,
  });

  return (
    <>
      <section id="team-spirit" className={styles.storySection} data-theme="light">
        <div className={styles.embers} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="padding-global">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative items-start lg:items-stretch pt-4">
              
              {/* Sticky Video Column (Left) */}
              <div className="order-1 w-full relative h-full">
                <div className="relative w-full max-w-[320px] mx-auto lg:mx-auto aspect-[9/16] rounded-[1.5rem] overflow-hidden shadow-2xl lg:sticky lg:top-32">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/PY3FuIT0XQ4?autoplay=1&mute=1&loop=1&playlist=PY3FuIT0XQ4&controls=0&showinfo=0&rel=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-[1.5rem]"
                  ></iframe>
                </div>
              </div>

              {/* Scrolling Text Column (Right) */}
              <div className="flex flex-col gap-16 lg:gap-40 order-2 px-6 md:px-12 lg:px-0 pb-12 lg:pb-32">
                
                {/* First Story Block */}
                <div className="flex flex-col justify-start text-center lg:text-left items-center lg:items-start">
                  <motion.header
                    className={`${styles.storyHeaderLeft} flex flex-col items-center lg:items-start text-center lg:text-left`}
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                  >
                    <p className={`${styles.kickerLeft} mx-auto lg:mx-0`}>Our story</p>
                    <h2 className="mx-auto lg:mx-0 text-center lg:text-left">
                      &ldquo;Founded by <span className={styles.orangeText}>a firefighter</span>&rdquo;
                    </h2>
                  </motion.header>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-4 text-center lg:text-left" style={{ marginBottom: '1.5rem' }}>
                    All Fire Services is an Australian owned and operated business, created by a former NSW Fire Brigades Senior Officer in December 2009.
                  </p>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-8 text-center lg:text-left" style={{ marginBottom: '2.5rem' }}>
                    The company was founded on a simple idea: that our customer service technicians should be professional firefighters, both serving and retired. It means every client gets extensive, real-life knowledge of the fire safety industry rather than a checklist.
                  </p>
                  <Link href="/about" className={styles.newStoryLink}>
                    READ OUR FULL STORY <span className={styles.newStoryLinkArrow}>&rarr;</span>
                  </Link>
                </div>

                {/* Second Story Block */}
                <div className="flex flex-col justify-start text-center lg:text-left items-center lg:items-start">
                  <motion.header
                    className={`${styles.storyHeaderLeft} flex flex-col items-center lg:items-start text-center lg:text-left`}
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                  >
                    <p className={`${styles.kickerLeft} mx-auto lg:mx-0`}>Our story</p>
                    <h2 className="mx-auto lg:mx-0 text-center lg:text-left" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', maxWidth: '28ch' }}>
                      &ldquo;Who knows better<br className="hidden lg:block" />than a <span className={styles.orangeText}>fireman</span>?&rdquo;
                    </h2>
                  </motion.header>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-4 text-center lg:text-left" style={{ marginBottom: '1.5rem' }}>
                    Fire protection is more than a checklist. It is lived experience, shared by a team and passed down through generations.
                  </p>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-8 text-center lg:text-left" style={{ marginBottom: '2.5rem' }}>
                    We bring the discipline, rapid response, and deep operational knowledge forged in the line of duty directly to your fire safety systems. When seconds matter and lives are on the line, our firsthand experience ensures nothing is left to chance.
                  </p>
                  <Link href="/about" className={styles.newStoryLink}>
                    READ OUR FULL STORY <span className={styles.newStoryLinkArrow}>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        id="family-history"
        className={styles.legacySection}
        aria-labelledby="legacy-title"
        data-theme="light"
        ref={sectionRef}
      >
        <div className={styles.stickyContainer}>
          <div className="padding-global">
            <div className="container-large">
              <motion.header
                className={styles.legacyHeader}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className={styles.kicker}>The generations behind All Fire Services</p>
                <h2 id="legacy-title">A family history of service</h2>
                <p>
                  From 1911 to the next generation, a legacy built around
                  protecting people and property.
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

      <section className={styles.legacyContentSection} data-theme="light" style={{ background: '#ffffff', color: '#111111', paddingBottom: '2rem' }}>
        <div className="padding-global">
          <div className="container-large">
            <motion.p
              className={styles.legacyTagline}
              initial={{ opacity: 0, scaleX: 0.92 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              A legacy of service. A future of leadership.
            </motion.p>

            <motion.div
              className={styles.historyGallery}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className={styles.historyImageWrap}>
                <Image src="/History/1 (3).jpg" alt="All Fire Services history" fill className={styles.historyImage} style={{ scale: 1.22, objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.historyImageWrap}>
                <Image src="/History/1 (1).jpg" alt="All Fire Services history" fill className={styles.historyImage} style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.historyImageWrap}>
                <Image src="/History/1 (2).jpg" alt="All Fire Services history" fill className={styles.historyImage} style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            </motion.div>

            <motion.div
              className={`${styles.legacyParagraph} pb-16 md:pb-24 lg:pb-32`}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.8 }}
            >
              <p>
                For over a century, our family has stood on the front lines of fire<br className={styles.brDesktop} />
                protection. We blend <strong><SplitText text="generations of firsthand firefighting experience" delay={15} className={styles.orangeText} /></strong><br className={styles.brDesktop} />
                with <strong className={styles.altColor}><SplitText text="modern safety" delay={15} /></strong> compliance. When you choose All Fire<br className={styles.brDesktop} />
                Services, you&apos;re not just hiring a contractor—you&apos;re partnering with<br className={styles.brDesktop} />
                an <strong><SplitText text="uncompromising commitment to keeping your people safe." delay={15} className={styles.orangeText} /></strong>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
