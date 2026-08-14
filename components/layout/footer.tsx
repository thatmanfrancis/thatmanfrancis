"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { BrandLockup } from "@/components/brand/logo-mark";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import {
  ArrowUpRightIcon,
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
  MastodonIcon,
  MessageCircleIcon,
  PhoneIcon,
  SendIcon,
  StackOverflowIcon,
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

type FooterProps = {
  siteName: string;
  tagline: string;
  footerText: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactLocation?: string | null;
  socials: SocialLink[];
  turnstileSiteKey?: string;
};

function FooterContactCard({
  title,
  value,
  href,
  actionLabel,
  icon: ActionIcon,
  external = false,
}: {
  title: string;
  value: string;
  href: string;
  actionLabel: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
}) {
  return (
    <article className="footer-contact-card flex flex-col gap-2 py-4">
      <h3 className="footer-heading">{title}</h3>
      <p className="body-text">{value}</p>
      <a
        href={href}
        className="link inline-flex w-fit items-center gap-2 text-base font-semibold"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <ActionIcon className="size-4" />
        <span>{actionLabel}</span>
      </a>
    </article>
  );
}

export function Footer({
  siteName,
  tagline,
  footerText,
  contactEmail,
  contactPhone,
  contactLocation,
  socials,
  turnstileSiteKey = "",
}: FooterProps) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const year = new Date().getFullYear();
  const mapsHref = contactLocation
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactLocation)}`
    : null;

  const exploreLinks = [
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Link href="/" aria-label={`${siteName} — home`}>
              <BrandLockup markClassName="h-12 w-auto sm:h-14" />
            </Link>

            {socials.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                {socials.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social"
                      aria-label={social.label}
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}

            {contactLocation ? (
              <div>
                <h2 className="footer-heading mb-2">Location</h2>
                <p className="body-text">{contactLocation}</p>
              </div>
            ) : (
              <div>
                <h2 className="footer-heading mb-2">About</h2>
                <p className="body-text">{footerText}</p>
              </div>
            )}

            {mapsHref ? (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-fit"
              >
                <span>Get directions</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ) : null}
          </div>

          <div className="flex flex-col divide-y divide-border/80 lg:col-span-3">
            {contactEmail ? (
              <FooterContactCard
                title="Enquiries"
                value={contactEmail}
                href={`mailto:${contactEmail}`}
                actionLabel="Email me"
                icon={SendIcon}
              />
            ) : null}
            {contactPhone ? (
              <>
                <FooterContactCard
                  title="Quick chat"
                  value={contactPhone}
                  href={`https://wa.me/${contactPhone.replace(/[^\d+]/g, "")}`}
                  actionLabel="WhatsApp"
                  icon={MessageCircleIcon}
                  external
                />
                <FooterContactCard
                  title="Call"
                  value={contactPhone}
                  href={`tel:${contactPhone}`}
                  actionLabel="Dial"
                  icon={PhoneIcon}
                />
              </>
            ) : null}
            {!contactEmail && !contactPhone ? (
              <FooterContactCard
                title="Contact"
                value="Reach out anytime"
                href="/contact"
                actionLabel="Contact page"
                icon={MailIcon}
              />
            ) : null}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
            <nav aria-label="Explore">
              <h2 className="footer-heading mb-1">Explore</h2>
              <ul className="footer-link-list">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <NewsletterForm turnstileSiteKey={turnstileSiteKey} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}{" "}
            <Link href="/" className="link font-medium text-ink/80">
              {siteName}
            </Link>{" "}
            · All rights reserved
          </p>
          <p>
            Built by <span className="font-medium text-ink/80">{siteName}</span>
            {tagline ? ` · ${tagline}` : null}
          </p>
        </div>
      </div>
    </footer>
  );
}
