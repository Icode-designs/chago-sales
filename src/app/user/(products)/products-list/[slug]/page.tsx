"use client";

import Card from "@/components/Card";
import Filter from "@/components/Filter";
import { FILTER_CONTEXT } from "@/providers/filterProvider";
import { RootState } from "@/store/store";
import { StyledProductsList } from "@/styles/components/productsList";
import {
  FlexBox,
  MainContainer,
  ProductsGrid,
} from "@/styles/components/ui.Styles";
import { UserContent } from "@/styles/components/User.styles";
import PRODUCT from "@/types/productsType";
import React, { use, useContext, useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Helper function to apply filters
const applyFilters = (
  products: PRODUCT[],
  filters: {
    categories: string[];
    minPrice?: number | null;
    maxPrice?: number | null;
    searchTerm?: string;
  }
) => {
  let filtered = [...products];

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter((prod) =>
      filters.categories.includes(prod.category.toLowerCase())
    );
  }

  // Price range filters
  if (filters.minPrice != null) {
    filtered = filtered.filter(
      (prod) => Number(prod.price) >= filters.minPrice!
    );
  }
  if (filters.maxPrice != null) {
    filtered = filtered.filter(
      (prod) => Number(prod.price) <= filters.maxPrice!
    );
  }

  // Search term filter
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter((p) =>
      [p.title, p.category].some((field) => field.toLowerCase().includes(term))
    );
  }

  return filtered;
};

// Helper function to format page title
const formatPageTitle = (slug: string) => {
  return slug
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();
  const slugRef = useRef(slug);
  const normalizedSlug = slug.replace(/-/g, " ");

  const filterCtx = useContext(FILTER_CONTEXT);
  const productsList = useSelector(
    (state: RootState) => state.products.products
  );

  // Reset filters when slug changes
  useEffect(() => {
    if (slugRef.current !== slug) {
      filterCtx?.resetFilters();
    }
  }, [slug, filterCtx]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    if (!filterCtx || !productsList) return [];
    return applyFilters(productsList, filterCtx.filters);
  }, [productsList, filterCtx]);

  console.log(filteredProducts);
  // Determine page context and sort products
  const { sortedProducts, pageTitle } = useMemo(() => {
    // Check if slug matches a product ID
    const productById = filteredProducts.find(
      (product) => product.id!.toLowerCase() === slug
    );

    if (productById) {
      // Sort: matched product first, then same category, then others
      const sameCategory = filteredProducts.filter(
        (p) => p.category === productById.category && p.id !== productById.id
      );
      const others = filteredProducts.filter(
        (p) => p.category !== productById.category
      );

      return {
        sortedProducts: [productById, ...sameCategory, ...others],
        pageTitle: `Related to ${productById.title}`,
      };
    }

    // Check if slug matches a category
    const categoryMatch = filteredProducts.filter(
      (product) => product.category.toLowerCase() === normalizedSlug
    );

    if (categoryMatch.length > 0) {
      return {
        sortedProducts: categoryMatch,
        pageTitle: formatPageTitle(normalizedSlug),
      };
    }

    // Handle "all products" or no match
    if (normalizedSlug === "all products") {
      return {
        sortedProducts: filteredProducts,
        pageTitle: "All Products",
      };
    }

    return {
      sortedProducts: [],
      pageTitle: "Products",
    };
  }, [filteredProducts, slug, normalizedSlug]);

  // Loading state - check if we have products data
  if (!productsList) {
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
    <UserContent>
      <Filter />
      <StyledProductsList>
        <FlexBox>
          <h1>{pageTitle}</h1>
        </FlexBox>
        {sortedProducts.length === 0 ? (
          <FlexBox>
            <p>No products found for {normalizedSlug}.</p>
          </FlexBox>
        ) : (
          <ProductsGrid>
            {sortedProducts.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </ProductsGrid>
        )}
      </StyledProductsList>
    </UserContent>
  );
};

export default Page;
