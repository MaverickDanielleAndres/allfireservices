"use client";

/**
 * Free Site Visit — global state
 * ──────────────────────────────────────────────────────────────────────────
 * Opens the modal from anywhere on the site without re-mounting the form.
 * Tracks:
 *   • open/close state
 *   • the source CTA that opened the modal (for analytics)
 *   • the pre-selected service (for context from a service detail page)
 *   • the auto-popup flag (so the 30s popup only fires once per session)
 *   • the manual dismissal flag (so the auto popup never re-fires once the
 *     visitor has dismissed it)
 *
 * The provider deliberately uses React context with a small, deliberately
 * hand-rolled store. We don't add a dependency — the existing site has
 * nothing of the kind and the surface area is tiny.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  trackFreeSiteVisitEvent,
  type FreeSiteVisitSource,
} from "@/lib/free-site-visit/analytics";

/** Keys used for the lightweight sessionStorage guard. */
const SESSION_KEY_OPENED = "fsv.session.opened";
const SESSION_KEY_DISMISSED = "fsv.session.dismissed";
const SESSION_KEY_SUBMITTED = "fsv.session.submitted";

export interface FreeSiteVisitOpenOptions {
  source: FreeSiteVisitSource;
  /** Optional service id from lib/services.ts to pre-select in the form. */
  service?: string;
  /** Force the modal open even if the visitor has already submitted. */
  force?: boolean;
}

export interface FreeSiteVisitContextValue {
  isOpen: boolean;
  /**
   * Source of the open call. Stored so the form can report it to the
   * API and so analytics events downstream carry the same label.
   */
  source: FreeSiteVisitSource;
  /** Pre-selected service id (or undefined). */
  preselectedService: string | undefined;
  /** True if the modal was opened by the auto-30s trigger. */
  autoOpened: boolean;
  open: (options?: FreeSiteVisitOpenOptions) => void;
  close: (reason?: "manual" | "submit" | "auto" | "backdrop") => void;
  /** Mark the form as submitted in this session so the auto popup can't re-fire. */
  markSubmitted: () => void;
  /** Mark the auto popup as fired (so it doesn't fire again this session). */
  markAutoOpened: () => void;
}

const FreeSiteVisitContext = createContext<FreeSiteVisitContextValue | null>(null);

export interface FreeSiteVisitProviderProps {
  children: React.ReactNode;
  /** Disable the 30s auto-popup entirely (e.g. for print surfaces). */
  disableAutoPopup?: boolean;
  /** Delay in ms before the auto-popup fires. Default 30_000. */
  autoPopupDelayMs?: number;
}

const DEFAULT_SOURCE: FreeSiteVisitSource = "other";

