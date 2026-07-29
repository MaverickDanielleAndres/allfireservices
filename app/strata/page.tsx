"use client";
import ContactCTA from "@/components/ContactCTA";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const strataImages = [
  "/stratapage/1-all-fire-services-welcome-randwick.webp",
  "/stratapage/2-all-fire-services-welcome-enmore.webp",
  "/stratapage/3-all-fire-services-welcome-greenacre.webp",
  "/stratapage/4-all-fire-services-welcome-haberfield.webp",
  "/stratapage/5-all-fire-services-welcome-chippendale.webp",
  "/stratapage/6-all-fire-services-welcome-rockdale.webp",
  "/stratapage/7-all-fire-services-welcome-waterloo.webp",
  "/stratapage/8-all-fire-services-welcome-marrickville.webp",
  "/stratapage/9-all-fire-services-welcome-marrickville.webp",
  "/stratapage/10-all-fire-services-welcome-stanmore.webp",
  "/stratapage/11-all-fire-services-welcome-bondi.webp",
  "/stratapage/12-all-fire-services-welcome-alexandria.webp",
  "/stratapage/30-all-fire-services-welcome-north-sydney.png",
  "/stratapage/1welcome-to-fireman-family.png",
  "/stratapage/2welcome-to-fireman-family.png",
  "/stratapage/3welcome-to-fireman-family.png",
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const shouldReduceMotion = useReducedMotion();

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
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

        <div data-theme="light" className="section_process" style={{ padding: '60px 0', background: '#fff' }}>
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
                      {imagesToShow.map((imgSrc, idx) => (
                        <div key={idx} className="strata-grid-item">
                          <Image 
                            src={imgSrc} 
                            alt={`Strata location ${idx + 1}`} 
                            fill 
                            sizes="(max-width: 767px) 42vw, (max-width: 1023px) 28vw, 22vw"
                            style={{ objectFit: 'contain' }} 
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <nav className="strata-pagination" aria-label="Strata gallery pages">
                <button 
                  type="button"
                  onClick={() => handlePageChange(1)} 
                  className={`strata-page-button transition-all duration-300 ${currentPage === 1 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#ddd] text-[#333] hover:bg-red-500 hover:text-white'}`}
                  aria-label="Show strata gallery page 1"
                  aria-current={currentPage === 1 ? "page" : undefined}
                  style={{ 
                    borderRadius: '50%', 
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                  1
                </button>
                <button 
                  type="button"
                  onClick={() => handlePageChange(2)} 
                  className={`strata-page-button transition-all duration-300 ${currentPage === 2 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#ddd] text-[#333] hover:bg-red-500 hover:text-white'}`}
                  aria-label="Show strata gallery page 2"
                  aria-current={currentPage === 2 ? "page" : undefined}
                  style={{ 
                    borderRadius: '50%', 
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                  2
                </button>
              </nav>



            </div>
          </div>
        </div>
        <ContactCTA />
      </div>
    </main>
  );
}
