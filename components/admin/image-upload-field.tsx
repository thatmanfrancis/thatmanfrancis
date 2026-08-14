"use client";

import { useRef, useState, type DragEvent } from "react";
import { FieldLabel } from "@/components/ui/form";
import { TrashIcon, UploadIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import type { MediaSlot } from "@/lib/media";
import {
  IMAGE_ACCEPT,
  MAX_UPLOAD_MB,
  deleteUploadedImage,
  fileToDataUrl,
  isLocalUploadUrl,
  uploadImageDataUrl,
} from "@/lib/upload-client";

type ImageUploadFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
  /** Classes for the img itself. Prefer aspect + object-cover. */
  previewClassName?: string;
  /** Caps the preview frame so tall photos don't blow up the form. */
  previewFrameClassName?: string;
  slot?: MediaSlot;
  disabled?: boolean;
};

export function ImageUploadField({
  id,
  name,
  label,
  defaultValue,
  hint,
  previewClassName = "aspect-[16/10] w-full object-cover",
  previewFrameClassName = "w-full max-w-sm",
  slot = "admin-wide",
  disabled = false,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locked = disabled || busy;

  async function handleFile(file: File | undefined) {
    if (!file || locked) return;
    setError(null);
    setBusy(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setPreview(dataUrl);
      const nextUrl = await uploadImageDataUrl(
        dataUrl,
        isLocalUploadUrl(url) ? url : undefined,
      );
      setUrl(nextUrl);
      setPreview(nextUrl);
    } catch (err) {
      setPreview(url);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove() {
    if (!url || locked) return;
    setError(null);
    setBusy(true);
    try {
      if (isLocalUploadUrl(url)) {
        await deleteUploadedImage(url);
      }
      setUrl("");
      setPreview("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete image");
    } finally {
      setBusy(false);
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    void handleFile(event.dataTransfer.files[0]);
  }

  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input type="hidden" id={id} name={name} value={url} />
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        className="sr-only"
        disabled={locked}
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {preview ? (
        <div className="flex justify-center">
          <div
            className={`overflow-hidden rounded-2xl border border-border bg-muted ${previewFrameClassName}`}
          >
            <div className="overflow-hidden">
              <MediaImage
                src={preview}
                alt=""
                slot={preview.startsWith("data:") ? undefined : slot}
                className={previewClassName}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 border-t border-border bg-white p-2.5">
              <button
                type="button"
                className="btn btn-ghost py-1.5 text-sm"
                disabled={locked}
                onClick={() => inputRef.current?.click()}
              >
                {busy ? "Saving..." : "Replace"}
              </button>
              <button
                type="button"
                className="btn btn-ghost py-1.5 text-sm"
                disabled={locked}
                onClick={() => void handleRemove()}
              >
                <TrashIcon className="size-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            if (!locked) setDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`rounded-2xl border border-dashed px-5 py-10 text-center transition ${
            dragging
              ? "border-ink bg-white"
              : "border-border bg-muted/60 hover:border-ink/40"
          }`}
        >
          <UploadIcon className="mx-auto size-8 text-ink/45" />
          <p className="mt-3 text-base font-semibold text-ink">
            {busy ? "Saving image..." : "Drop an image here"}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            or{" "}
            <button
              type="button"
              className="font-semibold text-ink underline-offset-2 hover:underline"
              disabled={locked}
              onClick={() => inputRef.current?.click()}
            >
              browse
            </button>{" "}
            · JPG, PNG, WebP, GIF · up to {MAX_UPLOAD_MB}MB
          </p>
        </div>
      )}

      {hint ? <p className="mt-2 text-sm text-ink-muted">{hint}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
