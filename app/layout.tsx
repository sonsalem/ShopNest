import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwitchTheme from "@/components/SwitchTheme";
const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShopNest Store",
  description: "The Best Store To Get All You Need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chakraPetch.variable} antialiased dark:bg-bgDark-400`}
      >
        <Navbar />
        <SwitchTheme />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
