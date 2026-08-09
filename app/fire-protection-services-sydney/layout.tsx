import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Protection Services Sydney",
  description:
    "Fire inspections, testing, maintenance, AFSS, hydrant, sprinkler, alarm, extinguisher and emergency lighting services for strata, commercial and residential buildings across Greater Sydney.",
  path: "/fire-protection-services-sydney",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
