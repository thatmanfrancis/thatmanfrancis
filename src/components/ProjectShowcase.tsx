"use client";

import { useState } from "react";

interface ProjectShowcaseProps {
  title: string;
  category: string;
  description: string;
  images: string[];
  tech: string[];
  problem: string;
  solution: string;
}

export default function ProjectShowcase({
  title,
  category,
  description,
  images,
  tech,
  problem,
  solution,
}: ProjectShowcaseProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Define the cards that will render in both views
  const cards = [
    {
      id: "visual",
      title: "Project Screenshot",
      element: (
        <div className="p-5 rounded-lg border border-foreground/5 bg-foreground/1 dark:bg-foreground/1.5 relative overflow-hidden group space-y-4">
          <div className="w-full h-56 bg-foreground/3 rounded-md border border-foreground/5 relative overflow-hidden">
            {images && images[0] ? (
              <img
                src={images[0]}
                alt={`${title} dashboard screenshot`}
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-accent/5 to-accent/15 flex flex-col items-center justify-center space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-foreground/2 border border-foreground/5 flex items-center justify-center text-accent/80 shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-black text-muted">
                  No Image Yet
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
              Status: Live & Verified
            </span>
            <h3 className="font-bold text-lg text-foreground">{title}</h3>
          </div>
        </div>
      ),
    },
    {
      id: "tech",
      title: "Core Technology Stack",
      element: (
        <div className="p-5 rounded-lg border border-foreground/5 bg-foreground/1 dark:bg-foreground/1.5 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-accent border-b border-foreground/5 pb-2">
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded border border-foreground/5 bg-foreground/2 text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Engineered under state-of-the-art programming benchmarks to deliver
            optimal bundler loading speeds, absolute type safety, and direct
            system performance.
          </p>
        </div>
      ),
    },
    {
      id: "solution",
      title: "Technical Architecture",
      element: (
        <div className="p-5 rounded-lg border border-foreground/5 bg-foreground/1 dark:bg-foreground/1.5 space-y-5">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-foreground leading-tight">
              What It Solves
            </h3>
            <p className="text-sm text-muted leading-relaxed">{problem}</p>
          </div>
          <div className="border-t border-foreground/5 pt-4 space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
              How We Fixed It
            </span>
            <h3 className="font-bold text-base text-foreground leading-tight">
              The Approach
            </h3>
            <p className="text-sm text-muted leading-relaxed">{solution}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full pt-4 space-y-8">
      {/* 1. MOBILE VIEW: Image Gallery Carousel + stacked details */}
      <div className="block md:hidden space-y-6">
        {/* Main Image Display */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-foreground/5 bg-foreground/3">
          {images && images.length > 0 && images[0] ? (
            images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Project screenshot ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
                  idx === activeSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.02] pointer-events-none"
                }`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-linear-to-br from-accent/5 to-accent/15 flex flex-col items-center justify-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-foreground/2 border border-foreground/5 flex items-center justify-center text-accent/80 shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-widest font-black text-muted">
                No Image Yet
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Strip — only if images exist */}
        {images && images.length > 0 && images[0] && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`View screenshot ${idx + 1}`}
                className={`shrink-0 w-[50px] h-[50px] rounded-md overflow-hidden border transition-all duration-300 cursor-pointer ${
                  idx === activeSlide
                    ? "border-accent opacity-100"
                    : "border-foreground/5 opacity-40 hover:opacity-70"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        )}

        {/* Stacked Detail Cards */}
        <div className="space-y-4">
          {cards[2].element} {/* Problem + Solution */}
          {cards[1].element} {/* Tech Stack */}
        </div>
      </div>

      {/* 2. DESKTOP VIEW: Standalone Image Masonry at top, details beneath */}
      <div className="hidden md:block space-y-8">
        {/* Full-width Asymmetric Image Masonry — handles any number of images */}
        {images && images.length > 0 && images[0] ? (
          <>
            {/* Full-width Asymmetric Image Masonry — handles any number of images */}
            <div className="grid grid-cols-3 gap-4">
              {/* Primary large image — always spans 2 cols */}
              {images[0] && (
                <div className="col-span-2 h-96 bg-foreground/3 rounded-lg overflow-hidden border border-foreground/5 group">
                  <img
                    src={images[0]}
                    alt="Primary dashboard screenshot"
                    className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              )}
              {/* Right column — images 1 & 2 stacked */}
              <div className="flex flex-col gap-4 h-96">
                {images.slice(1, 3).map((src, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-foreground/3 rounded-lg overflow-hidden border border-foreground/5 group relative"
                  >
                    <img
                      src={src}
                      alt={`Detail screenshot ${i + 2}`}
                      className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Overflow row — images 3+ shown in a uniform grid below the masonry */}
            {images.length > 3 && (
              <div className="grid grid-cols-3 gap-4">
                {images.slice(3).map((src, i) => (
                  <div
                    key={i}
                    className="h-48 bg-foreground/3 rounded-lg overflow-hidden border border-foreground/5 group"
                  >
                    <img
                      src={src}
                      alt={`Extra screenshot ${i + 4}`}
                      className="w-full h-full object-cover object-center hover:scale-[1.01] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-64 bg-linear-to-br from-accent/5 to-accent/15 rounded-lg overflow-hidden border border-foreground/5 flex flex-col items-center justify-center space-y-2.5">
            <div className="w-12 h-12 rounded-full bg-foreground/2 border border-foreground/5 flex items-center justify-center text-accent/80 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest font-black text-muted">
              Screenshots coming soon
            </span>
          </div>
        )}

        {/* Details layout directly beneath the masonry images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1 & 2: Problem + Approach */}
          <div className="lg:col-span-2 space-y-6">
            {cards[2].element} {/* Problem + Solution */}
          </div>

          {/* Column 3: Tech Stack */}
          <div className="space-y-6">
            {cards[1].element} {/* Tech Specs */}
          </div>
        </div>
      </div>
    </div>
  );
}
