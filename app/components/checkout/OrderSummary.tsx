"use client";

import React from "react";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiTruck, FiShield } from "react-icons/fi";
import { CartItemType } from "../cart/CartItem";

export interface OrderSummaryProps {
  items: CartItemType[];
  subtotal: number;
  discount?: number;
  shippingFee?: number;
  shippingMethodTitle?: string;
  className?: string;
}

export default function OrderSummary({
  items,
  subtotal,
  discount = 0,
  shippingFee = 0,
  shippingMethodTitle = "Standard White-Glove Wooden Crate",
  className = "",
}: OrderSummaryProps) {
  const total = Math.max(0, subtotal - discount + shippingFee);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <h3 className="text-base sm:text-lg font-bold text-neutral-900">
          Order Summary
        </h3>
        <span className="text-xs font-semibold text-neutral-500">
          {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Items list */}
      <div className="py-4 space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3.5">
            {/* Thumbnail with quantity badge */}
            <div className="relative size-16 shrink-0 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/70">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover object-center"
              />
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white shadow-xs">
                {item.quantity}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate">
                {item.name}
              </h4>
              <div className="flex flex-wrap gap-2 text-[11px] text-neutral-500 mt-0.5">
                {item.woodType && <span>{item.woodType}</span>}
                {item.size && <span>• {item.size}</span>}
              </div>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <span className="flex items-center text-xs sm:text-sm font-bold text-neutral-950">
                <FaIndianRupeeSign className="size-3 mr-0.5 inline-block text-neutral-950" />
                {(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
              {item.quantity > 1 && (
                <span className="text-[10px] text-neutral-400 block">
                  (₹{item.price.toLocaleString("en-IN")} each)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing calculation */}
      <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span className="font-semibold text-neutral-900 flex items-center">
            <FaIndianRupeeSign className="size-3 mr-0.5 inline-block text-neutral-900" />
            {subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Promo Discount</span>
            <span className="font-bold flex items-center">
              - <FaIndianRupeeSign className="size-3 mx-0.5 inline-block text-emerald-700" />
              {discount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="flex justify-between text-neutral-600">
          <div className="flex flex-col">
            <span>Shipping</span>
            <span className="text-[10px] text-neutral-400">
              {shippingMethodTitle}
            </span>
          </div>
          <span className="font-semibold text-neutral-900 self-start">
            {shippingFee === 0 ? (
              <span className="font-bold text-emerald-700 uppercase text-xs">
                Free
              </span>
            ) : (
              <span className="flex items-center">
                <FaIndianRupeeSign className="size-3 mr-0.5 inline-block text-neutral-900" />
                {shippingFee.toLocaleString("en-IN")}
              </span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-neutral-600">
          <span>Estimated GST (12% / 18%)</span>
          <span className="text-xs text-neutral-500">Included in prices</span>
        </div>

        <div className="pt-3 border-t border-neutral-100 flex justify-between items-baseline">
          <div>
            <span className="text-base font-bold text-neutral-950">
              Total Amount
            </span>
            <p className="text-[11px] text-neutral-400">
              Includes all transit insurance
            </p>
          </div>
          <span className="flex items-center text-xl sm:text-2xl font-black text-neutral-950">
            <FaIndianRupeeSign className="size-4 mr-0.5 inline-block text-neutral-950" />
            {total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Assurance footer */}
      <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-2 text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          <FiTruck className="size-3.5 text-amber-800 shrink-0" />
          <span>Wooden Crate Pack</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiShield className="size-3.5 text-emerald-600 shrink-0" />
          <span>Transit Insured</span>
        </div>
      </div>
    </div>
  );
}
