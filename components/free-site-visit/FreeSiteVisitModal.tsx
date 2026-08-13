"use client";

/**
 * FreeSiteVisitModal — the single, reusable Free Site Visit modal.
 * ──────────────────────────────────────────────────────────────────────────
 * This is the only modal implementation of the offer. Every CTA across the
 * site opens this same modal via the global state.
 *
 * Layout:
 *   • Desktop — split panel: Peter image on the left, copy + form on the
 *     right. The Peter image is loaded lazily on desktop to keep the hero
 *     payload light.
 *   • Mobile — single column. Peter image first (smaller), then copy, then
 *     the form. The close button is always visible regardless of scroll.
 *
 * Accessibility:
 *   • role="dialog" + aria-modal="true"
 *   • ESC closes the modal
 *   • Focus trap inside the modal while open
 *   • Focus returns to the trigger element that opened it on close
 *   • First interactive element is focused on open
 *   • Background body scroll is locked (Lenis-aware)
 */

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";

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
    // Avoid the layout shift on scrollbar-locked layouts.
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
    // Defer to the next frame so the modal is mounted before we focus.
    const t = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [visit?.isOpen]);

  // Restore focus to the trigger element on close.
  useEffect(() => {
    if (visit?.isOpen) return;
    if (!lastFocusedRef.current) return;
    // Only restore focus if the element is still in the DOM.
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
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(0.5rem, 2vw, 1.5rem)",
        overflowY: "auto",
        overscrollBehavior: "contain",
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
          maxWidth: 920,
          width: "100%",
          maxHeight: "calc(100vh - 2rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <style>{`
          .fsv-modal-card {
            position: relative;
          }
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

          /* Tablet */
          @media (max-width: 880px) {
            .fsv-modal-card {
              grid-template-columns: minmax(0, 1fr);
              max-height: calc(100vh - 1rem);
            }
          }

          /* Mobile */
          @media (max-width: 600px) {
            .fsv-modal-root {
              padding: 0;
            }
            .fsv-modal-card {
              border-radius: 0;
              max-height: 100vh;
              max-height: 100dvh;
            }
          }
        `}</style>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => visit.close("manual")}
          aria-label="Close Free Site Visit dialog"
          className="fsv-close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 5,
            width: 40,
            height: 40,
            borderRadius: 999,
            border: "none",
            background: "rgba(255,255,255,0.92)",
            color: "#111111",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <X size={20} strokeWidth={2.4} aria-hidden="true" />
        </button>

        {/* Left — Peter image (hidden on phones, visible on tablet/desktop) */}
        <div
          aria-hidden="true"
          className="fsv-modal-art"
          style={{
            position: "relative",
            background:
              "linear-gradient(140deg, #1a1a1a 0%, #2a0a0a 60%, #4a0a0a 100%)",
            minHeight: 360,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
              zIndex: 1,
            }}
          />
          <Image
            src="/technician/pete.jpg"
            alt="Peter Tricklebank, Managing Director of All Fire Services"
            fill
            sizes="(max-width: 880px) 100vw, 460px"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "1.25rem 1.5rem",
              zIndex: 2,
              color: "#ffffff",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#ffd5a5",
              }}
            >
              Peter Tricklebank · Managing Director
            </p>
            <p
              style={{
                margin: "0.4rem 0 0",
                fontSize: "1.05rem",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              We&apos;ll send the boss.
            </p>
          </div>
        </div>

        {/* Right — copy + form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "clamp(1.25rem, 3vw, 2rem)",
            overflowY: "auto",
            gap: "1rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#d64012",
            }}
          >
            Free Site Visit
          </p>
          <h2
            id="fsv-modal-title"
            style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 3.2vw, 1.85rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#111111",
              letterSpacing: "-0.01em",
            }}
          >
            We&apos;ll send the boss.
          </h2>
          <p
            id="fsv-modal-subtitle"
            style={{
              margin: 0,
              fontSize: "0.95rem",
              lineHeight: 1.55,
              color: "#1f1f1f",
            }}
          >
            Request a free site visit with Peter Tricklebank, Managing Director of
            All Fire Services. Peter personally visits the property to understand
            your building, your fire protection requirements, and how the team can
            help.
          </p>

          <div
            style={{
              borderTop: "1px solid rgba(17,17,17,0.08)",
              paddingTop: "1rem",
              marginTop: "0.25rem",
            }}
          >
            <FreeSiteVisitForm
              source={visit.source}
              preselectedService={visit.preselectedService}
              onSubmitted={() => {
                // Keep the success state visible — the user can close the
                // modal manually with the X button.
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
