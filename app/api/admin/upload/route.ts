import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  MAX_UPLOAD_BYTES,
  deleteLocalUpload,
  parseImageDataUrl,
  saveUploadBuffer,
} from "@/lib/uploads";

type UploadBody = {
  dataUrl?: string;
  replaceUrl?: string;
  url?: string;
};

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: UploadBody;
  try {
    body = (await request.json()) as UploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid upload payload" }, { status: 400 });
  }

  const parsed = typeof body.dataUrl === "string" ? parseImageDataUrl(body.dataUrl) : null;
  if (!parsed) {
    return NextResponse.json(
      { error: "Choose a JPG, PNG, WebP, or GIF image" },
      { status: 400 },
    );
  }

  if (parsed.buffer.length > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Image must be under 8MB" }, { status: 400 });
  }

  try {
    const url = await saveUploadBuffer(parsed.buffer, parsed.ext);
    if (body.replaceUrl) {
      await deleteLocalUpload(body.replaceUrl);
    }
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Could not save image",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: UploadBody;
  try {
    body = (await request.json()) as UploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid delete payload" }, { status: 400 });
  }

  if (!body.url) {
    return NextResponse.json({ error: "No image to delete" }, { status: 400 });
  }

  const deleted = await deleteLocalUpload(body.url);
  if (!deleted) {
    return NextResponse.json(
      { error: "That file is not a local upload, or it was already removed" },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
