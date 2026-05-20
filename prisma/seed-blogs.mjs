import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 40 realistic blog posts covering engineering, design, and software craft
const blogs = [
  {
    slug: "future-of-agentic-coding",
    title: "The Future of Agentic Coding",
    excerpt: "How AI agents are changing the way we build software, from IDE integrations to autonomous deployment pipelines.",
    content: "AI agents are no longer a novelty. They are becoming embedded in the very tools we use to write, review, and ship code every single day.\n\nFrom inline suggestions that feel telepathic to agents that can open pull requests and fix failing CI pipelines, the developer experience is shifting beneath our feet.\n\n## What Makes an Agent Different\n\nA traditional AI assistant waits for your prompt. An agentic system acts on goals. It can reason over a codebase, plan a sequence of steps, call tools, and iterate until it achieves an objective.\n\nThis is the difference between a calculator and a colleague.\n\n## What This Means for Engineers\n\nThe role of a software engineer is evolving. Not disappearing — evolving. The engineers who will thrive are those who can direct, evaluate, and course-correct autonomous systems with high precision.\n\nThe craft is shifting from writing every line to designing the systems that write lines on your behalf.",
    published: true,
  },
  {
    slug: "mastering-tailwind-v4",
    title: "Mastering Tailwind CSS v4",
    excerpt: "A deep dive into the new features of Tailwind CSS v4, including the native CSS-first configuration and @theme directive.",
    content: "Tailwind CSS v4 represents the most significant architectural shift in the framework's history. It moves configuration entirely into CSS, eliminating the need for a JavaScript config file.\n\n## The @theme Directive\n\nThe @theme block is where you now define your design tokens. Colors, fonts, spacing scales — all live in CSS variables that Tailwind reads at build time.\n\n```css\n@theme {\n  --color-brand: hsl(240 80% 60%);\n  --font-display: 'Outfit', sans-serif;\n}\n```\n\n## Lightning-Fast Builds\n\nWith the new Rust-based engine (Oxide), cold builds on large projects have been clocked at under 100ms. Incremental builds are near-instant.\n\n## Upgrade Path\n\nThe upgrade from v3 is straightforward for most projects. The breaking changes are well-documented and the codemods handle the majority of the mechanical work.",
    published: true,
  },
  {
    slug: "building-with-nextjs-app-router",
    title: "Building with the Next.js App Router",
    excerpt: "A practical guide to leveraging Server Components, streaming, and nested layouts in Next.js 13+.",
    content: "The App Router changed everything about how we think about rendering in Next.js. Server Components, layouts, loading states, and streaming are now first-class primitives.\n\n## Server Components by Default\n\nEvery component in the app directory is a Server Component unless you opt in to the client with 'use client'. This means your data-fetching logic lives at the component level, not in a separate getServerSideProps function.\n\n## Nested Layouts\n\nLayouts wrap children and persist across navigation. A dashboard layout stays mounted while inner pages transition. This enables persistent sidebars, headers, and shell UIs with zero extra work.\n\n## Streaming with Suspense\n\nWrap slow components in Suspense and stream their HTML to the client as it becomes ready. Your page shell loads immediately while data-heavy sections arrive progressively.",
    published: true,
  },
  {
    slug: "postgres-performance-at-scale",
    title: "PostgreSQL Performance at Scale",
    excerpt: "Indexing strategies, query planning, and connection pooling techniques that keep Postgres fast under load.",
    content: "PostgreSQL is one of the most powerful relational databases ever built. But default configurations are optimized for correctness, not performance. Here is how to tune it for production workloads.\n\n## Indexing That Matters\n\nNot all indexes are created equal. A full-table scan on a 10 million row table will destroy your response times. Partial indexes, composite indexes, and GIN indexes for JSONB fields can reduce query times by orders of magnitude.\n\n## The Query Planner\n\nRun EXPLAIN ANALYZE on your slow queries. The planner will tell you exactly what it is doing and where it is spending time. Sequential scans on large tables are a red flag.\n\n## Connection Pooling\n\nDo not let every serverless function open its own database connection. PgBouncer or Supabase's built-in pooler will save you from connection exhaustion under traffic spikes.",
    published: true,
  },
  {
    slug: "typography-as-engineering",
    title: "Typography as Engineering",
    excerpt: "Why font loading, variable fonts, and optical sizing are as much an engineering concern as a design one.",
    content: "Typography is not decoration. It is the primary medium through which information is transferred on the web. Getting it wrong is a performance and user experience failure, not merely an aesthetic one.\n\n## Font Loading Performance\n\nFlashes of invisible text and layout shifts are caused by poor font loading strategies. font-display: swap is a starting point. Preloading critical fonts and using font subsetting for non-Latin character sets is the next level.\n\n## Variable Fonts\n\nA single variable font file can replace a family of six or more static files. The performance win is significant, and the design flexibility — being able to animate font weight or width — opens up interactions that were previously impossible.\n\n## Optical Sizing\n\nModern variable fonts support optical sizing, adjusting letterform details automatically based on the rendered size. At display sizes, strokes thin. At body sizes, they thicken for legibility. This is no longer a print-only luxury.",
    published: true,
  },
  {
    slug: "prisma-deep-dive",
    title: "A Deep Dive into Prisma ORM",
    excerpt: "From schema design to advanced query patterns, relation loading, and raw SQL escape hatches.",
    content: "Prisma is the most developer-friendly ORM in the Node.js ecosystem. Its type-safe client, schema-first approach, and excellent migration tooling make it the obvious choice for modern backend work.\n\n## Schema Design Principles\n\nYour Prisma schema is the single source of truth for your data model. Treat it like you treat your API contract — carefully, with versioning in mind.\n\n## Relation Loading\n\nPrisma uses a distinct query per relation by default, avoiding the N+1 problem that plagues traditional ORMs using joins. For complex queries, you can use select to fetch exactly the fields you need.\n\n## Raw SQL When You Need It\n\nFor advanced use cases — full-text search, complex aggregations, CTEs — Prisma's prisma.$queryRaw escape hatch gives you full SQL access while keeping type safety through tagged template literals.",
    published: true,
  },
  {
    slug: "design-systems-in-practice",
    title: "Design Systems in Practice",
    excerpt: "How to build a design system that actually gets adopted — tokens, components, and the social layer.",
    content: "A design system is not a component library. It is a shared language between designers and engineers, backed by tooling and maintained like a product.\n\n## Start with Tokens\n\nDesign tokens are the atomic decisions: colors, spacing, radius, shadow, typography. Before you write a single component, establish your token vocabulary. Tools like Style Dictionary can transform token JSON into CSS variables, TypeScript constants, and Swift enums simultaneously.\n\n## The Social Layer\n\nThe hardest part of a design system is not the code. It is getting people to use it. Document everything. Run office hours. Celebrate contributions. A system without champions is a system that dies.\n\n## Versioning and Breaking Changes\n\nVersion your design system like a library. Semantic versioning signals intent. Breaking changes in a design token ripple through every surface that uses it.",
    published: true,
  },
  {
    slug: "redis-caching-strategies",
    title: "Redis Caching Strategies for Node.js",
    excerpt: "Cache-aside, write-through, and TTL management patterns that eliminate database bottlenecks.",
    content: "Redis is often described as a simple key-value store. It is far more than that. It is a data structure server with support for strings, hashes, lists, sets, sorted sets, streams, and hyperloglogs.\n\n## Cache-Aside Pattern\n\nThe application checks Redis before hitting the database. On a cache miss, it fetches from the database, stores the result in Redis with a TTL, and returns the data. On subsequent requests, Redis answers directly.\n\n## Write-Through Pattern\n\nEvery write to the database also writes to Redis. The cache is always warm. The cost is additional write latency, which is often acceptable for read-heavy workloads.\n\n## TTL Management\n\nSetting appropriate TTLs is an art. Too short and you get cache thrashing. Too long and you serve stale data. Event-based invalidation — deleting or updating cache entries when the underlying data changes — is the most robust strategy for dynamic content.",
    published: true,
  },
  {
    slug: "accessibility-beyond-compliance",
    title: "Accessibility Beyond Compliance",
    excerpt: "True accessibility is not about passing audits. It is about building software that works for everyone.",
    content: "Accessibility compliance means passing an automated audit. Accessibility excellence means your product works for a blind user, a motor-impaired user, a user on a slow connection, and a user with cognitive differences.\n\n## Keyboard Navigation\n\nEvery interactive element must be reachable and operable by keyboard. Focus indicators must be visible. Tab order must be logical. This is not optional.\n\n## Screen Reader Semantics\n\nARIA attributes are a last resort. Use semantic HTML first. A button element with meaningful text content communicates its role, state, and label without a single ARIA attribute.\n\n## Reduced Motion\n\nAnimations that feel delightful to most users can trigger vestibular disorders in others. The prefers-reduced-motion media query lets you provide an alternative experience that respects user system preferences.",
    published: true,
  },
  {
    slug: "api-design-principles",
    title: "API Design Principles That Last",
    excerpt: "Resource naming, versioning strategy, error formats, and the hidden costs of breaking changes.",
    content: "A good API is a product. It has users who depend on its contract, and breaking that contract has real costs that ripple through codebases you have never seen.\n\n## Resource Naming\n\nNouns, not verbs. /articles not /getArticles. Plural resources. Consistent naming across your entire surface area. These are not preferences — they are the foundation of predictability.\n\n## Versioning Strategy\n\nURL versioning (/v1/articles) is the most discoverable approach. Header versioning is cleaner but less transparent. Whatever you choose, choose it consistently and document the deprecation policy before you ship v1.\n\n## Error Formats\n\nReturn errors in a consistent structure. Include a machine-readable code, a human-readable message, and optionally a docs URL. Clients should never have to parse error message strings to determine what went wrong.",
    published: true,
  },
  {
    slug: "shipping-fast-without-breaking-things",
    title: "Shipping Fast Without Breaking Things",
    excerpt: "Feature flags, canary deployments, and the testing pyramid that enables confident continuous delivery.",
    content: "The goal is not to slow down. The goal is to be confident. Confidence comes from systems, not caution.\n\n## Feature Flags\n\nDecouple deployment from release. A feature can be shipped to production behind a flag, tested with internal users, gradually rolled out by percentage, and killed instantly if something goes wrong — all without a deployment.\n\n## Canary Deployments\n\nRoute a small percentage of production traffic to a new version. Monitor error rates, latency, and business metrics. If everything looks good, gradually shift more traffic. If something breaks, roll back instantly.\n\n## The Testing Pyramid\n\nMany fast unit tests. Fewer integration tests. Even fewer end-to-end tests. The pyramid shape is intentional — fast tests give fast feedback. Slow tests catch what fast tests miss.",
    published: true,
  },
  {
    slug: "monorepo-architecture",
    title: "Monorepo Architecture with Turborepo",
    excerpt: "Organizing a large codebase into a monorepo using Turborepo's pipeline caching and workspace dependency graph.",
    content: "A monorepo is not a single repository with all your code thrown in. It is a repository with a dependency graph, a build system that understands that graph, and tooling that makes cross-package changes safe and fast.\n\n## Turborepo Pipelines\n\nTurborepo's pipeline configuration defines task dependencies. When you run build, it knows that the app depends on the ui package, which depends on the tokens package. It runs them in the right order, in parallel where possible.\n\n## Remote Caching\n\nTurborepo can cache build artifacts remotely. If a package has not changed since the last build, it restores from cache instead of rebuilding. In a CI environment, this can reduce build times from minutes to seconds.\n\n## Workspace Management\n\nPNPM workspaces give you a shared node_modules with isolated package graphs per workspace. Phantom dependencies become impossible. Version mismatches are explicit.",
    published: true,
  },
  {
    slug: "state-management-in-2025",
    title: "State Management in 2025",
    excerpt: "Why Zustand, Jotai, and React Query have replaced Redux for most modern React applications.",
    content: "Redux was the right answer for its time. Global, predictable state with a strict unidirectional data flow was a significant improvement over the chaos of prop drilling and scattered local state.\n\nBut Redux carried enormous boilerplate. Actions, reducers, action creators, selectors — the ceremony was real.\n\n## Zustand: Minimal Global State\n\nZustand gives you a global store in about ten lines. No context providers. No boilerplate. It is just a hook.\n\n## Jotai: Atomic State\n\nJotai models state as atoms — minimal, independent pieces that components can subscribe to individually. Derived state is computed from other atoms. It is Recoil done right.\n\n## React Query: Server State is Different\n\nServer state has different characteristics than client state. It is asynchronous, can be stale, needs background refetching, and should be cached. React Query handles all of this and eliminates the need to manage loading, error, and data states manually.",
    published: true,
  },
  {
    slug: "css-container-queries",
    title: "CSS Container Queries Change Everything",
    excerpt: "How container queries enable truly component-scoped responsive design, independent of viewport size.",
    content: "Media queries are viewport-scoped. They describe the environment in which your page lives. Container queries are component-scoped. They describe the space in which a component lives.\n\nThis is a fundamental difference.\n\n## The Problem with Media Queries for Components\n\nA card component that needs to switch from a vertical to horizontal layout does not know or care about the viewport width. It cares about how much space it has been given. A container query expresses this naturally.\n\n## Syntax\n\n```css\n.card-container {\n  container-type: inline-size;\n}\n\n@container (min-width: 400px) {\n  .card {\n    flex-direction: row;\n  }\n}\n```\n\n## Browser Support\n\nContainer queries are now supported in all modern browsers. There is no reason not to use them for new component development.",
    published: true,
  },
  {
    slug: "web-performance-core-vitals",
    title: "Web Performance and Core Web Vitals",
    excerpt: "LCP, CLS, INP — understanding Google's performance metrics and the engineering decisions that move them.",
    content: "Core Web Vitals are Google's attempt to measure user experience with quantifiable metrics. They are also ranking signals. Getting them right matters for both users and organic traffic.\n\n## Largest Contentful Paint (LCP)\n\nLCP measures how long it takes for the largest visible element to render. Optimize by preloading hero images, using responsive images with correct sizes attributes, and eliminating render-blocking resources.\n\n## Cumulative Layout Shift (CLS)\n\nCLS measures visual stability. Elements should not move after they have loaded. Reserve space for images and embeds with aspect-ratio. Avoid inserting content above existing content after load.\n\n## Interaction to Next Paint (INP)\n\nINP measures responsiveness. Every interaction should produce a visual response within 200ms. Heavy JavaScript on the main thread is the primary cause of poor INP scores.",
    published: true,
  },
  {
    slug: "graphql-vs-rest-in-practice",
    title: "GraphQL vs REST in Practice",
    excerpt: "Not a philosophical debate — a practical look at when each approach actually serves your product better.",
    content: "The GraphQL vs REST debate has been running for a decade. Most of the debate is theoretical. Here is the practical reality.\n\n## REST is Right for Public APIs\n\nREST is cacheable, predictable, and understood by every HTTP client ever written. For public APIs where you do not control the consumers, REST is the safe choice.\n\n## GraphQL Shines for Complex Client-Server Contracts\n\nWhen you control both the client and server, GraphQL's ability to let the client specify exactly the data it needs eliminates overfetching and underfetching. This is especially valuable for mobile applications where bandwidth is constrained.\n\n## The Real Tradeoff\n\nGraphQL moves complexity from the server to the client. You gain flexibility but take on the burden of query complexity management, N+1 prevention with DataLoader, and client-side caching strategies.",
    published: true,
  },
  {
    slug: "building-cli-tools-with-node",
    title: "Building CLI Tools with Node.js",
    excerpt: "From argument parsing to interactive prompts, building polished command-line tools with modern Node APIs.",
    content: "CLI tools are software too. They have users, UX requirements, and error states that need to be handled gracefully. The bar for what constitutes a good CLI experience has risen significantly.\n\n## Argument Parsing\n\nDo not parse argv manually. Use a library like commander or yargs that handles flags, subcommands, validation, and help text generation automatically.\n\n## Interactive Prompts\n\nInquirer.js and clack both provide beautiful interactive prompts — select menus, text inputs, confirm dialogs — with accessible keyboard navigation.\n\n## Error Messages\n\nThe quality of your error messages determines whether users can self-serve when something goes wrong. Include the command that failed, why it failed, and what to do next. Do not just log a stack trace and exit.",
    published: true,
  },
  {
    slug: "serverless-architecture-patterns",
    title: "Serverless Architecture Patterns",
    excerpt: "Cold starts, idempotency, event-driven composition — the patterns that make serverless reliable at scale.",
    content: "Serverless is not just a deployment model. It is an architectural constraint that forces you to think about state, idempotency, and composition differently.\n\n## Cold Starts\n\nCold starts are the Achilles heel of serverless. A function that has not been invoked recently will take longer to initialize. Minimize cold start time by keeping function bundles small, using lighter runtimes, and provisioning concurrency for latency-sensitive paths.\n\n## Idempotency\n\nAt-least-once delivery means your function may be invoked multiple times for the same event. Design your handlers to be idempotent — processing the same event twice should have the same effect as processing it once.\n\n## Event-Driven Composition\n\nServerless functions compose naturally through event streams. An S3 upload triggers a Lambda. That Lambda publishes to SNS. SNS fans out to multiple SQS queues. Each queue has a consumer. This is the Unix philosophy applied to cloud infrastructure.",
    published: true,
  },
  {
    slug: "docker-for-frontend-devs",
    title: "Docker for Frontend Developers",
    excerpt: "Containerizing Next.js apps, multi-stage builds, and Docker Compose for local development parity.",
    content: "Docker is not just a backend tool. As frontend applications have become more complex — with build steps, environment variables, and service dependencies — containerization has become relevant for frontend engineers too.\n\n## Multi-Stage Builds\n\nA multi-stage Dockerfile separates your build environment from your runtime environment. The build stage has all your dev dependencies. The runtime stage has only what is needed to serve the application. The resulting image is dramatically smaller.\n\n## Docker Compose for Local Development\n\nDocker Compose lets you define your full local environment — your Next.js app, a Postgres database, a Redis cache, and any other services — in a single YAML file. docker compose up and you are running.\n\n## Environment Parity\n\nThe value of Docker is consistency. The environment in which you develop matches the environment in which you deploy. This eliminates entire categories of bugs.",
    published: true,
  },
  {
    slug: "writing-clean-react-code",
    title: "Writing Clean React Code",
    excerpt: "Component composition, custom hooks, and the naming conventions that make React codebases maintainable.",
    content: "React is a flexible library. This flexibility is both its strength and its trap. Without discipline, React codebases become dense, hard to test, and painful to modify.\n\n## Single Responsibility Components\n\nA component should do one thing and do it well. If you are building a UserCard that fetches user data, formats dates, and handles profile picture upload, you have three components trapped in one.\n\n## Custom Hooks as Abstraction\n\nCustom hooks are the primary mechanism for extracting and reusing logic in React. A usePagination hook is more composable and testable than pagination logic embedded in a component.\n\n## Naming Conventions\n\nComponents are nouns. Hooks start with use. Event handlers start with handle. Boolean props start with is or has. These conventions are not arbitrary — they communicate intent at a glance.",
    published: true,
  },
  {
    slug: "understanding-http-caching",
    title: "Understanding HTTP Caching",
    excerpt: "Cache-Control, ETags, stale-while-revalidate, and the headers that determine what browsers and CDNs cache.",
    content: "HTTP caching is one of the most powerful performance tools available to web developers, and one of the most frequently misunderstood.\n\n## Cache-Control Headers\n\nThe Cache-Control header controls caching behavior. max-age determines how long a response is considered fresh. no-cache means always revalidate before using a cached response. no-store means never cache at all.\n\n## ETags\n\nAn ETag is a fingerprint of a response. When a browser sends a conditional request, it includes the ETag it has cached. If the content has not changed, the server returns a 304 Not Modified with no body. Bandwidth saved.\n\n## Stale-While-Revalidate\n\nstale-while-revalidate allows a stale cached response to be served immediately while a fresh copy is fetched in the background. The next request gets the fresh version. This pattern delivers near-instant responses without serving outdated content for long.",
    published: true,
  },
  {
    slug: "websockets-and-real-time",
    title: "WebSockets and Real-Time Web Apps",
    excerpt: "When to use WebSockets, Server-Sent Events, or long-polling, and how to build reliable real-time systems.",
    content: "Real-time is a spectrum. Not every application that updates dynamically needs a persistent WebSocket connection.\n\n## Server-Sent Events for One-Way Streams\n\nSSE is perfect for dashboards, live feeds, and notifications where the server pushes updates to the client. It is built on HTTP, requires no special server setup, and reconnects automatically.\n\n## WebSockets for Bidirectional Communication\n\nWebSockets are appropriate for chat, collaborative editing, and multiplayer applications where the client also needs to push data to the server. The persistent connection has overhead — use it only when you need it.\n\n## Reliability at Scale\n\nWebSocket connections live on specific servers. Horizontal scaling requires a pub-sub layer — Redis Pub/Sub or a message broker — to broadcast messages across all server instances.",
    published: true,
  },
  {
    slug: "testing-modern-react-applications",
    title: "Testing Modern React Applications",
    excerpt: "Vitest, React Testing Library, and Playwright — a layered testing strategy for React apps.",
    content: "Testing is not about coverage percentages. It is about confidence. A test suite that gives you confidence in a fast feedback loop is worth infinitely more than one that hits 90% coverage but takes fifteen minutes to run.\n\n## Unit Tests with Vitest\n\nVitest is the modern replacement for Jest in Vite-based projects. It runs tests natively in ESM, has first-class TypeScript support, and is dramatically faster.\n\n## Integration Tests with React Testing Library\n\nRTL encourages you to test components the way users interact with them — by querying for visible text, labels, and roles rather than implementation details. Tests that query by role are accessible by definition.\n\n## End-to-End Tests with Playwright\n\nPlaywright runs real browsers. It handles authentication flows, multi-page interactions, and complex user journeys. Run E2E tests on CI against a staging environment, not every commit.",
    published: true,
  },
  {
    slug: "open-source-contribution-guide",
    title: "A Practical Guide to Open Source Contribution",
    excerpt: "Finding your first issue, writing a good PR description, and building a reputation in the ecosystem.",
    content: "Open source contribution is the highest-signal portfolio work available to a software engineer. A merged PR in a well-known project demonstrates communication, technical depth, and ability to work within an existing codebase.\n\n## Finding Your First Issue\n\nLook for issues labeled good first issue or help wanted. Start with documentation fixes or small bugs before attempting large features. Read the contribution guide before writing a single line of code.\n\n## Writing a Good PR\n\nA good PR description explains what changed, why it changed, and how to test it. Include screenshots for visual changes. Link to the issue it resolves. Keep the diff focused — one concern per PR.\n\n## Building Reputation Over Time\n\nConsistency matters more than any single contribution. Show up regularly. Review other people's PRs. Answer questions in issues. The maintainers will notice.",
    published: true,
  },
  {
    slug: "authentication-from-scratch",
    title: "Authentication from Scratch",
    excerpt: "JWTs, sessions, OAuth, and the security decisions that most tutorials gloss over.",
    content: "Authentication is one of those areas where getting it wrong has severe consequences. Most tutorials skip the important parts.\n\n## Sessions vs JWTs\n\nSessions store state on the server. JWTs encode state in the token. Sessions are easier to invalidate — delete the session record and the user is logged out instantly. JWTs are stateless — invalidation requires a denylist, which reintroduces server-side state.\n\n## OAuth 2.0\n\nDo not build your own OAuth server unless you have a specific reason to. Delegate authentication to an identity provider — Clerk, Auth0, or a self-hosted Keycloak. Your job is to build the application, not the authentication infrastructure.\n\n## The Security Decisions\n\nStore tokens in httpOnly cookies, not localStorage. Use HTTPS everywhere. Rotate refresh tokens on each use. Set short expiry times on access tokens. Rate-limit login endpoints.",
    published: true,
  },
  {
    slug: "micro-frontends-reality",
    title: "Micro-Frontends: The Reality",
    excerpt: "When micro-frontends solve real problems and when they add complexity without meaningful benefit.",
    content: "Micro-frontends are the frontend equivalent of microservices. Like microservices, they solve real problems at scale and introduce significant complexity at small scale.\n\n## When They Make Sense\n\nMicro-frontends make sense when you have multiple independent teams deploying to the same user-facing surface. They eliminate the deployment coupling that makes large monolithic frontends painful.\n\n## The Performance Cost\n\nMultiple micro-frontends can mean multiple framework instances, multiple design system versions, and multiple network requests for shared dependencies. Module Federation mitigates this, but it adds its own complexity.\n\n## The Organizational Reality\n\nMicro-frontends are often an organizational solution masquerading as a technical one. If your teams cannot coordinate, making them more independent does not solve the coordination problem — it just makes each team's failures more isolated.",
    published: true,
  },
  {
    slug: "edge-computing-for-web-apps",
    title: "Edge Computing for Web Applications",
    excerpt: "Cloudflare Workers, Vercel Edge Functions, and the new primitives that put compute close to users.",
    content: "Edge computing moves computation from central data centers to nodes distributed globally, close to users. For web applications, this means lower latency, better personalization, and reduced origin load.\n\n## What Runs at the Edge\n\nEdge functions are constrained environments. They do not have access to a file system, cannot run arbitrary Node.js APIs, and have limited CPU time per request. They are optimized for fast, lightweight computation — routing, authentication, A/B testing, and response transformation.\n\n## The Cold Start Advantage\n\nEdge functions typically run on V8 isolates rather than containers. Isolates start in microseconds rather than hundreds of milliseconds. Cold starts are a non-issue at the edge.\n\n## Data at the Edge\n\nThe hardest part of edge computing is data. Your database is not at the edge. Cloudflare D1, Turso, and Neon's data routing proxy are attempts to solve this. The space is evolving rapidly.",
    published: true,
  },
  {
    slug: "git-workflow-for-teams",
    title: "Git Workflow for High-Velocity Teams",
    excerpt: "Trunk-based development, conventional commits, and the branch strategy that scales without slowing you down.",
    content: "Git is a tool. Like all tools, it can be used skillfully or clumsily. A well-designed Git workflow reduces friction, improves code review quality, and makes the project history a useful artifact.\n\n## Trunk-Based Development\n\nShort-lived feature branches merged to main frequently. No long-running feature branches. No release branches. Feature flags handle the decoupling of deployment from release.\n\n## Conventional Commits\n\nConventional commits are a specification for commit message format. feat, fix, chore, docs — each type communicates intent. Automated changelogs and semantic version bumps become possible when your commit history is structured.\n\n## The Code Review Culture\n\nCode review is about knowledge sharing and quality improvement, not gatekeeping. Small PRs get better reviews. Review turnaround should be measured in hours, not days.",
    published: true,
  },
  {
    slug: "building-saas-from-scratch",
    title: "Building SaaS from Scratch in 2025",
    excerpt: "The technology choices, architecture decisions, and product lessons from zero to paying customers.",
    content: "Building a SaaS product from scratch involves making thousands of decisions. Most of them are reversible. The ones that are not are the ones worth thinking hard about.\n\n## Choose Boring Technology for Infrastructure\n\nPostgres, Redis, and a managed cloud provider are not exciting choices. They are choices that let you focus on your product instead of your infrastructure. Boring technology has decades of operational knowledge and tooling.\n\n## Multi-Tenancy Architecture\n\nData isolation between customers is a fundamental requirement. Shared tables with a tenant_id column are the most practical approach for early-stage SaaS. Row-level security in Postgres makes this safe and elegant.\n\n## Billing is Not an Afterthought\n\nIntegrate Stripe before you have paying customers. Retrofitting billing into an existing system is painful. Usage metering, trial periods, and plan limits are business logic that needs to be baked into your data model from day one.",
    published: true,
  },
  {
    slug: "next-image-optimization",
    title: "Mastering Next.js Image Optimization",
    excerpt: "How the Next.js Image component handles responsive images, lazy loading, and format conversion automatically.",
    content: "Images are the largest contributor to page weight on most websites. Next.js provides a built-in Image component that handles the hard parts of image optimization automatically.\n\n## Automatic Format Conversion\n\nWhen a browser supports WebP or AVIF, Next.js serves the image in that format. These modern formats are 25-50% smaller than JPEG at equivalent quality. The conversion happens on-demand and is cached at the CDN edge.\n\n## Responsive Images\n\nThe sizes prop tells Next.js how the image will be rendered at different viewport sizes. It generates a srcset with appropriately sized versions and the browser picks the right one.\n\n## Lazy Loading by Default\n\nImages below the fold are lazy-loaded by default. Add priority to hero images and other above-the-fold content to preload them and improve your LCP score.",
    published: true,
  },
  {
    slug: "zero-to-production-checklist",
    title: "Zero to Production Checklist",
    excerpt: "The things you forget before you ship: environment variables, error tracking, logging, and graceful degradation.",
    content: "You have built the feature. The tests pass. The staging environment works. And then production reveals all the things you forgot.\n\n## Environment Variables\n\nEvery secret must be in environment variables, never in code. Use a secrets manager for production. Validate that all required environment variables are present at startup — fail fast rather than discovering a missing variable in the middle of a request.\n\n## Error Tracking\n\nSentry or an equivalent tool should be integrated before you ship. You need to know when things break in production, with full context — stack trace, user, request, breadcrumbs — before your users report them to you.\n\n## Logging\n\nStructured logging with consistent fields makes log analysis possible. Log at appropriate levels. Do not log sensitive data. Ensure logs are shipped to a centralized system where you can query them.\n\n## Graceful Degradation\n\nWhat happens when your payment provider is down? When your email service is unavailable? When the database is slow? Design your failure modes deliberately.",
    published: true,
  },
  {
    slug: "async-javascript-mastery",
    title: "Async JavaScript Mastery",
    excerpt: "Promises, async/await, error handling patterns, and the event loop mental model you need to reason about async code.",
    content: "Asynchronous JavaScript is one of the most important and most misunderstood aspects of the language. Without a correct mental model, bugs appear that seem impossible to reproduce or reason about.\n\n## The Event Loop\n\nJavaScript is single-threaded. The event loop processes one task at a time. Async operations register callbacks that are queued when they complete. Understanding this model explains why setTimeout(fn, 0) does not execute immediately, and why Promise.then callbacks run before setTimeout callbacks.\n\n## Promise Composition\n\nPromise.all runs promises in parallel and resolves when all complete. Promise.race resolves with the first to complete. Promise.allSettled waits for all to settle regardless of whether they resolve or reject.\n\n## Error Handling\n\nUnhandled promise rejections are silent failures waiting to happen. Every async operation should have explicit error handling. Try-catch in async functions. .catch() on promise chains.",
    published: true,
  },
  {
    slug: "product-thinking-for-engineers",
    title: "Product Thinking for Engineers",
    excerpt: "Why the best engineers think about user problems before technical solutions, and how to develop this skill.",
    content: "Technical skill is necessary but not sufficient. The engineers who have the most impact are those who understand the problems their work is solving and who can connect technical decisions to user and business outcomes.\n\n## Start with the Problem\n\nBefore designing a solution, make sure you understand the problem deeply. Talk to users. Read support tickets. Watch session recordings. The solution space opens up when the problem space is clear.\n\n## The Reversibility Test\n\nNot all technical decisions are equal. Decisions that are easy to reverse deserve less deliberation than decisions that are hard to undo. Database schema choices, API contracts, and authentication architecture deserve careful thought.\n\n## Measure Everything\n\nInstrumentation is not optional. You cannot improve what you do not measure. Define success metrics before you ship and instrument your code to track them.",
    published: true,
  },
  {
    slug: "animated-ui-with-motion",
    title: "Animated UI with Framer Motion",
    excerpt: "Orchestrated animations, layout transitions, and the animation patterns that feel native rather than decorative.",
    content: "Animation is not decoration. Well-executed animation communicates state changes, guides attention, and makes interfaces feel responsive and alive. Framer Motion is the most expressive animation library in the React ecosystem.\n\n## Layout Animations\n\nThe layout prop tells Framer Motion to automatically animate any layout change. When an element's size or position changes due to a DOM change, Framer Motion interpolates between the before and after states smoothly.\n\n## Orchestrated Sequences\n\nstaggerChildren lets you delay each child's animation relative to the previous one. A list of items can cascade in sequentially without writing timing logic for each item.\n\n## The Reduced Motion Contract\n\nAlways check prefers-reduced-motion. Framer Motion provides a hook — useReducedMotion — that returns true when the user has requested reduced motion. Respect it.",
    published: true,
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns",
    excerpt: "Conditional types, mapped types, template literal types, and the type-level programming that makes libraries tick.",
    content: "TypeScript's type system is Turing-complete. This is not just a curiosity — it means you can express very complex constraints at the type level that would otherwise only be caught at runtime.\n\n## Conditional Types\n\nConditional types allow you to express types that depend on other types. T extends string ? 'string' : 'other' is the simplest form. Combined with infer, you can extract type information from complex generic types.\n\n## Mapped Types\n\nMapped types transform every property in a type. Readonly, Partial, Required, and Record are all built on mapped types. You can build domain-specific transformations using the same mechanism.\n\n## Template Literal Types\n\nTemplate literal types compose string types. 'on${Capitalize<string>}' describes a string that starts with on followed by a capitalized word. This is how event handler type safety in libraries like React is implemented.",
    published: true,
  },
  {
    slug: "data-modeling-patterns",
    title: "Data Modeling Patterns for Web Apps",
    excerpt: "Normalization, polymorphism, soft deletes, and the database design decisions that age well.",
    content: "Data modeling is one of the highest-leverage technical decisions you will make. The schema you design today will constrain or enable everything that comes after.\n\n## Normalization\n\nNormalization eliminates data redundancy. Third normal form is the standard target for OLTP databases. Denormalization is a deliberate performance optimization, not a starting point.\n\n## Soft Deletes\n\nSoft deletes mark records as deleted without removing them from the database. This enables audit trails, undo functionality, and recovery from user mistakes. The cost is added complexity in every query — a deleted_at IS NULL clause on every select.\n\n## Polymorphism\n\nPolymorphic associations — where a foreign key can reference multiple tables — are tempting and troublesome. They cannot be enforced with foreign key constraints. Prefer explicit join tables or separate relation tables.",
    published: true,
  },
  {
    slug: "performance-budgets",
    title: "Performance Budgets That Actually Work",
    excerpt: "Setting, enforcing, and iterating on performance budgets as a team practice, not a one-time audit.",
    content: "A performance audit is a moment in time. A performance budget is an ongoing commitment. The difference between teams that maintain fast sites and teams that do not is whether performance is enforced in CI or aspirational.\n\n## Setting the Budget\n\nA budget should be based on user impact. Lighthouse scores are a proxy. The real metrics are LCP, CLS, and INP. Set thresholds that represent an acceptable user experience on median hardware and median connections.\n\n## Enforcing in CI\n\nLighthouse CI can run against every PR and fail the build if performance degrades. Bundle size limits with bundlesize or size-limit catch regressions before they ship.\n\n## Iterating\n\nPerformance is not a goal you achieve and then maintain passively. Dependencies grow. Features add JavaScript. Images change. A regular review cadence — monthly at minimum — keeps performance from drifting.",
    published: true,
  },
  {
    slug: "minimalism-in-software-design",
    title: "Minimalism in Software Design",
    excerpt: "Why less code, fewer dependencies, and simpler architecture almost always produce better software.",
    content: "Minimalism is not about doing less. It is about doing exactly what is necessary and nothing more. In software, this translates to less code to maintain, fewer dependencies to update, and simpler architecture to reason about.\n\n## The Dependency Problem\n\nEvery dependency you add is a security surface, a potential breaking change, and a maintenance burden. Before adding a library, ask whether you actually need it or whether the built-in language and platform APIs are sufficient.\n\n## The Complexity Problem\n\nComplex systems have more failure modes. Simple systems are easier to debug, test, and onboard new engineers to. Simplicity is not a constraint — it is a quality.\n\n## The Deletion Mindset\n\nThe best code improvement you can make is deleting code that is no longer needed. Dead code is a cognitive tax on every engineer who reads the codebase. Delete it.",
    published: true,
  },
  {
    slug: "seo-for-developers",
    title: "SEO for Developers",
    excerpt: "Technical SEO, structured data, sitemaps, and the rendering decisions that affect how search engines index your content.",
    content: "SEO is not just keywords and meta descriptions. Technical SEO — the rendering, crawlability, and structure of your pages — has become increasingly important as Google's indexing infrastructure has evolved.\n\n## Rendering and Indexability\n\nSearch engines can render JavaScript, but with delays and unreliability. Server-rendering your content ensures it is immediately accessible to crawlers. Next.js Server Components make this the default.\n\n## Structured Data\n\nJSON-LD structured data tells search engines what your content is about in a language they understand natively. Articles, products, events, and FAQs all have rich schema types that unlock enhanced search results.\n\n## Sitemaps\n\nA sitemap is a direct communication channel with search engines. It tells them what pages exist, when they were last modified, and their relative priority. Generate it dynamically and submit it to Google Search Console.",
    published: true,
  },
  {
    slug: "dark-mode-implementation",
    title: "Dark Mode Implementation Done Right",
    excerpt: "System preference detection, flash prevention, and the CSS architecture that makes dark mode maintainable.",
    content: "Dark mode is no longer optional. A significant portion of users have it as their system preference and expect applications to respect it. Implementing it correctly requires solving flash of incorrect theme, managing CSS token architecture, and persisting user preferences.\n\n## Flash Prevention\n\nThe most common dark mode bug is a flash of the wrong theme on page load. The solution is to inject a script before the CSS that reads localStorage and applies the correct class to the HTML element before the first paint.\n\n## CSS Custom Properties Architecture\n\nDefine your color tokens as CSS custom properties with default values. In a [data-theme='dark'] selector, override those variables. Every component that uses the variables automatically gains dark mode support.\n\n## Respecting System Preference\n\nThe prefers-color-scheme media query tells you the user's OS preference. Start with this as the default. Allow users to override it with an explicit toggle, but make the system preference the baseline.",
    published: true,
  },
];

async function main() {
  console.log(`Seeding ${blogs.length} blog posts...`);

  // Delete only existing blog posts to avoid touching other data
  await prisma.blog.deleteMany();
  console.log("Existing blog posts cleared.");

  // Create all blogs with staggered timestamps (newest first)
  const baseDate = new Date("2026-05-20");

  for (let i = 0; i < blogs.length; i++) {
    const daysAgo = i * 3; // 3 days apart
    const createdAt = new Date(baseDate);
    createdAt.setDate(baseDate.getDate() - daysAgo);

    await prisma.blog.create({
      data: {
        ...blogs[i],
        createdAt,
      },
    });

    console.log(`  ✓ ${String(i + 1).padStart(2, "0")}. ${blogs[i].title}`);
  }

  console.log(`\n✅ Done — ${blogs.length} blog posts seeded.`);
  console.log(`   Pages at 10 per page: ${Math.ceil(blogs.length / 10)}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
