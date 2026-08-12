import Image from "next/image";
import Link from "next/link";

import RevealOnView from "@/components/RevealOnView";
import { services } from "@/lib/services";

import styles from "./HomeServices.module.css";

// Long names get a smaller card title so they stay on two lines rather than
// running three or four lines deep on narrow cards.
const SMALL_TITLE_THRESHOLD = 28;

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
            <Link href={service.href} className={styles.card} key={service.id}>
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
                <h3
                  className={`${styles.cardTitle} ${
                    service.name.length > SMALL_TITLE_THRESHOLD
                      ? styles.cardTitleSmall
                      : ""
                  }`}
                >
                  {service.name}
                </h3>
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
