"use client";

import Card from "@/components/Card";
import { FILTER_CONTEXT } from "@/providers/filterProvider";
import { PRODUCTS_CONTEXT } from "@/providers/productsProvider";
import { StyledProductsList } from "@/styles/components/productsList";
import {
  FlexBox,
  MainContainer,
  ProductsGrid,
} from "@/styles/components/ui.Styles";
import PRODUCT from "@/types/productsType";
import React, { use, useContext, useMemo, useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();
  const normalizedSlug = slug.replace(/-/g, " ");

  const filterCtx = useContext(FILTER_CONTEXT);
  const productsCtx = useContext(PRODUCTS_CONTEXT);

  const [products, setProducts] = useState<PRODUCT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    filterCtx?.resetFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!productsCtx || !filterCtx) {
      setIsLoading(true);
      return;
    }

    const { filters } = filterCtx;
    const allProducts = productsCtx.products || [];
    let filteredProducts = [...allProducts];

    // Filter by category
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((prod) =>
        filters.categories.includes(prod.category.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (prod) => prod.price <= Number(filters.maxPrice)
      );
    }

    // Filter by rating
    if (filters.rating.length > 0) {
      filteredProducts = filteredProducts.filter((prod) => {
        const prodRating = Math.round(Number(prod.rating));
        if (Number.isNaN(prodRating)) return false;
        return filters.rating.includes(prodRating);
      });
    }

    // Filter by search term (now independent)
    if (filters.searchTerm) {
      filteredProducts = filteredProducts.filter((p) =>
        [p.title, p.category].some((field) =>
          field
            .toLowerCase()
            .includes(filters.searchTerm?.toLowerCase() as string)
        )
      );
    }

    setProducts(filteredProducts);
    setIsLoading(false);
  }, [filterCtx, productsCtx]);

  // 🧠 Detect whether slug refers to a product ID or a category
  const { productById, categoryMatch, pageTitle } = useMemo(() => {
    const productById = products.find(
      (product) => product.id.toLowerCase() === slug
    );

    const categoryMatch = products.filter(
      (product) => product.category.toLowerCase() === normalizedSlug
    );

    let pageTitle = "Products";
    if (productById) {
      pageTitle = `Related to ${productById.title}`;
    } else if (categoryMatch.length > 0) {
      // Capitalize category name
      pageTitle = normalizedSlug
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return { productById, categoryMatch, pageTitle };
  }, [products, slug, normalizedSlug]);

  // 🪄 Smart Sorting Logic
  const sortedProducts = useMemo(() => {
    // Case 1️⃣: Slug matches a product ID
    if (productById) {
      const sameCategory = products.filter(
        (p) => p.category === productById.category && p.id !== productById.id
      );
      const others = products.filter(
        (p) => p.category !== productById.category
      );
      return [productById, ...sameCategory, ...others];
    }

    // Case 2️⃣: Slug matches a category
    if (categoryMatch.length > 0) {
      return categoryMatch;
    }

    // Case 3️⃣: No direct match → show all or empty
    if (normalizedSlug === "all products") {
      return products;
    }

    return [];
  }, [products, productById, categoryMatch, normalizedSlug]);

  // Loading state
  if (isLoading) {
    return (
      <MainContainer>
        <StyledProductsList>
          <FlexBox>
            <h1>Loading products...</h1>
          </FlexBox>
        </StyledProductsList>
      </MainContainer>
    );
  }

  return (
    <MainContainer $variant="secondary">
      <StyledProductsList>
        <FlexBox>
          <h1>{pageTitle}</h1>
        </FlexBox>
        {sortedProducts.length === 0 ? (
          <FlexBox>
            <p>No products found for {`"${slug}"`}.</p>
          </FlexBox>
        ) : (
          <ProductsGrid>
            {sortedProducts.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </ProductsGrid>
        )}
      </StyledProductsList>
    </MainContainer>
  );
};

export default Page;
