import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Our Clients",
  description:
    "Trusted by property teams, strata managers and facility owners across Sydney. See the organisations that rely on All Fire Services to protect their people, property and compliance.",
  path: "/our-clients",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
