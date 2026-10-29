"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiHeart,
  FiStar,
  FiCheck,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
}

export interface ProductCardProps {
  product: ProductItem;
  className?: string;
  isLiked?: boolean;
  onToggleWishlist?: (product: ProductItem, e: React.MouseEvent) => void;
  onAddToCart?: (product: ProductItem, e: React.MouseEvent) => void;
  onBuyNow?: (product: ProductItem, e: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  className = "",
  isLiked: controlledIsLiked,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) {
  const router = useRouter();
  const [internalLiked, setInternalLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isLiked =
    controlledIsLiked !== undefined ? controlledIsLiked : internalLiked;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product, e);
    } else {
      setInternalLiked((prev) => !prev);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    if (onAddToCart) {
      onAddToCart(product, e);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product, e);
    } else {
      router.push(`/checkout?product=${encodeURIComponent(product.slug)}`);
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group flex flex-col h-full rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1 ${className}`}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Status Badge */}
        {product.badge && (
          <Badge
            variant="dark-translucent"
            size="xs"
            uppercase
            className="absolute top-2 left-2 sm:top-3 sm:left-3"
          >
            {product.badge}
          </Badge>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 flex size-7 sm:size-8 items-center justify-center rounded-full backdrop-blur-xs transition-all duration-200 ${
            isLiked
              ? "bg-red-50 text-red-600 scale-105"
              : "bg-white/80 text-neutral-600 hover:bg-white hover:text-red-600 hover:scale-105"
          }`}
        >
          <FiHeart
            className={`size-3.5 sm:size-4 ${isLiked ? "fill-red-600 text-red-600" : ""}`}
          />
        </button>
      </div>

      {/* Product Details (LEFT-ALIGNED) */}
      <div className="flex flex-1 flex-col items-start justify-between p-3 sm:p-5 text-left">
        <div className="flex flex-col items-start w-full">
          {/* Category Tag */}
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1 text-left">
            {product.category}
          </span>

          {/* Product Title (Left-aligned) */}
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 transition-colors group-hover:text-amber-800 line-clamp-2 text-left">
            {product.name}
          </h3>

          {/* Rating Stars (Left-aligned) */}
          <div className="mt-1.5 sm:mt-2 flex items-center justify-start gap-1 text-[11px] sm:text-xs text-amber-500">
            <FiStar className="size-3 sm:size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-neutral-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-neutral-400">({product.reviewsCount})</span>
          </div>

          {/* Price with Rupee Icon (Left-aligned) */}
          <div className="mt-2 sm:mt-2.5 flex items-baseline gap-1.5 sm:gap-2 text-left flex-wrap">
            <span className="flex items-center text-base sm:text-lg font-bold text-neutral-950">
              <FaIndianRupeeSign className="size-3 sm:size-3.5 mr-0.5 inline-block text-neutral-950" />
              {product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="flex items-center text-[11px] sm:text-xs text-neutral-400 line-through">
                <FaIndianRupeeSign className="size-2 sm:size-2.5 mr-0.5 inline-block text-neutral-400" />
                {product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            {product.originalPrice && discountPercent > 0 && (
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600">
                {discountPercent}% off
              </span>
            )}
          </div>
        </div>

        {/* Dual Action Buttons: '+ Add' and 'Buy Now' */}
        <div className="mt-3 pt-3 sm:mt-4 sm:pt-3.5 border-t border-neutral-100 flex items-center gap-1.5 sm:gap-2 w-full">
          {/* Add to Cart button with icon + Add */}
          <Button
            type="button"
            variant={isAdded ? "success" : "secondary"}
            size="sm"
            rounded="xl"
            className="flex-1 !px-2 !py-2 sm:!px-3.5 sm:!py-2.5 text-xs"
            onClick={handleAddToCart}
            leftIcon={
              isAdded ? (
                <FiCheck className="size-3 sm:size-3.5 text-emerald-600" />
              ) : (
                <FiPlus className="size-3 sm:size-3.5" />
              )
            }
            title="Add to Cart"
          >
            {isAdded ? "Added" : "Add"}
          </Button>

          {/* Buy Now Button with Icon */}
          <Button
            type="button"
            variant="primary"
            size="sm"
            rounded="xl"
            className="flex-1 !px-2 !py-2 sm:!px-3.5 sm:!py-2.5 text-xs"
            onClick={handleBuyNow}
            leftIcon={<FiShoppingBag className="size-3 sm:size-3.5" />}
            title="Buy Now"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  );
}
