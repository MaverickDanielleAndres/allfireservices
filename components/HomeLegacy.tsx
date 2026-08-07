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
import {
  Accessibility,
  ArrowUpRight,
  CircleGauge,
  ClipboardCheck,
  FireExtinguisher,
  Flame,
  PanelsTopLeft,
  Siren,
  type LucideIcon,
} from "lucide-react";
import { useRef, type CSSProperties } from "react";
import styles from "./HomeStoryLegacy.module.css";

const storyCards = [
  {
    eyebrow: "Team spirit",
    title: "We love our coffee & Peter loves the team spirit",
    copy: (
      <>
        <p>
          All Fire Services Australia has grown &ndash; now proudly serving
          across the Greater Sydney Area.
        </p>
        <p>
          Peter would like to give a big shoutout to our amazing Sydney team:
          Paul, Sam, George, Ken, Kyriakos &amp; Orlando. Our clients truly
          appreciate your dedication and quick response in keeping every
          building safe. Fantastic work, team &ndash; keep it up!
        </p>
        <p className={styles.signature}>Pete</p>
      </>
    ),
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp",
    imageAlt: "Peter with the All Fire Services coffee logo",
  },
  {
    eyebrow: "Our story",
    title: "Australian owned since 2009",
    copy: (
      <p>
        All Fire Services is an Australian owned and operated business,
        established in December 2009 by a former senior NSW Fire Brigade
        officer. Peter Tricklebank is the current owner.
      </p>
    ),
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-1536x2048.webp",
    imageAlt: "Peter Tricklebank, owner of All Fire Services",
    imageClassName: styles.founderImage,
  },
  {
    eyebrow: "Real experience",
    title: "More than a checklist",
    copy: (
      <p>
        The company was founded on a simple idea: that our customer service
        technicians should be professional firefighters, both serving and
        retired. It means every client gets extensive, real-life knowledge of
        the fire safety industry rather than a checklist.
      </p>
    ),
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
    imageAlt: "All Fire Services firefighter technicians",
    link: true,
  },
];

const galleryTiles = [
  {
    title: "Certified Professionals",
    subtitle: "Highly trained and experienced",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-1536x2048.webp",
    imageAlt: "Peter from All Fire Services",
  },
  {
    title: "Fast Response Times",
    subtitle: "Always there when you need us most",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
    imageAlt: "All Fire Services technicians together",
  },
  {
    title: "Trusted Reliability",
    subtitle: "Count on us for your safety",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp",
    imageAlt: "All Fire Services technicians at a coastal property",
  },
  {
    title: "Compliance Experts",
    subtitle: "Up-to-date with regulations",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp",
    imageAlt: "All Fire Services team beside a service vehicle",
  },
  {
    title: "Dedicated Team Spirit",
    subtitle: "A united team protecting you",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp",
    imageAlt: "Three All Fire Services team members together",
  },
  {
    title: "Safety First Approach",
    subtitle: "Your protection is our priority",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-with-guildo-scaled-e1759978124384-2048x1536.webp",
    imageAlt: "All Fire Services technicians with a client",
  },
  {
    title: "24/7 Support",
    subtitle: "Round-the-clock peace of mind",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp",
    imageAlt: "All Fire Services team enjoying coffee together",
  },
];

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

const protectionCapabilities: Array<{
  code: string;
  title: string;
  detail: string;
  icon: LucideIcon;
}> = [
    {
      code: "FE-01",
      title: "Fire Extinguishers",
      detail: "Portable first response, selected and maintained for the risk.",
      icon: FireExtinguisher,
    },
    {
      code: "HR-02",
      title: "Fire Hoses & Reels",
      detail: "Accessible water supply kept ready for immediate use.",
      icon: CircleGauge,
    },
    {
      code: "HB-03",
      title: "Fire Hydrants & Boosters",
      detail: "Reliable firefighting connections, flow and pressure.",
      icon: Siren,
    },
    {
      code: "EE-04",
      title: "Emergency Equipment",
      detail: "Essential systems that support safe, orderly evacuation.",
      icon: Accessibility,
    },
    {
      code: "FP-05",
      title: "Fire Panels",
      detail: "Detection, indication and control kept clear and responsive.",
      icon: PanelsTopLeft,
    },
    {
      code: "TC-06",
      title: "Testing & Compliance",
      detail: "Documented assurance aligned with applicable standards.",
      icon: ClipboardCheck,
    },
  ];

