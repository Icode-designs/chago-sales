import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import UserLayoutWrapper from "@/components/UserLayoutWrapper";
import UserSidebar from "@/components/UserSidebar";
import ProductsContextProvider from "@/providers/productsProvider";
import { FlexBox } from "@/styles/components/ui.Styles";
import { UserContentContainer } from "@/styles/components/User.styles";
import { fetchProducts } from "@/utils/fetchAllProducts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect("/login?from=/user");
  }
  const products = await fetchProducts();
  return (
    <>
      <ProductsContextProvider initialProducts={products}>
        <Header />
        <UserLayoutWrapper>
          <UserContentContainer>{children}</UserContentContainer>
        </UserLayoutWrapper>
        <MobileNav />
      </ProductsContextProvider>
    </>
  );
}
