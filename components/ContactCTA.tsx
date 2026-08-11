"use client";

import Link from "next/link";
import React, { useCallback, useId, useRef, useState } from "react";
import SitewideCTA from "@/components/SitewideCTA";
import { ToastViewport, type Toast, type ToastTone } from "@/components/Toast";

const SERVICE_OPTIONS = [
  "Annual Fire Safety Statement (AFSS)",
  "Fire Safety Compliance",
  "Fire Consultation",
  "Fire Safety Training",
  "Monthly Fire Inspection",
  "Hydrant Flow Testing",
  "Diesel Pump Inspection",
  "Sprinkler System Inspection",
  "Smoke Alarm Testing",
  "Emergency & Exit Lighting",
  "Fire Extinguisher Service",
  "Strata / Building Management",
  "Other enquiry",
] as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  suburb: "",
  company: "",
  service: "",
  message: "",
  consent: false,
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function isValidEmail(value: string): boolean {
  // Reasonable email check — full RFC validation is server-side.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  return /^[0-9 +()\-\s]{6,}$/.test(value);
}

const INPUT_STYLE: React.CSSProperties = {
  padding: "10px 14px",
  minHeight: 44,
  fontSize: "1rem",
  color: "#111111",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  width: "100%",
  fontFamily: "inherit",
  background: "#ffffff",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};

const INPUT_ERROR_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  borderColor: "#dc2626",
  boxShadow: "0 0 0 3px rgba(220, 38, 38, 0.12)",
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 500,
  color: "#111111",
  marginBottom: 8,
  display: "block",
};

