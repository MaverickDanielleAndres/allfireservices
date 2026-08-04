import Image from "next/image";
import Link from "next/link";

import { MotionSection } from "@/components/MotionPrimitives";

import styles from "./HomeServices.module.css";

const services = [
  {
    title: "Yearly Hydrant Flow Test",
    description:
      "We measure hydrant pressure and flow so your building has a dependable water supply when it matters most.",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
    imageAlt: "All Fire Services technician carrying out a hydrant flow test",
    tags: ["Annual test", "Hydrant systems"],
    frequency: "Tested to Australian Standards",
  },
  {
    title: "Annual Fire Safety Statement",
    description:
      "End-to-end inspection coordination and compliance support for a clear, properly prepared AFSS submission.",
    image: "/Fireprotectionservicesimage/annualfiresafety.webp",
    imageAlt: "NSW annual fire safety statement documentation",
    tags: ["Compliance", "Annual"],
    frequency: "Assessment and certification support",
  },
  {
    title: "Monthly Fire Inspection",
    description:
      "Regular checks of fire panels and essential systems help identify faults before they become bigger risks.",
    image: "/Fireprotectionservicesimage/monthlyfireprotection.webp",
    imageAlt: "All Fire Services fire indicator panel under inspection",
    tags: ["Inspection", "Monthly"],
    frequency: "Routine system checks",
  },
  {
    title: "Monthly Diesel Pump Inspection",
    description:
      "Practical pump checks help keep critical water-based fire systems ready to perform under emergency demand.",
    image: "/Fireprotectionservicesimage/monthlydieselpumpprotection.webp",
    imageAlt: "Diesel fire pump and pipework in a building plant room",
    tags: ["Fire pumps", "Monthly"],
    frequency: "Operational readiness testing",
  },
  {
    title: "Monthly Sprinkler System Inspection",
    description:
      "Valves, gauges and sprinkler controls are checked to support reliable activation and ongoing compliance.",
    image: "/Fireprotectionservicesimage/monthlysprinkler.webp",
    imageAlt: "Fire sprinkler valves, controls and pressure gauges",
    tags: ["Sprinklers", "Monthly"],
    frequency: "Valves, gauges and controls",
  },
  {
    title: "Fire Extinguisher Tagging",
    description:
      "Portable fire equipment is inspected, tested and tagged so it remains accessible, serviceable and compliant.",
    image: "/Fireprotectionservicesimage/fireestinguishertagging.webp",
    imageAlt: "Fire extinguisher maintenance tag being inspected",
    tags: ["Equipment", "Compliance"],
    frequency: "Inspection and maintenance tagging",
  },
  {
    title: "Emergency Lighting 90-Minute Test",
    description:
      "A full discharge test confirms exit and emergency lighting can guide occupants safely through a power failure.",
    image: "/Fireprotectionservicesimage/emergencylighting90.webp",
    imageAlt: "Emergency lighting fitting undergoing a 90-minute test",
    tags: ["Emergency lighting", "90 min"],
    frequency: "Discharge and function test",
  },
  {
    title: "Smoke Alarm Test",
    description:
      "Alarm operation and detection are tested to help provide the earliest possible warning throughout the property.",
    image: "/Fireprotectionservicesimage/smokealarmtest.webp",
    imageAlt: "Technician testing a ceiling-mounted smoke detector",
    tags: ["Detection", "Testing"],
    frequency: "Alarm and detector checks",
  },
];

const reveal = {
  initial: { opacity: 1, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

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
          <p className={styles.kicker}>Our services</p>
          <h2 id="home-services-title">
            Uncompromising fire safety.<br />
            <span className={styles.gradientText}>Certified</span>, compliant, and<br />
            always ready.
          </h2>
          <p>
            Empowering strata managers, building owners, and businesses across Greater Sydney 
            with industry-leading inspections, rigorous testing, expert maintenance, and 
            seamless annual certifications.
          </p>
        </header>

        <div className={styles.capabilityStrip}>
          <Image
            src="/fpa-capability-strip.webp"
            alt="FPA Capability Strip"
            width={0}
            height={0}
            sizes="100vw"
            className={styles.capabilityImage}
          />
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link href="/services" className={styles.card} key={service.title}>
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
                <h3 className={styles.cardTitle}>{service.title}</h3>
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
