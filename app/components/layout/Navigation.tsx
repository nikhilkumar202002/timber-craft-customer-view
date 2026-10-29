"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";

export interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  subItems?: SubMenuItem[];
}

export const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
    subItems: [
      {
        title: "All Products",
        href: "/shop",
        description: "Browse our complete catalog of handcrafted woodcraft",
      },
      {
        title: "Best Sellers",
        href: "/shop/best-sellers",
        description: "Our most sought-after and critically acclaimed creations",
      },
      {
        title: "New Arrivals",
        href: "/shop/new-arrivals",
        description: "Freshly sculpted masterworks and recent workshop drops",
      },
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    subItems: [
      {
        title: "Idols & Sculptures",
        href: "/categories/idols-sculptures",
        description: "Devotional icons, spiritual idols & fine art figurines",
      },
      {
        title: "Trophies & Awards",
        href: "/categories/trophies-awards",
        description: "Prestigious corporate awards, plaques & custom mementos",
      },
      {
        title: "Wall Hangings",
        href: "/categories/wall-hangings",
        description: "Ornate carved wooden murals, panels & relief carvings",
      },
      {
        title: "Home Decor",
        href: "/categories/home-decor",
        description: "Artisan wooden clocks, vases, bowls & tabletop accents",
      },
      {
        title: "Personalised Gifts",
        href: "/categories/personalised-gifts",
        description: "Custom engraved bespoke timber keepsakes for any occasion",
      },
    ],
  },
  {
    label: "Custom Artwork",
    href: "/custom-artwork",
    badge: "Bespoke",
    subItems: [
      {
        title: "Request Custom Artwork",
        href: "/custom-artwork/request",
        description: "Collaborate with our master carvers on a bespoke commission",
      },
      {
        title: "How It Works",
        href: "/custom-artwork/how-it-works",
        description: "From concept sketch and timber selection to final hand carving",
      },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
    subItems: [
      {
        title: "Featured Collections",
        href: "/collections/featured",
        description: "Hand-picked themes spotlighting signature timber aesthetics",
      },
      {
        title: "Limited Editions",
        href: "/collections/limited-editions",
        description: "Numbered, one-of-a-kind releases carved from rare hardwoods",
      },
    ],
  },
  {
    label: "Our Story",
    href: "/our-story",
    subItems: [
      {
        title: "About Us",
        href: "/our-story/about",
        description: "Our workshop heritage, master artisans, and dedication to craft",
      },
      {
        title: "Craftsmanship",
        href: "/our-story/craftsmanship",
        description: "Sustainable timber harvesting, traditional joinery & natural finishes",
      },
    ],
  },
  {
    label: "Journal",
    href: "/journal",
    subItems: [
      {
        title: "Blog",
        href: "/journal/blog",
        description: "Stories, woodworking insights, and studio news",
      },
      {
        title: "Craft Guides",
        href: "/journal/guides",
        description: "Hardwood care guides, timber selection & preservation advice",
      },
    ],
  },
];

interface NavigationProps {
  className?: string;
  items?: NavItem[];
}

function NavigationInner({
  className = "",
  items = navigationItems,
}: NavigationProps) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav
      aria-label="Desktop Navigation Menu"
      className={`hidden lg:flex items-center gap-5 xl:gap-7 ${className}`}
    >
      {items.map((item) => {
        const hasSubMenu = Boolean(item.subItems && item.subItems.length > 0);
        const isCurrentActive =
          item.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.href);

        if (hasSubMenu) {
          const isCategories = item.label === "Categories";

          return (
            <div
              key={item.label}
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`group inline-flex items-center gap-1.5 py-1 text-sm font-medium transition-colors ${
                  isCurrentActive
                    ? "font-semibold text-neutral-950"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                    {item.badge}
                  </span>
                )}
                <FiChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === item.label
                      ? "rotate-180 text-neutral-950"
                      : "text-neutral-400 group-hover:text-neutral-950"
                  }`}
                />
              </Link>

              {/* Active Indicator Bar */}
              {isCurrentActive && (
                <span className="absolute inset-x-0 bottom-2.5 h-0.5 rounded-full bg-neutral-950" />
              )}

              {/* Submenu Dropdown Popover */}
              {activeDropdown === item.label && item.subItems && (
                <div
                  className={`absolute top-full pt-2 z-50 ${
                    isCategories
                      ? "left-1/2 -translate-x-1/2 w-[540px]"
                      : "left-0 w-[320px]"
                  }`}
                >
                  <div className="rounded-2xl border border-neutral-200/90 bg-white/98 p-4 shadow-xl backdrop-blur-md ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                    {/* Header hint for Categories */}
                    {isCategories ? (
                      <div>
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2 px-1">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                            Carved Hardwood Categories
                          </span>
                          <Link
                            href="/categories"
                            onClick={() => setActiveDropdown(null)}
                            className="text-xs font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
                          >
                            View All
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/sub flex flex-col rounded-xl p-2.5 transition-colors hover:bg-neutral-50"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-neutral-900 group-hover/sub:text-amber-800">
                                  {sub.title}
                                </span>
                                <FiArrowRight className="size-3 text-neutral-400 opacity-0 -translate-x-1 transition-all group-hover/sub:opacity-100 group-hover/sub:translate-x-0" />
                              </div>
                              {sub.description && (
                                <p className="mt-0.5 text-[11px] leading-tight text-neutral-500 line-clamp-1">
                                  {sub.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Standard Dropdown list for Shop, Custom Artwork, Collections, Our Story, Journal */
                      <div className="space-y-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group/sub flex flex-col rounded-xl p-2.5 transition-colors hover:bg-neutral-50"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-neutral-900 group-hover/sub:text-amber-800">
                                {sub.title}
                              </span>
                              <FiArrowRight className="size-3 text-neutral-400 opacity-0 -translate-x-1 transition-all group-hover/sub:opacity-100 group-hover/sub:translate-x-0" />
                            </div>
                            {sub.description && (
                              <p className="mt-0.5 text-[11px] leading-normal text-neutral-500 line-clamp-1">
                                {sub.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        }

        // Direct Nav Link (e.g. Home)
        return (
          <div key={item.label} className="relative py-4">
            <Link
              href={item.href}
              className={`group inline-flex items-center gap-1.5 py-1 text-sm font-medium transition-colors ${
                isCurrentActive
                  ? "font-semibold text-neutral-950"
                  : "text-neutral-700 hover:text-neutral-950"
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                  {item.badge}
                </span>
              )}
            </Link>

            {/* Active Indicator Bar */}
            {isCurrentActive && (
              <span className="absolute inset-x-0 bottom-2.5 h-0.5 rounded-full bg-neutral-950" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default function Navigation(props: NavigationProps) {
  return (
    <Suspense
      fallback={
        <nav
          aria-label="Desktop Navigation Menu"
          className={`hidden lg:flex items-center gap-5 xl:gap-7 ${props.className || ""}`}
        />
      }
    >
      <NavigationInner {...props} />
    </Suspense>
  );
}
