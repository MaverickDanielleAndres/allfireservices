"use client";

import { useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";

export default function HeroScrollVideo() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 1050, 2050], [1.12, 1, 1.065]);
  const rawOpacity = useTransform(scrollY, [0, 220], [0.96, 1]);
  const scale = useSpring(rawScale, { stiffness: 90, damping: 26, mass: 0.45 });
  const videoStyle = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: rawOpacity,
        scale,
      };

  return (
    <div className="hero-scroll-video" aria-hidden="true" style={{ backgroundColor: "#111" }}>
      <motion.video
        className="hero-scroll-video-media"
        autoPlay
        muted
        loop
        playsInline
        // "metadata" loads only video dimensions/duration — prevents black flash and CLS
        // while still allowing autoplay to begin as soon as enough data is buffered
        preload="metadata"
        // Poster: shown immediately while video loads — this becomes the LCP element
        // drastically improving LCP score (visible within ~100ms of navigation)
        poster="/herosectionimage.webp"
        style={videoStyle}
      >
        <source
          src="/hero-video.mp4"
          type="video/mp4"
        />
      </motion.video>
    </div>
  );
}
