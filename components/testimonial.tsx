"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./testimonial.module.css";

const testimonials = [
  {
    brand: "Strata",
    quote:
      "All Fire Services keeps our annual fire safety statements moving without the last-minute stress. Their team explains what matters, turns up prepared, and follows through.",
    name: "Sarah Jenkins",
    role: "Strata Manager, Inner West Sydney",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-banner-technicians-scaled-e1759977593409-2048x1536.webp",
  },
  {
    brand: "Facilities",
    quote:
      "The difference is practical experience. When something needs attention, All Fire Services tells us what is urgent, what is compliant, and what can be planned properly.",
    name: "Mark Taylor",
    role: "Facilities Manager, Commercial Portfolio",
    image:
      "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
  },
  {
    brand: "Owners",
    quote:
      "They are reliable, clear, and easy to work with. We have confidence that our fire protection maintenance is being handled by people who understand real buildings.",
    name: "David Chen",
    role: "Building Owner, Greater Sydney",
    image:
      "/Fireprotectionservicesimage/monthlyfireprotection.webp",
  },
  {
    brand: "Compliance",
    quote:
      "All Fire Services helped us get our compliance records organised and kept our committee informed in plain language. That made approvals much easier.",
    name: "Lisa Wong",
    role: "Owners Corporation Secretary",
    image:
      "/annual-fire-safety-statement/fire-truck-all-fire-services.webp",
  },
  {
    brand: "Maintenance",
    quote:
      "Their technicians are punctual and professional. They leave useful notes after each inspection, which helps us stay ahead of defects before they become bigger issues.",
    name: "Michael Kavanagh",
    role: "Asset Manager, Sydney",
    image:
      "/Fireprotectionservicesimage/yearlyhydrantflowstate.webp",
  },
  {
    brand: "Support",
    quote:
      "We call All Fire Services because they respond quickly and give us direct answers. The firefighter-led knowledge shows in the way they solve problems on site.",
    name: "Paul Davis",
    role: "Operations Director, Property Group",
    image:
      "/hompageWE%20LOVE%20OUR%20COFFEE%20%26%20PETER%20LOVES%20THE%20TEAM%20SPIRIT/allfire-peter-and-paul-scaled-e1759978085539-2048x1536.webp",
  },
];

function ClientFeedback() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeTestimonial = testimonials[activeIndex];

  const controls = useMemo(
    () => ({
      previous: () =>
        setActiveIndex((current) =>
          current === 0 ? testimonials.length - 1 : current - 1,
        ),
      next: () =>
        setActiveIndex((current) =>
          current === testimonials.length - 1 ? 0 : current + 1,
        ),
    }),
    [],
  );

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(controls.next, 6200);
    return () => window.clearInterval(timer);
  }, [controls.next, reduceMotion]);

  return (
    <section className={styles.section} id="testimonials" aria-labelledby="testimonial-title">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Testimonials</p>
        <h2 className={styles.title} id="testimonial-title">
          Trusted by Sydney buildings that cannot afford fire safety guesswork
        </h2>
      </div>

      <div className={styles.stage}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial.name}
            className={styles.backdrop}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeTestimonial.image}
              alt=""
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className={styles.photo}
            />
            <div className={styles.scrim} />
          </motion.div>
        </AnimatePresence>

        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          type="button"
          aria-label="Previous testimonial"
          onClick={controls.previous}
        >
          <ChevronLeft aria-hidden="true" size={24} strokeWidth={2.4} />
        </button>

        <div className={styles.panelWrap}>
          <AnimatePresence mode="wait">
            <motion.article
              key={activeTestimonial.quote}
              className={styles.panel}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.brandBlock}>
                <Image
                  src="/logo.png"
                  alt="All Fire Services"
                  width={150}
                  height={56}
                  className={styles.logo}
                />
                <span className={styles.brandLabel}>{activeTestimonial.brand}</span>
              </div>

              <div className={styles.copy}>
                <p className={styles.quote}>&ldquo;{activeTestimonial.quote}&rdquo;</p>
                <p className={styles.person}>
                  {activeTestimonial.name}, {activeTestimonial.role}
                </p>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className={styles.dots} aria-label="Select testimonial">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          type="button"
          aria-label="Next testimonial"
          onClick={controls.next}
        >
          <ChevronRight aria-hidden="true" size={24} strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}

export default ClientFeedback;
