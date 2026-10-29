"use client";

import React, { useState } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiRotateCcw,
  FiCheck,
} from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export interface FilterState {
  categories: string[];
  woodTypes: string[];
  priceRange: [number, number];
  finishes: string[];
  minRating: number | null;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  customizableOnly: boolean;
}

export const initialFilterState: FilterState = {
  categories: [],
  woodTypes: [],
  priceRange: [0, 50000],
  finishes: [],
  minRating: null,
  inStockOnly: false,
  onSaleOnly: false,
  customizableOnly: false,
};

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

const CATEGORY_OPTIONS: FilterOption[] = [
  { id: "Wooden Idols & Deities", label: "Wooden Idols & Deities", count: 24 },
  { id: "Wooden Sculptures", label: "Wooden Sculptures", count: 18 },
  { id: "Wooden Wall Art", label: "Wooden Wall Art", count: 15 },
  { id: "Home Decor", label: "Home Decor", count: 32 },
  { id: "Trophies & Awards", label: "Trophies & Awards", count: 12 },
  { id: "Personalised Gifts", label: "Personalised Gifts", count: 19 },
  { id: "Corporate Gifts", label: "Corporate Gifts", count: 14 },
  { id: "Limited Editions", label: "Limited Editions", count: 8 },
];

const WOOD_TYPE_OPTIONS: FilterOption[] = [
  { id: "Solid Burma Teak", label: "Solid Burma Teak", count: 28 },
  { id: "Rosewood (Sheesham)", label: "Rosewood (Sheesham)", count: 22 },
  { id: "American Black Walnut", label: "American Black Walnut", count: 16 },
  { id: "Sacred Sandalwood", label: "Sacred Sandalwood", count: 9 },
  { id: "Himalayan Cedar", label: "Himalayan Cedar", count: 11 },
  { id: "Indian Mahogany", label: "Indian Mahogany", count: 14 },
];

const FINISH_OPTIONS: FilterOption[] = [
  { id: "Natural Antique Wax Polish", label: "Natural Antique Wax", count: 35 },
  { id: "Food-Grade Mineral Oil", label: "Food-Safe Mineral Oil", count: 20 },
  { id: "Hand-Rubbed Matte Poly", label: "Hand-Rubbed Matte", count: 18 },
  { id: "24K Gold Leaf Embellished", label: "Gold Leaf Embellished", count: 7 },
  { id: "Raw Distressed Teak", label: "Raw Distressed Finish", count: 12 },
];

const PRICE_PRESETS = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 - ₹15,000", min: 5000, max: 15000 },
  { label: "₹15,000 - ₹25,000", min: 15000, max: 25000 },
  { label: "Above ₹25,000", min: 25000, max: 50000 },
];

export interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset?: () => void;
  className?: string;
  totalResultsCount?: number;
}

