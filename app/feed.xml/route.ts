import { prisma } from "@/lib/prisma";
import { getSiteOrigin, metaDescription, siteUrl } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const settings = await getSettings();
  const origin = getSiteOrigin();
  let posts: Array<{
    title: string;
    slug: string;
    excerpt: string | null;
    publishedAt: Date | null;
    updatedAt: Date;
  }> = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 30,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
  } catch {
    posts = [];
  }

  const items = posts
    .map((post) => {
      const url = siteUrl(`/blog/${post.slug}`, origin);
      const date = post.publishedAt ?? post.updatedAt;
      const summary = post.excerpt
        ? metaDescription(post.excerpt, post.excerpt)
        : "";

      return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      ${summary ? `<description>${escapeXml(summary)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(settings.siteName)}</title>
    <link>${escapeXml(origin)}</link>
    <description>${escapeXml(metaDescription(settings.metaDescription))}</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
