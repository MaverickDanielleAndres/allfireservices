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

type Generation = {
  year: string;
  relation: string;
  name: string;
  image: string;
};

const generations: Generation[] = [
  { year: "1911", relation: "Uncle", name: "William Tricklebank", image: "/family/unclewilliam.PNG" },
  { year: "1931", relation: "Granddad", name: "Trevor Tricklebank", image: "/family/grandfathertrevor.jpg" },
  { year: "1955", relation: "Uncle", name: "Trevor Tricklebank Jr", image: "/family/uncletrevortricklebandjr.jpg" },
  { year: "1957", relation: "My Father", name: "Stanley Tricklebank", image: "/family/myfather.jpg" },
  { year: "1959", relation: "Uncle", name: "Ian Tricklebank", image: "/family/uncleian.png" },
  { year: "Current", relation: "Current", name: "Peter Tricklebank", image: "/family/pete.png" },
];

function CompactTimeline() {
  return (
    <div className={styles.timelineViewport} style={{ padding: '0 0.5rem 1rem', marginBottom: '2rem' }}>
      <div
        className={styles.timelineTrack}
        style={
          {
            "--portrait-size": "clamp(5rem, 7.5vw, 7.5rem)",
            "--stem-height": "1.4rem",
            "--timeline-count": "7",
            "--timeline-line-offset": "0.3rem",
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generation.image}
                alt={`Portrait of ${generation.name}`}
                style={{
                  width: "100%",
                  height: "100%",
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
                margin: "0.85rem 0 0",
                fontSize: "clamp(1rem, 1.25vw, 1.35rem)",
                color: "#d92820",
                fontWeight: 700,
                lineHeight: 1.1,
                textTransform: "uppercase",
                fontFamily: '"Inter", var(--font-sans), sans-serif',
                width: "100%",
              }}
            >
              {generation.year}
            </p>
            <p
              style={{
                margin: "0.45rem 0 0",
                fontSize: "clamp(0.9rem, 1.05vw, 1.1rem)",
                color: "#161d28",
                fontWeight: 700,
                lineHeight: 1.25,
                whiteSpace: "pre-line",
                width: "100%",
              }}
            >
              {generation.relation}
            </p>
            <p
              style={{
                margin: "0.2rem 0 0",
                fontSize: "clamp(0.82rem, 0.95vw, 1rem)",
                color: "#161d28",
                fontWeight: 600,
                lineHeight: 1.2,
                whiteSpace: "pre-line",
                width: "100%",
              }}
            >
              {generation.name.replace(" ", "\n")}
            </p>
          </div>
        ))}
        {/* Next generation marker */}
        <div
          className={styles.generation}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/family/nexgenimage.png"
              alt="Next Generation Firefighter"
              style={{
                width: "100%",
                height: "100%",
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
              margin: "0.85rem 0 0",
              fontSize: "clamp(1rem, 1.25vw, 1.35rem)",
              color: "#d92820",
              fontWeight: 700,
              lineHeight: 1.1,
              textTransform: "uppercase",
              fontFamily: '"Inter", var(--font-sans), sans-serif',
              width: "100%",
            }}
          >
            NEXT
          </p>
          <p
            style={{
              margin: "0.45rem 0 0",
              fontSize: "clamp(0.82rem, 0.95vw, 1rem)",
              color: "#161d28",
              fontWeight: 600,
              lineHeight: 1.25,
              whiteSpace: "pre-line",
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
        <div className="container-large" style={{ maxWidth: '1440px', paddingInline: '48px' }}>
          <div className="padding-section-large" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>

            <div
              className={styles.newStoryGrid}
              style={{ marginTop: '0', marginBottom: '0', alignItems: 'stretch', overflow: 'hidden', minWidth: 0 }}
            >
              {/* LEFT COLUMN: timeline + headline + description + CTA */}
              <motion.div
                className={styles.newStoryContent}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: '0.25rem',
                }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <CompactTimeline />

                <header
                  className={`flex flex-col items-center`}
                  style={{ marginTop: 0, marginBottom: 0, maxWidth: 'none', width: '100%', textAlign: 'center' }}
                >
                  <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase', marginBottom: '0.4rem', textAlign: 'center' }}>Our Family Legacy</p>
                  <h2 className="mx-0" style={{
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: '-0.04em',
                    maxWidth: '100%',
                    margin: 0,
                    color: '#111111',
                    textAlign: 'center',
                  }}>
                    <span style={{
                      fontSize: 'clamp(2.25rem, 5.6vw, 6.75rem)',
                      display: 'block',
                      color: '#111111',
                    }}>
                      Fire protection
                    </span>
                    <span style={{
                      fontSize: 'clamp(2.25rem, 5.6vw, 6.75rem)',
                      lineHeight: 0.95,
                      display: 'block',
                      whiteSpace: 'nowrap',
                      color: '#111111',
                    }}>
                      runs <span style={{ color: '#ff2a00' }}>in</span>{' '}
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

                <p className="text-[#111111] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.55]" style={{ marginTop: '1rem', marginBottom: '0.75rem', maxWidth: 'min(100%, 36rem)', textAlign: 'center', marginInline: 'auto' }}>
                  The Tricklebank family has served on the front line of firefighting since <strong>1911</strong>.{' '}
                  <strong>All Fire Services</strong> is a separate story — an Australian owned business established in <strong>2009</strong>, today owned by <strong>Peter Tricklebank</strong>.
                </p>
                <div className="flex justify-center" style={{ marginTop: '0.25rem', width: '100%' }}>
                  <Link href="/about" className={styles.newStoryLink} style={{ textAlign: 'center' }}>
                    READ OUR FULL STORY <span className={styles.newStoryLinkArrow}>&rarr;</span>
                  </Link>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: video edge-to-edge */}
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  minHeight: 0,
                  minWidth: 0,
                }}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <YouTubeLite
                  videoId="PY3FuIT0XQ4"
                  title="All Fire Services family legacy"
                  style={{
                    display: 'block',
                    width: 'auto',
                    height: '100%',
                    flexShrink: 0,
                    borderRadius: '18px',
                    overflow: 'hidden',
                  }}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
