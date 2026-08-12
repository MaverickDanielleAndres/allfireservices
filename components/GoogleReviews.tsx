"use client";

import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackItem {
  /** Customer review text from Google — no owner responses are shown. */
  quote: string;
  /** Reviewer's display name on Google. */
  name: string;
  /** Two-letter initials used when no avatar is supplied. */
  initials: string;
  /** Optional Google-local-guide badge (e.g. "Local Guide · 54 reviews"). */
  badge?: string;
  /** When the review was posted on Google (e.g. "3 months ago"). */
  postedAgo: string;
  /** Star rating, always 5 in this dataset. */
  rating: number;
  /** Avatar image from /public/testinonial/ — round-robined across the
   *  five profile images supplied for the testimonials feature. */
  imageSrc: string;
}

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
const feedbackItems: FeedbackItem[] = [
  {
    name: "Joseph Abate",
    initials: "JA",
    rating: 5,
    postedAgo: "3 months ago",
    quote:
      "I have been using all fire services for a few years now and I can say that I am very satisfied with both the quality of work and the fair pricing. I found Peter to be fair and honest and quick to respond. I also found Peter to be very knowledgeable of all things Fire Safty.",
    imageSrc: PROFILE_IMAGES[0],
  },
  {
    name: "James Alcock",
    initials: "JA",
    rating: 5,
    postedAgo: "2 months ago",
    quote:
      "Fantastic team at All Fire Services. Punctual, professional and friendly team. George was really patient in explaining what needed to be completed on site and how all the systems work.",
    imageSrc: PROFILE_IMAGES[1],
  },
  {
    name: "Mark Siversen",
    initials: "MS",
    rating: 5,
    postedAgo: "2 months ago",
    quote:
      "Great team providing impeccable professional fire protection system installation followed by on call service for a couple of small faults. Highly recommend these guys.",
    imageSrc: PROFILE_IMAGES[2],
  },
  {
    name: "Jason Leadbitter",
    initials: "JL",
    rating: 5,
    badge: "Local Guide · 54 reviews · 49 photos",
    postedAgo: "3 months ago",
    quote:
      "We've used a number of fire safety companies over the years. Our experience with All Fire has been spectacular. Couldn't be happier. Thanks team.",
    imageSrc: PROFILE_IMAGES[3],
  },
  {
    name: "Christine",
    initials: "C",
    rating: 5,
    postedAgo: "1 year ago",
    quote:
      "Outstanding long-term partnership and service. As a charity, we've had the privilege of working with All Fire Services for over [a number of] years — they have always been knowledgeable, prompt, and a pleasure to deal with.",
    imageSrc: PROFILE_IMAGES[4],
  },
  {
    name: "Customer Service (Household Properties)",
    initials: "HP",
    rating: 5,
    badge: "8 reviews · 3 photos",
    postedAgo: "2 years ago",
    quote:
      "Pete, Jen and the team have everything we look for from fair market prices to GREAT communication, and prompt and reliable services. To date their systems to meet our needs have been nothing short of exemplary. We have used their services across multiple properties and have always been impressed.",
    imageSrc: PROFILE_IMAGES[0],
  },
  {
    name: "Gavin Tooley",
    initials: "GT",
    rating: 5,
    badge: "Local Guide · 14 reviews · 11 photos",
    postedAgo: "1 year ago",
    quote:
      "It was wonderful to have the team at AllFire set our Cafe up efficiently to meet safety standards. These guys were knowledgable and quick to get the work done. Thoroughly recommend.",
    imageSrc: PROFILE_IMAGES[1],
  },
  {
    name: "Michelle Constantin",
    initials: "MC",
    rating: 5,
    postedAgo: "2 years ago",
    quote:
      "This company services my childcare, and they have great communication, are prompt, on time and reasonable in price. Could definitely recommend them as opposed to other companies I have used.",
    imageSrc: PROFILE_IMAGES[2],
  },
  {
    name: "Janine Macken",
    initials: "JM",
    rating: 5,
    postedAgo: "2 years ago",
    quote:
      "The service I received from All Fire Services was amazing. I would certainly recommend this company.",
    imageSrc: PROFILE_IMAGES[3],
  },
  {
    name: "Garry L.",
    initials: "GL",
    rating: 5,
    postedAgo: "8 years ago",
    quote:
      "Brilliant contractor and team - no job too small !!",
    imageSrc: PROFILE_IMAGES[4],
  },
  {
    name: "Dave here",
    initials: "DH",
    rating: 5,
    badge: "1 review · 10 photos",
    postedAgo: "8 years ago",
    quote:
      "Good job, nice guys, never any problems...",
    imageSrc: PROFILE_IMAGES[0],
  },
];

