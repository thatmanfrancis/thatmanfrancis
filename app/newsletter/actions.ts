"use server";

import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  isHoneypotTripped,
  turnstileTokenFromForm,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export type NewsletterState = {
  type: "success" | "info" | "error";
  message: string;
} | null;

export async function subscribeNewsletterAction(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const ip = await clientIp();
  const limited = rateLimit(`newsletter:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return {
      type: "error",
      message: "Too many attempts. Please wait a few minutes and try again.",
    };
  }

  if (isHoneypotTripped(formData)) {
    return {
      type: "success",
      message: "Thanks for subscribing to the newsletter.",
    };
  }

  const captcha = await verifyTurnstileToken(turnstileTokenFromForm(formData), {
    action: "newsletter",
    remoteip: ip,
  });
  if (!captcha.ok) {
    return {
      type: "error",
      message: "Please complete the verification challenge and try again.",
    };
  }

  const fullName =
    typeof formData.get("full_name") === "string"
      ? String(formData.get("full_name")).trim()
      : "";
  const emailRaw =
    typeof formData.get("email") === "string"
      ? String(formData.get("email")).trim()
      : "";
  const email = emailRaw.toLowerCase();

  if (!fullName || !email) {
    return {
      type: "error",
      message: "Name and email are required.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      type: "error",
      message: "Please enter a valid email address.",
    };
  }

  try {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return {
        type: "info",
        message: "You're already on the newsletter list.",
      };
    }

    await prisma.newsletterSubscriber.create({
      data: { fullName, email },
    });

    return {
      type: "success",
      message: "Thanks for subscribing to the newsletter.",
    };
  } catch {
    return {
      type: "error",
      message: "Could not subscribe right now. Please try again.",
    };
  }
}
