"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  isSearchOpen: boolean;
  popularTags: string[];
}

interface Suggestion {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
}

export default function SearchBar({
  isSearchOpen,
  popularTags,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search-suggestions?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="mt-4 pb-3 relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news, topics, or authors..."
          className="pl-10 pr-4 py-2 w-full rounded-full"
        />
      </form>

      {/* Suggestions dropdown */}
      {query && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {loading ? (
            <p className="p-3 text-sm text-gray-500">Searching...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((s) => (
              <Link
                key={s.id}
                href={`/article/${s.slug}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {s.title}
              </Link>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}

      {/* Popular tags */}
      {!query && (
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
      )}
    </div>
  );
}
