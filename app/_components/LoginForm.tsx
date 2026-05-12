"use client";

import { useState } from "react";

type LoginFormState = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    remember: false,
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (field: keyof LoginFormState, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Login submitted. Implement backend integration as needed.");
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200/75 bg-white p-8 shadow-xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-6 space-y-3">
        <h2 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">Login</h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            placeholder="Enter your password"
          />
        </label>

        <div className="flex items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(event) => handleChange("remember", event.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
            />
            Remember me
          </label>
          <button type="button" className="font-medium text-emerald-600 hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </form>

      {status ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950 dark:bg-emerald-950/10 dark:text-emerald-200">
          {status}
        </p>
      ) : null}
    </div>
  );
}
