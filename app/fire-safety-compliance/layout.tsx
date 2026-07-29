import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Compliance Sydney",
  description:
    "Practical fire safety compliance support for NSW building owners, strata managers and businesses across Greater Sydney.",
  path: "/fire-safety-compliance",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
