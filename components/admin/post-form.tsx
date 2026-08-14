"use client";

import { useActionState, useState } from "react";
import type { Post } from "@/lib/generated/prisma";
import { upsertPostAction } from "@/app/admin/actions";
import { ImageGalleryField } from "@/components/admin/image-gallery-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FieldLabel, SubmitButton } from "@/components/ui/form";

type PostFormProps = {
  post?: Post | null;
};

async function postAction(_prev: null, formData: FormData) {
  await upsertPostAction(formData);
  return null;
}

export function PostForm({ post }: PostFormProps) {
  const [, action, pending] = useActionState(postAction, null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && !pending;

  return (
    <form action={action} className="card-surface space-y-5 p-6 sm:p-8">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <div>
        <FieldLabel htmlFor="title" required>
          Title
        </FieldLabel>
        <input
          id="title"
          name="title"
          required
          disabled={pending}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="slug">Slug</FieldLabel>
        <input
          id="slug"
          name="slug"
          disabled={pending}
          defaultValue={post?.slug ?? ""}
          placeholder="auto-from-title"
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          disabled={pending}
          defaultValue={post?.excerpt ?? ""}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="content" required>
          Content
        </FieldLabel>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          disabled={pending}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="field-input font-mono text-sm"
          placeholder={`Write in Markdown. After uploading a cover or gallery image, you can also paste /uploads/... in the body:\n\n![Alt text](/uploads/photo.jpg)`}
        />
        <p className="mt-2 text-sm text-ink-muted">
          Supports Markdown. Inline images use a local upload path:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            ![caption](/uploads/photo.jpg)
          </code>
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ImageUploadField
          id="coverUrl"
          name="coverUrl"
          label="Cover image"
          defaultValue={post?.coverUrl}
          disabled={pending}
        />

        <div>
          <FieldLabel htmlFor="xPostUrl">Related X post URL</FieldLabel>
          <input
            id="xPostUrl"
            name="xPostUrl"
            type="url"
            disabled={pending}
            placeholder="https://x.com/you/status/..."
            defaultValue={post?.xPostUrl ?? ""}
            className="field-input"
          />
        </div>
      </div>

      <ImageGalleryField
        id="gallery"
        name="gallery"
        label="Gallery images"
        defaultValue={post?.gallery ?? []}
        disabled={pending}
      />

      {post ? (
        <p className="text-sm text-ink-muted">
          Site views: <strong className="text-ink">{post.viewCount}</strong>{" "}
          (tracked on this website only — not on X)
        </p>
      ) : null}

      <label className="inline-flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          disabled={pending}
          className="size-4 disabled:cursor-not-allowed disabled:opacity-60"
        />
        Published
      </label>

      <SubmitButton
        pending={pending}
        disabled={!canSubmit}
        idleLabel={post ? "Save post" : "Create post"}
        pendingLabel="Saving..."
      />
    </form>
  );
}
