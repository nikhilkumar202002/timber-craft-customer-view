"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
  FiZoomIn,
  FiHeart,
  FiGrid,
  FiSliders,
} from "react-icons/fi";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export interface GalleryImage {
  id: string | number;
  url: string;
  alt: string;
  label?: string;
}

export interface ProductGalleryProps {
  images?: (GalleryImage | string)[];
  productName?: string;
  badge?: string;
  className?: string;
  initialIndex?: number;
}

const defaultGalleryImages: GalleryImage[] = [
  {
    id: 1,
    url: "/category/Wooden_Ganesha_Shelf_Display.png",
    alt: "Handcrafted Teak Wood Lord Ganesha Idol - Front Display",
    label: "Main Altar View",
  },
  {
    id: 2,
    url: "/category/Wooden_Krishna_Lifestyle_Shot.png",
    alt: "Artisan Divine Sculpture - Macro Wood Grain Details",
    label: "Chisel & Grain Detail",
  },
  {
    id: 3,
    url: "/category/Wooden_Lakshmi_Lifestyle.png",
    alt: "Sacred Carved Hardwood Murti in Living Room Context",
    label: "In-Situ Lifestyle",
  },
  {
    id: 4,
    url: "/category/Wooden_Elephant_Lifestyle.png",
    alt: "Royal Heritage Hand-Carved Hardwood Sculpture",
    label: "Side Profile & Depth",
  },
  {
    id: 5,
    url: "/category/Wooden_Chopping_Board_Overhead.png",
    alt: "Organic Hardwood Polish & Natural Wax Sheen",
    label: "Artisanal Finish",
  },
];

