import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { products } from "@/lib/products";

interface RouteEntry {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

// Indexable public routes. Mirrors the navigation and footer structure
// so every page the user can reach is also reachable by crawlers.
const routes: RouteEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/annual-fire-safety-statement", changeFrequency: "monthly", priority: 0.9 },
  { path: "/fire-protection-services-sydney", changeFrequency: "monthly", priority: 0.9 },
  { path: "/strata", changeFrequency: "monthly", priority: 0.85 },
  { path: "/fire-safety-compliance", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fire-consultancy-services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fire-safety-training", changeFrequency: "monthly", priority: 0.8 },
  { path: "/13-feb-2026-nsw-fire-safety-regulations", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fpa-australia-member", changeFrequency: "yearly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/talk-to-peter", changeFrequency: "yearly", priority: 0.6 },
  { path: "/our-clients", changeFrequency: "monthly", priority: 0.6 },
  { path: "/campaign", changeFrequency: "monthly", priority: 0.5 },
];

// Pages that are intentionally excluded from the sitemap:
//   /home, /homepage-2025 → redirect to / and carry canonicalPath="/"
//   /find-a-fitter       → noindex
//   /qr-database-2       → noindex
//   /confirmation        → noindex
//   /uncategorized-archive → noindex
//   /api/*               → noindex (also disallowed in robots.txt)

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries = routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency,
    priority,
  }));

  const serviceEntries = products.map((product) => ({
    url: new URL(`/services/${product.slug}`, SITE_URL).toString(),
    changeFrequency: "monthly" as const,
    priority: product.tag === "Service" ? 0.7 : 0.6,
  }));

  return [...baseEntries, ...serviceEntries];
}
