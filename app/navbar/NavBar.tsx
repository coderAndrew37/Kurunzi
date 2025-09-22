"use client";

import { cn } from "@/app/lib/utils";
import { Calendar, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainNav from "./MainNav";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";
import { popularTags } from "./popularTags";
import { NavItem } from "../types/navigation";

interface HeaderProps {
  menuItems: NavItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white shadow-sm transition-all duration-300",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Kurunzi News
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="https://worldcup.kurunzi.com"
              target="_blank"
              className="flex items-center text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              <Calendar className="h-3 w-3 mr-1" />
              2026 FIFA World Cup
            </Link>

            <Link
              href="https://www.youtube.com/@KurunziNews"
              target="_blank"
              className="flex items-center text-xs font-bold text-red-600 hover:text-red-700"
            >
              <Youtube className="h-3 w-3 mr-1" />
              Our YouTube Channel
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <span className="text-xs text-gray-500">Trending:</span>
            <div className="flex space-x-1">
              {popularTags.slice(0, 3).map((tag, index) => (
                <Link
                  key={index}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <MainNav
          isSearchOpen={isSearchOpen}
          toggleSearch={() => setIsSearchOpen(!isSearchOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          menuItems={menuItems}
        />

        {/* Search Bar */}
        <SearchBar isSearchOpen={isSearchOpen} />

        {/* Mobile Navigation */}
        <MobileNav isMobileMenuOpen={isMobileMenuOpen} menuItems={menuItems} />
      </div>
    </header>
  );
}
