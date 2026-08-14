import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "New post — Admin",
};

export default async function NewPostPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  return (
    <div>
      <p className="section-label mb-3">Writing</p>
      <h1 className="heading mb-8">New post</h1>
      <PostForm />
    </div>
  );
}
