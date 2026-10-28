"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiAward,
  FiShield,
  FiEdit3,
  FiPackage,
  FiCheckCircle,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

export interface FeaturePillar {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

const defaultPillars: FeaturePillar[] = [
  {
    id: 1,
    icon: <FiAward className="size-5 text-amber-700" />,
    title: "Master Hand-Carved Artistry",
    description:
      "Every deity, sculpture, and piece is sculpted by master artisans with generational mallet and chisel heritage.",
    tag: "100% Handcrafted",
  },
  {
    id: 2,
    icon: <FiShield className="size-5 text-amber-700" />,
    title: "100% Certified Solid Hardwoods",
    description:
      "Sculpted exclusively in seasoned A-grade Teakwood, Rosewood, and Walnut. Zero MDF or synthetic veneers.",
    tag: "FSC® Certified Timber",
  },
  {
    id: 3,
    icon: <FiEdit3 className="size-5 text-amber-700" />,
    title: "Bespoke Customization",
    description:
      "From exact scripture iconography to corporate trophies and personalized gifts made to your exact dimensions.",
    tag: "Custom Commissions",
  },
  {
    id: 4,
    icon: <FiPackage className="size-5 text-amber-700" />,
    title: "Insured Zero-Damage Transit",
    description:
      "Reinforced wooden crates and multi-layer shock foam guarantee that delicate woodwork arrives in pristine condition.",
    tag: "Safe Global Delivery",
  },
];

interface WhyChooseUsProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  pillars?: FeaturePillar[];
}

export default function WhyChooseUs({
  badgeText = "Why Choose TimberCraft",
  title = "Unrivaled Heritage, Uncompromising Artistry",
  subtitle = "Rooted in timeless Indian woodworking traditions, we unite generational hand-carving techniques with heirloom-grade joinery. Every creation is an authentic testament to natural timber and human patience.",
  imageSrc = "/category/Wooden_Krishna_Lifestyle_Shot.png",
  imageAlt = "Master woodcarver craftsmanship at TimberCraft studio",
  pillars = defaultPillars,
}: WhyChooseUsProps) {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* =========================================================
              LEFT SIDE: IMAGE (HEIGHT MATCHES RIGHT CONTENT)
             ========================================================= */}
          <div className="lg:col-span-5 relative flex flex-col h-full min-h-[460px] lg:min-h-0">
            <div className="relative w-full h-full min-h-[420px] lg:min-h-0 flex-1 overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 rounded-full bg-neutral-950/85 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-md border border-white/10">
                100% Solid Natural Wood
              </div>
            </div>

            {/* Bottom Floating Experience Card */}
            <div className="absolute -bottom-5 -right-2 sm:-right-4 z-20 rounded-2xl border border-neutral-200/80 bg-white/95 p-4 sm:p-5 shadow-xl backdrop-blur-md max-w-[240px] sm:max-w-[270px]">
              <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-xs font-bold text-neutral-900">4.9 / 5.0</span>
              </div>
              <p className="text-sm font-bold text-neutral-950 leading-tight">
                25+ Years of Heritage
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                Preserving sacred Indian woodcarving & joinery traditions
              </p>
            </div>
          </div>


          <div className="lg:col-span-7 flex flex-col justify-between text-left pt-6 lg:pt-0 h-full">

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              {title}
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:border-neutral-400 hover:shadow-md"
                >
                  <div>
                    {/* Icon & Tag Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 transition-colors group-hover:bg-neutral-950 group-hover:border-neutral-950 group-hover:text-amber-400">
                        {pillar.icon}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-700">
                        <FiCheckCircle className="size-3 text-amber-700" />
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Metrics & CTA */}
            <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="grid grid-cols-3 gap-6 text-left">
                <div>
                  <span className="block text-xl font-extrabold text-neutral-950 tracking-tight">
                    25,000+
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Heirloom Pieces
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-neutral-950 tracking-tight">
                    100%
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Solid Hardwood
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-neutral-950 tracking-tight">
                    10-Year
                  </span>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Craft Warranty
                  </span>
                </div>
              </div>

              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950 hover:text-amber-800 self-start sm:self-auto"
              >
                <span>Discover Our Story</span>
                <FiArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
