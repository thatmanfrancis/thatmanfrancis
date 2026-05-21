"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;
  const email = formData.get('email') as string;
  const location = formData.get('location') as string;

  // Use upsert to handle both create and update
  if (id) {
    // Try to update if ID exists
    try {
      await prisma.profile.update({
        where: { id },
        data: { name, bio, email, location },
      });
    } catch (error) {
      // If update fails, create new profile
      await prisma.profile.create({
        data: { id, name, bio, email, location },
      });
    }
  } else {
    // Create new profile with default ID
    await prisma.profile.create({
      data: { 
        id: 'cl_profile',
        name, 
        bio, 
        email, 
        location 
      },
    });
  }

  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}
