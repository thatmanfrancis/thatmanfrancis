const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thatmanfrancis.vercel.app";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Francis Kossyrisochukwu Uzoigwe",
    alternateName: "Francis Uzoigwe",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    sameAs: [
      "https://github.com/thatmanfrancis",
      "https://linkedin.com/in/thatmanfrancis",
      "https://twitter.com/thatmanfrancis",
    ],
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "Nigeria",
    },
    email: "kossyuzoigwe@gmail.com",
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "Full-Stack Development",
      "Frontend Development",
      "Backend Development",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Francis Uzoigwe - Software Engineer",
    alternateName: "thatmanfrancis",
    url: SITE_URL,
    description:
      "Portfolio and blog of Francis Uzoigwe, a software engineer based in Lagos, Nigeria, specializing in full-stack web development.",
    author: {
      "@type": "Person",
      name: "Francis Kossyrisochukwu Uzoigwe",
    },
    inLanguage: "en-US",
  };
}

export function generateBlogPostSchema(blog: {
  title: string;
  excerpt: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}) {
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    url: `${SITE_URL}/blog/${blog.slug}`,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Francis Kossyrisochukwu Uzoigwe",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Francis Kossyrisochukwu Uzoigwe",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.slug}`,
    },
    wordCount,
    timeRequired: `PT${readingTime}M`,
    inLanguage: "en-US",
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  slug: string;
  category: string;
  tech: string[];
  link?: string | null;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    creator: {
      "@type": "Person",
      name: "Francis Kossyrisochukwu Uzoigwe",
      url: SITE_URL,
    },
    genre: project.category,
    keywords: project.tech.join(", "),
    ...(project.image && { image: project.image }),
    ...(project.link && { sameAs: project.link }),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
