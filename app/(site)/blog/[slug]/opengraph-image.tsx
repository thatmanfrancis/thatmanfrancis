import { prisma } from "@/lib/prisma";
import { renderOgImage } from "@/lib/og";
import { getSettings } from "@/lib/settings";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const settings = await getSettings();
  let title = "Writing";

  try {
    const post = await prisma.post.findFirst({
      where: { slug, published: true },
      select: { title: true },
    });
    if (post) title = post.title;
  } catch {
    title = "Writing";
  }

  return renderOgImage({
    eyebrow: `${settings.siteName} · Blog`,
    title,
  });
}
