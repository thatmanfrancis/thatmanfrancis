import Link from "next/link";
import { ContactFacts } from "@/components/contact/contact-facts";
import type { SocialLink } from "@/lib/settings";

type ContactBandProps = {
  title: string;
  lede: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  availability?: string | null;
  socials: SocialLink[];
};

export function ContactBand({
  title,
  lede,
  email,
  phone,
  location,
  availability,
  socials,
}: ContactBandProps) {
  return (
    <section id="contact" className="bg-ink py-16 text-white sm:py-20" data-reveal>
      <div className="container-page">
        <p className="mb-3 text-base font-semibold uppercase tracking-[0.12em] text-white/55">
          Contact
        </p>
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/75">
          {lede}
        </p>
        <div className="mt-10">
          <ContactFacts
            tone="ink"
            email={email}
            phone={phone}
            location={location}
            availability={availability}
            socials={socials}
          />
        </div>
        <div className="mt-10">
          <Link href="/contact" className="btn bg-white text-ink hover:bg-white/90">
            Write a message
          </Link>
        </div>
      </div>
    </section>
  );
}
