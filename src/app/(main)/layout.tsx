import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import NewsLetter from "@/components/NewsLetter";
import ProductsContextProvider from "@/providers/productsProvider";
import FilterContextProvider from "@/providers/filterProvider";
import { fetchProducts } from "@/utils/fetchAllProducts";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await fetchProducts();
  return (
    <>
      <ProductsContextProvider initialProducts={products}>
        <Header />
        <FilterContextProvider>{children}</FilterContextProvider>
      </ProductsContextProvider>
      <NewsLetter />
      <Footer />
      <MobileNav />
    </>
  );
}
