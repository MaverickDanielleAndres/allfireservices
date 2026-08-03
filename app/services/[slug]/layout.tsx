import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Product & Service Details",
  description:
    "View detailed information, specifications, pricing, and enquiry options for All Fire Services products and fire safety services.",
  path: "/services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
