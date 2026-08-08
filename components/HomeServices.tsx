import Image from "next/image";
import Link from "next/link";

import { MotionSection } from "@/components/MotionPrimitives";

import styles from "./HomeServices.module.css";

const services = [
  {
    title: "AFSS",
    href: "/annual-fire-safety-statement",
    image: "/services-wix/afss.jpg",
    imageAlt: "NSW annual fire safety statement documentation",
    tags: ["Compliance"],
  },
  {
    title: "FIRE PANEL/ALARMS 1670.1",
    href: "/services?category=fire-panel",
    image: "/services-wix/fire-panel.jpg",
    imageAlt: "All Fire Services fire indicator panel under inspection",
    tags: ["Detection"],
  },
  {
    title: "Smoke detects AS 3876",
    href: "/services?category=smoke-alarms",
    image: "/services-wix/smoke-detectors.jpg",
    imageAlt: "Technician testing a ceiling-mounted smoke detector",
    tags: ["Detection"],
  },
  {
    title: "Fire Doors",
    href: "/services?category=fire-doors",
    image: "/services-wix/fire-doors.jpg",
    imageAlt: "All Fire Services technicians on site",
    tags: ["Passive fire"],
  },
  {
    title: "Fire extinguishers",
    href: "/services?category=fire-extinguishers",
    image: "/services-wix/fire-extinguishers.jpg",
    imageAlt: "Fire extinguisher maintenance tag being inspected",
    tags: ["Equipment"],
  },
  {
    title: "EMERGENCY LIGHTS",
    href: "/services?category=emergency-lights",
    image: "/services-wix/emergency-lighting.jpg",
    imageAlt: "Emergency lighting fitting undergoing a 90-minute test",
    tags: ["Emergency lighting"],
  },
  {
    title: "FIRE HOSE REELS",
    href: "/services",
    image: "/services-wix/fire-hose-reels.jpg",
    imageAlt: "All Fire Services hydrant and hose system",
    tags: ["Equipment"],
  },
  {
    title: "DIESEL / HYDRANT / SPRINKLER",
    href: "/services?category=diesel-pump",
    image: "/services-wix/diesel-hydrant.jpg",
    imageAlt: "Diesel fire pump and pipework in a building plant room",
    tags: ["Fire pumps"],
  },
  {
    title: "AIR MECHANICAL SERVICES",
    href: "/services?category=air-mechanical",
    image: "/services-wix/mechanical.jpg",
    imageAlt: "Fire services pipework, valves and pressure gauges",
    tags: ["Mechanical"],
  },
  {
    title: "Flow test",
    href: "/services?category=flow-testing",
    image: "/services-wix/flow-test.jpg",
    imageAlt: "All Fire Services technician carrying out a hydrant flow test",
    tags: ["Testing"],
  },
  {
    title: "Fire Penetration",
    href: "/services?category=service-penetration",
    image: "/services-wix/passive-fire.jpg",
    imageAlt: "Fire safety inspection being carried out on site",
    tags: ["Passive fire"],
  },
  {
    title: "ZONE BLOCK PLAN / EVACUATION PLAN / HYDRANT & SPRINKLER PLAN",
    href: "/services?category=plans",
    image: "/services-wix/block-plans.jpg",
    imageAlt: "Emergency evacuation signage being installed",
    tags: ["Plans"],
    smallTitle: true,
  },
];

const reveal = {
  initial: { opacity: 1, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

import React from "react";

const capabilityLogos = [
  { src: "/services-logo/fpa-bronze-member.webp", alt: "FPA Australia Bronze Member", width: 320, height: 140, isMain: true },
  { src: "/services-logo/fire-extinguishers.webp", alt: "Fire Extinguishers", width: 150, height: 150 },
  { src: "/services-logo/fire-hoses-reels.webp", alt: "Fire Hoses & Reels", width: 150, height: 150 },
  { src: "/services-logo/fire-hydrants-boosters.webp", alt: "Fire Hydrants & Boosters", width: 150, height: 150 },
  { src: "/services-logo/emergency-equipment.webp", alt: "Emergency Equipment", width: 150, height: 150 },
  { src: "/services-logo/fire-panels.webp", alt: "Fire Panels", width: 150, height: 150 },
  { src: "/services-logo/testing-compliance.webp", alt: "Testing & Compliance", width: 150, height: 150 },
];

export default function HomeServices() {
  return (
    <MotionSection
      {...reveal}
      id="home-services"
      className={styles.section}
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
            Everything you need to keep your property protected, compliant, and ready.
          </p>
        </header>

        <div className={styles.capabilityStrip}>
          {capabilityLogos.map((logo, index) => (
            <React.Fragment key={logo.src}>
              <div className={styles.capabilityLogoWrapper}>
                <Image
                  className={`${styles.capabilityLogoImage} ${logo.isMain ? styles.isMainLogo : ''}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                />
              </div>
              {index < capabilityLogos.length - 1 && (
                <div className={styles.capabilityDivider}></div>
              )}
            </React.Fragment>
          ))}
        </div>

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
    </MotionSection>
  );
}
