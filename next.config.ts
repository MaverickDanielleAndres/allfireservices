import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  poweredByHeader: false,

  // Remove console.log in production (keeps console.error)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Tree-shake large packages — significantly reduces JS bundle
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@base-ui/react",
    ],
  },

  images: {
    minimumCacheTTL: 2_678_400, // 31 days
    // Serve AVIF first (smallest), then WebP, then original
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320],
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

  // Aggressive cache headers for all static assets — critical for Vercel CDN
  async headers() {
    return [
      {
        // Next.js static chunks — immutable (hashed filenames)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Public assets (images, videos, fonts)
        source: "/:path((?!_next).*\\.(?:png|jpg|jpeg|webp|avif|gif|svg|ico|mp4|webm|woff|woff2|ttf|otf))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2678400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // HTML pages — short cache, revalidate quickly
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
