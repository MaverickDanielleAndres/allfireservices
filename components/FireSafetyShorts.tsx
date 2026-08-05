"use client";

import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styles from "./HomeStoryLegacy.module.css";

const videos = [
  { id: "QE5U0pd84gc", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "QE5U0pd84gc", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "QE5U0pd84gc", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "dAWVxg6rC7Y", title: "Annual fire safety inspections" },
  { id: "aQIWX9uKtbs", title: "A phone in a back pocket caught fire" },
  { id: "QE5U0pd84gc", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "D85L7WhrPtY", title: "Free Annual Fire Safety Statement offer" },
];

export default function FireSafetyShorts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      setPlayingVideoIndex(null); // Stop video when swiping
      
      const container = scrollRef.current;
      // Scroll by one full page (visible container width)
      const amount = container.clientWidth;
      
      container.style.scrollSnapType = 'none';
      container.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
      
      setTimeout(() => {
        if (container) container.style.scrollSnapType = 'x mandatory';
      }, 500);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      // Calculate how many 'pages' of content exist
      const pages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
      setTotalPages(pages);
      
      if (maxScroll <= 0) {
        setCurrentPage(0);
        setCanScrollLeft(false);
        setCanScrollRight(false);
      } else {
        const progress = scrollLeft / maxScroll;
        setCurrentPage(Math.round(progress * (pages - 1)));
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < maxScroll - 1);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      // init
      handleScroll();
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section 
      aria-labelledby="fire-safety-shorts-title"
      style={{ background: "#ffffff", padding: "clamp(72px, 9vw, 116px) 0" }}
    >
      <div className="padding-global">
        <div className="container-large">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end flex-wrap gap-6 mb-[clamp(5rem,8vw,7rem)] w-full text-center md:text-left">
            <header className="mb-0 block w-full md:w-auto">
              <p className={`${styles.kicker} mx-auto md:mx-0`}>Fire safety shorts</p>
              <h2 id="fire-safety-shorts-title" className="mx-auto md:mx-0" style={{
                color: "#111111",
                fontSize: "clamp(2.8rem, 5.8vw, 6rem)",
                fontWeight: 780,
                letterSpacing: "-0.06em",
                lineHeight: 0.92,
                textWrap: "balance"
              }}>Quick lessons from real jobs</h2>
            </header>
          <div className="flex gap-2 justify-center w-full md:w-auto shrink-0 mt-2 md:mt-0">
            <button 
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", cursor: canScrollLeft ? "pointer" : "default", opacity: canScrollLeft ? 1 : 0.4, transition: "border-color 0.2s" }}
              onMouseOver={(e) => canScrollLeft && (e.currentTarget.style.borderColor = "#111")}
              onMouseOut={(e) => canScrollLeft && (e.currentTarget.style.borderColor = "#ccc")}
            >
              <ArrowLeft size={20} color="#111" />
            </button>
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", cursor: canScrollRight ? "pointer" : "default", opacity: canScrollRight ? 1 : 0.4, transition: "border-color 0.2s" }}
              onMouseOver={(e) => canScrollRight && (e.currentTarget.style.borderColor = "#111")}
              onMouseOut={(e) => canScrollRight && (e.currentTarget.style.borderColor = "#ccc")}
            >
              <ArrowRight size={20} color="#111" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            const container = scrollRef.current;
            if (!container) return;
            dragRef.current = {
              active: true,
              pointerId: e.pointerId,
              startX: e.clientX,
              startScrollLeft: container.scrollLeft,
            };
            e.currentTarget.setPointerCapture(e.pointerId);
            setIsDragging(true);
            container.style.scrollSnapType = 'none';
          }}
          onPointerMove={(e) => {
            const drag = dragRef.current;
            if (!drag.active || drag.pointerId !== e.pointerId) return;
            const container = scrollRef.current;
            if (!container) return;
            const delta = drag.startX - e.clientX;
            container.scrollLeft = drag.startScrollLeft + delta;
          }}
          onPointerUp={(e) => {
            const drag = dragRef.current;
            if (!drag.active || drag.pointerId !== e.pointerId) return;
            drag.active = false;
            setIsDragging(false);
            const container = scrollRef.current;
            if (container) container.style.scrollSnapType = 'x mandatory';
          }}
          onPointerCancel={(e) => {
            const drag = dragRef.current;
            if (drag.pointerId === e.pointerId) {
              drag.active = false;
              setIsDragging(false);
              const container = scrollRef.current;
              if (container) container.style.scrollSnapType = 'x mandatory';
            }
          }}
          style={{ 
            display: "flex", 
            gap: "1.5rem", 
            overflowX: "auto", 
            scrollSnapType: "x mandatory", 
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: "2rem",
            margin: "0",
            padding: "0 0 2rem 0",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y"
          }}
          className="hide-scrollbar"
        >
          {videos.map((video, idx) => (
            <div 
              key={`${video.id}-${idx}`} 
              className="shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              style={{ 
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                pointerEvents: isDragging ? "none" : "auto"
              }}
            >
              <div 
                className="video-container"
                style={{ 
                  position: "relative", 
                  width: "100%", 
                  borderRadius: "16px", 
                  overflow: "hidden",
                  backgroundColor: "#111",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}
              >
                {playingVideoIndex === idx ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&enablejsapi=1&rel=0&playsinline=1&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    style={{ width: "100%", height: "100%", border: 0 }}
                  />
                ) : (
                  <>
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                    />
                    <button
                      onClick={() => setPlayingVideoIndex(idx)}
                      aria-label={`Play ${video.title}`}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "#e22d2c", // Brand red
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(226, 45, 44, 0.4)",
                        transition: "transform 0.2s ease, background-color 0.2s ease"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.05)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                    >
                      <Play fill="#fff" color="#fff" size={24} style={{ marginLeft: "4px" }} />
                    </button>
                  </>
                )}
              </div>
              <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#111", lineHeight: 1.4 }}>
                {video.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Progress dots (Pagination) */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1rem" }}>
            {[...Array(totalPages)].map((_, dot) => {
              const isActive = currentPage === dot;
              return (
                <div 
                  key={dot} 
                  style={{ 
                    width: isActive ? "20px" : "6px", 
                    height: "6px", 
                    borderRadius: "3px", 
                    backgroundColor: isActive ? "#e22d2c" : "#ccc",
                    transition: "all 0.3s ease"
                  }} 
                />
              );
            })}
          </div>
        )}

        {/* View all button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
          <a
            href="https://www.youtube.com/@allfireservices"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              minWidth: "12rem",
              minHeight: "3.5rem",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.9rem 1.6rem",
              border: "1px solid #111",
              borderRadius: "999px",
              color: "#111",
              fontSize: "0.9rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "background-color 180ms ease, color 180ms ease, transform 180ms ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = "#ff5614";
              e.currentTarget.style.borderColor = "#ff5614";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#111";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#111";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            More on our YouTube channel
          </a>
        </div>
      </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .video-container {
           aspect-ratio: 9/16;
        }
        @media (max-width: 991px) {
           .video-container {
              aspect-ratio: 9/19;
           }
        }
      `}</style>
    </section>
  );
}
