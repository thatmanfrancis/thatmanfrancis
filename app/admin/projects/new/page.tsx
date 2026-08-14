import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "New project — Admin",
};

export default async function NewProjectPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  return (
    <div>
      <p className="section-label mb-3">Work</p>
      <h1 className="heading mb-8">New project</h1>
      <ProjectForm />
    </div>
  );
}
