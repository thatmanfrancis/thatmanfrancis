import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit project — Admin",
};

export default async function EditProjectPage({ params }: Props) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <p className="section-label mb-3">Work</p>
      <h1 className="heading mb-8">Edit project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
