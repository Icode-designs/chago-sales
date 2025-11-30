"use client";
import Filter from "@/components/Filter";
import React, { ReactNode } from "react";

interface PROPS {
  children: ReactNode;
}

const layout = ({ children }: PROPS) => {
  return (
    <div>
      <Filter />
      {children}
    </div>
  );
};

export default layout;
