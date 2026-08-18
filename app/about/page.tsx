"use client";
import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/HomeStoryLegacy.module.css";
import HomeStoryLegacy from "@/components/HomeStoryLegacy";
import { CompactTimeline } from "@/components/FounderLegacy";
import { LightboxImage } from "@/components/ui/LightboxImage";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";

const gradientStyle = {
  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const companyGalleryImages = [
  { id: 1, src: "/History/about (1).jpg", name: "Waterloo", desc: "Residential fire safety servicing in Waterloo." },
  { id: 2, src: "/History/about (4).jpg", name: "Randwick", desc: "Common-property grounds maintenance, Randwick." },
  { id: 3, src: "/History/about (6).jpg", name: "Marrickville", desc: "Strata and commercial fire safety in Marrickville." },
  { id: 4, src: "/History/about (7).jpg", name: "Our Team", desc: "All Fire Services technicians on site." },
  { id: 5, src: "/History/about (8).jpg", name: "Heritage Fleet", desc: "Vintage fire service vehicle preserved by the family." },
  { id: 6, src: "/History/about (9).jpg", name: "Heritage Fleet", desc: "Classic fire engines from the family history." },
  { id: 7, src: "/History/about (10).jpg", name: "Generations of Firefighters", desc: "The Tricklebank family firefighting lineage." },
];
// Team member data now lives with the Our Team section in
// components/OurTeam.tsx (rendered at /our-team) so Our Story can stay focused
// on history and heritage.

export default function Page() {
  return (
    <main className="main-wrapper">
      <main className="scroll-wrapper">
        <style dangerouslySetInnerHTML={{
          __html: `
          .about-hero-inner {
            padding-top: 8rem;
            padding-bottom: 20rem;
          }
          /* Desktop-only: small breathing-room margin between the navbar and the
             hero H1 (was 0, now 1.5rem). The outer <header>'s margin/padding
             buffer still overlaps the navbar so the hero container size
             is preserved. */
          @media (min-width: 992px) {
            .about-hero-inner {
              padding-top: 4rem !important;
            }
            .padding-section-large.is-about {
              padding-top: 4rem !important;
              padding-bottom: 2rem !important;
            }
          }
          /* Global override: the outer <header> carries inline padding-top:12rem
             and margin-top:-12rem to overlap the desktop navbar. That makes the
             hero text sit way below the navbar. Override these so the text
             appears much higher on every viewport. */
          .section_about-hero {
            margin-top: -7rem !important;
            padding-top: 7rem !important;
          }
          .about-dark-overlay {
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
          .about-fade-overlay {
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
            /* The outer <header> has inline padding-top:12rem + margin-top:-12rem
               so it sits flush under the fixed navbar on desktop. On smaller
               screens the navbar is shorter, so we collapse that buffer so
               the visible copy actually starts near the top of the page. */
            .section_about-hero {
              margin-top: -5rem !important;
              padding-top: 5rem !important;
            }
            .about-hero-inner {
              padding-top: 4rem !important;
              padding-bottom: 6rem !important;
            }
            .about-fade-overlay {
              height: 100px !important;
            }

            /* Tighten the OUR STORY block padding on tablet — beat the
               .padding-section-large.is-about rule from responsive.css by
               using higher specificity. */
            .padding-section-large.is-about.about-our-story-wrap,
            .about-our-story-wrap {
              padding-top: 0 !important;
              padding-bottom: 1.25rem !important;
            }

            /* Pull the family-history block up closer to the OUR STORY image */
            #family-history {
              padding-top: 0.5rem !important;
              padding-bottom: 1rem !important;
            }
          }

          /* About page only: nudge the scroll-down cue slightly lower than
             the shared 12% so it sits clear of the body copy on this hero. */
          .about-hero-header .cueWrap {
            bottom: 16% !important;
          }

          @media (max-width: 767px) {
            .section_about-hero {
              margin-top: -4.5rem !important;
              padding-top: 4.5rem !important;
            }
            .about-hero-inner {
              padding-top: 1rem !important;
              padding-bottom: 0.5rem !important;
            }

            /* Tighten the OUR STORY block padding on mobile — beat the
               .padding-section-large.is-about rule from responsive.css by
               using higher specificity. */
            .padding-section-large.is-about.about-our-story-wrap,
            .about-our-story-wrap {
              padding-top: 0 !important;
              padding-bottom: 1rem !important;
            }

            /* Pull the family-history block up closer to the OUR STORY image */
            #family-history {
              padding-top: 0.5rem !important;
              padding-bottom: 0.75rem !important;
            }
            .about-dark-overlay {
              background: linear-gradient(to bottom,
                rgba(10,10,10,0.88) 0%,
                rgba(20,5,5,0.82) 50%,
                rgba(30,5,5,0.72) 75%,
                rgba(40,8,8,0.55) 90%,
                rgba(50,8,8,0.25) 96%,
                rgba(255,255,255,0) 100%
              ) !important;
            }
            .about-fade-overlay {
              height: 40px !important;
            }
          }

          /* Make the bento "Legacy" section grid sit inside the same
             horizontal margin as every other section on the page on mobile.
             The 6-card grid uses mx-auto + max-w-6xl which leaves cards
             flush against the column edge on small screens unless we
             reserve inline padding here. */
          @media (max-width: 767px) {
            .about-bento-section > div > div.padding-section-large {
              padding-inline: clamp(1rem, 5vw, 1.5rem) !important;
            }
          }

          /* On mobile + tablet (max-width: 991px), for the three Block 2/3/4
             sections (MEET PETER, EXPERIENCE, STANDARDS), force the image to
             render BELOW the text and ensure it has a visible height.
             Desktop keeps the original 2-column side-by-side layout. */
          @media (max-width: 991px) {
            .about-meet-peter-section,
            .about-experience-section,
            .about-standards-section,
            .about-our-story-section {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
              padding: 0 1.25rem !important;
            }
            .about-meet-peter-section > div,
            .about-experience-section > div,
            .about-standards-section > div,
            .about-our-story-section > div {
              min-height: 18rem !important;
              height: auto !important;
            }
          }
          @media (max-width: 767px) {
            .about-meet-peter-section > div,
            .about-experience-section > div,
            .about-standards-section > div,
            .about-our-story-section > div {
              min-height: 22rem !important;
            }
          }

          /* On mobile + tablet (max-width: 991px), reduce the large gaps
             between sections so the page flows more compactly. */
          @media (max-width: 991px) {
            .about-meet-peter-section,
            .about-experience-section,
            .about-standards-section {
              margin-bottom: 3rem !important;
            }
            .about-meet-peter-section > div,
            .about-experience-section > div,
            .about-standards-section > div {
              justify-content: flex-start !important;
            }

            /* Reduce gap between Mission section and HomeStoryLegacy (family-history) section */
            #family-history {
              padding-top: 1.5rem !important;
            }

            /* Visible gap between the bento gallery (Tricklebank Family)
               and the MEET PETER TRICKLEBANK section on tablet. The bento's
               own bottom padding is killed on mobile/tablet, so this is
               the only source of breathing room between the two blocks. */
            .about-meet-peter-wrap {
              padding-top: 8rem !important;
              margin-top: 2rem !important;
            }
          }
          @media (max-width: 767px) {
            .about-meet-peter-section,
            .about-experience-section,
            .about-standards-section {
              margin-bottom: 2rem !important;
            }
            .about-meet-peter-section > div,
            .about-experience-section > div,
            .about-standards-section > div {
              min-height: 14rem !important;
            }

            /* Reduce gap between Legacy/Company column and Bento section */
            .about-legacy-company-section {
              padding-top: 2rem !important;
              padding-bottom: 2rem !important;
            }
            .about-bento-section {
              padding-top: 1rem !important;
              padding-bottom: 0 !important;
            }
            /* The .padding-section-large inside .about-bento-section still has
               7rem bottom padding from allfireservices.css — kill it. */
            .about-bento-section > div > div.padding-section-large {
              padding-bottom: 0 !important;
            }
            /* Kill the bento gallery component's internal vertical padding
               (py-16 sm:py-20 md:py-24) so the gallery sits flush above
               the MEET PETER block. */
            .about-bento-section section[class*="py-"] {
              padding-top: 0.5rem !important;
              padding-bottom: 0 !important;
            }
            /* Belt-and-braces: also collapse the wrapping <div> around the
               gallery and the .padding-section-large above MEET PETER. */
            .about-bento-section [class*="py-16"],
            .about-bento-section [class*="sm:py-20"],
            .about-bento-section [class*="md:py-24"],
            .about-bento-section [class~="py-16"],
            .about-bento-section [class~="sm:py-20"],
            .about-bento-section [class~="md:py-24"] {
              padding-top: 0.5rem !important;
              padding-bottom: 0 !important;
            }
            /* Reduce gap between Legacy and Company blocks */
            .about-legacy-company-text {
              gap: 1.5rem !important;
              padding-bottom: 1rem !important;
            }

            /* Reduce gap above OUR MISSION block */
            .about-mission-section {
              margin-top: 2rem !important;
            }

            /* Reduce gap between Mission section and HomeStoryLegacy (family-history) section */
            #family-history {
              padding-top: 0.5rem !important;
            }

            /* Reduce the bottom padding of the Meet Peter/Experience/Standards/Mission container */
            .about-meet-peter-section,
            .about-experience-section,
            .about-standards-section,
            .about-mission-section {
              padding-bottom: 1.5rem !important;
            }

            /* Strong, unambiguous gap between the bento gallery carousel
               and the MEET PETER TRICKLEBANK block on mobile. Padding + a
               tiny margin-top belt-and-braces so it survives any inline
               override. */
            .about-meet-peter-wrap {
              padding-top: 8rem !important;
              margin-top: 2rem !important;
            }
          }

          /* Desktop only: tighten the large gaps between story sections */
          @media (min-width: 992px) {
            .about-meet-peter-section,
            .about-experience-section,
            .about-standards-section {
              margin-bottom: 6rem !important;
            }
            .about-mission-section {
              margin-top: 4rem !important;
            }
          }
        `}} />
        <header
          className="section_about-hero is-dark about-hero-header"
          style={{
            position: 'relative',
            marginTop: '-5rem',
            paddingTop: '5rem',
            marginBottom: '-2px',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/History/about (8).jpg"
              alt="About All Fire Services Hero"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              fetchPriority="high"
              quality={60}
              sizes="100vw"
            />
          </div>
          {/* Dark tint overlay – breakpoint-aware via .about-dark-overlay */}
          <div className="about-dark-overlay"></div>
          {/* Right-side colour tint (horizontal) – kept separate so it doesn't interfere with vertical fade */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(30,5,5,0.35) 40%, rgba(70,10,10,0.15) 70%, transparent 100%)', mixBlendMode: 'multiply' }}></div>
          {/* Seamless fade to white – height controlled per breakpoint via .about-fade-overlay */}
          <div className="about-fade-overlay"></div>

          <div className="padding-global" style={{ position: 'relative', zIndex: 3, marginTop: '-2px' }}>
            <div className="container-large">
              <div className="padding-section-large is-about about-hero-inner">
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper flex flex-col md:flex-row text-center md:text-left">
                    <div className="hero_content-left flex flex-col items-center md:items-start w-full md:w-auto">
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
                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>ABOUT ALLFIRE</span>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '0px', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          SERVICES SYDNEY
                        </span>
                      </h1>
                    </div>
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[1rem] md:pb-0">
                      <div className="header-eyebrow-text mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        About All Fire Services
                      </div>
                      <p className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        A family firefighting legacy dating back to 1911, and an Australian-owned fire protection company established in 2009.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          data-animate-to="light"
          data-theme="light"
          className="section_story"
          style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large about-our-story-wrap" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>

                {/* Block 1 — OUR STORY */}
                <div className={`${styles.newStoryGrid} about-our-story-section`} style={{ marginTop: '0', marginBottom: '0', alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>OUR STORY</p>
                      <h2 className="mx-0 text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)]" style={{ maxWidth: '24ch', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                        &ldquo;Fire Protection<br /><span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Runs in Our Blood&rdquo;</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>
                      Fire safety is more than compliance. It is a responsibility we take seriously.
                    </p>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem' }}>
                      Since 2009, All Fire Services has delivered <strong>reliable fire protection across Greater Sydney</strong>, backed by <strong>technical expertise</strong> and <strong>generations of firefighting heritage.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem' }}>
                      From <strong>fire protection testing and maintenance to certification and compliance</strong>, we focus on what matters most, <strong>protecting people, property, and businesses.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem' }}>
                      Our goal is simple: <strong>keep every property safe, compliant, and ready when it matters most.</strong>
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '1.5rem', overflow: 'hidden' }}>
                    <Image src="/History/1 (1).jpg" alt="Fire Protection Runs in Our Blood" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 42vw" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section — same as hero page */}
          <HomeStoryLegacy aboutPage />

          {/* Family Tree Timeline — copied from the homepage FounderLegacy */}
          <section
            data-theme="light"
            style={{ position: 'relative', zIndex: 10, background: '#ffffff', paddingBottom: '4rem' }}
          >
            <div className="padding-global">
              <div className="container-large">
                <CompactTimeline larger />
              </div>
            </div>
          </section>

          {/* Legacy / Company content — DUPLICATE removed. The same
              "Generations of Firefighters" + "Established in 2009" copy is
              presented as a richer 6-card grid in the .about-bento-section
              below. Keeping both produced visibly duplicated content on the
              About page. The bento section is the canonical version. */}


          <div className="padding-global about-bento-section">
            <div className="container-large">
              <div
                className="padding-section-large"
                style={{ paddingTop: '6rem', paddingInline: 'clamp(1rem, 5vw, 1.5rem)' }}
              >
                {/* Header — same layout as strata /properties section */}
                <header
                  className={`${styles.legacyHeader} ${styles.legacyHeaderStrata}`}
                  style={{ marginTop: 0, marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
                >
                  <p className={styles.kicker}>The Legacy</p>
                  <h2 id="about-legacy-title" className="text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)]" style={{ color: '#111111', maxWidth: 'none', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                    <span>The Tricklebank</span><br />
                    <span style={gradientStyle}>Family Legacy</span>
                  </h2>
                  <p>
                    Generations of firefighting heritage meet practical, dependable <strong>fire protection</strong>. Here is what shapes All Fire Services and the people behind it.
                  </p>
                </header>

                {/* Cards — same 3-col / 2-col / 1-col responsive grid as strata properties */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.18,
                    }}>
                      Generations of <span style={{ ...gradientStyle }}>Firefighters</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                      From William through Trevor, Trevor Jr, Stanley, and Ian, <strong>generations of the Tricklebank family served in firefighting and emergency response</strong>, building a long-standing connection to <strong>fire protection and the responsibility of protecting people and property.</strong>
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.18,
                    }}>
                      A Family <span style={{ ...gradientStyle }}>Legacy</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                      That family history brings a deeper appreciation for what <strong>fire protection</strong> is ultimately about: <strong>protecting lives, protecting property, and taking responsibility seriously.</strong>
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.18,
                    }}>
                      Established <span style={{ ...gradientStyle }}>2009</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                      The business was <strong>established in 2009 by a former senior NSW Fire Brigade officer</strong>. Peter Tricklebank later became the <strong>Boss of All Fire Services</strong> and today helps lead the company's approach to <strong>practical and dependable fire protection.</strong>
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.18,
                    }}>
                      The <span style={{ ...gradientStyle }}>Company</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                      The company combines technical <strong>fire protection knowledge</strong> with a team that includes <strong>serving professional firefighters</strong>, bringing practical, real-world experience into the way clients and properties are supported.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.18,
                    }}>
                      Built on Practical <span style={{ ...gradientStyle }}>Experience</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                      The knowledge behind All Fire Services comes from more than technical requirements alone. <strong>Real firefighting experience helps shape how fire protection risks are identified, understood, and addressed</strong>, giving the team a practical perspective on protecting people and property.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                      fontWeight: 800,
                      color: '#111111',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.18,
                    }}>
                      The Next <span style={{ ...gradientStyle }}>Generation</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', color: '#4a4a46', lineHeight: 1.55 }}>
                      The Tricklebank family <strong>hopes the legacy will continue through the next generation</strong>, carrying forward the same values of responsibility, service, and protecting the community while helping shape the future of <strong>fire protection</strong>.
                    </p>
                  </div>
                </div>

                {/* Bento Gallery — infinite horizontal scroll with auto-movement */}
                <div style={{ marginTop: '5rem', background: '#ffffff', padding: 0 }}>
                  <InteractiveImageBentoGallery
                    imageItems={companyGalleryImages.map((img, idx) => ({
                      id: img.id,
                      title: img.name,
                      desc: img.desc,
                      url: img.src,
                      span: idx % 5 === 0 ? 'md:row-span-2 md:col-span-2' : '',
                    }))}
                    kicker="The Tricklebank Family"
                    title="Who knows better"
                    titleAccent="than a fireman?"
                    description="A look through generations of the Tricklebank family and the firefighting heritage behind All Fire Services. Drag to explore, click to expand."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large about-meet-peter-wrap" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>

                {/* Block 2 — MEET PETER */}
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst} about-meet-peter-section`} style={{ marginBottom: '14rem', alignItems: 'stretch' }}>
                  <div className="order-2 lg:order-1" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '100%', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/technician/Peter - Managing Director.jpg" alt="Peter Tricklebank, the Boss of All Fire Services" fill style={{ objectFit: 'cover', objectPosition: 'center 24%' }} sizes="(max-width: 1024px) 100vw, 42vw" />
                  </div>
                  <div className={`${styles.newStoryContent} order-1 lg:order-2`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>MEET PETER TRICKLEBANK</p>
                      <h2 className="text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)]" style={{ maxWidth: '24ch', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                        &ldquo;Australian <span style={{ color: '#111111' }}>Owned</span> <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Since 2009</span>&rdquo;
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      <strong>Peter Tricklebank is the Boss of All Fire Services.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Born into a family of firefighters and raised around fire stations, Peter grew up with a deep understanding of <strong>fire protection and what it means to protect people and property.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      Today, he leads All Fire Services alongside experienced <strong>fire protection professionals, including serving senior firefighters</strong>, bringing practical firefighting knowledge into the company's work.
                    </p>
                  </div>
                </div>

                {/* Block 3 — EXPERIENCE */}
                <div className={`${styles.newStoryGrid} about-experience-section`} style={{ marginBottom: '14rem', alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>EXPERIENCE</p>
                      <h2 className="text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)]" style={{ maxWidth: '24ch', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                        &ldquo;Built on<br /><span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Real Experience&rdquo;</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      <strong>Who Knows Fire Better Than a Firefighter?</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Our team includes <strong>serving professional firefighters</strong> who bring practical, real-world understanding to <strong>fire protection</strong>.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      That experience is supported by qualified fire-safety professionals who understand compliance, <strong>Australian Standards, building requirements, testing, maintenance, and certification.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      The result is a <strong>fire protection service</strong> built around more than completing a checklist. It is about understanding the purpose behind the requirements and helping clients protect their buildings properly.
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/History/about (8).jpg" alt="Built on Real Experience" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>

                {/* Block 4 — STANDARDS */}
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst} about-standards-section`} style={{ marginBottom: '14rem', alignItems: 'stretch' }}>
                  <div className="order-2 lg:order-1" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/technician/technician.jpg" alt="Always Learning" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className={`${styles.newStoryContent} order-1 lg:order-2`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>STANDARDS</p>
                      <h2 className="text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)]" style={{ maxWidth: '24ch', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                        &ldquo;Always<br /><span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Learning&rdquo;</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      <strong>Fire protection requirements continue to evolve, and so does our knowledge.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Through ongoing professional development and technical training, our team stays informed about relevant <strong>Australian Standards, building requirements, current legislation, and evolving fire protection practices.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      This allows us to provide <strong>fire protection advice</strong> that is practical, accurate, and appropriate to each property.
                    </p>
                  </div>
                </div>

                {/* Our Mission */}
                <div className="about-mission-section" style={{ marginTop: '10rem', backgroundColor: '#ffffff', padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(1.25rem, 3vw, 2.5rem)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <div className={styles.newStoryGrid} style={{ margin: 0, maxWidth: 'none', alignItems: 'stretch' }}>
                    <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <header
                        className={styles.storyHeaderLeft}
                        style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                      >
                        <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>OUR MISSION</p>
                        <h2 className={`${styles.missionHeading} text-[clamp(1.35rem,6.5vw,2rem)] md:text-[clamp(2.2rem,4.3vw,3.8rem)]`} style={{ maxWidth: '24ch', fontWeight: 780, letterSpacing: '-0.04em', lineHeight: 0.92, textWrap: 'balance' }}>
                          <span className={`${styles.missionLine} ${styles.missionLineOne}`}>
                            &ldquo;Excellence{' '}
                          </span>
                          <span className={`${styles.missionLine} ${styles.missionLineTwo}`}>
                            <span className={styles.missionAccent}>in</span>&nbsp;Fire{' '}
                          </span>
                          <span className={`${styles.missionLine} ${styles.missionLineThree} ${styles.missionGradient}`}>
                            Protection&rdquo;
                          </span>
                        </h2>
                      </header>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                        Our mission is to deliver <strong>practical, reliable fire protection</strong> through trusted advice, technical expertise, and responsive service.
                      </p>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                        We aim to make <strong>fire protection and fire safety easier for every client</strong> while maintaining a strong commitment to <strong>protecting people, property, and businesses.</strong>
                      </p>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ fontWeight: 'bold', color: '#111', borderLeft: '4px solid #ff2a00', paddingLeft: '1rem' }}>
                        We do not simply help clients meet requirements. We help them understand and manage their fire-safety responsibilities properly.
                      </p>
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                      <Image src="/technician/group.jpg" alt="Our Mission" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
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
