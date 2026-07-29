import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Consultancy Services",
  description:
    "Fire safety consultancy and compliance guidance for buildings, businesses and strata properties throughout Greater Sydney.",
  path: "/fire-consultancy-services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
