import ContactCTA from "@/components/ContactCTA";
import SitewideCTA from "@/components/SitewideCTA";

export default function Page() {
  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header 
          className="section_about-hero is-dark" 
          style={{ 
            backgroundImage: 'url("/herosectionimage.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            marginBottom: '4rem',
            marginTop: '-12rem',
            paddingTop: '12rem',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          <div className="padding-global" style={{ position: 'relative', zIndex: 1 }}>
            <div className="container-large">
              <div className="padding-section-large is-about" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        Contact Us
                      </div>
                      <h1 
                        className="heading-style-h1"
                        style={{ 
                          color: '#ffffff', 
                          fontWeight: 900, 
                          textTransform: 'uppercase',
                          lineHeight: 1.1 
                        }}
                      >
                        CONTACT
                      </h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet" style={{ color: '#FEAF04', fontWeight: 600 }}>
                        Contact Us
                      </div>
                      <p className="body-text" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Get in touch with All Fire Services today. Our team of experts is ready to assist you with all your fire protection and compliance needs across Sydney.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <ContactCTA hideSitewideCTA={true} />
        <SitewideCTA />
      </div>
    </main>
  );
}
