"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const setup = () => {
      if (cancelled) return;

      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-revealed)",
      );
      if (!nodes.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        nodes.forEach((node) => node.classList.add("is-revealed"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer?.unobserve(entry.target);
            }
          }
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -12% 0px",
        },
      );

      nodes.forEach((node) => observer?.observe(node));
    };

    // Wait until the new route's DOM is painted before observing
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(setup);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
