"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme?: "light" | "dark" | "auto";
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileFieldProps = {
  action: string;
  siteKey: string;
  className?: string;
};

export function TurnstileField({
  action,
  siteKey,
  className = "",
}: TurnstileFieldProps) {
  const reactId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !siteKey || !containerRef.current || !window.turnstile) {
      return;
    }
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      theme: "light",
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, ready, siteKey]);

  if (!siteKey) return null;

  return (
    <div className={className}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={containerRef} data-turnstile={reactId} />
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </div>
  );
}

/** Invisible honeypot fields — leave empty. */
export function HoneypotFields() {
  const id = useId().replace(/:/g, "");
  return (
    <div
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <label htmlFor={`company-${id}`}>Company</label>
      <input
        id={`company-${id}`}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
      <label htmlFor={`website-${id}`}>Website</label>
      <input
        id={`website-${id}`}
        name="website"
        type="url"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
