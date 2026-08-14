import ReactMarkdown from "react-markdown";
import { MediaImage } from "@/components/ui/media-image";

type PostContentProps = {
  content: string;
};

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="post-content">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="body-text text-ink">{children}</p>,
          h2: ({ children }) => (
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-ink">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-bold tracking-tight text-ink">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 body-text text-ink">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 body-text text-ink">
              {children}
            </ol>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-ink underline underline-offset-4"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-ink/20 pl-4 italic text-ink-muted">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium text-ink">
              {children}
            </code>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            return (
              <figure className="my-8 overflow-hidden rounded-3xl border border-border bg-muted">
                <MediaImage
                  src={src}
                  alt={alt || ""}
                  slot="content"
                  className="h-auto w-full object-cover"
                />
                {alt ? (
                  <figcaption className="px-4 py-3 text-sm text-ink-muted">
                    {alt}
                  </figcaption>
                ) : null}
              </figure>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
