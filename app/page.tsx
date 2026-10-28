import React from "react";
import HeroSection from "./components/home/HeroSection";
import CategorySection from "./components/home/CategorySection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Allproducts from "./components/home/Allproducts";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <Allproducts />
    </div>
  );
}
