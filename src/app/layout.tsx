import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Francis Kossyrisochukwu Uzoigwe | Full-Stack Software Engineer & DevOps Architect",
    template: "%s | Francis Kossyrisochukwu Uzoigwe"
  },
  description: "Explore the professional portfolio of Francis Kossyrisochukwu Uzoigwe, an elite Full-Stack Software Engineer and DevOps Architect specializing in high-performance web systems and bulletproof cloud automation.",
  keywords: [
    "Francis Kossyrisochukwu Uzoigwe", "Francis Uzoigwe", "Francis K. Uzoigwe", "Kossyrisochukwu Uzoigwe", "thatmanfrancis",
    "software engineer", "full stack engineer", "devops architect", "senior developer", "nextjs developer",
    "react engineer", "typescript developer", "nodejs backend", "cloud solutions architect", "aws certified engineer",
    "docker devops developer", "kubernetes specialist", "ci cd deployment automation", "lagos nigeria software developer",
    "nigerian software engineer", "portfolio of software engineer", "hire top full stack developer",
    "web application performance optimization", "vercel next.js deployment", "gitops pipelines",
    "microservices architecture engineer", "rest api designer", "graphql api", "postgresql postgres architect",
    "mongodb expert", "redis caching layer", "tailwindcss responsive layout designer", "serverless system architect",
    "linux administrator devops", "terraform infrastructure as code", "github actions automation expert",
    "python developer", "javascript engineer", "frontend performance audit", "backend reliability engineering",
    "secure database design", "cybersecurity best practices web", "agile sprint scrum developer", "remote software engineer",
    "contract web developer", "freelance full stack engineer", "best software engineer portfolio",
    "modern minimal ui design developer", "interactive web applications react", "jamstack developer",
    "pwa progressive web app developer", "next.js page speed optimization", "lighthouse score 100 engineer",
    "ui ux oriented developer", "scalable startup architecture", "enterprise backend systems", "express.js restful services",
    "nest.js typescript backend", "prisma orm backend integration", "mongoose database design",
    "supabase integration specialist", "firebase cloud database", "auth0 oauth authentication", "jwt secure authorization",
    "stripe api payments developer", "socket.io realtime developer", "websockets performance engineering",
    "monorepo workspaces yarn pnpm", "eslint typescript configuration", "jest testing framework unit test",
    "playwright end to end testing", "automated test pipelines", "aws route 53 dns domain", "amazon ec2 hosting",
    "aws s3 cloud storage", "aws lambda serverless computing", "cloudfront cdn specialist", "nginx reverse proxy load balancer",
    "pm2 nodejs production setup", "docker compose multi container", "helm chart kubernetes orchestrator",
    "argocd gitops pipeline", "jenkins automated build server", "circleci config integration", "sonararqube code quality gate",
    "sentry real time error tracking", "datadog system health monitoring", "prometheus grafana dashboard devops",
    "bash scripting utility developer", "restful api integrations", "third party api integrations developer",
    "headless cms integration developer", "sanity contentful headless developer", "custom blog markdown next.js",
    "portfolio website clean design", "glassmorphism web design next.js", "dark mode next.js theme switch",
    "responsive mobile first developer", "cross browser compatibility coding", "seo rank software developer portfolio",
    "google search console optimization"
  ],
  authors: [{ name: "Francis Kossyrisochukwu Uzoigwe", url: "https://github.com/thatmanfrancis" }],
  creator: "Francis Kossyrisochukwu Uzoigwe",
  publisher: "Francis Kossyrisochukwu Uzoigwe",
  metadataBase: new URL("https://thatmanfrancis.vercel.app"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thatmanfrancis.vercel.app",
    siteName: "Francis Kossyrisochukwu Uzoigwe Portfolio",
    title: "Francis Kossyrisochukwu Uzoigwe | Full-Stack Software Engineer & DevOps Architect",
    description: "Explore the professional portfolio of Francis Kossyrisochukwu Uzoigwe, an elite Full-Stack Software Engineer and DevOps Architect specializing in high-performance web systems and bulletproof cloud automation.",
    images: [
      {
        url: "/logo.svg",
        width: 1024,
        height: 1024,
        alt: "Francis Kossyrisochukwu Uzoigwe branding logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Francis Kossyrisochukwu Uzoigwe | Full-Stack Software Engineer & DevOps Architect",
    description: "Explore the professional portfolio of Francis Kossyrisochukwu Uzoigwe, an elite Full-Stack Software Engineer and DevOps Architect.",
    images: ["/logo.svg"],
    creator: "@thatmanfrancis"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} font-sans antialiased scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Francis Kossyrisochukwu Uzoigwe",
              "alternateName": ["Francis Uzoigwe", "thatmanfrancis", "Kossyrisochukwu Uzoigwe"],
              "url": "https://thatmanfrancis.vercel.app",
              "image": "https://thatmanfrancis.vercel.app/logo.png",
              "sameAs": [
                "https://github.com/thatmanfrancis",
                "https://linkedin.com/in/francisuzoigwe"
              ],
              "jobTitle": "Full-Stack Software Engineer & DevOps Architect",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "description": "Francis Kossyrisochukwu Uzoigwe is an expert Full-Stack Software Engineer and DevOps Architect specializing in high-performance web applications, scalable APIs, and automated cloud infrastructure.",
              "knowsAbout": [
                "Software Engineering", "Full-Stack Development", "DevOps", "Next.js", "React", "TypeScript", "Node.js", "Docker", "Kubernetes", "CI/CD", "AWS", "Cloud Architecture"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent/20 selection:text-accent transition-colors duration-300 overflow-x-clip">
        <Navbar />
        <main className="flex-1 w-[95%] sm:w-full max-w-6xl mx-auto px-0 sm:px-6 pt-6 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
