import BackButton from "@/components/BackButton";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import type { Metadata } from "next";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog || !blog.published) {
    return generateMeta();
  }

  return generateMeta({
    title: blog.title,
    description: blog.excerpt,
    type: "article",
    publishedTime: blog.createdAt.toISOString(),
    modifiedTime: blog.updatedAt.toISOString(),
    url: `https://thatmanfrancis.vercel.app/blog/${blog.slug}`,
    keywords: [
      "blog post",
      "software engineering article",
      "web development tutorial",
      blog.title.toLowerCase(),
    ],
  });
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog || !blog.published) {
    notFound();
  }

  const readingTime = calculateReadingTime(blog.content);
  const blogSchema = generateBlogPostSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://thatmanfrancis.vercel.app" },
    { name: "Blog", url: "https://thatmanfrancis.vercel.app/blog" },
    { name: blog.title, url: `https://thatmanfrancis.vercel.app/blog/${blog.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="py-4 pb-32">
      <BackButton />

      <article className="max-w-3xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <time className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <div className="h-1 w-1 rounded-full bg-zinc-200" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tighter leading-none mb-8">
            {blog.title}
          </h1>

          <p className="text-2xl text-zinc-500 font-bold leading-relaxed tracking-tight">
            {blog.excerpt}
          </p>
        </header>

        <div className="prose prose-zinc prose-lg max-w-none prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black">
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\n/g, "<br/>"),
            }}
          />
        </div>

        <footer className="mt-32 pt-16 border-t border-zinc-100">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="h-12 w-px bg-zinc-200" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">
              Thanks for reading
            </p>
          </div>
        </footer>
      </article>
    </div>
    </>
  );
}
