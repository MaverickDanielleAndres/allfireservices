"use client";

import { Building2 } from "lucide-react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import Link from "next/link";
import { MotionSection } from "@/components/MotionPrimitives";
import styles from "./HomeServices.module.css";

const strataBuildings: CardItem[] = [
  {
    id: "randwick",
    title: "Randwick",
    description: "Servicing premium strata blocks and residential complexes in Randwick.",
    imgSrc: "/stratapage-cropped/1-all-fire-services-welcome-randwick.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
  {
    id: "enmore",
    title: "Enmore",
    description: "Reliable fire safety maintenance for historic and modern buildings in Enmore.",
    imgSrc: "/stratapage-cropped/2-all-fire-services-welcome-enmore.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
  {
    id: "greenacre",
    title: "Greenacre",
    description: "Comprehensive fire protection for commercial and residential strata in Greenacre.",
    imgSrc: "/stratapage-cropped/3-all-fire-services-welcome-greenacre.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
  {
    id: "haberfield",
    title: "Haberfield",
    description: "Trusted strata fire services preserving Haberfield's unique heritage properties.",
    imgSrc: "/stratapage-cropped/4-all-fire-services-welcome-haberfield.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
  {
    id: "chippendale",
    title: "Chippendale",
    description: "Modern fire compliance solutions for vibrant Chippendale apartments.",
    imgSrc: "/stratapage-cropped/5-all-fire-services-welcome-chippendale.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
  {
    id: "rockdale",
    title: "Rockdale",
    description: "Expert annual fire safety statements for Rockdale strata communities.",
    imgSrc: "/stratapage-cropped/6-all-fire-services-welcome-rockdale.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
  {
    id: "waterloo",
    title: "Waterloo",
    description: "Large-scale fire system management for expansive Waterloo developments.",
    imgSrc: "/stratapage-cropped/7-all-fire-services-welcome-waterloo.webp",
    icon: <Building2 size={24} />,
    linkHref: "#",
  }
];

export default function StrataSection() {
  return (
    <MotionSection 
      className={styles.section}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.kicker}>Where we work</p>
          <h2>
            Strata and <span style={{ color: '#fb5614' }}>landmark</span><br />
            <span style={{ color: '#fb5614' }}>buildings</span> we service
          </h2>
          <p>
            Across Greater Sydney, from single blocks to whole portfolios.
          </p>
        </header>

        <ExpandingCards items={strataBuildings} defaultActiveIndex={0} />

        <div className={styles.footer}>
          <Link 
            href="/our-clients" 
            className={styles.viewMore}
          >
            View all Strata
          </Link>
        </div>
      </div>
    </MotionSection>
  );
}
