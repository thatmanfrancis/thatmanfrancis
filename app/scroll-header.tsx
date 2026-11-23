"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const stylesheet = document.documentElement.style;
    let height = 0;
    let previousY = Math.max(0, window.scrollY);

    const measure = () => {
      height = element.offsetHeight;
      stylesheet.setProperty("--masthead-height", `${height}px`);
    };

    function update() {
      const currentY = Math.max(0, window.scrollY);
      if (currentY <= height) {
        previousY = currentY;
        setHidden(false);
        return;
      }
      const distance = currentY - previousY;
      if (Math.abs(distance) < 7) return;
      previousY = currentY;
      setHidden(distance > 0);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      stylesheet.removeProperty("--masthead-height");
    };
  }, []);

  return (
    <header ref={header} className="scroll-header" data-hidden={hidden || undefined}>
      <div className="masthead shell">{children}</div>
    </header>
  );
}
