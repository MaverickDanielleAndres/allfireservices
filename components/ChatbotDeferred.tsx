"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// External Flame chatbot URL. We launch it via a centered popup
// window because flame.antman.xyz sends `Content-Security-Policy:
// frame-ancestors 'none'`, which forbids any site (including ours)
// from framing it.
const CHATBOT_URL = "https://flame.antman.xyz/";

// Popup-window sizing for the chatbot launcher.
const POPUP_WIDTH = 480;
const POPUP_HEIGHT = 760;

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

// Position a popup window at the centre of the user's screen,
// accounting for multi-monitor layouts and Windows taskbar offsets.
function centredPopupFeatures(width: number, height: number) {
  // `availLeft` / `availTop` are non-standard `Screen` properties
  // (used by some browsers for multi-monitor offsets) that aren't
  // part of TypeScript's lib.dom `Screen` interface, so widen the
  // type to include them.
  const screen = window.screen as (typeof window.screen & {
    availLeft?: number;
    availTop?: number;
  }) | null;
  const dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualScreenTop = window.screenTop ?? window.screenY ?? 0;
  const screenWidth =
    (screen?.availWidth ?? window.innerWidth) +
    (Math.abs((screen?.availLeft ?? dualScreenLeft) - dualScreenLeft) || 0);
  const screenHeight =
    (screen?.availHeight ?? window.innerHeight) +
    (Math.abs((screen?.availTop ?? dualScreenTop) - dualScreenTop) || 0);

  const left = dualScreenLeft + (screenWidth - width) / 2;
  const top = dualScreenTop + (screenHeight - height) / 2;

  return [
    `width=${width}`,
    `height=${height}`,
    `left=${Math.max(0, Math.round(left))}`,
    `top=${Math.max(0, Math.round(top))}`,
    "resizable=yes",
    "scrollbars=yes",
    "status=no",
    "toolbar=no",
    "menubar=no",
    "location=no",
  ].join(",");
}

export default function ChatbotDeferred() {
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
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openChatbot = () => {
    // Primary: centered popup window. If the browser blocks the popup
    // (e.g. user has a strict blocker), gracefully degrade to a new
    // tab so the click still does *something*.
    const popup = window.open(
      CHATBOT_URL,
      "ALLFIRE Assistant — Flame",
      centredPopupFeatures(POPUP_WIDTH, POPUP_HEIGHT),
    );
    if (!popup) {
      window.open(CHATBOT_URL, "_blank", "noopener,noreferrer");
    }
  };

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
        onClick={openChatbot}
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
            Ask Flame<br />from ALLFIRE
          </span>
        </span>
      </button>
    </motion.div>
  );
}
