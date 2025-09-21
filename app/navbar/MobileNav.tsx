"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "../types/navigation";

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  menuItems: NavItem[];
}

export default function MobileNav({
  isMobileMenuOpen,
  menuItems,
}: MobileNavProps) {
  if (!isMobileMenuOpen) return null;

  return (
    <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
      <nav className="grid gap-2">
        {menuItems.map((item) => (
          <div key={item._id} className="group">
            <Link
              href={item.href ?? "#"}
              className="flex items-center justify-between py-2 text-slate-700 font-medium group-hover:text-blue-600"
            >
              {item.title}
            </Link>

            {item.subItems && item.subItems.length > 0 && (
              <div className="pl-4 mt-1 grid gap-2 border-l border-slate-200 ml-2">
                {item.subItems.map((subItem) => (
                  <div key={subItem._id}>
                    <Link
                      href={subItem.href ?? "#"}
                      className="block py-2 text-sm text-slate-600 hover:text-blue-600"
                    >
                      {subItem.title}
                    </Link>

                    {/* Nested subitems */}
                    {subItem.subItems && subItem.subItems.length > 0 && (
                      <div className="pl-4 mt-1 grid gap-1 border-l border-slate-200 ml-2">
                        {subItem.subItems.map((nestedItem) => (
                          <Link
                            key={nestedItem._id}
                            href={nestedItem.href ?? "#"}
                            className="block py-1 text-xs text-slate-500 hover:text-blue-600"
                          >
                            {nestedItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Subscribe button (only visible on mobile) */}
        <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 mt-2 sm:hidden">
          Subscribe
        </Button>
      </nav>
    </div>
  );
}
