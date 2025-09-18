import type { PortableTextBlock } from "sanity";
export interface Topic {
  id: number;
  name: string;
  description: string;
  articleCount: number;
  trendDirection: "up" | "down" | "neutral";
  trendPercentage: number;
}

export interface Author {
  name: string;
  role?: string;
  avatar?: string | null;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  img: string | null;
  category?: string | null;
  date?: string | null;
  author?: Author | null;
  content?: PortableTextBlock[]; // ✅ strict type
  tags?: string[];
  readTime?: number;
  excerpt?: string | null;
  isFeatured?: boolean;
  isVideo?: boolean;
  duration?: string | null;
}

export interface RelatedArticle {
  id: number;
  title: string;
  img: string;
  category: string;
  date: string;
  readTime: number;
}
