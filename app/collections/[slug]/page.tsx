import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { PRODUCTS_CATALOG } from "../../products/[slug]/page";
import ProductCard from "../../components/products/ProductCard";

const COLLECTION_SLUGS = [
  "bestsellers",
  "new-arrivals",
  "divine-sculptures",
  "heritage-art",
  "custom-creations",
];

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((slug) => ({ slug }));
}

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  const readableTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const allProducts = Object.values(PRODUCTS_CATALOG);

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen pb-20 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-semibold text-neutral-500"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 hover:text-neutral-950 transition-colors"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Shop Catalog</span>
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-bold">{readableTitle}</span>
        </nav>

        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Featured Collection
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-neutral-900">
            {readableTitle}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 max-w-2xl">
            A curated showcase of masterwork timber sculptures and artisanal heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {allProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                category: product.category,
                slug: product.slug,
                price: product.price,
                originalPrice: product.originalPrice,
                rating: product.rating,
                reviewsCount: product.reviewsCount,
                image: product.images[0]?.url || "/category/Wooden_Ganesha_Shelf_Display.png",
                badge: product.badge,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
