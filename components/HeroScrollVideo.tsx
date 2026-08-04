"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function HeroScrollVideo() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Use raw useTransform values — no spring. Springs on a <video> element
  // re-upload the frame to the GPU every tick and overshoot at low damping,
  // which produced visible shake when Lenis was also interpolating scrollY.
  const scale = useTransform(scrollY, [0, 1050, 2050], [1.12, 1, 1.065]);
  const y = useTransform(scrollY, [0, 1900], [0, -72]);
  const opacity = useTransform(scrollY, [0, 220], [0.96, 1]);

  return (
    <div
      className="hero-scroll-video"
      aria-hidden="true"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <motion.div
        className="hero-scroll-video-wrap"
        style={reduceMotion ? undefined : { scale, y, opacity, willChange: "transform" }}
      >
        <video
          className="hero-scroll-video-media"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}
