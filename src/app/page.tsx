import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import { generatePersonSchema, generateWebsiteSchema } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = generateMeta({
  title: "Home - Software Engineer & Full-Stack Developer",
  description: "Francis Uzoigwe is a software engineer in Lagos, Nigeria, building thoughtful digital products with React, Next.js, TypeScript, and modern web technologies. Available for freelance projects and full-time opportunities.",
  keywords: [
    "portfolio",
    "software engineer portfolio",
    "web developer portfolio Lagos",
    "hire developer Lagos",
    "freelance developer Nigeria",
  ],
});

export default async function Home() {
  const [profile, featuredProjects] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({
      where: { featured: true },
      take: 3,
      orderBy: { index: "asc" },
    }),
  ]);

  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="py-12 pb-32 space-y-24">
      <section className="min-h-[65vh] flex flex-col items-center justify-center text-center space-y-10 max-w-4xl mx-auto">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-900">
            Software Engineer
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.95]">
            Hi, I&apos;m Francis
          </h1>
        </div>

        <div className="space-y-6">
          <p className="text-xl sm:text-3xl font-extrabold text-zinc-600 leading-tight tracking-tight max-w-3xl mx-auto">
            {profile?.bio ||
              "Software Engineer building thoughtful digital products."}
          </p>

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">
              Location
            </p>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-900">
              {profile?.location || "Lagos, Nigeria"}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 transition-colors duration-300 hover:border-zinc-900"
          >
            Get in Touch
          </Link>
          <Link
            href="https://drive.google.com/file/d/1Tnxlj0QdBEy20VhKrDb0cjbsi27bHctH/view?usp=sharing"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-zinc-900 transition-colors duration-300 hover:border-zinc-900"
          >
            View CV
          </Link>
        </div>
      </section>

      <section className="space-y-10 max-w-5xl mx-auto">
        <div className="text-center space-y-3 border-b border-zinc-200 pb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-900">
            Featured Work
          </h2>
          <Link
            href="/projects"
            className="inline-block text-xs font-black uppercase tracking-[0.18em] text-zinc-900 transition-colors hover:text-zinc-600"
          >
            All Projects
          </Link>
        </div>

        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block border-b border-zinc-100 py-8 text-center transition-colors hover:border-zinc-900"
            >
              <div className="space-y-3">
                <div className="text-sm font-black text-zinc-300 group-hover:text-zinc-900 transition-colors">
                  {project.index}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-900">
                  {project.category}
                </p>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-zinc-900">
                  {project.title}
                </h3>
                <p className="max-w-2xl mx-auto text-zinc-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-4 border-t border-zinc-200 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-900">
              Availability
            </p>
            <p className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-zinc-900">
              Open for new opportunities
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
