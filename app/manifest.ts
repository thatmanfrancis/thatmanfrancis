import type { MetadataRoute } from "next";
import { DEFAULT_META_DESCRIPTION, PERSON_NAME } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSettings();

  return {
    name: `${settings.siteName} — ${PERSON_NAME}`,
    short_name: settings.siteName,
    description: settings.metaDescription ?? DEFAULT_META_DESCRIPTION,
    start_url: "/",
    display: "browser",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: "/brand/fk-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/fk-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/monoline-fku.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
