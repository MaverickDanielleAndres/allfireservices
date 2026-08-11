"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/components/HomeStoryLegacy.module.css";

const testimonials = [
  {
    brand: "Strata",
    quote: "All Fire Services keeps our annual fire safety statements moving without the last-minute stress. Their team explains what matters, turns up prepared, and follows through.",
    name: "Sarah Jenkins",
    role: "Strata Manager, Inner West Sydney",
    image: "/testinonial/testimonialprofile.jpg",
  },
  {
    brand: "Facilities",
    quote: "The difference is practical experience. When something needs attention, All Fire Services tells us what is urgent, what is compliant, and what can be planned properly.",
    name: "Mark Taylor",
    role: "Facilities Manager, Commercial Portfolio",
    image: "/testinonial/testimonialprofile2.jpg",
  },
  {
    brand: "Owners",
    quote: "They are reliable, clear, and easy to work with. We have confidence that our fire protection maintenance is being handled by people who understand real buildings.",
    name: "David Chen",
    role: "Building Owner, Greater Sydney",
    image: "/testinonial/testimonialprofile3.avif",
  },
  {
    brand: "Compliance",
    quote: "All Fire Services helped us get our compliance records organised and kept our committee informed in plain language. That made approvals much easier.",
    name: "Lisa Wong",
    role: "Owners Corporation Secretary",
    image: "/testinonial/testimonialprofile4.jpg",
  },
  {
    brand: "Maintenance",
    quote: "Their technicians are punctual and professional. They leave useful notes after each inspection, which helps us stay ahead of defects before they become bigger issues.",
    name: "Michael Kavanagh",
    role: "Asset Manager, Sydney",
    image: "/testinonial/testimonialprofile5.jpg",
  },
  {
    brand: "Support",
    quote: "We call All Fire Services because they respond quickly and give us direct answers. The firefighter-led knowledge shows in the way they solve problems on site.",
    name: "Paul Davis",
    role: "Operations Director, Property Group",
    // Six testimonials, five avatar images — wrap to keep the rotation
    // visually consistent at the loop seam.
    image: "/testinonial/testimonialprofile.jpg",
  },
];

export default function HandshakeTestimonials() {
  // Duplicate for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-white overflow-hidden padding-section-large pt-0" data-theme="light">
      <div className="padding-global">
        <div className="container-large">
          <header className={styles.legacyHeader} style={{ marginTop: 0, marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <p className={styles.kicker}>TESTIMONIALS</p>
            <h2 id="legacy-title" style={{ maxWidth: '14ch' }}>Hear from<br /><span style={{
              background: 'linear-gradient(to right, #ff2a00, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>our clients</span></h2>
            <p>
              Discover why property managers across Greater Sydney rely on our proactive approach and firefighter-led expertise to protect their assets.
            </p>
          </header>
        </div>
      </div>

      <div className="relative flex overflow-hidden pb-16">
        <motion.div
          className="flex gap-6 w-max px-3 cursor-grab active:cursor-grabbing"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          drag="x"
          dragConstraints={{ left: -5000, right: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="flex-none w-[85vw] md:w-[420px]"
            >
              <div className="bg-white flex flex-col h-full transition-all duration-300 font-sans" style={{ 
                borderRadius: '24px', 
                padding: 'clamp(2rem, 4vw, 3rem)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)', 
                border: '1px solid rgba(0, 0, 0, 0.05)' 
              }}>
                <div className="flex-grow mb-8">
                  <p className="text-[#111111]" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55 }}>
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100" style={{ boxShadow: '0 0.65rem 1.4rem rgba(17, 17, 17, 0.12)' }}>
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[#111111] font-bold" style={{ fontSize: 'clamp(1rem, 1.45vw, 1.18rem)', lineHeight: 1.4 }}>
                      {testimonial.name}
                    </h4>
                    <p className="font-semibold" style={{ color: 'rgba(17, 17, 17, 0.6)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
