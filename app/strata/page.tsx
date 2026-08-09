"use client";
import ContactCTA from "@/components/ContactCTA";
import HeroScrollCue from "@/components/HeroScrollCue";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "@/components/HomeStoryLegacy.module.css";
import galleryStyles from "./StrataGallery.module.css";

// All cropped building images with accurate location names.
// /stratapage-cropped/* files exclude the ALLFIRE Welcome sign AND CALL PETER footer.
// /stratapage-cropped/banner-* files keep the ALLFIRE Welcome banner (CALL PETER footer cropped off).
// Initial view shows 16; clicking "More" reveals 12 additional images below (28 total).
const strataImages = [
  // ── Initial 16 (4 rows × 4 columns) ──────────────────────────────────────
  // Source files are pre-optimised to webp and resized to max 720 px in
  // public/stratapage-cropped/opt/. Sourcing them from there keeps each
  // gallery card well under 100 KB instead of the 60–150 KB originals.
  { src: "/stratapage-cropped/opt/randwick-building.webp", name: "Randwick" },
  { src: "/stratapage-cropped/opt/1-all-fire-services-welcome-randwick.webp", name: "Randwick" },
  { src: "/stratapage-cropped/opt/2-all-fire-services-welcome-enmore.webp", name: "Enmore" },
  { src: "/stratapage-cropped/opt/3-all-fire-services-welcome-greenacre.webp", name: "Greenacre" },
  { src: "/stratapage-cropped/opt/4-all-fire-services-welcome-haberfield.webp", name: "Haberfield" },
  { src: "/stratapage-cropped/opt/5-all-fire-services-welcome-chippendale.webp", name: "Chippendale" },
  { src: "/stratapage-cropped/opt/6-all-fire-services-welcome-rockdale.webp", name: "Rockdale" },
  { src: "/stratapage-cropped/opt/7-all-fire-services-welcome-waterloo.webp", name: "Waterloo" },
  { src: "/stratapage-cropped/opt/8-all-fire-services-welcome-marrickville.webp", name: "Marrickville" },
  { src: "/stratapage-cropped/opt/9-all-fire-services-welcome-marrickville.webp", name: "Marrickville" },
  { src: "/stratapage-cropped/opt/10-all-fire-services-welcome-stanmore.webp", name: "Stanmore" },
  { src: "/stratapage-cropped/opt/11-all-fire-services-welcome-bondi.webp", name: "Bondi" },
  { src: "/stratapage-cropped/opt/12-all-fire-services-welcome-alexandria.webp", name: "Alexandria" },
  { src: "/stratapage-cropped/opt/13-all-fire-services-welcome-glebe.webp", name: "Glebe" },
  { src: "/stratapage-cropped/opt/14-all-fire-services-welcome-marrickville.webp", name: "Marrickville" },
  { src: "/stratapage-cropped/opt/15-all-fire-services-welcome-north-sydney.webp", name: "North Sydney" },
  // ── Hidden 12 (3 rows × 4 columns — revealed by "More" button) ───────────
  { src: "/stratapage-cropped/opt/1welcome-to-fireman-family.webp", name: "Rose Bay" },
  { src: "/stratapage-cropped/opt/2welcome-to-fireman-family.webp", name: "Mosman" },
  { src: "/stratapage-cropped/opt/banner-chippendale.webp", name: "Chippendale" },
  { src: "/stratapage-cropped/opt/banner-enmore.webp", name: "Enmore" },
  { src: "/stratapage-cropped/opt/banner-greenacre.webp", name: "Greenacre" },
  { src: "/stratapage-cropped/opt/banner-haberfield.webp", name: "Haberfield" },
  { src: "/stratapage-cropped/opt/banner-randwick.webp", name: "Randwick" },
  { src: "/stratapage-cropped/opt/banner-rockdale.webp", name: "Rockdale" },
  { src: "/stratapage-cropped/opt/banner-alexandria.webp", name: "Alexandria" },
  { src: "/stratapage-cropped/opt/banner-bondi.webp", name: "Bondi" },
  { src: "/stratapage-cropped/opt/banner-stanmore.webp", name: "Stanmore" },
  { src: "/stratapage-cropped/opt/banner-waterloo.webp", name: "Waterloo" },
];

