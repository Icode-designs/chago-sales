import { db } from "@/lib/firebaseCl";
import PRODUCT from "@/types/productsType";
import { collection, getDocs } from "firebase/firestore";

export async function fetchProducts(): Promise<PRODUCT[]> {
  try {
    const productsCollectionRef = collection(db, "products");
    const querySnapshot = await getDocs(productsCollectionRef);

    // Convert Firestore docs to plain objects
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PRODUCT, "id">),
    }));

    return products;
  } catch (err: unknown) {
    console.error("Error fetching products:", err);
    throw err; // Let the context handle the error
  }
}
