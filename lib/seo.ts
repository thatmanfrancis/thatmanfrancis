import type { Metadata } from "next";
import type { SiteSettings } from "@/lib/generated/prisma";
import { socialLinks } from "@/lib/settings";
import {
  absoluteAssetUrl,
  getSiteOrigin,
  siteUrl,
} from "@/lib/site-url";

export { absoluteAssetUrl, getSiteOrigin, siteUrl } from "@/lib/site-url";

/** Legal / SEO name — distinctive middle name helps search discovery. */
export const PERSON_NAME = "Francis Kossyrisochukwu Uzoigwe";

export const PERSON_ALTERNATE_NAMES = [
  "thatmanfrancis",
  "thatmanfrancis.com",
  "Francis Uzoigwe",
  "Francis",
  "Francis K. Uzoigwe",
  "Francis Kossyrisochukwu",
  "Kossyrisochukwu Uzoigwe",
  "Francis Kossyrisochukwu Uzoigwe",
] as const;

export const DEFAULT_META_DESCRIPTION =
  "Francis Kossyrisochukwu Uzoigwe (thatmanfrancis) — full-stack developer in Lagos, Nigeria. Next.js, TypeScript, React, and product engineering.";

export const SEO_KEYWORDS = [
  "Francis Kossyrisochukwu Uzoigwe",
  "Francis Uzoigwe",
  "Francis Kossyrisochukwu",
  "Francis K. Uzoigwe",
  "Uzoigwe Francis",
  "Kossyrisochukwu",
  "thatmanfrancis",
  "thatmanfrancis portfolio",
  "Francis full stack developer",
  "full stack engineer Nigeria",
  "full-stack developer Lagos",
  "full stack developer",
  "full stack engineer",
  "software engineer Lagos",
  "software engineer Nigeria",
  "web developer Lagos Nigeria",
  "Next.js developer Lagos",
  "Next.js developer Nigeria",
  "TypeScript developer Nigeria",
  "React developer Nigeria",
  "Node.js developer Nigeria",
  "Prisma developer",
  "backend developer Nigeria",
  "frontend developer Nigeria",
  "React engineer Lagos",
  "portfolio website",
  "developer portfolio",
  "portfolio",
] as const;

export function twitterHandle(url?: string | null) {
  if (!url?.trim()) return undefined;
  try {
    const parsed = new URL(url);
    const handle = parsed.pathname.split("/").filter(Boolean)[0];
    return handle ? `@${handle.replace(/^@/, "")}` : undefined;
  } catch {
    return url.startsWith("@") ? url : undefined;
  }
}

export function metaDescription(
  text?: string | null,
  fallback = DEFAULT_META_DESCRIPTION,
) {
  const value = (text ?? fallback).replace(/\s+/g, " ").trim();
  if (value.length <= 160) return value;
  return `${value.slice(0, 157).trimEnd()}...`;
}

export function siteKeywords(skills: string[] = []) {
  return Array.from(new Set([...SEO_KEYWORDS, ...skills]));
}

export function publicPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | Date | null;
  modifiedTime?: string | Date | null;
}): Metadata {
  const summary = description
    ? metaDescription(description, description)
    : undefined;
  const imageUrl = absoluteAssetUrl(image);

  return {
    title,
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description: summary,
      url: path,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      ...(type === "article"
        ? {
            publishedTime: publishedTime
              ? new Date(publishedTime).toISOString()
              : undefined,
            modifiedTime: modifiedTime
              ? new Date(modifiedTime).toISOString()
              : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  origin = getSiteOrigin(),
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path, origin),
    })),
  };
}

export function websiteJsonLd(
  settings: SiteSettings,
  origin = getSiteOrigin(),
) {
  const socials = socialLinks(settings).map((item) => item.href);
  const image =
    absoluteAssetUrl(settings.aboutImageUrl, origin) ??
    absoluteAssetUrl("/brand/monoline-fku.png", origin);
  const location = settings.contactLocation?.trim() || "Lagos, Nigeria";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: settings.siteName,
        alternateName: PERSON_NAME,
        url: origin,
        description: metaDescription(settings.metaDescription),
        inLanguage: "en",
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: PERSON_NAME,
        givenName: "Francis",
        familyName: "Uzoigwe",
        additionalName: "Kossyrisochukwu",
        alternateName: [...PERSON_ALTERNATE_NAMES],
        url: origin,
        jobTitle: settings.heroRole ?? "Full-stack engineer",
        description: metaDescription(settings.metaDescription),
        email: settings.contactEmail ?? undefined,
        telephone: settings.contactPhone ?? undefined,
        image,
        homeLocation: {
          "@type": "Place",
          name: location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
        },
        knowsAbout: siteKeywords(settings.skills),
        knowsLanguage: ["en"],
        sameAs: socials.length > 0 ? socials : undefined,
      },
    ],
  };
}

export function projectJsonLd({
  title,
  summary,
  slug,
  coverUrl,
  dateModified,
  origin,
}: {
  title: string;
  summary: string;
  slug: string;
  coverUrl?: string | null;
  dateModified?: Date | string | null;
  origin: string;
}) {
  const url = siteUrl(`/work/${slug}`, origin);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: summary,
    url,
    image: absoluteAssetUrl(coverUrl, origin),
    dateModified: dateModified
      ? new Date(dateModified).toISOString()
      : undefined,
    creator: { "@id": `${origin}/#person` },
    isPartOf: { "@id": `${origin}/#website` },
  };
}

export function postJsonLd({
  title,
  excerpt,
  slug,
  coverUrl,
  publishedAt,
  updatedAt,
  origin,
}: {
  title: string;
  excerpt?: string | null;
  slug: string;
  coverUrl?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  origin: string;
}) {
  const url = siteUrl(`/blog/${slug}`, origin);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt ? metaDescription(excerpt, excerpt) : undefined,
    url,
    mainEntityOfPage: url,
    image: absoluteAssetUrl(coverUrl, origin),
    datePublished: publishedAt
      ? new Date(publishedAt).toISOString()
      : undefined,
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
    author: { "@id": `${origin}/#person` },
    publisher: { "@id": `${origin}/#person` },
    isPartOf: { "@id": `${origin}/#website` },
  };
}
