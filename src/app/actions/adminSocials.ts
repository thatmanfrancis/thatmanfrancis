"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createSocial(formData: FormData) {
  const label = formData.get('label') as string;
  const href = formData.get('href') as string;
  const icon = formData.get('icon') as string;
  const order = Number(formData.get('order'));

  await prisma.socialLink.create({
    data: { label, href, icon, order },
  });

  revalidatePath('/admin/socials');
  redirect('/admin/socials');
}

export async function updateSocial(formData: FormData) {
  const id = formData.get('id') as string;
  const label = formData.get('label') as string;
  const href = formData.get('href') as string;
  const icon = formData.get('icon') as string;
  const order = Number(formData.get('order'));

  await prisma.socialLink.update({
    where: { id },
    data: { label, href, icon, order },
  });

  revalidatePath('/admin/socials');
  redirect('/admin/socials');
}

export async function deleteSocial(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath('/admin/socials');
  redirect('/admin/socials');
}
