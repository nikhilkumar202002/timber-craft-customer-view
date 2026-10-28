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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            ROW 1: 4 COLUMNS
            [1. Brand & Socials] [2. Explore] [3. Custom Creations] [4. Contact & Studio]
           ========================================================= */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          {/* Row 1 / Col 1: BRAND OVERVIEW & SOCIALS */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group w-fit"
              aria-label="TimberCraft Home"
            >
              <Image
                src="/logo/main-logo-white.png"
                alt="TimberCraft"
                width={140}
                height={44}
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <span className="text-xl font-bold tracking-wider text-white uppercase">
                TimberCraft
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-neutral-400">
              Dedicated to the timeless art of master woodworking.
            </p>

            <div className="pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-2.5">
                Connect With Our Studio
              </p>
              <div className="flex items-center gap-2">
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
                    className="flex size-8.5 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Row 1 / Col 2: EXPLORE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              Explore
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { title: "All Products", href: "/shop" },
                { title: "New Arrivals", href: "/shop/new-arrivals", badge: "New" },
                { title: "Best Sellers", href: "/shop/best-sellers", badge: "Popular" },
                { title: "Featured Collections", href: "/collections" },
                { title: "Limited Editions", href: "/collections/limited-editions" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-neutral-400 transition-colors duration-150 hover:text-white"
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

          {/* Row 1 / Col 3: CUSTOM CREATIONS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              Custom Creations
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                {
                  title: "Request Custom Art",
                  href: "/custom-artwork/request",
                  badge: "Bespoke",
                },
                { title: "Personalised Gifts", href: "/categories/personalised-gifts" },
                { title: "Corporate Orders & Trophies", href: "/custom-artwork/corporate" },
                { title: "How It Works", href: "/custom-artwork/how-it-works" },
                { title: "Commission Guidelines", href: "/custom-artwork/guidelines" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-neutral-400 transition-colors duration-150 hover:text-white"
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

          {/* Row 1 / Col 4: CONTACT & STUDIO */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              Contact & Studio
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <FiMail className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Email Inquiry
                  </span>
                  <a
                    href="mailto:care@timbercraft.com"
                    className="text-white hover:text-amber-400 transition-colors font-medium text-xs"
                  >
                    care@timbercraft.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <FiPhone className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Phone Support
                  </span>
                  <a
                    href="tel:+18002489663"
                    className="text-white hover:text-amber-400 transition-colors font-medium text-xs"
                  >
                    +1 (800) 248-WOOD (9663)
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <FiMapPin className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Workshop & Studio
                  </span>
                  <p className="text-neutral-300">
                    Artisan Woodcraft District, Suite 104
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <FiClock className="size-3.5 text-neutral-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Studio Timings
                  </span>
                  <p className="text-neutral-300">
                    Mon – Sat: 9:00 AM – 7:00 PM EST
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================
            ROW 2: 4 COLUMNS
            [1. Shop by Category] [2. Customer Care] [3. About TimberCraft] [4. Journal & Care]
           ========================================================= */}
        <div className="border-t border-neutral-800/80 grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          {/* Row 2 / Col 1: SHOP BY CATEGORY */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              Shop by Category
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-2.5 text-sm">
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
                    className="group inline-flex items-center text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 2 / Col 2: CUSTOMER CARE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              Customer Care
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { title: "Contact Us", href: "/contact" },
                { title: "FAQs & Help Center", href: "/faqs" },
                { title: "Shipping & Delivery", href: "/shipping" },
                { title: "Returns & Refunds", href: "/returns" },
                { title: "Track Your Order", href: "/track-order" },
                { title: "Payment Information", href: "/payment-info" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 2 / Col 3: ABOUT TIMBERCRAFT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              About TimberCraft
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { title: "Our Story", href: "/our-story/about" },
                { title: "Our Master Artisans", href: "/our-story/artisans" },
                { title: "Sustainable Woodcraft", href: "/our-story/craftsmanship" },
                { title: "Traditional Joinery", href: "/our-story/joinery" },
                { title: "Workshop Careers", href: "/careers" },
                { title: "Environmental Pledge", href: "/our-story/sustainability" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    <span className="transition-transform duration-150 group-hover:translate-x-1">
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 2 / Col 4: JOURNAL & CARE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              Journal & Care
              <span className="size-1 rounded-full bg-amber-500" />
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { title: "Woodworking Blog", href: "/journal/blog" },
                { title: "Timber Care & Preservation", href: "/journal/guides/care" },
                { title: "Hardwood Species Guide", href: "/journal/guides/species" },
                { title: "Artisan Carving Insights", href: "/journal/insights" },
                { title: "Customer Gallery", href: "/journal/gallery" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-neutral-400 transition-colors duration-150 hover:text-white"
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
            WE ACCEPT ROW: FULL-LENGTH ROW
            LEFT SIDE: CONTENT | RIGHT SIDE: ICONS
           ========================================================= */}
        <div className="border-t border-neutral-800/80 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left Side Content */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  We Accept
                </span>
                <span className="size-1 rounded-full bg-amber-500" />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <FiShield className="size-3" />
                  256-Bit SSL Encrypted
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All transactions are safe, encrypted, and processed through certified PCI-DSS compliant payment gateways. We support all major credit cards, debit cards, and digital wallets.
              </p>
            </div>

            {/* Right Side Icons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
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
                  className="flex h-10 min-w-13 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 transition-colors hover:border-neutral-700 hover:bg-neutral-800/90"
                >
                  {method.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT & LEGAL POLICIES BAR
           ========================================================= */}
        <div className="border-t border-neutral-800/80 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
          <p className="text-neutral-400">
            © {currentYear} <span className="text-white font-medium">TimberCraft</span>. Handcrafted with reverence and precision. All rights reserved.
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
