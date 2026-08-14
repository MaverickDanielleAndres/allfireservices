"use client";

import styles from "./HomeStoryLegacy.module.css";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import YouTubeLite from "@/components/YouTubeLite";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

type Generation = {
  year: string;
  relation: string;
  name: string;
  image: string;
};

const generations: Generation[] = [
  { year: "1911", relation: "Great Granddad", name: "William\nTricklebank", image: "/family/greatgrandad.jpg" },
  { year: "1931", relation: "Granddad", name: "Trevor\nTricklebank", image: "/family/grandfathertrevor.jpg" },
  { year: "1955", relation: "Uncle", name: "Trevor\nTricklebank Jr", image: "/family/uncletrevortricklebandjr.jpg" },
  { year: "1957", relation: "My Father", name: "Stanley\nTricklebank", image: "/family/myfather.jpg" },
  { year: "1959", relation: "Uncle", name: "Ian\nTricklebank", image: "/family/uncleian.png" },
  { year: "Current", relation: "Current", name: "Peter\nTricklebank", image: "/family/pete.png" },
];

export function CompactTimeline({ larger = false }: { larger?: boolean }) {
  // Larger font sizes used on the About page so the family tree reads bigger.
  // Home page compact mode is tuned for a ~131px column width: portrait
  // ~115px gives ~16px visible breathing room between adjacent circles.
  const yearFontSize = larger ? "clamp(1.35rem, 1.9vw, 1.85rem)" : "clamp(1.1rem, 1.45vw, 1.35rem)";
  const relationFontSize = larger ? "clamp(1.15rem, 1.6vw, 1.55rem)" : "clamp(0.95rem, 1.2vw, 1.15rem)";
  const nameFontSize = larger ? "clamp(1.05rem, 1.4vw, 1.4rem)" : "clamp(0.85rem, 1.05vw, 1rem)";
  const portraitSize = larger ? "clamp(6.5rem, 9.5vw, 9.5rem)" : "clamp(6rem, 7.6vw, 7.2rem)";

  return (
    <div className={styles.timelineViewport} style={{ padding: '0', overflow: 'visible' }}>
      <div
        className={styles.timelineTrack}
        style={
          {
            "--portrait-size": portraitSize,
            /* 10–15px between portrait and timeline line. */
            "--stem-height": larger ? "0.85rem" : "0.75rem",
            "--timeline-count": "7",
            "--timeline-line-offset": "0.18rem",
            /* No column-gap — visible breathing room is created by the
               gap between each ~115px circle and its ~131px column. */
            columnGap: "0",
          } as React.CSSProperties
        }
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 0,
            top: "calc(var(--portrait-size) + var(--stem-height) + 0.3rem)",
            left: "calc(100% / (var(--timeline-count) * 2))",
            right: "calc(100% / (var(--timeline-count) * 2))",
            height: "0.3rem",
            background:
              "linear-gradient(to right, rgba(255, 42, 0, 0) 0%, rgba(255, 42, 0, 0.25) 12%, rgba(255, 183, 0, 0.25) 88%, rgba(255, 183, 0, 0) 100%)",
            borderRadius: "999px",
          }}
        />
        <div
          className={styles.timelineLine}
          style={{
            transform: "scaleX(1)",
            top: "calc(var(--portrait-size) + var(--stem-height) + 0.3rem)",
            height: "0.3rem",
            left: "calc(100% / (var(--timeline-count) * 2))",
            right: "calc(100% / (var(--timeline-count) * 2))",
            background:
              "linear-gradient(to right, rgba(255, 42, 0, 0) 0%, #ff2a00 10%, #ffb700 90%, rgba(255, 183, 0, 0) 100%)",
          }}
        />
        {generations.map((generation) => (
          <div
            className={styles.generation}
            key={`${generation.year}-${generation.name}`}
            style={{
              padding: "0",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "var(--portrait-size)",
                height: "var(--portrait-size)",
                borderRadius: "999px",
                border: "0.28rem solid #f0f0ed",
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 0.65rem 1.4rem rgba(17, 17, 17, 0.12)",
                backgroundColor: "#f9fafb",
              }}
            >
              <Image
                src={generation.image}
                alt={`Portrait of ${generation.name}`}
                fill
                sizes="160px"
                style={{
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                  display: "block",
                }}
              />
            </div>
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "0.14rem",
                height: "var(--stem-height)",
                margin: "0 auto",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #ff2a00 0, #ff2a00 0.18rem, transparent 0.18rem, transparent 0.38rem), linear-gradient(to bottom, #ff2a00, #ffb700)",
                backgroundBlendMode: "normal",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "0.85rem",
                height: "0.85rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #ff2a00, #ffb700)",
                boxShadow: "0 0 0 0.18rem #ffffff, 0 0 0 0.32rem rgba(255, 42, 0, 0.22)",
                marginTop: "0",
              }}
            />
            <p
              style={{
                /* ~10–14px below the marker. */
                margin: "0.7rem 0 0",
                fontSize: yearFontSize,
                color: "#d92820",
                fontWeight: 700,
                lineHeight: 1.1,
                textTransform: "uppercase",
                fontFamily: '"Inter", var(--font-sans), sans-serif',
                width: "100%",
                /* Keep "CURRENT" and "NEXT" on a single line. */
                whiteSpace: "nowrap",
              }}
            >
              {generation.year}
            </p>
            <p
              style={{
                /* ~6–10px below the year. */
                margin: "0.5rem 0 0",
                fontSize: relationFontSize,
                color: "#161d28",
                fontWeight: 700,
                lineHeight: 1.25,
                whiteSpace: "normal",
                overflowWrap: "normal",
                wordBreak: "normal",
                hyphens: "none",
                width: "100%",
              }}
            >
              {generation.relation}
            </p>
            <p
              style={{
                /* ~6–10px below relation (tight). */
                margin: "0.45rem 0 0",
                fontSize: nameFontSize,
                color: "#161d28",
                fontWeight: 600,
                lineHeight: 1.22,
                /* The data inserts "\n" between first and last name so every
                   generation renders the same two-line rhythm
                   (e.g. "Ian" / "Tricklebank"). `pre-line` honours the
                   newline as a soft break without splitting words. */
                whiteSpace: "pre-line",
                overflowWrap: "normal",
                wordBreak: "normal",
                hyphens: "none",
                width: "100%",
              }}
            >
              {generation.name}
            </p>
          </div>
        ))}
        {/* Next generation marker */}
        <div
          className={`${styles.generation} ${styles.nextGeneration}`}
          style={{
            padding: "0",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "var(--portrait-size)",
              height: "var(--portrait-size)",
              borderRadius: "999px",
              border: "0.28rem solid #f0f0ed",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 0.65rem 1.4rem rgba(17, 17, 17, 0.12)",
              backgroundColor: "#f9fafb",
            }}
          >
            <Image
              src="/family/nexgenimage.png"
              alt="Next Generation Firefighter"
              fill
              sizes="160px"
              style={{
                objectFit: "cover",
                filter: "grayscale(100%)",
                display: "block",
              }}
            />
          </div>
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: "0.14rem",
              height: "var(--stem-height)",
              margin: "0 auto",
              backgroundImage:
                "repeating-linear-gradient(to bottom, #ff2a00 0, #ff2a00 0.18rem, transparent 0.18rem, transparent 0.38rem), linear-gradient(to bottom, #ff2a00, #ffb700)",
              backgroundBlendMode: "normal",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: "0.85rem",
              height: "0.85rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #ff2a00, #ffb700)",
              boxShadow: "0 0 0 0.18rem #ffffff, 0 0 0 0.32rem rgba(255, 42, 0, 0.22)",
              marginTop: "0",
            }}
          />
          <p
            style={{
              /* ~10–14px below marker — matches the year rhythm. */
              margin: "0.7rem 0 0",
              fontSize: yearFontSize,
              color: "#d92820",
              fontWeight: 700,
              lineHeight: 1.1,
              textTransform: "uppercase",
              fontFamily: '"Inter", var(--font-sans), sans-serif',
              width: "100%",
              /* "NEXT" stays on one line. */
              whiteSpace: "nowrap",
            }}
          >
            NEXT
          </p>
          <p
            style={{
              /* ~6–10px below the year. The string already contains
                 real newlines so `pre-line` renders them as soft
                 breaks without splitting words. */
              margin: "0.5rem 0 0",
              fontSize: nameFontSize,
              color: "#161d28",
              fontWeight: 600,
              lineHeight: 1.22,
              whiteSpace: "pre-line",
              overflowWrap: "normal",
              wordBreak: "normal",
              hyphens: "none",
              width: "100%",
            }}
          >
            Onto the{"\n"}Next{"\n"}Generation
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FounderLegacy() {
  return (
    <section data-theme="light" style={{ position: 'relative', zIndex: 10, background: '#ffffff', overflow: 'hidden' }}>
      <div className="padding-global" style={{ paddingLeft: 'clamp(0.75rem, 1.5vw, 1.5rem)', paddingRight: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
        <div className="container-large" style={{ maxWidth: '1440px', paddingInline: 'clamp(1rem, 3vw, 3rem)' }}>
          <div className="padding-section-large" style={{ paddingTop: 'clamp(1.25rem, 2.5vw, 3rem)', paddingBottom: 'clamp(1rem, 2vw, 3rem)' }}>

            <div
              className={styles.newStoryGrid}
              style={
                {
                  marginTop: '0',
                  marginBottom: '0',
                  alignItems: 'stretch',
                  overflow: 'hidden',
                  minWidth: 0,
                  /* DESKTOP SPACING — per spec:
                       Left  ~65–70% (heading + description + timeline)
                       Right ~25–30% (vertical video)
                       Gap   ~40–60px between them
                     2.3fr / 1fr at ~1440px viewport with a 50px gap:
                       timeline ≈ 65.7%, video ≈ 28.6% — right inside the spec. */
                  gridTemplateColumns: 'minmax(0, 2.3fr) minmax(280px, 1fr)',
                  columnGap: '50px',
                } as React.CSSProperties
              }
            >
              {/* LEFT COLUMN: timeline + headline + description + CTA */}
              <motion.div
                className={styles.newStoryContent}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: '1.25rem',
                }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <header
                  className={`flex flex-col items-center`}
                  style={{ marginTop: 0, marginBottom: 0, maxWidth: 'none', width: '100%', textAlign: 'center' }}
                >
                  <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase', marginBottom: '0.4rem', textAlign: 'center' }}>Our Family Legacy</p>
                  <h2 className="mx-0" style={{
                    maxWidth: '100%',
                    margin: 0,
                    color: '#111111',
                    textAlign: 'center',
                  }}>
                    <span className={styles.founderHeadingLine}>
                      Fire protection
                    </span>
                    <span className={styles.founderHeadingLine}>
                      runs in <span
                        style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        our blood
                      </span>
                    </span>
                  </h2>
                </header>

                <p className="text-[#111111] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.55]" style={{ marginTop: '0.5rem', marginBottom: 0, maxWidth: '100%', textAlign: 'center', marginInline: 'auto' }}>
                  The Tricklebank family has served on the front line of firefighting since <strong>1911</strong>.{' '}
                  <strong>All Fire Services</strong> is a separate story — an Australian owned business established in <strong>2009</strong>, today owned by <strong>Peter Tricklebank</strong>.
                </p>

                {/* Even vertical rhythm: ~22px above AND ~22px below the
                   timeline, so the description and the CTA sit at equal
                   distances from the family-tree row. */}
                <div style={{ marginTop: '22px', width: '100%' }}>
                  <CompactTimeline />
                </div>

                <div className="flex justify-center" style={{ marginTop: '22px', width: '100%' }}>
                  <Link href="/about" className={styles.newStoryLink} style={{ textAlign: 'center' }}>
                    READ OUR FULL STORY <span className={styles.newStoryLinkArrow}>&rarr;</span>
                  </Link>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: vertical video that grows with the LEFT
                  column height. The grid uses `align-items: stretch` so
                  this motion.div already inherits the row height (set
                  by the tallest column — i.e. the left one). We then
                  fill that height with the 9:16 portrait video. */}
              <motion.div
                style={{
                  width: '100%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  minWidth: 0,
                  height: '100%',
                }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <YouTubeLite
                  videoId="PY3FuIT0XQ4"
                  title="All Fire Services family legacy"
                  className={styles.founderVideo}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
