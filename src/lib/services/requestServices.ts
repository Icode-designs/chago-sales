// lib/services/productService.ts
import { db } from "@/lib/firebaseCl";
import { RequestType } from "@/types/requestType";
import { cleanData } from "@/utils/fetchAllProducts";
import { collection, getDocs, query, where } from "firebase/firestore";

// Fetch orders from firestore
export async function fetchRequests(uid: string): Promise<RequestType[]> {
  try {
    const requestRef = query(
      collection(db, "requests"),
      where("requestTo", "==", uid)
    );

    const snapshot = await getDocs(requestRef);

    const requests = snapshot.docs.map((doc) => {
      const rawData = doc.data();

      return {
        id: doc.id,
        ...cleanData(rawData),
      } as RequestType;
    });

    console.log("user orders: " + requests);
    return requests;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}
