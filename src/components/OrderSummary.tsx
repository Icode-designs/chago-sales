"use client";
import { CartItem } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { StyledOrderSum } from "@/styles/components/cart.styles";
import { FlexBox } from "@/styles/components/ui.Styles";
import formatNairaToUSD from "@/utils/formatPrice";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shiping = 60000;
  const tax = 11000;
  const grandTotal = shiping + tax + subTotal;
  return (
    <StyledOrderSum>
      <div>
        <FlexBox $justifyContent="space-between">
          <p>Subtotal</p> <p>{formatNairaToUSD(subTotal)}</p>
        </FlexBox>
        <FlexBox $justifyContent="space-between">
          <p>Shipping</p> <p>{formatNairaToUSD(shiping)}</p>
        </FlexBox>
        <FlexBox $justifyContent="space-between">
          <p>tax</p> <p>{formatNairaToUSD(tax)}</p>
        </FlexBox>
      </div>
      <div>
        <FlexBox>
          <h3>Total</h3> <p>{formatNairaToUSD(grandTotal)}</p>
        </FlexBox>
      </div>
    </StyledOrderSum>
  );
};

export default OrderSummary;
