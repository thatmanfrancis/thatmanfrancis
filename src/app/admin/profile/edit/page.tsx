import { prisma } from '@/lib/prisma';
import { updateProfile } from '@/app/actions/adminProfile';
import Link from 'next/link';

export default async function EditProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div>
      <Link href="/admin" style={{ color: 'lightblue' }}>&larr; Back to Dashboard</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>Edit Profile</h1>
      <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginTop: '2rem' }}>
        <input type="hidden" name="id" value={profile?.id || ''} />
        
        <label>Name</label>
        <input name="name" defaultValue={profile?.name || ''} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Bio</label>
        <textarea name="bio" defaultValue={profile?.bio || ''} required rows={4} style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Email</label>
        <input type="email" name="email" defaultValue={profile?.email || ''} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <label>Location</label>
        <input name="location" defaultValue={profile?.location || ''} required style={{ padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }} />
        
        <button type="submit" style={{ padding: '0.75rem', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>Save Profile</button>
      </form>
    </div>
  );
}
