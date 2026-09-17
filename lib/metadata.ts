import type { Metadata } from "next";

const socialImage = {
  url: "/images/Home.jpg",
  width: 1800,
  height: 1010,
  alt: "René Aufhauser in seiner APM-Praxis",
};

type PageMetadata = {
  title: string;
  description: string;
  canonical: string;
};

export function createPageMetadata({
  title,
  description,
  canonical,
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "de_AT",
      siteName: "APM Aufhauser",
      title,
      description,
      url: canonical,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
