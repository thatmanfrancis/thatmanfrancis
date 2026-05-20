import BackButton from "@/components/BackButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SkillsAccordion from "@/components/SkillsAccordion";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMeta({
  title: "About - Professional Background & Skills",
  description: "Learn about Francis Uzoigwe, a software engineer in Lagos, Nigeria with expertise in React, Next.js, TypeScript, Node.js, PostgreSQL, and full-stack web development. View technical skills, experience, and professional background.",
  keywords: [
    "about Francis Uzoigwe",
    "software engineer background",
    "developer skills Lagos",
    "technical expertise Nigeria",
    "professional experience",
  ],
});

export default async function AboutPage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "cl_profile" },
  });

  const socials = await prisma.socialLink.findMany({
    orderBy: { order: "asc" },
  });

  if (!profile) return null;

  const coreSkills = [
    {
      category: "Frontend Architecture",
      skills: [
        "React & Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Semantic HTML5",
        "Responsive Web Design",
      ],
    },
    {
      category: "Backend & Systems",
      skills: [
        "Node.js & Express",
        "PostgreSQL & Prisma",
        "RESTful & GraphQL APIs",
        "Redis Caching",
        "Serverless Architecture",
      ],
    },
    {
      category: "Methodology & Tooling",
      skills: [
        "Git & Version Control",
        "CI/CD Pipelines",
        "Performance Optimization",
        "Accessibility (WCAG)",
        "SEO Architecture",
      ],
    },
  ];

  return (
    <div className="max-w-6xl py-4 pb-32">
      <BackButton />

      {/* Main Asymmetric Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        {/* Left Column (Scrollable content) */}
        <div className="lg:col-span-8 space-y-16">
          {/* Header Section */}
          <div>
            <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-900 mb-2 uppercase">
              Profile
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed font-serif italic">
              Software Engineer specializing in building premium digital
              experiences.
            </p>
          </div>

          {/* Horizontal Quick Details Board */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-8 border-y border-zinc-200">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Location
              </span>
              <span className="text-base font-extrabold text-zinc-900 uppercase tracking-tight">
                {profile.location}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Role
              </span>
              <span className="text-base font-extrabold text-zinc-900 uppercase tracking-tight">
                Software Engineer
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Inquiries
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-base font-extrabold text-zinc-900 uppercase tracking-tight hover:text-zinc-500 transition-colors duration-250 block truncate"
              >
                {profile.email}
              </a>
            </div>
          </div>

          {/* Biography Section */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Biography
            </h3>
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-extrabold text-zinc-800 leading-snug tracking-tight">
                {profile.bio}
              </p>
              <p className="text-lg text-zinc-500 leading-relaxed font-sans">
                I believe that software should not only execute correctly but
                also communicate clearly. My development process is centered
                around refining the micro-details of accessibility, interaction
                design, and system performance to create a fluid digital
                environment.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column (Sticky Technical Arsenal card) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 self-start border border-gray-200 rounded-lg p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-1">
              Technical Arsenal
            </h3>
            <p className="text-xs text-zinc-500 font-medium">
              Core skills, architectures, and design workflows.
            </p>
          </div>
          <SkillsAccordion coreSkills={coreSkills} />
        </div>

        {/* Footer / Connect Row */}
        <div className="lg:col-span-8 border-t border-zinc-200 pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="space-y-2.5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Let&apos;s Build Together
            </h3>
            <p className="text-lg font-bold text-zinc-800">
              Interested in starting a new project or talking tech?
            </p>

            {/* Horizontal social links */}
            <div className="flex flex-wrap gap-5 pt-2">
              {socials.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors duration-250"
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-zinc-950 text-white px-8 py-4.5 text-xs font-bold hover:bg-zinc-800 transition-all duration-300 shadow-sm shrink-0"
          >
            Get In Touch
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
