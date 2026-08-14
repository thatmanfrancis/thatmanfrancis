import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const [
    projectCount,
    publishedProjects,
    postCount,
    publishedPosts,
    unreadMessages,
    subscriberCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.newsletterSubscriber
      ? prisma.newsletterSubscriber.count()
      : Promise.resolve(0),
  ]);

  return (
    <div>
      <p className="section-label mb-3">Admin</p>
      <h1 className="heading">Dashboard</h1>
      <p className="lede mt-3">
        Signed in as {user.email}. Manage content, contact inbox, and site
        settings from here.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <article className="card-surface p-5">
          <p className="section-label text-sm">Projects</p>
          <p className="mt-2 text-3xl font-bold">{projectCount}</p>
        </article>
        <article className="card-surface p-5">
          <p className="section-label text-sm">Published projects</p>
          <p className="mt-2 text-3xl font-bold">{publishedProjects}</p>
        </article>
        <article className="card-surface p-5">
          <p className="section-label text-sm">Posts</p>
          <p className="mt-2 text-3xl font-bold">{postCount}</p>
        </article>
        <article className="card-surface p-5">
          <p className="section-label text-sm">Published posts</p>
          <p className="mt-2 text-3xl font-bold">{publishedPosts}</p>
        </article>
        <article className="card-surface p-5">
          <p className="section-label text-sm">Unread messages</p>
          <p className="mt-2 text-3xl font-bold">{unreadMessages}</p>
        </article>
        <article className="card-surface p-5">
          <p className="section-label text-sm">Newsletter</p>
          <p className="mt-2 text-3xl font-bold">{subscriberCount}</p>
        </article>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Link
          href="/admin/projects"
          className="card-surface block p-6 transition hover:border-ink/30"
        >
          <p className="section-label text-sm">Work</p>
          <h2 className="mt-2 text-2xl font-bold">Manage projects</h2>
          <p className="mt-3 body-text">
            Add case studies, stack tags, links, and publish featured work.
          </p>
        </Link>
        <Link
          href="/admin/posts"
          className="card-surface block p-6 transition hover:border-ink/30"
        >
          <p className="section-label text-sm">Writing</p>
          <h2 className="mt-2 text-2xl font-bold">Manage posts</h2>
          <p className="mt-3 body-text">
            Draft and publish blog posts that appear on /blog.
          </p>
        </Link>
        <Link
          href="/admin/messages"
          className="card-surface block p-6 transition hover:border-ink/30"
        >
          <p className="section-label text-sm">Inbox</p>
          <h2 className="mt-2 text-2xl font-bold">Contact messages</h2>
          <p className="mt-3 body-text">
            Read submissions from the public contact form.
          </p>
        </Link>
        <Link
          href="/admin/newsletter"
          className="card-surface block p-6 transition hover:border-ink/30"
        >
          <p className="section-label text-sm">Audience</p>
          <h2 className="mt-2 text-2xl font-bold">Newsletter list</h2>
          <p className="mt-3 body-text">
            View people who subscribed from the footer form.
          </p>
        </Link>
        <Link
          href="/admin/settings"
          className="card-surface block p-6 transition hover:border-ink/30"
        >
          <p className="section-label text-sm">Site</p>
          <h2 className="mt-2 text-2xl font-bold">Settings</h2>
          <p className="mt-3 body-text">
            Contact details, socials, hero copy, and about text.
          </p>
        </Link>
        <Link
          href="/admin/seed"
          className="card-surface block p-6 transition hover:border-ink/30"
        >
          <p className="section-label text-sm">Tools</p>
          <h2 className="mt-2 text-2xl font-bold">Seed database</h2>
          <p className="mt-3 body-text">
            Create sample projects, posts, and the admin user without the CLI.
          </p>
        </Link>
      </div>
    </div>
  );
}