export default function ProductFilters({
  filters,
  onChange,
  onReset,
  className = "",
  totalResultsCount,
}: ProductFiltersProps) {
  // Accordion section collapse state
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    wood: true,
    finishes: false,
    rating: false,
    availability: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryToggle = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: updated });
  };

  const handleWoodToggle = (wood: string) => {
    const updated = filters.woodTypes.includes(wood)
      ? filters.woodTypes.filter((w) => w !== wood)
      : [...filters.woodTypes, wood];
    onChange({ ...filters, woodTypes: updated });
  };

  const handleFinishToggle = (finish: string) => {
    const updated = filters.finishes.includes(finish)
      ? filters.finishes.filter((f) => f !== finish)
      : [...filters.finishes, finish];
    onChange({ ...filters, finishes: updated });
  };

  const handlePricePreset = (min: number, max: number) => {
    onChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingSelect = (rating: number) => {
    onChange({
      ...filters,
      minRating: filters.minRating === rating ? null : rating,
    });
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      onChange(initialFilterState);
    }
  };

  // Compute active filters count
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
    <div
      className={`rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs ${className}`}
    >
      {/* =========================================================
          FILTER HEADER: Title, Count Badge & Reset Button
         ========================================================= */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <FiFilter className="size-4.5 text-neutral-900" />
          <h3 className="text-base font-bold text-neutral-900">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="amber" size="xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            rounded="lg"
            onClick={handleReset}
            leftIcon={<FiRotateCcw className="size-3 text-neutral-400 group-hover:text-red-600" />}
            className="text-neutral-500 hover:text-red-600 px-2"
          >
            Reset
          </Button>
        )}
      </div>

      {totalResultsCount !== undefined && (
        <p className="mt-2.5 text-xs text-neutral-500">
          Showing <strong>{totalResultsCount}</strong> handcrafted items
        </p>
      )}

      {/* =========================================================
          ACTIVE FILTERS CHIPS (Summary Row)
         ========================================================= */}
      {activeFiltersCount > 0 && (
        <div className="pt-3 pb-3 border-b border-neutral-100 flex flex-wrap gap-1.5">
          {filters.categories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              size="xs"
              onRemove={() => handleCategoryToggle(cat)}
            >
              {cat}
            </Badge>
          ))}
          {filters.woodTypes.map((wood) => (
            <Badge
              key={wood}
              variant="amber"
              size="xs"
              onRemove={() => handleWoodToggle(wood)}
            >
              {wood}
            </Badge>
          ))}
          {filters.finishes.map((finish) => (
            <Badge
              key={finish}
              variant="outline"
              size="xs"
              onRemove={() => handleFinishToggle(finish)}
            >
              {finish}
            </Badge>
          ))}
          {filters.minRating && (
            <Badge
              variant="warning"
              size="xs"
              onRemove={() => onChange({ ...filters, minRating: null })}
            >
              {filters.minRating}★ &amp; Above
            </Badge>
          )}
          {filters.inStockOnly && (
            <Badge
              variant="success"
              size="xs"
              onRemove={() => onChange({ ...filters, inStockOnly: false })}
            >
              In Stock
            </Badge>
          )}
          {filters.onSaleOnly && (
            <Badge
              variant="discount"
              size="xs"
              onRemove={() => onChange({ ...filters, onSaleOnly: false })}
            >
              On Sale
            </Badge>
          )}
        </div>
      )}

      {/* =========================================================
          ACCORDION SECTIONS
         ========================================================= */}
      <div className="divide-y divide-neutral-100 text-xs">
        {/* SECTION 1: CATEGORIES */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("categories")}
            className="flex w-full items-center justify-between font-bold text-neutral-900 transition-colors hover:text-amber-800"
          >
            <span className="text-xs uppercase tracking-wider">
              Category ({filters.categories.length})
            </span>
            {openSections.categories ? (
              <FiChevronUp className="size-4 text-neutral-400" />
            ) : (
              <FiChevronDown className="size-4 text-neutral-400" />
            )}
          </button>

          {openSections.categories && (
            <div className="mt-3 space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {CATEGORY_OPTIONS.map((item) => {
                const isChecked = filters.categories.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center justify-between group cursor-pointer select-none text-neutral-700 hover:text-neutral-950"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`size-4 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-neutral-950 border-neutral-950 text-white"
                            : "border-neutral-300 bg-white group-hover:border-neutral-400"
                        }`}
                      >
                        {isChecked && <FiCheck className="size-3" />}
                      </div>
                      <span className="truncate text-xs font-medium">
                        {item.label}
                      </span>
                    </div>
                    {item.count && (
                      <span className="text-[11px] text-neutral-400 shrink-0">
                        ({item.count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 2: PRICE RANGE */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("price")}
            className="flex w-full items-center justify-between font-bold text-neutral-900 transition-colors hover:text-amber-800"
          >
            <span className="text-xs uppercase tracking-wider">Price Range</span>
            {openSections.price ? (
              <FiChevronUp className="size-4 text-neutral-400" />
            ) : (
              <FiChevronDown className="size-4 text-neutral-400" />
            )}
          </button>

          {openSections.price && (
            <div className="mt-3 space-y-3">
              {/* Presets */}
              <div className="grid grid-cols-2 gap-1.5">
                {PRICE_PRESETS.map((preset) => {
                  const isSelected =
                    filters.priceRange[0] === preset.min &&
                    filters.priceRange[1] === preset.max;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePricePreset(preset.min, preset.max)}
                      className={`rounded-xl border py-1.5 px-2 text-[11px] font-semibold transition-all ${
                        isSelected
                          ? "bg-neutral-950 text-white border-neutral-950"
                          : "bg-neutral-50/60 text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Slider Display */}
              <div className="pt-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceRange: [filters.priceRange[0], Number(e.target.value)],
                    })
                  }
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
                />
                <div className="mt-2 flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span className="flex items-center text-neutral-500 font-normal">
                    <FaIndianRupeeSign className="size-2.5 mr-0.5" />
                    {filters.priceRange[0].toLocaleString("en-IN")}
                  </span>
                  <span className="flex items-center">
                    Up to&nbsp;
                    <FaIndianRupeeSign className="size-2.5 mr-0.5" />
                    {filters.priceRange[1].toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: WOOD TYPES */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("wood")}
            className="flex w-full items-center justify-between font-bold text-neutral-900 transition-colors hover:text-amber-800"
          >
            <span className="text-xs uppercase tracking-wider">
              Wood Species ({filters.woodTypes.length})
            </span>
            {openSections.wood ? (
              <FiChevronUp className="size-4 text-neutral-400" />
            ) : (
              <FiChevronDown className="size-4 text-neutral-400" />
            )}
          </button>

          {openSections.wood && (
            <div className="mt-3 space-y-2.5">
              {WOOD_TYPE_OPTIONS.map((item) => {
                const isChecked = filters.woodTypes.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center justify-between group cursor-pointer select-none text-neutral-700 hover:text-neutral-950"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`size-4 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-amber-900 border-amber-900 text-white"
                            : "border-neutral-300 bg-white group-hover:border-neutral-400"
                        }`}
                      >
                        {isChecked && <FiCheck className="size-3" />}
                      </div>
                      <span className="truncate text-xs font-medium">
                        {item.label}
                      </span>
                    </div>
                    {item.count && (
                      <span className="text-[11px] text-neutral-400 shrink-0">
                        ({item.count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 4: ARTISANAL FINISHES */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("finishes")}
            className="flex w-full items-center justify-between font-bold text-neutral-900 transition-colors hover:text-amber-800"
          >
            <span className="text-xs uppercase tracking-wider">
              Craft Finish ({filters.finishes.length})
            </span>
            {openSections.finishes ? (
              <FiChevronUp className="size-4 text-neutral-400" />
            ) : (
              <FiChevronDown className="size-4 text-neutral-400" />
            )}
          </button>

          {openSections.finishes && (
            <div className="mt-3 space-y-2.5">
              {FINISH_OPTIONS.map((item) => {
                const isChecked = filters.finishes.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center justify-between group cursor-pointer select-none text-neutral-700 hover:text-neutral-950"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`size-4 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-neutral-950 border-neutral-950 text-white"
                            : "border-neutral-300 bg-white group-hover:border-neutral-400"
                        }`}
                      >
                        {isChecked && <FiCheck className="size-3" />}
                      </div>
                      <span className="truncate text-xs font-medium">
                        {item.label}
                      </span>
                    </div>
                    {item.count && (
                      <span className="text-[11px] text-neutral-400 shrink-0">
                        ({item.count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 5: CUSTOMER RATING */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("rating")}
            className="flex w-full items-center justify-between font-bold text-neutral-900 transition-colors hover:text-amber-800"
          >
            <span className="text-xs uppercase tracking-wider">Rating</span>
            {openSections.rating ? (
              <FiChevronUp className="size-4 text-neutral-400" />
            ) : (
              <FiChevronDown className="size-4 text-neutral-400" />
            )}
          </button>

          {openSections.rating && (
            <div className="mt-3 space-y-2">
              {[4.5, 4.0, 3.5].map((rating) => {
                const isSelected = filters.minRating === rating;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingSelect(rating)}
                    className={`flex items-center justify-between w-full p-2 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-amber-50 border-amber-400 text-amber-950 font-bold"
                        : "border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`size-3.5 ${
                              i < Math.floor(rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{rating}★ &amp; Above</span>
                    </div>
                    {isSelected && <FiCheck className="size-3.5 text-amber-800" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 6: AVAILABILITY & EXCLUSIVITY */}
        <div className="py-4 space-y-3">
          <label className="flex items-center justify-between cursor-pointer select-none">
            <span className="text-xs font-semibold text-neutral-800">
              In Stock Only
            </span>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) =>
                onChange({ ...filters, inStockOnly: e.target.checked })
              }
              className="size-4 rounded-md border-neutral-300 text-neutral-950 focus:ring-neutral-950 accent-neutral-950 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer select-none">
            <span className="text-xs font-semibold text-neutral-800">
              Festive Offers &amp; Sale
            </span>
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) =>
                onChange({ ...filters, onSaleOnly: e.target.checked })
              }
              className="size-4 rounded-md border-neutral-300 text-neutral-950 focus:ring-neutral-950 accent-neutral-950 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer select-none">
            <span className="text-xs font-semibold text-neutral-800">
              Customizable Engravings
            </span>
            <input
              type="checkbox"
              checked={filters.customizableOnly}
              onChange={(e) =>
                onChange({ ...filters, customizableOnly: e.target.checked })
              }
              className="size-4 rounded-md border-neutral-300 text-neutral-950 focus:ring-neutral-950 accent-neutral-950 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
