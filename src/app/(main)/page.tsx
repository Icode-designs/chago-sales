"use client";
import BestDeal from "@/components/BestDeals";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";
import HomePageHero from "@/components/HomePageHero";
import { MainContainer } from "@/styles/components/ui.Styles";

export default function Home() {
  return (
    <MainContainer>
      <HomePageHero />
      <Categories />
      <FlashSale />
      <BestDeal />
    </MainContainer>
  );
}
