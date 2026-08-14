import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/lib/generated/prisma";
import {
  asCopyBlocks,
  asExperienceEntries,
  defaultDisciplines,
  defaultExperience,
  defaultFaqs,
  defaultProcessSteps,
} from "@/lib/copy-blocks";

export type PublicSettings = SiteSettings;

export type SocialIconKey =
  | "x"
  | "github"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "facebook"
  | "discord"
  | "bluesky"
  | "mastodon"
  | "devto"
  | "hashnode"
  | "codepen"
  | "stackoverflow"
  | "dribbble"
  | "website";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconKey;
};

export const defaultSettings: Omit<SiteSettings, "updatedAt"> = {
  id: "default",
  siteName: "thatmanfrancis",
  tagline: "Building on the web — projects, writing, and craft.",
  metaDescription:
    "Francis Kossyrisochukwu Uzoigwe (thatmanfrancis) — full-stack developer in Lagos, Nigeria. Next.js, TypeScript, React, and product engineering.",
  heroEyebrow: "Engineer · Builder · Writer",
  heroTitle: "Francis — full-stack engineer.",
  heroLede:
    "I design and ship web products end to end — interfaces, APIs, and the systems that keep them online.",
  heroCtaLabel: "About me",
  heroRole: "Full-stack engineer",
  aboutTitle: "The story",
  aboutBody:
    "I build for the web — the interfaces people touch, the APIs underneath, and the details that make a product feel considered.\n\nMost of my work sits between design and engineering. I care about how a page reads, how a form behaves, and whether the thing still holds up once real users and real data show up.\n\nThis site is the public desk: selected projects, notes on shipping, and a way to get in touch.",
  aboutImageUrl: null,
  availability: "Open to collaborations",
  resumeUrl: null,
  skills: [
    "TypeScript",
    "Next.js",
    "React",
    "Prisma",
    "PostgreSQL",
    "Laravel",
    "Tailwind CSS",
  ],
  stackTitle: "Tools I ship with",
  disciplinesTitle: "What I take on",
  disciplinesLede:
    "Frontend, backend, UX, mobile, and DevOps — the work is the product, not a single layer of it.",
  disciplines: defaultDisciplines,
  processTitle: "How I work",
  processCta: "Start a project",
  processSteps: defaultProcessSteps,
  experienceTitle: "Career",
  experienceLede: "Where the work has lived, year by year.",
  experience: defaultExperience,
  faqTitle: "Common questions",
  faqLede: "Straight answers about how I work and what to expect.",
  faq: defaultFaqs,
  contactTitle: "Let's work together",
  contactLede:
    "Open to collaborations, product builds, and interesting problems.",
  contactEmail: "hello@thatmanfrancis.com",
  contactPhone: null,
  contactLocation: "Lagos, Nigeria",
  socialX: null,
  socialGithub: null,
  socialLinkedin: null,
  socialInstagram: null,
  socialYoutube: null,
  socialFacebook: null,
  socialDiscord: null,
  socialBluesky: null,
  socialMastodon: null,
  socialDevto: null,
  socialHashnode: null,
  socialCodepen: null,
  socialStackoverflow: null,
  socialDribbble: null,
  socialWebsite: null,
  footerText: "Building on the web — projects, writing, and craft.",
};

/**
 * Load site settings from the database.
 * Uses find → create (with P2002 retry) instead of upsert to avoid races when
 * metadata + page both call this concurrently under the driver adapter.
 */
export async function getSettings(): Promise<SiteSettings> {
  const existing = await ensureSiteSettings();

  return {
    ...existing,
    skills:
      existing.skills.length > 0 ? existing.skills : defaultSettings.skills,
    disciplines: asCopyBlocks(existing.disciplines, defaultDisciplines),
    processSteps: asCopyBlocks(existing.processSteps, defaultProcessSteps),
    experience: asExperienceEntries(existing.experience, defaultExperience),
    faq: asCopyBlocks(existing.faq, defaultFaqs),
  };
}

async function ensureSiteSettings(): Promise<SiteSettings> {
  const found = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });
  if (found) return found;

  try {
    return await prisma.siteSettings.create({
      data: {
        ...defaultSettings,
        disciplines: defaultDisciplines,
        processSteps: defaultProcessSteps,
        experience: defaultExperience,
        faq: defaultFaqs,
      },
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : null;
    if (code === "P2002") {
      const again = await prisma.siteSettings.findUnique({
        where: { id: "default" },
      });
      if (again) return again;
    }
    throw error;
  }
}

export function socialLinks(settings: SiteSettings): SocialLink[] {
  const candidates: Array<{
    label: string;
    href: string | null;
    icon: SocialIconKey;
  }> = [
    { label: "X", href: settings.socialX, icon: "x" },
    { label: "GitHub", href: settings.socialGithub, icon: "github" },
    { label: "LinkedIn", href: settings.socialLinkedin, icon: "linkedin" },
    { label: "Instagram", href: settings.socialInstagram, icon: "instagram" },
    { label: "YouTube", href: settings.socialYoutube, icon: "youtube" },
    { label: "Facebook", href: settings.socialFacebook, icon: "facebook" },
    { label: "Discord", href: settings.socialDiscord, icon: "discord" },
    { label: "Bluesky", href: settings.socialBluesky, icon: "bluesky" },
    { label: "Mastodon", href: settings.socialMastodon, icon: "mastodon" },
    { label: "DEV", href: settings.socialDevto, icon: "devto" },
    { label: "Hashnode", href: settings.socialHashnode, icon: "hashnode" },
    { label: "CodePen", href: settings.socialCodepen, icon: "codepen" },
    {
      label: "Stack Overflow",
      href: settings.socialStackoverflow,
      icon: "stackoverflow",
    },
    { label: "Dribbble", href: settings.socialDribbble, icon: "dribbble" },
    { label: "Website", href: settings.socialWebsite, icon: "website" },
  ];

  return candidates.flatMap((item) =>
    item.href
      ? [{ label: item.label, href: item.href, icon: item.icon }]
      : [],
  );
}
