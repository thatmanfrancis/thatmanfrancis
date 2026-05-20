import { prisma } from '@/lib/prisma';
import { deleteProject } from '@/app/actions/adminProjects';
import Link from 'next/link';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem' }}>Projects</h1>
        <Link href="/admin/projects/new" style={{ padding: '0.5rem 1rem', background: 'green', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Project</Link>
      </div>

      <ul style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
        {projects.map(p => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #333' }}>
            <div>
              <strong>{p.title}</strong>
              <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'gray' }}>({p.category})</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href={`/admin/projects/${p.id}/edit`} style={{ color: 'lightblue' }}>Edit</Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
