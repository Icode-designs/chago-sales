import { db } from "@/lib/firebaseCl";
import PRODUCT, { Product } from "@/types/productsType";
import { DocumentData } from "firebase-admin/firestore";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

// Helper: convert Firestore Timestamp → millis OR recursively clean object

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanData(obj: DocumentData): any {
  if (obj instanceof Timestamp) {
    return obj.toMillis();
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanData);
  }

  if (obj !== null && typeof obj === "object") {
    const plain: DocumentData = {};
    for (const key in obj) {
      plain[key] = cleanData(obj[key]);
    }
    return plain;
  }

  return obj; // primitive
}

export async function fetchProducts(userId: string): Promise<PRODUCT[]> {
  try {
    const productsCollectionRef = query(
      collection(db, "products"),
      where("sellerId", "==", userId)
    );

    const snap = await getDocs(productsCollectionRef);

    const products = snap.docs.map((doc) => {
      const rawData = doc.data();

      return {
        id: doc.id,
        ...cleanData(rawData),
      } as Product;
    });

    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}
