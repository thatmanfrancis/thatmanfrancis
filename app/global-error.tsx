"use client";

import { useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import { ErrorShell } from "@/components/ui/error-shell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-white">
        <title>Something broke — thatmanfrancis</title>
        <ErrorShell
          code="500"
          title="Something broke."
          lede="The site hit an error before it could finish loading. Try again."
        >
          <button
            type="button"
            className="btn btn-on-ink"
            onClick={() => retry()}
          >
            Try again
          </button>
        </ErrorShell>
      </body>
    </html>
  );
}
