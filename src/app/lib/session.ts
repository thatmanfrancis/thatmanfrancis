import 'server-only';
import { SignJWT, jwtVerify } from 'jose';

export async function encrypt(payload: Record<string, unknown>) {
  const secret = process.env.SESSION_SECRET ?? '';
  const encoded = new TextEncoder().encode(secret);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoded);
}

export async function decrypt(token: string | undefined) {
  if (!token) return null;
  const secret = process.env.SESSION_SECRET ?? '';
  const encoded = new TextEncoder().encode(secret);
  try {
    const { payload } = await jwtVerify(token, encoded, { algorithms: ['HS256'] });
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  // noop placeholder; actual deletion handled via cookie removal in logout action
}
