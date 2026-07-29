import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Training Sydney",
  description:
    "Professional fire safety training and practical guidance for workplaces, building teams and strata communities across Sydney.",
  path: "/fire-safety-training",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
