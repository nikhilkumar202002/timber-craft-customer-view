"use client";

import React from "react";
import { FiSliders } from "react-icons/fi";

export type SortOption =
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "rating"
  | "newest";

export interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured & Popular" },
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
  { id: "rating", label: "Highest Customer Rating" },
  { id: "newest", label: "Newest Artisanal Drop" },
];

export default function ProductSort({
  value,
  onChange,
  className = "",
}: ProductSortProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
        <FiSliders className="size-3.5 text-neutral-400" />
        <span>Sort by:</span>
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 shadow-2xs focus:border-neutral-950 focus:outline-hidden transition-colors cursor-pointer"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
