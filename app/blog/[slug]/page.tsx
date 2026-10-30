import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";

const BLOG_SLUGS = [
  "care-for-teak-wood-sculptures",
  "traditional-indian-woodcarving-heritage",
  "art-of-sustainable-timber-harvesting",
];

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const readableTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen pb-20 pt-8 sm:pt-12">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-semibold text-neutral-500"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 hover:text-neutral-950 transition-colors"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Journal &amp; Care</span>
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-bold truncate max-w-xs">{readableTitle}</span>
        </nav>

        <header className="space-y-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Artisan Journal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {readableTitle}
          </h1>
          <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2 border-b border-neutral-200 pb-4">
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar className="size-3.5" />
              <span>October 2026</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock className="size-3.5" />
              <span>5 Min Read</span>
            </span>
            <span>•</span>
            <span>TimberCraft Master Guild</span>
          </div>
        </header>

        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            Authentic seasoned hardwood artifacts carry a living warmth that endures across generations. Every grain line and chisel relief responds to natural surroundings, aging into deep golden patinas when cared for properly.
          </p>
          <p>
            In our master woodcarving studios, timber is seasoned naturally for over twenty-four months to achieve dimensional equilibrium before chisel touches wood. Maintaining natural humidity and using pure botanical waxes ensures lifelong luster.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200">
          <Link
            href="/shop"
            className="text-xs font-bold text-amber-900 hover:text-neutral-950 transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Discover Handcrafted Sculptures in Our Shop</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
