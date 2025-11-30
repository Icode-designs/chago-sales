// src/firebase/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebaseCl";
import {
  createUserDocument,
  userDocumentExists,
  CreateUserData,
} from "@/lib/services/userService";

export const registerUser = async (
  email: string,
  password: string,
  additionalData?: Partial<CreateUserData>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update display name in Firebase Auth if provided
    if (additionalData?.displayName) {
      await updateProfile(user, { displayName: additionalData.displayName });
    }

    // Create user document in Firestore
    const userData: CreateUserData = {
      email: user.email!,
      firstName: additionalData?.firstName,
      lastName: additionalData?.lastName,
      displayName: additionalData?.displayName || user.displayName || undefined,
      role: "vendor",
      photoURL: user.photoURL || undefined,
      phoneNumber: additionalData?.phoneNumber || undefined,
      address: additionalData?.address || undefined,
      vendorData: additionalData?.vendorData,
    };

    await createUserDocument(user.uid, userData);

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists, if not create one
    const exists = await userDocumentExists(user.uid);

    if (!exists) {
      const userData: CreateUserData = {
        email: user.email!,
        displayName: user.displayName || undefined,
        role: "vendor",
        photoURL: user.photoURL || undefined,
      };

      await createUserDocument(user.uid, userData);
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
