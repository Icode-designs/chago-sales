import CheckoutForm from "@/components/CheckoutForm";
import { StyledCheckout } from "@/styles/components/checkout.styles";
import { MainContainer } from "@/styles/components/ui.Styles";
import React from "react";

const page = () => {
  return (
    <MainContainer>
      <StyledCheckout>
        <h1>checkout</h1>
        <CheckoutForm />
      </StyledCheckout>
    </MainContainer>
  );
};

export default page;
