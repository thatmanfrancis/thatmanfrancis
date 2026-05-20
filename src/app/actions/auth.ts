"use server";

import { encrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(state: unknown, formData: FormData) {
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return { error: 'Invalid credentials.' };
  }

  const token = await encrypt({ email });
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect('/admin');
}
