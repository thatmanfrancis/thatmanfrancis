"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  isHoneypotTripped,
  turnstileTokenFromForm,
  verifyTurnstileToken,
} from "@/lib/turnstile";

function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactAction(formData: FormData) {
  const ip = await clientIp();
  const limited = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    redirect("/contact?error=rate");
  }

  if (isHoneypotTripped(formData)) {
    redirect("/contact?sent=1");
  }

  const captcha = await verifyTurnstileToken(turnstileTokenFromForm(formData), {
    action: "contact",
    remoteip: ip,
  });
  if (!captcha.ok) {
    redirect("/contact?error=captcha");
  }

  const name = formString(formData, "name");
  const email = formString(formData, "email");
  const phone = formString(formData, "phone") || null;
  const subject = formString(formData, "subject") || null;
  const message = formString(formData, "message");

  if (!name || !email || !message) {
    redirect("/contact?error=missing");
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
  } catch {
    redirect("/contact?error=failed");
  }

  redirect("/contact?sent=1");
}
