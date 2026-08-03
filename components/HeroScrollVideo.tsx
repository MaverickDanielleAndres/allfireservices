"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export default function HeroScrollVideo() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 620, 1100], [1.12, 1, 1.04]);
  const rawY = useTransform(scrollY, [0, 900], [0, -42]);
  const rawOpacity = useTransform(scrollY, [0, 220], [0.96, 1]);
  const scale = useSpring(rawScale, { stiffness: 90, damping: 26, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 90, damping: 28, mass: 0.45 });

  return (
    <div className="hero-scroll-video" aria-hidden="true">
      <motion.video
        className="hero-scroll-video-media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp"
        style={
          reduceMotion
            ? undefined
            : {
                opacity: rawOpacity,
                scale,
                y,
              }
        }
      >
        <source
          src="/Cinematic Real Estate Videography _ Sony FX3.mp4"
          type="video/mp4"
        />
      </motion.video>
    </div>
  );
}
