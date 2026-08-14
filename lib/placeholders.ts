export const PLACEHOLDER_PORTRAIT = "/placeholders/portrait.svg";

export const PLACEHOLDER_COVERS = [
  "/placeholders/cover-1.svg",
  "/placeholders/cover-2.svg",
  "/placeholders/cover-3.svg",
  "/placeholders/cover-4.svg",
] as const;

export function placeholderCover(seed = "") {
  const total = PLACEHOLDER_COVERS.length;
  const index = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return PLACEHOLDER_COVERS[index % total];
}

export function portraitSrc(url?: string | null) {
  return url?.trim() || PLACEHOLDER_PORTRAIT;
}

export function coverSrc(url?: string | null, seed = "") {
  return url?.trim() || placeholderCover(seed);
}
