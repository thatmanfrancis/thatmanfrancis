import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { runSeedAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Seed — Admin",
};

type PageProps = {
  searchParams: Promise<{ ok?: string; error?: string }>;
};

export default async function AdminSeedPage({ searchParams }: PageProps) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const params = await searchParams;

  return (
    <div>
      <p className="section-label mb-3">Tools</p>
      <h1 className="heading mb-3">Database seed</h1>
      <p className="lede mb-8 max-w-2xl">
        Creates the admin user (from{" "}
        <code className="text-base">ADMIN_EMAIL</code> /{" "}
        <code className="text-base">ADMIN_PASSWORD</code>), default settings if
        missing, and sample projects/posts. Safe to re-run — it won&apos;t wipe
        settings you already edited.
      </p>

      {params.ok ? (
        <p className="mb-6 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-ink">
          Seed finished. Sample content is ready — check Projects and Posts.
        </p>
      ) : null}
      {params.error ? (
        <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          Seed failed: {params.error}
        </p>
      ) : null}

      <div className="card-surface max-w-xl space-y-5 p-6 sm:p-8">
        <form action={runSeedAction}>
          <button type="submit" className="btn btn-primary">
            Run seed now
          </button>
        </form>
        <p className="text-sm text-ink-muted">
          No login needed for the API — open{" "}
          <Link
            href="/api/admin/seed"
            className="font-medium text-ink underline underline-offset-2"
          >
            /api/admin/seed
          </Link>{" "}
          in the browser anytime (useful before the first admin exists).
        </p>
      </div>
    </div>
  );
}
