import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/portfolio";
import { GoBackLink } from "./go-back-link";

export const metadata: Metadata = {
  title: `Privacy | ${profile.name}`,
  description: "How Francis Uzoigwe’s portfolio handles visitor information and correspondence.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main className="case-study-page shell">
      <Link className="masthead-brand" href="/" aria-label={`${profile.name}, homepage`}>
        {profile.signature}
      </Link>
      <header className="case-study-header">
        <GoBackLink />
        <h1>Privacy</h1>
        <p>I’m {profile.name}, based in Lagos, Nigeria. This notice explains how I handle information when you visit my portfolio or get in touch.</p>
      </header>
      <div className="privacy-copy">
        <section>
          <h2>Visiting the site</h2>
          <p>
            This portfolio has no accounts or contact forms. The hosting provider may record
            technical details such as your IP address, browser, requested page and request time
            to serve the site, troubleshoot errors and protect it from abuse. Hosting logs are
            subject to the provider’s retention settings.
          </p>
        </section>
        <section>
          <h2>Analytics</h2>
          <p>
            When Google Analytics is enabled, Google may use cookies to measure visits and
            interactions. It may receive details such as pages viewed, referral source, device
            or browser type and approximate location. I use reports to understand which pages
            people visit and improve the portfolio. Google Analytics is configured with Google
            signals and ad personalization disabled. Retention depends on the property’s settings.
          </p>
          <p>
            You can manage cookies in your browser or use the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out add-on</a>.
            Read more about{" "}
            <a href="https://policies.google.com/technologies/partner-sites">
              how Google uses information from sites that use its services
            </a>.
          </p>
        </section>
        <section>
          <h2>Getting in touch</h2>
          <p>
            If you contact me, I use the name, contact details and message you share to reply and
            follow up on your inquiry. I keep correspondence as long as needed for those purposes
            or to meet applicable legal obligations.
          </p>
        </section>
        <section>
          <h2>Services and external links</h2>
          <p>
            Hosting, email and analytics providers may process information to provide their
            services, including outside your country. External sites and messaging services such
            as GitHub, LinkedIn and WhatsApp handle information under their own privacy policies.
          </p>
        </section>
        <section>
          <h2>Your privacy choices</h2>
          <p>
            Depending on applicable law, you may be able to access, correct or delete your
            personal information, restrict or object to how it’s used, or withdraw consent where
            processing relies on it. Email <a href={`mailto:${profile.email}`}>{profile.email}</a>{" "}
            to make a request or ask a question. You can also contact the{" "}
            <a href="https://ndpc.gov.ng/">Nigeria Data Protection Commission</a> or your local
            data protection authority where applicable.
          </p>
        </section>
      </div>
    </main>
  );
}
