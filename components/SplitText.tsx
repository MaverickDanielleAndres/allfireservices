"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 30 }: SplitTextProps) {
  // Split into words and spaces to ensure natural word wrapping
  const tokens = text.match(/(\s+|\S+)/g) || [];
  let charIndex = 0;

  return (
    <span className={className} style={{ display: "inline" }}>
      {tokens.map((token, tokenIndex) => {
        // If it's a space, render it as normal text so the browser can wrap here
        if (/^\s+$/.test(token)) {
          return <span key={tokenIndex}>{token}</span>;
        }

        // If it's a word, wrap it in an inline-block to prevent mid-word breaks
        const characters = token.split("");
        return (
          <span key={tokenIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {characters.map((char, index) => {
              const currentDelay = charIndex * (delay / 1000);
              charIndex++;
              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.4,
                    delay: currentDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
