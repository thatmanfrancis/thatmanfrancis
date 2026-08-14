import type { ReactNode } from "react";
import Link from "next/link";

const explore = [
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type ErrorShellProps = {
  code: string;
  title: string;
  lede: string;
  siteName?: string;
  children?: ReactNode;
};

export function ErrorShell({
  code,
  title,
  lede,
  siteName = "thatmanfrancis",
  children,
}: ErrorShellProps) {
  return (
    <div className="error-shell">
      <div
        className={
          code === "500" ? "error-shell-frames is-start" : "error-shell-frames"
        }
        aria-hidden="true"
      >
        <div className="error-shell-frame error-shell-frame-1" />
        <div className="error-shell-frame error-shell-frame-2" />
        <div className="error-shell-frame error-shell-frame-3" />
      </div>
      <p className="error-shell-watermark" aria-hidden="true">
        {code}
      </p>

      <div className="relative z-10 flex min-h-svh flex-col">
        <header className="container-page flex items-center justify-between py-6 sm:py-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            {siteName}
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55 transition hover:text-white"
          >
            Home
          </Link>
        </header>

        <div className="container-page flex flex-1 flex-col justify-center py-10 sm:py-16">
          <p className="mb-4 text-base font-medium uppercase tracking-[0.18em] text-white/55">
            {code}
          </p>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/75">
            {lede}
          </p>
          {children ? (
            <div className="mt-10 flex flex-wrap gap-3">{children}</div>
          ) : null}
        </div>

        <nav
          className="container-page flex flex-wrap gap-x-6 gap-y-2 pb-8 pt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/45"
          aria-label="Explore"
        >
          {explore.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
