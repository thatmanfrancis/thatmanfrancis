import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ className = "size-4 shrink-0", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    />
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </Icon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </Icon>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M17 7H7" />
      <path d="M17 7v10" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Icon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  );
}

export function MessageCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Icon>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </Icon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

function FillIcon({ className = "size-4 shrink-0", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    />
  );
}

export function XSocialIcon(props: IconProps) {
  return (
    <FillIcon viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.829L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </FillIcon>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.79-1.335-1.79-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </FillIcon>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.065 2.065 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </FillIcon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </FillIcon>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.105C19.576 3.546 12 3.546 12 3.546s-7.576 0-9.404.535A2.974 2.974 0 0 0 .502 6.186 31.21 31.21 0 0 0 0 12a31.21 31.21 0 0 0 .502 5.814 2.974 2.974 0 0 0 2.094 2.105c1.828.535 9.404.535 9.404.535s7.576 0 9.404-.535a2.974 2.974 0 0 0 2.094-2.105A31.21 31.21 0 0 0 24 12a31.21 31.21 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </FillIcon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </FillIcon>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </FillIcon>
  );
}

export function BlueskyIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.04.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308.78-6.498-3.13-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
    </FillIcon>
  );
}

export function MastodonIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M23.193 7.908c0-5.207-3.411-6.733-3.411-6.733C18.418.361 15.33.025 12.007.025h-.015c-3.323 0-6.41.336-7.775 1.15 0 0-3.411 1.526-3.411 6.733 0 .5-.012 2.807.032 4.49.14 5.441 1.056 10.813 6.378 12.13 2.46.6 4.572.73 6.27.645 3.08-.155 4.807-.94 4.807-.94l-.101-2.1s-2.198.694-4.66.608c-2.44-.085-5.016-.268-5.41-3.317-.036-.247-.054-.508-.054-.778 0 0 2.392.583 5.425.72 1.85.084 3.583-.106 5.344-.312 3.376-.394 6.3-2.432 6.669-4.294.58-2.932.53-7.16.53-7.16zm-4.095 7.17h-2.57V8.338c0-1.342-.564-2.023-1.69-2.023-1.246 0-1.87.807-1.87 2.403v3.48h-2.557V8.718c0-1.596-.625-2.403-1.871-2.403-1.126 0-1.69.681-1.69 2.023v6.74H6.197V7.99c0-1.342.343-2.407 1.032-3.196.712-.79 1.644-1.196 2.798-1.196 1.336 0 2.346.513 3.01 1.538l.65 1.09.65-1.09c.664-1.025 1.674-1.538 3.01-1.538 1.154 0 2.086.406 2.798 1.196.689.789 1.032 1.854 1.032 3.196v7.088z" />
    </FillIcon>
  );
}

export function DevtoIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M7.42 10.05c-.2-.2-.42-.28-.72-.28H5.63v4.47h1.08c.29 0 .52-.09.72-.28.2-.2.3-.46.3-.82v-2.27c0-.35-.1-.62-.3-.82zm15.2-5.8v15.5H1.38V4.25h21.24zm-5.72 6.47c.3-.25.46-.62.46-1.1v-.89c0-.62-.17-1.08-.52-1.38-.35-.3-.84-.45-1.47-.45h-3.22v7.2h1.25v-2.9h1.35l1.73 2.9h1.56l-1.9-3.07a2.1 2.1 0 0 0 .76-.31zm-7.55-.1c.5.5.75 1.17.75 2v.5c0 .84-.25 1.5-.76 2-.5.5-1.17.74-2 .74H3.5V7.5h3.1c.83 0 1.5.24 2 .74zm8.6 3.95c-.5.5-1.17.75-2 .75h-2.85V7.5H16c.83 0 1.5.25 2 .75.5.5.75 1.16.75 2v2.32c0 .83-.25 1.5-.75 2zm1.32-6.1h1.25v7.2h-1.25V8.37z" />
    </FillIcon>
  );
}

export function HashnodeIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.969A3.969 3.969 0 1 1 15.969 12 3.974 3.974 0 0 1 12 15.969z" />
    </FillIcon>
  );
}

export function CodepenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 2 10 6.5v7L12 22 2 15.5v-7L12 2Z" />
      <path d="M12 22v-6.5" />
      <path d="m22 8.5-10 7-10-7" />
      <path d="m2 15.5 10-7 10 7" />
      <path d="M12 2v6.5" />
    </Icon>
  );
}

export function StackOverflowIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M18.986 21.865v-6.464h2.134V24H1.844v-8.599h2.13v6.464h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852 10.48 2.189.451-2.07-10.478-2.189-.453 2.07zm1.359-5.056 9.705 4.53.903-1.95-9.706-4.53-.902 1.95zm2.688-4.778 8.217 6.855 1.359-1.62-8.216-6.855-1.36 1.62zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z" />
    </FillIcon>
  );
}

