"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#0c0c0e] text-neutral-300 border-t border-neutral-800/80">
      {/* Container with max-width and generous padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            TIER 1: BRAND OVERVIEW & PRIMARY EXPLORATION
           ========================================================= */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3 lg:gap-16">
          {/* Col 1: Brand Info & Socials */}
          <div className="flex flex-col space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group w-fit"
              aria-label="WoodArtis Home"
            >
              <Image
                src="/logo/main-logo-white.png"
                alt="WoodArtis"
                width={140}
                height={44}
                className="h-9 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
             
            </Link>

            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Dedicated to the timeless art of master woodworking.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                Connect With Our Studio
              </p>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    name: "Instagram",
                    icon: <FaInstagram className="size-4" />,
                    href: "https://instagram.com",
                  },
                  {
                    name: "Facebook",
                    icon: <FaFacebookF className="size-3.5" />,
                    href: "https://facebook.com",
                  },
                  {
                    name: "Pinterest",
                    icon: <FaPinterestP className="size-4" />,
                    href: "https://pinterest.com",
                  },
                  {
                    name: "YouTube",
                    icon: <FaYoutube className="size-4" />,
                    href: "https://youtube.com",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className="flex size-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: EXPLORE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              Explore
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3">
              {[
                { title: "All Products", href: "/shop" },
                { title: "New Arrivals", href: "/shop/new-arrivals", badge: "New" },
                { title: "Best Sellers", href: "/shop/best-sellers", badge: "Popular" },
                { title: "Collections", href: "/collections" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: CUSTOM CREATIONS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              Custom Creations
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3">
              {[
                {
                  title: "Request Custom Art",
                  href: "/custom-artwork/request",
                  badge: "Bespoke",
                },
                { title: "Personalised Gifts", href: "/categories/personalised-gifts" },
                { title: "Corporate Orders", href: "/custom-artwork/corporate" },
                { title: "How It Works", href: "/custom-artwork/how-it-works" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =========================================================
            TIER 2: CATEGORIES, CUSTOMER CARE & ABOUT WOODARTIS
           ========================================================= */}
        <div className="border-t border-neutral-800/80 grid grid-cols-1 gap-10 py-12 md:grid-cols-3 lg:gap-16">
          {/* Col 1: SHOP BY CATEGORY */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              Shop by Category
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3">
              {[
                { title: "Idols & Sculptures", href: "/categories/idols-sculptures" },
                { title: "Trophies & Awards", href: "/categories/trophies-awards" },
                { title: "Wall Hangings", href: "/categories/wall-hangings" },
                { title: "Wooden Home Decor", href: "/categories/home-decor" },
                { title: "Personalised Gifts", href: "/categories/personalised-gifts" },
                { title: "Wooden Sculptures", href: "/categories/wooden-sculptures" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: CUSTOMER CARE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              Customer Care
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3">
              {[
                { title: "Contact Us", href: "/contact" },
                { title: "FAQs", href: "/faqs" },
                { title: "Shipping & Delivery", href: "/shipping" },
                { title: "Returns & Refunds", href: "/returns" },
                { title: "Track Your Order", href: "/track-order" },
                { title: "Payment Information", href: "/payment-info" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: ABOUT WOODARTIS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              About WoodArtis
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3">
              {[
                { title: "Our Story", href: "/our-story/about" },
                { title: "Our Artisans", href: "/our-story/artisans" },
                { title: "Craftsmanship", href: "/our-story/craftsmanship" },
                { title: "Materials & Care", href: "/journal/guides/care" },
                { title: "Journal / Blog", href: "/journal/blog" },
                { title: "Careers", href: "/careers" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =========================================================
            TIER 3: WE ACCEPT, FOLLOW US & DIRECT CONTACT
           ========================================================= */}
        <div className="border-t border-neutral-800/80 grid grid-cols-1 gap-10 py-12 md:grid-cols-3 lg:gap-16">
          {/* Col 1: WE ACCEPT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              We Accept
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              All transactions are secured with military-grade 256-bit SSL encryption.
            </p>
            {/* Payment Method Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "Visa", icon: <FaCcVisa className="size-6 text-neutral-200" /> },
                {
                  label: "Mastercard",
                  icon: <FaCcMastercard className="size-6 text-neutral-200" />,
                },
                { label: "Amex", icon: <FaCcAmex className="size-6 text-neutral-200" /> },
                {
                  label: "Apple Pay",
                  icon: <FaApplePay className="size-6 text-neutral-200" />,
                },
                {
                  label: "Google Pay",
                  icon: <FaGooglePay className="size-6 text-neutral-200" />,
                },
                {
                  label: "PayPal",
                  icon: <FaCcPaypal className="size-6 text-neutral-200" />,
                },
              ].map((method) => (
                <div
                  key={method.label}
                  title={method.label}
                  className="flex h-9 min-w-12 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 transition-colors hover:border-neutral-700"
                >
                  {method.icon}
                </div>
              ))}
            </div>

            {/* Secure Checkout Pill */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-900/40 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-400">
              <FiShield className="size-3.5 shrink-0" />
              <span>Verified 256-Bit SSL Secure Checkout</span>
            </div>
          </div>

          {/* Col 2: FOLLOW US */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              Follow Us
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Join our woodworking community for behind-the-scenes carving sessions & studio tours.
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: "Instagram",
                  handle: "@woodartis.studio",
                  href: "https://instagram.com",
                  icon: <FaInstagram className="size-4 text-neutral-400" />,
                },
                {
                  name: "Facebook",
                  handle: "WoodArtis Official",
                  href: "https://facebook.com",
                  icon: <FaFacebookF className="size-3.5 text-neutral-400" />,
                },
                {
                  name: "Pinterest",
                  handle: "@woodartis_crafts",
                  href: "https://pinterest.com",
                  icon: <FaPinterestP className="size-4 text-neutral-400" />,
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-2.5 transition-all hover:border-neutral-700 hover:bg-neutral-900/80"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-neutral-500">{item.handle}</p>
                      </div>
                    </div>
                    <FiArrowUpRight className="size-3.5 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: CONTACT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              Contact
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3.5 text-sm text-neutral-400">
              {/* Email */}
              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 mt-0.5">
                  <FiMail className="size-3.5" />
                </span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Email Inquiry
                  </span>
                  <a
                    href="mailto:care@woodartis.com"
                    className="text-xs font-medium text-white transition-colors hover:text-amber-400"
                  >
                    care@woodartis.com
                  </a>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 mt-0.5">
                  <FiPhone className="size-3.5" />
                </span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Call / WhatsApp
                  </span>
                  <a
                    href="tel:+18002489663"
                    className="text-xs font-medium text-white transition-colors hover:text-amber-400"
                  >
                    +1 (800) 248-WOOD (9663)
                  </a>
                </div>
              </li>

              {/* Business Address */}
              <li className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 mt-0.5">
                  <FiMapPin className="size-3.5" />
                </span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Workshop & Studio
                  </span>
                  <p className="text-xs leading-relaxed text-neutral-300">
                    Artisan Woodcraft District, Suite 104, Craft Village Road
                  </p>
                </div>
              </li>

              {/* Workshop Hours */}
              <li className="flex items-start gap-3 pt-1">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 mt-0.5">
                  <FiClock className="size-3.5" />
                </span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Studio Timings
                  </span>
                  <p className="text-xs text-neutral-300">
                    Mon – Sat: 9:00 AM – 7:00 PM EST
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================
            TIER 4: COPYRIGHT & LEGAL POLICIES BAR
           ========================================================= */}
        <div className="border-t border-neutral-800/80 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
          <p className="text-neutral-400">
            © {currentYear} <span className="text-white font-medium">WoodArtis</span>. Handcrafted with reverence and precision. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-neutral-300"
            >
              Privacy Policy
            </Link>
            <span className="text-neutral-700" aria-hidden="true">•</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-neutral-300"
            >
              Terms of Service
            </Link>
            <span className="text-neutral-700" aria-hidden="true">•</span>
            <Link
              href="/refund-policy"
              className="transition-colors hover:text-neutral-300"
            >
              Refund Policy
            </Link>
            <span className="text-neutral-700" aria-hidden="true">•</span>
            <Link
              href="/sitemap"
              className="transition-colors hover:text-neutral-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
