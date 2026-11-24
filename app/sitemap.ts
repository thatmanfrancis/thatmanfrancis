import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/content/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/privacy/` },
    ...projects.map(({ slug }) => ({ url: `${siteUrl}/work/${slug}/` })),
  ];
}
