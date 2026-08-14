import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  clearSessionCookie,
  createSessionToken,
  getSession,
  setSessionCookie,
} from "@/lib/session";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    // Layouts/pages are RSC — cookie deletes only work in Actions / Route Handlers.
    try {
      await clearSessionCookie();
    } catch {
      // Stale JWT; proxy clears invalid tokens on the next /admin navigation.
    }
    return null;
  }

  return user;
}

export async function loginAdmin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
  });
  await setSessionCookie(token);

  return { id: user.id, email: user.email, name: user.name };
}

export {
  clearSessionCookie,
  getSession,
  SESSION_COOKIE,
  verifySessionToken,
} from "@/lib/session";
