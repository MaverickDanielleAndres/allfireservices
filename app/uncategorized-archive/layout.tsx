import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Fire Safety Articles",
  description: "Fire safety information and updates from All Fire Services.",
  path: "/uncategorized-archive",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
