import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "@/content/portfolio";
import { CaseStudyDetails } from "../../case-study-details";
import { ProjectLinks } from "../../project-links";
import { TransferDemo } from "../../transfer-demo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

async function loadProject(params: Props["params"]) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await loadProject(params);
  const title = `${project.caseStudyTitle} | ${profile.name}`;
  const url = `/work/${project.slug}/`;
  const image = project.screenshot
    ? { url: project.screenshot.src, width: project.screenshot.width, height: project.screenshot.height, alt: `${project.name} public homepage` }
    : { url: "/brand/social-card.png", width: 1200, height: 630, alt: `Portfolio of ${profile.name}` };

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, siteName: profile.name, title, description: project.summary, images: [image] },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const project = await loadProject(params);

  return (
    <main className="case-study-page shell">
      <Link className="case-study-link" href="/#work">Back to selected work</Link>
      <header className="case-study-header">
        <p>{project.category}</p>
        <h1>{project.caseStudyTitle}</h1>
        <p>{project.summary}</p>
        <ProjectLinks {...project} />
      </header>
      <div className="case-study-layout">
        <article aria-label="Case study details">
          <CaseStudyDetails project={project} />
        </article>
        {project.screenshot && (
          <figure className="story-screenshot story-visual">
            <Image {...project.screenshot} alt={`${project.name} public homepage`} unoptimized />
            <figcaption>Public homepage</figcaption>
          </figure>
        )}
        {project.slug === "ouropay" && <div className="story-visual"><TransferDemo /></div>}
      </div>
      <Link className="case-study-link" href="/#contact">Contact {profile.name}</Link>
    </main>
  );
}
