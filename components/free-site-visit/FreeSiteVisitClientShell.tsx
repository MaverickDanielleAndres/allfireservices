"use client";

/**
 * FreeSiteVisitClientShell — client provider + global mounts.
 * ──────────────────────────────────────────────────────────────────────────
 * Wraps the entire app with the FreeSiteVisitProvider and mounts the
 * global pieces of the conversion system:
 *   • the modal (every Free Site Visit CTA opens it)
 *   • the mobile sticky CTA (slim bottom bar on mobile only)
 *
 * Rendered from the root layout (`app/layout.tsx`).
 */

import React from "react";

import { FreeSiteVisitProvider } from "@/lib/free-site-visit/FreeSiteVisitContext";
import FreeSiteVisitModal from "@/components/free-site-visit/FreeSiteVisitModal";
import FreeSiteVisitMobileSticky from "@/components/free-site-visit/FreeSiteVisitMobileSticky";

export default function FreeSiteVisitClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FreeSiteVisitProvider>
      {children}
      <FreeSiteVisitModal />
      <FreeSiteVisitMobileSticky />
    </FreeSiteVisitProvider>
  );
}
