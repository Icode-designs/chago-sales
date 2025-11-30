"use client";
import { RootState } from "@/store/store";
import { StyledCardList } from "@/styles/components/cart.styles";
import React from "react";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";

const CartItemList = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <StyledCardList>
      {cartItems.map((item, i) => (
        <CartCard key={i} item={item} />
      ))}
    </StyledCardList>
  );
};

export default CartItemList;
