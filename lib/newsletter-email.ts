import { getSiteOrigin, siteUrl } from "@/lib/site-url";

export type NewsletterEmailInput = {
  siteName: string;
  tagline?: string | null;
  subject: string;
  previewText?: string | null;
  body: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  recipientName?: string;
  contactEmail?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Lightweight Markdown for email bodies: paragraphs, bold, italic, links, lists, headings. */
export function markdownToEmailHtml(markdown: string) {
  const blocks = markdown
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((line) => /^[-*]\s+/.test(line.trim()))) {
        const items = lines
          .map((line) => {
            const text = line.replace(/^[-*]\s+/, "").trim();
            return `<li style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#525252;font-weight:300;">${inlineMarkdown(text)}</li>`;
          })
          .join("");
        return `<ul style="margin:0 0 20px;padding-left:22px;">${items}</ul>`;
      }

      if (/^###\s+/.test(block)) {
        return `<h3 style="margin:0 0 12px;font-size:18px;line-height:1.3;color:#0a0a0a;font-weight:700;">${inlineMarkdown(block.replace(/^###\s+/, ""))}</h3>`;
      }
      if (/^##\s+/.test(block)) {
        return `<h2 style="margin:0 0 14px;font-size:22px;line-height:1.25;color:#0a0a0a;font-weight:700;">${inlineMarkdown(block.replace(/^##\s+/, ""))}</h2>`;
      }
      if (/^#\s+/.test(block)) {
        return `<h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#0a0a0a;font-weight:700;">${inlineMarkdown(block.replace(/^#\s+/, ""))}</h1>`;
      }

      const paragraph = lines.map((line) => inlineMarkdown(line)).join("<br />");
      return `<p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#525252;font-weight:300;">${paragraph}</p>`;
    })
    .join("");
}

function inlineMarkdown(value: string) {
  let html = escapeHtml(value);
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g,
    (_match, label: string, href: string) =>
      `<a href="${escapeHtml(href)}" style="color:#0a0a0a;font-weight:600;text-decoration:underline;">${label}</a>`,
  );
  html = html.replace(
    /\*\*([^*]+)\*\*/g,
    "<strong style=\"font-weight:700;color:#0a0a0a;\">$1</strong>",
  );
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return html;
}

export function newsletterTextBody(input: NewsletterEmailInput) {
  const origin = getSiteOrigin();
  const parts = [
    input.subject,
    "",
    input.body,
    "",
    input.ctaLabel && input.ctaUrl
      ? `${input.ctaLabel}: ${absoluteMaybe(input.ctaUrl, origin)}`
      : "",
    "",
    `— ${input.siteName}`,
    siteUrl("/", origin),
  ];
  return parts.filter((part) => part !== "").join("\n");
}

export function renderNewsletterEmail(input: NewsletterEmailInput) {
  const origin = getSiteOrigin();
  const greeting = input.recipientName
    ? `Hi ${escapeHtml(input.recipientName.split(" ")[0] || input.recipientName)},`
    : "Hi there,";
  const bodyHtml = markdownToEmailHtml(input.body);
  const ctaHref =
    input.ctaLabel && input.ctaUrl
      ? absoluteMaybe(input.ctaUrl, origin)
      : null;
  const preview = escapeHtml(
    input.previewText?.trim() || input.subject.trim(),
  );
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(input.subject)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#f5f5f5;color:#0a0a0a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preview}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:28px;overflow:hidden;border:1px solid #e5e5e5;">
          <tr>
            <td style="background:#0a0a0a;padding:36px 32px 40px;color:#ffffff;">
              <img
                src="${escapeHtml(siteUrl("/brand/monoline-fku-white.png", origin))}"
                width="52"
                height="74"
                alt="${escapeHtml(input.siteName)}"
                style="display:block;margin:0 0 18px;border:0;outline:none;height:74px;width:auto;"
              />
              <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.55);font-family:Arial,Helvetica,sans-serif;">
                ${escapeHtml(input.siteName)}
              </p>
              <h1 style="margin:0;font-size:30px;line-height:1.2;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
                ${escapeHtml(input.subject)}
              </h1>
              ${
                input.tagline
                  ? `<p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.75);font-weight:300;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(input.tagline)}</p>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 20px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#0a0a0a;font-weight:600;">
                ${greeting}
              </p>
              ${bodyHtml}
              ${
                ctaHref
                  ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;">
                      <tr>
                        <td style="border-radius:999px;background:#0a0a0a;">
                          <a href="${escapeHtml(ctaHref)}" style="display:inline-block;padding:14px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">
                            ${escapeHtml(input.ctaLabel || "Read more")}
                          </a>
                        </td>
                      </tr>
                    </table>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 36px;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e5e5;">
                <tr>
                  <td style="padding-top:24px;">
                    <img
                      src="${escapeHtml(siteUrl("/brand/monoline-fku.png", origin))}"
                      width="44"
                      height="64"
                      alt=""
                      style="display:block;margin:0 0 12px;border:0;outline:none;height:64px;width:auto;"
                    />
                    <p style="margin:0 0 8px;font-size:14px;line-height:1.5;color:#0a0a0a;font-weight:700;">
                      ${escapeHtml(input.siteName)}
                    </p>
                    <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:#525252;font-weight:300;">
                      <a href="${escapeHtml(siteUrl("/", origin))}" style="color:#0a0a0a;text-decoration:underline;">Home</a>
                      &nbsp;·&nbsp;
                      <a href="${escapeHtml(siteUrl("/work", origin))}" style="color:#0a0a0a;text-decoration:underline;">Work</a>
                      &nbsp;·&nbsp;
                      <a href="${escapeHtml(siteUrl("/blog", origin))}" style="color:#0a0a0a;text-decoration:underline;">Blog</a>
                      &nbsp;·&nbsp;
                      <a href="${escapeHtml(siteUrl("/contact", origin))}" style="color:#0a0a0a;text-decoration:underline;">Contact</a>
                    </p>
                    ${
                      input.contactEmail
                        ? `<p style="margin:0 0 12px;font-size:13px;color:#525252;font-weight:300;">
                            Reply anytime: <a href="mailto:${escapeHtml(input.contactEmail)}" style="color:#0a0a0a;text-decoration:underline;">${escapeHtml(input.contactEmail)}</a>
                          </p>`
                        : ""
                    }
                    <p style="margin:0;font-size:12px;line-height:1.5;color:#737373;font-weight:300;">
                      You’re receiving this because you subscribed on ${escapeHtml(input.siteName)}.
                      © ${year} ${escapeHtml(input.siteName)}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function absoluteMaybe(href: string, origin: string) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/")) return `${origin}${href}`;
  return href;
}
