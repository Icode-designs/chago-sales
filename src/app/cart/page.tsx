"use client";
"@/store/store";
import CartItemList from "@/components/CartItemList";
import OrderSummary from "@/components/OrderSummary";
import { StyledCartWrapper } from "@/styles/components/cart.styles";
import { MainContainer, CustomLink } from "@/styles/components/ui.Styles";
import React from "react";

const page = () => {
  return (
    <MainContainer>
      <StyledCartWrapper>
        <CartItemList />
        <div>
          <OrderSummary />
          <CustomLink href="/checkout" $variant="extended">
            Check Out
          </CustomLink>
        </div>
      </StyledCartWrapper>
    </MainContainer>
  );
};

export default page;
