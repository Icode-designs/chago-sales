// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Verify the token;
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Create session cookie (expires in 5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000, // maxAge is in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
      },
    });
  } catch (error: unknown) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}

// Logout endpoint - DELETE method
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
