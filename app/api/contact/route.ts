import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── Email-template helpers ──────────────────────────────────────────────────

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

type ServiceOption = (typeof SERVICE_OPTIONS)[number];

function isServiceOption(value: string): value is ServiceOption {
  return (SERVICE_OPTIONS as readonly string[]).includes(value);
}

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  company?: string;
  service?: string;
  message: string;
  consent: boolean;
};

const MAX_FIELD = 5_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9 +()\-\s]{6,}$/;

function badRequest(error: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, fields }, { status: 400 });
}

function cleanText(value: unknown, max = MAX_FIELD): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function htmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value: string): string {
  return value.replace(/\r?\n/g, "<br />");
}

function validate(body: unknown): ContactPayload | { error: string; field?: keyof ContactPayload } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid submission." };
  }
  const raw = body as Record<string, unknown>;

  const name = cleanText(raw.name);
  const phone = cleanText(raw.phone);
  const email = cleanText(raw.email, 254);
  const suburb = cleanText(raw.suburb);
  const company = cleanText(raw.company);
  const message = cleanText(raw.message, 4_000);
  const serviceRaw = cleanText(raw.service);
  const consent = raw.consent === true || raw.consent === "true" || raw.consent === "on" || raw.consent === "1";

  const fields: Record<string, string> = {};

  if (name.length < 2 || name.length > 120) fields.name = "Please enter your full name.";
  if (!PHONE_RE.test(phone)) fields.phone = "Please enter a valid phone number.";
  if (!EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (suburb.length < 2 || suburb.length > 120) fields.suburb = "Please enter your suburb.";
  if (message.length < 5 || message.length > 4_000) fields.message = "Please tell us how we can help (5–4000 characters).";
  if (!consent) fields.consent = "Please confirm you agree to be contacted.";

  if (serviceRaw && !isServiceOption(serviceRaw)) {
    fields.service = "Please choose a service from the list.";
  }

  if (Object.keys(fields).length > 0) {
    return { error: fields[Object.keys(fields)[0] as keyof ContactPayload] ?? "Please complete the required fields." };
  }

  return {
    name,
    phone,
    email,
    suburb,
    company,
    message,
    service: serviceRaw || undefined,
    consent,
  };
}

function buildHtmlEmail(payload: ContactPayload, receivedAt: string, ip: string | null): string {
  const service = payload.service ? htmlEscape(payload.service) : "Not specified";

  const rows: Array<[string, string]> = [
    ["Name", htmlEscape(payload.name)],
    ["Phone", `<a href="tel:${htmlEscape(payload.phone)}" style="color:#fb5614;">${htmlEscape(payload.phone)}</a>`],
    ["Email", `<a href="mailto:${htmlEscape(payload.email)}" style="color:#fb5614;">${htmlEscape(payload.email)}</a>`],
    ["Suburb", htmlEscape(payload.suburb)],
    ["Company / Building", payload.company ? htmlEscape(payload.company) : "—"],
    ["Service required", service],
    ["Received", htmlEscape(receivedAt)],
    ["Source IP", ip ?? "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#f7f4f0;font-weight:600;color:#111111;border-bottom:1px solid #ece7e2;width:160px;">${htmlEscape(label)}</td>
          <td style="padding:8px 12px;color:#1a1a1a;border-bottom:1px solid #ece7e2;">${value}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <title>New website enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f7f4f0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4f0;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 22px rgba(18,18,18,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#ff2a00 0%,#ffb700 100%);padding:22px 24px;color:#ffffff;">
              <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;opacity:0.92;">All Fire Services Australia</p>
              <h1 style="margin:0;font-size:22px;line-height:1.35;font-weight:800;">New website enquiry</h1>
              <p style="margin:8px 0 0 0;font-size:13px;opacity:0.92;">A visitor submitted the contact form on allfireservices.com.au.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 8px 24px;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#444;">Reply directly to <strong>${htmlEscape(payload.email)}</strong> or call <strong>${htmlEscape(payload.phone)}</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 8px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #ece7e2;border-radius:8px;overflow:hidden;font-size:14px;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 20px 24px;">
              <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#111111;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <div style="background:#fff7f2;border-left:4px solid #fb5614;padding:14px 16px;border-radius:6px;font-size:14px;line-height:1.55;color:#222;">
                ${nl2br(htmlEscape(payload.message))}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px;">
              <p style="margin:0;font-size:11px;color:#777;line-height:1.5;">This enquiry was submitted via the contact form on the All Fire Services website. The sender agreed to be contacted about their enquiry.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildSubject(payload: ContactPayload): string {
  const service = payload.service ? ` — ${payload.service}` : "";
  return `New enquiry: ${payload.name} (${payload.suburb})${service}`;
}

function buildTextEmail(payload: ContactPayload, receivedAt: string, ip: string | null): string {
  const lines = [
    "New website enquiry — All Fire Services Australia",
    "──────────────────────────────────────────────",
    `Name:        ${payload.name}`,
    `Phone:       ${payload.phone}`,
    `Email:       ${payload.email}`,
    `Suburb:      ${payload.suburb}`,
    `Company:     ${payload.company ?? "—"}`,
    `Service:     ${payload.service ?? "—"}`,
    `Received:    ${receivedAt}`,
    `Source IP:   ${ip ?? "—"}`,
    "",
    "Message:",
    payload.message,
    "",
    "──────────────────────────────────────────────",
    "Reply directly to " + payload.email + " or call " + payload.phone + ".",
  ];
  return lines.join("\n");
}

// ─── Route handler ───────────────────────────────────────────────────────────

export const runtime = "nodejs";
// Resend is fast — 30s is plenty even with a slow upstream.
export const maxDuration = 30;

function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Don't leak the variable name to the client.
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured right now. Please call 1300 765 594." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid form submission.");
  }

  const result = validate(body);
  if ("error" in result) {
    return badRequest(result.error, (result as { field?: keyof ContactPayload }).field
      ? { [(result as { field?: keyof ContactPayload }).field as string]: result.error }
      : undefined);
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "admin@allfireservices.com.au";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const receivedAt = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    dateStyle: "full",
    timeStyle: "short",
  });
  const ip = getClientIp(req);

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: result.email,
      subject: buildSubject(result),
      html: buildHtmlEmail(result, receivedAt, ip),
      text: buildTextEmail(result, receivedAt, ip),
      // Resend tags help with filtering in the dashboard.
      // Tags must only contain ASCII letters, numbers, underscores, or dashes.
      tags: [
        { name: "source", value: "website-contact-form" },
        {
          name: "suburb",
          value: result.suburb
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 60) || "unknown",
        },
        ...(result.service
          ? [
              {
                name: "service",
                value: result.service
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .slice(0, 60) || "other",
              },
            ]
          : []),
      ],
    });

    if (error) {
      // Resend returns SDK-shaped errors; log the full structure so we can
      // debug from the server logs without leaking it to the client.
      try {
        console.error("[/api/contact] resend error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      } catch {
        console.error("[/api/contact] resend error (raw):", error);
      }
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't send your message just now. Please call 1300 765 594 or try again in a moment.",
        },
        { status: 502 },
      );
    }

    if (data?.id) {
      console.log("[/api/contact] sent message id:", data.id);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong on our end. Please call 1300 765 594 or try again.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
