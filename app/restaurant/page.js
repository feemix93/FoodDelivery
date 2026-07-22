"use client";

import { useEffect, useState } from "react";
import { Header, LoginForm, SignupForm } from "../_components";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [cities, setCities] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesLocation =
      !location ||
      (restaurant.city &&
        restaurant.city.toLowerCase() === location.toLowerCase());
    const matchesRestaurant =
      !restaurantSearch ||
      restaurant.name.toLowerCase().includes(restaurantSearch.toLowerCase());
    return matchesLocation && matchesRestaurant;
  });

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

    const fetchCities = async () => {
      try {
        const response = await fetch("/api/restaurant/cities");
        const data = await response.json();
        if (response.ok) {
          setCities(data.cities || []);
        }
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    };

    fetchRestaurants();
    fetchCities();
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

            <form onSubmit={handleSearch} className="grid w-full gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                  <span className="font-medium">Search by location</span>
                  <select
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  >
                    <option value="">All cities</option>
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
                    value={restaurantSearch}
                    onChange={(event) =>
                      setRestaurantSearch(event.target.value)
                    }
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

            {loading ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Loading restaurants...
              </p>
            ) : filteredRestaurants.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                No restaurants match your filters.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRestaurants.map((restaurant) => (
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
