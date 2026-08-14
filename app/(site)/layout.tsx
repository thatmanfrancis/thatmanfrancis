import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SiteSplash } from "@/components/layout/site-splash";
import { RevealInit } from "@/components/reveal-init";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteOrigin, websiteJsonLd } from "@/lib/seo";
import { getSettings, socialLinks } from "@/lib/settings";
import { turnstileSiteKey } from "@/lib/turnstile";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const socials = socialLinks(settings);
  const origin = getSiteOrigin();
  const captchaKey = turnstileSiteKey();

  return (
    <>
      <JsonLd data={websiteJsonLd(settings, origin)} />
      <SiteSplash />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={settings.siteName}
        tagline={settings.tagline ?? ""}
        footerText={settings.footerText ?? settings.tagline ?? ""}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactLocation={settings.contactLocation}
        socials={socials}
        turnstileSiteKey={captchaKey}
      />
      <RevealInit />
    </>
  );
}
