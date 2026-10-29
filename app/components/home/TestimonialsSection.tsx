"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa6";
import Button from "../ui/Button";

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  initials: string;
  purchasedItem: string;
  headline: string;
  review: string;
  rating: number;
  date: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Dr. Aarav Mehta",
    location: "Mumbai, MH",
    initials: "AM",
    purchasedItem: "Custom Teak Ganesha Idol",
    headline: "The detailing on the mukut and trunk is sublime",
    review:
      "You can smell the authentic seasoned teakwood the moment you unbox it. The facial serene expression and hand-carved ornaments are breathtaking. Shipped in a reinforced crate with zero damage.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 2,
    name: "Priya & Vikram Nair",
    location: "Bengaluru, KA",
    initials: "PN",
    purchasedItem: "Carved Lord Krishna Wall Panel",
    headline: "An unforgettable bespoke carving journey",
    review:
      "We commissioned a 4-foot carved wall panel for our new home's foyer. Receiving weekly chisel progress photos from the master artisan made the experience truly special. It is our family heirloom.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 3,
    name: "Rajeshwari Sharma",
    location: "New Delhi, DL",
    initials: "RS",
    purchasedItem: "Goddess Lakshmi Sacred Murti",
    headline: "Ancient shastra proportions sculpted to perfection",
    review:
      "The mudras and posture reflect deep spiritual reverence. The timber has a rich natural luster with pure non-toxic oil finish. It has completely transformed the positive energy of our mandir.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 4,
    name: "Anand Kulkarni",
    location: "Pune, MH",
    initials: "AK",
    purchasedItem: "Bespoke Corporate Awards (50 pcs)",
    headline: "Exceeded all our leadership summit expectations",
    review:
      "Ordered 50 custom laser-etched rosewood awards with solid brass plates. The weight, joinery, and clean luxury packaging impressed our global board members immensely.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 5,
    name: "Meera Sundaram",
    location: "Chennai, TN",
    initials: "MS",
    purchasedItem: "Royal Ambabari Elephant Sculpture",
    headline: "The intricate jali woodwork feels impossible by hand",
    review:
      "The level of micro-carving on the elephant's howdah is museum quality. Arrived in Chennai within 4 days in tamper-proof foam casing. Truly proud of Indian handcrafting heritage.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 6,
    name: "Siddharth Roy",
    location: "Kolkata, WB",
    initials: "SR",
    purchasedItem: "Organic End-Grain Walnut Platter",
    headline: "Heavy, authentic hardwood that lasts a lifetime",
    review:
      "Solid end-grain walnut with beautiful swirling grain. Smooth as silk and treated with food-grade beeswax. It’s both a functional kitchen board and an art centerpiece on our dining table.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 7,
    name: "Rohit & Sneha Patel",
    location: "Ahmedabad, GJ",
    initials: "RP",
    purchasedItem: "Bespoke Carved Temple Shrine",
    headline: "Master carvers who take genuine pride in their craft",
    review:
      "TimberCraft accommodated all our specific dimension requests. The pillar floral relief carvings and smooth mortise joinery show uncompromising dedication. 10/10 recommendation.",
    rating: 5,
    date: "Verified Buyer",
  },
  {
    id: 8,
    name: "Devika Sengupta",
    location: "Hyderabad, TS",
    initials: "DS",
    purchasedItem: "Personalised Tree of Life Plaque",
    headline: "My parents were moved to tears by the detail",
    review:
      "Gifted for their 30th wedding anniversary with our family names engraved in the roots. The warm honey hue of the teakwood and delicate leaf cuts made it the best gift they have ever received.",
    rating: 5,
    date: "Verified Buyer",
  },
];

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
  title?: string;
  autoPlayInterval?: number; // ms, default 4000
}

export default function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = "What Our Collectors Say",
  autoPlayInterval = 4000,
}: TestimonialsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepWidth, setStepWidth] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible count: 4 columns on desktop
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth >= 1024) return 4; // lg: 4 columns
    if (window.innerWidth >= 768) return 3;  // md: 3 columns
    if (window.innerWidth >= 640) return 2;  // sm: 2 columns
    return 1;                                // xs: 1 column
  }, []);

  const [visibleCount, setVisibleCount] = useState(4);
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

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
    <section className="w-full bg-[#fbf9f5] py-16 sm:py-20 lg:py-24 border-b border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            CENTER ALIGNED SECTION HEADING
           ========================================================= */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="size-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1.5 text-xs font-bold text-neutral-800">
              4.9 / 5.0 Rating (1,800+ Reviews)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900">
            {title}
          </h2>
        </div>

        {/* =========================================================
            SLIDER: 4 COLUMNS OF TESTIMONIAL CARDS
            (OVERFLOW HIDDEN — ZERO BOTTOM SCROLLBAR)
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
            aria-label="Previous testimonials"
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
            aria-label="Next testimonials"
            variant="slider"
            size="slider"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30"
          >
            <FiChevronRight className="size-5 sm:size-6" />
          </Button>

          {/* Inner overflow-hidden container for smooth translate without scrollbar */}
          <div className="overflow-hidden w-full py-2">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${offset}px)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-full sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2*1.5rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)] shrink-0 flex"
                >
                  <div className="flex flex-col justify-between h-full w-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:border-neutral-300 hover:shadow-xl hover:-translate-y-1 text-left">
                    <div>
                      {/* Top Row: Stars & Verified Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(item.rating)].map((_, i) => (
                            <FiStar
                              key={i}
                              className="size-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 rounded-full px-2 py-0.5">
                          <FiCheck className="size-3" />
                          <span>{item.date}</span>
                        </span>
                      </div>

                      {/* Quote Icon & Headline */}
                      <div className="relative mb-2.5">
                        <FaQuoteLeft className="size-4 text-amber-600/20 mb-2" />
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug line-clamp-2">
                          &ldquo;{item.headline}&rdquo;
                        </h3>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-4">
                        {item.review}
                      </p>
                    </div>

                    {/* Author & Product Footer */}
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100/90 border border-amber-200/80 text-xs font-bold text-amber-900">
                        {item.initials}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-neutral-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate">
                          {item.location}
                        </p>
                        <p className="text-[10px] font-semibold text-amber-800 truncate mt-0.5">
                          {item.purchasedItem}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
