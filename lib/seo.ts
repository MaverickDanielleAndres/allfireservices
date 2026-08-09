import type { Metadata } from "next";

// ─── Site-wide identity constants ─────────────────────────────────────────────

/**
 * Canonical, production-grade identity for All Fire Services.
 * Every page derives its metadata from these values so the brand is
 * expressed consistently across titles, schema, social cards and
 * canonical URLs.
 */
export const SITE_NAME = "All Fire Services Australia";
export const SITE_SHORT_NAME = "All Fire Services";
export const LEGAL_NAME = "All Fire Services Australia Pty Ltd";

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.allfireservices.com.au",
);

export const SITE_PHONE = "1300 765 594";
export const SITE_PHONE_TEL = "+61-1300-765-594";
export const SITE_AFTER_HOURS_PHONE = "0484 648 400";
export const SITE_EMAIL = "admin@allfireservices.com.au";

export const SITE_STREET = "330 Wattle Street";
export const SITE_SUBURB = "Ultimo";
export const SITE_STATE = "NSW";
export const SITE_POSTCODE = "2007";
export const SITE_COUNTRY = "AU";

export const DEFAULT_DESCRIPTION =
  "All Fire Services Australia — practical fire protection, inspections, testing, maintenance and compliance support across Greater Sydney for strata, commercial and industrial properties.";

export const DEFAULT_OG_IMAGE =
  "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp";

export const BUSINESS_AREA_SERVED = "Greater Sydney, New South Wales, Australia";

// ─── Page metadata factory ────────────────────────────────────────────────────

export type PagePath = `/${string}` | "/";

export interface PageMetadataOptions {
  /** Title for the <title> element. The site name is appended automatically. */
  title: string;
  /** Meta description. Trim to ~155 characters for best SERP behaviour. */
  description: string;
  /** Canonical path for this page (e.g. "/about"). */
  path: PagePath;
  /** Override the canonical if it differs from the page path (e.g. /home → /). */
  canonicalPath?: PagePath;
  /** Set to true for utility pages (thank-you, search results, etc). */
  noIndex?: boolean;
  /** OG image override; absolute or root-relative. */
  ogImage?: string;
  /** OG type override. Defaults to "website". */
  ogType?: "website" | "article" | "profile";
  /** Keywords specific to this page (kept short, supplements site-wide). */
  keywords?: string[];
  /** Article publish time for BlogPosting etc. */
  publishedTime?: string;
  /** Article modified time for BlogPosting etc. */
  modifiedTime?: string;
}

/**
 * Build a Next.js `Metadata` object for a single page. Every indexable
 * page should call this so titles, descriptions, canonicals, Open Graph
 * and Twitter cards stay consistent and unique.
 *
 * The returned `title` is the full "Page title | Site name" string. We
 * intentionally do NOT rely on Next.js `title.template` because Next 16
 * can apply the template a second time during client-side rendering
 * after the page mounts, producing duplicated site-name suffixes.
 */
export function createPageMetadata({
  title,
  description,
  path,
  canonicalPath = path,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
  const pageUrl = new URL(path, SITE_URL).toString();
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : new URL(ogImage, SITE_URL).toString();

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            nosnippet: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: "en_AU",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — fire safety services across Greater Sydney`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

export function canonicalUrlFor(path: PagePath): string {
  return new URL(path, SITE_URL).toString();
}

export function ogImageUrlFor(image: string = DEFAULT_OG_IMAGE): string {
  return image.startsWith("http") ? image : new URL(image, SITE_URL).toString();
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
