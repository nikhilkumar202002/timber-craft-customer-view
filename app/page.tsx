import React from "react";
import HeroSection from "./components/home/HeroSection";
import CategorySection from "./components/home/CategorySection";
import FeaturedProducts from "./components/home/FeaturedProducts";
import WhyChooseUs from "./components/home/WhyChooseUs";
import Allproducts from "./components/home/Allproducts";
import CustomArtworkSection from "./components/home/CustomArtworkSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Allproducts />
      <CustomArtworkSection />
    </div>
  );
}
