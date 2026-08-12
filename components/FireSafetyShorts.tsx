"use client";

import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./HomeStoryLegacy.module.css";

const videos = [
  { id: "QE5U0pd84gc", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "X-gp3cokXj8", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "SrN-g_YeYJE", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "3vmqgGDO1u4", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "mMPD6LFNzEo", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "CiogIrZXuz0", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "MtpcUHtEO7o", title: "Why fire near sprinklers can shut a business down overnight" },
  { id: "Cm-iK7Oe4kY", title: "Why fire near sprinklers can shut a business down overnight" },
];

export default function FireSafetyShorts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScrollLeft: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<number>>(new Set());

  const handlePlayClick = useCallback((idx: number) => {
    // Only one video can play at a time — switching unmounts the previous iframe
    setPlayingVideoIndex(idx);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Stop playback when scrolling
      setPlayingVideoIndex(null);
      const container = scrollRef.current;
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
      handleScroll();
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section
      aria-labelledby="fire-safety-shorts-title"
      style={{ background: "#ffffff", padding: "clamp(2rem, 4vw, 3rem) 0", marginTop: "clamp(4rem, 7vw, 6rem)" }}
    >
      <div className="padding-global">
        <div className="container-large">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end flex-wrap gap-4 md:gap-6 mb-6 md:mb-[clamp(2rem,4vw,3.5rem)] w-full text-center md:text-left">
            <header className="mb-0 block w-full md:w-auto">
              <p className={`${styles.kicker} mx-auto md:mx-0`}>Fire safety shorts</p>
              <h2 id="fire-safety-shorts-title" className={`${styles.shortsHeading} mx-auto md:mx-0`}>Quick lessons<br /><span style={{
                background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>from real jobs</span></h2>
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
              moved: false,
            };
            setIsDragging(true);
            container.style.scrollSnapType = 'none';
          }}
          onPointerMove={(e) => {
            const drag = dragRef.current;
            if (!drag.active || drag.pointerId !== e.pointerId) return;
            const container = scrollRef.current;
            if (!container) return;
            const delta = drag.startX - e.clientX;
            if (Math.abs(delta) > 5) drag.moved = true;
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
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "0 0 1rem 0",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
          }}
          className="hide-scrollbar shorts-carousel"
        >
          {videos.map((video, idx) => {
            const isPlaying = playingVideoIndex === idx;
            return (
              <div
                key={`${video.id}-${idx}`}
                className="shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
                style={{
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Aspect-ratio container using padding-top trick for guaranteed height */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "177.78%", // 16:9 inverse = 9:16 vertical video
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#111",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  }}
                >
                  {isPlaying ? (
                    <iframe
                      key={`playing-${idx}-${video.id}`}
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1&controls=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                        display: "block",
                      }}
                    />
                  ) : (
                    <>
                      {!thumbnailErrors.has(idx) ? (
                        <img
                          src={`/youtube-thumbnails/${video.id}.webp`}
                          alt={video.title}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          onError={() => {
                            setThumbnailErrors((prev) => {
                              const next = new Set(prev);
                              next.add(idx);
                              return next;
                            });
                          }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.9,
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #0d0d0d 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#666",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          Video preview
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handlePlayClick(idx);
                        }}
                        aria-label={`Play ${video.title}`}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          backgroundColor: "#e22d2c",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 4px 14px rgba(226, 45, 44, 0.4)",
                          transition: "transform 0.2s ease, background-color 0.2s ease",
                          zIndex: 5,
                          touchAction: "manipulation",
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                      >
                        <Play fill="#fff" color="#fff" size={24} style={{ marginLeft: "4px" }} />
                      </button>
                    </>
                  )}
                </div>
                <h3 className="shorts-title" style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#111", lineHeight: 1.4 }}>
                  {video.title}
                </h3>
              </div>
            );
          })}
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
        <div className="shorts-view-more">
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
        .shortsHeading {
          margin: 0;
          color: #111111;
          font-size: clamp(2.2rem, 4.3vw, 3.8rem);
          font-weight: 780;
          letter-spacing: -0.04em;
          line-height: 0.92;
          text-wrap: balance;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .shorts-carousel {
          gap: 1.5rem;
        }
        .shorts-view-more {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        @media (max-width: 767px) {
          .shorts-carousel {
            gap: 0.75rem;
          }
          .shorts-view-more {
            margin-top: 1.25rem;
          }
          .shorts-title {
            text-align: center;
          }
          .shortsHeading {
            font-size: clamp(1.75rem, 8.5vw, 2.6rem);
          }
        }
      `}</style>
    </section>
  );
}
