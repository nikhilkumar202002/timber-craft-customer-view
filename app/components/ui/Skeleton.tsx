import React from "react";

export type SkeletonVariant = "default" | "text" | "circular" | "rounded";
export type SkeletonAnimation = "pulse" | "shimmer" | "none";
export type SkeletonRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  rounded?: SkeletonRounded;
  width?: string | number;
  height?: string | number;
  className?: string;
  as?: React.ElementType;
}

const roundedMap: Record<SkeletonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

/**
 * Base atomic Skeleton component with configurable shapes, rounded corners, and animations
 */
export default function Skeleton({
  variant = "default",
  animation = "pulse",
  rounded,
  width,
  height,
  className = "",
  style,
  as: Component = "div",
  ...props
}: SkeletonProps) {
  // Base background
  const baseBg = "bg-neutral-200/80";

  // Animation classes
  const animationClass =
    animation === "pulse"
      ? "animate-pulse"
      : animation === "shimmer"
        ? "animate-shimmer"
        : "";

  // Variant default shapes and roundedness
  let variantClass = "";
  let defaultRounded: SkeletonRounded = "md";

  switch (variant) {
    case "text":
      variantClass = "h-4 w-full";
      defaultRounded = "md";
      break;
    case "circular":
      variantClass = "rounded-full aspect-square";
      defaultRounded = "full";
      break;
    case "rounded":
      variantClass = "w-full";
      defaultRounded = "2xl";
      break;
    case "default":
    default:
      variantClass = "w-full";
      defaultRounded = "md";
      break;
  }

  const finalRounded = rounded ? roundedMap[rounded] : roundedMap[defaultRounded];

  // Inline dimensions if passed as numbers or custom strings
  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {}),
    ...(height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : {}),
    ...style,
  };

  return (
    <Component
      aria-hidden="true"
      role="status"
      style={inlineStyles}
      className={`select-none shrink-0 ${baseBg} ${finalRounded} ${animationClass} ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}

/**
 * Text paragraph skeleton with realistic staggered line lengths
 */
export function TextSkeleton({
  lines = 3,
  lastLineWidth = "65%",
  className = "",
  animation = "pulse",
}: {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
  animation?: SkeletonAnimation;
}) {
  return (
    <div className={`space-y-2.5 w-full ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        const width = isLast ? lastLineWidth : i % 2 === 0 ? "100%" : "92%";
        return (
          <Skeleton
            key={i}
            variant="text"
            animation={animation}
            style={{ width }}
            className="h-3.5"
          />
        );
      })}
    </div>
  );
}

/**
 * Reusable Product Card Skeleton matching ProductCard design:
 * Aspect-[4/3] image + status badge + wishlist heart + category tag + title + rating + price + CTA button
 */
export function ProductCardSkeleton({
  animation = "pulse",
  className = "",
}: {
  animation?: SkeletonAnimation;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col h-full rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs ${className}`}
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        <Skeleton
          animation={animation}
          rounded="none"
          className="size-full bg-neutral-200/90"
        />
        {/* Badge Placeholder */}
        <Skeleton
          animation={animation}
          rounded="full"
          className="absolute top-3 left-3 h-5 w-16 bg-neutral-300/80"
        />
        {/* Wishlist Circle Placeholder */}
        <Skeleton
          variant="circular"
          animation={animation}
          className="absolute top-3 right-3 size-8 bg-neutral-300/80"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col items-start justify-between p-4 sm:p-5 text-left w-full space-y-4">
        <div className="w-full space-y-2">
          {/* Category Tag */}
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-3 w-24 bg-neutral-200"
          />
          {/* Title Lines */}
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-4.5 w-full bg-neutral-200"
          />
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-4.5 w-3/4 bg-neutral-200"
          />

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-1">
            <Skeleton
              animation={animation}
              rounded="md"
              className="h-3.5 w-14 bg-neutral-200"
            />
            <Skeleton
              animation={animation}
              rounded="md"
              className="h-3 w-8 bg-neutral-200"
            />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1.5">
            <Skeleton
              animation={animation}
              rounded="md"
              className="h-5 w-24 bg-neutral-300/90"
            />
            <Skeleton
              animation={animation}
              rounded="md"
              className="h-4 w-14 bg-neutral-200"
            />
          </div>
        </div>

        {/* Action Button */}
        <Skeleton
          animation={animation}
          rounded="xl"
          className="h-10 w-full bg-neutral-200 mt-2"
        />
      </div>
    </div>
  );
}

/**
 * Reusable Product Grid Skeleton for Shop, Category, & Search lists
 * (Maintains 2 columns on mobile screens!)
 */
export function ProductGridSkeleton({
  count = 8,
  animation = "pulse",
  className = "",
}: {
  count?: number;
  animation?: SkeletonAnimation;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} animation={animation} />
      ))}
    </div>
  );
}

/**
 * Reusable Category Card Skeleton matching CategoryCard design
 * Aspect-[4/3] image + centered category title
 */
export function CategoryCardSkeleton({
  animation = "pulse",
  className = "",
}: {
  animation?: SkeletonAnimation;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col h-full rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs ${className}`}
    >
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        <Skeleton
          animation={animation}
          rounded="none"
          className="size-full bg-neutral-200/90"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-3 sm:p-5 text-center">
        <Skeleton
          animation={animation}
          rounded="md"
          className="h-4.5 w-28 bg-neutral-200"
        />
      </div>
    </div>
  );
}

