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
    slug: "hausevo",
    num: "01",
    tag: "Full-Stack · PropTech",
    title: "Hausevo",
    desc: "A real estate platform built to connect property seekers with verified landlords, featuring authenticated listings, secure communication, and transparent transaction flows.",
    tech: ["Next.js", "Zustand", "React Query", "Tailwind CSS"],
    img: "https://hausevo.com.ng/_next/image?url=%2Fhausevofinal.png&w=64&q=75",
    alt: "Hausevo real estate platform interface",
  },
  {
    slug: "aakkio",
    num: "02",
    tag: "Full-Stack · EdTech",
    title: "Aakkio Academy",
    desc: "An enterprise e-learning platform built from zero to production in 8 weeks, delivering course creation tools, enrollment flows, and optimized performance for West African networks.",
    tech: ["Next.js", "Zustand", "React Query", "Tailwind CSS"],
    img: "https://aakkio.com/wp-content/uploads/2025/11/Aakkio-Logo-1.png",
    alt: "Aakkio Academy e-learning interface",
  },
  {
    slug: "terrafirma",
    num: "03",
    tag: "FinTech · Security",
    title: "Terrafirma Capital",
    desc: "A secure investment platform featuring role-based investor and admin dashboards with real-time financial tracking, protected routes, and automated JWT token rotation.",
    tech: ["React.js", "Node.js", "PostgreSQL", "JWT", "Redis"],
    img: "https://terrafirmacapital.co/_next/image?url=%2Flogo%2FTF%2004.png&w=1920&q=75",
    alt: "Terrafirma Capital investment visualizer",
  },

  {
    slug: "evalocal",
    num: "04",
    tag: "Marketplace · SaaS",
    title: "Evalocal",
    desc: "A marketplace connecting users with verified suppliers, featuring intelligent data aggregation and analysis to streamline market research and product discovery in the UK.",
    tech: ["Next.js", "Docker", "GitHub Actions", "GraphQL", "AWS"],
    img: "https://evalocal.com/_next/image?url=%2Fimages%2Fbrand%2Feva-logo-light.png&w=128&q=75",
    alt: "Evalocal release dashboard",
  },
  // {
  //   slug: "jurisnova",
  //   num: "05",
  //   tag: "AI · LawTech (MVP)",
  //   title: "JurisNova",
  //   desc: "An AI-powered legal translation tool helping citizens understand their legal rights in plain language, built with a natural language engine and structured legal knowledge base.",
  //   tech: ["Next.js", "TypeScript", "AI APIs", "PostgreSQL"],
  //   img: "",
  //   alt: "JurisNova AI legal query interface",
  // },
];
