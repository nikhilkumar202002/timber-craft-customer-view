"use client";

import React, { useState } from "react";
import { FiHeart, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { ProductItem } from "../components/products/ProductCard";
import ProductGrid from "../components/products/ProductGrid";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

const defaultWishlistProducts: ProductItem[] = [
  {
    id: 1,
    name: "Handcrafted Teak Wood Lord Ganesha Idol",
    category: "Wooden Idols & Deities",
    slug: "teak-wood-ganesha-idol",
    price: 14999,
    originalPrice: 18500,
    rating: 5.0,
    reviewsCount: 48,
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Goddess Lakshmi Sacred Hardwood Murti",
    category: "Wooden Idols & Deities",
    slug: "goddess-lakshmi-hardwood-murti",
    price: 16999,
    originalPrice: 21000,
    rating: 5.0,
    reviewsCount: 52,
    image: "/category/Wooden_Lakshmi_Lifestyle.png",
    badge: "Exclusive",
  },
  {
    id: 4,
    name: "Royal Heritage Hand-Carved Wooden Elephant",
    category: "Wooden Sculptures",
    slug: "royal-heritage-wooden-elephant",
    price: 12499,
    originalPrice: 15500,
    rating: 4.9,
    reviewsCount: 41,
    image: "/category/Wooden_Elephant_Lifestyle.png",
    badge: "Artisan Choice",
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<ProductItem[]>(
    defaultWishlistProducts
  );

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            href="/shop"
            variant="ghost"
            size="sm"
            leftIcon={<FiArrowLeft className="size-4" />}
          >
            Continue Shopping
          </Button>

          {wishlistItems.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={handleClearWishlist}
              leftIcon={<FiTrash2 className="size-3.5" />}
              className="text-neutral-500 hover:text-red-600"
            >
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Page Title & Count Badge */}
        <div className="mb-8 flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Saved Wishlist
          </h1>
          {wishlistItems.length > 0 && (
            <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-bold text-white">
              {wishlistItems.length} {wishlistItems.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>

        {/* Wishlist Items or Empty State */}
        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={<FiHeart className="size-8 sm:size-9" />}
            title="Your Wishlist is Empty"
            description="Explore our authentic carved hardwood idols, sacred sculptures, and bespoke homeware, and save your favorites here."
            action={{
              label: "Discover Hardwood Collections",
              href: "/shop",
              variant: "primary",
            }}
          />
        ) : (
          <ProductGrid products={wishlistItems} columns={3} />
        )}
      </div>
    </div>
  );
}
