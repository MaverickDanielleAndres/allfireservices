"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: "How often do I need an Annual Fire Safety Statement (AFSS)?",
    answer: "In NSW, an Annual Fire Safety Statement must be submitted to your local council and Fire and Rescue NSW every 12 months. We can manage this entire process for you to ensure you remain compliant."
  },
  {
    question: "What areas of Sydney do you service?",
    answer: "We proudly serve the Greater Sydney Area. From the CBD to the suburbs, our experienced technicians are ready to provide prompt and reliable fire safety services for your property."
  },
  {
    question: "Do you provide emergency support and repairs?",
    answer: "Yes, we offer 24/7 emergency support. Fire safety issues don't stick to business hours, and neither do we. You can count on us to be there when you need us most."
  },
  {
    question: "Are your technicians certified and licensed?",
    answer: "Absolutely. All our technicians are highly trained, fully licensed, and we are proud members of the FPA Australia (FPAA). We ensure all work is carried out to the highest Australian Standards."
  },
  {
    question: "What happens if my building fails a fire safety inspection?",
    answer: "If your building fails an inspection, we provide a detailed report outlining the non-compliant areas. Our team can carry out all necessary repairs or upgrades to bring your property up to Australian Standards before issuing the final certification."
  },
  {
    question: "How do I know what fire equipment my building requires?",
    answer: "Required fire safety measures depend on your building's classification, age, and size under the Building Code of Australia (BCA). We can conduct a comprehensive site audit to determine exactly what systems—such as alarms, sprinklers, or extinguishers—are legally required for your specific property."
  },
  {
    question: "Can you take over the maintenance of existing fire systems?",
    answer: "Yes, absolutely. We seamlessly transition your existing fire safety maintenance schedule to our team. We'll conduct an initial assessment of your current systems and set up a compliant testing routine without any disruption to your operations."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>FAQs</h2>
          <p className={styles.subtitle}>
            Expert answers to your most critical fire safety and compliance questions.
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
                >
                  <span className={`${styles.questionText} ${isOpen ? styles.questionTextOpen : ''}`}>
                    {faq.question}
                  </span>
                  
                  <div
                    className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.answerWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className={styles.answer}>
                        <p className={styles.answerText}>
                          {faq.answer}
                        </p>
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
