export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";
export const MAX_UPLOAD_MB = 8;

export function isLocalUploadUrl(url?: string | null) {
  return !!url && /^\/uploads\/[a-zA-Z0-9._-]+$/.test(url);
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsDataURL(file);
  });
}

export async function uploadImageDataUrl(
  dataUrl: string,
  replaceUrl?: string | null,
) {
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl, replaceUrl: replaceUrl || undefined }),
  });

  const data = (await response.json().catch(() => null)) as {
    url?: string;
    error?: string;
  } | null;

  if (!response.ok || !data?.url) {
    throw new Error(data?.error || "Upload failed");
  }

  return data.url;
}

export async function deleteUploadedImage(url: string) {
  const response = await fetch("/api/admin/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error || "Could not delete image");
  }
}
