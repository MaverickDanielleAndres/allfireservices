"use client";

import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
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
];

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    offset: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [cardOffset, setCardOffset] = useState(400);

  // Triple array for smooth continuous right-to-left movement
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Measure single card step width
  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gap = 20; // 20px gap
        const isDesktop = window.innerWidth >= 1024;
        const isTablet = window.innerWidth >= 768;
        
        let width;
        if (isDesktop) width = (containerWidth - gap * 2) / 3;
        else if (isTablet) width = (containerWidth - gap) / 2;
        else width = containerWidth;
        
        setCardOffset(width + gap);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const positionTrack = useCallback((dragOffset = 0, animate = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animate
      ? "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)"
      : "none";
    track.style.transform = `translate3d(${
      -currentIndex * cardOffset + dragOffset
    }px, 0, 0)`;
  }, [cardOffset, currentIndex]);

  useLayoutEffect(() => {
    positionTrack();
  }, [positionTrack]);

  const finishDrag = (pointerId: number) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== pointerId) return;

    drag.active = false;
    setIsDragging(false);
    const threshold = Math.min(80, cardOffset * 0.18);

    if (Math.abs(drag.offset) >= threshold) {
      setCurrentIndex((current) =>
        drag.offset < 0
          ? (current + 1) % testimonials.length
          : (current - 1 + testimonials.length) % testimonials.length,
      );
    } else {
      positionTrack();
    }
    drag.offset = 0;
  };

  // Auto-play from right-to-left
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section
      id="testimonials"
      className="bg-white text-gray-900 pt-16 lg:pt-24 pb-4 lg:pb-8 overflow-hidden"
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
          font-size: clamp(2rem, 4.2vw, 4rem);
          font-weight: 780;
          letter-spacing: -0.06em;
          line-height: 0.92;
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
        @media (max-width: 767px) {
          .reviews-title {
            font-size: clamp(2.65rem, 13vw, 4rem);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Legacy Header Style */}
        <div className="reviews-header">
          <div className="reviews-kicker">Our clients</div>
          <h2 className="reviews-title">
            What Sydney building<br className="hidden lg:block" />managers actually say
          </h2>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-end w-full gap-6 lg:gap-4 mt-2 lg:mt-0">
             {/* Rating Overview */}
             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center">
               <div className="flex -space-x-3 justify-center">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center shadow-sm overflow-hidden">
                       <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
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
               {/* Left Arrow Button - shrink-0 ensures it stays perfectly circular */}
               <button 
                 onClick={prevSlide} 
                 className="w-12 h-12 shrink-0 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-200 bg-white hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                 aria-label="Previous testimonial"
               >
                 <ChevronLeft className="w-5 h-5 text-gray-900" />
               </button>
               
               {/* Right Arrow Button - shrink-0 ensures it stays perfectly circular */}
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

        <div className="flex flex-col gap-6 lg:gap-8">

          {/* Swipable / Draggable Track Container */}
          <div 
            ref={containerRef}
            className="relative min-w-0 overflow-hidden py-4 rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 
              Seamless Soft Edge Fade with Blur Effect 
              Uses backdrop-blur and mask-image to create a smooth, premium frosted glass fade 
              that blends the cards smoothly into the #f8f7f3 background.
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
              }}
              onPointerMove={(event) => {
                const drag = dragRef.current;
                if (!drag.active || drag.pointerId !== event.pointerId) return;
                
                // Calculate drag distance and position the track immediately without animation
                drag.offset = event.clientX - drag.startX;
                positionTrack(drag.offset, false);
              }}
              onPointerUp={(event) => finishDrag(event.pointerId)}
              onPointerCancel={(event) => finishDrag(event.pointerId)}
            >
              {tripleTestimonials.map((testimonial, i) => (
                <div 
                  key={i}
                  style={{ width: cardOffset ? cardOffset - 20 : '320px' }}
                  className={cn(
                    "shrink-0 min-h-[320px] md:min-h-[340px] rounded-2xl md:rounded-3xl select-none",
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
                         <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 overflow-hidden">
                            <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
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
