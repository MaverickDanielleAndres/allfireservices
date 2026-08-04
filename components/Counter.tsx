"use client";

import React, { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";

export default function Counter({
  from = 0,
  to,
  duration = 2,
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
  // Trigger animation slightly earlier without waiting for 50%
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, to, { 
        duration, 
        // Custom ease-out cubic for a satisfying slowdown effect
        ease: [0.33, 1, 0.68, 1] 
      });
    }
  }, [inView, count, to, duration]);

  return (
    <motion.span 
      ref={ref} 
      style={{ display: "inline-block" }}
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