export default function ContactCTA({
  hideSitewideCTA,
  layout = "split",
}: {
  hideSitewideCTA?: boolean;
  layout?: "single" | "split";
}) {
  const formId = useId();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const successHeadingRef = useRef<HTMLDivElement>(null);

  const pushToast = useCallback((tone: ToastTone, title: string, description?: string, duration?: number) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, tone, title, description, duration }]);
    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateClient = (state: FormState): FieldErrors => {
    const next: FieldErrors = {};
    if (state.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!isValidPhone(state.phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!isValidEmail(state.email.trim())) next.email = "Please enter a valid email address.";
    if (state.suburb.trim().length < 2) next.suburb = "Please enter your suburb.";
    if (state.message.trim().length < 5) next.message = "Please tell us how we can help (5+ characters).";
    if (!state.consent) next.consent = "Please confirm you agree to be contacted.";
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateClient(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0] as keyof FormState;
      pushToast(
        "error",
        "Please complete the form",
        nextErrors[firstField] ?? "Some fields need a closer look.",
      );
      // Scroll to first error.
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(`[name="${firstField}"]`);
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const loadingId = pushToast(
      "loading",
      "Sending your enquiry…",
      "Hang tight — we're passing this to the team.",
      0,
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: { ok?: boolean; error?: string; fields?: Record<string, string> } = {};
      try {
        data = await response.json();
      } catch {
        // Non-JSON response — treat as failure.
      }

      if (response.ok && data.ok) {
        setToasts((prev) => prev.filter((toast) => toast.id !== loadingId));
        pushToast(
          "success",
          "Thanks — your enquiry is on its way!",
          "Our team will be in touch shortly. If it's urgent, call 1300 765 594.",
        );
        setForm(EMPTY_FORM);
        // Move focus to the success heading for screen readers.
        requestAnimationFrame(() => {
          successHeadingRef.current?.focus();
        });
      } else {
        setToasts((prev) => prev.filter((toast) => toast.id !== loadingId));
        if (data.fields && Object.keys(data.fields).length > 0) {
          setErrors(data.fields as FieldErrors);
        }
        pushToast(
          "error",
          "We couldn't send that just now",
          data.error ?? "Please call 1300 765 594 or try again in a moment.",
        );
      }
    } catch (err) {
      setToasts((prev) => prev.filter((toast) => toast.id !== loadingId));
      console.error("[/contact] submit failed:", err);
      pushToast(
        "error",
        "Network error",
        "Please check your connection and try again, or call 1300 765 594.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  // The visible success region announces to assistive tech when shown.
  const showSuccess = !isSubmitting && toasts.some((toast) => toast.tone === "success");

  return (
    <section data-theme="light" className="section_contact-cta">
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
      <div className="padding-global">
        <div className="container-large">
          {!hideSitewideCTA && <SitewideCTA />}
          <div
            className="padding-section-large pt-16"
            style={{
              paddingTop:
                layout === "split"
                  ? hideSitewideCTA
                    ? "clamp(2rem, 3vw, 3rem)"
                    : "clamp(5rem, 7vw, 7rem)"
                  : "clamp(8rem, 14vw, 13rem)",
            }}
          >

            <div
              className={`contact-cta_component${layout === "split" ? " contact-cta_split contact-grid" : ""}`}
              style={
                layout === "split"
                  ? undefined
                  : { display: "flex", flexDirection: "column", gap: "3rem", alignItems: "stretch" }
              }
            >
              <div className="contact-cta_content contact-info">
                <div className="contact-cta_header" style={{ textAlign: "left", marginBottom: "1.5rem", width: "100%" }}>
                  <h2 className="heading-style-h3" style={{ marginBottom: "1.5rem", textAlign: "left", color: "#111111" }}>
                    Get in <span style={{
                      background: "linear-gradient(to right, #ff2a00, #ffb700)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>touch</span>
                  </h2>
                  <p className="body-text" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.15rem)", textAlign: "left", margin: "0 0 2rem", lineHeight: 1.6, color: "#111111", fontWeight: 500, textWrap: "balance", maxWidth: "44rem" }}>
                    We&rsquo;re always happy to hear from property managers and
                    owners, whether it&rsquo;s to enquire about a new fire safety audit,
                    or just to chat about all things fire safety-related.
                  </p>
                </div>
                <div className="contact-cta_info-wrapper" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start", textAlign: "left", padding: "1.5rem 0 0", margin: 0, width: "100%", borderTop: "1px solid rgba(17, 17, 17, 0.08)" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", marginTop: "0.25rem" }}>
                    <h3 className="heading-style-h5" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "#111111", textTransform: "uppercase", textAlign: "left" }}>SOCIALS</h3>
                    <ul className="contact-social-links" style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-start", width: "100%", listStyle: "none", padding: 0, margin: 0 }}>
                      <li><a className="contact-social-link" href="https://www.facebook.com/profile.php?id=61566630403365" rel="noopener noreferrer" target="_blank" aria-label="Facebook (opens in a new tab)" style={{ color: "#1A1A1A", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#FEAF04"} onMouseOut={(e) => e.currentTarget.style.color = "#1A1A1A"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a></li>
                      <li><a className="contact-social-link" href="https://youtube.com/@allfireservices" rel="noopener noreferrer" target="_blank" aria-label="YouTube (opens in a new tab)" style={{ color: "#1A1A1A", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#FEAF04"} onMouseOut={(e) => e.currentTarget.style.color = "#1A1A1A"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a></li>
                      <li><a className="contact-social-link" href="https://x.com/Allfiresydney" rel="noopener noreferrer" target="_blank" aria-label="X (opens in a new tab)" style={{ color: "#1A1A1A", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#FEAF04"} onMouseOut={(e) => e.currentTarget.style.color = "#1A1A1A"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg></a></li>
                      <li><a className="contact-social-link" href="https://au.linkedin.com/in/allfire-services-sydney-92690516" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn (opens in a new tab)" style={{ color: "#1A1A1A", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#FEAF04"} onMouseOut={(e) => e.currentTarget.style.color = "#1A1A1A"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a></li>
                      <li><a className="contact-social-link" href="https://tiktok.com/@allfireservices" rel="noopener noreferrer" target="_blank" aria-label="TikTok (opens in a new tab)" style={{ color: "#1A1A1A", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#FEAF04"} onMouseOut={(e) => e.currentTarget.style.color = "#1A1A1A"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a></li>
                      <li><a className="contact-social-link" href="https://www.instagram.com/_allfireservices_/" rel="noopener noreferrer" target="_blank" aria-label="Instagram (opens in a new tab)" style={{ color: "#1A1A1A", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#FEAF04"} onMouseOut={(e) => e.currentTarget.style.color = "#1A1A1A"}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="contact-cta_form-wrapper contact-form-column">
                <div className="contact-cta_form-block w-form" style={{ width: "100%" }}>
                  <form
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                    noValidate
                    name={`${formId}-contact-form`}
                    id={`${formId}-contact-form`}
                    className="contact-cta_form"
                    aria-busy={isSubmitting}
                  >
                    <div className="form_field-wrapper _2col" style={{ gap: "1.5rem", marginBottom: 0 }}>
                      <div className="form_field-wrapper">
                        <label htmlFor={`${formId}-name`} className="form_field-label" style={LABEL_STYLE}>
                          Name <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
                        </label>
                        <input
                          id={`${formId}-name`}
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          maxLength={120}
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          disabled={isSubmitting}
                          aria-invalid={errors.name ? "true" : undefined}
                          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                          placeholder="John Smith"
                          style={errors.name ? INPUT_ERROR_STYLE : INPUT_STYLE}
                        />
                        {errors.name && (
                          <p id={`${formId}-name-error`} style={{ margin: "4px 0 0", fontSize: 12.5, color: "#b91c1c" }}>{errors.name}</p>
                        )}
                      </div>

                      <div className="form_field-wrapper">
                        <label htmlFor={`${formId}-phone`} className="form_field-label" style={LABEL_STYLE}>
                          Phone <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
                        </label>
                        <input
                          id={`${formId}-phone`}
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          maxLength={40}
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          disabled={isSubmitting}
                          aria-invalid={errors.phone ? "true" : undefined}
                          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                          placeholder="0400 000 000"
                          style={errors.phone ? INPUT_ERROR_STYLE : INPUT_STYLE}
                        />
                        {errors.phone && (
                          <p id={`${formId}-phone-error`} style={{ margin: "4px 0 0", fontSize: 12.5, color: "#b91c1c" }}>{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="form_field-wrapper _2col" style={{ gap: "1.5rem" }}>
                      <div className="form_field-wrapper">
                        <label htmlFor={`${formId}-email`} className="form_field-label" style={LABEL_STYLE}>
                          Email address <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
                        </label>
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          disabled={isSubmitting}
                          aria-invalid={errors.email ? "true" : undefined}
                          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                          placeholder="name@example.com"
                          style={errors.email ? INPUT_ERROR_STYLE : INPUT_STYLE}
                        />
                        {errors.email && (
                          <p id={`${formId}-email-error`} style={{ margin: "4px 0 0", fontSize: 12.5, color: "#b91c1c" }}>{errors.email}</p>
                        )}
                      </div>

                      <div className="form_field-wrapper">
                        <label htmlFor={`${formId}-suburb`} className="form_field-label" style={LABEL_STYLE}>
                          Suburb <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
                        </label>
                        <input
                          id={`${formId}-suburb`}
                          name="suburb"
                          type="text"
                          autoComplete="address-level2"
                          required
                          maxLength={120}
                          value={form.suburb}
                          onChange={(e) => update("suburb", e.target.value)}
                          disabled={isSubmitting}
                          aria-invalid={errors.suburb ? "true" : undefined}
                          aria-describedby={errors.suburb ? `${formId}-suburb-error` : undefined}
                          placeholder="Sydney"
                          style={errors.suburb ? INPUT_ERROR_STYLE : INPUT_STYLE}
                        />
                        {errors.suburb && (
                          <p id={`${formId}-suburb-error`} style={{ margin: "4px 0 0", fontSize: 12.5, color: "#b91c1c" }}>{errors.suburb}</p>
                        )}
                      </div>
                    </div>

                    <div className="form_field-wrapper">
                      <label htmlFor={`${formId}-company`} className="form_field-label" style={LABEL_STYLE}>
                        Company or building (optional)
                      </label>
                      <input
                        id={`${formId}-company`}
                        name="company"
                        type="text"
                        autoComplete="organization"
                        maxLength={160}
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        disabled={isSubmitting}
                        placeholder="Strata plan, building name, or company"
                        style={INPUT_STYLE}
                      />
                    </div>

                    <div className="form_field-wrapper">
                      <label htmlFor={`${formId}-service`} className="form_field-label" style={LABEL_STYLE}>
                        Service required
                      </label>
                      <select
                        id={`${formId}-service`}
                        name="service"
                        value={form.service}
                        onChange={(e) => update("service", e.target.value)}
                        disabled={isSubmitting}
                        aria-invalid={errors.service ? "true" : undefined}
                        aria-describedby={errors.service ? `${formId}-service-error` : undefined}
                        style={{
                          ...INPUT_STYLE,
                          appearance: "none",
                          backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: 36,
                        }}
                      >
                        <option value="">Select a service (optional)</option>
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p id={`${formId}-service-error`} style={{ margin: "4px 0 0", fontSize: 12.5, color: "#b91c1c" }}>{errors.service}</p>
                      )}
                    </div>

                    <div className="form_field-wrapper">
                      <label htmlFor={`${formId}-message`} className="form_field-label" style={LABEL_STYLE}>
                        Message <span style={{ color: "#dc2626" }} aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        name="message"
                        required
                        maxLength={4000}
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        disabled={isSubmitting}
                        aria-invalid={errors.message ? "true" : undefined}
                        aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                        placeholder="Tell us about your property, what you need help with, and any timing considerations."
                        style={{
                          ...(errors.message ? INPUT_ERROR_STYLE : INPUT_STYLE),
                          minHeight: 110,
                          padding: "12px 14px",
                          resize: "vertical",
                          fontFamily: "inherit",
                        }}
                      />
                      {errors.message && (
                        <p id={`${formId}-message-error`} style={{ margin: "4px 0 0", fontSize: 12.5, color: "#b91c1c" }}>{errors.message}</p>
                      )}
                    </div>

                    <label
                      htmlFor={`${formId}-consent`}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        marginTop: "0.5rem",
                        marginBottom: "1rem",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                      }}
                    >
                      <input
                        id={`${formId}-consent`}
                        name="consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        disabled={isSubmitting}
                        required
                        aria-invalid={errors.consent ? "true" : undefined}
                        aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
                        style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "0.95rem", color: "#111111", lineHeight: 1.5 }}>
                        I agree to be contacted about this enquiry by All Fire Services Australia. We&rsquo;ll never share your details. See our{" "}
                        <Link href="/" className="text-style-link" style={{ color: "#111111", fontWeight: 500, textDecoration: "underline" }}>
                          privacy notice
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id={`${formId}-consent-error`} style={{ margin: "-0.5rem 0 0.75rem 1.7rem", fontSize: 12.5, color: "#b91c1c" }}>{errors.consent}</p>
                    )}

                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", alignSelf: "start", justifySelf: "start" }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button w-button"
                        style={{
                          padding: "12px 22px",
                          minHeight: 48,
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          background: isSubmitting ? "#f87171" : "linear-gradient(135deg, #ff2a00 0%, #ffb700 100%)",
                          border: "none",
                          borderRadius: 8,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 10,
                          outline: "none",
                          boxShadow: "0 6px 18px rgba(255, 42, 0, 0.25)",
                          transition: "transform 0.12s, box-shadow 0.2s",
                          fontFamily: "inherit",
                          textAlign: "center",
                        }}
                        onMouseDown={(e) => {
                          if (!isSubmitting) e.currentTarget.style.transform = "translateY(1px)";
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              aria-hidden="true"
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                border: "2px solid rgba(255,255,255,0.45)",
                                borderTopColor: "#ffffff",
                                animation: "toast-spin 0.9s linear infinite",
                                display: "inline-block",
                              }}
                            />
                            Sending…
                          </>
                        ) : (
                          "Send enquiry"
                        )}
                      </button>
                      <button
                        type="reset"
                        disabled={isSubmitting}
                        onClick={handleReset}
                        style={{
                          padding: "12px 16px",
                          minHeight: 48,
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          color: "#374151",
                          background: "transparent",
                          border: "1px solid #d1d5db",
                          borderRadius: 8,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          fontFamily: "inherit",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        Reset
                      </button>
                    </div>

                    {/* Live region for screen readers; focuses on success so AT users know what happened. */}
                    <div
                      ref={successHeadingRef}
                      tabIndex={-1}
                      role="status"
                      aria-live="polite"
                      style={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    >
                      {showSuccess ? "Your enquiry has been sent successfully." : ""}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
