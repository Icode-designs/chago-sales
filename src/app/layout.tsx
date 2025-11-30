import type { Metadata } from "next";
import { Italianno, Poppins } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/global.styles";
import Providers from "@/providers/ReduxProvider";

const italianno = Italianno({
  variable: "--font-italiano",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "City Store | E-commerce",
  description: "Your one-stop shop for everything Electronics and Gadgets",
  keywords: ["e-commerce", "electronics"],
  creator: "Osakwe Bonaventure Ifechukwu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <GlobalStyle />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
