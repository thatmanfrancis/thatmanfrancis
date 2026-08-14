export type TechMeta = {
  src: string;
  blurb: string;
};

const TECH: Record<string, TechMeta> = {
  typescript: {
    src: "/images/tech/typescript.svg",
    blurb: "Typed JavaScript for apps that stay readable as they grow.",
  },
  javascript: {
    src: "/images/tech/javascript.svg",
    blurb: "The language of the web — still the fastest way to ship an idea.",
  },
  html5: {
    src: "/images/tech/html5.svg",
    blurb: "Structure and semantics for pages that stay accessible.",
  },
  css3: {
    src: "/images/tech/css3.svg",
    blurb: "Layout, type, and motion — the surface people actually see.",
  },
  sass: {
    src: "/images/tech/sass.svg",
    blurb: "CSS with variables and structure when the design system grows.",
  },
  nextjs: {
    src: "/images/tech/nextjs.svg",
    blurb: "React on the server and the client, with routing that stays out of the way.",
  },
  react: {
    src: "/images/tech/react.svg",
    blurb: "Interfaces that update in place and stay easy to compose.",
  },
  reactnative: {
    src: "/images/tech/reactnative.svg",
    blurb: "Native mobile apps with the same React model.",
  },
  vue: {
    src: "/images/tech/vue.svg",
    blurb: "A calm component model when the project wants Vue.",
  },
  svelte: {
    src: "/images/tech/svelte.svg",
    blurb: "Compiled UI with less runtime weight.",
  },
  astro: {
    src: "/images/tech/astro.svg",
    blurb: "Content-heavy sites with islands of interactivity.",
  },
  vite: {
    src: "/images/tech/vite.svg",
    blurb: "Fast local builds so the feedback loop stays tight.",
  },
  prisma: {
    src: "/images/tech/prisma.svg",
    blurb: "A typed database client so queries stay honest with the schema.",
  },
  postgresql: {
    src: "/images/tech/postgresql.svg",
    blurb: "Relational data with enough muscle for real products.",
  },
  mysql: {
    src: "/images/tech/mysql.svg",
    blurb: "A familiar SQL database when the stack already lives there.",
  },
  sqlite: {
    src: "/images/tech/sqlite.svg",
    blurb: "Embedded SQL when a full server database is more than you need.",
  },
  mongodb: {
    src: "/images/tech/mongodb.svg",
    blurb: "Document storage when the shape of the data is still moving.",
  },
  redis: {
    src: "/images/tech/redis.svg",
    blurb: "Cache, queues, and fast keys when the hot path has to stay hot.",
  },
  graphql: {
    src: "/images/tech/graphql.svg",
    blurb: "Clients ask for exactly the fields they need.",
  },
  laravel: {
    src: "/images/tech/laravel.svg",
    blurb: "PHP, structured — routing, auth, and admin without the ceremony.",
  },
  php: {
    src: "/images/tech/php.svg",
    blurb: "The web's workhorse, still shipping a lot of production software.",
  },
  wordpress: {
    src: "/images/tech/wordpress.svg",
    blurb: "CMS work when editors need to own the pages.",
  },
  nodejs: {
    src: "/images/tech/nodejs.svg",
    blurb: "JavaScript on the server for APIs and tooling.",
  },
  express: {
    src: "/images/tech/express.svg",
    blurb: "A thin HTTP layer for APIs that stay easy to reason about.",
  },
  nestjs: {
    src: "/images/tech/nestjs.svg",
    blurb: "Structured Node APIs with modules, DI, and clear boundaries.",
  },
  python: {
    src: "/images/tech/python.svg",
    blurb: "Scripts, APIs, and the occasional data job.",
  },
  go: {
    src: "/images/tech/go.svg",
    blurb: "Simple concurrency for services that need to stay fast.",
  },
  rust: {
    src: "/images/tech/rust.svg",
    blurb: "Performance and safety when the cost of bugs is high.",
  },
  bun: {
    src: "/images/tech/bun.svg",
    blurb: "A fast JS runtime and toolkit for modern tooling.",
  },
  deno: {
    src: "/images/tech/deno.svg",
    blurb: "Secure-by-default TypeScript runtime for scripts and servers.",
  },
  tailwindcss: {
    src: "/images/tech/tailwindcss.svg",
    blurb: "Utility CSS so the design system lives next to the markup.",
  },
  flutter: {
    src: "/images/tech/flutter.svg",
    blurb: "Cross-platform UI when the product needs one codebase.",
  },
  electron: {
    src: "/images/tech/electron.svg",
    blurb: "Desktop apps with web tech when that trade-off is right.",
  },
  pwa: {
    src: "/images/tech/pwa.svg",
    blurb: "Installable web apps that still feel like the browser.",
  },
  docker: {
    src: "/images/tech/docker.svg",
    blurb: "Containers so the app runs the same on every machine.",
  },
  pm2: {
    src: "/images/tech/pm2.svg",
    blurb: "Process manager for Node apps — restarts, clustering, and keep-alive.",
  },
  kubernetes: {
    src: "/images/tech/kubernetes.svg",
    blurb: "Orchestration when one container is not enough.",
  },
  nginx: {
    src: "/images/tech/nginx.svg",
    blurb: "Reverse proxy, TLS, and static delivery in production.",
  },
  linux: {
    src: "/images/tech/linux.svg",
    blurb: "The servers most products actually run on.",
  },
  aws: {
    src: "/images/tech/aws.svg",
    blurb: "Cloud infrastructure when the product needs room to scale.",
  },
  cloudflare: {
    src: "/images/tech/cloudflare.svg",
    blurb: "CDN, DNS, Workers, and edge protection.",
  },
  vercel: {
    src: "/images/tech/vercel.svg",
    blurb: "Preview deploys and edge hosting for frontend-heavy apps.",
  },
  digitalocean: {
    src: "/images/tech/digitalocean.svg",
    blurb: "Straightforward cloud droplets and managed services.",
  },
  supabase: {
    src: "/images/tech/supabase.svg",
    blurb: "Postgres, auth, and storage without standing up the stack yourself.",
  },
  firebase: {
    src: "/images/tech/firebase.svg",
    blurb: "Auth, data, and hosting when the product needs to move fast.",
  },
  stripe: {
    src: "/images/tech/stripe.svg",
    blurb: "Payments and billing without rebuilding the money layer.",
  },
  git: {
    src: "/images/tech/git.svg",
    blurb: "Version control — the backbone of every serious codebase.",
  },
  github: {
    src: "/images/tech/github.svg",
    blurb: "Code, PRs, and CI where the team already collaborates.",
  },
  figma: {
    src: "/images/tech/figma.svg",
    blurb: "Design files that engineering can actually work from.",
  },
  jest: {
    src: "/images/tech/jest.svg",
    blurb: "Unit and integration tests for the parts that must not drift.",
  },
  playwright: {
    src: "/images/tech/playwright.svg",
    blurb: "End-to-end browser tests that catch what unit tests miss.",
  },
};

const ALIASES: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  html: "html5",
  css: "css3",
  scss: "sass",
  next: "nextjs",
  "next.js": "nextjs",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  postgres: "postgresql",
  "node.js": "nodejs",
  node: "nodejs",
  "react native": "reactnative",
  "react-native": "reactnative",
  k8s: "kubernetes",
  "amazon web services": "aws",
  amazonwebservices: "aws",
  "amazon aws": "aws",
  gh: "github",
  "digital ocean": "digitalocean",
  nest: "nestjs",
  "nest.js": "nestjs",
  golang: "go",
  "pm 2": "pm2",
};

export function skillKey(name: string) {
  const trimmed = name.trim().toLowerCase();
  if (ALIASES[trimmed]) return ALIASES[trimmed];
  return trimmed.replace(/[^a-z0-9]+/g, "");
}

export function techFor(name: string): TechMeta | null {
  return TECH[skillKey(name)] ?? null;
}

/** All known tech keys (for docs / admin hints). */
export function knownTechNames() {
  return Object.keys(TECH).sort();
}
