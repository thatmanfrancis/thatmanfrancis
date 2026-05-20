"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────
type NavItem = { label: string; href: string };

// ── Nav config ─────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on route change during render to prevent cascading renders
  const [prevPathname, setPrevPathname] = useState<string>(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  return (
    <header
      ref={navRef}
      className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="text-2xl font-black tracking-tight text-zinc-900 font-outfit" style={{ fontVariant: 'small-caps' }}>
            Francis
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-2.5 pb-1 text-sm font-semibold transition-colors border-b-2 ${
                  isActive
                    ? "text-zinc-900 border-zinc-900"
                    : "text-zinc-500 border-transparent hover:text-zinc-900 hover:border-zinc-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right actions ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 rounded-full border border-zinc-900 bg-white px-5 py-2.5 text-sm font-bold text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300"
          >
            Hire Me
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-zinc-900 transition-transform duration-200 ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-zinc-900 transition-opacity duration-200 ${isMobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-zinc-900 transition-transform duration-200 ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2.5 text-sm font-semibold text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-1.5 rounded-full border border-zinc-900 bg-white px-5 py-3 text-sm font-bold text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300 mt-2"
          >
            Hire Me
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      )}
    </header>
  );
}
