"use client";

import React, { useState } from "react";
import { FiShoppingBag, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import CartItem, { CartItemType } from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponForm from "../components/cart/CouponForm";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

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
          <Button
            href="/shop"
            variant="ghost"
            size="sm"
            leftIcon={<FiArrowLeft className="size-4" />}
          >
            Continue Shopping
          </Button>

          {cartItems.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={handleClearCart}
              leftIcon={<FiTrash2 className="size-3.5" />}
              className="text-neutral-500 hover:text-red-600"
            >
              Clear Cart
            </Button>
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
          <EmptyState
            icon={<FiShoppingBag className="size-8 sm:size-9" />}
            title="Your Artisanal Cart is Empty"
            description="Discover our master carvers' latest bespoke wooden idols, wall reliefs, and heirloom home goods."
            action={{
              label: "Explore Hardwood Collections",
              href: "/shop",
              variant: "primary",
            }}
          />
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
