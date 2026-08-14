import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  if (!user) {
    return (
      <div className="min-h-screen bg-muted">
        <header className="border-b border-border bg-white">
          <div className="container-page flex items-center justify-between gap-4 py-4">
            <Link
              href="/"
              prefetch={false}
              className="text-lg font-bold text-ink"
            >
              thatmanfrancis
            </Link>
          </div>
        </header>
        <main className="container-page py-10 sm:py-14">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b border-border bg-white">
        <div className="container-page flex items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/admin"
              prefetch={false}
              className="text-lg font-bold text-ink"
            >
              Admin
            </Link>
            <nav className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/admin/projects" className="nav-link text-sm">
                Projects
              </Link>
              <Link href="/admin/posts" className="nav-link text-sm">
                Posts
              </Link>
              <Link href="/admin/messages" className="nav-link text-sm">
                Messages
              </Link>
              <Link href="/admin/newsletter" className="nav-link text-sm">
                Newsletter
              </Link>
              <Link href="/admin/settings" className="nav-link text-sm">
                Settings
              </Link>
              <Link href="/admin/seed" className="nav-link text-sm">
                Seed
              </Link>
              <Link href="/" className="nav-link text-sm">
                View site
              </Link>
            </nav>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="btn btn-ghost py-2 text-sm">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="container-page py-10 sm:py-14">{children}</main>
    </div>
  );
}
