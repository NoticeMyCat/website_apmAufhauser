import type { NextConfig } from "next";

const isIndexable = process.env.SITE_INDEXABLE !== "false";

const nextConfig: NextConfig = {
  images: {
    qualities: [68, 75],
  },
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }, { source: "/about.html", destination: "/ueber-mich", permanent: true }, { source: "/services.html", destination: "/angebote", permanent: true }, { source: "/contact.html", destination: "/kontakt", permanent: true }, { source: "/impressum.html", destination: "/impressum", permanent: true }];
  },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, ...(!isIndexable ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : [])] }];
  },
};
export default nextConfig;
