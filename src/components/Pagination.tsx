"use client";

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  const rangeStart = Math.max(2, currentPage - 2);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 2);

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

const ArrowLeft = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  // Fully inactive state — shown when content fits one page
  if (totalPages <= 1) {
    return (
      <nav
        aria-label="Blog pagination"
        className="flex items-center gap-2 opacity-30 pointer-events-none select-none"
      >
        <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-zinc-200 text-xs font-black text-zinc-400">
          <ArrowLeft />
          Prev
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-950 text-white text-xs font-black">
          1
        </span>

        <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-zinc-200 text-xs font-black text-zinc-400">
          Next
          <ArrowRight />
        </span>
      </nav>
    );
  }

  const pages = getPageNumbers(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  return (
    <nav aria-label="Blog pagination" className="flex items-center gap-2">
      {/* Prev button */}
      {hasPrev ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="group inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-zinc-200 text-xs font-black text-zinc-500 transition-all duration-200 hover:border-zinc-900 hover:text-zinc-900"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <ArrowLeft />
          </span>
          Prev
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-zinc-100 text-xs font-black text-zinc-300 cursor-not-allowed">
          <ArrowLeft />
          Prev
        </span>
      )}

      {/* Page number pills */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-9 w-9 items-center justify-center text-xs font-bold text-zinc-400 select-none"
            >
              …
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-950 text-white text-xs font-black"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={pageHref(page)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-xs font-black text-zinc-500 transition-all duration-200 hover:border-zinc-900 hover:text-zinc-900"
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next button */}
      {hasNext ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="group inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-zinc-200 text-xs font-black text-zinc-500 transition-all duration-200 hover:border-zinc-900 hover:text-zinc-900"
        >
          Next
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight />
          </span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-zinc-100 text-xs font-black text-zinc-300 cursor-not-allowed">
          Next
          <ArrowRight />
        </span>
      )}
    </nav>
  );
}
