"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  saveNewsletterCampaignAction,
  sendNewsletterCampaignAction,
  sendNewsletterTestAction,
} from "@/app/admin/actions";
import { FieldLabel } from "@/components/ui/form";
import { renderNewsletterEmail } from "@/lib/newsletter-email";

type NewsletterComposerProps = {
  campaign?: {
    id: string;
    subject: string;
    previewText: string | null;
    body: string;
    ctaLabel: string | null;
    ctaUrl: string | null;
    status: string;
  } | null;
  siteName: string;
  tagline?: string | null;
  contactEmail?: string | null;
  subscriberCount: number;
  zeptoConfigured: boolean;
  testEmail?: string | null;
};

export function NewsletterComposer({
  campaign,
  siteName,
  tagline,
  contactEmail,
  subscriberCount,
  zeptoConfigured,
  testEmail,
}: NewsletterComposerProps) {
  const [subject, setSubject] = useState(campaign?.subject ?? "");
  const [previewText, setPreviewText] = useState(campaign?.previewText ?? "");
  const [body, setBody] = useState(
    campaign?.body ??
      "A short update from the desk.\n\n**What shipped**\n- One shipped thing\n- Another note worth sharing\n\nMore soon.",
  );
  const [ctaLabel, setCtaLabel] = useState(campaign?.ctaLabel ?? "Read more");
  const [ctaUrl, setCtaUrl] = useState(campaign?.ctaUrl ?? "/blog");
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const canEdit = !campaign || campaign.status === "draft";
  const previewHtml = useMemo(
    () =>
      renderNewsletterEmail({
        siteName,
        tagline,
        subject: subject.trim() || "Untitled newsletter",
        previewText,
        body: body.trim() || "_Add some content to preview._",
        ctaLabel: ctaLabel.trim() || null,
        ctaUrl: ctaUrl.trim() || null,
        contactEmail,
        recipientName: "Francis",
      }),
    [siteName, tagline, subject, previewText, body, ctaLabel, ctaUrl, contactEmail],
  );

  function run(
    action: (formData: FormData) => Promise<{ ok: true; message: string } | { ok: false; message: string }>,
    extras?: Record<string, string>,
  ) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      if (campaign?.id) formData.set("id", campaign.id);
      formData.set("subject", subject);
      formData.set("previewText", previewText);
      formData.set("body", body);
      formData.set("ctaLabel", ctaLabel);
      formData.set("ctaUrl", ctaUrl);
      if (extras) {
        for (const [key, value] of Object.entries(extras)) {
          formData.set(key, value);
        }
      }
      const result = await action(formData);
      if (result.ok) {
        setMessage(result.message);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <div className="space-y-6">
      {!zeptoConfigured ? (
        <p className="rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-ink">
          ZeptoMail is not configured yet. Add{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">ZEPTOMAIL_TOKEN</code>{" "}
          and{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">
            ZEPTOMAIL_FROM_EMAIL
          </code>{" "}
          to <code className="rounded bg-white px-1.5 py-0.5 text-xs">.env</code>{" "}
          before sending.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn py-2 text-sm ${tab === "edit" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setTab("edit")}
        >
          Edit
        </button>
        <button
          type="button"
          className={`btn py-2 text-sm ${tab === "preview" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
      </div>

      {tab === "edit" ? (
        <div className="card-surface space-y-5 p-6 sm:p-8">
          <div>
            <FieldLabel htmlFor="subject" required>
              Subject
            </FieldLabel>
            <input
              id="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              disabled={!canEdit || pending}
              className="field-input"
              placeholder="What shipped this month"
            />
          </div>

          <div>
            <FieldLabel htmlFor="previewText">Preview text</FieldLabel>
            <input
              id="previewText"
              value={previewText}
              onChange={(event) => setPreviewText(event.target.value)}
              disabled={!canEdit || pending}
              className="field-input"
              placeholder="Shown in inbox next to the subject"
            />
          </div>

          <div>
            <FieldLabel htmlFor="body" required>
              Body
            </FieldLabel>
            <textarea
              id="body"
              rows={14}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              disabled={!canEdit || pending}
              className="field-input font-mono text-sm"
              placeholder={"Write in Markdown.\n\n## Heading\nA short paragraph.\n\n- Bullet one\n- Bullet two"}
            />
            <p className="mt-2 text-sm text-ink-muted">
              Supports headings, bold, italic, links, and lists.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="ctaLabel">Button label</FieldLabel>
              <input
                id="ctaLabel"
                value={ctaLabel}
                onChange={(event) => setCtaLabel(event.target.value)}
                disabled={!canEdit || pending}
                className="field-input"
                placeholder="Read more"
              />
            </div>
            <div>
              <FieldLabel htmlFor="ctaUrl">Button URL</FieldLabel>
              <input
                id="ctaUrl"
                value={ctaUrl}
                onChange={(event) => setCtaUrl(event.target.value)}
                disabled={!canEdit || pending}
                className="field-input"
                placeholder="/blog or https://..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          <iframe
            title="Newsletter preview"
            srcDoc={previewHtml}
            className="h-[42rem] w-full bg-muted"
          />
        </div>
      )}

      {message ? (
        <p className="rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-ink">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {canEdit ? (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={pending || !subject.trim() || !body.trim()}
            onClick={() => run(saveNewsletterCampaignAction)}
          >
            {pending ? "Saving..." : campaign ? "Save draft" : "Create draft"}
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            disabled={
              pending ||
              !zeptoConfigured ||
              !subject.trim() ||
              !body.trim() ||
              !testEmail
            }
            onClick={() =>
              run(sendNewsletterTestAction, {
                testEmail: testEmail || "",
              })
            }
          >
            Send test to me
          </button>

          <button
            type="button"
            className="btn btn-primary"
            disabled={
              pending ||
              !zeptoConfigured ||
              !subject.trim() ||
              !body.trim() ||
              subscriberCount === 0
            }
            onClick={() => {
              if (
                !window.confirm(
                  `Send this newsletter to ${subscriberCount} subscriber${subscriberCount === 1 ? "" : "s"}?`,
                )
              ) {
                return;
              }
              run(sendNewsletterCampaignAction);
            }}
          >
            {pending
              ? "Sending..."
              : `Send to ${subscriberCount} subscriber${subscriberCount === 1 ? "" : "s"}`}
          </button>
        </div>
      ) : (
        <p className="body-text">
          This campaign is marked <strong>{campaign?.status}</strong> and can no
          longer be edited.
        </p>
      )}

      {!canEdit ? null : (
        <p className="text-sm text-ink-muted">
          Saving creates or updates a draft. Sending saves first, then emails
          everyone on the list through ZeptoMail.
        </p>
      )}
    </div>
  );
}
