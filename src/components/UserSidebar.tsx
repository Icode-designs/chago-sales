"use client";
import { FaPowerOff } from "react-icons/fa6";
import useMediaQuery from "@/hooks/useMedia";
import { NAV_CONTEXT } from "@/providers/NavProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import { LinksList, StyledSideBar } from "@/styles/components/User.styles";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { handleLogoutAction } from "@/app/user/actions";
import { logoutUser } from "@/utils/auth";
import { clearCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import NavLink from "./UserNavlink";

const UserSidebar = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const navCtx = useContext(NAV_CONTEXT);
  const isLargeScreen = useMediaQuery(1200);

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

      // Clear cart state
      dispatch(clearCart());

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <StyledSideBar $navOpen={navOpen}>
      <button onClick={toggleNav}>
        {navOpen ? <FaAngleRight /> : <FaAngleLeft />}
      </button>

      <LinksList $show={navOpen}>
        <li>
          <NavLink href="/user/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink href="/user/track-order">Track order</NavLink>
        </li>
        <li>
          <NavLink href="/user/order-history">Order History</NavLink>
        </li>
        <li>
          <NavLink href="/user/favorites">Favorites</NavLink>
        </li>

        <button onClick={handleLogout}>
          <FlexBox $gap={8}>
            <FaPowerOff />
            <h3>Logout</h3>
          </FlexBox>
        </button>
      </LinksList>
    </StyledSideBar>
  );
};

export default UserSidebar;
