"use client";

import Image from "next/image";
import styles from "@/components/HomeStoryLegacy.module.css";

// Mobile-only rule: center the "WHY SYDNEY TRUSTS ALLFIRE" header
// (kicker + h2 + intro paragraph) on phones so the section reads as a
// tidy intro block instead of a left-aligned slab. Desktop stays
// left-aligned to match the rest of the our-clients page layout.
const mobileHeaderCenterStyle = `
@media (max-width: 767px) {
  .clients-trust-header {
    text-align: center;
    justify-items: center;
    gap: 0.75rem;
  }
  .clients-trust-header > p:last-child {
    margin-left: auto;
    margin-right: auto;
  }
  .clients-trust-header h2 {
    margin-left: auto;
    margin-right: auto;
  }
}
`;

const gradientStyle = {
  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const sections = [
  {
    kicker: "EXPERTISE",
    title: <>Every Building.<br /><span style={gradientStyle}>Every Industry.</span></>,
    altTitle: "Every Building. Every Industry.",
    description: <>From strata communities to large industrial facilities, every property has different fire-safety requirements. We develop <strong>tailored protection and maintenance strategies</strong> that meet the specific compliance needs of each building.</>,
    image: "/buildingcompilation.jpg",
  },
  {
    kicker: "SAFETY FIRST",
    title: <>More Than<br /><span style={gradientStyle}>Compliance</span></>,
    altTitle: "More Than Compliance",
    description: <>Tick-box compliance isn’t enough. Fire safety is about <strong>protecting lives, property, and business continuity</strong>. We make sure your systems are properly maintained, tested, and ready when they’re needed most.</>,
    image: "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-sam-and-kyriakos-scaled-e1759978072618-2048x1536.webp",
  },
  {
    kicker: "RELATIONSHIPS",
    title: <>Partners, Not Just<br /><span style={gradientStyle}>Providers</span></>,
    altTitle: "Partners, Not Just Providers",
    description: <>Strong results come from trust, clear communication, and dependable service. Our clients rely on our <strong>firefighter-led expertise and practical advice</strong> to keep their properties safe without unnecessary disruption.</>,
    image: "/technician/group.jpg",
  },
  {
    kicker: "RELIABILITY",
    title: <>Here When You<br /><span style={gradientStyle}>Need Us</span></>,
    altTitle: "Here When You Need Us",
    description: <>From complex Annual Fire Safety Statements to urgent after-hours support, our team responds quickly and works efficiently to keep your <strong>fire protection systems compliant and operational</strong>.</>,
    image: "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-with-guildo-scaled-e1759978124384-2048x1536.webp",
  },
  {
    kicker: "OUR PROMISE",
    title: <>Confidence Comes<br /><span style={gradientStyle}>Standard</span></>,
    altTitle: "Confidence Comes Standard",
    description: <>Built on generations of frontline firefighting experience, we bring <strong>professional workmanship, honest advice, and uncompromising care</strong> to every job. That’s why property teams across Greater Sydney continue to trust All Fire Services.</>,
    image: "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/NEW-COFFE-LOGO-WITH-PETE-2048x1536.webp",
  },
];

export default function AboutClients() {
  return (
    <section className="bg-white">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large pb-4">

            <style dangerouslySetInnerHTML={{ __html: mobileHeaderCenterStyle }} />

            <header className={`${styles.legacyHeader} clients-trust-header`} style={{ marginTop: 0, marginBottom: 'clamp(5rem, 8vw, 8rem)' }}>
              <p className={styles.kicker}>WHY SYDNEY TRUSTS ALLFIRE</p>
              <h2 id="legacy-title" style={{ maxWidth: '14ch' }}>Delivering tailored<br /><span style={{
                background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>fire safety solutions</span></h2>
              <p>
                From routine testing to complex compliance upgrades, we provide end-to-end protection strategies built on real-world firefighting experience.
              </p>
            </header>

            {sections.map((section, idx) => {
              const isImageFirst = idx % 2 !== 0;
              const isHereWhenYouNeed = section.altTitle === "Here When You Need Us";

              return (
                <div key={idx} className={`${styles.newStoryGrid} ${isImageFirst ? styles.newStoryGridImageFirst : ''}`} style={{ marginBottom: idx === sections.length - 1 ? '4rem' : '10rem', alignItems: 'stretch' }}>

                  <div className={`relative w-full h-full min-h-[300px] max-h-[440px] rounded-[1.5rem] overflow-hidden m-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] order-2 ${isImageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Image src={section.image} alt={section.altTitle} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>

                  <div className={`${styles.newStoryContent} order-1 ${isImageFirst ? 'lg:order-2' : 'lg:order-1'} ${isHereWhenYouNeed ? styles.hereWhenYouNeed : ''}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <header
                      className={`${styles.storyHeaderLeft} ${isHereWhenYouNeed ? styles.legacyHeaderAbout : ''}`}
                      style={{ marginTop: 0, marginBottom: '1.5rem', maxWidth: 'none', width: '100%' }}
                    >
                      <p className={styles.kickerLeft} style={{ textTransform: 'uppercase' }}>{section.kicker}</p>
                      <h2 className="section-heading">
                        {section.title}
                      </h2>
                    </header>
                    <p className={`text-[#111111] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.55] ${isHereWhenYouNeed ? 'text-left' : ''}`} style={{ marginBottom: '1.5rem' }}>
                      {section.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
