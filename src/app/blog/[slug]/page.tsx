import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

// Complete catalog of all 20 developer blog posts
const ALL_POSTS = [
  {
    slug: "designing-with-tailwind-v4",
    title: "Why Tailwind CSS v4 is a Game Changer for Developers",
    category: "Development",
    date: "May 25, 2026",
    readTime: "5 min read",
    excerpt: "Exploring the new lightning-fast Rust engine, native OKLCH theme engine, and cascade-layer configurations in Tailwind CSS v4.",
    content: `
Tailwind CSS v4 introduces a completely redesigned developer experience that marks a major paradigm shift in utility-first CSS styling. By rewriting the core compilation engine in Rust and implementing a native theme system, it achieves unprecedented compilation speeds and highly simplified integration guidelines.

### The Power of the Rust Compiler

Previous versions of Tailwind relied on PostCSS and JavaScript compilation cycles, which could sometimes lag in extremely large codebases. The new engine runs natively, resulting in build cycles that compile up to 10x faster. 

### Native OKLCH Support

OKLCH is a modern color space that models human visual perception far better than standard RGB or HSL. Tailwind v4 introduces native support, allowing developers to set highly tailored, harmonized visual palettes that preserve structural color ratios in both light and dark mode themes.

### Simplified Cascade Layer Integration

Using the new \`@theme\` and cascade layer system, adding custom colors, custom animations, or base reset rules is now as simple as editing local CSS declarations. You no longer need an external config sheet, leaving your repository clean and highly maintainable.
    `
  },
  {
    slug: "clean-slate-boilerplate",
    title: "The Power of a Clean Slate in Frontend Architecture",
    category: "Architecture",
    date: "April 18, 2026",
    readTime: "4 min read",
    excerpt: "How starting from minimal templates prevents project bloat, improves core bundle sizes, and enhances your custom code logic.",
    content: `
In modern web development, starting from bloated, pre-configured boilerplates is a silent productivity killer. Every unused dependency, obscure configuration file, and third-party script increases cognitive load and introduces potential security vulnerabilities.

### Pruning Cognitive Overhead

A clean workspace allows your mind to focus purely on the functional architecture of the application. You write logic knowing precisely where every element lives and how each layout style behaves. 

### Preventing Build Size Bloat

Pruning library imports can easily double your initial JavaScript bundle size. By resetting to a clean slate and introducing components modularly, you ensure that search engine indexers and mobile devices load your pages with optimal performance margins.
    `
  },
  {
    slug: "mastering-nextjs-app-router",
    title: "Mastering the Next.js App Router & Server Components",
    category: "Next.js",
    date: "March 12, 2026",
    readTime: "8 min read",
    excerpt: "A comprehensive guide to understanding Server vs Client components, static exports, and standard rendering techniques in Next.js.",
    content: `
Next.js React Server Components (RSC) represent a massive shift in how full-stack React applications are designed. By rendering components on the server by default, they eliminate initial hydration cycles and drastically decrease initial bundle footprints.

### Server Components by Default

By fetching data and rendering markdown directly on the server, you reduce the client-side JavaScript burden. The browser receives clean HTML, which loads immediately and gets indexed flawlessly by search engines.

### Dynamic vs Static Generation

Mastering caching and page rendering configurations ensures that your blogs, product lists, and timelines remain lightning-fast. Using the standard App Router directory structure provides standard caching and routing control without complex configurations.
    `
  },
  {
    slug: "art-of-oklch-colors",
    title: "The Art of CSS OKLCH Colors in Theme Designing",
    category: "Design System",
    date: "February 28, 2026",
    readTime: "6 min read",
    excerpt: "Ditching HSL and RGB for perceptual lightness and human-eye visual harmony. Learn to model dark/light variables mathematically."
  },
  {
    slug: "nextjs-caching-deep-dive",
    title: "Next.js 16 Caching & Prerendering Deep Dive",
    category: "Backend",
    date: "January 15, 2026",
    readTime: "10 min read",
    excerpt: "Understanding route segment configs, static exports, dynamic rendering triggers, and how to cache public JSON APIs efficiently."
  },
  {
    slug: "react-19-actions-and-hooks",
    title: "Unfolding React 19 Actions and Stateful Forms",
    category: "React 19",
    date: "December 05, 2025",
    readTime: "7 min read",
    excerpt: "A practical review of useActionState, useFormStatus, and the native transition hooks to optimize forms without complex states."
  },
  {
    slug: "securing-server-actions",
    title: "Building Secure and Validated Next.js Server Actions",
    category: "Security",
    date: "November 18, 2025",
    readTime: "6 min read",
    excerpt: "Implementing strict schemas, token decryptions, and session validations in Server Actions to block malicious user inputs."
  },
  {
    slug: "optimizing-core-web-vitals",
    title: "Optimizing Initial Page Loads with Core Web Vitals",
    category: "Performance",
    date: "October 12, 2025",
    readTime: "8 min read",
    excerpt: "Spearhead Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) scores using optimized images and modern CSS layout properties."
  },
  {
    slug: "responsive-typography-systems",
    title: "Responsive Typography Systems in Modern CSS",
    category: "Design System",
    date: "September 24, 2025",
    readTime: "5 min read",
    excerpt: "Leveraging fluid sizing scales using clamp() and system font variables to establish readable, gorgeous text boundaries on all displays."
  },
  {
    slug: "developer-guide-to-seo",
    title: "The Developer Guide to Modern SEO & JSON-LD Structured Data",
    category: "SEO",
    date: "August 10, 2025",
    readTime: "7 min read",
    excerpt: "Optimizing index rankings with semantic HTML5 elements, proper meta headers, XML sitemaps, and rich Google-friendly schema schemas."
  },
  {
    slug: "dockerizing-nextjs-deployments",
    title: "Dockerizing Next.js for Secure and Lightweight Deployments",
    category: "DevOps",
    date: "July 28, 2025",
    readTime: "9 min read",
    excerpt: "Crafting multi-stage Dockerfiles to compile clean production builds and reduce local image bundles to less than 100MB."
  },
  {
    slug: "why-we-ditched-redux",
    title: "Why We Ditched Redux for Local React Context & Hooks",
    category: "Architecture",
    date: "June 14, 2025",
    readTime: "6 min read",
    excerpt: "Pruning complex state actions, reducers, and middle-layers. Streamlining global parameters with clean React context structures."
  },
  {
    slug: "ssr-vs-static-exports",
    title: "Demystifying Server-Side Rendering vs Static HTML Exports",
    category: "Next.js",
    date: "May 02, 2025",
    readTime: "8 min read",
    excerpt: "Analyzing compilation behaviors and load speeds when hosting dynamic SSR servers compared to compiling flat static static sites."
  },
  {
    slug: "postgres-transaction-locks",
    title: "Understanding PostgreSQL Transaction Locks in Prisma Projects",
    category: "Database",
    date: "April 18, 2025",
    readTime: "10 min read",
    excerpt: "Resolving database execution deadlocks, setting connection limits, and modeling transactional schema logs safely."
  },
  {
    slug: "tactile-micro-animations",
    title: "Designing Tactile Interactive Buttons with Micro-Animations",
    category: "Design",
    date: "March 11, 2025",
    readTime: "5 min read",
    excerpt: "Establishing satisfying click and hover visual responses utilizing fluid CSS transitions, easing, and stateful hover scaling."
  },
  {
    slug: "git-rebase-strategies",
    title: "The Complete Guide to Git Rebase & Branch Strategies",
    category: "DevOps",
    date: "February 22, 2025",
    readTime: "7 min read",
    excerpt: "Ditching messy merge commits. Learn to maintain a clean git history using interactive rebases, squash, and fast-forward commits."
  },
  {
    slug: "managing-api-rate-limits",
    title: "Managing API Rate Limits in Edge Middleware Layers",
    category: "Security",
    date: "January 09, 2025",
    readTime: "6 min read",
    excerpt: "Deploying token buckets and IP validations at the edge to block bot traffic before requests hit backend database pipelines."
  },
  {
    slug: "web-workers-processing",
    title: "Leveraging Web Workers for Complex Client-Side Processing",
    category: "Performance",
    date: "December 14, 2024",
    readTime: "9 min read",
    excerpt: "Delegating heavy parsing operations and background calculations to worker threads to maintain a silky-smooth 60fps main UI stream."
  },
  {
    slug: "developer-guide-accessibility",
    title: "A Developer Guide to Accessibility & ARIA Landmarks",
    category: "Design",
    date: "November 05, 2024",
    readTime: "8 min read",
    excerpt: "Structuring HTML tags, keyboard navigations, and screen reader announcements to make applications accessible to everyone."
  },
  {
    slug: "turbopack-vs-webpack",
    title: "The Future of Web Compilation: Turbopack vs Webpack",
    category: "Development",
    date: "October 18, 2024",
    readTime: "7 min read",
    excerpt: "Evaluating compilation speeds, HMR times, and structural bundler differences in the latest Next.js Turbopack compiler engines."
  }
];

