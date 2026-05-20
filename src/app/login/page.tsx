"use client";
import BackButton from '@/components/BackButton';
import { login } from '@/app/actions/auth';
import { useActionState } from 'react';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="max-w-2xl mx-auto py-12">
      <BackButton />
      <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-8">Login</h1>
      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border border-zinc-200 dark:border-zinc-700 rounded px-3 py-2 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="border border-zinc-200 dark:border-zinc-700 rounded px-3 py-2 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400"
          />
        </div>
        {state?.error && (
          <p className="text-red-600 text-sm">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-bold py-2 rounded hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
        >
          {pending ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
