"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 15 }: SplitTextProps) {
  // Split into words and spaces to ensure natural word wrapping
  const tokens = text.match(/(\s+|\S+)/g) || [];
  let wordIndex = 0;

  return (
    <span className={className} style={{ display: "inline" }}>
      {tokens.map((token, tokenIndex) => {
        // If it's a space, render it as normal text so the browser can wrap here
        if (/^\s+$/.test(token)) {
          return <span key={tokenIndex}>{token}</span>;
        }

        // If it's a word, wrap it in an inline-block with overflow hidden to create a mask reveal
        const currentDelay = wordIndex * (delay / 1000);
        wordIndex++;
        return (
          <span 
            key={tokenIndex} 
            style={{ 
              display: "inline-block", 
              overflow: "hidden", 
              verticalAlign: "bottom",
              paddingBottom: "0.2em",
              marginBottom: "-0.2em"
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: "100%" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: currentDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: "inline-block" }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
