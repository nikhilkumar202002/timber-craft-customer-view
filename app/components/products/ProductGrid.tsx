"use client";

import React from "react";
import ProductCard, { ProductItem } from "./ProductCard";

export interface ProductGridProps {
  products: ProductItem[];
  columns?: 2 | 3 | 4;
  className?: string;
  emptyState?: React.ReactNode;
}

export default function ProductGrid({
  products,
  columns = 3,
  className = "",
  emptyState,
}: ProductGridProps) {
  if (products.length === 0) {
    if (emptyState) return <>{emptyState}</>;

    return (
      <div className="rounded-3xl border border-neutral-200/90 bg-white p-12 text-center shadow-xs">
        <h3 className="text-base font-bold text-neutral-900">
          No Handcrafted Pieces Found
        </h3>
        <p className="mt-1 text-xs text-neutral-500 max-w-sm mx-auto">
          Try adjusting or clearing your filters to discover more carved woodworks.
        </p>
      </div>
    );
  }

  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${colClass} gap-6 ${className}`}>
      {products.map((product) => (
        <div key={product.id} className="w-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
