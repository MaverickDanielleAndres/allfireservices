import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FPA Australia Member",
  description:
    "Learn about All Fire Services Australia's FPA Australia membership and commitment to qualified, professional fire protection services.",
  path: "/fpa-australia-member",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
