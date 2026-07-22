"use client";

import { Header } from "@/app/_components";
import { FormEvent, useState } from "react";

export default function AddRestaurantPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    city: "",
    rating: "",
    reviews: "",
    deliveryTime: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (!form.name.trim()) {
      setStatus("Restaurant name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          city: form.city,
          rating: form.rating ? Number(form.rating) : null,
          reviews: form.reviews ? Number(form.reviews) : null,
          deliveryTime: form.deliveryTime,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to create restaurant.");
      }

      setStatus("Restaurant created successfully.");
      setForm({
        name: "",
        description: "",
        city: "",
        rating: "",
        reviews: "",
        deliveryTime: "",
      });
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to create restaurant.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <main className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8">
        <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
              Add restaurant
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Create a new restaurant listing for your delivery marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Restaurant name
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                placeholder="e.g. Pizza Palace"
              />
            </label>

            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                className="mt-2 h-28 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                placeholder="A short description of the restaurant"
              />
            </label>

            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              City
              <input
                type="text"
                value={form.city}
                onChange={(event) => handleChange("city", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                placeholder="e.g. London"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-3">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Rating
                <input
                  type="number"
                  value={form.rating}
                  onChange={(event) =>
                    handleChange("rating", event.target.value)
                  }
                  min="0"
                  max="5"
                  step="0.1"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  placeholder="4.5"
                />
              </label>

              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Reviews
                <input
                  type="number"
                  value={form.reviews}
                  onChange={(event) =>
                    handleChange("reviews", event.target.value)
                  }
                  min="0"
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  placeholder="150"
                />
              </label>

              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Delivery time
                <input
                  type="text"
                  value={form.deliveryTime}
                  onChange={(event) =>
                    handleChange("deliveryTime", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  placeholder="25-35 min"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {loading ? "Creating restaurant..." : "Create restaurant"}
            </button>
          </form>

          {status ? (
            <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950 dark:bg-emerald-950/10 dark:text-emerald-200">
              {status}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
