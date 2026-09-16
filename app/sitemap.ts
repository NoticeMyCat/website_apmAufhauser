import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://apm-aufhauser.at").replace(/\/$/, "");
  return ["", "/angebote", "/ueber-mich", "/kontakt", "/impressum", "/datenschutz"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
