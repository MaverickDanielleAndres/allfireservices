import Image from "next/image";
import Link from "next/link";

import RevealOnView from "@/components/RevealOnView";

import styles from "./HomeServices.module.css";

const services = [
  {
    title: "Annual Fire Safety Statement",
    href: "/annual-fire-safety-statement",
    image: "/services/AFSS.png",
    imageAlt: "NSW annual fire safety statement documentation",
  },
  {
    title: "Fire Panels & Alarms",
    href: "/services?category=fire-panel",
    image: "/services/Fire%20Panel%20%26Detection%20(AS%201670.1).jpg",
    imageAlt: "All Fire Services fire indicator panel under inspection",
  },
  {
    title: "Smoke Detectors",
    href: "/services?category=smoke-alarms",
    image: "/services/Smoke%20Alarms(AS%203786).png",
    imageAlt: "Technician testing a ceiling-mounted smoke detector",
  },
  {
    title: "Fire Doors",
    href: "/services?category=fire-doors",
    image: "/services/firedoor.jpg",
    imageAlt: "All Fire Services technicians on site",
  },
  {
    title: "Fire Extinguishers",
    href: "/services?category=fire-extinguishers",
    image: "/services/Fire%20extinguishers.jpg",
    imageAlt: "Fire extinguisher maintenance tag being inspected",
  },
  {
    title: "Emergency Lights",
    href: "/services?category=emergency-lights",
    image: "/services/emergencylights.jpg",
    imageAlt: "Emergency lighting fitting undergoing a 90-minute test",
  },
  {
    title: "Fire Hose Reels",
    href: "/services",
    image: "/services/firehose.png",
    imageAlt: "All Fire Services hydrant and hose system",
  },
  {
    title: "Diesel / Hydrant / Sprinkler",
    href: "/services?category=diesel-pump",
    image: "/services/diesel%20hydrant.jpg",
    imageAlt: "Diesel fire pump and pipework in a building plant room",
  },
  {
    title: "Air & Mechanical Services",
    href: "/services?category=air-mechanical",
    image: "/services/mechanical.jpg",
    imageAlt: "Fire services pipework, valves and pressure gauges",
  },
  {
    title: "Flow Testing",
    href: "/services?category=flow-testing",
    image: "/services/flowtest.jpg",
    imageAlt: "All Fire Services technician carrying out a hydrant flow test",
  },
  {
    title: "Fire Penetration",
    href: "/services?category=service-penetration",
    image: "/services/passivefire.jpg",
    imageAlt: "Fire safety inspection being carried out on site",
  },
  {
    title: "Zone Block / Evacuation / Hydrant & Sprinkler Plans",
    href: "/services?category=plans",
    image: "/services/zoneblockplan.jpg",
    imageAlt: "Zone block plan and evacuation diagram for a building",
    smallTitle: true,
  },
];

export default function HomeServices() {
  return (
    <RevealOnView
      threshold={0.08}
      className={styles.section}
    >
      <section
        id="home-services"
        aria-labelledby="home-services-title"
      >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.kicker}>What we do</p>
          <h2 id="home-services-title">
            <span>Our Fire Protection</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Services
            </span>
          </h2>
          <p>
            Everything you need to keep your property protected, compliant, and ready.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link href={service.href} className={styles.card} key={service.title}>
              <div className={styles.cardMedia}>
                <Image
                  fill
                  unoptimized
                  src={service.image}
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 25vw"
                  alt={service.imageAlt}
                  className={styles.image}
                />
                <div className={styles.hoverOverlay}>
                  <div className={styles.arrowIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={`${styles.cardTitle} ${service.smallTitle ? styles.cardTitleSmall : ''}`}>{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/services" className={styles.viewMore}>
            View more services
          </Link>
        </div>
      </div>
      </section>
    </RevealOnView>
  );
}
