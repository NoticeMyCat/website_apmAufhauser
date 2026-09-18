import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, images: ["/images/Rene_Home.jpg", "/images/APM_AUFHAUSER_Praxis.jpg"] },
    { path: "/angebote", priority: 0.9, images: ["/images/angebot-tafel-skelett.jpg", "/images/DSC03652_slider.jpg", "/images/Rene_Wirbelsaeule.jpg"] },
    { path: "/ueber-mich", priority: 0.8, images: ["/images/Rene_Home.jpg", "/images/APM_AUFHAUSER_Wirbelsaeule_rechts.jpg"] },
    { path: "/kontakt", priority: 0.8, images: [] },
    { path: "/impressum", priority: 0.3, images: [] },
    { path: "/datenschutz", priority: 0.3, images: [] },
  ] as const;

  return pages.map(({ path, priority, images }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-09-18"),
    changeFrequency: "monthly",
    priority,
    images: images.map((image) => `${site.url}${image}`),
  }));
}
