"use client";

import { HeaderContainer, SearchResultsBox } from "@/styles/components/header";
import { FlexBox, StyledSearchBar } from "@/styles/components/ui.Styles";
import Link from "next/link";

import { FaAngleDown } from "react-icons/fa6";
import { useCallback, useContext, useRef, useState } from "react";
import Logo from "./Logo";

import PRODUCT from "@/types/productsType";
import { FILTER_CONTEXT } from "@/providers/filterProvider";

import { CATEGORIES } from "@/utils/imageImport";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface SearchProcess {
  isTyping: boolean;
  result?: PRODUCT[];
}

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchProcess, setSearchProcess] = useState<SearchProcess>({
    isTyping: false,
    result: undefined,
  });
  const products = useSelector((state: RootState) => state.products.products);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterCtx = useContext(FILTER_CONTEXT);

  const categories = Object.entries(CATEGORIES);

  const handleChange = useCallback(() => {
    if (!products) return;

    const searchKeyword = inputRef.current?.value.trim().toLowerCase() || "";

    if (!searchKeyword) {
      setSearchProcess({ isTyping: false, result: [] });
      return;
    }

    const searchResult =
      products.filter(({ title }) =>
        [title].some((field) => field.toLowerCase().includes(searchKeyword))
      ) || [];

    setSearchProcess({ isTyping: true, result: searchResult });
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setSearchProcess((prev) => ({ ...prev, isTyping: false }));
    }, 300);
  }, []);

  if (!products) {
    return <p>Unable to load products. Try refreshing the page.</p>;
  }

  function handleShowCategories() {
    setShowCategories((prev) => !prev);
  }

  return (
    <HeaderContainer $navOpen={navOpen}>
      <div>
        <Logo variant="black" />
        <nav>
          <ul>
            <li onClick={navOpen ? () => setNavOpen(false) : undefined}>
              <Link href={`/user/products-list/${"all-products"}`}>
                Products
              </Link>
            </li>

            <li className="categories" onClick={handleShowCategories}>
              <FlexBox $gap={8}>
                <p>Categories</p>
                <FaAngleDown />
              </FlexBox>
              {showCategories && (
                <ul>
                  {categories.map(([name], i) => (
                    <li key={i}>
                      <Link href={`/user/products-list/${name}`}>
                        {name.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <StyledSearchBar>
          <input
            type="text"
            placeholder="Search for products..."
            aria-label="Search products"
            ref={inputRef}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </StyledSearchBar>
      </div>

      {searchProcess.isTyping && (
        <SearchResultsBox>
          <div>
            {searchProcess.result && searchProcess.result.length > 0 ? (
              searchProcess.result.map((result, i) => (
                <Link href={`/products/products-list/${result.id}`} key={i}>
                  <p onClick={filterCtx?.resetFilters}>
                    {result.title} in <span>{result.category}</span>
                  </p>
                </Link>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        </SearchResultsBox>
      )}
    </HeaderContainer>
  );
};

export default Header;
