"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const slides = [
  {
    title: "COMPLIANCE ASSURED",
    copy:
      "We help ensure your building meets all required fire safety standards. From detailed property inspections to the timely submission of your Annual Fire Safety Statements (AFSS), we keep everything properly documented and fully compliant with local council regulations.",
    visualTitle: "Inspection summary",
    visualIntro: "Here is what needs attention right now:",
    visualItems: [
      { label: "Fire doors, paths of travel, and essential measures reviewed", active: true },
      { label: "Priority defects separated from routine maintenance", active: true },
      { label: "Clear next actions prepared for sign-off", active: true },
      { label: "Reports ready for strata, managers, and owners", active: false },
    ],
  },
  {
    title: "EXPERIENCED & QUALIFIED TEAM",
    copy:
      "Our team is highly trained, licensed, and dedicated to safety. Led by current and former firefighting professionals, our technicians bring real-world emergency experience directly to your property, ensuring practical and reliable fire protection.",
    visualTitle: "Service path",
    visualIntro: "One accountable workflow:",
    visualItems: [
      { label: "Inspect and test the required fire safety measures", active: true },
      { label: "Record defects with practical repair guidance", active: true },
      { label: "Coordinate maintenance without handover confusion", active: true },
      { label: "Keep asset history easy to follow", active: false },
    ],
  },
  {
    title: "RELIABLE & ON TIME",
    copy:
      "We deliver our services on time, every time. We understand that compliance deadlines and tenant schedules can't wait, so we prioritize rapid response times, clear communication, and punctual maintenance visits.",
    visualTitle: "Compliance pack",
    visualIntro: "Prepared for final review:",
    visualItems: [
      { label: "Statement requirements checked against site records", active: true },
      { label: "Outstanding items called out early", active: true },
      { label: "Evidence organised for managers and certifiers", active: true },
      { label: "Final sign-off supported with clear reporting", active: false },
    ],
  },
  {
    title: "COMPREHENSIVE SERVICES",
    copy:
      "From inspections to AFSS, we cover all your fire safety needs. Whether you need emergency lighting checks, fire extinguisher testing, or complex sprinkler maintenance, we offer a complete suite of solutions under one roof.",
    visualTitle: "Support notes",
    visualIntro: "What you can expect:",
    visualItems: [
      { label: "Straight answers from people who know the site", active: true },
      { label: "Responsive scheduling for recurring testing", active: true },
      { label: "Clear updates when repairs are required", active: true },
      { label: "Ongoing care after final sign-off", active: false },
    ],
  },
  {
    title: "LOCAL SYDNEY EXPERTS",
    copy:
      "Proudly serving businesses and communities across Greater Sydney. As a locally owned and operated business, we understand the specific compliance challenges faced by strata managers and building owners across the metropolitan area.",
    visualTitle: "Local focus",
    visualIntro: "Sydney-wide coverage:",
    visualItems: [
      { label: "Rapid response times across Greater Sydney", active: true },
      { label: "Familiarity with local council requirements", active: true },
      { label: "Strong community and business relationships", active: true },
      { label: "On-the-ground support when needed", active: false },
    ],
  },
  {
    title: "QUALITY YOU CAN TRUST",
    copy:
      "We use best practices and quality systems you can rely on. Our rigorous internal auditing and commitment to industry-leading standards mean that every inspection, repair, and certification is performed with the highest level of accuracy and care.",
    visualTitle: "Quality assurance",
    visualIntro: "Our commitment to quality:",
    visualItems: [
      { label: "Strict adherence to safety best practices", active: true },
      { label: "Reliable and consistent service delivery", active: true },
      { label: "Continuous training for our technicians", active: true },
      { label: "Transparent and auditable processes", active: false },
    ],
  },
];

export default function WhyAllfireSticky() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.18, 0.86, 1], [0.86, 1, 1, 0.94]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 24, mass: 0.35 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const slideProgress = Math.min(0.999, Math.max(0, (latest - 0.22) / 0.56));
    const nextIndex = Math.floor(slideProgress * slides.length);
    setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
  });

  return (
    <section
      ref={sectionRef}
      id="why-allfire"
      className="why-allfire-section"
      aria-labelledby="why-allfire-title"
    >
      <div className="why-allfire-heading">
        <p className="why-allfire-eyebrow">Why All Fire Services Sydney</p>
        <h2 className="heading-style-h3 why-allfire-title" id="why-allfire-title">
          Keep your building safe, compliant, and ready.
        </h2>
        <p className="why-allfire-summary">
          All Fire Services helps strata managers, building owners, and businesses stay on top of fire safety obligations with practical inspections, testing, certification, and clear next steps.
        </p>
      </div>

      <div className="why-allfire-sticky">
        <motion.div className="why-allfire-panel" style={{ scale }}>
          <div className="why-allfire-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSlide.visualTitle}-visual`}
                className="why-allfire-visual"
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.34, ease: "easeOut" }}
              >
                <div className="why-allfire-card-topline">
                  <span className="why-allfire-spark" aria-hidden="true" />
                  <span>{activeSlide.visualTitle}</span>
                </div>
                <p className="why-allfire-card-intro">{activeSlide.visualIntro}</p>
                <ul className="why-allfire-card-list">
                  {activeSlide.visualItems.map((item) => (
                    <li key={item.label} className={item.active ? "is-active" : undefined}>
                      <span className="why-allfire-card-dot" aria-hidden="true" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSlide.title}-copy`}
                className="why-allfire-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.34, ease: "easeOut" }}
              >
                <h3>{activeSlide.title}</h3>
                <p>{activeSlide.copy}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="why-allfire-progress" aria-hidden="true">
            {slides.map((slide, index) => (
              <span key={slide.title} className={index === activeIndex ? "is-active" : undefined} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
