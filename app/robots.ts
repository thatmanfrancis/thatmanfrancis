import type { MetadataRoute } from "next";
import { getSiteOrigin, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/api"],
    },
    sitemap: siteUrl("/sitemap.xml", origin),
    host: origin.replace(/^https?:\/\//, ""),
  };
}
