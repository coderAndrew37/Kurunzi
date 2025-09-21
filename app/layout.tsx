import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import NavBar from "./navbar/NavBar";
import TopAdBanner from "./TopAdBanner";

import { getNavigation } from "./lib/getNavigation";
import { NavItem } from "./types/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurunzi News",
  description: "Independent Kenyan news, politics, sports and more",
};

// ✅ Async layout so we can fetch from Sanity
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menuItems: NavItem[] = [];

  try {
    const nav = await getNavigation();
    menuItems = nav ?? []; // Remove .items access
  } catch (err) {
    console.warn("⚠️ Failed to fetch nav menu from Sanity:", err);
  }

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopAdBanner />
        <NavBar menuItems={menuItems} />
        <main className="container mx-auto mt-10 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
