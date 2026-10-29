"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface BannerSlide {
  id: string | number;
  src: string;
  mobileSrc?: string;
  alt: string;
  link?: string;
}

interface HeroSectionProps {
  banners?: BannerSlide[];
  autoPlayInterval?: number; // ms, default 5000
}

const defaultBanners: BannerSlide[] = [
  {
    id: 1,
    src: "/banners/wooden_art_banner_2000x900.jpg",
    mobileSrc: "/banners/Handcrafted Wooden Art Collection.png",
    alt: "Artisanal Wooden Masterpieces & Sculptures",
    link: "/shop",
  },
  {
    id: 2,
    src: "/banners/Handcrafted-Wooden-Essentials-Hero-Banner.jpg",
    mobileSrc: "/banners/Handcrafted Wooden Essentials.png",
    alt: "Handcrafted Wooden Essentials & Home Decor",
    link: "/collections",
  },
];

export default function HeroSection({
  banners = defaultBanners,
  autoPlayInterval = 5000,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = banners.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, autoPlayInterval, nextSlide]);

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!banners || banners.length === 0) return null;

  return (
    <section
      aria-label="Featured Hero Banners"
      className="relative w-full overflow-hidden bg-neutral-950 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio Container: 3:4 on mobile (exact match for 1086x1448), 2:1 on sm tablet, 20:9 on lg desktop */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[2/1] lg:aspect-[20/9] max-h-[85vh]">
        {/* Slides Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {banners.map((slide, index) => {
            const slideContent = (
              <div className="relative h-full w-full shrink-0">
                {slide.mobileSrc ? (
                  <>
                    {/* Mobile Portrait Banner (< 640px) */}
                    <div className="relative h-full w-full block sm:hidden">
                      <Image
                        src={slide.mobileSrc}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, 1px"
                        className="object-cover object-center"
                      />
                    </div>
                    {/* Desktop/Tablet Landscape Banner (>= 640px) */}
                    <div className="relative h-full w-full hidden sm:block">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 640px) 100vw, 1px"
                        className="object-cover object-center"
                      />
                    </div>
                  </>
                ) : (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                )}
              </div>
            );

            return slide.link ? (
              <Link
                key={slide.id}
                href={slide.link}
                className="relative block h-full w-full shrink-0"
                tabIndex={index === currentIndex ? 0 : -1}
                aria-label={slide.alt}
              >
                {slideContent}
              </Link>
            ) : (
              <div key={slide.id} className="relative h-full w-full shrink-0">
                {slideContent}
              </div>
            );
          })}
        </div>

        {/* Previous Arrow Button */}
        {totalSlides > 1 && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:bg-black/70 hover:scale-105 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <FiChevronLeft className="size-5 sm:size-6" />
          </button>
        )}

        {/* Next Arrow Button */}
        {totalSlides > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:bg-black/70 hover:scale-105 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <FiChevronRight className="size-5 sm:size-6" />
          </button>
        )}

        {/* Bottom Slide Indicators (Dots / Pills) */}
        {totalSlides > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md px-3 py-1.5 border border-white/10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-7 sm:w-8 bg-white shadow-xs"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
