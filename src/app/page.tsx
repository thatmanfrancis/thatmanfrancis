"use client";

import { motion } from "framer-motion";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-background text-foreground antialiased font-sans transition-colors duration-300">
      {/* Background visual accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-6 py-4 pb-16 space-y-28">
        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col items-center text-center pt-16 pb-4 scroll-mt-24 space-y-10"
        >
          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] text-foreground select-none">
              <span className="block font-light text-muted">
                Orchestrating Scalable
              </span>
              <strong className="block font-extrabold text-foreground">
                Web Systems
              </strong>
              <span className="block font-light text-accent">
                & Cloud Infrastructure
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mx-auto max-w-xl">
              Designing fluid, high-performance interfaces and shipping
              bulletproof backend architectures—orchestrated with automated,
              zero-downtime infrastructure built for production scale.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3.5 text-sm font-bold hover:bg-foreground/80 transition-colors"
            >
              Discover Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 px-8 py-3.5 text-sm font-bold hover:bg-foreground/5 transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 px-8 py-3.5 text-sm font-bold hover:bg-foreground/5 transition-all duration-300"
            >
              Read Blog
            </a>
            <a
              href="https://docs.google.com/document/d/198Tm_YQwJP4WTPDCcAyt4DHmw8SeNDWs3H-Thlcq2EY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 px-8 py-3.5 text-sm font-bold hover:bg-foreground/5 transition-all duration-300"
            >
              View CV
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* GitHub */}
            <a
              href="https://github.com/thatmanfrancis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted hover:border-foreground/35 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="https://x.com/thatmanfrancis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted hover:border-foreground/35 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/thatmanfrancis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted hover:border-[#E1306C]/30 hover:text-[#E1306C] hover:bg-[#E1306C]/5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/francisuzoigwe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted hover:border-[#0A66C2]/30 hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted hover:border-[#25D366]/30 hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center items-center gap-10 py-6 border-y border-foreground/5 w-full max-w-xl"
          >
            <div>
              <span className="block text-3xl font-extrabold text-foreground">
                5+
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted mt-1 block">
                Years Experience
              </span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-foreground">
                20+
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted mt-1 block">
                Projects Shipped
              </span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-foreground">
                99.9%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted mt-1 block">
                Uptime Architected
              </span>
            </div>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 max-w-xl"
          >
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
                className="text-[11px] font-bold px-4 py-1.5 rounded-full border border-foreground/5 bg-foreground/2 text-muted hover:text-foreground hover:border-foreground/15 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Bio Text */}
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-accent tracking-tight leading-snug">
                I don&apos;t build software to just &quot;work.&quot; <br />
                <span className="text-foreground">
                  I architect systems that survive load and scale.
                </span>
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                As an elite <strong>Full-Stack &amp; DevOps Engineer</strong>{" "}
                with{" "}
                <strong>
                  5+ years of battle-hardened production experience
                </strong>
                , I bridge the critical divide between fluid, high-performance
                user interfaces and secure, bulletproof server infrastructure.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Whether it is building modern dashboards in{" "}
                <strong>React and Next.js</strong>, orchestrating microservices
                under <strong>Docker &amp; AWS</strong>, or establishing
                zero-downtime <strong>CI/CD pipelines</strong>—I engineer
                systems to withstand heavy traffic from day one.
              </p>
              {/* Core specs inline */}
              <div className="pt-2 space-y-2.5 text-xs">
                {[
                  {
                    label: "Frontend",
                    value: "Next.js, React, TypeScript, Tailwind CSS",
                  },
                  {
                    label: "Backend",
                    value: "Node.js, Express, PostgreSQL, Redis, Prisma",
                  },
                  {
                    label: "DevOps",
                    value: "Docker, AWS, GitHub Actions, Nginx, Linux",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 items-baseline">
                    <span className="font-bold text-accent shrink-0 w-16">
                      {label}
                    </span>
                    <span className="text-muted leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Profile Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                {/* Decorative accent ring */}
                <div className="absolute -inset-1 rounded-3xl border border-accent/20 group-hover:border-accent/40 transition-colors duration-500" />
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border border-foreground/10 bg-foreground/3">
                  <img
                    src="/icon.png"
                    alt="Francis Kossyrisochukwu Uzoigwe — Full-Stack & DevOps Engineer"
                    className="w-full h-full object-contain p-8 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                  {/* Name badge at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="block text-xs font-extrabold tracking-widest text-foreground uppercase">
                      Francis K. Uzoigwe
                    </span>
                    <span className="block text-[10px] text-muted tracking-wider mt-0.5">
                      Full-Stack &amp; DevOps Engineer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Fully Distinct Visual Card Layout */}
        <section
          id="experience"
          className="space-y-8 scroll-mt-24 p-8 rounded-2xl border border-foreground/10 bg-foreground/1 dark:bg-foreground/2 backdrop-blur-md relative overflow-hidden"
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
                    Full-Stack & DevOps Engineer
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                    May 2024 — Present
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Hausevo</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    Lagos, Nigeria &bull; Remote
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Identified a major operational bottleneck where the admin
                    team had to constantly rely on the developer for basic tasks
                    such as handling disputes, maintenance requests, tenancy
                    updates, and artisan management.
                  </li>
                  <li>
                    Designed and built a modular admin dashboard with dedicated
                    modules for Disputes, Maintenance, Tenancies, Artisans, and
                    Verifications, giving operations teams full autonomy to
                    manage daily workflows independently.
                  </li>
                  <li>
                    Implemented clean backend architecture using Prisma +
                    PostgreSQL to handle complex relationships between
                    properties, tenancies, maintenance, and disputes.
                  </li>
                  <li>
                    Set up the full production deployment pipeline using PM2 and
                    Nginx on a VPS.
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
                    Senior Software Engineer
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider bg-foreground/5 text-muted border border-foreground/5">
                    2021 — Present
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>LemonWares Technology</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    Lagos, Nigeria &bull; Full-time
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Optimized front-end performance with clean, maintainable
                    JavaScript/TypeScript code, reducing load times by 25% and
                    supporting scalability of 7+ projects.
                  </li>
                  <li>
                    Led Agile sprints, mentoring 4 junior developers to deliver
                    high-quality code following industry best practices.
                  </li>
                  <li>
                    Collaborated with UX/UI designers to translate wireframes
                    into interactive features, ensuring seamless integration and
                    a 20% improvement in design-to-deployment speed.
                  </li>
                  <li>
                    Developed responsive web interfaces using React and NextJs,
                    enhancing user experience and boosting client retention by
                    35% across 12+ applications.
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
                    Full-Stack Engineer
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider bg-foreground/5 text-muted border border-foreground/5">
                    Jan 2026 — Feb 2026
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Terrafirma Capital</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    Lagos, Nigeria &bull; Contract
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Developed the Terrafirma Capital Advisory Investment
                    platform end-to-end, owning the React.js frontend and
                    Node.js/PostgreSQL backend from the first line of code to
                    production deployment.
                  </li>
                  <li>
                    Built role-based investor and admin dashboards with
                    real-time data, rendering, protected routes, and session
                    management – scoping data access strictly by user role at
                    every layer.
                  </li>
                  <li>
                    Designed PostgreSQL schemas to store financial records,
                    transaction histories, and portfolio data with referential
                    integrity constraints and query optimization for faster
                    dashboard loads.
                  </li>
                  <li>
                    Implemented JWT authentication with secure token refresh,
                    HTTPS enforcement, and input validation at every API
                    endpoint, meeting the security bar expected of a live
                    financial product.
                  </li>
                  <li>
                    Shipped financial workflow features in fortnightly circles,
                    working directly with stakeholders to validate business
                    logic before each release.
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

              {/* Timeline item 4 */}
              <div className="relative space-y-3">
                {/* Third Node Circle */}
                <div className="absolute left-[-30px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent/20 border-4 border-background" />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-base text-foreground">
                    Full-Stack Engineer
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wider bg-foreground/5 text-muted border border-foreground/5">
                    May 2025 — Feb 2026
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2 flex-wrap">
                  <span>Aakkio Consulting</span>
                  <span className="text-xs text-accent/70 font-normal normal-case">
                    Lagos, Nigeria &bull; Remote
                  </span>
                </h4>

                <ul className="text-sm text-muted leading-relaxed list-disc pl-5 space-y-2">
                  <li>
                    Built the Aakkio Academy e-learning platform from zero to
                    production in 8 weeks with a of 4 — delivering course
                    creation tools, enrolment flows, lesson delivery, progress
                    tracking, and learner dashboards.
                  </li>
                  <li>
                    Engineered the complete backend in Node.js: RESTful APIs for
                    authentication, course content, subscription management, and
                    role-based access control (RBAC) across learner, experts,
                    and admin account types.
                  </li>
                  <li>
                    Built the frontend with Next.js using server-side rendering
                    across the Academy, Toolkit, Insight, and Aakkio Business
                    product lines – delivering SEO-optimised, fast loading pages
                    at launch.
                  </li>
                  <li>
                    Implemented JWT authentication with secure token refresh,
                    HTTPS enforcement, and input validation at every API
                    endpoint, meeting the security bar expected of a live
                    financial product.
                  </li>
                  <li>
                    Integrated a payment processing system for subscription
                    billing, connecting checkout directly to user account
                    activation and course access with no manual steps required.
                  </li>
                  <li>
                    Optimised images and asset delivery for low-bandwidth
                    connections across Nigerian and West African market, cutting
                    initial page load times on the Academy homepage.
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
            {/* Info Column */}
            <div className="md:col-span-2 space-y-7">
              <p className="text-sm text-muted leading-relaxed">
                Whether you have a specific project in mind, a job opportunity,
                or just want to talk developer stuff — my inbox is always open.
              </p>

              {/* Contact Info Pills */}
              <div className="space-y-3">
                <a
                  href="mailto:kossyuzoigwe@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl border border-foreground/8 hover:border-accent/25 hover:bg-foreground/2 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg border border-foreground/8 bg-foreground/3 flex items-center justify-center text-accent shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-widest text-muted font-semibold">
                      Email
                    </span>
                    <span className="block text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                      kossyuzoigwe@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-foreground/8 bg-foreground/1">
                  <div className="w-8 h-8 rounded-lg border border-foreground/8 bg-foreground/3 flex items-center justify-center text-muted shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-muted font-semibold">
                      Location
                    </span>
                    <span className="block text-sm font-semibold text-foreground">
                      Lagos, Nigeria · Remote Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted">
                  Find me on
                </p>
                <div className="space-y-1.5">
                  {[
                    {
                      label: "GitHub",
                      handle: "@thatmanfrancis",
                      href: "https://github.com/thatmanfrancis",
                      color: "hover:text-foreground hover:border-foreground/25",
                      icon: (
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      ),
                    },
                    {
                      label: "X / Twitter",
                      handle: "@thatmanfrancis",
                      href: "https://x.com/thatmanfrancis",
                      color: "hover:text-foreground hover:border-foreground/25",
                      icon: (
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                      ),
                    },
                    {
                      label: "Instagram",
                      handle: "@thatmanfrancis",
                      href: "https://instagram.com/thatmanfrancis",
                      color: "hover:text-[#E1306C] hover:border-[#E1306C]/25",
                      icon: (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      ),
                    },
                    {
                      label: "LinkedIn",
                      handle: "francisuzoigwe",
                      href: "https://linkedin.com/in/francisuzoigwe",
                      color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/25",
                      icon: (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      ),
                    },
                    {
                      label: "WhatsApp",
                      handle: "+234 704 747 4886",
                      href: "https://wa.me/2347047474886?text=Hello%20Francis,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!",
                      color: "hover:text-[#25D366] hover:border-[#25D366]/25",
                      icon: (
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      ),
                    },
                  ].map(({ label, handle, href, color, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-foreground/8 text-muted transition-all duration-300 group ${color}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                      >
                        {icon}
                      </svg>
                      <span className="text-xs font-semibold flex-1">
                        {label}
                      </span>
                      <span className="text-[10px] tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
                        {handle}
                      </span>
                      <span className="text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-foreground/5 mt-auto pt-16 pb-12 w-full">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Row: brand & links grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="col-span-2 flex flex-col gap-4">
              <span className="text-base font-extrabold tracking-widest text-foreground">
                FRANCIS K. UZOIGWE
              </span>
              <p className="text-xs text-muted leading-relaxed max-w-[280px]">
                Full-Stack Software Engineer & DevOps Architect specializing in
                high-performance web systems and bulletproof cloud automation.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-foreground">
                Sitemap
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-foreground">
                Resources
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/blog"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    Read Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/document/d/198Tm_YQwJP4WTPDCcAyt4DHmw8SeNDWs3H-Thlcq2EY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    View CV
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/thatmanfrancis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/thatmanfrancis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    X / Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/thatmanfrancis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/francisuzoigwe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted hover:text-foreground transition-colors font-medium"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Specialties Column */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-foreground">
                Services
              </p>
              <ul className="space-y-2">
                <li className="text-xs text-muted font-medium">
                  Full-Stack Dev
                </li>
                <li className="text-xs text-muted font-medium">
                  DevOps Architect
                </li>
                <li className="text-xs text-muted font-medium">
                  Cloud Orchestration
                </li>
                <li className="text-xs text-muted font-medium">
                  API Engineering
                </li>
                <li className="text-xs text-muted font-medium">
                  DB Performance Tuning
                </li>
              </ul>
            </div>
          </div>

          {/* Popular Searches for SEO */}
          <div className="mt-12 pt-8 border-t border-foreground/5">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted mb-4">
              Core Expertise & Fields
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                "Full-Stack Software Engineer",
                "DevOps Architect for Hire",
                "Next.js React Specialist",
                "AWS Cloud Automation Engineer",
                "CI/CD Pipeline Integrations",
                "Senior TypeScript Developer",
                "Lagos Software Developer",
                "Remote Systems Architect",
                "High Concurrency Microservices",
                "PostgreSQL Performance Tuning",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold text-muted hover:text-foreground transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="mt-10 pt-6 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} Francis Kossyrisochukwu Uzoigwe.
              All rights reserved.
            </p>
            <a
              href="https://github.com/thatmanfrancis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-extrabold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
            >
              Designed by thatmanfrancis ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
