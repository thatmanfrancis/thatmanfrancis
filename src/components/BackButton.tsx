"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="group mb-8 hover:cursor-pointer flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
      aria-label="Go back"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:-translate-x-1 group-hover:cursor-pointer transition-transform duration-200"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back
    </button>
  );
}
