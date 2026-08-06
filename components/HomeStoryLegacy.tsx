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
import { usePathname } from "next/navigation";
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
  { year: "1911", relation: "Great Granddad", name: "William Tricklebank", image: "/family/waltergreatgrandad.png" },
  { year: "1911–1931", relation: "Grandfather", name: "Trevor Tricklebank", image: "/family/grandfathertrevor.jpg" },
  { year: "1957", relation: "Father", name: "Stanley Tricklebank", image: "/family/Myfather.png" },
  { year: "1955", relation: "Uncle", name: "Ian Tricklebank", image: "/family/Uncle.png" },
  { year: "2009", relation: "NSW Fire Brigades\nSenior Officer", name: "Grant Fuller", image: "/family/grantfuller.png" },
  { year: "2014", relation: "NSW Fire Brigade", name: "Paul Wilson", image: "/family/grantfuller.png" },
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
      <p className={styles.relation}>{generation.relation}</p>
      <p className={styles.name}>{generation.name.replace(' ', '\n')}</p>
    </motion.article>
  );
}

export default function HomeStoryLegacy() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const pathname = usePathname();

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

              {/* Sticky Video Column (Left) — Native CSS Sticky */}
              <div className="order-1 w-full relative h-full">
                <div
                  key={pathname}
                  className="w-full max-w-[320px] mx-auto lg:mx-auto lg:sticky lg:top-32"
                >
                  <div className="relative w-full aspect-[9/16] rounded-[1.5rem] overflow-hidden shadow-2xl">
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
                    All Fire Services was founded in 2009 by former NSW Fire Brigades Senior Officer Peter Tricklebank, with one clear belief: <strong>fire protection should be delivered by people who understand it beyond the checklist.</strong>
                  </p>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-8 text-center lg:text-left" style={{ marginBottom: '2.5rem' }}>
                    By building a team of <strong>serving and retired professional firefighters</strong>, every client benefits from <strong>practical knowledge, sound judgment, and experience gained on the front line.</strong>
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
                    <p className={`${styles.kickerLeft} mx-auto lg:mx-0`}>Why All Fire ?</p>
                    <h2 className="mx-auto lg:mx-0 text-center lg:text-left" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', maxWidth: '28ch' }}>
                      &ldquo;Who knows better<br className="hidden lg:block" />than a <span className={styles.orangeText}>fireman</span>?&rdquo;
                    </h2>
                  </motion.header>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-4 text-center lg:text-left" style={{ marginBottom: '1.5rem' }}>
                    Fire safety is <strong>more than inspections, paperwork, and compliance.</strong> It requires the <strong>discipline to notice what others miss</strong> and the <strong>experience to understand what could happen when a system fails.</strong>
                  </p>
                  <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] mb-8 text-center lg:text-left" style={{ marginBottom: '2.5rem' }}>
                    We bring <strong>generations of firefighting knowledge</strong> directly to your property, helping protect your people, assets, and business with <strong>nothing left to chance.</strong>
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

      <section className={styles.legacyContentSection} data-theme="light" style={{ background: '#ffffff', color: '#111111', paddingTop: 'clamp(2rem, 4vh, 4rem)', paddingBottom: '2rem' }}>
        <div className="padding-global">
          <div className="container-large">


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
              className="pb-16 md:pb-24 lg:pb-32 w-full max-w-[1000px] mx-auto px-5"
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              style={{ marginTop: 'clamp(3rem, 5vw, 4rem)' }}
            >
              <div className="flex flex-col gap-12 md:gap-32 w-full">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-32 items-center w-full overflow-hidden">
                  <h2 className="text-center md:text-left"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0, whiteSpace: 'nowrap' }}>
                    Century of Fire <br /><span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '0.1em' }}>Safety Experience</span>
                  </h2>
                  <p className="text-center md:text-justify"
                    style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                    For more than a century, our family has served on the <strong>front line of fire protection.</strong> Today, that <strong>generations-deep experience</strong> is combined with modern compliance standards to deliver <strong>practical, reliable protection</strong> for every property we service.
                  </p>
                </div>

                {/* Row 2 (Alternating) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-32 items-center w-full overflow-hidden">
                  <p className="order-2 md:order-1 text-center md:text-justify"
                    style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                    When you choose All Fire Services, you&apos;re <strong>not simply hiring a contractor</strong>. You&apos;re choosing a team shaped by <strong>real firefighting experience</strong> and an <strong>uncompromising commitment</strong> to protecting people, property, and businesses.
                  </p>
                  <h2 className="order-1 md:order-2 text-center md:text-right"
                    style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0, whiteSpace: 'nowrap' }}>
                    Uncompromising <br /><span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '0.1em' }}>Commitment</span>
                  </h2>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
