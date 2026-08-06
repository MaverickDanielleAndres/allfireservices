import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  // Strict image sizes so Next/Image can generate tight AVIF/WebP variants.
  images: {
    qualities: [60, 75],
    minimumCacheTTL: 2_678_400, // ~31 days
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Push longer-lived caching for static assets so repeat visits (and Vercel's
  // edge) skip the round trip to origin entirely.
  async headers() {
    return [
      {
        source: "/:path*.(woff2|woff|ttf|otf)",
        locale: false,
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.(png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Inline critical CSS automatically (default true on Next 16, but explicit).
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react", "lenis"],
  },
  // Surface framer-motion's "min" entry directly so unused exports don't bloat
  // the initial chunk.
};

export default nextConfig;
