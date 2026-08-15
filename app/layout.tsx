import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import "./allfireservices.css";
import "./responsive.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";
import FreeSiteVisitClientShell from "@/components/free-site-visit/FreeSiteVisitClientShell";

// Only mount the Vercel Speed Insights beacon on a real Vercel deployment.
// Loading it on localhost produces a 404 (script.js not hosted there), which
// drops Best Practices below 100 and surfaces a console error.
const SpeedInsights = process.env.VERCEL_ENV
  ? dynamic(() => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights))
  : null;
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  ogImageUrlFor,
} from "@/lib/seo";
import {
  buildLocalBusinessEntity,
  buildWebSiteEntity,
  stringifyJsonLd,
} from "@/lib/schema";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  // Trimmed from [400-900] to only the weights the site actually uses.
  // Each weight is a separate ~30-50 KB woff2 — the previous config shipped
  // 6 of them. The site only references 400 (body), 700 (buttons/labels),
  // 800 (subheads) and 900 (hero). Dropping 500 + 600 removes ~100 KB of
  // font payload from every page.
  weight: ["400", "700", "800", "900"],
  style: ["normal"],
  // "optional" skips the font-swap entirely — if Inter isn't cached by
  // the time we need to paint, the browser keeps the system fallback and
  // never triggers a layout shift. This is the single biggest CLS win on
  // mobile because the hero title no longer reflows when the font arrives.
  display: "optional",
  preload: true,
  fallback: ["system-ui", "Helvetica", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  // Per-page titles are constructed by createPageMetadata (which appends
  // the site name itself). We deliberately do NOT define a `title.template`
  // here because Next.js applies it to every nested title at render time,
  // which — combined with titles that already include the site name —
  // produces duplicated "| All Fire Services Australia" suffixes.
  title: `${SITE_NAME} — Fire Safety Services Sydney`,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "Fire protection services",
  keywords: [
    "fire safety services Sydney",
    "fire protection services Sydney",
    "annual fire safety statement",
    "AFSS inspection",
    "fire compliance NSW",
    "strata fire safety",
    "Greater Sydney fire safety",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL.toString() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: SITE_NAME,
    title: "Fire Safety Services Sydney | All Fire Services Australia",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: ogImageUrlFor(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "All Fire Services Australia — fire safety services across Greater Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Safety Services Sydney | All Fire Services Australia",
    description: DEFAULT_DESCRIPTION,
    images: [ogImageUrlFor(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/tablogo.png", type: "image/png" }],
    apple: [{ url: "/tablogo.png", type: "image/png" }],
  },
};

// ─── Structured data ──────────────────────────────────────────────────────────
//
// Centralised so every page that uses the root layout exposes the same
// authoritative LocalBusiness + WebSite entities (referenced by other
// pages via @id).
const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessEntity(),
    buildWebSiteEntity(),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} antialiased`}>
      <head>
        {/* Both preconnect hints removed — Lighthouse flagged them as
            "Unused preconnect" since the pages never request those origins
            on first paint. YouTubeLite loads thumbnails lazily on
            intersection, well after the critical path.

            The hero poster is the LCP element on `/`. Preload the smallest
            AVIF (640 px) for fast mobile first paint, plus the 1280 px
            desktop variant via `imagesrcset`. The browser picks the right
            one and the request goes out before the <DeferredVideo> mount. */}
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/herosectionimage-640.avif"
          // React 19 expects camelCase `fetchPriority` and `imageSrcSet` /
          // `imageSizes` props on <link>. Spreading to bypass the (still
          // incomplete) JSX typings without using a ts-expect-error.
          {...{
            imageSrcSet:
              "/herosectionimage-640.avif 640w, /herosectionimage-960.avif 960w, /herosectionimage-1280.avif 1280w",
            imageSizes: "100vw",
            fetchPriority: "high",
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-white`}
        style={{ scrollbarGutter: "stable" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(rootStructuredData),
          }}
        />
        <SmoothScrolling>
          <FooterReveal footerContent={<Footer />}>
            <FreeSiteVisitClientShell>
              <Navbar />
              {children}
            </FreeSiteVisitClientShell>
          </FooterReveal>
        </SmoothScrolling>
        {SpeedInsights ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
