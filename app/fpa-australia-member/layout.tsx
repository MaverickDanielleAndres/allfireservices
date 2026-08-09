import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FPA Australia Member",
  description:
    "All Fire Services Australia is a member of FPA Australia — the national peak body for fire protection — supporting stronger industry standards and safer communities.",
  path: "/fpa-australia-member",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
