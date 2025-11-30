import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import ProductsContextProvider from "@/providers/productsProvider";
import { fetchProducts } from "@/utils/fetchAllProducts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function checkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    redirect(`/login?from=/checkout`);
  }
  const products = await fetchProducts();
  return (
    <>
      <ProductsContextProvider initialProducts={products}>
        <Header />
        {children}
        <MobileNav />
        <Footer />
      </ProductsContextProvider>
    </>
  );
}
