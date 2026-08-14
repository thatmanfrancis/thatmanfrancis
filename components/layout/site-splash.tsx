"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo-mark";

const STORAGE_KEY = "tf-splash-seen";

/**
 * Brief brand beat on first visit this session.
 * Skipped when reduced-motion is preferred or already shown.
 */
export function SiteSplash() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(STORAGE_KEY) === "1") {
      return;
    }

    setVisible(true);
    const exitTimer = window.setTimeout(() => setExiting(true), 900);
    const hideTimer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    }, 1400);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-500 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="presentation"
      onClick={() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setExiting(true);
        window.setTimeout(() => setVisible(false), 400);
      }}
    >
      <LogoMark className="h-20 w-auto sm:h-24" invert title="FKU" />
    </div>
  );
}
