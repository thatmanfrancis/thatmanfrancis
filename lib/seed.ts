import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { defaultSettings } from "@/lib/settings";
import {
  defaultDisciplines,
  defaultExperience,
  defaultFaqs,
  defaultProcessSteps,
} from "@/lib/copy-blocks";

const sampleProjects = [
  {
    title: "Lemonwares",
    slug: "lemonwares",
    summary:
      "Hosting, email, and custom development site with a distinctive hero and admin CMS.",
    description:
      "A full marketing site and admin for Lemonwares — hosting plans, intake flows, and content management built for a bilingual product presence.",
    stack: ["Laravel", "Tailwind CSS", "PostgreSQL"],
    role: "Full-stack engineer",
    year: "2026",
    problem:
      "A hosting and development brand needed a distinctive public site with bilingual content and an admin CMS.",
    outcome:
      "A marketing site and admin that presents plans, intake, and content without a generic template look.",
    projectUrl: "https://lemonwares.com",
    coverUrl: "/placeholders/cover-1.svg",
    kind: "product",
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    title: "thatmanfrancis",
    slug: "thatmanfrancis",
    summary:
      "This portfolio — a Next.js site with Prisma, an admin CMS, and room to grow.",
    description:
      "A personal site for selected work and writing. Projects, posts, and copy are edited from admin so the public pages stay current without a redeploy for every change.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    role: "Designer / engineer",
    year: "2026",
    problem:
      "I needed a public home for work and notes that I could update myself, without treating every sentence as a code change.",
    outcome:
      "A fast public site plus a small admin for projects, posts, and settings.",
    coverUrl: "/placeholders/cover-2.svg",
    kind: "fullstack",
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    title: "Studio OS",
    slug: "studio-os",
    summary:
      "A sample product case study — replace this with a real build when you're ready.",
    description:
      "Placeholder case study for a studio operations dashboard: clients, timelines, and files in one place. Swap the copy, stack, and cover from Admin → Projects.",
    stack: ["React", "TypeScript", "PostgreSQL"],
    role: "Product engineer",
    year: "2025",
    problem:
      "Teams were tracking work across chat, spreadsheets, and inboxes — nothing had a single source of truth.",
    outcome:
      "A calm dashboard that made status obvious and cut the back-and-forth around every project.",
    coverUrl: "/placeholders/cover-3.svg",
    kind: "product",
    featured: false,
    published: true,
    sortOrder: 3,
  },
  {
    title: "Intake API",
    slug: "intake-api",
    summary:
      "A sample API case study — forms, validation, and a clean admin for incoming work.",
    description:
      "Placeholder write-up for an intake API: public forms, validated payloads, and an admin queue. Replace it with a shipped project from Admin → Projects.",
    stack: ["Node.js", "Prisma", "PostgreSQL"],
    role: "Backend engineer",
    year: "2025",
    problem:
      "Leads arrived as unstructured email, so follow-up was slow and easy to miss.",
    outcome: "Structured intake, a review queue, and fewer lost conversations.",
    coverUrl: "/placeholders/cover-4.svg",
    kind: "api",
    endpoint: "POST /v1/leads",
    apiSample: `{
  "ok": true,
  "lead": {
    "id": "lead_9f2k",
    "name": "Adaeze Okonkwo",
    "email": "adaeze@studio.example",
    "source": "website",
    "status": "queued",
    "createdAt": "2026-08-13T12:04:11.000Z"
  }
}`,
    featured: false,
    published: true,
    sortOrder: 4,
  },
];

