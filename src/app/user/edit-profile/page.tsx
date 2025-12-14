"use client";
import { CustomButton, FlexBox } from "@/styles/components/ui.Styles";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UserContent } from "@/styles/components/User.styles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { setUser } from "@/store/slices/userSlice";
import { updateUserDocument } from "@/lib/services/userService";
import { auth } from "@/lib/firebaseCl";
import { updatePassword } from "firebase/auth";
import { RootState } from "@/store/store";
import { FirebaseError } from "firebase/app";
import { handleLogoutAction } from "../actions";
import { logoutUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Vendor } from "@/types/userTypes";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paswordVariables, setPasswordVariables] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const authUser = auth.currentUser;

  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // extract form data
    const phoneNumber = formData.get("phone") as string;

    const password = formData.get("password") as string;

    const confirmPassword = formData.get("confirm-password") as string;

    const street = formData.get("street-address") as string;

    const city = formData.get("city") as string;

    const state = formData.get("state") as string;

    const accountName = formData.get("account-name") as string;

    const accountNumber = formData.get("account-number") as string;

    const bankName = formData.get("bank-name") as string;

    const BVN = formData.get("BVN") as string;

    // validation
    if (password && password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (password && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // prepare update payload - remove undefined values
    const updateData: Partial<Vendor> = {};

    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }

    if (street || city || state) {
      updateData.address = {
        street: street || user?.address?.street,
        city: city || user?.address?.city,
        state: state || user?.address?.state,
      };
    }

    if (accountName || accountNumber || bankName || BVN) {
      updateData.vendorData = {
        ...user?.vendorData,
        paymentInfo: {
          accountName:
            accountName || user?.vendorData?.paymentInfo?.accountName,
          accountNumber:
            accountNumber || user?.vendorData?.paymentInfo?.accountNumber,
          bankName: bankName || user?.vendorData?.paymentInfo?.bankName,
          BVN: BVN || user?.vendorData?.paymentInfo?.BVN,
        },
      };
    }

    setLoading(true);

    try {
      // Update password first if provided (requires recent authentication)
      if (authUser && password && password === confirmPassword) {
        try {
          await updatePassword(authUser, password); // ✅ Use actual password
          console.log("Password updated successfully");
        } catch (error: unknown) {
          console.error("Password update error:", error);
          setLoading(false);

          // Handle re-authentication requirement

          if (error instanceof FirebaseError) {
            if (error.code === "auth/requires-recent-login") {
              alert(
                "For security reasons, you will be logged out please log back in before changing your password."
              );
              await handleLogoutAction();

              // Log out from Firebase
              await logoutUser();

              // Redirect to home
              router.push("/login?from=/user");
            } else {
              alert(`Failed to update password: ${error.message}`);
            }
            return; // Stop if password update fails
          }
        }
      }

      // Update profile document
      const userDoc = await updateUserDocument(user!.uid, updateData);

      // update redux state
      if (userDoc) {
        dispatch(setUser(userDoc));
      }

      alert("Profile updated successfully!");

      // Reset password field only on success
      setPasswordVariables({ password: "", confirmPassword: "" });
      // Delete session cookie on server
      await handleLogoutAction();

      // Log out from Firebase
      await logoutUser();

      // Redirect to home
      router.push("/login?from=/user");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContent>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Update Profile</h1>
        </div>

        <fieldset>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                minLength={3}
                value={user?.firstName}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                minLength={3}
                value={user?.lastName}
                readOnly
              />
            </div>
          </FlexBox>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={user?.email as string}
              name="email"
              id="email"
              readOnly
            />
          </div>

          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                defaultValue={user?.phoneNumber ? user.phoneNumber : undefined}
              />
            </div>
            <div>
              <label htmlFor="nin">NIN</label>
              <input
                type="number"
                name="nin"
                id="nin"
                placeholder="Enter National Identification Number"
                value={user?.vendorData.NIN ? user.vendorData.NIN : undefined}
                readOnly
              />
            </div>
          </FlexBox>
          <div>
            <label htmlFor="storeName">store name</label>
            <input
              type="text"
              name="storeName"
              id="storeName"
              placeholder="Store / Business Name"
              value={user?.vendorData.businessname}
              readOnly
            />
          </div>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="password">New Password</label>
              <input
                className="password"
                minLength={8}
                type={!showPassword ? "password" : "text"}
                placeholder="Enter New Password"
                name="password"
                id="password"
                value={paswordVariables.password}
                onChange={(e) =>
                  setPasswordVariables({
                    ...paswordVariables,
                    password: e.currentTarget.value,
                  })
                }
              />
              <button
                className="eye"
                type="button"
                onClick={toggleShowPassword}
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirm-password"
                minLength={8}
                value={paswordVariables.confirmPassword}
                onChange={(e) =>
                  setPasswordVariables({
                    ...paswordVariables,
                    confirmPassword: e.currentTarget.value,
                  })
                }
              />
            </div>
          </FlexBox>

          <div>
            <label htmlFor="street-address">Street</label>
            <input
              type="text"
              name="street-address"
              id="street-address"
              placeholder="Enter Street Address"
              defaultValue={
                user?.address?.street ? user.address.street : undefined
              }
            />
          </div>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Enter City"
                defaultValue={
                  user?.address?.city ? user.address.city : undefined
                }
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="Enter State"
                defaultValue={
                  user?.address?.state ? user.address.state : undefined
                }
              />
            </div>
          </FlexBox>
        </fieldset>

        <fieldset>
          <div>
            <label htmlFor="account-name">Account name</label>
            <input
              type="text"
              id="account-name"
              name="account-name"
              placeholder="Account Name"
              defaultValue={user?.vendorData.paymentInfo?.accountName}
            />
          </div>
          <div>
            <label htmlFor="BVN">BVN</label>
            <input
              type="number"
              id="BVN"
              name="BVN"
              placeholder="Enter BVN"
              defaultValue={user?.vendorData.paymentInfo?.BVN}
            />
          </div>
          <FlexBox $variant="secondary" $gap={24}>
            <div>
              <label htmlFor="account-number">Account number</label>
              <input
                type="number"
                id="account-number"
                name="account-number"
                placeholder="Enter account number"
                defaultValue={user?.vendorData.paymentInfo?.accountNumber}
              />
            </div>
            <div>
              <label htmlFor="bank-name">Bank Name</label>
              <input
                type="text"
                id="bank-name"
                name="bank-name"
                placeholder="Bank Name"
                defaultValue={user?.vendorData.paymentInfo?.bankName}
              />
            </div>
          </FlexBox>
        </fieldset>

        <CustomButton $variant="extended" type="submit" disabled={loading}>
          {loading ? "Updating Profile..." : "Update Profile"}
        </CustomButton>
      </form>
    </UserContent>
  );
};

export default Page;
