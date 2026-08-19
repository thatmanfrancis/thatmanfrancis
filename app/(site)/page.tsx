import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/home/about-section";
import { ContactBand } from "@/components/home/contact-band";
import { FaqSection } from "@/components/home/faq-section";
import { Hero } from "@/components/home/hero";
import { SkillsSection } from "@/components/home/skills-section";
import { ProjectRow } from "@/components/work/project-row";
import { PostRow } from "@/components/blog/post-row";
import { prisma } from "@/lib/prisma";
import {
  asCopyBlocks,
  defaultDisciplines,
  defaultFaqs,
  defaultProcessSteps,
} from "@/lib/copy-blocks";
import { publicPageMetadata } from "@/lib/seo";
import { getSettings, socialLinks } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    ...publicPageMetadata({
      title: settings.heroTitle ?? settings.siteName,
      description:
        settings.metaDescription ??
        settings.heroLede ??
        "Francis Kossyrisochukwu Uzoigwe (thatmanfrancis) is a full-stack engineer building web products with Next.js, TypeScript, React, and scalable backend systems.",
      path: "/",
    }),
    title: { absolute: settings.siteName },
  };
}

async function getHomeData() {
  try {
    const [projects, posts] = await Promise.all([
      prisma.project.findMany({
        where: { published: true },
        orderBy: [
          { featured: "desc" },
          { sortOrder: "asc" },
          { createdAt: "desc" },
        ],
        take: 4,
      }),
      prisma.post.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
    ]);
    return { projects, posts };
  } catch {
    return { projects: [], posts: [] };
  }
}

export default async function HomePage() {
  const [settings, { projects, posts }] = await Promise.all([
    getSettings(),
    getHomeData(),
  ]);
  const socials = socialLinks(settings);
  const processSteps = asCopyBlocks(settings.processSteps, defaultProcessSteps);
  const disciplines = asCopyBlocks(settings.disciplines, defaultDisciplines);
  const faqs = asCopyBlocks(settings.faq, defaultFaqs);

  return (
    <>
      <Hero
        eyebrow={settings.heroEyebrow ?? undefined}
        title={settings.heroTitle ?? "Francis — full-stack engineer."}
        lede={settings.heroLede ?? undefined}
        role={settings.heroRole}
        skills={settings.skills ?? []}
        ctaHref="#about"
        ctaLabel={settings.heroCtaLabel ?? "About me"}
        githubUrl={settings.socialGithub}
      />

      <section id="about" className="bg-muted py-16 sm:py-20" data-reveal>
        <div className="container-page">
          <AboutSection
            title={settings.aboutTitle ?? "The story"}
            body={
              settings.aboutBody ??
              "I design and ship web products end to end — from clear interfaces to solid backends."
            }
            imageUrl={settings.aboutImageUrl}
            availability={settings.availability}
            resumeUrl={settings.resumeUrl}
            disciplines={disciplines}
            compact
          />
        </div>
      </section>

      <SkillsSection
        skills={settings.skills ?? []}
        stackTitle={settings.stackTitle}
        processTitle={settings.processTitle}
        processCta={settings.processCta}
        processSteps={processSteps}
      />

      <section id="work" className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-3">Work</p>
              <h2 className="heading">Selected projects</h2>
            </div>
            <Link
              href="/work"
              className="text-base font-semibold text-ink underline-offset-4 hover:underline"
            >
              View all work
            </Link>
          </div>
          {projects.length > 0 ? (
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
          ) : (
            <p className="lede">
              Projects will appear here once published from the admin.
            </p>
          )}
        </div>
      </section>

      <section id="blog" className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-3">Blog</p>
              <h2 className="heading">Recent posts</h2>
            </div>
            <Link
              href="/blog"
              className="text-base font-semibold text-ink underline-offset-4 hover:underline"
            >
              Visit blog
            </Link>
          </div>
          {posts.length > 0 ? (
            <div>
              {posts.map((post, index) => (
                <PostRow
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  coverUrl={post.coverUrl}
                  publishedAt={post.publishedAt}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          ) : (
            <p className="lede">
              Posts will appear here once published from the admin.
            </p>
          )}
        </div>
      </section>

      <FaqSection
        title={settings.faqTitle}
        lede={settings.faqLede}
        items={faqs}
      />

      <ContactBand
        title={settings.contactTitle ?? "Let's work together"}
        lede={
          settings.contactLede ??
          "Open to collaborations, product builds, and interesting problems."
        }
        email={settings.contactEmail}
        phone={settings.contactPhone}
        location={settings.contactLocation}
        availability={settings.availability}
        socials={socials}
      />
    </>
  );
}
