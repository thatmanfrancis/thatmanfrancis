import { prisma } from "@/lib/prisma";
import { renderOgImage } from "@/lib/og";
import { getSettings } from "@/lib/settings";

export const alt = "Project";
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
  let title = "Project";

  try {
    const project = await prisma.project.findFirst({
      where: { slug, published: true },
      select: { title: true },
    });
    if (project) title = project.title;
  } catch {
    title = "Project";
  }

  return renderOgImage({
    eyebrow: `${settings.siteName} · Work`,
    title,
  });
}
