import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { TechMark } from "@/components/ui/tech-mark";
import { coverSrc } from "@/lib/placeholders";
import { kindLabel } from "@/lib/project";

type ProjectRowProps = {
  title: string;
  slug: string;
  summary: string;
  stack: string[];
  coverUrl?: string | null;
  role?: string | null;
  year?: string | null;
  reverse?: boolean;
  kind?: string | null;
};

export function ProjectRow({
  title,
  slug,
  summary,
  stack,
  coverUrl,
  role,
  year,
  reverse = false,
  kind,
}: ProjectRowProps) {
  const highlights = [kindLabel(kind), role, year].filter(Boolean) as string[];

  return (
    <article className="service-row grid items-center gap-10 border-b border-border py-14 last:border-b-0 lg:grid-cols-2 lg:gap-16">
      <div className={`flex flex-col gap-5 ${reverse ? "lg:order-2" : ""}`}>
        <h3 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          <Link href={`/work/${slug}`} className="transition hover:opacity-70">
            {title}
          </Link>
        </h3>
        <p className="body-text max-w-xl">{summary}</p>

        {highlights.length > 0 ? (
          <ul className="check-list max-w-xl space-y-3">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {stack.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {stack.slice(0, 6).map((item) => (
              <li key={item} className="tech-pill tech-pill-compact">
                <TechMark name={item} className="size-4" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href={`/work/${slug}`}
          className="inline-flex items-center gap-2 text-base font-semibold text-ink transition hover:opacity-70"
        >
          View project
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>

      <Link
        href={`/work/${slug}`}
        className={`service-row-media block ${reverse ? "lg:order-1" : ""}`}
      >
        <MediaImage
          src={coverSrc(coverUrl, slug)}
          alt={title}
          slot="cover-row"
          className="size-full rounded-4xl object-cover"
        />
      </Link>
    </article>
  );
}
