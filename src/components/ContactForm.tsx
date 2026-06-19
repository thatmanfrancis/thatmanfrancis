"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsPending(true);

    // Simulate standard server action/API post duration
    setTimeout(() => {
      setIsPending(false);
      setIsSent(true);
      setName("");
      setEmail("");
      setMessage("");

      // Clear success feedback alert after 5 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="md:col-span-3 space-y-4">
      {isSent && (
        <div className="p-4 rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
          <span>✓</span>
          <span>
            Message sent successfully! I will get back to you shortly.
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl border border-foreground/5 bg-foreground/1 hover:bg-foreground/2 transition-colors space-y-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-wider text-muted"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            placeholder="Francis Kossy"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-muted"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-semibold uppercase tracking-wider text-muted"
          >
            Your Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            disabled={isPending}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background focus:outline-none focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={!isPending}
          className="w-full py-4 rounded-full bg-accent text-background font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              {/* Spinner SVG (Loader2 implementation) */}
              <svg
                className="animate-spin h-4 w-4 text-background"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            // <span>Send Message</span>
            <span>Coming Soon</span>
          )}
        </button>
      </form>
    </div>
  );
}
