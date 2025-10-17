import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-automotive",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-industrial",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${BRAND.NAME} - Professional Auto Service & Repair`,
  description: BRAND.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${orbitron.variable} ${rajdhani.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
