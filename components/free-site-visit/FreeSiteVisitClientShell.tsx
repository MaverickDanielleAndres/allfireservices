"use client";

/**
 * FreeSiteVisitClientShell — client provider + global mounts.
 * ──────────────────────────────────────────────────────────────────────────
 * Wraps the entire app with the FreeSiteVisitProvider and mounts the
 * global pieces of the conversion system:
 *   • the modal (every Free Site Visit CTA opens it)
 *   • the mobile sticky CTA (slim bottom bar on mobile only)
 *   • the chat widget (hidden entirely while the Free Site Visit modal
 *     is open so it never sits on top of the modal)
 *
 * Rendered from the root layout (`app/layout.tsx`).
 */

import React from "react";

import {
  FreeSiteVisitProvider,
  useFreeSiteVisitSafe,
} from "@/lib/free-site-visit/FreeSiteVisitContext";
import FreeSiteVisitModal from "@/components/free-site-visit/FreeSiteVisitModal";
import FreeSiteVisitMobileSticky from "@/components/free-site-visit/FreeSiteVisitMobileSticky";
import ChatbotDeferred from "@/components/ChatbotDeferred";

function ChatVisibilityGate() {
  const visit = useFreeSiteVisitSafe();
  // Hide the chat bubble (and its launcher window) completely while the
  // Free Site Visit modal is open — not just z-index lowering. Restores
  // automatically when the modal closes.
  if (visit?.isOpen) return null;
  return <ChatbotDeferred />;
}

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
      <ChatVisibilityGate />
    </FreeSiteVisitProvider>
  );
}
