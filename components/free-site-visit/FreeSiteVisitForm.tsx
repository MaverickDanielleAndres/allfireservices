"use client";

/**
 * FreeSiteVisitForm — the actual form inside the modal.
 * ──────────────────────────────────────────────────────────────────────────
 * A single, self-contained form that submits to /api/free-site-visit. It is
 * intentionally transport-agnostic — the modal that wraps it (or any other
 * host) doesn't need to know about the form internals.
 *
 * Validation:
 *   • Name, email, mobile are mandatory and validated on the client.
 *   • The server re-validates everything — the client-side validation is
 *     an ergonomic touch only. The server is the source of truth.
 *
 * Submission:
 *   • multipart/form-data when a file is attached, application/json otherwise.
 *   • Suspicious / oversized files are rejected before being sent.
 */

import React, { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";

import { FREE_SITE_VISIT_SERVICE_OPTIONS } from "@/lib/free-site-visit/constants";
import { trackFreeSiteVisitEvent } from "@/lib/free-site-visit/analytics";
import { useFreeSiteVisitSafe } from "@/lib/free-site-visit/FreeSiteVisitContext";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXT = new Set(["pdf", "doc", "docx"]);

const NAME_MIN = 2;
const NAME_MAX = 120;
const EMAIL_MAX = 254;
const COMPANY_MAX = 160;
const PROPERTY_NAME_MAX = 160;
const PROPERTY_ADDRESS_MAX = 240;
const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9 +()\-\s]{6,}$/;

interface FreeSiteVisitFormState {
  name: string;
  email: string;
  mobile: string;
  company: string;
  propertyName: string;
  propertyAddress: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. Bots fill it. */
  hp: string;
}

const EMPTY_FORM: FreeSiteVisitFormState = {
  name: "",
  email: "",
  mobile: "",
  company: "",
  propertyName: "",
  propertyAddress: "",
  service: "",
  message: "",
  consent: false,
  hp: "",
};

type FieldErrors = Partial<Record<keyof FreeSiteVisitFormState, string>>;

export interface FreeSiteVisitFormProps {
  /** Service id to pre-select when the modal opens. */
  preselectedService?: string;
  /** Where the button came from — for analytics & email metadata. */
  source?: string;
  /** Callback once the form successfully submits. */
  onSubmitted?: () => void;
}

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  minHeight: 44,
  fontSize: "1rem",
  color: "#111111",
  borderRadius: 8,
  border: "1px solid #d8d8d8",
  width: "100%",
  fontFamily: "inherit",
  background: "#ffffff",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};
const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "#dc2626",
  boxShadow: "0 0 0 3px rgba(220, 38, 38, 0.12)",
};
const labelStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#111111",
  marginBottom: 6,
  display: "block",
};
const helperStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: "#6b6b6b",
  lineHeight: 1.5,
  marginTop: 4,
};
const errorStyle: React.CSSProperties = {
  margin: "4px 0 0",
  fontSize: 12.5,
  color: "#b91c1c",
  lineHeight: 1.4,
};

