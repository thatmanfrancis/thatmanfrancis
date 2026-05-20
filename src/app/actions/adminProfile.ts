"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const email = formData.get('email') as string;
  const location = formData.get('location') as string;

  await prisma.profile.update({
    where: { id },
    data: { name, bio, email, location },
  });

  redirect('/admin');
}
