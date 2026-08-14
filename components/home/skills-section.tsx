"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { TechMark } from "@/components/ui/tech-mark";
import type { CopyBlock } from "@/lib/copy-blocks";
import { techFor } from "@/lib/tech";

type SkillsSectionProps = {
  skills: string[];
  stackTitle?: string | null;
  processTitle?: string | null;
  processCta?: string | null;
  processSteps?: CopyBlock[];
};

export function SkillsSection({
  skills,
  stackTitle = "Tools I ship with",
  processTitle = "How I work",
  processCta = "Start a project",
  processSteps = [],
}: SkillsSectionProps) {
  const [active, setActive] = useState(skills[0] ?? "");

  if (!skills?.length && processSteps.length === 0) return null;

  const blurb = techFor(active)?.blurb ?? "A tool I reach for when the work needs it.";

  return (
    <section className="border-t border-border bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-6">
          {skills.length > 0 ? (
            <article
              className="tech-panel tech-panel-light flex flex-col rounded-4xl p-8 sm:p-10"
              data-reveal
            >
              <p className="section-label mb-3">Stack</p>
              <h2 className="max-w-md text-2xl font-bold leading-snug text-ink sm:text-3xl">
                {stackTitle}
              </h2>
              <p className="mt-3 min-h-[3rem] text-base font-light leading-relaxed text-ink-muted">
                {blurb}
              </p>

              <ul className="tech-pills mt-8 flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const isActive = active === skill;
                  return (
                    <li key={skill}>
                      <button
                        type="button"
                        className={`tech-pill${isActive ? " is-active" : ""}`}
                        onMouseEnter={() => setActive(skill)}
                        onFocus={() => setActive(skill)}
                        aria-pressed={isActive}
                      >
                        <TechMark name={skill} />
                        <span>{skill}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          ) : null}

          {processSteps.length > 0 ? (
            <article
              className="tech-panel tech-panel-dark flex flex-col rounded-4xl p-8 sm:p-10 lg:mt-16"
              data-reveal
            >
              <h2 className="max-w-md text-2xl font-bold leading-snug text-white sm:text-3xl">
                {processTitle}
              </h2>
              <ol className="mt-8 space-y-6">
                {processSteps.map((step, index) => (
                  <li key={`${step.title}-${index}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/45">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                      {step.title}
                    </p>
                    {step.body ? (
                      <p className="mt-1 text-sm font-light text-white/55">
                        {step.body}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  {processCta}
                  <ArrowUpRightIcon className="size-4" />
                </Link>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
