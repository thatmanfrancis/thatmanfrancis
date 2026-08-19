import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaImage } from "@/components/ui/media-image";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { TechMark } from "@/components/ui/tech-mark";
import { ApiResponsePanel } from "@/components/work/api-response-panel";
import { coverSrc } from "@/lib/placeholders";
import { kindLabel } from "@/lib/project";
import { prisma } from "@/lib/prisma";
import {
  breadcrumbJsonLd,
  publicPageMetadata,
  projectJsonLd,
  getSiteOrigin,
} from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { JsonLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await prisma.project.findFirst({
      where: { slug, published: true },
    });
    if (!project) return { title: "Project" };
    return publicPageMetadata({
      title: project.title,
      description: project.summary,
      path: `/work/${project.slug}`,
      image: project.coverUrl,
    });
  } catch {
    return { title: "Project" };
  }
}

function CaseBlock({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div>
      <p className="section-label mb-2 text-sm">{label}</p>
      <p className="whitespace-pre-wrap body-text text-ink">{children}</p>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = await prisma.project.findFirst({
      where: { slug, published: true },
    });
  } catch {
    notFound();
  }

  if (!project) notFound();

  const settings = await getSettings();
  const origin = getSiteOrigin();
  const meta = [kindLabel(project.kind), project.role, project.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="py-14 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ],
          origin,
        )}
      />
      <JsonLd
        data={projectJsonLd({
          title: project.title,
          summary: project.summary,
          slug: project.slug,
          coverUrl: project.coverUrl,
          dateModified: project.updatedAt,
          origin,
        })}
      />
      <div className="container-page max-w-3xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
        >
          <ArrowLeftIcon className="size-4" />
          Back to work
        </Link>

        {meta ? <p className="section-label mt-6">{meta}</p> : null}
        <h1 className="heading mt-3">{project.title}</h1>
        <p className="lede mt-4">{project.summary}</p>

        {project.stack.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="tech-pill tech-pill-compact">
                <TechMark name={item} className="size-4" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <figure className="mt-10 overflow-hidden rounded-3xl border border-border bg-ink">
          <MediaImage
            src={coverSrc(project.coverUrl, project.slug)}
            alt={project.title}
            slot="cover-detail"
            className="h-auto max-h-[34rem] w-full object-cover"
          />
        </figure>

        <div className="mt-10 space-y-8">
          {project.problem ? (
            <CaseBlock label="Problem">{project.problem}</CaseBlock>
          ) : (
            <CaseBlock label="Problem">
              Replace this with the problem the project was solving. You can
              edit it from Admin → Projects.
            </CaseBlock>
          )}
          {project.outcome ? (
            <CaseBlock label="Outcome">{project.outcome}</CaseBlock>
          ) : (
            <CaseBlock label="Outcome">
              Replace this with what shipped and what changed. You can edit it
              from Admin → Projects.
            </CaseBlock>
          )}
          <CaseBlock label="What I built">{project.description}</CaseBlock>
        </div>

        {project.apiSample ? (
          <div className="mt-10">
            <ApiResponsePanel
              endpoint={project.endpoint}
              sample={project.apiSample}
            />
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4">
          {project.projectUrl ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Visit project
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              View repo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
