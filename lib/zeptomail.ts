type ZeptoAddress = {
  address: string;
  name?: string;
};

type ZeptoRecipient = {
  email_address: ZeptoAddress;
  merge_info?: Record<string, string>;
};

type SendBatchInput = {
  from: ZeptoAddress;
  to: ZeptoRecipient[];
  subject: string;
  htmlbody: string;
  textbody?: string;
  reply_to?: ZeptoAddress[];
};

export type ZeptoConfig = {
  token: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  apiBase: string;
};

export function getZeptoConfig(): ZeptoConfig | null {
  const token = process.env.ZEPTOMAIL_TOKEN?.trim();
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL?.trim();
  if (!token || !fromEmail) return null;

  return {
    token: process.env.ZEPTOMAIL_TOKEN?.trim() || "",
    fromEmail,
    fromName:
      process.env.ZEPTOMAIL_FROM_NAME?.trim() ||
      process.env.ADMIN_NAME?.trim() ||
      "thatmanfrancis",
    replyTo: process.env.ZEPTOMAIL_REPLY_TO?.trim() || undefined,
    apiBase: (
      process.env.ZEPTOMAIL_API_BASE?.trim() || "https://api.zeptomail.com/v1.1"
    ).replace(/\/$/, ""),
  };
}

export function isZeptoConfigured() {
  return getZeptoConfig() !== null;
}

export async function sendZeptoBatch(input: SendBatchInput) {
  const config = getZeptoConfig();
  if (!config) {
    throw new Error(
      "ZeptoMail is not configured. Set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_EMAIL.",
    );
  }

  const payload = {
    from: {
      address: input.from.address,
      name: input.from.name,
    },
    to: input.to,
    subject: input.subject,
    htmlbody: input.htmlbody,
    textbody: input.textbody,
    reply_to: input.reply_to,
    track_clicks: true,
    track_opens: true,
  };

  const response = await fetch(`${config.apiBase}/email/batch`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Zoho-enczapikey ${config.token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | { message?: string; error?: { message?: string; code?: string } }
    | null;

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.message ||
      `ZeptoMail request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function sendZeptoSingle(input: {
  from: ZeptoAddress;
  to: ZeptoAddress;
  subject: string;
  htmlbody: string;
  textbody?: string;
  reply_to?: ZeptoAddress[];
}) {
  const config = getZeptoConfig();
  if (!config) {
    throw new Error(
      "ZeptoMail is not configured. Set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_EMAIL.",
    );
  }

  const response = await fetch(`${config.apiBase}/email`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${config.token}`,
    },
    body: JSON.stringify({
      from: input.from,
      to: [{ email_address: input.to }],
      subject: input.subject,
      htmlbody: input.htmlbody,
      textbody: input.textbody,
      reply_to: input.reply_to,
      track_clicks: true,
      track_opens: true,
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | { message?: string; error?: { message?: string } }
    | null;

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        data?.message ||
        `ZeptoMail request failed (${response.status})`,
    );
  }

  return data;
}
