"use client";
import ProductDetails from "@/components/ProductDetails";
import ProductOverview from "@/components/ProductOverview";
import ProductReviews from "@/components/ProductReviews";
import RelatedProducts from "@/components/RelatedProducts";
import UserReview, { ReviewData } from "@/components/UserReview";
import { MainContainer } from "@/styles/components/ui.Styles";
import PRODUCT from "@/types/productsType";
import getProductById from "@/utils/getProduct";

import React, { use, useEffect, useState } from "react";

interface STATETYPE {
  error: null | string;
  loading: boolean;
  product: null | PRODUCT;
}

const Page = ({ params }: { params: Promise<{ productId: string }> }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [productState, setProductState] = useState<STATETYPE>({
    error: null,
    loading: false,
    product: null,
  });
  const resolvedParams = use(params);
  const id = resolvedParams.productId;

  useEffect(() => {
    async function getProducts() {
      setProductState((prev) => ({ ...prev, loading: true }));
      const product = await getProductById(id);
      setProductState((prev) => ({ ...prev, loading: false }));
      if (!product) {
        setProductState((prev) => ({
          ...prev,
          error: "could not fetch product",
        }));
      }
      setProductState((prev) => ({ ...prev, product }));
    }
    getProducts();
  }, [id]);

  if (productState.error) return <p>An error occurred: {productState.error}</p>;
  if (productState.loading) return <p>Loading product data...</p>;
  if (!productState.product) return <p>Product not found.</p>;

  return (
    <MainContainer $variant="secondary">
      <ProductOverview
        product={productState.product as PRODUCT}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
      <ProductDetails product={productState.product as PRODUCT} />
      <ProductReviews
        reviews={productState.product.customerReviews as ReviewData[]}
      />
      <UserReview productId={productState.product.id} />
      <RelatedProducts product={productState.product as PRODUCT} />
    </MainContainer>
  );
};

export default Page;
