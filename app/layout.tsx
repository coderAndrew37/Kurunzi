import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import NavBar from "./navbar/NavBar";
import TopAdBanner from "./TopAdBanner";

import { sanityClient } from "@/app/lib/sanity.client";
import { NavItem } from "./components/types";
import { navMenuQuery } from "@/app/lib/sanity.queries";

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

// ✅ Make this async so we can fetch from Sanity
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menuItems: NavItem[] | undefined = undefined;

  try {
    const nav = await sanityClient.fetch(navMenuQuery);
    menuItems = nav?.items ?? undefined;
  } catch (err) {
    console.warn("⚠️ Failed to fetch nav menu from Sanity:", err);
  }

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopAdBanner />
        {/* Pass nav data into your NavBar */}
        <NavBar />
        <main className="container mx-auto mt-10 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
