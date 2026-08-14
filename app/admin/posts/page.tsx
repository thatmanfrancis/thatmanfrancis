import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deletePostAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Posts — Admin",
};

export default async function AdminPostsPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label mb-3">Writing</p>
          <h1 className="heading">Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">
          New post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                /{post.slug} · {post.published ? "Published" : "Draft"}
                {post.publishedAt ? ` · ${formatDate(post.publishedAt)}` : ""}
                {` · ${post.viewCount} views`}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/posts/${post.id}`}
                className="btn btn-ghost py-2 text-sm"
              >
                Edit
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className="btn btn-ghost py-2 text-sm">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
        {posts.length === 0 ? (
          <p className="body-text">No posts yet. Create your first one.</p>
        ) : null}
      </div>
    </div>
  );
}
