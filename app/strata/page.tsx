"use client";
import ContactCTA from "@/components/ContactCTA";
import React, { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import styles from "@/components/HomeStoryLegacy.module.css";

// 28 properties All Fire Services supports across Greater Sydney, presented
// as four stacked rows of 7 ExpandingCards each. The first two rows are
// visible by default; the last two are revealed when the user clicks
// "More Buildings". Source files are pre-optimised to webp in
// public/stratapage-cropped/opt/ so each card stays well under 100 KB.
const ROW_SIZE = 7;
const VISIBLE_ROWS = 2;

const descriptionByLocation: Record<string, string> = {
  Bondi: "Servicing premium strata blocks and residential complexes in Bondi.",
  Marrickville: "Reliable fire safety maintenance for historic and modern buildings in Marrickville.",
  Waterloo: "Large-scale fire system management for expansive Waterloo developments.",
  Haberfield: "Trusted strata fire services preserving Haberfield's unique heritage properties.",
  Randwick: "Comprehensive fire safety services for Randwick's apartments and strata buildings.",
  "Rose Bay": "Specialist fire protection for premium Rose Bay residential complexes.",
  Alexandria: "Modern fire compliance solutions for vibrant Alexandria apartments.",
  Enmore: "Practical fire safety servicing for Enmore's residential and mixed-use buildings.",
  Greenacre: "Comprehensive fire protection across Greenacre's residential communities.",
  Chippendale: "Fire safety support for Chippendale's apartments and commercial properties.",
  Rockdale: "Trusted fire safety servicing for Rockdale's residential blocks and shops.",
  Stanmore: "Fire safety maintenance for Stanmore's terraces and apartment buildings.",
  Glebe: "Fire safety services for Glebe's heritage and modern apartment buildings.",
  "North Sydney": "Reliable fire protection for North Sydney's high-rise and commercial developments.",
};

const strataBuildings: CardItem[] = [
  // ── Row 1 (7 cards) ─────────────────────────────────────────────────────
  { id: "randwick-building", title: "Randwick", description: descriptionByLocation.Randwick, imgSrc: "/stratapage-cropped/opt/randwick-building.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "randwick-welcome", title: "Randwick", description: descriptionByLocation.Randwick, imgSrc: "/stratapage-cropped/opt/1-all-fire-services-welcome-randwick.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "enmore", title: "Enmore", description: descriptionByLocation.Enmore, imgSrc: "/stratapage-cropped/opt/2-all-fire-services-welcome-enmore.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "greenacre", title: "Greenacre", description: descriptionByLocation.Greenacre, imgSrc: "/stratapage-cropped/opt/3-all-fire-services-welcome-greenacre.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "haberfield-1", title: "Haberfield", description: descriptionByLocation.Haberfield, imgSrc: "/stratapage-cropped/opt/4-all-fire-services-welcome-haberfield.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "chippendale-1", title: "Chippendale", description: descriptionByLocation.Chippendale, imgSrc: "/stratapage-cropped/opt/5-all-fire-services-welcome-chippendale.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "rockdale-1", title: "Rockdale", description: descriptionByLocation.Rockdale, imgSrc: "/stratapage-cropped/opt/6-all-fire-services-welcome-rockdale.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  // ── Row 2 (7 cards) ─────────────────────────────────────────────────────
  { id: "waterloo-1", title: "Waterloo", description: descriptionByLocation.Waterloo, imgSrc: "/stratapage-cropped/opt/7-all-fire-services-welcome-waterloo.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "marrickville-1", title: "Marrickville", description: descriptionByLocation.Marrickville, imgSrc: "/stratapage-cropped/opt/8-all-fire-services-welcome-marrickville.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "marrickville-2", title: "Marrickville", description: descriptionByLocation.Marrickville, imgSrc: "/stratapage-cropped/opt/9-all-fire-services-welcome-marrickville.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "stanmore-1", title: "Stanmore", description: descriptionByLocation.Stanmore, imgSrc: "/stratapage-cropped/opt/10-all-fire-services-welcome-stanmore.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "bondi-1", title: "Bondi", description: descriptionByLocation.Bondi, imgSrc: "/stratapage-cropped/opt/11-all-fire-services-welcome-bondi.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "alexandria-1", title: "Alexandria", description: descriptionByLocation.Alexandria, imgSrc: "/stratapage-cropped/opt/12-all-fire-services-welcome-alexandria.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "glebe", title: "Glebe", description: descriptionByLocation.Glebe, imgSrc: "/stratapage-cropped/opt/13-all-fire-services-welcome-glebe.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  // ── Row 3 (7 cards) — revealed by "More Buildings" ─────────────────────
  { id: "marrickville-3", title: "Marrickville", description: descriptionByLocation.Marrickville, imgSrc: "/stratapage-cropped/opt/14-all-fire-services-welcome-marrickville.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "north-sydney", title: "North Sydney", description: descriptionByLocation["North Sydney"], imgSrc: "/stratapage-cropped/opt/15-all-fire-services-welcome-north-sydney.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "rose-bay", title: "Rose Bay", description: descriptionByLocation["Rose Bay"], imgSrc: "/stratapage-cropped/opt/1welcome-to-fireman-family.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "randwick-building-2", title: "Randwick", description: descriptionByLocation.Randwick, imgSrc: "/stratapage-cropped/opt/randwick-building.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "chippendale-2", title: "Chippendale", description: descriptionByLocation.Chippendale, imgSrc: "/stratapage-cropped/opt/5-all-fire-services-welcome-chippendale.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "enmore-2", title: "Enmore", description: descriptionByLocation.Enmore, imgSrc: "/stratapage-cropped/opt/2-all-fire-services-welcome-enmore.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "greenacre-2", title: "Greenacre", description: descriptionByLocation.Greenacre, imgSrc: "/stratapage-cropped/opt/3-all-fire-services-welcome-greenacre.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  // ── Row 4 (7 cards) — revealed by "More Buildings" ─────────────────────
  { id: "haberfield-2", title: "Haberfield", description: descriptionByLocation.Haberfield, imgSrc: "/stratapage-cropped/opt/4-all-fire-services-welcome-haberfield.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "randwick-welcome-2", title: "Randwick", description: descriptionByLocation.Randwick, imgSrc: "/stratapage-cropped/opt/1-all-fire-services-welcome-randwick.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "rockdale-2", title: "Rockdale", description: descriptionByLocation.Rockdale, imgSrc: "/stratapage-cropped/opt/6-all-fire-services-welcome-rockdale.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "alexandria-2", title: "Alexandria", description: descriptionByLocation.Alexandria, imgSrc: "/stratapage-cropped/opt/12-all-fire-services-welcome-alexandria.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "bondi-2", title: "Bondi", description: descriptionByLocation.Bondi, imgSrc: "/stratapage-cropped/opt/11-all-fire-services-welcome-bondi.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "stanmore-2", title: "Stanmore", description: descriptionByLocation.Stanmore, imgSrc: "/stratapage-cropped/opt/10-all-fire-services-welcome-stanmore.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
  { id: "waterloo-2", title: "Waterloo", description: descriptionByLocation.Waterloo, imgSrc: "/stratapage-cropped/opt/7-all-fire-services-welcome-waterloo.webp", icon: <Building2 size={24} />, linkHref: "/our-clients" },
];

const visibleBuildings = strataBuildings.slice(0, ROW_SIZE * VISIBLE_ROWS);
const hiddenBuildings = strataBuildings.slice(ROW_SIZE * VISIBLE_ROWS);

const visibleRows: CardItem[][] = [];
for (let i = 0; i < visibleBuildings.length; i += ROW_SIZE) {
  visibleRows.push(visibleBuildings.slice(i, i + ROW_SIZE));
}
const hiddenRows: CardItem[][] = [];
for (let i = 0; i < hiddenBuildings.length; i += ROW_SIZE) {
  hiddenRows.push(hiddenBuildings.slice(i, i + ROW_SIZE));
}

const gradientStyle = {
  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const properties = [
  { title: "Strata & Residential Buildings", description: "Ongoing inspection, testing and maintenance for common property and essential fire-safety systems." },
  { title: "Commercial Properties", description: "Reliable fire protection and compliance support for offices, workplaces and commercial buildings." },
  { title: "Retail & Mixed-Use Developments", description: "Fire-safety servicing for properties with multiple tenants, public areas and shared systems." },
  { title: "Industrial & Warehouse Facilities", description: "Inspection and maintenance of essential systems across operational and industrial environments." },
  { title: "Managed Properties", description: "Practical support for property and facilities managers responsible for multiple buildings and sites." },
  { title: "Building & Development Sites", description: "Fire-safety services and documentation supporting new, existing and upgraded properties." },
];

export default function Page() {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <main className="main-wrapper">
      <main className="scroll-wrapper">
        <style dangerouslySetInnerHTML={{
          __html: `
          .strata-hero-inner {
            padding-top: 8rem;
            padding-bottom: 10rem;
          }
          /* Desktop-only: small breathing-room margin between the navbar and the
             hero H1. */
          @media (min-width: 992px) {
            .strata-hero-inner {
              padding-top: 1.5rem !important;
            }
            .padding-section-large.is-about {
              padding-top: 1.5rem !important;
              padding-bottom: 7rem !important;
            }
          }
          /* Global override: shrink the outer <header>'s inline padding-top:12rem
             so the hero copy sits high on every viewport. */
          .section_about-hero {
            margin-top: -7rem !important;
            padding-top: 7rem !important;
          }
          .strata-dark-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
            background: linear-gradient(to bottom,
              rgba(10,10,10,0.88) 0%,
              rgba(20,5,5,0.82) 30%,
              rgba(30,5,5,0.72) 50%,
              rgba(40,8,8,0.45) 68%,
              rgba(50,8,8,0.18) 80%,
              rgba(255,255,255,0) 92%
            );
          }
          .strata-fade-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 32%;
            background: linear-gradient(to bottom,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.05) 12%,
              rgba(255,255,255,0.12) 24%,
              rgba(255,255,255,0.22) 36%,
              rgba(255,255,255,0.36) 48%,
              rgba(255,255,255,0.54) 60%,
              rgba(255,255,255,0.72) 72%,
              rgba(255,255,255,0.86) 84%,
              rgba(255,255,255,0.96) 94%,
              #ffffff 100%
            );
            z-index: 2;
          }
          @media (max-width: 991px) {
            .section_about-hero {
              margin-top: -5rem !important;
              padding-top: 5rem !important;
            }
            .strata-hero-inner {
              padding-top: 1.5rem !important;
              padding-bottom: 2rem !important;
            }
            .strata-fade-overlay {
              height: 100px !important;
            }
          }
          @media (max-width: 767px) {
            .section_about-hero {
              margin-top: -4.5rem !important;
              padding-top: 4.5rem !important;
            }
            .strata-hero-inner {
              padding-top: 1rem !important;
              padding-bottom: 1.5rem !important;
            }
            .strata-dark-overlay {
              background: linear-gradient(to bottom,
                rgba(10,10,10,0.88) 0%,
                rgba(20,5,5,0.82) 50%,
                rgba(30,5,5,0.72) 75%,
                rgba(40,8,8,0.55) 90%,
                rgba(50,8,8,0.25) 96%,
                rgba(255,255,255,0) 100%
              ) !important;
            }
            .strata-fade-overlay {
              height: 70px !important;
            }
          }

          /* On mobile + tablet (max-width: 991px), for the HOW WE HELP section,
             force text on top and image below, and ensure image has visible height.
             Desktop keeps the original 2-column image-first layout. */
          @media (max-width: 991px) {
            .strata-how-we-help {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
              padding: 0 1.25rem !important;
            }
            .strata-how-we-help > div {
              min-height: 18rem !important;
              height: auto !important;
              /* Cap the single-column image so it doesn't blow up taller than
                 its portrait aspect ratio. */
              max-width: 32rem !important;
              margin: 0 auto !important;
            }
          }
          @media (max-width: 767px) {
            .strata-how-we-help > div {
              min-height: 22rem !important;
            }
          }

          /* On mobile + tablet (max-width: 991px), reduce the large gaps
             between the strata sections so the page flows more compactly. */
          @media (max-width: 991px) {
            .section_coverage .padding-section-large,
            .section_how_we_help .padding-section-large,
            .section_properties .padding-section-large,
            .section_why .padding-section-large {
              padding-top: 1rem !important;
              padding-bottom: 2rem !important;
            }
          }
          @media (max-width: 767px) {
            .section_coverage .padding-section-large,
            .section_how_we_help .padding-section-large,
            .section_properties .padding-section-large,
            .section_why .padding-section-large {
              padding-top: 0.5rem !important;
              padding-bottom: 1.5rem !important;
            }
          }

          /* Desktop: tighten the large bottom paddings on the Strata
             coverage / how-we-help / properties / why sections so they
             align with the Home page rhythm. */
          @media (min-width: 992px) {
            .section_coverage .padding-section-large,
            .section_how_we_help .padding-section-large,
            .section_properties .padding-section-large,
            .section_why .padding-section-large {
              padding-bottom: 4.5rem !important;
              padding-top: 1rem !important;
            }
            .section_our_work .padding-section-large {
              padding-bottom: 1.5rem !important;
            }

            /* Pin the scroll-down cue closer to the bottom of the Strata
               hero so it sits well below the body copy and just above the
               white-fade, instead of landing near the middle of the
               viewport. */
            .section_about-hero .cueWrap {
              bottom: 6% !important;
            }
          }

          /* Make the Properties We Service card grid sit inside the same
             horizontal margin as every other section on the page on mobile.
             The grid uses mx-auto + max-w-6xl which leaves the cards flush
             against the column edge on small screens unless we reserve
             inline padding here. */
          @media (max-width: 767px) {
            .section_properties .padding-section-large {
              padding-inline: clamp(1rem, 5vw, 1.5rem) !important;
            }
          }
        `}} />

        {/* HERO */}
        <header
          className="section_about-hero is-dark"
          style={{
            position: 'relative',
            marginTop: '-5rem',
            paddingTop: '5rem',
            marginBottom: '-2px',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/stratapage-cropped/opt/1welcome-to-fireman-family.webp"
              alt="Strata Fire Safety Hero"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              fetchPriority="high"
              quality={65}
              sizes="100vw"
            />
          </div>
          <div className="strata-dark-overlay"></div>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(30,5,5,0.35) 40%, rgba(70,10,10,0.15) 70%, transparent 100%)', mixBlendMode: 'multiply' }}></div>
          <div className="strata-fade-overlay"></div>

          <div className="padding-global" style={{ position: 'relative', zIndex: 3, marginTop: '-2px' }}>
            <div className="container-large">
              <div className="padding-section-large is-about strata-hero-inner">
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper flex flex-col md:flex-row text-center md:text-left">
                    <div className="hero_content-left flex flex-col items-center md:items-start w-full md:w-auto">
                      <div className="header-eyebrow-text hide-desktop mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        Who We Serve
                      </div>
                      <h1
                        className="mx-auto md:mx-0 text-center md:text-left w-full"
                        style={{
                          fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                          color: '#ffffff',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          lineHeight: 1.1,
                          margin: 0
                        }}
                      >
                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>STRATA</span>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '0px', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          &amp; RESIDENTIAL
                        </span>
                      </h1>
                    </div>
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[1rem] md:pb-0">
                      <div className="header-eyebrow-text hide-tablet mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        Strata &amp; Residential Buildings
                      </div>
                      <p className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Practical fire protection for strata and residential buildings across Greater Sydney. Inspections, testing, maintenance and compliance support for owners corporations and strata managers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* WHERE WE WORK — 28 buildings as four stacked ExpandingCards rows.
            The first two rows (14 cards) are visible by default; the second
            two rows (14 cards) are revealed when the user clicks
            "More Buildings". Matches the home page StrataSection layout. */}
        <section
          data-animate-to="light"
          data-theme="light"
          className="section_our_work"
          style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
                <header
                  className={styles.legacyHeader}
                  style={{ marginTop: 0, marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  <p className={styles.kicker}>Where we work</p>
                  <h2 id="our-work-title" style={{ color: '#111111', maxWidth: 'none' }}>
                    Strata and <span style={{ color: '#ff2a00', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Buildings</span><br />
                    <span style={{ ...gradientStyle, fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>we service</span>
                  </h2>
                  <p>
                    Trusted fire protection for strata communities, commercial buildings, and managed properties across Greater Sydney.
                  </p>
                </header>
              </div>
            </div>
          </div>

          {/* Visible ExpandingCards rows — first 2 rows of 7 cards. */}
          <div className="padding-global">
            <div className="container-large" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {visibleRows.map((row, rowIndex) => (
                <ExpandingCards
                  key={`visible-row-${rowIndex}`}
                  items={row}
                  defaultActiveIndex={
                    // Row 1 (first visible row) — first image on the left.
                    // Row 2 (second visible row) — last image on the right.
                    rowIndex === 0 ? 0 : row.length - 1
                  }
                />
              ))}

              {/* Hidden ExpandingCards rows — revealed by "More Buildings". */}
              {showMore && (
                <div
                  id="strata-gallery-extra"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  {hiddenRows.map((row, rowIndex) => (
                    <ExpandingCards
                      key={`hidden-row-${rowIndex}`}
                      items={row}
                      defaultActiveIndex={
                        // Row 3 (first hidden row) — first image on the left.
                        // Row 4 (second hidden row) — last image on the right.
                        rowIndex === 0 ? 0 : row.length - 1
                      }
                    />
                  ))}
                </div>
              )}

              {/* More / Show less toggle — mirrors the home page's footer CTA pattern. */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                  paddingBottom: 'clamp(2rem, 4vw, 3rem)',
                }}
              >
                {!showMore ? (
                  <button
                    type="button"
                    className="button-content"
                    onClick={() => setShowMore(true)}
                    aria-expanded="false"
                    aria-controls="strata-gallery-extra"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.95rem 2rem',
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    More Buildings
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button-content"
                    onClick={() => setShowMore(false)}
                    aria-expanded="true"
                    aria-controls="strata-gallery-extra"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.95rem 2rem',
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Show Less
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 9l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* THE COVERAGE — Intro section */}
        <section
          data-animate-to="light"
          data-theme="light"
          className="section_coverage"
          style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '0', paddingBottom: '4rem' }}>
                <div className={`${styles.newStoryGrid}`} style={{ alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>The Coverage</p>
                      <h2 className="mx-0 text-left" style={{ maxWidth: '24ch', color: '#111111' }}>
                        <span style={{ fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Fire Protection Across</span><br />
                        <span style={{ ...gradientStyle, fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Greater Sydney</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem' }}>
                      Every building has different fire-safety responsibilities. From residential complexes and commercial properties to managed facilities and mixed-use developments, each site requires the right combination of inspection, testing, maintenance and compliance support.
                    </p>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem' }}>
                      All Fire Services works across Greater Sydney to help keep buildings <strong>protected, maintained and ready when it matters.</strong>
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden' }}>
                    <Image src="/stratapage-cropped/opt/9-all-fire-services-welcome-marrickville.webp" alt="Fire protection across Greater Sydney" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 42vw" quality={60} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE HELP */}
        <section data-theme="light" className="section_how_we_help" style={{ background: '#ffffff' }}>
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingBottom: '4rem' }}>
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst} strata-how-we-help`} style={{ alignItems: 'stretch' }}>
                  {/* The compilation image is portrait (412×1024). The old
                      landscape container + `object-fit: cover` cropped the
                      top and bottom buildings off. We now (a) use a portrait
                      aspect ratio, (b) use `object-fit: contain` so the full
                      image is always visible, and (c) bias `object-position`
                      upward so the top of the compilation is the canonical
                      view on every viewport. */}
                  <div className="order-2 lg:order-1" style={{ position: 'relative', width: '100%', minHeight: '300px', aspectRatio: '0.62 / 1', maxHeight: '44rem', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto', background: '#f4f4f4' }}>
                    <Image src="/buildingcompilation.jpg" alt="All Fire Services supporting buildings across Greater Sydney" fill style={{ objectFit: 'cover', objectPosition: 'center 18%' }} sizes="(max-width: 1024px) 100vw, 42vw" quality={60} loading="lazy" />
                  </div>
                  <div className={`${styles.newStoryContent} order-1 lg:order-2`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>How We Help</p>
                      <h2 className="mx-0 text-left" style={{ color: '#111111' }}>
                        <span style={{ fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Supporting <span style={{ color: '#ff0000' }}>Buildings</span></span><br />
                        <span style={{ ...gradientStyle, fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>of Every Type</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      All Fire Services works with property managers, building owners, facilities teams and businesses across Greater Sydney.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      We coordinate inspections, testing, maintenance, documentation and certification across essential fire-safety systems, helping clients manage their responsibilities without unnecessary complexity.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      From routine maintenance to ongoing compliance requirements, our team provides <strong>practical support and clear communication</strong> throughout the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTIES WE SERVICE */}
        <section data-theme="light" className="section_properties" style={{ background: '#ffffff' }}>
          <div className="padding-global">
            <div className="container-large">
              <div
                className="padding-section-large"
                style={{ paddingBottom: '4rem', paddingInline: 'clamp(1rem, 5vw, 1.5rem)' }}
              >
                <header
                  className={`${styles.legacyHeader} ${styles.legacyHeaderStrata}`}
                  style={{ marginTop: 0, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
                >
                  <p className={styles.kicker}>Properties We Service</p>
                  <h2 id="properties-title" style={{ ...gradientStyle, maxWidth: 'none' }}>
                    <span style={{ fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Fire Protection</span><br />
                    <span style={{ fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>for Every Property</span>
                  </h2>
                  <p>
                    Our experience covers a wide range of buildings and property environments across Greater Sydney.
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
                  {properties.map((property) => {
                    const titleWords = property.title.trim().split(/\s+/);
                    const lastWord = titleWords.pop() ?? '';
                    const leadingTitle = titleWords.join(' ');
                    return (
                      <div
                        key={property.title}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}
                      >
                        <h3 style={{
                          margin: 0,
                          fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                          fontWeight: 800,
                          color: '#111111',
                          letterSpacing: '-0.025em',
                          lineHeight: 1.18,
                        }}>
                          {leadingTitle && <>{leadingTitle} </>}<span style={gradientStyle}>{lastWord}</span>
                        </h3>
                        <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                          {property.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY ALL FIRE SERVICES */}
        <section data-theme="light" className="section_why" style={{ background: '#ffffff' }}>
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingBottom: '4rem' }}>
                <div className={`${styles.newStoryGrid}`} style={{ alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>Why All Fire Services</p>
                      <h2 className="mx-0 text-left" style={{ color: '#111111' }}>
                        <span style={{ fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Practical Experience.</span><br />
                        <span style={{ ...gradientStyle, fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Professional Service.</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Our team includes <strong>serving and retired professional firefighters</strong> alongside experienced fire-safety professionals who understand compliance, Australian Standards and the practical requirements of different buildings.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      We focus on providing reliable service, straightforward advice and fire protection that suits the property rather than taking a one-size-fits-all approach.
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden' }}>
                    <Image src="/stratapage-cropped/opt/11-all-fire-services-welcome-bondi.webp" alt="All Fire Services team on site" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 42vw" quality={60} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
    </main>
  );
}

