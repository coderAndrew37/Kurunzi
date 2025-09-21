import { sanityClient } from "@/app/lib/sanity.client";
import { urlFor } from "@/app/lib/sanity.image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RelatedArticlesProps {
  currentSlug: string;
  category?: string;
  limit?: number;
}

interface RelatedArticle {
  _id: string;
  headline: string;
  fullTitle: string;
  excerpt?: string;
  slug: string;
  featuredImage?: (SanityImageSource & { alt?: string }) | null;
  publishedAt: string;
  category?: string;
  readTime?: number;
  views?: number;
}

// Shape of articles returned from Sanity
interface SanityArticle {
  _id: string;
  headline: string;
  fullTitle?: string;
  excerpt?: string;
  slug?: { current: string };
  featuredImage?: SanityImageSource & { alt?: string };
  publishedAt: string;
  category?: string;
  content?: PortableTextBlock[];
}

interface PortableTextChild {
  _type: "span";
  text: string;
}

interface PortableTextBlock {
  _type: "block";
  children?: PortableTextChild[];
}

export default async function RelatedArticles({
  currentSlug,
  category,
  limit = 3,
}: RelatedArticlesProps) {
  const relatedArticles = await getRelatedArticles(
    currentSlug,
    category,
    limit
  );

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {relatedArticles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}

async function getRelatedArticles(
  currentSlug: string,
  category?: string,
  limit: number = 3
): Promise<RelatedArticle[]> {
  try {
    let query: string;

    if (category) {
      query = `
        *[_type == "breakingNews" && slug.current != $currentSlug && category == $category && isActive == true] 
        | order(publishedAt desc)[0...${limit}]
      `;
    } else {
      query = `
        *[_type == "breakingNews" && slug.current != $currentSlug && isActive == true] 
        | order(publishedAt desc)[0...${limit}]
      `;
    }

    const articles = await sanityClient.fetch<SanityArticle[]>(query, {
      currentSlug,
      category,
    });

    return articles.map((article) => ({
      _id: article._id,
      headline: article.headline,
      fullTitle: article.fullTitle || article.headline,
      excerpt: article.excerpt,
      slug: article.slug?.current ?? "",
      featuredImage: article.featuredImage ?? null,
      publishedAt: article.publishedAt,
      category: article.category,
      readTime: calculateReadTime(article.content ?? []),
      views: Math.floor(Math.random() * 10000) + 1000, // Simulated views
    }));
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}

function calculateReadTime(content: PortableTextBlock[]): number {
  if (!content) return 3;

  const wordCount = content.reduce((count, block) => {
    if (block._type === "block" && block.children) {
      return (
        count +
        block.children.reduce((childCount, child) => {
          return childCount + (child.text || "").split(" ").length;
        }, 0)
      );
    }
    return count;
  }, 0);

  return Math.max(1, Math.ceil(wordCount / 200)); // 200 words per min
}

function ArticleCard({ article }: { article: RelatedArticle }) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-KE",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      {article.featuredImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={
              urlFor(article.featuredImage).width(400).height(300).url() ?? ""
            }
            alt={
              article.featuredImage.alt ||
              article.fullTitle ||
              "Related article"
            }
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          {article.category && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                {article.category.toUpperCase()}
              </span>
            </div>
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date and Read Time */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {publishedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime || 3} min read
            </div>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {article.views?.toLocaleString()}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/news/${article.slug}`}>{article.fullTitle}</Link>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Read More */}
        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group/readmore"
        >
          Read Full Story
          <svg
            className="w-4 h-4 ml-2 transition-transform group-hover/readmore:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// Fallback component for error handling
export function RelatedArticlesFallback() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
        >
          <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-3"></div>
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
}
