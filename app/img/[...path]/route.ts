import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MAX_EDGE = 2400;
const FITS = new Set(["cover", "contain", "inside"]);

type RouteProps = {
  params: Promise<{ path: string[] }>;
};

export async function GET(request: Request, { params }: RouteProps) {
  const { path: segments } = await params;
  const root = segments[0];
  if (root !== "uploads" && root !== "placeholders") {
    return new NextResponse("Not found", { status: 404 });
  }

  const relative = segments.join("/");
  if (
    !relative ||
    relative.includes("..") ||
    path.isAbsolute(relative) ||
    segments.some((part) => part.startsWith("."))
  ) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(PUBLIC_DIR, relative);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(PUBLIC_DIR))) {
    return new NextResponse("Not found", { status: 404 });
  }

  let buffer: Buffer;
  try {
    buffer = await readFile(resolved);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const body = new Uint8Array(buffer);

  const ext = path.extname(resolved).toLowerCase();
  if (ext === ".svg") {
    return new NextResponse(body, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const url = new URL(request.url);
  const width = clampEdge(url.searchParams.get("w"));
  const height = clampEdge(url.searchParams.get("h"));
  const fitParam = url.searchParams.get("fit") ?? "cover";
  const fit = FITS.has(fitParam) ? fitParam : "cover";
  const quality = clampQuality(url.searchParams.get("q"));

  if (!width && !height) {
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentTypeFor(ext),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  try {
    const image = sharp(buffer, { failOn: "none" }).rotate();
    const resized = await image
      .resize({
        width: width || undefined,
        height: height || undefined,
        fit: fit as keyof sharp.FitEnum,
        position: "attention",
        withoutEnlargement: fit === "inside",
      })
      .webp({ quality })
      .toBuffer();

    return new NextResponse(new Uint8Array(resized), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Could not process image", { status: 500 });
  }
}

function clampEdge(value: string | null) {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return Math.min(parsed, MAX_EDGE);
}

function clampQuality(value: string | null) {
  if (!value) return 80;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 80;
  return Math.min(100, Math.max(40, parsed));
}

function contentTypeFor(ext: string) {
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}
