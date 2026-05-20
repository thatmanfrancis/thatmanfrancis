import { prisma } from '@/lib/prisma';
import { deleteSocial } from '@/app/actions/adminSocials';
import Link from 'next/link';

export default async function AdminSocialsPage() {
  const socials = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem' }}>Social Links</h1>
        <Link href="/admin/socials/new" style={{ padding: '0.5rem 1rem', background: 'green', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>+ New Social Link</Link>
      </div>

      <ul style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
        {socials.map(s => (
          <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #333' }}>
            <div>
              <strong>{s.label}</strong> {s.icon ? `(${s.icon})` : ''} - {s.href}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href={`/admin/socials/${s.id}/edit`} style={{ color: 'lightblue' }}>Edit</Link>
              <form action={deleteSocial}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
