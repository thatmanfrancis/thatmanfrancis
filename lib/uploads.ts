import { mkdir, unlink, writeFile } from "fs/promises";
import { randomBytes } from "crypto";
import path from "path";

export const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;

export type AllowedImageMime = keyof typeof MIME_TO_EXT;

export function isLocalUploadUrl(url?: string | null) {
  if (!url) return false;
  return /^\/uploads\/[a-zA-Z0-9._-]+$/.test(url);
}

export function localUploadPath(url: string) {
  if (!isLocalUploadUrl(url)) return null;
  return path.join(UPLOADS_DIR, path.basename(url));
}

export function parseImageDataUrl(dataUrl: string) {
  const match =
    /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=\s]+)$/.exec(
      dataUrl.trim(),
    );
  if (!match) return null;

  const mime = match[1] as AllowedImageMime;
  const buffer = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  if (!buffer.length || !looksLikeImage(buffer, mime)) return null;

  return { mime, buffer, ext: MIME_TO_EXT[mime] };
}

export async function saveUploadBuffer(buffer: Buffer, ext: string) {
  if (buffer.length > MAX_UPLOAD_BYTES) {
    throw new Error("Image must be under 8MB");
  }

  await mkdir(UPLOADS_DIR, { recursive: true });
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  await writeFile(path.join(UPLOADS_DIR, name), buffer);
  return `/uploads/${name}`;
}

export async function deleteLocalUpload(url?: string | null) {
  const filePath = url ? localUploadPath(url) : null;
  if (!filePath) return false;

    try {
      await unlink(filePath);
      return true;
    } catch (error) {
      return (error as NodeJS.ErrnoException).code === "ENOENT";
    }
}

function looksLikeImage(buffer: Buffer, mime: AllowedImageMime) {
  if (mime === "image/jpeg") return buffer[0] === 0xff && buffer[1] === 0xd8;
  if (mime === "image/png") {
    return buffer[0] === 0x89 && buffer.subarray(1, 4).toString() === "PNG";
  }
  if (mime === "image/gif") return buffer.subarray(0, 3).toString() === "GIF";
  if (mime === "image/webp") {
    return (
      buffer.subarray(0, 4).toString() === "RIFF" &&
      buffer.subarray(8, 12).toString() === "WEBP"
    );
  }
  return false;
}
