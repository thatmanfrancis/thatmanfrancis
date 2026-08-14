import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteAssetUrl, getSiteOrigin, siteUrl } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const origin = getSiteOrigin();
  const lastModified = settings.updatedAt;

  let projects: Array<{
    slug: string;
    updatedAt: Date;
    coverUrl: string | null;
  }> = [];
  let posts: Array<{
    slug: string;
    updatedAt: Date;
    publishedAt: Date | null;
    coverUrl: string | null;
  }> = [];

  try {
    [projects, posts] = await Promise.all([
      prisma.project.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true, coverUrl: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true, publishedAt: true, coverUrl: true },
        orderBy: { publishedAt: "desc" },
      }),
    ]);
  } catch {
    projects = [];
    posts = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl("/", origin),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: siteUrl("/work", origin),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: siteUrl("/blog", origin),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: siteUrl("/about", origin),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: siteUrl("/contact", origin),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  return [
    ...staticRoutes,
    ...projects.map((project) => {
      const image = absoluteAssetUrl(project.coverUrl, origin);
      return {
        url: siteUrl(`/work/${project.slug}`, origin),
        lastModified: project.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: image ? [image] : undefined,
      };
    }),
    ...posts.map((post) => {
      const image = absoluteAssetUrl(post.coverUrl, origin);
      return {
        url: siteUrl(`/blog/${post.slug}`, origin),
        lastModified: post.updatedAt ?? post.publishedAt ?? lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: image ? [image] : undefined,
      };
    }),
  ];
}
