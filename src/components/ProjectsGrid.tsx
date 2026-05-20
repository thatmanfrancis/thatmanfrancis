"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  content: string;
  tech: string[];
  link?: string | null;
  image?: string | null;
  color: string;
  featured: boolean;
}

interface ProjectsGridProps {
  initialProjects: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Filter projects based on query and selected category
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "ALL" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialProjects, searchQuery, selectedCategory]);

  // Split projects into 2 columns for a clean masonry grid
  const [colLeft, colRight] = useMemo(() => {
    const left: Project[] = [];
    const right: Project[] = [];
    filteredProjects.forEach((proj, idx) => {
      if (idx % 2 === 0) {
        left.push(proj);
      } else {
        right.push(proj);
      }
    });
    return [left, right];
  }, [filteredProjects]);

  return (
    <div className="space-y-12">
      {/* Grid Results Counter */}
      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
        Showing {filteredProjects.length} of {initialProjects.length} projects
      </div>

      {/* Masonry Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Column 1 (Left) */}
          <div className="flex flex-col gap-8">
            {colLeft.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Column 2 (Right) - Offset slightly vertically on desktop for classic masonry stagger */}
          <div className="flex flex-col gap-8 md:translate-y-10">
            {colRight.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <p className="text-zinc-500 font-serif italic">
            No projects match your current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="mt-4 text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400 hover:decoration-zinc-900 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-zinc-150 dark:border-zinc-850 hover:border-zinc-400 dark:hover:border-zinc-600 rounded-2xl p-6 sm:p-8 bg-zinc-50/30 dark:bg-zinc-900/10 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background decoration (extremely subtle) */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none group-hover:opacity-[0.03] transition-opacity duration-300" />

      <div className="flex flex-col justify-between h-full space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-bold text-zinc-400 dark:text-zinc-500">
            {project.index}
          </span>
          {/* <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 dark:border-zinc-800 dark:text-zinc-500 rounded-full px-3 py-1">
            {project.category}
          </span> */}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech and Link Footer */}
        <div className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-850">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action indicator */}
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform duration-300">
            <span>Explore Case Study</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
