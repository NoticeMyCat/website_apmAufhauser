import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://apm-aufhauser.at";
  return process.env.SITE_INDEXABLE === "true" ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${base.replace(/\/$/, "")}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
