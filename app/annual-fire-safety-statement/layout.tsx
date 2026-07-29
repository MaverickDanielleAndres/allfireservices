import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Annual Fire Safety Statement Sydney",
  description:
    "Professional Annual Fire Safety Statement inspections, testing and NSW compliance support for Sydney buildings and strata properties.",
  path: "/annual-fire-safety-statement",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
