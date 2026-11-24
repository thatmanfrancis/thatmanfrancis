"use client";

import Link from "next/link";

type BrowserNavigation = {
  currentEntry: { index: number } | null;
  entries(): { url: string | null }[];
};

export function GoBackLink() {
  return (
    <Link
      className="privacy-back"
      href="/"
      onNavigate={(event) => {
        const navigation = (window as Window & { navigation?: BrowserNavigation }).navigation;
        const index = navigation?.currentEntry?.index ?? 0;
        const previousUrl = navigation?.entries()[index - 1]?.url;
        const returnUrl = navigation ? previousUrl : document.referrer;

        if (returnUrl && new URL(returnUrl).origin === location.origin) {
          event.preventDefault();
          history.back();
        }
      }}
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7M5 12h14" />
      </svg>
      Go back
    </Link>
  );
}
