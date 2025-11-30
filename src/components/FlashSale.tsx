"use client";
import { ProductSection, ProductsGrid } from "@/styles/components/ui.Styles";
import Card from "./Card";
import { useContext } from "react";
import { PRODUCTS_CONTEXT } from "@/providers/productsProvider";

const FlashSale = () => {
  const productsCtx = useContext(PRODUCTS_CONTEXT);

  if (!productsCtx) {
    return;
  }

  const { products } = productsCtx;
  const saleProducts = products?.filter((product, i) => i <= 7);

  return (
    <ProductSection $variant="flash-sale">
      <div>
        <h2>Flash Sale</h2>
        <span>
          <p></p>
        </span>
      </div>
      <ProductsGrid>
        {saleProducts?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </ProductSection>
  );
};

export default FlashSale;
