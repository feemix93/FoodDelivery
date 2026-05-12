import { SignupForm } from "../_components";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 dark:bg-black sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <div className="space-y-3 text-center sm:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-600">
            Get started
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            Create your account
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Sign up now to place orders, save favorites, and get faster
            checkout.
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
