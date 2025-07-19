import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from '@/components/Footer';
import {AppWrapper} from '@/context/index'

export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce made by Nittish",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="text-black bg-[#f6f6f6] font-inter">
        <SessionWrapper>
          <AppWrapper>
          <div className="mb-16">
            <Navbar />
          </div>
          <Toaster />
          <main>{children}</main>
          <Footer />
          </AppWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
