import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import SitewideCTA from "@/components/SitewideCTA";

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
             hero H1. */
          @media (min-width: 992px) {
            .about-hero-inner {
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
            .section_about-hero {
              margin-top: -5rem !important;
              padding-top: 5rem !important;
            }
            .about-hero-inner {
              padding-top: 1.5rem !important;
              padding-bottom: 2rem !important;
            }
            .about-fade-overlay {
              height: 100px !important;
            }
          }
          @media (max-width: 767px) {
            .section_about-hero {
              margin-top: -4.5rem !important;
              padding-top: 4.5rem !important;
            }
            .about-hero-inner {
              padding-top: 1rem !important;
              padding-bottom: 1.5rem !important;
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
              height: 70px !important;
            }
          }
        `}} />
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
              src="/herosectionimage.webp"
              alt="Contact All Fire Services Hero"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              fetchPriority="high"
              quality={60}
              sizes="100vw"
            />
          </div>
          <div className="about-dark-overlay"></div>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.55) 0%, rgba(30,5,5,0.35) 40%, rgba(70,10,10,0.15) 70%, transparent 100%)', mixBlendMode: 'multiply' }}></div>
          <div className="about-fade-overlay"></div>

          <div className="padding-global" style={{ position: 'relative', zIndex: 3 }}>
            <div className="container-large">
              <div className="padding-section-large is-about about-hero-inner">
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper flex flex-col md:flex-row text-center md:text-left">
                    <div className="hero_content-left flex flex-col items-center md:items-start w-full md:w-auto">
                      <div className="header-eyebrow-text hide-desktop mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        Contact Us
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
                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>CONTACT ALLFIRE</span>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', paddingRight: '0px', background: 'linear-gradient(to right, #ff2a00, #ffb700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          SERVICES
                        </span>
                      </h1>
                    </div>
                    <div className="hero_content-right flex flex-col items-center md:items-start pb-[1rem] md:pb-0">
                      <div className="header-eyebrow-text hide-tablet mx-auto md:mx-0" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        Contact Us
                      </div>
                      <p className="mx-auto md:mx-0 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55]" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Get in touch with All Fire Services today. Our team is ready to help with fire safety inspections, compliance support and service enquiries across Greater Sydney.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white relative z-10">
          <ContactCTA hideSitewideCTA={true} layout="split" />
          <SitewideCTA />
        </div>
      </main>
    </main>
  );
}
