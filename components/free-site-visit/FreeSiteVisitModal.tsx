"use client";

/**
 * FreeSiteVisitModal — the single, reusable Free Site Visit modal.
 * ──────────────────────────────────────────────────────────────────────────
 * One modal implementation for every CTA on the site. Uses the existing
 * createPortal + body-scroll-lock pattern that's already used elsewhere
 * on the site (see components/ui/LightboxImage.tsx).
 *
 * Layout (matches the supplied CTA reference):
 *   • Desktop — split layout. Left: full-height Peter portrait with a
 *     dark overlay, the eyebrow + headline + supporting copy overlaid on
 *     the upper portion, and the Peter badge at the bottom. Right:
 *     form block with all required fields.
 *   • Mobile — single column. Peter image as a slim banner at the top
 *     with the same overlay + headline + supporting copy. Form below.
 *
 * Accessibility:
 *   • role="dialog" + aria-modal="true"
 *   • ESC closes the modal
 *   • Focus trap inside the modal while open
 *   • First interactive element (close button) is focused on open
 *   • Focus returns to the trigger element that opened it on close
 *   • Background body scroll is locked (Lenis-aware)
 */

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { X, Check } from "lucide-react";

import { useFreeSiteVisitSafe } from "@/lib/free-site-visit/FreeSiteVisitContext";
import FreeSiteVisitForm from "@/components/free-site-visit/FreeSiteVisitForm";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function FreeSiteVisitModal() {
  const visit = useFreeSiteVisitSafe();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  // Lock body scroll while the modal is open (Lenis-aware).
  useEffect(() => {
    if (!visit?.isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    try {
      lenis?.stop?.();
    } catch {
      /* lenis might not be initialised */
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      try {
        lenis?.start?.();
      } catch {
        /* ignored */
      }
    };
  }, [visit?.isOpen, lenis]);

  // Track the element that had focus before the modal opened so we can
  // restore it on close.
  useEffect(() => {
    if (!visit?.isOpen) return;
    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
    const t = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [visit?.isOpen]);

  // Restore focus to the trigger element on close.
  useEffect(() => {
    if (visit?.isOpen) return;
    if (!lastFocusedRef.current) return;
    const stillThere = document.body.contains(lastFocusedRef.current);
    if (stillThere) {
      try {
        lastFocusedRef.current.focus({ preventScroll: true });
      } catch {
        /* ignored */
      }
    }
    lastFocusedRef.current = null;
  }, [visit?.isOpen]);

  // Keyboard handling: ESC closes, Tab is trapped inside the dialog.
  useEffect(() => {
    if (!visit?.isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        visit?.close("backdrop");
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => !el.hasAttribute("aria-hidden"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (active === first || !root.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !root.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visit?.isOpen, visit]);

  const handleBackdrop = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        visit?.close("backdrop");
      }
    },
    [visit],
  );

  if (!visit?.isOpen) return null;
  if (typeof document === "undefined") return null;

  const modal = (
    <div
      className="fsv-modal-root"
      onClick={handleBackdrop}
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(8, 8, 10, 0.78)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.5rem, 2vw, 1.5rem)",
        overflow: "hidden",
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fsv-modal-title"
        aria-describedby="fsv-modal-subtitle"
        className="fsv-modal-card"
        style={{
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          maxWidth: 880,
          width: "100%",
          maxHeight: "min(840px, calc(100vh - 1rem))",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
        }}
      >
        <style>{`
          .fsv-modal-root {
            animation: fsv-fade-in 220ms ease-out;
          }
          @keyframes fsv-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .fsv-modal-card {
            animation: fsv-card-in 320ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes fsv-card-in {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .fsv-modal-root, .fsv-modal-card { animation: none !important; }
          }

          /* Tablet/mobile — collapse to a single column with the Peter
             image as a slim banner on top. */
          @media (max-width: 720px) {
            .fsv-modal-card {
              grid-template-columns: minmax(0, 1fr);
              max-height: calc(100vh - 1rem);
            }
            .fsv-modal-portrait {
              height: 200px !important;
            }
          }

          /* Mobile — bottom sheet style. */
          @media (max-width: 720px) {
            .fsv-modal-root {
              padding: 0;
              align-items: flex-end;
            }
            .fsv-modal-card {
              border-radius: 16px 16px 0 0;
              max-height: 94vh;
              max-height: 94dvh;
              animation: fsv-card-up 360ms cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes fsv-card-up {
              from { opacity: 0; transform: translateY(100%); }
              to { opacity: 1; transform: translateY(0); }
            }
          }
        `}</style>

        {/* Left — Peter portrait with text overlay on the dark image */}
        <div
          aria-hidden="true"
          className="fsv-modal-portrait"
          style={{
            position: "relative",
            minHeight: 360,
            background: "#1a1a1a",
            overflow: "hidden",
          }}
        >
          <Image
            src="/technician/Peter - Managing Director.jpg"
            alt="Peter Tricklebank, Managing Director of All Fire Services"
            fill
            sizes="(max-width: 720px) 100vw, 360px"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
            priority
          />
          {/* Dark overlay across the upper portion so the eyebrow,
             headline, and supporting copy read cleanly against any frame
             of the photo. The overlay fades to transparent at the bottom
             so the badge and Peter himself remain naturally lit. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "75%",
              background:
                "linear-gradient(180deg, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0.7) 45%, rgba(8,8,10,0.1) 92%, rgba(8,8,10,0) 100%)",
            }}
          />

          {/* Copy overlaid on the dark image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "1.3rem 1.4rem 1.2rem",
              zIndex: 2,
              maxWidth: "100%",
            }}
          >
            <p
              style={{
                margin: "0 0 0.8rem 0",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#ffb700",
              }}
            >
              Free Site Visit
            </p>
            <h2
              aria-hidden="true"
              style={{
                margin: 0,
                fontSize: "clamp(2.1rem, 5.6vw, 3.1rem)",
                fontFamily: "Impact, 'Oswald', 'Arial Narrow Bold', sans-serif",
                fontWeight: 900,
                lineHeight: 0.9,
                textTransform: "uppercase",
                color: "#ffffff",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                transform: "scaleY(1.1)",
                transformOrigin: "left bottom",
              }}
            >
              Book the Boss
            </h2>
            <h2
              id="fsv-modal-title"
              style={{
                margin: "0.3rem 0 0",
                fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                maxWidth: "20ch",
              }}
            >
              <span style={{ color: "#ffffff" }}>Peter will personally</span><br />
              <span
                style={{
                  background: "linear-gradient(to right, #ff2a00, #ffb700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                come to your property.
              </span>
            </h2>
            <p
              id="fsv-modal-subtitle"
              style={{
                margin: "0.4rem 0 0",
                fontSize: "0.75rem",
                lineHeight: 1.5,
                color: "#ffffff",
                maxWidth: "34ch",
              }}
            >
              Request a free site visit with Peter<br />
              Tricklebank, Managing Director of All Fire<br />
              Services, to discuss your property and fire<br />
              protection requirements.
            </p>
          </div>

          {/* Peter badge (bottom-left) */}
          <div
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 14,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#f97316",
                  display: "grid",
                  placeItems: "center",
                  flex: "0 0 auto",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                }}
              >
                <Check size={16} strokeWidth={3} color="#ffffff" />
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    lineHeight: 1.2,
                    color: "#ffffff",
                    textShadow: "0 1px 3px rgba(0,0,0,0.55)",
                  }}
                >
                  Peter Tricklebank
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.74rem",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.3,
                    textShadow: "0 1px 3px rgba(0,0,0,0.55)",
                  }}
                >
                  Managing Director
                </p>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.4,
                textShadow: "0 1px 3px rgba(0,0,0,0.55)",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Check
                size={14}
                color="#f59e0b"
                strokeWidth={3}
                aria-hidden="true"
              />
              Personally attends every Free Site Visit.
            </p>
          </div>
        </div>

        {/* Right — form block. No internal scroll — the entire modal
           fits in the viewport on a typical desktop. */}
        <div
          className="fsv-modal-form-wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.95rem 1.3rem 0.85rem",
            gap: "0.4rem",
            position: "relative",
            minHeight: 0,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "-32px",
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => visit.close("manual")}
              aria-label="Close Free Site Visit dialog"
              className="fsv-close"
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                border: "none",
                background: "rgba(255,255,255,0.95)",
                color: "#111111",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <X size={16} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>

          <FreeSiteVisitForm
            source={visit.source}
            preselectedService={visit.preselectedService}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
