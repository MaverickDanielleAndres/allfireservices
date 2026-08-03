import { Metadata } from "next";
import ClientGrid from "@/components/ClientGrid";
import HandshakeTestimonials from "@/components/HandshakeTestimonials";
import AboutClients from "@/components/AboutClients";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Our Clients",
  description: "Trusted by property teams, strata managers, and facility owners across Sydney. See how AllFire protects properties and people.",
};

export default function OurClientsPage() {
  return (
    <main className="main-wrapper">
      <main className="scroll-wrapper">
        <header 
          className="section_about-hero is-dark"
          style={{ 
            backgroundImage: 'url("/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            marginTop: '-12rem',
            paddingTop: '12rem',
          }}
        >
          {/* Dark Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />

          <div className="padding-global" style={{ position: 'relative', zIndex: 1 }}>
            <div className="container-large">
              <div className="padding-section-large is-about" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper flex flex-col md:flex-row justify-between">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text" style={{ color: '#FEAF04', fontWeight: 600, marginBottom: '1rem' }}>
                        Trusted Across Sydney
                      </div>
                      <h1 
                        className="heading-style-h1"
                        style={{ 
                          color: '#ffffff', 
                          fontWeight: 900, 
                          textTransform: 'uppercase',
                          lineHeight: 1.1,
                          fontSize: 'clamp(3rem, 5vw, 4.5rem)'
                        }}
                      >
                        Our Clients
                      </h1>
                    </div>
                    <div className="hero_content-right mt-6 md:mt-0 max-w-md">
                      <p className="text-gray-300 text-lg leading-relaxed font-medium">
                        Trusted by property teams, strata managers, and facility owners across Sydney. See how AllFire protects properties and people.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white">
          <ClientGrid />
          <HandshakeTestimonials />
          <AboutClients />
          <ContactCTA />
        </div>
      </main>
    </main>
  );
}
