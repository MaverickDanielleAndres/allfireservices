import type { Metadata } from "next";

export const SITE_NAME = "All Fire Services Australia";
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.allfireservices.com.au",
);
export const DEFAULT_DESCRIPTION =
  "Professional fire safety inspections, testing, maintenance and compliance services across Greater Sydney.";
export const DEFAULT_OG_IMAGE =
  "/annual-fire-safety-statement/all-fire-services-hydrant-test-banner.webp";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  noIndex?: boolean;
  canonicalPath?: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  canonicalPath = path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
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
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: "All Fire Services Australia fire safety technicians",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
