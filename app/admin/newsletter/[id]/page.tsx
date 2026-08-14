import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { NewsletterComposer } from "@/components/admin/newsletter-composer";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { isZeptoConfigured } from "@/lib/zeptomail";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const campaign = await prisma.newsletterCampaign.findUnique({
      where: { id },
      select: { subject: true },
    });
    return { title: campaign ? `${campaign.subject} — Admin` : "Newsletter" };
  } catch {
    return { title: "Newsletter — Admin" };
  }
}

export default async function NewsletterCampaignPage({
  params,
  searchParams,
}: Props) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const { saved } = await searchParams;

  const [campaign, settings, subscriberCount] = await Promise.all([
    prisma.newsletterCampaign.findUnique({ where: { id } }),
    getSettings(),
    prisma.newsletterSubscriber.count(),
  ]);

  if (!campaign) notFound();

  return (
    <div>
      <Link
        href="/admin/newsletter"
        className="text-sm font-semibold text-ink-muted hover:text-ink"
      >
        ← Newsletter
      </Link>
      <p className="section-label mb-3 mt-6">
        {campaign.status === "draft" ? "Draft" : campaign.status}
      </p>
      <h1 className="heading mb-3">{campaign.subject}</h1>
      <p className="lede mb-4">
        {campaign.sentAt
          ? `Sent ${formatDate(campaign.sentAt)} · ${campaign.sentCount} delivered${
              campaign.failedCount ? ` · ${campaign.failedCount} failed` : ""
            }`
          : `Created ${formatDate(campaign.createdAt)}`}
      </p>

      {saved ? (
        <p className="mb-6 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-ink">
          Draft saved.
        </p>
      ) : null}

      {campaign.lastError ? (
        <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {campaign.lastError}
        </p>
      ) : null}

      <NewsletterComposer
        campaign={campaign}
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
