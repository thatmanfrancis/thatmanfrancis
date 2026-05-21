import { prisma } from '@/lib/prisma';
import { updateProfile } from '@/app/actions/adminProfile';
import Link from 'next/link';

export default async function EditProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div>
      <Link href="/admin" style={{ color: 'lightblue' }}>&larr; Back to Dashboard</Link>
      <h1 style={{ marginTop: '1rem', fontSize: '2rem' }}>
        {profile ? 'Edit Profile' : 'Create Profile'}
      </h1>
      <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginTop: '2rem' }}>
        <input type="hidden" name="id" value={profile?.id || 'cl_profile'} />
        
        <label>Name</label>
        <input name="name" defaultValue={profile?.name || 'Francis Kossyrisochukwu Uzoigwe'} required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Bio</label>
        <textarea name="bio" defaultValue={profile?.bio || 'Software Engineer building thoughtful digital products.'} required rows={4} style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Email</label>
        <input type="email" name="email" defaultValue={profile?.email || 'kossyuzoigwe@gmail.com'} required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <label>Location</label>
        <input name="location" defaultValue={profile?.location || 'Lagos, Nigeria'} required style={{ padding: '0.5rem', background: '#fff', color: '#000', border: '1px solid #ccc' }} />
        
        <button type="submit" style={{ padding: '0.75rem', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
          {profile ? 'Save Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}
