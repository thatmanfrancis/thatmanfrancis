import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thatmanfrancis.vercel.app";
const SITE_NAME = "Francis Uzoigwe";
const SITE_TITLE = "Francis Uzoigwe - Software Engineer in Lagos, Nigeria";
const SITE_DESCRIPTION = "Francis Uzoigwe is a software engineer based in Lagos, Nigeria, specializing in full-stack web development, React, Next.js, and building thoughtful digital products.";

// Comprehensive keywords for SEO
const KEYWORDS = [
  "Francis Uzoigwe",
  "Francis Kossyrisochukwu Uzoigwe",
  "thatmanfrancis",
  "software engineer Lagos",
  "web developer Lagos",
  "full stack developer Nigeria",
  "React developer Lagos",
  "Next.js developer Nigeria",
  "TypeScript developer Lagos",
  "best developers in Lagos",
  "top software engineers Nigeria",
  "freelance developer Lagos",
  "web development Lagos",
  "software development Nigeria",
  "frontend developer Lagos",
  "backend developer Lagos",
  "JavaScript developer Nigeria",
  "Node.js developer Lagos",
  "database developer Nigeria",
  "API development Lagos",
  "UI/UX developer Nigeria",
  "responsive web design Lagos",
  "mobile-first development Nigeria",
  "progressive web apps Lagos",
  "web application development Nigeria",
  "custom software development Lagos",
  "e-commerce development Nigeria",
  "CMS development Lagos",
  "portfolio website developer",
  "business website developer Lagos",
  "startup developer Nigeria",
  "tech consultant Lagos",
  "software architect Nigeria",
  "code optimization expert",
  "performance optimization developer",
  "SEO-friendly websites Lagos",
  "accessible web development",
  "modern web technologies",
  "cloud deployment expert",
  "database design specialist",
  "REST API developer",
  "GraphQL developer Lagos",
  "real-time applications developer",
  "authentication systems expert",
  "payment integration developer",
  "third-party API integration",
  "Prisma ORM specialist",
  "PostgreSQL developer Lagos",
  "MongoDB developer Nigeria",
  "Git version control expert",
  "agile development Lagos",
  "test-driven development",
  "clean code advocate",
  "software engineering best practices",
  "scalable applications developer",
  "maintainable code specialist",
  "technical documentation expert",
  "code review specialist",
  "mentorship software development",
  "remote developer Nigeria",
  "contract developer Lagos",
  "project-based developer",
  "hourly developer Lagos",
  "dedicated developer Nigeria",
  "reliable software engineer",
  "professional web developer",
  "experienced developer Lagos",
  "skilled programmer Nigeria",
  "creative developer Lagos",
  "innovative solutions developer",
  "problem-solving developer",
  "detail-oriented programmer",
  "deadline-driven developer",
  "client-focused developer Lagos",
  "business-oriented developer",
  "ROI-focused development",
  "conversion optimization developer",
  "user experience specialist",
  "interface design developer",
  "pixel-perfect implementation",
  "cross-browser compatibility expert",
  "mobile responsive developer",
  "PWA specialist Lagos",
  "SPA developer Nigeria",
  "SSR expert Next.js",
  "static site generation",
  "JAMstack developer Lagos",
  "headless CMS integration",
  "Contentful developer",
  "Sanity.io developer",
  "Strapi developer Lagos",
  "WordPress developer Nigeria",
  "Shopify developer Lagos",
  "WooCommerce developer",
  "payment gateway integration",
  "Stripe integration developer",
  "Paystack integration Nigeria",
  "Flutterwave developer Lagos",
  "fintech developer Nigeria",
  "healthcare software developer",
  "education platform developer",
  "social media integration expert",
  "analytics implementation specialist",
  "Google Analytics expert",
  "conversion tracking specialist",
];

interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = SITE_DESCRIPTION,
  keywords = [],
  image = `${SITE_URL}/og-image.png`,
  url = SITE_URL,
  type = "website",
  publishedTime,
  modifiedTime,
  author = SITE_NAME,
  noIndex = false,
}: PageMetadata = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const allKeywords = [...KEYWORDS, ...keywords].join(", ");

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@thatmanfrancis",
      site: "@thatmanfrancis",
    },
    verification: {
      google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
    category: "technology",
  };
}

export const defaultMetadata = generateMetadata();
