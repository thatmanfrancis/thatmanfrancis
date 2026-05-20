import { createBlog } from '@/app/actions/adminBlogs';
import Link from 'next/link';

export default function NewBlogPage() {
  return (
    <div>
      <Link href="/admin/blogs" style={{ color: 'lightblue' }}>&larr; Back to Blogs</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>New Blog</h1>
      
      <form action={createBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', marginTop: '2rem' }}>
        <label>Title</label>
        <input name="title" required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Slug (e.g. my-awesome-post)</label>
        <input name="slug" required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Excerpt</label>
        <textarea name="excerpt" required rows={3} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Content (Markdown)</label>
        <textarea name="content" required rows={15} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555', fontFamily: 'monospace' }} />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="published" value="true" />
          Published
        </label>
        
        <button type="submit" style={{ padding: '0.75rem', background: 'green', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Create Blog</button>
      </form>
    </div>
  );
}
