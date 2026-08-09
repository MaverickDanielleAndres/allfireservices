import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Compliance Sydney",
  description:
    "Fire safety compliance support for NSW building owners, strata managers and businesses across Greater Sydney — inspections, AFSS reporting, maintenance and ongoing record keeping.",
  path: "/fire-safety-compliance",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
