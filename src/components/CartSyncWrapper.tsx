"use client";
import { fetchCart, saveCart } from "@/lib/services/cartServices";
import { mergeCart, setCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/lib/firebaseCl";
import { onAuthStateChanged } from "firebase/auth";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const didFetchRef = useRef(false);
  const currentUidRef = useRef<string | null>(null);

  // Load cart on login (no reload required)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // User logged out
        didFetchRef.current = false;
        currentUidRef.current = null;
        sessionStorage.removeItem("cartMerged");
        return;
      }

      currentUidRef.current = user.uid;
      const remoteCart = await fetchCart(user.uid);

      // Check if we've already merged for this session
      const hasMerged = sessionStorage.getItem("cartMerged") === "true";
      if (remoteCart === items) return;

      if (!hasMerged) {
        dispatch(mergeCart(remoteCart));
        sessionStorage.setItem("cartMerged", "true");
      } else {
        dispatch(setCart(remoteCart));
      }

      didFetchRef.current = true;
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Save cart when items update (after first load)
  useEffect(() => {
    const uid = currentUidRef.current;
    if (!uid) return;
    if (!didFetchRef.current) return;
    saveCart(uid, items);
  }, [items]);

  return <>{children}</>;
}
