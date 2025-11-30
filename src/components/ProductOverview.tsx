"use client";
import {
  ProductImgBox,
  ProductInfoBox,
  ProductOverviewBox,
} from "@/styles/components/productDetails";
import { CustomLink, FlexBox } from "@/styles/components/ui.Styles";
import Product from "@/types/productsType";
import formatToNaira from "@/utils/formatPrice";
import { extractRating, numberToStars, Reviews } from "@/utils/ratings";
import Image from "next/image";
import React from "react";

interface Props {
  product: Product;
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductOverview = ({ product, activeImage, setActiveImage }: Props) => {
  const rating: Reviews | null = extractRating(product);
  return (
    <ProductOverviewBox>
      <FlexBox $gap={50} $variant="secondary">
        <ProductImgBox>
          <FlexBox $gap={16} $variant="secondary">
            <div>
              {product.images.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={i === activeImage ? "active" : ""}
                >
                  <Image
                    width={500}
                    height={500}
                    src={image}
                    alt={product.title}
                  />
                </div>
              ))}
            </div>
            <Image
              width={500}
              height={500}
              src={product.images[activeImage]}
              alt={product.title}
            />
          </FlexBox>
        </ProductImgBox>

        <ProductInfoBox>
          <h1>{product.title}</h1>
          <p>{formatToNaira(Number(product.price))}</p>
          <FlexBox $gap={10} $justifyContent="center">
            <FlexBox $justifyContent="right">
              {numberToStars(rating as Reviews)}
            </FlexBox>
            <p>{product.customerReviews?.length || 0} review(s)</p>
          </FlexBox>
          <p>{product.description}</p>
          <CustomLink
            $variant="extended"
            href={`/user/edit-product/${product.id}`}
          >
            edit product
          </CustomLink>
        </ProductInfoBox>
      </FlexBox>
    </ProductOverviewBox>
  );
};

export default ProductOverview;