// Helper to dynamically generate a robust technical article if detailed content isn't pre-written
function compileArticleContent(post: typeof ALL_POSTS[number]) {
  if (post.content) return post.content.trim();

  return `
Modern web development requires deep architectural discipline. When addressing ${post.title}, software engineers must look beyond basic configurations and inspect core system behaviors to build truly resilient solutions.

### The Engineering Challenge

${post.excerpt} Without a structured execution plan, making changes in this area can introduce unexpected rendering blocks, performance bottlenecks, or security overhead.

### Strategic Implementation Steps

1. Analyze System Boundaries: Inspect how data flows across component borders and identify potential latency, concurrency, or visual layout constraints.

2. Optimize Resource Compilations: Shrink compile footprints, leverage efficient module packaging configurations, and establish clean caching protocols.

3. Verify Under Peak Loads: Stress-test the resulting systems to confirm absolute visual stability and zero resource degradation under concurrent user cycles.

### Measurable Production Benefits

By adopting these industry best practices, developers can achieve up to a 40% reduction in processing overhead and experience a major boost in Lighthouse performance scores, keeping user experiences highly fast, secure, and accessible to everyone.
  `.trim();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = ALL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const renderedContent = compileArticleContent(post);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground antialiased font-sans">
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-2 pb-16 z-10 space-y-8">
        <div>
          <BackButton />
        </div>
        <article className="space-y-8">
          <div className="space-y-4 border-b border-foreground/5 pb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted leading-relaxed space-y-6 pt-4">
            {renderedContent.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-bold text-foreground pt-4 mb-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-base">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-foreground/5 text-center text-xs text-muted z-10">
        <p>&copy; {new Date().getFullYear()} Francis Uzoigwe. All rights reserved.</p>
      </footer>
    </div>
  );
}
