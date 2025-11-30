// src/firebase/userService.ts
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseCl";
import { UserData } from "@/store/slices/userSlice";

interface PaymentInfo {
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
  BVN?: string;
}

export interface VendorData {
  NIN?: string;
  verified?: boolean;
  establishedDate?: string;
  businessname?: string;
  productsOffered?: string[];
  paymentInfo?: PaymentInfo;
}

export interface CreateUserData {
  firstName?: string;
  lastName?: string;
  email: string;
  displayName?: string;
  role?: "vendor";
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  vendorData?: VendorData;
}

// Create user document in Firestore
export const createUserDocument = async (
  uid: string,
  userData: CreateUserData
) => {
  try {
    const userRef = doc(db, "users", uid);

    const newUser = {
      uid,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      displayName: userData.displayName || null,
      role: "vendor",
      photoURL: userData.photoURL || null,
      phoneNumber: userData.phoneNumber || null,
      address: userData.address || "",
      vendorData: userData.vendorData || {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, newUser);

    // Return the user data (timestamps will be null until they're set by server)
    return {
      ...newUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as UserData;
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};

// Get user document from Firestore
export const getUserDocument = async (
  uid: string
): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid: data.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        displayName: data.displayName,
        role: data.role,
        photoURL: data.photoURL,
        phoneNumber: data.phoneNumber,
        address: data.address,
        vendorData: data.vendorData,
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      } as UserData;
    }

    return null;
  } catch (error) {
    console.error("Error getting user document:", error);
    throw error;
  }
};

// Update user document
export const updateUserDocument = async (
  uid: string,
  updates: Partial<UserData>
) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    // Get and return updated document
    return await getUserDocument(uid);
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};

// Check if user document exists
export const userDocumentExists = async (uid: string): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error("Error checking user document:", error);
    return false;
  }
};
