"use client";

import {  ProductCard } from "@/styles/components/ui.Styles";
import PRODUCT, { Product } from "@/types/productsType";
import formatToNaira from "@/utils/formatPrice";
import { extractRating, numberToStars, Reviews } from "@/utils/ratings";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  product?: PRODUCT;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const rating = extractRating(product as Product);

  return (
    <ProductCard>
      <Link href={`/user/product-details/${product?.id}`}>
        <Image
          width={500}
          height={500}
          src={product?.images[0] as string}
          alt={product?.title as string}
          loading="lazy"
        />
        <article>
          <p>{product?.title}</p>
          <p>{numberToStars(rating as Reviews)}</p>
          <h3>{formatToNaira(Number(product?.price))}</h3>
        </article>
      </Link>
      {/* <CustomButton $variant="extended">Add to cart</CustomButton> */}
    </ProductCard>
  );
};

export default Card;