const generations = [
  { year: "1911", relation: "Uncle", name: "William Tricklebank", x: "1.5%" },
  { year: "1931", relation: "Granddad", name: "Trevor Tricklebank", x: "12.1%" },
  { year: "1955", relation: "Uncle", name: "Trevor Tricklebank Jr", x: "22.9%" },
  { year: "1957", relation: "My Father", name: "Stanley Tricklebank", x: "33.5%" },
  { year: "1959", relation: "Uncle", name: "Ian Tricklebank", x: "44.3%" },
  {
    year: "Current",
    relation: "Current",
    name: "Peter Tricklebank",
    x: "55%",
  }
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
        style={{ "--portrait-x": generation.x } as CSSProperties}
        role="img"
        aria-label={`Portrait of ${generation.name}`}
      />
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start 82%", "end 42%"],
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
            <motion.header
              className={styles.storyHeader}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className={styles.kicker}>Our story</p>
              <h2>&ldquo;Who knows better than a fireman?&rdquo;</h2>
              <p className={styles.intro}>
                Fire protection is more than a checklist. It is lived
                experience, shared by a team and passed down through
                generations.
              </p>
            </motion.header>

            <div className={styles.storyGrid}>
              {storyCards.map((card, index) => (
                <motion.article
                  className={styles.storyCard}
                  key={card.title}
                  initial={{ opacity: 0, y: 52 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className={styles.cardImageWrap}>
                    <Image
                      fill
                      src={card.image}
                      alt={card.imageAlt}
                      sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className={`${styles.cardImage} ${card.imageClassName ?? ""}`}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                    <h3>{card.title}</h3>
                    <div className={styles.cardCopy}>{card.copy}</div>
                    {card.link && (
                      <Link className={styles.storyLink} href="/about">
                        <span className={styles.storyLinkCopy}>
                          <strong>Meet the people behind the protection</strong>
                          <small>Explore our full family story</small>
                        </span>
                        <span className={styles.storyLinkArrow} aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className={styles.storyGallery} aria-label="All Fire Services team highlights">
              {galleryTiles.map((tile, index) => (
                <motion.figure
                  className={styles.galleryTile}
                  key={tile.title}
                  initial={{ opacity: 1, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: (index % 4) * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    fill
                    src={tile.image}
                    alt={tile.imageAlt}
                    loading="eager"
                    unoptimized
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 36vw"
                    className={styles.galleryImage}
                  />
                  <figcaption className={styles.galleryCaption}>
                    <strong>{tile.title}</strong>
                    <span>{tile.subtitle}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section
        id="family-history"
        className={styles.legacySection}
        aria-labelledby="legacy-title"
        data-theme="light"
      >
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

            <div className={styles.timelineViewport} ref={timelineRef}>
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
              
              {/* Centered Next Generation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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

            <motion.p
              className={styles.legacyTagline}
              initial={{ opacity: 0, scaleX: 0.92 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              A legacy of service. A future of leadership.
            </motion.p>

            <motion.section
              className={styles.capabilitySystem}
              aria-labelledby="capability-title"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.membershipCredential}>
                <div className={styles.credentialLockup}>
                  <div className={styles.fpaMark} aria-label="FPA Australia">
                    <Flame aria-hidden="true" />
                    <strong>FPA</strong>
                    <span>Australia</span>
                  </div>
                  <div className={styles.bronzeMark}>
                    <strong>Bronze Member</strong>
                    <span>Fire Protection Association Australia</span>
                  </div>
                </div>

                <p className={styles.credentialKicker}>Industry-backed capability</p>
                <h3 id="capability-title">
                  Connected protection. Complete coverage.
                </h3>
                <p className={styles.credentialCopy}>
                  FPA Australia membership backed by practical capability
                  across the systems protecting your building.
                </p>
                <Link className={styles.credentialLink} href="/fpa-australia-member">
                  <span>Explore our FPA membership</span>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>

              <div className={styles.capabilityMap}>
                <svg
                  className={styles.capabilityTrace}
                  viewBox="0 0 600 330"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 92 88 H 508 V 242 H 92"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>

                {protectionCapabilities.map((capability, index) => {
                  const CapabilityIcon = capability.icon;

                  return (
                    <motion.article
                      className={styles.capabilityNode}
                      key={capability.code}
                      initial={{ opacity: 0, y: 22, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className={styles.capabilityCode}>{capability.code}</span>
                      <span className={styles.capabilityIcon} aria-hidden="true">
                        <CapabilityIcon />
                      </span>
                      <h4>{capability.title}</h4>
                      <p>{capability.detail}</p>
                    </motion.article>
                  );
                })}
              </div>
            </motion.section>

            <motion.aside
              className={styles.trustPanel}
              aria-labelledby="trusted-title"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 52, scale: 0.98 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                    staggerChildren: 0.14,
                    delayChildren: 0.15,
                  },
                },
              }}
            >
              <div className={styles.trustGlow} aria-hidden="true" />
              <motion.div className={styles.sinceMark} variants={reveal}>
                <span>Trusted since</span>
                <strong>2009</strong>
                <small>Greater Sydney</small>
              </motion.div>

              <div className={styles.trustStories}>
                <motion.div className={styles.trustStory} variants={reveal}>
                  <p className={styles.trustIndex}>01 / Our standard</p>
                  <h3 id="trusted-title">Trusted Since 2009</h3>
                  <p>
                    Since our inception, AllFire Services has maintained the
                    certifications, insurances and workplace safety standards
                    expected of a professional fire protection provider. More
                    importantly, we&apos;ve built lasting relationships by
                    delivering practical solutions, reliable service and
                    genuine peace of mind.
                  </p>
                </motion.div>

                <motion.div className={styles.trustStory} variants={reveal}>
                  <p className={styles.trustIndex}>02 / Our inheritance</p>
                  <h3>A Legacy of Protection</h3>
                  <p>
                    More than a century of family history has shaped who we are
                    today, and it continues to inspire how we serve our clients.
                  </p>
                  <div className={styles.trustPills} aria-label="AllFire values">
                    <span>Family-led</span>
                    <span>Firefighter-backed</span>
                    <span>Sydney-based</span>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
