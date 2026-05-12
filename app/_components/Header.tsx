"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-emerald-600">🍕</div>
          <span className="hidden text-lg font-semibold text-zinc-950 dark:text-zinc-50 sm:inline">
            FoodDelivery
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/restaurant"
            className="text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            Restaurants
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            Support
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:inline-block"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Sign up
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-zinc-950 dark:text-zinc-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <div className="space-y-3">
            <Link
              href="/restaurant"
              className="block text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Restaurants
            </Link>
            <Link
              href="#"
              className="block text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="block text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              Support
            </Link>
            <Link
              href="/login"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
