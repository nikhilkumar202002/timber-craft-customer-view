"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import CheckoutForm, { ShippingMethod } from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import { CartItemType } from "../components/cart/CartItem";

const defaultCheckoutItems: CartItemType[] = [
  {
    id: "checkout-1",
    productId: 1,
    name: "Handcrafted Teak Wood Lord Ganesha Idol",
    category: "Wooden Idols & Deities",
    slug: "teak-wood-ganesha-idol",
    price: 14999,
    originalPrice: 18500,
    quantity: 1,
    woodType: "Solid Burma Teak",
    size: '12" x 8" x 5"',
    finish: "Natural Antique Wax Polish",
    customEngraving: "Om Shri Ganeshay Namah",
    image: "/category/Wooden_Ganesha_Shelf_Display.png",
    inStock: true,
  },
  {
    id: "checkout-2",
    productId: 5,
    name: "Organic End-Grain Walnut Serving & Cutting Board",
    category: "Home Decor",
    slug: "organic-end-grain-walnut-board",
    price: 3999,
    originalPrice: 5200,
    quantity: 2,
    woodType: "American Black Walnut",
    size: '16" x 12" x 1.75"',
    finish: "Food-Grade Mineral Oil & Beeswax",
    image: "/category/Wooden_Chopping_Board_Overhead.png",
    inStock: true,
  },
];

export default function CheckoutPage() {
  const [items] = useState<CartItemType[]>(defaultCheckoutItems);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>({
    id: "standard",
    name: "Standard White-Glove Wooden Crate Delivery",
    description: "Insured transport with protective foam framing",
    cost: 0,
    deliveryDays: "4-6 business days",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 2300; // Special promotional festive discount

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen pb-16 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header / Back Navigation */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200/80">
          <div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              <FiArrowLeft className="size-4" />
              <span>Back to Shopping Cart</span>
            </Link>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Checkout &amp; Order Placement
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200/80 px-3.5 py-2 text-xs font-semibold text-emerald-800 self-start sm:self-auto">
            <FiShield className="size-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted &amp; Insured</span>
          </div>
        </div>

        {/* Checkout Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-stage Checkout Form (Address, Courier, Payment) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CheckoutForm
              totalAmount={subtotal - discount}
              onShippingMethodChange={setShippingMethod}
            />
          </div>

          {/* Right Column: Order Summary Sticky Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              discount={discount}
              shippingFee={shippingMethod.cost}
              shippingMethodTitle={shippingMethod.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
