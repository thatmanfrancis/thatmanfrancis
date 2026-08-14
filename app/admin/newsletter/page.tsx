import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteSubscriberAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { isZeptoConfigured } from "@/lib/zeptomail";

export const metadata: Metadata = {
  title: "Newsletter — Admin",
};

export const dynamic = "force-dynamic";

function statusLabel(status: string) {
  if (status === "sent") return "Sent";
  if (status === "sending") return "Sending";
  if (status === "failed") return "Failed";
  return "Draft";
}

export default async function AdminNewsletterPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const [subscribers, campaigns] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.newsletterCampaign.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const zeptoReady = isZeptoConfigured();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-label mb-3">Audience</p>
          <h1 className="heading mb-3">Newsletter</h1>
          <p className="lede">
            Compose updates, preview them, and send through ZeptoMail.
          </p>
        </div>
        <Link href="/admin/newsletter/new" className="btn btn-primary">
          New newsletter
        </Link>
      </div>

      {!zeptoReady ? (
        <p className="mt-6 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-ink">
          Add <code className="rounded bg-white px-1.5 py-0.5 text-xs">ZEPTOMAIL_TOKEN</code>{" "}
          and{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">
            ZEPTOMAIL_FROM_EMAIL
          </code>{" "}
          in <code className="rounded bg-white px-1.5 py-0.5 text-xs">.env</code>{" "}
          to enable sending.
        </p>
      ) : null}

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Campaigns</h2>
          <p className="text-sm text-ink-muted">{campaigns.length} total</p>
        </div>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <article
              key={campaign.id}
              className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="section-label text-sm">
                  {statusLabel(campaign.status)}
                  {campaign.sentAt
                    ? ` · ${formatDate(campaign.sentAt)}`
                    : ` · ${formatDate(campaign.createdAt)}`}
                </p>
                <h3 className="mt-1 text-xl font-bold">{campaign.subject}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {campaign.status === "draft"
                    ? "Draft"
                    : `${campaign.sentCount} sent${
                        campaign.failedCount
                          ? ` · ${campaign.failedCount} failed`
                          : ""
                      }`}
                </p>
              </div>
              <Link
                href={`/admin/newsletter/${campaign.id}`}
                className="btn btn-ghost py-2 text-sm"
              >
                {campaign.status === "draft" ? "Edit" : "View"}
              </Link>
            </article>
          ))}
          {campaigns.length === 0 ? (
            <p className="body-text">
              No campaigns yet.{" "}
              <Link href="/admin/newsletter/new" className="link">
                Write the first one
              </Link>
              .
            </p>
          ) : null}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Subscribers</h2>
          <p className="text-sm text-ink-muted">{subscribers.length} people</p>
        </div>
        <div className="space-y-4">
          {subscribers.map((subscriber) => (
            <article
              key={subscriber.id}
              className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{subscriber.fullName}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {subscriber.email} · {formatDate(subscriber.createdAt)}
                </p>
              </div>
              <form action={deleteSubscriberAction}>
                <input type="hidden" name="id" value={subscriber.id} />
                <button type="submit" className="btn btn-ghost py-2 text-sm">
                  Remove
                </button>
              </form>
            </article>
          ))}
          {subscribers.length === 0 ? (
            <p className="body-text">No subscribers yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
