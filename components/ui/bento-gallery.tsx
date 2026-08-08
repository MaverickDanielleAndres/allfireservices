"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Defines the structure for each image item in the gallery
type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  span: string // Tailwind CSS grid span classes (e.g., "md:col-span-2 md:row-span-2")
}

// Defines the props for the main gallery component
interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  kicker?: string
  title: string
  titleAccent?: string
  description: string
}

// Animation variants for each gallery item
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
}

// Helper — given the items array, derive a Masonry-style span class for each item so the
// grid produces an asymmetric staggered collage (LARGE / TALL / SMALL / WIDE repeating).
function buildSpan(idx: number, total: number): string {
  // Pattern (mod 7): LARGE 2x2, TALL 1x2, SMALL 1x1, WIDE 2x1, SMALL 1x1, TALL 1x2, WIDE 2x1
  const pattern = [
    'md:col-span-2 md:row-span-2', // 0: LARGE (2 cols × 2 rows)
    'md:col-span-1 md:row-span-2', // 1: TALL  (1 col  × 2 rows)
    'md:col-span-1 md:row-span-1', // 2: SMALL (1 col  × 1 row)
    'md:col-span-2 md:row-span-1', // 3: WIDE  (2 cols × 1 row)
    'md:col-span-1 md:row-span-1', // 4: SMALL (1 col  × 1 row)
    'md:col-span-1 md:row-span-2', // 5: TALL  (1 col  × 2 rows)
    'md:col-span-2 md:row-span-1', // 6: WIDE  (2 cols × 1 row)
  ]
  return pattern[idx % pattern.length]
}

