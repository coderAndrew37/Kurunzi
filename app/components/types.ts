import type { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  img: string | null;
  category?: string | null;
  date?: string | null;
  author?: Author | null;
  content?: PortableTextBlock[] | null; // ✅ allow null
  tags?: string[];
  readTime?: number | null;
  excerpt?: string | null;
  isFeatured?: boolean;
  isVideo?: boolean;
  duration?: string | null;
}
export interface Topic {
  id: number;
  name: string;
  description: string;
  articleCount: number;
  trendDirection: "up" | "down" | "neutral";
  trendPercentage: number;
}

export interface NavItem {
  title: string;
  href?: string;
  isLive?: boolean;
  subItems?: NavItem[];
}

export interface Author {
  name: string;
  role?: string;
  avatar?: string | null;
}

export interface HeroItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  readTime?: number;
  isVideo?: boolean;
  duration?: string;
  isFeatured?: boolean;
  tags?: string[];
  author?: Author;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
}

export interface RelatedArticle {
  id: number;
  title: string;
  img: string;
  category: string;
  date: string;
  readTime: number;
}
