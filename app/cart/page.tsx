"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingBag, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import CartItem, { CartItemType } from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponForm from "../components/cart/CouponForm";

const defaultCartItems: CartItemType[] = [
  {
    id: "cart-1",
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
    id: "cart-2",
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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(defaultCartItems);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleUpdateQuantity = (
    id: string | number,
    newQuantity: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const handleApplyCoupon = (code: string) => {
    if (code === "TIMBER10" || code === "WELCOME15") {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // 10% coupon discount
  const discountAmount =
    appliedCoupon === "TIMBER10"
      ? Math.round(subtotal * 0.1)
      : appliedCoupon === "WELCOME15"
      ? Math.round(subtotal * 0.15)
      : 0;

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <FiArrowLeft className="size-4" />
            <span>Continue Shopping</span>
          </Link>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={handleClearCart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-red-600 transition-colors"
            >
              <FiTrash2 className="size-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {/* Page Title & Count Badge */}
        <div className="mb-8 flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-bold text-white">
              {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="mx-auto max-w-md text-center py-16 sm:py-24">
            <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-amber-50 text-amber-800">
              <FiShoppingBag className="size-9" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              Your Artisanal Cart is Empty
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Discover our master carvers&apos; latest bespoke wooden idols, wall
              reliefs, and heirloom home goods.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95"
              >
                Explore Hardwood Collections
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Layout: Two Columns (Left Items, Right Summary) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}

              {/* Delivery Assurance Note */}
              <div className="rounded-xl border border-neutral-200/80 bg-white p-4 text-xs text-neutral-600 flex items-center justify-between">
                <span>
                  🎁 <strong>Gifting this piece?</strong> Complimentary velvet gift
                  ribbon &amp; handwritten calligraphy note available at
                  checkout.
                </span>
              </div>
            </div>

            {/* Right Column: Coupon Form & Cart Summary Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
              <CouponForm
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                appliedCoupon={appliedCoupon}
              />

              <CartSummary
                subtotal={subtotal}
                discount={discountAmount}
                itemCount={totalItemsCount}
                freeShippingThreshold={2000}
                checkoutUrl="/checkout"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
