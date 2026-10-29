"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPlus, FiMinus, FiTrash2, FiHeart } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Button from "../ui/Button";

export interface CartItemType {
  id: string | number;
  productId: number | string;
  name: string;
  slug: string;
  category?: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  woodType?: string;
  size?: string;
  finish?: string;
  customEngraving?: string;
  inStock?: boolean;
  maxQuantity?: number;
}

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (id: string | number, newQuantity: number) => void;
  onRemove?: (id: string | number) => void;
  onMoveToWishlist?: (item: CartItemType) => void;
  isWishlisted?: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
  isWishlisted: initialWishlisted = false,
}: CartItemProps) {
  const [localQuantity, setLocalQuantity] = useState(item.quantity || 1);
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const maxQty = item.maxQuantity || 10;

  // Use either controlled callback or local state
  const currentQuantity =
    onUpdateQuantity !== undefined ? item.quantity : localQuantity;

  const handleDecrease = () => {
    if (currentQuantity <= 1) return;
    const newQty = currentQuantity - 1;
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQty);
    } else {
      setLocalQuantity(newQty);
    }
  };

  const handleIncrease = () => {
    if (currentQuantity >= maxQty) return;
    const newQty = currentQuantity + 1;
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQty);
    } else {
      setLocalQuantity(newQty);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    if (onMoveToWishlist) {
      onMoveToWishlist(item);
    }
  };

  const lineTotal = item.price * currentQuantity;
  const originalLineTotal = item.originalPrice
    ? item.originalPrice * currentQuantity
    : undefined;
  const discountPercent = item.originalPrice
    ? Math.round(
        ((item.originalPrice - item.price) / item.originalPrice) * 100
      )
    : 0;

  return (
    <div className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 bg-white border border-neutral-200/90 rounded-2xl shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-sm">
      {/* Product Thumbnail */}
      <Link
        href={`/product/${item.slug}`}
        className="relative size-24 sm:size-28 lg:size-32 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100/80"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 128px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {discountPercent > 0 && (
          <span className="absolute top-1.5 left-1.5 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white shadow-xs">
            {discountPercent}% Off
          </span>
        )}
      </Link>

      {/* Main Details */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        {/* Top Info: Category, Title, Custom Specs, Price */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="space-y-1 sm:max-w-[70%]">
            {item.category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                {item.category}
              </span>
            )}

            <h3 className="text-base sm:text-lg font-bold text-neutral-900 transition-colors hover:text-amber-800 line-clamp-2">
              <Link href={`/product/${item.slug}`}>{item.name}</Link>
            </h3>

            {/* Hardwood & Customization Specs */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5 text-xs text-neutral-600">
              {item.woodType && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-neutral-400">Wood:</span>
                  <strong className="font-semibold text-neutral-800">
                    {item.woodType}
                  </strong>
                </span>
              )}
              {item.size && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-neutral-400">Size:</span>
                  <span className="font-medium text-neutral-700">
                    {item.size}
                  </span>
                </span>
              )}
              {item.finish && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-neutral-400">Finish:</span>
                  <span className="font-medium text-neutral-700">
                    {item.finish}
                  </span>
                </span>
              )}
            </div>

            {/* Custom Engraving Notice */}
            {item.customEngraving && (
              <p className="mt-1 text-xs text-amber-900 bg-amber-50/70 border border-amber-200/60 rounded-md px-2 py-0.5 inline-block">
                Engraving: &ldquo;{item.customEngraving}&rdquo;
              </p>
            )}

            {/* In-Stock Indicator */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {item.inStock !== false
                  ? "In Stock • Handcrafted & Ready to Ship"
                  : "Made to Order • Ships in 5-7 Days"}
              </span>
            </div>
          </div>

          {/* Line Total Price (Desktop top-right, Mobile inline) */}
          <div className="sm:text-right shrink-0">
            <div className="flex sm:flex-col items-baseline sm:items-end gap-1.5">
              <span className="flex items-center text-lg sm:text-xl font-bold text-neutral-950">
                <FaIndianRupeeSign className="size-3.5 mr-0.5 inline-block text-neutral-950" />
                {lineTotal.toLocaleString("en-IN")}
              </span>
              {originalLineTotal && (
                <span className="flex items-center text-xs text-neutral-400 line-through">
                  <FaIndianRupeeSign className="size-2.5 mr-0.5 inline-block text-neutral-400" />
                  {originalLineTotal.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {currentQuantity > 1 && (
              <span className="block text-[11px] text-neutral-500 mt-0.5">
                (₹{item.price.toLocaleString("en-IN")} each)
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions: Quantity Stepper & Utility Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          {/* Quantity Selector */}
          <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50/50 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={currentQuantity <= 1}
              aria-label="Decrease quantity"
              className="flex size-7.5 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-white hover:text-neutral-950 hover:shadow-2xs disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              <FiMinus className="size-3.5" />
            </button>
            <span
              className="w-8 text-center text-xs font-bold text-neutral-900 select-none"
              aria-label={`Quantity ${currentQuantity}`}
            >
              {currentQuantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              disabled={currentQuantity >= maxQty}
              aria-label="Increase quantity"
              className="flex size-7.5 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-white hover:text-neutral-950 hover:shadow-2xs disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              <FiPlus className="size-3.5" />
            </button>
          </div>

          {/* Action Links: Move to Wishlist & Remove Item */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
            <Button
              type="button"
              variant={isWishlisted ? "danger" : "ghost"}
              size="xs"
              rounded="lg"
              onClick={handleToggleWishlist}
              leftIcon={
                <FiHeart
                  className={`size-3.5 ${
                    isWishlisted ? "fill-red-600 text-red-600" : ""
                  }`}
                />
              }
              className={
                isWishlisted
                  ? "bg-red-50 text-red-600 border-transparent hover:bg-red-100"
                  : ""
              }
            >
              {isWishlisted ? "Saved in Wishlist" : "Save for Later"}
            </Button>

            <span className="text-neutral-200">|</span>

            <Button
              type="button"
              variant="ghost"
              size="xs"
              rounded="lg"
              onClick={handleRemove}
              leftIcon={<FiTrash2 className="size-3.5" />}
              className="text-neutral-500 hover:text-red-600 hover:bg-red-50"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
