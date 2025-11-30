import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import { NavContextProvider } from "@/providers/NavProvider";
import { UserContainer } from "@/styles/components/User.styles";

export default function UserLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <UserContainer>
      <NavContextProvider>
        <UserSidebar />
        {children}
      </NavContextProvider>
    </UserContainer>
  );
}
