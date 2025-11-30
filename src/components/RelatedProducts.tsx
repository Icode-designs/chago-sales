"use client";
import { PRODUCTS_CONTEXT } from "@/providers/productsProvider";
import { ProductSection, ProductsGrid } from "@/styles/components/ui.Styles";
import React, { useContext } from "react";
import Card from "./Card";
import PRODUCT from "@/types/productsType";

interface PROPS {
  product: PRODUCT;
}

const RelatedProducts = ({ product }: PROPS) => {
  const productsCtx = useContext(PRODUCTS_CONTEXT);

  if (!productsCtx) {
    return;
  }

  const { products } = productsCtx;
  const relatedProducts = products?.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <ProductSection>
      <div>Related products</div>
      <ProductsGrid>
        {relatedProducts?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </ProductSection>
  );
};

export default RelatedProducts;
