export interface Project {
  slug: string;
  num: string;
  tag: string;
  title: string;
  desc: string;
  tech: string[];
  img: string;
  alt: string;
}

export const projects: Project[] = [
  {
    slug: "aakkio",
    num: "01",
    tag: "Full-Stack · EdTech",
    title: "Aakkio Academy",
    desc: "An enterprise e-learning platform built from zero to production in 8 weeks, delivering course creation tools, enrollment flows, and optimized performance for West African networks.",
    tech: ["Next.js", "Zustand", "React Query", "Tailwind CSS"],
    img: "",
    alt: "Aakkio Academy e-learning interface",
  },
  {
    slug: "terrafirma",
    num: "02",
    tag: "FinTech · Security",
    title: "Terrafirma Capital",
    desc: "A secure investment platform featuring role-based investor and admin dashboards with real-time financial tracking, protected routes, and automated JWT token rotation.",
    tech: ["React.js", "Node.js", "PostgreSQL", "JWT", "Redis"],
    img: "",
    alt: "Terrafirma Capital investment visualizer",
  },
  {
    slug: "jurisnova",
    num: "03",
    tag: "AI · LawTech (MVP)",
    title: "JurisNova",
    desc: "An AI-powered legal translation tool helping citizens understand their legal rights in plain language, built with a natural language engine and structured legal knowledge base.",
    tech: ["Next.js", "TypeScript", "AI APIs", "PostgreSQL"],
    img: "",
    alt: "JurisNova AI legal query interface",
  },
  {
    slug: "lemonwares",
    num: "04",
    tag: "Lead Dev · SaaS",
    title: "Lemonwares SaaS Engine",
    desc: "High-performance client web architectures and scalable DevOps platforms automated via CI/CD pipelines, integrating payment gateways, OAuth, and GraphQL.",
    tech: ["Next.js", "Docker", "GitHub Actions", "GraphQL", "AWS"],
    img: "",
    alt: "Lemonwares SaaS release dashboard",
  },
];
