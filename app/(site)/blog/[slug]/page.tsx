import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/post-content";
import { ViewTracker } from "@/components/blog/view-tracker";
import { MediaImage } from "@/components/ui/media-image";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/utils";
import { coverSrc } from "@/lib/placeholders";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import {
  getSiteOrigin,
  postJsonLd,
  publicPageMetadata,
  siteUrl,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.post.findFirst({
      where: { slug, published: true },
    });
    if (!post) return { title: "Post" };
    return publicPageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.coverUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    });
  } catch {
    return { title: "Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const settings = await getSettings();

  let post;
  try {
    post = await prisma.post.findFirst({
      where: { slug, published: true },
    });
  } catch {
    notFound();
  }

  if (!post) notFound();

  const origin = getSiteOrigin();
  const pageUrl = siteUrl(`/blog/${post.slug}`, origin);
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(pageUrl);
  const intentUrl = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  return (
    <article className="py-14 sm:py-20">
      <JsonLd
        data={postJsonLd({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          coverUrl: post.coverUrl,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          origin,
        })}
      />
      <ViewTracker slug={post.slug} />
      <div className="container-page max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink"
        >
          <ArrowLeftIcon className="size-4" />
          Back to blog
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          {post.publishedAt ? (
            <p className="section-label">{formatDate(post.publishedAt)}</p>
          ) : null}
          <span aria-hidden="true">·</span>
          <p>{post.viewCount} views</p>
        </div>
        <h1 className="heading mt-3">{post.title}</h1>
        {post.excerpt ? <p className="lede mt-4">{post.excerpt}</p> : null}

        <figure className="mt-10 overflow-hidden rounded-3xl border border-border bg-ink">
          <MediaImage
            src={coverSrc(post.coverUrl, post.slug)}
            alt={post.title}
            slot="cover-detail"
            className="h-auto max-h-[34rem] w-full object-cover"
          />
        </figure>

        <div className="mt-10">
          <PostContent content={post.content} />
        </div>

        {post.gallery.length > 0 ? (
          <section className="mt-12">
            <p className="section-label mb-4">Gallery</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {post.gallery.map((src) => (
                <figure
                  key={src}
                  className="overflow-hidden rounded-3xl border border-border bg-muted"
                >
                  <MediaImage
                    src={src}
                    alt=""
                    slot="gallery"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <a
            href={intentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Share on X
          </a>
          {post.xPostUrl ? (
            <a
              href={post.xPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              View related post on X
            </a>
          ) : null}
          {settings.socialX ? (
            <a
              href={settings.socialX}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Follow on X
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
