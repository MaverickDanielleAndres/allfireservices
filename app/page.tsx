import ContactCTA from "@/components/ContactCTA";
import {
  MotionConfig,
  MotionDiv,
  MotionHeader,
  MotionSection,
} from "@/components/MotionPrimitives";
import PortraitVideoGallery from "@/components/PortraitVideoGallery";
import ClientFeedback from "@/components/testimonial";
import FAQ from "@/components/FAQ";
import Image from "next/image";
import Link from "next/link";

const sectionReveal = {
  initial: { opacity: 1, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="main-wrapper">
        <div className="scroll-wrapper">
        <MotionHeader
          data-theme="dark"
          className="section_hero-home"
          style={{ position: "sticky", top: 0, zIndex: 0 }}
          initial={{ opacity: 1, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="code-embed-css w-embed"></div>
          <div className="code-embed-js w-embed w-script"></div>
          <div className="parallax">
            <section className="parallax__header" style={{ height: "100vh" }}>
              <div className="parallax__visuals" style={{ isolation: "isolate" }}>
                <Image
                  src="/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp"
                  alt="All Fire Services Hero Background"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "center", zIndex: -1 }}
                />
                  <div
                    data-parallax-layer="3"
                    className="parallax__layer-title"
                  >
                    <div className="padding-global">
                      <div className="container-large">
                        <div className="hero-home_content">
                          <div className="padding-section-large is-hero-home" style={{ paddingTop: "2.5rem", paddingBottom: "2rem", width: "100%", minHeight: "auto", height: "auto" }}>
                            <div className="hero-home_component" style={{ width: "100%", minHeight: "auto", height: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "4rem", alignItems: "stretch" }}>
                              <div className="max-width-hero" style={{ flex: "0 1 650px", zIndex: 10, margin: 0, padding: 0 }}>
                                <div className="header-wrapper" style={{ maxWidth: "800px", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
                                  <div className="header-text-wrap" style={{ 
                                      background: "rgba(0, 0, 0, 0.6)", 
                                      backdropFilter: "blur(10px)",
                                      WebkitBackdropFilter: "blur(10px)",
                                      padding: "2rem", 
                                      borderRadius: "16px",
                                      color: "#ffffff",
                                      border: "1px solid rgba(255,255,255,0.1)"
                                  }}>
                                    <div className="header-top">
                                      <div className="header-eyebrow-text" style={{ color: "#FEAF04", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                                        All Fire Services - Raising the standard
                                      </div>
                                      <h1 className="heading-style" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.15", marginBottom: "1rem", color: "#ffffff" }}>
                                        Fire Safety &amp; Compliance Solutions
                                      </h1>
                                    </div>
                                    <div className="hero_text-wrap">
                                      <p className="body-text" style={{ fontSize: "1rem", lineHeight: "1.5", color: "rgba(255,255,255,0.9)", maxWidth: "600px" }}>
                                        We provide comprehensive fire safety and compliance solutions across the Greater Sydney Area. From annual fire safety statements to routine testing, we ensure your property is protected.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="button-group" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "-1.5rem" }}>
                                    <a
                                      data-wf--button--size="large"
                                      href="tel:1300765594"
                                      className="button-wrap w-inline-block"
                                    >
                                      <div
                                        data-wf--button-style--
                                        className="button-content"
                                      >
                                        <div
                                          data-wf--button-layout--layout="normal"
                                          className="button-layout"
                                        >
                                          <div className="button-text">
                                            Call 1300 765 594
                                          </div>
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
                                    <a
                                      data-wf--button--size="large"
                                      href="/contact"
                                      className="button-wrap w-inline-block"
                                    >
                                      <div
                                        data-wf--button-style--
                                        className="button-content w-variant-2322bba7-d743-d5ae-17b2-3a616235fc2a"
                                      >
                                        <div
                                          data-wf--button-layout--layout="normal"
                                          className="button-layout"
                                        >
                                          <div className="button-text">
                                            Get a Quote
                                          </div>
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
                              </div>
                              <div className="hero-portrait-wrapper" style={{ flex: "0 0 300px", maxWidth: "300px", marginLeft: "auto", position: "relative", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <Image
                                  fill
                                  src="/herosectionimage.webp"
                                  alt="All Fire Services Technicians"
                                  sizes="300px"
                                  loading="eager"
                                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
                                />
                                <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)", zIndex: 1 }}></div>
                                <div style={{ position: "relative", zIndex: 2, padding: "1.5rem", color: "#ffffff" }}>
                                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem" }}>Expert Technicians</h3>
                                  <p style={{ fontSize: "0.875rem", opacity: "0.9" }}>Ready to secure your property today.</p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

              </div>
            </section>

          </div>
        </MotionHeader>
        <div style={{ position: "relative", zIndex: 10, backgroundColor: "#ffffff" }}>
        <MotionSection
          {...sectionReveal}
          id="team-spirit"
          data-theme="light"
          className="section_team-spirit"
          style={{ backgroundColor: "#ffffff", padding: "5rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
        >
          <div className="padding-global">
            <div className="container-large">
              <div className="team-spirit_header" style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
                <div className="header-eyebrow-text" style={{ marginBottom: "1.5rem" }}>
                  <span style={{ 
                    backgroundColor: "#FEAF04", 
                    color: "#111111", 
                    padding: "0.4rem 1rem", 
                    borderRadius: "6px", 
                    fontWeight: "800",
                    display: "inline-block"
                  }}>
                    &ldquo;Who Knows Better Than A Fireman&rdquo;
                  </span>
                </div>
                <h2 className="heading-style-h2" style={{ marginBottom: "1.5rem", color: "#111111" }}>
                  WE LOVE OUR COFFEE &amp; PETER LOVES THE TEAM SPIRIT
                </h2>
                <div className="hero_text-wrap" style={{ margin: "0 auto" }}>
                  <p className="body-text" style={{ color: "#444444", marginBottom: "1rem" }}>
                    All Fire Services Australia has grown &ndash; now proudly serving across Greater Sydney Area.
                  </p>
                  <p className="body-text" style={{ color: "#444444", marginBottom: "1rem" }}>
                    Peter would like to give a big shoutout to our amazing Sydney team: Paul, Sam, George, Ken, Kyriakos &amp; Orlando. 
                    Our clients truly appreciate your dedication and quick response in keeping every building safe. 
                    Fantastic work, team &ndash; keep it up!
                  </p>
                </div>
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: "cursive", fontStyle: "italic", fontSize: "3rem", color: "#111111", lineHeight: "1" }}>Pete</span>
                </div>
              </div>
              
              <div className="team-spirit_grid" style={{ 
                  display: "flex", 
                  flexWrap: "wrap",
                  gap: "1rem"
              }}>
                {[
                  { src: "allfire-peter-1536x2048.webp", alt: "Peter", title: "Certified Professionals", subtitle: "Highly trained and experienced", style: { flex: "1 1 200px" } },
                  { src: "allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp", alt: "Our Technicians", title: "Fast Response Times", subtitle: "Always there when you need us most", style: { flex: "2 1 400px" } },
                  { src: "allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp", alt: "Peter and Paul", title: "Trusted Reliability", subtitle: "Count on us for your safety", style: { flex: "1 1 200px" } },
                  { src: "allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp", alt: "Sam and Kyriakos", title: "Compliance Experts", subtitle: "Up-to-date with regulations", style: { flex: "1.2 1 250px" } },
                  { src: "allfire-sam-and-orlando-scaled-e1759978057777-2048x1536.webp", alt: "Sam and Orlando", title: "Dedicated Team Spirit", subtitle: "A united team protecting you", style: { flex: "1.5 1 300px" } },
                  { src: "allfire-with-guildo-scaled-e1759978124384-2048x1536.webp", alt: "With Guildo", title: "Safety First Approach", subtitle: "Your protection is our priority", style: { flex: "1 1 200px" } },
                  { src: "NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp", alt: "Coffee with Pete", title: "24/7 Support", subtitle: "Round-the-clock peace of mind", style: { flex: "1.2 1 250px" } }
                ].map((img, idx) => (
                  <MotionDiv
                    key={idx}
                    className="team-spirit_card home-hover-card"
                    initial={{ opacity: 1, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(idx, 6) * 0.055,
                      ease: "easeOut",
                    }}
                    style={{
                    position: "relative", 
                    height: "220px",
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    ...(img.style || {})
                  }}
                  >
                    <Image
                      fill
                      src={`/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/${img.src}`}
                      alt={img.alt}
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="home-hover-card_image"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
                    />
                    <div style={{ 
                      position: "absolute", 
                      bottom: 0, 
                      left: 0, 
                      width: "100%", 
                      height: "80%", 
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)", 
                      zIndex: 1 
                    }}></div>
                    <div style={{ position: "relative", zIndex: 2, padding: "1rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#ffffff" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "0.2rem", textShadow: "0 2px 4px rgba(0,0,0,0.5)", lineHeight: "1.2" }}>{img.title}</h3>
                      <p style={{ fontSize: "0.8rem", opacity: "0.9", textShadow: "0 1px 2px rgba(0,0,0,0.5)", lineHeight: "1.3", margin: 0 }}>{img.subtitle}</p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>
        <MotionSection
          {...sectionReveal}
          id="why-allfire"
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%', minHeight: 'auto' }}
        >
          {/* Left Side: Image */}
          <div style={{ flex: '1 1 50%', minWidth: '300px', minHeight: '350px', position: 'relative' }}>
            <Image
              fill
              src="/herosectionimage.webp"
              alt="The All Fire Services team with local firefighters"
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Right Side: Content */}
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 4%', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <h2 className="heading-style-h3" style={{ marginBottom: '1.25rem', color: '#111', fontSize: '1.5rem', lineHeight: '1.3' }}>
                Fire safety handled properly, from first check to final sign-off.
              </h2>
              <p className="body-text" style={{ color: '#444444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Protecting people and property takes more than ticking boxes. Our Sydney team brings inspection, testing, maintenance and compliance support together, so you always know what is safe, what needs attention and what happens next.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5722" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Compliance made clear</strong>
                    <span className="body-text" style={{ color: '#444444', fontSize: '0.85rem' }}>Practical advice and straightforward reporting.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5722" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.9rem', marginBottom: '0.2rem' }}>One dependable team</strong>
                    <span className="body-text" style={{ color: '#444444', fontSize: '0.85rem' }}>From routine testing to repairs and ongoing care.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5722" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Local, responsive support</strong>
                    <span className="body-text" style={{ color: '#444444', fontSize: '0.85rem' }}>People who listen, explain and follow through.</span>
                  </div>
                </li>
              </ul>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Image src="/logo.png" width={153} height={75} alt="FPA Australia" style={{ height: '75px', width: 'auto', objectFit: 'contain' }} />
                <Image src="/secondlogo.png" width={150} height={75} alt="FPAS" style={{ height: '75px', width: 'auto', objectFit: 'contain' }} />
              </div></div>
          </div>
        </MotionSection>
        <MotionSection {...sectionReveal} id="home-services" className="section_featured" style={{ marginTop: '4rem' }}>
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                
                <div className="featured_component" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      OUR SERVICES
                    </div>
                    <h2 className="heading-style-h3" style={{ marginBottom: '1.5rem', color: '#111' }}>
                      FIRE PROTECTION SERVICES
                    </h2>
                    <p className="body-text" style={{ fontSize: '1rem', color: '#444', lineHeight: '1.6' }}>
                      All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements and when necessary provide technical expertise on issues affecting the relevant Building Code of Australia, Environmental Planning and Assessment Regulations and relevant Australian Standards.
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.5rem',
                    width: '100%'
                  }}>
                                        {/* Cards */}
                    {[
                      {
                        title: "Annual Fire Safety Statement",
                        desc: "All Fire Services will ensure Excellent Service Delivery which will reflect the current Fire Safety Regulation requirements.",
                        img: "annualfiresafety.webp"
                      },
                      {
                        title: "Monthly Fire Inspection",
                        desc: "Routine checks to ensure all fire panels and systems are fully operational and compliant.",
                        img: "monthlyfireprotection.webp"
                      },
                      {
                        title: "Yearly Hydrant Flow Test",
                        desc: "Comprehensive flow testing of hydrant systems to guarantee adequate water supply during emergencies.",
                        img: "yearlyhydrantflowstate.webp"
                      },
                      {
                        title: "Monthly Diesel Pump Inspection",
                        desc: "Regular inspection of diesel pumps to maintain reliability and performance under critical conditions.",
                        img: "monthlydieselpumpprotection.webp"
                      },
                      {
                        title: "Monthly Sprinkler System Inspection",
                        desc: "Ensuring your sprinkler systems are primed and ready to respond instantly to any fire threat.",
                        img: "monthlysprinkler.webp"
                      },
                      {
                        title: "Fire Extinguisher Tagging",
                        desc: "Inspection and tagging of all fire extinguishers to verify they meet strict Australian safety standards.",
                        img: "fireestinguishertagging.webp"
                      },
                      {
                        title: "Emergency Lighting 90-Minute Test",
                        desc: "Thorough testing of emergency lighting systems to ensure safe evacuation routes during power failures.",
                        img: "emergencylighting90.webp"
                      },
                      {
                        title: "Smoke Alarm Test",
                        desc: "Testing and maintenance of smoke alarms for early detection and maximum protection.",
                        img: "smokealarmtest.webp"
                      }
                    ].map((card, index) => (
                      <MotionDiv
                        key={index}
                        className="products_card home-hover-card"
                        initial={{ opacity: 1, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.5,
                          delay: Math.min(index, 6) * 0.055,
                          ease: "easeOut",
                        }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                      >
                        <Link tabIndex={-1} aria-hidden="true" href="/services" className="products_link w-inline-block"></Link>
                        <div className="products_image-wrap" style={{ minHeight: '130px', height: '130px', position: 'relative' }}>
                          <div className="products_badge-wrap" style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2 }}>
                            <div className="badge is-white is-shadow" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.4rem', borderRadius: '4px', background: '#fff', fontSize: '0.65rem' }}>
                              <div className="icon-embed-xxsmall w-richtext" style={{ width: '14px', height: '14px' }}>
                                <div className="w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C12 2 8 6 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 6 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                              </div>
                              <div>All Fire Services</div>
                            </div>
                          </div>
                          <Image fill src={`/Fireprotectionservicesimage/${card.img}`} sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 25vw" alt={card.title} className="products_image" style={{ objectFit: 'cover', height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} />
                        </div>
                        <div className="products_info-wrap" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
                          <div className="products_content-link-wrap">
                            <div className="text-size-small" style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fire Protection Services</div>
                            <div className="products_header-wrap">
                              <h2 className="heading-style-h6" style={{ fontSize: '1rem', margin: '0.3rem 0', fontWeight: 'bold', color: '#111' }}>{card.title}</h2>
                            </div>
                          </div>
                          <div className="text-size-small text-weight-light text-style-3lines w-richtext" style={{ fontSize: '0.8rem', color: '#444', lineHeight: '1.4' }}>
                            <p>{card.desc}</p>
                          </div>
                        </div>
                      </MotionDiv>
                    ))}
                  </div>

                    <div className="home-static-card" style={{ textAlign: 'center', maxWidth: '900px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                      <div className="header-eyebrow-text" style={{ color: '#ff5722', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>Beyond the Basics</div>
                      <h3 className="heading-style-h3" style={{ margin: 0, fontSize: '1.5rem', color: '#111' }}>And So Much More</h3>
                      <p className="body-text" style={{ margin: '0 auto', maxWidth: '750px', fontSize: '0.9rem', color: '#333', lineHeight: '1.6' }}>
                        In addition to our comprehensive range of fire protection services, we also offer a selection of top-quality fire protection products, including fire extinguishers, smoke alarms, and emergency lighting.
                      </p>
                      <div style={{ width: '100%', padding: '1.25rem', backgroundColor: '#fafafa', border: '1px solid #f0f0f0', borderRadius: '12px', marginTop: '1rem' }}>
                        <div className="header-eyebrow-text" style={{ color: '#ff5722', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>Proud Member of FPAA &amp; Licensed For:</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
                          {[
                            "Fire Detection and Alarm Systems",
                            "Fire Hydrant Systems",
                            "Fire Pumpsets",
                            "Fire Seals and Collars",
                            "Fire Sprinkler Systems",
                            "Pre-engineered Fire Suppression System (Non Gaseous)",
                            "Exit and Emergency Lighting",
                            "Fire and Smoke Doors",
                            "Portable Fire Equipment and Fire Hose Reels"
                          ].map((license, i) => (
                            <span key={i} style={{ padding: '0.35rem 0.8rem', backgroundColor: '#ffffff', borderRadius: '30px', border: '1px solid #e5e7eb', fontSize: '0.75rem', color: '#111', fontWeight: '500', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                              {license} (C)
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="button-group" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                        <a
                          data-wf--button--size="small"
                          href="/services"
                          className="button-wrap w-variant-0fa6310e-3b03-4614-cc31-5599b3d7993a w-inline-block"
                        >
                          <div data-wf--button-style-- className="button-content">
                            <div
                              data-wf--button-layout--layout="normal"
                              className="button-layout"
                            >
                              <div className="button-text">View all services</div>
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
                </div>
              </div>
            </div>
          </div>
        </MotionSection>
        {/* â”€â”€ Premium Fire Services â”€â”€ */}        <MotionSection
          {...sectionReveal}
          data-theme="light"
          style={{ background: "#fff", padding: "80px 0" }}
        >
          <style>{`
          .prc-wrap { max-width:1200px; margin:0 auto; padding:0 2rem; }
          .prc-header { text-align:center; margin-bottom:48px; }
          .prc-header h2 { color:#111; margin:0 0 1.5rem; }
          .prc-header p { color:#444; max-width:480px; margin:0 auto; line-height:1.6; }
        `}</style>
          <div className="prc-wrap">
            <div className="prc-header">
              <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                OUR SERVICES
              </div>
              <h2 className="heading-style-h3">Premium Fire Services</h2>
              <p className="body-text">
                Engineered for durability and designed for comfort. Explore our
                range of essential fire safety measures.
              </p>
            </div>
            <PortraitVideoGallery />
          </div>
        </MotionSection>

        {/* ── WHY ALLFIRE SERVICES ── */}
        <MotionSection
          {...sectionReveal}
          id="why-allfire-services"
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%', minHeight: 'auto', backgroundColor: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
          {/* Left Side: Content */}
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 6%' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                WHY ALLFIRE SERVICES SYDNEY
              </div>
              <h2 className="heading-style-h3" style={{ marginBottom: '1.25rem', color: '#111', fontSize: '1.75rem', whiteSpace: 'nowrap' }}>
                WHY ALLFIRE SERVICES?
              </h2>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5722" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                  <div>
                    <span className="body-text" style={{ color: '#444444', display: 'block', fontSize: '0.85rem' }}>
                      To ensure our Clients receive extensive and real-life knowledge of the fire safety industry, All Fire Services was founded with the unique concept to provide Professional Firefighters both serving and retired to be our Customer Service Technicians. These people are Professional, Experienced and Highly Motivated to provide a level of Service and Safety to the Community unequalled by our competition.
                    </span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5722" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                  <div>
                    <span className="body-text" style={{ color: '#444444', display: 'block', fontSize: '0.85rem' }}>
                      If you are not sure of the safety of your building and wondering if you’re compliant to Australian Standards, find your existing AFS statement or council letter then talk to us so we can discuss how we can make your building up to the standards to ensure safety.
                    </span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff5722" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                  <div>
                    <strong className="body-text" style={{ color: '#111111', display: 'block', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      We are ready to help you out! Call us today at 1300 765 594
                    </strong>
                  </div>
                </li>
              </ul>
              
              <div className="button-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <a
                  data-wf--button--size="small"
                  href="tel:1300765594"
                  className="button-wrap w-inline-block"
                >
                  <div
                    data-wf--button-style--
                    className="button-content"
                  >
                    <div
                      data-wf--button-layout--layout="normal"
                      className="button-layout"
                    >
                      <div className="button-text">
                        Call 1300 765 594
                      </div>
                      <div className="button-icon">
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
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  data-wf--button--size="small"
                  href="/contact"
                  className="button-wrap w-inline-block"
                >
                  <div
                    data-wf--button-style--
                    className="button-content w-variant-2322bba7-d743-d5ae-17b2-3a616235fc2a"
                  >
                    <div
                      data-wf--button-layout--layout="normal"
                      className="button-layout"
                    >
                      <div className="button-text">
                        Get a Quote
                      </div>
                      <div className="button-icon">
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
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div style={{ flex: '1 1 50%', minWidth: '300px', minHeight: '350px', position: 'relative' }}>
            <Image
              fill
              src="/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp"
              alt="Why All Fire Services Sydney"
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </MotionSection>

        <MotionDiv {...sectionReveal}>
          <ClientFeedback />
        </MotionDiv>
        <MotionDiv {...sectionReveal}>
          <FAQ />
        </MotionDiv>

        <MotionDiv {...sectionReveal}>
          <ContactCTA />
        </MotionDiv>
        </div>
        </div>
      </main>
    </MotionConfig>
  );
}
