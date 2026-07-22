"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
export default function Home() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from("Users").select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    testConnection();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-12 font-sans dark:bg-black sm:px-10">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12 rounded-3xl border border-zinc-200/75 bg-white p-10 shadow-xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Welcome to FoodDelivery
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Get started by signing up or logging in to manage your orders,
              favorites, and delivery preferences.
            </p>
          </div>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Link
            href="/login"
            className="flex h-14 items-center justify-center rounded-2xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Already have an account? Login
          </Link>
          <Link
            href="/signup"
            className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            SignUp
          </Link>
        </div>
      </main>
    </div>
  );
}
