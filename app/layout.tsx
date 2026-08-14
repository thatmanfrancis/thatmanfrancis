import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import {
  getSiteOrigin,
  metaDescription,
  PERSON_NAME,
  siteKeywords,
  twitterHandle,
} from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const origin = getSiteOrigin();
  const description = metaDescription(settings.metaDescription);
  const keywords = siteKeywords(settings.skills);

  return {
    metadataBase: new URL(origin),
    title: {
      default: `${settings.siteName} — ${PERSON_NAME}`,
      template: `%s — ${settings.siteName}`,
    },
    description,
    applicationName: settings.siteName,
    authors: [{ name: PERSON_NAME, url: origin }],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: settings.siteName,
      title: `${settings.siteName} — ${PERSON_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${settings.siteName} — ${PERSON_NAME}`,
      description,
      creator: twitterHandle(settings.socialX),
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
