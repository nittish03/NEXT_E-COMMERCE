import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from '@/components/Footer'


export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce made by Nittish",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-black bg-[#f6f6f6] font-inter">
        <SessionWrapper>
          <div className="mb-16">
          <Navbar />
          </div>
          <Toaster />
          <main >{children}</main>
          <Footer/>
        </SessionWrapper>
      </body>

    </html>
  );
}
