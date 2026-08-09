"use client";

import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Fantastic team at All Fire Services. Punctual, professional and friendly team. George was really patient in explaining what needed to be completed on site and how all the systems work.",
    author: "James Alcock",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Great team providing impeccable professional fire protection system installation followed by on call service for a couple of small faults. Highly recommend these guys.",
    author: "Mark Siversen",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    quote: "I am very satisfied with both the quality of work and fair pricing. Peter is honest, quick to respond, and very knowledgeable of all things Fire Safety.",
    author: "Joseph Abate",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    quote: "We’ve used a number of fire safety companies over the years. Our experience with All Fire has been spectacular. Couldn’t be happier. Thanks team.",
    author: "Jason Leadbitter",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    quote: "It was wonderful to have the team at AllFire set our Cafe up efficiently to meet safety standards. These guys were knowledgeable and quick to get the work done. Thoroughly recommend.",
    author: "Gavin Tooley",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    quote: "Extremely professional and thorough. They handled our building's annual fire safety statement with zero stress. The technicians were polite and efficient.",
    author: "Sarah Jenkins",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "All Fire Services has been managing our strata block for three years. They are always on time, transparent with pricing, and proactive about compliance. A true partner.",
    author: "David Chen",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    quote: "Incredible response time for emergency faults. We had an issue with our alarm panel and they were on-site within an hour. Highly dependable service.",
    author: "Emma Thompson",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  }
];

export default function GoogleReviews() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const currentIndexRef = useRef(testimonials.length); // Start in the middle array
  const isTransitioningRef = useRef(false);
  const cardOffsetRef = useRef(400);

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    offset: 0,
  });

  // Triple array for seamless infinite looping
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

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
    const N = testimonials.length;
    let curr = currentIndexRef.current;
    
    // Seamlessly jump to the equivalent slide in the middle array
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

  // Auto-play from right-to-left
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
      className="bg-white text-gray-900 pt-16 lg:pt-24 pb-6 lg:pb-8 overflow-hidden"
    >
      <style>{`
        .reviews-header {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(16rem, 0.7fr);
          column-gap: 4rem;
          align-items: end;
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
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
          font-size: clamp(2.8rem, 5.8vw, 6rem);
          font-weight: 780;
          letter-spacing: -0.06em;
          line-height: 0.92;
          text-wrap: balance;
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
        
        {/* Legacy Header Style */}
        <div className="reviews-header">
          <div className="reviews-kicker">Our clients</div>
          <h2 className="reviews-title">
            What Sydney <span style={{ color: '#ff2a00' }}>building</span><br className="hidden lg:block" /><span style={{
              background: 'linear-gradient(to right, #ff2a00, #ffb700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>managers actually say</span>
          </h2>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-end w-full gap-6 lg:gap-4 mt-2 lg:mt-0">
             {/* Rating Overview */}
             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center">
               <div className="flex -space-x-3 justify-center">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center shadow-sm overflow-hidden">
                       <img src={t.image} alt={t.author} loading="lazy" decoding="async" width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-[1.1rem] text-gray-900 whitespace-nowrap">5.0 / 5</span>
                     <div className="flex gap-[2px] text-[#ff5722]">
                        {/* Render 5 solid stars for the overall rating */}
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                     </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Trusted by hundreds of clients</span>
               </div>
             </div>

             {/* Navigation Arrows */}
             <div className="flex gap-4 shrink-0 justify-center">
               <button 
                 onClick={prevSlide} 
                 className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 bg-white hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                 aria-label="Previous testimonial"
               >
                 <ChevronLeft className="w-5 h-5 text-gray-900" />
               </button>
               
               <button 
                 onClick={nextSlide} 
                 className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 bg-white hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                 aria-label="Next testimonial"
               >
                 <ChevronRight className="w-5 h-5 text-gray-900" />
               </button>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8 mt-6">

          {/* Swipable / Draggable Track Container */}
          <div 
            ref={containerRef}
            className="relative min-w-0 overflow-hidden py-4 rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 
              Seamless Soft Edge Fade with Blur Effect 
            */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-30 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-30 pointer-events-none bg-gradient-to-r from-white to-transparent" />

            {/* Draggable Track */}
            <div
              ref={trackRef}
              className={cn(
                "flex gap-5 touch-pan-y select-none",
                isDragging ? "cursor-grabbing" : "cursor-grab",
              )}
              onTransitionEnd={handleTransitionEnd}
              onPointerDown={(event) => {
                if (event.pointerType === "mouse" && event.button !== 0) return;
                
                // Initialize drag properties when user starts touching/clicking
                dragRef.current = {
                  active: true,
                  pointerId: event.pointerId,
                  startX: event.clientX,
                  offset: 0,
                };
                event.currentTarget.setPointerCapture(event.pointerId);
                setIsDragging(true);
                // Stop any transition while dragging
                setTrackPosition(currentIndexRef.current, false, 0);
                isTransitioningRef.current = false;
              }}
              onPointerMove={(event) => {
                const drag = dragRef.current;
                if (!drag.active || drag.pointerId !== event.pointerId) return;
                
                // Calculate drag distance and position the track immediately without animation
                drag.offset = event.clientX - drag.startX;
                setTrackPosition(currentIndexRef.current, false, drag.offset);
              }}
              onPointerUp={(event) => finishDrag(event.pointerId)}
              onPointerCancel={(event) => finishDrag(event.pointerId)}
            >
              {tripleTestimonials.map((testimonial, i) => (
                <div 
                  key={i}
                  className={cn(
                    "shrink-0 w-[300px] md:w-[360px] lg:w-[400px] min-h-[320px] md:min-h-[340px] rounded-2xl md:rounded-3xl select-none",
                    "relative overflow-hidden group flex flex-col p-8 md:p-10",
                    "border border-gray-200/60 bg-white shadow-[20px_0_40px_-10px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 data-[touch=true]:-translate-y-1"
                  )}
                >
                  <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                    <div>
                      <div className="flex gap-[2px] text-[#ffb700] mb-6">
                         {/* Render 5 solid yellow stars for each review */}
                         {[...Array(5)].map((_, index) => (
                           <Star key={index} className="w-5 h-5" fill="currentColor" />
                         ))}
                      </div>
                      <p className="text-gray-800 font-medium text-[16px] md:text-[17px] leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                    
                    <div className="mt-8">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 overflow-hidden shrink-0">
                            <img src={testimonial.image} alt={testimonial.author} loading="lazy" decoding="async" width={48} height={48} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <div className="text-gray-900 text-sm md:text-[15px] font-bold">{testimonial.author}</div>
                            <div className="text-gray-500 text-[13px] mt-0.5">All Fire Services Client</div>
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
