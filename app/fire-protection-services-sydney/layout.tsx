import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Protection Services in Sydney",
  description:
    "Reliable fire protection inspections, testing, maintenance and compliance services for commercial and strata buildings across Sydney.",
  path: "/fire-protection-services-sydney",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
