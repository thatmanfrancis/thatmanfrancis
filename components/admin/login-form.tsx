"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/admin/actions";
import { FieldLabel, SubmitButton } from "@/components/ui/form";

type AdminLoginFormProps = {
  error?: string;
};

async function loginFormAction(_prev: null, formData: FormData) {
  await loginAction(formData);
  return null;
}

export function AdminLoginForm({ error }: AdminLoginFormProps) {
  const [, action, pending] = useActionState(loginFormAction, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    password.trim().length > 0 &&
    !pending;

  return (
    <>
      {error ? (
        <p className="mt-5 rounded-xl border border-ink/10 bg-muted px-4 py-3 text-sm text-ink">
          {error === "invalid"
            ? "Invalid email or password."
            : error === "rate"
              ? "Too many sign-in attempts. Wait a few minutes and try again."
              : "Email and password are required."}
        </p>
      ) : null}

      <form action={action} className="mt-8 space-y-5">
        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={pending}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field-input"
          />
        </div>
        <div>
          <FieldLabel htmlFor="password" required>
            Password
          </FieldLabel>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            disabled={pending}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="field-input"
          />
        </div>
        <SubmitButton
          pending={pending}
          disabled={!canSubmit}
          idleLabel="Sign in"
          pendingLabel="Signing in..."
          className="btn btn-primary w-full"
        />
      </form>
    </>
  );
}
