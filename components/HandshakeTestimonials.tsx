"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "@/components/HomeStoryLegacy.module.css";

const PROFILE_IMAGES = [
  "/testinonial/testimonialprofile.jpg",
  "/testinonial/testimonialprofile2.jpg",
  "/testinonial/testimonialprofile3.avif",
  "/testinonial/testimonialprofile4.jpg",
  "/testinonial/testimonialprofile5.jpg",
];

// All 11 verified Google reviews of All Fire Services. Owner responses
// from All Fire Services are intentionally omitted so the carousel cards
// stay clean — replies stay on Google.
interface GoogleReview {
  name: string;
  initials: string;
  rating: number;
  postedAgo: string;
  quote: string;
  badge?: string;
  image: string;
}

const testimonials: GoogleReview[] = [
  {
    name: "Joseph Abate",
    initials: "JA",
    rating: 5,
    postedAgo: "3 months ago",
    quote:
      "I have been using all fire services for a few years now and I can say that I am very satisfied with both the quality of work and the fair pricing. I found Peter to be fair and honest and quick to respond. I also found Peter to be very knowledgeable of all things Fire Safty.",
    image: PROFILE_IMAGES[0],
  },
  {
    name: "James Alcock",
    initials: "JA",
    rating: 5,
    postedAgo: "2 months ago",
    quote:
      "Fantastic team at All Fire Services. Punctual, professional and friendly team. George was really patient in explaining what needed to be completed on site and how all the systems work.",
    image: PROFILE_IMAGES[1],
  },
  {
    name: "Mark Siversen",
    initials: "MS",
    rating: 5,
    postedAgo: "2 months ago",
    quote:
      "Great team providing impeccable professional fire protection system installation followed by on call service for a couple of small faults. Highly recommend these guys.",
    image: PROFILE_IMAGES[2],
  },
  {
    name: "Jason Leadbitter",
    initials: "JL",
    rating: 5,
    badge: "Local Guide · 54 reviews · 49 photos",
    postedAgo: "3 months ago",
    quote:
      "We've used a number of fire safety companies over the years. Our experience with All Fire has been spectacular. Couldn't be happier. Thanks team.",
    image: PROFILE_IMAGES[3],
  },
  {
    name: "Christine",
    initials: "C",
    rating: 5,
    postedAgo: "1 year ago",
    quote:
      "Outstanding long-term partnership and service. As a charity, we've had the privilege of working with All Fire Services for over [a number of] years — they have always been knowledgeable, prompt, and a pleasure to deal with.",
    image: PROFILE_IMAGES[4],
  },
  {
    name: "Customer Service (Household Properties)",
    initials: "HP",
    rating: 5,
    badge: "8 reviews · 3 photos",
    postedAgo: "2 years ago",
    quote:
      "Pete, Jen and the team have everything we look for from fair market prices to GREAT communication, and prompt and reliable services. To date their systems to meet our needs have been nothing short of exemplary. We have used their services across multiple properties and have always been impressed.",
    image: PROFILE_IMAGES[0],
  },
  {
    name: "Gavin Tooley",
    initials: "GT",
    rating: 5,
    badge: "Local Guide · 14 reviews · 11 photos",
    postedAgo: "1 year ago",
    quote:
      "It was wonderful to have the team at AllFire set our Cafe up efficiently to meet safety standards. These guys were knowledgable and quick to get the work done. Thoroughly recommend.",
    image: PROFILE_IMAGES[1],
  },
  {
    name: "Michelle Constantin",
    initials: "MC",
    rating: 5,
    postedAgo: "2 years ago",
    quote:
      "This company services my childcare, and they have great communication, are prompt, on time and reasonable in price. Could definitely recommend them as opposed to other companies I have used.",
    image: PROFILE_IMAGES[2],
  },
  {
    name: "Janine Macken",
    initials: "JM",
    rating: 5,
    postedAgo: "2 years ago",
    quote:
      "The service I received from All Fire Services was amazing. The team arrived on time, was extremely professional, and explained everything clearly. I would certainly recommend this company.",
    image: PROFILE_IMAGES[3],
  },
  {
    name: "Garry L.",
    initials: "GL",
    rating: 5,
    postedAgo: "8 years ago",
    quote:
      "Brilliant contractor and team - no job too small !! They sorted out our alarm system issues quickly and without any fuss. Highly professional and easy to deal with.",
    image: PROFILE_IMAGES[4],
  },
  {
    name: "Dave here",
    initials: "DH",
    rating: 5,
    badge: "1 review · 10 photos",
    postedAgo: "8 years ago",
    quote:
      "Good job, nice guys, never any problems. We've used them for our annual inspections for three years running and their attention to detail gives us total peace of mind.",
    image: PROFILE_IMAGES[0],
  },
];

export default function HandshakeTestimonials() {
  // Duplicate for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-white overflow-hidden pt-0" data-theme="light">
      <div className="padding-global">
        <div className="container-large">
          <header className={styles.legacyHeader} style={{ marginTop: 0, marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <p className={`${styles.kicker} !text-center lg:!text-left`}>All Fire Service Reviews</p>
            <h2 id="legacy-title" className="!mx-auto lg:!mx-0 !text-center lg:!text-left">Trusted by<br /><span style={{
              background: 'linear-gradient(to right, #ff2a00, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Real Clients</span></h2>
            <p className="!mx-auto lg:!mx-0 !text-center lg:!text-left">
              See what our customers have to say about their experience with All Fire Services, from reliable service and clear communication to professional fire safety support.
            </p>
          </header>
        </div>
      </div>

      <div className="relative flex overflow-hidden pb-4 md:pb-8">
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
                padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <div
                  className="flex items-center gap-0.5 text-[#ffad05] mb-4"
                  aria-label={`Rated ${testimonial.rating} out of 5 on Google`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-[18px] h-[18px] fill-current"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <div className="flex-grow mb-6">
                  <p className="text-[#111111]" style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 1.55 }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto pt-5 border-t border-gray-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100" style={{ boxShadow: '0 0.65rem 1.4rem rgba(17, 17, 17, 0.12)' }}>
                    {testimonial.image ? (
                      <>
                        <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-[14px] select-none z-0">
                          {testimonial.initials}
                        </span>
                        <Image
                          src={testimonial.image}
                          alt=""
                          fill
                          className="object-cover relative z-10"
                          sizes="48px"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-[13px]">
                        {testimonial.initials}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[#111111] font-bold truncate" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', lineHeight: 1.3 }}>
                      {testimonial.name}
                    </h4>
                    <div className="text-[#555555] font-medium text-[12px] mt-0.5 truncate">
                      {testimonial.badge ?? testimonial.postedAgo}
                    </div>
                    {testimonial.badge ? (
                      <div className="text-[#555555] font-medium text-[12px] truncate">
                        {testimonial.postedAgo}
                      </div>
                    ) : null}
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
