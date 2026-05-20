import { createSocial } from '@/app/actions/adminSocials';
import Link from 'next/link';

export default function NewSocialPage() {
  return (
    <div>
      <Link href="/admin/socials" style={{ color: 'lightblue' }}>&larr; Back to Social Links</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>New Social Link</h1>
      
      <form action={createSocial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginTop: '2rem' }}>
        <label>Label</label>
        <input name="label" required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>URL (href)</label>
        <input type="url" name="href" required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Icon (Optional string identifier)</label>
        <input name="icon" style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Order (Number)</label>
        <input type="number" name="order" defaultValue="0" required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <button type="submit" style={{ padding: '0.75rem', background: 'green', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Create Social Link</button>
      </form>
    </div>
  );
}
