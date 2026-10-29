"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import ProductCard, { ProductItem } from "../products/ProductCard";
import Button from "../ui/Button";

export type { ProductItem };

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
  // Take first 8 products (4 columns x 2 rows)
  const displayProducts = products.slice(0, 8);

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
            PRODUCT GRID: 2 COLUMNS ON MOBILE, UP TO 4 ON DESKTOP
           ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((item) => (
            <div key={item.id} className="w-full">
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* =========================================================
            BUTTON TO NAVIGATE TO ALL PRODUCTS PAGE
           ========================================================= */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            href={viewAllLink}
            variant="primary"
            size="lg"
            rounded="full"
            rightIcon={<FiArrowRight className="size-4" />}
          >
            {viewAllText}
          </Button>
        </div>
      </div>
    </section>
  );
}
