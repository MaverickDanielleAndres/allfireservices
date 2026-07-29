import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Protection Services Sydney",
  description:
    "Explore fire inspections, testing, maintenance, AFSS, hydrant, sprinkler, alarm, extinguisher and emergency lighting services in Sydney.",
  path: "/services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
