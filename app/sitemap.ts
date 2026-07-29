import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  {
    path: "/annual-fire-safety-statement",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/fire-protection-services-sydney",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  { path: "/strata", changeFrequency: "monthly", priority: 0.85 },
  {
    path: "/fire-safety-compliance",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/fire-consultancy-services",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/fire-safety-training",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/13-feb-2026-nsw-fire-safety-regulations",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/fpa-australia-member",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/talk-to-peter", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campaign", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency,
    priority,
  }));
}
