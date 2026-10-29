"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiHeart,
  FiSettings,
  FiEdit3,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
  FiHeadphones,
} from "react-icons/fi";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export interface AccountNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: "amber" | "default" | "success";
}

export const defaultAccountNavItems: AccountNavItem[] = [
  {
    id: "profile",
    label: "My Profile",
    href: "/account",
    icon: FiUser,
  },
  {
    id: "orders",
    label: "Orders & Tracking",
    href: "/account/orders",
    icon: FiPackage,
    badge: 2,
    badgeVariant: "amber",
  },
  {
    id: "custom-orders",
    label: "Custom Commissions",
    href: "/account/custom-orders",
    icon: FiEdit3,
    badge: "1 Active",
    badgeVariant: "success",
  },
  {
    id: "addresses",
    label: "Saved Addresses",
    href: "/account/addresses",
    icon: FiMapPin,
  },
  {
    id: "wishlist",
    label: "Saved Wishlist",
    href: "/wishlist",
    icon: FiHeart,
    badge: 4,
    badgeVariant: "default",
  },
  {
    id: "settings",
    label: "Account Settings",
    href: "/account/settings",
    icon: FiSettings,
  },
  {
    id: "support",
    label: "Support & Care Guide",
    href: "/contact",
    icon: FiHelpCircle,
  },
];

export interface AccountSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    memberTier?: string;
    joinedDate?: string;
  };
  activeTab?: string;
  navItems?: AccountNavItem[];
  onLogout?: () => void;
  className?: string;
}

const defaultUser = {
  name: "Ramesh Sharma",
  email: "ramesh.sharma@example.com",
  memberTier: "Artisanal Patron",
  joinedDate: "Member since 2024",
};

function AccountSidebarContent({
  user = defaultUser,
  activeTab,
  navItems = defaultAccountNavItems,
  onLogout,
  className = "",
}: AccountSidebarProps) {
  const pathname = usePathname();

  // Get user initials for avatar
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      aria-label="Account Navigation"
      className={`rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs ${className}`}
    >
      {/* =========================================================
          USER PROFILE CARD HEADER
         ========================================================= */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100">
        <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-amber-900 text-white font-bold text-base shadow-sm ring-4 ring-amber-50">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 truncate">
              {user.name}
            </h2>
          </div>
          <p className="text-xs text-neutral-500 truncate mt-0.5">
            {user.email}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Badge variant="amber" size="xs" uppercase>
              {user.memberTier || "Patron Member"}
            </Badge>
          </div>
        </div>
      </div>

      {/* =========================================================
          NAVIGATION LINKS
         ========================================================= */}
      <nav className="mt-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab !== undefined
              ? activeTab === item.id
              : pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center justify-between rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-neutral-950 text-white shadow-sm"
                  : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`size-4.5 transition-colors shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-400 group-hover:text-neutral-950"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.badge !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : item.badgeVariant === "amber"
                          ? "bg-amber-100 text-amber-900"
                          : item.badgeVariant === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                            : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <FiChevronRight
                  className={`size-4 transition-transform duration-200 ${
                    isActive
                      ? "text-white/80 translate-x-0.5"
                      : "text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-0.5"
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* =========================================================
          CONCIERGE & ARTISAN ADVICE CALLOUT
         ========================================================= */}
      <div className="mt-6 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <FiHeadphones className="size-4 text-amber-800" />
          <span>Concierge Care</span>
        </div>
        <p className="text-neutral-600 leading-relaxed text-[11px]">
          Need restoration advice or custom timber carving assistance? Our master
          craftsmen are here to help.
        </p>
        <Link
          href="/custom-artwork/request"
          className="inline-block text-[11px] font-bold text-amber-900 underline underline-offset-2 hover:text-amber-950"
        >
          Book Consultation &rarr;
        </Link>
      </div>

      {/* =========================================================
          LOG OUT ACTION BUTTON
         ========================================================= */}
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          fullWidth
          rounded="xl"
          onClick={onLogout}
          leftIcon={<FiLogOut className="size-4" />}
          className="text-neutral-500 hover:text-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
}

export default function AccountSidebar(props: AccountSidebarProps) {
  return (
    <Suspense
      fallback={
        <aside
          aria-label="Account Navigation Loading"
          className={`rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-xs ${
            props.className || ""
          }`}
        >
          <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100 animate-pulse">
            <div className="size-13 rounded-2xl bg-neutral-200" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
              <div className="h-3 bg-neutral-100 rounded-md w-1/2" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 bg-neutral-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </aside>
      }
    >
      <AccountSidebarContent {...props} />
    </Suspense>
  );
}
