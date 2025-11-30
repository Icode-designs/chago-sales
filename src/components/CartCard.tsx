"use client";
import {
  addToCart,
  CartItem,
  subtractFromCart,
} from "@/store/slices/cartSlice";
import { AppDispatch } from "@/store/store";
import { StyledCartCard } from "@/styles/components/cart.styles";
import { FlexBox } from "@/styles/components/ui.Styles";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import formatNairaToUSD from "@/utils/formatPrice";

interface Props {
  item: CartItem;
}

const CartCard = ({ item }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  function handleRemove(id: string) {
    dispatch(subtractFromCart(id));
  }

  const handleAddToCart = ({
    title,
    id,
    price,
    url,
  }: Omit<CartItem, "quantity">) => {
    dispatch(addToCart({ title, id, url, price, quantity: 1 }));
  };

  return (
    <StyledCartCard>
      <div>
        <Image width={500} height={500} src={item.url} alt={item.title} />
      </div>

      <div>
        <article>
          <h4>{item.title}</h4>
          <p>
            {formatNairaToUSD(item.price)} X {item.quantity}
          </p>
        </article>

        <FlexBox>
          <button
            onClick={() =>
              handleAddToCart({
                title: item.title,
                id: item.id,
                price: item.price,
                url: item.url,
              })
            }
          >
            <FiPlusCircle size={40} />
          </button>
          <p>{item.quantity}</p>
          <button onClick={() => handleRemove(item.id)}>
            <FiMinusCircle size={40} />
          </button>
        </FlexBox>
      </div>
    </StyledCartCard>
  );
};

export default CartCard;
