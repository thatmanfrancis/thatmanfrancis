import type { ComponentType, SVGProps } from "react";
import {
  BlueskyIcon,
  CodepenIcon,
  DevtoIcon,
  DiscordIcon,
  DribbbleIcon,
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  HashnodeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  MastodonIcon,
  PhoneIcon,
  StackOverflowIcon,
  WhatsappIcon,
  XSocialIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import type { SocialIconKey, SocialLink } from "@/lib/settings";

const socialIconMap: Record<
  SocialIconKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  x: XSocialIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsappIcon,
  discord: DiscordIcon,
  bluesky: BlueskyIcon,
  mastodon: MastodonIcon,
  devto: DevtoIcon,
  hashnode: HashnodeIcon,
  codepen: CodepenIcon,
  stackoverflow: StackOverflowIcon,
  dribbble: DribbbleIcon,
  website: GlobeIcon,
};

type ContactFactsProps = {
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  availability?: string | null;
  socials: SocialLink[];
  tone?: "light" | "ink";
};

export function ContactFacts({
  email,
  phone,
  location,
  availability,
  socials,
  tone = "light",
}: ContactFactsProps) {
  const ink = tone === "ink";
  const labelClass = ink
    ? "text-sm font-semibold uppercase tracking-[0.12em] text-white/45"
    : "section-label text-sm";
  const valueClass = ink
    ? "mt-2 text-lg font-semibold text-white"
    : "mt-2 text-lg font-semibold text-ink";
  const linkClass = ink
    ? "inline-flex items-center gap-2 text-lg font-semibold text-white transition hover:text-white/70"
    : "inline-flex items-center gap-2 text-lg font-semibold text-ink transition hover:opacity-70";
  const pillClass = ink
    ? "inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
    : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/40";

  return (
    <>
      <dl className="grid gap-8 sm:grid-cols-2">
        {availability ? (
          <div>
            <dt className={labelClass}>Now</dt>
            <dd className={valueClass}>{availability}</dd>
          </div>
        ) : null}
        {email ? (
          <div>
            <dt className={labelClass}>Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${email}`} className={linkClass}>
                <MailIcon className="size-4" />
                {email}
              </a>
            </dd>
          </div>
        ) : null}
        {location ? (
          <div>
            <dt className={labelClass}>Location</dt>
            <dd className={`${valueClass} inline-flex items-center gap-2`}>
              <MapPinIcon className="size-4" />
              {location}
            </dd>
          </div>
        ) : null}
        {phone ? (
          <div>
            <dt className={labelClass}>Phone</dt>
            <dd className="mt-2">
              <a href={`tel:${phone}`} className={linkClass}>
                <PhoneIcon className="size-4" />
                {phone}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      {socials.length > 0 ? (
        <ul className="mt-10 flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = socialIconMap[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillClass}
                >
                  <Icon className="size-4" />
                  {social.label}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
