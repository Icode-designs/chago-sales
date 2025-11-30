import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseCl";
import { CartItem } from "@/store/slices/cartSlice";

export const fetchCart = async (uid: string) => {
  const ref = doc(db, "carts", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) return snap.data().items;
  return [];
};

export const saveCart = async (uid: string, items: CartItem[]) => {
  await setDoc(doc(db, "carts", uid), { items });
};

export const deleteCart = async (uid: string) => {
  await deleteDoc(doc(db, "carts", uid));
};
