import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "QR Database",
  description: "All Fire Services QR database access.",
  path: "/qr-database-2",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
