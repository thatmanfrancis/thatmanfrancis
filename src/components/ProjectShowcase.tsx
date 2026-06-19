"use client";

import { useRef, useState } from "react";

interface ProjectShowcaseProps {
  title: string;
  images: string[];
  tech: string[];
  problem: string;
  solution: string;
}

// Masonry span patterns — first image always large
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

export default function ProjectShowcase({
  title,
  images,
  tech,
  problem,
  solution,
}: ProjectShowcaseProps) {
  const hasImages = images && images.length > 0 && !!images[0];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: "smooth" });
    setActiveSlide(idx);
  };

  return (
    <div className="w-full space-y-10">
      {/* ── IMAGE SECTION ── */}
      {hasImages ? (
        <>
          {/* MOBILE: snap carousel */}
          <div className="md:hidden space-y-3">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 scrollbar-none"
              onScroll={(e) => {
                const el = e.currentTarget;
                setActiveSlide(Math.round(el.scrollLeft / el.offsetWidth));
              }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 w-[88vw] h-60 rounded-2xl overflow-hidden border border-foreground/8 bg-foreground/3"
                >
                  <img
                    src={src}
                    alt={`${title} — view ${i + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
            {/* Dots */}
            {images.length > 1 && (
              <div className="flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeSlide
                        ? "w-6 bg-accent"
                        : "w-1.5 bg-foreground/15"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP: masonry grid */}
          <div className="hidden md:grid grid-cols-3 auto-rows-[160px] gap-3">
            {images.map((src, i) => (
              <div
                key={i}
                className={`${SPANS[i % SPANS.length]} rounded-2xl overflow-hidden border border-foreground/8 bg-foreground/3 group`}
              >
                <img
                  loading="lazy"
                  src={src}
                  alt={`${title} — view ${i + 1}`}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ── NO IMAGES YET ── */
        <div className="w-full h-60 rounded-2xl border border-foreground/8 bg-foreground/1.5 flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl border border-foreground/8 bg-foreground/3 flex items-center justify-center text-accent/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted/50">
            No Image Yet
          </span>
        </div>
      )}

      {/* ── CASE STUDY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Problem + Solution */}
        <div className="lg:col-span-2 space-y-5">
          <CaseCard
            accent="The Challenge"
            heading="What It Solves"
            body={problem}
          />
          <CaseCard
            accent="The Approach"
            heading="How It Was Built"
            body={solution}
          />
        </div>

        {/* Tech + Status + Back */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-foreground/8 bg-foreground/1.5 space-y-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground border-b border-foreground/5 pb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-3 py-1 rounded-full border border-foreground/8 bg-foreground/2 text-muted font-medium hover:border-accent/25 hover:text-foreground transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-foreground/8 bg-foreground/1.5 space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground border-b border-foreground/5 pb-3">
              Status
            </p>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-xs font-bold text-foreground">
                Live &amp; Verified
              </span>
            </div>
          </div>

          <a
            href="/#projects"
            className="flex items-center justify-between w-full p-4 rounded-2xl border border-foreground/8 hover:border-accent/25 hover:bg-foreground/2 text-muted hover:text-foreground transition-all duration-300 group"
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              All Projects
            </span>
            <span className="text-sm group-hover:-translate-x-0.5 transition-transform duration-300">
              ←
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function CaseCard({
  accent,
  heading,
  body,
}: {
  accent: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-foreground/8 bg-foreground/1.5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
          {accent}
        </span>
      </div>
      <h3 className="text-base font-bold text-foreground tracking-tight">
        {heading}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
