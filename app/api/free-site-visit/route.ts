/**
 * /api/free-site-visit — Free Site Visit form submission
 * ──────────────────────────────────────────────────────────────────────────
 * Mirrors the architecture used by /api/contact so the existing Resend
 * pipeline (CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL / RESEND_API_KEY) is
 * reused verbatim. There is exactly one lead pipeline entry-point shared
 * with the existing contact form — no parallel email infrastructure.
 *
 * Input:
 *   • multipart/form-data (so a single endpoint can carry an optional file)
 *   • Honeypot field `hp` must be empty; otherwise the request is silently
 *     dropped (no email sent, response looks like success to the bot).
 *
 * Output:
 *   • { ok: true } on success
 *   • { ok: false, error, fields? } on validation or upstream failure
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_FIELD = 5_000;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXT = new Set(["pdf", "doc", "docx"]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9 +()\-\s]{6,}$/;

const NAME_MIN = 2;
const NAME_MAX = 120;
const EMAIL_MAX = 254;
const SUBURB_MAX = 120;
const ADDRESS_MIN = 4;
const ADDRESS_MAX = 240;
const MESSAGE_MAX = 2000;

interface FreeSiteVisitPayload {
  name: string;
  email: string;
  mobile: string;
  suburb: string;
  address: string;
  message: string;
  consent: boolean;
  source: string;
  /** Already-mime-checked, size-checked, sanitized filename. */
  file:
    | { name: string; content: Buffer; contentType: string; size: number }
    | null;
}

function badRequest(error: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, fields }, { status: 400 });
}

function cleanText(value: unknown, max = MAX_FIELD): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function cleanFilename(value: string): string {
  // Strip path separators, keep only safe filename characters, and cap length.
  const base = value
    .replace(/[/\\]/g, "_")
    .replace(/[^a-zA-Z0-9._\- ]/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 200);
  return base || "upload";
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

function firstInvalid(errors: Record<string, string>): string {
  return errors[Object.keys(errors)[0] as keyof typeof errors] ?? "Please complete the required fields.";
}

async function validate(form: FormData): Promise<{ ok: true; value: FreeSiteVisitPayload } | { ok: false; errors: Record<string, string> }> {
  const fields: Record<string, string> = {};

  const name = cleanText(form.get("name"));
  const email = cleanText(form.get("email"), EMAIL_MAX);
  const mobile = cleanText(form.get("mobile"));
  const suburb = cleanText(form.get("suburb"), SUBURB_MAX);
  const address = cleanText(form.get("address"), ADDRESS_MAX);
  const message = cleanText(form.get("message"), MESSAGE_MAX);
  const consentRaw = form.get("consent");
  const consent =
    consentRaw === "true" || consentRaw === "on" || consentRaw === "1";
  const source = cleanText(form.get("source"), 64) || "other";

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    fields.name = "Please enter your name.";
  }
  if (!EMAIL_RE.test(email)) {
    fields.email = "Please enter a valid email address.";
  }
  if (!PHONE_RE.test(mobile)) {
    fields.mobile = "Please enter your phone number.";
  }
  if (suburb.length < 2 || suburb.length > SUBURB_MAX) {
    fields.suburb = "Please enter your suburb.";
  }
  if (address.length < ADDRESS_MIN || address.length > ADDRESS_MAX) {
    fields.address = "Please enter your property address.";
  }
  if (message.length < 5 || message.length > MESSAGE_MAX) {
    fields.message = "Please tell us how we can help (5–2000 characters).";
  }
  if (!consent) {
    fields.consent = "Please confirm you agree to be contacted.";
  }

  // File validation — optional Previous Annual Fire Safety Statement.
  const fileEntry = form.get("afss");
  let file: FreeSiteVisitPayload["file"] = null;
  if (fileEntry && typeof fileEntry === "object" && "arrayBuffer" in fileEntry) {
    const f = fileEntry as File;
    if (f.size > 0) {
      const ext = (f.name.split(".").pop() ?? "").toLowerCase();
      if (!ALLOWED_EXT.has(ext)) {
        fields.afss = "We can only accept PDF or Word documents.";
      } else if (f.type && !ALLOWED_MIME.has(f.type)) {
        fields.afss = "That file type is not supported. Please attach a PDF or Word document.";
      } else if (f.size > MAX_FILE_BYTES) {
        fields.afss = "That file is over the 10MB limit. Please attach a smaller file.";
      } else {
        try {
          const ab = await f.arrayBuffer();
          file = {
            name: cleanFilename(f.name),
            content: Buffer.from(ab),
            contentType: f.type || "application/pdf",
            size: f.size,
          };
        } catch {
          fields.afss = "We couldn't read that file. Please try again.";
        }
      }
    }
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, errors: fields };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      mobile,
      suburb,
      address,
      message,
      consent,
      source,
      file,
    },
  };
}

function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

