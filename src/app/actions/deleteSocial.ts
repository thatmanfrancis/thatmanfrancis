"use server";


import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function deleteSocial(id: any) {
  // 1. Delete the record using the ID passed directly to the function
  await prisma.socialLink.delete({ 
    where: { id: String(id) } // Enforcing String case if your DB uses string IDs/UUIDs
  });
  
  // 2. Redirect the user back to the admin page
  redirect('/admin/socials');
}