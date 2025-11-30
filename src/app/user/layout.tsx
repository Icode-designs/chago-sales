import Header from "@/components/Header";
import UserLayoutWrapper from "@/components/UserLayoutWrapper";
import ProductsContextProvider from "@/providers/productsProvider";
import { UserContentContainer } from "@/styles/components/User.styles";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <Header />
      <UserLayoutWrapper>
        <UserContentContainer>{children}</UserContentContainer>
      </UserLayoutWrapper>
    </>
  );
}
