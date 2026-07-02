"use client";

import { Header } from "@/app/_components";
import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  createdAt: string;
};

export default function RestaurantDashboardPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/restaurant/menu");
      if (!response.ok) throw new Error("Failed to load menu items");
      const data = await response.json();
      setMenuItems(data.menuItems || []);
    } catch (error) {
      console.error(error);
      setStatus("Could not load menu items.");
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (!form.name.trim() || !form.price.trim()) {
      setStatus("Name and price are required.");
      return;
    }

    const priceValue = Number(form.price);
    if (Number.isNaN(priceValue) || priceValue <= 0) {
      setStatus("Please enter a valid price.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/restaurant/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: priceValue,
          imageUrl: form.imageUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to add menu item.");
      }

      setMenuItems((current) => [data, ...current]);
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      setStatus("Menu item added successfully.");
    } catch (error) {
      console.error(error);
      setStatus(
        error instanceof Error ? error.message : "Failed to add menu item.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-zinc-950 dark:text-zinc-50">
                Restaurant Dashboard
              </h1>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Manage your restaurant listings, orders, and profile settings.
              </p>
            </div>
            <Link
              href="/restaurant"
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Back to restaurants
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  Overview
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  View your restaurant performance, orders, and customer
                  activity in one place.
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  Menu items
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Add and manage the food items customers can order from this
                  restaurant.
                </p>

                {menuItems.length === 0 ? (
                  <div className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
                    No menu items yet. Add your first dish using the form beside
                    this panel.
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-4">
                            {item.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-20 w-28 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-20 w-28 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                            )}

                            <div>
                              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                                {item.name}
                              </h3>
                              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                {item.description || "No description provided."}
                              </p>
                            </div>
                          </div>

                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                Add menu item
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Create a new food item for your restaurant menu.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Item name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                    placeholder="e.g. Margherita Pizza"
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
                    placeholder="A short description of the dish"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Price
                    <input
                      type="number"
                      value={form.price}
                      onChange={(event) =>
                        handleChange("price", event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                      min="0"
                      step="0.01"
                      placeholder="9.99"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Image URL
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(event) =>
                        handleChange("imageUrl", event.target.value)
                      }
                      className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                      placeholder="https://example.com/image.jpg"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {loading ? "Adding item..." : "Add menu item"}
                </button>
              </form>

              {status ? (
                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-950 dark:bg-emerald-950/10 dark:text-emerald-200">
                  {status}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
