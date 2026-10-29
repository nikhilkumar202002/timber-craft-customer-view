"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CategoryCard, { CategoryItem } from "../categories/CategoryCard";
import Button from "../ui/Button";

export type { CategoryItem };

const defaultCategories: CategoryItem[] = [
  {
    id: 1,
    name: "Wooden Idols & Deities",
    slug: "wooden-idols-deities",
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
  },
  {
    id: 2,
    name: "Trophies & Awards",
    slug: "trophies-awards",
    image: "/category/Wooden_Elephant_Lifestyle.png",
  },
  {
    id: 3,
    name: "Wooden Wall Art",
    slug: "wooden-wall-art",
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
  },
  {
    id: 4,
    name: "Wooden Sculptures",
    slug: "wooden-sculptures",
    image: "/category/Wooden_Elephant_Lifestyle.png",
  },
  {
    id: 5,
    name: "Home Decor",
    slug: "home-decor",
    image: "/category/Wooden_Chopping_Board_Overhead.png",
  },
  {
    id: 6,
    name: "Personalised Gifts",
    slug: "personalised-gifts",
    image: "/category/Wooden_Lakshmi_Lifestyle.png",
  },
  {
    id: 7,
    name: "Wooden Accessories",
    slug: "wooden-accessories",
    image: "/category/Wooden_Chopping_Board_Overhead.png",
  },
  {
    id: 8,
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
  },
  {
    id: 9,
    name: "Custom Artwork",
    slug: "custom-artwork",
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
  },
  {
    id: 10,
    name: "Limited Editions",
    slug: "limited-editions",
    image: "/category/Wooden_Lakshmi_Lifestyle.png",
  },
];

interface CategorySectionProps {
  categories?: CategoryItem[];
  title?: string;
  autoPlayInterval?: number; // ms, default 3500
}

export default function CategorySection({
  categories = defaultCategories,
  title = "Shop by Category",
  autoPlayInterval = 3500,
}: CategorySectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepWidth, setStepWidth] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Calculate visible cards count based on screen width
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth >= 1024) return 4; // lg: 4 columns
    if (window.innerWidth >= 768) return 3; // md: 3 columns
    if (window.innerWidth >= 640) return 2; // sm: 2 columns
    return 1; // xs: 1 column
  }, []);

  const [visibleCount, setVisibleCount] = useState(4);
  const maxIndex = Math.max(0, categories.length - visibleCount);

  // Measure step distance between cards
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

  // Clamp current index to maxIndex during render (avoids cascading render effect)
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

  // Touch Swipe for mobile
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
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            CENTER ALIGNED CATEGORY HEADING ONLY (NO DESCRIPTION)
           ========================================================= */}
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
            {title}
          </h2>
        </div>

        {/* =========================================================
            SLIDER: ARROW BUTTONS & HARDWARE-ACCELERATED TRANSLATE
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
            aria-label="Previous category"
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
            aria-label="Next category"
            variant="slider"
            size="slider"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30"
          >
            <FiChevronRight className="size-5 sm:size-6" />
          </Button>

          {/* Inner overflow-hidden container to hide any scrollbar */}
          <div className="overflow-hidden w-full py-2">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${offset}px)`,
              }}
            >
              {categories.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2*1.5rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)] shrink-0"
                >
                  <CategoryCard category={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
