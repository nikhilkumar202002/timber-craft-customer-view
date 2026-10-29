"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  },
];

interface FeaturedProductsProps {
  products?: ProductItem[];
  title?: string;
  autoPlayInterval?: number; // ms, default 3500
}

export default function FeaturedProducts({
  products = defaultProducts,
  title = "Featured Products",
  autoPlayInterval = 3500,
}: FeaturedProductsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepWidth, setStepWidth] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible count
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth >= 1024) return 4; // lg: 4 columns
    if (window.innerWidth >= 768) return 3; // md: 3 columns
    if (window.innerWidth >= 640) return 2; // sm: 2 columns
    return 1; // xs: 1 column
  }, []);

  const [visibleCount, setVisibleCount] = useState(4);
  const maxIndex = Math.max(0, products.length - visibleCount);

  // Measure card distance
  const updateMeasurements = useCallback(() => {
    if (!trackRef.current) return;
    const count = getVisibleCount();
    setVisibleCount(count);

    const cards = trackRef.current.children;
    if (cards.length > 1) {
      const card0 = cards[0] as HTMLElement;
      const card1 = cards[1] as HTMLElement;
      const step = card1.offsetLeft - card0.offsetLeft;
      setStepWidth(step);
    } else if (cards.length === 1) {
      const card0 = cards[0] as HTMLElement;
      setStepWidth(card0.offsetWidth);
    }
  }, [getVisibleCount]);

  useEffect(() => {
    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [updateMeasurements]);

  const safeIndex = Math.min(currentIndex, maxIndex);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, nextSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const offset = safeIndex * stepWidth;

  return (
    <section className="w-full bg-white pb-16 sm:pb-20 lg:pb-24 ">
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
            SLIDER: 4 CARDS PER ROW, ARROW SLIDE & AUTO SLIDE
            (OVERFLOW HIDDEN — ZERO BOTTOM SCROLLING/SCROLLBAR)
           ========================================================= */}
        <div
          className="relative group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <Button
            type="button"
            onClick={prevSlide}
            aria-label="Previous products"
            variant="slider"
            size="slider"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30"
          >
            <FiChevronLeft className="size-5 sm:size-6" />
          </Button>

          {/* Right Arrow Button */}
          <Button
            type="button"
            onClick={nextSlide}
            aria-label="Next products"
            variant="slider"
            size="slider"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30"
          >
            <FiChevronRight className="size-5 sm:size-6" />
          </Button>

          {/* Inner overflow-hidden container for smooth transform without scrollbar */}
          <div className="overflow-hidden w-full py-2">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${offset}px)`,
              }}
            >
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2*1.5rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)] shrink-0"
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
