"use client";
import React from "react";
import {
  ProductSpecs,
  AnimatedRating,
} from "@/styles/components/productDetails";
import { FlexBox } from "@/styles/components/ui.Styles";
import { PRODUCTS } from "@/utils/data";

interface Props {
  product: (typeof PRODUCTS)[0];
}

const ProductRating = ({ product }: Props) => {
  const productRatings = {
    5: product.customerReviews.filter((rev) => rev.stars === 5).length,
    4: product.customerReviews.filter((rev) => rev.stars === 4).length,
    3: product.customerReviews.filter((rev) => rev.stars === 3).length,
    2: product.customerReviews.filter((rev) => rev.stars === 2).length,
    1: product.customerReviews.filter((rev) => rev.stars === 1).length,
  };

  const rating = Object.entries(productRatings);
  const total = rating.reduce((acc, current) => acc + current[1], 0);

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
                <progress value={(amt[1] / total) * 100} max={100} />
                <p>{((amt[1] / total) * 100).toFixed(2)}%</p>
              </FlexBox>
            </li>
          ))}
        </ul>
      </AnimatedRating>
    </ProductSpecs>
  );
};

export default ProductRating;
