import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thatmanfrancis.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/login"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/login"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/login"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
