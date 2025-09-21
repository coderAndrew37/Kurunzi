"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, Search, Star, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { NavItem } from "../types/navigation";

interface MainNavProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  menuItems: NavItem[];
}

export default function MainNav({
  isSearchOpen,
  toggleSearch,
  isMobileMenuOpen,
  toggleMobileMenu,
  menuItems,
}: MainNavProps) {
  return (
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
                {item.subItems && (
                  <NavigationMenuContent>
                    <div
                      className={cn(
                        "p-4",
                        item.title === "Sports" ? "w-[800px]" : "w-[400px]"
                      )}
                    >
                      <div
                        className={cn(
                          "grid gap-3",
                          item.title === "Sports"
                            ? "grid-cols-3"
                            : "grid-cols-2"
                        )}
                      >
                        {item.subItems.map((subItem) => (
                          <div key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block p-3 rounded-lg hover:bg-slate-50 transition-colors",
                                subItem.isLive
                                  ? "bg-red-50 hover:bg-red-100"
                                  : ""
                              )}
                            >
                              <p
                                className={cn(
                                  "font-medium text-slate-900",
                                  subItem.isLive
                                    ? "text-red-600 flex items-center"
                                    : ""
                                )}
                              >
                                {subItem.isLive && (
                                  <Star className="h-4 w-4 mr-1 fill-red-600" />
                                )}
                                {subItem.title}
                              </p>

                              {/* Nested subitems */}
                              {subItem.subItems && (
                                <div className="mt-2 pl-2 border-l border-gray-200">
                                  {subItem.subItems.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.title}
                                      href={nestedItem.href}
                                      className="block py-1 text-sm text-slate-600 hover:text-blue-600"
                                    >
                                      {nestedItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                )}
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
          onClick={toggleSearch}
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
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
