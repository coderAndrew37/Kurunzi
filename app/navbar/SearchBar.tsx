"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { popularTags } from "./popularTags";

interface SearchBarProps {
  isSearchOpen: boolean;
  popularTags: string[];
}

export default function SearchBar({ isSearchOpen }: SearchBarProps) {
  if (!isSearchOpen) return null;

  return (
    <div className="mt-4 pb-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for news, topics, or authors..."
          className="pl-10 pr-4 py-2 w-full rounded-full"
        />
      </div>

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
  );
}
