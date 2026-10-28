"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiX,
  FiMenu,
  FiPackage,
  FiSettings,
} from "react-icons/fi";
import Navigation, { navigationItems } from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Wishlist & Shopping Cart counter state
  const [wishlistCount] = useState(0);
  const [cartCount] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Adjust header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K for search, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsAccountOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Click outside to close account & search popovers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setIsAccountOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-search-trigger="true"]')
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
          isScrolled ? "border-b border-neutral-200 shadow-xs" : "border-b border-neutral-100"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* =========================================
              LEFT SIDE: LOGO
             ========================================= */}
          <div className="flex shrink-0 items-center">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="Timber Craft Home"
            >
              <Image
                src="/logo/main-logo-black.png"
                alt="Timber Craft"
                width={150}
                height={46}
                className="h-10 sm:h-15 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                priority
              />
            </Link>
          </div>

          {/* =========================================
              MIDDLE: NAVIGATION MENU (DESKTOP)
             ========================================= */}
          <Navigation />

          {/* =========================================
              RIGHT SIDE: SEARCH, ACCOUNT, WISHLIST, CART
             ========================================= */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* 1. SEARCH BUTTON */}
            <button
              type="button"
              data-search-trigger="true"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Search items"
              className="group relative flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              title="Search (⌘K)"
            >
              <FiSearch className="size-5 transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* 2. MY ACCOUNT BUTTON & DROPDOWN */}
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setIsAccountOpen((prev) => !prev)}
                aria-label="My Account"
                className="group relative flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                title="My Account"
              >
                <FiUser className="size-5 transition-transform duration-200 group-hover:scale-110" />
              </button>

              {/* Account Dropdown */}
              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="border-b border-neutral-100 px-3 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Welcome to Timber Craft
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-neutral-900">
                      Sign in to your account
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href="/login"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex-1 rounded-lg bg-neutral-950 py-1.5 text-center text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex-1 rounded-lg border border-neutral-200 py-1.5 text-center text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
                      >
                        Register
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/account/orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                    >
                      <FiPackage className="size-4 text-neutral-400" />
                      My Orders & Tracking
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                    >
                      <FiHeart className="size-4 text-neutral-400" />
                      Saved Wishlist
                    </Link>
                    <Link
                      href="/account/settings"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                    >
                      <FiSettings className="size-4 text-neutral-400" />
                      Account Settings
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. WISHLIST BUTTON */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="group relative flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              title="Wishlist"
            >
              <FiHeart className="size-5 transition-transform duration-200 group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 4. SHOPPING CART BUTTON */}
            <Link
              href="/cart"
              aria-label={`Shopping Cart (${cartCount} items)`}
              className="group relative flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              title="Shopping Cart"
            >
              <FiShoppingBag className="size-5 transition-transform duration-200 group-hover:scale-110" />
              {cartCount > 0 ? (
                <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute top-2 right-2 size-2 rounded-full bg-neutral-400/60" />
              )}
            </Link>

            {/* MOBILE MENU TOGGLE BUTTON (MOBILE ONLY) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="flex size-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
            >
              <FiMenu className="size-5" />
            </button>
          </div>
        </div>

        {/* =========================================
            EXPANDABLE SEARCH BAR / OVERLAY
           ========================================= */}
        {isSearchOpen && (
          <div
            ref={searchContainerRef}
            className="border-t border-neutral-100 bg-white shadow-lg animate-in slide-in-from-top-2 duration-200"
          >
            <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <FiSearch className="absolute left-4 size-5 text-neutral-400" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search idols, trophies, wall hangings, personalised gifts..."
                  className="w-full rounded-2xl bg-neutral-100/80 py-3.5 pl-12 pr-28 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
                <div className="absolute right-3 flex items-center gap-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-neutral-950 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
                    aria-label="Close search"
                  >
                    <FiX className="size-4" />
                  </button>
                </div>
              </form>

              {/* Quick Search Suggestions */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-700">Popular:</span>
                {[
                  "Carved Idols",
                  "Wooden Trophies",
                  "Wall Hangings",
                  "Personalised Gifts",
                  "Limited Editions",
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/shop?q=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-950"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navigationItems}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
      />
    </>
  );
}
