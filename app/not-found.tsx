import type { Metadata } from "next";
import Link from "next/link";
import { ErrorShell } from "@/components/ui/error-shell";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const settings = await getSettings();

  return (
    <ErrorShell
      code="404"
      title="This page isn't here."
      lede="The link may be old, or the page moved. Work, writing, and a way to reach me are still on the site."
      siteName={settings.siteName}
    >
      <Link href="/" className="btn btn-on-ink">
        Back home
      </Link>
      <Link href="/work" className="btn btn-ghost-on-ink">
        See work
      </Link>
      <Link href="/contact" className="btn btn-ghost-on-ink">
        Contact
      </Link>
    </ErrorShell>
  );
}
