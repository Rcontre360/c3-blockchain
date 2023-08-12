"use client";
import AppLayout from "@/components/layout";
import "@/styles/globals.css";
import "@/styles/font.scss";
import "@/styles/global-tailwind.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MetaMaskContextProvider } from "@/context/useMetamask";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetaMaskContextProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </MetaMaskContextProvider>
      </body>
    </html>
  );
}
