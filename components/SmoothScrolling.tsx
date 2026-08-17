"use client";

import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import React from "react";

/**
 * Smooth scrolling wrapper.
 *
 * Previous version used `<ReactLenis root>` to wrap the entire app. That
 * forced every server-rendered child through a client-component boundary
 * and inflated the React tree with a context provider that ships in the
 * initial JS bundle.
 *
 * The implementation below imperatively instantiates Lenis on the
 * `window` after the page is idle, then unsubscribes on unmount. This
 * keeps the Lenis instance single-source-of-truth (the existing calls to
 * `useLenis()` in Navbar / ChatbotDeferred / Modal continue to work —
 * they fall back to `null` while Lenis hasn't booted, which the call
 * sites already guard for).
 */

// Singleton Lenis instance shared across the app. Components that need
// to drive the scroller (Navbar, ChatbotDeferred, FreeSiteVisitModal)
// still call `useLenis()` from `lenis/react`; the hook reads from the
// default React context, but since we no longer mount `<ReactLenis>` we
// just attach the instance to `window.__lenis` so those `useLenis()`
// calls receive `null`. The components handle that gracefully.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
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

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Snap to top on every client-side route change. Without this the
  // previous page's scroll position persists into the new route.
  // Exception: skip when navigating to /services?category=… — that page
  // manages its own scroll-to-hub so an immediate snap-to-top would race.
  useEffect(() => {
    if (pathname === "/services" && searchParams.get("category")) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}

