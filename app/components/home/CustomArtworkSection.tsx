"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiEdit3,
  FiLayers,
  FiCamera,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const steps = [
  {
    step: "01",
    title: "Share Your Vision",
    description:
      "Send us your reference photo, sketch, or rough idea along with desired dimensions and specifications.",
    icon: <FiEdit3 className="size-5 text-amber-400" />,
  },
  {
    step: "02",
    title: "Timber & Design Approval",
    description:
      "Choose from seasoned Teak, Rosewood, Walnut, or Sheesham and approve the initial concept blueprint.",
    icon: <FiLayers className="size-5 text-amber-400" />,
  },
  {
    step: "03",
    title: "Live Carving Progress",
    description:
      "Receive photo & video updates at each chisel milestone so you witness your piece taking shape.",
    icon: <FiCamera className="size-5 text-amber-400" />,
  },
  {
    step: "04",
    title: "Crated & Safely Delivered",
    description:
      "Hand-polished with natural oils, packed in custom shock-absorbing wooden crates, and insured for transit.",
    icon: <FiShield className="size-5 text-amber-400" />,
  },
];

export default function CustomArtworkSection() {
  return (
    <section className="relative w-full bg-black py-16 sm:py-20 lg:py-24 text-white border-b border-neutral-900">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADER: CENTER ALIGNED (PLAIN BLACK, NO BADGE)
           ========================================================= */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Have a Unique Vision in Mind?
            <br className="hidden sm:inline" /> Commission a Custom Masterpiece
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
            Collaborate directly with our master wood sculptors. Whether it’s a sacred deity idol, an architectural carved wall panel, commemorative corporate trophies, or custom furniture — we handcraft one-of-a-kind heirlooms to your exact dimensions.
          </p>
        </div>

        {/* =========================================================
            4 STEPS PROCESS GRID (HOW IT WORKS)
           ========================================================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950 p-6 transition-all duration-300 hover:border-neutral-800 hover:-translate-y-1 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-extrabold text-neutral-700 group-hover:text-amber-500/60 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] font-medium text-amber-400/90">
                <FiCheckCircle className="size-3.5" />
                <span>Tailored for you</span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            SHOWCASE BANNER & ACTION CALLOUT
           ========================================================= */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-950 p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text inside callout */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Ready to Create Something Extraordinary?
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Start Your Custom Commission Today
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
                Share your requirements with our design team. We offer free consultation, 3D renderings, and transparent pricing before chisel touches wood.
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="size-3.5 text-amber-400" />
                  Free 1-on-1 Consultation
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="size-3.5 text-amber-400" />
                  Photo & Video Updates
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="size-3.5 text-amber-400" />
                  100% Solid Seasoned Wood
                </span>
              </div>
            </div>

            {/* Right Buttons inside callout */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/custom-artwork/request"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-neutral-950 transition-all duration-200 hover:bg-neutral-100 hover:scale-102 active:scale-98 shadow-md"
              >
                <span>Request Custom Quote</span>
                <FiArrowRight className="size-4" />
              </Link>

              <a
                href="https://wa.me/919876543210?text=Hi%20TimberCraft,%20I'd%20like%20to%20discuss%20a%20custom%20woodcraft%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:border-emerald-600 hover:bg-emerald-950/40 hover:text-emerald-400 active:scale-98 shadow-xs"
              >
                <FaWhatsapp className="size-4 text-emerald-400" />
                <span>Chat with Master Carver</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
