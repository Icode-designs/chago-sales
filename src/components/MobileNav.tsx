import { StyledMobileNav } from "@/styles/components/mobileNav.style";
import Link from "next/link";
import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaStore } from "react-icons/fa";

import Cart from "./Cart";

const MobileNav = () => {
  return (
    <StyledMobileNav>
      <ul>
        <li>
          <Link href="/">
            <GrHomeRounded />
          </Link>
        </li>
        <li>
          <Cart />
        </li>
        <li>
          <Link href={`/products/products-list/${"all-products"}`}>
            <FaStore />
          </Link>
        </li>
        <li>
          <Link href="/user">
            <CgProfile />
          </Link>
        </li>
      </ul>
    </StyledMobileNav>
  );
};

export default MobileNav;
