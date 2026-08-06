"use client";
import ContactCTA from "@/components/ContactCTA";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/HomeStoryLegacy.module.css";
import TimelineSection from "@/components/TimelineSection";
import { Gallery, GalleryGrid, GalleryImage } from "@/components/ui/shared-element-gallery";


const teamMembers = [
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-1536x2048.webp', name: 'Peter', bio: 'Peter, our founder and former NSW Fire Brigades Senior Officer, brings decades of frontline experience to lead our highly motivated team of professionals.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp', name: 'Paul', bio: 'Paul is a dedicated Customer Service Technician and professional firefighter, bringing real-life knowledge and extensive experience to every inspection.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp', name: 'Sam', bio: 'Sam ensures excellent service delivery on site, drawing on his background as a serving professional firefighter to keep your building compliant.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp', name: 'George', bio: 'George is highly motivated to provide a level of service and safety to the community unequalled by our competition.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp', name: 'Ken', bio: 'Ken brings technical expertise on issues affecting the relevant Building Code of Australia and Australian Standards.' },
  { img: '/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp', name: 'Kyriakos', bio: 'Kyriakos provides approachable, practical and reasonable fire safety services to all our clients across the Greater Sydney Area.' },
];

export default function Page() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <main className="main-wrapper">
      <main className="scroll-wrapper">
        <style dangerouslySetInnerHTML={{ __html: `
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
          @media (max-width: 767px) {
            .about-hero-inner {
              padding-top: 6rem;
              padding-bottom: 22rem;
            }
            .about-dark-overlay {
              background: linear-gradient(to bottom,
                rgba(10,10,10,0.88) 0%,
                rgba(20,5,5,0.82) 40%,
                rgba(30,5,5,0.72) 60%,
                rgba(40,8,8,0.45) 75%,
                rgba(50,8,8,0.18) 88%,
                rgba(255,255,255,0) 98%
              );
            }
            .about-fade-overlay {
              height: 25%;
            }
          }
        `}} />
        <header 
          className="section_about-hero is-dark"
          style={{ 
            backgroundImage: 'url("/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            marginTop: '-12rem',
            paddingTop: '12rem',
            marginBottom: '-2px',
          }}
        >
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
                    <div className="hero_content-right flex flex-col items-center md:items-start">
                      <div className="header-eyebrow-text hide-tablet mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        About All Fire Services
                      </div>
                      <p className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Founded by a former NSW Fire Brigades Senior Officer, fire protection is in our blood. We deliver elite, professional safety services driven by practical, real-world expertise.
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
              <div className="padding-section-large" style={{ paddingTop: '4rem', paddingBottom: '0' }}>
                
                {/* Block 1 */}
                <div className={styles.newStoryGrid} style={{ marginTop: '0', marginBottom: '0', alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} flex flex-col items-center md:items-start text-center md:text-left`}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={`${styles.kickerLeft} mx-auto md:mx-0 justify-center md:justify-start`} style={{ textTransform: 'uppercase' }}>Our Legacy</p>
                      <h2 className="mx-auto md:mx-0" style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                        &ldquo;Fire Protection<br />Runs in <span className={styles.orangeText}>Our Blood</span>&rdquo;
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-center md:text-left" style={{ marginBottom: '1.5rem' }}>
                      AllFire Services is an Australian-owned business founded in 2009 by former NSW Fire Brigades Senior Officer, Peter Wood. With a family history in the fire service dating back to 1911, protecting people and property isn&apos;t just our profession, it&apos;s our legacy.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] text-center md:text-left" style={{ fontWeight: 'bold' }}>
                      When you choose AllFire, you are choosing a century of unbroken dedication to saving lives and safeguarding futures.
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', maxHeight: '420px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/History/1 (1).jpg" alt="Fire Protection Runs in Our Blood" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 42vw" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <TimelineSection />

          {/* In-Depth History & Gallery */}
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '6rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto 6rem auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                      A Century of Service
                    </h2>
                    <p style={{ marginTop: '1.5rem', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, color: '#111111' }}>
                      &ldquo;Who&apos;s Better <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>than a Fireman?</span>&rdquo;
                    </p>
                  </div>

                  <div className="flex flex-col gap-16 md:gap-20 w-full">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
                      <h2 className="text-center md:text-left" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        Proudly Serving <br className="md:hidden" />Since <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1911</span>
                      </h2>
                      <p className="text-center md:text-justify" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        It all began with William Tricklebank. His unwavering commitment to protecting the community set a profound benchmark for courage and resilience that continues to define our approach over a century later.
                      </p>
                    </div>

                    {/* Row 2 (Alternating) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
                      <p className="order-2 md:order-1 text-center md:text-justify" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        A proud, unbroken lineage of frontline firefighters—Trevor, Stanley, Ian, and Peter. For decades, our family has stood at the forefront of emergency response, passing down invaluable hands-on expertise from father to son.
                      </p>
                      <h2 className="order-1 md:order-2 text-center md:text-right" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        A Legacy of Four <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Generations</span>
                      </h2>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
                      <h2 className="text-center md:text-left" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        Leading from 2009 <br className="md:hidden" />to <span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Present</span>
                      </h2>
                      <p className="text-center md:text-justify" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        Drawing upon generations of hard-won knowledge, Peter established AllFire Services. What started as a family calling has transformed into an industry-leading enterprise, delivering uncompromising fire protection and compliance.
                      </p>
                    </div>

                    {/* Row 4 (Alternating) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
                      <p className="order-2 md:order-1 text-center md:text-justify" style={{ color: '#111111', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, margin: 0 }}>
                        We don't just tick boxes. Every inspection, installation, and certification we perform is backed by over 100 years of real-world, lived experience. When you choose AllFire, you are choosing a partner whose dedication to saving lives runs in the blood.
                      </p>
                      <h2 className="order-1 md:order-2 text-center md:text-right" style={{ fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.94, color: '#111111', margin: 0 }}>
                        Our Unwavering <br className="md:hidden" /><span style={{ background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Promise</span> to You
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Interactive Shared-Element Gallery */}
                <Gallery>
                  <GalleryGrid className="max-w-7xl mx-auto">
                    {[
                      "1 (1).jpg",
                      "1 (2).jpg",
                      "1 (3).jpg",
                      "about (1).jpg",
                      "about (2).jpg",
                      "about (3).jpg",
                      "about (4).jpg",
                      "about (5).jpg",
                      "about (6).jpg",
                      "about (7).jpg",
                      "about (8).jpg",
                      "about (9).jpg"
                    ].map((filename, idx) => (
                      <GalleryImage 
                        key={idx} 
                        id={idx.toString()} 
                        src={`/History/${filename}?v=2`} 
                        alt={`History Gallery Image ${idx + 1}`}
                      />
                    ))}
                  </GalleryGrid>
                </Gallery>
              </div>
            </div>
          </div>

          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingBottom: '6rem' }}>

                {/* Block 2 */}
                <div className={`${styles.newStoryGrid} ${styles.newStoryGridImageFirst}`} style={{ marginBottom: '6rem', alignItems: 'stretch' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', maxHeight: '440px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-1536x2048.webp" alt="Founded by a firefighter" fill style={{ objectFit: 'cover', objectPosition: 'center 24%' }} sizes="(max-width: 1024px) 100vw, 42vw" />
                  </div>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>Our Story</p>
                      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                        &ldquo;Founded by<br /><span className={styles.orangeText}>a firefighter</span>&rdquo;
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ marginBottom: '1.5rem' }}>
                      All Fire Services is an Australian owned and operated business, created by a former NSW Fire Brigades Senior Officer in December 2009.
                    </p>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]">
                      The company was founded on a simple idea: that our customer service technicians should be professional firefighters, both serving and retired. It means every client gets extensive, real-life knowledge of the fire safety industry rather than a checklist.
                    </p>
                  </div>
                </div>

                {/* Block 3 */}
                <div className={styles.newStoryGrid} style={{ marginBottom: '6rem', alignItems: 'stretch' }}>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>Experience</p>
                      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                        &ldquo;Built on<br /><span className={styles.orangeText}>Real Experience</span>&rdquo;
                      </h2>
                    </header>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ marginBottom: '1.5rem' }}>
                        With more than 38 years of frontline firefighting and fire safety experience, Peter established AllFire with a simple vision: to create a fire protection company that clients could genuinely rely on.
                      </p>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]">
                        By combining the knowledge of serving and retired firefighters with exceptional customer service, AllFire was built on experience, integrity and a commitment to doing the job right.
                      </p>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/History/about (3).jpg" alt="Built on Real Experience" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>

                {/* Block 4 */}
                <div className={styles.newStoryGrid} style={{ marginBottom: '6rem', alignItems: 'stretch' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', borderRadius: '1.5rem', overflow: 'hidden', margin: 'auto' }}>
                    <Image src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-with-guildo-scaled-e1759978124384-2048x1536.webp" alt="Always Learning" fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={styles.storyHeaderLeft}
                      style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>Standards</p>
                      <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                        &ldquo;Always<br /><span className={styles.orangeText}>Learning</span>&rdquo;
                      </h2>
                    </header>
                    <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]">
                      Fire safety standards continue to evolve, and so do we. Through ongoing professional development, industry training and practical education, we ensure our team remains up to date with current legislation, Australian Standards and industry best practice.
                    </p>
                  </div>
                </div>

                {/* Our Mission */}
                <div style={{ marginTop: '5rem', backgroundColor: '#ffffff', padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(1.25rem, 3vw, 2.5rem)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
                  <div className={styles.newStoryGrid} style={{ margin: 0, maxWidth: 'none', alignItems: 'stretch' }}>
                    <div className={styles.newStoryContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <header
                        className={styles.storyHeaderLeft}
                        style={{ marginTop: 0, marginBottom: '1rem', maxWidth: 'none', width: '100%' }}
                      >
                        <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>Our Mission</p>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 4.8vw, 5.2rem)', maxWidth: '24ch' }}>
                          &ldquo;Excellence in<br /><span className={styles.orangeText}>Fire Protection</span>&rdquo;
                        </h2>
                      </header>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ marginBottom: '1.5rem' }}>
                        To deliver high-quality fire protection and compliance services through practical expertise, trusted advice and dependable service, while remaining approachable, responsive and easy to work with.
                      </p>
                      <p className="text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ fontWeight: 'bold', color: '#111', borderLeft: '4px solid #ff2a00', paddingLeft: '1rem' }}>
                        We don&apos;t just meet standards; we set them. Because when it comes to fire safety, average is never enough.
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
                        Meet the All Fire<br />Services Team
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
                        const imgUrl = member.img;
                        return (
                          <div key={member.name} role="listitem" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                              type="button"
                              aria-label={`Open larger photo of ${member.name}`}
                              style={{ width: '100%', height: 'auto', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.5rem', cursor: 'pointer', position: 'relative', padding: 0, border: 0, background: 'transparent' }}
                              onClick={() => setLightboxImage(imgUrl)}
                              className="group"
                            >
                              <Image
                                fill
                                src={member.img}
                                sizes="(max-width: 767px) 50vw, (max-width: 1200px) 33vw, 280px"
                                alt={member.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 300ms' }}
                                className="group-hover:scale-105"
                              />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 300ms', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem' }} className="group-hover:bg-black/10">
                                <span style={{ color: 'white', fontSize: '1.5rem', opacity: 0, transition: 'opacity 300ms', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} className="group-hover:opacity-100">⤢</span>
                              </div>
                            </button>
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

        {lightboxImage && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '90px 24px 24px',
            }}
            onClick={() => setLightboxImage(null)}
          >
            {/* Close Button matching shared-element-gallery */}
            <button 
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '110px',
                right: '24px',
                zIndex: 50,
                padding: '0.625rem',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'background-color 0.2s',
                lineHeight: 1,
              }}
              aria-label="Close gallery"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div 
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: 'calc(100vh - 140px)', 
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain', 
                  borderRadius: '12px', 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
                  display: 'block' 
                }}
              />
            </div>
          </div>
        )}
      </main>
    </main>
  );
}
