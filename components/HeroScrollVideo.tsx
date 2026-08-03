"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export default function HeroScrollVideo() {
  const reduceMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 1050, 2050], [1.12, 1, 1.065]);
  const rawY = useTransform(scrollY, [0, 1900], [0, -72]);
  const rawOpacity = useTransform(scrollY, [0, 220], [0.96, 1]);
  const scale = useSpring(rawScale, { stiffness: 90, damping: 26, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 90, damping: 28, mass: 0.45 });
  const videoStyle = reduceMotion
    ? { opacity: isLoaded ? 1 : 0 }
    : {
        opacity: isLoaded ? rawOpacity : 0,
        scale,
        y,
      };

  return (
    <div className="hero-scroll-video" aria-hidden="true">
      <motion.video
        className="hero-scroll-video-media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        style={videoStyle}
      >
        <source
          src="/Cinematic Real Estate Videography _ Sony FX3.mp4"
          type="video/mp4"
        />
      </motion.video>
    </div>
  );
}
