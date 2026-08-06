"use client";

import { useState } from "react";
import Image from "next/image";

export function LightboxImage({ src, alt, sizes, fill, style, className }: any) {
  const [isOpen, setIsOpen] = useState(false);
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

      {isOpen && (
        <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '90px 24px 24px',
            }}
            onClick={() => setIsOpen(false)}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '110px',
                right: '24px',
                zIndex: 50,
                padding: '0.625rem',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                transition: 'background-color 0.2s',
                lineHeight: 1,
              }}
              aria-label="Close gallery"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt="Enlarged view"
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(100vh - 140px)',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  display: 'block'
                }}
              />
            </div>
          </div>
      )}
    </>
  );
}
