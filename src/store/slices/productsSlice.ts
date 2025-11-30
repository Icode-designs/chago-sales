import Product from "@/types/productsType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product | null>) => {
      if (action.payload) {
        state.products.push(action.payload);
      }
    },
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.products = action.payload || [];
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Product> }>
    ) => {
      const { id, updates } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updates };
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, setProducts, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
