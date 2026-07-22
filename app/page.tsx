"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (restaurant.trim()) params.set("restaurant", restaurant.trim());
    const query = params.toString();
    router.push(`/restaurant${query ? `?${query}` : ""}`);
  };

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from("Users").select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    async function fetchCities() {
      try {
        const response = await fetch("/api/restaurant/cities");
        if (!response.ok) {
          throw new Error("Failed to load cities");
        }
        const data = await response.json();
        setCities(Array.from(new Set(data.cities || [])));
      } catch (error) {
        console.error(error);
      }
    }

    testConnection();
    fetchCities();
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

        <form onSubmit={handleSearch} className="grid w-full gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <span className="font-medium">Search by location</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <span className="font-medium">Search by restaurant</span>
              <input
                type="text"
                value={restaurant}
                onChange={(event) => setRestaurant(event.target.value)}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                placeholder="Search restaurants"
              />
            </label>
          </div>

          <button
            type="submit"
            className="flex h-14 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Search
          </button>
        </form>

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
