"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, CheckCircle2, AlertTriangle, MapPin, Phone, HelpCircle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const POPULAR_QUESTIONS = [
  "What services does ALLFIRE provide?",
  "Do you work with strata properties?",
  "Can you help with passive-fire penetrations?",
  "Can ALLFIRE assist with an AFSS?",
  "Where does ALLFIRE operate?",
  "How do I request an inspection?",
  "Can services be bundled?",
  "How do I request urgent support?",
];

export default function Chatbot({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!response.ok || !response.body) throw new Error('Error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

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
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: 'Sorry, there was an error. Please call us on **1300 765 594**.' },
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
    <motion.div ref={wrapperRef} drag dragMomentum={false} style={{ fontFamily: 'Inter, Arial, sans-serif', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>

      {/* ── CHAT WINDOW ── */}
      {isOpen && (
        <div style={{
          width: 340,
          height: 580,
          maxHeight: '88vh',
          borderRadius: 16,
          boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(0,0,0,0.08)',
          background: '#f5f4f2',
        }}>

          {/* ── COMPACT DARK HEADER ── */}
          <div style={{
            background: 'linear-gradient(150deg,#1c1008,#2a1a0e)',
            padding: '10px 12px',
            flexShrink: 0,
            position: 'relative',
          }}>
            {/* X */}
            <button onClick={() => setIsOpen(false)} style={{
              position: 'absolute', top: 8, right: 10,
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.45)', cursor: 'pointer', padding: 2, lineHeight: 1,
            }}>
              <X size={15} strokeWidth={2} />
            </button>

            {/* Logo + title row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <div style={{
                background: '#fff', borderRadius: 8,
                padding: '4px 6px', flexShrink: 0,
                display: 'flex', alignItems: 'center',
              }}>
                <Image
                  src="/logo.png" alt="ALLFIRE"
                  width={56} height={28}
                  style={{ objectFit: 'contain', height: 28, width: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                    ALLFIRE Assistant
                  </span>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e676', display: 'inline-block', flexShrink: 0 }} />
                </div>
                <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  Business and service information
                </p>
              </div>
            </div>

            {/* Badge pills — one row */}
            <div style={{ display: 'flex', gap: 5 }}>
              {[
                { icon: <ShieldCheck size={9} color="#ffb74d" strokeWidth={2.5} />, label: 'ALLFIRE QUESTIONS ONLY' },
                { icon: <AlertTriangle size={9} color="rgba(255,255,255,0.45)" strokeWidth={2.5} />, label: '000 FOR EMERGENCIES' },
              ].map((b) => (
                <div key={b.label} style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 999, padding: '3px 7px',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  {b.icon}
                  <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.05em' }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── SCROLLABLE CONTENT ── */}
          <div style={{ flex: 1, overflowY: 'auto', background: '#f5f4f2' }}>
            {messages.length === 0 ? (
              <div style={{ padding: '10px 9px', display: 'flex', flexDirection: 'column', gap: 9 }}>

                {/* How can I help card */}
                <div style={{
                  background: '#fff', borderRadius: 11,
                  padding: '10px 11px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <div style={{ background: '#fff0f0', borderRadius: '50%', padding: 5, flexShrink: 0 }}>
                      <CheckCircle2 size={13} color="#e53e3e" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 3px', fontSize: 12, fontWeight: 700, color: '#111', lineHeight: 1.2 }}>
                        How can I help?
                      </h3>
                      <p style={{ margin: 0, fontSize: 10.5, color: '#666', lineHeight: 1.5 }}>
                        I answer questions about ALLFIRE services, coverage, enquiries, and general service information.
                        I will not guess when a business detail is unconfirmed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Popular questions */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <HelpCircle size={10} color="#e53e3e" strokeWidth={2.5} />
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Popular Questions
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                    {POPULAR_QUESTIONS.map((q, i) => (
                      <button key={i} onClick={() => handleSend(q)} style={{
                        background: '#fff',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: 9, padding: '7px 8px',
                        textAlign: 'left', fontSize: 10,
                        color: '#333', lineHeight: 1.4,
                        cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'border-color 0.15s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#f87171'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.1)'; }}
                      >{q}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '10px 9px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end', gap: 6,
                  }}>
                    {msg.role === 'model' && (
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Image src="/logo.png" alt="Logo" width={14} height={14}
                          style={{ objectFit: 'contain', width: 14, height: 14 }} />
                      </div>
                    )}
                    <div style={{
                      maxWidth: '78%', padding: '7px 10px',
                      fontSize: 11, lineHeight: 1.5,
                      borderRadius: msg.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                      background: msg.role === 'user' ? 'linear-gradient(135deg,#ef4444,#dc2626)' : '#fff',
                      color: msg.role === 'user' ? '#fff' : '#222',
                      border: msg.role === 'model' ? '1px solid rgba(0,0,0,0.07)' : 'none',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                    }}>
                      {msg.role === 'model'
                        ? <div style={{ fontSize: 11 }}><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                        : msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Image src="/logo.png" alt="Logo" width={14} height={14}
                        style={{ objectFit: 'contain', width: 14, height: 14 }} />
                    </div>
                    <div style={{
                      background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                      borderRadius: '12px 12px 12px 3px',
                      padding: '9px 12px', display: 'flex', gap: 4, alignItems: 'center',
                    }}>
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <span key={i} style={{
                          width: 5, height: 5, borderRadius: '50%', background: '#ccc',
                          display: 'inline-block', animation: `bounce 1s ${delay}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* ── FOOTER ── */}
          <div style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
            {/* Contact strip */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 11px', borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={10} color="#e53e3e" strokeWidth={2.5} />
                <span style={{ fontSize: 9.5, color: '#888' }}>Greater Sydney service enquiries</span>
              </div>
              <a href="tel:1300765594" style={{ display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', color: '#e53e3e' }}>
                <Phone size={10} strokeWidth={2.5} />
                <span style={{ fontSize: 10.5, fontWeight: 700 }}>1300 765 594</span>
              </a>
            </div>

            {/* Input */}
            <div style={{ padding: '7px 9px 5px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input
                  type="text" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about ALLFIRE services..."
                  disabled={isLoading}
                  style={{
                    flex: 1, border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: 999, padding: '8px 13px',
                    fontSize: 11, outline: 'none',
                    color: '#333', background: '#fff', fontFamily: 'inherit',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#f87171'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; }}
                />
                <button type="submit" disabled={!input.trim() || isLoading} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#ffaaaa', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                  opacity: !input.trim() || isLoading ? 0.45 : 1,
                }}>
                  <Send size={12} color="#fff" strokeWidth={2.5}
                    style={{ transform: 'translateX(-1px) translateY(1px)' }} />
                </button>
              </form>
              <p style={{ margin: '4px 0 3px', fontSize: 8.5, color: '#bbb', textAlign: 'center', lineHeight: 1.4 }}>
                General business information only. Property-specific questions require an assessment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── FAB BUTTON — compact pill, no glow ── */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={{
          background: 'linear-gradient(to right, #FC0403, #FB5614, #FEAF04)',
          border: 'none',
          borderRadius: 999,
          padding: '5px 16px 5px 5px',
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'none';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(0,0,0,0.2)';
        }}
        >
          {/* Logo in white pill */}
          <div style={{
            background: '#fff', borderRadius: 999,
            padding: '4px 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Image
              src="/logo.png" alt="ALLFIRE"
              width={58} height={26}
              style={{ objectFit: 'contain', height: 26, width: 'auto', display: 'block' }}
            />
          </div>
          {/* Text */}
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: 8.5, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>
              Business Help
            </p>
            <p style={{ margin: '3px 0 0', fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
              Ask ALLFIRE
            </p>
          </div>
        </button>
      )}

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </motion.div>
  );
}
