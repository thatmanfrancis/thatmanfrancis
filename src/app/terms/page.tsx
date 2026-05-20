import BackButton from "@/components/BackButton";

export default function TermsPage() {
  return (
    <div className="max-w-3xl py-4">
      <BackButton />
      <h1 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-900 mb-8 uppercase">Terms of Service</h1>
      <div className="prose prose-zinc prose-sm md:prose-base text-zinc-500 space-y-6">
        <p>By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
        
        <h2 className="text-xl font-bold text-zinc-900 pt-4">1. Intellectual Property</h2>
        <p>The content on this website, including text, graphics, and code, is my intellectual property unless otherwise stated.</p>

        <h2 className="text-xl font-bold text-zinc-900 pt-4">2. Use License</h2>
        <p>You may view and download content for personal, non-commercial use only. Any other use requires my prior written consent.</p>

        <h2 className="text-xl font-bold text-zinc-900 pt-4">3. Disclaimer</h2>
        <p>The information on this site is provided &quot;as is&quot; without any warranties, express or implied.</p>

        <p className="pt-8 text-xs italic">Last updated: May 12, 2026</p>
      </div>
    </div>
  );
}
