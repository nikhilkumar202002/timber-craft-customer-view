"use client";

import React from "react";
import {
  FiCreditCard,
  FiShield,
  FiSmartphone,
  FiDollarSign,
} from "react-icons/fi";
import { FaBuildingColumns } from "react-icons/fa6";

export type PaymentMethodType = "upi" | "card" | "netbanking" | "cod";

export interface PaymentDetails {
  method: PaymentMethodType;
  upiId?: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
  bankName?: string;
}

export interface PaymentMethodsProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  paymentDetails: PaymentDetails;
  onPaymentDetailsChange: (details: Partial<PaymentDetails>) => void;
  totalAmount: number;
}

const POPULAR_BANKS = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "IndusInd Bank",
];

export default function PaymentMethods({
  selectedMethod,
  onSelectMethod,
  paymentDetails,
  onPaymentDetailsChange,
  totalAmount,
}: PaymentMethodsProps) {
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    onPaymentDetailsChange({ cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + "/" + raw.slice(2);
    }
    onPaymentDetailsChange({ cardExpiry: raw });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    onPaymentDetailsChange({ cardCvv: raw });
  };

  return (
    <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
        <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-900">
          <FiCreditCard className="size-4.5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">
            Payment Method
          </h2>
          <p className="text-xs text-neutral-500">
            Select your preferred secure payment method for ₹
            {totalAmount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Methods List */}
      <div className="mt-5 space-y-3">
        {/* ========================================================
            1. UPI (Instant, Recommended)
           ======================================================== */}
        <div
          className={`rounded-xl border transition-all ${
            selectedMethod === "upi"
              ? "border-neutral-950 bg-neutral-50/40 ring-1 ring-neutral-950"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <label className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={selectedMethod === "upi"}
                onChange={() => onSelectMethod("upi")}
                className="size-4 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
              />
              <div className="flex items-center gap-2">
                <FiSmartphone className="size-4 text-neutral-700" />
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  UPI (Google Pay, PhonePe, Paytm, BHIM)
                </span>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
              Fastest
            </span>
          </label>

          {selectedMethod === "upi" && (
            <div className="px-4 pb-4 pt-1 border-t border-neutral-100 space-y-3">
              <p className="text-xs text-neutral-600">
                Enter your Virtual Payment Address (VPA) / UPI ID:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={paymentDetails.upiId || ""}
                  onChange={(e) =>
                    onPaymentDetailsChange({ upiId: e.target.value })
                  }
                  placeholder="e.g. mobile@okhdfcbank or user@upi"
                  className="flex-1 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-neutral-400">
                A payment request will be sent directly to your UPI mobile app.
              </p>
            </div>
          )}
        </div>

        {/* ========================================================
            2. Credit / Debit Cards
           ======================================================== */}
        <div
          className={`rounded-xl border transition-all ${
            selectedMethod === "card"
              ? "border-neutral-950 bg-neutral-50/40 ring-1 ring-neutral-950"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <label className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedMethod === "card"}
                onChange={() => onSelectMethod("card")}
                className="size-4 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
              />
              <div className="flex items-center gap-2">
                <FiCreditCard className="size-4 text-neutral-700" />
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  Credit / Debit Card (Visa, MasterCard, RuPay, Amex)
                </span>
              </div>
            </div>
          </label>

          {selectedMethod === "card" && (
            <div className="px-4 pb-4 pt-1 border-t border-neutral-100 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber || ""}
                  onChange={handleCardNumberChange}
                  placeholder="4111 2222 3333 4444"
                  maxLength={19}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-mono tracking-wider text-neutral-900 placeholder:font-sans placeholder:tracking-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardName || ""}
                  onChange={(e) =>
                    onPaymentDetailsChange({ cardName: e.target.value })
                  }
                  placeholder="Name as printed on card"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardExpiry || ""}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-center text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    value={paymentDetails.cardCvv || ""}
                    onChange={handleCvvChange}
                    placeholder="123"
                    maxLength={4}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-center text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            3. Net Banking
           ======================================================== */}
        <div
          className={`rounded-xl border transition-all ${
            selectedMethod === "netbanking"
              ? "border-neutral-950 bg-neutral-50/40 ring-1 ring-neutral-950"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <label className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="netbanking"
                checked={selectedMethod === "netbanking"}
                onChange={() => onSelectMethod("netbanking")}
                className="size-4 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
              />
              <div className="flex items-center gap-2">
                <FaBuildingColumns className="size-4 text-neutral-700" />
                <span className="text-xs sm:text-sm font-bold text-neutral-900">
                  Net Banking
                </span>
              </div>
            </div>
          </label>

          {selectedMethod === "netbanking" && (
            <div className="px-4 pb-4 pt-1 border-t border-neutral-100 space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">
                Select Your Bank
              </label>
              <select
                value={paymentDetails.bankName || "HDFC Bank"}
                onChange={(e) =>
                  onPaymentDetailsChange({ bankName: e.target.value })
                }
                className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:border-neutral-900 focus:outline-hidden"
              >
                {POPULAR_BANKS.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* ========================================================
            4. Cash on Delivery (COD)
           ======================================================== */}
        <div
          className={`rounded-xl border transition-all ${
            selectedMethod === "cod"
              ? "border-neutral-950 bg-neutral-50/40 ring-1 ring-neutral-950"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <label className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={selectedMethod === "cod"}
                onChange={() => onSelectMethod("cod")}
                className="size-4 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
              />
              <div className="flex items-center gap-2">
                <FiDollarSign className="size-4 text-neutral-700" />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 block">
                    Cash / Pay on Delivery
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Pay in cash or via UPI at your doorstep
                  </span>
                </div>
              </div>
            </div>
          </label>

          {selectedMethod === "cod" && (
            <div className="px-4 pb-4 pt-1 border-t border-neutral-100">
              <p className="text-xs text-neutral-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                ℹ️ Handcrafted wooden goods are securely transported in cushioned
                crates. Please keep exact cash or have your UPI app ready during
                delivery.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Security note footer */}
      <div className="mt-5 flex items-center justify-center gap-2 pt-4 border-t border-neutral-100 text-[11px] text-neutral-500">
        <FiShield className="size-3.5 text-emerald-600" />
        <span>Bank-grade 256-bit SSL encrypted &amp; verified transactions</span>
      </div>
    </div>
  );
}
