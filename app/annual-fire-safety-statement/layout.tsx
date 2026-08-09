import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Annual Fire Safety Statement Sydney",
  description:
    "Annual Fire Safety Statement (AFSS) inspections, documentation and NSW council submission support for strata, commercial and residential buildings across Greater Sydney.",
  path: "/annual-fire-safety-statement",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
