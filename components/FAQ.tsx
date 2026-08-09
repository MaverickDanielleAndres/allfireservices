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
