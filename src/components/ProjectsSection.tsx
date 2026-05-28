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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          return (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col justify-between border border-foreground/10 bg-background/40 dark:bg-background/20 backdrop-blur-md rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] hover:border-accent/30 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-500 overflow-hidden min-h-[360px]"
            >
              {/* Glowing Background Accent */}
              <div className="absolute inset-0 bg-linear-to-tr from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Image Layout */}
              <div className="relative overflow-hidden bg-foreground/3 shrink-0 w-full h-40 md:h-48">
                {project.img ? (
                  <>
                    <img
                      src={project.img}
                      alt={project.alt}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-accent/5 to-accent/15 flex flex-col items-center justify-center space-y-2.5">
                    <div className="w-10 h-10 rounded-full bg-foreground/2 border border-foreground/5 flex items-center justify-center text-accent/80 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-black text-muted">
                      No Image Yet
                    </span>
                  </div>
                )}
              </div>

              {/* Text Layout */}
              <div className="p-5 md:p-6 flex flex-col justify-between flex-1 w-full">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded border border-foreground/5 bg-foreground/2 text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* View indicator */}
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform duration-300">
                    View Project <span className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