export default function FreeSiteVisitForm({
  preselectedService,
  source,
  onSubmitted,
}: FreeSiteVisitFormProps) {
  const visit = useFreeSiteVisitSafe();
  const [form, setForm] = useState<FreeSiteVisitFormState>(() => ({
    ...EMPTY_FORM,
    service: preselectedService ?? "",
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formStartFired, setFormStartFired] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const update = useCallback(
    <K extends keyof FreeSiteVisitFormState>(key: K, value: FreeSiteVisitFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      // Clear the specific error as the user fixes it.
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
      if (!formStartFired) {
        setFormStartFired(true);
        trackFreeSiteVisitEvent("free_site_visit_form_start", {
          source: (source as never) ?? "other",
          service: preselectedService,
        });
      }
    },
    [formStartFired, source, preselectedService],
  );

  const validate = useCallback((state: FreeSiteVisitFormState): FieldErrors => {
    const next: FieldErrors = {};
    if (state.name.trim().length < NAME_MIN || state.name.trim().length > NAME_MAX) {
      next.name = "Please enter your name.";
    }
    if (!EMAIL_RE.test(state.email.trim()) || state.email.trim().length > EMAIL_MAX) {
      next.email = "Please enter a valid email address.";
    }
    if (!PHONE_RE.test(state.mobile.trim())) {
      next.mobile = "Please enter your mobile number.";
    }
    if (state.company.length > COMPANY_MAX) {
      next.company = "Please shorten the company name.";
    }
    if (state.propertyName.length > PROPERTY_NAME_MAX) {
      next.propertyName = "Please shorten the property name.";
    }
    if (state.propertyAddress.length > PROPERTY_ADDRESS_MAX) {
      next.propertyAddress = "Please shorten the property address.";
    }
    if (state.message.length > MESSAGE_MAX) {
      next.message = "Please shorten your message.";
    }
    if (!state.consent) {
      next.consent = "Please confirm you agree to be contacted.";
    }
    return next;
  }, []);

  const handleFile = useCallback((next: File | null) => {
    setFileError(null);
    if (!next) {
      setFile(null);
      return;
    }
    const ext = next.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXT.has(ext)) {
      setFileError("We can only accept PDF or Word documents.");
      return;
    }
    if (!ALLOWED_MIME.has(next.type) && next.type !== "") {
      setFileError("That file type is not supported. Please attach a PDF or Word document.");
      return;
    }
    if (next.size > MAX_FILE_BYTES) {
      setFileError("That file is over the 10MB limit. Please attach a smaller file.");
      return;
    }
    setFile(next);
    trackFreeSiteVisitEvent("free_site_visit_file_attached", {
      source: (source as never) ?? "other",
      service: preselectedService,
    });
  }, [source, preselectedService]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting) return;
      const nextErrors = validate(form);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        // Focus the first invalid field.
        const firstKey = Object.keys(nextErrors)[0];
        if (firstKey) {
          const el = document.querySelector<HTMLElement>(`[name="${firstKey}"]`);
          el?.focus();
        }
        return;
      }
      setErrors({});
      setIsSubmitting(true);
      setStatus("idle");
      setStatusMessage(null);

      try {
        const fd = new FormData();
        fd.set("name", form.name.trim());
        fd.set("email", form.email.trim());
        fd.set("mobile", form.mobile.trim());
        fd.set("company", form.company.trim());
        fd.set("propertyName", form.propertyName.trim());
        fd.set("propertyAddress", form.propertyAddress.trim());
        fd.set("service", form.service);
        fd.set("message", form.message.trim());
        fd.set("consent", form.consent ? "1" : "0");
        fd.set("hp", form.hp);
        fd.set("source", source ?? "other");
        if (preselectedService) fd.set("preselectedService", preselectedService);
        if (file) fd.set("afss", file);

        const response = await fetch("/api/free-site-visit", {
          method: "POST",
          body: fd,
        });

        let data: { ok?: boolean; error?: string; fields?: Record<string, string> } = {};
        try {
          data = await response.json();
        } catch {
          // Non-JSON — treat as failure.
        }

        if (response.ok && data.ok) {
          setStatus("success");
          setStatusMessage("Thanks — we've received your request.");
          setForm(EMPTY_FORM);
          setFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          visit?.markSubmitted();
          trackFreeSiteVisitEvent("free_site_visit_success", {
            source: (source as never) ?? "other",
            service: preselectedService,
          });
          onSubmitted?.();
          // Focus the success region for assistive tech.
          requestAnimationFrame(() => {
            successRef.current?.focus();
          });
        } else {
          setStatus("error");
          setStatusMessage(
            data.error ??
              "We couldn't send your request. Please try again or call 1300 765 594.",
          );
          if (data.fields && Object.keys(data.fields).length > 0) {
            setErrors(data.fields as FieldErrors);
          }
          trackFreeSiteVisitEvent("free_site_visit_error", {
            source: (source as never) ?? "other",
            service: preselectedService,
          });
        }
      } catch (err) {
        console.error("[/free-site-visit] submit failed:", err);
        setStatus("error");
        setStatusMessage(
          "We couldn't send your request. Please try again or call 1300 765 594.",
        );
        trackFreeSiteVisitEvent("free_site_visit_error", {
          source: (source as never) ?? "other",
          service: preselectedService,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, file, isSubmitting, onSubmitted, preselectedService, source, validate, visit],
  );

  const submitting = isSubmitting;
  const success = status === "success";

  // ── Success state ─────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
          padding: "0.5rem 0",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff2a00 0%, #ffb700 100%)",
            display: "grid",
            placeItems: "center",
            color: "#ffffff",
            fontSize: "1.5rem",
          }}
        >
          ✓
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
            fontWeight: 800,
            color: "#111111",
            lineHeight: 1.2,
          }}
        >
          Thanks, we&apos;ve received your request.
        </h3>
        <p
          style={{
            margin: 0,
            color: "#1f1f1f",
            lineHeight: 1.55,
            fontSize: "1rem",
          }}
        >
          Our team will review your details and contact you about your Free Site Visit.
        </p>
        <p
          style={{
            margin: 0,
            color: "#4b4b4b",
            fontSize: "0.875rem",
            lineHeight: 1.5,
          }}
        >
          If it&apos;s urgent, you can also call us on{" "}
          <a href="tel:1300765594" style={{ color: "#d64012", fontWeight: 700 }}>
            1300 765 594
          </a>
          .
        </p>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      name={`${formId}-free-site-visit-form`}
      id={`${formId}-free-site-visit-form`}
      aria-busy={submitting}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        width: "100%",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "0.9rem",
          color: "#5b5b5b",
          fontStyle: "italic",
        }}
      >
        Tell Peter about your property.
      </p>

      {/* Honeypot — hidden from real users, visible to bots. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Do not fill this in
          <input
            type="text"
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            value={form.hp}
            onChange={(e) => update("hp", e.target.value)}
          />
        </label>
      </div>

      {/* Name */}
      <div>
        <label htmlFor={`${formId}-name`} style={labelStyle}>
          Name <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={NAME_MAX}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          disabled={submitting}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          placeholder="John Smith"
          style={errors.name ? inputErrorStyle : inputStyle}
        />
        {errors.name && (
          <p id={`${formId}-name-error`} style={errorStyle}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email + Mobile */}
      <div style={{ display: "grid", gap: "0.85rem", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <label htmlFor={`${formId}-email`} style={labelStyle}>
            Email <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={EMAIL_MAX}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={submitting}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            placeholder="name@example.com"
            style={errors.email ? inputErrorStyle : inputStyle}
          />
          {errors.email && (
            <p id={`${formId}-email-error`} style={errorStyle}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${formId}-mobile`} style={labelStyle}>
            Mobile <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-mobile`}
            name="mobile"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={40}
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            disabled={submitting}
            aria-invalid={errors.mobile ? "true" : undefined}
            aria-describedby={errors.mobile ? `${formId}-mobile-error` : undefined}
            placeholder="0400 000 000"
            style={errors.mobile ? inputErrorStyle : inputStyle}
          />
          {errors.mobile && (
            <p id={`${formId}-mobile-error`} style={errorStyle}>
              {errors.mobile}
            </p>
          )}
        </div>
      </div>

      {/* Company + Property */}
      <div style={{ display: "grid", gap: "0.85rem", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <label htmlFor={`${formId}-company`} style={labelStyle}>
            Company / Organisation <span style={{ color: "#6b6b6b", fontWeight: 500, fontSize: "0.85rem" }}>(optional)</span>
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={COMPANY_MAX}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={submitting}
            placeholder="Strata plan, building name, or company"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-propertyName`} style={labelStyle}>
            Property / Building <span style={{ color: "#6b6b6b", fontWeight: 500, fontSize: "0.85rem" }}>(optional)</span>
          </label>
          <input
            id={`${formId}-propertyName`}
            name="propertyName"
            type="text"
            maxLength={PROPERTY_NAME_MAX}
            value={form.propertyName}
            onChange={(e) => update("propertyName", e.target.value)}
            disabled={submitting}
            placeholder="e.g. &ldquo;Bayside Apartments&rdquo;"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Property address */}
      <div>
        <label htmlFor={`${formId}-propertyAddress`} style={labelStyle}>
          Property address <span style={{ color: "#6b6b6b", fontWeight: 500, fontSize: "0.85rem" }}>(optional)</span>
        </label>
        <input
          id={`${formId}-propertyAddress`}
          name="propertyAddress"
          type="text"
          autoComplete="street-address"
          maxLength={PROPERTY_ADDRESS_MAX}
          value={form.propertyAddress}
          onChange={(e) => update("propertyAddress", e.target.value)}
          disabled={submitting}
          placeholder="123 Example Street, Sydney NSW 2000"
          style={inputStyle}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor={`${formId}-service`} style={labelStyle}>
          What can we help with? <span style={{ color: "#6b6b6b", fontWeight: 500, fontSize: "0.85rem" }}>(optional)</span>
        </label>
        <select
          id={`${formId}-service`}
          name="service"
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          disabled={submitting}
          style={{
            ...inputStyle,
            appearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 36,
          }}
        >
          <option value="">Select a service (optional)</option>
          {FREE_SITE_VISIT_SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`${formId}-message`} style={labelStyle}>
          Message <span style={{ color: "#6b6b6b", fontWeight: 500, fontSize: "0.85rem" }}>(optional)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          maxLength={MESSAGE_MAX}
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          disabled={submitting}
          placeholder="Hi Peter, we&apos;d like you to come and have a look at our property..."
          style={{
            ...inputStyle,
            minHeight: 96,
            padding: "12px 14px",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* File upload */}
      <div>
        <label htmlFor={`${formId}-afss`} style={labelStyle}>
          Previous Annual Fire Safety Statement <span style={{ color: "#6b6b6b", fontWeight: 500, fontSize: "0.85rem" }}>(optional)</span>
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <label
            htmlFor={`${formId}-afss`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 0.9rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              cursor: submitting ? "not-allowed" : "pointer",
              background: "#ffffff",
              fontWeight: 500,
              fontSize: "0.9rem",
              color: "#111111",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {file ? "Replace file" : "Choose file"}
          </label>
          <input
            ref={fileInputRef}
            id={`${formId}-afss`}
            name="afss"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            disabled={submitting}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.85rem",
              color: file ? "#111111" : "#6b6b6b",
              flex: "1 1 auto",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {file ? `${file.name} (${formatBytes(file.size)})` : "No file chosen — PDF or Word, up to 10MB."}
          </span>
          {file && (
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              disabled={submitting}
              style={{
                padding: "0.4rem 0.7rem",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                background: "transparent",
                color: "#111111",
                fontSize: "0.85rem",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              Remove
            </button>
          )}
        </div>
        <p style={helperStyle}>
          Have your previous Annual Fire Safety Statement? Attach it here if available.
        </p>
        {fileError && <p style={errorStyle}>{fileError}</p>}
      </div>

      {/* Consent */}
      <div>
        <label
          htmlFor={`${formId}-consent`}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.55rem",
            cursor: submitting ? "not-allowed" : "pointer",
            marginTop: "0.25rem",
          }}
        >
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            disabled={submitting}
            required
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            style={{
              width: 18,
              height: 18,
              marginTop: 2,
              cursor: submitting ? "not-allowed" : "pointer",
              flex: "0 0 auto",
            }}
          />
          <span style={{ fontSize: "0.875rem", color: "#111111", lineHeight: 1.5 }}>
            By submitting this form, you agree to be contacted by All Fire Services
            regarding your Free Site Visit. We&apos;ll never share your details.
          </span>
        </label>
        {errors.consent && (
          <p id={`${formId}-consent-error`} style={{ ...errorStyle, marginLeft: "1.7rem" }}>
            {errors.consent}
          </p>
        )}
      </div>

      {/* Status (error) */}
      {status === "error" && statusMessage && (
        <div
          role="alert"
          style={{
            padding: "0.75rem 0.9rem",
            borderRadius: 8,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            fontSize: "0.9rem",
            lineHeight: 1.5,
          }}
        >
          {statusMessage}{" "}
          You can also call us on{" "}
          <a href="tel:1300765594" style={{ color: "#991b1b", fontWeight: 700 }}>
            1300 765 594
          </a>
          .
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="fsv-submit"
        style={{
          marginTop: "0.5rem",
          padding: "0.95rem 1.4rem",
          minHeight: 52,
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#ffffff",
          background: submitting
            ? "#f87171"
            : "linear-gradient(135deg, #ff2a00 0%, #ffb700 100%)",
          border: "none",
          borderRadius: 10,
          cursor: submitting ? "not-allowed" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          outline: "none",
          boxShadow: "0 8px 22px rgba(255, 42, 0, 0.28)",
          transition: "transform 0.12s, box-shadow 0.2s",
          fontFamily: "inherit",
        }}
        onMouseDown={(e) => {
          if (!submitting) e.currentTarget.style.transform = "translateY(1px)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {submitting ? (
          <>
            <span
              aria-hidden="true"
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.45)",
                borderTopColor: "#ffffff",
                animation: "fsv-spin 0.9s linear infinite",
                display: "inline-block",
              }}
            />
            Sending&hellip;
          </>
        ) : (
          "Request My Free Site Visit"
        )}
      </button>

      <p
        style={{
          margin: 0,
          fontSize: "0.8rem",
          color: "#6b6b6b",
          lineHeight: 1.5,
        }}
      >
        Prefer to call?{" "}
        <a
          href="tel:1300765594"
          style={{ color: "#d64012", fontWeight: 600, textDecoration: "underline" }}
        >
          1300 765 594
        </a>
      </p>

      <style>{`
        @keyframes fsv-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fsv-submit { transition: none !important; }
        }

        /* On phones, the email + mobile + company + property name grid
           collapses to a single column so the form stays usable. */
        @media (max-width: 600px) {
          .fsv-submit {
            width: 100%;
          }
        }
      `}</style>

      {/* Reference the Image import so Next.js still bundles the optimizer
          for tree-shaking purposes; the actual Peter image is rendered
          elsewhere in the modal — see FreeSiteVisitModal. */}
      <span aria-hidden="true" style={{ display: "none" }}>
        <Image src="/technician/pete.jpg" alt="" width={1} height={1} />
      </span>
    </form>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
