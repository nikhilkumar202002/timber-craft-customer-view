"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "TC-849201";

  // Calculate delivery window (5-7 business days from now)
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 6);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl text-center py-12 sm:py-20 px-4">
      {/* Green Checkmark Badge */}
      <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
        <FiCheckCircle className="size-10" />
      </div>

      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
        Order Confirmed
      </span>

      <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
        Thank You for Your Order!
      </h1>

      <p className="mt-2 text-sm sm:text-base text-neutral-600">
        Our master artisans have received your commission and are preparing your
        handcrafted hardwood pieces for specialized white-glove transport.
      </p>

      {/* Order Info Card */}
      <div className="mt-8 rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-100 pb-4">
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
              Order Reference
            </span>
            <p className="text-lg font-mono font-bold text-neutral-900">
              {orderId}
            </p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
              Payment Status
            </span>
            <p className="text-sm font-bold text-emerald-700 flex items-center gap-1 sm:justify-end">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>Paid &amp; Verified</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="flex items-start gap-3">
            <FiTruck className="size-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-neutral-900 uppercase">
                Estimated Delivery Date
              </h4>
              <p className="text-sm font-semibold text-neutral-800 mt-0.5">
                {formattedDelivery}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                Standard Insured Wooden Crate Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiPackage className="size-5 text-neutral-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-neutral-900 uppercase">
                Transit Tracking
              </h4>
              <p className="text-sm text-neutral-700 mt-0.5">
                Tracking code &amp; live SMS updates will be sent to your mobile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95"
        >
          <span>Continue Shopping</span>
          <FiArrowRight className="size-4" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-700 shadow-2xs transition-all hover:bg-neutral-50 active:scale-95"
        >
          <FiHome className="size-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen">
      <Suspense
        fallback={
          <div className="mx-auto max-w-2xl text-center py-20 text-neutral-500 text-sm">
            Loading order details...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
