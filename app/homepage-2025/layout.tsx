import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Services Sydney",
  description:
    "Professional fire safety inspections, testing, maintenance and compliance services across Greater Sydney.",
  path: "/homepage-2025",
  canonicalPath: "/",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