function buildHtmlEmail(p: FreeSiteVisitPayload, receivedAt: string, ip: string | null): string {
  const rows: Array<[string, string]> = [
    ["Name", htmlEscape(p.name)],
    ["Email", `<a href="mailto:${htmlEscape(p.email)}" style="color:#fb5614;">${htmlEscape(p.email)}</a>`],
    ["Phone", `<a href="tel:${htmlEscape(p.mobile)}" style="color:#fb5614;">${htmlEscape(p.mobile)}</a>`],
    ["Suburb", htmlEscape(p.suburb)],
    ["Address", htmlEscape(p.address)],
    ["Previous AFSS attached", p.file ? `${htmlEscape(p.file.name)} (${(p.file.size / 1024).toFixed(1)} KB)` : "—"],
    ["Source CTA", htmlEscape(p.source)],
    ["Received", htmlEscape(receivedAt)],
    ["Source IP", ip ?? "—"],
  ];
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;background:#f7f4f0;font-weight:600;color:#111111;border-bottom:1px solid #ece7e2;width:170px;">${htmlEscape(label)}</td>
          <td style="padding:8px 12px;color:#1a1a1a;border-bottom:1px solid #ece7e2;">${value}</td>
        </tr>`,
    )
    .join("");

  const messageBlock = p.message
    ? `
      <tr>
        <td style="padding:8px 24px 20px 24px;">
          <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#111111;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
          <div style="background:#fff7f2;border-left:4px solid #fb5614;padding:14px 16px;border-radius:6px;font-size:14px;line-height:1.55;color:#222;">
            ${nl2br(htmlEscape(p.message))}
          </div>
        </td>`
    : "";

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <title>New Book the Boss — Free Site Visit request</title>
</head>
<body style="margin:0;padding:0;background:#f7f4f0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4f0;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 22px rgba(18,18,18,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#ff2a00 0%,#ffb700 100%);padding:22px 24px;color:#ffffff;">
              <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;opacity:0.92;">All Fire Services Australia</p>
              <h1 style="margin:0;font-size:22px;line-height:1.35;font-weight:800;">New Book the Boss — Free Site Visit request</h1>
              <p style="margin:8px 0 0 0;font-size:13px;opacity:0.92;">A visitor has requested a free site visit with Peter.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 8px 24px;">
              <p style="margin:0 0 6px 0;font-size:13px;color:#444;">
                Reply directly to <strong>${htmlEscape(p.email)}</strong> or call <strong>${htmlEscape(p.mobile)}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 8px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #ece7e2;border-radius:8px;overflow:hidden;font-size:14px;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          ${messageBlock}
          <tr>
            <td style="padding:0 24px 24px 24px;">
              <p style="margin:0;font-size:11px;color:#777;line-height:1.5;">Submitted via the Book the Boss modal on the All Fire Services website. The submitter agreed to be contacted about their site visit.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTextEmail(p: FreeSiteVisitPayload, receivedAt: string, ip: string | null): string {
  const lines = [
    "Book the Boss — Free Site Visit request — All Fire Services Australia",
    "──────────────────────────────────────────────",
    `Name:           ${p.name}`,
    `Email:          ${p.email}`,
    `Phone:          ${p.mobile}`,
    `Suburb:         ${p.suburb}`,
    `Address:        ${p.address}`,
    `AFSS attached:  ${p.file ? `${p.file.name} (${(p.file.size / 1024).toFixed(1)} KB)` : "—"}`,
    `Source CTA:     ${p.source}`,
    `Received:       ${receivedAt}`,
    `Source IP:      ${ip || "—"}`,
  ];
  if (p.message) {
    lines.push("", "Message:", p.message);
  }
  lines.push(
    "",
    "──────────────────────────────────────────────",
    `Reply directly to ${p.email} or call ${p.mobile}.`,
  );
  return lines.join("\n");
}

function buildSubject(p: FreeSiteVisitPayload): string {
  return `Book the Boss — Free Site Visit request from ${p.name}`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Contact form is not configured right now. Please call 1300 765 594.",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return badRequest("Invalid form submission.");
  }

  // Honeypot — silently accept and drop the request so the bot doesn't get
  // feedback (no email is sent, but the response shape mirrors success so
  // they don't improve their scripts).
  const hp = String(form.get("hp") ?? "").trim();
  if (hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const result = await validate(form);
  if (!result.ok) {
    return badRequest(firstInvalid(result.errors), result.errors);
  }
  const payload = result.value;

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
      replyTo: payload.email,
      subject: buildSubject(payload),
      html: buildHtmlEmail(payload, receivedAt, ip),
      text: buildTextEmail(payload, receivedAt, ip),
      attachments: payload.file
        ? [
            {
              filename: payload.file.name,
              content: payload.file.content,
              contentType: payload.file.contentType,
            },
          ]
        : undefined,
      tags: [
        { name: "source", value: "website-book-the-boss" },
        ...(payload.source
          ? [
              {
                name: "cta",
                value: payload.source
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  .slice(0, 60) || "other",
              },
            ]
          : []),
        { name: "has_attachment", value: payload.file ? "yes" : "no" },
      ],
    });

    if (error) {
      try {
        console.error("[/api/free-site-visit] resend error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      } catch {
        console.error("[/api/free-site-visit] resend error (raw):", error);
      }
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't send your request. Please call 1300 765 594 or try again in a moment.",
        },
        { status: 502 },
      );
    }

    if (data?.id) {
      console.log("[/api/free-site-visit] sent message id:", data.id);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/free-site-visit] unexpected error:", err);
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
