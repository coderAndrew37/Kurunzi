export interface Author {
  name: string;
  role?: string;
  avatar?: string;
}

export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  img: string;
  category: string;
  date: string;
  author: Author;
  content: string;
  tags?: string[];
  readTime: number;
  excerpt?: string;
}

export interface RelatedArticle {
  id: number;
  title: string;
  img: string;
  category: string;
  date: string;
  readTime: number;
}

export interface Story {
  id: number;
  title: string;
  img: string;
  category?: string;
  date?: string;
  excerpt?: string;
  isFeatured?: boolean;
  isVideo?: boolean;
  duration?: string;
}
