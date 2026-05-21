import type { Metadata, Viewport } from "next";
import { Nunito, Outfit, Pacifico } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultMetadata } from "@/lib/metadata";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${outfit.variable} ${pacifico.variable} font-sans h-full antialiased light`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
