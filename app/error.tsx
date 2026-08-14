"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ErrorShell } from "@/components/ui/error-shell";

export default function ErrorPage({
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
    <ErrorShell
      code="500"
      title="Something broke."
      lede="The page hit an error. Try again, or go home and pick up from there."
    >
      <button type="button" className="btn btn-on-ink" onClick={() => retry()}>
        Try again
      </button>
      <Link href="/" className="btn btn-ghost-on-ink">
        Back home
      </Link>
      <Link href="/contact" className="btn btn-ghost-on-ink">
        Contact
      </Link>
    </ErrorShell>
  );
}
