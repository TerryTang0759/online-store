import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "在线商店 - 优质商品，便捷购物",
  description: "发现优质商品，享受便捷购物体验。我们提供各种类别的商品，满足您的购物需求。",
  keywords: "在线商店, 购物, 商品, 电商, 零售",
  openGraph: {
    title: "在线商店 - 优质商品，便捷购物",
    description: "发现优质商品，享受便捷购物体验",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
