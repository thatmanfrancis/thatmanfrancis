import BackButton from "@/components/BackButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMeta({
  title: "Blog - Software Engineering & Web Development Insights",
  description: "Read Francis Uzoigwe's blog about software engineering, web development, React, Next.js, TypeScript, best practices, tutorials, and technical insights from Lagos, Nigeria.",
  keywords: [
    "software engineering blog",
    "web development articles",
    "React tutorials",
    "Next.js guides",
    "programming blog Nigeria",
    "tech blog Lagos",
  ],
});

const POSTS_PER_PAGE = 10;

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  const [blogs, totalCount] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.blog.count({ where: { published: true } }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto py-4 pb-32">
      <BackButton />
      <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-900 mb-2 uppercase">
        Blog
      </h1>
      <p className="text-zinc-500 mb-12 italic font-serif text-lg">
        Thoughts on engineering and design
      </p>

      <div className="grid grid-cols-1 gap-16">
        {blogs.map((blog) => {
          const readingTime = calculateReadingTime(blog.content);
          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group block"
            >
              <article>
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <div className="h-1 w-1 rounded-full bg-zinc-200" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {readingTime} min read
                  </span>
                </div>
                <h2 className="text-2xl font-black text-zinc-900 group-hover:text-zinc-600 transition-colors mb-4 uppercase tracking-tighter sm:text-4xl">
                  {blog.title}
                </h2>
                <p className="text-zinc-500 leading-relaxed font-serif text-lg max-w-2xl">
                  {blog.excerpt}
                </p>
              </article>
            </Link>
          );
        })}
      </div>

      {/* Pagination — always shown; inactive when content fits a single page */}
      <div className="mt-24 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </div>
    </div>
  );
}
