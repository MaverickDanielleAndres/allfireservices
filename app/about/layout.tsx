import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Our Sydney Fire Safety Team",
  description:
    "Meet the team behind All Fire Services Australia — led by current owner Peter Tricklebank, backed by a family firefighting legacy dating to 1911 and a business established in Sydney in 2009.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
