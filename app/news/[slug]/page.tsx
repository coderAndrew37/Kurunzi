import { sanityClient } from "@/app/lib/sanity.client";
import { urlFor } from "@/app/lib/sanity.image";
import { PortableText } from "@portabletext/react";
import { Calendar, MapPin, RefreshCw } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import LiveBadge from "../_components/LiveBadge";
import RelatedArticles from "../_components/RelatedArticles";
import ShareButtons from "../_components/ShareButtons";

interface BreakingNewsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BreakingNewsPageProps) {
  const news = await getBreakingNewsBySlug(params.slug);

  if (!news) {
    return {
      title: "Breaking News Not Found",
    };
  }

  return {
    title: `${news.fullTitle} | Kurunzi News`,
    description: news.excerpt || `Breaking news: ${news.headline}`,
    openGraph: {
      title: news.fullTitle,
      description: news.excerpt,
      images: news.featuredImage ? [urlFor(news.featuredImage).url()] : [],
      type: "article",
      publishedTime: news.publishedAt,
    },
  };
}

async function getBreakingNewsBySlug(slug: string) {
  const query = `
    *[_type == "breakingNews" && slug.current == $slug][0] {
      _id,
      headline,
      fullTitle,
      excerpt,
      "slug": slug.current,
      content,
      featuredImage,
      publishedAt,
      updatedAt,
      category,
      location,
      author->{
        name,
        "image": image.asset->url,
        bio
      },
      sources,
      isActive,
      priority,
      expiresAt
    }
  `;

  const news = await sanityClient.fetch(query, { slug });
  return news;
}

export default async function BreakingNewsPage({
  params,
}: BreakingNewsPageProps) {
  const news = await getBreakingNewsBySlug(params.slug);

  if (!news) {
    notFound();
  }

  const publishedDate = new Date(news.publishedAt);
  const updatedDate = news.updatedAt ? new Date(news.updatedAt) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breaking News Badge */}
            <div className="flex items-center justify-center mb-6">
              <LiveBadge />
              <span className="ml-3 text-sm font-medium bg-red-600 px-3 py-1 rounded-full">
                BREAKING NEWS
              </span>
              {news.category && (
                <span className="ml-2 text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
                  {news.category.toUpperCase()}
                </span>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight mb-6">
              {news.fullTitle}
            </h1>

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
                {news.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Published: {formatDate(publishedDate)}
              </div>

              {updatedDate && (
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Updated: {formatDate(updatedDate)}
                </div>
              )}

              {news.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {news.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {news.featuredImage && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={urlFor(news.featuredImage).url()}
                alt={news.featuredImage.alt || news.fullTitle}
                fill
                className="object-cover"
                priority
              />
              {news.featuredImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-sm">
                    {news.featuredImage.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Author Info */}
          {news.author && (
            <div className="flex items-center space-x-4 mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={news.author.image}
                  alt={news.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {news.author.name}
                </p>
                <p className="text-sm text-gray-600">
                  Senior News Correspondent
                </p>
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed">
              <PortableText value={news.content} />
            </div>

            {/* Sources */}
            {news.sources && news.sources.length > 0 && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Sources</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {news.sources.map((source: string, index: number) => (
                    <li key={index}>• {source}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  <p>Published: {formatDate(publishedDate)}</p>
                  {updatedDate && (
                    <p>Last updated: {formatDate(updatedDate)}</p>
                  )}
                </div>

                <ShareButtons
                  title={news.fullTitle}
                  url={`https://kurunzi.news/news/${news.slug}`}
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              More Breaking News
            </h2>
            <RelatedArticles currentSlug={news.slug} category={news.category} />
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Informed with Breaking News
            </h3>
            <p className="text-blue-100 mb-6">
              Get instant alerts on major developments as they happen
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe to Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
