import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  url: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    mergeCart: (state, action: PayloadAction<CartItem[]>) => {
      const localCart = state.items; // cart before login (guest cart)
      const remoteCart = action.payload; // cart from Firestore

      const merged: CartItem[] = [];

      // Create a map for remote items (faster lookup)
      const remoteMap = new Map<string, CartItem>();
      remoteCart.forEach((item) => remoteMap.set(item.id, item));

      // Merge local items
      localCart.forEach((localItem) => {
        if (remoteMap.has(localItem.id)) {
          const remoteItem = remoteMap.get(localItem.id)!;

          // Combine quantities (or choose logic you prefer)
          merged.push({
            ...localItem,
            quantity: localItem.quantity + remoteItem.quantity,
          });

          // Remove from map to avoid adding twice
          remoteMap.delete(localItem.id);
        } else {
          merged.push(localItem);
        }
      });

      // Add remaining remote items that were not merged
      remoteMap.forEach((item) => merged.push(item));

      state.items = merged;
    },

    subtractFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1); // remove item completely
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  subtractFromCart,
  setCart,
  clearCart,
  mergeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
