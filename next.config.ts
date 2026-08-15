import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  // Rewrite the old stratapage-cropped paths to their /opt/ variants so the
  // browser always lands on the pre-resized webp versions regardless of which
  // deployment has the /opt/ folder in sync.
  async rewrites() {
    return [
      {
        source: "/stratapage-cropped/:path(.+).(png|jpg|jpeg)",
        destination: "/stratapage-cropped/opt/:path.webp",
      },
      {
        source: "/stratapage-cropped/:path(.+).webp",
        destination: "/stratapage-cropped/opt/:path.webp",
      },
    ];
  },

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

  // Combined headers: caching + security (CSP, COOP, XFO, Permissions-Policy).
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
      {
        // Pre-optimized gallery variants — long cache, swr fallback.
        source: "/stratapage-cropped/opt/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security headers — needed for Best Practices 100/100
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          // Tighten the browser feature surface — the site does not use any
          // of these APIs and shouldn't be allowed to load them.
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "magnetometer=()",
              "gyroscope=()",
              "accelerometer=()",
              "interest-cohort=()",
            ].join(", "),
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.youtube.com https://*.youtube-nocookie.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.ytimg.com https://*.ggpht.com",
              "media-src 'self' https://*.youtube.com",
              "frame-src https://*.youtube.com https://*.youtube-nocookie.com",
              "connect-src 'self' https://*.youtube.com https://*.youtube-nocookie.com",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
    // Cut unused exports from these heavy libraries at build time.
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "lenis",
      "framer-motion/dom",
      "@vercel/speed-insights",
    ],
  },
};

export default nextConfig;
