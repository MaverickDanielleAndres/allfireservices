"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./HomepageStats.module.css";

const stats = [
  { value: 16, suffix: "+", label: "years protecting Sydney" },
  { value: 8, suffix: "+", label: "essential fire services" },
  { value: 100, suffix: "%", label: "Australian owned" },
  { value: 24, suffix: "/7", label: "rapid response" },
] as const;

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    let animationFrame = 0;
    let hasAnimated = false;

    const revealFinalValue = () => setDisplayValue(value);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealFinalValue();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;

        hasAnimated = true;
        observer.disconnect();

        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setDisplayValue(Math.round(value * easedProgress));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span ref={valueRef} className={styles.value} aria-hidden="true">
      {displayValue.toLocaleString("en-AU")}
      {suffix}
    </span>
  );
}

export default function HomepageStats() {
  return (
    <section className={styles.section} aria-label="All Fire Services at a glance">
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <div
            className={styles.stat}
            key={stat.label}
            style={{ "--stat-delay": `${index * 90}ms` } as CSSProperties}
            aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
          >
            <CountUp value={stat.value} suffix={stat.suffix} />
            <span className={styles.label} aria-hidden="true">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