const samplePosts = [
  {
    title: "Hello, portfolio",
    slug: "hello-portfolio",
    excerpt:
      "A short note on shipping this site with Next.js, Prisma, and Postgres.",
    content:
      "This portfolio is powered by Next.js and a Postgres database via Prisma.\n\nProjects and posts are managed from a small admin area — so the public site stays current without redeploying for every content change.\n\nReplace this post when you have something you'd rather lead with.",
    coverUrl: "/placeholders/cover-2.svg",
    published: true,
    publishedAt: new Date("2026-08-01"),
  },
  {
    title: "Shipping in public",
    slug: "shipping-in-public",
    excerpt:
      "Why a small public site is useful while the real work is still moving.",
    content:
      "A public site does not have to wait for a perfect archive of work.\n\nIt can hold a few honest case studies, a photo, and a way to reach you — then grow as you ship. This post is sample writing so the blog already looks like a blog.\n\nEdit or unpublish it from Admin → Posts whenever you like.",
    coverUrl: "/placeholders/cover-3.svg",
    published: true,
    publishedAt: new Date("2026-07-18"),
  },
  {
    title: "Notes on interfaces",
    slug: "notes-on-interfaces",
    excerpt:
      "A placeholder essay on type, space, and making pages feel considered.",
    content:
      "The pages people remember are rarely the loudest ones. They are the ones that read clearly, move with a little patience, and stay out of the way.\n\nThis is sample copy so you can see a post with a cover, an excerpt, and a body. Swap it for a real note from Admin → Posts.",
    coverUrl: "/placeholders/cover-4.svg",
    published: true,
    publishedAt: new Date("2026-06-04"),
  },
];

async function fillProject(project: (typeof sampleProjects)[number]) {
  const existing = await prisma.project.findUnique({
    where: { slug: project.slug },
  });

  if (!existing) {
    await prisma.project.create({ data: project });
    return { slug: project.slug, created: true };
  }

  await prisma.project.update({
    where: { slug: project.slug },
    data: {
      coverUrl: existing.coverUrl ?? project.coverUrl,
      role: existing.role ?? project.role,
      year: existing.year ?? project.year,
      problem: existing.problem ?? project.problem,
      outcome: existing.outcome ?? project.outcome,
      kind: existing.kind ?? project.kind ?? null,
      endpoint:
        existing.endpoint ??
        ("endpoint" in project ? project.endpoint : null) ??
        null,
      apiSample:
        existing.apiSample ??
        ("apiSample" in project ? project.apiSample : null) ??
        null,
    },
  });
  return { slug: project.slug, created: false };
}

async function fillPost(post: (typeof samplePosts)[number]) {
  const existing = await prisma.post.findUnique({
    where: { slug: post.slug },
  });

  if (!existing) {
    await prisma.post.create({ data: post });
    return { slug: post.slug, created: true };
  }

  await prisma.post.update({
    where: { slug: post.slug },
    data: {
      coverUrl: existing.coverUrl ?? post.coverUrl,
    },
  });
  return { slug: post.slug, created: false };
}

export type SeedResult = {
  adminEmail: string;
  settingsCreated: boolean;
  projects: Array<{ slug: string; created: boolean }>;
  posts: Array<{ slug: string; created: boolean }>;
};

/**
 * Idempotent seed: creates missing sample content / admin / settings.
 * Does not wipe existing settings or overwrite filled project fields.
 * Does not reset admin password on re-run (unless SEED_RESET_ADMIN_PASSWORD=1).
 */
export async function runDatabaseSeed(): Promise<SeedResult> {
  const email = (
    process.env.ADMIN_EMAIL ?? "admin@thatmanfrancis.com"
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "changeme";
  const name = process.env.ADMIN_NAME ?? "Francis";
  const passwordHash = await bcrypt.hash(password, 12);
  const resetPassword =
    process.env.SEED_RESET_ADMIN_PASSWORD === "1" ||
    process.env.SEED_RESET_ADMIN_PASSWORD === "true";

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    await prisma.user.create({
      data: { email, passwordHash, name },
    });
  } else if (resetPassword) {
    await prisma.user.update({
      where: { email },
      data: { passwordHash, name },
    });
  } else if (name && existingUser.name !== name) {
    await prisma.user.update({
      where: { email },
      data: { name },
    });
  }

  const existingSettings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
    select: { id: true },
  });

  let settingsCreated = false;
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        ...defaultSettings,
        disciplines: defaultDisciplines,
        processSteps: defaultProcessSteps,
        experience: defaultExperience,
        faq: defaultFaqs,
      },
    });
    settingsCreated = true;
  }

  const projects: SeedResult["projects"] = [];
  for (const project of sampleProjects) {
    projects.push(await fillProject(project));
  }

  const posts: SeedResult["posts"] = [];
  for (const post of samplePosts) {
    posts.push(await fillPost(post));
  }

  return {
    adminEmail: email,
    settingsCreated,
    projects,
    posts,
  };
}
