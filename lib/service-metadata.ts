import type { Metadata } from "next";
import {
  type PageMetadataOptions,
  createPageMetadata,
  canonicalUrlFor,
  ogImageUrlFor,
} from "./seo";
import { Product, Category } from "./products";

const SERVICE_LOCATION = "Sydney";

/**
 * Build a page-specific, service-aware title for a product/service detail page.
 *
 * Pattern: `<Product Name> — <Subtitle> | <Site Name>`
 * (set by the shared `createPageMetadata` helper).
 */
export function servicePageTitle(product: Product): string {
  // Keep it readable — drop a trailing punctuation from the subtitle so we
  // don't end up with "AFSS — AFSS — ...".
  const sub = product.subtitle.replace(/[.!?]+$/, "");
  if (sub && sub.toLowerCase() !== product.name.toLowerCase()) {
    return `${product.name} — ${sub}`;
  }
  return product.name;
}

/**
 * Meta description for a product/service detail page. Falls back to the
 * long-form product description if no override is given.
 */
export function servicePageDescription(product: Product, category?: Category): string {
  const intro = category ? `${category.label} — ${SERVICE_LOCATION}. ` : "";
  // Slice product description to ~150 chars and trim trailing punctuation.
  const base = product.description.replace(/\s+/g, " ").trim();
  const slice = base.length > 150 ? `${base.slice(0, 147)}…` : base;
  return `${intro}${slice}`;
}

/**
 * Meta keywords specific to the service/product page, derived from
 * category, name, and any standards or warranties on the product.
 */
export function servicePageKeywords(
  product: Product,
  category?: Category,
): string[] {
  const out = new Set<string>();
  out.add(`${product.name.toLowerCase()} ${SERVICE_LOCATION}`);
  if (category) {
    out.add(`${category.label.toLowerCase()} ${SERVICE_LOCATION}`);
    out.add(`${category.label.toLowerCase()} fire safety`);
  }
  out.add("fire safety services Sydney");
  out.add("AFSS");
  if (product.standard) {
    out.add(product.standard);
  }
  return [...out];
}

/**
 * Build the Next.js `Metadata` object for an individual /services/[slug]
 * page so each service/product has unique titles, descriptions, OG, and
 * canonicals derived from the underlying product data.
 */
export function createServiceMetadata(
  product: Product,
  category?: Category,
): Metadata {
  const path = `/services/${product.slug}` as const;
  const description = servicePageDescription(product, category);
  const ogImage = ogImageUrlFor(product.imageUrl);

  const options: PageMetadataOptions = {
    title: servicePageTitle(product),
    description,
    path,
    ogImage,
    keywords: servicePageKeywords(product, category),
  };

  return createPageMetadata(options);
}

/**
 * Build the Next.js `Metadata` for the /services hub, optionally
 * focused on a category.
 */
export function createServicesHubMetadata(category?: Category): Metadata {
  if (category) {
    return createPageMetadata({
      title: `${category.label} | ${SERVICE_LOCATION} Fire Safety Services`,
      description: `${category.intro} All Fire Services Australia delivers ${category.label.toLowerCase()} across Greater Sydney — inspections, installation, testing and ongoing maintenance.`,
      path: "/services",
    });
  }

  return createPageMetadata({
    title: "Fire Protection Services Sydney",
    description:
      "Browse all All Fire Services Australia fire protection services across Greater Sydney — AFSS, fire panels, smoke alarms, fire doors, extinguishers, emergency lighting, hose reels, hydrants, sprinklers, fire pumps, mechanical services and more.",
    path: "/services",
  });
}

/**
 * Canonical URL for a service detail page.
 */
export function servicePageCanonical(slug: string): string {
  return canonicalUrlFor(`/services/${slug}`);
}
