"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { buildFaqEntity, stringifyJsonLd } from "@/lib/schema";
import styles from "./FAQ.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How often do I need an Annual Fire Safety Statement (AFSS)?",
    answer:
      "In NSW, an Annual Fire Safety Statement must be submitted to your local council and Fire and Rescue NSW every 12 months. We can manage this entire process for you to ensure you remain compliant.",
  },
  {
    question: "What areas of Sydney do you service?",
    answer:
      "We proudly serve the Greater Sydney area. From the CBD to the suburbs, our experienced technicians are ready to provide prompt and reliable fire safety services for your property.",
  },
  {
    question: "Do you provide emergency support and repairs?",
    answer:
      "Yes, we offer 24/7 emergency support. Fire safety issues don't stick to business hours, and neither do we. You can count on us to be there when you need us most.",
  },
  {
    question: "Are your technicians certified and licensed?",
    answer:
      "Absolutely. All our technicians are highly trained, fully licensed, and we are proud members of FPA Australia. We ensure all work is carried out to the highest Australian Standards.",
  },
  {
    question: "What happens if my building fails a fire safety inspection?",
    answer:
      "If your building fails an inspection, we provide a detailed report outlining the non-compliant areas. Our team can carry out all necessary repairs or upgrades to bring your property up to Australian Standards before issuing the final certification.",
  },
  {
    question: "How do I know what fire equipment my building requires?",
    answer:
      "Required fire safety measures depend on your building's classification, age, and size under the Building Code of Australia (BCA). We can conduct a comprehensive site audit to determine exactly what systems — such as alarms, sprinklers, or extinguishers — are required for your specific property.",
  },
  {
    question: "Can you take over the maintenance of existing fire systems?",
    answer:
      "Yes, absolutely. We seamlessly transition your existing fire safety maintenance schedule to our team. We conduct an initial assessment of your current systems and set up a compliant testing routine without any disruption to your operations.",
  },
  {
    question: "What does AS 1851:2012 mean for my building?",
    answer:
      "From 13 February 2026, all Class 1b–9 buildings in NSW that require an AFSS must have their fire safety measures routinely serviced in accordance with AS 1851:2012. We plan, schedule, and document every inspection, test, and maintenance activity in a compliant logbook — so your AFSS evidence is always ready and audit-ready.",
  },
  {
    question: "Do you service strata and owners corporation buildings?",
    answer:
      "Yes — strata is one of our core specialities. We run monthly, six-monthly and yearly fire safety inspections for residential apartments, townhouse complexes and mixed-use buildings; coordinate your AFSS; attend AGMs when needed; and provide plain-English reporting that strata committees and building managers can rely on.",
  },
  {
    question: "Can you help if my building just received a council notice or AFSS rejection?",
    answer:
      "Yes. We treat council notices and AFSS rejections as priority work. We will attend quickly, identify the defective fire safety measures, prepare a clear rectification plan with costed options, and carry out the repairs so you can re-submit and re-display your AFSS as soon as possible.",
  },
  {
    question: "Do you lodge the AFSS with Council and FRNSW for us?",
    answer:
      "We prepare the Annual Fire Safety Statement and hand it to you ready for signing and lodgement with your local Council, the Fire Commissioner and Fire and Rescue NSW. We also confirm your AFSS copy is displayed inside the building, as required by NSW legislation.",
  },
  {
    question: "Do you provide fire warden and extinguisher training?",
    answer:
      "Yes. We deliver on-site workplace fire safety training led by serving professional firefighters — including extinguisher training (with live or simulated discharge), fire warden and evacuation training, and bespoke Emergency and Evacuation Plans aligned to AS 3745.",
  },
  {
    question: "Which fire safety systems can you test, service and certify?",
    answer:
      "We are licensed to certify, install, maintain and report on every major system, including: fire detection and alarm systems, sprinklers, hydrants and pumpsets, fire and smoke doors, emergency and exit lighting, fire hose reels, portable fire equipment, fire seals and collars, and pre-engineered non-gaseous suppression systems.",
  },
  {
    question: "Are you insured and accredited?",
    answer:
      "Yes. We hold Professional Indemnity and Public Liability insurance, comply with all NSW Work Health and Safety requirements, and are a Bronze member of Fire Protection Association Australia (FPA Australia) — the national peak body for fire safety.",
  },
  {
    question: "How do I get a quote or book an inspection?",
    answer:
      "Call us on 1300 765 594, send a message via our chatbot, or submit the contact / quote / inspection form on our website. We'll confirm what's required for your building, scope the work, and provide a transparent quote — typically with the first inspection booked within days.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ── JSON-LD ────────────────────────────────────────────────────────────
  const faqStructuredData = {
    "@context": "https://schema.org",
    ...buildFaqEntity(faqs),
  };

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faqStructuredData) }}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>FAQ&apos;s</p>
          <h2 id="faq-title" className={styles.title}>
            Got questions?
            <br />
            <span className={styles.gradientText}>We&apos;ve got answers.</span>
          </h2>
          <p className={styles.subtitle}>
            Expert answers to your most critical fire safety and compliance
            questions. If you have further questions, ask our chatbot.
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className={styles.item}
                initial={false}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <ChevronDown
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      className={styles.answerWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className={styles.answer}>
                        <p className={styles.answerText}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
