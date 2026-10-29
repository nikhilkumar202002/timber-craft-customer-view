"use client";

import React from "react";
import { FiArrowRight, FiShield, FiTruck, FiRotateCcw } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Button from "../ui/Button";

export interface CartSummaryProps {
  subtotal: number;
  discount?: number;
  shippingFee?: number;
  freeShippingThreshold?: number;
  checkoutUrl?: string;
  itemCount?: number;
}

export default function CartSummary({
  subtotal,
  discount = 0,
  shippingFee = 0,
  freeShippingThreshold = 2000,
  checkoutUrl = "/checkout",
  itemCount = 1,
}: CartSummaryProps) {
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const effectiveShipping = isFreeShipping ? 0 : shippingFee;
  const total = Math.max(0, subtotal - discount + effectiveShipping);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
        Order Summary
      </h3>

      {/* Free Shipping Progress Indicator */}
      {subtotal > 0 && (
        <div className="rounded-xl bg-amber-50/60 border border-amber-200/50 p-3 text-xs">
          {amountToFreeShipping > 0 ? (
            <p className="text-amber-900 font-medium">
              Add <strong className="font-bold">₹{amountToFreeShipping.toLocaleString("en-IN")}</strong> more of handcrafted works for <strong className="font-bold text-emerald-700">FREE Shipping</strong>!
            </p>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <FiTruck className="size-4 text-emerald-600" />
              <span>Congratulations! You qualify for Free White-Glove Shipping.</span>
            </div>
          )}
          <div className="mt-2 h-1.5 w-full rounded-full bg-amber-200/60 overflow-hidden">
            <div
              className="h-full bg-amber-700 transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Pricing Breakdown Rows */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span className="font-semibold text-neutral-900 flex items-center">
            <FaIndianRupeeSign className="size-3 mr-0.5 inline-block text-neutral-900" />
            {subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Special Promotional Discount</span>
            <span className="font-bold flex items-center">
              - <FaIndianRupeeSign className="size-3 mx-0.5 inline-block text-emerald-700" />
              {discount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="flex justify-between text-neutral-600">
          <span className="flex items-center gap-1">
            Shipping & Handling
            <span className="text-[10px] text-neutral-400 font-normal">(Insured)</span>
          </span>
          <span className="font-semibold text-neutral-900">
            {isFreeShipping ? (
              <span className="font-bold text-emerald-700 uppercase text-xs">Free</span>
            ) : (
              <span className="flex items-center">
                <FaIndianRupeeSign className="size-3 mr-0.5 inline-block" />
                {effectiveShipping.toLocaleString("en-IN")}
              </span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-neutral-600">
          <span>Taxes (GST 12% / 18%)</span>
          <span className="text-xs text-neutral-500">Included in prices</span>
        </div>

        <div className="border-t border-neutral-100 pt-3 flex justify-between items-baseline">
          <div>
            <span className="text-base font-bold text-neutral-900">Total Payable</span>
            <p className="text-[11px] text-neutral-400">All duties & insurance covered</p>
          </div>
          <span className="flex items-center text-xl sm:text-2xl font-extrabold text-neutral-950">
            <FaIndianRupeeSign className="size-4 sm:size-4.5 mr-0.5 inline-block text-neutral-950" />
            {total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Checkout CTA Button */}
      <Button
        href={checkoutUrl}
        variant="primary"
        size="lg"
        rounded="xl"
        fullWidth
        rightIcon={<FiArrowRight className="size-4" />}
      >
        Proceed to Secure Checkout
      </Button>

      {/* Trust & Assurance Badges */}
      <div className="border-t border-neutral-100 pt-4 space-y-2.5 text-xs text-neutral-500">
        <div className="flex items-center gap-2.5">
          <FiShield className="size-4 text-emerald-600 shrink-0" />
          <span>100% Secure Encrypted 256-bit Payment</span>
        </div>
        <div className="flex items-center gap-2.5">
          <FiTruck className="size-4 text-amber-800 shrink-0" />
          <span>Carefully packed with custom wooden foam crates</span>
        </div>
        <div className="flex items-center gap-2.5">
          <FiRotateCcw className="size-4 text-neutral-600 shrink-0" />
          <span>7-Day Replacement Guarantee on transit damages</span>
        </div>
      </div>
    </div>
  );
}
