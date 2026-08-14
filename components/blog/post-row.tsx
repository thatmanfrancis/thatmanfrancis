import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { coverSrc } from "@/lib/placeholders";
import { formatDate } from "@/lib/utils";

type PostRowProps = {
  title: string;
  slug: string;
  excerpt: string | null;
  coverUrl?: string | null;
  publishedAt: Date | null;
  reverse?: boolean;
};

export function PostRow({
  title,
  slug,
  excerpt,
  coverUrl,
  publishedAt,
  reverse = false,
}: PostRowProps) {
  return (
    <article className="service-row grid items-center gap-10 border-b border-border py-14 last:border-b-0 lg:grid-cols-2 lg:gap-16">
      <div className={`flex flex-col gap-5 ${reverse ? "lg:order-2" : ""}`}>
        {publishedAt ? (
          <p className="section-label">{formatDate(publishedAt)}</p>
        ) : null}
        <h3 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          <Link href={`/blog/${slug}`} className="transition hover:opacity-70">
            {title}
          </Link>
        </h3>
        {excerpt ? <p className="body-text max-w-xl">{excerpt}</p> : null}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-base font-semibold text-ink transition hover:opacity-70"
        >
          Read post
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>

      <Link
        href={`/blog/${slug}`}
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
