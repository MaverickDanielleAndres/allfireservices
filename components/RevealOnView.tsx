"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // How much of the element must be visible before the animation fires.
  // Matches framer-motion's `viewport.amount` of 0.12.
  threshold?: number;
};

/**
 * Tiny (~1 KB) replacement for the framer-motion `<motion.div whileInView>`
 * pattern used throughout the home page. Uses IntersectionObserver + a CSS
 * class toggle so the animation is identical (24 px slide-up, 650 ms ease-out,
 * once-only) without shipping framer-motion in the JS bundle.
 *
 * For elements that are already in the viewport at mount time (above the
 * fold), we skip the initial `translateY(24px)` so we don't trigger a
 * layout shift on first paint.
 */
export default function RevealOnView({
  children,
  className = "",
  style,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Default to `true` so SSR / no-JS / already-in-viewport elements render
  // in their final position. Only below-fold elements get the offset.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // If the element is already in (or above) the viewport on mount, skip
    // the offset entirely. This is the fix for the home-page CLS regression
    // — the hero is above the fold, so the IO fires almost immediately and
    // was previously toggling `transform: translateY(24px) → translateY(0)`
    // which caused a layout shift.
    const rect = node.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportH * 0.9) {
      // Already visible — don't add the offset, don't observe.
      return;
    }

    // Below-fold: start hidden, animate in on intersection.
    setVisible(false);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "reveal reveal-in" : "reveal"}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
