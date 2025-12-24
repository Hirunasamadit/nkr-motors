import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-automotive",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-industrial",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
        <SpeedInsights />
      </body>
    </html>
  );
}
