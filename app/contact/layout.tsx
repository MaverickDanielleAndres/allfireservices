import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact All Fire Services",
  description:
    "Contact All Fire Services Australia for fire safety inspections, compliance support and service enquiries across Greater Sydney.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
