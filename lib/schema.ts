import {
  SITE_NAME,
  LEGAL_NAME,
  SITE_URL,
  SITE_PHONE_TEL,
  SITE_EMAIL,
  SITE_STREET,
  SITE_SUBURB,
  SITE_STATE,
  SITE_POSTCODE,
  SITE_COUNTRY,
  BUSINESS_AREA_SERVED,
  absoluteUrl,
} from "./seo";

// ─── Stable entity IDs ────────────────────────────────────────────────────────
//
// Centralising the @id values lets every page reference the same entity
// graph without re-declaring it on every component.

export const BUSINESS_ID = `${SITE_URL.toString()}#business`;
export const WEBSITE_ID = `${SITE_URL.toString()}#website`;
export const ORG_ID = `${SITE_URL.toString()}#organization`;

// ─── LocalBusiness / ProfessionalService ──────────────────────────────────────

export interface LocalBusinessOptions {
  /** Override the description used in the schema entity. */
  description?: string;
}

export function buildLocalBusinessEntity(
  options: LocalBusinessOptions = {},
): Record<string, unknown> {
  return {
    "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: "All Fire Services",
    url: SITE_URL.toString(),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl(
      "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp",
    ),
    description:
      options.description ??
      "All Fire Services provides fire protection inspections, testing, maintenance and compliance support across Greater Sydney, including annual fire safety statements, fire alarm panels, smoke alarms, fire doors, extinguishers, emergency lighting, hydrants, sprinklers, fire pumps, mechanical fire services, fire dampers, flow testing and fire penetration sealing.",
    telephone: SITE_PHONE_TEL,
    email: SITE_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_STREET,
      addressLocality: SITE_SUBURB,
      addressRegion: SITE_STATE,
      postalCode: SITE_POSTCODE,
      addressCountry: SITE_COUNTRY,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Sydney",
        containedInPlace: {
          "@type": "State",
          name: "New South Wales",
        },
      },
      {
        "@type": "AdministrativeArea",
        name: BUSINESS_AREA_SERVED,
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "12:30",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_PHONE_TEL,
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "07:00",
          closes: "18:30",
        },
      },
    ],
    knowsAbout: [
      "Fire safety inspections",
      "Annual Fire Safety Statements",
      "Fire alarm panels",
      "Smoke alarms",
      "Fire doors",
      "Fire extinguishers",
      "Emergency lighting",
      "Exit signs",
      "Fire hose reels",
      "Fire hydrants",
      "Sprinkler systems",
      "Fire pumps",
      "Mechanical fire services",
      "Fire dampers",
      "Smoke dampers",
      "Service penetration sealing",
      "Fire flow testing",
      "Evacuation diagrams",
      "Zone block plans",
    ],
  };
}

// ─── WebSite entity (used for sitelinks search) ──────────────────────────────

export function buildWebSiteEntity(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL.toString(),
    name: SITE_NAME,
    inLanguage: "en-AU",
    publisher: { "@id": BUSINESS_ID },
  };
}

// ─── WebPage entity ──────────────────────────────────────────────────────────

export interface WebPageEntityOptions {
  path: string;
  name: string;
  description: string;
  lastReviewed?: string;
}

export function buildWebPageEntity({
  path,
  name,
  description,
  lastReviewed,
}: WebPageEntityOptions): Record<string, unknown> {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-AU",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    ...(lastReviewed ? { lastReviewed } : {}),
  };
}

// ─── Service entity ──────────────────────────────────────────────────────────

export interface ServiceEntityOptions {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}

export function buildServiceEntity({
  name,
  description,
  path,
  areaServed = BUSINESS_AREA_SERVED,
}: ServiceEntityOptions): Record<string, unknown> {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServed,
    },
  };
}

// ─── BreadcrumbList entity ───────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export function buildBreadcrumbEntity(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

// ─── FAQPage entity ──────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqEntity(items: FaqItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Helpers to render JSON-LD safely ────────────────────────────────────────

/**
 * Stringify JSON-LD safely for inline `<script type="application/ld+json">`.
 * Escapes `</` to prevent premature closing tags, and `<` for safety.
 */
export function stringifyJsonLd(payload: unknown): string {
  return JSON.stringify(payload)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
