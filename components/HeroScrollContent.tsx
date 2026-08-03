"use client";

import {
  motion,
} from "framer-motion";
import type { ReactNode } from "react";

type HeroScrollContentProps = {
  children: ReactNode;
};

export default function HeroScrollContent({ children }: HeroScrollContentProps) {
  return (
    <motion.div
      data-parallax-layer="3"
      className="parallax__layer-title hero-scroll-content-layer"
      initial={{ opacity: 0, y: 72 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.22 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
