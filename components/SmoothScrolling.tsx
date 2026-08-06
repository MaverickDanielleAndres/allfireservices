"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import React from "react";

// Resets Lenis to the top of the page on every client-side navigation.
// Without this, Lenis keeps its old internal scroll position after a route
// change, which causes position:sticky to lose its scroll context.
function LenisRouteReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    // Immediately snap to top so Lenis internal state matches the browser
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.18,
        duration: 0.9,
        smoothWheel: true,
      }}
    >
      <LenisRouteReset />
      {children}
    </ReactLenis>
  );
}