export default function ProductGallery({
  images = defaultGalleryImages,
  productName = "Handcrafted Artisanal Wooden Idol",
  badge,
  className = "",
  initialIndex = 0,
}: ProductGalleryProps) {
  // Normalize images array to GalleryImage objects
  const normalizedImages: GalleryImage[] = images.map((img, idx) =>
    typeof img === "string"
      ? { id: idx, url: img, alt: `${productName} angle ${idx + 1}` }
      : img
  );

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [galleryViewMode, setGalleryViewMode] = useState<"featured" | "grid">("featured");

  // Zoom magnifier state
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Mobile Touch handlers
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeImage = normalizedImages[activeIndex] || normalizedImages[0];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % normalizedImages.length);
  }, [normalizedImages.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length
    );
  }, [normalizedImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Magnifier mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPosition({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* =========================================================
          GALLERY TOP CONTROLS (View Switcher & Fullscreen Trigger)
         ========================================================= */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          {badge && (
            <Badge variant="dark-translucent" size="xs" uppercase>
              {badge}
            </Badge>
          )}
          <span className="text-xs font-semibold text-neutral-500">
            {activeIndex + 1} of {normalizedImages.length} Photographs
          </span>
        </div>

        {/* View Layout Toggle: Single Stage vs 2x2 Grid */}
        <div className="flex items-center gap-1.5 bg-neutral-100 p-0.5 rounded-xl border border-neutral-200/80">
          <button
            type="button"
            onClick={() => setGalleryViewMode("featured")}
            aria-label="Featured single view"
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              galleryViewMode === "featured"
                ? "bg-white text-neutral-900 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <FiSliders className="size-3" />
            <span className="hidden sm:inline">Stage</span>
          </button>
          <button
            type="button"
            onClick={() => setGalleryViewMode("grid")}
            aria-label="Mosaic grid view"
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              galleryViewMode === "grid"
                ? "bg-white text-neutral-900 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <FiGrid className="size-3" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          MODE 1: FEATURED STAGE WITH HOVER MAGNIFIER & CAROUSEL
         ========================================================= */}
      {galleryViewMode === "featured" ? (
        <div className="space-y-3">
          {/* Main Stage Display Card */}
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="group relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden rounded-3xl border border-neutral-200/90 bg-neutral-100 shadow-xs cursor-crosshair select-none"
          >
            {/* Image with Dynamic Smooth Pan Zoom */}
            <div
              className="relative h-full w-full transition-transform duration-200 ease-out"
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: isHovering ? "scale(1.8)" : "scale(1)",
              }}
            >
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center"
              />
            </div>

            {/* Subtle Zoom Hint Overlay (Visible when not zoomed) */}
            <div
              className={`absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-1.5 rounded-full bg-neutral-950/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white pointer-events-none transition-opacity duration-300 ${
                isHovering ? "opacity-0" : "opacity-90"
              }`}
            >
              <FiZoomIn className="size-3.5" />
              <span>Hover to inspect wood carving detail</span>
            </div>

            {/* Top-Right Quick Utility Actions: Wishlist & Fullscreen */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked((prev) => !prev);
                }}
                aria-label={isLiked ? "Saved to wishlist" : "Save to wishlist"}
                className={`flex size-9 sm:size-10 items-center justify-center rounded-full backdrop-blur-md border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isLiked
                    ? "bg-red-50 text-red-600 border-red-200 shadow-sm"
                    : "bg-white/90 text-neutral-700 border-white/40 shadow-xs hover:bg-white hover:text-red-600"
                }`}
              >
                <FiHeart
                  className={`size-4 sm:size-4.5 ${
                    isLiked ? "fill-red-600 text-red-600" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="View Fullscreen"
                className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 border border-white/40 shadow-xs backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-neutral-950 hover:scale-105 active:scale-95"
              >
                <FiMaximize2 className="size-4 sm:size-4.5" />
              </button>
            </div>

            {/* Slider Navigation Arrows */}
            {normalizedImages.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="slider"
                  size="slider"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <FiChevronLeft className="size-5" />
                </Button>

                <Button
                  type="button"
                  variant="slider"
                  size="slider"
                  onClick={handleNext}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  <FiChevronRight className="size-5" />
                </Button>
              </>
            )}

            {/* Active Angle Label Tag */}
            {activeImage.label && (
              <div className="absolute top-4 left-4 z-20">
                <span className="rounded-full bg-neutral-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                  {activeImage.label}
                </span>
              </div>
            )}
          </div>

          {/* =======================================================
              THUMBNAIL GALLERY STRIP & LABELS
             ======================================================= */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {normalizedImages.map((image, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group/thumb relative aspect-square w-full overflow-hidden rounded-2xl border transition-all duration-200 text-left focus:outline-hidden ${
                    isActive
                      ? "border-amber-900 ring-2 ring-amber-900/30 scale-[1.02] shadow-sm"
                      : "border-neutral-200/90 hover:border-neutral-400 hover:scale-[1.01] opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 20vw, 120px"
                    className="object-cover object-center"
                  />
                  {/* Subtle active check indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-amber-900/10 pointer-events-none" />
                  )}
                  {/* Thumbnail angle label preview on hover */}
                  {image.label && (
                    <span className="absolute bottom-1 inset-x-1 hidden sm:block truncate rounded-md bg-neutral-950/80 backdrop-blur-xs px-1 text-[9px] font-semibold text-white text-center">
                      {image.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================
            MODE 2: 2-COLUMN LUXURY MOSAIC PHOTO GRID
           ========================================================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {normalizedImages.map((image, idx) => (
            <div
              key={image.id}
              onClick={() => {
                setActiveIndex(idx);
                setIsLightboxOpen(true);
              }}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-neutral-100 cursor-pointer shadow-xs transition-all duration-300 hover:shadow-md hover:border-neutral-300"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />

              {image.label && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-full bg-neutral-950/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {image.label}
                  </span>
                </div>
              )}

              <div className="absolute bottom-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <FiMaximize2 className="size-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================
          FULLSCREEN LIGHTBOX MODAL (High-Resolution Zoom)
         ========================================================= */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top Header Bar */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-50">
            <div>
              <p className="text-sm font-bold truncate max-w-xs sm:max-w-md">
                {productName}
              </p>
              <p className="text-xs text-neutral-400">
                {activeImage.label || `Angle ${activeIndex + 1}`} •{" "}
                {activeIndex + 1} of {normalizedImages.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen view"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FiX className="size-5" />
            </button>
          </div>

          {/* Main Fullscreen Image */}
          <div className="relative max-h-[82vh] max-w-4xl w-full h-[70vh] flex items-center justify-center">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-contain object-center"
              sizes="100vw"
              priority
            />

            {/* Navigation Arrows inside Lightbox */}
            {normalizedImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
                >
                  <FiChevronLeft className="size-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors"
                >
                  <FiChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          {/* Filmstrip at the bottom of Lightbox */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto">
            {normalizedImages.map((image, idx) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative size-12 sm:size-14 shrink-0 rounded-xl overflow-hidden border transition-all ${
                  idx === activeIndex
                    ? "border-amber-400 ring-2 ring-amber-400/50 scale-105"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
