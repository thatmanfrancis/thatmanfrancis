export function isTurnstileConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() &&
      process.env.TURNSTILE_SECRET?.trim(),
  );
}

export function turnstileSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
}

export async function verifyTurnstileToken(
  token: string | null | undefined,
  options: { action: string; remoteip?: string },
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!isTurnstileConfigured()) {
    return { ok: true };
  }

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048
  ) {
    return { ok: false, reason: "missing_token" };
  }

  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "localhost,127.0.0.1")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET!.trim(),
      response: token,
    });
    if (options.remoteip && options.remoteip !== "unknown") {
      body.set("remoteip", options.remoteip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) {
      return { ok: false, reason: "siteverify_http" };
    }

    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };

    if (!result.success) {
      return { ok: false, reason: "not_success" };
    }

    if (result.action && result.action !== options.action) {
      return { ok: false, reason: "bad_action" };
    }

    if (
      result.hostname &&
      expectedHostnames.size > 0 &&
      !expectedHostnames.has(result.hostname)
    ) {
      return { ok: false, reason: "bad_hostname" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}

export function turnstileTokenFromForm(formData: FormData) {
  const value = formData.get("cf-turnstile-response");
  return typeof value === "string" ? value : null;
}

/** Honeypot: bots fill hidden "company" / "website" fields. */
export function isHoneypotTripped(formData: FormData) {
  const company = formData.get("company");
  const website = formData.get("website");
  return (
    (typeof company === "string" && company.trim().length > 0) ||
    (typeof website === "string" && website.trim().length > 0)
  );
}
