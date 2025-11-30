"use client";
import { updateUserDocument } from "@/lib/services/userService";
import { addToCart, CartItem } from "@/store/slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { CustomButton, ProductCard } from "@/styles/components/ui.Styles";
import PRODUCT from "@/types/productsType";
import formatToNaira from "@/utils/formatPrice";
import { numberToStars, Reviews } from "@/utils/ratings";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface CardProps {
  children?: React.ReactNode;
  variant?: string;
  key?: string | number;
  product?: PRODUCT;
}

const Card: React.FC<CardProps> = ({ children, variant, product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);

  // Derive favorite status from Redux store instead of local state
  const isFavourite = useMemo(
    () => user?.favorites?.includes(product?.id as string) ?? false,
    [user?.favorites, product?.id]
  );

  function toggleFavourite() {
    if (isFavourite) {
      dispatch(removeFromFavorites(product?.id as string));
    } else {
      dispatch(addToFavorites(product?.id as string));
    }
  }

  // Sync favorites to database when they change
  useEffect(() => {
    if (user?.favorites) {
      updateUserDocument(user.uid, {
        favorites: user.favorites,
      });
    }
  }, [user?.favorites, user?.uid]);

  const handleAddToCart = ({
    title,
    id,
    price,
    url,
  }: Omit<CartItem, "quantity">) => {
    dispatch(addToCart({ title, id, url, price, quantity: 1 }));
  };

  if (!product && variant !== "categories") return null;
  return (
    <ProductCard $variant={variant}>
      {variant !== "categories" && (
        <>
          <button onClick={toggleFavourite} className="favourite">
            {!isFavourite ? (
              <IoMdHeartEmpty color="red" />
            ) : (
              <IoMdHeart color="red" />
            )}
          </button>
          <Link href={`/products/product-details/${product?.id}`}>
            <Image
              width={500}
              height={500}
              src={product?.image[0] as string}
              alt={product?.title as string}
              loading="lazy"
            />
            <article>
              <p>{product?.title}</p>
              <p>{numberToStars(product?.rating as Reviews)}</p>
              <h3>{formatToNaira(product?.price as number)}</h3>
            </article>
          </Link>
          <CustomButton
            onClick={() =>
              handleAddToCart({
                title: product?.title as string,
                id: product?.id as string,
                price: product?.price as number,
                url: product?.image[0] as string,
              })
            }
            $variant="extended"
          >
            Add to cart
          </CustomButton>
        </>
      )}

      {children}
    </ProductCard>
  );
};

export default Card;
