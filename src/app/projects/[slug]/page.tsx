import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import ProjectShowcase from "@/components/ProjectShowcase";

const PROJECTS = {
  aakkio: {
    title: "Aakkio Academy",
    description:
      "An enterprise e-learning platform delivering course creation tools, enrollment flows, progress tracking, and learner dashboards — shipped from zero to production in 8 weeks for the West African market.",
    images: [
      "https://github.com/thatmanfrancis/Aakkio/raw/main/screenshots/home.png",
      "https://github.com/thatmanfrancis/Aakkio/raw/main/screenshots/home.png",
    ] as string[],
    tech: [
      "Next.js",
      "Zustand",
      "React Query",
      "Tailwind CSS",
      "RESTful APIs",
      "JWT Auth",
    ],
    problem:
      "Aakkio needed a high-performance, responsive e-learning dashboard and course orchestration platform engineered from zero to production in just 8 weeks to capture critical West African markets, requiring speed optimization for slow mobile connections.",
    solution:
      "Architected the full platform with Next.js SSR across all product lines (Academy, Toolkit, Insight). Optimised asset delivery and pipelines, drastically reducing initial page load times for low-bandwidth connections. Integrated checkout payments directly with instant course enrollment.",
    nextSlug: "terrafirma",
    nextTitle: "Terrafirma Capital",
    url: "https://aakkio.com",
  },
  terrafirma: {
    title: "Terrafirma Capital",
    description:
      "A secure investment platform featuring role-based dashboards, real-time financial metrics, and automated JWT session rotation — built for absolute data integrity under high-volume traffic.",
    images: [] as string[],
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT", "Redis"],
    problem:
      "Terrafirma needed a highly secure investor dashboard with real-time financial charts, dynamic data visualization, and extremely strict role-based access control to protect private transaction records.",
    solution:
      "Developed the entire React.js frontend from first-principles. Built custom role-based investor and administrator dashboards. Implemented secure JWT session management with automated token-refresh routines, HTTPS enforcement, and dense validation guards at every endpoint layer.",
    nextSlug: "hausevo",
    nextTitle: "Hausevo",
    url: "https://terrafirmacapital.co",
  },
  hausevo: {
    title: "Hausevo",
    description:
      "A real estate platform built to connect property seekers with verified landlords, featuring authenticated listings, secure communication, and transparent transaction flows.",
    images: [
      "https://github.com/thatmanfrancis/Hausevo/raw/main/screenshots/detailed.png",
      "https://github.com/thatmanfrancis/Hausevo/raw/main/screenshots/home.png",
      "https://github.com/thatmanfrancis/Hausevo/raw/main/screenshots/blog.png",
      "https://github.com/thatmanfrancis/Hausevo/raw/main/screenshots/contact.png",
      "https://github.com/thatmanfrancis/Hausevo/raw/main/screenshots/auth.png",
    ] as string[],
    tech: [
      "Next.js",
      "Zustand",
      "React Query",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Nginx",
      "PM2",
    ],
    problem:
      "Operations and admin teams at Hausevo faced a massive operational bottleneck. They had to constantly rely on the engineering team to handle daily tasks like managing dispute requests, processing maintenance updates, auditing landlord verifications, and onboarding local artisans.",
    solution:
      "Designed and engineered a custom, role-based admin dashboard empowering operational teams with autonomous modules for Dispute Resolution, Maintenance Tracking, Landlord Verifications, and Artisan Management. Architected the backend using Prisma and PostgreSQL to handle complex transactional relationships, and deployed the stack using Nginx and PM2 on a secure VPS.",
    nextSlug: "evalocal",
    nextTitle: "EVALocal",
    url: "https://hausevo.com.ng",
  },
  evalocal: {
    title: "EVALocal",
    description:
      "A marketplace connecting users with verified suppliers, featuring intelligent data aggregation and analysis to streamline market research and product discovery in the UK.",
    images: [
      "https://github.com/thatmanfrancis/Evalocal/raw/main/screenshots/evalocal.png",
      "https://github.com/thatmanfrancis/Evalocal/raw/main/screenshots/evalocalauth.png",
      "https://github.com/thatmanfrancis/Evalocal/raw/main/screenshots/evalocalbrowse.png",
    ] as string[],
    tech: [
      "Next.js",
      "Docker",
      "GitHub Actions",
      "GraphQL",
      "AWS EC2/S3",
      "Node.js",
      "PostgreSQL",
    ],
    problem:
      "Users and buyers in the UK lacked a centralized, high-performance portal to perform market research and instantly discover verified local suppliers. The existing manual discovery flows were slow, unaggregated, and lacked real-time filtering and supplier data analysis.",
    solution:
      "Built EVALocal, a supplier discovery marketplace featuring intelligent data aggregation and fast faceted search. Orchestrated a scalable web layer on Next.js communicating via a GraphQL API, backed by automated containerization with Docker and standard CI/CD deployment pipelines on AWS.",
    nextSlug: "aakkio",
    nextTitle: "Aakkio Academy",
    url: "https://evalocal.com",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS[slug as keyof typeof PROJECTS];

  if (!project) notFound();

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-4 pb-20 z-10 space-y-8">
        <BackButton />

        {/* Slim hero — just title + desc + link */}
        <div className="space-y-4 pb-6 border-b border-foreground/5">
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            {project.url && (
              <div className="pt-1">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
                >
                  <span>Visit Live Project</span>
                  <span className="text-[10px] select-none">↗</span>
                </a>
              </div>
            )}
          </div>
          <p className="text-base text-muted leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Showcase — images first, then case study */}
        <ProjectShowcase
          title={project.title}
          images={project.images}
          tech={project.tech}
          problem={project.problem}
          solution={project.solution}
        />

        {/* Next Project */}
        <div className="pt-6 border-t border-foreground/5">
          <Link
            href={`/projects/${project.nextSlug}`}
            className="group flex items-center justify-between w-full p-6 rounded-2xl border border-foreground/8 hover:border-accent/25 hover:bg-foreground/2 transition-all duration-300"
          >
            <div className="space-y-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted">
                Next Project
              </span>
              <span className="block text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                {project.nextTitle}
              </span>
            </div>
            <span className="text-2xl text-muted group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-300">
              →
            </span>
          </Link>
        </div>
      </main>

      <footer className="w-full max-w-5xl mx-auto px-5 sm:px-8 py-8 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Francis K. Uzoigwe. All rights
          reserved.
        </p>
        <a
          href="https://github.com/thatmanfrancis"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-extrabold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          Designed by thatmanfrancis ↗
        </a>
      </footer>
    </div>
  );
}
