import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Find a Fire Safety Fitter",
  description: "Find fire safety service support in Greater Sydney.",
  path: "/find-a-fitter",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
