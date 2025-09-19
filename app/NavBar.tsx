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
import { cn } from "@/app/lib/utils";
import { Menu, Search, X, Youtube, Calendar, Star } from "lucide-react";
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

  // Popular search tags for SEO
  const popularTags = [
    "William Ruto",
    "Rigathi Gachagua",
    "Raila Odinga",
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Elections 2023",
    "Economy",
    "Sports",
  ];

  const menuItems = [
    {
      title: "News",
      href: "/news",
      subItems: [
        { title: "Breaking News", href: "/news/breaking" },
        { title: "National", href: "/news/national" },
        { title: "International", href: "/news/international" },
        { title: "Most Read", href: "/news/most-read" },
        { title: "Trending", href: "/news/trending" },
      ],
    },
    {
      title: "Politics",
      href: "/politics",
      subItems: [
        { title: "Government", href: "/politics/government" },
        { title: "Elections", href: "/politics/elections" },
        { title: "Policy", href: "/politics/policy" },
        { title: "Political Parties", href: "/politics/parties" },
        { title: "Analysis", href: "/politics/analysis" },
      ],
    },
    {
      title: "Diplomacy",
      href: "/diplomacy",
      subItems: [
        { title: "Foreign Affairs", href: "/diplomacy/foreign-affairs" },
        {
          title: "International Relations",
          href: "/diplomacy/international-relations",
        },
        { title: "Embassy News", href: "/diplomacy/embassy" },
        { title: "Treaties & Agreements", href: "/diplomacy/treaties" },
      ],
    },
    {
      title: "Court & Crime",
      href: "/court-crime",
      subItems: [
        { title: "Court Cases", href: "/court-crime/cases" },
        { title: "Crime Reports", href: "/court-crime/reports" },
        { title: "Legal Analysis", href: "/court-crime/analysis" },
        { title: "Police Updates", href: "/court-crime/police" },
      ],
    },
    {
      title: "Counties",
      href: "/counties",
      subItems: [
        { title: "Nairobi", href: "/counties/nairobi" },
        { title: "Mombasa", href: "/counties/mombasa" },
        { title: "Kisumu", href: "/counties/kisumu" },
        { title: "All Counties", href: "/counties" },
        { title: "Devolution", href: "/counties/devolution" },
      ],
    },
    {
      title: "Health",
      href: "/health",
      subItems: [
        { title: "Healthcare News", href: "/health/news" },
        { title: "Medical Research", href: "/health/research" },
        { title: "Public Health", href: "/health/public" },
        { title: "Wellness", href: "/health/wellness" },
      ],
    },
    {
      title: "Business",
      href: "/business",
      subItems: [
        { title: "Markets", href: "/business/markets" },
        { title: "Finance", href: "/business/finance" },
        { title: "Tech", href: "/business/tech" },
        { title: "Agriculture", href: "/business/agriculture" },
        { title: "Entrepreneurship", href: "/business/entrepreneurship" },
      ],
    },
    {
      title: "Sports",
      href: "/sports",
      subItems: [
        {
          title: "Football",
          href: "/sports/football",
          subItems: [
            { title: "KPL", href: "/sports/football/kpl" },
            { title: "FKF Cup", href: "/sports/football/fkf-cup" },
            { title: "EPL", href: "/sports/football/epl" },
            { title: "FA Cup", href: "/sports/football/fa-cup" },
            { title: "Serie A", href: "/sports/football/serie-a" },
            { title: "Bundesliga", href: "/sports/football/bundesliga" },
            { title: "Ligue 1", href: "/sports/football/ligue-1" },
            { title: "La Liga", href: "/sports/football/la-liga" },
            { title: "PSL", href: "/sports/football/psl" },
            { title: "UEFA Champions League", href: "/sports/football/ucl" },
            { title: "CAF Champions League", href: "/sports/football/caf-cl" },
            { title: "Europa League", href: "/sports/football/europa" },
            {
              title: "UEFA Conference League",
              href: "/sports/football/uefa-conference",
            },
            {
              title: "CAF Confederations Cup",
              href: "/sports/football/caf-confed",
            },
            { title: "CHAN", href: "/sports/football/chan" },
            { title: "AFCON", href: "/sports/football/afcon" },
            { title: "Fixtures & Results", href: "/sports/football/fixtures" },
            { title: "Tables", href: "/sports/football/tables" },
          ],
        },
        { title: "Athletics", href: "/sports/athletics" },
        { title: "Basketball", href: "/sports/basketball" },
        { title: "Golf", href: "/sports/golf" },
        { title: "Tennis", href: "/sports/tennis" },
        { title: "Rugby", href: "/sports/rugby" },
        { title: "Volleyball", href: "/sports/volleyball" },
        { title: "Motorsport", href: "/sports/motorsport" },
        { title: "Formula One", href: "/sports/formula-one" },
        { title: "Live Scores", href: "/sports/live-scores", isLive: true },
      ],
    },
    {
      title: "Lifestyle",
      href: "/lifestyle",
      subItems: [
        { title: "Celebrity Watch", href: "/lifestyle/celebrity" },
        { title: "Fashion", href: "/lifestyle/fashion" },
        { title: "Entertainment", href: "/lifestyle/entertainment" },
        { title: "Relationships", href: "/lifestyle/relationships" },
        { title: "Culture", href: "/lifestyle/culture" },
      ],
    },
    {
      title: "Opinion",
      href: "/opinion",
      subItems: [
        { title: "Editorials", href: "/opinion/editorials" },
        { title: "Columns", href: "/opinion/columns" },
        { title: "Letters", href: "/opinion/letters" },
        { title: "Analysis", href: "/opinion/analysis" },
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
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* FIFA World Cup 2026 Link */}
            <Link
              href="https://worldcup.kurunzi.com"
              target="_blank"
              className="flex items-center text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              <Calendar className="h-3 w-3 mr-1" />
              2026 FIFA World Cup
            </Link>

            {/* YouTube Channel Link */}
            <Link
              href="https://www.youtube.com/@KurunziNews"
              target="_blank"
              className="flex items-center text-xs font-bold text-red-600 hover:text-red-700"
            >
              <Youtube className="h-3 w-3 mr-1" />
              Our YouTube Channel
            </Link>
          </div>

          {/* Popular Tags for SEO */}
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

        {/* Main Nav Bar */}
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
                                {/* Render nested subitems for Football */}
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
            {/* Popular search suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              {popularTags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full"
                >
                  {tag}
                </Link>
              ))}
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
                      <div key={subItem.title}>
                        <Link
                          href={subItem.href}
                          className="block py-2 text-sm text-slate-600 hover:text-blue-600"
                        >
                          {subItem.title}
                        </Link>
                        {/* Nested subitems for mobile */}
                        {subItem.subItems && (
                          <div className="pl-4 mt-1 grid gap-1 border-l border-slate-200 ml-2">
                            {subItem.subItems.map((nestedItem) => (
                              <Link
                                key={nestedItem.title}
                                href={nestedItem.href}
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
