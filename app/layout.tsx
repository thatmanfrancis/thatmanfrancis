import type { Metadata, Viewport } from "next";
import { DM_Sans, Marck_Script, Syne } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import { profile, siteUrl } from "@/content/portfolio";
import { BrandSplash } from "./brand-splash";
import { GoogleAnalytics } from "./google-analytics";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const signatureFont = Marck_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined },
};

export const viewport: Viewport = { colorScheme: "light" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${signatureFont.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <BrandSplash signature={profile.signature} />
        {children}
        <footer className="site-footer shell">
          <small>© {new Date().getUTCFullYear()} {profile.name}. All rights reserved.</small>
          <Link href="/privacy/">Privacy</Link>
        </footer>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
