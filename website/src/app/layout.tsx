import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IridescenceBg from "@/components/features/Iridescence/IridescenceBg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sidharth Sirdeshmukh",
  description:
    "Drug Discovery, Lab Automation, Software — portfolio of Sidharth Sirdeshmukh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <IridescenceBg />
        {children}
      </body>
    </html>
  );
}
