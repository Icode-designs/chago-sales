"use client";
import { AuthMain, CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import { registerUser, signInWithGoogle } from "@/utils/auth";
import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FirebaseError } from "firebase/app";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserDocument } from "@/lib/services/userService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";

interface ERRORTYPE {
  emailErr?: string;
  passwordErr?: string;
  generalErr?: string;
}

const Page = () => {
  const [error, setError] = useState<ERRORTYPE>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  // Get the redirect URL from query params
  const redirectTo = searchParams.get("from") || "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Clear old errors
    setError({});
    setLoading(true);

    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";
    const confirmPassword = (formData.get("confirm-password") as string) || "";
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;

    const newErrors: ERRORTYPE = {};

    // Password match check
    if (password !== confirmPassword) {
      newErrors.passwordErr = "Passwords don't match";
    }

    // Email format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.emailErr = "Please enter a valid email";
    }

    // If there are any errors, update state and stop
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setLoading(false);
      return;
    }

    try {
      const additionalData = {
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        role: "customer" as const,
      };

      // Register user
      const user = await registerUser(email, password, additionalData);
      console.log("User registered successfully:", user.uid);

      // Set user data
      const userData = await getUserDocument(user.uid);
      dispatch(setUser(userData));

      // Get ID token
      const idToken = await user.getIdToken();

      // Create session cookie
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      // Redirect to the original page or dashboard
      router.push(redirectTo);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setError({ emailErr: "This email is already registered" });
        } else if (error.code === "auth/weak-password") {
          setError({ passwordErr: "Password should be at least 6 characters" });
        } else if (error.code === "auth/invalid-email") {
          setError({ emailErr: "Invalid email address" });
        } else {
          setError({
            generalErr:
              error.message || "Failed to create account. Please try again.",
          });
        }
      } else {
        // Not a Firebase error
        setError({
          generalErr: "Something went wrong. Try again.",
        });
      }

      setLoading(false);
    }
  }

  // async function handleGoogleSignup() {
  //   setError({});
  //   setLoading(true);

  //   try {
  //     const user = await signInWithGoogle();
  //     console.log("User signed up with Google:", user.uid);

  //     // Get ID token
  //     const idToken = await user.getIdToken();

  //     // Create session cookie
  //     const response = await fetch("/api/auth/session", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ idToken }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create session");
  //     }

  //     // Redirect to the original page or dashboard
  //     router.push(redirectTo);
  //     router.refresh();
  //   } catch (error: unknown) {
  //     console.error("Google signup error:", error);

  //     if (
  //       error instanceof FirebaseError &&
  //       error.code === "auth/popup-closed-by-user"
  //     ) {
  //       setError({ generalErr: "Sign-up cancelled" });
  //     } else {
  //       setError({
  //         generalErr: "Failed to sign up with Google. Please try again.",
  //       });
  //     }

  //     setLoading(false);
  //   }
  // }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <AuthMain>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>signup</h1>
          <p>
            or{" "}
            <Link
              href={`/login${
                searchParams.get("from")
                  ? `?from=${searchParams.get("from")}`
                  : ""
              }`}
            >
              Login To Existing Account
            </Link>
          </p>
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
            Create an account to access that page
          </div>
        )}

        {/* General error message */}
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
          <FlexBox $variant="secondary" $gap={24}>
            <input
              type="text"
              name="first-name"
              placeholder="First name"
              minLength={3}
              required
            />

            <input
              type="text"
              name="last-name"
              placeholder="Last name"
              minLength={3}
              required
            />
          </FlexBox>

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
            <button className="eye" type="button" onClick={toggleShowPassword}>
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>

            {error.passwordErr && <p className="error">{error.passwordErr}</p>}
          </div>

          <input
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
            minLength={8}
            required
          />
        </fieldset>

        <CustomButton $variant="extended" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create your account"}
        </CustomButton>

        <FlexBox $justifyContent="center" className="seperator">
          <div></div>
          <p>or continue with</p>
          <div></div>
        </FlexBox>

        <button
          className="google"
          type="button"
          // onClick={handleGoogleSignup}
          disabled={loading}
        >
          <FaGoogle /> <p>Google</p>
        </button>
      </form>
    </AuthMain>
  );
};

export default Page;
