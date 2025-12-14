"use client";
import { FaPowerOff } from "react-icons/fa6";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import { NavigationBox, StyledSideBar } from "@/styles/components/User.styles";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { handleLogoutAction } from "@/app/user/actions";
import { logoutUser } from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavLink from "./UserNavlink";
import { RootState } from "@/store/store";

const UserSidebar = () => {
  const router = useRouter();
  const navCtx = useContext(NAV_CONTEXT);
  const isLargeScreen = useMediaQuery(1200);
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (!navCtx) return;
    if (isLargeScreen) {
      navCtx.openNav();
    }
  }, [navCtx, isLargeScreen]);

  if (!navCtx) return null;

  const { toggleNav, navOpen } = navCtx;

  async function handleLogout() {
    try {
      // Delete session cookie on server
      await handleLogoutAction();

      // Log out from Firebase
      await logoutUser();

      // Redirect to home
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <StyledSideBar $navOpen={navOpen}>
      <button onClick={toggleNav}>
        {navOpen ? <FaAngleRight /> : <FaAngleLeft />}
      </button>
      <div>
        <h3>Welcone vendor {user?.firstName}</h3>
      </div>
      <NavigationBox $show={navOpen}>
        <NavLink href={`/user/products-list/${"all-products"}`}>
          Manage Products
        </NavLink>

        <NavLink href="/user/add-product">Add Product</NavLink>

        <NavLink href={"/user/manage-requests"}>Manage Requests</NavLink>

        <NavLink href="/user/edit-profile">Edit Profile</NavLink>
      </NavigationBox>
      <button onClick={handleLogout}>
        <FlexBox $gap={8}>
          <FaPowerOff />
          <h3>Logout</h3>
        </FlexBox>
      </button>
    </StyledSideBar>
  );
};

export default UserSidebar;
