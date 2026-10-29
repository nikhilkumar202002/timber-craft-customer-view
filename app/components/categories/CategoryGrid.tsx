import React from "react";
import CategoryCard, { CategoryItem } from "./CategoryCard";

export interface CategoryGridProps {
  categories: CategoryItem[];
  className?: string;
  columns?: 2 | 3 | 4;
  showItemCount?: boolean;
}

export default function CategoryGrid({
  categories,
  className = "",
  columns = 4,
  showItemCount = false,
}: CategoryGridProps) {
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass} gap-3 sm:gap-6 ${className}`}>
      {categories.map((cat) => (
        <div key={cat.id} className="w-full">
          <CategoryCard category={cat} showItemCount={showItemCount} />
        </div>
      ))}
    </div>
  );
}
