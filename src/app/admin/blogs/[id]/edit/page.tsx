import { prisma } from '@/lib/prisma';
import { updateBlog } from '@/app/actions/adminBlogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditBlogPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const blog = await prisma.blog.findUnique({ where: { id: params.id } });

  if (!blog) notFound();

  return (
    <div>
      <Link href="/admin/blogs" style={{ color: 'lightblue' }}>&larr; Back to Blogs</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>Edit Blog</h1>
      
      <form action={updateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', marginTop: '2rem' }}>
        <input type="hidden" name="id" value={blog.id} />
        
        <label>Title</label>
        <input name="title" defaultValue={blog.title} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Slug</label>
        <input name="slug" defaultValue={blog.slug} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Excerpt</label>
        <textarea name="excerpt" defaultValue={blog.excerpt} required rows={3} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Content (Markdown)</label>
        <textarea name="content" defaultValue={blog.content} required rows={15} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555', fontFamily: 'monospace' }} />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="published" value="true" defaultChecked={blog.published} />
          Published
        </label>
        
        <button type="submit" style={{ padding: '0.75rem', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Save Changes</button>
      </form>
    </div>
  );
}
