"use client";
import { createContext, useState, useCallback, useMemo } from "react";

interface FilterValues {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  rating: number[];
  searchTerm?: string;
}

interface FilterContextType {
  handleSubmit: (formData: FormData) => Promise<void>;
  filters: FilterValues;
  updateSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

export const FILTER_CONTEXT = createContext<FilterContextType | null>(null);

const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    categories: [],
    minPrice: null,
    maxPrice: null,
    rating: [],
    searchTerm: "",
  });

  const handleSubmit = useCallback(async (formData: FormData) => {
    const categories = formData.getAll("categories").map((v) => v.toString());

    const minPrice = Number(formData.get("min")) ?? null;
    const maxPrice = Number(formData.get("max")) ?? null;

    const ratingEntries = formData.getAll("stars").map((v) => v.toString());

    const numberRating = ratingEntries
      .map((r) => Math.round(Number(r)))
      .filter((n) => !Number.isNaN(n));

    const result: FilterValues = {
      categories,
      minPrice,
      maxPrice,
      rating: numberRating,
      searchTerm: "", // Reset search term on form submit
    };

    setFilters(result);
  }, []);

  const updateSearchTerm = useCallback((term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      minPrice: null,
      maxPrice: null,
      rating: [],
      searchTerm: "",
    });
  }, []);

  const provision = useMemo(
    () => ({
      handleSubmit,
      filters,
      updateSearchTerm,
      resetFilters,
    }),
    [handleSubmit, filters, updateSearchTerm, resetFilters]
  );

  return (
    <FILTER_CONTEXT.Provider value={provision}>
      {children}
    </FILTER_CONTEXT.Provider>
  );
};

export default FilterContextProvider;
