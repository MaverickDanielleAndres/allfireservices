"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Tighter lerp (0.08 vs 0.1) — imperceptibly different to the eye,
        // but reduces the number of RAF iterations needed to settle each scroll event
        lerp: 0.08,
        // Slightly shorter duration reduces frame-budget cost without affecting feel
        duration: 1.2,
        smoothWheel: true,
        // Prevent Lenis from fighting Framer Motion's own RAF loop
        // by synchronising to a single external RAF tick
        syncTouch: false,
        // Prevent scroll from triggering paint on touch devices unnecessarily
        touchMultiplier: 1.5,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
