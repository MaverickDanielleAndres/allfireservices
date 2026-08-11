"use client";

import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackItem {
  /** Short quote paraphrased from past client feedback. Do not present as a
   *  verified third-party review. */
  quote: string;
  /** Suburb or building type associated with the feedback. */
  context: string;
  /** Initials used for the avatar (no stock photos of named individuals). */
  initials: string;
  /** Avatar image from /public/testinonial/ — round-robined across the
   *  five profile images supplied for the testimonials feature. */
  imageSrc: string;
}

// Client feedback examples — presented as illustrative feedback, not as
// verified third-party reviews. No star ratings, no review counts, and
// no real-person stock avatars are displayed.
const feedbackItems: FeedbackItem[] = [
  {
    quote:
      "Punctual, professional and friendly team. George was really patient in explaining what needed to be completed on site and how all the systems work.",
    context: "Strata manager, Sydney",
    initials: "JA",
    imageSrc: "/testinonial/testimonialprofile.jpg",
  },
  {
    quote:
      "Great team providing impeccable professional fire protection system installation followed by on call service for a couple of small faults. Highly recommend these guys.",
    context: "Commercial property owner",
    initials: "MS",
    imageSrc: "/testinonial/testimonialprofile2.jpg",
  },
  {
    quote:
      "I am very satisfied with both the quality of work and fair pricing. Peter is honest, quick to respond, and very knowledgeable of all things fire safety.",
    context: "Owners corporation, Sydney",
    initials: "JA",
    imageSrc: "/testinonial/testimonialprofile3.avif",
  },
  {
    quote:
      "All Fire Services has been managing our strata block for three years. They are always on time, transparent with pricing, and proactive about compliance.",
    context: "Strata committee, Inner West",
    initials: "DC",
    imageSrc: "/testinonial/testimonialprofile4.jpg",
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
      className="bg-white text-gray-900 py-[clamp(4rem,7vw,5.5rem)] overflow-hidden"
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
          color: #e94716;
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
            font-size: clamp(2.3rem, 11vw, 3.5rem);
          }
        }
        @media (max-width: 991px) {
          .reviews-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            justify-items: center;
            text-align: center;
          }
          .reviews-kicker {
            margin: 0 0 0.5rem;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="reviews-header" style={{ marginBottom: "1.75rem", gridTemplateColumns: "minmax(0, 1fr) auto" }}>
          <div className="reviews-kicker">Client feedback</div>
          <h2 className="reviews-title">
            What Sydney <span style={{ color: '#ff2a00' }}>building</span><br className="hidden lg:block" /><span style={{
              background: 'linear-gradient(to right, #ff2a00, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>managers tell us</span>
          </h2>
          <div className="flex gap-3 shrink-0 justify-end items-end">
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
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-30 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-30 pointer-events-none bg-gradient-to-r from-white to-transparent" />

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
            >
              {tripleItems.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "shrink-0 w-[300px] md:w-[360px] lg:w-[400px] min-h-[280px] md:min-h-[300px] rounded-2xl md:rounded-3xl select-none",
                    "relative overflow-hidden group flex flex-col p-8 md:p-10",
                    "border border-gray-200/60 bg-white shadow-[20px_0_40px_-10px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 data-[touch=true]:-translate-y-1"
                  )}
                >
                  <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                    <p className="text-gray-800 font-medium text-[16px] md:text-[17px] leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden"
                          aria-hidden="true"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="text-gray-500 text-[13px] mt-0.5">
                            {item.context}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
