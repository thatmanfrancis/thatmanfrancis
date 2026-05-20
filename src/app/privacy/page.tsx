import BackButton from "@/components/BackButton";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl py-4">
      <BackButton />
      <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-900 mb-8 uppercase">
        Privacy Policy
      </h1>
      <div className="prose prose-zinc prose-sm md:prose-base text-zinc-500 space-y-6">
        <p>
          Your privacy is important to me. This Privacy Policy explains how I
          collect, use, and protect your information when you visit my website.
        </p>

        <h2 className="text-xl font-bold text-zinc-900 pt-4">
          1. Information Collection
        </h2>
        <p>
          I may collect personal information such as your name and email address
          when you voluntarily provide it through my contact form.
        </p>

        <h2 className="text-xl font-bold text-zinc-900 pt-4">
          2. Use of Information
        </h2>
        <p>
          Any information I collect is used solely to respond to your inquiries
          or provide services you&apos;ve requested. I do not share your data
          with third parties.
        </p>

        <h2 className="text-xl font-bold text-zinc-900 pt-4">3. Cookies</h2>
        <p>
          This site may use basic cookies to improve your browsing experience.
          You can disable cookies in your browser settings if you prefer.
        </p>

        <p className="pt-8 text-xs italic">Last updated: May 12, 2026</p>
      </div>
    </div>
  );
}
