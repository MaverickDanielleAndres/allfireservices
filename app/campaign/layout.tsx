import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Inspection Services",
  description:
    "Book professional fire safety inspections and compliance services for commercial and strata properties across Greater Sydney.",
  path: "/campaign",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
