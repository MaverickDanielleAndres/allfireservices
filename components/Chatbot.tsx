"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, MessageCircle, Phone, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// External chatbot host. The ALLFIRE branded chatbox shells an iframe
// pointing at this URL so the visitor still sees "Ask Flame from ALLFIRE"
// but the conversation itself is rendered by flame.antman.xyz.
const CHATBOT_SRC = "https://flame.antman.xyz/";

function BrandCorner({ compact = false }: { compact?: boolean }) {
  const size = compact ? { width: 68, height: 48 } : { width: 168, height: 122 };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 168 122"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: size.width,
        height: size.height,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id={compact ? "chatCornerOrangeCompact" : "chatCornerOrange"} x1="74" y1="0" x2="168" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff7a1a" />
          <stop offset="0.58" stopColor="#fb5614" />
          <stop offset="1" stopColor="#ffa20d" />
        </linearGradient>
      </defs>
      <path d="M50 0H168V122C134 69 98 28 50 0Z" fill={`url(#${compact ? "chatCornerOrangeCompact" : "chatCornerOrange"})`} />
      <path d="M23 0C68 18 109 52 151 104" fill="none" stroke="#fc0403" strokeWidth="14" strokeLinecap="round" />
      <path d="M45 0C86 20 123 57 168 122" fill="none" stroke="#feaf04" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export default function Chatbot({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={wrapperRef}
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
      {isOpen && (
        <section
          className="chatbot-window"
          aria-label="ALLFIRE assistant"
          style={{
            position: "relative",
            width: isMobileOrTablet ? "calc(100vw - 20px)" : 380,
            height: 620,
            maxWidth: 380,
            maxHeight: "86vh",
            borderRadius: 8,
            boxShadow: "0 18px 46px rgba(18, 18, 18, 0.16)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ece7e2",
            background: "#fff",
          }}
        >
          <BrandCorner />

          <header style={{ position: "relative", zIndex: 1, padding: "18px 18px 12px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <Image
                  src="/logo.png"
                  alt="ALLFIRE"
                  width={84}
                  height={40}
                  priority={false}
                  style={{ objectFit: "contain", height: 36, width: "auto", display: "block" }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 12 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#21b55a", display: "inline-block" }} />
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#161616" }}>ALLFIRE Assistant</p>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#777", lineHeight: 1.45 }}>
                  Ask about services, coverage, inspections, and enquiries.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "rgba(255,255,255,0.82)",
                  color: "#4b4b4b",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>
          </header>

          {/*
            External Flame chatbot rendered inside an iframe so the
            ALLFIRE shell (header / footer / close) frames it. The
            iframe fills the remaining vertical space between the
            header and the footer bar.
          */}
          <iframe
            src={CHATBOT_SRC}
            title="ALLFIRE Assistant — Powered by Flame"
            loading="lazy"
            allow="microphone; camera; clipboard-read; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: "relative",
              zIndex: 1,
              flex: 1,
              width: "100%",
              border: 0,
              background: "#fff",
            }}
          />

          <footer style={{ position: "relative", zIndex: 1, background: "#fff", borderTop: "1px solid #ece7e2", flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "8px 14px",
                borderBottom: "1px solid #f0ece8",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                <MapPin size={12} color="#fb5614" strokeWidth={2.5} />
                <span style={{ fontSize: 10.5, color: "#777", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Greater Sydney
                </span>
              </div>
              <a href="tel:1300765594" style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none", color: "#fb5614", flexShrink: 0 }}>
                <Phone size={12} strokeWidth={2.5} />
                <span style={{ fontSize: 11.5, fontWeight: 750 }}>1300 765 594</span>
              </a>
            </div>
          </footer>
        </section>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open ALLFIRE assistant"
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
          <BrandCorner compact />
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
              Ask Flame<br />from ALLFIRE
            </span>
          </span>
        </button>
      )}
    </motion.div>
  );
}
