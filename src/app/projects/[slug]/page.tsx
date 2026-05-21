import BackButton from "@/components/BackButton";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import { generateProjectSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import type { Metadata } from "next";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) {
    return generateMeta();
  }

  return generateMeta({
    title: `${project.title} - ${project.category} Project`,
    description: project.description,
    url: `https://thatmanfrancis.vercel.app/projects/${project.slug}`,
    image: project.image || undefined,
    keywords: [
      project.category.toLowerCase(),
      ...project.tech.map((t) => t.toLowerCase()),
      "project case study",
      "portfolio project",
    ],
  });
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

function processContent(content: string) {
  // Pure processing for a single-column layout
  return content.split('\n').map((line) => {
    if (line.startsWith('#')) {
      const text = line.replace(/^#+\s*/, '');
      return `
        <div class="mt-8 mb-3 border-b border-zinc-100 dark:border-zinc-850 pb-2">
          <h4 class="text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-50 font-sans">${text}</h4>
        </div>
      `;
    }
    
    if (line.trim() === '') return '';
    
    if (line.startsWith('-') || line.startsWith('*')) {
      const text = line.replace(/^[-*]\s*/, '');
      return `
        <div class="flex gap-4 mb-4 items-start pl-1 font-sans">
          <div class="mt-2.5 h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100 rounded-full shrink-0"></div>
          <p class="text-zinc-650 dark:text-zinc-350 text-base font-semibold leading-relaxed">${text}</p>
        </div>
      `;
    }

    return `<p class="text-zinc-650 dark:text-zinc-350 text-base font-semibold leading-relaxed mb-3 font-sans">${line}</p>`;
  }).join('');
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  
  if (!slug) {
    notFound();
  }

  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (!project) {
    notFound();
  }

  const processedHtml = processContent(project.content);
  const projectSchema = generateProjectSchema(project);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://thatmanfrancis.vercel.app" },
    { name: "Projects", url: "https://thatmanfrancis.vercel.app/projects" },
    { name: project.title, url: `https://thatmanfrancis.vercel.app/projects/${project.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl py-4 pb-32">
      <BackButton />

      {/* Main Asymmetric Layout Grid matching About/Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        
        {/* Left Column (Scrollable details and rich content) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-zinc-900 uppercase tracking-tighter leading-[0.85] mb-2">
              {project.title}
            </h1>
          </div>

          {/* Project Briefing Section */}
          <div className="py-5 border-y border-zinc-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 mb-3">Project Briefing</h4>
            <p className="text-xl md:text-3xl font-black text-zinc-900 leading-tight tracking-tight italic font-serif">
              &quot;{project.description}&quot;
            </p>
          </div>

          {/* Screenshot Attachments */}
          {project.image && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-500 px-1">
                <span>IMAGE_FEED // SYSTEM_ATTACHMENT</span>
                <span>ASPECT: 16_9</span>
              </div>
              <div className="border border-zinc-150 dark:border-zinc-850 rounded-2xl overflow-hidden aspect-video relative bg-zinc-50 dark:bg-zinc-900/40">
                <Image
                  src={project.image}
                  alt={`${project.title} Interface Preview`}
                  width={1280}
                  height={720}
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                  priority
                />
              </div>
            </div>
          )}

          {/* Full Documentation Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900">Case Study & Documentation</h4>
            <div 
              className="max-w-none prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: processedHtml }} 
            />
          </div>
        </div>

        {/* Right Column (Sticky Technical Metadata card matching About's Technical Arsenal) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 self-start border border-zinc-200 bg-zinc-50/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 mb-1">
              Project Archive
            </h3>
            <p className="text-xs text-zinc-500 font-medium">
              Core properties, category, and interface links.
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-6 pt-4 border-t border-zinc-200">
            {/* ID */}
            <div>
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-1">
                Project ID
              </span>
              <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                ID_{project.index}
              </span>
            </div>

            {/* Category */}
            <div>
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-1">
                Category
              </span>
              <span className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                {project.category}
              </span>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-900 mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono tracking-wide text-zinc-500 dark:text-zinc-400"
                  >
                    #{t.replace(/\s+/g, "").toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Action link */}
            {project.link && (
              <div className="pt-4 border-t border-zinc-200">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group inline-flex items-center justify-center gap-2.5 rounded-full bg-zinc-950 text-white px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer text-center"
                >
                  Visit Interface
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Platform Footer */}
      <footer className="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-850 flex flex-col items-center gap-4 opacity-45">
        <div className="text-[9px] font-black uppercase tracking-[0.8em] text-zinc-900 dark:text-zinc-100">SYSTEM_RECORD_CLOSED</div>
        <div className="flex gap-4">
          <div className="h-2 w-2 bg-zinc-900 dark:bg-zinc-150 rounded-full"></div>
          <div className="h-2 w-2 bg-zinc-900 dark:bg-zinc-150 rounded-full"></div>
          <div className="h-2 w-2 bg-zinc-900 dark:bg-zinc-150 rounded-full"></div>
        </div>
      </footer>
    </div>
    </>
  );
}
