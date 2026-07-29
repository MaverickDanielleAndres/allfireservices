import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Our Sydney Fire Safety Team",
  description:
    "Meet the experienced firefighters and fire safety professionals behind All Fire Services Australia in Sydney.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
