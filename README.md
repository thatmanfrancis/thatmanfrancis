# thatmanfrancis

Personal site for **Francis Kossyrisochukwu Uzoigwe** — portfolio, writing, and a small admin so the public pages stay current without a redeploy for every sentence.

Live home for selected work, a career timeline, notes on shipping, and a way to get in touch.

---

## What’s here

- **Public site** — Home, Work (career + case studies), Blog, About, Contact, FAQ
- **Admin CMS** — Projects, posts, messages, newsletter, site settings
- **Career timeline** — Years, role, company, place, job nature, bullets — editable from settings
- **Newsletter** — Subscriber list + campaign composer (ZeptoMail)
- **Contact inbox** — Form intake with optional Turnstile + rate limits
- **SEO** — Metadata, sitemap, RSS, JSON-LD, Open Graph

Brand is light-mode only: black / gray / white, Space Grotesk, FKU monoline mark.

---

## Stack

| Layer | Choice |
| --- | --- |
| App | Next.js 16 (App Router), React 19 |
| Style | Tailwind CSS 4 |
| Data | PostgreSQL + Prisma 7 (`@prisma/adapter-pg`) |
| Auth | Cookie session (`jose` + `bcryptjs`) |
| Media | Local uploads + Sharp resize via `/img` |
| Email | ZeptoMail (optional) |

---

## Quick start

```bash
npm install
cp .env.example .env   # if you keep an example; otherwise create .env
npx prisma migrate deploy
npm run db:seed        # or open /admin/seed while signed in locally
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

```bash
npm run build
npm start
```

---

## Environment

Required for a real run:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Session signing secret |
| `NEXT_PUBLIC_SITE_URL` | Public origin (e.g. `https://yourdomain.com`) |
| `ADMIN_EMAIL` | Admin login email (seed) |
| `ADMIN_PASSWORD` | Admin login password (seed) |

Useful optional vars:

| Variable | Purpose |
| --- | --- |
| `ADMIN_NAME` | Display name used in seed / mail from-name fallback |
| `SEED_SECRET` | Required to hit `/api/admin/seed` in production |
| `SEED_RESET_ADMIN_PASSWORD` | Set `1` to reset admin password on seed re-run |
| `ZEPTOMAIL_TOKEN` | ZeptoMail API token |
| `ZEPTOMAIL_FROM_EMAIL` | From address |
| `ZEPTOMAIL_FROM_NAME` | From name |
| `ZEPTOMAIL_REPLY_TO` | Reply-to |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (public) |
| `TURNSTILE_SECRET` | Turnstile secret |
| `TURNSTILE_HOSTNAMES` | Allowed hosts (default `localhost,127.0.0.1`) |

Never commit `.env`. Production needs a real `NEXT_PUBLIC_SITE_URL` so email logos, sitemap, and canonical URLs resolve correctly.

---

## Admin map

| Path | What it does |
| --- | --- |
| `/admin` | Dashboard |
| `/admin/projects` | Case studies |
| `/admin/posts` | Blog |
| `/admin/messages` | Contact inbox |
| `/admin/newsletter` | Campaigns + audience |
| `/admin/settings` | Copy, socials, career, FAQ, contact |
| `/admin/seed` | Bootstrap sample content (local / secret-gated) |

---

## Scripts

```bash
npm run dev          # development
npm run build        # prisma generate + next build
npm start            # production server
npm run db:migrate   # prisma migrate dev
npm run db:seed      # seed admin + sample content
npm run db:studio    # Prisma Studio
```

---

## Notes

- Light mode is forced on purpose — no OS dark-mode flip.
- Seed is safe to re-run for missing samples; it won’t wipe settings you’ve already edited.
- In production, protect seed with `SEED_SECRET`.

---

## Author

**Francis Kossyrisochukwu Uzoigwe** · Lagos, Nigeria  
`thatmanfrancis`

Built to be lived in — ship the site, then keep the story current from admin.
