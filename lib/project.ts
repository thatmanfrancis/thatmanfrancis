export const PROJECT_KINDS = [
  { value: "product", label: "Product" },
  { value: "api", label: "API" },
  { value: "mobile", label: "Mobile" },
  { value: "ux", label: "UX" },
  { value: "devops", label: "DevOps" },
  { value: "fullstack", label: "Full-stack" },
] as const;

export type ProjectKind = (typeof PROJECT_KINDS)[number]["value"];

export function kindLabel(kind?: string | null) {
  return PROJECT_KINDS.find((item) => item.value === kind)?.label ?? kind ?? "";
}

export function prettySample(raw: string) {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw.trim();
  }
}
