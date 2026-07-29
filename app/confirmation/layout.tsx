import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Enquiry Confirmation",
  description: "Confirmation of your All Fire Services enquiry.",
  path: "/confirmation",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
