"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Function to generate slug from title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

// Mock data for the article
const articleData = {
  id: 1,
  title: "Kenya's Economy Shows Signs of Recovery Amid Inflation Struggles",
  excerpt:
    "Analysts warn that despite improvements, inflation and global shocks remain a risk to sustained growth in the East African nation.",
  content: `
    <p>NAIROBI—Kenya's economy is showing tentative signs of recovery after a challenging period marked by high inflation and global economic pressures, according to the latest data from the National Treasury. However, economists caution that the recovery remains fragile with several risk factors on the horizon.</p>
    
    <p>The country's GDP grew by 5.6% in the second quarter of 2023, up from 5.2% in the previous quarter, driven largely by improved performance in agriculture, manufacturing, and services sectors. This growth slightly exceeded projections from the International Monetary Fund, which had forecasted 5.4% expansion for the period.</p>
    
    <h2>Agricultural Sector Leads Recovery</h2>
    
    <p>Agriculture, which accounts for approximately 22% of Kenya's GDP, expanded by 6.2% compared to 3.5% growth in the same period last year. The improvement is largely attributed to favorable weather conditions that boosted production of key exports such as tea, coffee, and horticultural products.</p>
    
    <p>"The rains have been generous this year, and we're seeing the benefits across the agricultural value chain," said Dr. Mary Wanjiru, an agricultural economist at the University of Nairobi. "However, we must remain cautious as climate patterns become increasingly unpredictable."</p>
    
    <h2>Inflation Challenges Persist</h2>
    
    <p>Despite the positive growth indicators, inflation remains a concern for policymakers and citizens alike. The inflation rate stood at 7.9% in August, slightly down from 8.3% in July but still well above the government's target of 5%.</p>
    
    <p>Food inflation, in particular, continues to burden households with prices for essential commodities such as maize flour, sugar, and cooking oil remaining elevated. Transportation costs have also increased following the rise in global oil prices.</p>
    
    <h2>Expert Analysis</h2>
    
    <p>Economic analysts have mixed views on the sustainability of the recovery. While some point to the strong performance in key sectors as reason for optimism, others highlight vulnerabilities in the economy.</p>
    
    <p>"The growth numbers are encouraging, but we're not out of the woods yet," said James Mwangi, chief economist at Stanbic Bank. "The economy still faces significant headwinds including high public debt, currency volatility, and the ongoing effects of global economic uncertainty."</p>
    
    <p>The Kenya Shilling has weakened against the US Dollar, trading at approximately 150 shillings to the dollar compared to 140 a year ago. This depreciation has increased the cost of servicing Kenya's substantial external debt.</p>
    
    <h2>Government Response</h2>
    
    <p>In response to these challenges, the government has announced a series of measures aimed at stabilizing the economy. These include fiscal consolidation efforts, targeted subsidies for essential commodities, and initiatives to boost domestic production.</p>
    
    <p>President William Ruto has emphasized the administration's commitment to economic transformation, stating, "We are making difficult but necessary choices to secure our economic future. Our focus is on increasing production, expanding our tax base, and managing our debt responsibly."</p>
    
    <p>Critics, however, argue that more needs to be done to address the high cost of living that continues to affect ordinary Kenyans. Opposition leaders have called for additional measures to cushion vulnerable populations from economic shocks.</p>
    
    <h2>Looking Ahead</h2>
    
    <p>Looking forward, the Central Bank of Kenya faces the delicate task of balancing inflation control with support for economic growth. The Monetary Policy Committee is scheduled to meet next week to review the benchmark interest rate, currently set at 10.5%.</p>
    
    <p>Most analysts expect the committee to maintain the current rate while signaling readiness to tighten further if inflation does not continue to moderate.</p>
    
    <p>For now, businesses and consumers alike are watching economic indicators closely, hoping that the current recovery signs translate into sustained economic stability and improved living standards.</p>
  `,
  author: "John Kamau",
  authorRole: "Senior Economics Correspondent",
  publishDate: "September 15, 2023",
  readTime: "8 min read",
  category: "Business",
  image: "/placeholder-hero.jpg",
  tags: ["Economy", "Inflation", "Recovery", "Kenya", "Business"],
};

// Mock related articles
const relatedArticles = [
  {
    id: 2,
    title: "Central Bank Holds Interest Rates Amid Inflation Concerns",
    excerpt:
      "Monetary Policy Committee maintains current rate, citing need to balance growth and price stability.",
    category: "Business",
    date: "September 10, 2023",
    image: "/placeholder-1.jpg",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Agricultural Exports Reach Record High in Q2",
    excerpt:
      "Favorable weather conditions boost tea, coffee, and horticulture shipments.",
    category: "Economy",
    date: "September 5, 2023",
    image: "/placeholder-2.jpg",
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Government Announces New Measures to Tackle Rising Cost of Living",
    excerpt:
      "Policy package includes subsidies, tax incentives aimed at easing household burdens.",
    category: "Politics",
    date: "September 3, 2023",
    image: "/placeholder-3.jpg",
    readTime: "6 min read",
  },
];

// In a real app, you would fetch the article based on the slug
// This is a mock function to simulate that
const getArticleBySlug = (slug: string) => {
  // Generate slug from article title and compare
  if (slug === generateSlug(articleData.title)) {
    return articleData;
  }

  // Also check related articles
  for (const article of relatedArticles) {
    if (slug === generateSlug(article.title)) {
      return article;
    }
  }

  return null;
};

// Component for the article page
export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Get the article based on the slug
  const article = getArticleBySlug(params.slug);

  // If article not found, show 404
  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The article you&#39;re looking for doesn&#39;t exist.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-neutral-600 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${article.category.toLowerCase()}`}
            className="hover:text-blue-600 transition-colors"
          >
            {article.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">Current Article</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6 -ml-3" asChild>
          <Link href={`/${article.category.toLowerCase()}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {article.category} News
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              {article.category}
            </span>
            <div className="flex items-center text-neutral-600 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {"publishDate" in article ? article.publishDate : article.date}
            </div>
            <div className="flex items-center text-neutral-600 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-neutral-600 mb-6 max-w-3xl">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                {"author" in article && (
                  <p className="font-medium text-neutral-900">
                    {article.author}
                  </p>
                )}
                {"authorRole" in article && (
                  <p className="text-sm text-neutral-600">
                    {article.authorRole}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    isBookmarked ? "fill-blue-600 text-blue-600" : ""
                  }`}
                />
                {isBookmarked ? "Saved" : "Save"}
              </Button>

              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              <div className="flex items-center gap-1 ml-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Image */}
        <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-8">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        {"content" in article && (
          <article className="prose prose-lg max-w-none mb-12">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        )}

        {/* Tags */}
        {"tags" in article && Array.isArray(article.tags) && (
          <div className="flex flex-wrap gap-2 mb-12">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${generateSlug(tag)}`}
                className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-neutral-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Related Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Related Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <article key={relatedArticle.id} className="group">
                <Link href={`/article/${generateSlug(relatedArticle.title)}`}>
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{relatedArticle.date}</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Stay Informed
            </h2>
            <p className="text-neutral-600 mb-6">
              Subscribe to our newsletter for daily updates and exclusive
              content straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .article-content {
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          color: #374151;
        }

        .article-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }

        .article-content p:first-of-type:first-letter {
          initial-letter: 3;
          font-weight: bold;
          margin-right: 0.5rem;
          color: #1e40af;
        }

        @media (max-width: 768px) {
          .article-content p:first-of-type:first-letter {
            initial-letter: 2;
          }
        }
      `}</style>
    </div>
  );
}
