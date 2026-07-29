import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Talk to Peter About Fire Safety",
  description:
    "Speak with All Fire Services founder Peter about fire safety, inspections and compliance requirements for your Sydney property.",
  path: "/talk-to-peter",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
