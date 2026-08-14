import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { runDatabaseSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

/**
 * GET|POST /api/admin/seed
 *
 * Local (NODE_ENV !== production): open, or gated by SEED_SECRET if set.
 * Production: SEED_SECRET is required (?secret=… or x-seed-secret).
 *
 * Example: http://localhost:3000/api/admin/seed
 */
async function handle(request: NextRequest) {
  const configured = process.env.SEED_SECRET?.trim();
  const isProd = process.env.NODE_ENV === "production";

  if (isProd && !configured) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Seed is disabled in production until SEED_SECRET is set in the environment.",
      },
      { status: 403 },
    );
  }

  if (configured) {
    const fromQuery = request.nextUrl.searchParams.get("secret")?.trim();
    const fromHeader = request.headers.get("x-seed-secret")?.trim();
    if (fromQuery !== configured && fromHeader !== configured) {
      return NextResponse.json(
        { ok: false, error: "Invalid or missing seed secret" },
        { status: 401 },
      );
    }
  }

  try {
    const result = await runDatabaseSeed();
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/blog");
    revalidatePath("/about");
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/admin/posts");
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
