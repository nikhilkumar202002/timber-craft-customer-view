"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

export interface CategoryItem {
  id: number;
  number: string;
  name: string;
  slug: string;
  subcategories: string[];
  image: string;
  badge?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    id: 1,
    number: "01",
    name: "Wooden Idols & Deities",
    slug: "wooden-idols-deities",
    subcategories: [
      "Hindu Deities",
      "Buddha Sculptures",
      "Spiritual Figures",
      "Traditional Idols",
      "Custom Religious Idols",
    ],
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
    badge: "Bestseller",
  },
  {
    id: 2,
    number: "02",
    name: "Trophies & Awards",
    slug: "trophies-awards",
    subcategories: [
      "Wooden Trophies",
      "Achievement Awards",
      "Corporate Awards",
      "Sports Trophies",
      "Custom Engraved Awards",
    ],
    image: "/category/Wooden_Elephant_Lifestyle.png",
  },
  {
    id: 3,
    number: "03",
    name: "Wooden Wall Art",
    slug: "wooden-wall-art",
    subcategories: [
      "Wall Hangings",
      "Carved Wall Panels",
      "Wooden Name Plates",
      "Decorative Wall Sculptures",
      "Personalised Wall Art",
    ],
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
    badge: "Trending",
  },
  {
    id: 4,
    number: "04",
    name: "Wooden Sculptures",
    slug: "wooden-sculptures",
    subcategories: [
      "Animal Sculptures",
      "Human Figures",
      "Abstract Sculptures",
      "Traditional Carvings",
      "Decorative Figurines",
    ],
    image: "/category/Wooden_Elephant_Lifestyle.png",
  },
  {
    id: 5,
    number: "05",
    name: "Home Decor",
    slug: "home-decor",
    subcategories: [
      "Table Decor",
      "Wooden Showpieces",
      "Decorative Bowls",
      "Candle Holders",
      "Artistic Wooden Objects",
    ],
    image: "/category/Wooden_Chopping_Board_Overhead.png",
  },
  {
    id: 6,
    number: "06",
    name: "Personalised Gifts",
    slug: "personalised-gifts",
    subcategories: [
      "Engraved Gifts",
      "Name Gifts",
      "Anniversary Gifts",
      "Wedding Gifts",
      "Birthday Gifts",
    ],
    image: "/category/Wooden_Lakshmi_Lifestyle.png",
    badge: "Customizable",
  },
  {
    id: 7,
    number: "07",
    name: "Wooden Accessories",
    slug: "wooden-accessories",
    subcategories: [
      "Keychains",
      "Desk Accessories",
      "Organisers",
      "Wooden Boxes",
      "Small Handmade Accessories",
    ],
    image: "/category/Wooden_Chopping_Board_Overhead.png",
  },
  {
    id: 8,
    number: "08",
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    subcategories: [
      "Employee Recognition Gifts",
      "Custom Logo Gifts",
      "Business Awards",
      "Promotional Gifts",
      "Event Souvenirs",
    ],
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
  },
  {
    id: 9,
    number: "09",
    name: "Custom Artwork",
    slug: "custom-artwork",
    subcategories: [
      "Custom Idols",
      "Personalised Trophies",
      "Custom Sculptures",
      "Bespoke Wall Art",
      "Customer-Designed Creations",
    ],
    image: "/category/Wooden_Krishna_Lifestyle_Shot.png",
    badge: "Bespoke",
  },
  {
    id: 10,
    number: "10",
    name: "Limited Editions",
    slug: "limited-editions",
    subcategories: [
      "Signature Pieces",
      "Collector's Items",
      "Exclusive Sculptures",
      "Seasonal Collections",
    ],
    image: "/category/Wooden_Lakshmi_Lifestyle.png",
    badge: "Exclusive",
  },
];

interface CategorySectionProps {
  categories?: CategoryItem[];
  title?: string;
  subtitle?: string;
}

export default function CategorySection({
  categories = defaultCategories,
  title = "Shop by Category",
  subtitle = "Explore our handcrafted wooden masterworks, devotional idols, commemorative trophies, and bespoke decor.",
}: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollState();
      container.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollState);
      }
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 300;
    const gap = 24; // 1.5rem
    const scrollAmount = (cardWidth + gap) * (window.innerWidth >= 1024 ? 2 : 1);

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#fcfbf9] py-16 sm:py-20 lg:py-24 border-b border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADER: TITLE, SUBTITLE & SLIDER CONTROLS
           ========================================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                Artisanal Woodcraft
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous categories"
              className={`flex size-11 items-center justify-center rounded-full border transition-all duration-200 ${
                canScrollLeft
                  ? "border-neutral-300 bg-white text-neutral-900 shadow-xs hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-95"
                  : "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-50"
              }`}
            >
              <FiChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next categories"
              className={`flex size-11 items-center justify-center rounded-full border transition-all duration-200 ${
                canScrollRight
                  ? "border-neutral-300 bg-white text-neutral-900 shadow-xs hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-95"
                  : "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-50"
              }`}
            >
              <FiChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* =========================================================
            SLIDER TRACK: 4 COLUMNS ON DESKTOP
            (w-full on mobile, 2 col on sm, 3 col on md, 4 col on lg)
           ========================================================= */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6 pt-1"
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="w-[85%] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2*1.5rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)] shrink-0 snap-start"
            >
              <Link
                href={`/categories/${item.slug}`}
                className="group flex flex-col h-full rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1"
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Index Number Badge */}
                  <div className="absolute top-3 left-3 flex items-center justify-center rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[11px] font-bold text-neutral-900 shadow-xs">
                    {item.number}
                  </div>

                  {/* Optional Status Badge */}
                  {item.badge && (
                    <div className="absolute top-3 right-3 rounded-full bg-amber-500/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs">
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 transition-colors group-hover:text-amber-800 line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Subcategories tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5 min-h-[46px]">
                    {item.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600 transition-colors group-hover:bg-neutral-100 group-hover:text-neutral-900"
                      >
                        {sub}
                      </span>
                    ))}
                    {item.subcategories.length > 3 && (
                      <span className="rounded-md bg-neutral-50 border border-neutral-200/80 px-2 py-1 text-[10px] font-semibold text-neutral-500">
                        +{item.subcategories.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:text-amber-800 transition-colors">
                    <span>Explore Collection</span>
                    <FiArrowRight className="size-4 text-neutral-400 transition-all duration-200 group-hover:text-amber-800 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* =========================================================
            BOTTOM PROGRESS BAR & VIEW ALL BUTTON
           ========================================================= */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Visual Scroll Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-neutral-400">01</span>
            <div className="h-1.5 w-32 sm:w-48 rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full bg-neutral-900 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${Math.max(10, scrollProgress)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-neutral-400">10</span>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 hover:text-amber-800"
          >
            View All Categories
            <FiArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
