import { prisma } from '@/lib/prisma';
import { deleteBlog } from '@/app/actions/adminBlogs';
import Link from 'next/link';

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem' }}>Blogs</h1>
        <Link href="/admin/blogs/new" style={{ padding: '0.5rem 1rem', background: 'green', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Blog</Link>
      </div>

      <ul style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
        {blogs.map(b => (
          <li key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #333' }}>
            <div>
              <strong>{b.title}</strong>
              <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: b.published ? 'lightgreen' : 'gray' }}>{b.published ? 'Published' : 'Draft'}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href={`/admin/blogs/${b.id}/edit`} style={{ color: 'lightblue' }}>Edit</Link>
              <form action={deleteBlog}>
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
