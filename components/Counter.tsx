"use client";

import { useEffect, useRef, useState } from "react";

// Counts from `from` to `to` over `duration` seconds. Uses requestAnimationFrame
// instead of framer-motion so the home page doesn't ship the framer-motion
// runtime (~80 KB) just for two animated numbers in the hero.
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
  const [value, setValue] = useState<number>(from);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const delta = to - from;
    const durMs = Math.max(1, duration * 1000);
    // easeOutCubic — matches the framer-motion default the page used before.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durMs);
      setValue(Math.round(from + delta * ease(t)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration]);

  return (
    <span
      style={{
        display: "inline-block",
        fontVariantNumeric: "tabular-nums",
        // Reserve enough width for the longest digit string so the parent
        // layout doesn't shift as the number ticks.
        minWidth: `${Math.max(String(from).length, String(to).length)}ch`,
        textAlign: "center",
      }}
    >
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
