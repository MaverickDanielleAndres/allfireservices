import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Talk to Peter About Fire Safety",
  description:
    "Speak with All Fire Services owner Peter about fire safety, AFSS inspections, compliance requirements and protection for your Greater Sydney property.",
  path: "/talk-to-peter",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
