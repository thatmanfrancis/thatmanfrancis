import type { Metadata } from "next";
import { PostRow } from "@/components/blog/post-row";
import { prisma } from "@/lib/prisma";
import { publicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = publicPageMetadata({
  title: "Blog",
  description: "Notes on shipping, interfaces, and the work behind the work.",
  path: "/blog",
});

async function getPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <p className="section-label mb-3">Blog</p>
        <h1 className="heading">Writing</h1>
        <p className="lede mt-4">
          Notes on shipping, interfaces, and the work behind the work.
        </p>

        <div className="mt-6">
          {posts.map((post, index) => (
            <PostRow
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              coverUrl={post.coverUrl}
              publishedAt={post.publishedAt}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="mt-8 body-text">No published posts yet.</p>
        ) : null}
      </div>
    </section>
  );
}
