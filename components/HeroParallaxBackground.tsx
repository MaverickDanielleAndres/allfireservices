"use client";

import React, { useEffect, useRef } from "react";

export default function HeroParallaxBackground() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    function updateParallax() {
      ticking = false;
      if (!section || !image || reduceMotion.matches) {
        if (image && reduceMotion.matches) {
          image.style.transform = "none";
        }
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      const y = (clamped - 0.5) * 110;
      image.style.setProperty("--parallax-y", `${y}px`);
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener?.("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener?.("change", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        isolation: "isolate",
        zIndex: 0,
      }}
    >
      {/*
        fetchpriority="high": tells the browser to download this image early
        width/height: prevents CLS by reserving space before the image loads
        loading="eager": disables lazy-load since this is always above the fold
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src="/hydrant-parallax-package/all-fire-services-hydrant-parallax.webp"
        alt="Hydrant Testing"
        width={2048}
        height={1365}
        // @ts-expect-error -- fetchpriority is valid HTML not yet fully typed
        fetchpriority="high"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          top: "-14%",
          left: 0,
          right: 0,
          bottom: "-14%",
          width: "100%",
          height: "128%",
          objectFit: "cover",
          objectPosition: "57% 52%",
          transform: "translate3d(0, var(--parallax-y, 0px), 0) scale(1.03)",
          willChange: "transform",
          zIndex: -2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,.16), rgba(0,0,0,.55))",
          zIndex: -1,
        }}
      />
    </div>
  );
}
