import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/homepage/navbar";
import Footer from "@/components/layout/homepage/footer";
import { Providers } from "./provider";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Puskesmas Klumbayan Barat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white w-screen">
      <body className={inter.className} >
        <Providers>
          {children}
          {/* <Navbar >
					</Navbar>
					<Footer /> */}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
