export const profile = {
  name: "Francis Uzoigwe",
  fullName: "Francis Kossyrisochukwu Uzoigwe",
  role: "Senior Full Stack Software Engineer",
  location: "Lagos, Nigeria",
  intro: "I build payment systems, marketplaces, and business applications, from the checkout and booking flows people use to the APIs and databases that run them.",
  email: "francis@syntiqhq.com",
  whatsapp: "https://wa.me/2347047474886",
  contactIntro: "I’m open to full-stack and backend engineering roles in Nigeria and with international teams. If my work looks like a fit, I’d be glad to hear from you.",
  about: [
    "Based in Lagos, I’ve spent over five years building payment systems, marketplaces, learning platforms, and tools that help businesses run day to day.",
    "I enjoy working across the whole product. At OuroPay, that meant clarifying transfer states and preventing duplicate transfers. At LemonWares, it meant improving deployments, setting frontend standards, and mentoring developers.",
    "I use SQL with relational databases like PostgreSQL and MySQL, and work with NoSQL document databases like MongoDB.",
  ],
  github: "https://github.com/thatmanfrancis",
  linkedin: "https://www.linkedin.com/in/francisuzoigwe",
  instagram: "https://www.instagram.com/thatmanfrancis/",
  x: "https://x.com/thatmanfrancis",
  facebook: "https://www.facebook.com/thatmanfrancis",
  resume: "/francis-uzoigwe-cv.pdf",
  portrait: "/images/francis-profile.jpg",
  skills: [
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML5", icon: "html5" },
    { name: "CSS", icon: "css3" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "PHP", icon: "php" },
    { name: "Laravel", icon: "laravel" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "MySQL", icon: "mysql" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Prisma", icon: "prisma" },
  ],
  infrastructure: [
    { name: "Linux", icon: "linux" },
    { name: "Nginx", icon: "nginx" },
    { name: "PM2", icon: "pm2" },
    { name: "Docker", icon: "docker" },
    { name: "Kubernetes", icon: "kubernetes" },
    { name: "AWS", icon: "aws" },
    { name: "Azure", icon: "azure" },
    { name: "Terraform", icon: "terraform" },
    { name: "GitHub Actions", icon: "github" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  period: string;
  role: string;
  metric: string;
  metricLabel: string;
  summary: string;
  tools: string[];
  caseStudy: { situation: string; task: string; action: string; result: string };
  screenshot?: { src: string; width: number; height: number };
  contributions: string[];
  source?: string;
  website?: string;
  logo?: string;
};

export const projects: Project[] = [
  {
    slug: "ouropay",
    name: "OuroPay",
    category: "Payment infrastructure",
    period: "Jul–Sep 2026",
    role: "Backend Engineer · Freelance contract",
    metric: "300 → 1",
    metricLabel: "Monthly duplicate transfers",
    summary: "Made transfers safer to retry and clarified pending and failed payment states as the platform scaled.",
    tools: ["Bank integrations", "Transfer APIs", "Idempotency"],
    caseStudy: {
      situation: "The transfer service was handling duplicate requests, insufficient-funds attempts, and unclear payment statuses as volume grew.",
      task: "Make retries safe, prevent transfers without sufficient funds, and help client applications distinguish pending transfers from failures.",
      action: "Implemented idempotency and pre-transfer balance checks, standardised transfer API response codes, and supported the backend through a rapid increase in volume.",
      result: "Monthly duplicates fell from 300 to one. Balance checks blocked 120 insufficient-funds requests in the first month. Monthly payment-status tickets fell from 100 to 55, and transfer-related 5xx errors fell from 2.0% to 0.5%. The platform reached approximately 900,000 transfers in a single month and served over three million customers.",
    },
    contributions: [
      "Added transfer idempotency and pre-transfer balance checks. Monthly duplicates fell from 300 to one (99.7%), and the checks blocked 120 insufficient-funds requests in the first month.",
      "Standardised API responses for pending and failed payments. Monthly payment-status support tickets fell from 100 to 55.",
      "Supported the transfer backend as volume grew from approximately 100 monthly transfers to 900,000 in a single month on a platform serving over three million customers.",
      "Reduced transfer-related 5xx errors from 2.0% to 0.5%, a 75% relative reduction.",
    ],
  },
  {
    slug: "evalocal",
    name: "Evalocal",
    category: "Events marketplace",
    period: "Jan–Dec 2025",
    role: "Full Stack Engineer · Freelance contract",
    metric: "70% → 85%",
    metricLabel: "Deposit completion",
    summary: "Connected vendor quotes, bookings, and Stripe deposits for a UK marketplace that helps customers find and book event vendors.",
    tools: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    screenshot: { src: "/images/projects/evalocal-hero.jpg", width: 1270, height: 714 },
    caseStudy: {
      situation: "A UK events marketplace needed a smoother path from a vendor quote to a paid booking. It already used Flutterwave and Paystack.",
      task: "Add Stripe payments and connect quotes, bookings, and deposits while enforcing the right permissions for customers, vendors, and moderators.",
      action: "Integrated Stripe deposits, milestone payouts, and billing notifications. Connected payments to bookings and added role-based rules for customer enquiries and vendor financial data.",
      result: "Deposit completion rose from 70% to 85%, and quote-to-paid-booking conversion rose from 20% to 25%. All 18 role-and-resource permission tests passed.",
    },
    contributions: [
      "Added Stripe deposits, milestone payouts, and billing notifications to the UK marketplace, which previously used Flutterwave and Paystack. Deposit completion rose from 70% to 85%.",
      "Connected vendor quotes, bookings, and deposits so customers could pay within the marketplace. Quote-to-paid-booking conversion rose from 20% to 25%.",
      "Restricted access to customer enquiries and vendor financial data with distinct customer, vendor, and moderator permissions. All 18 role-and-resource permission tests passed.",
    ],
    source: "https://github.com/thatmanfrancis/Evalocal",
    website: "https://evalocal.com",
    logo: "/images/projects/evalocal.png",
  },
  {
    slug: "aakkio",
    name: "Aakkio",
    category: "Learning platform",
    period: "Mar–Dec 2024",
    role: "Full Stack Engineer · Freelance contract",
    metric: "2.5s → 1.4s",
    metricLabel: "First Contentful Paint",
    summary: "Delivered a multi-tenant learning platform in eight weeks, with separate workflows for students, instructors, and administrators.",
    tools: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL"],
    screenshot: { src: "/images/projects/aakkio-hero.jpg", width: 1265, height: 712 },
    caseStudy: {
      situation: "Aakkio needed one learning platform for multiple organisations, each with different workflows for students, instructors, and administrators.",
      task: "Ship the platform in eight weeks with recurring billing, learner progress tracking, and instructor reporting.",
      action: "Built role-based access and recurring billing, developed Node.js APIs for progress and reporting, and improved Next.js rendering with server-side rendering, incremental static regeneration, and caching.",
      result: "The first cohort included 200 learners across five organisations. First Contentful Paint fell from 2.5 to 1.4 seconds, and weekly reporting preparation fell from two hours to 30 minutes per instructor.",
    },
    contributions: [
      "Delivered a multi-tenant learning platform in eight weeks with recurring billing and separate permissions for students, instructors, and administrators. The first cohort included 200 learners across five organisations.",
      "Improved Next.js rendering and caching with server-side rendering and incremental static regeneration. First Contentful Paint fell from 2.5 to 1.4 seconds, a 44% improvement.",
      "Built Node.js APIs for student progress and instructor analytics. Weekly reporting preparation fell from two hours to 30 minutes per instructor.",
    ],
    source: "https://github.com/thatmanfrancis/Aakkio",
    website: "https://aakkio.com",
  },
  {
    slug: "salesdock",
    name: "SalesDock",
    category: "Retail operations",
    period: "Feb–Aug 2026",
    role: "Full Stack Engineer · Freelance contract",
    metric: "60 → 30 min",
    metricLabel: "Daily reconciliation per merchant",
    summary: "Brought point-of-sale checkout, online storefronts, and shared inventory into one workspace for Nigerian retailers.",
    tools: ["PHP", "Laravel", "Point-of-sale workflows", "Inventory synchronisation"],
    screenshot: { src: "/images/projects/salesdock-hero.jpg", width: 1265, height: 712 },
    caseStudy: {
      situation: "Retailers needed to reconcile sales across store and online channels and trace discrepancies when inventory or transaction records diverged.",
      task: "Unify checkout, storefront orders, and inventory in one workspace and make sales adjustments traceable.",
      action: "Connected in-store and online checkout, synchronised orders with shared stock records, and added audit trails for sales, discounts, and refunds.",
      result: "Daily reconciliation went from 60 to 30 minutes per merchant, monthly stock discrepancies fell from 40 to 12, and median transaction investigation time dropped from 20 to eight minutes.",
    },
    contributions: [
      "Connected in-store and online sales, cutting daily reconciliation time from 60 to 30 minutes per merchant.",
      "Synchronised online orders with shared stock records. Monthly stock discrepancies fell from 40 to 12.",
      "Added audit trails for sales, discounts, and refunds, reducing median investigation time from 20 to eight minutes.",
    ],
    source: "https://github.com/thatmanfrancis/Salesdock",
    website: "https://salesdock.ng",
    logo: "/images/projects/salesdock.png",
  },
];

export const experience: Pick<Project, "name" | "period" | "role" | "contributions" | "website" | "source">[] = [
  {
    name: "LemonWares Technology",
    period: "2024–Present",
    role: "Lead Full Stack Engineer · Full-time",
    website: "https://lemonwares.com",
    contributions: [
      "Replaced manual uploads with GitHub Actions CI/CD across 14 client applications. Automated deployments took under three minutes. Developers previously waited up to three hours after an upload to verify changes.",
      "Enforced role-based permissions to restrict merchant functions to the correct users. All 12 previously failing staff-permission tests passed.",
      "Set frontend standards across 14 projects and mentored four developers. Introduced TypeScript strict mode, review checklists, and automated tests. Monthly production defects fell from 20 to 12, and median review rework rounds fell from three to two.",
    ],
  },
  ...projects.map(({ name, period, role, contributions, website, source }) => ({ name, period, role, contributions, website, source }))
    .sort((first, second) => {
      const order = ["OuroPay", "SalesDock", "Evalocal", "Aakkio"];
      return order.indexOf(first.name) - order.indexOf(second.name);
    }),
  {
    name: "PodA",
    period: "2020–2023",
    role: "Frontend Developer",
    contributions: [
      "Helped address slow loading in a legacy WordPress application by migrating its frontend to a decoupled React progressive web app.",
      "Built accessible React interfaces and integrated REST APIs to connect the replacement frontend to application data.",
    ],
  },
];

export const transferDemo = {
  label: "Sample API response",
  states: [
    {
      label: "Pending",
      response: {
        transfer_id: "demo_0001",
        status: "pending",
        code: "AWAITING_CONFIRMATION",
        message: "Awaiting confirmation.",
      },
    },
    {
      label: "Failed",
      response: {
        transfer_id: "demo_0001",
        status: "failed",
        code: "INSUFFICIENT_FUNDS",
        message: "Not enough funds to transfer.",
      },
    },
  ],
};
