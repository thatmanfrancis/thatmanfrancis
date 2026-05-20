import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting cleanup...");
  try { await prisma.socialLink.deleteMany(); } catch (e) {}
  try { await prisma.blog.deleteMany(); } catch (e) {}
  try { await prisma.project.deleteMany(); } catch (e) {}
  try { await prisma.profile.deleteMany(); } catch (e) {}
  console.log("Cleanup complete.");

  // 1. Profile
  console.log("Creating profile...");
  await prisma.profile.create({
    data: {
      id: "cl_profile",
      name: "Francis Kossyrisochukwu Uzoigwe",
      bio: "Software Engineer dedicated to building exceptional digital products. With a focus on performance, accessibility, and user experience, I strive to create web applications that not only look great but also solve real-world problems efficiently.",
      email: "hello@thatmanfrancis.com",
      location: "Lagos, Nigeria",
    },
  });

  // 2. Projects
  const projects = [
    {
      slug: "shack",
      index: "01",
      title: "Shack",
      category: "Real Estate Ecosystem",
      description: "A decentralized platform for verified property transactions in Nigeria. Built to eliminate middle-man friction and provide transparent, agent-free house hunting.",
      content: "## The Project\n\nShack is a game-changer for the Nigerian real estate market. It addresses the lack of transparency and the high cost of agency fees by providing a direct connection between landlords and verified tenants.\n\n### Core Features\n- Verified listings only\n- Decentralized management\n- Zero agent fees\n- Real-time updates",
      tech: ["Next.js", "Prisma", "Tailwind CSS"],
      link: "https://shack.africa",
      color: "bg-white",
      featured: true,
    },
    {
      slug: "greenstone",
      index: "02",
      title: "Greenstone",
      category: "Infrastructure & API",
      description: "Enterprise-grade backend for global property data localization. Optimized for high-concurrency and secure cross-origin communication.",
      content: "## The Mission\n\nGreenstone provides the backbone for international property data exchange. It handles complex CORS policies and authentication flows across multiple regions.\n\n### Tech Stack\n- Node.js / Express\n- PostgreSQL\n- Redis for caching",
      tech: ["Node.js", "Express", "PostgreSQL"],
      link: "https://greenstone.africa",
      color: "bg-zinc-50",
      featured: true,
    },
    {
      slug: "portfolio",
      index: "03",
      title: "Portfolio",
      category: "Digital Presence",
      description: "A high-end personal archive focusing on architectural layout, premium typography, and smooth interaction design.",
      content: "## The Vision\n\nThis portfolio itself is a testament to the intersection of engineering and design. Built with Next.js 16 and Tailwind CSS v4.\n\n### Key Highlights\n- Custom sticky stacking layout\n- Premium typography with Outfit & Nunito\n- Fully dynamic Prisma/Postgres backend",
      tech: ["Next.js", "Outfit Font", "Tailwind CSS"],
      link: "/",
      color: "bg-white",
      featured: true,
    },
  ];

  for (const p of projects) {
    await prisma.project.create({
      data: p,
    });
  }

  // 3. Blogs
  const blogs = [
    {
      slug: "future-of-agentic-coding",
      title: "The Future of Agentic Coding",
      excerpt: "How AI agents are changing the way we build software, from IDE integrations to autonomous deployment pipelines.",
      content: "Content coming soon...",
      published: true,
    },
    {
      slug: "mastering-tailwind-v4",
      title: "Mastering Tailwind CSS v4",
      excerpt: "A deep dive into the new features of Tailwind CSS v4, including the native CSS-first configuration and @theme directive.",
      content: "Content coming soon...",
      published: true,
    },
  ];

  for (const b of blogs) {
    await prisma.blog.create({
      data: b,
    });
  }

  // 4. Socials
  const socials = [
    { label: "Twitter", href: "https://twitter.com/yourhandle" },
    { label: "GitHub", href: "https://github.com/yourhandle" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  ];

  for (const s of socials) {
    await prisma.socialLink.create({
      data: s,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
