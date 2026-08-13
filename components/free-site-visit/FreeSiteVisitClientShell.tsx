"use client";

/**
 * FreeSiteVisitClientShell — client provider + modal mount.
 * ──────────────────────────────────────────────────────────────────────────
 * Wraps the entire app with the FreeSiteVisitProvider and mounts the modal
 * once. Pages simply opt into the modal behavior by calling
 * `useFreeSiteVisit().open({ source })` (or by rendering a
 * `<FreeSiteVisitButton>`).
 *
 * Rendered from the root layout (`app/layout.tsx`).
 */

import React from "react";

import { FreeSiteVisitProvider } from "@/lib/free-site-visit/FreeSiteVisitContext";
import FreeSiteVisitModal from "@/components/free-site-visit/FreeSiteVisitModal";

export default function FreeSiteVisitClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FreeSiteVisitProvider>
      {children}
      <FreeSiteVisitModal />
    </FreeSiteVisitProvider>
  );
}
