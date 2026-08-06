"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const Chatbot = dynamic(() => import("./Chatbot"), {
  ssr: false,
});

function BrandCorner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 168 122"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 68,
        height: 48,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="chatDeferredCornerOrange" x1="74" y1="0" x2="168" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff7a1a" />
          <stop offset="0.58" stopColor="#fb5614" />
          <stop offset="1" stopColor="#ffa20d" />
        </linearGradient>
      </defs>
      <path d="M50 0H168V122C134 69 98 28 50 0Z" fill="url(#chatDeferredCornerOrange)" />
      <path d="M23 0C68 18 109 52 151 104" fill="none" stroke="#fc0403" strokeWidth="14" strokeLinecap="round" />
      <path d="M45 0C86 20 123 57 168 122" fill="none" stroke="#feaf04" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export default function ChatbotDeferred() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsMobileOrTablet(window.innerWidth <= 1024);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoaded) {
    return <Chatbot initialOpen />;
  }

  return (
    <motion.div
      drag={!isMobileOrTablet}
      dragMomentum={false}
      className="chatbot-container"
      style={{
        fontFamily: "var(--font-sans), Inter, Arial, sans-serif",
        position: "fixed",
        bottom: isMobileOrTablet ? 10 : 20,
        right: isMobileOrTablet ? 10 : 20,
        zIndex: 9999,
      }}
    >
      <button
        type="button"
        aria-label="Open ALLFIRE assistant"
        onClick={() => setIsLoaded(true)}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#fff",
          border: "1px solid #ece7e2",
          borderRadius: 8,
          padding: "10px 14px 10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          boxShadow: "0 10px 28px rgba(18,18,18,0.14)",
          minWidth: 170,
        }}
      >
        <BrandCorner />
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#fff5f0",
            color: "#fb5614",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <MessageCircle size={18} strokeWidth={2.3} />
        </span>
        <span style={{ position: "relative", zIndex: 1, textAlign: "left" }}>
          <span style={{ display: "block", margin: 0, fontSize: 11, fontWeight: 750, color: "#171717", lineHeight: 1.1 }}>
            Ask ALLFIRE
          </span>
          <span style={{ display: "block", marginTop: 3, fontSize: 10.5, color: "#747474", lineHeight: 1.1 }}>
            Service help
          </span>
        </span>
      </button>
    </motion.div>
  );
}
