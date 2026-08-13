"use client";

import { Building2 } from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import Link from "next/link";
import FreeSiteVisitButton from "@/components/free-site-visit/FreeSiteVisitButton";
import { MotionSection } from "@/components/MotionPrimitives";
import styles from "./HomeServices.module.css";

const strataBuildings: CardItem[] = [
  {
    id: "bondi",
    title: "Bondi",
    description: "Servicing premium strata blocks and residential complexes in Bondi.",
    imgSrc: "/stratapage-cropped/11-all-fire-services-welcome-bondi.webp",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
  {
    id: "marrickville1",
    title: "Marrickville",
    description: "Reliable fire safety maintenance for historic and modern buildings in Marrickville.",
    imgSrc: "/stratapage-cropped/9-all-fire-services-welcome-marrickville.webp",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
  {
    id: "waterloo",
    title: "Waterloo",
    description: "Large-scale fire system management for expansive Waterloo developments.",
    imgSrc: "/stratapage-cropped/7-all-fire-services-welcome-waterloo.webp",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
  {
    id: "haberfield",
    title: "Haberfield",
    description: "Trusted strata fire services preserving Haberfield's unique heritage properties.",
    imgSrc: "/stratapage-cropped/4-all-fire-services-welcome-haberfield.webp",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
  {
    id: "randwick",
    title: "Randwick",
    description: "Comprehensive fire safety services for Randwick's apartments and strata buildings.",
    imgSrc: "/stratapage-cropped/randwick-building.webp",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
  {
    id: "rosebay",
    title: "Rose Bay",
    description: "Specialist fire protection for premium Rose Bay residential complexes.",
    imgSrc: "/stratapage-cropped/1welcome-to-fireman-family.png",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
  {
    id: "alexandria",
    title: "Alexandria",
    description: "Modern fire compliance solutions for vibrant Alexandria apartments.",
    imgSrc: "/stratapage-cropped/12-all-fire-services-welcome-alexandria.webp",
    icon: <Building2 size={24} />,
    linkHref: "/our-clients",
  },
];

export default function StrataSection() {
  return (
    <MotionSection
      className={styles.section}
      style={{ marginTop: "clamp(1.5rem, 2.5vw, 2.5rem)", paddingTop: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.kicker}>Where we work</p>
          <h2>
            Strata and <span style={{ color: '#ff2a00' }}>Buildings</span><br />
            <span style={{
              background: 'linear-gradient(to right, #ff2a00, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>we service</span>
          </h2>
          <p>
            Trusted fire protection for strata communities, commercial buildings, and managed properties across Greater Sydney.
          </p>
        </header>

        <ExpandingCards
          items={strataBuildings}
          defaultActiveIndex={0}
          className={styles.expandingCardsRow}
        />

        <div className={styles.footer}>
          <Link
            href="/our-clients"
            className={styles.viewMore}
          >
            View all Strata
          </Link>
          <FreeSiteVisitButton
            source="strata"
            pulse
            className={`${styles.viewMore} ${styles.hideOnMobile}`}
            style={{ marginLeft: "0.75rem" }}
            label="Free Site Visit"
          />
        </div>
      </div>
    </MotionSection>
  );
}
