"use client";

import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Top Stories",
      href: "/top-stories",
      subItems: [
        { title: "All Top Stories", href: "/top-stories" },
        { title: "Breaking News", href: "/top-stories/breaking" },
        { title: "Most Read", href: "/top-stories/most-read" },
      ],
    },
    {
      title: "Politics",
      href: "/politics",
      subItems: [
        { title: "Politics News", href: "/politics" },
        { title: "Elections", href: "/politics/elections" },
        { title: "Policy", href: "/politics/policy" },
        { title: "Government", href: "/politics/government" },
      ],
    },
    {
      title: "Investigations",
      href: "/investigations",
      subItems: [
        { title: "All Investigations", href: "/investigations" },
        { title: "Corruption", href: "/investigations/corruption" },
        { title: "Crime", href: "/investigations/crime" },
        { title: "Corporate", href: "/investigations/corporate" },
      ],
    },
    {
      title: "Business",
      href: "/business",
      subItems: [
        { title: "Business News", href: "/business" },
        { title: "Markets", href: "/business/markets" },
        { title: "Finance", href: "/business/finance" },
        { title: "Tech", href: "/business/tech" },
      ],
    },
    {
      title: "Features",
      href: "/features",
      subItems: [
        { title: "All Features", href: "/features" },
        { title: "Human Interest", href: "/features/human-interest" },
        { title: "Culture", href: "/features/culture" },
        { title: "Lifestyle", href: "/features/lifestyle" },
      ],
    },
    {
      title: "Sports",
      href: "/sports",
      subItems: [
        { title: "Sports News", href: "/sports" },
        { title: "Football", href: "/sports/football" },
        { title: "Athletics", href: "/sports/athletics" },
        { title: "Basketball", href: "/sports/basketball" },
      ],
    },
    {
      title: "Opinion",
      href: "/opinion",
      subItems: [
        { title: "All Opinion", href: "/opinion" },
        { title: "Editorials", href: "/opinion/editorials" },
        { title: "Columns", href: "/opinion/columns" },
        { title: "Letters", href: "/opinion/letters" },
      ],
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white shadow-sm transition-all duration-300",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Kurunzi News
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="font-semibold text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <div className="grid grid-cols-2 gap-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                              <p className="font-medium text-slate-900">
                                {subItem.title}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search & Subscribe */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 hover:text-blue-600 hover:bg-slate-100"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {/* Subscribe Button */}
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 hidden sm:inline-flex">
              Subscribe
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-600 hover:text-blue-600 hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for news, topics, or authors..."
                className="pl-10 pr-4 py-2 w-full rounded-full"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
            <nav className="grid gap-2">
              {menuItems.map((item) => (
                <div key={item.title} className="group">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-2 text-slate-700 font-medium group-hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                  <div className="pl-4 mt-1 grid gap-2 border-l border-slate-200 ml-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block py-2 text-sm text-slate-600 hover:text-blue-600"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 mt-2 sm:hidden">
                Subscribe
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
