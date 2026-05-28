"use client";

import { useState } from "react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

// Expanded to 20 high-quality developer articles
const MOCK_POSTS = [
  {
    slug: "designing-with-tailwind-v4",
    title: "Why Tailwind CSS v4 is a Game Changer for Developers",
    excerpt: "Exploring the new lightning-fast Rust engine, native OKLCH theme engine, and cascade-layer configurations in Tailwind CSS v4.",
    date: "May 25, 2026",
    readTime: "5 min read",
    category: "Development",
  },
  {
    slug: "clean-slate-boilerplate",
    title: "The Power of a Clean Slate in Frontend Architecture",
    excerpt: "How starting from minimal templates prevents project bloat, improves core bundle sizes, and enhances your custom code logic.",
    date: "April 18, 2026",
    readTime: "4 min read",
    category: "Architecture",
  },
  {
    slug: "mastering-nextjs-app-router",
    title: "Mastering the Next.js App Router & Server Components",
    excerpt: "A comprehensive guide to understanding Server vs Client components, static exports, and standard rendering techniques in Next.js.",
    date: "March 12, 2026",
    readTime: "8 min read",
    category: "Next.js",
  },
  {
    slug: "art-of-oklch-colors",
    title: "The Art of CSS OKLCH Colors in Theme Designing",
    excerpt: "Ditching HSL and RGB for perceptual lightness and human-eye visual harmony. Learn to model dark/light variables mathematically.",
    date: "February 28, 2026",
    readTime: "6 min read",
    category: "Design System",
  },
  {
    slug: "nextjs-caching-deep-dive",
    title: "Next.js 16 Caching & Prerendering Deep Dive",
    excerpt: "Understanding route segment configs, static exports, dynamic rendering triggers, and how to cache public JSON APIs efficiently.",
    date: "January 15, 2026",
    readTime: "10 min read",
    category: "Backend",
  },
  {
    slug: "react-19-actions-and-hooks",
    title: "Unfolding React 19 Actions and Stateful Forms",
    excerpt: "A practical review of useActionState, useFormStatus, and the native transition hooks to optimize forms without complex states.",
    date: "December 05, 2025",
    readTime: "7 min read",
    category: "React 19",
  },
  {
    slug: "securing-server-actions",
    title: "Building Secure and Validated Next.js Server Actions",
    excerpt: "Implementing strict schemas, token decryptions, and session validations in Server Actions to block malicious user inputs.",
    date: "November 18, 2025",
    readTime: "6 min read",
    category: "Security",
  },
  {
    slug: "optimizing-core-web-vitals",
    title: "Optimizing Initial Page Loads with Core Web Vitals",
    excerpt: "Spearhead Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) scores using optimized images and modern CSS layout properties.",
    date: "October 12, 2025",
    readTime: "8 min read",
    category: "Performance",
  },
  {
    slug: "responsive-typography-systems",
    title: "Responsive Typography Systems in Modern CSS",
    excerpt: "Leveraging fluid sizing scales using clamp() and system font variables to establish readable, gorgeous text boundaries on all displays.",
    date: "September 24, 2025",
    readTime: "5 min read",
    category: "Design System",
  },
  {
    slug: "developer-guide-to-seo",
    title: "The Developer Guide to Modern SEO & JSON-LD Structured Data",
    excerpt: "Optimizing index rankings with semantic HTML5 elements, proper meta headers, XML sitemaps, and rich Google-friendly schema schemas.",
    date: "August 10, 2025",
    readTime: "7 min read",
    category: "SEO",
  },
  {
    slug: "dockerizing-nextjs-deployments",
    title: "Dockerizing Next.js for Secure and Lightweight Deployments",
    excerpt: "Crafting multi-stage Dockerfiles to compile clean production builds and reduce local image bundles to less than 100MB.",
    date: "July 28, 2025",
    readTime: "9 min read",
    category: "DevOps",
  },
  {
    slug: "why-we-ditched-redux",
    title: "Why We Ditched Redux for Local React Context & Hooks",
    excerpt: "Pruning complex state actions, reducers, and middle-layers. Streamlining global parameters with clean React context structures.",
    date: "June 14, 2025",
    readTime: "6 min read",
    category: "Architecture",
  },
  {
    slug: "ssr-vs-static-exports",
    title: "Demystifying Server-Side Rendering vs Static HTML Exports",
    excerpt: "Analyzing compilation behaviors and load speeds when hosting dynamic SSR servers compared to compiling flat static static sites.",
    date: "May 02, 2025",
    readTime: "8 min read",
    category: "Next.js",
  },
  {
    slug: "postgres-transaction-locks",
    title: "Understanding PostgreSQL Transaction Locks in Prisma Projects",
    excerpt: "Resolving database execution deadlocks, setting connection limits, and modeling transactional schema logs safely.",
    date: "April 18, 2025",
    readTime: "10 min read",
    category: "Database",
  },
  {
    slug: "tactile-micro-animations",
    title: "Designing Tactile Interactive Buttons with Micro-Animations",
    excerpt: "Establishing satisfying click and hover visual responses utilizing fluid CSS transitions, easing, and stateful hover scaling.",
    date: "March 11, 2025",
    readTime: "5 min read",
    category: "Design",
  },
  {
    slug: "git-rebase-strategies",
    title: "The Complete Guide to Git Rebase & Branch Strategies",
    excerpt: "Ditching messy merge commits. Learn to maintain a clean git history using interactive rebases, squash, and fast-forward commits.",
    date: "February 22, 2025",
    readTime: "7 min read",
    category: "DevOps",
  },
  {
    slug: "managing-api-rate-limits",
    title: "Managing API Rate Limits in Edge Middleware Layers",
    excerpt: "Deploying token buckets and IP validations at the edge to block bot traffic before requests hit backend database pipelines.",
    date: "January 09, 2025",
    readTime: "6 min read",
    category: "Security",
  },
  {
    slug: "web-workers-processing",
    title: "Leveraging Web Workers for Complex Client-Side Processing",
    excerpt: "Delegating heavy parsing operations and background calculations to worker threads to maintain a silky-smooth 60fps main UI stream.",
    date: "December 14, 2024",
    readTime: "9 min read",
    category: "Performance",
  },
  {
    slug: "developer-guide-accessibility",
    title: "A Developer Guide to Accessibility & ARIA Landmarks",
    excerpt: "Structuring HTML tags, keyboard navigations, and screen reader announcements to make applications accessible to everyone.",
    date: "November 05, 2024",
    readTime: "8 min read",
    category: "Design",
  },
  {
    slug: "turbopack-vs-webpack",
    title: "The Future of Web Compilation: Turbopack vs Webpack",
    excerpt: "Evaluating compilation speeds, HMR times, and structural bundler differences in the latest Next.js Turbopack compiler engines.",
    date: "October 18, 2024",
    readTime: "7 min read",
    category: "Development",
  },
];

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 10 posts per page as requested

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = MOCK_POSTS.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(MOCK_POSTS.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const mainSection = document.getElementById("blog-content");
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground antialiased font-sans transition-colors duration-300">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <main id="blog-content" className="flex-1 w-full max-w-4xl mx-auto px-6 pt-2 pb-16 z-10 space-y-12 scroll-mt-24">
        <div>
          <BackButton />
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">Writing</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">The developer journal.</h1>
          <p className="text-muted leading-relaxed max-w-lg">
            Sharing lessons learned, architectural insights, and tutorials from building high-quality digital products.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="divide-y divide-foreground/5 pt-8">
          {currentPosts.map((post) => (
            <article key={post.slug} className="py-8 group">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Link href={`/blog/${post.slug}`} className="block group-hover:translate-x-1 transition-transform duration-300">
                <h2 className="text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-muted leading-relaxed text-sm mb-4 max-w-3xl">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent">
                  Read Article →
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* Elegant Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 border-t border-foreground/5 pt-6">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-foreground/10 bg-foreground/1 hover:bg-foreground/2 disabled:opacity-40 disabled:hover:bg-foreground/1 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Prev
            </button>

            {/* Page Tabs */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    currentPage === pageNumber
                      ? "bg-accent text-background scale-105 shadow-lg shadow-accent/20"
                      : "border border-foreground/10 hover:bg-foreground/2"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-foreground/10 bg-foreground/1 hover:bg-foreground/2 disabled:opacity-40 disabled:hover:bg-foreground/1 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-foreground/5 text-center text-xs text-muted z-10">
        <p>&copy; {new Date().getFullYear()} Francis Uzoigwe. All rights reserved.</p>
      </footer>
    </div>
  );
}
