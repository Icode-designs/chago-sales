"use client";
import { RootState } from "@/store/store";
import { CartContainer } from "@/styles/components/header";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <Link href="/cart">
      <CartContainer>
        <div className="amount">
          <p>{totalQty}</p>
        </div>
        <IoCartOutline size={24} color="var(--col-000)" />
      </CartContainer>
    </Link>
  );
};

export default Cart;