// Modal component for displaying the selected image
const ImageModal = ({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: ImageItem
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Mount check for SSR/portal. The modal is rendered via a React Portal at
  // document.body level so it escapes any transformed ancestors.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Prevent body scroll while modal is open.
  // Must be called BEFORE any conditional return so the hook order is stable.
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mounted]);

  if (!mounted) return null;

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Use onClick (not onPointerDown) + the dedicated backdrop layer below
      // so a click ANYWHERE outside the image reliably closes the modal.
      // The backdrop fills the entire viewport and sits below the image
      // (z-index 1 vs image's z-index 10).
      onClick={(e) => {
        // Only close if the user clicked the container or backdrop, not
        // a child button (close/prev/next) or the image.
        if (e.target === e.currentTarget) onClose();
      }}
      // `fixed inset-0` fills the entire viewport so the modal is always
      // centered on the screen, not constrained to the gallery section.
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        paddingTop: 'clamp(1rem, 4vh, 2rem)',
        paddingBottom: 'clamp(1rem, 4vh, 2rem)',
        paddingLeft: 'clamp(0.75rem, 4vw, 4rem)',
        paddingRight: 'clamp(0.75rem, 4vw, 4rem)',
      }}
    >
      {/* Dedicated backdrop layer — guarantees the "click outside" zone
          always catches the event, regardless of where the image is. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          cursor: 'zoom-out',
          zIndex: 1,
        }}
      />

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image view"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: '2.75rem',
          height: '2.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '999px',
          color: '#ffffff',
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <X size={22} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        style={{
          position: 'absolute',
          left: 'clamp(0.5rem, 1.5vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2.75rem',
          height: '2.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '999px',
          color: '#ffffff',
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        style={{
          position: 'absolute',
          right: 'clamp(0.5rem, 1.5vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2.75rem',
          height: '2.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '999px',
          color: '#ffffff',
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        // The container is `display: inline-block` so it shrinks to fit the
        // image's natural size. This way the dark area around the photo
        // is the modal backdrop, NOT the image container — so clicks on the
        // dark area reliably reach the backdrop's onClick={onClose}.
        className="relative inline-block mx-auto"
        style={{ maxWidth: 'min(90vw, 1100px)', zIndex: 10, lineHeight: 0 }}
        // Don't stop propagation on the image itself — the modal container's
        // `e.target === e.currentTarget` check already prevents the image
        // click from closing. Letting it bubble means the backdrop can
        // still receive clicks on the dark area beside the image.
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.title}
          // `display: block; max-width: 100%; max-height: 80vh` makes the img
          // shrink to its natural aspect ratio up to the size constraints,
          // instead of stretching to fill the container (which was capturing
          // clicks on the empty area around the photo).
          className="rounded-lg select-none block"
          draggable={false}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            width: 'auto',
            height: 'auto',
            cursor: 'default',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </motion.div>
  );

  // Render the modal via a React Portal at document.body level so it escapes
  // the transformed bento-gallery section and behaves as a true full-viewport
  // overlay. This is what makes "click outside" reliably close the modal.
  return createPortal(modal, document.body);
}

// Main gallery component
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, kicker, title, titleAccent, description }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [loopItems, setLoopItems] = useState<ImageItem[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetWidth = useRef(0)

  const x = useMotionValue(0)

  // Pause auto-scroll state
  const isPaused = useRef(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Duplicate items so the track can loop seamlessly.
  // 5× duplication gives a generous buffer so the user never sees the
  // "end" of the gallery — even at high scroll speeds.
  useEffect(() => {
    if (imageItems.length > 0) {
      const total = imageItems.length;
      const expanded = [
        ...imageItems,
        ...imageItems,
        ...imageItems,
        ...imageItems,
        ...imageItems,
      ].map((item, idx) => ({
        ...item,
        span: buildSpan(idx % total, total),
      }));
      setLoopItems(expanded);
    }
  }, [imageItems])

  // Measure width of one full set of items so we can wrap around
  const measureSingleSet = useCallback(() => {
    if (!trackRef.current || loopItems.length === 0) return
    const total = trackRef.current.scrollWidth
    // Divide by 5 because we duplicate items 5×
    singleSetWidth.current = total / 5
  }, [loopItems.length])

  useEffect(() => {
    measureSingleSet()
    window.addEventListener("resize", measureSingleSet)
    return () => window.removeEventListener("resize", measureSingleSet)
  }, [measureSingleSet])

  // Auto-scroll loop using useAnimationFrame. The track has 5× copies of
  // the items so wrapping the position at ±singleSetWidth creates a seamless
  // infinite loop. The setW guard handles the case where the measure hasn't
  // completed yet (useAnimationFrame runs every frame regardless of measure).
  useAnimationFrame((_t, delta) => {
    if (isPaused.current) return

    const setW = singleSetWidth.current > 0
      ? singleSetWidth.current
      : (loopItems.length / 5) * 14 * 16; // fallback until measure runs
    if (setW === 0) return

    // 80 px/sec — fast enough that the loop is obviously continuous and
    // never gives the "ended" feeling. delta is in milliseconds.
    const speed = 80;
    let next = x.get() - (speed * delta) / 1000

    // Seamless wrap when position passes one set's width.
    if (next <= -setW) {
      next += setW;
    }
    if (next > 0) {
      next -= setW;
    }

    x.set(next)
  })

  // Continuous auto-scroll using framer-motion's useAnimationFrame.
  // `delta` is the time in milliseconds since the previous frame, so we divide by 1000
  // to get seconds. Using `requestAnimationFrame`-driven deltas keeps the motion smooth
  // (no setInterval drift) and pauses cleanly when isPaused is set.
  useAnimationFrame((_t, delta) => {
    if (isPaused.current) return

    // Use measured singleSetWidth, OR if it's 0 (e.g. before the measure ran)
    // fall back to a default so the loop still works on first frame.
    const setW = singleSetWidth.current > 0
      ? singleSetWidth.current
      : (loopItems.length / 5) * 14 * 16; // rough fallback based on 5× copies
    if (setW === 0) return

    const speed = 25 // px/sec
    let next = x.get() - (speed * delta) / 1000

    // Wrap when the position passes one full set's width. The 5× duplication
    // means we always have content to scroll into — seamless infinite loop.
    if (next <= -setW) {
      next += setW;
    }
    if (next > 0) {
      next -= setW;
    }

    x.set(next)
  })

  const pauseAutoScroll = useCallback(() => {
    isPaused.current = true
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(() => {
      isPaused.current = false
    }, 1800)
  }, [])

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    }
  }, [])

  const handleDragEnd = () => {
    const current = x.get()
    const setW = singleSetWidth.current
    if (setW === 0) return

    // Wrap position into the [-setW, 0] range so the loop stays seamless.
    // useMotionValue doesn't have a `jumpTo` method — use `set` to update the
    // value without firing a normal animation (instant jump).
    if (current <= -setW) {
      x.set(current + setW)
    } else if (current > 0) {
      x.set(current - setW)
    }

    resumeTimeout.current = setTimeout(() => {
      isPaused.current = false
    }, 1200)
  }

  // Lightbox handlers
  const openLightbox = (loopIdx: number) => {
    const setSize = imageItems.length
    if (setSize === 0) return
    setSelectedIndex(loopIdx % setSize)
  }
  const closeLightbox = () => setSelectedIndex(null)
  const showPrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex((i) => (i === null ? null : (i - 1 + imageItems.length) % imageItems.length))
  }
  const showNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((i) => (i === null ? null : (i + 1) % imageItems.length))
  }

  return (
    <section
      className="relative bg-background py-16 sm:py-20 md:py-24"
      style={{
        // Break out of any parent container (e.g. .container-large) so the
        // gallery can extend edge-to-edge and overflow horizontally off-screen
        // as the user drags. width:100vw + negative margin on each side does
        // the trick without needing position:fixed or extra wrappers.
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Mobile (< 768px): each card is ~60vw wide so 1.5-2 cards are
             visible at a time. Continuous auto-scroll means new cards always
             appear from the right — no white gaps. */
          @media (max-width: 767px) {
            .bento-grid {
              grid-auto-columns: 12rem !important;
              grid-auto-rows: 9rem !important;
              gap: 0.5rem !important;
            }
          }
        `,
      }} />
      <style dangerouslySetInnerHTML={{
        __html: `
          .bento-legacy-header h2 { margin-left: 0; margin-right: 0; }
          .bento-legacy-header p { margin-left: 0; margin-right: 0; }
          @media (max-width: 991px) {
            .bento-legacy-header {
              grid-template-columns: 1fr !important;
              row-gap: 1.5rem;
              text-align: center !important;
              align-items: center !important;
            }
            .bento-legacy-header h2,
            .bento-legacy-header p {
              margin-left: auto !important;
              margin-right: auto !important;
            }
            .bento-legacy-header p {
              margin-top: 0 !important;
            }
          }
          @media (max-width: 767px) {
            .bento-legacy-header h2 {
              font-size: clamp(2.65rem, 13vw, 4rem) !important;
            }
          }
        `
      }} />
      <div
        className="container mx-auto px-4 bento-legacy-header"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(18rem, 0.7fr)',
          columnGap: '4rem',
          alignItems: 'end',
          marginTop: 'clamp(2rem, 5vh, 6rem)',
          marginBottom: 'clamp(1rem, 2vw, 2rem)',
          textAlign: 'left',
        }}
      >
        {kicker ? (
          <p
            style={{
              gridColumn: '1 / -1',
              margin: '0 0 1rem',
              color: '#e94716',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              lineHeight: 1.3,
              textTransform: 'uppercase',
            }}
          >
            {kicker}
          </p>
        ) : null}
        <h2
          style={{
            maxWidth: '13ch',
            margin: 0,
            color: '#111111',
            fontSize: 'clamp(2.8rem, 5.8vw, 6rem)',
            fontWeight: 780,
            letterSpacing: '-0.06em',
            lineHeight: 0.92,
            textWrap: 'balance',
          }}
        >
          {title}
          {titleAccent ? (
            <>
              <br />
              <span
                style={{
                  background: 'linear-gradient(to right, #ff2a00, #ffb700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {titleAccent}
              </span>
            </>
          ) : null}
        </h2>
        <p
          style={{
            maxWidth: '34rem',
            margin: 0,
            color: '#4a4a46',
            fontSize: 'clamp(1rem, 1.45vw, 1.18rem)',
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      </div>

      {/* Edge-to-edge horizontal masonry track with infinite auto-scroll. */}
      <div
        className="relative mt-12 w-full cursor-grab active:cursor-grabbing overflow-hidden"
        onPointerDown={pauseAutoScroll}
      >
        {/* Left + right fade overlays — edge-to-edge soft fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{
            width: 'clamp(4rem, 8vw, 8rem)',
            background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: 'clamp(4rem, 8vw, 8rem)',
            background: 'linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Outer wrapper handles drag translation + sizing. Inner grid handles layout. */}
        <motion.div
          ref={trackRef}
          className="bento-track"
          style={{
            x,
            paddingLeft: '1rem',
            paddingRight: '1rem',
            width: 'max-content',
            // Height is set via CSS (mobile = single row taller card, desktop = 2-row masonry)
            cursor: 'grab',
            willChange: 'transform',
            touchAction: 'pan-y',
          }}
          drag="x"
          dragDirectionLock
          dragMomentum={false}
          dragElastic={0}
          onDragStart={pauseAutoScroll}
          onDragEnd={handleDragEnd}
          onPointerDown={pauseAutoScroll}
          onPointerUp={handleDragEnd}
          onPointerLeave={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div
            className="bento-grid"
            style={{
              display: 'grid',
              gridAutoFlow: 'column dense',
              gridAutoColumns: '14rem',
              gridAutoRows: '12rem',
              gap: '0.75rem',
              width: 'max-content',
            }}
          >
            {loopItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-black/5 bg-card shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb5614] focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
                  item.span,
                )}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                tabIndex={0}
                aria-label={`View image`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && imageItems[selectedIndex] && (
          <ImageModal
            item={imageItems[selectedIndex]}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery