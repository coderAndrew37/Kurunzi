import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { sanityClient } from "@/app/lib/sanity.client";

interface BreakingNewsPageProps {
  params: {
    slug: string;
  };
}

interface News {
  _id: string;
  headline: string;
  slug: string;
  publishedAt: string;
  category: string;
  isActive: boolean;
  expiresAt: string;
}

export async function generateMetadata({ params }: BreakingNewsPageProps) {
  const news = await getBreakingNewsBySlug(params.slug);

  if (!news) {
    return {
      title: "Breaking News Not Found",
    };
  }

  return {
    title: `${news.headline} | Kurunzi News`,
    description: `Breaking news: ${news.headline}`,
  };
}

async function getBreakingNewsBySlug(slug: string) {
  const query = `
    *[_type == "breakingNews" && slug.current == $slug][0] {
      _id,
      headline,
      "slug": slug.current,
      publishedAt,
      category,
      isActive,
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

  const publishedDate = new Date(news.publishedAt).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <span className="h-2 w-2 bg-red-600 rounded-full mr-1 animate-pulse"></span>
                BREAKING NEWS
              </span>
              {news.category && (
                <span className="ml-2 inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {news.category.toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {publishedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article */}
          <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {news.headline}
            </h1>

            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Clock className="h-4 w-4 mr-1" />
              Published {publishedDate}
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-yellow-700">
                  <strong>Breaking News Update:</strong> This is a developing
                  story. We will continue to update this page as more
                  information becomes available.
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                This breaking news alert was issued to keep our readers informed
                about developing events. Our news team is actively gathering
                more details and will provide comprehensive coverage as the
                situation evolves.
              </p>

              <p className="text-gray-700 mb-4">
                Stay tuned for live updates and expert analysis on this
                developing story. Refresh this page for the latest information.
              </p>

              <div className="bg-gray-100 p-4 rounded-lg mt-8">
                <h3 className="font-semibold text-gray-900 mb-2">
                  About Kurunzi News Breaking Alerts
                </h3>
                <p className="text-sm text-gray-700">
                  Our breaking news service delivers urgent and important news
                  as it happens. We verify all information before publication to
                  ensure accuracy and reliability.
                </p>
              </div>
            </div>
          </article>

          {/* Related News */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Latest Breaking News
            </h2>
            <RelatedBreakingNews currentSlug={news.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function RelatedBreakingNews({ currentSlug }: { currentSlug: string }) {
  const query = `
    *[_type == "breakingNews" && isActive == true && slug.current != $currentSlug] | order(publishedAt desc)[0...5] {
      _id,
      headline,
      "slug": slug.current,
      publishedAt,
      category
    }
  `;

  const relatedNews = await sanityClient.fetch(query, { currentSlug });

  if (relatedNews.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {relatedNews.map((news: News) => (
        <Link
          key={news._id}
          href={`/news/${news.slug}`}
          className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
            BREAKING
          </span>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {news.headline}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(news.publishedAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
