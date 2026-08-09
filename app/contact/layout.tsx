import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact All Fire Services",
  description:
    "Contact All Fire Services Australia for fire safety inspections, AFSS support and service enquiries across Greater Sydney. Call 1300 765 594 or send a message online.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
