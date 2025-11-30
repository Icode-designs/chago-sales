"use client";
import FilterContextProvider from "@/providers/filterProvider";
import React, { ReactNode } from "react";

interface PROPS {
  children: ReactNode;
}

const layout = ({ children }: PROPS) => {
  return <FilterContextProvider>{children}</FilterContextProvider>;
};

export default layout;
