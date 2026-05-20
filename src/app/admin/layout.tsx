import '@/app/globals.css';
import { logout } from '@/app/actions/logout';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', background: '#111', color: '#fff' }}>
          <a href="/admin" style={{ marginRight: '1rem', color: '#fff' }}>Dashboard</a>
          <a href="/admin/socials" style={{ marginRight: '1rem', color: '#fff' }}>Socials</a>
          <a href="/admin/blogs" style={{ marginRight: '1rem', color: '#fff' }}>Blogs</a>
          <form action={logout} style={{ display: 'inline' }}>
            <button type="submit" style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
          </form>
        </nav>
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
}
