"use client";
import ContactCTA from "@/components/ContactCTA";
import { useState } from "react";
import Image from "next/image";


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
        <header data-theme="light" className="section_about-hero is-light">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large is-about" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop">
                        About All Fire Services
                      </div>
                      <h1 className="heading-style-h1">
                        About ALLFIRE Services Sydney
                      </h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        About All Fire Services
                      </div>
                      <p className="body-text">
                        All Fire Services is an Australian owned and operated business created by a former NSW Fire Brigades Senior Officer in December 2009. We provide high-level professional fire safety services whilst being approachable, practical and reasonable.
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
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: '4rem' }}>
                <div className="story_component grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                  <div className="story_content flex flex-col" style={{ gap: '3rem' }}>
                    <div>
                      <div className="header-eyebrow-text" style={{ color: '#ff5722', marginBottom: '1rem', fontWeight: 'bold' }}>Our Story</div>
                      <h2 className="heading-style-h2" style={{ marginBottom: '1.5rem' }}>
                        Fire Protection Runs in Our Blood
                      </h2>
                      <p className="body-text">
                        AllFire Services is an Australian-owned business founded in 2009 by former NSW Fire Brigades Senior Officer, Peter Wood. With a family history in the fire service dating back to 1911, protecting people and property isn&apos;t just our profession, it&apos;s our legacy.
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-style-h4" style={{ marginBottom: '1rem' }}>Our Mission</h3>
                      <p className="body-text">
                        To deliver high-quality fire protection and compliance services through practical expertise, trusted advice and dependable service, while remaining approachable, responsive and easy to work with.
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-style-h4" style={{ marginBottom: '1rem' }}>Built on Real Experience</h3>
                      <p className="body-text">
                        With more than 38 years of frontline firefighting and fire safety experience, Peter established AllFire with a simple vision: to create a fire protection company that clients could genuinely rely on. By combining the knowledge of serving and retired firefighters with exceptional customer service, AllFire was built on experience, integrity and a commitment to doing the job right.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="heading-style-h4" style={{ marginBottom: '1rem' }}>Always Learning</h3>
                      <p className="body-text">
                        Fire safety standards continue to evolve, and so do we. Through ongoing professional development, industry training and practical education, we ensure our team remains up to date with current legislation, Australian Standards and industry best practice.
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-style-h4" style={{ marginBottom: '1rem' }}>Trusted Since 2009</h3>
                      <p className="body-text">
                        Since our inception, AllFire Services has maintained the certifications, insurances and workplace safety standards expected of a professional fire protection provider. More importantly, we&apos;ve built lasting relationships by delivering practical solutions, reliable service and genuine peace of mind.
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-style-h4" style={{ marginBottom: '1rem' }}>A Legacy of Protection</h3>
                      <p className="body-text" style={{ marginBottom: '2rem' }}>
                        More than a century of family history has shaped who we are today, and it continues to inspire how we serve our clients.
                      </p>
                      <div>
                        <span style={{ 
                          backgroundColor: "#FEAF04", 
                          color: "#111111", 
                          padding: "0.75rem 1.5rem", 
                          borderRadius: "8px", 
                          fontWeight: "800",
                          display: "inline-block",
                          fontSize: "1.25rem",
                          boxShadow: "0 4px 14px rgba(254, 175, 4, 0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px"
                        }}>
                          &ldquo;Who Knows Better Than A Fireman&rdquo;
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="story_image flex flex-col gap-12 lg:sticky lg:top-32">
                    <Image
                      src="/aboutimage.png"
                      width={1400}
                      height={700}
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      alt="About All Fire Services"
                      className="w-full h-auto rounded-xl shadow-2xl object-cover"
                    />
                    
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingTop: '177.77%' }}>
                        <iframe 
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/ZY_5Dgy3EY4?playsinline=1" 
                          title="All Fire Services Video 1" 
                          loading="lazy"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
                      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingTop: '177.77%' }}>
                        <iframe 
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/gaGkQXD0P2w?playsinline=1" 
                          title="All Fire Services Video 2" 
                          loading="lazy"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
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
                  <div className="team_header">
                    <h2 className="heading-style-h2">
                      Meet the All Fire Services Team
                    </h2>
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
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    >
                      {teamMembers.map((member) => {
                        const imgUrl = member.img;
                        return (
                          <div key={member.name} role="listitem" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                              type="button"
                              aria-label={`Open larger photo of ${member.name}`}
                              style={{ width: '100%', height: 'auto', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '0.5rem', cursor: 'pointer', position: 'relative', padding: 0, border: 0, background: 'transparent' }}
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <h3 className="heading-style-h4" style={{ margin: 0 }}>{member.name}</h3>
                              <div className="body-text w-richtext" style={{ margin: 0, fontSize: '0.9rem' }}>
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
              background: 'rgba(0,0,0,0.15)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              padding: '90px 24px 24px',
            }}
            onClick={() => setLightboxImage(null)}
          >
            <div 
              style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '100%', maxHeight: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setLightboxImage(null)}
                style={{
                  marginBottom: '0.5rem',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '50%',
                  width: '2.75rem',
                  height: '2.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#333',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: 'calc(100vh - 160px)', 
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain', 
                  borderRadius: '12px', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)', 
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
