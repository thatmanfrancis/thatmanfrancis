# Portfolio build

This Next.js portfolio exports static files. It needs Node.js for development and builds. Any static web host can serve the finished site.

## Redesign foundation

The homepage is intentionally blank. Tailwind v4 exposes the font-heading and font-body utilities, using Syne and DM Sans. Portfolio copy is available in content/portfolio.ts.

## Run locally and build

```sh
npm ci
npm run dev
npm run build
```

Open the address printed by the development command. After building, deploy the contents of `out/`. Configure the host to serve directory index files and use `404.html` for missing pages. For a local preview of the production files, run `python -m http.server 4173 --directory out` and visit `http://localhost:4173`.

The site requires no database, environment variables, admin sign-in, or server process in production.

When replacing the CV PDF, regenerate the two WebP page previews in public/cv from the updated PDF. If the page count or dimensions change, update the preview list and image dimensions in app/cv-dialog.tsx.
