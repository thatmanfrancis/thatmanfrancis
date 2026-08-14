"use client";

import { useActionState, useEffect, useState } from "react";
import {
  subscribeNewsletterAction,
  type NewsletterState,
} from "@/app/newsletter/actions";
import { FieldLabel, SubmitButton } from "@/components/ui/form";
import {
  HoneypotFields,
  TurnstileField,
} from "@/components/ui/turnstile-field";

type NewsletterFormProps = {
  turnstileSiteKey?: string;
};

export function NewsletterForm({ turnstileSiteKey = "" }: NewsletterFormProps) {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(
    subscribeNewsletterAction,
    null,
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state?.type === "success") {
      setFullName("");
      setEmail("");
    }
  }, [state]);

  const canSubmit =
    fullName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    !pending;

  return (
    <div id="footer-newsletter" className="footer-newsletter scroll-mt-28">
      <h2 className="footer-heading mb-4">Join the newsletter</h2>

      {state ? (
        <p
          className={
            state.type === "success"
              ? "mb-3 rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
              : state.type === "info"
                ? "mb-3 rounded-xl border border-ink/10 bg-muted-deep/40 px-3 py-2 text-sm text-ink"
                : "mb-3 rounded-xl border border-ink/20 bg-white px-3 py-2 text-sm text-ink"
          }
        >
          {state.message}
        </p>
      ) : null}

      <form action={action} className="relative flex flex-col gap-3">
        <HoneypotFields />
        <div>
          <FieldLabel htmlFor="footer-full-name" required>
            Full name
          </FieldLabel>
          <input
            id="footer-full-name"
            type="text"
            name="full_name"
            placeholder="Full name"
            autoComplete="name"
            required
            disabled={pending}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="footer-input"
          />
        </div>

        <div>
          <FieldLabel htmlFor="footer-email" required>
            Email
          </FieldLabel>
          <input
            id="footer-email"
            type="email"
            name="email"
            placeholder="email"
            autoComplete="email"
            required
            disabled={pending}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="footer-input"
          />
        </div>

        {turnstileSiteKey ? (
          <TurnstileField action="newsletter" siteKey={turnstileSiteKey} />
        ) : null}

        <SubmitButton
          pending={pending}
          disabled={!canSubmit}
          idleLabel="Send"
          pendingLabel="Sending..."
          className="btn btn-primary w-full"
        />
      </form>
    </div>
  );
}
