import React, { Suspense } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiStar,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiCheck,
  FiShoppingBag,
  FiFeather,
  FiAward,
} from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import ProductGallery, {
  GalleryImage,
} from "../../components/products/ProductGallery";
import ProductCard from "../../components/products/ProductCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { ProductDetailSkeleton } from "../../components/ui/Skeleton";

export interface CatalogProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  woodSpecies: string;
  dimensions: string;
  finish: string;
  weight?: string;
  dispatchTime?: string;
  description: string;
  story?: string;
  highlights: string[];
  images: GalleryImage[];
}

export const PRODUCTS_CATALOG: Record<string, CatalogProduct> = {
  "teak-wood-ganesha-idol": {
    id: 1,
    slug: "teak-wood-ganesha-idol",
    name: "Handcrafted Teak Wood Lord Ganesha Idol",
    category: "Wooden Idols & Deities",
    price: 14999,
    originalPrice: 18500,
    rating: 5.0,
    reviewsCount: 48,
    badge: "Bestseller",
    woodSpecies: "Solid Burma Teak (Seasoned 24 Months)",
    dimensions: '12" Height × 8" Width × 5" Depth',
    finish: "Natural Antique Wax Polish",
    weight: "3.2 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "Finely sculpted from single-block seasoned Burma Teak, this sacred Lord Ganesha idol embodies auspicious beginnings and supreme artisanal mastery with deep chisel relief carvings and intricate jewelry motifs.",
    story:
      "Handcrafted by generational artisans in Karnataka using centuries-old temple sculpting techniques. Each curvature of the modak, trunk, and ceremonial prabhavali reflects patient hand chiseling.",
    highlights: [
      "100% Solid Single-Piece Burma Teak Wood",
      "Hand-rubbed organic beeswax and natural botanical seal",
      "Termite-resistant, seasoned for extreme climatic durability",
      "Comes with an artisan authenticity certificate & serial mark",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: "Handcrafted Teak Wood Lord Ganesha Idol - Front View",
        label: "Main Altar View",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Artisan Chisel and Wood Grain Detail",
        label: "Artisan Workshop",
      },
      {
        id: 3,
        url: "/category/Wooden_Krishna_Lifestyle_Shot.png",
        alt: "Lord Ganesha Sculpture - Intricate Relief",
        label: "Chisel Detail",
      },
      {
        id: 4,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Lord Ganesha in Living Sanctuary Setting",
        label: "In-Situ Lifestyle",
      },
    ],
  },

  "artisan-carved-krishna-figurine": {
    id: 2,
    slug: "artisan-carved-krishna-figurine",
    name: "Artisan Carved Lord Krishna Figurine",
    category: "Wooden Sculptures",
    price: 19499,
    originalPrice: 24000,
    rating: 4.9,
    reviewsCount: 36,
    badge: "Featured",
    woodSpecies: "Solid Burma Teak & Malabar Teak",
    dimensions: '15" Height × 7" Width × 6" Depth',
    finish: "Natural Antique Wax Polish",
    weight: "3.8 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "An ethereal representation of Lord Krishna standing in tribhanga pose, playing his sacred bansuri flute. Sculpted with fluid fabric drape lines and lifelike facial serenity.",
    story:
      "Crafted from high-density heartwood to preserve minute facial expressions, delicate hand postures, and floral wreaths that sway organically around the deity.",
    highlights: [
      "Sculpted in classical Tribhanga three-bend posture",
      "Exquisite drape ripples and peacock feather crown carving",
      "Silken hand-polished finish with zero synthetic chemicals",
      "Custom velvet-lined heirloom presentation crate",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Krishna_Lifestyle_Shot.png",
        alt: "Artisan Carved Lord Krishna Figurine - Full Portrait",
        label: "Front Profile",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Lord Krishna Figurine - Hand Chiseled Hardwood Base",
        label: "Base & Carving",
      },
      {
        id: 3,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: "Krishna Sculpture on Home Shrine",
        label: "Display Setup",
      },
      {
        id: 4,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Artisan Krishna Figurine in Natural Daylight",
        label: "Natural Light",
      },
    ],
  },

  "goddess-lakshmi-hardwood-murti": {
    id: 3,
    slug: "goddess-lakshmi-hardwood-murti",
    name: "Goddess Lakshmi Sacred Hardwood Murti",
    category: "Wooden Idols & Deities",
    price: 16999,
    originalPrice: 21000,
    rating: 5.0,
    reviewsCount: 52,
    badge: "Exclusive",
    woodSpecies: "Sacred Sandalwood & Red Cedar",
    dimensions: '11" Height × 7.5" Width × 4.5" Depth',
    finish: "Hand-Rubbed Matte Poly",
    weight: "2.9 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "Evoke divine prosperity and spiritual abundance with this handcrafted Goddess Lakshmi idol, intricately detailed with blossoming lotus pedestals and cascading abhaya mudra motifs.",
    story:
      "The lotus pedestal features individually undercut petals carved inward to give real dimensional elevation. Symbolizes purity, auspicious wealth, and peace.",
    highlights: [
      "Padmasana posture over a multi-layered carved lotus",
      "Aromatic wood treatment with natural herbal oils",
      "Symmetrical facial alignment for traditional pooja sanctity",
      "Includes gold foil embossed sanctum care card",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Goddess Lakshmi Sacred Hardwood Murti - Front Pose",
        label: "Sanctum View",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Lotus Pedestal Chisel Detail",
        label: "Lotus Base Detail",
      },
      {
        id: 3,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: "Pooja Room Sanctum Arrangement",
        label: "Temple Shrine",
      },
      {
        id: 4,
        url: "/category/Wooden_Elephant_Lifestyle.png",
        alt: "Goddess Lakshmi with Brass & Wood Accessories",
        label: "Decor Pairing",
      },
    ],
  },

  "royal-heritage-wooden-elephant": {
    id: 4,
    slug: "royal-heritage-wooden-elephant",
    name: "Royal Heritage Hand-Carved Wooden Elephant",
    category: "Wooden Sculptures",
    price: 12499,
    originalPrice: 15500,
    rating: 4.9,
    reviewsCount: 41,
    badge: "Artisan Choice",
    woodSpecies: "Rosewood (Sheesham)",
    dimensions: '10" Height × 14" Width × 6" Depth',
    finish: "Natural Antique Wax Polish",
    weight: "4.5 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "A tribute to royal majesty and regal strength, this Indian elephant sculpture showcases intricate jali lattice work, flowing ceremonial howdah drapery, and polished wooden tusks.",
    story:
      "Hand-chiseled from heavy dark Indian rosewood, famed for its deep contrasting grain patterns and resonant density. The open lattice under the abdomen requires over 30 hours of micro-drilling and filing.",
    highlights: [
      "Traditional Indian royal jali lattice carving",
      "Rich Sheesham rosewood natural duotone grain",
      "Subtle brass nail head accents on ceremonial saddle",
      "Perfect centerpiece for consoles, libraries, and boardrooms",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Elephant_Lifestyle.png",
        alt: "Royal Heritage Hand-Carved Wooden Elephant",
        label: "Main Profile",
      },
      {
        id: 2,
        url: "/banners/Handcrafted-Wooden-Essentials-Hero-Banner.jpg",
        alt: "Elephant Sculpture on Solid Wood Console",
        label: "Console Display",
      },
      {
        id: 3,
        url: "/category/Wooden_Chopping_Board_Overhead.png",
        alt: "Top Angle View of Jali Trunk Work",
        label: "Top Jali Pattern",
      },
      {
        id: 4,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Artisan Carving the Elephant Tusks",
        label: "Crafting Process",
      },
    ],
  },

  "organic-end-grain-walnut-board": {
    id: 5,
    slug: "organic-end-grain-walnut-board",
    name: "Organic End-Grain Walnut Serving & Cutting Board",
    category: "Home Decor",
    price: 3999,
    originalPrice: 5200,
    rating: 4.8,
    reviewsCount: 64,
    badge: "Top Rated",
    woodSpecies: "American Black Walnut & Hard Maple",
    dimensions: '18" Length × 12" Width × 1.75" Thickness',
    finish: "Food-Grade Mineral Oil & Organic Beeswax",
    weight: "3.1 kg",
    dispatchTime: "Ready for dispatch within 24 hours",
    description:
      "Crafted for culinary connoisseurs, this end-grain board preserves knife sharpness while presenting a stunning mosaic of natural walnut grain rings. Reversible for prep and elegant cheese presentations.",
    story:
      "End-grain construction aligns wood fibers vertically so knife blades slip between fibers rather than cutting them, making it naturally self-healing and bacteria resistant.",
    highlights: [
      "End-grain vertical fiber alignment for heirloom longevity",
      "Recessed finger grip handles and perimeter juice groove",
      "Triple conditioned with certified food-safe mineral oil",
      "Rubberized anti-slip solid brass footings included",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Chopping_Board_Overhead.png",
        alt: "Organic End-Grain Walnut Serving & Cutting Board - Overhead",
        label: "Overhead Grain",
      },
      {
        id: 2,
        url: "/banners/Handcrafted-Wooden-Essentials-Hero-Banner.jpg",
        alt: "Walnut Board in Gourmet Kitchen Setting",
        label: "Kitchen In-Use",
      },
      {
        id: 3,
        url: "/category/Wooden_Elephant_Lifestyle.png",
        alt: "Serving Board with Artisanal Dining Accents",
        label: "Serving Display",
      },
      {
        id: 4,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "End Grain Joinery & Beveled Edge Detail",
        label: "Joinery Edge",
      },
    ],
  },

  "bespoke-blessing-ganesha-altar": {
    id: 6,
    slug: "bespoke-blessing-ganesha-altar",
    name: "Bespoke Blessing Ganesha Altar Sculpture",
    category: "Wooden Idols & Deities",
    price: 15499,
    originalPrice: 19000,
    rating: 5.0,
    reviewsCount: 29,
    badge: "Handmade",
    woodSpecies: "Solid Burma Teak",
    dimensions: '14" Height × 9" Width × 5.5" Depth',
    finish: "24K Gold Leaf Embellished",
    weight: "3.6 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "An architectural home altar carving featuring an arched prabhavali aureole frame and 24K gold foil delicate accents adorning Lord Ganesha with sanctified presence.",
    story:
      "Designed as a standalone temple sanctum, the outer frame features floral vine reliefs that frame the seated deity under the kalasha crown.",
    highlights: [
      "Integrated ornamental prabhavali archway",
      "Genuine 24K gold leaf guilding on crown and modak",
      "Oven-cured moisture-sealed Burma Teak",
      "Pre-fitted with concealed brass wall hanging anchors",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: "Bespoke Blessing Ganesha Altar Sculpture",
        label: "Altar Profile",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Arch Prabhavali Gold Leaf Work",
        label: "Gold Leaf Accents",
      },
      {
        id: 3,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Home Mandir Placement",
        label: "Home Mandir",
      },
    ],
  },

  "flute-playing-krishna-carving": {
    id: 7,
    slug: "flute-playing-krishna-carving",
    name: "Flute Playing Divine Krishna Wood Carving",
    category: "Wooden Wall Art",
    price: 21999,
    originalPrice: 26500,
    rating: 4.9,
    reviewsCount: 33,
    badge: "Limited",
    woodSpecies: "Rosewood (Sheesham)",
    dimensions: '24" Height × 16" Width × 3" Depth',
    finish: "Hand-Rubbed Matte Poly",
    weight: "5.4 kg",
    dispatchTime: "Dispatched in 48 hours in wooden crate",
    description:
      "High-relief wall sculpture capturing the transcendental melody of Sri Krishna amidst forest flora and gentle peacock accents with panoramic depth.",
    story:
      "Carved with 3-dimensional multi-plane relief carving techniques where foregound figures protrude up to 3 inches from the solid wood panel backdrop.",
    highlights: [
      "Deep relief carving with 3D foreground pop-out",
      "Intricate peacock feathers and kadamba tree foliage",
      "Treated with insecticidal and anti-fungal organic cedar oils",
      "Signature of Master Sculptor chiseled into rear seal",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Krishna_Lifestyle_Shot.png",
        alt: "Flute Playing Divine Krishna Wood Carving",
        label: "Relief Wall Art",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Hand-Chiseled Peacock Feathers and Foliage",
        label: "Relief Carving",
      },
      {
        id: 3,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Wall Art in Living Room Setting",
        label: "Living Room Wall",
      },
    ],
  },

  "opulent-lakshmi-prosperity-statue": {
    id: 8,
    slug: "opulent-lakshmi-prosperity-statue",
    name: "Opulent Lakshmi Prosperity Wooden Statue",
    category: "Wooden Idols & Deities",
    price: 17999,
    originalPrice: 22000,
    rating: 5.0,
    reviewsCount: 45,
    badge: "Bestseller",
    woodSpecies: "Solid Burma Teak",
    dimensions: '13" Height × 8.5" Width × 5" Depth',
    finish: "24K Gold Leaf Embellished",
    weight: "3.4 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "A radiant Lakshmi idol seated in padmasana upon an eight-petaled lotus, adorned with traditional temple jewellery motifs and opulent gold foil borders.",
    story:
      "Every detail from the goddess's ornate mukut crown to the twin elephants offering abhishekam was drafted following sacred Shilpa Shastra proportions.",
    highlights: [
      "Sacred Shilpa Shastra iconographic proportions",
      "High-luster natural teak finish with gold highlight edges",
      "Hand-carved coin shower from her divine right palm",
      "Includes consecrated copper yantra embedded at the base",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Opulent Lakshmi Prosperity Wooden Statue",
        label: "Front Sacred View",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Jewellery and Garland Chisel Relief",
        label: "Gilded Highlights",
      },
      {
        id: 3,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: "Prosperity Altar Arrangement",
        label: "Altar Display",
      },
    ],
  },

  "ambabari-majestic-elephant-statue": {
    id: 9,
    slug: "ambabari-majestic-elephant-statue",
    name: "Handcrafted Ambabari Majestic Elephant Statue",
    category: "Wooden Sculptures",
    price: 13999,
    originalPrice: 17500,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Trending",
    woodSpecies: "Indian Mahogany",
    dimensions: '12" Height × 16" Width × 7" Depth',
    finish: "Natural Antique Wax Polish",
    weight: "4.8 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "Inspired by the royal Dasara processions of Mysore, this Ambabari statue features an ornate ceremonial howdah, royal trappings, and hand-carved floral bells.",
    story:
      "The elephant's poised stride and raised trunk symbolize triumphant victory and welcome good fortune into the entryway or executive salon.",
    highlights: [
      "Royal Mysore Dasara procession-inspired sculpture",
      "Hand-chiseled bell garland drapery and head ornaments",
      "Heavy weighted mahogany wood for commanding presence",
      "Triple-buffed wax finish highlighting deep red wood tones",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Elephant_Lifestyle.png",
        alt: "Handcrafted Ambabari Majestic Elephant Statue",
        label: "Procession Profile",
      },
      {
        id: 2,
        url: "/banners/Handcrafted-Wooden-Essentials-Hero-Banner.jpg",
        alt: "Ceremonial Howdah Top Detail",
        label: "Howdah Detail",
      },
      {
        id: 3,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Hand-Carved Bell Garlands",
        label: "Artisan Chisel",
      },
    ],
  },

  "artisan-hand-turned-hardwood-platter": {
    id: 10,
    slug: "artisan-hand-turned-hardwood-platter",
    name: "Artisan Hand-Turned Hardwood Platter & Tray",
    category: "Home Decor",
    price: 4499,
    originalPrice: 5800,
    rating: 4.8,
    reviewsCount: 27,
    badge: "New Drop",
    woodSpecies: "Himalayan Cedar & Teak",
    dimensions: '14" Diameter × 2" Rim Height',
    finish: "Food-Grade Mineral Oil",
    weight: "1.6 kg",
    dispatchTime: "Ready for dispatch within 24 hours",
    description:
      "Hand-turned on vintage lathe machines from seasoned Himalayan cedar blocks, this tactile centerpiece platter is ideal for fruit, bread, or artisanal dry delicacies.",
    story:
      "Preserves the natural aromatic cedar oils that give this wood its distinct subtle fragrance and natural moisture-repellent qualities.",
    highlights: [
      "Single-piece seamless wood turning without joints",
      "Elevated rim profile for smooth dining table serving",
      "Non-toxic 100% plant-based finish",
      "Reversible aesthetic display with organic contouring",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Chopping_Board_Overhead.png",
        alt: "Artisan Hand-Turned Hardwood Platter & Tray",
        label: "Centerpiece View",
      },
      {
        id: 2,
        url: "/banners/Handcrafted-Wooden-Essentials-Hero-Banner.jpg",
        alt: "Turned Timber Rings and Lip Detail",
        label: "Lathe Rings",
      },
      {
        id: 3,
        url: "/category/Wooden_Elephant_Lifestyle.png",
        alt: "Platter Styled on Rustic Dining Table",
        label: "Table Setting",
      },
    ],
  },

  "corporate-heritage-teakwood-trophy": {
    id: 11,
    slug: "corporate-heritage-teakwood-trophy",
    name: "Corporate Heritage Teakwood Trophy Plaque",
    category: "Trophies & Awards",
    price: 6499,
    originalPrice: 7900,
    rating: 4.9,
    reviewsCount: 19,
    badge: "Corporate",
    woodSpecies: "Solid Burma Teak",
    dimensions: '10" Height × 8" Width × 2.5" Base',
    finish: "Hand-Rubbed Matte Poly",
    weight: "1.9 kg",
    dispatchTime: "Custom engraving dispatch within 3–4 days",
    description:
      "Dignified executive memento combining natural grain teakwood with brushed brass inlay space for custom laser engraving and corporate honor roll recognition.",
    story:
      "Replaces disposable synthetic acrylic awards with an authentic timber trophy that conveys true distinction, permanence, and sustainability.",
    highlights: [
      "Solid architectural Burma Teak stepped pedestal",
      "Custom laser etching and UV print compatible plate area",
      "Weighted bronze alloy weighted insert for stability",
      "Volume institutional and bulk corporate ordering discounts",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: "Corporate Heritage Teakwood Trophy Plaque",
        label: "Award Display",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Laser Engraving Surface & Beveled Edges",
        label: "Beveled Edges",
      },
      {
        id: 3,
        url: "/banners/Handcrafted-Wooden-Essentials-Hero-Banner.jpg",
        alt: "Trophy in Corporate Boardroom",
        label: "Executive Setting",
      },
    ],
  },

  "sacred-mandala-wooden-wall-art": {
    id: 12,
    slug: "sacred-mandala-wooden-wall-art",
    name: "Sacred Mandala Wooden Wall Art Panel",
    category: "Wooden Wall Art",
    price: 28999,
    originalPrice: 34000,
    rating: 5.0,
    reviewsCount: 16,
    badge: "Exclusive",
    woodSpecies: "Sacred Sandalwood & Teak",
    dimensions: '30" Diameter × 2" Relief Depth',
    finish: "24K Gold Leaf Embellished",
    weight: "7.2 kg",
    dispatchTime: "Dispatched in heavy-duty wooden crate",
    description:
      "A mesmerizing radial mandala carved in high relief with concentric geometric petals and floral filigree, radiating harmony, sacred geometry, and tranquility.",
    story:
      "Requires over 85 hours of meticulous artisan hand carving. Each concentric ring of the Sri Yantra-inspired mandala expands in sacred mathematical symmetry.",
    highlights: [
      "High relief 30-inch circular statement panel",
      "Concentric geometric petals chiseled into solid hardwood",
      "Subtle 24K gold foil central bindu highlight",
      "Includes professional French cleat heavy-duty wall bracket",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Krishna_Lifestyle_Shot.png",
        alt: "Sacred Mandala Wooden Wall Art Panel",
        label: "Radial Overview",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Concentric Geometric Petal Details",
        label: "Petal Filigree",
      },
      {
        id: 3,
        url: "/category/Wooden_Lakshmi_Lifestyle.png",
        alt: "Focal Statement Piece on Wall",
        label: "Foyer Accent",
      },
    ],
  },
};

export interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS_CATALOG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS_CATALOG[slug];

  if (product) {
    return {
      title: `${product.name} | TimberCraft Handcrafted Arts`,
      description: product.description,
    };
  }

  const readableTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${readableTitle} | TimberCraft Handcrafted Arts`,
    description:
      "Discover authentic, heirloom-quality wooden sculptures and bespoke decor handcrafted by master artisans at TimberCraft.",
  };
}

async function ProductDetailsContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Lookup in catalog, or generate fallback object
  const product = PRODUCTS_CATALOG[slug] || {
    id: 99,
    slug,
    name: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    category: "Handcrafted Woodwork",
    price: 14999,
    originalPrice: 18500,
    rating: 5.0,
    reviewsCount: 32,
    badge: "Artisan Handcrafted",
    woodSpecies: "Solid Burma Teak (Seasoned 24 Months)",
    dimensions: '12" Height × 8" Width × 5" Depth',
    finish: "Natural Antique Wax Polish",
    weight: "3.2 kg",
    dispatchTime: "Ready for dispatch within 24–48 hours",
    description:
      "A magnificent heirloom-grade wooden creation, meticulously hand-chiseled by master artisans using premium timber, seasoned for enduring strength and finished with botanical oils.",
    story:
      "Every curve and line honors centuries of traditional woodworking craft, transforming sustainable seasoned hardwoods into timeless home sanctum treasures.",
    highlights: [
      "100% Solid Natural Seasoned Hardwood",
      "Hand-chiseled by generational master artisans",
      "Finished with organic botanical waxes",
      "Insured dispatch in bespoke wooden shipping crates",
    ],
    images: [
      {
        id: 1,
        url: "/category/Wooden_Ganesha_Shelf_Display.png",
        alt: `${slug} display photo`,
        label: "Front Display",
      },
      {
        id: 2,
        url: "/banners/wooden_art_banner_2000x900.jpg",
        alt: "Artisan workshop crafting view",
        label: "Artisan Workshop",
      },
      {
        id: 3,
        url: "/category/Wooden_Krishna_Lifestyle_Shot.png",
        alt: "Wood grain and chisel marks",
        label: "Grain Details",
      },
    ],
  };

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Related products (exclude current)
  const relatedProducts = Object.values(PRODUCTS_CATALOG)
    .filter((p) => p.slug !== slug)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      slug: p.slug,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      image: p.images[0]?.url || "/category/Wooden_Ganesha_Shelf_Display.png",
      badge: p.badge,
    }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Navigation Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-500"
      >
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 hover:text-neutral-950 transition-colors"
        >
          <FiArrowLeft className="size-3.5" />
          <span>Shop Catalog</span>
        </Link>
        <span>/</span>
        <span className="text-neutral-400">{product.category}</span>
        <span>/</span>
        <span className="text-neutral-900 truncate max-w-xs sm:max-w-md font-bold">
          {product.name}
        </span>
      </nav>

      {/* Product Hero Layout: Left Gallery, Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Product Gallery Grid */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            badge={product.badge}
          />
        </div>

        {/* Right Column: Product Information & Purchase Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                {product.category}
              </span>
              {product.badge && (
                <Badge variant="warning" size="xs">
                  {product.badge}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="font-bold text-neutral-900">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-neutral-400">
                • {product.reviewsCount} Verified Artisan Reviews
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-y border-neutral-200/80 py-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="flex items-center text-3xl sm:text-4xl font-black text-neutral-950">
                <FaIndianRupeeSign className="size-6 mr-1 inline-block" />
                {product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <span className="flex items-center text-base sm:text-lg text-neutral-400 line-through">
                  <FaIndianRupeeSign className="size-3.5 mr-0.5 inline-block" />
                  {product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {discountPercent > 0 && (
                <Badge variant="discount" size="sm">
                  {discountPercent}% Off
                </Badge>
              )}
            </div>
            <p className="mt-1.5 text-xs text-neutral-500">
              Includes all GST taxes, insured domestic packaging &amp; artisan authenticity mark.
            </p>
          </div>

          {/* Short Narrative Description */}
          <p className="text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>

          {/* Timber Specifications Card */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-5 space-y-3 text-xs text-neutral-700 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <FiFeather className="size-3.5 text-amber-800" />
              <span>Material &amp; Craftsmanship Specs</span>
            </h3>

            <div className="divide-y divide-neutral-100 space-y-2">
              <div className="flex justify-between pt-1">
                <span className="text-neutral-500">Wood Species:</span>
                <span className="font-bold text-neutral-900 text-right">
                  {product.woodSpecies}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-neutral-500">Dimensions:</span>
                <span className="font-semibold text-neutral-900 text-right">
                  {product.dimensions}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-neutral-500">Artisan Finish:</span>
                <span className="font-semibold text-neutral-900 text-right">
                  {product.finish}
                </span>
              </div>
              {product.weight && (
                <div className="flex justify-between pt-2">
                  <span className="text-neutral-500">Approx. Weight:</span>
                  <span className="font-semibold text-neutral-900 text-right">
                    {product.weight}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* In-Stock & Dispatch Status */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/70 rounded-xl p-3.5">
            <FiCheck className="size-4.5 text-emerald-600 shrink-0" />
            <span>
              In Stock • {product.dispatchTime || "Ready for dispatch within 24–48 hours"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            <Button
              href="/cart"
              variant="primary"
              size="lg"
              rounded="xl"
              fullWidth
              leftIcon={<FiShoppingBag className="size-4.5" />}
            >
              Add to Cart • ₹{product.price.toLocaleString("en-IN")}
            </Button>

            <Button
              href={`/checkout?product=${encodeURIComponent(product.slug)}`}
              variant="secondary"
              size="lg"
              rounded="xl"
              fullWidth
            >
              Buy Now with 1-Click
            </Button>
          </div>

          {/* Trust Assurances */}
          <div className="border-t border-neutral-200/80 pt-5 space-y-3 text-xs text-neutral-600">
            <div className="flex items-center gap-3">
              <FiTruck className="size-4.5 text-amber-800 shrink-0" />
              <span>
                Complimentary insured delivery in custom wooden crates
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="size-4.5 text-emerald-600 shrink-0" />
              <span>
                Authentic handcrafted guarantee with signed master certificate
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiRotateCcw className="size-4.5 text-neutral-600 shrink-0" />
              <span>7-Day transit damage replacement guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <FiAward className="size-4.5 text-amber-700 shrink-0" />
              <span>Seasoned timber warrantied against cracks or warps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Deep Dive Details Section: Story & Highlights */}
      <div className="mt-16 sm:mt-24 border-t border-neutral-200/80 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Story & Provenance */}
          <div className="space-y-4 rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-8">
            <Badge variant="amber" size="sm">
              Artisan Provenance
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              The Heritage Behind Every Chisel Mark
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              {product.story || product.description}
            </p>
            <p className="text-sm leading-relaxed text-neutral-600">
              Unlike mass-manufactured molded artifacts, every TimberCraft piece begins as an ethically sourced hardwood log that is naturally cured over two years. Our master artisans hand-carve each dimension with specialized curved chisels and gouges.
            </p>
          </div>

          {/* Key Product Highlights */}
          <div className="space-y-4 rounded-3xl bg-neutral-900 text-white p-6 sm:p-8">
            <Badge variant="dark-translucent" size="sm">
              Craft Features
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Heirloom Quality Standard
            </h2>
            <ul className="space-y-3 pt-2">
              {product.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-neutral-300"
                >
                  <span className="flex size-5 rounded-full bg-amber-500/20 text-amber-400 items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Related Masterpieces */}
      <div className="mt-16 sm:mt-24 border-t border-neutral-200/80 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Curated Recommendations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              You May Also Admire
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-amber-900 hover:text-neutral-950 transition-colors inline-flex items-center gap-1"
          >
            <span>Explore All Sculptures &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen pb-20 pt-8 sm:pt-12">
      <Suspense fallback={<ProductDetailSkeleton animation="pulse" />}>
        <ProductDetailsContent params={params} />
      </Suspense>
    </div>
  );
}
