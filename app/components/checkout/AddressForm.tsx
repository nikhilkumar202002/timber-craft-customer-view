"use client";

import React, { useState } from "react";
import {
  FiMapPin,
  FiUser,
  FiPhone,
  FiMail,
  FiHome,
  FiBriefcase,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import Button from "../ui/Button";

export interface AddressData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  addressType: "home" | "work" | "other";
  saveAddress: boolean;
  sameAsBilling: boolean;
}

export interface AddressFormProps {
  initialData?: Partial<AddressData>;
  onSubmit?: (data: AddressData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  showBillingToggle?: boolean;
  className?: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitButtonText = "Deliver to this Address",
  showBillingToggle = true,
  className = "",
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    pincode: initialData?.pincode || "",
    addressLine1: initialData?.addressLine1 || "",
    addressLine2: initialData?.addressLine2 || "",
    landmark: initialData?.landmark || "",
    city: initialData?.city || "",
    state: initialData?.state || "Karnataka",
    country: initialData?.country || "India",
    addressType: initialData?.addressType || "home",
    saveAddress: initialData?.saveAddress ?? true,
    sameAsBilling: initialData?.sameAsBilling ?? true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AddressData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof AddressData, boolean>>>({});

  const validateField = (field: keyof AddressData, value: string): string => {
    switch (field) {
      case "firstName":
        return !value.trim() ? "First name is required" : "";
      case "lastName":
        return !value.trim() ? "Last name is required" : "";
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) {
          return "Please enter a valid 10-digit mobile number";
        }
        return "";
      case "pincode":
        if (!value.trim()) return "PIN Code is required";
        if (!/^\d{6}$/.test(value.trim())) {
          return "Please enter a valid 6-digit PIN code";
        }
        return "";
      case "addressLine1":
        return !value.trim()
          ? "Flat, House no. or Building name is required"
          : "";
      case "addressLine2":
        return !value.trim() ? "Street, Area or Locality is required" : "";
      case "city":
        return !value.trim() ? "City / District is required" : "";
      case "state":
        return !value.trim() ? "Please select your state" : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newValue: string | boolean = type === "checkbox" ? checked : value;

    // Numerical restriction for phone (10 digits) & pincode (6 digits)
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name as keyof AddressData]) {
      const errorMsg = validateField(name as keyof AddressData, String(newValue));
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name as keyof AddressData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof AddressData, string>> = {};
    const fieldsToValidate: (keyof AddressData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "pincode",
      "addressLine1",
      "addressLine2",
      "city",
      "state",
    ];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, String(formData[field] || ""));
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, f) => ({ ...acc, [f]: true }), {})
    );

    if (Object.keys(newErrors).length === 0) {
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-7 shadow-xs ${className}`}
      noValidate
    >
      {/* Form Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
        <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-900">
          <FiMapPin className="size-4.5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">
            Shipping &amp; Delivery Address
          </h2>
          <p className="text-xs text-neutral-500">
            Where should our master woodcarvers safely deliver your order?
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Ramesh"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
                  errors.firstName && touched.firstName
                    ? "border-red-500 focus:border-red-600 bg-red-50/20"
                    : "border-neutral-200 focus:border-neutral-900"
                }`}
              />
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
            {errors.firstName && touched.firstName && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.firstName}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Sharma"
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
                errors.lastName && touched.lastName
                  ? "border-red-500 focus:border-red-600 bg-red-50/20"
                  : "border-neutral-200 focus:border-neutral-900"
              }`}
            />
            {errors.lastName && touched.lastName && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.lastName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="ramesh@example.com"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
                  errors.email && touched.email
                    ? "border-red-500 focus:border-red-600 bg-red-50/20"
                    : "border-neutral-200 focus:border-neutral-900"
                }`}
              />
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Mobile Number (10 digits) <span className="text-red-500">*</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center rounded-l-xl border border-r-0 border-neutral-200 bg-neutral-100 px-3 text-xs font-semibold text-neutral-600 select-none">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="98765 43210"
                maxLength={10}
                className={`w-full rounded-r-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
                  errors.phone && touched.phone
                    ? "border-red-500 focus:border-red-600 bg-red-50/20"
                    : "border-neutral-200 focus:border-neutral-900"
                }`}
              />
              <FiPhone className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
            </div>
            {errors.phone && touched.phone && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Address Line 1 (Flat/House No/Building) */}
        <div>
          <label
            htmlFor="addressLine1"
            className="block text-xs font-semibold text-neutral-800 mb-1.5"
          >
            Flat, House No., Apartment &amp; Building Name{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Flat 402, Oakwood Heritage Residency"
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
              errors.addressLine1 && touched.addressLine1
                ? "border-red-500 focus:border-red-600 bg-red-50/20"
                : "border-neutral-200 focus:border-neutral-900"
            }`}
          />
          {errors.addressLine1 && touched.addressLine1 && (
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
              <FiAlertCircle className="size-3" />
              <span>{errors.addressLine1}</span>
            </p>
          )}
        </div>

        {/* Row 4: Address Line 2 (Area, Street, Sector) & Landmark */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="addressLine2"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Area, Street, Sector &amp; Village{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. 14th Main, 4th Cross, Indiranagar"
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
                errors.addressLine2 && touched.addressLine2
                  ? "border-red-500 focus:border-red-600 bg-red-50/20"
                  : "border-neutral-200 focus:border-neutral-900"
              }`}
            />
            {errors.addressLine2 && touched.addressLine2 && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.addressLine2}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="landmark"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="e.g. Opposite BDA Complex / Near Metro Station"
              className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden transition-colors"
            />
          </div>
        </div>

        {/* Row 5: PIN Code, City, State */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="pincode"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              6-Digit PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="560038"
              maxLength={6}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal focus:outline-hidden transition-colors ${
                errors.pincode && touched.pincode
                  ? "border-red-500 focus:border-red-600 bg-red-50/20"
                  : "border-neutral-200 focus:border-neutral-900"
              }`}
            />
            {errors.pincode && touched.pincode && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.pincode}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              City / Town <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Bengaluru"
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden transition-colors ${
                errors.city && touched.city
                  ? "border-red-500 focus:border-red-600 bg-red-50/20"
                  : "border-neutral-200 focus:border-neutral-900"
              }`}
            />
            {errors.city && touched.city && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              State / UT <span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full rounded-xl border bg-white px-3 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-hidden transition-colors ${
                errors.state && touched.state
                  ? "border-red-500 focus:border-red-600 bg-red-50/20"
                  : "border-neutral-200 focus:border-neutral-900"
              }`}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && touched.state && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <FiAlertCircle className="size-3" />
                <span>{errors.state}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 6: Address Type Radios (Home, Work, Other) */}
        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-2">
            Address Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                id: "home",
                label: "Home",
                desc: "All Day Delivery",
                icon: FiHome,
              },
              {
                id: "work",
                label: "Office / Work",
                desc: "10 AM - 6 PM",
                icon: FiBriefcase,
              },
              {
                id: "other",
                label: "Other",
                desc: "Anytime",
                icon: FiMapPin,
              },
            ].map((type) => {
              const isSelected = formData.addressType === type.id;
              const Icon = type.icon;
              return (
                <label
                  key={type.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-neutral-950 bg-neutral-950/5 ring-1 ring-neutral-950"
                      : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="addressType"
                    value={type.id}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`size-4 ${
                        isSelected ? "text-neutral-950" : "text-neutral-400"
                      }`}
                    />
                    <div>
                      <span className="block text-xs font-bold text-neutral-900">
                        {type.label}
                      </span>
                      <span className="hidden sm:block text-[10px] text-neutral-500">
                        {type.desc}
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Row 7: Checkbox Preferences */}
        <div className="pt-2 space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="saveAddress"
              checked={formData.saveAddress}
              onChange={handleChange}
              className="size-4 rounded-md border-neutral-300 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
            />
            <span className="text-xs text-neutral-700">
              Save this address for fast 1-click checkout on future orders
            </span>
          </label>

          {showBillingToggle && (
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="sameAsBilling"
                checked={formData.sameAsBilling}
                onChange={handleChange}
                className="size-4 rounded-md border-neutral-300 text-neutral-950 focus:ring-neutral-950 accent-neutral-950"
              />
              <span className="text-xs text-neutral-700">
                Billing address matches this shipping address
              </span>
            </label>
          )}
        </div>

        {/* Submit & Cancel Actions */}
        <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-neutral-100">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              size="md"
              rounded="xl"
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            rounded="xl"
            isLoading={isSubmitting}
            leftIcon={<FiCheck className="size-4" />}
            className="w-full sm:w-auto"
          >
            {submitButtonText}
          </Button>
        </div>
      </div>
    </form>
  );
}
