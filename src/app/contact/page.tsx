import BackButton from "@/components/BackButton";
import ContactGraphic from "@/components/ContactGraphic";
import { generateMetadata as generateMeta } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMeta({
  title: "Contact - Hire a Software Engineer in Lagos",
  description: "Get in touch with Francis Uzoigwe for software development projects, web development services, freelance work, or full-time opportunities. Based in Lagos, Nigeria and available for remote work.",
  keywords: [
    "hire developer Lagos",
    "contact software engineer",
    "freelance developer Nigeria",
    "web development services Lagos",
    "software development inquiry",
    "project consultation",
  ],
});

export default function ContactPage() {
  return (
    <div className="max-w-6xl py-4 pb-32">
      <BackButton />

      {/* Two Column Brutalist Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        {/* Left Column - Contact Form */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white mb-4 uppercase">
              Get in Touch
            </h1>
            <p className="text-lg text-zinc-650 dark:text-zinc-400 leading-relaxed font-serif italic max-w-xl">
              Have a project in mind, want to discuss a collaboration, or just want to say hi? I&apos;d love to hear from you.
            </p>
          </div>

          <form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 outline-none focus:border-zinc-950 dark:focus:border-zinc-300 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full px-5 py-3.5 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 outline-none focus:border-zinc-950 dark:focus:border-zinc-300 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Message
              </label>
              <textarea
                rows={5}
                required
                placeholder="Tell me about your project, goals, or schedule..."
                className="w-full px-5 py-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 outline-none focus:border-zinc-950 dark:focus:border-zinc-300 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all duration-300 focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-300 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 px-10 py-4.5 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            >
              Send Message
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>

        {/* Right Column - Premium Graphic Visual */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start w-full">
          <ContactGraphic />
        </div>
      </div>
    </div>
  );
}
