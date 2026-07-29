import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Fire Safety Services Sydney | All Fire Services Australia",
    template: "%s | All Fire Services Australia",
  },
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
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
        url: DEFAULT_OG_IMAGE,
        alt: "All Fire Services Australia fire safety technicians",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Safety Services Sydney | All Fire Services Australia",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}#business`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: new URL("/logo.png", SITE_URL),
      image: new URL(DEFAULT_OG_IMAGE, SITE_URL),
      telephone: "+61-1300-765-594",
      email: "admin@allfireservices.com.au",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "330 Wattle Street",
        addressLocality: "Ultimo",
        addressRegion: "NSW",
        postalCode: "2007",
        addressCountry: "AU",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Greater Sydney",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "07:00",
          closes: "18:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "07:00",
          closes: "12:30",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-AU",
      publisher: {
        "@id": `${SITE_URL}#business`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} antialiased`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-black`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScrolling>
          <FooterReveal footerContent={<Footer />}>
            <Navbar />
            {children}
          </FooterReveal>
        </SmoothScrolling>
        <ChatbotDeferred />
      </body>
    </html>
  );
}

