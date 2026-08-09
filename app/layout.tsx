import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./allfireservices.css";
import "./responsive.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";
import ChatbotDeferred from "@/components/ChatbotDeferred";
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
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
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
        <link rel="preconnect" href="https://www.allfireservices.com.au" />
        <link rel="dns-prefetch" href="https://www.allfireservices.com.au" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Prefetch hints removed — they compete with the hero image for the
            critical first-paint budget on the home page. Next.js still
            prefetches <Link> destinations on hover/viewport automatically. */}
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
            <Navbar />
            {children}
          </FooterReveal>
        </SmoothScrolling>
        <ChatbotDeferred />
        <SpeedInsights />
      </body>
    </html>
  );
}
