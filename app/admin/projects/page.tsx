import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteProjectAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Projects — Admin",
};

export default async function AdminProjectsPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label mb-3">Work</p>
          <h1 className="heading">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary">
          New project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                /{project.slug} ·{" "}
                {project.published ? "Published" : "Draft"}
                {project.featured ? " · Featured" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project.id}`}
                className="btn btn-ghost py-2 text-sm"
              >
                Edit
              </Link>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="btn btn-ghost py-2 text-sm">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
        {projects.length === 0 ? (
          <p className="body-text">No projects yet. Create your first one.</p>
        ) : null}
      </div>
    </div>
  );
}
