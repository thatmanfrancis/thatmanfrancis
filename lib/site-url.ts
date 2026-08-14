/**
 * Client-safe site URL helpers (no Prisma / Node-only imports).
 * Prefer `NEXT_PUBLIC_SITE_URL` so the same origin works in browser and server.
 */

function normalizeOrigin(value: string) {
  const trimmed = value.replace(/\/+$/, "");
  try {
    const url = new URL(
      trimmed.includes("://") ? trimmed : `https://${trimmed}`,
    );
    return `${url.protocol}//${url.host}`;
  } catch {
    throw new Error(
      `Invalid site origin "${value}". Set NEXT_PUBLIC_SITE_URL to a full URL, e.g. https://francisuzoigwe.me`,
    );
  }
}

/**
 * Canonical site origin from env.
 * Set `NEXT_PUBLIC_SITE_URL` (preferred) or `SITE_URL` in `.env`.
 * Production example: https://francisuzoigwe.me
 */
export function getSiteOrigin() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();
  if (fromEnv) return normalizeOrigin(fromEnv);

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelHost) {
    return normalizeOrigin(
      vercelHost.startsWith("http") ? vercelHost : `https://${vercelHost}`,
    );
  }

  // Local/dev only — never hardcode a production domain in source.
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error(
    "Missing NEXT_PUBLIC_SITE_URL (or SITE_URL). Set it in .env to your public origin, e.g. https://francisuzoigwe.me",
  );
}

export function siteUrl(path = "/", origin = getSiteOrigin()) {
  if (!path || path === "/") return origin;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

export function absoluteAssetUrl(
  path?: string | null,
  origin = getSiteOrigin(),
) {
  const value = path?.trim();
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/placeholders/")) return undefined;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${origin}${normalized}`;
}
