import "@/app/globals.css";
import { prisma } from "@/lib/prisma";
import Link from 'next/link';

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const profile = await prisma.profile.findFirst();
  const blogCount = await prisma.blog.count();
  const projectCount = await prisma.project.count();
  const socialCount = await prisma.socialLink.count();

  return (
    <section style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Admin Dashboard
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px' }}>
        <div style={{ padding: '1.5rem', background: '#222', borderRadius: '8px', color: '#fff' }}>
          <h2>Profile</h2>
          <p style={{ margin: '1rem 0' }}>Manage your personal details, bio, and location.</p>
          <Link href="/admin/profile/edit" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'blue', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Edit Profile
          </Link>
        </div>

        <div style={{ padding: '1.5rem', background: '#222', borderRadius: '8px', color: '#fff' }}>
          <h2>Blogs ({blogCount})</h2>
          <p style={{ margin: '1rem 0' }}>Manage your blog posts.</p>
          <Link href="/admin/blogs" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#444', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Manage Blogs
          </Link>
        </div>

        <div style={{ padding: '1.5rem', background: '#222', borderRadius: '8px', color: '#fff' }}>
          <h2>Projects ({projectCount})</h2>
          <p style={{ margin: '1rem 0' }}>Manage your portfolio projects.</p>
          <Link href="/admin/projects" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#444', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Manage Projects
          </Link>
        </div>

        <div style={{ padding: '1.5rem', background: '#222', borderRadius: '8px', color: '#fff' }}>
          <h2>Social Links ({socialCount})</h2>
          <p style={{ margin: '1rem 0' }}>Manage your social media presence.</p>
          <Link href="/admin/socials" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#444', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Manage Socials
          </Link>
        </div>
      </div>
    </section>
  );
}
