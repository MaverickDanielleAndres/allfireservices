"use client";

/**
 * FreeSiteVisitClientShell — client provider + global mounts.
 * ──────────────────────────────────────────────────────────────────────────
 * Wraps the entire app with the FreeSiteVisitProvider and mounts the
 * global pieces of the conversion system:
 *   • the modal (every Free Site Visit CTA opens it) — code-split.
 *   • the mobile sticky CTA (slim bottom bar on mobile only) — code-split.
 *   • the chat widget (hidden while the Free Site Visit modal is open so
 *     it never sits on top of the modal) — code-split.
 *
 * Rendered from the root layout (`app/layout.tsx`). Each global mount is
 * loaded via `dynamic({ ssr: false })` so the chat / modal / sticky CTA
 * JavaScript is excluded from the initial page bundle. They hydrate when
 * the user scrolls or interacts with the page.
 */

import React from "react";
import dynamic from "next/dynamic";

import {
  FreeSiteVisitProvider,
  useFreeSiteVisitSafe,
} from "@/lib/free-site-visit/FreeSiteVisitContext";

// All three of these drag framer-motion + the chat streaming code into the
// initial bundle if imported synchronously. Defer them — they're never
// visible until the user takes an action that mounts them.
const ChatbotDeferred = dynamic(
  () => import("@/components/ChatbotDeferred"),
  { ssr: false },
);
const FreeSiteVisitModal = dynamic(
  () => import("@/components/free-site-visit/FreeSiteVisitModal"),
  { ssr: false },
);
const FreeSiteVisitMobileSticky = dynamic(
  () => import("@/components/free-site-visit/FreeSiteVisitMobileSticky"),
  { ssr: false },
);

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