const INITIAL_VISIBLE_COUNT = 16;

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
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const openLightbox = (index: number) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);
  const showNext = () => setActiveImageIndex((i) => (i === null ? null : (i + 1) % strataImages.length));
  const showPrev = () => setActiveImageIndex((i) => (i === null ? null : (i - 1 + strataImages.length) % strataImages.length));

  return (
    <main className="main-wrapper">
      <main className="scroll-wrapper">
        <style dangerouslySetInnerHTML={{
          __html: `
          .strata-hero-inner {
            padding-top: 8rem;
            padding-bottom: 20rem;
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
            height: 55%;
            background: linear-gradient(to bottom,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.01) 8%,
              rgba(255,255,255,0.03) 16%,
              rgba(255,255,255,0.07) 24%,
              rgba(255,255,255,0.13) 32%,
              rgba(255,255,255,0.22) 40%,
              rgba(255,255,255,0.34) 49%,
              rgba(255,255,255,0.49) 57%,
              rgba(255,255,255,0.64) 65%,
              rgba(255,255,255,0.78) 73%,
              rgba(255,255,255,0.89) 81%,
              rgba(255,255,255,0.96) 89%,
              #ffffff 95%,
              #ffffff 100%
            );
            z-index: 2;
          }
          @media (max-width: 991px) {
            .strata-hero-inner {
              padding-top: 7rem !important;
              padding-bottom: 14rem !important;
            }
            .strata-fade-overlay {
              height: 260px !important;
            }
          }
          @media (max-width: 767px) {
            .strata-hero-inner {
              padding-top: 6rem !important;
              padding-bottom: 12rem !important;
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
              height: 230px !important;
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
        `}} />

        {/* HERO */}
        <header
          className="section_about-hero is-dark"
          style={{
            position: 'relative',
            marginTop: '-12rem',
            paddingTop: '12rem',
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
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[8rem] md:pb-0">
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
          <HeroScrollCue />
        </header>

        {/* OUR WORK — Gallery (moved to the top, right after the hero) */}
        <section
          data-animate-to="light"
          data-theme="light"
          className="section_our_work"
          style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
                <header
                  className={styles.legacyHeader}
                  style={{ marginTop: 0, marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  <p className={styles.kicker}>Our Work</p>
                  <h2 id="our-work-title" style={{ color: '#111111', maxWidth: 'none' }}>
                    <span style={{ fontSize: 'clamp(1.8rem, 3.6vw, 3.8rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 1.05 }}>Buildings We Protect</span><br />
                    <span style={{ color: '#ff2a00', fontSize: 'clamp(2.4rem, 5vw, 5.2rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>Across</span> <span style={{ ...gradientStyle, fontSize: 'clamp(2.4rem, 5vw, 5.2rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>Greater Sydney</span>
                  </h2>
                  <p>
                    A snapshot of the properties and locations supported by All Fire Services across the Sydney metropolitan area.
                  </p>
                </header>
              </div>
            </div>
          </div>

          {/* Grid gallery */}
          <div className="padding-global">
            <div className="container-large">
              <div style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <div className="strata-grid">
                  {strataImages.slice(0, INITIAL_VISIBLE_COUNT).map((image, index) => (
                    <div
                      key={`${image.src}-${index}`}
                      className={galleryStyles.galleryCard}
                      role="button"
                      tabIndex={0}
                      aria-label={`Enlarge ${image.name} photo`}
                      onClick={() => openLightbox(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(index);
                        }
                      }}
                    >
                      <div className={galleryStyles.galleryImageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.src}
                          alt={`All Fire Services at ${image.name}`}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className={galleryStyles.galleryImage}
                        />
                      </div>
                      <p className={galleryStyles.galleryCaption}>{image.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hidden batch — 12 extra images (3 rows × 4 columns) — rendered above the button */}
          {showMore && (
            <div id="strata-gallery-extra" className="padding-global">
              <div className="container-large">
                <div style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                  <div className="strata-grid">
                    {strataImages.slice(INITIAL_VISIBLE_COUNT).map((image, index) => {
                      const realIndex = INITIAL_VISIBLE_COUNT + index;
                      return (
                        <div
                          key={`${image.src}-${realIndex}`}
                          className={galleryStyles.galleryCard}
                          role="button"
                          tabIndex={0}
                          aria-label={`Enlarge ${image.name} photo`}
                          onClick={() => openLightbox(realIndex)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openLightbox(realIndex);
                            }
                          }}
                        >
                          <div className={galleryStyles.galleryImageWrap}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image.src}
                              alt={`All Fire Services at ${image.name}`}
                              loading="lazy"
                              decoding="async"
                              fetchPriority="low"
                              className={galleryStyles.galleryImage}
                            />
                          </div>
                          <p className={galleryStyles.galleryCaption}>{image.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* More button — sits at the bottom of the gallery, below all images */}
          <div className="padding-global">
            <div className="container-large">
              <div
                className={galleryStyles.loadMoreWrap}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingBottom: 'clamp(3rem, 6vw, 5rem)',
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
              <div className="padding-section-large" style={{ paddingTop: '0', paddingBottom: '8rem' }}>
                <div className={`${styles.newStoryGrid}`} style={{ alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>The Coverage</p>
                      <h2 className="mx-0 text-left" style={{ maxWidth: '24ch', color: '#111111' }}>
                        <span style={{ fontSize: 'clamp(2rem, 4vw, 4.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1.05 }}>Fire Protection Across</span><br />
                        <span style={{ ...gradientStyle, fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94 }}>Greater Sydney</span>
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
              <div className="padding-section-large" style={{ paddingBottom: '8rem' }}>
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst} strata-how-we-help`} style={{ alignItems: 'stretch' }}>
                  <div className="order-2 lg:order-1" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/buildingcompilation.jpg" alt="All Fire Services supporting buildings across Greater Sydney" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 42vw" quality={60} loading="lazy" />
                  </div>
                  <div className={`${styles.newStoryContent} order-1 lg:order-2`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>How We Help</p>
                      <h2 className="mx-0 text-left" style={{ color: '#111111' }}>
                        <span style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1.05 }}>Supporting <span style={{ color: '#ff0000' }}>Buildings</span></span><br />
                        <span style={{ ...gradientStyle, fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94 }}>of Every Type</span>
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
              <div className="padding-section-large" style={{ paddingBottom: '8rem' }}>
                <header
                  className={`${styles.legacyHeader} ${styles.legacyHeaderStrata}`}
                  style={{ marginTop: 0, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
                >
                  <p className={styles.kicker}>Properties We Service</p>
                  <h2 id="properties-title" style={{ color: '#111111', maxWidth: 'none' }}>
                    <span style={{ fontSize: 'clamp(2.8rem, 5.8vw, 6rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.95 }}>Fire Protection</span><br />
                    for <span style={{ color: '#ff2a00', fontSize: 'clamp(2.8rem, 5.8vw, 6rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>Every</span> <span style={{ ...gradientStyle, fontSize: 'clamp(2.8rem, 5.8vw, 6rem)', fontWeight: 780, letterSpacing: '-0.06em', lineHeight: 0.92 }}>Property</span>
                  </h2>
                  <p>
                    Our experience covers a wide range of buildings and property environments across Greater Sydney.
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
                  {properties.map((property) => (
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
                        {property.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                        {property.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY ALL FIRE SERVICES */}
        <section data-theme="light" className="section_why" style={{ background: '#ffffff' }}>
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingBottom: '8rem' }}>
                <div className={`${styles.newStoryGrid}`} style={{ alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>Why All Fire Services</p>
                      <h2 className="mx-0 text-left" style={{ color: '#111111' }}>
                        <span style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1.05 }}>Practical Experience.</span><br />
                        <span style={{ ...gradientStyle, fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94 }}>Professional Service.</span>
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

        {/* LIGHTBOX MODAL — rendered via portal to escape any transformed ancestor.
            The image container shrinks to the image's natural size so the dark
            backdrop only appears around the image, not whitespace. */}
        {mounted && activeImageIndex !== null && createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged photo: ${strataImages[activeImageIndex].name}`}
            onClick={closeLightbox}
            onKeyDown={(e) => { if (e.key === 'Escape') closeLightbox(); }}
            tabIndex={-1}
            style={{
              position: 'fixed',
              inset: 0,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 2147483647,
              backgroundColor: 'rgba(10, 10, 10, 0.92)',
              padding: 'clamp(1rem, 3vw, 2rem)',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              aria-label="Close photo"
              style={{
                position: 'absolute',
                top: 'clamp(0.75rem, 2vw, 1.5rem)',
                right: 'clamp(0.75rem, 2vw, 1.5rem)',
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.85)',
                borderRadius: '999px',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                left: 'clamp(0.5rem, 2vw, 1.5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                borderRadius: '999px',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                right: 'clamp(0.5rem, 2vw, 1.5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                borderRadius: '999px',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 4l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Image wrapper — absolutely positioned + width:auto so it
                shrinks to the image's natural size. No fixed width, no
                aspect-ratio forcing a 4:3 box. */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                width: 'auto',
                height: 'auto',
                maxWidth: 'calc(100vw - 2 * clamp(1rem, 3vw, 2rem) - 80px)',
                maxHeight: 'calc(100vh - 2 * clamp(1rem, 3vw, 2rem) - 80px)',
              }}
            >
              <div style={{
                position: 'relative',
                width: 'auto',
                height: 'auto',
                borderRadius: '1rem',
                overflow: 'hidden',
                backgroundColor: '#111111',
                boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.6)',
                lineHeight: 0,
                fontSize: 0,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={strataImages[activeImageIndex].src}
                  alt={`All Fire Services at ${strataImages[activeImageIndex].name}`}
                  style={{
                    display: 'block',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'calc(100vw - 2 * clamp(1rem, 3vw, 2rem) - 80px)',
                    maxHeight: 'calc(100vh - 2 * clamp(1rem, 3vw, 2rem) - 100px)',
                    objectFit: 'contain',
                    backgroundColor: '#111111',
                  }}
                />
              </div>
              <p style={{
                margin: 0,
                color: '#ffffff',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {strataImages[activeImageIndex].name}
                <span style={{ marginLeft: '0.75rem', opacity: 0.6, fontWeight: 500 }}>
                  {activeImageIndex + 1} / {strataImages.length}
                </span>
              </p>
            </div>
          </div>,
          document.body
        )}

        <ContactCTA />
      </main>
    </main>
  );
}
