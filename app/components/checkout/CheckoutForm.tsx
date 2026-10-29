"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiCheckCircle,
  FiTruck,
  FiLock,
  FiEdit3,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import AddressForm, { AddressData } from "./AddressForm";
import PaymentMethods, {
  PaymentMethodType,
  PaymentDetails,
} from "./PaymentMethods";

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  deliveryDays: string;
}

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard White-Glove Wooden Crate Delivery",
    description: "Insured transport with protective foam framing",
    cost: 0,
    deliveryDays: "4-6 business days",
  },
  {
    id: "express",
    name: "Express Priority Air Courier",
    description: "Expedited dispatch via BlueDart / FedEx Express",
    cost: 499,
    deliveryDays: "2-3 business days",
  },
];

export interface CheckoutFormProps {
  totalAmount: number;
  onShippingMethodChange?: (method: ShippingMethod) => void;
  onOrderSuccess?: (orderId: string) => void;
  className?: string;
}

export default function CheckoutForm({
  totalAmount,
  onShippingMethodChange,
  onOrderSuccess,
  className = "",
}: CheckoutFormProps) {
  const router = useRouter();

  // Checkout Stages: 1. Address, 2. Delivery & Payment
  const [currentStep, setCurrentStep] = useState<"address" | "payment">("address");
  const [savedAddress, setSavedAddress] = useState<AddressData | null>({
    firstName: "Ramesh",
    lastName: "Sharma",
    email: "ramesh.sharma@example.com",
    phone: "9876543210",
    pincode: "560038",
    addressLine1: "Flat 402, Oakwood Heritage Residency",
    addressLine2: "14th Main, 4th Cross, Indiranagar",
    landmark: "Opposite Metro Pillar 124",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    addressType: "home",
    saveAddress: true,
    sameAsBilling: true,
  });

  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(
    SHIPPING_METHODS[0]
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("upi");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: "upi",
    upiId: "ramesh@okhdfcbank",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddressSubmit = (data: AddressData) => {
    setSavedAddress(data);
    setCurrentStep("payment");
  };

  const handleShippingChange = (method: ShippingMethod) => {
    setSelectedShipping(method);
    if (onShippingMethodChange) {
      onShippingMethodChange(method);
    }
  };

  const handlePaymentDetailsChange = (details: Partial<PaymentDetails>) => {
    setPaymentDetails((prev) => ({ ...prev, ...details }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderId = `TC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Simulate payment authorization & order creation
    setTimeout(() => {
      setIsProcessing(false);
      if (onOrderSuccess) {
        onOrderSuccess(generatedOrderId);
      }
      router.push(`/checkout/success?orderId=${generatedOrderId}`);
    }, 1200);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ========================================================
          STEP 1: SHIPPING ADDRESS
         ======================================================== */}
      {currentStep === "address" ? (
        <AddressForm
          initialData={savedAddress || undefined}
          onSubmit={handleAddressSubmit}
          submitButtonText="Continue to Delivery &amp; Payment"
        />
      ) : (
        /* Completed Address Card with Edit Button */
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="size-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-neutral-900">
                1. Delivery Address Confirmed
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep("address")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              <FiEdit3 className="size-3.5" />
              <span>Edit Address</span>
            </button>
          </div>

          {savedAddress && (
            <div className="pt-3 text-xs sm:text-sm text-neutral-700 space-y-1">
              <p className="font-bold text-neutral-900">
                {savedAddress.firstName} {savedAddress.lastName}
                <span className="ml-2 rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 uppercase">
                  {savedAddress.addressType}
                </span>
              </p>
              <p className="text-neutral-600">
                {savedAddress.addressLine1}, {savedAddress.addressLine2}
              </p>
              {savedAddress.landmark && (
                <p className="text-neutral-500 text-xs">
                  Landmark: {savedAddress.landmark}
                </p>
              )}
              <p className="text-neutral-600">
                {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}
              </p>
              <p className="text-neutral-600">
                Phone: +91 {savedAddress.phone} • Email: {savedAddress.email}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          STEP 2: SHIPPING / COURIER METHOD
         ======================================================== */}
      {currentStep === "payment" && (
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
            <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-900">
              <FiTruck className="size-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900">
              2. Shipping &amp; Packaging Method
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            {SHIPPING_METHODS.map((method) => {
              const isSelected = selectedShipping.id === method.id;
              return (
                <label
                  key={method.id}
                  onClick={() => handleShippingChange(method)}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-neutral-950 bg-neutral-50/50 ring-1 ring-neutral-950"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={() => handleShippingChange(method)}
                      className="size-4 mt-0.5 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-neutral-900">
                        {method.name}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {method.description} • {method.deliveryDays}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 shrink-0">
                    {method.cost === 0 ? (
                      <span className="text-emerald-700 uppercase font-extrabold text-xs">
                        FREE
                      </span>
                    ) : (
                      <span className="flex items-center">
                        + <FaIndianRupeeSign className="size-2.5 mx-0.5 inline-block" />
                        {method.cost}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: PAYMENT METHOD SELECTION
         ======================================================== */}
      {currentStep === "payment" && (
        <>
          <PaymentMethods
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
            paymentDetails={paymentDetails}
            onPaymentDetailsChange={handlePaymentDetailsChange}
            totalAmount={totalAmount + selectedShipping.cost}
          />

          {/* Final CTA & Order Submission */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <FiShield className="size-4 text-emerald-600 shrink-0" />
              <span>
                By placing this order, you agree to TimberCraft&apos;s Terms of
                Artisanal Sale &amp; Transit Damage Guarantee.
              </span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-neutral-950 py-4 px-6 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-neutral-800 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {isProcessing ? (
                <span>Securing Your Handcrafted Order...</span>
              ) : (
                <>
                  <FiLock className="size-4" />
                  <span>
                    Pay &amp; Place Order • ₹
                    {(totalAmount + selectedShipping.cost).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                  <FiArrowRight className="size-4" />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