/**
 * Reusable Category Section/Grid Skeleton
 * (Maintains 2 columns on mobile screens!)
 */
export function CategoryGridSkeleton({
  count = 4,
  animation = "pulse",
  className = "",
}: {
  count?: number;
  animation?: SkeletonAnimation;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 ${className}`}
      aria-label="Loading categories"
    >
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} animation={animation} />
      ))}
    </div>
  );
}

/**
 * Reusable Cart Item Skeleton matching CartItem design
 */
export function CartItemSkeleton({
  animation = "pulse",
  className = "",
}: {
  animation?: SkeletonAnimation;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-white border border-neutral-200/90 rounded-2xl shadow-xs ${className}`}
    >
      {/* Thumbnail */}
      <Skeleton
        animation={animation}
        rounded="xl"
        className="size-24 sm:size-28 lg:size-32 bg-neutral-200 shrink-0"
      />

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="space-y-2">
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-3 w-20 bg-neutral-200"
          />
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-5 w-3/4 bg-neutral-200"
          />
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-3.5 w-1/2 bg-neutral-200"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Skeleton
            animation={animation}
            rounded="lg"
            className="h-9 w-28 bg-neutral-200"
          />
          <Skeleton
            animation={animation}
            rounded="md"
            className="h-6 w-20 bg-neutral-300"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Product Detail Page Skeleton (Gallery + Info specs)
 */
export function ProductDetailSkeleton({
  animation = "pulse",
  className = "",
}: {
  animation?: SkeletonAnimation;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 ${className}`}
      aria-label="Loading product details"
    >
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex items-center gap-2">
        <Skeleton animation={animation} className="h-4 w-24" />
        <span className="text-neutral-300">/</span>
        <Skeleton animation={animation} className="h-4 w-32" />
        <span className="text-neutral-300">/</span>
        <Skeleton animation={animation} className="h-4 w-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <Skeleton
            animation={animation}
            rounded="3xl"
            className="aspect-[4/3] w-full bg-neutral-200"
          />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                animation={animation}
                rounded="xl"
                className="size-20 bg-neutral-200"
              />
            ))}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <Skeleton animation={animation} className="h-4 w-28 bg-neutral-200" />
            <Skeleton animation={animation} className="h-8 w-full bg-neutral-200" />
            <Skeleton animation={animation} className="h-8 w-2/3 bg-neutral-200" />
            <Skeleton animation={animation} className="h-4 w-36 bg-neutral-200" />
          </div>

          <div className="border-y border-neutral-200 py-4 space-y-2">
            <Skeleton animation={animation} className="h-10 w-44 bg-neutral-300" />
            <Skeleton animation={animation} className="h-3.5 w-64 bg-neutral-200" />
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5 space-y-3 bg-white">
            <Skeleton animation={animation} className="h-4 w-40 bg-neutral-200" />
            <div className="space-y-2 pt-1">
              <Skeleton animation={animation} className="h-3.5 w-full bg-neutral-200" />
              <Skeleton animation={animation} className="h-3.5 w-full bg-neutral-200" />
              <Skeleton animation={animation} className="h-3.5 w-full bg-neutral-200" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Skeleton
              animation={animation}
              rounded="xl"
              className="h-12 w-full bg-neutral-900/80"
            />
            <Skeleton
              animation={animation}
              rounded="xl"
              className="h-12 w-full bg-neutral-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
