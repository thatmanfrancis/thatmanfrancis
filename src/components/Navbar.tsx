"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nova_Oval } from "next/font/google";

const novaOval = Nova_Oval({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Initialize theme state on client load
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  // Scroll-based active section detection — works reliably for tall sections
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "projects", "about", "experience", "contact"];
    const navbarHeight = 64; // px — matches the sticky navbar

    const handleScroll = () => {
      // Find the section whose top is closest to (but not past) the navbar bottom
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= navbarHeight + 16) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount too

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setTheme(nextTheme);
  };

  // Helper function to check if home page sections are active
  const isHomeSectionActive = (sectionId: string) => {
    return pathname === "/" && activeSection === sectionId;
  };

  return (
    <header className="sticky top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-foreground/5 transition-colors duration-300">
      <div className="w-[95%] sm:w-full max-w-6xl mx-auto px-0 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none"
          aria-label="Francis Kossyrisochukwu Uzoigwe Text Brand"
        >
          <div className="flex flex-col">
            <span
              className={`${novaOval.className} text-base sm:text-lg font-bold tracking-widest text-foreground group-hover:text-accent transition-colors duration-300 leading-none`}
            >
              FRANCIS
            </span>
            <span className="text-[7px] sm:text-[7.5px] uppercase tracking-[0.22em] text-muted font-black mt-0.5 leading-none">
              Kossyrisochukwu
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {/* Home Link */}
          <Link
            href="/#home"
            className={`transition-all duration-300 relative py-1 hover:text-foreground ${
              isHomeSectionActive("home")
                ? "text-accent font-bold scale-105"
                : "text-muted"
            }`}
          >
            Home
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-all duration-300 origin-center ${
                isHomeSectionActive("home")
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </Link>

          {/* Projects Link */}
          <Link
            href="/#projects"
            className={`transition-all duration-300 relative py-1 hover:text-foreground ${
              isHomeSectionActive("projects")
                ? "text-accent font-bold scale-105"
                : "text-muted"
            }`}
          >
            Projects
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-all duration-300 origin-center ${
                isHomeSectionActive("projects")
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </Link>

          {/* About Link */}
          <Link
            href="/#about"
            className={`transition-all duration-300 relative py-1 hover:text-foreground ${
              isHomeSectionActive("about")
                ? "text-accent font-bold scale-105"
                : "text-muted"
            }`}
          >
            About
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-all duration-300 origin-center ${
                isHomeSectionActive("about")
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </Link>

          {/* Experience Link */}
          <Link
            href="/#experience"
            className={`transition-all duration-300 relative py-1 hover:text-foreground ${
              isHomeSectionActive("experience")
                ? "text-accent font-bold scale-105"
                : "text-muted"
            }`}
          >
            Experience
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-all duration-300 origin-center ${
                isHomeSectionActive("experience")
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </Link>

          {/* Blog Link */}
          <Link
            href="/blog"
            className={`transition-all duration-300 relative py-1 hover:text-foreground ${
              pathname.startsWith("/blog")
                ? "text-accent font-bold scale-105"
                : "text-muted"
            }`}
          >
            Blog
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-all duration-300 origin-center ${
                pathname.startsWith("/blog")
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </Link>

          {/* Contact Link */}
          <Link
            href="/#contact"
            className={`transition-all duration-300 relative py-1 hover:text-foreground ${
              isHomeSectionActive("contact")
                ? "text-accent font-bold scale-105"
                : "text-muted"
            }`}
          >
            Contact
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full transition-all duration-300 origin-center ${
                isHomeSectionActive("contact")
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </Link>
        </nav>

        {/* Right Side: Toggle Switch & Mobile Link */}
        <div className="flex items-center gap-4">
          {/* Tactile Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme Mode"
            className="w-9 h-9 rounded-full border border-foreground/10 bg-foreground/1 hover:bg-foreground/5 flex items-center justify-center text-foreground transition-all duration-300 cursor-pointer"
          >
            {theme === "light" ? (
              // Moon Icon
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
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              // Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4.5 h-4.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21M9.75 15h.008v.008H9.75V15Zm0-6h.008v.008H9.75V9ZM3 12h2.25m13.5 0H21M5.757 6.586l1.591 1.591m8.485 8.486l1.59 1.59M9.879 9.879l.008-.008m0 4.25l-.008-.008m4.25-4.25l-.008-.008m0 4.25l-.008-.008M7.348 16.652l1.591-1.591m8.485-8.486l1.59 1.59M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z"
                />
              </svg>
            )}
          </button>

          {/* View CV Button */}
          <a
            href="https://docs.google.com/document/d/198Tm_YQwJP4WTPDCcAyt4DHmw8SeNDWs3H-Thlcq2EY"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full border border-foreground/10 text-foreground hover:bg-foreground/5 text-xs font-bold transition-all duration-300"
          >
            View CV
          </a>

          {/* Contact Button */}
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-foreground text-background text-xs font-bold hover:opacity-85 transition-opacity"
          >
            Hire Me
          </Link>

          {/* Stateful Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex sm:hidden w-9 h-9 rounded-full border border-foreground/10 bg-foreground/1 hover:bg-foreground/2 items-center justify-center text-foreground cursor-pointer transition-colors duration-300"
            aria-label="Toggle Mobile Navigation"
          >
            {isMobileMenuOpen ? (
              // X Close Icon
              <svg
                className="w-4 h-4 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-4 h-4 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Stateful Mobile Dropdown Links List */}
      {isMobileMenuOpen && (
        <nav className="sm:hidden border-t border-foreground/5 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 text-sm font-semibold tracking-wide transition-all duration-300">
          <Link
            href="/#home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-accent transition-colors py-1"
          >
            Home
          </Link>
          <Link
            href="/#projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-accent transition-colors py-1"
          >
            Projects
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-accent transition-colors py-1"
          >
            About
          </Link>
          <Link
            href="/#experience"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-accent transition-colors py-1"
          >
            Experience
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-accent transition-colors py-1"
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-accent transition-colors py-1"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
