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
 */
export default function RevealOnView({
  children,
  className = "",
  style,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // SSR / unsupported — just show it.
      setVisible(true);
      return;
    }
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
      className={`${className} reveal ${visible ? "reveal-in" : ""}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
