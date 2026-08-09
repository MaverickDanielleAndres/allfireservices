import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Strata Fire Safety Services Sydney",
  description:
    "Fire safety inspections, testing, maintenance and AFSS support for strata managers, owners corporations and apartment buildings across Greater Sydney.",
  path: "/strata",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
