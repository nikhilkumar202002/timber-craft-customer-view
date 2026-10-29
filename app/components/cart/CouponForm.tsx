"use client";

import React, { useState } from "react";
import { FiTag, FiCheck, FiX } from "react-icons/fi";

export interface CouponFormProps {
  onApplyCoupon?: (code: string) => boolean | Promise<boolean>;
  onRemoveCoupon?: () => void;
  appliedCoupon?: string | null;
  discountAmount?: number;
}

export default function CouponForm({
  onApplyCoupon,
  onRemoveCoupon,
  appliedCoupon: initialCoupon = null,
}: CouponFormProps) {
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState<string | null>(initialCoupon);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = couponCode.trim().toUpperCase();
    if (!trimmed) return;

    setIsSubmitting(true);
    setError(null);

    // Mock validation or pass to parent
    let success = true;
    if (onApplyCoupon) {
      try {
        const res = await onApplyCoupon(trimmed);
        success = res !== false;
      } catch {
        success = false;
      }
    } else {
      // Default valid test coupons
      const validCodes = ["TIMBER10", "WELCOME15", "ARTISAN500"];
      success = validCodes.includes(trimmed);
    }

    setIsSubmitting(false);

    if (success) {
      setApplied(trimmed);
      setCouponCode("");
      setError(null);
    } else {
      setError("Invalid coupon code. Try 'TIMBER10' for 10% off.");
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setError(null);
    if (onRemoveCoupon) {
      onRemoveCoupon();
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <FiTag className="size-4 text-amber-800" />
        <h4 className="text-sm font-bold text-neutral-900">
          Have a Promo or Gift Code?
        </h4>
      </div>

      {applied ? (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200/80 px-3.5 py-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <FiCheck className="size-4 text-emerald-600 shrink-0" />
            <span>
              Coupon <strong>{applied}</strong> Applied!
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-900 hover:text-red-600 transition-colors"
          >
            <FiX className="size-3.5" />
            <span>Remove</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                if (error) setError(null);
              }}
              placeholder="e.g. TIMBER10"
              className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs uppercase tracking-wider text-neutral-900 placeholder:text-neutral-400 placeholder:normal-case focus:border-neutral-900 focus:bg-white focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!couponCode.trim() || isSubmitting}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-900"
            >
              {isSubmitting ? "Checking..." : "Apply"}
            </button>
          </div>

          {error && <p className="text-[11px] font-medium text-red-600">{error}</p>}

          <p className="text-[11px] text-neutral-400">
            Tip: Use code <strong className="text-neutral-700">TIMBER10</strong> for 10% off your artisanal order.
          </p>
        </form>
      )}
    </div>
  );
}