export function FreeSiteVisitProvider({
  children,
  disableAutoPopup = false,
  autoPopupDelayMs = 30_000,
}: FreeSiteVisitProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<FreeSiteVisitSource>(DEFAULT_SOURCE);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined,
  );
  const [autoOpened, setAutoOpened] = useState(false);

  /** Guard: only schedule the auto popup once per browser session. */
  const autoScheduledRef = useRef(false);

  const open = useCallback((options?: FreeSiteVisitOpenOptions) => {
    const nextSource = options?.source ?? DEFAULT_SOURCE;
    const nextService = options?.service;
    const nextAuto = nextSource === "auto_30s";
    setSource(nextSource);
    setPreselectedService(nextService);
    setAutoOpened(nextAuto);
    setIsOpen(true);
    trackFreeSiteVisitEvent("free_site_visit_popup_open", {
      source: nextSource,
      service: nextService,
      auto: nextAuto,
    });
  }, []);

  const close = useCallback(
    (reason: "manual" | "submit" | "auto" | "backdrop" = "manual") => {
      setIsOpen(false);
      // Anything that closes the modal counts as a dismissal — the auto
      // popup should never re-fire once the visitor has touched it.
      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(SESSION_KEY_DISMISSED, "1");
        } catch {
          /* sessionStorage blocked — continue */
        }
      }
      trackFreeSiteVisitEvent("free_site_visit_popup_close", {
        source,
        service: preselectedService,
        auto: autoOpened,
      });
      // Reset internal state so the next open() is a clean slate.
      queueMicrotask(() => {
        setSource(DEFAULT_SOURCE);
        setPreselectedService(undefined);
        setAutoOpened(false);
      });
      // The `reason` is reserved for future behavior (e.g. analytics funnel
      // filtering). Reference it so lint doesn't flag it.
      void reason;
    },
    [source, preselectedService, autoOpened],
  );

  const markSubmitted = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(SESSION_KEY_SUBMITTED, "1");
    } catch {
      /* ignored */
    }
  }, []);

  const markAutoOpened = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(SESSION_KEY_OPENED, "1");
    } catch {
      /* ignored */
    }
  }, []);

  // Schedule the auto popup once per session.
  useEffect(() => {
    if (disableAutoPopup) return;
    if (typeof window === "undefined") return;
    if (autoScheduledRef.current) return;
    autoScheduledRef.current = true;

    let storageSnapshot: {
      opened: boolean;
      dismissed: boolean;
      submitted: boolean;
    } = { opened: false, dismissed: false, submitted: false };
    try {
      storageSnapshot = {
        opened: window.sessionStorage.getItem(SESSION_KEY_OPENED) === "1",
        dismissed: window.sessionStorage.getItem(SESSION_KEY_DISMISSED) === "1",
        submitted: window.sessionStorage.getItem(SESSION_KEY_SUBMITTED) === "1",
      };
    } catch {
      // sessionStorage unavailable — never block the popup in that case.
      storageSnapshot = { opened: false, dismissed: false, submitted: false };
    }

    if (storageSnapshot.opened || storageSnapshot.dismissed || storageSnapshot.submitted) {
      return;
    }

    // Respect prefers-reduced-motion primarily for the auto popup timer
    // axis: visitors who prefer reduced motion also tend to prefer fewer
    // intrusive interruptions. We still fire the popup, just at a longer
    // delay so it doesn't crowd the page experience.
    const delay =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? Math.max(autoPopupDelayMs, 60_000)
        : autoPopupDelayMs;

    const timer = window.setTimeout(() => {
      // Re-check inside the timer — the visitor may have submitted,
      // opened, or dismissed the modal in the meantime.
      let latest = { opened: false, dismissed: false, submitted: false };
      try {
        latest = {
          opened: window.sessionStorage.getItem(SESSION_KEY_OPENED) === "1",
          dismissed: window.sessionStorage.getItem(SESSION_KEY_DISMISSED) === "1",
          submitted: window.sessionStorage.getItem(SESSION_KEY_SUBMITTED) === "1",
        };
      } catch {
        latest = { opened: false, dismissed: false, submitted: false };
      }
      if (latest.opened || latest.dismissed || latest.submitted) return;
      if (document.visibilityState !== "visible") return;
      markAutoOpened();
      open({ source: "auto_30s" });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [disableAutoPopup, autoPopupDelayMs, open, markAutoOpened]);

  const value = useMemo<FreeSiteVisitContextValue>(
    () => ({
      isOpen,
      source,
      preselectedService,
      autoOpened,
      open,
      close,
      markSubmitted,
      markAutoOpened,
    }),
    [isOpen, source, preselectedService, autoOpened, open, close, markSubmitted, markAutoOpened],
  );

  return (
    <FreeSiteVisitContext.Provider value={value}>
      {children}
    </FreeSiteVisitContext.Provider>
  );
}

export function useFreeSiteVisit(): FreeSiteVisitContextValue {
  const ctx = useContext(FreeSiteVisitContext);
  if (!ctx) {
    throw new Error(
      "useFreeSiteVisit must be used inside <FreeSiteVisitProvider>",
    );
  }
  return ctx;
}

/**
 * Safe consumer — returns null if the provider is missing. Useful for
 * components that may render outside the provider (e.g. embed surfaces).
 */
export function useFreeSiteVisitSafe(): FreeSiteVisitContextValue | null {
  return useContext(FreeSiteVisitContext);
}
