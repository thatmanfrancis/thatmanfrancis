import { prisma } from '@/lib/prisma';
import { updateProject } from '@/app/actions/adminProjects';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  return (
    <div>
      <Link href="/admin/projects" style={{ color: 'lightblue' }}>&larr; Back to Projects</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>Edit Project</h1>
      
      <form action={updateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', marginTop: '2rem' }}>
        <input type="hidden" name="id" value={project.id} />
        
        <label>Title</label>
        <input name="title" defaultValue={project.title} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Slug</label>
        <input name="slug" defaultValue={project.slug} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Index</label>
        <input name="index" defaultValue={project.index} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Category</label>
        <input name="category" defaultValue={project.category} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Description</label>
        <textarea name="description" defaultValue={project.description} required rows={3} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Content (Markdown)</label>
        <textarea name="content" defaultValue={project.content} required rows={15} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555', fontFamily: 'monospace' }} />
        
        <label>Technologies (Comma separated)</label>
        <input name="tech" defaultValue={project.tech.join(', ')} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Link (URL)</label>
        <input type="url" name="link" defaultValue={project.link || ''} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Image URL</label>
        <input type="url" name="image" defaultValue={project.image || ''} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Color</label>
        <input name="color" defaultValue={project.color} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="featured" value="true" defaultChecked={project.featured} />
          Featured
        </label>
        
        <button type="submit" style={{ padding: '0.75rem', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Save Changes</button>
      </form>
    </div>
  );
}
