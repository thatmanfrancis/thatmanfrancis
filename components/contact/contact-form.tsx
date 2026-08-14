"use client";

import { useActionState, useState } from "react";
import { submitContactAction } from "@/app/(site)/contact/actions";
import { FieldLabel, SubmitButton } from "@/components/ui/form";
import {
  HoneypotFields,
  TurnstileField,
} from "@/components/ui/turnstile-field";
import { CheckIcon } from "@/components/ui/icons";

type ContactFormProps = {
  email?: string | null;
  turnstileSiteKey?: string;
};

async function contactAction(_prev: null, formData: FormData) {
  await submitContactAction(formData);
  return null;
}

export function ContactForm({
  email,
  turnstileSiteKey = "",
}: ContactFormProps) {
  const [, action, pending] = useActionState(contactAction, null);
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim()) &&
    message.trim().length > 0 &&
    !pending;

  return (
    <form action={action} className="card-surface relative space-y-5 p-6 sm:p-8">
      <HoneypotFields />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name" required>
            Name
          </FieldLabel>
          <input
            id="name"
            name="name"
            required
            disabled={pending}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={pending}
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
            className="field-input"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="phone">Phone</FieldLabel>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={pending}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+234 …"
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="subject">Subject</FieldLabel>
        <input
          id="subject"
          name="subject"
          disabled={pending}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="field-input"
        />
      </div>

      <div>
        <FieldLabel htmlFor="message" required>
          Message
        </FieldLabel>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={pending}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="field-input"
        />
      </div>

      {turnstileSiteKey ? (
        <TurnstileField action="contact" siteKey={turnstileSiteKey} />
      ) : null}

      <SubmitButton
        pending={pending}
        disabled={!canSubmit}
        idleLabel="Send message"
        pendingLabel="Sending..."
      />

      {email ? (
        <p className="text-sm text-ink-muted">
          Or email directly:{" "}
          <a
            href={`mailto:${email}`}
            className="font-semibold text-ink underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </p>
      ) : null}
    </form>
  );
}

type ContactSuccessProps = {
  email?: string | null;
};

export function ContactSuccess({ email }: ContactSuccessProps) {
  return (
    <div
      className="rounded-2xl border border-emerald-600/25 bg-emerald-50 p-5 sm:p-6"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckIcon className="size-3.5" strokeWidth={3} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-800">
            Sent
          </p>
          <p className="mt-2 text-base font-medium leading-relaxed text-emerald-950">
            Francis has your message and will reply when he can.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="/"
              className="text-sm font-semibold text-emerald-900 underline-offset-4 hover:underline"
            >
              Back home
            </a>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="text-sm font-medium text-emerald-800/70 underline-offset-4 hover:underline"
              >
                Email Francis
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
