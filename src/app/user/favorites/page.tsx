"use client";
import Card from "@/components/Card";
import { PRODUCTS_CONTEXT } from "@/providers/productsProvider";
import { RootState } from "@/store/store";
import { ProductsGrid } from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/User.styles";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const productsCtx = useContext(PRODUCTS_CONTEXT);

  if (!productsCtx) return null;

  const favorites = productsCtx.products?.filter((product) =>
    user?.favorites?.includes(product.id)
  );
  return (
    <UserContent>
      <ProductsGrid>
        {favorites?.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </ProductsGrid>
    </UserContent>
  );
};

export default Page;
