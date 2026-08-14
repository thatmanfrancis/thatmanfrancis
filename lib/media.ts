export type MediaFit = "cover" | "contain" | "inside";

export type MediaOptions = {
  width?: number;
  height?: number;
  fit?: MediaFit;
  quality?: number;
};

export const mediaSlots = {
  "cover-row": { width: 1200, height: 900, fit: "cover" },
  "cover-detail": { width: 1600, height: 1000, fit: "cover" },
  portrait: { width: 720, height: 900, fit: "cover" },
  gallery: { width: 960, height: 720, fit: "cover" },
  content: { width: 1400, fit: "inside" },
  "admin-wide": { width: 960, height: 600, fit: "cover" },
  "admin-portrait": { width: 480, height: 600, fit: "cover" },
} as const satisfies Record<string, MediaOptions>;

export type MediaSlot = keyof typeof mediaSlots;

export function mediaUrl(src: string, options: MediaOptions = {}) {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return src;
  if (/^https?:\/\//i.test(src)) return src;

  const pathname = src.startsWith("/") ? src.slice(1) : src;
  if (
    !pathname.startsWith("uploads/") &&
    !pathname.startsWith("placeholders/")
  ) {
    return src;
  }

  if (pathname.endsWith(".svg")) return src;
  if (!options.width && !options.height) return src;

  const params = new URLSearchParams();
  if (options.width) params.set("w", String(Math.round(options.width)));
  if (options.height) params.set("h", String(Math.round(options.height)));
  if (options.fit) params.set("fit", options.fit);
  if (options.quality) params.set("q", String(options.quality));

  return `/img/${pathname}?${params.toString()}`;
}
