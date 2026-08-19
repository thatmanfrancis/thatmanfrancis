"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  loginAdmin,
  requireAdmin,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseList, slugify } from "@/lib/utils";
import { copyBlocksFromForm, experienceFromForm } from "@/lib/copy-blocks";
import { getSettings } from "@/lib/settings";
import {
  sendNewsletterTest,
  sendNewsletterToAudience,
} from "@/lib/newsletter-send";
import { isZeptoConfigured } from "@/lib/zeptomail";

function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function formBool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function parseStack(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function loginAction(formData: FormData) {
  const { clientIp, rateLimit } = await import("@/lib/rate-limit");
  const ip = await clientIp();
  const limited = rateLimit(`login:${ip}`, 8, 15 * 60 * 1000);
  if (!limited.ok) {
    redirect("/admin/login?error=rate");
  }

  const email = formString(formData, "email").toLowerCase();
  const password = formString(formData, "password");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  const user = await loginAdmin(email, password);
  if (!user) {
    redirect("/admin/login?error=invalid");
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function runSeedAction() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  try {
    const { runDatabaseSeed } = await import("@/lib/seed");
    await runDatabaseSeed();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Seed failed";
    redirect(`/admin/seed?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/blog");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/posts");
  redirect("/admin/seed?ok=1");
}

export async function upsertProjectAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  const title = formString(formData, "title");
  const summary = formString(formData, "summary");
  const description = formString(formData, "description");
  const coverUrl = formString(formData, "coverUrl") || null;
  const projectUrl = formString(formData, "projectUrl") || null;
  const repoUrl = formString(formData, "repoUrl") || null;
  const stack = parseStack(formString(formData, "stack"));
  const role = formString(formData, "role") || null;
  const year = formString(formData, "year") || null;
  const problem = formString(formData, "problem") || null;
  const outcome = formString(formData, "outcome") || null;
  const kind = formString(formData, "kind") || null;
  const endpoint = formString(formData, "endpoint") || null;
  const apiSample = formString(formData, "apiSample") || null;
  const featured = formBool(formData, "featured");
  const published = formBool(formData, "published");
  const sortOrder = Number(formString(formData, "sortOrder") || "0");
  let slug = formString(formData, "slug") || slugify(title);

  if (!title || !summary || !description || !slug) {
    redirect("/admin/projects/new?error=missing");
  }

  if (id) {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        summary,
        description,
        coverUrl,
        projectUrl,
        repoUrl,
        role,
        year,
        problem,
        outcome,
        kind,
        endpoint,
        apiSample,
        stack,
        featured,
        published,
        sortOrder,
      },
    });
  } else {
    await prisma.project.create({
      data: {
        title,
        slug,
        summary,
        description,
        coverUrl,
        projectUrl,
        repoUrl,
        role,
        year,
        problem,
        outcome,
        kind,
        endpoint,
        apiSample,
        stack,
        featured,
        published,
        sortOrder,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  if (!id) return;

  const project = await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${project.slug}`);
  revalidatePath("/admin/projects");
}

export async function upsertPostAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  const title = formString(formData, "title");
  const excerpt = formString(formData, "excerpt") || null;
  const content = formString(formData, "content");
  const coverUrl = formString(formData, "coverUrl") || null;
  const xPostUrl = formString(formData, "xPostUrl") || null;
  const gallery = formString(formData, "gallery")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const published = formBool(formData, "published");
  let slug = formString(formData, "slug") || slugify(title);

  if (!title || !content || !slug) {
    redirect("/admin/posts/new?error=missing");
  }

  const publishedAt = published ? new Date() : null;

  if (id) {
    const existing = await prisma.post.findUnique({ where: { id } });
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverUrl,
        gallery,
        xPostUrl,
        published,
        publishedAt: published
          ? existing?.publishedAt ?? new Date()
          : null,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverUrl,
        gallery,
        xPostUrl,
        published,
        publishedAt,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  if (!id) return;

  const post = await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/posts");
}

export async function updateSettingsAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const data = {
    siteName: formString(formData, "siteName") || "thatmanfrancis",
    tagline: formString(formData, "tagline") || null,
    metaDescription: formString(formData, "metaDescription") || null,
    heroEyebrow: formString(formData, "heroEyebrow") || null,
    heroTitle: formString(formData, "heroTitle") || null,
    heroLede: formString(formData, "heroLede") || null,
    heroCtaLabel: formString(formData, "heroCtaLabel") || null,
    heroRole: formString(formData, "heroRole") || null,
    aboutTitle: formString(formData, "aboutTitle") || null,
    aboutBody: formString(formData, "aboutBody") || null,
    aboutImageUrl: formString(formData, "aboutImageUrl") || null,
    availability: formString(formData, "availability") || null,
    resumeUrl: formString(formData, "resumeUrl") || null,
    skills: parseList(formString(formData, "skills")),
    stackTitle: formString(formData, "stackTitle") || null,
    disciplinesTitle: formString(formData, "disciplinesTitle") || null,
    disciplinesLede: formString(formData, "disciplinesLede") || null,
    disciplines: copyBlocksFromForm(formData, "discipline", parseInt(String(formData.get("disciplineCount") ?? "5"), 10)),
    processTitle: formString(formData, "processTitle") || null,
    processCta: formString(formData, "processCta") || null,
    processSteps: copyBlocksFromForm(formData, "process", parseInt(String(formData.get("processCount") ?? "3"), 10)),
    experienceTitle: formString(formData, "experienceTitle") || null,
    experienceLede: formString(formData, "experienceLede") || null,
    experience: experienceFromForm(formData, parseInt(String(formData.get("experienceCount") ?? "6"), 10)),
    faqTitle: formString(formData, "faqTitle") || null,
    faqLede: formString(formData, "faqLede") || null,
    faq: copyBlocksFromForm(formData, "faq", parseInt(String(formData.get("faqCount") ?? "6"), 10)),
    contactTitle: formString(formData, "contactTitle") || null,
    contactLede: formString(formData, "contactLede") || null,
    contactEmail: formString(formData, "contactEmail") || null,
    contactPhone: formString(formData, "contactPhone") || null,
    contactLocation: formString(formData, "contactLocation") || null,
    socialX: formString(formData, "socialX") || null,
    socialGithub: formString(formData, "socialGithub") || null,
    socialLinkedin: formString(formData, "socialLinkedin") || null,
    socialInstagram: formString(formData, "socialInstagram") || null,
    socialYoutube: formString(formData, "socialYoutube") || null,
    socialFacebook: formString(formData, "socialFacebook") || null,
    socialWhatsapp: formString(formData, "socialWhatsapp") || null,
    socialDiscord: formString(formData, "socialDiscord") || null,
    socialBluesky: formString(formData, "socialBluesky") || null,
    socialMastodon: formString(formData, "socialMastodon") || null,
    socialDevto: formString(formData, "socialDevto") || null,
    socialHashnode: formString(formData, "socialHashnode") || null,
    socialCodepen: formString(formData, "socialCodepen") || null,
    socialStackoverflow: formString(formData, "socialStackoverflow") || null,
    socialDribbble: formString(formData, "socialDribbble") || null,
    socialWebsite: formString(formData, "socialWebsite") || null,
    footerText: formString(formData, "footerText") || null,
  };

  const existing = await prisma.siteSettings.findUnique({
    where: { id: "default" },
    select: { id: true },
  });

  if (existing) {
    await prisma.siteSettings.update({
      where: { id: "default" },
      data,
    });
  } else {
    await prisma.siteSettings.create({
      data: { id: "default", ...data },
    });
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/blog");
  revalidatePath("/work");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}

export async function markMessageReadAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  if (!id) return;

  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  if (!id) return;

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

export async function deleteSubscriberAction(formData: FormData) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const id = formString(formData, "id");
  if (!id) return;

  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
}

type NewsletterActionResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function campaignFields(formData: FormData) {
  return {
    subject: formString(formData, "subject"),
    previewText: formString(formData, "previewText") || null,
    body: formString(formData, "body"),
    ctaLabel: formString(formData, "ctaLabel") || null,
    ctaUrl: formString(formData, "ctaUrl") || null,
  };
}

export async function saveNewsletterCampaignAction(
  formData: FormData,
): Promise<NewsletterActionResult> {
  const user = await requireAdmin();
  if (!user) return { ok: false, message: "You need to sign in again." };

  const id = formString(formData, "id");
  const fields = campaignFields(formData);
  if (!fields.subject || !fields.body) {
    return { ok: false, message: "Subject and body are required." };
  }

  if (id) {
    const existing = await prisma.newsletterCampaign.findUnique({
      where: { id },
    });
    if (!existing) return { ok: false, message: "Campaign not found." };
    if (existing.status !== "draft") {
      return { ok: false, message: "Only drafts can be edited." };
    }

    await prisma.newsletterCampaign.update({
      where: { id },
      data: fields,
    });
    revalidatePath("/admin/newsletter");
    revalidatePath(`/admin/newsletter/${id}`);
    return { ok: true, message: "Draft saved." };
  }

  const created = await prisma.newsletterCampaign.create({
    data: {
      ...fields,
      status: "draft",
    },
  });
  revalidatePath("/admin/newsletter");
  redirect(`/admin/newsletter/${created.id}?saved=1`);
}

export async function sendNewsletterTestAction(
  formData: FormData,
): Promise<NewsletterActionResult> {
  const user = await requireAdmin();
  if (!user) return { ok: false, message: "You need to sign in again." };

  const fields = campaignFields(formData);
  if (!fields.subject || !fields.body) {
    return { ok: false, message: "Subject and body are required." };
  }

  const settings = await getSettings();
  const testEmail =
    formString(formData, "testEmail").toLowerCase() || user.email;

  try {
    const id = formString(formData, "id");
    if (id) {
      const existing = await prisma.newsletterCampaign.findUnique({
        where: { id },
      });
      if (existing?.status === "draft") {
        await prisma.newsletterCampaign.update({
          where: { id },
          data: fields,
        });
      }
    }

    await sendNewsletterTest({
      toEmail: testEmail,
      toName: user.name ?? user.email,
      email: {
        siteName: settings.siteName,
        tagline: settings.tagline,
        subject: fields.subject,
        previewText: fields.previewText,
        body: fields.body,
        ctaLabel: fields.ctaLabel,
        ctaUrl: fields.ctaUrl,
        contactEmail: settings.contactEmail,
      },
    });
    return { ok: true, message: `Test email sent to ${testEmail}.` };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Could not send test email.",
    };
  }
}

export async function sendNewsletterCampaignAction(
  formData: FormData,
): Promise<NewsletterActionResult> {
  const user = await requireAdmin();
  if (!user) return { ok: false, message: "You need to sign in again." };

  if (!isZeptoConfigured()) {
    return {
      ok: false,
      message:
        "ZeptoMail is not configured. Set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_EMAIL.",
    };
  }

  const fields = campaignFields(formData);
  if (!fields.subject || !fields.body) {
    return { ok: false, message: "Subject and body are required." };
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "asc" },
    select: { email: true, fullName: true },
  });
  if (subscribers.length === 0) {
    return { ok: false, message: "There are no subscribers to email yet." };
  }

  const settings = await getSettings();
  let campaignId = formString(formData, "id");

  try {
    if (campaignId) {
      const existing = await prisma.newsletterCampaign.findUnique({
        where: { id: campaignId },
      });
      if (!existing) return { ok: false, message: "Campaign not found." };
      if (existing.status !== "draft") {
        return { ok: false, message: "Only drafts can be sent." };
      }
      await prisma.newsletterCampaign.update({
        where: { id: campaignId },
        data: {
          ...fields,
          status: "sending",
          recipientCount: subscribers.length,
          lastError: null,
        },
      });
    } else {
      const created = await prisma.newsletterCampaign.create({
        data: {
          ...fields,
          status: "sending",
          recipientCount: subscribers.length,
        },
      });
      campaignId = created.id;
    }

    const result = await sendNewsletterToAudience({
      audience: subscribers,
      email: {
        siteName: settings.siteName,
        tagline: settings.tagline,
        subject: fields.subject,
        previewText: fields.previewText,
        body: fields.body,
        ctaLabel: fields.ctaLabel,
        ctaUrl: fields.ctaUrl,
        contactEmail: settings.contactEmail,
      },
    });

    const status =
      result.failedCount === 0
        ? "sent"
        : result.sentCount === 0
          ? "failed"
          : "sent";

    await prisma.newsletterCampaign.update({
      where: { id: campaignId },
      data: {
        status,
        sentCount: result.sentCount,
        failedCount: result.failedCount,
        lastError: result.lastError,
        sentAt: new Date(),
      },
    });

    revalidatePath("/admin/newsletter");
    revalidatePath(`/admin/newsletter/${campaignId}`);

    if (result.sentCount === 0) {
      return {
        ok: false,
        message: result.lastError || "Send failed for every recipient.",
      };
    }

    return {
      ok: true,
      message:
        result.failedCount > 0
          ? `Sent to ${result.sentCount}. ${result.failedCount} failed.`
          : `Sent to ${result.sentCount} subscriber${result.sentCount === 1 ? "" : "s"}.`,
    };
  } catch (error) {
    if (campaignId) {
      await prisma.newsletterCampaign.update({
        where: { id: campaignId },
        data: {
          status: "failed",
          lastError:
            error instanceof Error ? error.message : "Send failed unexpectedly",
        },
      });
    }
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Send failed.",
    };
  }
}
