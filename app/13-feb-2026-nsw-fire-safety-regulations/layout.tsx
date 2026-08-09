import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "NSW Fire Safety Regulations — 13 February 2026 Update",
  description:
    "What the 13 February 2026 NSW fire safety regulation changes mean for building owners, strata managers, certifiers and fire protection professionals.",
  path: "/13-feb-2026-nsw-fire-safety-regulations",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

