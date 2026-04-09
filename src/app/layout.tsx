import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Poppins } from "next/font/google";
import { KeyboardNav } from "@/components/providers/KeyboardNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ava — Your Working Life",
  description: "AI-powered workforce assistant demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <KeyboardNav />
      </body>
    </html>
  );
}
