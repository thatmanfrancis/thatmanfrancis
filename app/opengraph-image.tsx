import { renderOgImage } from "@/lib/og";
import { getSettings } from "@/lib/settings";

export const alt = "thatmanfrancis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default async function Image() {
  const settings = await getSettings();

  return renderOgImage({
    eyebrow: settings.siteName,
    title: settings.heroTitle ?? settings.siteName,
  });
}
