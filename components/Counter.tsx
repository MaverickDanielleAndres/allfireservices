"use client";

import React, { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

export default function Counter({
  from = 0,
  to,
  duration = 0.6,
  suffix = "",
  prefix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef(null);
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Start animation instantly on mount, matching the parent's 600ms slide-in
    animate(count, to, { 
      duration, 
      ease: [0.33, 1, 0.68, 1] 
    });
  }, [count, to, duration]);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        fontVariantNumeric: "tabular-nums",
        // Reserve enough width for the longest digit string during the count
        // so the parent layout doesn't shift as the number ticks down.
        minWidth: `${Math.max(String(from).length, String(to).length)}ch`,
        textAlign: "center",
      }}
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
