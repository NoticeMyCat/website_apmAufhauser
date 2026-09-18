import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { practiceAddress, site } from "@/lib/site";
import "./globals.css";

const ibmPlexSans = localFont({
  src: "../node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2",
  variable: "--font-plex",
  weight: "100 700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  title: { default: "APM Aufhauser | Akupunkt-Massage in Salzburg", template: "%s | APM Aufhauser" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.practitioner }],
  creator: site.practitioner,
  keywords: [
    "Akupunkt-Massage Salzburg",
    "APM nach Penzel",
    "Akupunkt-Massage nach Penzel",
    "René Aufhauser",
    "APM Aufhauser",
  ],
  openGraph: {
    type: "website",
    images: [{ url: "/images/Home.jpg", width: 1800, height: 1010, alt: "René Aufhauser in seiner APM-Praxis" }],
    locale: "de_AT",
    siteName: "APM Aufhauser",
    title: "APM Aufhauser | Akupunkt-Massage in Salzburg",
    description: "Akupunkt-Massage nach Penzel in Salzburg. Informieren Sie sich über die Methode und fragen Sie einen Termin an.",
  },
  twitter: {
    card: "summary_large_image",
    title: "APM Aufhauser | Akupunkt-Massage in Salzburg",
    description: "Akupunkt-Massage nach Penzel in Salzburg. Informieren Sie sich über die Methode und fragen Sie einen Termin an.",
    images: ["/images/Home.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#f6f3ef",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={ibmPlexSans.variable} data-scroll-behavior="smooth">
      <head />
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${site.url}/#praxis`,
          name: site.name,
          description: site.description,
          url: site.url,
          telephone: site.phoneHref,
          email: site.email,
          image: `${site.url}/images/Rene_Home.jpg`,
          priceRange: "€€",
          areaServed: { "@type": "City", name: site.address.city },
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            postalCode: site.address.postalCode,
            addressLocality: site.address.city,
            addressCountry: site.address.country,
          },
          hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(practiceAddress)}`,
        }).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
