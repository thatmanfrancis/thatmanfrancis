# Deploy on a VPS (Nginx + PM2)

Step-by-step for Ubuntu/Debian. No `ecosystem.config.js` — PM2 runs the npm start script directly.

Assumes:

- Domain pointed at the VPS (A record), e.g. `francisuzoigwe.me`
- Repo: https://github.com/thatmanfrancis/thatmanfrancis.git
- App path: `/var/www/thatmanfrancis`
- App runs on `127.0.0.1:3000`; Nginx terminates HTTPS

---

## 1. Server packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx postgresql postgresql-contrib git curl build-essential
```

Node 20+ (NodeSource example):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v20+
npm -v
```

PM2:

```bash
sudo npm install -g pm2
```

---

## 2. App user (recommended)

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG sudo deploy   # optional
sudo mkdir -p /var/www
sudo chown deploy:deploy /var/www
```

Then continue as `deploy` (or your user):

```bash
sudo -iu deploy
```

---

## 3. Clone the repo

```bash
cd /var/www
git clone https://github.com/thatmanfrancis/thatmanfrancis.git
cd thatmanfrancis
```

Private repo? Use a deploy key or `gh auth` / HTTPS token instead of a password.

---

## 4. PostgreSQL

As root/sudo:

```bash
sudo -u postgres psql
```

Inside `psql`:

```sql
CREATE USER thatmanfrancis WITH PASSWORD 'CHANGE_ME_DB_PASSWORD';
CREATE DATABASE thatmanfrancis OWNER thatmanfrancis;
GRANT ALL PRIVILEGES ON DATABASE thatmanfrancis TO thatmanfrancis;
\q
```

On newer Postgres you may also need:

```bash
sudo -u postgres psql -d thatmanfrancis -c "GRANT ALL ON SCHEMA public TO thatmanfrancis;"
```

Test:

```bash
psql "postgresql://thatmanfrancis:CHANGE_ME_DB_PASSWORD@127.0.0.1:5432/thatmanfrancis" -c '\conninfo'
```

---

## 5. Environment file on the server

```bash
cd /var/www/thatmanfrancis
cp .env.example .env
nano .env
```

Fill at least:

| Key | Example |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `NEXT_PUBLIC_SITE_URL` | `https://francisuzoigwe.me` |
| `DATABASE_URL` | `postgresql://thatmanfrancis:…@127.0.0.1:5432/thatmanfrancis?schema=public` |
| `AUTH_SECRET` | `openssl rand -hex 32` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | your admin login |
| `SEED_SECRET` | random string (for protected seed in prod) |
| ZeptoMail / Turnstile | optional |

Lock permissions:

```bash
chmod 600 .env
```

---

## 6. Install, migrate, build, seed

```bash
cd /var/www/thatmanfrancis
npm ci
npx prisma migrate deploy
npm run build
```

Seed once (creates admin + sample content if missing):

```bash
npm run db:seed
```

Or after the site is up (production requires `SEED_SECRET`):

```bash
curl -X POST "https://francisuzoigwe.me/api/admin/seed?secret=YOUR_SEED_SECRET"
# or
curl -X POST "https://francisuzoigwe.me/api/admin/seed" \
  -H "x-seed-secret: YOUR_SEED_SECRET"
```
---

## 7. Uploads directory permissions

Admin image uploads write under `public/uploads`:

```bash
mkdir -p /var/www/thatmanfrancis/public/uploads
chmod -R u+rwX /var/www/thatmanfrancis/public/uploads
```

If Nginx and the Node process share the same user (`deploy`), that is enough. If not, ensure the PM2 user owns that folder.

---

## 8. PM2 (no ecosystem file)

From the app directory:

```bash
cd /var/www/thatmanfrancis
pm2 start npm --name thatmanfrancis -- start
pm2 status
pm2 logs thatmanfrancis --lines 80
```

Persist across reboot:

```bash
pm2 save
pm2 startup
# run the command PM2 prints (sudo env PATH=...)
pm2 save
```

Useful later:

```bash
pm2 restart thatmanfrancis
pm2 stop thatmanfrancis
```

App should answer on `http://127.0.0.1:3000`.

---

## 9. Nginx reverse proxy

```bash
sudo nano /etc/nginx/sites-available/thatmanfrancis
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name francisuzoigwe.me www.francisuzoigwe.me;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }
}
```

Enable and test:

```bash
sudo ln -s /etc/nginx/sites-available/thatmanfrancis /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 10. HTTPS (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d francisuzoigwe.me -d www.francisuzoigwe.me
```

Confirm `NEXT_PUBLIC_SITE_URL` uses `https://…`, then:

```bash
cd /var/www/thatmanfrancis
npm run build
pm2 restart thatmanfrancis
```

---

## 11. Firewall (if ufw is on)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## Redeploy after git changes

```bash
cd /var/www/thatmanfrancis
git pull origin main
npm ci
npx prisma migrate deploy
npm run build
pm2 restart thatmanfrancis
```

---

## Checklist if something fails

| Symptom | Check |
| --- | --- |
| `502 Bad Gateway` | `pm2 status`, `pm2 logs`, curl `http://127.0.0.1:3000` |
| DB errors | `DATABASE_URL`, Postgres running, user owns DB |
| Admin login fails | seed ran, `AUTH_SECRET` unchanged after users were created |
| Images won’t upload | `public/uploads` writable by PM2 user |
| Wrong links / email logos | `NEXT_PUBLIC_SITE_URL` must be the public `https` origin |
| Build OOM | add swap or build with more RAM |

---

## Security notes

- Never commit `.env`
- Use a strong DB password and `AUTH_SECRET`
- Prefer a non-root `deploy` user for the app
- Keep `SEED_SECRET` set in production so seed is not open
