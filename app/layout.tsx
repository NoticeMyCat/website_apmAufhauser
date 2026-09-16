import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://apm-aufhauser.at";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: process.env.SITE_INDEXABLE === "true" },
  title: { default: "APM Aufhauser | Akupunkt-Massage in Salzburg", template: "%s | APM Aufhauser" },
  description: "Akupunkt-Massage nach Penzel in Salzburg. Lernen Sie René Aufhauser und seine Praxis kennen und fragen Sie einen Termin an.",
  openGraph: {
    type: "website",
    images: [{ url: "/images/Home.jpg", width: 1800, height: 1010, alt: "René Aufhauser in seiner APM-Praxis" }],
    locale: "de_AT",
    siteName: "APM Aufhauser",
    title: "APM Aufhauser | Akupunkt-Massage in Salzburg",
    description: "Akupunkt-Massage nach Penzel in Salzburg. Informieren Sie sich über die Methode und fragen Sie einen Termin an.",
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
    <html lang="de" className={geist.variable} data-scroll-behavior="smooth">
      <head />
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "LocalBusiness", name: "APM Aufhauser",
          url: siteUrl, telephone: "+436641632076", email: "apm.aufhauser@gmail.com",
          image: `${siteUrl}/images/Rene_Home.jpg`,
          address: { "@type": "PostalAddress", streetAddress: "Tauxgasse 24A", postalCode: "5020", addressLocality: "Salzburg", addressCountry: "AT" },
        }).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