export function DribbbleIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.09-6.355c-.34-.17-3.215-1.91-6.47-.868.681 1.873.955 3.405 1.01 3.723 2.988-1.006 4.794-2.573 5.46-2.855zM15.328 21.2c-.08-.48-.403-2.154-1.177-4.15-.02.008-.04.015-.06.023-3.934 1.365-5.34 4.17-5.474 4.44A9.977 9.977 0 0 0 12 22c1.158 0 2.264-.267 3.328-.8zM4.85 19.798c.166-.283 2.162-3.586 5.997-4.813.094-.03.19-.058.286-.085-.182-.412-.35-.832-.507-1.258C6.786 15.07 2.3 14.96 1.9 14.95a10.01 10.01 0 0 0 2.95 4.848zM1.93 12.08c.41.01 4.958.067 9.578-1.26-.15-.34-.306-.68-.477-1.014C6.55 11.46 2.27 8.45 1.9 8.15A10.03 10.03 0 0 0 1.93 12.08zm2.547-7.56C5.94 5.9 8.845 8.5 11.72 10.3c1.44-2.7 2.04-4.91 2.16-5.53A9.99 9.99 0 0 0 4.477 4.52zM12.9 2.22c-.11.74-.68 2.91-2.17 5.73 3.06-.12 5.95-.61 6.32-.7A10.01 10.01 0 0 0 12.9 2.22zm6.72 3.53c-.24.05-3.42.7-6.7.97 1.82 3.54 2.56 6.5 2.7 7.1 2.95-.53 4.2-1.9 4.35-2.07a9.98 9.98 0 0 0-.35-6z" />
    </FillIcon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </Icon>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16V4a2 2 0 0 1 2-2h10" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 17V3" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </Icon>
  );
}

/** Large card marks — filled geometry, not thin UI glyphs. */
function Mark({
  className = "size-4 shrink-0",
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function FrontendMark(props: IconProps) {
  return (
    <Mark {...props}>
      <path d="M8 12c0-2.2 1.8-4 4-4h40c2.2 0 4 1.8 4 4v32c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4V12Z" opacity="0.18" />
      <path d="M12 10h40a2 2 0 0 1 2 2v6H10v-6a2 2 0 0 1 2-2Zm-2 12h44v22a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V22Z" />
      <circle cx="16" cy="15" r="1.6" fill="#fff" />
      <circle cx="22" cy="15" r="1.6" fill="#fff" />
      <circle cx="28" cy="15" r="1.6" fill="#fff" />
      <path d="M22 34 17 39l5 5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m42 34 5 5-5 5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 32 29 46" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </Mark>
  );
}

export function BackendMark(props: IconProps) {
  return (
    <Mark {...props}>
      <ellipse cx="32" cy="14" rx="18" ry="7" />
      <path d="M14 14v10c0 3.9 8.1 7 18 7s18-3.1 18-7V14" opacity="0.35" />
      <path d="M14 24v10c0 3.9 8.1 7 18 7s18-3.1 18-7V24" />
      <path d="M14 34v10c0 3.9 8.1 7 18 7s18-3.1 18-7V34" opacity="0.7" />
      <ellipse cx="32" cy="24" rx="18" ry="7" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <ellipse cx="32" cy="34" rx="18" ry="7" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.55" />
    </Mark>
  );
}

export function UxMark(props: IconProps) {
  return (
    <Mark {...props}>
      <circle cx="16" cy="18" r="6" />
      <circle cx="48" cy="46" r="6" />
      <path
        d="M22 18h8c6 0 8 4 8 8v8c0 4 2 8 8 8h2"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="m40 14 12 18H34l4-6 2-4Z" />
    </Mark>
  );
}

export function MobileMark(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="18" y="6" width="28" height="52" rx="6" opacity="0.2" />
      <rect x="20" y="8" width="24" height="48" rx="5" />
      <rect x="24" y="14" width="16" height="28" rx="2" fill="#fff" opacity="0.9" />
      <circle cx="32" cy="50" r="2.2" fill="#fff" />
      <rect x="28" y="11" width="8" height="1.8" rx="0.9" fill="#fff" opacity="0.7" />
    </Mark>
  );
}

export function DevOpsMark(props: IconProps) {
  return (
    <Mark {...props}>
      <path d="M32 6 52 18v24L32 54 12 42V18L32 6Z" opacity="0.18" />
      <path d="M32 10 48 20v20L32 50 16 40V20L32 10Z" />
      <path
        d="M26 32c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path d="m36 36 4 4" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      <path d="m40 36-2 6 6-2" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  );
}

export function PracticeMark(props: IconProps) {
  return (
    <Mark {...props}>
      <path d="M32 8 52 20 32 32 12 20 32 8Z" />
      <path d="M12 28 32 40l20-12" opacity="0.55" />
      <path d="M12 38 32 50l20-12" opacity="0.3" />
    </Mark>
  );
}
