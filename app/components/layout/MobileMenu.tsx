"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiX,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";
import { NavItem } from "./Navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  wishlistCount?: number;
  cartCount?: number;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  wishlistCount = 0,
  cartCount = 0,
}: MobileMenuProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4.5">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <Image
              src="/logo/main-logo-black.png"
              alt="Timber Craft"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Close menu"
          >
            <FiX className="size-5" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="border-b border-neutral-100 px-6 py-3.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="relative"
          >
            <FiSearch className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search idols, trophies, decor..."
              className="w-full rounded-xl bg-neutral-100 py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </form>
        </div>

        {/* Navigation Links with Accordion Submenus */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const hasSubmenu = Boolean(item.subItems && item.subItems.length > 0);
              const isExpanded = Boolean(expandedMenus[item.label]);

              if (hasSubmenu) {
                return (
                  <li key={item.label} className="rounded-xl border border-neutral-100/80 bg-neutral-50/50">
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex w-full items-center justify-between px-3.5 py-3 text-left text-sm font-semibold text-neutral-800 transition-colors hover:text-neutral-950"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900 uppercase">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <FiChevronDown
                        className={`size-4 text-neutral-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-neutral-950" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu Accordion Items */}
                    {isExpanded && item.subItems && (
                      <div className="border-t border-neutral-100/90 bg-white px-2 py-2 space-y-1 rounded-b-xl">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={onClose}
                            className="flex flex-col rounded-lg px-3 py-2 text-xs transition-colors hover:bg-neutral-50"
                          >
                            <span className="font-semibold text-neutral-900">
                              {sub.title}
                            </span>
                            {sub.description && (
                              <span className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              // Direct Link (e.g. Home)
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-neutral-950"
                  >
                    <span>{item.label}</span>
                    <FiArrowRight className="size-3.5 text-neutral-400" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Bar (Account / Wishlist / Cart) */}
        <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-4">
          <div className="grid grid-cols-3 gap-2">
            <Link
              href="/account"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-3 text-neutral-700 shadow-xs transition-colors hover:text-neutral-950"
            >
              <FiUser className="size-5" />
              <span className="text-[11px] font-medium">Account</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="relative flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-3 text-neutral-700 shadow-xs transition-colors hover:text-neutral-950"
            >
              <div className="relative">
                <FiHeart className="size-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium">Wishlist</span>
            </Link>

            <Link
              href="/cart"
              onClick={onClose}
              className="relative flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-3 text-neutral-700 shadow-xs transition-colors hover:text-neutral-950"
            >
              <div className="relative">
                <FiShoppingBag className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium">Cart</span>
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/custom-artwork/request"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
            >
              Request Custom Artwork
              <FiArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
