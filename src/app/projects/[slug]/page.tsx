import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import ProjectShowcase from "@/components/ProjectShowcase";

const MOCK_PROJECTS = {
  "aakkio": {
    title: "Aakkio Academy",
    category: "Full-Stack Development & EdTech",
    description: "An enterprise e-learning platform delivering course tools, progress tracking, checkout flows, and learner dashboards.",
    images: [],
    tech: ["Next.js", "Zustand", "React Query", "Tailwind CSS", "RESTful APIs", "JWT Auth"],
    problem: "Aakkio needed a high-performance, responsive e-learning dashboard and course orchestration platform engineered from zero to production in just 8 weeks to capture critical West African markets, requiring speed optimization for slow mobile connections.",
    solution: "Architected the full platform with Next.js Server-Side Rendering (SSR) across all product lines (Academy, Toolkit, Insight). Optimised asset delivery and pipelines, drastically reducing initial page load times for low-bandwidth connections. Integrated checkout payments directly with instant course enrollment.",
  },
  "terrafirma": {
    title: "Terrafirma Capital",
    category: "React Engineering & FinTech Security",
    description: "A secure investment platform featuring protected routes, real-time financial metrics, and JWT session rotation.",
    images: [],
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT", "Redis"],
    problem: "Terrafirma needed a highly secure investor dashboard with real-time financial charts, dynamic data visualization, and extremely strict role-based access control to protect private transaction records.",
    solution: "Developed the entire React.js frontend from the first line of code. Built custom role-based investor and administrator dashboards. Implemented secure JWT session management with automated token-refresh routines, HTTPS enforcement, and dense validation guards at every endpoint layer.",
  },
  "jurisnova": {
    title: "JurisNova (AI MVP)",
    category: "AI Engineering & LegalTech",
    description: "An AI-powered legal translation tool providing plain-language access to legal rights and obligations.",
    images: [],
    tech: ["Next.js", "TypeScript", "AI APIs", "PostgreSQL", "Tailwind CSS"],
    problem: "Everyday citizens across Nigeria and the world struggle to understand their legal rights and obligations due to dense legal jargon and high professional fees for basic legal inquiries.",
    solution: "Currently engineering the MVP: building a natural language query interface, a serverless AI response translation engine, and a structured legal database designed to instantly strip out complex jargon and serve legal queries in clear, plain language.",
  },
  "lemonwares": {
    title: "Lemonwares SaaS Engine",
    category: "Lead Architecture & DevOps Automation",
    description: "High-performance client web architectures and scalable DevOps platforms automated via CI/CD pipelines.",
    images: [],
    tech: ["Next.js", "Docker", "GitHub Actions", "GraphQL", "AWS EC2/S3"],
    problem: "Lemonwares needed to scale up client web delivery, standardize reusable components, and eliminate manual, error-prone deployment steps across 14 distinct client systems.",
    solution: "Led frontend architecture standards for 14 client projects delivered in 12 months. Enforced reusable UI systems and clean Git conventions. Introduced automated CI/CD pipelines using GitHub Actions, completely eliminating manual deployment steps and reducing release failures to absolute zero.",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = MOCK_PROJECTS[slug as keyof typeof MOCK_PROJECTS];

  if (!project) {
    // If not found in the custom mock list, fallback gracefully to a standard showcase display
    const fallbackTitle = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <BoilerplateProjectDetail title={fallbackTitle} />
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground antialiased font-sans">
      {/* Scroll to Top Override */}
      <script dangerouslySetInnerHTML={{ __html: "window.scrollTo({ top: 0, behavior: 'instant' });" }} />

      {/* Background Accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-0 sm:px-6 pt-2 pb-16 z-10 space-y-8">
        <div>
          <BackButton />
        </div>
        <div className="space-y-4 border-b border-foreground/5 pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Dynamic Mobile Carousel & Desktop Masonry Showcase */}
        <ProjectShowcase
          title={project.title}
          category={project.category}
          description={project.description}
          images={project.images}
          tech={project.tech}
          problem={project.problem}
          solution={project.solution}
        />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-foreground/5 text-center text-xs text-muted z-10">
        <p>&copy; {new Date().getFullYear()} Francis Uzoigwe. All rights reserved.</p>
      </footer>
    </div>
  );
}

function BoilerplateProjectDetail({ title }: { title: string }) {
  const tech = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Docker"];
  const problem = "Here you can outline the constraints, timeline, and client specifications for the project.";
  const solution = "Explain your role in the codebase design, architectural solutions, and development stages.";

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background text-foreground antialiased font-sans">
      {/* Scroll to Top Override */}
      <script dangerouslySetInnerHTML={{ __html: "window.scrollTo({ top: 0, behavior: 'instant' });" }} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-0 sm:px-6 pt-2 pb-16 z-10 space-y-8">
        <div>
          <BackButton />
        </div>
        <div className="space-y-4 border-b border-foreground/5 pb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Case Study</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">{title}</h1>
        </div>

        <ProjectShowcase
          title={title}
          category="Software Architecture"
          description="This is a clean, dynamic case study page boilerplate ready for you to add your specific work description."
          images={[]}
          tech={tech}
          problem={problem}
          solution={solution}
        />
      </main>

      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-foreground/5 text-center text-xs text-muted z-10">
        <p>&copy; {new Date().getFullYear()} Francis Uzoigwe. All rights reserved.</p>
      </footer>
    </div>
  );
}
