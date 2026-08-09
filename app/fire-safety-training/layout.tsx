import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Training Sydney",
  description:
    "Practical fire safety training and warden education for workplaces, building teams and strata communities across Greater Sydney.",
  path: "/fire-safety-training",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
