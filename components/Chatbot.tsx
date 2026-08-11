"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, MapPin, MessageCircle, Phone, RefreshCw, Send, X } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

type Message = {
  role: "user" | "model";
  content: string;
};

const POPULAR_QUESTIONS = [
  "What services does ALLFIRE provide?",
  "Do you work with strata properties?",
  "Can ALLFIRE assist with an AFSS?",
  "Where does ALLFIRE operate?",
];

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

function SubtleWave() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 120"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 128,
        width: "100%",
        height: 120,
        opacity: 0.25,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <path
          key={index}
          d={`M-28 ${58 + index * 5} C 42 ${96 + index * 3}, 74 ${108 + index * 2}, 116 ${48 + index * 3} S 206 ${26 + index * 3}, 258 ${68 + index * 2} S 338 ${88 + index * 3}, 372 ${42 + index * 2}`}
          fill="none"
          stroke="#d8d8d8"
          strokeWidth="0.7"
        />
      ))}
    </svg>
  );
}

export default function Chatbot({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileOrTablet(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

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

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Error");
      }
      if (!response.body) throw new Error("Error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunkText = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((message, index) =>
              index === prev.length - 1
                ? { ...message, content: message.content + chunkText }
                : message,
            ),
          );
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "";
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: errorMessage
            ? `Sorry, there was an error: ${errorMessage}. Please call us on **1300 765 594**.`
            : "Sorry, there was an error. Please call us on **1300 765 594**.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

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
            width: isMobileOrTablet ? "calc(100vw - 20px)" : 340,
            height: 560,
            maxWidth: 340,
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
          <SubtleWave />

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

              <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                <button
                  onClick={() => setMessages([])}
                  title="Reset chat"
                  aria-label="Reset chat"
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
                  }}
                >
                  <RefreshCw size={14} strokeWidth={2} />
                </button>
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
                  }}
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          </header>

          <div style={{ position: "relative", zIndex: 1, flex: 1, overflowY: "auto", padding: "0 14px 12px" }}>
            {messages.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 10 }}>
                <div
                  style={{
                    border: "1px solid #eeeeee",
                    borderRadius: 8,
                    padding: "13px 14px",
                    background: "rgba(255,255,255,0.9)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <MessageCircle size={15} color="#fb5614" strokeWidth={2.3} />
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 750, color: "#171717" }}>How can I help?</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.55 }}>
                    I can help with general ALLFIRE service questions. For property-specific advice, our team can arrange an assessment.
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <HelpCircle size={13} color="#fb5614" strokeWidth={2.3} />
                    <span style={{ fontSize: 11, fontWeight: 750, color: "#767676", textTransform: "uppercase" }}>
                      Popular questions
                    </span>
                  </div>
                  <div style={{ display: "grid", gap: 7 }}>
                    {POPULAR_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        onClick={() => handleSend(question)}
                        style={{
                          width: "100%",
                          minHeight: 38,
                          background: "#fff",
                          border: "1px solid #e8e2dc",
                          borderRadius: 8,
                          padding: "9px 10px",
                          textAlign: "left",
                          fontSize: 12,
                          color: "#2d2d2d",
                          lineHeight: 1.35,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#fb5614";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e8e2dc";
                        }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 10 }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                      alignItems: "flex-end",
                      gap: 7,
                    }}
                  >
                    {message.role === "model" && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "#fff",
                          border: "1px solid #ece7e2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Image src="/logo.png" alt="ALLFIRE" width={15} height={15} style={{ objectFit: "contain", width: 15, height: 15 }} />
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "78%",
                        padding: "9px 11px",
                        fontSize: 12,
                        lineHeight: 1.5,
                        borderRadius: message.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                        background: message.role === "user" ? "#fb5614" : "#fff",
                        color: message.role === "user" ? "#fff" : "#242424",
                        border: message.role === "model" ? "1px solid #ece7e2" : "1px solid #fb5614",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      {message.role === "model" ? <ReactMarkdown>{message.content}</ReactMarkdown> : message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#fff",
                        border: "1px solid #ece7e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Image src="/logo.png" alt="ALLFIRE" width={15} height={15} style={{ objectFit: "contain", width: 15, height: 15 }} />
                    </div>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #ece7e2",
                        borderRadius: "12px 12px 12px 3px",
                        padding: "10px 13px",
                        display: "flex",
                        gap: 4,
                        alignItems: "center",
                      }}
                    >
                      {[0, 0.2, 0.4].map((delay, index) => (
                        <span
                          key={index}
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#c8c8c8",
                            display: "inline-block",
                            animation: `bounce 1s ${delay}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

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

            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center", padding: 10 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ALLFIRE services"
                disabled={isLoading}
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "1px solid #ded8d2",
                  borderRadius: 999,
                  padding: "9px 13px",
                  fontSize: 12,
                  outline: "none",
                  color: "#282828",
                  background: "#fff",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#fb5614";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#ded8d2";
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#fb5614",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  opacity: !input.trim() || isLoading ? 0.45 : 1,
                }}
              >
                <Send size={14} color="#fff" strokeWidth={2.5} style={{ transform: "translateX(-1px) translateY(1px)" }} />
              </button>
            </form>
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

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .chatbot-window p {
          margin: 0;
        }

        .chatbot-window p + p {
          margin-top: 0.5rem;
        }
      `}</style>
    </motion.div>
  );
}
