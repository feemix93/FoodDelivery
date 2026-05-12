import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-950 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-emerald-600">🍕</div>
              <span className="text-lg font-semibold text-white">
                FoodDelivery
              </span>
            </div>
            <p className="text-sm leading-7 text-zinc-400">
              Fast, reliable food delivery service right to your door. Order
              from your favorite restaurants anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant"
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@fooddelivery.com"
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  Email Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-zinc-400 transition hover:text-white"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-zinc-400 transition hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-zinc-400 transition hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9-5.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-zinc-400 transition hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-zinc-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {currentYear} FoodDelivery. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-zinc-500 transition hover:text-zinc-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-zinc-500 transition hover:text-zinc-400"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-zinc-500 transition hover:text-zinc-400"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
