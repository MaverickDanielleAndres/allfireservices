"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";
import styles from "./HeroScrollCue.module.css";

type HeroScrollCueProps = {
  /** Visible label inside the pill. */
  label?: string;
  /**
   * Optional CSS selector for the scroll target. When omitted the cue scrolls
   * to whatever element follows the hero <header>, so it works unchanged on
   * every page that uses the shared hero.
   */
  targetSelector?: string;
};

export default function HeroScrollCue({
  label = "Scroll down",
  targetSelector,
}: HeroScrollCueProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  const handleClick = () => {
    const target = targetSelector
      ? document.querySelector<HTMLElement>(targetSelector)
      : (buttonRef.current?.closest("header")?.nextElementSibling as
          | HTMLElement
          | null);

    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.cueWrap}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className={styles.cue}
        aria-label="Scroll to the next section"
      >
        <span className={styles.cueLabel}>{label}</span>
        <span className={styles.cueIcon} aria-hidden="true">
          <ChevronDown size={16} strokeWidth={2.6} />
        </span>
      </button>
    </div>
  );
}
