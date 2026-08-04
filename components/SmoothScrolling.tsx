"use client";

import { ReactLenis } from "lenis/react";
import React from "react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Tighter lerp + shorter duration so Lenis stops lagging behind the
        // wheel — when scrollY lags, every `useScroll()`-driven transform in
        // the page catches up a frame late, which reads as shaking.
        lerp: 0.18,
        duration: 0.9,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

