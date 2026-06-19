"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="space-y-8 scroll-mt-24">
      <div className="space-y-2 border-b border-foreground/5 pb-4">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
          Selected Work
        </span>
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col h-full rounded-2xl border border-foreground/8 bg-foreground/1.5 hover:border-accent/30 hover:bg-foreground/3 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex flex-col flex-1 p-6 gap-5">
                {/* Header row: number + title + thumbnail */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Index number */}
                    <span className="text-[10px] font-black tracking-widest text-accent/50 mt-1 shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted mt-1.5 leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  {project.img ? (
                    <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-foreground/8 bg-foreground/5 flex items-center justify-center">
                      <img
                        src={project.img}
                        alt={project.alt}
                        className="w-full h-full p-1.5 object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="shrink-0 w-16 h-16 rounded-xl border border-foreground/8 bg-foreground/3 flex items-center justify-center text-accent/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-foreground/5" />

                {/* Footer row: tech + CTA */}
                <div className="flex items-center justify-between gap-4">
                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-foreground/8 bg-foreground/2 text-muted font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-foreground/8 bg-foreground/2 text-muted font-medium">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTA arrow */}
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                    View <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
