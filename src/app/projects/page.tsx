import BackButton from "@/components/BackButton";
import ProjectsGrid from "@/components/ProjectsGrid";
import { prisma } from "@/lib/prisma";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMeta({
  title: "Projects - Web Development Portfolio",
  description: "Explore Francis Uzoigwe's portfolio of web development projects including full-stack applications, React/Next.js websites, database-driven platforms, and custom software solutions built in Lagos, Nigeria.",
  keywords: [
    "web development portfolio",
    "React projects",
    "Next.js applications",
    "full-stack projects Lagos",
    "software portfolio Nigeria",
    "developer work examples",
  ],
});

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { index: "asc" },
  });

  return (
    <div className="py-4 pb-32">
      <BackButton />

      <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-2 uppercase">
            Selected Work
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-serif italic">
            Engineering solutions that look as good as they function.
          </p>
        </div>
      </div>

      <ProjectsGrid initialProjects={projects} />
    </div>
  );
}
