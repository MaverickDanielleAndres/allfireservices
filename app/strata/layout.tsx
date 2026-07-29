import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Strata Fire Safety Services Sydney",
  description:
    "Fire safety inspections, testing, maintenance and compliance support for strata managers and apartment buildings across Sydney.",
  path: "/strata",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
