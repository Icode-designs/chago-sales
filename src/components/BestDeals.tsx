"use client";
import { ProductSection, ProductsGrid } from "@/styles/components/ui.Styles";
import React, { useContext } from "react";
import Card from "./Card";
import { PRODUCTS_CONTEXT } from "@/providers/productsProvider";

const BestDeal = () => {
  const productsCtx = useContext(PRODUCTS_CONTEXT);

  if (!productsCtx) {
    return;
  }

  const { products } = productsCtx;

  return (
    <ProductSection $variant={undefined}>
      <div>
        <h2>Best Deals</h2>
        <span>
          <p></p>
        </span>
      </div>
      <ProductsGrid>
        {products?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </ProductSection>
  );
};

export default BestDeal;
