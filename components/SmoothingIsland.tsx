"use client";

/**
 * SmoothingIsland — minimal client island that lazy-loads the Lenis smooth
 * scroll runtime. Mounts on the first user input (scroll, mouse, key,
 * touch) instead of when the page mounts. Until then, the page uses the
 * browser's native scroll, which is fine for the initial paint.
 *
 * The previous `SmoothScrolling` component (a 20 KB+ chunk) sat in the
 * root layout and was required for the entire React tree. Moving it here
 * removes that dependency from the initial bundle.
 */

import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}

export default function SmoothingIsland() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__lenis) return;

    const startLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (window.__lenis) return;
      const lenis = new Lenis({
        lerp: 0.18,
        duration: 0.9,
        smoothWheel: true,
      });
      window.__lenis = lenis;

      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Cleanup the listeners so they don't fire repeatedly.
      window.removeEventListener("scroll", startLenis, { passive: true } as AddEventListenerOptions);
      window.removeEventListener("mousedown", startLenis);
      window.removeEventListener("keydown", startLenis);
      window.removeEventListener("touchstart", startLenis);
    };

    // Lazy-load on the first user interaction.
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", startLenis, opts);
    window.addEventListener("mousedown", startLenis);
    window.addEventListener("keydown", startLenis);
    window.addEventListener("touchstart", startLenis, opts);

    return () => {
      window.removeEventListener("scroll", startLenis, opts);
      window.removeEventListener("mousedown", startLenis);
      window.removeEventListener("keydown", startLenis);
      window.removeEventListener("touchstart", startLenis, opts);
      if (window.__lenis) {
        window.__lenis.destroy();
        window.__lenis = undefined;
      }
    };
  }, []);

  return null;
}