export default function GoogleReviews() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const currentIndexRef = useRef(feedbackItems.length); // Start in the middle array
  const isTransitioningRef = useRef(false);
  const cardOffsetRef = useRef(400);

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    offset: 0,
  });

  // Triple array for seamless infinite looping
  const tripleItems = [...feedbackItems, ...feedbackItems, ...feedbackItems];

  const setTrackPosition = useCallback((index: number, animate: boolean, extraOffset = 0) => {
    if (!trackRef.current) return;
    if (animate) {
      trackRef.current.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
    } else {
      trackRef.current.style.transition = "none";
    }
    trackRef.current.style.transform = `translate3d(${-index * cardOffsetRef.current + extraOffset}px, 0, 0)`;
  }, []);

  useLayoutEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const gap = 20; // gap-5 is 20px

        let width;
        if (window.innerWidth >= 1024) width = 400;
        else if (window.innerWidth >= 768) width = 360;
        else width = 300;

        cardOffsetRef.current = width + gap;
        setTrackPosition(currentIndexRef.current, false);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [setTrackPosition]);

  const nextSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    currentIndexRef.current += 1;
    setTrackPosition(currentIndexRef.current, true);
  }, [setTrackPosition]);

  const prevSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    currentIndexRef.current -= 1;
    setTrackPosition(currentIndexRef.current, true);
  }, [setTrackPosition]);

  const handleTransitionEnd = () => {
    isTransitioningRef.current = false;
    const N = feedbackItems.length;
    let curr = currentIndexRef.current;

    if (curr <= N - 1) {
      curr += N;
    } else if (curr >= 2 * N) {
      curr -= N;
    }

    if (curr !== currentIndexRef.current) {
      currentIndexRef.current = curr;
      setTrackPosition(curr, false);
      trackRef.current?.offsetHeight; // Force reflow
    }
  };

  const finishDrag = (pointerId: number) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== pointerId) return;

    drag.active = false;
    setIsDragging(false);

    const threshold = Math.min(80, cardOffsetRef.current * 0.18);

    if (drag.offset < -threshold) {
      nextSlide();
    } else if (drag.offset > threshold) {
      prevSlide();
    } else {
      isTransitioningRef.current = true;
      setTrackPosition(currentIndexRef.current, true);
    }
    drag.offset = 0;
  };

  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, nextSlide]);

  return (
    <section
      id="testimonials"
      className="bg-white text-gray-900 py-[clamp(2.5rem,4.5vw,3.75rem)] overflow-hidden"
    >
      <style>{`
        .reviews-header {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(16rem, 0.7fr);
          column-gap: 4rem;
          align-items: end;
          margin-bottom: clamp(2.75rem, 4.5vw, 3.5rem);
        }
        .reviews-kicker {
          grid-column: 1 / -1;
          margin: 0 0 1rem;
          color: #d64114;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          line-height: 1.3;
          text-transform: uppercase;
        }
        .reviews-title {
          margin: 0;
          color: #111111;
          font-size: clamp(2.2rem, 4.3vw, 3.8rem);
          font-weight: 780;
          letter-spacing: -0.04em;
          line-height: 0.92;
          text-wrap: balance;
        }
        @media (max-width: 767px) {
          .reviews-title {
            font-size: clamp(1.5rem, 7.5vw, 2.2rem);
            text-wrap: wrap;
          }
        }
        /* Title column + arrows column on desktop. Declared here rather than
           inline so the mobile/tablet override below can actually win. */
        .reviews-header--carousel {
          grid-template-columns: minmax(0, 1fr) auto;
          margin-bottom: 1.75rem;
        }
        .reviews-nav {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
          align-items: flex-end;
          justify-content: flex-end;
        }
        @media (max-width: 991px) {
          .reviews-header,
          .reviews-header--carousel {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            justify-items: center;
            text-align: center;
          }
          .reviews-kicker {
            margin: 0 0 0.5rem;
          }
          /* Arrows drop onto their own row beneath the heading and centre. */
          .reviews-nav {
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 0.25rem;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="reviews-header reviews-header--carousel">
          <div className="reviews-kicker">All Fire Services Google Reviews</div>
          <h2 className="reviews-title">
            Hear from our Clients
          </h2>
          <div className="reviews-nav">
            <button
              onClick={prevSlide}
              className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 bg-white hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Previous feedback"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 bg-white hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Next feedback"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">

          {/* Swipable / Draggable Track Container */}
          <div
            ref={containerRef}
            className="relative min-w-0 overflow-hidden py-4 rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-30 pointer-events-none bg-gradient-to-l from-white to-transparent hidden md:block" />
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-30 pointer-events-none bg-gradient-to-r from-white to-transparent hidden md:block" />

            <div
              ref={trackRef}
              className={cn(
                "flex gap-5 touch-pan-y select-none",
                isDragging ? "cursor-grabbing" : "cursor-grab",
              )}
              onTransitionEnd={handleTransitionEnd}
              onPointerDown={(event) => {
                if (event.pointerType === "mouse" && event.button !== 0) return;

                dragRef.current = {
                  active: true,
                  pointerId: event.pointerId,
                  startX: event.clientX,
                  offset: 0,
                };
                event.currentTarget.setPointerCapture(event.pointerId);
                setIsDragging(true);
                setTrackPosition(currentIndexRef.current, false, 0);
                isTransitioningRef.current = false;
              }}
              onPointerMove={(event) => {
                const drag = dragRef.current;
                if (!drag.active || drag.pointerId !== event.pointerId) return;

                drag.offset = event.clientX - drag.startX;
                setTrackPosition(currentIndexRef.current, false, drag.offset);
              }}
              onPointerUp={(event) => finishDrag(event.pointerId)}
              onPointerCancel={(event) => finishDrag(event.pointerId)}
              role="region"
              aria-label="Client feedback carousel"
            >
              {tripleItems.map((item, i) => {
                // The middle copy of the array is only here to enable a
                // seamless infinite marquee — hide it from assistive tech
                // so the same reviews are not read three times in a row.
                const isMiddleDuplicate =
                  i >= feedbackItems.length && i < feedbackItems.length * 2;
                return (
                <div
                  key={i}
                  aria-hidden={isMiddleDuplicate ? "true" : undefined}
                  className={cn(
                    "shrink-0 w-[300px] md:w-[360px] lg:w-[400px] min-h-[300px] md:min-h-[340px] rounded-2xl md:rounded-3xl select-none",
                    "relative overflow-hidden group flex flex-col p-8 md:p-10",
                    "border border-gray-200/60 bg-white shadow-[20px_0_40px_-10px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 data-[touch=true]:-translate-y-1"
                  )}
                >
                  <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                    <div>
                      <div
                        className="flex items-center gap-0.5 text-[#ffad05] mb-3"
                        aria-label={`Rated ${item.rating} out of 5 on Google`}
                      >
                        {Array.from({ length: item.rating }).map((_, s) => (
                          <Star
                            key={s}
                            className="w-4 h-4 fill-current"
                            strokeWidth={0}
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      <p className="text-gray-800 font-medium text-[15px] md:text-[16px] leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div
                          className="relative w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden"
                          aria-hidden="true"
                        >
                          {/* Initials sit behind the avatar so any image
                              load failure falls back to them gracefully
                              without a runtime onError handler. */}
                          <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-[13px] select-none">
                            {item.initials}
                          </span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="relative w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-gray-900 font-bold text-[14px] truncate">
                            {item.name}
                          </div>
                          <div className="text-gray-500 text-[12px]">
                            {item.badge ?? item.postedAgo}
                          </div>
                          {item.badge ? (
                            <div className="text-gray-500 text-[12px]">
                              {item.postedAgo}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
