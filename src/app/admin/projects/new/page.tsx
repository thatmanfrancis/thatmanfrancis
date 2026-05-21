import { createProject } from '@/app/actions/adminProjects';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" style={{ color: 'lightblue' }}>&larr; Back to Projects</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>New Project</h1>
      
      <form action={createProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', marginTop: '2rem' }}>
        <label>Title</label>
        <input name="title" required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Slug</label>
        <input name="slug" required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Index (e.g. 01)</label>
        <input name="index" required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Category</label>
        <input name="category" required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Description</label>
        <textarea name="description" required rows={3} style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Content (Markdown)</label>
        <textarea name="content" required rows={15} style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc', fontFamily: 'monospace' }} />
        
        <label>Technologies (Comma separated)</label>
        <input name="tech" placeholder="React, Next.js, Tailwind" style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Link (URL)</label>
        <input type="url" name="link" style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Image URL</label>
        <input type="url" name="image" style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Color (e.g. bg-blue-500)</label>
        <input name="color" defaultValue="bg-white" required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="featured" value="true" />
          Featured
        </label>
        
        <button type="submit" style={{ padding: '0.75rem', background: 'green', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Create Project</button>
      </form>
    </div>
  );
}
