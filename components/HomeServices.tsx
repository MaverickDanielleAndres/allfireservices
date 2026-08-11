import Image from "next/image";
import Link from "next/link";

import RevealOnView from "@/components/RevealOnView";

import styles from "./HomeServices.module.css";

const services = [
  {
    title: "AFSS",
    href: "/annual-fire-safety-statement",
    image: "/services/AFSS.png",
    imageAlt: "NSW annual fire safety statement documentation",
    tags: ["Compliance"],
  },
  {
    title: "FIRE PANEL/ALARMS 1670.1",
    href: "/services?category=fire-panel",
    image: "/services/Fire%20Panel%20%26Detection%20(AS%201670.1).jpg",
    imageAlt: "All Fire Services fire indicator panel under inspection",
    tags: ["Detection"],
  },
  {
    title: "Smoke detects AS 3876",
    href: "/services?category=smoke-alarms",
    image: "/services/Smoke%20Alarms(AS%203786).png",
    imageAlt: "Technician testing a ceiling-mounted smoke detector",
    tags: ["Detection"],
  },
  {
    title: "Fire Doors",
    href: "/services?category=fire-doors",
    image: "/services/firedoor.jpg",
    imageAlt: "All Fire Services technicians on site",
    tags: ["Passive fire"],
  },
  {
    title: "Fire extinguishers",
    href: "/services?category=fire-extinguishers",
    image: "/services/Fire%20extinguishers.jpg",
    imageAlt: "Fire extinguisher maintenance tag being inspected",
    tags: ["Equipment"],
  },
  {
    title: "EMERGENCY LIGHTS",
    href: "/services?category=emergency-lights",
    image: "/services/emergencylights.jpg",
    imageAlt: "Emergency lighting fitting undergoing a 90-minute test",
    tags: ["Emergency lighting"],
  },
  {
    title: "FIRE HOSE REELS",
    href: "/services",
    image: "/services/firehose.jpg",
    imageAlt: "All Fire Services hydrant and hose system",
    tags: ["Equipment"],
  },
  {
    title: "DIESEL / HYDRANT / SPRINKLER",
    href: "/services?category=diesel-pump",
    image: "/services/diesel%20hydrant.jpg",
    imageAlt: "Diesel fire pump and pipework in a building plant room",
    tags: ["Fire pumps"],
  },
  {
    title: "AIR MECHANICAL SERVICES",
    href: "/services?category=air-mechanical",
    image: "/services/mechanical.jpg",
    imageAlt: "Fire services pipework, valves and pressure gauges",
    tags: ["Mechanical"],
  },
  {
    title: "Flow test",
    href: "/services?category=flow-testing",
    image: "/services/flowtest.jpg",
    imageAlt: "All Fire Services technician carrying out a hydrant flow test",
    tags: ["Testing"],
  },
  {
    title: "Fire Penetration",
    href: "/services?category=service-penetration",
    image: "/services/passivefire.jpg",
    imageAlt: "Fire safety inspection being carried out on site",
    tags: ["Passive fire"],
  },
  {
    title: "ZONE BLOCK PLAN / EVACUATION PLAN / HYDRANT & SPRINKLER PLAN",
    href: "/services?category=plans",
    image: "/services/zoneblockplan.jpg",
    imageAlt: "Zone block plan and evacuation diagram for a building",
    tags: ["Plans"],
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
            Our Fire<br />
            <span style={{ color: '#ff2a00' }}>Protection</span> <span style={{
              background: 'linear-gradient(to right, #ff2a00, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Services
            </span>
          </h2>
          <p>
            Professional fire protection services designed to safeguard your people, property, and business.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link href={service.href} className={styles.card} key={service.title}>
              <div className={styles.cardMedia}>
                <Image
                  fill
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
                <span className={styles.tag}>
                  {service.tags[0] || "Fire Safety"}
                </span>
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
