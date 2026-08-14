"use client";

import { useRef, useState, type DragEvent } from "react";
import { FieldLabel } from "@/components/ui/form";
import { TrashIcon, UploadIcon } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import {
  IMAGE_ACCEPT,
  MAX_UPLOAD_MB,
  deleteUploadedImage,
  fileToDataUrl,
  isLocalUploadUrl,
  uploadImageDataUrl,
} from "@/lib/upload-client";

type ImageGalleryFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string[];
  disabled?: boolean;
};

export function ImageGalleryField({
  id,
  name,
  label,
  defaultValue = [],
  disabled = false,
}: ImageGalleryFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState(defaultValue.filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locked = disabled || busy;

  async function handleFiles(fileList: FileList | null) {
    const files = fileList ? Array.from(fileList) : [];
    if (!files.length || locked) return;
    setError(null);
    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const dataUrl = await fileToDataUrl(file);
        uploaded.push(await uploadImageDataUrl(dataUrl));
      }
      setUrls((current) => [...current, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove(url: string) {
    if (locked) return;
    setError(null);
    setBusy(true);
    try {
      if (isLocalUploadUrl(url)) {
        await deleteUploadedImage(url);
      }
      setUrls((current) => current.filter((item) => item !== url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete image");
    } finally {
      setBusy(false);
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    void handleFiles(event.dataTransfer.files);
  }

  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input type="hidden" id={id} name={name} value={urls.join("\n")} />
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        multiple
        className="sr-only"
        disabled={locked}
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {urls.length > 0 ? (
        <ul className="mb-4 grid gap-3 sm:grid-cols-2">
          {urls.map((url) => (
            <li
              key={url}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <MediaImage
                src={url}
                alt=""
                slot="gallery"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex justify-end border-t border-border p-2">
                <button
                  type="button"
                  className="btn btn-ghost py-1.5 text-sm"
                  disabled={locked}
                  onClick={() => void handleRemove(url)}
                >
                  <TrashIcon className="size-4" />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <div
        onDragEnter={(event) => {
          event.preventDefault();
          if (!locked) setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`rounded-2xl border border-dashed px-5 py-8 text-center transition ${
          dragging
            ? "border-ink bg-white"
            : "border-border bg-muted/60 hover:border-ink/40"
        }`}
      >
        <UploadIcon className="mx-auto size-7 text-ink/45" />
        <p className="mt-3 text-base font-semibold text-ink">
          {busy ? "Saving images..." : "Add gallery images"}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Drop files here or{" "}
          <button
            type="button"
            className="font-semibold text-ink underline-offset-2 hover:underline"
            disabled={locked}
            onClick={() => inputRef.current?.click()}
          >
            browse
          </button>{" "}
          · up to {MAX_UPLOAD_MB}MB each
        </p>
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
