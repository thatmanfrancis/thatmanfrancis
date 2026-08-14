import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin login",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const user = await requireAdmin();
  if (user) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <div className="card-surface w-full p-6 sm:p-8">
        <p className="section-label mb-2">Admin portal</p>
        <h1 className="heading text-3xl sm:text-4xl">Sign in</h1>
        <p className="lede mt-3 text-base">
          Use your admin credentials to manage projects and blog posts.
        </p>
        <AdminLoginForm error={error} />
      </div>
    </div>
  );
}
