import {
  getZeptoConfig,
  sendZeptoBatch,
  sendZeptoSingle,
} from "@/lib/zeptomail";
import {
  newsletterTextBody,
  renderNewsletterEmail,
  type NewsletterEmailInput,
} from "@/lib/newsletter-email";

const BATCH_SIZE = 50;

export type NewsletterAudienceMember = {
  email: string;
  fullName: string;
};

export function buildNewsletterEmail(
  input: Omit<NewsletterEmailInput, "recipientName">,
  recipientName?: string,
) {
  return renderNewsletterEmail({ ...input, recipientName });
}

export async function sendNewsletterToAudience(options: {
  audience: NewsletterAudienceMember[];
  email: Omit<NewsletterEmailInput, "recipientName">;
}) {
  const config = getZeptoConfig();
  if (!config) {
    throw new Error(
      "ZeptoMail is not configured. Set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_EMAIL.",
    );
  }

  const from = { address: config.fromEmail, name: config.fromName };
  const reply_to = config.replyTo
    ? [{ address: config.replyTo, name: config.fromName }]
    : undefined;

  // ZeptoMail merge_info replaces {{first_name}} per recipient.
  const htmlbody = renderNewsletterEmail({
    ...options.email,
    recipientName: "{{first_name}}",
  });
  const textbody = newsletterTextBody(options.email);

  let sentCount = 0;
  let failedCount = 0;
  let lastError: string | null = null;

  for (let i = 0; i < options.audience.length; i += BATCH_SIZE) {
    const chunk = options.audience.slice(i, i + BATCH_SIZE);
    try {
      await sendZeptoBatch({
        from,
        reply_to,
        subject: options.email.subject,
        htmlbody,
        textbody,
        to: chunk.map((member) => ({
          email_address: {
            address: member.email,
            name: member.fullName,
          },
          merge_info: {
            first_name: member.fullName.split(/\s+/)[0] || member.fullName,
          },
        })),
      });
      sentCount += chunk.length;
    } catch (error) {
      failedCount += chunk.length;
      lastError =
        error instanceof Error ? error.message : "Failed to send batch";
    }
  }

  return { sentCount, failedCount, lastError };
}

export async function sendNewsletterTest(options: {
  toEmail: string;
  toName?: string;
  email: Omit<NewsletterEmailInput, "recipientName">;
}) {
  const config = getZeptoConfig();
  if (!config) {
    throw new Error(
      "ZeptoMail is not configured. Set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_EMAIL.",
    );
  }

  const htmlbody = buildNewsletterEmail(
    options.email,
    options.toName || "there",
  );
  const textbody = newsletterTextBody(options.email);

  await sendZeptoSingle({
    from: { address: config.fromEmail, name: config.fromName },
    to: {
      address: options.toEmail,
      name: options.toName,
    },
    reply_to: config.replyTo
      ? [{ address: config.replyTo, name: config.fromName }]
      : undefined,
    subject: `[Test] ${options.email.subject}`,
    htmlbody,
    textbody,
  });
}
