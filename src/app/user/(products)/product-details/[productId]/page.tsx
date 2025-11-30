"use client";
import ProductDetails from "@/components/ProductDetails";
import ProductOverview from "@/components/ProductOverview";

import { RootState } from "@/store/store";
import { MainContainer } from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/User.styles";
import { Product } from "@/types/productsType";

import React, { use, useState } from "react";
import { useSelector } from "react-redux";

interface STATETYPE {
  error: null | string;
  loading: boolean;
}

const Page = ({ params }: { params: Promise<{ productId: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.productId;
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProduct: Product | undefined = products.find(
    (prod) => prod.id === id
  );
  const [activeImage, setActiveImage] = useState(0);
  const [productState, setProductState] = useState<STATETYPE>({
    error: null,
    loading: false,
  });

  if (productState.error) return <p>An error occurred: {productState.error}</p>;
  if (productState.loading) return <p>Loading product data...</p>;
  if (!selectedProduct) return <p>Product not found.</p>;

  return (
    <UserContent>
      <MainContainer as="section" $variant="secondary">
        <ProductOverview
          product={selectedProduct}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
        <ProductDetails product={selectedProduct} />
        {/* <ProductReviews
        reviews={productState.product.customerReviews as ReviewData[]}
      /> */}
        {/* <RelatedProducts product={selectedProduct} /> */}
      </MainContainer>
    </UserContent>
  );
};

export default Page;
