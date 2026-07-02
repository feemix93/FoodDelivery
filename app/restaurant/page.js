import { Header, LoginForm, SignupForm } from "../_components";

export default function RestaurantPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-12 sm:px-8">
        <div className="space-y-12">
          {/* Restaurants Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-zinc-950 dark:text-zinc-50">
                Restaurants
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Browse and order from our partner restaurants.
              </p>
            </div>

            {/* Placeholder for restaurant list */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-4 h-40 rounded-lg bg-gradient-to-r from-emerald-200 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800" />
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    Restaurant {i}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Delicious food with fast delivery
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      ⭐ 4.5 (150 reviews)
                    </span>
                    <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Forms Section */}
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
