"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CategoryItem {
  id: number | string;
  name: string;
  slug: string;
  image: string;
  itemCount?: number;
  description?: string;
}

export interface CategoryCardProps {
  category: CategoryItem;
  className?: string;
  showItemCount?: boolean;
}

export default function CategoryCard({
  category,
  className = "",
  showItemCount = false,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group flex flex-col h-full rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1 ${className}`}
    >
      {/* Category Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />
      </div>

      {/* Category Heading (Center Aligned) */}
      <div className="flex flex-1 flex-col items-center justify-center p-3 sm:p-5 text-center">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-neutral-900 transition-colors group-hover:text-amber-800 line-clamp-2">
          {category.name}
        </h3>
        {showItemCount && category.itemCount !== undefined && (
          <p className="mt-1 text-[11px] sm:text-xs text-neutral-500">
            {category.itemCount} {category.itemCount === 1 ? "Product" : "Products"}
          </p>
        )}
      </div>
    </Link>
  );
}
