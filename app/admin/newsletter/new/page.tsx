import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewsletterComposer } from "@/components/admin/newsletter-composer";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { isZeptoConfigured } from "@/lib/zeptomail";

export const metadata: Metadata = {
  title: "New newsletter — Admin",
};

export const dynamic = "force-dynamic";

export default async function NewNewsletterPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const [settings, subscriberCount] = await Promise.all([
    getSettings(),
    prisma.newsletterSubscriber.count(),
  ]);

  return (
    <div>
      <Link
        href="/admin/newsletter"
        className="text-sm font-semibold text-ink-muted hover:text-ink"
      >
        ← Newsletter
      </Link>
      <p className="section-label mb-3 mt-6">Compose</p>
      <h1 className="heading mb-3">New newsletter</h1>
      <p className="lede mb-8">
        Write the update, preview the branded email, then send a test or the
        full list.
      </p>
      <NewsletterComposer
        siteName={settings.siteName}
        tagline={settings.tagline}
        contactEmail={settings.contactEmail}
        subscriberCount={subscriberCount}
        zeptoConfigured={isZeptoConfigured()}
        testEmail={user.email}
      />
    </div>
  );
}
