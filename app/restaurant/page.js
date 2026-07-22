"use client";

import { useEffect, useState } from "react";
import { Header, LoginForm, SignupForm } from "../_components";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurant");
        const data = await response.json();
        if (response.ok) {
          setRestaurants(data.restaurants || []);
        }
      } catch (error) {
        console.error("Failed to load restaurants", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 sm:px-8">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-zinc-950 dark:text-zinc-50">
                Restaurants
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Browse and order from our partner restaurants.
              </p>
            </div>

            {loading ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Loading restaurants...
              </p>
            ) : restaurants.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                No restaurants yet. Add one from the header to get started.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="mb-4 h-40 rounded-lg bg-gradient-to-r from-emerald-200 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800" />
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      {restaurant.name}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {restaurant.description ||
                        "Delicious food with fast delivery"}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        ⭐ {restaurant.rating?.toFixed(1) || "0.0"} (
                        {restaurant.reviews || 0} reviews)
                      </span>
                      <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
                        Order Now
                      </button>
                    </div>
                    {restaurant.deliveryTime ? (
                      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                        Delivery: {restaurant.deliveryTime}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <p className="mb-8 text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Authentication Demo
            </p>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <LoginForm />
              </div>
              <div>
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
