"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group inline-flex items-center gap-3 text-sm font-semibold text-muted hover:text-foreground transition-colors focus:outline-none cursor-pointer"
    >
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-foreground/10 bg-foreground/1 group-hover:bg-foreground/2 group-hover:-translate-x-1 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-foreground group-hover:text-accent transition-colors duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </span>
      <span className="group-hover:text-foreground transition-colors">Back</span>
    </button>
  );
}
