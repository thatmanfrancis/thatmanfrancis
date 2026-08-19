import type { Metadata } from "next";
import {
  ContactForm,
  ContactSuccess,
} from "@/components/contact/contact-form";
import { ContactFacts } from "@/components/contact/contact-facts";
import { FaqSection } from "@/components/home/faq-section";
import { asCopyBlocks, defaultFaqs } from "@/lib/copy-blocks";
import { getSettings, socialLinks } from "@/lib/settings";
import { publicPageMetadata } from "@/lib/seo";
import { turnstileSiteKey } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return publicPageMetadata({
    title: "Contact",
    description:
      settings.contactLede ??
      "Contact Francis Uzoigwe (thatmanfrancis) for full-stack web development, product engineering, and collaboration on Next.js and TypeScript projects.",
    path: "/contact",
  });
}

type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const settings = await getSettings();
  const { sent, error } = await searchParams;
  const socials = socialLinks(settings);
  const faqs = asCopyBlocks(settings.faq, defaultFaqs);

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="section-label mb-3">Contact</p>
            <h1 className="heading">
              {settings.contactTitle ?? "Let's work together"}
            </h1>
            <p className="lede mt-4">
              {settings.contactLede ??
                "Open to collaborations, product builds, and interesting problems."}
            </p>
            <div className="mt-10">
              <ContactFacts
                email={settings.contactEmail}
                phone={settings.contactPhone}
                location={settings.contactLocation}
                availability={settings.availability}
                socials={socials}
              />
            </div>
          </div>

          <div>
            {sent ? (
              <ContactSuccess email={settings.contactEmail} />
            ) : (
              <>
                {error ? (
                  <p className="mb-5 rounded-2xl border border-border bg-muted px-4 py-3 text-sm font-medium text-ink">
                    {error === "missing"
                      ? "Please fill in name, email, and message."
                      : error === "rate"
                        ? "Too many messages from this connection. Please wait a bit and try again."
                        : error === "captcha"
                          ? "Please complete the verification challenge and try again."
                          : "Could not send message. Try again or email directly."}
                  </p>
                ) : null}
                <ContactForm
                  email={settings.contactEmail}
                  turnstileSiteKey={turnstileSiteKey()}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <FaqSection
        title={settings.faqTitle}
        lede={settings.faqLede}
        items={faqs}
        tone="surface"
      />
    </>
  );
}
