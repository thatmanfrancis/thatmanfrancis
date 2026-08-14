"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/brand/logo-mark";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncHeight = () => {
      const bar = document.querySelector<HTMLElement>("[data-site-header-bar]");
      if (!bar) return;
      const height = Math.ceil(bar.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${height}px`,
      );
    };

    syncHeight();
    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("mobile-nav-locked");
    } else {
      document.body.classList.remove("mobile-nav-locked");
    }

    return () => {
      document.body.classList.remove("mobile-nav-locked");
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div data-site-header>
      <header className="site-header-bar site-header-fixed">
        <div
          className="container-page flex items-center justify-between gap-4 py-4 sm:py-5"
          data-site-header-bar
        >
          <Link href="/" className="relative z-[90]" aria-label="Francis — home">
            <BrandLockup />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {links
              .filter((link) => link.href !== "/")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`)
                      ? "nav-link nav-link-active"
                      : "nav-link"
                  }
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="relative z-[90] flex items-center gap-2">
            <Link
              href="/contact"
              className="btn btn-primary hidden text-sm sm:inline-flex sm:text-base"
            >
              Get in touch
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="site-header-spacer" aria-hidden="true" />

      <div
        id="mobile-nav"
        className={`mobile-nav-overlay md:hidden${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-nav-overlay-inner container-page">
          <p className="mobile-nav-heading">Explore</p>
          <nav className="mobile-nav-links" aria-label="Primary">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-nav-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="btn btn-primary mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
