"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiFilter, FiX, FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import ProductFilters, {
  FilterState,
  initialFilterState,
} from "../components/products/ProductFilters";
import ProductSort, { SortOption } from "../components/products/ProductSort";
import ProductGrid from "../components/products/ProductGrid";
import { ProductItem } from "../components/products/ProductCard";
import Button from "../components/ui/Button";

interface ShopProductItem extends ProductItem {
  woodType?: string;
  finish?: string;
  isCustomizable?: boolean;
}

const ALL_SHOP_PRODUCTS: ShopProductItem[] = [
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
    woodType: "Solid Burma Teak",
    finish: "Natural Antique Wax Polish",
    isCustomizable: true,
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
    woodType: "Solid Burma Teak",
    finish: "Natural Antique Wax Polish",
    isCustomizable: true,
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
    woodType: "Sacred Sandalwood",
    finish: "Hand-Rubbed Matte Poly",
    isCustomizable: false,
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
    woodType: "Rosewood (Sheesham)",
    finish: "Natural Antique Wax Polish",
    isCustomizable: true,
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
    woodType: "American Black Walnut",
    finish: "Food-Grade Mineral Oil",
    isCustomizable: true,
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
    woodType: "Solid Burma Teak",
    finish: "24K Gold Leaf Embellished",
    isCustomizable: true,
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
    woodType: "Rosewood (Sheesham)",
    finish: "Hand-Rubbed Matte Poly",
    isCustomizable: false,
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
    woodType: "Solid Burma Teak",
    finish: "24K Gold Leaf Embellished",
    isCustomizable: true,
  },
  {
    id: 9,
    name: "Handcrafted Ambabari Majestic Elephant Statue",
    category: "Wooden Sculptures",
    slug: "ambabari-majestic-elephant-statue",
    price: 13999,
    originalPrice: 17500,
    rating: 4.9,
    reviewsCount: 38,
    image: "/category/Wooden_Elephant_Lifestyle.png",
    badge: "Trending",
    woodType: "Indian Mahogany",
    finish: "Natural Antique Wax Polish",
    isCustomizable: true,
  },
  {
    id: 10,
    name: "Artisan Hand-Turned Hardwood Platter & Tray",
    category: "Home Decor",
    slug: "artisan-hand-turned-hardwood-platter",
    price: 4499,
    originalPrice: 5800,
    rating: 4.8,
    reviewsCount: 27,
    image: "/category/Wooden_Chopping_Board_Overhead.png",
    badge: "New Drop",
    woodType: "Himalayan Cedar",
    finish: "Food-Grade Mineral Oil",
    isCustomizable: false,
  },
  {
    id: 11,
    name: "Corporate Heritage Teakwood Trophy Plaque",
    category: "Trophies & Awards",
    slug: "corporate-heritage-teakwood-trophy",
    price: 6499,
    originalPrice: 7900,
    rating: 4.9,
    reviewsCount: 19,
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
    badge: "Corporate",
    woodType: "Solid Burma Teak",
    finish: "Hand-Rubbed Matte Poly",
    isCustomizable: true,
  },
  {
    id: 12,
    name: "Sacred Mandala Wooden Wall Art Panel",
    category: "Wooden Wall Art",
    slug: "sacred-mandala-wooden-wall-art",
    price: 28999,
    originalPrice: 34000,
    rating: 5.0,
    reviewsCount: 16,
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
    badge: "Exclusive",
    woodType: "Sacred Sandalwood",
    finish: "24K Gold Leaf Embellished",
    isCustomizable: true,
  },
];

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return ALL_SHOP_PRODUCTS.filter((item) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(item.category)
      ) {
        return false;
      }

      // Wood species filter
      if (
        filters.woodTypes.length > 0 &&
        (!item.woodType || !filters.woodTypes.includes(item.woodType))
      ) {
        return false;
      }

      // Finish filter
      if (
        filters.finishes.length > 0 &&
        (!item.finish || !filters.finishes.includes(item.finish))
      ) {
        return false;
      }

      // Price range filter
      if (
        item.price < filters.priceRange[0] ||
        item.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Minimum rating filter
      if (filters.minRating !== null && item.rating < filters.minRating) {
        return false;
      }

      // On sale filter
      if (
        filters.onSaleOnly &&
        (!item.originalPrice || item.originalPrice <= item.price)
      ) {
        return false;
      }

      // Customizable filter
      if (filters.customizableOnly && !item.isCustomizable) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        case "featured":
        default:
          return 0; // Maintain natural curated ordering
      }
    });
  }, [filters, sortOption]);

  const activeFiltersCount =
    filters.categories.length +
    filters.woodTypes.length +
    filters.finishes.length +
    (filters.minRating !== null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.customizableOnly ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0);

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen pb-20 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Home</span>
          </Link>
        </div>

        {/* Page Heading & Description */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-neutral-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900">
              Handcrafted Timber Collections
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 max-w-2xl">
              Authentic hand-carved solid teak, sandalwood, and rosewood idols,
              wall reliefs, and bespoke heirlooms.
            </p>
          </div>

          {/* Action Row: Mobile Filter Trigger & Sort Dropdown */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                rounded="xl"
                onClick={() => setIsMobileFiltersOpen(true)}
                leftIcon={<FiFilter className="size-3.5" />}
              >
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </div>

            {/* Sort Dropdown */}
            <ProductSort value={sortOption} onChange={setSortOption} />
          </div>
        </div>

        {/* Main Catalog Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar: Filters */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(initialFilterState)}
              totalResultsCount={filteredProducts.length}
            />
          </div>

          {/* Right Column: Filtered Product Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <ProductGrid
              products={filteredProducts}
              columns={3}
              emptyState={
                <div className="rounded-3xl border border-neutral-200/90 bg-white p-12 text-center shadow-xs">
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
                    <FiShoppingBag className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">
                    No Matching Handcrafted Pieces
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto">
                    We couldn&apos;t find any wooden pieces matching all your selected
                    filters. Try broadening your criteria or reset filters.
                  </p>
                  <div className="mt-5">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      rounded="full"
                      onClick={() => setFilters(initialFilterState)}
                    >
                      Reset All Filters
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* =========================================================
            MOBILE FILTER DRAWER MODAL
           ========================================================= */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileFiltersOpen(false)}
            />

            {/* Slide-over Drawer Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <FiFilter className="size-4" />
                  <h2 className="text-sm font-bold text-neutral-900">
                    Filter Collections
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100"
                  aria-label="Close filters"
                >
                  <FiX className="size-4" />
                </button>
              </div>

              {/* Scrollable Filters Body */}
              <div className="flex-1 overflow-y-auto p-4">
                <ProductFilters
                  filters={filters}
                  onChange={setFilters}
                  onReset={() => setFilters(initialFilterState)}
                  totalResultsCount={filteredProducts.length}
                />
              </div>

              {/* Drawer Apply Footer */}
              <div className="p-4 border-t border-neutral-100 bg-white">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  fullWidth
                  rounded="xl"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  Show {filteredProducts.length} Results
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
