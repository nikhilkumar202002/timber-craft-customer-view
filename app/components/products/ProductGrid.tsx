"use client";

import React from "react";
import ProductCard, { ProductItem } from "./ProductCard";
import EmptyState from "../ui/EmptyState";

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
      <EmptyState
        variant="card"
        title="No Handcrafted Pieces Found"
        description="Try adjusting or clearing your filters to discover more carved woodworks."
      />
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
