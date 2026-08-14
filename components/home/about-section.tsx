import Link from "next/link";
import { MediaImage } from "@/components/ui/media-image";
import type { CopyBlock } from "@/lib/copy-blocks";
import { portraitSrc, PLACEHOLDER_PORTRAIT } from "@/lib/placeholders";

type AboutSectionProps = {
  title: string;
  body: string;
  imageUrl?: string | null;
  availability?: string | null;
  resumeUrl?: string | null;
  disciplines?: CopyBlock[];
  compact?: boolean;
};

export function AboutSection({
  title,
  body,
  imageUrl,
  availability,
  resumeUrl,
  disciplines = [],
  compact = false,
}: AboutSectionProps) {
  const src = portraitSrc(imageUrl);
  const isPlaceholder = src === PLACEHOLDER_PORTRAIT;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(18rem,22rem)_1fr] lg:gap-14">
      <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
        <div className="overflow-hidden rounded-4xl border border-border bg-ink">
          <MediaImage
            src={src}
            alt={isPlaceholder ? "Portrait placeholder" : title}
            slot="portrait"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <p className="mt-4 text-sm font-semibold tracking-wide text-ink-muted">
          {availability ?? "Open to collaborations"}
        </p>
        {isPlaceholder ? (
          <p className="mt-1 text-sm text-ink-muted">
            Placeholder photo — replace it in Admin → Settings.
          </p>
        ) : null}
      </div>

      <div>
        <p className="section-label mb-3">About</p>
        <h2 className="heading">{title}</h2>
        <div className="mt-5 whitespace-pre-wrap body-text text-ink text-lg leading-relaxed">
          {body}
        </div>
        {compact && disciplines.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {disciplines.map((item) => (
              <li
                key={item.title}
                className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-ink"
              >
                {item.title}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {compact ? (
            <Link href="/about" className="btn btn-ghost">
              More about me
            </Link>
          ) : (
            <Link href="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          )}
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Resume
            </a>
          ) : (
            <span className="btn btn-primary pointer-events-none opacity-55">
              Resume
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
