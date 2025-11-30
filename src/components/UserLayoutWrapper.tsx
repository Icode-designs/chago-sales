"use client";
import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import { NavContextProvider } from "@/providers/NavProvider";
import { UserContainer } from "@/styles/components/User.styles";
import useFetchProducts from "@/hooks/useFetchProducts";

export default function UserLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  useFetchProducts();
  return (
    <UserContainer>
      <NavContextProvider>
        <UserSidebar />
        {children}
      </NavContextProvider>
    </UserContainer>
  );
}
