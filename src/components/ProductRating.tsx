"use client";
import React from "react";
import {
  ProductSpecs,
  AnimatedRating,
} from "@/styles/components/productDetails";
import { FlexBox } from "@/styles/components/ui.Styles";
import Product from "@/types/productsType";
import { extractRating, Reviews } from "@/utils/ratings";

interface Props {
  product: Product;
}

const ProductRating = ({ product }: Props) => {
  const productRatings = extractRating(product);

  const rating = productRatings ? Object.entries(productRatings) : [];

  console.log(rating);

  const total =
    rating?.reduce((acc, current) => acc + (current[1] as number), 0) ?? 0;
  return (
    <ProductSpecs>
      <h3>Rating Details</h3>

      {/* Animated content */}
      <AnimatedRating>
        <ul>
          {rating.reverse().map((amt, index) => (
            <li key={index}>
              <FlexBox $justifyContent="space-between" $gap={10}>
                {amt[0]}
                <progress
                  value={((amt[1] as number) / total) * 100 || 0}
                  max={100}
                />
                <p>{((amt[1] as number) / total) * 100 || 0}% </p>
              </FlexBox>
            </li>
          ))}
        </ul>
      </AnimatedRating>
    </ProductSpecs>
  );
};

export default ProductRating;
