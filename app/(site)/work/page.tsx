import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ExperienceTimeline } from "@/components/work/experience-timeline";
import { ProjectRow } from "@/components/work/project-row";
import { asExperienceEntries, defaultExperience } from "@/lib/copy-blocks";
import { prisma } from "@/lib/prisma";
import { breadcrumbJsonLd, getSiteOrigin, publicPageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = publicPageMetadata({
  title: "Work",
  description:
    "Selected full-stack projects and engineering case studies by Francis Uzoigwe (thatmanfrancis), covering Next.js, TypeScript, backend systems, and product delivery.",
  path: "/work",
});

async function getProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);
  const experience = asExperienceEntries(settings.experience, defaultExperience);
  const origin = getSiteOrigin();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ],
          origin,
        )}
      />
      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <div className="container-page">
          <p className="section-label mb-3">Work</p>
          <h1 className="heading max-w-3xl">
            Path, projects, and what shipped.
          </h1>
          <p className="lede mt-4 max-w-2xl">
            A clear career track, then the builds behind it.
          </p>
        </div>
      </section>

      <section className="bg-ink py-14 text-white sm:py-16">
        <div className="container-page">
          <ExperienceTimeline
            title={settings.experienceTitle}
            lede={settings.experienceLede}
            entries={experience}
            tone="ink"
          />
        </div>
      </section>

      <section className="bg-muted py-14 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-3">Projects</p>
              <h2 className="heading">Selected work</h2>
              <p className="lede mt-4 max-w-xl">
                Case studies and builds — problem, stack, and what changed.
              </p>
            </div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-ink-muted">
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <div>
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                title={project.title}
                slug={project.slug}
                summary={project.summary}
                stack={project.stack}
                coverUrl={project.coverUrl}
                role={project.role}
                year={project.year}
                kind={project.kind}
                reverse={index % 2 === 1}
              />
            ))}
          </div>

          {projects.length === 0 ? (
            <p className="mt-8 body-text">No published projects yet.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
