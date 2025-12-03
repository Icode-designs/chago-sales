"use client";
import { deleteProductFromFirestore } from "@/lib/services/productsService";
import { deleteProduct } from "@/store/slices/productsSlice";
import {
  ProductImgBox,
  ProductInfoBox,
  ProductOverviewBox,
} from "@/styles/components/productDetails";
import {
  CustomButton,
  CustomLink,
  FlexBox,
} from "@/styles/components/ui.Styles";
import Product from "@/types/productsType";
import formatToNaira from "@/utils/formatPrice";
import { extractRating, numberToStars, Reviews } from "@/utils/ratings";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  product: Product;
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductOverview = ({ product, activeImage, setActiveImage }: Props) => {
  const dispatch = useDispatch();
  const rating: Reviews | null = extractRating(product);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const { success, error } = await deleteProductFromFirestore(
        product.id as string
      );

      if (success) {
        alert("product deleted successfully");
        dispatch(deleteProduct(product.id as string));
        router.push("/user/products-list/all-products");
        setLoading(false);
      }
      if (error) {
        alert("failed to delete product, log back in and try again");
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        throw err;
        setLoading(false);
      } else {
        console.log("unknown err occured during delete: " + err);
        setLoading(false);
      }
    }
  }

  return (
    <ProductOverviewBox>
      <FlexBox $gap={50} $variant="secondary" $width="fit-content">
        <ProductImgBox>
          <FlexBox $gap={16} $variant="secondary" $width="100%">
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
          <p>Amount in stock: {product.productStock}</p>
          <FlexBox $width="100%" $gap={16}>
            <CustomButton
              $variant="outlined"
              className="deleteBtn"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "deleting..." : "delete product"}
            </CustomButton>
            <CustomLink
              $variant="extended"
              href={`/user/edit-product/${product.id}`}
            >
              edit product
            </CustomLink>
          </FlexBox>
        </ProductInfoBox>
      </FlexBox>
    </ProductOverviewBox>
  );
};

export default ProductOverview;
