import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About All Fire Services Australia",
  description:
    "Meet the team behind All Fire Services Australia — firefighter-led fire safety professionals led by owner Peter Tricklebank, backed by a family firefighting legacy dating to 1911 and a Sydney business established in 2009.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
