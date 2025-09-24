"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
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
  // console.log("MainNav received menuItems:", menuItems);

  return (
    <div className="flex items-center justify-between">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-1">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {(menuItems ?? []).map((category) => (
              <NavigationMenuItem key={category._id}>
                {category.subcategories?.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className="font-semibold text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[600px]">
                        <div className="grid gap-4 grid-cols-2">
                          {category.subcategories.map((sub) => (
                            <div key={sub._id}>
                              <Link
                                href={`/${category.slug}/${sub.slug}`}
                                className="block p-2 font-medium text-slate-900 hover:text-blue-600"
                              >
                                {sub.title}
                              </Link>
                              {sub.topics?.length > 0 && (
                                <div className="mt-1 pl-2 border-l border-gray-200">
                                  {sub.topics.map((topic) => (
                                    <Link
                                      key={topic._id}
                                      href={`/${category.slug}/${sub.slug}/${topic.slug}`}
                                      className="block py-1 text-sm text-slate-600 hover:text-blue-600"
                                    >
                                      {topic.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={`/${category.slug}`}
                    className="font-semibold text-slate-700 hover:text-blue-600 block px-3 py-2"
                  >
                    {category.title}
                  </Link>
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
