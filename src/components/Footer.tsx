import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Footer() {
  const socials = await prisma.socialLink.findMany({
    orderBy: { order: 'asc' }
  });

  const FOOTER_LINKS = [
    {
      heading: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      heading: "Social",
      links: socials.map(s => ({ label: s.label, href: s.href })),
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];
  return (
    <footer className="bg-white border-t border-zinc-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top row — brand + link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-zinc-900 font-outfit" style={{ fontVariant: 'small-caps' }}>
                Francis
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-[200px]">
              Software Engineer specializing in building premium digital experiences.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Francis Uzoigwe. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span>Built with passion in Nigeria</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
