"use client";

import { getUserDocument } from "@/lib/services/userService";
import { setUser } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store/store";
import { AuthMain, CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import { loginUser, logoutUser } from "@/utils/auth";
import { FirebaseError } from "firebase/app";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface ERRORTYPE {
  emailErr?: string;
  generalErr?: string;
}

const Page = () => {
  const [error, setError] = useState<ERRORTYPE>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("from") || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setError({});
    setLoading(true);

    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError({ emailErr: "Please enter a valid email" });
      setLoading(false);
      return;
    }

    try {
      // Login user
      const user = await loginUser(email, password);
      console.log("User logged in:", user.uid);

      // Get user data BEFORE creating session
      const userData = await getUserDocument(user.uid);

      // Check if user exists
      if (!userData) {
        await logoutUser();
        setError({ generalErr: "User account not found" });
        setLoading(false);
        return;
      }

      // Check if user is suspended
      if (userData.status === "suspended") {
        await logoutUser();
        setError({ generalErr: "Your account has been suspended" });
        setLoading(false);
        router.push("/suspended");
        return;
      }

      // Check if user is a vendor
      if (userData.role !== "vendor") {
        await logoutUser();
        setError({
          generalErr:
            "This is a vendor-only portal. Please use the customer app.",
        });
        setLoading(false);
        return;
      }

      // All checks passed - set user data
      dispatch(setUser(userData));

      // Create session cookie
      const idToken = await user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      // Redirect back
      router.push(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/invalid-credential") {
          setError({ generalErr: "Incorrect email or password" });
        } else if (err.code === "auth/too-many-requests") {
          setError({
            generalErr: "Too many failed attempts. Please try again later.",
          });
        } else {
          setError({ generalErr: err.message });
        }
      } else {
        setError({ generalErr: "Something went wrong. Try again." });
      }
      setLoading(false);
    }
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <AuthMain>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
        </div>

        {/* Show redirect message if coming from a protected page */}
        {searchParams.get("from") && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#EBF5FF",
              border: "1px solid #60A5FA",
              borderRadius: "8px",
              marginBottom: "16px",
              color: "#1E40AF",
              fontSize: "14px",
            }}
          >
            Please login to access that page
          </div>
        )}

        {error.generalErr && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#FEE2E2",
              border: "1px solid #EF4444",
              borderRadius: "8px",
              marginBottom: "16px",
              color: "#991B1B",
              fontSize: "14px",
            }}
          >
            {error.generalErr}
          </div>
        )}

        <fieldset disabled={loading}>
          <div>
            <input type="email" placeholder="Email" name="email" required />
            {error.emailErr && <p className="error">{error.emailErr}</p>}
          </div>

          <div>
            <input
              className="password"
              minLength={8}
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              name="password"
              required
            />
            <button type="button" className="eye" onClick={toggleShowPassword}>
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </fieldset>

        <CustomButton $variant="extended" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "login"}
        </CustomButton>

        <FlexBox $justifyContent="center" className="seperator">
          <p>
            or{" "}
            <Link
              href={`/signup${
                searchParams.get("from")
                  ? `?from=${searchParams.get("from")}`
                  : ""
              }`}
            >
              Create A New Account
            </Link>
          </p>
        </FlexBox>
      </form>
    </AuthMain>
  );
};

export default Page;
