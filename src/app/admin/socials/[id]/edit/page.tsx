import { prisma } from '@/lib/prisma';
import { updateSocial } from '@/app/actions/adminSocials';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditSocialPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const social = await prisma.socialLink.findUnique({ where: { id: params.id } });

  if (!social) notFound();

  return (
    <div>
      <Link href="/admin/socials" style={{ color: 'lightblue' }}>&larr; Back to Social Links</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>Edit Social Link</h1>
      
      <form action={updateSocial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginTop: '2rem' }}>
        <input type="hidden" name="id" value={social.id} />
        
        <label>Label</label>
        <input name="label" defaultValue={social.label} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>URL (href)</label>
        <input type="url" name="href" defaultValue={social.href} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Icon</label>
        <input name="icon" defaultValue={social.icon || ''} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Order</label>
        <input type="number" name="order" defaultValue={social.order} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <button type="submit" style={{ padding: '0.75rem', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Save Changes</button>
      </form>
    </div>
  );
}
