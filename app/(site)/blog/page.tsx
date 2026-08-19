import type { Metadata } from "next";
import { PostRow } from "@/components/blog/post-row";
import { JsonLd } from "@/components/seo/json-ld";
import { prisma } from "@/lib/prisma";
import { breadcrumbJsonLd, getSiteOrigin, publicPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = publicPageMetadata({
  title: "Blog",
  description:
    "Blog posts by Francis Kossyrisochukwu Uzoigwe on full-stack development, Next.js, TypeScript, product engineering, and shipping real web products.",
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
  const origin = getSiteOrigin();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ],
          origin,
        )}
      />
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <p className="section-label mb-3">Blog</p>
          <h1 className="heading">Writing</h1>
          <p className="lede mt-4">
            Notes on full-stack development, interfaces, and product engineering.
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
    </>
  );
}
