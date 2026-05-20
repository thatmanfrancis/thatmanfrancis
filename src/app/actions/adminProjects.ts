"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  const slug = formData.get('slug') as string;
  const index = formData.get('index') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const tech = (formData.get('tech') as string).split(',').map((t) => t.trim()).filter(Boolean);
  const link = formData.get('link') as string;
  const image = formData.get('image') as string;
  const color = formData.get('color') as string;
  const featured = formData.get('featured') === 'true';

  await prisma.project.create({
    data: { slug, index, title, category, description, content, tech, link, image, color, featured },
  });

  redirect('/admin/projects');
}

export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const index = formData.get('index') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const content = formData.get('content') as string;
  const tech = (formData.get('tech') as string).split(',').map((t) => t.trim()).filter(Boolean);
  const link = formData.get('link') as string;
  const image = formData.get('image') as string;
  const color = formData.get('color') as string;
  const featured = formData.get('featured') === 'true';

  await prisma.project.update({
    where: { id },
    data: { slug, index, title, category, description, content, tech, link, image, color, featured },
  });

  redirect('/admin/projects');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.project.delete({ where: { id } });
  redirect('/admin/projects');
}
