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
  FiArrowRight,
} from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";

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

const defaultProducts: ProductItem[] = [
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
    id: 2,
    name: "Artisan Carved Lord Krishna Figurine",
    category: "Wooden Sculptures",
    slug: "artisan-carved-krishna-figurine",
    price: 19499,
    originalPrice: 24000,
    rating: 4.9,
    reviewsCount: 36,
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
    badge: "Featured",
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
  {
    id: 5,
    name: "Organic End-Grain Walnut Serving & Cutting Board",
    category: "Home Decor",
    slug: "organic-end-grain-walnut-board",
    price: 3999,
    originalPrice: 5200,
    rating: 4.8,
    reviewsCount: 64,
    image: "/category/Wooden_Chopping_Board_Overhead.png",
    badge: "Top Rated",
  },
  {
    id: 6,
    name: "Bespoke Blessing Ganesha Altar Sculpture",
    category: "Wooden Idols & Deities",
    slug: "bespoke-blessing-ganesha-altar",
    price: 15499,
    originalPrice: 19000,
    rating: 5.0,
    reviewsCount: 29,
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
    badge: "Handmade",
  },
  {
    id: 7,
    name: "Flute Playing Divine Krishna Wood Carving",
    category: "Wooden Wall Art",
    slug: "flute-playing-krishna-carving",
    price: 21999,
    originalPrice: 26500,
    rating: 4.9,
    reviewsCount: 33,
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
    badge: "Limited",
  },
  {
    id: 8,
    name: "Opulent Lakshmi Prosperity Wooden Statue",
    category: "Wooden Idols & Deities",
    slug: "opulent-lakshmi-prosperity-statue",
    price: 17999,
    originalPrice: 22000,
    rating: 5.0,
    reviewsCount: 45,
    image: "/category/Wooden_Lakshmi_Lifestyle.png",
    badge: "Bestseller",
  },
];

interface AllproductsProps {
  products?: ProductItem[];
  title?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

export default function Allproducts({
  products = defaultProducts,
  title = "All Products",
  viewAllLink = "/shop",
  viewAllText = "View All Products",
}: AllproductsProps) {
  const router = useRouter();
  const [likedProducts, setLikedProducts] = useState<Record<number, boolean>>({});
  const [addedId, setAddedId] = useState<number | null>(null);

  // Take first 8 products (4 columns x 2 rows)
  const displayProducts = products.slice(0, 8);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent, product: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/checkout?product=${encodeURIComponent(product.slug)}`);
  };

  return (
    <section className="w-full bg-[#fcfbf9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            CENTER ALIGNED SECTION HEADING
           ========================================================= */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
            {title}
          </h2>
        </div>

        {/* =========================================================
            PRODUCT GRID: 4 COLUMNS X 2 ROWS (8 PRODUCTS)
           ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((item) => {
            const isLiked = Boolean(likedProducts[item.id]);
            const isAdded = addedId === item.id;

            return (
              <div key={item.id} className="w-full">
                <Link
                  href={`/product/${item.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1"
                >
                  {/* Product Image & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Status Badge */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 rounded-full bg-neutral-950/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs">
                        {item.badge}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(e, item.id)}
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                      className={`absolute top-3 right-3 flex size-8 items-center justify-center rounded-full backdrop-blur-xs transition-all duration-200 ${
                        isLiked
                          ? "bg-red-50 text-red-600 scale-105"
                          : "bg-white/80 text-neutral-600 hover:bg-white hover:text-red-600 hover:scale-105"
                      }`}
                    >
                      <FiHeart
                        className={`size-4 ${isLiked ? "fill-red-600 text-red-600" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Product Details (LEFT-ALIGNED) */}
                  <div className="flex flex-1 flex-col items-start justify-between p-5 text-left">
                    <div className="flex flex-col items-start w-full">
                      {/* Category Tag */}
                      <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1 text-left">
                        {item.category}
                      </span>

                      {/* Product Title (Left-aligned) */}
                      <h3 className="text-base font-bold text-neutral-900 transition-colors group-hover:text-amber-800 line-clamp-2 text-left">
                        {item.name}
                      </h3>

                      {/* Rating Stars (Left-aligned) */}
                      <div className="mt-2 flex items-center justify-start gap-1 text-xs text-amber-500">
                        <FiStar className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-neutral-800">
                          {item.rating.toFixed(1)}
                        </span>
                        <span className="text-neutral-400">
                          ({item.reviewsCount})
                        </span>
                      </div>

                      {/* Price with Rupee Icon (Left-aligned) */}
                      <div className="mt-2.5 flex items-baseline gap-2 text-left flex-wrap">
                        <span className="flex items-center text-lg font-bold text-neutral-950">
                          <FaIndianRupeeSign className="size-3.5 mr-0.5 inline-block text-neutral-950" />
                          {item.price.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice && (
                          <span className="flex items-center text-xs text-neutral-400 line-through">
                            <FaIndianRupeeSign className="size-2.5 mr-0.5 inline-block text-neutral-400" />
                            {item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {item.originalPrice && (
                          <span className="text-[11px] font-semibold text-emerald-600">
                            {Math.round(
                              ((item.originalPrice - item.price) /
                                item.originalPrice) *
                                100
                            )}
                            % off
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dual Action Buttons: '+ Add' and 'Buy Now' */}
                    <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center gap-2 w-full">
                      {/* Add to Cart button with icon + Add */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all duration-200 active:scale-98 shadow-2xs ${
                          isAdded
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                            : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-950 hover:bg-neutral-50"
                        }`}
                        title="Add to Cart"
                      >
                        {isAdded ? (
                          <>
                            <FiCheck className="size-3.5 text-emerald-600" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <FiPlus className="size-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      {/* Buy Now Button with Icon */}
                      <button
                        type="button"
                        onClick={(e) => handleBuyNow(e, item)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-950 py-2.5 px-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-98 shadow-xs"
                        title="Buy Now"
                      >
                        <FiShoppingBag className="size-3.5" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            BUTTON TO NAVIGATE TO ALL PRODUCTS PAGE
           ========================================================= */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href={viewAllLink}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-neutral-900 bg-neutral-950 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-neutral-800 hover:scale-105 active:scale-95"
          >
            <span>{viewAllText}</span>
            <FiArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
