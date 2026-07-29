"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const Chatbot = dynamic(() => import("./Chatbot"), {
  ssr: false,
});

export default function ChatbotDeferred() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return <Chatbot initialOpen />;
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <button
        type="button"
        aria-label="Open ALLFIRE assistant"
        onClick={() => setIsLoaded(true)}
        style={{
          background:
            "linear-gradient(to right, #FC0403, #FB5614, #FEAF04)",
          border: "none",
          borderRadius: 999,
          padding: "5px 16px 5px 5px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-2px)";
          event.currentTarget.style.boxShadow =
            "0 6px 18px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "none";
          event.currentTarget.style.boxShadow =
            "0 4px 14px rgba(0,0,0,0.2)";
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 999,
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/logo.png"
            alt="ALLFIRE"
            width={58}
            height={26}
            sizes="58px"
            style={{
              objectFit: "contain",
              height: 26,
              width: "auto",
              display: "block",
            }}
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              margin: 0,
              fontSize: 8.5,
              fontWeight: 800,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Business Help
          </p>
          <p
            style={{
              margin: "3px 0 0",
              fontSize: 13.5,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            Ask ALLFIRE
          </p>
        </div>
      </button>
    </motion.div>
  );
}
