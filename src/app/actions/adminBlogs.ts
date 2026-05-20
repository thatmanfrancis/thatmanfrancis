"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createBlog(formData: FormData) {
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  await prisma.blog.create({
    data: { slug, title, excerpt, content, published },
  });

  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function updateBlog(formData: FormData) {
  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  await prisma.blog.update({
    where: { id },
    data: { slug, title, excerpt, content, published },
  });

  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function deleteBlog(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.blog.delete({ where: { id } });
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}
