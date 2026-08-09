"use client";
import ContactCTA from "@/components/ContactCTA";
import HeroScrollCue from "@/components/HeroScrollCue";
import Image from "next/image";
import styles from "@/components/HomeStoryLegacy.module.css";
import HomeStoryLegacy from "@/components/HomeStoryLegacy";
import { LightboxImage } from "@/components/ui/LightboxImage";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";
import YouTubeLite from "@/components/YouTubeLite";

const companyGalleryImages = [
  { id: 1, src: "/History/about (1).jpg", name: "Waterloo", desc: "Residential fire safety servicing in Waterloo." },
  { id: 2, src: "/History/about (4).jpg", name: "Randwick", desc: "Common-property grounds maintenance, Randwick." },
  { id: 3, src: "/History/about (6).jpg", name: "Marrickville", desc: "Strata and commercial fire safety in Marrickville." },
  { id: 4, src: "/History/about (7).jpg", name: "Our Team", desc: "All Fire Services technicians on site." },
  { id: 5, src: "/History/about (8).jpg", name: "Heritage Fleet", desc: "Vintage fire service vehicle preserved by the family." },
  { id: 6, src: "/History/about (9).jpg", name: "Heritage Fleet", desc: "Classic fire engines from the family history." },
  { id: 7, src: "/History/about (10).jpg", name: "Generations of Firefighters", desc: "The Tricklebank family firefighting lineage." },
];
const teamMembers = [
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-1536x2048.webp', name: 'Peter', bio: 'Peter is the current owner of All Fire Services. Backed by a family firefighting legacy dating to 1911, he leads the business and its team of fire-safety professionals across Greater Sydney.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp', name: 'Paul', bio: 'Paul is a dedicated Customer Service Technician and professional firefighter, bringing real-life knowledge and extensive experience to every inspection.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp', name: 'Sam', bio: 'Sam brings the practical experience of a serving professional firefighter to his work, helping clients maintain safe and compliant buildings.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp', name: 'George', bio: 'George is committed to providing a high standard of service and helping clients protect their people and property.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp', name: 'Ken', bio: 'Ken brings technical expertise in matters relating to the Building Code of Australia, Australian Standards, and fire-safety requirements.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp', name: 'Kyriakos', bio: 'Kyriakos provides approachable, practical, and dependable fire-safety services to clients across Greater Sydney.' },
];

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
            .about-hero-inner {
              padding-top: 7rem !important;
              padding-bottom: 14rem !important;
            }
            .about-fade-overlay {
              height: 260px !important;
            }
          }

          /* About page only: nudge the scroll-down cue slightly lower than
             the shared 12% so it sits clear of the body copy on this hero. */
          .about-hero-header .cueWrap {
            bottom: 16% !important;
          }

          @media (max-width: 767px) {
            .about-hero-inner {
              padding-top: 6rem !important;
              padding-bottom: 17rem !important;
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
              height: 230px !important;
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
          }
        `}} />
        <header
          className="section_about-hero is-dark about-hero-header"
          style={{
            position: 'relative',
            marginTop: '-12rem',
            paddingTop: '12rem',
            marginBottom: '-2px',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp"
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
                      <div className="header-eyebrow-text hide-desktop mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        About All Fire Services
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
                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>ABOUT ALLFIRE</span>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '0px', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          SERVICES SYDNEY
                        </span>
                      </h1>
                    </div>
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[8rem] md:pb-0">
                      <div className="header-eyebrow-text hide-tablet mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        About All Fire Services
                      </div>
                      <p className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        A family firefighting legacy dating back to 1911, and an Australian-owned fire protection business established in 2009.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HeroScrollCue />
        </header>

        <section
          data-animate-to="light"
          data-theme="light"
          className="section_story"
          style={{ position: 'relative', zIndex: 10, background: '#ffffff' }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>

                {/* Block 1 — OUR STORY */}
                <div className={`${styles.newStoryGrid} about-our-story-section`} style={{ marginTop: '0', marginBottom: '0', alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-0`} style={{ textTransform: 'uppercase' }}>OUR STORY</p>
                      <h2 className="mx-0" style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch', color: '#111111' }}>
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
                      Since 2009, All Fire Services has delivered practical, reliable fire protection across Greater Sydney, backed by technical expertise and generations of firefighting heritage.
                    </p>
                    <p className="text-[#111111] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.6] text-left" style={{ marginBottom: '1.5rem' }}>
                      From testing and maintenance to certification and compliance, we help protect <strong>people, property, and businesses.</strong>
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

          {/* Legacy / Company content — with Family Video */}
          <div className="padding-global about-legacy-company-section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div className="container-large">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.62fr] gap-y-12 lg:gap-x-[clamp(6rem,10vw,10rem)] relative items-start lg:items-stretch" style={{ padding: '0 clamp(2rem, 5vw, 6rem)' }}>

                {/* Text Column (Left) */}
                <div className="flex flex-col gap-16 lg:gap-40 order-2 lg:order-1 pb-12 lg:pb-0 about-legacy-company-text">

                  {/* Legacy Block */}
                  <div className="flex flex-col justify-start text-left items-start">
                    <header className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}>
                      <p className={`${styles.kickerLeft} mx-0`}>THE LEGACY</p>
                      <h2 className="mx-0 text-left" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', maxWidth: '28ch' }}>
                        Generations of <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Firefighters</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '2.5rem' }}>
                      From William through Trevor, Trevor Jr, Stanley, and Ian, generations of the Tricklebank family served in firefighting and emergency response. That family history brings a deeper appreciation for what fire protection is ultimately about: protecting lives, protecting property, and taking responsibility seriously.
                    </p>
                  </div>

                  {/* Company Block */}
                  <div className="flex flex-col justify-start text-left items-start">
                    <header className={`${styles.storyHeaderLeft} flex flex-col items-start`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}>
                      <p className={`${styles.kickerLeft} mx-0`}>THE COMPANY</p>
                      <h2 className="mx-0 text-left">
                        Established in <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>2009</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '2.5rem' }}>
                      All Fire Services has its own history. The business was established in 2009 by a former senior NSW Fire Brigade officer. Peter Tricklebank later became the owner and today leads All Fire Services with a focus on practical, dependable fire protection and professional customer service.
                    </p>
                  </div>

                </div>

                {/* Video Column (Right) — Sticky */}
                <div className="order-1 lg:order-2 w-full relative h-full">
                  <div className="w-full max-w-[320px] mx-auto lg:sticky lg:top-32">
                    <div className="relative w-full aspect-[9/16] rounded-[1.5rem] overflow-hidden shadow-2xl">
                      <YouTubeLite
                        videoId="PY3FuIT0XQ4"
                        title="All Fire Services family story"
                        autoplay
                        className="absolute inset-0 w-full h-full rounded-[1.5rem]"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <div className="padding-global about-bento-section">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '6rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto 6rem auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                      THE LEGACY
                    </h2>
                    <p style={{ marginTop: '1.5rem', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, letterSpacing: '-0.06em', color: '#111111' }}>
                      Generations of <span style={{
                        background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>Firefighters</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-16 md:gap-32 w-full">
                    {/* Row 1 - THE LEGACY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-center w-full">
                      <h2 className="text-left" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        Generations of <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Firefighters</span>
                      </h2>
                      <p className="text-left" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        From William through Trevor, Trevor Jr, Stanley, and Ian, generations of the Tricklebank family served in firefighting and emergency response.
                      </p>
                    </div>

                    {/* Row 2 (Alternating) - THE LEGACY continued */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-center w-full">
                      <p className="order-2 md:order-1 text-right" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        That family history brings a deeper appreciation for what fire protection is ultimately about: <strong>protecting lives, protecting property, and taking responsibility seriously.</strong>
                      </p>
                      <h2 className="order-1 md:order-2 text-right" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        A Family <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Legacy</span>
                      </h2>
                    </div>

                    {/* Row 3 - THE COMPANY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-center w-full">
                      <h2 className="text-left" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        Established <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>2009</span>
                      </h2>
                      <p className="text-left" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        The business was established in 2009 by a former senior NSW Fire Brigade officer. <strong>Peter Tricklebank later became the owner</strong> and today leads All Fire Services with a focus on practical, dependable fire protection and professional customer service.
                      </p>
                    </div>

                    {/* Row 4 (Alternating) - THE COMPANY continued */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-center w-full">
                      <p className="order-2 md:order-1 text-right" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        The company combines technical fire-safety knowledge with a team that includes <strong>serving and retired professional firefighters</strong>, bringing practical experience into the way clients are supported.
                      </p>
                      <h2 className="order-1 md:order-2 text-right" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        The <span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Company</span>
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Bento Gallery — infinite horizontal scroll with auto-movement */}
                <div style={{ marginTop: '4rem', background: '#ffffff', padding: '0 0 4rem 0' }}>
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
              <div className="padding-section-large" style={{ paddingBottom: '6rem' }}>

                {/* Block 2 — MEET PETER */}
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst} about-meet-peter-section`} style={{ marginBottom: '14rem', alignItems: 'stretch' }}>
                  <div className="order-2 lg:order-1" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '100%', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-1536x2048.webp" alt="Peter Tricklebank, owner of All Fire Services" fill style={{ objectFit: 'cover', objectPosition: 'center 24%' }} sizes="(max-width: 1024px) 100vw, 42vw" />
                  </div>
                  <div className={`${styles.newStoryContent} order-1 lg:order-2`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>MEET PETER TRICKLEBANK</p>
                      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                        &ldquo;Australian <span style={{ color: '#ff0000' }}>Owned</span><br /><span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Since 2009</span>&rdquo;
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      <strong>Peter Tricklebank is the current owner of All Fire Services.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Born into a family of firefighters and raised around fire stations, Peter grew up with a deep understanding of what it means to protect people and property.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      Today, he leads All Fire Services alongside a team of experienced fire-safety professionals, including serving and retired firefighters.
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
                      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch', color: '#111111' }}>
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
                      Our team includes <strong>serving and retired professional firefighters</strong> who bring practical, real-world understanding to fire protection.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      That experience is supported by qualified fire-safety professionals who understand compliance, <strong>Australian Standards, building requirements, testing, maintenance, and certification.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      The result is a service built around more than completing a checklist. It is about understanding the purpose behind the requirements and helping clients protect their buildings properly.
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/History/about (8).jpg" alt="Built on Real Experience" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>

                {/* Block 4 — STANDARDS */}
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst} about-standards-section`} style={{ marginBottom: '14rem', alignItems: 'stretch' }}>
                  <div className="order-2 lg:order-1" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-with-guildo-scaled-e1759978124384-2048x1536.webp" alt="Always Learning" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className={`${styles.newStoryContent} order-1 lg:order-2`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>STANDARDS</p>
                      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch', color: '#111111' }}>
                        &ldquo;Always<br /><span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Learning&rdquo;</span>
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Fire safety requirements continue to evolve, and so does our knowledge.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                      Through ongoing professional development and technical training, our team stays informed about relevant <strong>Australian Standards, building requirements, and current legislation.</strong>
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left">
                      This allows us to provide advice that is practical, accurate, and appropriate to each property.
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
                        <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                          &ldquo;Excellence <span style={{ color: '#ff0000' }}>in</span><br /><span style={{
                            background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}>Fire Protection</span>&rdquo;
                        </h2>
                      </header>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                        Our mission is to deliver <strong>practical, reliable fire protection</strong> through trusted advice, technical expertise, and responsive service.
                      </p>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ marginBottom: '1.5rem' }}>
                        We aim to make fire safety easier for every client while maintaining a strong commitment to <strong>protecting people, property, and businesses.</strong>
                      </p>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-left" style={{ fontWeight: 'bold', color: '#111', borderLeft: '4px solid #ff2a00', paddingLeft: '1rem' }}>
                        We do not simply help clients meet requirements. We help them understand and manage their fire-safety responsibilities properly.
                      </p>
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                      <Image src="/History/1 (1).jpg" alt="Our Mission" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>

        <section className="section_team">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large is-team" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <div className="team_component">
                  <div className="team_header max-w-5xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '2rem', maxWidth: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase', margin: '0 0 1rem 0' }}>The professionals behind All Fire Services</p>
                      <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0, maxWidth: '15ch' }}>
                        Meet the <span style={{ color: '#ff0000' }}>All Fire</span><br /><span style={{
                          background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}>Services Team</span>
                      </h2>
                    </header>
                    <div className="button-group">
                      <a
                        data-wf--button--size="large"
                        href="/contact"
                        className="button-wrap w-inline-block"
                      >
                        <div data-wf--button-style-- className="button-content">
                          <div
                            data-wf--button-layout--layout="normal"
                            className="button-layout"
                          >
                            <div className="button-text">Get started</div>
                            <div className="button-icon">
                              <div className="icon-slot">
                                <div className="icon-slot">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                  >
                                    <g clipPath="url(#clip0_6401_1558)">
                                      <path
                                        d="M10.9541 3.45557L6.00455 3.49545L5.99226 5.02155L10.5927 4.98503L3.05492 12.5549L4.12551 13.6255L11.6959 6.02298L11.6583 10.6887L13.1844 10.6764L13.2249 5.72629C13.2282 5.11964 12.9913 4.5402 12.5657 4.11468C12.1402 3.68916 11.5608 3.45218 10.9541 3.45557Z"
                                        fill="currentColor"
                                      ></path>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_6401_1558">
                                        <rect
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          transform="translate(0 0.5)"
                                        ></rect>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="team_list-wrapper w-dyn-list">
                    <div
                      role="list"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto"
                    >
                      {teamMembers.map((member) => {
                        return (
                          <div key={member.name} role="listitem" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <LightboxImage
                              fill
                              src={member.img}
                              sizes="(max-width: 767px) 50vw, (max-width: 1200px) 33vw, 280px"
                              alt={member.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 300ms' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                              <h3 style={{ margin: 0, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#111111' }}>{member.name}</h3>
                              <div style={{ margin: 0, fontSize: '1rem', color: '#111111', lineHeight: 1.5 }}>
                                <p>{member.bio}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
