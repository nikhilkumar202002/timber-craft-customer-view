"use client";

import React from "react";
import Link from "next/link";

export interface AnnouncementItem {
  id: string | number;
  text: string;
  badge?: string;
  highlight?: string;
  link?: string;
  linkText?: string;
  icon?: React.ReactNode;
}

interface AnnouncementBarProps {
  items?: AnnouncementItem[];
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

const defaultAnnouncements: AnnouncementItem[] = [
  {
    id: 1,
    badge: "Free Delivery",
    text: "Complimentary white glove delivery on orders over $500",
    link: "/shipping",
    linkText: "Learn more",
    icon: (
      <svg
        className="size-3.5 text-neutral-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    id: 2,
    badge: "Artisan Quality",
    text: "100% Sustainably Sourced Solid Timber & Handcrafted Joinery",
    icon: (
      <svg
        className="size-3.5 text-amber-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L9.5 8.5 2 9.27l5.5 4.87L6.18 21 12 17.27 17.82 21l-1.32-6.86L22 9.27l-7.5-.77z" />
      </svg>
    ),
  },
  {
    id: 3,
    badge: "Special Offer",
    text: "Use code",
    highlight: "TIMBER10",
    link: "/shop",
    linkText: "for 10% off your first order",
    icon: (
      <svg
        className="size-3.5 text-emerald-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 4,
    badge: "Guarantee",
    text: "10-Year Craftsmanship Guarantee on all furniture pieces",
    icon: (
      <svg
        className="size-3.5 text-neutral-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

function AnnouncementItemView({ item }: { item: AnnouncementItem }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-normal text-neutral-200">
      {item.icon && <span className="inline-flex shrink-0 items-center">{item.icon}</span>}
      {item.badge && (
        <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-200 uppercase tracking-wider">
          {item.badge}
        </span>
      )}
      <span className="text-neutral-300">
        {item.text}{" "}
        {item.highlight && (
          <span className="font-semibold text-white underline decoration-neutral-500 underline-offset-4">
            {item.highlight}
          </span>
        )}
      </span>
      {item.link && item.linkText && (
        <Link
          href={item.link}
          className="group/link inline-flex items-center gap-1 font-semibold text-white underline decoration-neutral-600 underline-offset-2 transition-colors hover:text-amber-400 hover:decoration-amber-400"
        >
          {item.linkText}
          <svg
            className="size-3 transition-transform group-hover/link:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

function MarqueeTrack({
  items,
  speed,
  ariaHidden = false,
}: {
  items: AnnouncementItem[];
  speed: number;
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="animate-marquee flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12"
      style={{ animationDuration: `${speed}s` }}
    >
      {items.map((item, index) => (
        <React.Fragment key={`${item.id}-${index}`}>
          <AnnouncementItemView item={item} />
          <span
            className="size-1 shrink-0 rounded-full bg-neutral-700"
            aria-hidden="true"
          />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function AnnouncementBar({
  items = defaultAnnouncements,
  speed = 35,
  pauseOnHover = true,
  className = "",
}: AnnouncementBarProps) {
  return (
    <aside
      aria-label="Announcements"
      className={`relative w-full overflow-hidden border-b border-neutral-900 bg-black text-white select-none ${className}`}
    >
      {/* Subtle edge fades for smooth entry and exit */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-black via-black/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-black via-black/80 to-transparent"
        aria-hidden="true"
      />

      {/* Marquee Wrapper */}
      <div
        className={`flex w-full py-2.5 sm:py-3 ${
          pauseOnHover ? "hover:[&_.animate-marquee]:[animation-play-state:paused]" : ""
        }`}
      >
        <MarqueeTrack items={items} speed={speed} />
        <MarqueeTrack items={items} speed={speed} ariaHidden />
      </div>
    </aside>
  );
}
