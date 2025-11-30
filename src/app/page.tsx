import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

const page = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/login?from=/user");
  }

  const decodedToken = await adminAuth.verifySessionCookie(session, true);
  const uid = decodedToken.uid;

  const userSnap = await adminDb.doc(`users/${uid}`).get();

  if (!userSnap.exists) {
    redirect("/login?error=user_not_found");
  }

  const user = userSnap.data();

  if (user?.role !== "vendor") {
    redirect("/login?from=/user&error=unauthorized");
  }

  redirect("/user");
};

export default page;
