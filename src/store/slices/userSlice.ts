// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  street?: string;
  city?: string;
  state?: string;
}

export interface UserData {
  firstName?: string;
  lastName?: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "customer";
  photoURL?: string | null;
  createdAt?: string;
  updatedAt?: string;
  phoneNumber?: string | null;
  address?: Address;
  favorites?: string[];
}

interface UserState {
  currentUser: UserData | null;
  userLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  userLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      if (action.payload) {
        state.currentUser = action.payload;
        state.userLoggedIn = true;
      } else {
        state.currentUser = null;
        state.userLoggedIn = false;
      }
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.userLoggedIn = false;
      state.error = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },

    addToFavorites: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        if (!state.currentUser.favorites) {
          state.currentUser.favorites = [];
        }
        state.currentUser.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      if (state.currentUser && state.currentUser.favorites) {
        state.currentUser.favorites = state.currentUser.favorites.filter(
          (itemId) => itemId !== action.payload
        );
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  logout,
  updateUserData,
  addToFavorites,
  removeFromFavorites,
} = userSlice.actions;
export default userSlice.reducer;
