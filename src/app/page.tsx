import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground antialiased font-sans transition-colors duration-300">
      {/* Background visual accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-6 py-4 pb-16 space-y-28">
        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col items-center text-center pt-8 pb-4 scroll-mt-24 space-y-8"
        >
          {/* Headline */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
              Full-Stack Engineer
              <span className="text-foreground/20">.</span>
              <br />
              <span className="text-accent">DevOps Architect</span>
              <span className="text-accent/40">.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted leading-relaxed mx-auto max-w-xl">
              Designing pixel-perfect interfaces and shipping bulletproof
              backend systems—orchestrated with zero-downtime infrastructure
              built for production scale.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-foreground/10 px-6 py-3 text-sm font-semibold hover:bg-foreground/5 transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-foreground/10 px-6 py-3 text-sm font-semibold hover:bg-foreground/5 transition-all duration-300"
            >
              Read Blog
            </a>
            <a
              href="https://docs.google.com/document/d/198Tm_YQwJP4WTPDCcAyt4DHmw8SeNDWs3H-Thlcq2EY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-foreground/10 px-6 py-3 text-sm font-semibold hover:bg-foreground/5 transition-all duration-300"
            >
              View CV
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/thatmanfrancis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg border border-foreground/10 text-muted hover:text-foreground hover:border-foreground/25 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/francisuzoigwe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg border border-foreground/10 text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/2347047474886?text=Hello%20Francis,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2.5 rounded-lg border border-foreground/10 text-muted hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-4 border-t border-foreground/5 w-full max-w-lg">
            <div>
              <span className="block text-2xl font-bold text-foreground">
                5+
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted">
                Years Experience
              </span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">
                20+
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted">
                Projects Shipped
              </span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-foreground">
                99.9%
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted">
                Uptime
              </span>
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Next.js",
              "TypeScript",
              "Node.js",
              "PostgreSQL",
              "Docker",
              "AWS",
              "Redis",
              "Nginx",
            ].map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-3 py-1 rounded-full border border-foreground/8 bg-foreground/3 text-muted font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <ProjectsSection />

        {/* About Section */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="space-y-2 border-b border-foreground/5 pb-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
              About Me
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Who I Am</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Confident Bio Text */}
            <div className="md:col-span-2 space-y-5">
              <h3 className="text-2xl font-bold text-accent tracking-tight leading-snug">
                I don&apos;t build software to just &quot;work.&quot; <br />
                <span className="text-foreground">
                  I architect systems that survive load and scale.
                </span>
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                As an elite <strong>Full-Stack & DevOps Engineer</strong> with{" "}
                <strong>
                  5+ years of battle-hardened production experience
                </strong>
                , I bridge the critical divide between fluid, high-performance
                user interfaces and secure, bulletproof server infrastructure. I
                sit at the intersection of application logic and systems
                engineering, ensuring that code doesn&apos;t just run—it
                executes at peak performance and scales seamlessly.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Whether it is building modern frontend dashboards in{" "}
                <strong>React and Next.js</strong>, orchestrating isolated
                microservices under <strong>Docker & AWS</strong>, optimizing
                dense PostgreSQL queries, or establishing absolute zero-downtime
                automated <strong>CI/CD deployment pipelines</strong>—I engineer
                to withstand heavy traffic and combat high concurrency. I code
                with a production-first mindset, preparing systems for survival
                from day one.
              </p>
            </div>

            {/* Sharp Technical Specs Highlights */}
            <div className="md:col-span-1 p-5 rounded-lg border border-foreground/5 bg-foreground/1 dark:bg-foreground/2 hover:border-accent/20 transition-all duration-300 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-foreground border-b border-foreground/5 pb-2 uppercase tracking-wider">
                Core Stack & Specs
              </h3>
              <div className="space-y-3.5">
                <div>
                  <span className="block text-accent font-semibold mb-1">
                    Full-Stack Orchestration
                  </span>
                  <p className="text-muted leading-relaxed">
                    Next.js, React, TypeScript, Node.js, Express, Tailwind CSS
                  </p>
                </div>
                <div>
                  <span className="block text-accent font-semibold mb-1">
                    DevOps & Cloud Infrastructure
                  </span>
                  <p className="text-muted leading-relaxed">
                    Docker, AWS (EC2/ECS/S3), CI/CD (GitHub Actions), Nginx,
                    Linux (Ubuntu/Debian)
                  </p>
                </div>
                <div>
                  <span className="block text-accent font-semibold mb-1">
                    Database & Security
                  </span>
                  <p className="text-muted leading-relaxed">
                    PostgreSQL, Redis Caching, Prisma ORM, Transaction Locking &
                    Isolation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Fully Distinct Visual Card Layout */}
        <section
          id="experience"
          className="space-y-8 scroll-mt-24 p-8 rounded-lg border border-foreground/5 bg-foreground/1.5 dark:bg-foreground/1 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/2 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 border-b border-foreground/5 pb-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
              Work History
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              Professional Experience
            </h2>
          </div>

          <div className="max-w-3xl pl-2">
            <div className="relative pl-6 pb-2 border-l border-dashed border-accent/20 space-y-12">
              {/* Timeline item 1 */}
              <div className="relative space-y-3">
                {/* Glowing Node Circle */}
                <div className="absolute left-[-30px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent border-4 border-background ring-4 ring-accent/15 animate-pulse" />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base text-foreground">
                    Lead Full-Stack & DevOps Engineer
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                    2024 — Present
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Creative Digital Agency</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    Lagos, Nigeria &bull; Hybrid
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Designed and deployed secure, cloud-native web architectures
                    utilizing containerized microservices under automated CI/CD
                    pipelines.
                  </li>
                  <li>
                    Optimized project build compilation configurations, reducing
                    production bundle build times by 48%.
                  </li>
                  <li>
                    Orchestrated robust full-stack software components and
                    secure JWT authentication filters to withstand high
                    concurrency user traffic.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    "Next.js",
                    "Docker",
                    "AWS",
                    "CI/CD",
                    "TypeScript",
                    "Nginx",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded border border-foreground/5 bg-foreground/2 text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="relative space-y-3">
                {/* Secondary Node Circle */}
                <div className="absolute left-[-30px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent/40 border-4 border-background" />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base text-foreground">
                    Senior Software Engineer (Full-Stack & Systems)
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider bg-foreground/5 text-muted border border-foreground/5">
                    2022 — 2024
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Tech Product Labs</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    San Francisco, CA &bull; Remote
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Built lightning-fast dashboards using React and Next.js,
                    optimizing Largest Contentful Paint (LCP) metrics by 35%.
                  </li>
                  <li>
                    Designed robust backend APIs and secure relational database
                    queries, using transaction locking locks to block
                    concurrency conflicts.
                  </li>
                  <li>
                    Automated container environments for staging and test
                    verification, decreasing regression bugs by 20%.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    "React",
                    "Node.js",
                    "PostgreSQL",
                    "Redis",
                    "Express",
                    "Tailwind",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded border border-foreground/5 bg-foreground/2 text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="relative space-y-3">
                {/* Third Node Circle */}
                <div className="absolute left-[-30px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent/20 border-4 border-background" />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base text-foreground">
                    Full-Stack Developer & Systems Admin
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider bg-foreground/5 text-muted border border-foreground/5">
                    2020 — 2022
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Core Solutions Ltd</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    Lagos, Nigeria &bull; On-site
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Maintained secure bare-metal Linux web server environments,
                    configuring Nginx reverse proxy routers and firewall
                    configurations.
                  </li>
                  <li>
                    Automated recurring backup policies and configuration
                    deployments using modular shell and Bash scripting.
                  </li>
                  <li>
                    Migrated legacy backend structures into lightweight Docker
                    containers to simplify local developer onboarding.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    "TypeScript",
                    "Docker",
                    "Linux",
                    "Nginx",
                    "GitHub Actions",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded border border-foreground/5 bg-foreground/2 text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-8 scroll-mt-24">
          <div className="space-y-2 border-b border-foreground/5 pb-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-accent">
              Contact
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              Let&apos;s build something{" "}
              <span className="text-accent">extraordinary</span> together.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
            {/* Info Column */}
            <div className="space-y-6 md:col-span-2">
              <p className="text-muted leading-relaxed">
                Whether you have a specific project in mind, an interesting job
                opportunity, or just want to chat about developer stuff—my inbox
                is always open.
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted mb-1">
                    Email Address
                  </span>
                  <a
                    href="mailto:kossyuzoigwe@gmail.com"
                    className="font-semibold hover:text-accent transition-colors"
                  >
                    kossyuzoigwe@gmail.com
                  </a>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-muted mb-1">
                    Location
                  </span>
                  <span className="font-semibold">
                    Lagos, Nigeria (Available for Remote Work)
                  </span>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://github.com/thatmanfrancis"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-lg border border-foreground/10 text-muted hover:text-foreground hover:border-foreground/25 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/francisuzoigwe"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-lg border border-foreground/10 text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/2347047474886?text=Hello%20Francis,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-2.5 rounded-lg border border-foreground/10 text-muted hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-foreground/5 text-center text-xs text-muted z-10">
        <p>
          &copy; {new Date().getFullYear()} Francis Uzoigwe. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
