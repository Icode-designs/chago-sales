import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import ProductsContextProvider from "@/providers/productsProvider";
import { fetchProducts } from "@/utils/fetchAllProducts";

export default async function cartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await fetchProducts();
  return (
    <>
      <ProductsContextProvider initialProducts={products}>
        <Header />
        {children}
        <MobileNav />
      </ProductsContextProvider>
    </>
  );
}
