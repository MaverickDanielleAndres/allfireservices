"use client";
import ContactCTA from "@/components/ContactCTA";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./StrataGallery.module.css";

const strataImages = [
  { src: "/stratapage/1-all-fire-services-welcome-randwick.webp", name: "Randwick" },
  { src: "/stratapage/2-all-fire-services-welcome-enmore.webp", name: "Enmore" },
  { src: "/stratapage/3-all-fire-services-welcome-greenacre.webp", name: "Greenacre" },
  { src: "/stratapage/4-all-fire-services-welcome-haberfield.webp", name: "Haberfield" },
  { src: "/stratapage/5-all-fire-services-welcome-chippendale.webp", name: "Chippendale" },
  { src: "/stratapage/6-all-fire-services-welcome-rockdale.webp", name: "Rockdale" },
  { src: "/stratapage/7-all-fire-services-welcome-waterloo.webp", name: "Waterloo" },
  { src: "/stratapage/8-all-fire-services-welcome-marrickville.webp", name: "Marrickville" },
  { src: "/stratapage/9-all-fire-services-welcome-marrickville.webp", name: "Marrickville" },
  { src: "/stratapage/10-all-fire-services-welcome-stanmore.webp", name: "Stanmore" },
  { src: "/stratapage/11-all-fire-services-welcome-bondi.webp", name: "Bondi" },
  { src: "/stratapage/12-all-fire-services-welcome-alexandria.webp", name: "Alexandria" },
  { src: "/stratapage/30-all-fire-services-welcome-north-sydney.png", name: "North Sydney" },
  { src: "/stratapage/1welcome-to-fireman-family.png", name: "Rose Bay" },
  { src: "/stratapage/2welcome-to-fireman-family.png", name: "Randwick" },
  { src: "/stratapage/3welcome-to-fireman-family.png", name: "Glebe" },
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
      
      if (sectionRef.current) {
        const yOffset = -100; // offset for sticky header
        const y = sectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const imagesToShow = currentPage === 1 ? strataImages : strataImages.slice(0, 8);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0
      };
    }
  };

  return (
    <main className="main-wrapper">
      <div className="scroll-wrapper">
        <header data-theme="light" className="section_about-hero is-light">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large is-about" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="about-hero_component" style={{ height: 'auto', minHeight: 'unset' }}>
                  <div className="hero_content-wrapper">
                    <div className="hero_content-left">
                      <div className="header-eyebrow-text hide-desktop">
                        Strata Fire Safety
                      </div>
                      <h1 className="heading-style-h1">
                        STRATA
                      </h1>
                    </div>
                    <div className="hero_content-right">
                      <div className="header-eyebrow-text hide-tablet">
                        Strata Fire Safety
                      </div>
                      <p className="body-text">
                        Ensuring all strata common areas are fully compliant and safe for residents. We provide comprehensive fire safety audits, routine inspections, and expert maintenance for all residential complexes, ensuring complete peace of mind for strata managers and residents alike.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div ref={sectionRef} data-theme="light" className="section_process" style={{ padding: '60px 0', background: '#fff' }}>
          <div className="padding-global">
            <div className="container-large">
              
              <div className="strata-grid-shell">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    className="strata-grid-page"
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial={shouldReduceMotion ? false : "enter"}
                    animate="center"
                    exit={shouldReduceMotion ? undefined : "exit"}
                    transition={shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                  >
                    <div className="strata-grid">
                      {imagesToShow.map((image) => (
                        <div
                          key={image.src}
                          className={`strata-grid-item ${styles.galleryItem}`}
                          tabIndex={0}
                          aria-label={image.name}
                        >
                          <Image
                            src={image.src}
                            alt={`All Fire Services at ${image.name}`}
                            fill
                            sizes="(max-width: 767px) 42vw, (max-width: 1023px) 28vw, 22vw"
                            className={styles.galleryImage}
                          />
                          <span className={styles.galleryOverlay} aria-hidden="true">
                            <span className={styles.locationName}>{image.name}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <nav style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '3rem', marginBottom: '1rem' }} aria-label="Strata gallery pages">
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    type="button"
                    onClick={() => handlePageChange(1)} 
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none cursor-pointer border m-0 ${
                      currentPage === 1 
                        ? 'bg-[#E3000F] border-[#E3000F] !text-white' 
                        : 'bg-white border-gray-200 !text-gray-600 hover:!text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-label="Show strata gallery page 1"
                    aria-current={currentPage === 1 ? "page" : undefined}
                  >
                    Page 1
                  </button>
                  <button 
                    type="button"
                    onClick={() => handlePageChange(2)} 
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none cursor-pointer border m-0 ${
                      currentPage === 2 
                        ? 'bg-[#E3000F] border-[#E3000F] !text-white' 
                        : 'bg-white border-gray-200 !text-gray-600 hover:!text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-label="Show strata gallery page 2"
                    aria-current={currentPage === 2 ? "page" : undefined}
                  >
                    Page 2
                  </button>
                </div>
              </nav>



            </div>
          </div>
        </div>
        <ContactCTA />
      </div>
    </main>
  );
}
