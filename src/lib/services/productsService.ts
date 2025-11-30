// lib/services/productService.ts
import { db } from "@/lib/firebaseCl";
import Product from "@/types/productsType";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Update product in Firestore
export async function updateProductInFirestore(
  productId: string,
  updates: Partial<Product>
) {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updates);
    return { success: true };
  } catch (err) {
    console.error("Update error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// Delete product from Firestore
export async function deleteProductFromFirestore(productId: string) {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    return { success: true };
  } catch (err) {
    console.error("Delete error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// Fetch seller's products
export async function fetchSellerProducts(
  sellerId: string
): Promise<Product[]> {
  try {
    const q = query(
      collection(db, "products"),
      where("selerId", "==", sellerId)
    );
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    return products;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
