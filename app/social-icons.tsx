import type { ReactNode } from "react";

function OutlineIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function LinkIcon() {
  return (
    <OutlineIcon>
      <path d="M10 13.5a4 4 0 0 0 5.7.2l3.5-3.5a4 4 0 0 0-5.7-5.7l-2 2M14 10.5a4 4 0 0 0-5.7-.2l-3.5 3.5a4 4 0 0 0 5.7 5.7l2-2" />
    </OutlineIcon>
  );
}

export function EmailIcon() {
  return (
    <OutlineIcon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </OutlineIcon>
  );
}

export function WhatsAppIcon() {
  return (
    <OutlineIcon>
      <path d="M21 11.7a9 9 0 0 1-13.4 7.9L3 21l1.3-4.6A9 9 0 1 1 21 11.7Z" />
      <path d="m9 7.5 1.5 2.2-1 1.1a7 7 0 0 0 3.6 3.6l1.1-1 2.3 1.4c-.3 1.3-.9 1.8-1.9 1.8-3.5-.2-7.1-3.7-7.2-7.1 0-1 .5-1.7 1.6-2Z" />
    </OutlineIcon>
  );
}

export function GithubIcon() {
  return (
    <OutlineIcon>
      <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.3a2.9 2.9 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.4 4.4 0 0 0-.1-3.4s-1-.3-3.5 1.3a13 13 0 0 0-5.6 0C6.7 3.3 5.7 3.6 5.7 3.6A4.4 4.4 0 0 0 5.6 7a4.7 4.7 0 0 0-1.3 3.5c0 4.7 2.8 5.7 5.5 6a2.9 2.9 0 0 0-.8 2.2V22" />
    </OutlineIcon>
  );
}

export function LinkedinIcon() {
  return (
    <OutlineIcon>
      <circle cx="5" cy="5" r="1.75" />
      <path d="M3.25 9h3.5v12h-3.5zM10 21V9h3.5v1.65A4.1 4.1 0 0 1 17 8.8c2.8 0 4 1.8 4 4.6V21h-3.5v-6.7c0-1.3-.55-2.05-1.85-2.05s-2.15.9-2.15 2.2V21z" />
    </OutlineIcon>
  );
}

export function InstagramIcon() {
  return (
    <OutlineIcon>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </OutlineIcon>
  );
}

export function FacebookIcon() {
  return (
    <OutlineIcon>
      <path d="M14 21v-8h2.9l.6-3.5H14V7.7c0-1 .4-1.7 1.8-1.7H18V3.3a18 18 0 0 0-2.8-.3c-3 0-4.7 1.7-4.7 4.7v1.8H7V13h3.5v8z" />
    </OutlineIcon>
  );
}

export function XIcon() {
  return (
    <OutlineIcon>
      <path d="M3.5 3.5h4.8l12.2 17h-4.8zM20 3.5l-6.4 7.1M3.5 20.5l6.9-7.7" />
    </OutlineIcon>
  );
}
