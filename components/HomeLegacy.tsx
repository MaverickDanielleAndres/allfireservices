"use client";

import {
  motion,
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
        technicians should be professional firefighters, serving. It means every client gets extensive, real-life knowledge of
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

export default function HomeStoryLegacy() {
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
