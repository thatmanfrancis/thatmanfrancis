import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit post — Admin",
};

export default async function EditPostPage({ params }: Props) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <p className="section-label mb-3">Writing</p>
      <h1 className="heading mb-8">Edit post</h1>
      <PostForm post={post} />
    </div>
  );
}
