export type CopyBlock = {
  title: string;
  body: string;
};

export const defaultDisciplines: CopyBlock[] = [
  {
    title: "Frontend",
    body: "Interfaces, type, and motion — pages that read clearly and feel considered.",
  },
  {
    title: "Backend",
    body: "APIs, data, and the systems that keep a product honest once real traffic arrives.",
  },
  {
    title: "UX",
    body: "The path through the product: what people need to do, and how little friction that takes.",
  },
  {
    title: "Mobile",
    body: "Native-feeling apps when the work leaves the browser.",
  },
  {
    title: "DevOps",
    body: "Ship it, watch it, keep it up — deploys, environments, and the boring reliability work.",
  },
];

export const defaultProcessSteps: CopyBlock[] = [
  {
    title: "Understand the problem",
    body: "What has to change, who it is for, and what done looks like.",
  },
  {
    title: "Shape the product",
    body: "Interface, data, and the path through the build — before the pile of tickets.",
  },
  {
    title: "Ship and stay close",
    body: "Launch, watch how people use it, and tighten what matters.",
  },
];

export const defaultFaqs: CopyBlock[] = [
  {
    title: "What kind of work do you take on?",
    body: "Full-stack product work — interfaces, APIs, and the glue between them. Best fit is a clear problem with room to ship, not endless meetings.",
  },
  {
    title: "Where are you based?",
    body: "Lagos, Nigeria. Happy to collaborate remotely with teams elsewhere when the timezone overlap works.",
  },
  {
    title: "How do projects usually start?",
    body: "A short brief or call about the problem, constraints, and deadline. If it’s a fit, we agree scope and get moving — design and build in the same pass when that helps.",
  },
  {
    title: "Do you work with existing codebases?",
    body: "Yes. Most real work is inheriting something already live — cleaning up, extending, or shipping the next slice without a rewrite for its own sake.",
  },
];

export type ExperienceEntry = {
  years: string;
  title: string;
  org: string;
  /** City / remote / where you worked. */
  location: string;
  /** Full-time, contract, freelance, etc. */
  nature: string;
  body: string;
  /** What you did in the role — shown as bullets on the timeline. */
  bullets: string[];
};

export const defaultExperience: ExperienceEntry[] = [
  {
    years: "2024 — Present",
    title: "Full-stack engineer",
    org: "Independent",
    location: "Lagos · Remote",
    nature: "Full-time",
    body: "Product interfaces, APIs, and the systems around them — for teams that need something shipped and maintainable.",
    bullets: [
      "Shipped product UIs and APIs end to end for client teams",
      "Owned deploys, data models, and the handoff from design to production",
      "Kept builds maintainable after launch — not just demos",
    ],
  },
  {
    years: "2022 — 2024",
    title: "Software engineer",
    org: "Product teams",
    location: "Lagos",
    nature: "Full-time",
    body: "Web apps end to end: React/Next fronts, Node and Laravel backs, and the handoff between design and production.",
    bullets: [
      "Built and maintained React / Next.js fronts against Node and Laravel APIs",
      "Improved forms, auth flows, and admin tools used day to day",
      "Worked with designers to get interfaces into production cleanly",
    ],
  },
  {
    years: "2020 — 2022",
    title: "Frontend developer",
    org: "Agency & freelance",
    location: "Lagos · Remote",
    nature: "Contract",
    body: "Marketing sites and product UIs — type, layout, and the details that make a page feel considered.",
    bullets: [
      "Delivered marketing sites and product interfaces on tight timelines",
      "Translated brand and layout into responsive, production-ready pages",
      "Collaborated with clients on content structure and polish",
    ],
  },
];

function asBulletList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      typeof item === "string" && item.trim() ? [item.trim()] : [],
    );
  }
  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => line.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean);
  }
  return [];
}

export function asExperienceEntries(
  value: unknown,
  fallback: ExperienceEntry[] = [],
): ExperienceEntry[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const entries = value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const years = typeof record.years === "string" ? record.years.trim() : "";
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const org = typeof record.org === "string" ? record.org.trim() : "";
    const location =
      typeof record.location === "string" ? record.location.trim() : "";
    const nature =
      typeof record.nature === "string" ? record.nature.trim() : "";
    const body = typeof record.body === "string" ? record.body.trim() : "";
    const bullets = asBulletList(record.bullets);
    return title || years
      ? [{ years, title, org, location, nature, body, bullets }]
      : [];
  });
  return entries.length > 0 ? entries : fallback;
}

export function experienceFromForm(formData: FormData, count: number) {
  const entries: ExperienceEntry[] = [];
  for (let index = 1; index <= count; index += 1) {
    const years = String(formData.get(`experienceYears${index}`) ?? "").trim();
    const title = String(formData.get(`experienceTitle${index}`) ?? "").trim();
    const org = String(formData.get(`experienceOrg${index}`) ?? "").trim();
    const location = String(
      formData.get(`experienceLocation${index}`) ?? "",
    ).trim();
    const nature = String(
      formData.get(`experienceNature${index}`) ?? "",
    ).trim();
    const body = String(formData.get(`experienceBody${index}`) ?? "").trim();
    const bullets = asBulletList(
      String(formData.get(`experienceBullets${index}`) ?? ""),
    );
    if (title || years) {
      entries.push({ years, title, org, location, nature, body, bullets });
    }
  }
  return entries;
}

export function asCopyBlocks(
  value: unknown,
  fallback: CopyBlock[] = [],
): CopyBlock[] {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const blocks = value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const body = typeof record.body === "string" ? record.body.trim() : "";
    return title ? [{ title, body }] : [];
  });
  return blocks.length > 0 ? blocks : fallback;
}

export function copyBlocksFromForm(
  formData: FormData,
  prefix: string,
  count: number,
) {
  const blocks: CopyBlock[] = [];
  for (let index = 1; index <= count; index += 1) {
    const title = String(formData.get(`${prefix}Title${index}`) ?? "").trim();
    const body = String(formData.get(`${prefix}Body${index}`) ?? "").trim();
    if (title) blocks.push({ title, body });
  }
  return blocks;
}
