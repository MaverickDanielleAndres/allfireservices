"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import styles from "./LightboxImage.module.css";

export function LightboxImage({ src, alt, sizes, fill, style, className }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => { setMounted(true); }, []);

  // Lock the body scroll and stop Lenis while the lightbox is open —
  // Lenis in `root` mode intercepts scroll events and can otherwise
  // interfere with the modal scrim.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop?.();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start?.();
    };
  }, [isOpen, lenis]);

  const modal = isOpen && (
    <div
      className={styles.overlay}
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
    >
      <button
        className={styles.closeBtn}
        onClick={() => setIsOpen(false)}
        aria-label="Close gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div
        className={styles.stage}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Enlarged view"
          className={styles.image}
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label={`Open larger photo of ${alt}`}
        style={{ width: '100%', height: 'auto', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.5rem', cursor: 'pointer', position: 'relative', padding: 0, border: 0, background: 'transparent' }}
        onClick={() => setIsOpen(true)}
        className={`group ${className || ''}`}
      >
        <Image
          fill={fill}
          src={src}
          sizes={sizes}
          alt={alt}
          style={{ objectFit: 'cover', ...style }}
          className="object-cover group-hover:scale-105"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 300ms', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem' }} className="group-hover:bg-black/10">
          <span style={{ color: 'white', fontSize: '1.5rem', opacity: 0, transition: 'opacity 300ms', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} className="group-hover:opacity-100">⤢</span>
        </div>
      </button>

      {mounted && modal && createPortal(modal, document.body)}
    </>
  );
}
